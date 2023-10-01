import { Product } from "./products";

export interface Category {
  Cid: number;
  Cname: string;
  CStatus: string; // Specify the correct type for cStatus
  products: Product[]; // Assuming Product is another interface
}
