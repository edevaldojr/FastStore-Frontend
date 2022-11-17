import { SnackbarService } from './../../../../../shared/components/snackbar/snackbar.service';
import { AuthService } from './../../../../../shared/services/auth.service';
import { StorageService } from './../../../../../shared/services/storage.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { CredentialDTO } from 'src/shared/models/credentials.dto';
import { BlueCrowValidators } from 'src/shared/validators/bluecrow-validators';
import { ValidatorForm } from 'src/shared/validators/validator-form';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.css']
})
export class ChangePasswordComponent implements OnInit {

  form: FormGroup;
  validatorForm: ValidatorForm = new ValidatorForm();
  passwordErrors: string[] = new Array();
  wrongPassword: boolean = false;
  isLoading: boolean = false;
  creds: CredentialDTO= {
    email: "",
    password: ""
  };

  constructor(private dialogRef: MatDialogRef<ChangePasswordComponent>,
              private formBuilder: FormBuilder,
              private storageService: StorageService,
              private authService: AuthService,
              private snackbarService: SnackbarService) {
    this.form = this.formBuilder.group({
      password: ['', Validators.required],
      newPassword : ['', [Validators.required, BlueCrowValidators.isValidPassword]],
      confirmNewPassword : ['', Validators.required],
      }, {
        validators: [BlueCrowValidators.match('newPassword', 'confirmNewPassword')]
      }
    );
  }

  ngOnInit(): void {
  }

  change(){
    this.verifyPassword();
  }

  changePassword(){
    if (this.form.valid && !this.wrongPassword) {

      const password = this.form.controls['newPassword'].value
      this.authService.changePassword(this.creds.email, password).subscribe(response=>{
        console.log(response);
        this.snackbarService.success("Senha alterada com sucesso!");
        setTimeout(this.close, 5000);
      },
      error =>{
        console.log(error);
        this.snackbarService.error("Erro ao alterar senha: ", error.message);
      });
    } else{
      this.validateFormAllFields(this.form);
    }
  }

  changePage(page: string){
    location.href = page;
  }

  close(){
    this.dialogRef.close();
  }

  verifyPassword(){
    const localUser = this.storageService.getLocalUser();
    console.log(localUser)
    this.creds.email = localUser.email;
    this.creds.password = this.form.controls['password'].value;
    this.isLoading = true;
    this.authService.authenticated(this.creds).subscribe(response=>{
      this.wrongPassword = false;
      this.isLoading = false;
      this.changePassword();
    },
    error =>{
      this.wrongPassword = true;
      this.isLoading = false;
      console.log(error.error.message)
    });
  }

  getMessagePassword() {
    const password = this.form.controls['newPassword'].value;
    const letter = (password.match(/[a-z]+/g)) ? true : false;
    const upper = (password.match(/[A-Z]+/g)) ? true : false;
    const number = (password.match(/[0-9]/g)) ? true : false;
    const limit = (password.length && password.length >= 6) ? true : false;
    this.passwordErrors = [];
    if(!limit) {
      this.passwordErrors.push('A senha deve ter pelo menos 6 caracteres. ');
    }

    if(!upper) {
      this.passwordErrors.push('Use pelo menos uma letra maiúscula. ');
    }

    if(!number) {
      this.passwordErrors.push('Use pelo menos um número. ');
    }

    if(!letter) {
      this.passwordErrors.push('Use pelo menos uma letra minúscula. ');
    }

    if(!new RegExp(/(?=.*?[#?!@$%^&*-])/).test(password)) {
      this.passwordErrors.push('Use pelo menos um caractere especial. ');
    }
    return this.passwordErrors;
  }

  validateFormAllFields(form: FormGroup) {
    Object.keys(form.controls).forEach(field => {
      const control = form.get(field);
      control?.markAsTouched({ onlySelf: true });
    });
  }
}
