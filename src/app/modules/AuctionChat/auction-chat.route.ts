import { Router } from "express";
import validateRequest from "../../middlewares/validateRequest";
import { ChatMessageValidation } from "./auction-chat.validation";
import { AuctionChatController } from "./auction-chat.controller";

const router = Router();

router.post(
  "/",
  validateRequest(ChatMessageValidation.createChatMessageSchema),
  AuctionChatController.sendMessageAuction
);

router.get("/", AuctionChatController.getAllAuctionChats);

router.get("/:id", AuctionChatController.getSingleSms);

router.patch(
  "/:id",

  AuctionChatController.updateMessage
);

// router.patch("/:id/toggle", AuctionItemController.toggleAuctionItem); 

router.delete("/:id", AuctionChatController.deleteAuctionMessage);

export const AuctionChatRoutes = router;
