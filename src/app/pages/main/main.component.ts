import { Component } from '@angular/core';
import {ProductObject} from "../../common/constants/products";

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent {
  productObject: any = ProductObject;
}
