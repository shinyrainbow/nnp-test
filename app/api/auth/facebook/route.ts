// import { type NextRequest, NextResponse } from "next/server"

// // Facebook App credentials - these should be in environment variables
// const FACEBOOK_APP_ID = process.env.FACEBOOK_APP_ID
// const FACEBOOK_APP_SECRET = process.env.FACEBOOK_APP_SECRET
// const REDIRECT_URI = process.env.FACEBOOK_REDIRECT_URI || "http://localhost:3000/api/auth/facebook/callback"

// export async function GET(request: NextRequest) {
//   const { searchParams } = new URL(request.url)
//   const code = searchParams.get("code")

//   if (!code) {
//     // Redirect to Facebook OAuth
//     const facebookAuthUrl = `https://www.facebook.com/v18.0/dialog/oauth?client_id=${FACEBOOK_APP_ID}&redirect_uri=${encodeURIComponent(REDIRECT_URI)}&scope=pages_manage_posts,pages_read_engagement,groups_access_member_info&response_type=code`

//     return NextResponse.json({
//       authUrl: facebookAuthUrl,
//       message: "Redirect to Facebook for authentication",
//     })
//   }

//   try {
//     // Exchange code for access token
//     const tokenResponse = await fetch(
//       `https://graph.facebook.com/v18.0/oauth/access_token?client_id=${FACEBOOK_APP_ID}&redirect_uri=${encodeURIComponent(REDIRECT_URI)}&client_secret=${FACEBOOK_APP_SECRET}&code=${code}`,
//     )

//     const tokenData = await tokenResponse.json()

//     if (tokenData.error) {
//       return NextResponse.json({ error: tokenData.error }, { status: 400 })
//     }

//     // Get long-lived token
//     const longLivedTokenResponse = await fetch(
//       `https://graph.facebook.com/v18.0/oauth/access_token?grant_type=fb_exchange_token&client_id=${FACEBOOK_APP_ID}&client_secret=${FACEBOOK_APP_SECRET}&fb_exchange_token=${tokenData.access_token}`,
//     )

//     const longLivedTokenData = await longLivedTokenResponse.json()

//     return NextResponse.json({
//       access_token: longLivedTokenData.access_token,
//       expires_in: longLivedTokenData.expires_in,
//       message: "Authentication successful",
//     })
//   } catch (error) {
//     console.error("Facebook auth error:", error)
//     return NextResponse.json({ error: "Authentication failed" }, { status: 500 })
//   }
// }
