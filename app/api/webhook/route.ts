import { Webhook } from "svix";
import { headers } from "next/headers";
// import {prisma} from "@/lib/prisma";

import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma"; // your prisma client instance
import { auth } from "@clerk/nextjs/server"; // Clerk auth helper

export async function POST(req: Request) {
  try {
    // Authenticate Clerk user
    const { userId } = await auth();
    console.log(userId, "User ID from Clerk");
    if (!userId) {

      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // Parse request body
    const body = await req.json();
    const { email, name } = body;

    // Check if user already exists
    const existingUser = await prisma.user.findUnique({
      where: { clerkId: userId },
    });

    if (existingUser) {
      return NextResponse.json(
        { message: "User already exists", user: existingUser },
        { status: 200 }
      );
    }

    // Create user
    const newUser = await prisma.user.create({
      data: {
        clerkId: userId,
        email,
        // name: name || `${body.first_name || ""} ${body.last_name || ""}`.trim(),
      },
    });

    return NextResponse.json(
      { message: "User created", user: newUser },
      { status: 201 }
    );
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }

  // const payload = await req.json();

  // const { id, email, first_name, last_name } = payload.data;

  // await prisma.user.upsert({
  //   where: { clerkId: id },
  //   update: {
  //     email: email,
  //   //   name: `${first_name || ""} ${last_name || ""}`.trim(),
  //     // imageUrl: image_url,
  //   },
  //   create: {
  //     clerkId: id,
  //     email: email,
  //   //   name: `${first_name || ""} ${last_name || ""}`.trim(),
  //     // imageUrl: image_url,
  //   },
  // });

  // return new Response("OK", { status: 200 });
}
