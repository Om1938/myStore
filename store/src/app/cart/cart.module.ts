import { SharedModule } from './../shared/shared.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CartRoutingModule } from './cart-routing.module';
import { CartComponent } from './cart.component';
import { ViewCartComponent } from './components/view-cart/view-cart.component';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [CartComponent, ViewCartComponent],
  imports: [CommonModule, FormsModule, CartRoutingModule, SharedModule],
})
export class CartModule {}
