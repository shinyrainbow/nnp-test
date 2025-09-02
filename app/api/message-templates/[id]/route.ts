import { type NextRequest, NextResponse } from "next/server"

interface PropertyTemplate {
  id: string
  name: string
  format: string
}

// In-memory storage for demo purposes
// In production, you would use a database
const templates: PropertyTemplate[] = [
  {
    id: "1",
    name: "Standard Property Post",
    format: `{emoji:projectNameEn} {projectName} - Room {roomNumber}

{emoji:location} {location}
{emoji:roomType} {roomType}
{emoji:roomSize} {roomSize} sqm
{emoji:bedRoom} {bedRoom} bedroom(s)
{emoji:bathRoom} {bathRoom} bathroom(s)
{emoji:carPark} {carPark} parking space(s)

{emoji:rentalRate} Rent: ฿{rentalRate}/month
{emoji:sellPrice} Sale: ฿{sellPrice}

{emoji:phone} Phone: {phone}
{emoji:lineId} Line: {lineId}`,
  },
]

// PUT - Update a template
export async function PUT(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const { name, format } = await request.json()
    const templateId = params.id

    const templateIndex = templates.findIndex((t) => t.id === templateId)

    if (templateIndex === -1) {
      return NextResponse.json({ error: "Template not found" }, { status: 404 })
    }

    if (name !== undefined) {
      templates[templateIndex].name = name.trim()
    }

    if (format !== undefined) {
      templates[templateIndex].format = format.trim()
    }

    return NextResponse.json({
      template: templates[templateIndex],
      message: "Template updated successfully",
    })
  } catch (error) {
    return NextResponse.json({ error: "Failed to update template" }, { status: 500 })
  }
}

// DELETE - Delete a template
export async function DELETE(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const templateId = params.id

    const templateIndex = templates.findIndex((t) => t.id === templateId)

    if (templateIndex === -1) {
      return NextResponse.json({ error: "Template not found" }, { status: 404 })
    }

    if (templates.length === 1) {
      return NextResponse.json({ error: "Cannot delete the last template" }, { status: 400 })
    }

    templates.splice(templateIndex, 1)

    return NextResponse.json({
      message: "Template deleted successfully",
    })
  } catch (error) {
    return NextResponse.json({ error: "Failed to delete template" }, { status: 500 })
  }
}
