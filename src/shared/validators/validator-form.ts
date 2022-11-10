import { AbstractControl, FormGroup, FormControl, FormArray } from '@angular/forms';


/**
 * Classe responsável por validação da interface do
 * formuluário com base nas regras e mensagens de
 * validação definidas abaixo.
 */
export class ValidatorForm {

  getErrorMessage(control: AbstractControl) {
    if (control.hasError('required')) {
      return 'Campo obrigatório';
    }

    if (control.hasError('email')) {
      return 'E-mail digitado não é válido';
    }

    if (control.hasError('cpfCnpj')) {
      return 'Cpf ou Cnpj digitado não é válido';
    }

    if (control.hasError('passwordNotValid')) {
      const password = control.value;
      const letter = (password.match(/[a-z]+/g)) ? true : false;
      const upper = (password.match(/[A-Z]+/g)) ? true : false;
      const number = (password.match(/[0-9]/g)) ? true : false;
      const limit = (password.length && password.length >= 6) ? true : false;

      let message =  '';
      if(!limit) {
        message += 'A senha deve ter pelo menos 6 caracteres <br>';
      }

      if(!upper) {
        message +=  'Use pelo menos uma letra maiúscula <br>';
      }

      if(!number) {
        message += 'Use pelo menos um número <br>';
      }

      if(!letter) {
        message += 'Use pelo menos uma letra minúscula <br>';
      }

      if(!new RegExp(/(?=.*?[#?!@$%^&*-])/).test(password)) {
        message += 'Use pelo menos um caractere especial <br>';
      }
      return message;
    }

    if (control.hasError('notMatchPassword')) {
      return 'Ambas as senhas devem ser iguais';
    }


    return '';
  }

  hasError(control: AbstractControl) {
    return control.invalid && (control.dirty || control.touched);
  }


}
