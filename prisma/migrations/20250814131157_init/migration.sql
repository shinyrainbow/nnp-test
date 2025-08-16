-- CreateEnum
CREATE TYPE "public"."PropertyStatus" AS ENUM ('available', 'sold', 'rented', 'pending');

-- CreateEnum
CREATE TYPE "public"."RoomType" AS ENUM ('Condo', 'Townhouse', 'SingleHouse', 'Apartment', 'Other');

-- CreateTable
CREATE TABLE "public"."users" (
    "id" SERIAL NOT NULL,
    "clerkId" TEXT NOT NULL,
    "email" TEXT,
    "firstName" TEXT,
    "lastName" TEXT,
    "name" TEXT,
    "imageUrl" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "users_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."Project" (
    "id" TEXT NOT NULL,
    "projectCode" INTEGER NOT NULL,
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
    "bedRoom" INTEGER,
    "bathRoom" INTEGER,
    "roomSize" DOUBLE PRECISION,
    "floor" INTEGER,
    "building" TEXT,
    "roomType" "public"."RoomType" DEFAULT 'Condo',
    "isPetFriendly" BOOLEAN DEFAULT false,
    "carPark" INTEGER,
    "imageUrls" TEXT[] DEFAULT ARRAY[]::TEXT[],
    "roomAmenities" TEXT[] DEFAULT ARRAY[]::TEXT[],
    "rentalRate" DECIMAL(12,2),
    "sellPrice" DECIMAL(14,2),
    "phone" TEXT,
    "lineId" TEXT,
    "fbUrl" TEXT,
    "isOwner" BOOLEAN DEFAULT false,
    "postUserFb" TEXT,
    "note" TEXT,
    "originalMessage" TEXT,
    "messageToPost" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "projectCode" INTEGER NOT NULL,

    CONSTRAINT "Property_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "users_clerkId_key" ON "public"."users"("clerkId");

-- CreateIndex
CREATE UNIQUE INDEX "users_email_key" ON "public"."users"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Project_projectCode_key" ON "public"."Project"("projectCode");

-- CreateIndex
CREATE UNIQUE INDEX "Project_projectNameEn_key" ON "public"."Project"("projectNameEn");

-- CreateIndex
CREATE UNIQUE INDEX "Property_projectPropertyCode_key" ON "public"."Property"("projectPropertyCode");

-- CreateIndex
CREATE UNIQUE INDEX "Property_projectCode_key" ON "public"."Property"("projectCode");

-- AddForeignKey
ALTER TABLE "public"."Property" ADD CONSTRAINT "Property_projectCode_fkey" FOREIGN KEY ("projectCode") REFERENCES "public"."Project"("projectCode") ON DELETE RESTRICT ON UPDATE CASCADE;
