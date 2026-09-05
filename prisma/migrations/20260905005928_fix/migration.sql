/*
  Warnings:

  - You are about to drop the column `requestedDate` on the `services` table. All the data in the column will be lost.
  - You are about to drop the column `reviewAt` on the `services` table. All the data in the column will be lost.
  - You are about to drop the column `scheduledDate` on the `workOrders` table. All the data in the column will be lost.
  - Added the required column `servicingDate` to the `services` table without a default value. This is not possible if the table is not empty.
  - Made the column `regionId` on table `services` required. This step will fail if there are existing NULL values in that column.
  - Added the required column `regionId` to the `workOrders` table without a default value. This is not possible if the table is not empty.
  - Added the required column `servicingDate` to the `workOrders` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "services" DROP CONSTRAINT "services_regionId_fkey";

-- AlterTable
ALTER TABLE "services" DROP COLUMN "requestedDate",
DROP COLUMN "reviewAt",
ADD COLUMN     "reviewedAt" TIMESTAMP(3),
ADD COLUMN     "reviewedBy" TEXT,
ADD COLUMN     "servicingDate" DATE NOT NULL,
ALTER COLUMN "regionId" SET NOT NULL;

-- AlterTable
ALTER TABLE "workOrders" DROP COLUMN "scheduledDate",
ADD COLUMN     "regionId" TEXT NOT NULL,
ADD COLUMN     "servicingDate" TIMESTAMP(3) NOT NULL;

-- AddForeignKey
ALTER TABLE "services" ADD CONSTRAINT "services_regionId_fkey" FOREIGN KEY ("regionId") REFERENCES "regions"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "workOrders" ADD CONSTRAINT "workOrders_regionId_fkey" FOREIGN KEY ("regionId") REFERENCES "regions"("id") ON DELETE CASCADE ON UPDATE CASCADE;
