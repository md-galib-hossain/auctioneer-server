import { prisma } from "../../db/db";

import QueryBuilder from "../../builder/queryBuilder";
import { CreateAuctionRuleInput, IAuctionRule } from "./auction-rule.interface";

const create = async (data: CreateAuctionRuleInput): Promise<IAuctionRule> => {
  const result = await prisma.auctionRule.create({ data });
  return result;
};

const getAll = async (query: Record<string, unknown>) => {
  const qb = new QueryBuilder<IAuctionRule>(prisma.auctionRule, query, {
    defaultLimit: 10,
    searchableFields: [ "key"],
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
  const result = await prisma.auctionRule.findUniqueOrThrow({ where: { id } });
  return result;
};

const update = async (id: string, data: Partial<IAuctionRule>) => {
  const result = await prisma.auctionRule.update({
    where: { id },
    data,
  });
  return result;
};

const hardDelete = async (id: string) => {
  await prisma.auctionRule.delete({ where: { id } });
  return null;
};

export const AuctionRuleService = {
  create,
  getAll,
  getSingle,
  update,
  hardDelete,
};
