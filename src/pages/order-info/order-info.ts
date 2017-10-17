import { Component} from '@angular/core';
import { NavController, NavParams, AlertController } from 'ionic-angular';
@Component({
  selector: 'order-info',
  templateUrl: 'order-info.html'
})
export class OrderInfo {
  constructor(public navCtrl: NavController, public alertCtrl: AlertController) {
  }
  presentConfirm() {
	const alert = this.alertCtrl.create({
		message: '确认提货完成',
		buttons: [
		  {
		    text: '查看订单',
		    handler: () => {
		      //点击查看订单后的执行代码
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
