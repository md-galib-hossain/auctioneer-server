import { prisma } from "../../db/db";
import { CreateCartItemInput, ICartItem } from "./cart-item.interface";
import AppError from "../../errors/AppError";
import httpStatus from "http-status";

const create = async (data: CreateCartItemInput): Promise<ICartItem> => {
  const result = await prisma.cartItem.create({ data });
  return result;
};

const getAll = async () => {
  return await prisma.cartItem.findMany();
};

const getSingle = async (id: string): Promise<ICartItem> => {
  const result = await prisma.cartItem.findUnique({ where: { id } });
  if (!result) throw new AppError(httpStatus.NOT_FOUND, "Cart item not found");
  return result;
};

const deleteCartItem = async (id: string) => {
  await prisma.cartItem.delete({ where: { id } });
  return null;
};

export const CartItemService = {
  create,
  getAll,
  getSingle,
  deleteCartItem,
};
