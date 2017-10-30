import { Component} from '@angular/core';
import { NavController, NavParams, AlertController } from 'ionic-angular';
@Component({
  selector: 'update-pwd',
  templateUrl: 'update-pwd.html'
})
export class UpdatePwd {
  constructor(public navCtrl: NavController, public alertCtrl: AlertController) {
  }
}
