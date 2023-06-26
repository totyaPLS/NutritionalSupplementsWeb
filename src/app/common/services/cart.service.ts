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

  create(cart: any) {
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
      let sub = this.db.collection<any>(this.collectionName).doc(cart.id).valueChanges().subscribe(firebaseCart => {
        for (const product of firebaseCart.product_list) {
          if (product.product_id === productId) {
            product.amount++;
            break;
          }
        }
        resolve(firebaseCart);
        sub.unsubscribe();
      });
    });
  }

  addNewProductToCart(cart: Cart, productId: string) {
    return new Promise<Cart>(resolve => {
      let sub = this.db.collection<any>(this.collectionName).doc(cart.id).valueChanges().subscribe(firebaseCart => {
        firebaseCart.product_list.push(
          {amount: 1, product_id: productId}
        );

        resolve(firebaseCart);
        sub.unsubscribe();
      });
    });
  }

  deleteProductFromCart(cart: Cart, productIdToDelete: string) {
    return new Promise<Cart>(resolve => {
      let sub = this.db.collection<any>(this.collectionName).doc(cart.id).valueChanges().subscribe(firebaseCart => {
        const indexToDelete = firebaseCart.product_list.findIndex(
          (product: any) => product.product_id === productIdToDelete
        );

        if (indexToDelete !== -1) {
          firebaseCart.product_list.splice(indexToDelete, 1);
        }

        resolve(firebaseCart);
        sub.unsubscribe();
      });
    });
  }
}
