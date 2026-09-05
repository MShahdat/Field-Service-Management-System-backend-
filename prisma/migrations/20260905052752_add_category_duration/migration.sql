/*
  Warnings:

  - Added the required column `duration` to the `categories` table without a default value. This is not possible if the table is not empty.
  - Added the required column `managerId` to the `workOrders` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "categories" ADD COLUMN     "duration" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "services" ADD COLUMN     "duration" INTEGER,
ADD COLUMN     "preferredEndTime" TIME,
ADD COLUMN     "preferredStartTime" TIME;

-- AlterTable
ALTER TABLE "workOrders" ADD COLUMN     "managerId" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "workOrders" ADD CONSTRAINT "workOrders_managerId_fkey" FOREIGN KEY ("managerId") REFERENCES "managerProfiles"("id") ON DELETE CASCADE ON UPDATE CASCADE;
