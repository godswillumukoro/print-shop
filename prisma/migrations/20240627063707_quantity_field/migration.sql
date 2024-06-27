-- CreateEnum
CREATE TYPE "Quantity" AS ENUM ('quantity');

-- AlterTable
ALTER TABLE "Configuration" ADD COLUMN     "quantity" INTEGER NOT NULL DEFAULT 1;
