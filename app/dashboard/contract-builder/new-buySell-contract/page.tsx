"use client";
import { BuySellContractBuilder } from "@/components/buySell-contract-builder";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/contexts/language-context";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";

export default function NewBuySellContractPage() {
  const { t } = useLanguage();
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex items-center gap-4 mb-6">
          <Button variant="outline" size="sm" asChild>
            <Link href={`/dashboard/contract-builder`} className="gap-2">
              <ArrowLeft className="w-4 h-4" />
              {t("newContract.navigation.backToDashboard")}
            </Link>
          </Button>
        </div>
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">
            Create New Rental Contract
          </h1>
          <p className="text-gray-600 mt-2">
            Fill in the details below to generate a rental agreement
          </p>
        </div>
        <BuySellContractBuilder />
      </div>
    </div>
  );
}
