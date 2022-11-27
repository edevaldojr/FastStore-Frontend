import { Address } from './address';
import { OrderProductsDTO } from "./order-products.dto";
import { PaymentDTO } from "./payment.dto";
import { RefDTO } from "./ref.dto";

export class OrderDTO {
  consumer: RefDTO;
  address: Address;
  payment: PaymentDTO;
  orderProducts: OrderProductsDTO[];
}
