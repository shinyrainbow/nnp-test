"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  CardContent,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { FileUpload } from "@/components/file-upload";
import {
  Calendar,
  MapPin,
  DollarSign,
  FileText,
  Download,
  ArrowLeft,
  Loader2,
} from "lucide-react";
import Link from "next/link";
import { PDFPreview } from "@/components/pdf-preview";
import { useLanguage } from "@/contexts/language-context";
import ExpandableCard from "./expandableCard";
import { useToast } from "@/hooks/use-toast";
import { generateContractPDF } from "@/lib/pdf-generator";

interface ContractData {
  // Tenant Information
  tenantName: string;
  tenantEmail: string;
  tenantPhone: string;
  tenantAddress: string;
  passportPhoto: File | null;

  // Property Information
  propertyAddress: string;
  propertyType: string;
  bedrooms: string;
  bathrooms: string;

  // Lease Terms
  startDate: string;
  endDate: string;
  monthlyRent: string;
  securityDeposit: string;
  leaseTerm: string;

  // Additional Terms
  petPolicy: string;
  smokingPolicy: string;
  additionalTerms: string;
}

export function RentalContractBuilder() {
  // const t = useTranslations("contractBuilder")
  // const locale = useLocale()
  const { t } = useLanguage();

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
  });

  const [isGenerating, setIsGenerating] = useState(false);

  const handleInputChange = (field: keyof ContractData, value: string) => {
    setContractData((prev) => ({ ...prev, [field]: value }));
  };

  const handleFileUpload = (file: File | null) => {
    setContractData((prev) => ({ ...prev, passportPhoto: file }));
  };

  const handleGenerateContract = async () => {
    setIsGenerating(true);

    // Simulate PDF generation
    setTimeout(() => {
      // In a real app, you would call an API to generate the PDF
      const blob = new Blob(["Sample PDF content"], {
        type: "application/pdf",
      });
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `rental-contract-${contractData.tenantName
        .replace(/\s+/g, "-")
        .toLowerCase()}.pdf`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
      setIsGenerating(false);
    }, 2000);
  };
  const [isGeneratingPDF, setIsGeneratingPDF] = useState(false);
  const { toast } = useToast();

  const handleDownloadPDF = async () => {
    try {
      setIsGeneratingPDF(true);
      await generateContractPDF(contractData);
      toast({
        title: "success",
        description: "Your rental contract has been downloaded.",
      });
    } catch (error) {
      console.error("Error generating PDF:", error);
      toast({
        title: "PDF Generation Failed",
        description:
          "There was an error generating your PDF. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsGeneratingPDF(false);
    }
  };
  return (
    <div className="space-y-6">
      {/* top */}
      {/* <div className="mb-8">
        hello
        <h1 className="text-3xl font-bold text-gray-900">
          {t("newContract.title")}
        </h1>
        <p className="text-gray-600 mt-2">{t("newContract.subtitle")}</p>
      </div> */}

      {/* back */}
      {/* <div className="flex items-center gap-4 mb-6">
        <Button variant="outline" size="sm" asChild>
          <Link href={`/dashboard/contract-builder`} className="gap-2">
            <ArrowLeft className="w-4 h-4" />
            {t("newContract.navigation.backToDashboard")}
          </Link>
        </Button>
      </div> */}

      <div className="grid xl:grid-cols-2 gap-8">
        {/* Form Section */}
        <div className="xl:col-span-2 space-y-6">
          <div className="grid gap-6">
            <ExpandableCard
              title={t("newContract.tenantInformation.title")}
              subtitle={t("newContract.tenantInformation.subtitle")}
              icon={FileText}
            >
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="tenantName">
                      {t("newContract.tenantInformation.fullName")}
                    </Label>
                    <Input
                      id="tenantName"
                      value={contractData.tenantName}
                      onChange={(e) =>
                        handleInputChange("tenantName", e.target.value)
                      }
                      placeholder={t(
                        "newContract.tenantInformation.placeholders.fullName"
                      )}
                    />
                  </div>
                  <div>
                    <Label htmlFor="tenantEmail">
                      {t("newContract.tenantInformation.email")}
                    </Label>
                    <Input
                      id="tenantEmail"
                      type="email"
                      value={contractData.tenantEmail}
                      onChange={(e) =>
                        handleInputChange("tenantEmail", e.target.value)
                      }
                      placeholder={t(
                        "newContract.tenantInformation.placeholders.email"
                      )}
                    />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="tenantPhone">
                      {t("newContract.tenantInformation.phone")}
                    </Label>
                    <Input
                      id="tenantPhone"
                      value={contractData.tenantPhone}
                      onChange={(e) =>
                        handleInputChange("tenantPhone", e.target.value)
                      }
                      placeholder={t(
                        "newContract.tenantInformation.placeholders.phone"
                      )}
                    />
                  </div>
                </div>
                <div>
                  <Label htmlFor="tenantAddress">
                    {t("newContract.tenantInformation.currentAddress")}
                  </Label>
                  <Textarea
                    id="tenantAddress"
                    value={contractData.tenantAddress}
                    onChange={(e) =>
                      handleInputChange("tenantAddress", e.target.value)
                    }
                    placeholder={t(
                      "newContract.tenantInformation.placeholders.currentAddress"
                    )}
                    rows={2}
                  />
                </div>
                <div>
                  <Label>
                    {t("newContract.tenantInformation.passportPhoto")}
                  </Label>
                  <FileUpload onFileUpload={handleFileUpload} />
                </div>
              </CardContent>
              {/* Your tenant form fields here */}
            </ExpandableCard>
            <ExpandableCard
              title={t("newContract.propertyInformation.title")}
              subtitle={t("newContract.propertyInformation.subtitle")}
              icon={MapPin}
            >
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="propertyAddress">
                    {t("newContract.propertyInformation.propertyAddress")}
                  </Label>
                  <Textarea
                    id="propertyAddress"
                    value={contractData.propertyAddress}
                    onChange={(e) =>
                      handleInputChange("propertyAddress", e.target.value)
                    }
                    placeholder={t(
                      "newContract.propertyInformation.placeholders.propertyAddress"
                    )}
                    rows={2}
                  />
                </div>
                <div className="grid grid-cols-3 gap-4">
                  <div>
                    <Label htmlFor="propertyType">
                      {t("newContract.propertyInformation.propertyType")}
                    </Label>
                    <Select
                      onValueChange={(value) =>
                        handleInputChange("propertyType", value)
                      }
                    >
                      <SelectTrigger>
                        <SelectValue
                          placeholder={t(
                            "newContract.propertyInformation.selectType"
                          )}
                        />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="apartment">
                          {t("newContract.propertyInformation.types.apartment")}
                        </SelectItem>
                        <SelectItem value="house">
                          {t("newContract.propertyInformation.types.house")}
                        </SelectItem>
                        <SelectItem value="condo">
                          {t("newContract.propertyInformation.types.condo")}
                        </SelectItem>
                        <SelectItem value="townhouse">
                          {t("newContract.propertyInformation.types.townhouse")}
                        </SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label htmlFor="bedrooms">Bedrooms</Label>
                    <Select
                      onValueChange={(value) =>
                        handleInputChange("bedrooms", value)
                      }
                    >
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
                    <Select
                      onValueChange={(value) =>
                        handleInputChange("bathrooms", value)
                      }
                    >
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
              {/* Your property form fields here */}
            </ExpandableCard>
            <ExpandableCard
              title={t("newContract.leaseTerms.title")}
              subtitle={t("newContract.leaseTerms.subtitle")}
              icon={Calendar}
            >
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="startDate">
                      {t("newContract.leaseTerms.startDate")}
                    </Label>
                    <Input
                      id="startDate"
                      type="date"
                      value={contractData.startDate}
                      onChange={(e) =>
                        handleInputChange("startDate", e.target.value)
                      }
                    />
                  </div>
                  <div>
                    <Label htmlFor="endDate">
                      {t("newContract.leaseTerms.endDate")}
                    </Label>
                    <Input
                      id="endDate"
                      type="date"
                      value={contractData.endDate}
                      onChange={(e) =>
                        handleInputChange("endDate", e.target.value)
                      }
                    />
                  </div>
                </div>
                <div>
                  <Label htmlFor="leaseTerm">
                    {t("newContract.leaseTerms.leaseTerm")}
                  </Label>
                  <Select
                    onValueChange={(value) =>
                      handleInputChange("leaseTerm", value)
                    }
                  >
                    <SelectTrigger>
                      <SelectValue
                        placeholder={t(
                          "newContract.leaseTerms.selectLeaseTerm"
                        )}
                      />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="6-months">
                        {t("newContract.leaseTerms.options.6months")}
                      </SelectItem>
                      <SelectItem value="1-year">
                        {t("newContract.leaseTerms.options.1year")}
                      </SelectItem>
                      <SelectItem value="2-years">
                        {t("newContract.leaseTerms.options.2years")}
                      </SelectItem>
                      <SelectItem value="month-to-month">
                        {t("newContract.leaseTerms.options.monthToMonth")}
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </CardContent>
              {/* Lease terms fields */}
            </ExpandableCard>
            <ExpandableCard
              title={t("newContract.financialTerms.title")}
              subtitle={t("newContract.financialTerms.subtitle")}
              icon={DollarSign}
            >
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="monthlyRent">
                      {t("newContract.financialTerms.monthlyRent")}
                    </Label>
                    <Input
                      id="monthlyRent"
                      type="number"
                      value={contractData.monthlyRent}
                      onChange={(e) =>
                        handleInputChange("monthlyRent", e.target.value)
                      }
                      placeholder={t(
                        "newContract.financialTerms.placeholders.monthlyRent"
                      )}
                    />
                  </div>
                  <div>
                    <Label htmlFor="securityDeposit">
                      {t("newContract.financialTerms.securityDeposit")}
                    </Label>
                    <Input
                      id="securityDeposit"
                      type="number"
                      value={contractData.securityDeposit}
                      onChange={(e) =>
                        handleInputChange("securityDeposit", e.target.value)
                      }
                      placeholder={t(
                        "newContract.financialTerms.placeholders.securityDeposit"
                      )}
                    />
                  </div>
                </div>
              </CardContent>
              {/* Financial terms fields */}
            </ExpandableCard>
            <ExpandableCard
              title={t("newContract.additionalTerms.title")}
              subtitle={t("newContract.additionalTerms.subtitle")}
            >
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="petPolicy">
                      {t("newContract.additionalTerms.petPolicy")}
                    </Label>
                    <Select
                      onValueChange={(value) =>
                        handleInputChange("petPolicy", value)
                      }
                    >
                      <SelectTrigger>
                        <SelectValue
                          placeholder={t(
                            "newContract.additionalTerms.petPolicy"
                          )}
                        />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="no-pets">
                          {t("newContract.additionalTerms.petOptions.noPets")}
                        </SelectItem>
                        <SelectItem value="cats-only">
                          {t("newContract.additionalTerms.petOptions.catsOnly")}
                        </SelectItem>
                        <SelectItem value="dogs-only">
                          {t("newContract.additionalTerms.petOptions.dogsOnly")}
                        </SelectItem>
                        <SelectItem value="pets-allowed">
                          {t(
                            "newContract.additionalTerms.petOptions.petsAllowed"
                          )}
                        </SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label htmlFor="smokingPolicy">
                      {t("newContract.additionalTerms.smokingPolicy")}
                    </Label>
                    <Select
                      onValueChange={(value) =>
                        handleInputChange("smokingPolicy", value)
                      }
                    >
                      <SelectTrigger>
                        <SelectValue
                          placeholder={t(
                            "newContract.additionalTerms.smokingPolicy"
                          )}
                        />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="no-smoking">
                          {t(
                            "newContract.additionalTerms.smokingOptions.noSmoking"
                          )}
                        </SelectItem>
                        <SelectItem value="outdoor-only">
                          {t(
                            "newContract.additionalTerms.smokingOptions.outdoorOnly"
                          )}
                        </SelectItem>
                        <SelectItem value="smoking-allowed">
                          {t(
                            "newContract.additionalTerms.smokingOptions.smokingAllowed"
                          )}
                        </SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <div>
                  <Label htmlFor="additionalTerms">
                    {t("newContract.additionalTerms.additionalTerms")}
                  </Label>
                  <Textarea
                    id="additionalTerms"
                    value={contractData.additionalTerms}
                    onChange={(e) =>
                      handleInputChange("additionalTerms", e.target.value)
                    }
                    placeholder={t(
                      "newContract.additionalTerms.placeholders.additionalTerms"
                    )}
                    rows={4}
                  />
                </div>
              </CardContent>
              {/* Additional terms fields */}
            </ExpandableCard>
            Tenant Information
            {/* <Card className="lg:col-span-2">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <FileText className="w-5 h-5" />
                  {t("newContract.tenantInformation.title")}
                </CardTitle>
                <CardDescription>
                  {t("newContract.tenantInformation.subtitle")}
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="tenantName">
                      {t("newContract.tenantInformation.fullName")}
                    </Label>
                    <Input
                      id="tenantName"
                      value={contractData.tenantName}
                      onChange={(e) =>
                        handleInputChange("tenantName", e.target.value)
                      }
                      placeholder={t(
                        "newContract.tenantInformation.placeholders.fullName"
                      )}
                    />
                  </div>
                  <div>
                    <Label htmlFor="tenantEmail">
                      {t("newContract.tenantInformation.email")}
                    </Label>
                    <Input
                      id="tenantEmail"
                      type="email"
                      value={contractData.tenantEmail}
                      onChange={(e) =>
                        handleInputChange("tenantEmail", e.target.value)
                      }
                      placeholder={t(
                        "newContract.tenantInformation.placeholders.email"
                      )}
                    />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="tenantPhone">
                      {t("newContract.tenantInformation.phone")}
                    </Label>
                    <Input
                      id="tenantPhone"
                      value={contractData.tenantPhone}
                      onChange={(e) =>
                        handleInputChange("tenantPhone", e.target.value)
                      }
                      placeholder={t(
                        "newContract.tenantInformation.placeholders.phone"
                      )}
                    />
                  </div>
                </div>
                <div>
                  <Label htmlFor="tenantAddress">
                    {t("newContract.tenantInformation.currentAddress")}
                  </Label>
                  <Textarea
                    id="tenantAddress"
                    value={contractData.tenantAddress}
                    onChange={(e) =>
                      handleInputChange("tenantAddress", e.target.value)
                    }
                    placeholder={t(
                      "newContract.tenantInformation.placeholders.currentAddress"
                    )}
                    rows={2}
                  />
                </div>
                <div>
                  <Label>
                    {t("newContract.tenantInformation.passportPhoto")}
                  </Label>
                  <FileUpload onFileUpload={handleFileUpload} />
                </div>
              </CardContent>
            </Card> */}
            {/* Property Information */}
            {/* <Card className="lg:col-span-2">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <MapPin className="w-5 h-5" />
                  {t("newContract.propertyInformation.title")}
                </CardTitle>
                <CardDescription>
                  {t("newContract.propertyInformation.subtitle")}
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="propertyAddress">
                    {t("newContract.propertyInformation.propertyAddress")}
                  </Label>
                  <Textarea
                    id="propertyAddress"
                    value={contractData.propertyAddress}
                    onChange={(e) =>
                      handleInputChange("propertyAddress", e.target.value)
                    }
                    placeholder={t(
                      "newContract.propertyInformation.placeholders.propertyAddress"
                    )}
                    rows={2}
                  />
                </div>
                <div className="grid grid-cols-3 gap-4">
                  <div>
                    <Label htmlFor="propertyType">
                      {t("newContract.propertyInformation.propertyType")}
                    </Label>
                    <Select
                      onValueChange={(value) =>
                        handleInputChange("propertyType", value)
                      }
                    >
                      <SelectTrigger>
                        <SelectValue
                          placeholder={t(
                            "newContract.propertyInformation.selectType"
                          )}
                        />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="apartment">
                          {t("newContract.propertyInformation.types.apartment")}
                        </SelectItem>
                        <SelectItem value="house">
                          {t("newContract.propertyInformation.types.house")}
                        </SelectItem>
                        <SelectItem value="condo">
                          {t("newContract.propertyInformation.types.condo")}
                        </SelectItem>
                        <SelectItem value="townhouse">
                          {t("newContract.propertyInformation.types.townhouse")}
                        </SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label htmlFor="bedrooms">Bedrooms</Label>
                    <Select
                      onValueChange={(value) =>
                        handleInputChange("bedrooms", value)
                      }
                    >
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
                    <Select
                      onValueChange={(value) =>
                        handleInputChange("bathrooms", value)
                      }
                    >
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
            </Card> */}
            {/* Lease Terms */}
            {/* <Card className="lg:col-span-2">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Calendar className="w-5 h-5" />
                  {t("newContract.leaseTerms.title")}
                </CardTitle>
                <CardDescription>
                  {t("newContract.leaseTerms.subtitle")}
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="startDate">
                      {t("newContract.leaseTerms.startDate")}
                    </Label>
                    <Input
                      id="startDate"
                      type="date"
                      value={contractData.startDate}
                      onChange={(e) =>
                        handleInputChange("startDate", e.target.value)
                      }
                    />
                  </div>
                  <div>
                    <Label htmlFor="endDate">
                      {t("newContract.leaseTerms.endDate")}
                    </Label>
                    <Input
                      id="endDate"
                      type="date"
                      value={contractData.endDate}
                      onChange={(e) =>
                        handleInputChange("endDate", e.target.value)
                      }
                    />
                  </div>
                </div>
                <div>
                  <Label htmlFor="leaseTerm">
                    {t("newContract.leaseTerms.leaseTerm")}
                  </Label>
                  <Select
                    onValueChange={(value) =>
                      handleInputChange("leaseTerm", value)
                    }
                  >
                    <SelectTrigger>
                      <SelectValue
                        placeholder={t(
                          "newContract.leaseTerms.selectLeaseTerm"
                        )}
                      />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="6-months">
                        {t("newContract.leaseTerms.options.6months")}
                      </SelectItem>
                      <SelectItem value="1-year">
                        {t("newContract.leaseTerms.options.1year")}
                      </SelectItem>
                      <SelectItem value="2-years">
                        {t("newContract.leaseTerms.options.2years")}
                      </SelectItem>
                      <SelectItem value="month-to-month">
                        {t("newContract.leaseTerms.options.monthToMonth")}
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </CardContent>
            </Card> */}
            {/* Financial Terms */}
            {/* <Card className="lg:col-span-2">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <DollarSign className="w-5 h-5" />
                  {t("newContract.financialTerms.title")}
                </CardTitle>
                <CardDescription>
                  {t("newContract.financialTerms.subtitle")}
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="monthlyRent">
                      {t("newContract.financialTerms.monthlyRent")}
                    </Label>
                    <Input
                      id="monthlyRent"
                      type="number"
                      value={contractData.monthlyRent}
                      onChange={(e) =>
                        handleInputChange("monthlyRent", e.target.value)
                      }
                      placeholder={t(
                        "newContract.financialTerms.placeholders.monthlyRent"
                      )}
                    />
                  </div>
                  <div>
                    <Label htmlFor="securityDeposit">
                      {t("newContract.financialTerms.securityDeposit")}
                    </Label>
                    <Input
                      id="securityDeposit"
                      type="number"
                      value={contractData.securityDeposit}
                      onChange={(e) =>
                        handleInputChange("securityDeposit", e.target.value)
                      }
                      placeholder={t(
                        "newContract.financialTerms.placeholders.securityDeposit"
                      )}
                    />
                  </div>
                </div>
              </CardContent>
            </Card> */}
            {/* Additional Terms */}
            {/* <Card className="lg:col-span-2">
              <CardHeader>
                <CardTitle>{t("newContract.additionalTerms.title")}</CardTitle>
                <CardDescription>
                  {t("newContract.additionalTerms.subtitle")}
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="petPolicy">
                      {t("newContract.additionalTerms.petPolicy")}
                    </Label>
                    <Select
                      onValueChange={(value) =>
                        handleInputChange("petPolicy", value)
                      }
                    >
                      <SelectTrigger>
                        <SelectValue
                          placeholder={t(
                            "newContract.additionalTerms.petPolicy"
                          )}
                        />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="no-pets">
                          {t("newContract.additionalTerms.petOptions.noPets")}
                        </SelectItem>
                        <SelectItem value="cats-only">
                          {t("newContract.additionalTerms.petOptions.catsOnly")}
                        </SelectItem>
                        <SelectItem value="dogs-only">
                          {t("newContract.additionalTerms.petOptions.dogsOnly")}
                        </SelectItem>
                        <SelectItem value="pets-allowed">
                          {t(
                            "newContract.additionalTerms.petOptions.petsAllowed"
                          )}
                        </SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label htmlFor="smokingPolicy">
                      {t("newContract.additionalTerms.smokingPolicy")}
                    </Label>
                    <Select
                      onValueChange={(value) =>
                        handleInputChange("smokingPolicy", value)
                      }
                    >
                      <SelectTrigger>
                        <SelectValue
                          placeholder={t(
                            "newContract.additionalTerms.smokingPolicy"
                          )}
                        />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="no-smoking">
                          {t(
                            "newContract.additionalTerms.smokingOptions.noSmoking"
                          )}
                        </SelectItem>
                        <SelectItem value="outdoor-only">
                          {t(
                            "newContract.additionalTerms.smokingOptions.outdoorOnly"
                          )}
                        </SelectItem>
                        <SelectItem value="smoking-allowed">
                          {t(
                            "newContract.additionalTerms.smokingOptions.smokingAllowed"
                          )}
                        </SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <div>
                  <Label htmlFor="additionalTerms">
                    {t("newContract.additionalTerms.additionalTerms")}
                  </Label>
                  <Textarea
                    id="additionalTerms"
                    value={contractData.additionalTerms}
                    onChange={(e) =>
                      handleInputChange("additionalTerms", e.target.value)
                    }
                    placeholder={t(
                      "newContract.additionalTerms.placeholders.additionalTerms"
                    )}
                    rows={4}
                  />
                </div>
              </CardContent>
            </Card> */}
          </div>

          {/* Generate Contract Button */}
          <div className="flex justify-center pt-6">
            <Button
              size="lg"
              onClick={handleGenerateContract}
              disabled={
                isGenerating ||
                !contractData.tenantName ||
                !contractData.propertyAddress
              }
              className="gap-2 px-8"
            >
              {isGenerating ? (
                <>
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  {t("newContract.generatingContract")}
                </>
              ) : (
                <>
                  <Download className="w-5 h-5" />
                  {t("newContract.generateContract")}
                </>
              )}
            </Button>
          </div>
        </div>
      </div>

      {/* PDF Preview Section */}
      <div className="xl:col-span-1">
        <PDFPreview contractData={contractData} />
      </div>

      <Button onClick={() => window.open("/api/contract-preview", "_blank")}>
        Preview PDF
      </Button>

      {/* PDF Download */}
      <Button
        onClick={handleDownloadPDF}
        className="flex items-center gap-2"
        disabled={isGeneratingPDF}
      >
        {isGeneratingPDF ? (
          <>
            <Loader2 className="h-4 w-4 animate-spin" />
            "Generating PDF..."
            {/* {language === "th" ? "กำลังสร้าง PDF..." : "Generating PDF..."} */}
          </>
        ) : (
          <>
            <Download className="h-4 w-4" />
            Download PDF
            {/* {getTranslation("common.download", language)} */}
          </>
        )}
      </Button>
    </div>
  );
}
