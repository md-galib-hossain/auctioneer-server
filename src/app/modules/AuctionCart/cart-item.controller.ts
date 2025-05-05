import { Request, Response } from "express";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import httpStatus from "http-status";
import { CartItemService } from "./cart-item.service";

const createCartItem = catchAsync(async (req: Request, res: Response) => {
  const result = await CartItemService.create(req.body);

  sendResponse(res, {
    statusCode: httpStatus.CREATED,
    success: true,
    message: "Cart item added",
    data: result,
  });
});

const getAllCartItems = catchAsync(async (_req: Request, res: Response) => {
  const result = await CartItemService.getAll();

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Cart items fetched",
    data: result,
  });
});

const getSingleCartItem = catchAsync(async (req: Request, res: Response) => {
  const result = await CartItemService.getSingle(req.params.id);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Cart item retrieved",
    data: result,
  });
});

const deleteCartItem = catchAsync(async (req: Request, res: Response) => {
  await CartItemService.deleteCartItem(req.params.id);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Cart item removed",
    data: null,
  });
});

export const CartItemController = {
  createCartItem,
  getAllCartItems,
  getSingleCartItem,
  deleteCartItem,
};
