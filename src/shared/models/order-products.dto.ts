import { Product } from './product';
import { Stock } from './stock';
export class OrderProductsDTO {
  quantity: number;
  discount: number;
  unityValue: number;
  product: Product;
  stock: Stock;
  subTotal: number;
}
