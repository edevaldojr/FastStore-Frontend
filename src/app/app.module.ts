import { OrderService } from './../shared/services/order.service';
import { UserService } from './../shared/services/user.service';
import { StorageService } from './../shared/services/storage.service';
import { AuthService } from './../shared/services/auth.service';
import { RouterModule } from '@angular/router';
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
import { CommonModule, registerLocaleData } from '@angular/common';
import localePt from '@angular/common/locales/pt';
import { MatPaginatorIntl, MatPaginatorModule } from '@angular/material/paginator';
import { PaginatorPtbr } from 'src/shared/models/paginator';
import { MatSelectModule } from '@angular/material/select';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ProfileComponent } from '../public/pages/profile/profile.component';
import { MatMenuModule } from '@angular/material/menu';

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
    SignupComponent,
    ProfileComponent
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
    HttpClientModule,
    MatPaginatorModule,
    RouterModule,
    CommonModule,
    MatSelectModule,
    FormsModule,
    ReactiveFormsModule,
    MatMenuModule
  ],
  providers: [
    ProductService,
    CategoryService,
    {
      provide: LOCALE_ID,
      useValue: "pt-BR"
    },
    { provide: 'LOCALSTORAGE', useFactory: getLocalStorage },
    { provide: MatPaginatorIntl, useClass: PaginatorPtbr },
    AuthService,
    StorageService,
    UserService,
    OrderService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
export function getLocalStorage() {
  return (typeof window !== "undefined") ? window.localStorage : null;
}
