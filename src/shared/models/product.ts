import { Stock } from './stock';
import { Category } from "./category";
import { Image } from './image';

export interface Product {
  id: number;
  sku: string;
  name:string;
  brand: string;
  description: string;
  category: Category;
  stock: Stock[];
  images: Image[];
}
