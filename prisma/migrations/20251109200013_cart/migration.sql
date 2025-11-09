/*
  Warnings:

  - You are about to drop the column `total_items` on the `Cart` table. All the data in the column will be lost.
  - You are about to drop the column `total_price` on the `Cart` table. All the data in the column will be lost.

*/
-- CreateEnum
CREATE TYPE "CartStatus" AS ENUM ('checked_out', 'pending_checkout');

-- AlterTable
ALTER TABLE "Cart" DROP COLUMN "total_items",
DROP COLUMN "total_price",
ADD COLUMN     "cart_status" "CartStatus" NOT NULL DEFAULT 'pending_checkout';
