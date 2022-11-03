import { PageControl } from './../models/pageControl';
import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { API_CONFIG } from 'src/config/api.config';

@Injectable()
export class OrderService {

  constructor(public http: HttpClient) {
  }

  findOrdersByConsumer(consumerId: number, pageControl: PageControl) {
    return this.http.post(`${API_CONFIG.baseUrl}/orders/order/`+ consumerId, pageControl);
  }
}
