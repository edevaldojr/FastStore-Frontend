import { Injectable } from '@angular/core';
import { MatSnackBar, MatSnackBarConfig, MatSnackBarRef } from '@angular/material/snack-bar';
import { SnackbarComponent } from './snackbar.component';
import { SnackbarTypes, SnackbarEnum } from './snackbar.types';


const defaultOptions: MatSnackBarConfig = {
  duration: 5000
}

@Injectable()
export class SnackbarService {
  private refSnackbar: MatSnackBarRef<SnackbarComponent>;

  constructor(private snackBar: MatSnackBar) { }
  public open(message: string, snackType?: SnackbarTypes, options: MatSnackBarConfig = defaultOptions) {
    const _snackType = snackType !== undefined ? snackType : SnackbarEnum.SUCCESS;
    let refSnackbar = this.snackBar.openFromComponent(SnackbarComponent, {
      panelClass: _snackType.toLowerCase(),
      data: {
        message: message,
        snackType: _snackType,
        close: () => refSnackbar.dismissWithAction()
      },
      ...options
    });
  }

  success(message: string, options: MatSnackBarConfig = defaultOptions) {
    this.open(message, SnackbarEnum.SUCCESS, options);
  }

  error(message: string, options: MatSnackBarConfig = defaultOptions) {
    this.open(message, SnackbarEnum.ERROR, options);
  }

  warning(message: string, options: MatSnackBarConfig = defaultOptions) {
    this.open(message, SnackbarEnum.WARNING, options);
  }

  info(message: string, options: MatSnackBarConfig = defaultOptions) {
    this.open(message, SnackbarEnum.INFO, options);
  }

  dismiss() {
    this.snackBar.dismiss();
  }
}
