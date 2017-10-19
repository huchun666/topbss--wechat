import { Component} from '@angular/core';
import { NavController, NavParams, ModalController, AlertController } from 'ionic-angular';
import { PaymentCode } from '../payment-code/payment-code';
@Component({
  selector: 'order-store',
  templateUrl: 'order-store.html'
})
export class OrderStore {
	count: number = 2;
	total: number = 200.00;
	constructor(public navCtrl: NavController, public modalCtrl: ModalController, public alertCtrl: AlertController) {
	}
	delete() {

	}
	resetCount() {

	}
	addProductModal() {
	   const orderModal = this.modalCtrl.create(PaymentCode, {id: 12}, {
	   	cssClass: 'order-sku-list'
	   });
	   orderModal.present();
	}
}
