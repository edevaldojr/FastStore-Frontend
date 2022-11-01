import { Category } from './../../../shared/models/category';
import { PageControl } from './../../../shared/models/pageControl';
import { Component, OnInit } from '@angular/core';
import { Product } from 'src/shared/models/product';
import { ProductService } from 'src/shared/services/product.service';
import { CategoryService } from 'src/shared/services/category.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {

  products: Product[];
  categories: Category[];
  pageControl: PageControl = new PageControl();
  categoryId: number;
  id: string;

  constructor(private route: ActivatedRoute,
    private router: Router,
    private productService: ProductService,
    private categoryService: CategoryService) {
      this.router = router;
    }

  ngOnInit(): void {
    this.pageControl.order = 'DESC';
    this.pageControl.page = 0;
    this.pageControl.pageSize = 1;
    this.pageControl.count = 0;

    this.id = this.route.snapshot.params['id'];

    this.verifyHasCategory();
    this.getCategories();
  }

  getProducts(){
    this.productService.findAll(this.pageControl).subscribe((response: any)=>{
      this.products = response.content;
      this.pageControl.count = response.totalElements;
      this.pageControl.page = response.pageable.pageNumber;
    });
  }

  getCategories(){
    this.categoryService.findAll().subscribe((response: any)=>{
      this.categories = response;
    });
  }

  getProductsByCategory(categoryId: number){
    this.categoryId = categoryId;
    this.productService.findAllByCategory(this.pageControl, this.categoryId).subscribe((response: any)=>{
      this.products = response.content;
      this.pageControl.count = response.totalElements;
      this.pageControl.page = response.pageable.pageNumber;
    });
  }

  pageEvent($event:any) {
    this.pageControl.page = $event.pageIndex;
    this.pageControl.pageSize = $event.pageSize;
    localStorage.setItem('productsLimit', $event.pageSize);
    if (this.id!="0") {
      this.getProductsByCategory(Number(this.id));
     } else{
       this.getProducts();
     }
  }

  alterRoute(id: number){
    this.router.navigate(['products', id]);
    setTimeout(() => { this.ngOnInit(); }, 2);
  }

  verifyHasCategory(){
    if (this.id!="0") {
      this.getProductsByCategory(Number(this.id));
     } else{
       this.getProducts();
     }
  }
}
