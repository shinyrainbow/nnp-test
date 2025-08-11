"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Phone, MessageCircle, Facebook, Copy, Check, FileText } from "lucide-react"
import { useLanguage } from "@/contexts/language-context"
import { Language } from "@/lib/i18n"

interface Property {
  id: number
  propertyId: number
  roomNumber: string
  projectId: number
  projectName: string
  location: string[]
  status: string
  bedRoom: number
  bathRoom: number
  roomSize: number
  rentalRate: number
  sell: number
  roomType: string
  phone: string
  lineId: string
  indexFbUrl: string
  imageUrls: string[]
  isPetFriendly: boolean
  isOwner: boolean
  distanceToStation: number
  distanceStation: string
  more: string
  carPark: number
  messageToPost: string
  roomAmenities: string[]
  propertyCode: string // New field
  projectPropertyCode: string // New field
}

interface CopyButtonsProps {
  property: Property
  locale: Language
  size?: "sm" | "default"
  variant?: "default" | "outline"
}

export function CopyButtons({ property, size = "sm", variant = "outline" }: CopyButtonsProps) {
  const {t}= useLanguage()
  const [copiedStates, setCopiedStates] = useState({
    phone: false,
    line: false,
    facebook: false,
    post: false,
    message: false,
    propertyCode: false,
    projectPropertyCode: false,
  })

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat(locale === "th" ? "th-TH" : "en-US").format(price)
  }

  const getLocalizedPropertyType = (type: string) => {
    const typeMap: Record<string, string> = {
      Condo: t("condo"),
      Apartment: t("apartment"),
      Townhouse: t("townhouse"),
      House: t("house"),
    }
    return typeMap[type] || type
  }

  const getLocalizedStatus = (status: string) => {
    const statusMap: Record<string, string> = {
      available: t("available"),
      rented: t("rented"),
      sold: t("sold"),
    }
    return statusMap[status] || status
  }

  const copyToClipboard = async (text: string, type: keyof typeof copiedStates) => {
    try {
      await navigator.clipboard.writeText(text)
      setCopiedStates((prev) => ({ ...prev, [type]: true }))

      // Reset the copied state after 2 seconds
      setTimeout(() => {
        setCopiedStates((prev) => ({ ...prev, [type]: false }))
      }, 2000)
    } catch (err) {
      console.error("Failed to copy text: ", err)
    }
  }

  const handleCopyPhone = () => {
    copyToClipboard(property.phone, "phone")
  }

  const handleCopyLineId = () => {
    copyToClipboard(property.lineId, "line")
  }

  const handleCopyFacebookUrl = () => {
    copyToClipboard(property.indexFbUrl, "facebook")
  }

  const handleCopyMessage = () => {
    copyToClipboard(property.messageToPost, "message")
  }

  const handleCopyPropertyCode = () => {
    copyToClipboard(property.propertyCode, "propertyCode")
  }

  const handleCopyProjectPropertyCode = () => {
    copyToClipboard(property.projectPropertyCode, "projectPropertyCode")
  }

  const handleCopyToPost = () => {
    const postText =
      locale === "th"
        ? `🏠 ${property.projectName} - ${t("room")} ${property.roomNumber}

📍 ${property.location.join(", ")}
🏢 ${getLocalizedPropertyType(property.roomType)}
📐 ${property.roomSize} ตร.ม.
🛏️ ${property.bedRoom} ห้องนอน
🚿 ${property.bathRoom} ห้องน้ำ
🚗 ${property.carPark} ที่จอดรถ
🚇 ${property.distanceToStation}ม. ถึง ${property.distanceStation}

✨ สิ่งอำนวยความสะดวก: ${property.roomAmenities.slice(0, 5).join(", ")}

💰 เช่า: ฿${formatPrice(property.rentalRate)}/เดือน
💵 ขาย: ฿${formatPrice(property.sell)}

📱 โทร: ${property.phone}
💬 Line: ${property.lineId}
📘 Facebook: ${property.indexFbUrl}

สถานะ: ${getLocalizedStatus(property.status)}${property.isPetFriendly ? "\n🐕 เลี้ยงสัตว์ได้" : ""}${property.isOwner ? "\n👤 เจ้าของลงขาย" : ""}`
        : `🏠 ${property.projectName} - ${t("room")} ${property.roomNumber}

📍 ${property.location.join(", ")}
🏢 ${getLocalizedPropertyType(property.roomType)}
📐 ${property.roomSize} sqm
🛏️ ${property.bedRoom} ${property.bedRoom > 1 ? "bedrooms" : "bedroom"}
🚿 ${property.bathRoom} ${property.bathRoom > 1 ? "bathrooms" : "bathroom"}
🚗 ${property.carPark} parking ${property.carPark > 1 ? "spaces" : "space"}
🚇 ${property.distanceToStation}m to ${property.distanceStation}

✨ Amenities: ${property.roomAmenities.slice(0, 5).join(", ")}

💰 Rent: ฿${formatPrice(property.rentalRate)}/month
💵 Sale: ฿${formatPrice(property.sell)}

📱 Phone: ${property.phone}
💬 Line: ${property.lineId}
📘 Facebook: ${property.indexFbUrl}

Status: ${getLocalizedStatus(property.status)}${property.isPetFriendly ? "\n🐕 Pet Friendly" : ""}${property.isOwner ? "\n👤 Owner Listed" : ""}`

    copyToClipboard(postText, "post")
  }

  return (
    <div className="grid grid-cols-2 gap-2">
      <Button variant={variant} size={size} className="bg-transparent" onClick={handleCopyPhone}>
        {copiedStates.phone ? <Check className="w-4 h-4 mr-1" /> : <Phone className="w-4 h-4 mr-1" />}
        {copiedStates.phone ? (locale === "th" ? "คัดลอกแล้ว!" : "Copied!") : t("copyPhone")}
      </Button>

      <Button variant={variant} size={size} className="bg-transparent" onClick={handleCopyLineId}>
        {copiedStates.line ? <Check className="w-4 h-4 mr-1" /> : <MessageCircle className="w-4 h-4 mr-1" />}
        {copiedStates.line ? (locale === "th" ? "คัดลอกแล้ว!" : "Copied!") : t("copyLineId")}
      </Button>

      <Button variant={variant} size={size} className="bg-transparent" onClick={handleCopyFacebookUrl}>
        {copiedStates.facebook ? <Check className="w-4 h-4 mr-1" /> : <Facebook className="w-4 h-4 mr-1" />}
        {copiedStates.facebook ? (locale === "th" ? "คัดลอกแล้ว!" : "Copied!") : t("copyFacebookUrl")}
      </Button>

      <Button variant={variant} size={size} className="bg-transparent" onClick={handleCopyMessage}>
        {copiedStates.message ? <Check className="w-4 h-4 mr-1" /> : <FileText className="w-4 h-4 mr-1" />}
        {copiedStates.message ? (locale === "th" ? "คัดลอกแล้ว!" : "Copied!") : t("copyMessage")}
      </Button>

      <Button variant={variant} size={size} className="bg-transparent" onClick={handleCopyPropertyCode}>
        {copiedStates.propertyCode ? <Check className="w-4 h-4 mr-1" /> : <Copy className="w-4 h-4 mr-1" />}
        {copiedStates.propertyCode ? (locale === "th" ? "คัดลอกแล้ว!" : "Copied!") : t("copyPropertyCode")}
      </Button>

      <Button variant={variant} size={size} className="bg-transparent" onClick={handleCopyProjectPropertyCode}>
        {copiedStates.projectPropertyCode ? <Check className="w-4 h-4 mr-1" /> : <Copy className="w-4 h-4 mr-1" />}
        {copiedStates.projectPropertyCode
          ? locale === "th"
            ? "คัดลอกแล้ว!"
            : "Copied!"
          : t("copyProjectPropertyCode")}
      </Button>

      <Button variant={variant} size={size} className="col-span-2 bg-transparent" onClick={handleCopyToPost}>
        {copiedStates.post ? <Check className="w-4 h-4 mr-1" /> : <Copy className="w-4 h-4 mr-1" />}
        {copiedStates.post ? (locale === "th" ? "คัดลอกแล้ว!" : "Copied!") : t("copyToPost")}
      </Button>
    </div>
  )
}
