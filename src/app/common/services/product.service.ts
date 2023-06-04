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

  getProducts(): Promise<any> {
    return new Promise<any>(resolve => {
      let loader = this.db.collection<Product>(this.collectionName).valueChanges().subscribe(async products => {
        for (const product of products) {
          await this.loadImage(this.imgUrlPrefix + product.image_url + this.imgUrlSuffix)?.then(data => {
            product.image_url = data;
          });
        }
        await resolve(products);
        await loader.unsubscribe();
      });
    });
  }

  getProductById(productId: string): Promise<any> {
    return new Promise<any>(resolve => {
      let loader = this.db.collection<Product>(
        this.collectionName, ref => ref.where('id', '==', productId)
      ).valueChanges().subscribe(async products => {
        for (const product of products) {
          await this.loadImage(this.imgUrlPrefix + product.image_url + this.imgUrlSuffix)?.then(data => {
            product.image_url = data;
          });
        }
        await resolve(products);
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
