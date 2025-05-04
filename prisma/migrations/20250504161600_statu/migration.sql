/*
  Warnings:

  - Changed the type of `status` on the `AuctionRoom` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- CreateEnum
CREATE TYPE "AuctionRoomStatus" AS ENUM ('pending', 'active', 'closed');

-- AlterTable
ALTER TABLE "AuctionRoom" DROP COLUMN "status",
ADD COLUMN     "status" "AuctionRoomStatus" NOT NULL;
