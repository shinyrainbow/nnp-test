import { NextResponse } from "next/server"
import { PrismaClient } from '@prisma/client';


const prisma = new PrismaClient();


export async function GET() {

  try {
    const projects = await prisma.project.findMany({
      select: {
        id: true,
        projectCode: true,
        projectNameEn: true,
        // projectNameTh: true,
        // projectLocation: true,
        // priceRange: true,
        // projectStatus: true,
        // developer: true,
        // completionDate: true,
        // totalUnits: true,
        // availableUnits: true,
      },
      orderBy: {
        projectCode: "asc",
      },
    })

    return NextResponse.json({
      success: true,
      data: projects,
      total: projects.length,
    })

  } catch (error) {
    return NextResponse.json({ success: false, error: "Failed to fetch projects" }, { status: 500 })
  }
}
