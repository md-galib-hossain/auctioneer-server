import { Request, Response } from "express";
import { AuctionRoomService } from "./auction-room.service";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import httpStatus from "http-status";

const createAuctionRoom = catchAsync(async (req: Request, res: Response) => {
  const result = await AuctionRoomService.create(req.body);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    data: result,
    message: "Auction room created",
  });
});

const getAllAuctionRooms = catchAsync(async (req: Request, res: Response) => {
  const result = await AuctionRoomService.getAll(req.query);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    data: result.data,
    meta:result.meta,
    message: "Auction rooms retrieved",
  });
});

export const AuctionRoomController = {
  createAuctionRoom,
  getAllAuctionRooms,
};
