
import { NextResponse } from "next/server";
import prisma from "@/lib/prisma"; // make sure prisma is set up

export async function DELETE(req: Request, { params }: { params: { id: string } }) {
  const { id } = params;

  try {
    // Check if appointment exists
    const existing = await prisma.appointment.findUnique({ where: { id } });
    if (!existing) {
      return NextResponse.json({ error: "Appointment not found" }, { status: 404 });
    }

    // Delete appointment
    await prisma.appointment.delete({ where: { id } });

    return NextResponse.json({ message: "Appointment deleted successfully" });
  } catch (error) {
    console.error("DELETE /appointments/[id] error:", error);
    return NextResponse.json({ error: "Failed to delete appointment" }, { status: 500 });
  }
}