import {Component, OnInit} from '@angular/core';
import {ProductService} from "../../common/services/product.service";
import {Product} from "../../common/models/Product";
import {CartService} from "../../common/services/cart.service";
import {Cart} from "../../common/models/Cart";

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit {
  productList: Array<Product> = new Array<Product>();
  loading: boolean = false;
  currentUserId?: string;

  constructor(private productService: ProductService, private cartService: CartService) {}

  ngOnInit(): void {
    this.currentUserId = JSON.parse(localStorage.getItem('user') as string).uid;
    this.initAllProducts();
  }

  private initAllProducts() {
    this.loading = true;
    this.productService.getProducts().then(products => {
      for (const product of products) {
        this.productList.push(product);
      }
      this.loading = false;
    }).catch(error => {console.error(error)});
  }

  addToCart(productId: string) {
    if (this.currentUserId === undefined) return;

    this.cartService.getCartAndConvertToCartObject(this.currentUserId).then(cart => {
      if (cart === undefined) return;

      if (this.cartContainsProduct(cart, productId)) {
        console.log("This product is in the user's cart!");
      } else {
        console.log("This product is NOT in the user's cart!");
      }
    }).catch(error => {console.error(error)});

    // if cart's list doesn't contain this product id
      // then add a new item
      // else increase the amount

    // this.cartService.addToCart(productId);
  }

  cartContainsProduct(cart: Cart, productId: string): boolean {
    for (const [product] of cart.contentMap.entries()) {
      if (product.id === productId) return true;
    }
    return false;
  }
}
