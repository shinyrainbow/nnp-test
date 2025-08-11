"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { ArrowLeft, Save, Loader2 } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Textarea } from "@/components/ui/textarea"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { LanguageSwitcher } from "@/components/language-switcher"
import { Language } from "@/lib/i18n"
import { useProperty } from "@/contexts/property-context"

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

export default function EditProperty({ params }: { params: { id: string } }) {
  const router = useRouter()
  const { locale } = useLocale()
  const [currentLocale, setCurrentLocale] = useState<Locale>("en")

  const [property, setProperty] = useState<Property | null>(null)
  const [formData, setFormData] = useState<Partial<Property>>({})
  const [selectedAmenities, setSelectedAmenities] = useState<string[]>([])
  const [imageUrls, setImageUrls] = useState<string[]>([])

  // Use Property Context
  const {
    projects,
    propertyTypes,
    stations,
    roomAmenitiesOptions,
    whenAvailableOptions,
    loading,
    saving,
    error,
    successMessage,
    getProperty,
    updateProperty,
    clearError,
    clearSuccessMessage,
  } = useProperty()

  // Update current locale when locale changes
  useEffect(() => {
    setCurrentLocale(locale)
  }, [locale])

  // Fetch property data
  useEffect(() => {
    const fetchPropertyData = async () => {
      const result = await getProperty(Number.parseInt(params.id))
      if (result.success && result.data) {
        setProperty(result.data)
        setFormData(result.data)
        setSelectedAmenities(result.data.roomAmenities || [])
        setImageUrls(result.data.imageUrls || [])
      }
    }

    fetchPropertyData()
  }, [params.id, getProperty])

  const handleInputChange = (field: keyof Property, value: any) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }))
  }

  const handleAmenityToggle = (amenity: string) => {
    setSelectedAmenities((prev) => {
      if (prev.includes(amenity)) {
        return prev.filter((a) => a !== amenity)
      } else {
        return [...prev, amenity]
      }
    })
  }

  const handleImageUrlChange = (index: number, url: string) => {
    setImageUrls((prev) => {
      const newUrls = [...prev]
      newUrls[index] = url
      return newUrls
    })
  }

  const addImageUrl = () => {
    setImageUrls((prev) => [...prev, ""])
  }

  const removeImageUrl = (index: number) => {
    setImageUrls((prev) => prev.filter((_, i) => i !== index))
  }

  const handleSave = async () => {
    const updatedData = {
      ...formData,
      roomAmenities: selectedAmenities,
      imageUrls: imageUrls.filter((url) => url.trim() !== ""),
    }

    const result = await updateProperty(Number.parseInt(params.id), updatedData)
    if (result.success) {
      // Redirect back to main page after 2 seconds
      setTimeout(() => {
        router.push("/")
      }, 2000)
    }
  }

  const handleLocaleChange = (newLocale: Language) => {
    setCurrentLocale(newLocale)
  }

  const getLocalizedPropertyType = (type: string) => {
    const typeMap: Record<string, string> = {
      Condo: t(currentLocale, "condo"),
      Apartment: t(currentLocale, "apartment"),
      Townhouse: t(currentLocale, "townhouse"),
      House: t(currentLocale, "house"),
    }
    return typeMap[type] || type
  }

  const getLocalizedStatus = (status: string) => {
    const statusMap: Record<string, string> = {
      available: t(currentLocale, "available"),
      rented: t(currentLocale, "rented"),
      sold: t(currentLocale, "sold"),
    }
    return statusMap[status] || status
  }

  // Clear messages after timeout
  useEffect(() => {
    if (error) {
      const timer = setTimeout(() => {
        clearError()
      }, 5000)
      return () => clearTimeout(timer)
    }
  }, [error, clearError])

  useEffect(() => {
    if (successMessage) {
      const timer = setTimeout(() => {
        clearSuccessMessage()
      }, 5000)
      return () => clearTimeout(timer)
    }
  }, [successMessage, clearSuccessMessage])

  if (loading && !property) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="w-8 h-8 animate-spin mx-auto mb-4 text-blue-600" />
          <p className="text-gray-600">{t(currentLocale, "loadingProperties")}</p>
        </div>
      </div>
    )
  }

  if (error && !property) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
        <Alert className="max-w-md">
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8 flex justify-between items-start">
          <div className="flex items-center gap-4">
            <Button variant="outline" onClick={() => router.push("/")} className="flex items-center gap-2">
              <ArrowLeft className="w-4 h-4" />
              {t(currentLocale, "backToProperties")}
            </Button>
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">{t(currentLocale, "editProperty")}</h1>
              <p className="text-gray-600">
                {property?.projectName} - {t(currentLocale, "room")} {property?.roomNumber}
              </p>
            </div>
          </div>
          <LanguageSwitcher onLocaleChange={handleLocaleChange} />
        </div>

        {error && (
          <Alert className="mb-6 border-red-200 bg-red-50">
            <AlertDescription className="text-red-800">{error}</AlertDescription>
          </Alert>
        )}

        {successMessage && (
          <Alert className="mb-6 border-green-200 bg-green-50">
            <AlertDescription className="text-green-800">{successMessage}</AlertDescription>
          </Alert>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Basic Information */}
          <Card>
            <CardHeader>
              <CardTitle>{t(currentLocale, "basicInformation")}</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="propertyCode">{t(currentLocale, "propertyCode")}</Label>
                  <Input
                    id="propertyCode"
                    value={formData.propertyCode || ""}
                    onChange={(e) => handleInputChange("propertyCode", e.target.value)}
                    className="font-mono"
                  />
                </div>
                <div>
                  <Label htmlFor="projectPropertyCode">{t(currentLocale, "projectPropertyCode")}</Label>
                  <Input
                    id="projectPropertyCode"
                    value={formData.projectPropertyCode || ""}
                    onChange={(e) => handleInputChange("projectPropertyCode", e.target.value)}
                    className="font-mono"
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="roomNumber">{t(currentLocale, "roomNumber")}</Label>
                <Input
                  id="roomNumber"
                  value={formData.roomNumber || ""}
                  onChange={(e) => handleInputChange("roomNumber", e.target.value)}
                />
              </div>

              <div>
                <Label htmlFor="project">{t(currentLocale, "project")}</Label>
                <Select
                  value={formData.projectId?.toString() || ""}
                  onValueChange={(value) => {
                    const selectedProject = projects.find((p) => p.id === Number.parseInt(value))
                    if (selectedProject) {
                      handleInputChange("projectId", selectedProject.id)
                      handleInputChange("projectName", selectedProject.projectName)
                      handleInputChange("location", selectedProject.projectLocation)
                    }
                  }}
                >
                  <SelectTrigger>
                    <SelectValue placeholder={t(currentLocale, "selectProject")} />
                  </SelectTrigger>
                  <SelectContent>
                    {projects.map((project) => (
                      <SelectItem key={project.id} value={project.id.toString()}>
                        {project.projectName} ({project.projectCode})
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="roomType">{t(currentLocale, "roomType")}</Label>
                <Select value={formData.roomType || ""} onValueChange={(value) => handleInputChange("roomType", value)}>
                  <SelectTrigger>
                    <SelectValue placeholder={t(currentLocale, "selectRoomType")} />
                  </SelectTrigger>
                  <SelectContent>
                    {propertyTypes.map((type) => (
                      <SelectItem key={type} value={type}>
                        {getLocalizedPropertyType(type)}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="status">{t(currentLocale, "status")}</Label>
                <Select value={formData.status || ""} onValueChange={(value) => handleInputChange("status", value)}>
                  <SelectTrigger>
                    <SelectValue placeholder={t(currentLocale, "selectStatus")} />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="available">{getLocalizedStatus("available")}</SelectItem>
                    <SelectItem value="rented">{getLocalizedStatus("rented")}</SelectItem>
                    <SelectItem value="sold">{getLocalizedStatus("sold")}</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>

          {/* Property Details */}
          <Card>
            <CardHeader>
              <CardTitle>{t(currentLocale, "propertyDetails")}</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-3 gap-4">
                <div>
                  <Label htmlFor="bedRoom">{t(currentLocale, "bedrooms")}</Label>
                  <Input
                    id="bedRoom"
                    type="number"
                    min="1"
                    max="10"
                    value={formData.bedRoom || ""}
                    onChange={(e) => handleInputChange("bedRoom", Number.parseInt(e.target.value))}
                  />
                </div>
                <div>
                  <Label htmlFor="bathRoom">{t(currentLocale, "bathrooms")}</Label>
                  <Input
                    id="bathRoom"
                    type="number"
                    min="1"
                    max="10"
                    value={formData.bathRoom || ""}
                    onChange={(e) => handleInputChange("bathRoom", Number.parseInt(e.target.value))}
                  />
                </div>
                <div>
                  <Label htmlFor="floor">{t(currentLocale, "floor")}</Label>
                  <Input
                    id="floor"
                    type="number"
                    min="1"
                    max="100"
                    value={formData.floor || ""}
                    onChange={(e) => handleInputChange("floor", Number.parseInt(e.target.value))}
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="roomSize">{t(currentLocale, "roomSize")} (sqm)</Label>
                  <Input
                    id="roomSize"
                    type="number"
                    min="20"
                    max="500"
                    value={formData.roomSize || ""}
                    onChange={(e) => handleInputChange("roomSize", Number.parseInt(e.target.value))}
                  />
                </div>
                <div>
                  <Label htmlFor="carPark">{t(currentLocale, "parkingSpaces")}</Label>
                  <Input
                    id="carPark"
                    type="number"
                    min="0"
                    max="5"
                    value={formData.carPark || ""}
                    onChange={(e) => handleInputChange("carPark", Number.parseInt(e.target.value))}
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="rentalRate">{t(currentLocale, "rentalRate")} (฿)</Label>
                  <Input
                    id="rentalRate"
                    type="number"
                    min="0"
                    value={formData.rentalRate || ""}
                    onChange={(e) => handleInputChange("rentalRate", Number.parseInt(e.target.value))}
                  />
                </div>
                <div>
                  <Label htmlFor="sell">{t(currentLocale, "salePrice")} (฿)</Label>
                  <Input
                    id="sell"
                    type="number"
                    min="0"
                    value={formData.sell || ""}
                    onChange={(e) => handleInputChange("sell", Number.parseInt(e.target.value))}
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="distanceToStation">{t(currentLocale, "distanceToStation")} (m)</Label>
                  <Input
                    id="distanceToStation"
                    type="number"
                    min="0"
                    value={formData.distanceToStation || ""}
                    onChange={(e) => handleInputChange("distanceToStation", Number.parseInt(e.target.value))}
                  />
                </div>
                <div>
                  <Label htmlFor="distanceStation">{t(currentLocale, "nearestStation")}</Label>
                  <Select
                    value={formData.distanceStation || ""}
                    onValueChange={(value) => handleInputChange("distanceStation", value)}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder={t(currentLocale, "selectStation")} />
                    </SelectTrigger>
                    <SelectContent>
                      {stations.map((station) => (
                        <SelectItem key={station} value={station}>
                          {station}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div>
                <Label htmlFor="whenAvailable">{t(currentLocale, "availability")}</Label>
                <Select
                  value={formData.whenAvailable || ""}
                  onValueChange={(value) => handleInputChange("whenAvailable", value)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder={t(currentLocale, "selectAvailability")} />
                  </SelectTrigger>
                  <SelectContent>
                    {whenAvailableOptions.map((option) => (
                      <SelectItem key={option} value={option}>
                        {option}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="flex items-center space-x-4">
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="isPetFriendly"
                    checked={formData.isPetFriendly || false}
                    onCheckedChange={(checked) => handleInputChange("isPetFriendly", checked)}
                  />
                  <Label htmlFor="isPetFriendly">{t(currentLocale, "petFriendly")}</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="isOwner"
                    checked={formData.isOwner || false}
                    onCheckedChange={(checked) => handleInputChange("isOwner", checked)}
                  />
                  <Label htmlFor="isOwner">{t(currentLocale, "ownerListed")}</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="isAcceptShortTerm"
                    checked={formData.isAcceptShortTerm || false}
                    onCheckedChange={(checked) => handleInputChange("isAcceptShortTerm", checked)}
                  />
                  <Label htmlFor="isAcceptShortTerm">{t(currentLocale, "shortTermOk")}</Label>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Contact Information */}
          <Card>
            <CardHeader>
              <CardTitle>{t(currentLocale, "contactInformation")}</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="phone">{t(currentLocale, "phoneNumber")}</Label>
                <Input
                  id="phone"
                  value={formData.phone || ""}
                  onChange={(e) => handleInputChange("phone", e.target.value)}
                />
              </div>
              <div>
                <Label htmlFor="lineId">{t(currentLocale, "lineId")}</Label>
                <Input
                  id="lineId"
                  value={formData.lineId || ""}
                  onChange={(e) => handleInputChange("lineId", e.target.value)}
                />
              </div>
              <div>
                <Label htmlFor="indexFbUrl">{t(currentLocale, "facebookUrl")}</Label>
                <Input
                  id="indexFbUrl"
                  value={formData.indexFbUrl || ""}
                  onChange={(e) => handleInputChange("indexFbUrl", e.target.value)}
                />
              </div>
            </CardContent>
          </Card>

          {/* Room Amenities */}
          <Card>
            <CardHeader>
              <CardTitle>{t(currentLocale, "amenities")}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 gap-2 max-h-60 overflow-y-auto">
                {roomAmenitiesOptions.map((amenity) => (
                  <div key={amenity} className="flex items-center space-x-2">
                    <Checkbox
                      id={amenity}
                      checked={selectedAmenities.includes(amenity)}
                      onCheckedChange={() => handleAmenityToggle(amenity)}
                    />
                    <Label htmlFor={amenity} className="text-sm">
                      {amenity}
                    </Label>
                  </div>
                ))}
              </div>
              <div className="mt-4">
                <p className="text-sm text-gray-600 mb-2">
                  {t(currentLocale, "selectedAmenities")}: {selectedAmenities.length}
                </p>
                <div className="flex flex-wrap gap-1">
                  {selectedAmenities.slice(0, 5).map((amenity) => (
                    <Badge key={amenity} variant="secondary" className="text-xs">
                      {amenity}
                    </Badge>
                  ))}
                  {selectedAmenities.length > 5 && (
                    <Badge variant="secondary" className="text-xs">
                      +{selectedAmenities.length - 5} more
                    </Badge>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Image URLs */}
          <Card className="lg:col-span-2">
            <CardHeader>
              <CardTitle>{t(currentLocale, "propertyImages")}</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {imageUrls.map((url, index) => (
                <div key={index} className="flex gap-2">
                  <Input
                    placeholder={`${t(currentLocale, "imageUrl")} ${index + 1}`}
                    value={url}
                    onChange={(e) => handleImageUrlChange(index, e.target.value)}
                    className="flex-1"
                  />
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => removeImageUrl(index)}
                    disabled={imageUrls.length <= 1}
                  >
                    {t(currentLocale, "remove")}
                  </Button>
                </div>
              ))}
              <Button type="button" variant="outline" onClick={addImageUrl}>
                {t(currentLocale, "addImageUrl")}
              </Button>
            </CardContent>
          </Card>

          {/* Notes and Messages */}
          <Card className="lg:col-span-2">
            <CardHeader>
              <CardTitle>{t(currentLocale, "notesAndMessages")}</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="note">{t(currentLocale, "note")}</Label>
                <Textarea
                  id="note"
                  rows={3}
                  value={formData.note || ""}
                  onChange={(e) => handleInputChange("note", e.target.value)}
                />
              </div>
              <div>
                <Label htmlFor="messageToPost">{t(currentLocale, "messageToPost")}</Label>
                <Textarea
                  id="messageToPost"
                  rows={5}
                  value={formData.messageToPost || ""}
                  onChange={(e) => handleInputChange("messageToPost", e.target.value)}
                />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Save Button */}
        <div className="mt-8 flex justify-end gap-4">
          <Button variant="outline" onClick={() => router.push("/")} disabled={saving}>
            {t(currentLocale, "cancel")}
          </Button>
          <Button onClick={handleSave} disabled={saving} className="flex items-center gap-2">
            {saving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
            {saving ? t(currentLocale, "saving") : t(currentLocale, "saveChanges")}
          </Button>
        </div>
      </div>
    </div>
  )
}
