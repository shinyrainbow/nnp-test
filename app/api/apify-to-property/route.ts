import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";
import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";
import { randomUUID } from "crypto";
import path from "path";
import fs from "fs";
import { PassThrough } from "stream";
import archiver from "archiver";


const prisma = new PrismaClient();
export const runtime = "nodejs";

const s3 = new S3Client({
  region: process.env.AWS_REGION!,
});

export async function POST(req: Request) {
  try {
    const { properties } = await req.json();

    const createProperties = properties.map(async (propertyToAdd) => {
      // Step 1 Adding images
      if (!propertyToAdd.imageUrls?.length) {
        return NextResponse.json({ error: "No URLs provided" }, { status: 400 });
      }
  
      // const bucket = process.env.S3_BUCKET_NAME!;
      const uploaded: { imageUrl: string; key: string; s3Url: string }[] = [];
  
      const idOfpropertyToAdd = randomUUID();
      for (const imageUrl of propertyToAdd.imageUrls) {
        const res = await fetch(imageUrl);
        if (!res.ok) throw new Error(`Failed to fetch ${imageUrl}`);
  
        const contentType =
          res.headers.get("content-type") || "application/octet-stream";
        
        const arrayBuffer = await res.arrayBuffer();
        const buffer = Buffer.from(arrayBuffer);

        // Extract file extension if possible
        let ext = "";
        try {
          const urlObj = new URL(imageUrl);
          const parts = urlObj.pathname.split(".");
          if (parts.length > 1) ext = parts.pop()!;
        } catch {
          
        }

        const folder = "properties"
        const key =
          (folder ? `${folder}/` : "") +
          `${idOfpropertyToAdd}/${randomUUID()}${ext ? "." + ext : ""}`
  
        // await s3.send(
        //   new PutObjectCommand({
        //     Bucket: bucket,
        //     Key: key,
        //     Body: buffer,
        //     ContentType: contentType,
        //   })
        // );
  
        // uploaded.push({
        //   imageUrl: imageUrl,
        //   key,
        //   s3Url: `https://${bucket}.s3.${
        //     process.env.AWS_REGION
        //   }.amazonaws.com/${encodeURI(key)}`,
        // });

        // save to computer
        // const folderName = idOfpropertyToAdd;
        // const zipFileName = `${folderName || "images"}_${Date.now()}.zip`;
        // const zipPath = path.join(process.cwd(), "public", "downloads", zipFileName);
    
        // const output = fs.createWriteStream(zipPath);
        // const archive = archiver("zip", { zlib: { level: 9 } });
    
        // archive.pipe(output);
    
        // for (const [i, url] of propertyToAdd.imageUrls.entries()) {
        //   const res = await fetch(url);
        //   if (!res.ok) throw new Error(`Failed to fetch ${url}`);
    
        //   const buffer = Buffer.from(arrayBuffer);
        //   // Add to a folder inside zip
        //   archive.append(buffer, { name: `/image_${i + 1}.jpg` });
        // }
    
        // await archive.finalize();

        // const savedFiles: string[] = [];
        // const bufferFiles = Buffer.from(arrayBuffer);
        // const fileName = `image_${Date.now()}_${Math.random()
        //   .toString(36)
        //   .substring(7)}.${ext}`;
  
        // const filePath = path.join(process.cwd(), "public", "downloads", fileName);
        // fs.writeFileSync(filePath, bufferFiles);
  
        // savedFiles.push(`/downloads/${key}`);
      }

      // Step 2 Create property
      return prisma.property.create({
        data: {
          id: idOfpropertyToAdd,
          projectPropertyCode: null,

          status: "pending",
          whenAvailable: "",
          isAcceptShortTerm: false,

          addressNumber: propertyToAdd.addressNumber || "",
          bedRoom: propertyToAdd.bedRoom || 0,
          bathRoom: propertyToAdd.bathRoom || 0,
          roomSize: propertyToAdd.roomSize.toString() || "",
          floor: propertyToAdd.floor.toString() || "",
          building: propertyToAdd.building || "",
          roomType: "Condo",
          isPetFriendly: propertyToAdd.isPetFriendly || false,
          carPark: propertyToAdd.carPark || 0,
          imageUrls: uploaded.map((img) => img.s3Url),
          roomAmenities: propertyToAdd.roomAmenities || [],

          rentalRate: propertyToAdd.rentalRate || null,
          sellPrice: propertyToAdd.sellPrice || null,

          phone: propertyToAdd.phone || null,
          lineId: propertyToAdd.lineId || null,
          fbUser: propertyToAdd.fbUser || null,

          isOwner: propertyToAdd.isOwner || true,
          linkPost: propertyToAdd.linkPost || "",

          note: propertyToAdd.note || "",
          originalMessage: propertyToAdd.originalMessage || "",
          messageToPost: propertyToAdd.messageToPost || "",

          projectCode: 0,
        }
      })
    })
 
    await Promise.all(createProperties);

    return NextResponse.json(
      { message: "Properties created successfully" },
      { status: 201 }
    );
  } catch (err: any) {
    return NextResponse.json(
      { error: "Upload failed", detail: err.message },
      { status: 500 }
    );
  }
}


