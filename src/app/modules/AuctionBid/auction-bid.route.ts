import { Router } from "express";
import validateRequest from "../../middlewares/validateRequest";
import { BidValidation } from "./auction-bid.validation";
import { BidController } from "./auction-bid.controller";


const router = Router();

router.post(
  "/",
  validateRequest(BidValidation.createBidSchema),
  BidController.createBid
);

router.get("/", BidController.getAllBids);
router.get("/:id", BidController.getSingleBid);
router.delete("/:id", BidController.deleteBid);

export const BidRoutes = router;
