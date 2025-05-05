import { Router } from "express";
import { AuctionRoomRoutes } from "../modules/AuctionRoom/auction-room.route";
import { AuctionRuleRoutes } from "../modules/AuctionRule/auction-rule.route";
import { BidRoutes } from "../modules/AuctionBid/auction-bid.route";
import { CartItemRoutes } from "../modules/AuctionCart/cart-item.route";
import { AuctionChatRoutes } from "../modules/AuctionChat/auction-chat.route";
import { AuctionItemRoutes } from "../modules/AuctionItem/auction-item.route";


const router = Router()

const moduleRoutes = [
    {
        path : '/auction-room',
        route : AuctionRoomRoutes
    },
    {
        path : '/auction-rule',
        route : AuctionRuleRoutes
    },
    {
        path : '/bid',
        route : BidRoutes
    },
    {
        path : '/cart',
        route : CartItemRoutes
    },
    {
        path : '/chat',
        route : AuctionChatRoutes
    },
    {
        path : '/auction-item',
        route : AuctionItemRoutes
    },
   
]

moduleRoutes.forEach(route=> router.use(route.path,route.route))


export default router