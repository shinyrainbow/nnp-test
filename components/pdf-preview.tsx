"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { FileText, Eye } from "lucide-react"
import { useLanguage } from "@/contexts/language-context"
// import { useTranslations } from "next-intl"

interface ContractData {
  tenantName: string
  tenantEmail: string
  tenantPhone: string
  tenantAddress: string
  passportPhoto: File | null
  propertyAddress: string
  propertyType: string
  bedrooms: string
  bathrooms: string
  startDate: string
  endDate: string
  monthlyRent: string
  securityDeposit: string
  leaseTerm: string
  petPolicy: string
  smokingPolicy: string
  additionalTerms: string
}

interface PDFPreviewProps {
  contractData: ContractData
}

export function PDFPreview({ contractData }: PDFPreviewProps) {
  // const t = useTranslations("pdfPreview")
  const {t, language: locale} = useLanguage()
  const formatDate = (dateString: string) => {
    if (!dateString) return "Not specified"
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    })
  }

  const formatCurrency = (amount: string) => {
    if (!amount) return "$0.00"
    return `$${Number.parseFloat(amount).toLocaleString()}`
  }

  return (
    <div className="sticky top-8">
      <Card className="h-fit">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Eye className="w-5 h-5" />
            {t("title")}
          </CardTitle>
        </CardHeader>
        <CardContent>
          {/* PDF Frame */}
          <div className="bg-white border-2 border-gray-200 rounded-lg shadow-lg overflow-hidden">
            {/* PDF Toolbar */}
            <div className="bg-gray-100 px-4 py-2 border-b flex items-center justify-between">
              <div className="flex items-center gap-2">
                <FileText className="w-4 h-4 text-gray-600" />
                <span className="text-sm font-medium text-gray-700">{t("rentalAgreement")}</span>
              </div>
              <Badge variant="secondary" className="text-xs">
                {t("preview")}
              </Badge>
            </div>

            {/* PDF Content */}
            <div className="p-6 bg-white text-sm leading-relaxed max-h-[600px] overflow-y-auto">
              {/* Header */}
              <div className="text-center mb-8">
                <h1 className="text-2xl font-bold text-gray-900 mb-2">{t("documentTitle")}</h1>
                <div className="w-24 h-1 bg-blue-600 mx-auto"></div>
              </div>

              {/* Parties Section */}
              <div className="mb-6">
                <h2 className="text-lg font-semibold text-gray-800 mb-3 border-b border-gray-200 pb-1">
                  {t("sections.parties")}
                </h2>
                <div className="space-y-2">
                  <p>
                    <span className="font-medium">{t("fields.tenant")}</span>{" "}
                    <span className={contractData.tenantName ? "text-gray-900" : "text-gray-400"}>
                      {contractData.tenantName || t("placeholders.tenantName")}
                    </span>
                  </p>
                  <p>
                    <span className="font-medium">{t("fields.email")}</span>{" "}
                    <span className={contractData.tenantEmail ? "text-gray-900" : "text-gray-400"}>
                      {contractData.tenantEmail || t("placeholders.tenantEmail")}
                    </span>
                  </p>
                  <p>
                    <span className="font-medium">{t("fields.phone")}</span>{" "}
                    <span className={contractData.tenantPhone ? "text-gray-900" : "text-gray-400"}>
                      {contractData.tenantPhone || t("placeholders.tenantPhone")}
                    </span>
                  </p>
                  <p>
                    <span className="font-medium">{t("fields.currentAddress")}</span>{" "}
                    <span className={contractData.tenantAddress ? "text-gray-900" : "text-gray-400"}>
                      {contractData.tenantAddress || t("placeholders.currentAddress")}
                    </span>
                  </p>
                </div>
              </div>

              {/* Property Section */}
              <div className="mb-6">
                <h2 className="text-lg font-semibold text-gray-800 mb-3 border-b border-gray-200 pb-1">
                  {t("sections.property")}
                </h2>
                <div className="space-y-2">
                  <p>
                    <span className="font-medium">{t("fields.propertyAddress")}</span>{" "}
                    <span className={contractData.propertyAddress ? "text-gray-900" : "text-gray-400"}>
                      {contractData.propertyAddress || t("placeholders.propertyAddress")}
                    </span>
                  </p>
                  <div className="grid grid-cols-3 gap-4 mt-2">
                    <p>
                      <span className="font-medium">{t("fields.type")}</span>{" "}
                      <span className={contractData.propertyType ? "text-gray-900" : "text-gray-400"}>
                        {contractData.propertyType || t("placeholders.type")}
                      </span>
                    </p>
                    <p>
                      <span className="font-medium">{t("fields.bedrooms")}</span>{" "}
                      <span className={contractData.bedrooms ? "text-gray-900" : "text-gray-400"}>
                        {contractData.bedrooms || t("placeholders.bedrooms")}
                      </span>
                    </p>
                    <p>
                      <span className="font-medium">{t("fields.bathrooms")}</span>{" "}
                      <span className={contractData.bathrooms ? "text-gray-900" : "text-gray-400"}>
                        {contractData.bathrooms || t("placeholders.bathrooms")}
                      </span>
                    </p>
                  </div>
                </div>
              </div>

              {/* Lease Terms Section */}
              <div className="mb-6">
                <h2 className="text-lg font-semibold text-gray-800 mb-3 border-b border-gray-200 pb-1">
                  {t("sections.leaseTerms")}
                </h2>
                <div className="space-y-2">
                  <p>
                    <span className="font-medium">{t("fields.leasePeriod")}</span>{" "}
                    <span className={contractData.startDate ? "text-gray-900" : "text-gray-400"}>
                      {formatDate(contractData.startDate)}
                    </span>{" "}
                    to{" "}
                    <span className={contractData.endDate ? "text-gray-900" : "text-gray-400"}>
                      {formatDate(contractData.endDate)}
                    </span>
                  </p>
                  <p>
                    <span className="font-medium">{t("fields.leaseTerm")}</span>{" "}
                    <span className={contractData.leaseTerm ? "text-gray-900" : "text-gray-400"}>
                      {contractData.leaseTerm || t("placeholders.leaseTerm")}
                    </span>
                  </p>
                </div>
              </div>

              {/* Financial Terms Section */}
              <div className="mb-6">
                <h2 className="text-lg font-semibold text-gray-800 mb-3 border-b border-gray-200 pb-1">
                  {t("sections.financialTerms")}
                </h2>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <div className="grid grid-cols-2 gap-4">
                    <p>
                      <span className="font-medium">{t("fields.monthlyRent")}</span>{" "}
                      <span className="text-lg font-bold text-green-600">
                        {formatCurrency(contractData.monthlyRent)}
                      </span>
                    </p>
                    <p>
                      <span className="font-medium">{t("fields.securityDeposit")}</span>{" "}
                      <span className="text-lg font-bold text-blue-600">
                        {formatCurrency(contractData.securityDeposit)}
                      </span>
                    </p>
                  </div>
                </div>
              </div>

              {/* Policies Section */}
              <div className="mb-6">
                <h2 className="text-lg font-semibold text-gray-800 mb-3 border-b border-gray-200 pb-1">
                  {t("sections.propertyPolicies")}
                </h2>
                <div className="space-y-2">
                  <p>
                    <span className="font-medium">{t("fields.petPolicy")}</span>{" "}
                    <span className={contractData.petPolicy ? "text-gray-900" : "text-gray-400"}>
                      {contractData.petPolicy || t("placeholders.petPolicy")}
                    </span>
                  </p>
                  <p>
                    <span className="font-medium">{t("fields.smokingPolicy")}</span>{" "}
                    <span className={contractData.smokingPolicy ? "text-gray-900" : "text-gray-400"}>
                      {contractData.smokingPolicy || t("placeholders.smokingPolicy")}
                    </span>
                  </p>
                </div>
              </div>

              {/* Additional Terms Section */}
              {contractData.additionalTerms && (
                <div className="mb-6">
                  <h2 className="text-lg font-semibold text-gray-800 mb-3 border-b border-gray-200 pb-1">
                    {t("sections.additionalTerms")}
                  </h2>
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <p className="text-gray-700 whitespace-pre-wrap">{contractData.additionalTerms}</p>
                  </div>
                </div>
              )}

              {/* Signature Section */}
              <div className="mt-8 pt-6 border-t border-gray-200">
                <h2 className="text-lg font-semibold text-gray-800 mb-4">{t("sections.signatures")}</h2>
                <div className="grid grid-cols-2 gap-8">
                  <div>
                    <div className="border-b border-gray-300 mb-2 h-8"></div>
                    <p className="text-sm text-gray-600">{t("fields.landlordSignature")}</p>
                  </div>
                  <div>
                    <div className="border-b border-gray-300 mb-2 h-8"></div>
                    <p className="text-sm text-gray-600">{t("fields.tenantSignature")}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Preview Status */}
          <div className="mt-4 p-3 bg-blue-50 rounded-lg border border-blue-200">
            <p className="text-sm text-blue-800">
              <span className="font-medium">{t("livePreview")}</span> {t("livePreviewText")}
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
