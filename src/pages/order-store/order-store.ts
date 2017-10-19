import { Component} from '@angular/core';
import { NavController, NavParams, AlertController } from 'ionic-angular';
@Component({
  selector: 'order-store',
  templateUrl: 'order-store.html'
})
export class OrderStore {
	count: number = 2;
	total: number = 200.00;
	constructor(public navCtrl: NavController, public alertCtrl: AlertController) {
	}
	delete() {

	}
	resetCount() {

	}
}
