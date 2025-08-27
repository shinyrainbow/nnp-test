-- CreateEnum
CREATE TYPE "public"."PropertyStatus" AS ENUM ('available', 'sold', 'rented', 'pending');

-- CreateEnum
CREATE TYPE "public"."RoomType" AS ENUM ('Condo', 'Townhouse', 'SingleHouse', 'Apartment', 'Other');

-- CreateTable
CREATE TABLE "public"."User" (
    "id" TEXT NOT NULL,
    "clerkId" TEXT NOT NULL,
    "email" TEXT,
    "firstName" TEXT,
    "lastName" TEXT,
    "isPaid" BOOLEAN NOT NULL DEFAULT false,
    "currentExpireDate" TIMESTAMP(3),
    "imageUrl" TEXT,
    "lineCode" INTEGER NOT NULL DEFAULT 2025,
    "isEnableLine" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."Project" (
    "id" TEXT NOT NULL,
    "projectCode" TEXT NOT NULL,
    "projectNameEn" TEXT NOT NULL,
    "projectNameTh" TEXT,
    "projectDescriptionEn" TEXT,
    "projectDescriptionTh" TEXT,
    "projectLocation" TEXT[] DEFAULT ARRAY[]::TEXT[],
    "projectImageUrl" TEXT[] DEFAULT ARRAY[]::TEXT[],
    "projectFacilities" TEXT[] DEFAULT ARRAY[]::TEXT[],
    "addressNumberRoad" TEXT,
    "addressSubDistrict" TEXT,
    "addressDistrict" TEXT,
    "addressProvince" TEXT,
    "addressZipcode" TEXT,
    "completeYear" TEXT,
    "distanceToStation" TEXT[] DEFAULT ARRAY[]::TEXT[],
    "priceRange" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Project_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."Property" (
    "id" TEXT NOT NULL,
    "projectPropertyCode" TEXT,
    "status" "public"."PropertyStatus" DEFAULT 'pending',
    "whenAvailable" TEXT,
    "isAcceptShortTerm" BOOLEAN DEFAULT false,
    "addressNumber" TEXT,
    "bedRoom" TEXT,
    "bathRoom" TEXT,
    "roomSize" TEXT,
    "floor" TEXT,
    "building" TEXT,
    "roomType" "public"."RoomType" DEFAULT 'Condo',
    "isPetFriendly" BOOLEAN DEFAULT false,
    "carPark" TEXT,
    "imageUrls" TEXT[] DEFAULT ARRAY[]::TEXT[],
    "roomAmenities" TEXT[] DEFAULT ARRAY[]::TEXT[],
    "rentalRate" TEXT,
    "sellPrice" TEXT,
    "phone" TEXT,
    "lineId" TEXT,
    "fbUser" TEXT,
    "isOwner" BOOLEAN DEFAULT false,
    "linkPost" TEXT,
    "note" TEXT,
    "originalMessage" TEXT,
    "messageToPost" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "projectCode" TEXT NOT NULL,

    CONSTRAINT "Property_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_clerkId_key" ON "public"."User"("clerkId");

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "public"."User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Project_projectCode_key" ON "public"."Project"("projectCode");

-- AddForeignKey
ALTER TABLE "public"."Property" ADD CONSTRAINT "Property_projectCode_fkey" FOREIGN KEY ("projectCode") REFERENCES "public"."Project"("projectCode") ON DELETE RESTRICT ON UPDATE CASCADE;
