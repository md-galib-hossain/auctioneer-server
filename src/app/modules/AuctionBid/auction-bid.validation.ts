import { z } from "zod";

const createBidSchema = z.object({
  body: z.object({
    auctionRoomId: z.string().uuid(),
    auctionItemId: z.string().uuid(),
    userId: z.string().uuid(),
    amount: z.number().positive(),
  }),
});

export const BidValidation = {
  createBidSchema,
};
