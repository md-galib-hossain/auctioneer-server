import { Request, Response } from "express";
import { AuctionItemService } from "./auction-item.service";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import httpStatus from "http-status";

const createAuctionItem = catchAsync(async (req: Request, res: Response) => {
  const result = await AuctionItemService.create(req.body);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    data: result,
    message: "Auction item created",
  });
});

const getAllAuctionItems = catchAsync(async (req: Request, res: Response) => {
  const result = await AuctionItemService.getAll(req.query);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    data: result.data,
    meta: result.meta,
    message: "Auction items retrieved",
  });
});

const getSingleAuctionItem = catchAsync(async (req: Request, res: Response) => {
  const result = await AuctionItemService.getSingle(req.params.id);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    data: result,
    message: "Auction item retrieved",
  });
});

const updateAuctionItem = catchAsync(async (req: Request, res: Response) => {
  const result = await AuctionItemService.update(req.params.id, req.body);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    data: result,
    message: "Auction item updated",
  });
});

const deleteAuctionItem = catchAsync(async (req: Request, res: Response) => {
  await AuctionItemService.hardDelete(req.params.id);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    data: null,
    message: "Auction item deleted",
  });
});
const toggleAuctionItem = catchAsync(async (req: Request, res: Response) => {
    const result = await AuctionItemService.toggleActive(req.params.id);
  
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      data: result,
      message: "Auction item active status toggled",
    });
  });
  

export const AuctionItemController = {
  createAuctionItem,
  getAllAuctionItems,
  getSingleAuctionItem,
  updateAuctionItem,
  deleteAuctionItem,toggleAuctionItem
};
 