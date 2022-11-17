import { HeaderPageComponent } from './../header-page/header-page.component';
import { ProductDTO } from '../../../../shared/models/product.dto';
import { CartService } from 'src/shared/services/cart.service';
import { Stock } from '../../../../shared/models/stock';
import { Product } from '../../../../shared/models/product';
import { ProductService } from '../../../../shared/services/product.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

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
  constructor( private route: ActivatedRoute,
    private router: Router,
    private productService: ProductService,
    private cartService: CartService,
    private header: HeaderPageComponent) {

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
    this.productDto = ProductDTO.toDto(this.product, this.stock)
    this.cartService.addProduto(this.productDto);
    this.refresh();

  }

  refresh(){
    window.location.reload();
  }

}
