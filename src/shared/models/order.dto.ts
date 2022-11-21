import { OrderProductsDTO } from "./order-products.dto";
import { PaymentDTO } from "./payment.dto";
import { RefDTO } from "./ref.dto";

export class OrderDTO {
  consumer: RefDTO;
  enderecoDeEntrega: RefDTO;
  pagamento: PaymentDTO;
  itens: OrderProductsDTO[];
}
