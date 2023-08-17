import { Genre } from "./genre.model";
import { Item } from "./item.model";

export interface ItemGenre {
  id: number;
  item?: Item;
  genre?: Genre;
  createdAt: Date | null;
  updatedAt: Date | null;
}

