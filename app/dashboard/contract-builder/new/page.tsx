import { ContractBuilder } from "@/components/contract-builder"

export default function NewContractPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Create New Rental Contract</h1>
          <p className="text-gray-600 mt-2">Fill in the details below to generate a rental agreement</p>
        </div>
        <ContractBuilder />
      </div>
    </div>
  )
}
