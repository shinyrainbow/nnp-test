import { prisma } from "@/lib/prisma";
import { currentUser } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const user = await currentUser();
    if (!user)
      return Response.json({ error: "Not signed in" }, { status: 401 });

    let dbUser = await prisma.user.findUnique({
      where: { clerkId: user.id },
      select: {
        lineCode: true,
        isPaid: true,
        isEnableLine: true,
      }
    });

    return NextResponse.json(dbUser);
  } catch (err) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
