import {Component, OnInit} from '@angular/core';
import {ProductService} from "../../common/services/product.service";
import {Product} from "../../common/models/Product";

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit {
  productList: Array<Product> = new Array<Product>();
  loading: boolean = false;

  constructor(private productService: ProductService) {
  }

  ngOnInit(): void {
    this.initAllProducts();
    // this.productService.importProducts();
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
}
