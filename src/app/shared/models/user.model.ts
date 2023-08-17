import { Item } from "./item.model";
import { Media } from "./media.model";
import { Review } from "./review.model";

export interface User {
  id?: number;
  firstName?: string;
  lastName?: string;
  userName?: string;
  password?: string;
  birthDate?: Date;
  email?: string;
  phone?: string;
  media?: Media;
  roles?: string[];
  items?: Item[];
  reviews?: Review[];
  friendshipRequests?: User[];
  friendshipAccepters?: User[];
  createdAt?: Date | null;
  updatedAt?: Date | null;
}