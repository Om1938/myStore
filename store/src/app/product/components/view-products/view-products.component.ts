import { Product } from './../../Models/product';
import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../services/product.service';

@Component({
  selector: 'app-view-products',
  templateUrl: './view-products.component.html',
  styleUrls: ['./view-products.component.scss'],
})
export class ViewProductsComponent implements OnInit {
  products: Product[] = [];
  constructor(private readonly _service: ProductService) {}

  ngOnInit(): void {
    this._service.getAllProducts().subscribe((res: Product[]) => {
      this.products = [...res, ...res, ...res, ...res, ...res];
    });
  }
}
