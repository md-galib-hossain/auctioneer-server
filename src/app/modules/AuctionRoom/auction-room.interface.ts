// types/auctionRoom.ts
export type AuctionRoomStatus = "pending" | "active" | "closed";

export interface IAuctionRoom {
  id: string;
  title: string;
  roomCode: string;
  description?: string | null;
  isPrivate: boolean;
  password?: string | null;
  status: AuctionRoomStatus;
  createdAt: Date;
  updatedAt: Date;
  startTime?: Date | null;
  endTime?: Date | null;
  createdBy: string;
}

export type CreateAuctionRoomInput = Omit<IAuctionRoom, "id" | "createdAt" | "updatedAt">;
