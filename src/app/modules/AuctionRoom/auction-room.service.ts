import { prisma } from "../../db/db";
import { CreateAuctionRoomInput, IAuctionRoom } from "./auction-room.interface";

const create = async(data: CreateAuctionRoomInput):Promise<IAuctionRoom> => {
const result = await prisma.auctionRoom.create({data})
console.log(data)

return result
};

export const AuctionRoomService = {
  create,
};
