export interface IAuctionItem {
    id: string;
    auctionRoomId: string;
    name: string;
    description?: string;
    startingPrice: number;
    currentPrice?: number;
    status: "pending" | "active" | "sold";
    winnerId?: string;
    createdAt: Date;
    updatedAt: Date;
  }
  