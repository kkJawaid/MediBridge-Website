/*
  Warnings:

  - You are about to drop the column `product_id` on the `Order` table. All the data in the column will be lost.
  - You are about to drop the column `quantity` on the `Order` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Order" DROP CONSTRAINT "Order_product_id_fkey";

-- AlterTable
ALTER TABLE "Order" DROP COLUMN "product_id",
DROP COLUMN "quantity";

-- CreateTable
CREATE TABLE "ProductOrderJunction" (
    "id" SERIAL NOT NULL,
    "product_id" INTEGER NOT NULL,
    "order_id" INTEGER NOT NULL,

    CONSTRAINT "ProductOrderJunction_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "ProductOrderJunction" ADD CONSTRAINT "ProductOrderJunction_product_id_fkey" FOREIGN KEY ("product_id") REFERENCES "Product"("product_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ProductOrderJunction" ADD CONSTRAINT "ProductOrderJunction_order_id_fkey" FOREIGN KEY ("order_id") REFERENCES "Order"("order_id") ON DELETE RESTRICT ON UPDATE CASCADE;
