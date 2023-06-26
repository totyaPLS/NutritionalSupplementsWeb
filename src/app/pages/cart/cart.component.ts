import {Component, OnDestroy, OnInit} from '@angular/core';
import {CartService} from "../../common/services/cart.service";
import {Cart} from "../../common/models/Cart";
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
  loading: boolean = false;

  constructor(private cartService: CartService) { }

  ngOnInit() {
    this.loading = true;
    this.currentUserId = JSON.parse(localStorage.getItem('user') as string).uid;
    this.initProductsFromCart(this.currentUserId);
  }

  ngOnDestroy() {
    this.loadingSubscription?.unsubscribe();
  }

  initProductsFromCart(userId: string | undefined) {
    if (userId === undefined) return;

    this.cartService.getCartByUserId(userId).then(cart => {
      this.cart = cart;
      this.loading = false;
    }).catch(error => {console.error(error)});
  }

  removeItem(productId: string) {
    if (this.currentUserId === undefined) return;

    this.cartService.getCartByUserId(this.currentUserId).then(cart => {
      this.cartService.deleteProductFromCart(cart, productId).then(firebaseCart => {
        this.cartService.update(firebaseCart);
      });
    }).catch(error => {console.error(error)});
  }
}
