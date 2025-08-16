import { type NextRequest, NextResponse } from "next/server"

interface SchedulePagePostRequest {
  message: string
  scheduledTime: string
  imageIds?: string[]
}

export async function POST(request: NextRequest) {
  try {
    const body: SchedulePagePostRequest = await request.json()
    const { message, scheduledTime, imageIds = [] } = body

    if (!message || !scheduledTime) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 })
    }

    const accessToken = process.env.FACEBOOK_USER_ACCESS_TOKEN
    const pageId = process.env.FACEBOOK_PAGE_ID

    if (!accessToken || !pageId) {
      return NextResponse.json({ error: "Facebook credentials not configured" }, { status: 500 })
    }

    // Convert scheduled time to Unix timestamp
    const publishTime = Math.floor(new Date(scheduledTime).getTime() / 1000)

    try {
      // Prepare post data for Facebook Page
      const postData: any = {
        message,
        published: false, // Set to false for scheduled posts
        scheduled_publish_time: publishTime,
        access_token: accessToken,
      }

      // Add images if provided
      if (imageIds.length > 0) {
        if (imageIds.length === 1) {
          postData.object_attachment = imageIds[0]
        } else {
          // For multiple images, use attached_media
          postData.attached_media = imageIds.map((id) => ({ media_fbid: id }))
        }
      }

      // Make API call to Facebook Graph API for Page feed
      const response = await fetch(`https://graph.facebook.com/v18.0/${pageId}/feed`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(postData),
      })

      const result = await response.json()

      if (response.ok) {
        return NextResponse.json({
          success: true,
          message: "Page post scheduled successfully",
          postId: result.id,
        })
      } else {
        return NextResponse.json(
          {
            success: false,
            error: result.error?.message || "Failed to schedule page post",
          },
          { status: 400 },
        )
      }
    } catch (error) {
      return NextResponse.json(
        {
          success: false,
          error: error instanceof Error ? error.message : "Unknown error",
        },
        { status: 500 },
      )
    }
  } catch (error) {
    console.error("Error scheduling Facebook page post:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
