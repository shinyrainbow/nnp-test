import { PrismaClient } from "@prisma/client";
import { randomUUID } from "crypto";
import { type NextRequest, NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";

const prisma = new PrismaClient();

export async function GET() {
  try {
    const { userId } = await auth();

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

    const contracts = await prisma.rentalContract.findMany({
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
    if (!userDb || !userDb?.id) {
      return new Response(JSON.stringify({ error: "Unauthorized" }), {
        status: 401,
      });
    }
    const {
      language,
      contractPlace,
      contractDate,

      ownerName,
      ownerAge,
      ownerId,
      ownerAddress,
      ownerPhone,

      tenantName,
      tenantAge,
      tenantId,
      tenantAddress,
      tenantPhone,

      projectName,
      projectFloor,
      projectAddress,

      rentalPeriod,
      advance,
      deposit,
      tax,
      commonFee,
      bills,
      rentalRate,
      rentDue,

      dateReceive,
      startDate,

      subDistrict,
      district,
      province,
    } = contractData;

    const hello = await prisma.rentalContract.findMany();
    console.log(hello, 9999999999999);
    const contractCreated = await prisma.rentalContract.create({
      data: {
        id: randomUUID(),
        language: "TH",
        contractPlace,
        contractDate,

        ownerName,
        ownerAge,
        ownerId,
        ownerAddress,
        ownerPhone,

        tenantName,
        tenantAge,
        tenantId,
        tenantAddress,
        tenantPhone,

        projectName,
        projectFloor,
        projectAddress,

        rentalPeriod,
        advance,
        deposit,
        tax,
        commonFee,
        bills,
        rentalRate,
        rentDue,

        dateReceive,
        startDate,

        subDistrict,
        district,
        province,

        userId: userDb.id,
      },
    });
    console.log(contractCreated, 3333);

    return NextResponse.json({
      message: "Rental contract saved successfully",
    });
  } catch (error) {
    console.log(error, 999999);
    return NextResponse.json(
      { error: "Failed to save template" },
      { status: 500 }
    );
  }
}
