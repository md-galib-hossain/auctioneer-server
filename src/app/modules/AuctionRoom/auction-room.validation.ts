import { z } from "zod";

const createAuctionRoomSchema = z.object({
  body: z.object({
    title: z.string().min(1),
    roomCode: z.string().min(1),
    description: z.string().optional(),
    isPrivate: z.boolean().optional(),
    password: z.string().optional(), // Required only if isPrivate is true (validate later in controller)
    status: z.enum(["pending", "active", "closed"]).optional(),
    startTime: z.string().datetime().optional(),
    endTime: z.string().datetime().optional(),
    createdBy: z.string().uuid(),
  }),
});
const updateAuctionRoomSchema = z.object({
  body: createAuctionRoomSchema.shape.body.omit({createdBy:true}).partial().strict()
})

export const AuctionRoomValidation = {
  createAuctionRoomSchema,updateAuctionRoomSchema
};
