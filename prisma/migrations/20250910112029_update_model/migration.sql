/*
  Warnings:

  - You are about to drop the column `isEnableLine` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `lineCode` on the `User` table. All the data in the column will be lost.

*/
-- CreateEnum
CREATE TYPE "public"."Roles" AS ENUM ('admin', 'freeUser', 'paidUser');

-- AlterTable
ALTER TABLE "public"."User" DROP COLUMN "isEnableLine",
DROP COLUMN "lineCode",
ADD COLUMN     "role" "public"."Roles" NOT NULL DEFAULT 'freeUser';
