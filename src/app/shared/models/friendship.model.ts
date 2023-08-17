import { User } from "./user.model";

export interface Friendship {
  id?: number;
  requester?: User;
  accepter?: User;
  isAccepted: boolean;
  createdAt: Date | null;
  updatedAt: Date | null;
}

