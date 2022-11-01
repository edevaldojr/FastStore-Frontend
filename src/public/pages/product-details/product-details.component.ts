import { Stock } from './../../../shared/models/stock';
import { Product } from './../../../shared/models/product';
import { ProductService } from './../../../shared/services/product.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css']
})
export class ProductDetailsComponent implements OnInit {

  product: Product;
  stock: Stock;
  stockId: number;
  constructor( private route: ActivatedRoute,
    private router: Router,
    private productService: ProductService) {

  }

  ngOnInit(): void {
    const id = this.route.snapshot.params['id'];

    if (!!id) {
     console.log(id);
     this.getProduct(id);
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
    console.log(stock)
  }

  alterRoute(id: number){
    this.router.navigate(['products', id]);
    setTimeout(() => { this.ngOnInit(); }, 2);
  }


}
