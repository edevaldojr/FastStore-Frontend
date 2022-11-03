
import { Perfil } from './enums/perfil.enum';
import { SexType } from './enums/SexType.enum';
import { Order } from './order';
export interface ConsumerDTO {
  id : number;
  cpf: string;
  firstName : string;
  lastName: string;
  email : string;
  phoneNumber: string;
  birthDate: Date;
  sexo: SexType;
  perfis: Perfil[];
  orders: Order[];

}
