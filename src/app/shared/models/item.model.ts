import { User } from "./user.model";
import { Media } from "./media.model";
import { Review } from "./review.model";
import { Genre } from "./genre.model";
import { Book } from "./book.model";
import { Movie } from "./movie.model";
import { ItemTypeEnum } from "../enum/item-type-enum";
import { ItemGenre } from "./item-genre.model";

export interface Item {
  id?: number;
  mediaType?: ItemTypeEnum;
  title?: string;
  subtitle?: string;
  description?: string;
  postedBy?: User;
  media?: Media;
  // user?: User;
  book?: Book;
  movie?: Movie;
  reviews?: Review[];
  itemGenres: ItemGenre[];
  averageRating?: number;
  createdAt: Date | null;
  updatedAt: Date | null;
}

