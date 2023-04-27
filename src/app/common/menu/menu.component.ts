import {Component, EventEmitter, Output} from '@angular/core';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent {
  @Output() selectedPage: EventEmitter<string> = new EventEmitter();

  menuSwitch(pageValue: string) {
    this.selectedPage.emit(pageValue);
  }
}
