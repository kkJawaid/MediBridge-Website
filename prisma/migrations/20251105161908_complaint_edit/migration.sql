-- CreateEnum
CREATE TYPE "ComplaintStatus" AS ENUM ('awaiting_response', 'response_sent');

-- CreateTable
CREATE TABLE "Complaint" (
    "complaint_id" SERIAL NOT NULL,
    "user_id" INTEGER NOT NULL,
    "complaint_body" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "status" "ComplaintStatus" NOT NULL DEFAULT 'awaiting_response',
    "response" TEXT NOT NULL DEFAULT 'n/a',

    CONSTRAINT "Complaint_pkey" PRIMARY KEY ("complaint_id")
);

-- AddForeignKey
ALTER TABLE "Complaint" ADD CONSTRAINT "Complaint_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("user_id") ON DELETE RESTRICT ON UPDATE CASCADE;
