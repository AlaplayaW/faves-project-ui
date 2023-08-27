import { Item } from "./item.model";

export interface Book {
  id?: number;
  authors?: string[];
  publishers?: string[];
  publishedDate?: Date;
  pageCount?: number;
  item?: Item;
}