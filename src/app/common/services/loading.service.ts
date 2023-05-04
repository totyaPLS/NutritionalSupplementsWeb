import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LoadingService {

  constructor() { }

  loadingWithPromise(email: any, password: any): Promise<boolean> {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (email === 'asdf' && password === 'asdf') {
          resolve(true);
        } else {
          reject(false);
        }
      }, 3000);
    });
  }
}
