import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MainRoutingModule } from './main-routing.module';
import {MainComponent} from "./main.component";
import {FormatToCurrencyHUFPipe} from "../../common/pipes/currency-format.pipe";
import {NgbModule} from "@ng-bootstrap/ng-bootstrap";
import {MatCardModule} from "@angular/material/card";
import {MatProgressSpinnerModule} from "@angular/material/progress-spinner";


@NgModule({
    declarations: [
        MainComponent,
        FormatToCurrencyHUFPipe
    ],
    exports: [
        FormatToCurrencyHUFPipe
    ],
    imports: [
        CommonModule,
        MainRoutingModule,
        NgbModule,
        MatCardModule,
        MatProgressSpinnerModule,
    ]
})
export class MainModule { }
