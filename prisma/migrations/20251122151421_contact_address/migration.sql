/*
  Warnings:

  - You are about to drop the column `form_data` on the `Order` table. All the data in the column will be lost.
  - You are about to drop the column `order_type` on the `Order` table. All the data in the column will be lost.
  - You are about to drop the column `address` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `contact` on the `User` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Order" DROP COLUMN "form_data",
DROP COLUMN "order_type",
ADD COLUMN     "address" TEXT NOT NULL DEFAULT 'Street-Town-City-Country',
ADD COLUMN     "contact" TEXT NOT NULL DEFAULT 'XXXXXXXXXXXXX';

-- AlterTable
ALTER TABLE "User" DROP COLUMN "address",
DROP COLUMN "contact";
