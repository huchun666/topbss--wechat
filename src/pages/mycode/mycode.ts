import { Component} from '@angular/core';
import { NavController, NavParams, ViewController } from 'ionic-angular';
@Component({
  selector: 'mycode',
  templateUrl: 'mycode.html'
})
export class MyCode {
	btnText: string = '查看门店二维码';
	isShow: boolean = false;
	constructor(public navCtrl: NavController, public viewCtrl: ViewController) {
	}
	showBrandshopCode() {
		this.isShow = !this.isShow;
		this.btnText = !this.isShow ? '查看门店二维码' : '收起门店二维码';
	}
	
}
