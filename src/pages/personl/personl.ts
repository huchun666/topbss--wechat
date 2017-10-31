import { Component} from '@angular/core';
import { App, Nav, NavController, NavParams, ModalController, ViewController  } from 'ionic-angular';
import { Withdraw } from '../withdraw/withdraw';
import { Login } from '../login/login';
@Component({
  selector: 'personl',
  templateUrl: 'personl.html'
})
export class Personl {
	total: string = '69922.36';
	gotMoney: string = '2689.63';
	unGetMoney: string = '18889.62';
	isStar: boolean = false;
	showImg: string = 'hide.png';
	showText: string = '隐藏';
	constructor(
		public nav: Nav,
		public navCtrl: NavController,
		public modalCtrl: ModalController, 
		public viewCtrl: ViewController,
		private app: App
	) {
	}
	showMoney() {
		this.isStar = !this.isStar;
		this.showText = !this.isStar ? '隐藏' : '显示';
		this.showImg = !this.isStar ? 'hide.png' : 'show.png';
		this.total = !this.isStar ?  '69922.36' : '*****';
		this.gotMoney = !this.isStar ?  '2689.63' : '*****';
		this.unGetMoney = !this.isStar ?  '18889.62' : '*****';
	}
	withdraw() {
		let withdrawModal = this.modalCtrl.create(Withdraw);
		withdrawModal.present();
	}
	logOut() {
		let appNav = this.app.getRootNav();
		appNav.setRoot(Login);
	}
  
  
}
