import { Product } from './../Models/product';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CartService } from 'src/app/cart/services/cart.service';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  productURL = environment.server + 'product';
  constructor(private _http: HttpClient, private _cart: CartService) {}
  getAllProducts() {
    return this._http.get<Product[]>(this.productURL);
  }

  addProductToCart(productId: string) {
    return this._http.post(`${this.productURL}/addtocart`, { productId });
  }

  addProductToLocalStorage(productId: string) {
    let cart = this._cart.localStorageCart.value;
    const index = cart.findIndex((c: any) => c.productId == productId);
    if (index != -1) return;
    cart = [...cart, { productId: productId, Quantity: 1 }];
    this._cart.localStorageCart.next([ ...cart ]);
  }
}
