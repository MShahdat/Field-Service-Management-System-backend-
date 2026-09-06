-- AlterTable
ALTER TABLE "attachments" ADD COLUMN     "deletedAt" TIMESTAMP(3),
ADD COLUMN     "isDelete" BOOLEAN NOT NULL DEFAULT false;

-- AlterTable
ALTER TABLE "serviceReports" ADD COLUMN     "deletedAt" TIMESTAMP(3),
ADD COLUMN     "isDelete" BOOLEAN NOT NULL DEFAULT false;
