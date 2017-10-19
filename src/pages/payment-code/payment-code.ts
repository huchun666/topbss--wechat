import { Component} from '@angular/core';
import { NavController, NavParams, ViewController } from 'ionic-angular';
import { TabsPage} from '../tabs/tabs';
@Component({
  selector: 'payment-code',
  templateUrl: 'payment-code.html'
})
export class PaymentCode {
	constructor(public navCtrl: NavController, public viewCtrl: ViewController) {
	}
	goTabs() {
		this.navCtrl.push(TabsPage);
	}
}
