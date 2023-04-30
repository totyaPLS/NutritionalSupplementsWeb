import {Component, EventEmitter, Input, Output} from '@angular/core';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent {
  @Input() currentPage: string = '';
  @Output() selectedPage: EventEmitter<string> = new EventEmitter();

  menuSwitch() {
    this.selectedPage.emit(this.currentPage);
  }
}
