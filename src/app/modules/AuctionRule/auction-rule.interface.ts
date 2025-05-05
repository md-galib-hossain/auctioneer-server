export interface IAuctionRule {
    id: string;
    auctionRoomId: string;
    description: string;
    key: string ;
    value: string ;
    createdAt: Date;
    updatedAt: Date;
  }
  
    export type CreateAuctionRuleInput = Omit<IAuctionRule, "id" | "createdAt" | "updatedAt">;
  