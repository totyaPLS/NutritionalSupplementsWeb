import {Component, OnDestroy, OnInit} from '@angular/core';
import {CartService} from "../../common/services/cart.service";
import {Cart} from "../../common/models/Cart";
import {ProductService} from "../../common/services/product.service";
import {Product} from "../../common/models/Product";
import {AngularFireStorage} from "@angular/fire/compat/storage";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit, OnDestroy {
  cart: Cart = new Cart();
  currentUserId?: string;
  loadingSubscription?: Subscription;
  displayedColumns: string[] = ['image', 'name', 'rate', 'price', 'quantity', 'remove'];
  storage?: AngularFireStorage

  constructor(private cartService: CartService, private productService: ProductService) { }

  ngOnInit() {
    this.currentUserId = JSON.parse(localStorage.getItem('user') as string).uid;
    this.initProductsFromCart(this.currentUserId);
  }

  ngOnDestroy() {
    this.loadingSubscription?.unsubscribe();
  }

  initProductsFromCart(userId: string | undefined) {
    if (userId !== undefined)
      this.cartService.getCartByUserId(userId).then(cart => {
        if (cart !== undefined) {
          let productMap: Map<Product, number> = this.convertToMap(cart[0].product_list);
          this.cart = new Cart(cart[0].id, cart[0].user_id, productMap);
        }
      }).catch(error => {console.error(error)});
  }

  convertToMap(productList: Array<any>): Map<Product, number> {
    let productMap: Map<Product, number> = new Map<Product, number>();
    for (const item of productList) {
      this.productService.getProductById(item.product_id).then(product => {
        productMap.set(product[0], item.amount);
      }).catch(error => {console.error(error)});
    }
    return productMap;
  }

  removeItem(productId: string) {
    this.cartService.delete(productId);
  }
}
