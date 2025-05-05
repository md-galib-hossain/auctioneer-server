export interface ICartItem {
  id: string;
  userId: string;
  auctionItemId: string;
  createdAt: Date;
  updatedAt: Date;
}

export type CreateCartItemInput = Omit<ICartItem, "id" | "createdAt" | "updatedAt">;
