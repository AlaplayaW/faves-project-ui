import { Media } from "./media.model";

export class CreateBookDto {
  id?: number;
  title?: string;
  subtitle?: string;
  description?: string;
  user?: string;
  media?: Media;
  book?: string;
  movie?: string;
  reviews?: string[];
  itemGenres?: string[];
  averageRating?: number;
  // createdAt?: Date | null;
  // updatedAt?: Date | null;
}

