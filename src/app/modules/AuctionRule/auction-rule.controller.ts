import { Request, Response } from "express";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import httpStatus from "http-status";
import { AuctionRuleService } from "./auction-rule.service";

const createAuctionRule = catchAsync(async (req: Request, res: Response) => {
  const result = await AuctionRuleService.create(req.body);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    data: result,
    message: "Auction rule created",
  });
});

const getAllAuctionRules = catchAsync(async (req: Request, res: Response) => {
  const result = await AuctionRuleService.getAll(req.query);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    data: result.data,
    meta: result.meta,
    message: "Auction rules retrieved",
  });
});

const getSingleAuctionRule = catchAsync(async (req: Request, res: Response) => {
  const result = await AuctionRuleService.getSingle(req.params.id);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    data: result,
    message: "Auction rule retrieved",
  });
});

const updateAuctionRule = catchAsync(async (req: Request, res: Response) => {
  const result = await AuctionRuleService.update(req.params.id, req.body);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    data: result,
    message: "Auction rule updated",
  });
});

const deleteAuctionRule = catchAsync(async (req: Request, res: Response) => {
  await AuctionRuleService.hardDelete(req.params.id);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    data: null,
    message: "Auction rule deleted",
  });
});

export const AuctionRuleController = {
  createAuctionRule,
  getAllAuctionRules,
  getSingleAuctionRule,
  updateAuctionRule,
  deleteAuctionRule,
};
