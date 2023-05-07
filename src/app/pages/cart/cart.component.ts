import {Component, OnInit} from '@angular/core';
import {CartService} from "../../common/services/cart.service";
import {Cart} from "../../common/models/Cart";
import {ProductService} from "../../common/services/product.service";
import {Content} from "../../common/models/Content";
import {Product} from "../../common/models/Product";
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit {
  cart: Cart = {
    id: '',
    userId: '',
    content: new Array<Content>
  };

  constructor(private cartService: CartService, private productService: ProductService) { }

  ngOnInit() {
    this.cartService.getCartByUserId(JSON.parse(localStorage.getItem('user') as string).uid).subscribe(collection => {

      // iterating the carts
      collection.forEach(cart => {
        this.cart.id = cart.id;
        this.cart.userId = cart.user_id;

        // iterating the content
        cart.product_list.forEach((product: any) => {
          let content: Content = {
            product: this.observableToProductObj(product.product_id),
            amount: product.amount
          };
          this.cart.content.push(content);
        });
      });
    });
  }

  observableToProductObj(productId: string): any {
    this.productService.getProductById(productId).pipe(
      map(collection => {
        let product: Product | null = null;

        collection.forEach(item => {
          product = {
            id: item.id,
            image_url: item.image_url,
            name: item.name,
            rate: item.rate,
            price: item.price
          };
        });

        return product; // Return the transformed value
      })
    ).subscribe();
  }

}
