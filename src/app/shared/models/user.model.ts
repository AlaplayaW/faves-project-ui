import { Book } from "./book.model";
import { Media } from "./media.model";
import { Review } from "./review.model";

export interface User {
  id?: number;
  pseudo?: string;
  password?: string;
  email?: string;
  media?: Media;
  roles?: string[];
  books?: Book[];
  reviews?: Review[];
  friendRequesters?: User[];
  friendAccepters?: User[];
  createdAt?: Date | null;
  updatedAt?: Date | null;
}