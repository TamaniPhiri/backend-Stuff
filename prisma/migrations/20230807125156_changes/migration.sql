-- DropForeignKey
ALTER TABLE "Results" DROP CONSTRAINT "Results_studentId_fkey";

-- AlterTable
ALTER TABLE "Results" ALTER COLUMN "studentId" SET DATA TYPE BIGINT;

-- AlterTable
ALTER TABLE "Student" ALTER COLUMN "regNo" SET DATA TYPE BIGINT;

-- AddForeignKey
ALTER TABLE "Results" ADD CONSTRAINT "Results_studentId_fkey" FOREIGN KEY ("studentId") REFERENCES "Student"("regNo") ON DELETE RESTRICT ON UPDATE CASCADE;
