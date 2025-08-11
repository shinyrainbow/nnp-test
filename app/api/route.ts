import { NextResponse } from "next/server"

const projects = [
  { id: 1, projectName: "Siam Sky Tower", projectLocation: ["Rama 9", "Phrom Phong"] },
  { id: 2, projectName: "Chao Phraya Residence", projectLocation: ["Riverside", "Charoen Nakhon"] },
  { id: 3, projectName: "Bangkok Central Condo", projectLocation: ["Asoke", "Sukhumvit"] },
  { id: 4, projectName: "Riverside Park", projectLocation: ["Rama 3", "Chong Nonsi"] },
  { id: 5, projectName: "Lumphini Suites", projectLocation: ["Lumphini", "Silom"] },
]

export async function GET() {
  try {
    return NextResponse.json({
      success: true,
      data: projects,
      total: projects.length,
    })
  } catch (error) {
    return NextResponse.json({ success: false, error: "Failed to fetch projects" }, { status: 500 })
  }
}
