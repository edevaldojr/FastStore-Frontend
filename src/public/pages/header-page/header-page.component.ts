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

  constructor(private router: Router,
    private storage: StorageService,
    private authService: AuthService) { }

  ngOnInit(): void {
    let localUser = this.storage.getLocalUser();
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
    console.log("passo")
    location.href = page;
  }

  logout(){
    this.authService.logout();
    this.selectButton("login");
  }

}
