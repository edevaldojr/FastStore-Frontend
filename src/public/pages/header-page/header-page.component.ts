import { CartService } from 'src/shared/services/cart.service';
import { AuthService } from 'src/shared/services/auth.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { StorageService } from 'src/shared/services/storage.service';

@Component({
  selector: 'app-header-page',
  templateUrl: './header-page.component.html',
  styleUrls: ['./header-page.component.css']
})
export class HeaderPageComponent implements OnInit {

  isLogged: boolean = false;
  quantityItems: number;

  constructor(private router: Router,
    private storage: StorageService,
    private authService: AuthService,
    private cartService: CartService) { }

  ngOnInit(): void {
    let localUser = this.storage.getLocalUser();
    let cart = this.cartService.getCart();
    this.quantityItems = cart.items.length;
    if(localUser == null){
      this.isLogged == false;
    } else {
      this.isLogged = true;
    }
  }

  navigateToProduct() {
    this.router.navigate(['products',0])
  }

  selectButton(page: string){
    location.href = page;
  }

  logout(){
    this.authService.logout();
    this.selectButton("login");
  }

}
