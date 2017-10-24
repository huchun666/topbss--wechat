import { Component} from '@angular/core';
import { NavController, NavParams, AlertController } from 'ionic-angular';
@Component({
  selector: 'withdraw',
  templateUrl: 'withdraw.html'
})
export class Withdraw {
  constructor(public navCtrl: NavController, public alertCtrl: AlertController) {
  }
}
