import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MainRoutingModule } from './main-routing.module';
import {MainComponent} from "./main.component";
import {FormatToCurrencyHUFPipe} from "../../common/pipes/currency-format.pipe";
import {NgbModule} from "@ng-bootstrap/ng-bootstrap";
import {MatCardModule} from "@angular/material/card";


@NgModule({
  declarations: [
    MainComponent,
    FormatToCurrencyHUFPipe
  ],
  imports: [
    CommonModule,
    MainRoutingModule,
    NgbModule,
    MatCardModule,
  ]
})
export class MainModule { }
