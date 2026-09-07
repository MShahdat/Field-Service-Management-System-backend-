/*
  Warnings:

  - You are about to drop the column `actualEnd` on the `workOrders` table. All the data in the column will be lost.
  - You are about to drop the column `actualStart` on the `workOrders` table. All the data in the column will be lost.
  - You are about to drop the column `endTime` on the `workOrders` table. All the data in the column will be lost.
  - You are about to drop the column `startedTime` on the `workOrders` table. All the data in the column will be lost.

*/
-- CreateEnum
CREATE TYPE "ScheduleStatus" AS ENUM ('SCHEDULED', 'CONFIRMED', 'COMPLETED', 'CANCELLED');

-- AlterTable
ALTER TABLE "workOrders" DROP COLUMN "actualEnd",
DROP COLUMN "actualStart",
DROP COLUMN "endTime",
DROP COLUMN "startedTime";

-- CreateTable
CREATE TABLE "schedules" (
    "id" TEXT NOT NULL,
    "servicingDate" TIMESTAMP(3) NOT NULL,
    "startTime" TIMESTAMP(3) NOT NULL,
    "endTime" TIMESTAMP(3) NOT NULL,
    "actualStart" TIMESTAMP(3),
    "actualEnd" TIMESTAMP(3),
    "status" "ScheduleStatus" NOT NULL DEFAULT 'SCHEDULED',
    "isdeleted" BOOLEAN NOT NULL DEFAULT false,
    "deletedAt" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "technicianId" TEXT NOT NULL,
    "workOrderId" TEXT NOT NULL,

    CONSTRAINT "schedules_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "schedules_workOrderId_key" ON "schedules"("workOrderId");

-- AddForeignKey
ALTER TABLE "schedules" ADD CONSTRAINT "schedules_technicianId_fkey" FOREIGN KEY ("technicianId") REFERENCES "technicians"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "schedules" ADD CONSTRAINT "schedules_workOrderId_fkey" FOREIGN KEY ("workOrderId") REFERENCES "workOrders"("id") ON DELETE CASCADE ON UPDATE CASCADE;
