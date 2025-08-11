"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { FileUpload } from "@/components/file-upload"
import { Calendar, MapPin, DollarSign, FileText, Download, ArrowLeft } from "lucide-react"
import Link from "next/link"
import { PDFPreview } from "@/components/pdf-preview"
import { useLanguage } from "@/contexts/language-context"
// import { useTranslations, useLocale } from "next-intl"

interface ContractData {
  // Tenant Information
  tenantName: string
  tenantEmail: string
  tenantPhone: string
  tenantAddress: string
  passportPhoto: File | null

  // Property Information
  propertyAddress: string
  propertyType: string
  bedrooms: string
  bathrooms: string

  // Lease Terms
  startDate: string
  endDate: string
  monthlyRent: string
  securityDeposit: string
  leaseTerm: string

  // Additional Terms
  petPolicy: string
  smokingPolicy: string
  additionalTerms: string
}

export function ContractBuilder() {
  // const t = useTranslations("contractBuilder")
  // const locale = useLocale()
  const {t, language: locale} = useLanguage()

  const [contractData, setContractData] = useState<ContractData>({
    tenantName: "",
    tenantEmail: "",
    tenantPhone: "",
    tenantAddress: "",
    passportPhoto: null,
    propertyAddress: "",
    propertyType: "",
    bedrooms: "",
    bathrooms: "",
    startDate: "",
    endDate: "",
    monthlyRent: "",
    securityDeposit: "",
    leaseTerm: "",
    petPolicy: "",
    smokingPolicy: "",
    additionalTerms: "",
  })

  const [isGenerating, setIsGenerating] = useState(false)

  const handleInputChange = (field: keyof ContractData, value: string) => {
    setContractData((prev) => ({ ...prev, [field]: value }))
  }

  const handleFileUpload = (file: File | null) => {
    setContractData((prev) => ({ ...prev, passportPhoto: file }))
  }

  const handleGenerateContract = async () => {
    setIsGenerating(true)

    // Simulate PDF generation
    setTimeout(() => {
      // In a real app, you would call an API to generate the PDF
      const blob = new Blob(["Sample PDF content"], { type: "application/pdf" })
      const url = URL.createObjectURL(blob)
      const a = document.createElement("a")
      a.href = url
      a.download = `rental-contract-${contractData.tenantName.replace(/\s+/g, "-").toLowerCase()}.pdf`
      document.body.appendChild(a)
      a.click()
      document.body.removeChild(a)
      URL.revokeObjectURL(url)
      setIsGenerating(false)
    }, 2000)
  }

  return (
    <div className="space-y-6">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">{t("title")}</h1>
        <p className="text-gray-600 mt-2">{t("subtitle")}</p>
      </div>

      <div className="flex items-center gap-4 mb-6">
        <Button variant="outline" size="sm" asChild>
          <Link href={`/${locale}`} className="gap-2">
            <ArrowLeft className="w-4 h-4" />
            {t("navigation.backToDashboard")}
          </Link>
        </Button>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
        {/* Form Section */}
        <div className="xl:col-span-2 space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Tenant Information */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <FileText className="w-5 h-5" />
                  {t("tenantInformation.title")}
                </CardTitle>
                <CardDescription>{t("tenantInformation.subtitle")}</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="tenantName">{t("tenantInformation.fullName")}</Label>
                    <Input
                      id="tenantName"
                      value={contractData.tenantName}
                      onChange={(e) => handleInputChange("tenantName", e.target.value)}
                      placeholder={t("tenantInformation.placeholders.fullName")}
                    />
                  </div>
                  <div>
                    <Label htmlFor="tenantEmail">{t("tenantInformation.email")}</Label>
                    <Input
                      id="tenantEmail"
                      type="email"
                      value={contractData.tenantEmail}
                      onChange={(e) => handleInputChange("tenantEmail", e.target.value)}
                      placeholder={t("tenantInformation.placeholders.email")}
                    />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="tenantPhone">{t("tenantInformation.phone")}</Label>
                    <Input
                      id="tenantPhone"
                      value={contractData.tenantPhone}
                      onChange={(e) => handleInputChange("tenantPhone", e.target.value)}
                      placeholder={t("tenantInformation.placeholders.phone")}
                    />
                  </div>
                </div>
                <div>
                  <Label htmlFor="tenantAddress">{t("tenantInformation.currentAddress")}</Label>
                  <Textarea
                    id="tenantAddress"
                    value={contractData.tenantAddress}
                    onChange={(e) => handleInputChange("tenantAddress", e.target.value)}
                    placeholder={t("tenantInformation.placeholders.currentAddress")}
                    rows={2}
                  />
                </div>
                <div>
                  <Label>{t("tenantInformation.passportPhoto")}</Label>
                  <FileUpload onFileUpload={handleFileUpload} />
                </div>
              </CardContent>
            </Card>

            {/* Continue with other form sections using translations... */}
            {/* I'll show the pattern for Property Information */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <MapPin className="w-5 h-5" />
                  {t("propertyInformation.title")}
                </CardTitle>
                <CardDescription>{t("propertyInformation.subtitle")}</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="propertyAddress">{t("propertyInformation.propertyAddress")}</Label>
                  <Textarea
                    id="propertyAddress"
                    value={contractData.propertyAddress}
                    onChange={(e) => handleInputChange("propertyAddress", e.target.value)}
                    placeholder={t("propertyInformation.placeholders.propertyAddress")}
                    rows={2}
                  />
                </div>
                <div className="grid grid-cols-3 gap-4">
                  <div>
                    <Label htmlFor="propertyType">{t("propertyInformation.propertyType")}</Label>
                    <Select onValueChange={(value) => handleInputChange("propertyType", value)}>
                      <SelectTrigger>
                        <SelectValue placeholder={t("propertyInformation.selectType")} />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="apartment">{t("propertyInformation.types.apartment")}</SelectItem>
                        <SelectItem value="house">{t("propertyInformation.types.house")}</SelectItem>
                        <SelectItem value="condo">{t("propertyInformation.types.condo")}</SelectItem>
                        <SelectItem value="townhouse">{t("propertyInformation.types.townhouse")}</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label htmlFor="bedrooms">Bedrooms</Label>
                    <Select onValueChange={(value) => handleInputChange("bedrooms", value)}>
                      <SelectTrigger>
                        <SelectValue placeholder="Beds" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="1">1</SelectItem>
                        <SelectItem value="2">2</SelectItem>
                        <SelectItem value="3">3</SelectItem>
                        <SelectItem value="4">4+</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label htmlFor="bathrooms">Bathrooms</Label>
                    <Select onValueChange={(value) => handleInputChange("bathrooms", value)}>
                      <SelectTrigger>
                        <SelectValue placeholder="Baths" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="1">1</SelectItem>
                        <SelectItem value="1.5">1.5</SelectItem>
                        <SelectItem value="2">2</SelectItem>
                        <SelectItem value="2.5">2.5</SelectItem>
                        <SelectItem value="3">3+</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Lease Terms */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Calendar className="w-5 h-5" />
                  Lease Terms
                </CardTitle>
                <CardDescription>Set the lease duration and dates</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="startDate">Start Date</Label>
                    <Input
                      id="startDate"
                      type="date"
                      value={contractData.startDate}
                      onChange={(e) => handleInputChange("startDate", e.target.value)}
                    />
                  </div>
                  <div>
                    <Label htmlFor="endDate">End Date</Label>
                    <Input
                      id="endDate"
                      type="date"
                      value={contractData.endDate}
                      onChange={(e) => handleInputChange("endDate", e.target.value)}
                    />
                  </div>
                </div>
                <div>
                  <Label htmlFor="leaseTerm">Lease Term</Label>
                  <Select onValueChange={(value) => handleInputChange("leaseTerm", value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select lease term" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="6-months">6 Months</SelectItem>
                      <SelectItem value="1-year">1 Year</SelectItem>
                      <SelectItem value="2-years">2 Years</SelectItem>
                      <SelectItem value="month-to-month">Month-to-Month</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </CardContent>
            </Card>

            {/* Financial Terms */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <DollarSign className="w-5 h-5" />
                  Financial Terms
                </CardTitle>
                <CardDescription>Set rent and deposit amounts</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="monthlyRent">Monthly Rent</Label>
                    <Input
                      id="monthlyRent"
                      type="number"
                      value={contractData.monthlyRent}
                      onChange={(e) => handleInputChange("monthlyRent", e.target.value)}
                      placeholder="1200"
                    />
                  </div>
                  <div>
                    <Label htmlFor="securityDeposit">Security Deposit</Label>
                    <Input
                      id="securityDeposit"
                      type="number"
                      value={contractData.securityDeposit}
                      onChange={(e) => handleInputChange("securityDeposit", e.target.value)}
                      placeholder="1200"
                    />
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Additional Terms */}
            <Card className="lg:col-span-2">
              <CardHeader>
                <CardTitle>Additional Terms & Policies</CardTitle>
                <CardDescription>Set specific policies and additional terms</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="petPolicy">Pet Policy</Label>
                    <Select onValueChange={(value) => handleInputChange("petPolicy", value)}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select pet policy" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="no-pets">No Pets Allowed</SelectItem>
                        <SelectItem value="cats-only">Cats Only</SelectItem>
                        <SelectItem value="dogs-only">Dogs Only</SelectItem>
                        <SelectItem value="pets-allowed">Pets Allowed</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label htmlFor="smokingPolicy">Smoking Policy</Label>
                    <Select onValueChange={(value) => handleInputChange("smokingPolicy", value)}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select smoking policy" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="no-smoking">No Smoking</SelectItem>
                        <SelectItem value="outdoor-only">Outdoor Only</SelectItem>
                        <SelectItem value="smoking-allowed">Smoking Allowed</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <div>
                  <Label htmlFor="additionalTerms">Additional Terms & Conditions</Label>
                  <Textarea
                    id="additionalTerms"
                    value={contractData.additionalTerms}
                    onChange={(e) => handleInputChange("additionalTerms", e.target.value)}
                    placeholder="Enter any additional terms, conditions, or special agreements..."
                    rows={4}
                  />
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Generate Contract Button */}
          <div className="flex justify-center pt-6">
            <Button
              size="lg"
              onClick={handleGenerateContract}
              disabled={isGenerating || !contractData.tenantName || !contractData.propertyAddress}
              className="gap-2 px-8"
            >
              {isGenerating ? (
                <>
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  {t("generatingContract")}
                </>
              ) : (
                <>
                  <Download className="w-5 h-5" />
                  {t("generateContract")}
                </>
              )}
            </Button>
          </div>
        </div>

        {/* PDF Preview Section */}
        <div className="xl:col-span-1">
          <PDFPreview contractData={contractData} />
        </div>
      </div>
    </div>
  )
}
