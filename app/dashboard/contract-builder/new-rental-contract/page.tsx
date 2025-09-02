"use client";
import { RentalContractBuilder } from "@/components/rental-contract-builder";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/contexts/language-context";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";

export default function NewRentalContractPage() {
  const { t } = useLanguage();
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex items-center gap-4 mb-6">
          <Button variant="outline" size="sm" asChild>
            <Link href={`/dashboard/contract-builder?tab=rent`} className="gap-2">
              <ArrowLeft className="w-4 h-4" />
              {t("newContract.navigation.backToDashboard")}
            </Link>
          </Button>
        </div>

        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">
            {t("contracts.createNew.rental")}
          </h1>
          <p className="text-gray-600 mt-2">
          {t("contracts.createNew.rentalDesc")}
          </p>
        </div>
        <RentalContractBuilder />
      </div>
    </div>
  );
}
