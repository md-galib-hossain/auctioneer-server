import { z } from "zod";

const createChatMessageSchema = z.object({
  body: z.object({
    auctionRoomId: z.string().uuid(),
    userId: z.string().uuid(),
    content: z.string().min(1),
  }),
});

export const ChatMessageValidation = {
  createChatMessageSchema,
};
