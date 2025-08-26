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
    const roomType = searchParams.get("roomType");
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

    const page = parseInt(searchParams.get("page") || "1", 10);
    const limit = parseInt(searchParams.get("limit") || "10", 10);
    const skip = (page - 1) * limit;

    console.log("projectName, ", projectName, 444444444)
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

    // console.log(projects, 1111111)
    const projectCodes = projects.map((p) => p.projectCode);
    const where: any = {};
    if (roomType && roomType !== "all") {
      const types = (roomType as string)
        .split(",")
        .filter((t) => Object.values(RoomType).includes(t as RoomType)) // ✅ validate
        .map((t) => t as RoomType);

      if (types.length > 0) {
        where.roomType = { in: types };
      }
    }
    
    // Fetch properties
    const properties = await prisma.property.findMany({
      where: {
        ...where,
        ...(projectCodes.length > 0 ? { projectCode: { in: projectCodes } } : {}),
        // ...(roomType ? { roomType: roomType as any } : {}),
        // ...(roomType && roomType !== "all"
        //   ? { roomType: { in: roomTypeFilter.split(",") } }
        //   : {}), // no filter if "all"
      },
      skip,
      take: limit,
      include: {
        project: true,
      },
    });

    console.log("properties")
    // Post-filter by price + room size (since sellPrice is string)
    const filtered = properties.filter((p) => {
      const price = parsePrice(p.sellPrice || p.rentalRate || null);
      const size = parseRoomSize(p.roomSize || null);

      if (minPrice !== null && (price === null || price < minPrice)) return false;
      if (maxPrice !== null && (price === null || price > maxPrice)) return false;
      if (minSize !== null && (size === null || size < minSize)) return false;
      if (maxSize !== null && (size === null || size > maxSize)) return false;

      return true;
    });

    return NextResponse.json({
      page,
      limit,
      total: filtered.length,
      data: filtered,
    });
  } catch (err: any) {
    console.error(err);
    return NextResponse.json(
      { error: "Failed to fetch properties", details: err.message },
      { status: 500 }
    );
  }
}
