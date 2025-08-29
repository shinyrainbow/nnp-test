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

const defaultFormat = `{emoji:projectName} {projectName} - Room {roomNumber}

{emoji:location} {location}
{emoji:roomType} {roomType}
{emoji:roomSize} {roomSize} sqm
{emoji:bedRoom} {bedRoom} bedroom(s)
{emoji:bathRoom} {bathRoom} bathroom(s)
{emoji:carPark} {carPark} parking space(s)

{emoji:rentalRate} Rent: ฿{rentalRate}/month
{emoji:sellPrice} Sale: ฿{sellPrice}

{emoji:phone} Phone: {phone}
{emoji:lineId} Line: {lineId}`;
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

    const postTemplate = await prisma.postTemplate.findFirst({
      where: {
        // id: randomUUID(),
        userId,
        // template: format
      },
    });

    let format = "";
    if (!postTemplate) {
      format = defaultFormat;
    } else {
      format = postTemplate.template;
    }
    return NextResponse.json({
      template: format,
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

    // if (!name || !format) {
    //   return NextResponse.json(
    //     { error: "Name and format are required" },
    //     { status: 400 }
    //   );
    // }

    // const newTemplate: PropertyTemplate = {
    //   id: Date.now().toString(),
    //   name: name.trim(),
    //   format: format.trim(),
    // };

    // await prisma.postTemplate.create({
    //   data: {
    //     id: randomUUID(),
    //     userId,
    //     template: format,
    //   },
    // });

    return NextResponse.json({
      template: format,
      message: "Template created successfully",
    });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to create template" },
      { status: 500 }
    );
  }
}
