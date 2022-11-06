import { Injectable } from '@angular/core';

@Injectable()
export class MaskService {

  private date = '00/00/0000';
  private cep = '00000-000';
  private phone = '(00) 0000-0000';
  private cpf = '000.000.000-00';

  constructor() { }

  getDate(): string {
    return this.date;
  }

  getCep(): string {
    return this.cep;
  }

  getPhone(): string {
    return this.phone;
  }
  getCpf(): string {
    return this.cpf;
  }

}
