/*
  Warnings:

  - You are about to drop the column `approvedAt` on the `services` table. All the data in the column will be lost.
  - You are about to drop the column `rejectedAt` on the `services` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "services" DROP COLUMN "approvedAt",
DROP COLUMN "rejectedAt",
ADD COLUMN     "reviewAt" TIMESTAMP(3);
