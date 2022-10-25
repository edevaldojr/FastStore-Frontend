import { Category } from './../../../shared/models/category';
import { PageControl } from './../../../shared/models/pageControl';
import { Component, OnInit } from '@angular/core';
import { Product } from 'src/shared/models/product';
import { ProductService } from 'src/shared/services/product.service';
import { CategoryService } from 'src/shared/services/category.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {

  products: Product[];
  categories: Category[];
  pageControl: PageControl = new PageControl();
  constructor(private productService: ProductService,
    private categoryService: CategoryService) { }

  ngOnInit(): void {
    this.pageControl.order = 'DESC';
    this.pageControl.page = 0;
    this.pageControl.pageSize = 10;
    this.pageControl.count = 0;
    this.getProducts();
    this.getCategories();
  }

  getProducts(){
    this.productService.findAll(this.pageControl).subscribe((response: any)=>{
      this.products = response.content;
    });

  }

  getCategories(){
    this.categoryService.findAll().subscribe((response: any)=>{
      this.categories = response;
    });

  }

}
