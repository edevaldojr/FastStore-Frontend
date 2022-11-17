import { SnackbarService } from 'src/shared/components/snackbar/snackbar.service';
import { AuthService } from 'src/shared/services/auth.service';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css']
})
export class ForgotPasswordComponent implements OnInit {

  form: FormGroup = new FormGroup({
    email: new FormControl(''),
  });
  forgotError: boolean;
  errorMessage: string;
  isLoading: boolean;

  constructor(private authService: AuthService,
              private snackBarService: SnackbarService) { }

  ngOnInit(): void {
  }

  onSubmit() {
    if (this.form.valid) {
      this.sendNewPassword();
    }
  }

  sendNewPassword(){
    this.isLoading = true;
    this.authService.forgotPassword(this.form.value.email)
    .subscribe(response => {
      this.isLoading = false;
      this.forgotError = false;
      this.snackBarService.success("Senha enviada com sucesso! Verifique sua caixa de entrada.");
      setTimeout(this.changePage, 5000, "login");
    },
    error =>{
      console.log(error)
      this.isLoading = false;
      this.errorMessage = JSON.parse(error.error).message;
      this.snackBarService.error(this.errorMessage);
      this.forgotError = true;
    });
}

changePage(page: string){
  location.href = page;
}

}
