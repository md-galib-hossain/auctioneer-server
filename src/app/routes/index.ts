import { Router } from "express";
import { AuctionRoomRoutes } from "../modules/AuctionRoom/auction-room.route";


const router = Router()

const moduleRoutes = [
    {
        path : '/auction-room',
        route : AuctionRoomRoutes
    },
   
]

moduleRoutes.forEach(route=> router.use(route.path,route.route))


export default router