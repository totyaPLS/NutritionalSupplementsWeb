import { Injectable } from '@angular/core';
import {AngularFirestore} from "@angular/fire/compat/firestore";
import {Cart} from "../models/Cart";
@Injectable({
  providedIn: 'root'
})
export class CartService {
  collectionName = 'Carts';
  constructor(private afs: AngularFirestore) { }

  create(cart: Cart) {}

  getAll() {
    return this.afs.collection<Cart>(this.collectionName).valueChanges();
  }

  update() {}

  delete() {}

  getCartByUserId(userId: string) {
    return this.afs.collection<any>(this.collectionName, ref => ref.where('user_id', '==', userId)).valueChanges();
  }
}
