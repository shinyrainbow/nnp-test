import { NextResponse } from "next/server";
import { randomUUID } from "crypto";
import { auth } from "@clerk/nextjs/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function GET() {
  try {
    const { userId } = await auth();

    if (!userId) {
      return new Response(JSON.stringify({ error: "Unauthorized" }), {
        status: 401,
      });
    }

    const neonUserDb = await prisma.user.findFirst({
      where: {
        clerkId: userId,
      },
    });
     // if user is freeUser
     if (!!neonUserDb && !neonUserDb.isPaid) {
     return NextResponse.json([])
    }

    const appointments = await prisma.appointment.findMany({
      orderBy: { createdAt: "desc" },
    });
    return NextResponse.json(appointments);
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch appointments" },
      { status: 500 }
    );
  }
}

export async function POST(req: Request) {
  try {
    const { userId } = await auth();

    if (!userId) {
      return new Response(JSON.stringify({ error: "Unauthorized" }), {
        status: 401,
      });
    }
    const neonUserDb = await prisma.user.findFirst({
      where: {
        clerkId: userId,
      },
    });

    // if not found user
    if (!neonUserDb) {
      return new Response(JSON.stringify({ error: "Unauthorized" }), {
        status: 401,
      });
    }

    // if user is freeUser
    if (!!neonUserDb && !neonUserDb.isPaid) {
      return new Response(JSON.stringify({ error: "Unauthorized" }), {
        status: 401,
      });
    }

    const body = await req.json();
    const { appointmentType, clientName, clientContact, date, time, notes } =
      body;

    if (!appointmentType || !clientName || !date || !time) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    const newAppointment = await prisma.appointment.create({
      data: {
        id: randomUUID(),
        appointmentType,
        clientName,
        clientContact,
        date: new Date(date),
        time,
        notes,
        userId: neonUserDb?.id,
      },
    });

    return NextResponse.json(newAppointment, { status: 201 });
  } catch (error) {
    console.error("POST /appointments error:", error);
    return NextResponse.json(
      { error: "Failed to create appointment" },
      { status: 500 }
    );
  }
}
