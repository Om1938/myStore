import { Order } from './../Models/cart';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { map, tap } from 'rxjs/operators';
import { BehaviorSubject, Observable, of } from 'rxjs';
// import { User } from '../Models/cart';
import { Router } from '@angular/router';
@Injectable({
  providedIn: 'root',
})
export class CartService {
  cartURL = environment.server + 'cart';

  constructor(private _http: HttpClient) {}

  getCart() {
    return this._http.get<Order[]>(this.cartURL).pipe(
      map((res: Order[]) => {
        return res.reduce((acc, curr) => {
          let order: Order = new Order(curr);
          acc.push(order);
          return acc;
        }, [] as Order[]);
      })
    );
  }

  updateQuantity(quantity: number, order: Order) {
    return this._http.get(
      `${this.cartURL}/updateQuantity/product/${order._id}/quantity/${quantity}`
    );
  }

  deleteProductFromCart(order: Order) {
    return this._http.delete(`${this.cartURL}/product/${order._id}`);
  }
}
