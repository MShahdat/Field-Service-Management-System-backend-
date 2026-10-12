-- AlterTable
ALTER TABLE "services" ADD COLUMN     "title" TEXT NOT NULL DEFAULT '';

-- AlterTable
ALTER TABLE "workOrders" ALTER COLUMN "managerId" DROP NOT NULL;
