import { Component} from '@angular/core';
import { NavController, NavParams, AlertController } from 'ionic-angular';
@Component({
  selector: 'withdraw-record',
  templateUrl: 'withdraw-record.html'
})
export class WithdrawRecord {
  constructor(public navCtrl: NavController, public alertCtrl: AlertController) {
  }
}
