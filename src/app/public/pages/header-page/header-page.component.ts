import { ChangePasswordComponent } from './change-password/change-password.component';
import { CartService } from 'src/shared/services/cart.service';
import { AuthService } from 'src/shared/services/auth.service';
import { Component, Injectable, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { StorageService } from 'src/shared/services/storage.service';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-header-page',
  templateUrl: './header-page.component.html',
  styleUrls: ['./header-page.component.css']
})
@Injectable()
export class HeaderPageComponent implements OnInit {

  isLogged: boolean = false;
  quantityItems: number;

  constructor(private router: Router,
    private authService: AuthService,
    private storage: StorageService,
    private cartService: CartService,
    private dialog: MatDialog
    ) { }

  ngOnInit(): void {
    this.isLoggedHeader();
    this.updateCartHeader();
  }

  navigateToProduct() {
    this.router.navigate(['products', 0])
  }

  changePage(page: string){
    location.href = page;
  }

  logout(){
    this.authService.logout();
    this.changePage("login");
  }

  isLoggedHeader(){
    let localUser = this.storage.getLocalUser();
    if(localUser == null){
      return this.isLogged = false;
    } else {
      return this.isLogged = true;
    }
  }

  updateCartHeader(){
    let cart = this.cartService.getCart();
    this.quantityItems = cart.items.length;
  }

  openDialog(){
    const dialogRef = this.dialog.open(ChangePasswordComponent, {
      width: '500px',
      height: '410px',
      hasBackdrop: true
    });
    dialogRef.afterClosed().subscribe(result => {
      console.log("fechou dialog")
    });

  }



}
