/*
  Warnings:

  - A unique constraint covering the columns `[userId]` on the table `managerProfiles` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[workOrderId]` on the table `payments` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `userId` to the `managerProfiles` table without a default value. This is not possible if the table is not empty.
  - Added the required column `workOrderId` to the `payments` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "managerProfiles" ADD COLUMN     "userId" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "payments" ADD COLUMN     "workOrderId" TEXT NOT NULL;

-- DropEnum
DROP TYPE "SkillStatus";

-- CreateIndex
CREATE UNIQUE INDEX "managerProfiles_userId_key" ON "managerProfiles"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "payments_workOrderId_key" ON "payments"("workOrderId");

-- AddForeignKey
ALTER TABLE "managerProfiles" ADD CONSTRAINT "managerProfiles_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "payments" ADD CONSTRAINT "payments_workOrderId_fkey" FOREIGN KEY ("workOrderId") REFERENCES "workOrders"("id") ON DELETE CASCADE ON UPDATE CASCADE;
