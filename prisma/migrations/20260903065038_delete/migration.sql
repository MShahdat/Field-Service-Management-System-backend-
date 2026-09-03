-- AlterTable
ALTER TABLE "managerProfiles" ADD COLUMN     "deletedAt" TIMESTAMP(3),
ADD COLUMN     "isDeleted" BOOLEAN NOT NULL DEFAULT false,
ALTER COLUMN "address" DROP NOT NULL;
