import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { tap } from 'rxjs/operators';
import { BehaviorSubject } from 'rxjs';
// import { User } from '../Models/cart';
import { Router } from '@angular/router';
@Injectable({
  providedIn: 'root',
})
export class CartService {
  cartURL = environment.server + 'cart';

  constructor(private _http: HttpClient) {}

  getCart() {
    return this._http.get(this.cartURL);
  }
}
