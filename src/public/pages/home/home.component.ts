import { CategoryService } from 'src/shared/services/category.service';
import { Component, OnInit } from '@angular/core';
import { Category } from 'src/shared/models/category';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  categories: Category[];

  constructor(private categoryService: CategoryService) {

  }

  ngOnInit(): void {
    this.getCategories();
  }


  getCategories(){
    this.categoryService.findAll().subscribe((response: any)=>{
      this.categories = response;
    });
  }

}
