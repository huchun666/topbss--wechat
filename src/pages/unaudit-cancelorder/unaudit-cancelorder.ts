import { Component} from '@angular/core';
import { NavController, NavParams, ModalController, AlertController } from 'ionic-angular';
import { AuditCancelorder } from '../audit-cancelorder/audit-cancelorder';
@Component({
  selector: 'unaudit-cancelorder',
  templateUrl: 'unaudit-cancelorder.html'
})
export class UnauditCancelorder {
	constructor(public navCtrl: NavController, public modalCtrl: ModalController, public alertCtrl: AlertController) {
	}
	//审核点击事件
	auditOrder() {
		const alert = this.alertCtrl.create({
			message: '同意会员13212341234 的订单20170809123456取消申请？',
			buttons: [
			  {
			    text: '拒绝',
			    handler: () => {
			      //点击拒绝后的执行代码
			    }
			  },
			  {
			    text: '通过',
			    handler: () => {
			      //点击同意后的执行代码
			    }
			  }
			]
		});
		alert.present();
	}
	goAuditCancel() {
		const orderModal = this.modalCtrl.create(AuditCancelorder);
		orderModal.present();
	}
}
