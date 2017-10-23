import { Component} from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
@Component({
  selector: 'personl',
  templateUrl: 'personl.html'
})
export class Personl {
	total: number = 69922.36;
	gotMoney: number = 2689.63;
	unGetMoney: number = 18889.62;
	isStar: boolean = false;
	showImg: string = 'hide.png';
	showText: string = '隐藏';
	constructor(public navCtrl: NavController) {
	}
	showMoney() {
		this.isStar = !this.isStar;
		this.showText = !this.isStar ? '隐藏' : '显示';
		this.showImg = !this.isStar ? 'hide.png' : 'show.png';
		this.total = !this.isStar ?  69922.36 : '*****';
		this.gotMoney = !this.isStar ?  2689.63 : '*****';
		this.unGetMoney = !this.isStar ?  18889.62 : '*****';
	}
  
  
}
