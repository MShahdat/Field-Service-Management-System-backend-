/*
  Warnings:

  - A unique constraint covering the columns `[paymentId]` on the table `payments` will be added. If there are existing duplicate values, this will fail.
  - Made the column `paymentId` on table `payments` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "payments" ALTER COLUMN "paymentId" SET NOT NULL;

-- AlterTable
ALTER TABLE "workOrders" ADD COLUMN     "endTime" TIMESTAMP(3),
ADD COLUMN     "startedTime" TIMESTAMP(3);

-- CreateIndex
CREATE UNIQUE INDEX "payments_paymentId_key" ON "payments"("paymentId");
