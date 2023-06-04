import {Product} from "./Product";

export class Cart {
  id: string = '';
  userId: string = '';
  contentMap: Map<Product, number> = new Map();

  constructor(id?: string, userId?: string, contentMap?: Map<Product, number>) {
    if (id !== undefined && userId !== undefined && contentMap !== undefined) {
      this.id = id;
      this.userId = userId;
      this.contentMap = contentMap;
    }
  }
}
