"use client"

import React from "react"

import { useState, useEffect, useRef } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { X, Plus, Upload, ImageIcon } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

interface Property {
  id: string
  projectPropertyCode?: string

  // status
  status?: "pending" | "available" | "rented" | "sold"
  whenAvailable?: string
  isAcceptShortTerm?: boolean

  // details
  addressNumber?: string
  bedRoom?: string
  bathRoom?: string
  roomSize?: string
  floor?: string
  building?: string
  roomType?: "Condo" | "Townhouse" | "SingleHouse" | "Apartment" | "Other"
  isPetFriendly?: boolean
  carPark?: string
  imageUrls: string[]
  roomAmenities: string[]

  // price
  rentalRate?: string
  sellPrice?: string

  // contact
  phone?: string
  lineId?: string
  fbUser?: string

  isOwner?: boolean
  linkPost?: string

  // messages
  note?: string
  originalMessage?: string
  messageToPost?: string

  projectCode: string
}

export default function EditPropertyPage({ params }: { params: Promise<{ id: string }> }) {
  const router = useRouter()
  const { toast } = useToast()
  const fileInputRef = useRef<HTMLInputElement>(null)
  const [property, setProperty] = useState<Property | null>(null)
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [uploading, setUploading] = useState(false)
  const [uploadProgress, setUploadProgress] = useState(0)
  const [newAmenity, setNewAmenity] = useState("")
  const { id } = React.use(params);

  useEffect(() => {
    fetchProperty()
  }, [id])

  const fetchProperty = async () => {
    try {
      setLoading(true)
      const response = await fetch(`/api/listings/${id}`)
      if (response.ok) {
        const data = await response.json()
        setProperty(data)
        setSelectedImages(data.imageUrls)
      } else {
        toast({
          title: "Error",
          description: "Failed to fetch property data",
          variant: "destructive",
        })
      }
      setLoading(false)
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to fetch property data",
        variant: "destructive",
      })
    } finally {
      setLoading(false)
    }
  }
  const [newFiles, setNewFiles] = useState<File[]>([]);

  // const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  //   if (e.target.files) {
  //     setNewFiles(Array.from(e.target.files)); // convert FileList → File[]
  //   }
  // };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!property) return

    const formData = new FormData();
    formData.append("id", property.id);
    formData.append("projectPropertyCode", property.projectPropertyCode);

    formData.append("status", property.status);
    formData.append("whenAvailable", property.whenAvailable);
    formData.append("isAcceptShortTerm", property.isAcceptShortTerm);

    formData.append("addressNumber", property.addressNumber);
    formData.append("bedRoom", property.bedRoom);
    formData.append("bathRoom", property.bathRoom);
    formData.append("roomSize", property.roomSize);
    formData.append("floor", property.floor);
    formData.append("building", property.building);
    formData.append("roomType", property.roomType);
    formData.append("isPetFriendly", property.isPetFriendly);
    formData.append("carPark", property.carPark);

    ////////////////
    const keptImages = selectedImages;
    const removedImages = property.imageUrls.filter(
      (old) => !selectedImages.includes(old) // find which were deleted
    );
    // formData.append("imageUrls", property.imageUrls);
    // keep/remove lists
    formData.append("keptImages", JSON.stringify(keptImages));
    formData.append("removedImages", JSON.stringify(removedImages));
    // append new images
    newFiles.forEach((file) => {
      formData.append("newFiles", file);
    });
    ///////////////

    formData.append("roomAmenities", JSON.stringify( property.roomAmenities));

    formData.append("rentalRate", property.rentalRate);
    formData.append("sellPrice", property.sellPrice);

    formData.append("phone", property.phone);
    formData.append("lineId", property.lineId);
    formData.append("fbUser", property.fbUser);

    formData.append("isOwner", property.isOwner);
    formData.append("linkPost", property.linkPost);

    formData.append("note", property.note);
    formData.append("originalMessage", property.originalMessage);
    formData.append("messageToPost", property.messageToPost);

    formData.append("projectCode", property.projectCode);

    setSaving(true)
    try {
      const response = await fetch(`/api/listings/${id}`, {
        method: "PUT",
        // headers: {
        //   "Content-Type": "application/json",
        // },
        body: formData,
        // body: JSON.stringify(property),
      })

      if (response.ok) {
        toast({
          title: "Success",
          description: "Property updated successfully",
        })
        router.push("/dashboard/listings")
      } else {
        toast({
          title: "Error",
          description: "Failed to update property",
          variant: "destructive",
        })
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to update property",
        variant: "destructive",
      })
    } finally {
      setSaving(false)
    }
  }

  const updateProperty = (field: keyof Property, value: any) => {
    if (!property) return
    setProperty({ ...property, [field]: value })
  }
