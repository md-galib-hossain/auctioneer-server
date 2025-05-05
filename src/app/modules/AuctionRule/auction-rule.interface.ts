export interface IAuctionRule {
    id: string;
    auctionRoomId: string;
    description: string;
    key?: string | null;
    value?: string | null;
    createdAt: Date;
    updatedAt: Date;
  }
  
    export type CreateAuctionRuleInput = Omit<IAuctionRule, "id" | "createdAt" | "updatedAt">;
  