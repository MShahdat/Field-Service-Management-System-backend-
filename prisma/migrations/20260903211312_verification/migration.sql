-- CreateEnum
CREATE TYPE "ManagerVerificationStatus" AS ENUM ('PENDING', 'APPROVED', 'REJECTED');

-- AlterTable
ALTER TABLE "managerProfiles" ADD COLUMN     "rejectionReason" TEXT,
ADD COLUMN     "reviewdAt" TIMESTAMP(3),
ADD COLUMN     "reviewdBy" TEXT,
ADD COLUMN     "verificationStatus" "ManagerVerificationStatus" NOT NULL DEFAULT 'PENDING';
