export interface IAuctionBid {
    id: string;
    auctionRoomId: string;
    auctionItemId: string;
    userId: string;
    amount: number;
    createdAt: Date;
  }
  