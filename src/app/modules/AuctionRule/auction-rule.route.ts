import { Router } from "express";
import { AuctionRuleController } from "./auction-rule.controller";
import validateRequest from "../../middlewares/validateRequest";
import { AuctionRuleValidation } from "./auction-rule.validation";

const router = Router();

router.post(
  "/",
  validateRequest(AuctionRuleValidation.createAuctionRuleSchema),
  AuctionRuleController.createAuctionRule
);

router.get("/", AuctionRuleController.getAllAuctionRules);

router.get("/:id", AuctionRuleController.getSingleAuctionRule);

router.patch(
  "/:id",
  validateRequest(AuctionRuleValidation.updateAuctionRuleSchema),
  AuctionRuleController.updateAuctionRule
);

router.delete("/:id", AuctionRuleController.deleteAuctionRule);

export const AuctionRuleRoutes = router;
