-- CreateTable
CREATE TABLE "Notification" (
    "n_id" SERIAL NOT NULL,
    "user_id" INTEGER NOT NULL,
    "n_body" TEXT NOT NULL,

    CONSTRAINT "Notification_pkey" PRIMARY KEY ("n_id")
);

-- AddForeignKey
ALTER TABLE "Notification" ADD CONSTRAINT "Notification_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("user_id") ON DELETE RESTRICT ON UPDATE CASCADE;
