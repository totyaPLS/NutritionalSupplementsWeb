import {Product} from "./Product";

export interface Cart {
  userId: string;
  productList: Record<keyof Product, number>;
}
