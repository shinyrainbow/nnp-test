-- CreateTable
CREATE TABLE "public"."users" (
    "id" SERIAL NOT NULL,
    "clerkId" TEXT NOT NULL,
    "email" TEXT,
    "firstName" TEXT,
    "lastName" TEXT,
    "imageUrl" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "users_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."projects" (
    "id" SERIAL NOT NULL,
    "projectName" TEXT NOT NULL,
    "projectCode" TEXT NOT NULL,
    "projectLocation" TEXT[],
    "projectImageUrl" TEXT[],
    "projectFacilities" TEXT[],
    "addressNumber" TEXT NOT NULL,
    "addressSubDistrict" TEXT NOT NULL,
    "addressDistrict" TEXT NOT NULL,
    "addressProvince" TEXT NOT NULL,
    "addressZipcode" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "projects_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."properties" (
    "id" SERIAL NOT NULL,
    "propertyId" INTEGER NOT NULL,
    "propertyCode" TEXT NOT NULL,
    "projectPropertyCode" TEXT NOT NULL,
    "roomNumber" TEXT NOT NULL,
    "projectId" INTEGER NOT NULL,
    "projectName" TEXT NOT NULL,
    "location" TEXT[],
    "status" "public"."PropertyStatus" NOT NULL DEFAULT 'available',
    "bedRoom" INTEGER NOT NULL,
    "bathRoom" INTEGER NOT NULL,
    "roomSize" DOUBLE PRECISION NOT NULL,
    "rentalRate" DECIMAL(12,2),
    "sell" DECIMAL(14,2),
    "roomType" "public"."RoomType" NOT NULL,
    "phone" TEXT,
    "lineId" TEXT,
    "indexFbUrl" TEXT,
    "imageUrls" TEXT[],
    "isPetFriendly" BOOLEAN NOT NULL DEFAULT false,
    "isOwner" BOOLEAN NOT NULL DEFAULT false,
    "distanceToStation" INTEGER,
    "distanceStation" TEXT,
    "note" TEXT,
    "carPark" INTEGER,
    "messageToPost" TEXT,
    "roomAmenities" TEXT[],
    "floor" INTEGER,
    "whenAvailable" TEXT,
    "isAcceptShortTerm" BOOLEAN NOT NULL DEFAULT false,
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
CREATE UNIQUE INDEX "properties_propertyId_key" ON "public"."properties"("propertyId");

-- CreateIndex
CREATE UNIQUE INDEX "properties_propertyCode_key" ON "public"."properties"("propertyCode");

-- CreateIndex
CREATE UNIQUE INDEX "properties_projectPropertyCode_key" ON "public"."properties"("projectPropertyCode");

-- CreateIndex
CREATE INDEX "properties_projectId_idx" ON "public"."properties"("projectId");

-- CreateIndex
CREATE INDEX "properties_status_idx" ON "public"."properties"("status");

-- AddForeignKey
ALTER TABLE "public"."properties" ADD CONSTRAINT "properties_projectId_fkey" FOREIGN KEY ("projectId") REFERENCES "public"."projects"("id") ON DELETE CASCADE ON UPDATE CASCADE;
