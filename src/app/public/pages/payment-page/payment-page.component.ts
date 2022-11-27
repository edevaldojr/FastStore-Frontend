import { DialogSuccessPaymentComponent } from './dialog-success-payment/dialog-success-payment.component';
import { RefDTO } from './../../../../shared/models/ref.dto';
import { OrderService } from './../../../../shared/services/order.service';
import { ConsumerDTO } from './../../../../shared/models/consumer.dto';
import { UserService } from './../../../../shared/services/user.service';
import { SnackbarService } from './../../../../shared/components/snackbar/snackbar.service';
import { PaymentDTO } from './../../../../shared/models/payment.dto';
import { CartService } from 'src/shared/services/cart.service';
import { StorageService } from 'src/shared/services/storage.service';
import { ShippingService } from './../../../../shared/services/shipping.service';
import { ViaCep } from './../../../../shared/models/viaCep';
import { AddressService } from 'src/shared/services/address.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import * as Masks from 'src/shared/masks';
import { ShippingRequestDTO } from 'src/shared/models/shipping.request.dto';
import { ShippingResponseDTO } from 'src/shared/models/shipping.response.dto';
import { Address } from 'src/shared/models/address';
import { CartItem } from 'src/shared/models/cart-item';
import { Order } from 'src/shared/models/order';
import { OrderProductsDTO } from 'src/shared/models/order-products.dto';
import { OrderDTO } from 'src/shared/models/order.dto';
import { SexType } from 'src/shared/models/enums/SexType.enum';
import { Product } from 'src/shared/models/product';
import { Stock } from 'src/shared/models/stock';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-payment-page',
  templateUrl: './payment-page.component.html',
  styleUrls: ['./payment-page.component.css']
})
export class PaymentPageComponent implements OnInit {

  panelOpenState = false;
  parcelas: number[] = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
  formGroup: FormGroup;
  formAddress: FormGroup;
  formShipping: FormGroup;
  cepMask = { mask: Masks.cepMask, guide: true };
  isLoading: boolean = false;
  viaCep: ViaCep;
  shippingDTO = new ShippingRequestDTO;
  totalQuantityItems: number;
  totalProductsValue: number = 0;
  shippingValue: number = 0;
  totalValue: number = 0;
  errorMessage: string;
  errorPrecoPrazo: boolean = false;
  isValidCep: boolean = true;
  items: CartItem[];
  formCard: FormGroup;
  cardNumberMask = { mask: Masks.creditCardNumberMask, guide: true };
  cardExpDateMask = { mask: Masks.creditCardDateMask, guide: true };
  cvvMask = { mask: Masks.cvvMask, guide: true };
  isPaymentValid: boolean;
  orderProducts: OrderProductsDTO[] = [];
  isLoadingPayment: boolean = false;
  orderProduct: OrderProductsDTO = {
    quantity: 0,
    discount: 0,
    unityValue: 0,
    product: new Product,
    stock: new Stock,
    subTotal: 0,
  };
  orderDTO: OrderDTO = {
    consumer: new RefDTO,
    address: new Address,
    payment: new PaymentDTO,
    orderProducts: new OrderProductsDTO as any
  };
  consumer: ConsumerDTO;
  refDto: RefDTO = new RefDTO();
  shippingResponseDTO: ShippingResponseDTO = {
    codigo: 0,
    valor: "0",
    prazoEntrega: 0,
    erro: 0,
    msgErro: "",
    cepDestino: ""
  };
  address: Address = {
    id: "",
    logradouro: "",
    numero: "",
    complemento: "",
    bairro: "",
    cep : "",
    localidade: "",
    uf:""
  };
  orderPayment: PaymentDTO = {
    numeroDeParcelas: 0,
    "@type": ""
  };

  constructor(
    public formBuilder: FormBuilder,
    private addressService: AddressService,
    private shippingService: ShippingService,
    private storageService: StorageService,
    private cartService: CartService,
    private snackbarService: SnackbarService,
    private userService: UserService,
    private orderService: OrderService,
    private dialog: MatDialog
  ) {
    this.formShipping = this.formBuilder.group({
      shippingType: ['', [Validators.required]]
    })
    this.formAddress = this.formBuilder.group({
      cep: ['', [Validators.required]],
      complemento: [''],
      numero: ['', [Validators.required]],
      logradouro: ['', [Validators.required]],
      bairro: ['', [Validators.required]],
      localidade: ['', [Validators.required]],
      uf: ['', [Validators.required]]
    });
    this.formCard = this.formBuilder.group({
      ownerName: ['', Validators.required],
      cvv: ['', Validators.required],
      cardNumber: ['', Validators.required],
      expiryDate: ['', Validators.required],
      numeroDeParcelas: ['', Validators.required],
      "@type": ['paymentWithCreditCard']
    });
   }

  ngOnInit(): void {
    this.panelOpenState = false;

    let cart = this.cartService.getCart();
    this.items = cart.items;

    this.totalProductsValue = this.cartService.total();
    this.totalQuantityItems = this.cartService.totalQuantity();

    this.verificaPrecoPrazo();
    this.verificaAddress();
    this.totalAmount();
    this.findUser();
  }

  getCep() {
    this.isLoading = true;
    this.addressService.getCep(this.formAddress.controls['cep'].value).subscribe(response =>{
      this.viaCep = response;
      this.povoaAddress(this.viaCep);
      this.isLoading = false;
    }, error=>{
      this.isLoading = false;
    });
  }

