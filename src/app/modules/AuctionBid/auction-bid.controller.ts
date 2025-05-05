import { Request, Response } from "express";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import httpStatus from "http-status";
import { BidService } from "./auction-bid.service";

const createBid = catchAsync(async (req: Request, res: Response) => {
  const result = await BidService.create(req.body);

  sendResponse(res, {
    statusCode: httpStatus.CREATED,
    success: true,
    message: "Bid placed successfully",
    data: result,
  });
});

const getAllBids = catchAsync(async (req: Request, res: Response) => {
  const result = await BidService.getAll();

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Bids fetched successfully",
    data: result,
  });
});

const getSingleBid = catchAsync(async (req: Request, res: Response) => {
  const result = await BidService.getSingle(req.params.id);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Bid retrieved",
    data: result,
  });
});

const deleteBid = catchAsync(async (req: Request, res: Response) => {
  await BidService.deleteBid(req.params.id);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Bid deleted",
    data: null,
  });
});

export const BidController = {
  createBid,
  getAllBids,
  getSingleBid,
  deleteBid,
};
