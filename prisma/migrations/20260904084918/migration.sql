/*
  Warnings:

  - You are about to drop the `_CategorySkills` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `categoryId` to the `skills` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "_CategorySkills" DROP CONSTRAINT "_CategorySkills_A_fkey";

-- DropForeignKey
ALTER TABLE "_CategorySkills" DROP CONSTRAINT "_CategorySkills_B_fkey";

-- AlterTable
ALTER TABLE "skills" ADD COLUMN     "categoryId" TEXT NOT NULL;

-- DropTable
DROP TABLE "_CategorySkills";

-- AddForeignKey
ALTER TABLE "skills" ADD CONSTRAINT "skills_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "categories"("id") ON DELETE CASCADE ON UPDATE CASCADE;
