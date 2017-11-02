import { Component} from '@angular/core';
import { NavController, NavParams, AlertController } from 'ionic-angular';
@Component({
  selector: 'edit-account',
  templateUrl: 'edit-account.html'
})
export class EditAccount {
	name: string = '';
	phone: string = '';
	idCard: string = '';
	constructor(public navCtrl: NavController, public alertCtrl: AlertController) {
	  this.name = '张小花';
		this.phone = '13761489650';
		this.idCard = '420117198902080853';
	}
}
