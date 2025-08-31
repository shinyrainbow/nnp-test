import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma"; // adjust to your prisma client path
import { RoomType } from "@prisma/client";

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

export async function GET(req: NextRequest) {
  try {
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

    const roomType = searchParams.get("roomType");
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

    console.log("WHAT>>>>>>", projects);
    const projectCodes = projects.map((p) => p.projectCode);

    const roomTypeFilter: any = {};
    if (roomType && roomType !== "all") {
      const types = (roomType as string)
        .split(",")
        .filter((t) => Object.values(RoomType).includes(t as RoomType)) // ✅ validate
        .map((t) => t as RoomType);

      if (types.length > 0) {
        roomTypeFilter.roomType = { in: types };
      }
    }

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
          ...roomTypeFilter,
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
