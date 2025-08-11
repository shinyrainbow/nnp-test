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
CREATE TABLE "public"."projects" (
    "id" TEXT NOT NULL,
    "projectNameEn" TEXT,
    "projectNameTh" TEXT,
    "projectCode" TEXT,
    "projectLocation" TEXT[] DEFAULT ARRAY[]::TEXT[],
    "projectImageUrl" TEXT[] DEFAULT ARRAY[]::TEXT[],
    "projectFacilities" TEXT[] DEFAULT ARRAY[]::TEXT[],
    "addressNumberRoad" TEXT,
    "addressSubDistrict" TEXT,
    "addressDistrict" TEXT,
    "addressProvince" TEXT,
    "addressZipcode" TEXT,
    "completeYear" TEXT,
    "distanceToStation" INTEGER[] DEFAULT ARRAY[]::INTEGER[],
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "projects_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."properties" (
    "id" TEXT NOT NULL,
    "projectId" TEXT NOT NULL,
    "projectPropertyCode" TEXT NOT NULL,
    "addressNumber" TEXT,
    "status" "public"."PropertyStatus" DEFAULT 'pending',
    "bedRoom" INTEGER,
    "bathRoom" INTEGER,
    "roomSize" DOUBLE PRECISION,
    "rentalRate" DECIMAL(12,2),
    "sellPrice" DECIMAL(14,2),
    "roomType" "public"."RoomType" DEFAULT 'Condo',
    "phone" TEXT,
    "lineId" TEXT,
    "fbUrl" TEXT,
    "imageUrls" TEXT[] DEFAULT ARRAY[]::TEXT[],
    "isPetFriendly" BOOLEAN DEFAULT false,
    "isOwner" BOOLEAN DEFAULT false,
    "note" TEXT,
    "carPark" INTEGER,
    "messageToPost" TEXT,
    "roomAmenities" TEXT[] DEFAULT ARRAY[]::TEXT[],
    "floor" INTEGER,
    "building" TEXT,
    "whenAvailable" TEXT,
    "isAcceptShortTerm" BOOLEAN DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "properties_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "users_clerkId_key" ON "public"."users"("clerkId");

-- CreateIndex
CREATE UNIQUE INDEX "users_email_key" ON "public"."users"("email");

-- CreateIndex
CREATE UNIQUE INDEX "projects_projectCode_key" ON "public"."projects"("projectCode");

-- CreateIndex
CREATE UNIQUE INDEX "properties_projectId_key" ON "public"."properties"("projectId");

-- CreateIndex
CREATE UNIQUE INDEX "properties_projectPropertyCode_key" ON "public"."properties"("projectPropertyCode");

-- CreateIndex
CREATE INDEX "properties_projectId_idx" ON "public"."properties"("projectId");

-- CreateIndex
CREATE INDEX "properties_status_idx" ON "public"."properties"("status");

-- AddForeignKey
ALTER TABLE "public"."properties" ADD CONSTRAINT "properties_projectId_fkey" FOREIGN KEY ("projectId") REFERENCES "public"."projects"("id") ON DELETE CASCADE ON UPDATE CASCADE;
