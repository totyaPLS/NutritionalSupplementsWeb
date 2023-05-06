import {Component, OnInit} from '@angular/core';
import {NavigationEnd, Router} from "@angular/router";
import {filter, throwError} from "rxjs";
import {MatSidenav} from "@angular/material/sidenav";
import {AuthService} from "./common/services/auth.service";
import { tap, catchError } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
  page = '';
  title = 'NutritionalSupplementsWeb';
  routes: Array<string> = [];
  loggedInUser?: firebase.default.User | null;

  constructor(private router: Router, private authService: AuthService) {
  }

  ngOnInit() {
    this.routes = this.router.config.map(conf => conf.path) as string[];

    this.router.events.pipe(filter(event => event instanceof NavigationEnd)).subscribe((events: any) => {
      const currentPage = (events.urlAfterRedirects as string).split('/')[1] as string;
      if (this.routes.includes(currentPage)) {
        this.page = currentPage;
      }
    });

    this.authService.isUserLoggedIn().pipe(
      tap((user) => {
        this.loggedInUser = user;
        localStorage.setItem('user', JSON.stringify(this.loggedInUser));
      }),
      catchError((error) => {
        console.error('An error occurred:', error);
        localStorage.setItem('user', JSON.stringify('null'));
        return throwError(error);
      })
    ).subscribe();
  }

  changePage(selectedPage: string) {
    this.router.navigateByUrl(selectedPage);
  }

  onToggleSidenav(sidenav: MatSidenav) {
    sidenav.toggle();
  }

  onClose(event: any, sidenav: MatSidenav) {
    if (event === true) {
      sidenav.close();
    }
  }

  logout(_?: boolean) {
    this.authService.logout().then(() => {
      console.log('Logged out succesfully');
    }).catch(err => {
      console.error(err);
    });
  }
}
