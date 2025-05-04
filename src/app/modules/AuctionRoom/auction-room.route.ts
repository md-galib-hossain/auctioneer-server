import { Router } from "express";
import { AuctionRoomController } from "./auction-room.controller";

const router = Router()
router.post("/",AuctionRoomController.createAuctionRoom)
router.get("/",AuctionRoomController.getAllAuctionRooms)
export const AuctionRoomRoutes = router