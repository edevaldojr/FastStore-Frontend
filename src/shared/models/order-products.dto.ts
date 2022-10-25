import { Product } from './product';
import { Stock } from './stock';
export interface OrderProductsDTO {
  quantity: number;
  discount: number;
  unityValue: number;
  product: Product;
  stock: Stock;

}
