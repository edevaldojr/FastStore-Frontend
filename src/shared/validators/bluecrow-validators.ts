import { AbstractControl, ValidatorFn, Validators } from "@angular/forms";

export class BlueCrowValidators {

  static isValidEmail(control: AbstractControl): Validators {
    if (control.value) {
      const isValid = new RegExp(/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/)
      .test(control.value)
      if (isValid) {
        return false;
      }
    }
    return { emailNotValid: true };
  }

  static isValidCelular(control: AbstractControl): Validators {
    if (control.value) {
       const value = String(control.value).replace(/\D/g, '');
        if(value.length >= 10) {
          return false;
       } else {
        return { phoneNotValid: true };
       }
    }
    return  { phoneNotValid: true };
  }

  static isValidCpf(control: AbstractControl): Validators {
    if (control.value) {
      const cpf = control.value.replace(/\D/g, "");
      let numbers, digits, sum, i, result, equalDigits;
      equalDigits = 1;
      if (cpf.length < 11) {
        return { cpfNotValid: true };
      }

      for (i = 0; i < cpf.length - 1; i++) {
        if (cpf.charAt(i) !== cpf.charAt(i + 1)) {
          equalDigits = 0;
          break;
        }
      }

      if (!equalDigits) {
        numbers = cpf.substring(0, 9);
        digits = cpf.substring(9);
        sum = 0;
        for (i = 10; i > 1; i--) {
          sum += numbers.charAt(10 - i) * i;
        }

        result = sum % 11 < 2 ? 0 : 11 - (sum % 11);

        if (result !== Number(digits.charAt(0))) {
          return { cpfNotValid: true };
        }
        numbers = cpf.substring(0, 10);
        sum = 0;

        for (i = 11; i > 1; i--) {
          sum += numbers.charAt(11 - i) * i;
        }
        result = sum % 11 < 2 ? 0 : 11 - (sum % 11);

        if (result !== Number(digits.charAt(1))) {
          return { cpfNotValid: true };
        }
        return false;
      } else {
        return { cpfNotValid: true };
      }
    }
    return false;
  }

  static isValidDateBirthday(control: AbstractControl): Validators {
    if (control.value) {
      const isValid = new RegExp(/^(0?[1-9]|[12][0-9]|3[01])[\/\-](0?[1-9]|1[012])[\/\-]\d{4}$/
      )
      .test(control.value)
      if (isValid) {
        return false;
      }
    }
    return { birthDateNotValid: true };
  }

  static isValidPassword(control: AbstractControl): Validators {
    if (control.value) {
      const isValid = new RegExp(
        /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{6,}$/
      ).test(control.value);
      if (!isValid) {
        return { passwordNotValid: true };
      }
    }
    return false;
  }


  static match(controlName: string, checkControlName: string): ValidatorFn {
    return (controls: AbstractControl) => {
      const control = controls.get(controlName);
      const checkControl = controls.get(checkControlName);

      if (checkControl?.errors && !checkControl.errors['matching']) {
        return null;
      }

      if (control?.value !== checkControl?.value) {
        controls.get(checkControlName)?.setErrors({ matching: true });
        return { matching: true };
      } else {
        return null;
      }
    };
  }

  static isValidCep(control: AbstractControl): Validators {
    if (control.value) {
      const cep = control.value.replace(/\D/g, "");
      const isValid = new RegExp(/^[0-9]*$/)
      .test(cep)
      if (isValid && cep.length == 8) {
        return false;
      }
    }
    return { emailNotValid: true };
  }

}

