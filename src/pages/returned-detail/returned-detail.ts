import { Component} from '@angular/core';
import { NavController, NavParams, AlertController } from 'ionic-angular';
@Component({
  selector: 'returned-detail',
  templateUrl: 'returned-detail.html'
})
export class ReturnedDetail {
	count: number = 4;
	constructor(public navCtrl: NavController, public alertCtrl: AlertController) {
	}

}
