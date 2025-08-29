'use client'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Plus, FileText, Calendar, User, Download } from "lucide-react"
import Link from "next/link"
import { useLanguage } from "@/contexts/language-context"

// Mock data for demonstration
const contracts = [
  {
    id: 1,
    tenantName: "John Smith",
    property: "123 Main St, Apt 2B",
    startDate: "2024-01-15",
    endDate: "2024-12-15",
    monthlyRent: 1200,
    status: "active",
  },
  {
    id: 2,
    tenantName: "Sarah Johnson",
    property: "456 Oak Ave, Unit 5",
    startDate: "2024-02-01",
    endDate: "2025-01-31",
    monthlyRent: 1500,
    status: "active",
  },
  {
    id: 3,
    tenantName: "Mike Davis",
    property: "789 Pine St, Apt 1A",
    startDate: "2023-06-01",
    endDate: "2024-05-31",
    monthlyRent: 1100,
    status: "expired",
  },
]


export default function Contracts() {
  const {t} = useLanguage()
    return (
      <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">{t("contracts.title")}</h1>
            <p className="text-gray-600 mt-2">{t("contracts.subtitle")}</p>
          </div>
          <Button asChild size="lg" className="gap-2">
            <Link href="/dashboard/contract-builder/new">
              <Plus className="w-5 h-5" />
              {t("contracts.createNew")}
            </Link>
          </Button>
        </div>
    
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">{t("contracts.stats.total")}</CardTitle>
              <FileText className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{contracts.length}</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">{t("contracts.stats.active")}</CardTitle>
              <User className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {contracts.filter((c) => c.status === "active").length}
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">{t("contracts.stats.revenue")}</CardTitle>
              <Calendar className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                $
                {contracts
                  .filter((c) => c.status === "active")
                  .reduce((sum, c) => sum + c.monthlyRent, 0)
                  .toLocaleString()}
              </div>
            </CardContent>
          </Card>
        </div>
    
        {/* Contracts List */}
        <Card>
          <CardHeader>
            <CardTitle>{t("contracts.recent.title")}</CardTitle>
            <CardDescription>{t("contracts.recent.desc")}</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {contracts.map((contract) => (
                <div
                  key={contract.id}
                  className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50 transition-colors"
                >
                  <div className="flex items-center space-x-4">
                    <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                      <User className="w-5 h-5 text-blue-600" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900">{contract.tenantName}</h3>
                      <p className="text-sm text-gray-600">{contract.property}</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-4">
                    <div className="text-right">
                      <p className="font-semibold">${contract.monthlyRent}/month</p>
                      <p className="text-sm text-gray-600">
                        {new Date(contract.startDate).toLocaleDateString()} -{" "}
                        {new Date(contract.endDate).toLocaleDateString()}
                      </p>
                    </div>
                    <Badge
                      variant={contract.status === "active" ? "default" : "secondary"}
                    >
                      {contract.status === "active"
                        ? t("contracts.status.active")
                        : t("contracts.status.expired")}
                    </Badge>
                    <Button variant="outline" size="sm" className="gap-2 bg-transparent">
                      <Download className="w-4 h-4" />
                      {t("contracts.download")}
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
    
    )
  }