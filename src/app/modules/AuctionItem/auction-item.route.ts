import { Router } from "express";
import { AuctionItemController } from "./auction-item.controller";
import validateRequest from "../../middlewares/validateRequest";
import { AuctionItemValidation } from "./auction-item.validation";

const router = Router();

router.post(
  "/",
  validateRequest(AuctionItemValidation.createAuctionItemSchema),
  AuctionItemController.createAuctionItem
);

router.get("/", AuctionItemController.getAllAuctionItems);

router.get("/:id", AuctionItemController.getSingleAuctionItem);

router.patch(
  "/:id",
  validateRequest(AuctionItemValidation.updateAuctionItemSchema),
  AuctionItemController.updateAuctionItem
);

router.patch("/:id/toggle", AuctionItemController.toggleAuctionItem); 

router.delete("/:id", AuctionItemController.deleteAuctionItem);

export const AuctionItemRoutes = router;
