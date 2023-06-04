import { Injectable } from '@angular/core';
import {AngularFirestore} from "@angular/fire/compat/firestore";
import {Cart} from "../models/Cart";
@Injectable({
  providedIn: 'root'
})
export class CartService {
  collectionName = 'Carts';
  constructor(private db: AngularFirestore) { }

  create(cart: Cart) {
    cart.id = this.db.createId();
    return this.db.collection<Cart>(this.collectionName).doc(cart.id).set(cart)
  }

  getAll() {
    return this.db.collection<Cart>(this.collectionName).valueChanges();
  }

  update(cart: Cart) {
    return this.db.collection<any>(this.collectionName).doc(cart.id).set(cart);
  }

  delete(id: string) {
    return this.db.collection<any>(this.collectionName).doc(id).delete();
  }

  getCartByUserId(userId: string) {
    return new Promise<any>(resolve => {
      this.db.collection<Cart>(
        this.collectionName, ref => ref.where('user_id', '==', userId)
      ).valueChanges().subscribe(cart => resolve(cart));
    });
  }

  addToCart(productId: string) {

  }
}
