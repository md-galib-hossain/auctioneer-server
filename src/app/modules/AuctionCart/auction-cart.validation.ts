import { z } from "zod";

const createCartItemSchema = z.object({
  body: z.object({
    userId: z.string().uuid(),
    auctionItemId: z.string().uuid(),
  }),
});

export const CartItemValidation = {
  createCartItemSchema,
};
