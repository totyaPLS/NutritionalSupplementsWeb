import { Injectable } from '@angular/core';
import {AngularFirestore} from "@angular/fire/compat/firestore";
import {take} from "rxjs";
import {AngularFireStorage} from "@angular/fire/compat/storage";
import {ProductObject} from "../constants/products";
import {Product} from "../models/Product";

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  collectionName = 'Products';
  imgUrlPrefix = 'images/'
  imgUrlSuffix = '.jpg'

  constructor(private db: AngularFirestore, private storage: AngularFireStorage) { }

  getProducts(): Promise<Array<Product>> {
    return new Promise<Array<Product>>(resolve => {
      let loader = this.db.collection<Product>(this.collectionName).valueChanges().subscribe(async productList => {
        for (const product of productList) {
          await this.loadImage(this.imgUrlPrefix + product.image_url + this.imgUrlSuffix)?.then(data => {
            product.image_url = data;
          });
        }
        await resolve(productList);
        await loader.unsubscribe();
      });
    });
  }

  getProductById(productId: string): Promise<Product> {
    return new Promise<Product>(resolve => {
      let loader = this.db.collection<any>(
        this.collectionName, ref => ref.where('id', '==', productId)
      ).valueChanges().subscribe(async products => {
        let product: Product = products[0];

        await this.loadImage(this.imgUrlPrefix + product.image_url + this.imgUrlSuffix)?.then(data => {
          product.image_url = data;
        });

        await resolve(product);
        await loader.unsubscribe();
      });
    });
  }

  importProducts() {
    const collectionRef = this.db.collection('Products');
    ProductObject.forEach(product => {
      collectionRef.doc(product.id).set(product);
    });
  }

  loadImage(imageUrl: string): Promise<any> | undefined {
    return this.storage.ref(imageUrl).getDownloadURL().pipe(take(1)).toPromise();
  }
}
