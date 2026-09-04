/*
  Warnings:

  - You are about to drop the `Regions` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "_ManagerProfileToRegion" DROP CONSTRAINT "_ManagerProfileToRegion_B_fkey";

-- DropForeignKey
ALTER TABLE "services" DROP CONSTRAINT "services_regionId_fkey";

-- AlterTable
ALTER TABLE "technicians" ADD COLUMN     "isProfileCompleted" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "nid" TEXT;

-- DropTable
DROP TABLE "Regions";

-- CreateTable
CREATE TABLE "regions" (
    "id" TEXT NOT NULL,
    "area" TEXT NOT NULL,
    "description" TEXT,
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "regions_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_TechnicianRegions" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL,

    CONSTRAINT "_TechnicianRegions_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateIndex
CREATE UNIQUE INDEX "regions_area_key" ON "regions"("area");

-- CreateIndex
CREATE INDEX "_TechnicianRegions_B_index" ON "_TechnicianRegions"("B");

-- AddForeignKey
ALTER TABLE "services" ADD CONSTRAINT "services_regionId_fkey" FOREIGN KEY ("regionId") REFERENCES "regions"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ManagerProfileToRegion" ADD CONSTRAINT "_ManagerProfileToRegion_B_fkey" FOREIGN KEY ("B") REFERENCES "regions"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_TechnicianRegions" ADD CONSTRAINT "_TechnicianRegions_A_fkey" FOREIGN KEY ("A") REFERENCES "regions"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_TechnicianRegions" ADD CONSTRAINT "_TechnicianRegions_B_fkey" FOREIGN KEY ("B") REFERENCES "technicians"("id") ON DELETE CASCADE ON UPDATE CASCADE;
