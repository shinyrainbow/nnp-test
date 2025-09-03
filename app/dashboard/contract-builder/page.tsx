"use client";

import { Suspense } from "react";
import ContractBuilder from "@/components/contract-builder/page";

export default function Contracts() {
  return (
    <div className="min-h-screen ">
      <Suspense fallback={<div>Loading search params...</div>}>
        <ContractBuilder />
      </Suspense>
    </div>
  );
}
