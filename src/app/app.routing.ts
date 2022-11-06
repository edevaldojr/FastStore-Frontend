import { ProfileComponent } from './../public/pages/profile/profile.component';
import { ProductDetailsComponent } from './../public/pages/product-details/product-details.component';
import { ProductsComponent } from '../public/pages/products/products.component';
import { SigninComponent } from '../public/pages/signin/signin.component';
import { HomeComponent } from '../public/pages/home/home.component';
import { RouterModule, Routes } from "@angular/router";
import { ModuleWithProviders } from '@angular/core';
import { SignupComponent } from 'src/public/pages/signup/signup.component';

const APP_ROUTES: Routes = [
  { path: '', component: HomeComponent},
  { path: 'login', component: SigninComponent},
  { path: 'register', component: SignupComponent},
  { path: 'profile', component: ProfileComponent},
  { path: 'products/:id', component: ProductsComponent},
  { path: 'product-detail/:id', component: ProductDetailsComponent},
];

export const routing: ModuleWithProviders<RouterModule> = RouterModule.forRoot(APP_ROUTES);
