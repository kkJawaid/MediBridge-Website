/*
  Warnings:

  - You are about to drop the column `cart_id` on the `CartItem` table. All the data in the column will be lost.
  - You are about to drop the `Cart` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `user_id` to the `CartItem` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Cart" DROP CONSTRAINT "Cart_user_id_fkey";

-- DropForeignKey
ALTER TABLE "CartItem" DROP CONSTRAINT "CartItem_cart_id_fkey";

-- DropIndex
DROP INDEX "CartItem_cart_id_product_id_key";

-- AlterTable
ALTER TABLE "CartItem" DROP COLUMN "cart_id",
ADD COLUMN     "added_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "itemPrice" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "totalPrice" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "user_id" INTEGER NOT NULL,
ALTER COLUMN "quantity" SET DEFAULT 1;

-- DropTable
DROP TABLE "Cart";

-- AddForeignKey
ALTER TABLE "CartItem" ADD CONSTRAINT "CartItem_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("user_id") ON DELETE RESTRICT ON UPDATE CASCADE;
