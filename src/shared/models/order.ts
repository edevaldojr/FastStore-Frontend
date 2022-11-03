import { RefDTO } from './ref.dto';
import { OrderProductsDTO } from './order-products.dto';
import { OrderStatus } from './order-status';
import { PaymentDTO } from './payment.dto';
export interface Order {
  id: number;
  status: OrderStatus
  payment: PaymentDTO;
  orderProducts: OrderProductsDTO[];
  product: RefDTO,
  totalValue: number;
}

