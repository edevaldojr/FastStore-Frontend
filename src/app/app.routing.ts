import { ProductsComponent } from '../public/pages/products/products.component';
import { SigninComponent } from '../public/pages/signin/signin.component';
import { HomeComponent } from '../public/pages/home/home.component';
import { RouterModule, Routes } from "@angular/router";
import { ModuleWithProviders } from '@angular/core';

const APP_ROUTES: Routes = [
  { path: '', component: HomeComponent},
  { path: 'login', component: SigninComponent},
  { path: 'products', component: ProductsComponent},
];

export const routing: ModuleWithProviders<RouterModule> = RouterModule.forRoot(APP_ROUTES);