  saveAddress() {
    if(!this.formAddress.valid){
      return;
    } else{
      this.storageService.setAddress(this.formAddress.value);
      this.snackbarService.success('Endereço salvo com sucesso!');
    }
  }

  povoaAddress(viaCep: ViaCep) {
    this.formAddress.controls['logradouro'].setValue(viaCep.logradouro);
    this.formAddress.controls['bairro'].setValue(viaCep.bairro);
    this.formAddress.controls['localidade'].setValue(viaCep.localidade);
    this.formAddress.controls['uf'].setValue(viaCep.uf);
  }

  calcPrecoPrazo() {
    if(!this.formShipping.valid || !this.formAddress.controls['cep'].valid){
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

  populateDTO() {
    var peso = 0.3 * this.totalQuantityItems;
    var altura = 2 * this.totalQuantityItems;
    var comprimento = 15;
    var largura = 15;
    this.shippingDTO.s_cep_destino = this.formAddress.controls['cep'].value;
    this.shippingDTO.s_cep_destino = this.shippingDTO.s_cep_destino.replace("-","");
    this.shippingDTO.n_cd_servico = this.formShipping.controls['shippingType'].value;
    this.shippingDTO.n_vl_peso = peso.toString();
    this.shippingDTO.n_vl_altura = altura;
    this.shippingDTO.n_vl_comprimento = comprimento;
    this.shippingDTO.n_vl_largura = largura;
  }

  totalAmount() {
    this.totalValue = this.totalProductsValue + this.shippingValue;
  }

  verificaPrecoPrazo() {
    if(this.storageService.getShippingPrecoPrazo() != null && this.storageService.getShippingPrecoPrazo() != undefined){
      this.shippingResponseDTO = this.storageService.getShippingPrecoPrazo();
      this.shippingValue = parseFloat(this.shippingResponseDTO.valor.replace(',','.'));
    } else {
      this.shippingValue = 0;
    }
  }

  verificaAddress() {
    if(this.storageService.getAddress() != null && this.storageService.getAddress() != undefined){
      this.address = this.storageService.getAddress();
      this.formAddress.controls['cep'].setValue(this.address.cep);
      this.formAddress.controls['bairro'].setValue(this.address.bairro);
      this.formAddress.controls['localidade'].setValue(this.address.localidade);
      this.formAddress.controls['uf'].setValue(this.address.uf);
      this.formAddress.controls['numero'].setValue(this.address.numero);
      this.formAddress.controls['complemento'].setValue(this.address.complemento);
      this.formAddress.controls['logradouro'].setValue(this.address.logradouro);
      this.shippingValue = parseFloat(this.shippingResponseDTO.valor.replace(',','.'));
    } else {
      this.formAddress.controls['cep'].setValue(this.shippingResponseDTO.cepDestino);
      this.getCep();
    }
  }

  savePayment(method: string){
    if(method == 'paymentWithBoleto') {
      this.isPaymentValid = true;
      this.orderPayment['@type'] = method;
      this.orderPayment.numeroDeParcelas = undefined as any;
      this.snackbarService.success('Método de pagamento válido!')

    } else if(method == 'paymentWithCreditCard' && this.formCard.valid){
      this.isPaymentValid = true;
      this.orderPayment.numeroDeParcelas = Number(this.formCard.controls['numeroDeParcelas'].value);
      this.orderPayment['@type'] = method;
      this.snackbarService.success('Método de pagamento válido!')

    } else{
      this.isPaymentValid = false;
    }
  }

  finalizedPayment() {
    this.populateOrder();
    this.isLoadingPayment = true;
    this.orderService.insertOrders(this.orderDTO).subscribe(response=> {
      this.snackbarService.success('Pedido concluído com sucesso! Obrigado por comprar conosco.')
      this.openDialogSuccess();
      this.isLoadingPayment = false;
    }, error=>{
      console.log(error)
      this.snackbarService.error('Erro: ' + error.error)
      this.isLoadingPayment = false;
    });
  }

  populateOrder() {
    this.refDto.id = this.consumer.id;
    this.orderDTO.consumer = this.refDto;
    this.orderDTO.address = this.address;
    this.items.forEach(cartItem=>{
      this.orderProduct.product.id = cartItem.product.id
      this.orderProduct.stock.id = cartItem.product.stock.id;
      this.orderProduct.quantity = cartItem.quantity
      this.orderProduct.unityValue = cartItem.product.stock.unityValue;
      this.orderProducts.push(this.orderProduct);
    });
    this.orderDTO.orderProducts = this.orderProducts;
    this.orderDTO.payment = this.orderPayment;
  }

  findUser(){
    let localUser = this.storageService.getLocalUser();

    if(localUser && localUser.email) {
      this.userService.findByEmail(localUser.email)
      .subscribe(response => {
        this.consumer = response as ConsumerDTO;
      },
      error => {
        console.log(error)
      })
    }
  }

  openDialogSuccess(){
    const dialogRef = this.dialog.open(DialogSuccessPaymentComponent, {
      hasBackdrop: true
    });
    dialogRef.afterClosed().subscribe(result => {
      this.cartService.createOrClearCart();
      this.storageService.setShippingPrecoPrazo(null as any);
      this.changePage('');
    });

  }

  changePage(page: string){
    location.href = page;
  }

}
