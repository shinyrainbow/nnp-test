import { prisma } from "@/lib/prisma";
import { currentUser } from "@clerk/nextjs/server";
import { randomUUID } from "crypto";

const defaultTemplate = 
`{emoji:projectNameEn} {projectNameEn} - Room {roomNumber}

{emoji:location} {location}
{emoji:roomType} {roomType}
{emoji:roomSize} {roomSize} sqm
{emoji:bedRoom} {bedRoom} bedroom(s)
{emoji:bathRoom} {bathRoom} bathroom(s)
{emoji:carPark} {carPark} parking space(s)
        
{emoji:rentalRate} Rent: ฿{rentalRate}/month
{emoji:sellPrice} Sale: ฿{sellPrice}
        
{emoji:phone} Phone: {phone}
{emoji:lineId} Line: {lineId}`

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
    console.log(JSON.stringify(user), 9999)

    dbUser = await prisma.user.create({
      data: {
        clerkId: user.id,
        email: user.emailAddresses.length ? user.emailAddresses[0].emailAddress: "",
        firstName: user.firstName ?? "",
        lastName: user.lastName ?? "",
        lineCode: nextLineCode,
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

  return Response.json(dbUser);
}
