import { UserService } from './../../../shared/services/user.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { BlueCrowValidators } from 'src/shared/validators/bluecrow-validators';
import * as Masks from 'src/shared/masks';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  formGroup: FormGroup;
  cpfMask = { mask: Masks.cpfMask, guide: true };
  phoneMask = { mask: Masks.phoneMask, guide: true };
  dateMask = { mask: Masks.dateMask, guide: true };
  isValidRegister: boolean;
  emailAlreadyRegistred: boolean = false;

  constructor(private formBuilder: FormBuilder,
              private userService: UserService) {
    this.formGroup = this.formBuilder.group({
      firstName: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(120)]],
      lastName: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(120)]],
      cpf : ['', [Validators.required, BlueCrowValidators.isValidCpf]],
      email : ['', [Validators.required, BlueCrowValidators.isValidEmail]],
      phoneNumber : ['', [Validators.required, BlueCrowValidators.isValidCelular]],
      sexType : ['', [Validators.required]],
      birthDate : ['', [Validators.required, BlueCrowValidators.isValidDateBirthday]],
      password : ['', [Validators.required]],
      confirmPassword : ['', [Validators.required]],
    });
  }

  ngOnInit(): void {
  }

  signupUser(){
    console.log(this.formGroup.value);
    console.log(this.formGroup.valid);
    if(!this.formGroup.valid){
      this.isValidRegister = false;
      return;
    }
    this.isValidRegister = true;
    this.userService.registerConsumer(this.formGroup.value).subscribe((response)=>{
      console.log(response)
    },error =>{
      console.log(error.error);
      if(error.error.includes("Email já cadastrado.")){
        this.emailAlreadyRegistred = true;
      } else this.emailAlreadyRegistred = false;;
    }

    );

  }
}
