import { Category } from './../models/category';
import { API_CONFIG } from "src/config/api.config";
import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";

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
