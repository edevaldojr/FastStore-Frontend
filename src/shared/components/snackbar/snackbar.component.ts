import { Component, OnInit, Inject } from '@angular/core';
import { MAT_SNACK_BAR_DATA } from '@angular/material/snack-bar';
import { SnackbarEnum } from './snackbar.types';

@Component({
  selector: 'app-snackbar',
  templateUrl: './snackbar.component.html',
  styleUrls: ['./snackbar.component.scss']
})
export class SnackbarComponent implements OnInit {

  constructor(@Inject(MAT_SNACK_BAR_DATA) public data: any) {

  }

  ngOnInit() {
  }

  get icon() {
    switch (this.data.snackType) {
      case SnackbarEnum.SUCCESS:
        return 'check_circle';
      case SnackbarEnum.ERROR:
        return 'info';
      case SnackbarEnum.WARNING:
        return 'info';
      case SnackbarEnum.INFO:
        return 'alarm';
      default:
        return '';
    }
  }

}
