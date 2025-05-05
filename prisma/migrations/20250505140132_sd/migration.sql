/*
  Warnings:

  - The `status` column on the `AuctionItem` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- CreateEnum
CREATE TYPE "AuctionItemStatus" AS ENUM ('pending', 'active', 'sold');

-- AlterTable
ALTER TABLE "AuctionItem" DROP COLUMN "status",
ADD COLUMN     "status" "AuctionItemStatus" NOT NULL DEFAULT 'pending';

-- AlterTable
ALTER TABLE "AuctionRoom" ALTER COLUMN "status" SET DEFAULT 'pending';
