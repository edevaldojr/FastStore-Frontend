import { SnackbarService } from './../../../../shared/components/snackbar/snackbar.service';
import { StorageService } from 'src/shared/services/storage.service';
import { HeaderPageComponent } from './../header-page/header-page.component';
import { ProductDTO } from '../../../../shared/models/product.dto';
import { CartService } from 'src/shared/services/cart.service';
import { Stock } from '../../../../shared/models/stock';
import { Product } from '../../../../shared/models/product';
import { ProductService } from '../../../../shared/services/product.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { timeout } from 'rxjs';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css']
})
export class ProductDetailsComponent implements OnInit {

  product: Product;
  productDto: ProductDTO;
  stock: Stock;
  stockId: number;
  id: number;
  isLogged: boolean;
  constructor( private route: ActivatedRoute,
    private router: Router,
    private productService: ProductService,
    private cartService: CartService,
    private storage: StorageService,
    private snackbar: SnackbarService) {

  }

  ngOnInit(): void {
    this.id = this.route.snapshot.params['id'];

    if (!!this.id) {
     this.getProduct(this.id);
    }
  }

  getProduct(id: number){
    this.productService.findById(id).subscribe((response: any)=>{
      this.product = response;
      this.stock = response.stock[0];
    });
  }

  onChangeStock(stock: Stock){
    this.stock = stock;
  }

  alterRoute(id: number){
    this.router.navigate(['products', id]);
    setTimeout(() => { this.ngOnInit(); }, 2);
  }

  addToCart() {
    if(this.verifyIsLogged()) {
      this.productDto = ProductDTO.toDto(this.product, this.stock)
      this.cartService.addProduto(this.productDto);
      this.refresh();
    } else {
      this.snackbar.error('Deve realizar login para adicionar produtos ao seu carrinho');
      setTimeout(this.changePage, 3000, 'login');
    }
  }

  buy() {
    if(this.verifyIsLogged()) {
      this.productDto = ProductDTO.toDto(this.product, this.stock)
      this.cartService.addProduto(this.productDto);
      this.changePage('cart');
    } else {
      this.snackbar.error('Deve realizar login para adicionar produtos ao seu carrinho');
      setTimeout(this.changePage, 3000, 'login');
    }
  }


  verifyIsLogged(): boolean{
    let localUser = this.storage.getLocalUser();
    if(localUser == null){
      return this.isLogged = false;
    } else {
      return this.isLogged = true;
    }
  }

  refresh(){
    window.location.reload();
  }

  changePage(page: string){
    location.href = page;
  }
}
