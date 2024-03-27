/*
  Warnings:

  - You are about to drop the column `info` on the `Document` table. All the data in the column will be lost.
  - Added the required column `employeeInfo` to the `Document` table without a default value. This is not possible if the table is not empty.
  - Added the required column `parentInfo` to the `Document` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "Role" AS ENUM ('employee', 'parent');

-- AlterTable
ALTER TABLE "Document" DROP COLUMN "info",
ADD COLUMN     "employeeInfo" JSONB NOT NULL,
ADD COLUMN     "parentInfo" JSONB NOT NULL;

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "role" "Role" NOT NULL DEFAULT 'parent';
