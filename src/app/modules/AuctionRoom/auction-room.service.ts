import QueryBuilder from "../../builder/queryBuilder";
import { prisma } from "../../db/db";
import AppError from "../../errors/AppError";
import { CreateAuctionRoomInput, IAuctionRoom } from "./auction-room.interface";
import httpStatus from "http-status";

const create = async (data: CreateAuctionRoomInput): Promise<IAuctionRoom> => {
  console.log(data);
  const result = await prisma.auctionRoom.create({ data });

  return result;
};

const getAll = async (query: Record<string, unknown>) => {
  const qb = new QueryBuilder<IAuctionRoom>(prisma.auctionRoom, query, {
    defaultLimit: 10,
    searchableFields: ["roomCode", "title"],
    enumFields: ["isPrivate", "status"],
    cursorField: "id",
  });
  const result = await qb

    .search()
    .filter()
    .sort()
    .cursorPaginate()
    .fields()
    .executeWithMeta();
  return result;
};
const getSingle = async (id: string) => {
  const result = await prisma.auctionRoom.findUniqueOrThrow({ where: { id } });
  return result;
};
const update = async (id: string, data: Partial<IAuctionRoom>) => {
  const result = await prisma.auctionRoom.update({
    where: { id },
    data: {
      ...data,
    },
  });
  return result
};
const toggleActive = async (id: string) => {
  const existing = await prisma.auctionRoom.findUnique({
    where: { id },
    select: { isActive: true },
  });

  if (!existing) {
    throw new AppError(httpStatus.NOT_FOUND,'Auction room not found');
  }

  const updated = await prisma.auctionRoom.update({
    where: { id },
    data: {
      isActive: !existing.isActive,
    },
  });

  return updated;
};
const hardDelete= async(id:string)=>{
 await prisma.auctionRoom.delete({where:{id}})
return null
}


export const AuctionRoomService = {
  create,
  getAll,
  getSingle,update,toggleActive,hardDelete
};
