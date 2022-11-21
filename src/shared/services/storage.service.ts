import { Address } from './../models/address';
import { ShippingResponseDTO } from './../models/shipping.response.dto';
import { LocalUser } from './../models/local_users';
import { Injectable } from "@angular/core";
import { Cart } from '../models/cart';
import { STORAGE_KEYS } from 'src/config/stored.keys.config';

@Injectable()
export class StorageService{

    getLocalUser() : LocalUser {
      let usr = localStorage.getItem(STORAGE_KEYS.localUser);
      if(usr == null){
        return null as any;
      }
      else {
        return JSON.parse(usr);
      }
    }

    setLocalUser(obj : LocalUser) {
      if(obj == null) {
        localStorage.removeItem(STORAGE_KEYS.localUser);
      }
      else {
        localStorage.setItem(STORAGE_KEYS.localUser, JSON.stringify(obj));
      }
    }

    getCart(): Cart {
      let str = localStorage.getItem(STORAGE_KEYS.cart);
      if (str != null) {
        return JSON.parse(str);
      }
      else {
        return null as any;
      }
    }

    setCart (obj: Cart) {
      if (obj != null) {
        localStorage.setItem(STORAGE_KEYS.cart, JSON.stringify(obj));
      }
      else {
        localStorage.removeItem (STORAGE_KEYS.cart);
      }
    }

    getShippingPrecoPrazo(): ShippingResponseDTO {
      let str = localStorage.getItem(STORAGE_KEYS.precoPrazo);
      if (str != null) {
        return JSON.parse(str);
      }
      else {
        return null as any;
      }
    }

    setShippingPrecoPrazo(obj: ShippingResponseDTO) {
      if (obj != null) {
        localStorage.setItem(STORAGE_KEYS.precoPrazo, JSON.stringify(obj));
      }
      else {
        localStorage.removeItem (STORAGE_KEYS.precoPrazo);
      }
    }

    getAddress(): Address {
      let str = localStorage.getItem(STORAGE_KEYS.address);
      if (str != null) {
        return JSON.parse(str);
      }
      else {
        return null as any;
      }
    }

    setAddress(obj: Address) {
      if (obj != null) {
        localStorage.setItem(STORAGE_KEYS.address, JSON.stringify(obj));
      }
      else {
        localStorage.removeItem (STORAGE_KEYS.address);
      }
    }
  }
