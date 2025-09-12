import { PrismaClient } from "@prisma/client";
import { randomUUID } from "crypto";
import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";

const prisma = new PrismaClient();

export async function GET() {
  try {
    const haha = await prisma.property.findMany({
      where: {
        projectCode: {
          equals: "P0000",
        },
      },
    });

    return NextResponse.json({ data: haha }, { status: 200 });
  } catch (err: any) {
    // return NextResponse.json({error: "Upload failed", detail: err.message}, {status: 500})
  }
}
export async function POST() {
  try {
    // const filePath = path.resolve(
    //   process.cwd(),
    //   "mock",
    //   "data",
    //   "buy-sell-7001-to-7500-with-projectcode.json"
    // );
    // const raw = fs.readFileSync(filePath, "utf-8");
    // const data = JSON.parse(raw);
    // await prisma.property.createMany({
    //   data,
    //   skipDuplicates: true,
    // });
    // return NextResponse.json(
    //   { message: "Properties created successfully" },
    //   { status: 201 }
    // );
  } catch (err: any) {
    return NextResponse.json(
      { error: "Upload failed", detail: err.message },
      { status: 500 }
    );
  }
}

export async function PUT() {
  try {
    const projects = [];

    for (let i = 0; i < 100; i++) {
      const codeNumber = 1021 + i;
      const projectCode = `P${codeNumber.toString()}`;

      projects.push({
        projectNameEn: `Project${projectCode}`,
        projectNameTh: "",
        projectCode,
        projectDescriptionEn: "",
        projectDescriptionTh: "",
        projectLocation: [],
        projectImageUrl: [],
        projectFacilities: [],
        addressNumberRoad: "",
        addressSubDistrict: "",
        addressDistrict: "",
        addressProvince: "",
        addressZipcode: "",
        completeYear: "",
        distanceToStation: [],
        priceRange: "",
      });
    }

    // Bulk insert into Prisma
    const result = await prisma.project.createMany({
      data: projects,
      skipDuplicates: true, // avoid duplicate projectCode if exists
    });

    return NextResponse.json(
      { message: "Projects created successfully", result },
      { status: 201 }
    );
  } catch (err: any) {
    return NextResponse.json(
      { error: "Upload failed", detail: err.message },
      { status: 500 }
    );
  }
}
