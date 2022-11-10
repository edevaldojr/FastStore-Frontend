import { Component, OnInit } from '@angular/core';
import { CartService } from 'src/shared/services/cart.service';
import { CartItem } from 'src/shared/models/cart-item';
import { ProductDTO } from 'src/shared/models/product.dto';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {

  items: CartItem[];
  hasItem: boolean;
  cartQuantity: number

  constructor(private cartService: CartService,
    ) { }

  ngOnInit(): void {
    let cart = this.cartService.getCart();
    this.cartQuantity = cart.items.length;
    this.items = cart.items;
    this.hasItem = cart.items.length > 0 ? true : false;
  }

  removeItem(product: ProductDTO) {
    this.items = this.cartService.removeProduto(product).items;
  }

  increaseQuantity(product: ProductDTO) {
    this.items = this.cartService.increaseQuantity(product).items;
  }

  decreaseQuantity(product: ProductDTO) {
    this.items = this.cartService.decreaseQuantity(product).items;
  }

  total(): number {
    return this.cartService.total();
  }

  goOn(page: string){
    location.href = page;
  }

}
