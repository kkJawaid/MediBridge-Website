/*
  Warnings:

  - The `status` column on the `Order` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `payment_status` column on the `Payment` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- CreateEnum
CREATE TYPE "OrderStatus" AS ENUM ('pending', 'approved', 'completed', 'rejected', 'dispatched');

-- CreateEnum
CREATE TYPE "PaymentStatus" AS ENUM ('completed', 'pending');

-- AlterTable
ALTER TABLE "Order" DROP COLUMN "status",
ADD COLUMN     "status" "OrderStatus" NOT NULL DEFAULT 'pending';

-- AlterTable
ALTER TABLE "Payment" DROP COLUMN "payment_status",
ADD COLUMN     "payment_status" "PaymentStatus" NOT NULL DEFAULT 'pending';
