import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CartRoutingModule } from './cart-routing.module';
import {CartComponent} from "./cart.component";


@NgModule({
  declarations: [
    CartComponent // If it has children they must be imported too
  ],
  imports: [
    CommonModule,
    CartRoutingModule
  ]
})
export class CartModule { }
