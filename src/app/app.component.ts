import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  page = 'main';
  title = 'NutritionalSupplementsWeb';

  changePage(selectedPage: string) {
    this.page = selectedPage;
  }
}
