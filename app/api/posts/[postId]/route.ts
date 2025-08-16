import { type NextRequest, NextResponse } from "next/server"

export async function DELETE(request: NextRequest, { params }: { params: { postId: string } }) {
  try {
    const { searchParams } = new URL(request.url)
    const accessToken = searchParams.get("access_token")

    if (!accessToken) {
      return NextResponse.json({ error: "Access token required" }, { status: 401 })
    }

    const { postId } = params

    // Delete the scheduled post
    const response = await fetch(`https://graph.facebook.com/v18.0/${postId}?access_token=${accessToken}`, {
      method: "DELETE",
    })

    const result = await response.json()

    if (result.error) {
      return NextResponse.json({ error: result.error }, { status: 400 })
    }

    return NextResponse.json({
      success: true,
      message: "Post cancelled successfully",
    })
  } catch (error) {
    console.error("Error cancelling post:", error)
    return NextResponse.json({ error: "Failed to cancel post" }, { status: 500 })
  }
}

export async function GET(request: NextRequest, { params }: { params: { postId: string } }) {
  try {
    const { searchParams } = new URL(request.url)
    const accessToken = searchParams.get("access_token")

    if (!accessToken) {
      return NextResponse.json({ error: "Access token required" }, { status: 401 })
    }

    const { postId } = params

    // Get post details
    const response = await fetch(
      `https://graph.facebook.com/v18.0/${postId}?access_token=${accessToken}&fields=id,message,scheduled_publish_time,created_time,status_type`,
    )
    const data = await response.json()

    if (data.error) {
      return NextResponse.json({ error: data.error }, { status: 400 })
    }

    return NextResponse.json(data)
  } catch (error) {
    console.error("Error fetching post:", error)
    return NextResponse.json({ error: "Failed to fetch post" }, { status: 500 })
  }
}
