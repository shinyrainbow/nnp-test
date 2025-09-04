"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import { Badge } from "@/components/ui/badge"
import { Settings, Users, BarChart3, Clock, Plus, Calendar, CheckCircle, AlertCircle, Trash2 } from "lucide-react"

interface FacebookGroup {
  id: string
  name: string
  url: string
  members: number
  selected: boolean
}

interface ScheduledPost {
  id: string
  content: string
  images: string[]
  scheduledTime: string
  targetGroups: string[]
  status: "scheduled" | "posted" | "failed"
}

const Posts = () => {
  // Added Facebook configuration state
  const [userAccessToken, setUserAccessToken] = useState("EAAIyI6zLngUBPPQEkJ6jh90LaOxuBe0u0e3Sg2CVNZBK7EZAyMTcPcmajqqejZAlAvZAo7i9RYls43txQip9GVN6qlDiAVn319bZB79GeeoCjZB1Wfguo2sDQERkCROPrTUUmWlq8IhCbYjyqmmE6CDxAEMy09UM6dQ3BLMOkr1kpCjqAMkFYRZAMznacAGV6MX49EJK5uItxfZB801uFYBzKiIJ0D8VSEwRkhtSkyGLaJtyrgZDZD")
  const [pageId, setPageId] = useState("103007519246740")
  const [pageAccessToken, setPageAccessToken] = useState("")

  const [groups, setGroups] = useState<FacebookGroup[]>([
    {
      id: "1",
      name: "Digital Marketing Experts",
      url: "https://facebook.com/groups/digitalmarketing",
      members: 15420,
      selected: false,
    },
    {
      id: "2",
      name: "Social Media Growth",
      url: "https://facebook.com/groups/socialmediagrowth",
      members: 8930,
      selected: false,
    },
    {
      id: "3",
      name: "Content Creators Hub",
      url: "https://facebook.com/groups/contentcreators",
      members: 12650,
      selected: false,
    },
  ])

  const [scheduledPosts, setScheduledPosts] = useState<ScheduledPost[]>([
    {
      id: "1",
      content: "Check out our latest marketing insights! This comprehensive guide covers the top strategies for 2024.",
      images: ["/marketing-chart.png"],
      scheduledTime: "2024-01-15T14:30:00",
      targetGroups: ["Digital Marketing Experts", "Social Media Growth"],
      status: "scheduled",
    },
    {
      id: "2",
      content:
        "New blog post is live! Learn about the future of social media marketing and how to stay ahead of the curve.",
      images: [],
      scheduledTime: "2024-01-16T10:00:00",
      targetGroups: ["Content Creators Hub"],
      status: "posted",
    },
  ])

  const [newGroupUrl, setNewGroupUrl] = useState("")
  const [postContent, setPostContent] = useState("")
  const [postImages, setPostImages] = useState<string[]>([])
  const [scheduledDate, setScheduledDate] = useState("")
  const [scheduledTime, setScheduledTime] = useState("")

  const [isAddingGroup, setIsAddingGroup] = useState(false)
  const [isSchedulingPost, setIsSchedulingPost] = useState(false)
  const [isLoadingGroups, setIsLoadingGroups] = useState(false)
  const [isLoadingPosts, setIsLoadingPosts] = useState(false)

  const totalMembers = groups.reduce((sum, group) => sum + group.members, 0)
  const selectedGroups = groups.filter((group) => group.selected)

  // Added function to get page access token
  const getPageAccessToken = async () => {
    if (!userAccessToken || !pageId) {
      alert("Please enter both User Access Token and Page ID")
      return
    }

    try {
      const response = await fetch(`https://graph.facebook.com/v18.0/me/accounts?access_token=${userAccessToken}`)
      const data = await response.json()

      if (data.error) {
        alert("Error fetching page access token: " + data.error.message)
        return
      }

      const targetPage = data.data.find((page: any) => page.id === pageId)
      if (!targetPage) {
        alert("Page not found or you do not have access to it")
        return
      }

      setPageAccessToken(targetPage.access_token)
      alert("Page access token retrieved successfully!")
    } catch (error) {
      console.error("Error getting page access token:", error)
      alert("Failed to get page access token")
    }
  }

  const loadGroups = async () => {
    if (!pageAccessToken) return

    setIsLoadingGroups(true)
    try {
    //   const response = await fetch(`/api/groups?access_token=${pageAccessToken}`)
      const response = await fetch(`/api/groups?access_token=${userAccessToken}`)
      const data = await response.json()

      if (data.error) {
        console.error("Error loading groups:", data.error)
        return
      }

      // Update groups with API data if available
      // For now, keeping mock data as Facebook Groups API has limitations
    } catch (error) {
      console.error("Error loading groups:", error)
    } finally {
      setIsLoadingGroups(false)
    }
  }

  const loadScheduledPosts = async () => {
    if (!pageAccessToken) return

    setIsLoadingPosts(true)
    try {
      const response = await fetch(`/api/posts?access_token=${pageAccessToken}`)
      const data = await response.json()

      if (data.error) {
        console.error("Error loading scheduled posts:", data.error)
        return
      }

      // Update scheduled posts with API data
      if (data.data) {
        const apiPosts = data.data.map((post: any) => ({
          id: post.id,
          content: post.message || "",
          images: [],
          scheduledTime: post.scheduled_publish_time,
          targetGroups: ["Unknown"],
          status: "scheduled" as const,
        }))
        setScheduledPosts((prev) => [...prev, ...apiPosts])
      }
    } catch (error) {
      console.error("Error loading scheduled posts:", error)
    } finally {
      setIsLoadingPosts(false)
    }
  }

  useEffect(() => {
    if (pageAccessToken) {
      loadGroups()
      loadScheduledPosts()
    }
  }, [pageAccessToken])

  const addGroup = async () => {
    if (!newGroupUrl.trim()) return

    setIsAddingGroup(true)
    try {
      const response = await fetch("/api/groups", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          groupUrl: newGroupUrl,
          accessToken: pageAccessToken,
        // accessToken: userAccessToken,
        }),
      })

      const data = await response.json()

      if (data.error) {
        alert("Error adding group: " + data.error)
        return
      }

      const newGroup: FacebookGroup = {
        id: Date.now().toString(),
        name: data.name || "New Group",
        url: newGroupUrl,
        members: data.members || 0,
        selected: false,
      }

      setGroups((prev) => [...prev, newGroup])
      setNewGroupUrl("")
    } catch (error) {
      console.error("Error adding group:", error)
      alert("Failed to add group")
    } finally {
      setIsAddingGroup(false)
    }
  }

  const schedulePost = async () => {
    if (!postContent.trim() || selectedGroups.length === 0 || !scheduledDate || !scheduledTime) {
      alert("Please fill in all required fields and select at least one group")
      return
    }

    if (!pageAccessToken) {
      alert("Please get page access token first")
      return
    }

    setIsSchedulingPost(true)
    try {
      const scheduledDateTime = `${scheduledDate}T${scheduledTime}:00`
      const groupIds = selectedGroups.map((group) => group.id)

      const response = await fetch("/api/posts", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          content: postContent,
          groupIds: ["1885954411980940"],
          images: postImages,
          accessToken: pageAccessToken, // Using page access token instead of user access token
          scheduledTime: scheduledDateTime,
        }),
      })

      const data = await response.json()

      if (data.error) {
        alert("Error scheduling post: " + data.error)
        return
      }

      const newPost: ScheduledPost = {
        id: Date.now().toString(),
        content: postContent,
        images: [...postImages],
        scheduledTime: scheduledDateTime,
        targetGroups: selectedGroups.map((group) => group.name),
        status: "scheduled",
      }

      setScheduledPosts((prev) => [...prev, newPost])

      // Reset form
      setPostContent("")
      setPostImages([])
      setScheduledDate("")
      setScheduledTime("")
      setGroups((prev) => prev.map((group) => ({ ...group, selected: false })))

      alert("Post scheduled successfully!")
    } catch (error) {
      console.error("Error scheduling post:", error)
      alert("Failed to schedule post")
    } finally {
      setIsSchedulingPost(false)
    }
  }

  const cancelScheduledPost = async (postId: string) => {
    try {
      const response = await fetch(`/api/posts/${postId}`, {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ accessToken: pageAccessToken }),
      })

      const data = await response.json()

      if (data.error) {
        alert("Error canceling post: " + data.error)
        return
      }

      setScheduledPosts((prev) => prev.filter((post) => post.id !== postId))
      alert("Post canceled successfully!")
    } catch (error) {
      console.error("Error canceling post:", error)
      alert("Failed to cancel post")
    }
  }

  const toggleGroupSelection = (groupId: string) => {
    setGroups((prev) => prev.map((group) => (group.id === groupId ? { ...group, selected: !group.selected } : group)))
  }

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files
    if (files) {
      const newImages = Array.from(files).map((file) => URL.createObjectURL(file))
      setPostImages((prev) => [...prev, ...newImages])
    }
  }

  const removeImage = (index: number) => {
    setPostImages((prev) => prev.filter((_, i) => i !== index))
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 p-4">
      <div className="max-w-6xl mx-auto space-y-6">
        {/* Header */}
        <div className="text-center space-y-2">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">Facebook Group Scheduler</h1>
          <p className="text-gray-600 text-lg">Manage your Facebook groups and schedule posts efficiently</p>
        </div>

        <Card className="bg-white/90 backdrop-blur-sm shadow-lg">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Settings className="h-5 w-5" />
              Facebook Configuration
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="user-access-token" className="text-base font-medium">
                  Facebook User Access Token
                </Label>
                <Input
                  id="user-access-token"
                  type="password"
                  placeholder="Enter your Facebook User Access Token"
                  value={userAccessToken}
                  onChange={(e) => setUserAccessToken(e.target.value)}
                  className="mt-2"
                />
              </div>
              <div>
                <Label htmlFor="page-id" className="text-base font-medium">
                  Facebook Page ID
                </Label>
                <Input
                  id="page-id"
                  placeholder="Enter your Facebook Page ID"
                  value={pageId}
                  onChange={(e) => setPageId(e.target.value)}
                  className="mt-2"
                />
              </div>
            </div>
            <div className="flex items-center gap-4">
              <Button onClick={getPageAccessToken} disabled={!userAccessToken || !pageId}>
                Get Page Access Token
              </Button>
              {pageAccessToken && (
                <Badge variant="secondary" className="bg-green-100 text-green-800">
                  Page Access Token Retrieved
                </Badge>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Card className="bg-white/80 backdrop-blur-sm">
            <CardContent className="p-4">
              <div className="flex items-center space-x-2">
                <Users className="h-5 w-5 text-blue-600" />
                <div>
                  <p className="text-sm font-medium text-gray-600">Total Groups</p>
                  <p className="text-2xl font-bold text-gray-900">{groups.length}</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card className="bg-white/80 backdrop-blur-sm">
            <CardContent className="p-4">
              <div className="flex items-center space-x-2">
                <BarChart3 className="h-5 w-5 text-green-600" />
                <div>
                  <p className="text-sm font-medium text-gray-600">Total Reach</p>
                  <p className="text-2xl font-bold text-gray-900">{totalMembers.toLocaleString()}</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card className="bg-white/80 backdrop-blur-sm">
            <CardContent className="p-4">
              <div className="flex items-center space-x-2">
                <Clock className="h-5 w-5 text-purple-600" />
                <div>
                  <p className="text-sm font-medium text-gray-600">Scheduled Posts</p>
                  <p className="text-2xl font-bold text-gray-900">{scheduledPosts.length}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Add Group Section */}
        <Card className="bg-white/90 backdrop-blur-sm shadow-lg">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Plus className="h-5 w-5" />
              Add Facebook Group
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col sm:flex-row gap-2">
              <Input
                placeholder="https://facebook.com/groups/your-group"
                value={newGroupUrl}
                onChange={(e) => setNewGroupUrl(e.target.value)}
                className="flex-1"
                disabled={isAddingGroup || !pageAccessToken}
              />
              <Button onClick={addGroup} disabled={isAddingGroup || !pageAccessToken} className="sm:w-auto w-full">
                {isAddingGroup ? "Adding..." : "Add Group"}
              </Button>
            </div>
            {!pageAccessToken && (
              <p className="text-sm text-amber-600 mt-2">Please configure Facebook credentials first</p>
            )}
          </CardContent>
        </Card>

        {/* Groups List */}
        <Card className="bg-white/90 backdrop-blur-sm shadow-lg">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Users className="h-5 w-5" />
              Your Facebook Groups ({selectedGroups.length} selected)
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {groups.length > 0 ? (
                groups.map((group) => (
                  <div
                    key={group.id}
                    className="flex items-center space-x-3 p-4 border rounded-lg hover:bg-gray-50 transition-colors"
                  >
                    <Checkbox
                      checked={group.selected}
                      onCheckedChange={() => toggleGroupSelection(group.id)}
                      disabled={!pageAccessToken}
                    />
                    <div className="flex-1">
                      <h3 className="font-medium text-gray-900">{group.name}</h3>
                      <p className="text-sm text-gray-500">{group.members.toLocaleString()} members</p>
                      <p className="text-xs text-gray-400">{group.url}</p>
                    </div>
                    <Badge variant={group.selected ? "default" : "secondary"}>
                      {group.selected ? "Selected" : "Available"}
                    </Badge>
                  </div>
                ))
              ) : (
                <div className="text-center py-12 text-gray-500">
                  <Users className="h-12 w-12 mx-auto mb-4 text-gray-300" />
                  <p className="text-lg font-medium mb-2">No groups added yet</p>
                  <p>Add your first Facebook group above to get started.</p>
                </div>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Schedule New Post */}
        <Card className="bg-white/90 backdrop-blur-sm shadow-lg">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Calendar className="h-5 w-5" />
              Schedule New Post
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Post Content */}
            <div>
              <Label htmlFor="post-content" className="text-base font-medium">
                Post Content
              </Label>
              <Textarea
                id="post-content"
                placeholder="What would you like to share with your groups? Write an engaging post that will resonate with your audience..."
                value={postContent}
                onChange={(e) => setPostContent(e.target.value)}
                rows={5}
                className="mt-2 resize-none"
                disabled={isSchedulingPost || !pageAccessToken}
              />
              <p className="text-xs text-gray-500 mt-1">{postContent.length}/2000 characters</p>
            </div>

            {/* Image Upload */}
            <div>
              <Label htmlFor="post-images" className="text-base font-medium">
                Images (Optional)
              </Label>
              <div className="mt-2">
                <Input
                  id="post-images"
                  type="file"
                  multiple
                  accept="image/*"
                  onChange={handleImageUpload}
                  className="mb-3"
                  disabled={isSchedulingPost || !pageAccessToken}
                />
                {postImages.length > 0 && (
                  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
                    {postImages.map((image, index) => (
                      <div key={index} className="relative group">
                        <img
                          src={image || "/placeholder.svg"}
                          alt={`Upload ${index + 1}`}
                          className="w-full h-24 object-cover rounded-lg border shadow-sm"
                        />
                        <Button
                          variant="destructive"
                          size="sm"
                          className="absolute -top-2 -right-2 h-6 w-6 rounded-full p-0 opacity-0 group-hover:opacity-100 transition-opacity"
                          onClick={() => removeImage(index)}
                          disabled={isSchedulingPost}
                        >
                          ×
                        </Button>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* Schedule Date and Time */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="schedule-date" className="text-base font-medium">
                  Schedule Date
                </Label>
                <Input
                  id="schedule-date"
                  type="date"
                  value={scheduledDate}
                  onChange={(e) => setScheduledDate(e.target.value)}
                  min={new Date().toISOString().split("T")[0]}
                  className="mt-2"
                  disabled={isSchedulingPost || !pageAccessToken}
                />
              </div>
              <div>
                <Label htmlFor="schedule-time" className="text-base font-medium">
                  Schedule Time
                </Label>
                <Input
                  id="schedule-time"
                  type="time"
                  value={scheduledTime}
                  onChange={(e) => setScheduledTime(e.target.value)}
                  className="mt-2"
                  disabled={isSchedulingPost || !pageAccessToken}
                />
              </div>
            </div>

            {/* Selected Groups Summary */}
            {selectedGroups.length > 0 && (
              <div className="bg-blue-50 p-4 rounded-lg">
                <h4 className="font-medium text-blue-900 mb-2">
                  Posting to {selectedGroups.length} group{selectedGroups.length > 1 ? "s" : ""}:
                </h4>
                <div className="flex flex-wrap gap-2">
                  {selectedGroups.map((group) => (
                    <Badge key={group.id} variant="secondary" className="bg-blue-100 text-blue-800">
                      {group.name}
                    </Badge>
                  ))}
                </div>
                <p className="text-sm text-blue-700 mt-2">
                  Total reach: {selectedGroups.reduce((sum, group) => sum + group.members, 0).toLocaleString()} members
                </p>
              </div>
            )}

            <Button
              onClick={schedulePost}
              disabled={
                isSchedulingPost ||
                !pageAccessToken ||
                selectedGroups.length === 0 ||
                !postContent.trim() ||
                !scheduledDate ||
                !scheduledTime
              }
              className="w-full"
            >
              {isSchedulingPost ? "Scheduling..." : "Schedule Post"}
            </Button>

            {!pageAccessToken && (
              <p className="text-sm text-amber-600 text-center">Please configure Facebook credentials first</p>
            )}
          </CardContent>
        </Card>

        {/* Scheduled Posts */}
        <Card className="bg-white/90 backdrop-blur-sm shadow-lg">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Clock className="h-5 w-5" />
              Scheduled Posts ({scheduledPosts.length})
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {scheduledPosts.length > 0 ? (
                scheduledPosts.map((post) => (
                  <div key={post.id} className="border rounded-lg p-4 space-y-3">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <p className="text-gray-900 mb-2">{post.content}</p>
                        {post.images.length > 0 && (
                          <div className="flex gap-2 mb-3">
                            {post.images.map((image, index) => (
                              <img
                                key={index}
                                src={image || "/placeholder.svg"}
                                alt={`Post image ${index + 1}`}
                                className="w-16 h-16 object-cover rounded border"
                              />
                            ))}
                          </div>
                        )}
                        <div className="flex flex-wrap gap-2 mb-2">
                          {post.targetGroups.map((groupName, index) => (
                            <Badge key={index} variant="outline" className="text-xs">
                              {groupName}
                            </Badge>
                          ))}
                        </div>
                        <p className="text-sm text-gray-500">
                          Scheduled for: {new Date(post.scheduledTime).toLocaleString()}
                        </p>
                      </div>
                      <div className="flex items-center gap-2 ml-4">
                        <Badge
                          variant={
                            post.status === "scheduled"
                              ? "default"
                              : post.status === "posted"
                                ? "secondary"
                                : "destructive"
                          }
                          className={
                            post.status === "scheduled"
                              ? "bg-blue-100 text-blue-800"
                              : post.status === "posted"
                                ? "bg-green-100 text-green-800"
                                : "bg-red-100 text-red-800"
                          }
                        >
                          {post.status === "scheduled" && <Clock className="h-3 w-3 mr-1" />}
                          {post.status === "posted" && <CheckCircle className="h-3 w-3 mr-1" />}
                          {post.status === "failed" && <AlertCircle className="h-3 w-3 mr-1" />}
                          {post.status.charAt(0).toUpperCase() + post.status.slice(1)}
                        </Badge>
                        {post.status === "scheduled" && (
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => cancelScheduledPost(post.id)}
                            className="text-red-600 hover:text-red-700 hover:bg-red-50"
                            disabled={!pageAccessToken}
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        )}
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <div className="text-center py-12 text-gray-500">
                  <Calendar className="h-12 w-12 mx-auto mb-4 text-gray-300" />
                  <p className="text-lg font-medium mb-2">No scheduled posts yet</p>
                  <p>Schedule your first post above to get started.</p>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

export default Posts
