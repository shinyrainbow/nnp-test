"use client"

import { useState, useEffect } from "react"
// import { useTranslations } from "next-intl"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Calendar, Clock, ImageIcon, MessageSquare, Trash2, RefreshCw, AlertCircle } from "lucide-react"
import { useToast } from "@/hooks/use-toast"
import { useLanguage } from "@/contexts/language-context"

interface ScheduledPost {
  id: string
  message: string
  createdTime: string
  scheduledTime: string
  statusType: string
  hasAttachments: boolean
  attachmentCount: number
}

export function ScheduledPostsList() {
  const [posts, setPosts] = useState<ScheduledPost[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [isRefreshing, setIsRefreshing] = useState(false)
  const { toast } = useToast()
  const {t} = useLanguage()

  const fetchScheduledPosts = async (showRefreshToast = false) => {
    try {
      setIsRefreshing(true)
      const response = await fetch("/api/facebook/scheduled-posts")
      const result = await response.json()

      if (result.success) {
        setPosts(result.posts)
        if (showRefreshToast) {
          toast({
            title: "Refreshed",
            description: `Found ${result.posts.length} scheduled posts`,
          })
        }
      } else {
        toast({
          title: "Error",
          description: result.error || "Failed to fetch scheduled posts",
          variant: "destructive",
        })
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to fetch scheduled posts",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
      setIsRefreshing(false)
    }
  }

  const cancelPost = async (postId: string) => {
    try {
      const response = await fetch(`/api/facebook/scheduled-posts?postId=${postId}`, {
        method: "DELETE",
      })

      const result = await response.json()

      if (result.success) {
        toast({
          title: t("scheduled.postCancelled"),
          description: t("scheduled.postCancelled"),
        })
        // Remove the post from the list
        setPosts((prev) => prev.filter((post) => post.id !== postId))
      } else {
        toast({
          title: "Error",
          description: result.error || t("scheduled.cancelFailed"),
          variant: "destructive",
        })
      }
    } catch (error) {
      toast({
        title: "Error",
        description: t("scheduled.cancelFailed"),
        variant: "destructive",
      })
    }
  }

  useEffect(() => {
    fetchScheduledPosts()
  }, [])

  const formatDateTime = (timestamp: string) => {
    const date = new Date(Number.parseInt(timestamp) * 1000)
    return {
      date: date.toLocaleDateString(),
      time: date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    }
  }

  const getTimeUntilPost = (timestamp: string) => {
    const scheduledDate = new Date(Number.parseInt(timestamp) * 1000)
    const now = new Date()
    const diffMs = scheduledDate.getTime() - now.getTime()

    if (diffMs <= 0) return "Overdue"

    const diffHours = Math.floor(diffMs / (1000 * 60 * 60))
    const diffDays = Math.floor(diffHours / 24)

    if (diffDays > 0) return `${diffDays} day${diffDays !== 1 ? "s" : ""}`
    if (diffHours > 0) return `${diffHours} hour${diffHours !== 1 ? "s" : ""}`
    return "Less than 1 hour"
  }

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-2">
            <Calendar className="h-5 w-5" />
            {t("scheduled.title")} ({posts.length})
          </CardTitle>
          <Button
            variant="outline"
            size="sm"
            onClick={() => fetchScheduledPosts(true)}
            disabled={isRefreshing}
            className="flex items-center gap-2"
          >
            <RefreshCw className={`h-4 w-4 ${isRefreshing ? "animate-spin" : ""}`} />
            Refresh
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        {isLoading ? (
          <div className="text-center py-8">
            <RefreshCw className="h-8 w-8 mx-auto mb-4 animate-spin text-gray-400" />
            <p className="text-gray-500">{t("scheduled.loading")}</p>
          </div>
        ) : posts.length === 0 ? (
          <div className="text-center py-8 text-gray-500">
            <Calendar className="h-12 w-12 mx-auto mb-4 opacity-50" />
            <p>{t("scheduled.noScheduledPosts")}</p>
            <p className="text-sm">{t("scheduled.noScheduledPostsDescription")}</p>
          </div>
        ) : (
          <div className="space-y-4">
            {posts.map((post) => {
              const { date, time } = formatDateTime(post.scheduledTime)
              const timeUntil = getTimeUntilPost(post.scheduledTime)

              return (
                <div key={post.id} className="border rounded-lg p-4 hover:bg-gray-50 transition-colors">
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-2">
                        <MessageSquare className="h-4 w-4 text-blue-600" />
                        <Badge variant="outline" className="text-xs">
                          {t("scheduled.scheduledFor")} {timeUntil}
                        </Badge>
                        {post.hasAttachments && (
                          <Badge variant="secondary" className="text-xs flex items-center gap-1">
                            <ImageIcon className="h-3 w-3" />
                            {post.attachmentCount} {t("scheduled.images")}
                          </Badge>
                        )}
                      </div>

                      <p className="text-sm text-gray-900 mb-3 line-clamp-3">{post.message || "No message content"}</p>

                      <div className="flex items-center gap-4 text-xs text-gray-500">
                        <div className="flex items-center gap-1">
                          <Calendar className="h-3 w-3" />
                          {date}
                        </div>
                        <div className="flex items-center gap-1">
                          <Clock className="h-3 w-3" />
                          {time}
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => cancelPost(post.id)}
                        className="text-red-600 hover:text-red-700 hover:bg-red-50"
                        title={t("scheduled.cancelPost")}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        )}

        {posts.length > 0 && (
          <div className="mt-4 pt-4 border-t">
            <div className="flex items-center gap-2 text-sm text-gray-500">
              <AlertCircle className="h-4 w-4" />
              <span>Posts are automatically published at their scheduled time</span>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
