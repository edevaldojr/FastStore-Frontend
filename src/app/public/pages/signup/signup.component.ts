import { UserService } from '../../../../shared/services/user.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { BlueCrowValidators } from 'src/shared/validators/bluecrow-validators';
import * as Masks from 'src/shared/masks';
import { ValidatorForm } from 'src/shared/validators/validator-form';
import { SnackbarService } from 'src/shared/components/snackbar/snackbar.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  formGroup: FormGroup;
  validatorForm: ValidatorForm = new ValidatorForm();
  cpfMask = { mask: Masks.cpfMask, guide: true };
  phoneMask = { mask: Masks.phoneMask, guide: true };
  dateMask = { mask: Masks.dateMask, guide: true };
  isValidRegister: boolean;
  emailAlreadyRegistred: boolean = false;
  cpfAlreadyRegistred: boolean = false;
  passwordErrors: string[] = new Array();
  isLoading: boolean;

  constructor(private formBuilder: FormBuilder,
              private userService: UserService,
              private snackbarService: SnackbarService) {
    this.formGroup = this.formBuilder.group({
      firstName: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(120)]],
      lastName: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(120)]],
      cpf : ['', [Validators.required, BlueCrowValidators.isValidCpf]],
      email : ['', [Validators.required, BlueCrowValidators.isValidEmail]],
      phoneNumber : ['', [Validators.required, BlueCrowValidators.isValidCelular]],
      sexo : ['', [Validators.required]],
      birthDate : ['', [Validators.required, BlueCrowValidators.isValidDateBirthday]],
      password : ['', [Validators.required, BlueCrowValidators.isValidPassword]],
      confirmPassword : ['', Validators.required],
      }, {
        validators: [BlueCrowValidators.match('password', 'confirmPassword')]
      }
    );
  }

  ngOnInit(): void {
  }

  signupUser(){
    if(!this.formGroup.valid){
      this.getMessagePassword();
      this.isValidRegister = false;
      return;
    }
    this.isValidRegister = true;
    this.isLoading = true;
    this.userService.registerConsumer(this.formGroup.value).subscribe((response)=>{
      this.isLoading = false;
      this.snackbarService.success("Usuário cadastrado com sucesso! Confirme em seu email.");
      setTimeout(this.changePage, 5000, "login");

    },(error) =>{
      this.isLoading = false;
      if(error.error.includes("Email já cadastrado.")){
        this.emailAlreadyRegistred = true;
      } else this.emailAlreadyRegistred = false
      if(error.error.includes("Cpf já cadastrado.")){
        this.cpfAlreadyRegistred = true;
      } else this.cpfAlreadyRegistred = false
     this.snackbarService.error("Erro ao realizar cadastro! " + error.error)
    }

    );

  }

  changePage(page: string){
    location.href = page;
  }

  getMessagePassword() {
    const password = this.formGroup.controls['password'].value;
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



}
