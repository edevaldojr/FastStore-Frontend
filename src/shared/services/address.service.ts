import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { map, Observable, take } from "rxjs";
import { ViaCep } from "../models/viaCep";

@Injectable()
export class AddressService {

  constructor(private http: HttpClient){

  }

  getCep(cep: string): Observable<ViaCep> {
    return this.http.get<ViaCep>(`https://viacep.com.br/ws/${cep}/json/`);
  }
}
