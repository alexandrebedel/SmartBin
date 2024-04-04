/*
  Warnings:

  - The values [RECYCLABLE,TRASH,GLASS] on the enum `TrashType` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "TrashType_new" AS ENUM ('recyclable', 'trash', 'glass');
ALTER TABLE "Trash" ALTER COLUMN "trashType" TYPE "TrashType_new" USING ("trashType"::text::"TrashType_new");
ALTER TYPE "TrashType" RENAME TO "TrashType_old";
ALTER TYPE "TrashType_new" RENAME TO "TrashType";
DROP TYPE "TrashType_old";
COMMIT;
