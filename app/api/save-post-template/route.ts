import { PrismaClient } from "@prisma/client";
import { randomUUID } from "crypto";
import { type NextRequest, NextResponse } from "next/server";
import {  auth } from "@clerk/nextjs/server"

const prisma = new PrismaClient();

export async function PUT(request: NextRequest) {
    try {
      const { name, format } = await request.json();
      const { userId } = await auth(); // Get authenticated user ID
  
      if (!userId) {
        return new Response(JSON.stringify({ error: "Unauthorized" }), {
          status: 401,
        });
      }

      await prisma.postTemplate.create({
        data: {
          id: randomUUID(),
          userId,
          template: format,
        },
      });
  
      return NextResponse.json({
        template: format,
        message: "Template saved successfully",
      });
    } catch (error) {
      return NextResponse.json(
        { error: "Failed to save template" },
        { status: 500 }
      );
    }
  }
  