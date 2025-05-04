import { Router } from "express";
import { AuctionRoomController } from "./auction-room.controller";
import validateRequest from "../../middlewares/validateRequest";
import { AuctionRoomValidation } from "./auction-room.validation";

const router = Router();
router.post(
  "/",
  validateRequest(AuctionRoomValidation.createAuctionRoomSchema),
  AuctionRoomController.createAuctionRoom
);
router.get("/", AuctionRoomController.getAllAuctionRooms);
router.get("/:id", AuctionRoomController.getSingleAuctionRoom);
router.patch(
  "/:id",
  validateRequest(AuctionRoomValidation.updateAuctionRoomSchema),
  AuctionRoomController.updateSingleAuctionRoom
);
router.patch("/:id/toggle", AuctionRoomController.toggleAuctionRoom);
router.delete("/:id", AuctionRoomController.deleteAuctionRoom);
export const AuctionRoomRoutes = router;
