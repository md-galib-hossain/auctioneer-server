import { z } from "zod";

const createAuctionRuleSchema = z.object({
  body: z.object({
    auctionRoomId: z.string().uuid(),
    description: z.string().min(1),
    key: z.string().optional(),
    value: z.string().optional(),
  }),
});

export const AuctionRuleValidation = {
  createAuctionRuleSchema,
};
