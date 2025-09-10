import { NextRequest, NextResponse } from "next/server";

import { PrismaClient, RoomType } from "@prisma/client";
import { S3Client, ListObjectsV2Command } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import { auth } from "@clerk/nextjs/server";
const prisma = new PrismaClient();

// Helper: parse price string like "1,500,000" or "15,000 THB"
function parsePrice(value: string | null): number | null {
  if (!value) return null;
  const num = value.replace(/[^0-9.]/g, ""); // keep only numbers
  return num ? parseFloat(num) : null;
}

// Helper: parse room size (sqm)
function parseRoomSize(value: string | null): number | null {
  if (!value) return null;
  const num = value.replace(/[^0-9.]/g, "");
  return num ? parseFloat(num) : null;
}

const s3 = new S3Client({
  region: process.env.AWS_REGION!,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID!,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY!,
  },
});

const BUCKET = process.env.S3_BUCKET!;
const PREFIX = process.env.S3_PREFIX || ""; // e.g. "images/"

const IMAGE_EXTS = new Set([".jpg", ".jpeg", ".png", ".webp", ".gif", ".svg"]);

function isImageKey(key: string) {
  const i = key.lastIndexOf(".");
  if (i < 0) return false;
  const ext = key.slice(i).toLowerCase();
  return IMAGE_EXTS.has(ext);
}

export async function GET(req: NextRequest) {
  try {

    const { userId } = await auth(); // Get authenticated user ID

    if (!userId) {
      return new Response(JSON.stringify({ error: "Unauthorized" }), {
        status: 401,
      });
    }
    const userDb = await prisma.user.findFirst({
      where: {
        clerkId: userId,
      },
    });

    // if user is freeUser
    if (!!userDb && !userDb.isPaid) {
      return NextResponse.json({
        page: 1,
        limit: 0,
        total: 0,
        data: [],
      });
    }
    if (!userDb || !userDb?.id) {
      return new Response(JSON.stringify({ error: "Unauthorized" }), {
        status: 401,
      });
    }



    const { searchParams } = new URL(req.url);

    const projectName = searchParams.get("projectName") || "";

    const minPrice = searchParams.get("minPrice")
      ? parseFloat(searchParams.get("minPrice")!)
      : null;
    const maxPrice = searchParams.get("maxPrice")
      ? parseFloat(searchParams.get("maxPrice")!)
      : null;

    const minSize = searchParams.get("minSize")
      ? parseFloat(searchParams.get("minSize")!)
      : null;
    const maxSize = searchParams.get("maxSize")
      ? parseFloat(searchParams.get("maxSize")!)
      : null;

    const propertyType = searchParams.get("propertyType");
    const bedRoom = searchParams.get("bedRoom");

    const page = parseInt(searchParams.get("page") || "1", 10);
    const limit = parseInt(searchParams.get("limit") || "10", 10);
    const skip = (page - 1) * limit;

    // Fetch projects matching projectName first
    const projects = await prisma.project.findMany({
      where: {
        OR: [
          { projectNameEn: { contains: projectName, mode: "insensitive" } },
          { projectNameTh: { contains: projectName, mode: "insensitive" } },
        ],
      },
      select: {
        projectCode: true,
        projectNameEn: true,
        projectNameTh: true,
      },
    });

    const projectCodes = projects.map((p) => p.projectCode);

    const propertyTypeFilter: any = {};
    if (propertyType && propertyType !== "all") {
      const types = (propertyType as string)
        .split(",")
        .filter((t) => Object.values(RoomType).includes(t as RoomType)) // ✅ validate
        .map((t) => t as RoomType);

      if (types.length > 0) {
        propertyTypeFilter.propertyType = { in: types };
      }
    }
// console.log(propertyTypeFilter, 55555)
    const bedRoomFilter: any = {};
    if (bedRoom && bedRoom !== "all") {
      bedRoomFilter.bedRoom = bedRoom;
    }


    if (!projects.length) {
      return NextResponse.json({
        page,
        limit,
        total: 0,
        data: [],
      });
    } else {
      // Fetch properties
      const properties = await prisma.property.findMany({
        where: {
          ...propertyTypeFilter,
          ...bedRoomFilter,
          ...(projectCodes.length > 0
            ? { projectCode: { in: projectCodes } }
            : {}),
        },
        include: {
          project: true,
        },
      });

      // Post-filter by price + room size (since sellPrice is string)
      const filtered = properties.filter((p) => {
        const price = parsePrice(p.sellPrice || p.rentalRate || null);
        const size = parseRoomSize(p.roomSize || null);

        if (minPrice !== null && (price === null || price < minPrice))
          return false;
        if (maxPrice !== null && (price === null || price > maxPrice))
          return false;
        if (minSize !== null && (size === null || size < minSize)) return false;
        if (maxSize !== null && (size === null || size > maxSize)) return false;

        return true;
      });

      const total = filtered.length;
      const totalPages = Math.ceil(total / limit);
      // calculate skip
      const skipNumber = (page - 1) * limit;

      // slice data
      const paginatedItems = filtered.slice(skipNumber, skipNumber + limit);

      return NextResponse.json({
        page,
        limit,
        total: total,
        data: paginatedItems,
      });
    }
  } catch (err: any) {
    console.error(err);
    return NextResponse.json(
      { error: "Failed to fetch properties", details: err.message },
      { status: 500 }
    );
  }
}

// export async function getImages(folder: string) {
//   try {
//     let ContinuationToken: string | undefined;
//     const keys: string[] = [];

//     do {
//       const res = await s3.send(
//         new ListObjectsV2Command({
//           Bucket: process.env.AWS_S3_BUCKET_NAME,
//           // Prefix: `${folder}/`,
//           Prefix: "1684348259133823/",
//           ContinuationToken,
//         })
//       );
//       // console.log(res, 9999999);

//       (res.Contents || []).forEach((o) => {
//         if (o.Key && !o.Key.endsWith("/") && isImageKey(o.Key)) {
//           keys.push(o.Key);
//           // console.log("whattt,", o.Key);
//         }
//       });

//       ContinuationToken = res.IsTruncated
//         ? res.NextContinuationToken
//         : undefined;
//     } while (ContinuationToken);

//     // console.log(keys, 33333)
//     // Option A: return presigned URLs (expire ~10 minutes)
//     // const presigned = await Promise.all(
//     //   keys.map(async (Key) => ({
//     //     key: Key,
//     //     url: await getSignedUrl(
//     //       s3,
//     //       // Use GetObject to sign direct S3 access:
//     //       new (
//     //         await import("@aws-sdk/client-s3")
//     //       ).GetObjectCommand({
//     //         Bucket: process.env.AWS_S3_BUCKET_NAME,
//     //         Key,
//     //       }),
//     //       { expiresIn: 600 } // 10 minutes
//     //     ),
//     //   }))
//     // );

//     // console.log(presigned, 5555555);
//     // // Option B: if using public CloudFront, return stable CDN URLs:
//     // const cdnBase = process.env.CDN_BASE;
//     // const cdn = cdnBase
//     //   ? keys.map((key) => ({ key, url: `${cdnBase}/${key}` }))
//     //   : null;

//     return NextResponse.json({
//       count: keys.length,
//       // pick one style to use on the client:
//       images: presigned,
//     });
//   } catch (err: any) {
//     console.error(err);
//     return NextResponse.json(
//       { error: "Failed to list images", details: err?.message },
//       { status: 500 }
//     );
//   }
// }
