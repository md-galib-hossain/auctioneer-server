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
    meta: result.meta,
    message: "Auction rooms retrieved",
  });
});
const getSingleAuctionRoom = catchAsync(async (req: Request, res: Response) => {
  const result = await AuctionRoomService.getSingle(req.params.id);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    data: result,

    message: "Auction room retrieved",
  });
});
const updateSingleAuctionRoom = catchAsync(
  async (req: Request, res: Response) => {
    const result = await AuctionRoomService.update(req.params.id, req.body);

    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      data: result,

      message: "Auction room updated",
    });
  }
);
const toggleAuctionRoom = catchAsync(async (req: Request, res: Response) => {
  const result = await AuctionRoomService.toggleActive(req.params.id);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    data: result,

    message: "Auction room active status changed",
  });
});
const deleteAuctionRoom = catchAsync(async (req: Request, res: Response) => {
  await AuctionRoomService.hardDelete(req.params.id);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    data: null,

    message: "Auction room deleted",
  });
});
const joinAuctionRoom = catchAsync(async (req: Request, res: Response) => {
  const {userId,roomCode,password} = req.body
  const result =await AuctionRoomService.joinAuctionRoom(userId,roomCode,password);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    data: result,

    message: "Auction room joined",
  });
});

const getAllParticipants = catchAsync(async (req: Request, res: Response) => {
  const {id} = req.params
  const result = await AuctionRoomService.getParticipants(id);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    data: result,
    // meta: result.meta,
    message: "Participants retrieved",
  });
});

export const AuctionRoomController = {
  createAuctionRoom,
  getAllAuctionRooms,
  getSingleAuctionRoom,
  updateSingleAuctionRoom,
  toggleAuctionRoom,deleteAuctionRoom,joinAuctionRoom,getAllParticipants
};
