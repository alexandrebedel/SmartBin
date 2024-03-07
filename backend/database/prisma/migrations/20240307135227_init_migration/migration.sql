-- CreateTable
CREATE TABLE "Trash" (
    "id" SERIAL NOT NULL,
    "binId" VARCHAR(255) NOT NULL,
    "trashType" VARCHAR(255) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Trash_pkey" PRIMARY KEY ("id")
);
