import { Component} from '@angular/core';
import { NavController, NavParams, ModalController, AlertController } from 'ionic-angular';
import { AuditReturnorder } from '../audit-returnorder/audit-returnorder';
import { ReturnDetail } from '../return-detail/return-detail';
@Component({
  selector: 'unaudit-returnorder',
  templateUrl: 'unaudit-returnorder.html'
})
export class UnauditReturnorder {
	constructor(public navCtrl: NavController, public modalCtrl: ModalController, public alertCtrl: AlertController) {
	}
	confirmReturn() {
		const alert = this.alertCtrl.create({
			message: '确认已收到会员13212341234的订单20170809123456的3件退货商品？',
			buttons: [
			  {
			    text: '取消',
			    handler: () => {
			      //点击取消后的执行代码
			    }
			  },
			  {
			    text: '确认',
			    handler: () => {
			      //点击确认后的执行代码
			    }
			  }
			]
		});
		alert.present();
	}
	auditReturn() {
		const orderModal = this.modalCtrl.create(ReturnDetail);
		orderModal.present();
	}
	goAuditReturn() {
		const orderModal = this.modalCtrl.create(AuditReturnorder);
		orderModal.present();
	}
}
