
import { currentUser } from "@clerk/nextjs/server";
import { randomUUID } from "crypto";
import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();
const defaultTemplate = `{emoji:projectNameEn} {projectNameEn} - Room {roomNumber}

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

export async function GET() {
  try {
    const user = await currentUser();

    if (!user) {
      return NextResponse.json({
        data: {

        },
      });
    }

    let dbUser = await prisma.user.findUnique({
      where: { clerkId: user.id },
    });

    if (!dbUser) {
      dbUser = await prisma.user.create({
        data: {
          clerkId: user.id,
          email: user.emailAddresses.length
            ? user.emailAddresses[0].emailAddress
            : "",
          firstName: user.firstName ?? "",
          lastName: user.lastName ?? "",
          isPaid: false,
          currentExpireDate: null,
          role: "freeUser",
        },
      });

      // save default post template
      await prisma.postTemplate.create({
        data: {
          id: randomUUID(),
          userId: dbUser.id,
          template: defaultTemplate,
        },
      });
    }

    return NextResponse.json({
      data: dbUser,
    });
  } catch (error) {
    console.error("GET /me error:", error);
    return NextResponse.json(
      { error: "Failed to fetch user data" },
      { status: 500 }
    );
  }
}
