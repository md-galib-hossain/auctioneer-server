import { Router } from "express";
import { CartItemController } from "./cart-item.controller";
import validateRequest from "../../middlewares/validateRequest";
import { CartItemValidation } from "./cart-item.validation";

const router = Router();

router.post(
  "/",
  validateRequest(CartItemValidation.createCartItemSchema),
  CartItemController.createCartItem
);

router.get("/", CartItemController.getAllCartItems);
router.get("/:id", CartItemController.getSingleCartItem);
router.delete("/:id", CartItemController.deleteCartItem);

export const CartItemRoutes = router;
