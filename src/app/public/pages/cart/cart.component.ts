import { ViaCep } from './../../../../shared/models/viaCep';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { CartService } from 'src/shared/services/cart.service';
import { CartItem } from 'src/shared/models/cart-item';
import { ProductDTO } from 'src/shared/models/product.dto';
import { AddressService } from 'src/shared/services/address.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {

  items: CartItem[];
  hasItem: boolean;
  cartQuantity: number;
  totalProductsValue: number = 0;
  shippingValue: number = 0;
  totalValue: number = 0;
  formAddress: FormGroup;
  isLoading: boolean = false;
  viaCep: ViaCep;
  constructor(private cartService: CartService,
              private addressService: AddressService,
              private formBuilder: FormBuilder) {
    this.formAddress = this.formBuilder.group({
      cep: ['', [Validators.required]],
      complemento: ['', [Validators.required]],
      number: ['', [Validators.required]],
      logradouro: ['', [Validators.required]],
      bairro: ['', [Validators.required]],
      localidade: [{value: '', disabled: true}, [Validators.required]],
      uf: [{value: '', disabled: true}, [Validators.required]]
    });
  }

  ngOnInit(): void {
    let cart = this.cartService.getCart();
    this.cartQuantity = cart.items.length;
    this.items = cart.items;
    this.hasItem = cart.items.length > 0 ? true : false;
    this.totalProductsValue = this.cartService.total();
    this.totalAmount();
  }

  removeItem(product: ProductDTO) {
    this.items = this.cartService.removeProduto(product).items;
  }

  increaseQuantity(product: ProductDTO) {
    this.items = this.cartService.increaseQuantity(product).items;
    this.goOn('cart');
  }

  decreaseQuantity(product: ProductDTO) {
    this.items = this.cartService.decreaseQuantity(product).items;
    this.goOn('cart');
    if(this.items.length == 0){
      this.goOn('');
    }
  }

  goOn(page: string){
    location.href = page;
  }

  totalAmount(){
    this.totalValue = this.totalProductsValue + this.shippingValue;
  }

  getCep(){
    this.isLoading = true;
    this.addressService.getCep(this.formAddress.controls['cep'].value).subscribe(response =>{
      this.viaCep = response;
      this.povoaAddress(this.viaCep);
      this.isLoading = false;
    }, error=>{
      this.isLoading = false;
    });
  }

  saveAddress(){

  }

  povoaAddress(viaCep: ViaCep){
    this.formAddress.controls['logradouro'].setValue(viaCep.logradouro);
    this.formAddress.controls['bairro'].setValue(viaCep.bairro);
    this.formAddress.controls['localidade'].setValue(viaCep.localidade);
    this.formAddress.controls['uf'].setValue(viaCep.uf);
  }
}
