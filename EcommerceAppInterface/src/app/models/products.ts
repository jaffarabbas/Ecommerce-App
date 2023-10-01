import { Category } from "./categories";

export interface Product {
  pid: number;
  name: string;
  description: string;
  price: number;
  image: string;
  quantity: number;
  createdOn: string; 
  cid: number;
  productStatus: string;
  cidNavigation: Category; 
  tempUserOrders: any[]; 
  userOrders: any[];
}
