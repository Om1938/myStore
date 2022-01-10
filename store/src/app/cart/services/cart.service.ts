import { Order } from './../Models/cart';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { map } from 'rxjs/operators';
import { BehaviorSubject, of } from 'rxjs';
import { AuthService } from 'src/app/auth/services/auth.service';

interface localStorageOrder {
  productId: string;
  Quantity: number;
}

@Injectable({
  providedIn: 'root',
})
export class CartService {
  cartURL = environment.server + 'cart';
  localStorageCart = new BehaviorSubject<localStorageOrder[]>([]);

  constructor(private _http: HttpClient, private _auth: AuthService) {
    let cart = JSON.parse(localStorage.getItem('cart') || '[]');

    this.localStorageCart.next([...cart]);

    this.localStorageCart.subscribe((value) => {
      localStorage.setItem('cart', JSON.stringify(value));
    });

    _auth.user.subscribe((user) => {
      console.log(user, this.localStorageCart.value);
      this._http
        .post(`${this.cartURL}/mergeCart`, this.localStorageCart.value)
        .subscribe(console.log);
    });
  }

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
  updateQuantityLocalStorage(quantity: number, order: Order) {
    let cart = this.localStorageCart.value;
    let product = cart.find((product: any) => product.productId == order._id);
    if (!product) return;
    product.Quantity = quantity;
    this.localStorageCart.next([...cart]);
  }

  deleteProductFromCart(order: Order) {
    return this._http.delete(`${this.cartURL}/product/${order._id}`);
  }

  deleteProductFromCartLocalStorage(order: Order) {
    let cart = this.localStorageCart.value;
    let index = cart.findIndex(
      (product: any) => product.productId == order._id
    );
    if (index == -1) return false;
    cart.splice(index, 1);
    this.localStorageCart.next([...cart]);
    return true;
  }

  getCartFromLocalStorage() {
    let cart = this.localStorageCart.value;
    if (cart == []) return of([] as Order[]);
    let productIds = cart.map((c) => c.productId);
    let productMap = new Map();
    for (const product of cart) {
      productMap.set(product.productId, product.Quantity);
    }

    return this._http
      .post<Order[]>(`${this.cartURL}/getProducts`, { productIds })
      .pipe(
        map((res: Order[]) => {
          return res.reduce((acc, curr) => {
            curr.quantity = productMap.get(curr._id);
            let order: Order = new Order(curr);
            acc.push(order);
            return acc;
          }, [] as Order[]);
        })
      );
  }
}
