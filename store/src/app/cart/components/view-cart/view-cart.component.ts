import { Order } from './../../Models/cart';
import { Component, OnInit } from '@angular/core';
import { CartService } from './../../services/cart.service';

@Component({
  selector: 'app-view-cart',
  templateUrl: './view-cart.component.html',
  styleUrls: ['./view-cart.component.scss'],
})
export class ViewCartComponent implements OnInit {
  orders: Order[] = [];

  totalPrice: number = 0;
  totalDiscount: number = 0;
  constructor(private readonly _service: CartService) {}

  ngOnInit(): void {
    this._service.getCart().subscribe((res: Order[]) => {
      this.orders = res;
    });
  }

  increaseQuantity(qty: number, order: Order) {
    let quantity = order.quantity + qty;
    this._service.updateQuantity(quantity, order).subscribe((res) => {
      order.increaseQuantity(qty);
    });
  }
  decreaseQuantity(qty: number, order: Order) {
    let quantity = order.quantity - qty;
    if (quantity > 0)
      this._service.updateQuantity(quantity, order).subscribe((res) => {
        order.decreaseQuantity(qty);
      });
  }

  getTotalPrice() {
    return this.orders.reduce((acc, curr) => {
      acc += curr.getTotalPrice();
      return acc;
    }, 0);
  }
  getTotalDiscountedPrice() {
    return this.orders.reduce((acc, curr) => {
      acc += curr.getTotalDiscountedPrice();
      return acc;
    }, 0);
  }
  getTotalDiscount() {
    return this.orders.reduce((acc, curr) => {
      acc += curr.getTotalDiscount();
      return acc;
    }, 0);
  }

  deleteOrder(index: number) {
    this._service.deleteProductFromCart(this.orders[index]).subscribe((res) => {
      this.orders.splice(index, 1);
    });
  }
}
