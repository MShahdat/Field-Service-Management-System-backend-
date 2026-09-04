/*
  Warnings:

  - Made the column `categoryId` on table `services` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE "services" DROP CONSTRAINT "services_categoryId_fkey";

-- AlterTable
ALTER TABLE "services" ADD COLUMN     "approvedAt" TIMESTAMP(3),
ADD COLUMN     "assignedAt" TIMESTAMP(3),
ADD COLUMN     "regionId" TEXT,
ADD COLUMN     "rejectedAt" TIMESTAMP(3),
ADD COLUMN     "rejectionReason" TEXT,
ALTER COLUMN "categoryId" SET NOT NULL;

-- AlterTable
ALTER TABLE "workOrders" ALTER COLUMN "technicianId" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "services" ADD CONSTRAINT "services_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "categories"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "services" ADD CONSTRAINT "services_regionId_fkey" FOREIGN KEY ("regionId") REFERENCES "Regions"("id") ON DELETE SET NULL ON UPDATE CASCADE;
