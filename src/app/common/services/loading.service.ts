import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LoadingService {
  private _loading: boolean = false;

  get loading(): boolean {
    return this._loading;
  }

  showLoading(): void {
    this._loading = true;
  }

  hideLoading(): void {
    this._loading = false;
  }

}
