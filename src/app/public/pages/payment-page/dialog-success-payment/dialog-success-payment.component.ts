import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-dialog-success-payment',
  templateUrl: './dialog-success-payment.component.html',
  styleUrls: ['./dialog-success-payment.component.css']
})
export class DialogSuccessPaymentComponent implements OnInit {

  constructor(private dialogRef: MatDialogRef<DialogSuccessPaymentComponent>,
    ) { }

  ngOnInit(): void {
  }

  changePage(page: string){
    location.href = page;
  }

  close(){
    this.dialogRef.close();
  }
}
