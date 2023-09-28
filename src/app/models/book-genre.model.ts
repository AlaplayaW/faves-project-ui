import { Book } from "./book.model";
import { Genre } from "./genre.model";

export interface BookGenre {
  id: number;
  book?: Book;
  genre?: Genre;
  createdAt: Date | null;
  updatedAt: Date | null;
}

