/*
  Warnings:

  - You are about to drop the `Module` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `code` to the `Results` table without a default value. This is not possible if the table is not empty.
  - Added the required column `grade` to the `Results` table without a default value. This is not possible if the table is not empty.
  - Added the required column `name` to the `Results` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Module" DROP CONSTRAINT "Module_id_fkey";

-- AlterTable
ALTER TABLE "Results" ADD COLUMN     "code" TEXT NOT NULL,
ADD COLUMN     "grade" TEXT NOT NULL,
ADD COLUMN     "name" TEXT NOT NULL;

-- DropTable
DROP TABLE "Module";
