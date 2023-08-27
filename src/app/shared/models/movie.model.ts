import { Item } from "./item.model";

export interface Movie {
  id?: number;
  type?: string;
  cast?: string[];
  directors?: string[];
  year?: string;
  runtime?: number;
  item?: Item;
}