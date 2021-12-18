import { Product } from './../Models/product';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  productURL = environment.server + 'product';
  constructor(private _http: HttpClient) {}
  getAllProducts() {
    return this._http.get<Product[]>(this.productURL);
  }

  addProductToCart(productId: string) {
    return this._http.post(`${this.productURL}/addtocart`, { productId });
  }
}
