import { Component, OnInit } from '@angular/core';
import { CartService } from './../../services/cart.service';

@Component({
  selector: 'app-view-cart',
  templateUrl: './view-cart.component.html',
  styleUrls: ['./view-cart.component.scss'],
})
export class ViewCartComponent implements OnInit {
  orders: any[] = [];

  totalPrice: number = 0;
  totalDiscount: number = 0;
  constructor(private readonly _service: CartService) {}

  ngOnInit(): void {
    this._service.getCart().subscribe((res: any) => {
      this.orders = res;
      console.log(res);
    });
  }
}
