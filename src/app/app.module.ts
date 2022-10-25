import { CategoryService } from './../shared/services/category.service';
import { ProductService } from './../shared/services/product.service';
import { routing } from './app.routing';
import { LOCALE_ID, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatTabsModule} from '@angular/material/tabs';
import { MdbRippleModule } from 'mdb-angular-ui-kit/ripple';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import { HomeComponent } from '../public/pages/home/home.component';
import { ProductsComponent } from '../public/pages/products/products.component';
import { CartComponent } from '../public/pages/cart/cart.component';
import {MatSidenavModule} from '@angular/material/sidenav';
import { FooterPageComponent } from '../public/pages/footer-page/footer-page.component';
import { HeaderPageComponent } from '../public/pages/header-page/header-page.component';
import { ProductDetailsComponent } from '../public/pages/product-details/product-details.component';
import { SigninComponent } from '../public/pages/signin/signin.component';
import { SignupComponent } from '../public/pages/signup/signup.component';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatCardModule} from '@angular/material/card';
import { HttpClientModule } from '@angular/common/http';
import { registerLocaleData } from '@angular/common';
import localePt from '@angular/common/locales/pt';

registerLocaleData(localePt);

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    ProductsComponent,
    CartComponent,
    FooterPageComponent,
    HeaderPageComponent,
    ProductDetailsComponent,
    SigninComponent,
    SignupComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MatTabsModule,
    MdbRippleModule,
    MatButtonModule,
    MatIconModule,
    MatSidenavModule,
    MatFormFieldModule,
    MatCardModule,
    routing,
    HttpClientModule
  ],
  providers: [
    ProductService,
    CategoryService,
    {
      provide: LOCALE_ID,
      useValue: "pt-BR"
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
