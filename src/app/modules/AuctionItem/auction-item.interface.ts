export interface IAuctionItem {
    id: string;
    auctionRoomId: string;
    name: string;
    description?: string | null;
    startingPrice: number ;
    currentPrice?: number | null;
    status: "pending" | "active" | "sold";
    winnerId?: string | null;
    createdAt: Date;
    updatedAt: Date;
  }
  export type CreateAuctionItemInput = Omit<IAuctionItem, "id" | "createdAt" | "updatedAt">;
  
