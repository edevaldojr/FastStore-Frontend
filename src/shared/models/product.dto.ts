import { Stock } from './stock';
import { Category } from "./category";
import { Image } from './image';
import { Product } from './product';

export class ProductDTO {
  id: number;
  sku: string;
  name:string;
  brand: string;
  description: string;
  category: Category;
  stock: Stock;
  images: Image[];


  static toDto(product: Product, stock: Stock): ProductDTO {
    const productDto: Partial<ProductDTO> = {};

    productDto.id = product.id;
    productDto.sku = product.sku;
    productDto.name = product.name;
    productDto.brand = product.brand;
    productDto.category = product.category;
    productDto.stock = stock;
    productDto.images = product.images;

    return productDto as ProductDTO;
  }


}
