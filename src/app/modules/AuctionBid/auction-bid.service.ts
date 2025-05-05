import { prisma } from "../../db/db";
import AppError from "../../errors/AppError";
import httpStatus from "http-status";
import { CreateBidInput, IBid } from "./auction-bid.interface";

const create = async (data: CreateBidInput): Promise<IBid> => {
  const result = await prisma.bid.create({ data });
  return result;
};

const getAll = async () => {
  const result = await prisma.bid.findMany();
  return result;
};

const getSingle = async (id: string) => {
  const result = await prisma.bid.findUnique({ where: { id } });
  if (!result) throw new AppError(httpStatus.NOT_FOUND, "Bid not found");
  return result;
};

const deleteBid = async (id: string) => {
  await prisma.bid.delete({ where: { id } });
  return null;
};

export const BidService = {
  create,
  getAll,
  getSingle,
  deleteBid,
};
