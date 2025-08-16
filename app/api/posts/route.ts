import { type NextRequest, NextResponse } from "next/server"

export async function POST(request: NextRequest) {
  try {
    const { content, groupIds, images, accessToken, scheduledTime } = await request.json()

    if (!content || !groupIds || !accessToken) {
      return NextResponse.json({ error: "Content, group IDs, and access token required" }, { status: 400 })
    }

    const results = []

    for (const groupId of groupIds) {
      try {
        const postData: any = {
          message: content,
          access_token: accessToken, // Now using page access token passed from frontend
        }

        // Handle image uploads if provided
        if (images && images.length > 0) {
          // For multiple images, we need to create a multi-photo post
          if (images.length > 1) {
            const photoIds = []

            // Upload each image first
            for (const image of images) {
              const photoResponse = await fetch(`https://graph.facebook.com/v18.0/${groupId}/photos`, {
                method: "POST",
                headers: {
                  "Content-Type": "application/json",
                },
                body: JSON.stringify({
                  url: image,
                  published: false,
                  access_token: accessToken,
                }),
              })

              const photoData = await photoResponse.json()
              if (photoData.id) {
                photoIds.push({ media_fbid: photoData.id })
              }
            }

            postData.attached_media = photoIds
          } else {
            // Single image
            postData.link = images[0]
          }
        }

        // If scheduled time is provided, use it
        if (scheduledTime) {
          const scheduledTimestamp = Math.floor(new Date(scheduledTime).getTime() / 1000)
          postData.scheduled_publish_time = scheduledTimestamp
          postData.published = false
        }

        const response = await fetch(`https://graph.facebook.com/v18.0/${groupId}/feed`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(postData),
        })

        const result = await response.json()

        results.push({
          groupId,
          success: !result.error,
          postId: result.id,
          error: result.error,
        })
      } catch (error) {
        results.push({
          groupId,
          success: false,
          error: "Failed to post to group",
        })
      }
    }

    return NextResponse.json({ results })
  } catch (error) {
    console.error("Error creating posts:", error)
    return NextResponse.json({ error: "Failed to create posts" }, { status: 500 })
  }
}

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const accessToken = searchParams.get("access_token")
  const groupId = searchParams.get("group_id")

  if (!accessToken) {
    return NextResponse.json({ error: "Access token required" }, { status: 401 })
  }

  try {
    const endpoint = groupId
      ? `https://graph.facebook.com/v18.0/${groupId}/scheduled_posts`
      : `https://graph.facebook.com/v18.0/me/scheduled_posts`

    const response = await fetch(
      `${endpoint}?access_token=${accessToken}&fields=id,message,scheduled_publish_time,created_time`,
    )
    const data = await response.json()

    if (data.error) {
      return NextResponse.json({ error: data.error }, { status: 400 })
    }

    return NextResponse.json(data)
  } catch (error) {
    console.error("Error fetching scheduled posts:", error)
    return NextResponse.json({ error: "Failed to fetch scheduled posts" }, { status: 500 })
  }
}
