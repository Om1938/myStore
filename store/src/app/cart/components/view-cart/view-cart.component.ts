import { Order } from './../../Models/cart';
import { Component, OnInit } from '@angular/core';
import { CartService } from './../../services/cart.service';
import { AuthService } from 'src/app/auth/services/auth.service';

@Component({
  selector: 'app-view-cart',
  templateUrl: './view-cart.component.html',
  styleUrls: ['./view-cart.component.scss'],
})
export class ViewCartComponent implements OnInit {
  orders: Order[] = [];

  totalPrice: number = 0;
  totalDiscount: number = 0;
  constructor(
    private readonly _service: CartService,
    private _authService: AuthService
  ) {}

  ngOnInit(): void {
    let user = this._authService.token;
    if (!user) {
      this._service.getCartFromLocalStorage().subscribe((res: Order[]) => {
        this.orders = res;
      });
    } else {
      this._service.getCart().subscribe((res: Order[]) => {
        this.orders = res;
      });
    }
  }

  increaseQuantity(qty: number, order: Order) {
    let quantity = order.quantity + qty;
    let user = this._authService.token;
    if (!user) {
      this._service.updateQuantityLocalStorage(quantity, order);
      order.increaseQuantity(qty);
    } else {
      this._service.updateQuantity(quantity, order).subscribe((res) => {
        order.increaseQuantity(qty);
      });
    }
  }
  decreaseQuantity(qty: number, order: Order) {
    let quantity = order.quantity - qty;
    if (quantity > 0) {
      let user = this._authService.token;
      if (!user) {
        this._service.updateQuantityLocalStorage(quantity, order);
        order.decreaseQuantity(qty);
      } else {
        this._service.updateQuantity(quantity, order).subscribe((res) => {
          order.decreaseQuantity(qty);
        });
      }
    }
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
    let user = this._authService.token;
    if (!user) {
      if (this._service.deleteProductFromCartLocalStorage(this.orders[index])) {
        this.orders.splice(index, 1);
      }
    } else {
      this._service
        .deleteProductFromCart(this.orders[index])
        .subscribe((res) => {
          this.orders.splice(index, 1);
        });
    }
  }
}
