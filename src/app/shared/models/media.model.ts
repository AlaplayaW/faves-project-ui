import { Item } from "./item.model";

export interface Media {
  id?: number;
  imageUrl?: string;
  createdAt?: Date | null;
  updatedAt?: Date | null;
}