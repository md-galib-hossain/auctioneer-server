export interface IAuctionChatMessage {
    id: string;
    auctionRoomId: string;
    userId: string;
    content: string;
    createdAt: Date;
  }
  
    export type CreateAuctionChatMessageInput = Omit<IAuctionChatMessage, "id" | "createdAt" >;
  