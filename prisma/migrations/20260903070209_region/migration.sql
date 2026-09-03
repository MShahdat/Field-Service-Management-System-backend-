/*
  Warnings:

  - You are about to drop the `_ManagerProfileToManagerRegion` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `managerRegions` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "_ManagerProfileToManagerRegion" DROP CONSTRAINT "_ManagerProfileToManagerRegion_A_fkey";

-- DropForeignKey
ALTER TABLE "_ManagerProfileToManagerRegion" DROP CONSTRAINT "_ManagerProfileToManagerRegion_B_fkey";

-- DropTable
DROP TABLE "_ManagerProfileToManagerRegion";

-- DropTable
DROP TABLE "managerRegions";

-- CreateTable
CREATE TABLE "Regions" (
    "id" TEXT NOT NULL,
    "area" TEXT NOT NULL,
    "description" TEXT,
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Regions_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_ManagerProfileToRegion" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL,

    CONSTRAINT "_ManagerProfileToRegion_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateIndex
CREATE UNIQUE INDEX "Regions_area_key" ON "Regions"("area");

-- CreateIndex
CREATE INDEX "_ManagerProfileToRegion_B_index" ON "_ManagerProfileToRegion"("B");

-- AddForeignKey
ALTER TABLE "_ManagerProfileToRegion" ADD CONSTRAINT "_ManagerProfileToRegion_A_fkey" FOREIGN KEY ("A") REFERENCES "managerProfiles"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ManagerProfileToRegion" ADD CONSTRAINT "_ManagerProfileToRegion_B_fkey" FOREIGN KEY ("B") REFERENCES "Regions"("id") ON DELETE CASCADE ON UPDATE CASCADE;
