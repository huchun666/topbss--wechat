import { Component} from '@angular/core';
import { ModalController, NavController, NavParams, AlertController} from 'ionic-angular';
import { OrderLayer } from '../order-layer/order-layer';

@Component({
  selector: 'creat-order',
  templateUrl: 'creat-order.html',
})
export class CreatOrder {
	constructor(public modalCtrl: ModalController, public navCtrl: NavController, public alertCtrl: AlertController) {
	}
	addProductModal() {
	   const orderModal = this.modalCtrl.create(OrderLayer, {id: 12}, {
	   	cssClass: 'order-sku-list'
	   });
	   orderModal.present();
	}

}
