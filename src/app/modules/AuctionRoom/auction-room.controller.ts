import { Request, Response } from "express";
import { AuctionRoomService } from "./auction-room.service";

const createAuctionRoom=async(req:Request,res:Response)=>{
const result = await AuctionRoomService.create(req.body)
result
}