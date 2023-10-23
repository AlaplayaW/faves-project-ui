import { Book } from './book.model';
import { User } from './user.model';

export interface Review {
  id?: number;
  rating?: number | string;
  comment: string;
  user: User | any;
  book: Book | any;
  createdAt?: Date | null;
  updatedAt?: Date | null;
}
