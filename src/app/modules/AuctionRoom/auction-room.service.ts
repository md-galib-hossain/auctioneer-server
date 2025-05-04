import QueryBuilder from "../../builder/queryBuilder";
import { prisma } from "../../db/db";
import { CreateAuctionRoomInput, IAuctionRoom } from "./auction-room.interface";

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
export const AuctionRoomService = {
  create,
  getAll,
};
