// import type { ContractData } from "@/types/contract"

export async function generateContractPDF(contractData: ContractData): Promise<void> {
  // Dynamic import to avoid SSR issues
  const { jsPDF } = await import("jspdf")

  const doc = new jsPDF({
    orientation: "portrait",
    unit: "mm",
    format: "a4",
  })

  const pageWidth = doc.internal.pageSize.getWidth()
  const pageHeight = doc.internal.pageSize.getHeight()
  const margin = 20
  const contentWidth = pageWidth - 2 * margin
  let yPosition = margin

  // Helper function to add text with word wrapping
  const addText = (text: string, fontSize = 10, isBold = false, indent = 0) => {
    doc.setFontSize(fontSize)
    doc.setFont("helvetica", isBold ? "bold" : "normal")

    const lines = doc.splitTextToSize(text, contentWidth - indent)

    // Check if we need a new page
    if (yPosition + lines.length * (fontSize * 0.35) > pageHeight - margin) {
      doc.addPage()
      yPosition = margin
    }

    lines.forEach((line: string) => {
      doc.text(line, margin + indent, yPosition)
      yPosition += fontSize * 0.35
    })

    return yPosition
  }

  // Helper function to add section header
  const addSectionHeader = (title: string) => {
    yPosition += 5
    addText(title, 14, true)
    yPosition += 3
  }

  // Helper function to add subsection header
  const addSubsectionHeader = (title: string) => {
    yPosition += 3
    addText(title, 12, true)
    yPosition += 2
  }

  // Document Title
  doc.setFontSize(18)
  doc.setFont("helvetica", "bold")
  const title = "CONDOMINIUM RENTAL AGREEMENT"
  const titleWidth = doc.getTextWidth(title)
  doc.text(title, (pageWidth - titleWidth) / 2, yPosition)
  yPosition += 10

  // Subtitle
  doc.setFontSize(12)
  doc.setFont("helvetica", "normal")
  const subtitle = "This agreement is entered into between the Landlord and Tenant(s) listed below"
  const subtitleWidth = doc.getTextWidth(subtitle)
  doc.text(subtitle, (pageWidth - subtitleWidth) / 2, yPosition)
  yPosition += 15

  // Property Address Header
  // if (contractData.propertyInfo.address) {
  //   doc.setFontSize(10)
  //   const propertyHeader = `Property: ${contractData.propertyInfo.address}${
  //     contractData.propertyInfo.unitNumber ? `, Unit ${contractData.propertyInfo.unitNumber}` : ""
  //   }`
  //   const propertyHeaderWidth = doc.getTextWidth(propertyHeader)
  //   doc.text(propertyHeader, (pageWidth - propertyHeaderWidth) / 2, yPosition)
  //   yPosition += 10
  // }

  // // 1. Property Information
  // addSectionHeader("1. PROPERTY INFORMATION")

  // addSubsectionHeader("Property Address")
  // addText(`${contractData.propertyInfo.address || "[Property Address]"}`)
  // if (contractData.propertyInfo.unitNumber) {
  //   addText(`Unit: ${contractData.propertyInfo.unitNumber}`)
  // }
  // addText(
  //   `${contractData.propertyInfo.city || "[City]"}, ${contractData.propertyInfo.state || "[State]"} ${contractData.propertyInfo.zipCode || "[ZIP Code]"}`,
  // )

  // addSubsectionHeader("Property Details")
  // addText(`Type: ${contractData.propertyInfo.propertyType}`)
  // addText(`Bedrooms: ${contractData.propertyInfo.bedrooms}`)
  // addText(`Bathrooms: ${contractData.propertyInfo.bathrooms}`)
  // if (contractData.propertyInfo.squareFootage) {
  //   addText(`Square Footage: ${contractData.propertyInfo.squareFootage}`)
  // }
  // if (contractData.propertyInfo.parkingSpaces > 0) {
  //   addText(`Parking Spaces: ${contractData.propertyInfo.parkingSpaces}`)
  // }

  // if (contractData.propertyInfo.amenities) {
  //   addSubsectionHeader("Available Amenities")
  //   addText(contractData.propertyInfo.amenities)
  // }

  // if (contractData.propertyInfo.appliances) {
  //   addSubsectionHeader("Included Appliances")
  //   addText(contractData.propertyInfo.appliances)
  // }

  // // 2. Landlord Information
  // addSectionHeader("2. LANDLORD INFORMATION")

  // addSubsectionHeader("Primary Contact")
  // addText(`Name: ${contractData.landlordInfo.name || "[Landlord Name]"}`)
  // addText(`Address: ${contractData.landlordInfo.address || "[Landlord Address]"}`)
  // addText(
  //   `${contractData.landlordInfo.city || "[City]"}, ${contractData.landlordInfo.state || "[State]"} ${contractData.landlordInfo.zipCode || "[ZIP Code]"}`,
  // )
  // addText(`Phone: ${contractData.landlordInfo.phone || "[Phone Number]"}`)
  // addText(`Email: ${contractData.landlordInfo.email || "[Email Address]"}`)

  // if (contractData.landlordInfo.emergencyContact) {
  //   addSubsectionHeader("Emergency Contact")
  //   addText(`${contractData.landlordInfo.emergencyContact}`)
  //   addText(`${contractData.landlordInfo.emergencyPhone}`)
  // }

  // if (contractData.landlordInfo.managementCompany) {
  //   addSubsectionHeader("Management Company")
  //   addText(`${contractData.landlordInfo.managementCompany}`)
  //   if (contractData.landlordInfo.managementPhone) {
  //     addText(`Phone: ${contractData.landlordInfo.managementPhone}`)
  //   }
  // }

  // // 3. Tenant Information
  // addSectionHeader("3. TENANT INFORMATION")

  // addSubsectionHeader("Primary Tenant")
  // addText(`Name: ${contractData.tenantInfo.primaryTenant.name || "[Tenant Name]"}`)
  // addText(`Phone: ${contractData.tenantInfo.primaryTenant.phone || "[Phone Number]"}`)
  // addText(`Email: ${contractData.tenantInfo.primaryTenant.email || "[Email Address]"}`)

  // if (contractData.tenantInfo.primaryTenant.emergencyContact) {
  //   addText(`Emergency Contact: ${contractData.tenantInfo.primaryTenant.emergencyContact}`)
  //   addText(`Emergency Phone: ${contractData.tenantInfo.primaryTenant.emergencyPhone}`)
  // }

  // if (contractData.tenantInfo.primaryTenant.employer) {
  //   addSubsectionHeader("Employment Information")
  //   addText(`Employer: ${contractData.tenantInfo.primaryTenant.employer}`)
  //   addText(`Job Title: ${contractData.tenantInfo.primaryTenant.jobTitle}`)
  //   addText(`Work Phone: ${contractData.tenantInfo.primaryTenant.workPhone}`)
  //   addText(`Monthly Income: $${contractData.tenantInfo.primaryTenant.monthlyIncome?.toLocaleString()}`)
  //   addText(`Employment Length: ${contractData.tenantInfo.primaryTenant.employmentLength}`)
  // }

  // // 4. Lease Terms
  // addSectionHeader("4. LEASE TERMS")

  // addSubsectionHeader("Lease Duration")
  // addText(`Start Date: ${contractData.leaseTerms.leaseStartDate || "[Start Date]"}`)
  // addText(`End Date: ${contractData.leaseTerms.leaseEndDate || "[End Date]"}`)
  // addText(`Renewal Options: ${contractData.leaseTerms.renewalOptions}`)
  // addText(`Renewal Notice: ${contractData.leaseTerms.renewalNotice} days`)

  // addSubsectionHeader("Financial Terms")
  // addText(`Monthly Rent: $${contractData.leaseTerms.monthlyRent?.toLocaleString()}`)
  // addText(`Security Deposit: $${contractData.leaseTerms.securityDeposit?.toLocaleString()}`)
  // if (contractData.leaseTerms.petDeposit > 0) {
  //   addText(`Pet Deposit: $${contractData.leaseTerms.petDeposit?.toLocaleString()}`)
  // }
  // if (contractData.leaseTerms.lastMonthRent > 0) {
  //   addText(`Last Month Rent: $${contractData.leaseTerms.lastMonthRent?.toLocaleString()}`)
  // }
  // addText(`Rent Due Date: ${contractData.leaseTerms.rentDueDate} of each month`)
  // if (contractData.leaseTerms.lateFeeAmount > 0) {
  //   addText(
  //     `Late Fee: $${contractData.leaseTerms.lateFeeAmount} after ${contractData.leaseTerms.lateFeeGracePeriod} days`,
  //   )
  // }

  // if (contractData.leaseTerms.paymentMethods) {
  //   addSubsectionHeader("Payment Information")
  //   addText(`Accepted Payment Methods: ${contractData.leaseTerms.paymentMethods}`)
  //   if (contractData.leaseTerms.paymentAddress) {
  //     addText(`Payment Address: ${contractData.leaseTerms.paymentAddress}`)
  //   }
  // }

  // // 5. Rules and Regulations
  // addSectionHeader("5. RULES AND REGULATIONS")

  // addSubsectionHeader("Property Policies")
  // addText(`Smoking Policy: ${contractData.rulesRegulations.smokingPolicy}`)

  // if (contractData.rulesRegulations.petPolicy.allowed) {
  //   addText(`Pet Policy: Pets are allowed with restrictions.`)
  //   if (contractData.rulesRegulations.petPolicy.restrictions) {
  //     addText(contractData.rulesRegulations.petPolicy.restrictions, 10, false, 5)
  //   }
  // } else {
  //   addText(`Pet Policy: No pets allowed.`)
  // }

  // if (contractData.rulesRegulations.guestPolicy) {
  //   addText(`Guest Policy: ${contractData.rulesRegulations.guestPolicy}`)
  // }

  // if (contractData.rulesRegulations.noisePolicy) {
  //   addText(`Noise Policy: ${contractData.rulesRegulations.noisePolicy}`)
  // }

  // addSubsectionHeader("Maintenance Responsibilities")
  // addText("Landlord Responsibilities:", 10, true)
  // if (contractData.rulesRegulations.maintenanceResponsibilities?.landlord) {
  //   addText(contractData.rulesRegulations.maintenanceResponsibilities.landlord.join(", "), 10, false, 5)
  // }

  // addText("Tenant Responsibilities:", 10, true)
  // if (contractData.rulesRegulations.maintenanceResponsibilities?.tenant) {
  //   addText(contractData.rulesRegulations.maintenanceResponsibilities.tenant.join(", "), 10, false, 5)
  // }

  // addSubsectionHeader("Utilities")
  // addText("Included in Rent:", 10, true)
  // addText(contractData.rulesRegulations.utilities?.includedInRent?.join(", ") || "None specified", 10, false, 5)

  // addText("Tenant Responsible:", 10, true)
  // addText(
  //   contractData.rulesRegulations.utilities?.tenantResponsible?.join(", ") || "Electricity, Gas, Internet, Cable",
  //   10,
  //   false,
  //   5,
  // )

  // // 6. Additional Terms
  // addSectionHeader("6. ADDITIONAL TERMS")

  // if (contractData.additionalTerms.specialProvisions) {
  //   addSubsectionHeader("Special Provisions")
  //   addText(contractData.additionalTerms.specialProvisions)
  // }

  // if (contractData.additionalTerms.terminationClause) {
  //   addSubsectionHeader("Termination Clause")
  //   addText(contractData.additionalTerms.terminationClause)
  // }

  // if (contractData.additionalTerms.defaultClause) {
  //   addSubsectionHeader("Default Clause")
  //   addText(contractData.additionalTerms.defaultClause)
  // }

  // if (contractData.additionalTerms.governingLaw) {
  //   addSubsectionHeader("Governing Law")
  //   addText(`This agreement shall be governed by the laws of ${contractData.additionalTerms.governingLaw}.`)
  // }

  // // Signatures
  // addSectionHeader("SIGNATURES")

  // addText(`Date: ${contractData.additionalTerms.signatureDate || "[Date]"}`)
  // yPosition += 10

  // // Signature lines
  // addText("_________________________________", 10, false)
  // addText("Landlord Signature", 10, true)
  // addText(contractData.landlordInfo.name || "[Landlord Name]", 9, false)
  // yPosition += 10

  // addText("_________________________________", 10, false)
  // addText("Primary Tenant Signature", 10, true)
  // addText(contractData.tenantInfo.primaryTenant.name || "[Tenant Name]", 9, false)

  // if (contractData.additionalTerms.additionalSignatures) {
  //   yPosition += 5
  //   addText("Additional Tenant Signatures:", 10, true)
  //   addText(contractData.additionalTerms.additionalSignatures)
  // }

  // Generate filename
  // const propertyAddress = contractData.propertyInfo.address || "Contract"
  // const tenantName = contractData.tenantInfo.primaryTenant.name || "Tenant"
  // const filename = `${propertyAddress.replace(/[^a-zA-Z0-9]/g, "_")}_${tenantName.replace(/[^a-zA-Z0-9]/g, "_")}_Rental_Agreement.pdf`

  const filename ="testjaaaaa.pdf"
  // Save the PDF
  doc.save(filename)
}
