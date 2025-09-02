/*
  Warnings:

  - Added the required column `language` to the `PurchaseAndSaleContract` table without a default value. This is not possible if the table is not empty.
  - Added the required column `language` to the `RentalContract` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "public"."PurchaseAndSaleContract" ADD COLUMN     "language" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "public"."RentalContract" ADD COLUMN     "language" TEXT NOT NULL;
