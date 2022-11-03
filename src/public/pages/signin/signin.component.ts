import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { CredentialDTO } from 'src/shared/models/credentials.dto';
import { AuthService } from 'src/shared/services/auth.service';


@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})
export class SigninComponent {

  credetialError: boolean = false;
  form: FormGroup = new FormGroup({
    email: new FormControl(''),
    password: new FormControl(''),
  });

  creds : CredentialDTO = {
    email: "",
    password: ""
  };

  constructor( public auth: AuthService,
    private router: Router) { }

  ngOnInit(): void {

  }

  onSubmit() {

    if (this.form.valid) {
      this.creds.email = this.form.value.email;
      this.creds.password = this.form.value.password;
      this.login();
    }
  }

  login(){
      this.auth.authenticated(this.creds)
      .subscribe(response => {
        this.credetialError = false;
        ;
        this.auth.successfulLogin(response.headers.get('Authorization') as string);
        location.href = "";
      },
      error =>{
        this.credetialError = true;
      });
  }

}
