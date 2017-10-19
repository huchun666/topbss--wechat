import { Component} from '@angular/core';
import { NavController, NavParams, AlertController } from 'ionic-angular';
@Component({
  selector: 'gift-info',
  templateUrl: 'gift-info.html'
})
export class GiftInfo {
	constructor(public navCtrl: NavController, public alertCtrl: AlertController) {
	}
	presentConfirm() {
		const alert = this.alertCtrl.create({
			message: '确认兑换完成',
			buttons: [
			  {
			    text: '查看赠品',
			    handler: () => {
			      //点击查看赠品后的执行代码
			    }
			  },
			  {
			    text: '继续扫码',
			    handler: () => {
			      //点击继续扫码后的执行代码
			    }
			  }
			]
		});
		alert.present();
	}
}
