import { PrismaClient } from "@prisma/client";
import { randomUUID } from "crypto";
import { type NextRequest, NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";

const prisma = new PrismaClient();

export async function GET() {
  try {
    const { userId } = await auth(); // Get authenticated user ID
    if (!userId) {
      return new Response(JSON.stringify({ error: "Unauthorized" }), {
        status: 401,
      });
    }
    const userDb = await prisma.user.findFirst({
      where: {
        clerkId: userId,
      },
    });

    const neonUserDb = await prisma.user.findFirst({
      where: {
        clerkId: userId,
      },
    });
     // if user is freeUser
     if (!!neonUserDb && !neonUserDb.isPaid) {
     return NextResponse.json({
        contracts: [],
        message: "GET Purchase and sale contract successfully",
      });
    }

    const contracts = await prisma.purchaseAndSaleContract.findMany({
      where: {
        userId: userDb?.id,
      },
    });
    return NextResponse.json({
      contracts: !contracts ? [] : contracts,
      message: "GET Purchase and sale contract successfully",
    });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to get contracts" },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const { contractData } = await request.json();
    const { userId } = await auth(); // Get authenticated user ID

    if (!userId) {
      return new Response(JSON.stringify({ error: "Unauthorized" }), {
        status: 401,
      });
    }
    const userDb = await prisma.user.findFirst({
      where: {
        clerkId: userId,
      },
    });

    // if user is freeUser
    if (!!userDb && !userDb.isPaid) {
      return new Response(JSON.stringify({ error: "Unauthorized" }), {
        status: 401,
      });
    }
    if (!userDb || !userDb?.id) {
      return new Response(JSON.stringify({ error: "Unauthorized" }), {
        status: 401,
      });
    }

    const {
      language,
      contractPlace,
      contractDate,

      sellerName,
      sellerAge,
      sellerId,
      sellerAddress,
      sellerPhone,

      buyerName,
      buyerAge,
      buyerId,
      buyerAddress,
      buyerPhone,

      projectName,
      projectFloor,
      projectAddressNo,
      projectAddress,

      amenities,
      chanot,
      deposit,
      depositText,
      size,
      sellPrice,
      priceText,
      remainingPrice,
      remainingPriceText,

      subDistrict,
      district,
      province,

      speTax,
      tax,
      mortgage,
      transfer,
      stamp,

      note1,
      note2,
    } = contractData;
    await prisma.purchaseAndSaleContract.create({
      data: {
        id: randomUUID(),
        language,
        contractPlace,
        contractDate,

        sellerName,
        sellerAge,
        sellerId,
        sellerAddress,
        sellerPhone,

        buyerName,
        buyerAge,
        buyerId,
        buyerAddress,
        buyerPhone,

        projectName,
        projectFloor,
        projectAddressNo,
        projectAddress,

        amenities,
        chanot,
        deposit,
        depositText,
        size,
        sellPrice,
        priceText,
        remainingPrice,
        remainingPriceText,

        subDistrict,
        district,
        province,

        speTax,
        tax,
        mortgage,
        transfer,
        stamp,

        note1,
        note2,
        userId: userDb.id,
      },
    });

    return NextResponse.json({
      message: "Purchase and sale contract saved successfully",
    });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to save purchase and sale contract" },
      { status: 500 }
    );
  }
}
