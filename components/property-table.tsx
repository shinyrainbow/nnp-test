"use client"

import { useState } from "react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import {
  MapPin,
  Building,
  Bed,
  Bath,
  Car,
  Ruler,
  Phone,
  MessageCircle,
  Facebook,
  FileText,
  Check,
  Download,
  Calendar,
  Clock,
  Edit,
} from "lucide-react"
import {Language} from "@/lib/i18n"
// import { t, type Locale } from "@/lib/i18n"
import { ImageSlider } from "@/components/image-slider"
import { useLanguage } from "@/contexts/language-context"

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
  note: string
  carPark: number
  messageToPost: string
  roomAmenities: string[]
  floor: number
  whenAvailable: string
  isAcceptShortTerm: boolean
  propertyCode: string
  projectPropertyCode: string
}

interface PropertyTableProps {
  properties: Property[]
  locale?: Language
  onEdit?: (propertyId: number) => void
}

export function PropertyTable({ properties, locale = "en", onEdit }: PropertyTableProps) {
  const [copiedStates, setCopiedStates] = useState<Record<number, Record<string, boolean>>>({})
const {t} = useLanguage()
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat(locale === "th" ? "th-TH" : "en-US").format(price)
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "available":
        return "bg-green-100 text-green-800"
      case "rented":
        return "bg-yellow-100 text-yellow-800"
      case "sold":
        return "bg-red-100 text-red-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const getLocalizedPropertyType = (type: string) => {
    const typeMap: Record<string, string> = {
      Condo: t(locale, "condo"),
      Apartment: t(locale, "apartment"),
      Townhouse: t(locale, "townhouse"),
      House: t(locale, "house"),
    }
    return typeMap[type] || type
  }

  const getLocalizedStatus = (status: string) => {
    const statusMap: Record<string, string> = {
      available: t(locale, "available"),
      rented: t(locale, "rented"),
      sold: t(locale, "sold"),
    }
    return statusMap[status] || status
  }

  const copyToClipboard = async (text: string, type: string, propertyId: number) => {
    try {
      await navigator.clipboard.writeText(text)
      setCopiedStates((prev) => ({
        ...prev,
        [propertyId]: { ...prev[propertyId], [type]: true },
      }))

      setTimeout(() => {
        setCopiedStates((prev) => ({
          ...prev,
          [propertyId]: { ...prev[propertyId], [type]: false },
        }))
      }, 2000)
    } catch (err) {
      console.error("Failed to copy text: ", err)
    }
  }

  const downloadAllImages = async (property: Property) => {
    try {
      // For demo purposes, we'll download images individually
      // In a real app, you'd want to use a library like JSZip to create actual zip files
      for (let i = 0; i < property.imageUrls.length; i++) {
        const imageUrl = property.imageUrls[i]
        const response = await fetch(imageUrl)
        const blob = await response.blob()

        // Create download link
        const url = window.URL.createObjectURL(blob)
        const link = document.createElement("a")
        link.href = url
        link.download = `${property.projectName.replace(/\s+/g, "_")}_Room_${property.roomNumber.replace("/", "-")}_Image_${i + 1}.jpg`
        document.body.appendChild(link)
        link.click()
        document.body.removeChild(link)
        window.URL.revokeObjectURL(url)

        // Add small delay between downloads to avoid overwhelming the browser
        if (i < property.imageUrls.length - 1) {
          await new Promise((resolve) => setTimeout(resolve, 500))
        }
      }
    } catch (error) {
      console.error("Error downloading images:", error)
    }
  }

  return (
    <div className="rounded-md border overflow-x-auto">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Property</TableHead>
            {/* <TableHead>Image</TableHead> */}
            <TableHead>Location</TableHead>
            <TableHead>Type</TableHead>
            <TableHead>Size</TableHead>
            <TableHead>Bed/Bath</TableHead>
            <TableHead>Floor</TableHead>
            <TableHead>Parking</TableHead>
            <TableHead>Station</TableHead>
            <TableHead>Availability</TableHead>
            <TableHead>{t("rent")}</TableHead>
            <TableHead>{t("sale")}</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Phone</TableHead>
            <TableHead>Line ID</TableHead>
            <TableHead>Facebook</TableHead>
            <TableHead>Message</TableHead>
            <TableHead>Images</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {properties.map((property) => (
            <TableRow key={property.id}>
              <TableCell>
                <div>
                  <div className="font-medium">{property.projectName}</div>
                  <div className="text-sm text-gray-500">
                    {t(locale, "room")} {property.roomNumber}
                  </div>
                  <div className="flex gap-2 text-xs font-mono mt-1">
                    <span className="text-green-600">{property.propertyCode}</span>
                    <span className="text-purple-600">{property.projectPropertyCode}</span>
                  </div>
                </div>
              </TableCell>
              {/* <TableCell>
                <ImageSlider images={property.imageUrls} alt={`${property.projectName}`} className="w-16 h-12" />
              </TableCell> */}
              <TableCell>
                <div className="flex items-center gap-1 text-sm">
                  <MapPin className="w-3 h-3" />
                  {property.location.join(", ")}
                </div>
              </TableCell>
              <TableCell>
                <div className="flex items-center gap-1">
                  <Building className="w-3 h-3" />
                  {getLocalizedPropertyType(property.roomType)}
                </div>
              </TableCell>
              <TableCell>
                <div className="flex items-center gap-1">
                  <Ruler className="w-3 h-3" />
                  {property.roomSize} {locale === "th" ? "ตร.ม." : "sqm"}
                </div>
              </TableCell>
              <TableCell>
                <div className="flex items-center gap-2 text-sm">
                  <div className="flex items-center gap-1">
                    <Bed className="w-3 h-3" />
                    {property.bedRoom}
                  </div>
                  <div className="flex items-center gap-1">
                    <Bath className="w-3 h-3" />
                    {property.bathRoom}
                  </div>
                </div>
              </TableCell>
              <TableCell>
                <div className="text-sm font-medium">{property.floor}</div>
              </TableCell>
              <TableCell>
                <div className="flex items-center gap-1 text-sm">
                  <Car className="w-3 h-3" />
                  {property.carPark}
                </div>
              </TableCell>
              <TableCell>
                <div className="text-sm">
                  <div className="font-medium">{property.distanceToStation}m</div>
                  <div className="text-gray-500">{property.distanceStation}</div>
                </div>
              </TableCell>
              <TableCell>
                <div className="text-sm">
                  <div className="flex items-center gap-1 mb-1">
                    <Calendar className="w-3 h-3 text-blue-500" />
                    <span className="font-medium">{property.whenAvailable}</span>
                  </div>
                  {property.isAcceptShortTerm && (
                    <div className="flex items-center gap-1">
                      <Clock className="w-3 h-3 text-green-500" />
                      <span className="text-green-600 text-xs">{t(locale, "shortTermOk")}</span>
                    </div>
                  )}
                </div>
              </TableCell>
              <TableCell>
                <div className="font-medium text-blue-600">
                  ฿{formatPrice(property.rentalRate)}
                  <div className="text-xs text-gray-500">{t(locale, "month")}</div>
                </div>
              </TableCell>
              <TableCell>
                <div className="font-medium text-green-600">฿{formatPrice(property.sell)}</div>
              </TableCell>
              <TableCell>
                <div className="space-y-1">
                  <Badge className={getStatusColor(property.status)}>{getLocalizedStatus(property.status)}</Badge>
                  {property.isPetFriendly && (
                    <Badge variant="outline" className="text-xs block w-fit">
                      {t(locale, "petFriendly")}
                    </Badge>
                  )}
                  {property.isOwner && (
                    <Badge variant="outline" className="text-xs block w-fit bg-blue-50 text-blue-700">
                      {t(locale, "ownerListed")}
                    </Badge>
                  )}
                </div>
              </TableCell>
              <TableCell>
                <Button
                  variant="outline"
                  size="sm"
                  className="w-full bg-transparent"
                  onClick={() => copyToClipboard(property.phone, "phone", property.id)}
                >
                  {copiedStates[property.id]?.phone ? <Check className="w-3 h-3" /> : <Phone className="w-3 h-3" />}
                </Button>
              </TableCell>
              <TableCell>
                <Button
                  variant="outline"
                  size="sm"
                  className="w-full bg-transparent"
                  onClick={() => copyToClipboard(property.lineId, "line", property.id)}
                >
                  {copiedStates[property.id]?.line ? (
                    <Check className="w-3 h-3" />
                  ) : (
                    <MessageCircle className="w-3 h-3" />
                  )}
                </Button>
              </TableCell>
              <TableCell>
                <Button
                  variant="outline"
                  size="sm"
                  className="w-full bg-transparent"
                  onClick={() => copyToClipboard(property.indexFbUrl, "facebook", property.id)}
                >
                  {copiedStates[property.id]?.facebook ? (
                    <Check className="w-3 h-3" />
                  ) : (
                    <Facebook className="w-3 h-3" />
                  )}
                </Button>
              </TableCell>
              <TableCell>
                <Button
                  variant="outline"
                  size="sm"
                  className="w-full bg-transparent"
                  onClick={() => copyToClipboard(property.messageToPost, "message", property.id)}
                >
                  {copiedStates[property.id]?.message ? (
                    <Check className="w-3 h-3" />
                  ) : (
                    <FileText className="w-3 h-3" />
                  )}
                </Button>
              </TableCell>
              <TableCell>
                <Button
                  variant="outline"
                  size="sm"
                  className="w-full bg-transparent"
                  onClick={() => downloadAllImages(property)}
                >
                  <Download className="w-3 h-3" />
                </Button>
              </TableCell>
              <TableCell>
                {onEdit && (
                  <Button
                    variant="outline"
                    size="sm"
                    className="w-full bg-transparent text-blue-600 hover:text-blue-700"
                    onClick={() => onEdit(property.id)}
                  >
                    <Edit className="w-3 h-3" />
                  </Button>
                )}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}
