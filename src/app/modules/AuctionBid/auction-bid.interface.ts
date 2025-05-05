export interface IBid {
  id: string;
  auctionRoomId: string;
  auctionItemId: string;
  userId: string;
  amount: number;
  createdAt: Date;
}

export type CreateBidInput = Omit<IBid, "id" | "createdAt">;
