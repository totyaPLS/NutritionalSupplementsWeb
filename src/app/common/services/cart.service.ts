import { Injectable } from '@angular/core';
import {AngularFirestore} from "@angular/fire/compat/firestore";
import {Cart} from "../models/Cart";
import {ProductService} from "./product.service";

@Injectable({
  providedIn: 'root'
})
export class CartService {
  collectionName = 'Carts';
  constructor(private db: AngularFirestore, private productService: ProductService) { }

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

  getCartByUserId(userId: string): Promise<Cart> {
    return new Promise<Cart>(resolve => {
      this.db.collection<any>(
        this.collectionName, ref => ref.where('user_id', '==', userId)
      ).valueChanges().subscribe(cartList => {
        resolve(this.convertFirebaseCartToCartObject(cartList));
      });
    });
  }

  async convertFirebaseCartToCartObject(firebaseCartList: any[]): Promise<Cart> {
    const currUserFirebaseCart = firebaseCartList[0];
    let cartObj: Cart = new Cart();
    cartObj.id = currUserFirebaseCart.id;
    cartObj.userId = currUserFirebaseCart.user_id;

    for (const productListElement of currUserFirebaseCart.product_list) {
      await this.productService.getProductById(productListElement.product_id).then(product => {
        cartObj.contentMap.set(product, productListElement.amount);
      });
    }

    return cartObj;
  }

  increaseProductAmount(cart: Cart, productId: string) {
    return new Promise<Cart>(resolve => {
      this.db.collection<any>(this.collectionName).doc(cart.id).valueChanges().subscribe(firebaseCart => {
        for (const product of firebaseCart.product_list) {
          if (product.product_id === productId) {
            product.amount++;
            break;
          }
        }
        resolve(firebaseCart);
      });
    });
  }

  addNewProductToCart(cart: Cart, productId: string) {
    return new Promise<Cart>(resolve => {
      this.db.collection<any>(this.collectionName).doc(cart.id).valueChanges().subscribe(firebaseCart => {
        /*for (const product of firebaseCart.product_list) {
          if (product.product_id === productId) {
            product.amount++;
            break;
          }
        }*/
        firebaseCart.product_list.push(
          {amount: 1, product_id: productId}
        );

        resolve(firebaseCart);
      });
    });
  }
}
