import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";
import { properties } from '@/mock/properties'

const prisma = new PrismaClient();

export async function POST(req) {
  try {
    const createdProperties = properties.map((property, index) => {
      return prisma.project.create({
        data: {
            projectPropertyCode: property.projectPropertyCode,
            
            status: property.status,
            whenAvailable: property.whenAvailable,
            isAcceptShortTerm: property.isAcceptShortTerm,

            addressNumber: property.addressNumber,
            bedRoom: property.bedRoom,
            bathRoom: property.bathRoom,
            roomSize: property.roomSize,
            floor: property.floor,
            building: property.building,
            roomType: property.roomType,
            isPetFriendly: property.isPetFriendly,
            carPark: property.carPark,
            imageUrls: property.imageUrls,
            roomAmenities: property.roomAmenities,

            rentalRate: property.rentalRate,
            sellPrice: property.sellPrice,

            phone: property.phone,
            lineId: property.lineId,
            fbUrl: property.fbUrl,

            isOwner: property.isOwner,
            postUserFb: property.postUserFb,

            note: property.note,
            originalMessage: property.originalMessage,
            messageToPost: property.messageToPost,

            projectCode: property.projectCode,
        },
      });
    });

    await Promise.all(createdProperties);

    return NextResponse.json(
      { message: "Properties created successfully" },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error inserting properties:", error);

    return NextResponse.json(
      { message: "Error inserting properties", error: error.message },
      { status: 500 }
    );
  }
}
