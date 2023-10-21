import { User } from "./user.model";

export interface Friendship {
  id?: number;
  friendRequester?: User;
  friendAccepter?: User;
  isAccepted: boolean;
  status: string;
  requestDate: Date | null;
  acceptanceDate: Date | null;
  rejectionDate: Date | null;
  updatedAt: Date | null;

}

