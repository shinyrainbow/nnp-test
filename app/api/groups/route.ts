import { type NextRequest, NextResponse } from "next/server"

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const accessToken = searchParams.get("access_token")

  if (!accessToken) {
    return NextResponse.json({ error: "Access token required" }, { status: 401 })
  }

  try {
    // Get user's groups
    const response = await fetch(
      `https://graph.facebook.com/v18.0/me/groups?access_token=${accessToken}&fields=id,name,description,privacy,member_count`,
    )
    const data = await response.json()

    if (data.error) {
      return NextResponse.json({ error: data.error }, { status: 400 })
    }

    return NextResponse.json(data)
  } catch (error) {
    console.error("Error fetching groups:", error)
    return NextResponse.json({ error: "Failed to fetch groups" }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const { groupUrl, accessToken } = await request.json()

    if (!groupUrl || !accessToken) {
      return NextResponse.json({ error: "Group URL and access token required" }, { status: 400 })
    }

    // Extract group ID from URL
    const groupIdMatch = groupUrl.match(/groups\/(\d+)/)
    if (!groupIdMatch) {
      return NextResponse.json({ error: "Invalid Facebook group URL" }, { status: 400 })
    }

    const groupId = groupIdMatch[1]

    // Get group information
    // const response = await fetch(
    //   `https://graph.facebook.com/v18.0/${groupId}?access_token=${accessToken}&fields=id,name,description,privacy,member_count`,
    // )
    // const groupData = await response.json()

    // if (groupData.error) {
    //   return NextResponse.json({ error: groupData.error }, { status: 400 })
    // }

    return NextResponse.json({
      // id: groupData.id,
      // name: groupData.name,
      // description: groupData.description,
      // privacy: groupData.privacy,
      // memberCount: groupData.member_count,
      // url: groupUrl,
      id: "testId",
      name: "testName",
      description: "testDesc",
      privacy: "UNKNOWN",
      memberCount: 0,
      url: groupUrl,
    })
  } catch (error) {
    console.error("Error adding group: 55555", error)
    return NextResponse.json({ error: "Failed to add group" }, { status: 500 })
  }
}
