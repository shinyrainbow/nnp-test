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
    format: `{emoji:projectName} {projectName} - Room {roomNumber}

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

// GET - Fetch all templates
export async function GET() {
  try {
    return NextResponse.json({ templates })
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch templates" }, { status: 500 })
  }
}

// POST - Create a new template
export async function POST(request: NextRequest) {
  try {
    const { name, format } = await request.json()

    if (!name || !format) {
      return NextResponse.json({ error: "Name and format are required" }, { status: 400 })
    }

    const newTemplate: PropertyTemplate = {
      id: Date.now().toString(),
      name: name.trim(),
      format: format.trim(),
    }

    templates.push(newTemplate)

    return NextResponse.json({
      template: newTemplate,
      message: "Template created successfully",
    })
  } catch (error) {
    return NextResponse.json({ error: "Failed to create template" }, { status: 500 })
  }
}
