import { ItemTypeEnum } from "../enum/item-type-enum";
import { Media } from "./media.model";

export class CreateItemDto {
  id?: number;
  mediaType?: ItemTypeEnum;
  title?: string;
  subtitle?: string;
  description?: string;
  postedBy?: string;
  media?: Media;
  book?: string;
  movie?: string;
  reviews?: string[];
  itemGenres?: string[];
  averageRating?: number;
  createdAt?: Date | null;
  updatedAt?: Date | null;
}

