import { Component} from '@angular/core';
import { NavController, NavParams, AlertController } from 'ionic-angular';
@Component({
  selector: 'bind-account',
  templateUrl: 'bind-account.html'
})
export class BindAccount {
  constructor(public navCtrl: NavController, public alertCtrl: AlertController) {
  }
}
