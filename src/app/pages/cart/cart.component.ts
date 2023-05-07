import {Component, OnInit} from '@angular/core';
import {CartService} from "../../common/services/cart.service";
import {Cart} from "../../common/models/Cart";
import {ProductService} from "../../common/services/product.service";
import {Content} from "../../common/models/Content";
import {Product} from "../../common/models/Product";
import { map } from 'rxjs/operators';
import {AngularFireStorage} from "@angular/fire/compat/storage";

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit {
  cart: Cart = {
    id: '',
    userId: '',
    contentList: new Array<Content>
  };
  displayedColumns: string[] = ['image', 'name', 'rate', 'price', 'quantity', 'remove'];
  storage: AngularFireStorage | undefined

  constructor(private cartService: CartService, private productService: ProductService) { }

  ngOnInit() {
    this.cartService.getCartByUserId(JSON.parse(localStorage.getItem('user') as string).uid).subscribe(collection => {

      // iterating the carts
      collection.forEach(cart => {
        this.cart.id = cart.id;
        this.cart.userId = cart.user_id;

        // iterating the content
        // console.log(cart.product_list);
        cart.product_list.forEach((content: any) => {

          this.productService.getProductById(content.product_id).pipe(
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

              return product;
            })
          ).subscribe((product: any) => {
            // console.log(product);
            let content: Content = {
              product: product,
              amount: 1
            };

            this.cart.contentList.push(content);
          });
        });
      });
    });
  }

  removeItem(productId: string) {
    this.cartService.delete(productId);
  }
}
