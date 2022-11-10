import { ProductDTO } from './product.dto';
import { Stock } from './stock';

export interface CartItem {
  quantity: number;
  product: ProductDTO
}
