import { StorageService } from './storage.service';
import { CredentialDTO } from './../models/credentials.dto';
import { HttpClient } from '@angular/common/http';
import { Injectable } from "@angular/core";
import { API_CONFIG } from 'src/config/api.config';
import { LocalUser } from '../models/local_users';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable()
export class AuthService {

  jwtHelper: JwtHelperService = new JwtHelperService();

  constructor(public http: HttpClient, public storage: StorageService){

  }

  authenticated(creds: CredentialDTO){
    return this.http.post(`${API_CONFIG.baseUrl}/login`, creds, { observe: 'response', responseType: 'text' });
  }

  refreshToken(){
    return this.http.post(`${API_CONFIG.baseUrl}/auth/refresh_token`,
    {},
    {
      observe: 'response',
      responseType: 'text'
    });
  }

  successfulLogin(authorizationValue: string)  {
    let tok = authorizationValue.substring(7);
    let user : LocalUser = {
      token: tok,
      email: this.jwtHelper.decodeToken(tok).sub
    };
    this.storage.setLocalUser(user);
   // this.cartService.createOrClearCart();
  }

  logout() {
    this.storage.setLocalUser(null as any);
  }

}