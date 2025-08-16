"use client"

import type React from "react"

import { useState } from "react"
// import { useTranslations } from "next-intl"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Checkbox } from "@/components/ui/checkbox"
import { Clock, ImageIcon, X, Upload, Users, Globe } from "lucide-react"
import { useToast } from "@/hooks/use-toast"
import { useLanguage } from "@/contexts/language-context"

interface FacebookGroup {
  id: string
  name: string
  type: "name" | "id"
  addedAt: Date
}

interface PostComposerProps {
  groups: FacebookGroup[]
}

interface UploadedImage {
  id: string
  file: File
  preview: string
  facebookId?: string
  uploading?: boolean
}

export function PostComposer({ groups }: PostComposerProps) {
  const [postText, setPostText] = useState("")
  const [selectedGroups, setSelectedGroups] = useState<string[]>([])
  const [scheduledDate, setScheduledDate] = useState("")
  const [scheduledTime, setScheduledTime] = useState("")
  const [images, setImages] = useState<UploadedImage[]>([])
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [showGroupSelection, setShowGroupSelection] = useState(false)
  const [showScheduling, setShowScheduling] = useState(false)
  const { toast } = useToast()
  const { t} = useLanguage() // composer

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || [])

    files.forEach((file) => {
      if (file.type.startsWith("image/")) {
        const reader = new FileReader()
        reader.onload = (e) => {
          const newImage: UploadedImage = {
            id: Date.now().toString() + Math.random(),
            file,
            preview: e.target?.result as string,
          }
          setImages((prev) => [...prev, newImage])
        }
        reader.readAsDataURL(file)
      }
    })

    e.target.value = ""
  }

  const uploadImageToFacebook = async (image: UploadedImage) => {
    const formData = new FormData()
    formData.append("image", image.file)

    try {
      const response = await fetch("/api/facebook/upload-image", {
        method: "POST",
        body: formData,
      })

      const result = await response.json()

      if (result.success) {
        setImages((prev) =>
          prev.map((img) => (img.id === image.id ? { ...img, facebookId: result.imageId, uploading: false } : img)),
        )
        return result.imageId
      } else {
        throw new Error(result.error)
      }
    } catch (error) {
      setImages((prev) => prev.map((img) => (img.id === image.id ? { ...img, uploading: false } : img)))
      throw error
    }
  }

  const removeImage = (imageId: string) => {
    setImages((prev) => prev.filter((img) => img.id !== imageId))
  }

  const toggleGroupSelection = (groupId: string) => {
    setSelectedGroups((prev) => (prev.includes(groupId) ? prev.filter((id) => id !== groupId) : [...prev, groupId]))
  }

  const handleSubmit = async () => {
    if (!postText.trim()) {
      toast({
        title: "Error",
        description: t("composer.noContent"),
        variant: "destructive",
      })
      return
    }

    if (selectedGroups.length === 0) {
      toast({
        title: "Error",
        description: t("composer.noGroupsSelected"),
        variant: "destructive",
      })
      return
    }

    if (!scheduledDate || !scheduledTime) {
      toast({
        title: "Error",
        description: "Please set a schedule date and time",
        variant: "destructive",
      })
      return
    }

    setIsSubmitting(true)

    try {
      const imageIds: string[] = []

      if (images.length > 0) {
        toast({
          title: t("composer.uploadingImages"),
          description: t("composer.uploadingImages"),
        })

        setImages((prev) => prev.map((img) => ({ ...img, uploading: true })))

        for (const image of images) {
          try {
            const facebookImageId = await uploadImageToFacebook(image)
            imageIds.push(facebookImageId)
          } catch (error) {
            toast({
              title: "Image Upload Failed",
              description: `Failed to upload ${image.file.name}`,
              variant: "destructive",
            })
          }
        }
      }

      const scheduledDateTime = `${scheduledDate}T${scheduledTime}:00`

      const response = await fetch("/api/facebook/schedule-post", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          message: postText,
          groupIds: selectedGroups,
          scheduledTime: scheduledDateTime,
          imageIds,
        }),
      })

      const result = await response.json()

      if (result.success) {
        toast({
          title: t("composer.postScheduled"),
          description: result.message,
        })

        setPostText("composer.")
        setSelectedGroups([])
        setScheduledDate("")
        setScheduledTime("")
        setImages([])
        setShowGroupSelection(false)
        setShowScheduling(false)
      } else {
        toast({
          title: "Error",
          description: result.error || t("composer.postFailed"),
          variant: "destructive",
        })
      }
    } catch (error) {
      toast({
        title: "Error",
        description: t("composer.postFailed"),
        variant: "destructive",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 space-y-4">
      <div className="flex items-center space-x-3">
        <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
          <Users className="h-5 w-5 text-blue-600" />
        </div>
        <div className="flex-1">
          <div className="text-sm font-medium text-gray-900">Facebook Groups Manager</div>
          <div className="flex items-center text-xs text-gray-500">
            <Globe className="h-3 w-3 mr-1" />
            Public
          </div>
        </div>
      </div>

      <div>
        <Textarea
          placeholder="What's on your mind?"
          value={postText}
          onChange={(e) => setPostText(e.target.value)}
          className="border-none resize-none text-lg placeholder:text-gray-500 focus:ring-0 focus:border-none p-0 min-h-[80px]"
        />
      </div>

      {images.length > 0 && (
        <div className="border border-gray-200 rounded-lg p-3">
          <div
            className={`grid gap-2 ${
              images.length === 1
                ? "grid-cols-1"
                : images.length === 2
                  ? "grid-cols-2"
                  : images.length === 3
                    ? "grid-cols-3"
                    : "grid-cols-2"
            }`}
          >
            {images.map((image, index) => (
              <div key={image.id} className="relative group">
                <img
                  src={image.preview || "/placeholder.svg"}
                  alt="Upload preview"
                  className={`w-full object-cover rounded-lg ${
                    images.length === 1 ? "h-64" : images.length <= 4 ? "h-32" : "h-24"
                  }`}
                />
                {image.uploading && (
                  <div className="absolute inset-0 bg-black bg-opacity-50 rounded-lg flex items-center justify-center">
                    <Upload className="h-4 w-4 text-white animate-pulse" />
                  </div>
                )}
                <Button
                  type="button"
                  variant="secondary"
                  size="sm"
                  className="absolute top-2 right-2 h-8 w-8 rounded-full p-0 bg-gray-800 bg-opacity-70 hover:bg-opacity-90 text-white border-none opacity-0 group-hover:opacity-100 transition-opacity"
                  onClick={() => removeImage(image.id)}
                  disabled={image.uploading}
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
            ))}
          </div>
        </div>
      )}

      {showGroupSelection && (
        <div className="border border-gray-200 rounded-lg p-4 bg-gray-50">
          <div className="flex items-center justify-between mb-3">
            <h4 className="font-medium text-gray-900">Select Groups</h4>
            <Button variant="ghost" size="sm" onClick={() => setShowGroupSelection(false)} className="h-6 w-6 p-0">
              <X className="h-4 w-4" />
            </Button>
          </div>
          {groups.length === 0 ? (
            <p className="text-sm text-gray-500 text-center py-4">No groups added yet. Add groups first.</p>
          ) : (
            <div className="space-y-2 max-h-40 overflow-y-auto">
              {groups.map((group) => (
                <div key={group.id} className="flex items-center space-x-3 p-2 hover:bg-white rounded-md">
                  <Checkbox
                    id={group.id}
                    checked={selectedGroups.includes(group.id)}
                    onCheckedChange={() => toggleGroupSelection(group.id)}
                  />
                  <label htmlFor={group.id} className="flex-1 flex items-center gap-2 text-sm cursor-pointer">
                    <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                      <Users className="h-4 w-4 text-blue-600" />
                    </div>
                    <div>
                      <div className="font-medium">{group.name}</div>
                      <Badge variant={group.type === "id" ? "secondary" : "default"} className="text-xs">
                        {group.type === "id" ? "ID" : "Name"}
                      </Badge>
                    </div>
                  </label>
                </div>
              ))}
            </div>
          )}
          {selectedGroups.length > 0 && (
            <div className="mt-3 pt-3 border-t border-gray-200">
              <p className="text-sm text-blue-600 font-medium">{selectedGroups.length} groups selected</p>
            </div>
          )}
        </div>
      )}

      {showScheduling && (
        <div className="border border-gray-200 rounded-lg p-4 bg-gray-50">
          <div className="flex items-center justify-between mb-3">
            <h4 className="font-medium text-gray-900">Schedule Post</h4>
            <Button variant="ghost" size="sm" onClick={() => setShowScheduling(false)} className="h-6 w-6 p-0">
              <X className="h-4 w-4" />
            </Button>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="text-sm font-medium text-gray-700 mb-1 block">Date</label>
              <Input
                type="date"
                value={scheduledDate}
                onChange={(e) => setScheduledDate(e.target.value)}
                min={new Date().toISOString().split("composer.T")[0]}
                className="text-sm"
              />
            </div>
            <div>
              <label className="text-sm font-medium text-gray-700 mb-1 block">Time</label>
              <Input
                type="time"
                value={scheduledTime}
                onChange={(e) => setScheduledTime(e.target.value)}
                className="text-sm"
              />
            </div>
          </div>
        </div>
      )}

      <div className="flex items-center justify-between pt-3 border-t border-gray-200">
        <div className="flex items-center space-x-1">
          <Input
            type="file"
            accept="image/*"
            multiple
            onChange={handleImageUpload}
            className="hidden"
            id="image-upload"
          />
          <Button
            type="button"
            variant="ghost"
            size="sm"
            onClick={() => document.getElementById("image-upload")?.click()}
            className="flex items-center gap-2 text-gray-600 hover:bg-gray-100 px-3 py-2 rounded-lg"
            disabled={isSubmitting}
          >
            <ImageIcon className="h-5 w-5 text-green-500" />
            <span className="text-sm font-medium">Photo/Video</span>
          </Button>

          <Button
            type="button"
            variant="ghost"
            size="sm"
            onClick={() => setShowGroupSelection(!showGroupSelection)}
            className="flex items-center gap-2 text-gray-600 hover:bg-gray-100 px-3 py-2 rounded-lg"
          >
            <Users className="h-5 w-5 text-blue-500" />
            <span className="text-sm font-medium">Groups</span>
            {selectedGroups.length > 0 && (
              <Badge variant="secondary" className="text-xs">
                {selectedGroups.length}
              </Badge>
            )}
          </Button>

          <Button
            type="button"
            variant="ghost"
            size="sm"
            onClick={() => setShowScheduling(!showScheduling)}
            className="flex items-center gap-2 text-gray-600 hover:bg-gray-100 px-3 py-2 rounded-lg"
          >
            <Clock className="h-5 w-5 text-orange-500" />
            <span className="text-sm font-medium">Schedule</span>
            {scheduledDate && scheduledTime && (
              <Badge variant="secondary" className="text-xs">
                Set
              </Badge>
            )}
          </Button>
        </div>

        <Button
          onClick={handleSubmit}
          disabled={isSubmitting || !postText.trim() || selectedGroups.length === 0 || !scheduledDate || !scheduledTime}
          className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg font-medium disabled:bg-gray-300 disabled:text-gray-500"
        >
          {isSubmitting ? "Posting..." : "Post"}
        </Button>
      </div>
    </div>
  )
}
