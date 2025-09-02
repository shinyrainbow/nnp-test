-- CreateTable
CREATE TABLE "public"."RentalContract" (
    "id" TEXT NOT NULL,
    "contractPlace" TEXT,
    "contractDate" TEXT,
    "ownerName" TEXT,
    "ownerAge" TEXT,
    "ownerId" TEXT,
    "ownerAddress" TEXT,
    "ownerPhone" TEXT,
    "tenantName" TEXT,
    "tenantAge" TEXT,
    "tenantId" TEXT,
    "tenantAddress" TEXT,
    "tenantPhone" TEXT,
    "projectName" TEXT,
    "projectFloor" TEXT,
    "projectAddress" TEXT,
    "rentalPeriod" TEXT,
    "advance" TEXT,
    "deposit" TEXT,
    "tax" TEXT,
    "commonFee" TEXT,
    "bills" TEXT,
    "dateReceive" TEXT,
    "rentalRate" TEXT,
    "startDate" TEXT,
    "subDistrict" TEXT,
    "district" TEXT,
    "province" TEXT,
    "rentDue" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "userId" TEXT NOT NULL,

    CONSTRAINT "RentalContract_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."PurchaseAndSaleContract" (
    "id" TEXT NOT NULL,
    "contractPlace" TEXT,
    "contractDate" TEXT,
    "sellerName" TEXT,
    "sellerAge" TEXT,
    "sellerId" TEXT,
    "sellerAddress" TEXT,
    "sellerPhone" TEXT,
    "buyerName" TEXT,
    "buyerAge" TEXT,
    "buyerId" TEXT,
    "buyerAddress" TEXT,
    "buyerPhone" TEXT,
    "projectName" TEXT,
    "projectFloor" TEXT,
    "projectAddressNo" TEXT,
    "projectAddress" TEXT,
    "amenities" TEXT,
    "chanot" TEXT,
    "size" TEXT,
    "deposit" TEXT,
    "depositText" TEXT,
    "sellPrice" TEXT,
    "priceText" TEXT,
    "remainingPrice" TEXT,
    "remainingPriceText" TEXT,
    "subDistrict" TEXT,
    "district" TEXT,
    "province" TEXT,
    "speTax" TEXT,
    "tax" TEXT,
    "mortgage" TEXT,
    "transfer" TEXT,
    "stamp" TEXT,
    "note1" TEXT,
    "note2" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "userId" TEXT NOT NULL,

    CONSTRAINT "PurchaseAndSaleContract_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "public"."RentalContract" ADD CONSTRAINT "RentalContract_userId_fkey" FOREIGN KEY ("userId") REFERENCES "public"."User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."PurchaseAndSaleContract" ADD CONSTRAINT "PurchaseAndSaleContract_userId_fkey" FOREIGN KEY ("userId") REFERENCES "public"."User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
