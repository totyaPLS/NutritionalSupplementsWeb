import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MainComponent } from './pages/main/main.component';
import { CartComponent } from './pages/cart/cart.component';
import { LoginComponent } from './pages/login/login.component';
import { RegistrationComponent } from './pages/registration/registration.component';
import { MenuComponent } from './common/menu/menu.component';
import { FormatToCurrencyHUFPipe } from './common/pipes/currency-format.pipe';

@NgModule({
  declarations: [
    AppComponent,
    MainComponent,
    CartComponent,
    LoginComponent,
    RegistrationComponent,
    MenuComponent,
    FormatToCurrencyHUFPipe
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
