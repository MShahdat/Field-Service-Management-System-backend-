/*
  Warnings:

  - A unique constraint covering the columns `[technicianId,type,dayOfWeek]` on the table `availability` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[technicianId,type,date]` on the table `availability` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "availability_technicianId_type_dayOfWeek_key" ON "availability"("technicianId", "type", "dayOfWeek");

-- CreateIndex
CREATE UNIQUE INDEX "availability_technicianId_type_date_key" ON "availability"("technicianId", "type", "date");
