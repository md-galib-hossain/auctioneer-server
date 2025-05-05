import { z } from "zod";

const createCartItemSchema = z.object({
  body: z.object({
    userId: z.string({ required_error: "User ID is required" }),
    auctionItemId: z.string({ required_error: "Auction Item ID is required" }),
  }),
});

export const CartItemValidation = {
  createCartItemSchema,
};
