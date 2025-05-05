import { prisma } from "../../db/db";
import AppError from "../../errors/AppError";
import httpStatus from "http-status";
import QueryBuilder from "../../builder/queryBuilder";
import { CreateAuctionItemInput, IAuctionItem } from "./auction-item.interface";

const create = async (data: CreateAuctionItemInput): Promise<IAuctionItem> => {
  const result = await prisma.auctionItem.create({ data });
  return result;
};

const getAll = async (query: Record<string, unknown>) => {
  const qb = new QueryBuilder<IAuctionItem>(prisma.auctionItem, query, {
    defaultLimit: 10,
    searchableFields: ["name"],
    enumFields: ["status"],
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
  const result = await prisma.auctionItem.findUniqueOrThrow({ where: { id } });
  return result;
};

const update = async (id: string, data: Partial<IAuctionItem>) => {
  const result = await prisma.auctionItem.update({
    where: { id },
    data: {
      ...data,
    },
  });
  return result;
};

const toggleActive = async (id: string) => {
  const existing = await prisma.auctionItem.findUnique({
    where: { id },
    select: { isActive: true },
  });

  if (!existing) {
    throw new AppError(httpStatus.NOT_FOUND, "Auction item not found");
  }

  const updated = await prisma.auctionItem.update({
    where: { id },
    data: {
      isActive: !existing.isActive,
    },
  });

  return updated;
};


const hardDelete = async (id: string) => {
  await prisma.auctionItem.delete({ where: { id } });
  return null;
};



export const AuctionItemService = {
  create,
  getAll,
  getSingle,toggleActive,
  update,
  hardDelete,
};
