/*
  Warnings:

  - You are about to drop the column `publicId` on the `attachments` table. All the data in the column will be lost.
  - You are about to drop the column `url` on the `attachments` table. All the data in the column will be lost.
  - You are about to drop the column `laborHours` on the `serviceReports` table. All the data in the column will be lost.
  - You are about to drop the column `partsUsed` on the `serviceReports` table. All the data in the column will be lost.
  - You are about to drop the column `summary` on the `serviceReports` table. All the data in the column will be lost.
  - Added the required column `files` to the `attachments` table without a default value. This is not possible if the table is not empty.
  - Added the required column `reportPublicId` to the `serviceReports` table without a default value. This is not possible if the table is not empty.
  - Added the required column `reportUrl` to the `serviceReports` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "attachments" DROP COLUMN "publicId",
DROP COLUMN "url",
ADD COLUMN     "files" JSONB NOT NULL;

-- AlterTable
ALTER TABLE "serviceReports" DROP COLUMN "laborHours",
DROP COLUMN "partsUsed",
DROP COLUMN "summary",
ADD COLUMN     "description" TEXT,
ADD COLUMN     "reportPublicId" TEXT NOT NULL,
ADD COLUMN     "reportUrl" TEXT NOT NULL;
