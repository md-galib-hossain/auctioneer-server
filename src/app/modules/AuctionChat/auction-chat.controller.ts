import { Request, Response } from "express";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import httpStatus from "http-status";
import { AuctionChatService } from "./auction-chat.service";

const sendMessageAuction = catchAsync(async (req: Request, res: Response) => {
  const result = await AuctionChatService.create(req.body);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    data: result,
    message: "Sms sent successfully",
  });
});

const getAllAuctionChats = catchAsync(async (req: Request, res: Response) => {
  const result = await AuctionChatService.getAll(req.query);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    data: result.data,
    meta: result.meta,
    message: "Chat retrieved",
  });
});

const getSingleSms = catchAsync(async (req: Request, res: Response) => {
  const result = await AuctionChatService.getSingle(req.params.id);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    data: result,
    message: "Message retrieved",
  });
});

const updateMessage = catchAsync(async (req: Request, res: Response) => {
  const result = await AuctionChatService.update(req.params.id, req.body);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    data: result,
    message: "Message updated",
  });
});

const deleteAuctionMessage = catchAsync(async (req: Request, res: Response) => {
  await AuctionChatService.hardDelete(req.params.id);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    data: null,
    message: "Message deleted",
  });
});
// const toggleAuctionItem = catchAsync(async (req: Request, res: Response) => {
//     const result = await AuctionItemService.toggleActive(req.params.id);
  
//     sendResponse(res, {
//       statusCode: httpStatus.OK,
//       success: true,
//       data: result,
//       message: "Auction item active status toggled",
//     });
//   });
  

export const AuctionChatController = {
    updateMessage,deleteAuctionMessage,sendMessageAuction,getAllAuctionChats,getSingleSms
};
 