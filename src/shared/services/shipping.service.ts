import { ShippingRequestDTO } from '../models/shipping.request.dto';
import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { API_CONFIG } from 'src/config/api.config';
import { ShippingResponseDTO } from '../models/shipping.response.dto';

@Injectable()
export class ShippingService {

  constructor(private http: HttpClient){
  }

  getPrecoPrazo(shippingRequest: ShippingRequestDTO): Observable<ShippingResponseDTO> {
    return this.http.post<ShippingResponseDTO>(`${API_CONFIG.baseUrl}/consumers/shipping/calcPrecoPrazo`, shippingRequest);
  }
}
