import { Component} from '@angular/core';
import { NavController, NavParams, ModalController, AlertController } from 'ionic-angular';
import { HandleSelfgift } from '../handle-selfgift/handle-selfgift';
@Component({
  selector: 'unhandle-selfgift',
  templateUrl: 'unhandle-selfgift.html'
})
export class UnhandleSelfgift {
	constructor(public navCtrl: NavController, public modalCtrl: ModalController, public alertCtrl: AlertController) {
	}
	goSelfgift() {
		const orderModal = this.modalCtrl.create(HandleSelfgift);
		orderModal.present();
	}
}
