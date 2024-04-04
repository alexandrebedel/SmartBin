/*
  Warnings:

  - Changed the type of `trashType` on the `Trash` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- CreateEnum
CREATE TYPE "TrashType" AS ENUM ('RECYCLABLE', 'TRASH', 'GLASS');

-- AlterTable
ALTER TABLE "Trash" DROP COLUMN "trashType",
ADD COLUMN     "trashType" "TrashType" NOT NULL;
