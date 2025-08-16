// // Facebook API utility functions
// export interface FacebookGroup {
//   id: string
//   name: string
//   description?: string
//   privacy: string
//   memberCount?: number
//   url: string
// }

// export interface ScheduledPost {
//   id: string
//   content: string
//   scheduledTime: string
//   groupIds: string[]
//   images: string[]
//   status: "scheduled" | "posted" | "failed" | "cancelled"
//   createdAt: string
// }

// export class FacebookAPI {
//   private accessToken: string

//   constructor(accessToken: string) {
//     this.accessToken = accessToken
//   }

//   // async authenticateUser(): Promise<string> {
//   //   const response = await fetch("/api/auth/facebook")
//   //   const data = await response.json()

//   //   if (data.authUrl) {
//   //     // Redirect user to Facebook auth
//   //     window.location.href = data.authUrl
//   //     return ""
//   //   }

//   //   return data.access_token
//   // }

//   async addGroup(groupUrl: string): Promise<FacebookGroup> {
//     const response = await fetch("/api/groups", {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//       },
//       body: JSON.stringify({
//         groupUrl,
//         accessToken: this.accessToken,
//       }),
//     })

//     if (!response.ok) {
//       const error = await response.json()
//       throw new Error(error.error || "Failed to add group")
//     }

//     return response.json()
//   }

//   async getUserGroups(): Promise<FacebookGroup[]> {
//     const response = await fetch(`/api/groups?access_token=${this.accessToken}`)

//     if (!response.ok) {
//       const error = await response.json()
//       throw new Error(error.error || "Failed to fetch groups")
//     }

//     const data = await response.json()
//     return data.data || []
//   }

//   async schedulePost(content: string, groupIds: string[], images: string[], scheduledTime?: string): Promise<any> {
//     const response = await fetch("/api/posts", {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//       },
//       body: JSON.stringify({
//         content,
//         groupIds,
//         images,
//         accessToken: this.accessToken,
//         scheduledTime,
//       }),
//     })

//     if (!response.ok) {
//       const error = await response.json()
//       throw new Error(error.error || "Failed to schedule post")
//     }

//     return response.json()
//   }

//   async getScheduledPosts(groupId?: string): Promise<ScheduledPost[]> {
//     const url = groupId
//       ? `/api/posts?access_token=${this.accessToken}&group_id=${groupId}`
//       : `/api/posts?access_token=${this.accessToken}`

//     const response = await fetch(url)

//     if (!response.ok) {
//       const error = await response.json()
//       throw new Error(error.error || "Failed to fetch scheduled posts")
//     }

//     const data = await response.json()
//     return data.data || []
//   }

//   async cancelPost(postId: string): Promise<void> {
//     const response = await fetch(`/api/posts/${postId}?access_token=${this.accessToken}`, {
//       method: "DELETE",
//     })

//     if (!response.ok) {
//       const error = await response.json()
//       throw new Error(error.error || "Failed to cancel post")
//     }
//   }
// }
