import { z } from "zod";

const createBidSchema = z.object({
  body: z.object({
    auctionRoomId: z.string({ required_error: "Auction Room ID is required" }),
    auctionItemId: z.string({ required_error: "Auction Item ID is required" }),
    userId: z.string({ required_error: "User ID is required" }),
    amount: z.number({ required_error: "Amount is required" }).positive("Amount must be positive"),
  }),
});

export const BidValidation = {
  createBidSchema,
};
