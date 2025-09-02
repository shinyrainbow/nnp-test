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

const defaultFormat = `{emoji:projectNameEn} {projectName} - Room {roomNumber}

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
    const neonUserDb = await prisma.user.findFirst({
      where: {
        clerkId: userId
      }
    })

    // Neon userId
    const postTemplate = await prisma.postTemplate.findFirst({
      where: {
        userId: neonUserDb?.id,
      },
    });

    return NextResponse.json({
      templateId: postTemplate?.id,
      template: postTemplate?.template,
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
