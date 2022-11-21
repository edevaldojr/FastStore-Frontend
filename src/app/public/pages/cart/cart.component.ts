import { StorageService } from 'src/shared/services/storage.service';
import { BlueCrowValidators } from './../../../../shared/validators/bluecrow-validators';
import { ShippingService } from './../../../../shared/services/shipping.service';
import { ShippingRequestDTO } from '../../../../shared/models/shipping.request.dto';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { CartService } from 'src/shared/services/cart.service';
import { CartItem } from 'src/shared/models/cart-item';
import { ProductDTO } from 'src/shared/models/product.dto';
import * as Masks from 'src/shared/masks';
import { ShippingResponseDTO } from 'src/shared/models/shipping.response.dto';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {

  items: CartItem[];
  hasItem: boolean;
  cartQuantity: number;
  totalQuantityItems: number;
  totalProductsValue: number = 0;
  shippingValue: number = 0;
  totalValue: number = 0;
  errorMessage: string;
  errorPrecoPrazo: boolean = false;
  cepMask = { mask: Masks.cepMask, guide: true };
  isValidCep: boolean = true;
  formShipping: FormGroup;
  isLoading: boolean = false;
  shippingDTO = new ShippingRequestDTO;
  shippingResponseDTO: ShippingResponseDTO = {
    codigo: 0,
    valor: "0",
    prazoEntrega: 0,
    erro: 0,
    msgErro: "",
    cepDestino: ""
  };

  constructor(private cartService: CartService,
              private shippingService: ShippingService,
              private formBuilder: FormBuilder,
              private storageService: StorageService) {
    this.formShipping = this.formBuilder.group({
      cep: ['', [Validators.required, BlueCrowValidators.isValidCep]],
      shippingType: ['', [Validators.required]]
    })
  }

  ngOnInit(): void {
    let cart = this.cartService.getCart();
    this.cartQuantity = cart.items.length;

    this.items = cart.items;
    this.hasItem = cart.items.length > 0 ? true : false;

    this.totalProductsValue = this.cartService.total();
    this.totalQuantityItems = this.cartService.totalQuantity();

    if(this.storageService.getShippingPrecoPrazo() != null && this.storageService.getShippingPrecoPrazo() != undefined){
      this.shippingResponseDTO = this.storageService.getShippingPrecoPrazo();
      this.shippingValue = parseFloat(this.shippingResponseDTO.valor.replace(',','.'));
    } else {
      this.shippingValue = 0;
    }
    this.formShipping.controls['cep'].setValue(this.shippingResponseDTO.cepDestino);
    this.totalAmount();
  }

  removeItem(product: ProductDTO) {
    this.items = this.cartService.removeProduto(product).items;
    this.goOn('cart');
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
    console.log(this.totalProductsValue)
    console.log(this.shippingValue)
    this.totalValue = this.totalProductsValue + this.shippingValue;
  }

  calcPrecoPrazo(){
    if(!this.formShipping.valid){
      this.isValidCep = false;
    } else {
      this.isValidCep = false;
      this.populateDTO();
      this.isLoading = true;
      console.log(this.shippingDTO);
      this.shippingService.getPrecoPrazo(this.shippingDTO).subscribe(response=>{
        console.log(response);
        this.isLoading = false;
        if(response.erro != 0){
          this.errorPrecoPrazo = true;
          this.errorMessage = response.msgErro;
        } else {
          this.shippingResponseDTO = response;
          this.shippingResponseDTO.cepDestino = this.shippingDTO.s_cep_destino;
          this.storageService.setShippingPrecoPrazo(this.shippingResponseDTO);
          this.errorPrecoPrazo = false;
          this.ngOnInit();
        }
      }, error=>{
        this.isLoading = false;
        this.errorMessage = error.message;
        this.errorPrecoPrazo = true
      });
    }

  }

  populateDTO(){
    var peso = 0.3 * this.totalQuantityItems;
    var altura = 2 * this.totalQuantityItems;
    var comprimento = 15;
    var largura = 15;
    this.shippingDTO.s_cep_destino = this.formShipping.controls['cep'].value;
    this.shippingDTO.s_cep_destino = this.shippingDTO.s_cep_destino.replace("-","");
    this.shippingDTO.n_cd_servico = this.formShipping.controls['shippingType'].value;
    this.shippingDTO.n_vl_peso = peso.toString();
    this.shippingDTO.n_vl_altura = altura;
    this.shippingDTO.n_vl_comprimento = comprimento;
    this.shippingDTO.n_vl_largura = largura;
  }

}
