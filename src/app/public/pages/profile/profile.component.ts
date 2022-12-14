import { OrderProductsDTO } from '../../../../shared/models/order-products.dto';
import { PageControl } from '../../../../shared/models/pageControl';
import { OrderService } from '../../../../shared/services/order.service';
import { ConsumerDTO } from '../../../../shared/models/consumer.dto';
import { UserService } from '../../../../shared/services/user.service';
import { Component, OnInit } from '@angular/core';
import { StorageService } from 'src/shared/services/storage.service';
import { SexType } from 'src/shared/models/enums/SexType.enum';

@Component({
  selector: 'app-profile-component',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  consumer: ConsumerDTO;
  sexType: number;
  pageControl: PageControl = new PageControl();

  constructor(private storage: StorageService,
    private userService: UserService,
    private orderService: OrderService) { }

  ngOnInit(): void {
    this.pageControl.order = 'DESC';
    this.pageControl.page = 0;
    this.pageControl.pageSize = 50;
    this.pageControl.count = 0;

    this.loadData();
  }

  loadData() {
    let localUser = this.storage.getLocalUser();

    if(localUser && localUser.email) {
      this.userService.findByEmail(localUser.email)
      .subscribe(response => {
        this.consumer = response as ConsumerDTO;
        this.checkSexType();
        this.findOrders();
      },
      error => {

      })
    }
  }

  findOrders(){
    this.orderService.findOrdersByConsumer(this.consumer.id, this.pageControl).subscribe((response: any) =>{
      this.consumer.orders = response.content;
    });


  }

  checkSexType(){
    if(this.consumer.sexo === SexType.MASCULINO){
      this.sexType = 0;
    } else if(this.consumer.sexo === SexType.FEMININO){
      this.sexType = 1;
    } else {
      this.sexType = 2;
    }
  }

}
