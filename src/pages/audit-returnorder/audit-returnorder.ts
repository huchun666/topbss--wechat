import { Component} from '@angular/core';
import { NavController, NavParams, ModalController, AlertController } from 'ionic-angular';
import { ReturnedDetail } from '../returned-detail/returned-detail';
@Component({
  selector: 'audit-returnorder',
  templateUrl: 'audit-returnorder.html'
})
export class AuditReturnorder {
	constructor(public navCtrl: NavController, public modalCtrl: ModalController, public alertCtrl: AlertController) {
	}
	goReturnedDetail() {
		let contactModal = this.modalCtrl.create(ReturnedDetail);
   		contactModal.present();
	}
}
