import { z } from "zod";

const baseAuctionItemSchema = z.object({
  auctionRoomId: z.string().uuid(),
  name: z.string().min(1),
  description: z.string().optional(),
  startingPrice: z.number().positive("Starting price must be greater than 0"),
  currentPrice: z.number().positive().optional(),
  status: z.enum(["pending", "active", "sold"]).optional(),
  winnerId: z.string().uuid().nullable().optional(),
});

const createAuctionItemSchema = z.object({
  body: baseAuctionItemSchema,
});

const updateAuctionItemSchema = z.object({
  body: baseAuctionItemSchema.omit({ auctionRoomId: true }).partial().strict(),
});

export const AuctionItemValidation = {
  createAuctionItemSchema,
  updateAuctionItemSchema,
};
