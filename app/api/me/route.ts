
import { prisma } from "@/lib/prisma";
import { currentUser } from "@clerk/nextjs/server";

export async function GET() {
  const user = await currentUser();
  if (!user) return Response.json({ error: "Not signed in" }, { status: 401 });

  let dbUser = await prisma.user.findUnique({
    where: { clerkId: user.id },
  });

  if (!dbUser) {
    const lastUser = await prisma.user.findFirst({
      orderBy: { lineCode: "desc" },
    });
    const nextLineCode = lastUser ? lastUser.lineCode + 1 : 2025;
    dbUser = await prisma.user.create({
      data: {
        clerkId: user.id,
        email: user.emailAddresses[0].emailAddress,
        firstName: user.firstName ?? "",
        lastName: user.lastName ?? "",
        lineCode: nextLineCode,
      },
    });
  }

  return Response.json(dbUser);
}
