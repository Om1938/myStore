import { Product } from './../../Models/product';
import { Component, Input, OnInit } from '@angular/core';
import { ProductService } from '../../services/product.service';

@Component({
  selector: 'app-product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.scss'],
})
export class ProductCardComponent implements OnInit {
  @Input() product!: Product;
  constructor(private _service: ProductService) {}

  ngOnInit(): void {}
  addToCart() {
    if (!this.product) return;

    this._service.addProductToCart(this.product._id).subscribe(
      (res) => {
        console.log(res);
      },
      (err) => {
        console.error(err);
      }
    );
  }
}
