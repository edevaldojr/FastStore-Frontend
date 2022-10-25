import { Category } from './../models/category';
import { PageControl } from '../models/pageControl';
import { API_CONFIG } from "src/config/api.config";
import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { Product } from "../models/product";

@Injectable()
export class CategoryService {

  constructor(public http: HttpClient) {
  }

  findAll() : Observable<Category[]> {
    return this.http.get<Category[]>(`${API_CONFIG.baseUrl}/categories/all`);
  }

  findById(categoryId: number) : Observable<Category[]> {
    return this.http.get<Category[]>(`${API_CONFIG.baseUrl}/categories/`+ categoryId);
  }

}
