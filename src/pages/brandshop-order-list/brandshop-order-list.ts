import { Component} from '@angular/core';
import { NavController, NavParams} from 'ionic-angular';
@Component({
  selector: 'order-list',
  templateUrl: 'brandshop-order-list.html'
})
export class BrandshopOrderList {
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
  clearDateStart() {
	this.dateStart = '';
  }
  clearDateEnd() {
	this.dateEnd = '';
  }
}