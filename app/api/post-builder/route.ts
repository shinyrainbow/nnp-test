import { PrismaClient } from "@prisma/client";
import { randomUUID } from "crypto";
import { type NextRequest, NextResponse } from "next/server";
// import { auth } from "@clerk/nextjs";
import { clerkClient, auth } from "@clerk/nextjs/server";

interface PropertyTemplate {
  id: string;
  name: string;
  format: string;
}
const prisma = new PrismaClient();

// POST - Create a new template
export async function GET(request: NextRequest) {
  try {
    //   const { name, format } = await request.json()
    const { userId } = await auth(); // Get authenticated user ID

    if (!userId) {
      return new Response(JSON.stringify({ error: "Unauthorized" }), {
        status: 401,
      });
    }

    const template = await prisma.postTemplate.findFirst({
      where: {
        // id: randomUUID(),
        userId,
        // template: format
      },
    });

    return NextResponse.json({
      template: template,
      message: "Get Template successfully",
    });
  } catch (err) {}
}

// POST - Create a new template
export async function PUT(request: NextRequest) {
  try {
    const { name, format } = await request.json();
    const { userId } = await auth(); // Get authenticated user ID

    if (!userId) {
      return new Response(JSON.stringify({ error: "Unauthorized" }), {
        status: 401,
      });
    }

    if (!name || !format) {
      return NextResponse.json(
        { error: "Name and format are required" },
        { status: 400 }
      );
    }

    const newTemplate: PropertyTemplate = {
      id: Date.now().toString(),
      name: name.trim(),
      format: format.trim(),
    };

    await prisma.postTemplate.create({
      data: {
        id: randomUUID(),
        userId,
        template: format,
      },
    });

    return NextResponse.json({
      template: newTemplate,
      message: "Template created successfully",
    });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to create template" },
      { status: 500 }
    );
  }
}
