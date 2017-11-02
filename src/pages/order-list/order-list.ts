import { Component} from '@angular/core';
import { NavController, NavParams} from 'ionic-angular';
import { BrandshopOrderList } from '../brandshop-order-list/brandshop-order-list';
@Component({
  selector: 'order-list',
  templateUrl: 'order-list.html'
})
export class OrderList {
  dateStart: string = '';
  dateEnd: string = '';
  isShowDetail: boolean = false;
  orderStatus: string = '';
  constructor(public navCtrl: NavController, public navParams: NavParams) {
	this.orderStatus = this.navParams.data;
	console.log(this.navParams.data);
  }
  showDetail() {
	this.isShowDetail = !this.isShowDetail;
	console.log(this.isShowDetail);
  }
  goBrandshoOrder() {
	this.navCtrl.push(BrandshopOrderList);
  }
  clearDateStart() {
	this.dateStart = '';
  }
  clearDateEnd() {
	this.dateEnd = '';
  }
}