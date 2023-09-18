import { BookGenre } from "./book-genre.model";
import { Media } from "./media.model";
import { Review } from "./review.model";
import { User } from "./user.model";

export interface Book {
  id?: number;
  title: string;
  subtitle?: string;
  authors?: string[];
  bookGenres?: BookGenre[];
  publisher?: string;
  isbn: string;
  printType: string;
  publishedDate?: Date;
  description?: string;
  averageRating?: number;
  ratingsCount: number;
  media?: Media;
  pageCount?: number;
  user: User;
  reviews: Review[];
  rating?: number;
  createdAt?: Date | null;
  updatedAt?: Date | null;
}
