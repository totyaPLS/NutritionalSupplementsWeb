import { Injectable } from '@angular/core';
import {AngularFirestore} from "@angular/fire/compat/firestore";
import {Observable, forkJoin} from "rxjs";
import { switchMap, map } from 'rxjs/operators';
import {AngularFireStorage} from "@angular/fire/compat/storage";
import {ProductObject} from "../constants/products";

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  collectionName = 'Products';
  constructor(private afs: AngularFirestore, private storage: AngularFireStorage) { }

  getProducts(): Observable<any[]> {
    return this.afs.collection(this.collectionName).valueChanges().pipe(
      switchMap((products: any[]) => {
        const productObservables = products.map(product => {
          const imageUrl = this.storage.ref('images/' + product.image_url + '.jpg').getDownloadURL();
          return imageUrl.pipe(
            map(url => ({ ...product, image_url: url }))
          );
        });
        return forkJoin(productObservables);
      })
    );
  }

  getProductById(productId: string) {
    return this.afs.collection<any>(this.collectionName, ref => ref.where('id', '==', productId)).valueChanges();
  }

  importProducts() {
    const collectionRef = this.afs.collection('Products');
    ProductObject.forEach(product => {
      collectionRef.doc(product.id).set(product);
    });
  }
}