const [preview, setPreviews] = useState<string[]>([])

  const handleFileUpload = async (files: FileList) => {  // files = e.target.files
    if (!files || files.length === 0) return

    // setUploading(true)
    // setUploadProgress(0)
    if (files) {
      const newFileImages = Array.from(files)
      setNewFiles(Array.from(files)); // convert FileList → File[]
      const urls = newFileImages.map((newfile) => URL.createObjectURL(newfile));
    setPreviews(urls);
    }

    // try {
    //   const formData = new FormData()
    //   Array.from(files).forEach((file) => {
    //     formData.append("files", file)
    //   })

    //   const response = await fetch("/api/upload", {
    //     method: "POST",
    //     body: formData,
    //   })

    //   if (!response.ok) {
    //     throw new Error("Upload failed")
    //   }

    //   const result = await response.json()

    //   if (result.success && property) {
    //     const newImageUrls = result.files.map((file: any) => file.url)
    //     setProperty({
    //       ...property,
    //       imageUrls: [...property.imageUrls, ...newImageUrls],
    //     })

    //     toast({
    //       title: "Success",
    //       description: `${result.files.length} image(s) uploaded successfully`,
    //     })
    //   }
    // } catch (error) {
    //   toast({
    //     title: "Error",
    //     description: "Failed to upload images",
    //     variant: "destructive",
    //   })
    // } finally {
    //   setUploading(false)
    //   setUploadProgress(0)
    // }
  }

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()

    const files = e.dataTransfer.files
    if (files.length > 0) {
      handleFileUpload(files)
    }
  }

  const handleFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files
    if (files && files.length > 0) {
      handleFileUpload(files)
    }
  }

  console.log(property?.imageUrls, 44444)
  const [selectedImages, setSelectedImages] = useState<string[]>(property?.imageUrls || []);
  const allCurrentImages = [...selectedImages, ...preview]
  const removeImageUrl = (url: string) => {
    console.log('removeddd')
    setSelectedImages((prev) => prev.filter((img) => img !== url));

    // if (property) {
    //   const 
    //   setProperty({
    //     ...property,
    //     keptImages: []
    //     removedImages: [property.imageUrls]
    //     // imageUrls: property.imageUrls.filter((_, i) => i !== index),
    //   })
    // }
  }

  const addAmenity = () => {
    if (newAmenity.trim() && property) {
      setProperty({
        ...property,
        roomAmenities: [...property.roomAmenities, newAmenity.trim()],
      })
      setNewAmenity("")
    }
  }

  const removeAmenity = (index: number) => {
    if (property) {
      setProperty({
        ...property,
        roomAmenities: property.roomAmenities.filter((_, i) => i !== index),
      })
    }
  }

  if (loading) {
    return (
      <div className="container mx-auto py-8">
        <div className="flex items-center justify-center">
          <div className="text-lg">Loading property...</div>
        </div>
      </div>
    )
  }

  if (!property) {
    return (
      <div className="container mx-auto py-8">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Property Not Found</h1>
          <Button onClick={() => router.push("/properties")}>Back to Properties</Button>
        </div>
      </div>
    )
  }

  return (
    <div className="container mx-auto py-8 max-w-4xl">
      <div className="mb-6">
        <h1 className="text-3xl font-bold">Edit Property</h1>
        <p className="text-muted-foreground">Update property information</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Basic Information */}
          <Card>
            <CardHeader>
              <CardTitle>Basic Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="projectPropertyCode">Property Code</Label>
                <Input
                  id="projectPropertyCode"
                  value={property.projectPropertyCode || ""}
                  onChange={(e) => updateProperty("projectPropertyCode", e.target.value)}
                  placeholder="e.g., RHB-1"
                />
              </div>

              <div>
                <Label htmlFor="status">Status</Label>
                <Select value={property.status} onValueChange={(value) => updateProperty("status", value)}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="pending">pending</SelectItem>
                    <SelectItem value="available">available</SelectItem>
                    <SelectItem value="rented">rented</SelectItem>
                    <SelectItem value="sold">sold</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="roomType">Room Type</Label>
                <Select value={property.roomType} onValueChange={(value) => updateProperty("roomType", value)}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Condo">Condo</SelectItem>
                    <SelectItem value="Townhouse">Townhouse</SelectItem>
                    <SelectItem value="SingleHouse">SingleHouse</SelectItem>
                    <SelectItem value="Apartment">Apartment</SelectItem>
                    <SelectItem value="Other">Other</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="bedRoom">Bedrooms</Label>
                  <Input
                    id="bedRoom"
                    value={property.bedRoom || ""}
                    onChange={(e) => updateProperty("bedRoom", e.target.value)}
                    placeholder="e.g., 2"
                  />
                </div>
                <div>
                  <Label htmlFor="bathRoom">Bathrooms</Label>
                  <Input
                    id="bathRoom"
                    value={property.bathRoom || ""}
                    onChange={(e) => updateProperty("bathRoom", e.target.value)}
                    placeholder="e.g., 2"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="roomSize">Room Size (sqm)</Label>
                  <Input
                    id="roomSize"
                    value={property.roomSize || ""}
                    onChange={(e) => updateProperty("roomSize", e.target.value)}
                    placeholder="e.g., 65.5"
                  />
                </div>
                <div>
                  <Label htmlFor="floor">Floor</Label>
                  <Input
                    id="floor"
                    value={property.floor || ""}
                    onChange={(e) => updateProperty("floor", e.target.value)}
                    placeholder="e.g., 15"
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="whenAvailable">When Available</Label>
                <Input
                  id="whenAvailable"
                  value={property.whenAvailable || ""}
                  onChange={(e) => updateProperty("whenAvailable", e.target.value)}
                  placeholder="e.g., Immediately, Next month"
                />
              </div>

              <div className="flex items-center space-x-2">
                <Checkbox
                  id="isAcceptShortTerm"
                  checked={property.isAcceptShortTerm || false}
                  onCheckedChange={(checked) => updateProperty("isAcceptShortTerm", checked)}
                />
                <Label htmlFor="isAcceptShortTerm">Accept Short Term Rental</Label>
              </div>

              <div className="flex items-center space-x-2">
                <Checkbox
                  id="isPetFriendly"
                  checked={property.isPetFriendly || false}
                  onCheckedChange={(checked) => updateProperty("isPetFriendly", checked)}
                />
                <Label htmlFor="isPetFriendly">Pet Friendly</Label>
              </div>
            </CardContent>
          </Card>

          {/* Location Details */}
          <Card>
            <CardHeader>
              <CardTitle>Location Details</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="addressNumber">Address Number</Label>
                <Input
                  id="addressNumber"
                  value={property.addressNumber || ""}
                  onChange={(e) => updateProperty("addressNumber", e.target.value)}
                  placeholder="e.g., 42/188"
                />
              </div>

              <div>
                <Label htmlFor="building">Building</Label>
                <Input
                  id="building"
                  value={property.building || ""}
                  onChange={(e) => updateProperty("building", e.target.value)}
                  placeholder="e.g., Tower A"
                />
              </div>

              <div>
                <Label htmlFor="carPark">Car Park</Label>
                <Input
                  id="carPark"
                  value={property.carPark || ""}
                  onChange={(e) => updateProperty("carPark", e.target.value)}
                  placeholder="e.g., 1 space, Underground"
                />
              </div>

              <div>
                <Label htmlFor="projectCode">Project Code</Label>
                <Input
                  id="projectCode"
                  value={property.projectCode}
                  onChange={(e) => updateProperty("projectCode", e.target.value)}
                  placeholder="e.g., PROJ001"
                />
              </div>
            </CardContent>
          </Card>

          {/* Pricing Information */}
          <Card>
            <CardHeader>
              <CardTitle>Pricing Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="rentalRate">Rental Rate</Label>
                <Input
                  id="rentalRate"
                  value={property.rentalRate || ""}
                  onChange={(e) => updateProperty("rentalRate", e.target.value)}
                  placeholder="e.g., 35,000 THB/month"
                />
              </div>

              <div>
                <Label htmlFor="sellPrice">Sell Price</Label>
                <Input
                  id="sellPrice"
                  value={property.sellPrice || ""}
                  onChange={(e) => updateProperty("sellPrice", e.target.value)}
                  placeholder="e.g., 8.5M THB"
                />
              </div>
            </CardContent>
          </Card>

          {/* Contact Information */}
          <Card>
            <CardHeader>
              <CardTitle>Contact Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="phone">Phone</Label>
                <Input
                  id="phone"
                  value={property.phone || ""}
                  onChange={(e) => updateProperty("phone", e.target.value)}
                  placeholder="e.g., +66-2-123-4567"
                />
              </div>

              <div>
                <Label htmlFor="lineId">Line ID</Label>
                <Input
                  id="lineId"
                  value={property.lineId || ""}
                  onChange={(e) => updateProperty("lineId", e.target.value)}
                  placeholder="e.g., @mylineid"
                />
              </div>

              <div>
                <Label htmlFor="fbUser">Facebook User</Label>
                <Input
                  id="fbUser"
                  value={property.fbUser || ""}
                  onChange={(e) => updateProperty("fbUser", e.target.value)}
                  placeholder="e.g., John Smith"
                />
              </div>

              <div className="flex items-center space-x-2">
                <Checkbox
                  id="isOwner"
                  checked={property.isOwner || false}
                  onCheckedChange={(checked) => updateProperty("isOwner", checked)}
                />
                <Label htmlFor="isOwner">Is Owner</Label>
              </div>

              <div>
                <Label htmlFor="linkPost">Link Post</Label>
                <Input
                  id="linkPost"
                  value={property.linkPost || ""}
                  onChange={(e) => updateProperty("linkPost", e.target.value)}
                  placeholder="https://..."
                />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Property Images */}
        <Card>
          <CardHeader>
            <CardTitle>Property Images</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div
              className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-gray-400 transition-colors"
              onDragOver={handleDragOver}
              onDrop={handleDrop}
            >
              <input
                ref={fileInputRef}
                type="file"
                multiple
                accept="image/*"
                onChange={handleFileInputChange}
                className="hidden"
              />

              {uploading ? (
                <div className="space-y-4">
                  <Upload className="h-8 w-8 mx-auto text-blue-500 animate-pulse" />
                  <div>
                    <p className="text-sm text-gray-600 mb-2">Uploading images...</p>
                    <Progress value={uploadProgress} className="w-full max-w-xs mx-auto" />
                  </div>
                </div>
              ) : (
                <div className="space-y-4">
                  <ImageIcon className="h-8 w-8 mx-auto text-gray-400" />
                  <div>
                    <p className="text-sm text-gray-600 mb-2">
                      Drag and drop images here, or{" "}
                      <button
                        type="button"
                        onClick={() => fileInputRef.current?.click()}
                        className="text-blue-500 hover:text-blue-600 underline"
                      >
                        browse files
                      </button>
                    </p>
                    <p className="text-xs text-gray-500">Supports: JPG, PNG, GIF (Max 10MB per file)</p>
                  </div>
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => fileInputRef.current?.click()}
                    disabled={uploading}
                  >
                    <Upload className="h-4 w-4 mr-2" />
                    Select Images
                  </Button>
                </div>
              )}
            </div>

            {property.imageUrls.length > 0 && (
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {allCurrentImages.map((url, index) => (
                  <div key={index} className="relative group">
                    <div className="aspect-square bg-gray-100 rounded-lg overflow-hidden">
                    
                      <img
                        src={url || "/placeholder.svg"}
                        alt={`Property image ${index + 1}`}
                        className="w-full h-full object-cover"
                        onError={(e) => {
                          const target = e.target as HTMLImageElement
                          // target.src = "/modern-house-exterior.png"
                        }}
                      />
                    </div>
                    <Button
                      type="button"
                      variant="destructive"
                      size="sm"
                      className="absolute top-2 right-2 h-6 w-6 p-0 opacity-0 group-hover:opacity-100 transition-opacity"
                      onClick={() => removeImageUrl(url)}
                    >
                      <X className="h-3 w-3" />
                    </Button>
                    <div className="absolute bottom-2 left-2 right-2">
                      <Badge variant="secondary" className="text-xs truncate w-full">
                        {/* Image {index + 1} */}
                        {url}
                      </Badge>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>

        {/* Room Amenities */}
        <Card>
          <CardHeader>
            <CardTitle>Room Amenities</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex gap-2">
              <Input
                value={newAmenity}
                onChange={(e) => setNewAmenity(e.target.value)}
                placeholder="Enter amenity (e.g., Air Conditioning, WiFi)"
                className="flex-1"
              />
              <Button type="button" onClick={addAmenity} size="sm">
                <Plus className="h-4 w-4" />
                Add
              </Button>
            </div>

            <div className="flex flex-wrap gap-2">
              {property.roomAmenities.map((amenity, index) => (
                <div key={index} className="relative group">
                  <Badge variant="outline" className="pr-6">
                    {amenity}
                  </Badge>
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    className="absolute -top-1 -right-1 h-5 w-5 p-0 opacity-0 group-hover:opacity-100"
                    onClick={() => removeAmenity(index)}
                  >
                    <X className="h-3 w-3" />
                  </Button>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Notes Section */}
        <Card>
          <CardHeader>
            <CardTitle>Additional Information</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="note">Public Notes</Label>
              <Textarea
                id="note"
                rows={3}
                value={property.note || ""}
                onChange={(e) => updateProperty("note", e.target.value)}
                placeholder="Public notes visible to clients..."
              />
            </div>

            <div>
              <Label htmlFor="originalMessage">Original Message</Label>
              <Textarea
                id="originalMessage"
                rows={3}
                value={property.originalMessage || ""}
                onChange={(e) => updateProperty("originalMessage", e.target.value)}
                placeholder="Original message from listing..."
              />
            </div>

            <div>
              <Label htmlFor="messageToPost">Message to Post</Label>
              <Textarea
                id="messageToPost"
                rows={3}
                value={property.messageToPost || ""}
                onChange={(e) => updateProperty("messageToPost", e.target.value)}
                placeholder="Message for posting..."
              />
            </div>
          </CardContent>
        </Card>

        {/* Action Buttons */}
        <div className="flex gap-4 justify-end">
          <Button type="button" variant="outline" onClick={() => router.push("/properties")}>
            Cancel
          </Button>
          <Button type="submit" disabled={saving}>
            {saving ? "Saving..." : "Save Changes"}
          </Button>
        </div>
      </form>
    </div>
  )
}
