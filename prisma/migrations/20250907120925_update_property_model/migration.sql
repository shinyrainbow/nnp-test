/*
  Warnings:

  - You are about to drop the column `roomAmenities` on the `Property` table. All the data in the column will be lost.
  - You are about to drop the column `roomType` on the `Property` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "public"."Property" DROP COLUMN "roomAmenities",
DROP COLUMN "roomType",
ADD COLUMN     "amenities" TEXT[] DEFAULT ARRAY[]::TEXT[],
ADD COLUMN     "houseSize" TEXT,
ADD COLUMN     "propertyType" "public"."RoomType" DEFAULT 'Condo',
ALTER COLUMN "isAcceptShortTerm" DROP DEFAULT,
ALTER COLUMN "isAcceptShortTerm" SET DATA TYPE TEXT,
ALTER COLUMN "isPetFriendly" DROP DEFAULT,
ALTER COLUMN "isPetFriendly" SET DATA TYPE TEXT,
ALTER COLUMN "isOwner" DROP DEFAULT,
ALTER COLUMN "isOwner" SET DATA TYPE TEXT;
