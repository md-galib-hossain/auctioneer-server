import { z } from "zod";

const baseAuctionRuleSchema = z.object({
  auctionRoomId: z.string().uuid(),
  description: z.string().min(1, "Description is required"),
  key: z.string().optional(),
  value: z.string().optional(),
});

const createAuctionRuleSchema = z.object({
  body: baseAuctionRuleSchema,
});

const updateAuctionRuleSchema = z.object({
  body: baseAuctionRuleSchema.partial().strict(),
});

export const AuctionRuleValidation = {
  createAuctionRuleSchema,
  updateAuctionRuleSchema,
};
