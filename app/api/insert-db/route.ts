import { PrismaClient } from "@prisma/client";
import { randomUUID } from "crypto";
import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";

// const prisma = new PrismaClient();

export async function POST() {
  try {
    const prisma = new PrismaClient();

    const filePath = path.resolve(
      process.cwd(),
      "mock",
      "data",
      "buy-sell-7001-to-7500-with-projectcode.json"
    );
    const raw = fs.readFileSync(filePath, "utf-8");
    const data = JSON.parse(raw);

    await prisma.property.createMany({
      data,
      skipDuplicates: true,
    });

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
