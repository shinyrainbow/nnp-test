"use client"

import type React from "react"

import { useState } from "react"
// import { useTranslations } from "next-intl"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Input } from "@/components/ui/input"
import { Card } from "@/components/ui/card"
import { toast } from "@/hooks/use-toast"
import { Calendar, ImageIcon, X, User } from "lucide-react"
import { useLanguage } from "@/contexts/language-context"

interface UploadedImage {
  file: File
  preview: string
  facebookId?: string
}

export function PagePostComposer() {
  const {t} = useLanguage()
  const [message, setMessage] = useState("")
  const [scheduledDate, setScheduledDate] = useState("")
  const [scheduledTime, setScheduledTime] = useState("")
  const [images, setImages] = useState<UploadedImage[]>([])
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(event.target.files || [])

    files.forEach((file) => {
      if (file.type.startsWith("image/")) {
        const preview = URL.createObjectURL(file)
        setImages((prev) => [...prev, { file, preview }])
      }
    })
  }

  const removeImage = (index: number) => {
    setImages((prev) => {
      const newImages = [...prev]
      URL.revokeObjectURL(newImages[index].preview)
      newImages.splice(index, 1)
      return newImages
    })
  }

  const uploadImages = async (): Promise<string[]> => {
    const imageIds: string[] = []

    for (const image of images) {
      if (image.facebookId) {
        imageIds.push(image.facebookId)
        continue
      }

      const formData = new FormData()
      formData.append("image", image.file)

      try {
        const response = await fetch("/api/facebook/upload-image", {
          method: "POST",
          body: formData,
        })

        const result = await response.json()
        if (result.success && result.imageId) {
          imageIds.push(result.imageId)
          image.facebookId = result.imageId
        }
      } catch (error) {
        console.error("Error uploading image:", error)
        throw new Error(`Failed to upload image: ${image.file.name}`)
      }
    }

    return imageIds
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!message.trim()) {
      toast({
        title: t("pagePost,error"),
        description: t("pagePost,messageRequired"),
        variant: "destructive",
      })
      return
    }

    if (!scheduledDate || !scheduledTime) {
      toast({
        title: t("pagePost,error"),
        description: t("pagePost,scheduleRequired"),
        variant: "destructive",
      })
      return
    }

    setIsSubmitting(true)

    try {
      // Upload images first
      const imageIds = images.length > 0 ? await uploadImages() : []

      // Schedule the page post
      const scheduledDateTime = `${scheduledDate}T${scheduledTime}`

      const response = await fetch("/api/schedule-page-post", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          message,
          scheduledTime: scheduledDateTime,
          imageIds,
        }),
      })

      const result = await response.json()

      if (result.success) {
        toast({
          title: t("pagePost,success"),
          description: t("pagePost,postScheduled"),
        })

        // Reset form
        setMessage("")
        setScheduledDate("")
        setScheduledTime("")
        setImages([])
      } else {
        throw new Error(result.error || "Failed to schedule post")
      }
    } catch (error) {
      toast({
        title: t("pagePost,error"),
        description: error instanceof Error ? error.message : t("pagePost,unknownError"),
        variant: "destructive",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <Card className="bg-white rounded-lg shadow-sm border border-gray-200">
      <form onSubmit={handleSubmit} className="p-6">
        {/* Profile Section */}
        <div className="flex items-center space-x-3 mb-4">
          <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
            <User className="w-6 h-6 text-blue-600" />
          </div>
          <div>
            <div className="font-medium text-gray-900">{t("pagePost,yourPage")}</div>
            <div className="text-sm text-gray-500">{t("pagePost,pagePost")}</div>
          </div>
        </div>

        {/* Message Input */}
        <div className="mb-4">
          <Textarea
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder={t("pagePost,placeholder")}
            className="min-h-[120px] border-none resize-none text-lg placeholder-gray-500 focus:ring-0"
            style={{ boxShadow: "none" }}
          />
        </div>

        {/* Image Preview */}
        {images.length > 0 && (
          <div className="mb-4">
            <div className="grid grid-cols-2 gap-2">
              {images.map((image, index) => (
                <div key={index} className="relative group">
                  <img
                    src={image.preview || "/placeholder.svg"}
                    alt={`Upload ${index + 1}`}
                    className="w-full h-32 object-cover rounded-lg"
                  />
                  <button
                    type="button"
                    onClick={() => removeImage(index)}
                    className="absolute top-2 right-2 bg-gray-800 bg-opacity-70 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Schedule Section */}
        <div className="mb-6 p-4 bg-gray-50 rounded-lg">
          <div className="flex items-center space-x-2 mb-3">
            <Calendar className="w-4 h-4 text-gray-600" />
            <span className="font-medium text-gray-700">{t("pagePost,schedulePost")}</span>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">{t("pagePost,date")}</label>
              <Input
                type="date"
                value={scheduledDate}
                onChange={(e) => setScheduledDate(e.target.value)}
                min={new Date().toISOString().split("pagePost,T")[0]}
                className="w-full"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">{t("pagePost,time")}</label>
              <Input
                type="time"
                value={scheduledTime}
                onChange={(e) => setScheduledTime(e.target.value)}
                className="w-full"
              />
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center justify-between pt-4 border-t border-gray-200">
          <div className="flex space-x-2">
            <label className="cursor-pointer">
              <input type="file" multiple accept="image/*" onChange={handleImageUpload} className="hidden" />
              <div className="flex items-center space-x-2 px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors">
                <ImageIcon className="w-5 h-5 text-green-500" />
                <span className="font-medium">{t("pagePost,addPhotos")}</span>
              </div>
            </label>
          </div>

          <Button
            type="submit"
            disabled={isSubmitting || !message.trim() || !scheduledDate || !scheduledTime}
            className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-2 rounded-lg font-medium disabled:opacity-50"
          >
            {isSubmitting ? t("pagePost,scheduling") : t("pagePost,schedulePost")}
          </Button>
        </div>
      </form>
    </Card>
  )
}
