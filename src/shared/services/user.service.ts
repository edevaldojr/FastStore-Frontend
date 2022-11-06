import { ConsumerDTO } from './../models/consumer.dto';
import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from 'rxjs';
import { API_CONFIG } from 'src/config/api.config';

@Injectable()
export class UserService {

  constructor(public http: HttpClient) {
  }

  findByEmail(email: string) : Observable<ConsumerDTO> {
    return this.http.post<ConsumerDTO>(`${API_CONFIG.baseUrl}/consumers/getConsumerByEmail`, email);
  }

  registerConsumer(consumer: ConsumerDTO) {
    return this.http.post(
      `${API_CONFIG.baseUrl}/registration/registerConsumer`,
      consumer,
      {
        observe: 'response',
        responseType: 'text'
      }
    );
  }
}
