import { Injectable } from "@angular/core";
import { Cart } from "../models/cart";
import { StorageService } from './storage.service';
import { ProductDTO } from '../models/product.dto';


@Injectable()
export class CartService {

    constructor (public storageService: StorageService) {
    }

    createOrClearCart() : Cart {
      let cart: Cart = {items: []}
      this.storageService.setCart(cart);
      return cart;
    }

    getCart() :  Cart {
      let cart: Cart = this.storageService.getCart();
      if(cart == null){
        cart = this.createOrClearCart();
      }
      return cart;
    }

    addProduto(product: ProductDTO) : Cart{
      let cart = this.getCart();
      let position = cart.items.findIndex(x => x.product.stock.id == product.stock.id);
      if(position == -1) {
        cart.items.push({quantity: 1, product: product});
      }
      this.storageService.setCart(cart);
      return cart;
    }

    removeProduto(product: ProductDTO) : Cart{
      let cart = this.getCart();
      let position = cart.items.findIndex(x => x.product.stock.id == product.stock.id);
      if(position != -1) {
        cart.items.splice(position, 1);
      }
      this.storageService.setCart(cart);
      return cart;
    }

    increaseQuantity(product: ProductDTO) : Cart{
      let cart = this.getCart();
      let position = cart.items.findIndex(x => x.product.stock.id == product.stock.id);
      if(position != -1) {
        cart.items[position].quantity++;
      }
      this.storageService.setCart(cart);
      return cart;
    }

    decreaseQuantity(product: ProductDTO) : Cart{
      let cart = this.getCart();
      let position = cart.items.findIndex(x => x.product.stock.id == product.stock.id);
      if(position != -1) {
        cart.items[position].quantity--;
        if(cart.items[position].quantity < 1){
          cart = this.removeProduto(product);
        }
      }
      this.storageService.setCart(cart);
      return cart;
    }

    total() : number {
      let cart = this.getCart();
      let sum = 0;
      for(var i=0; i<cart.items.length; i++){
        sum += cart.items[i].product.stock.unityValue * cart.items[i].quantity;
      }
      return sum;
    }

    totalQuantity() : number {
      let cart = this.getCart();
      let sum = 0;
      for(var i=0; i<cart.items.length; i++){
        sum += cart.items[i].quantity;
      }
      return sum;
    }

  }
