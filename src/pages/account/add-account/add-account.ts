import { Component} from '@angular/core';
import { NavController, NavParams, AlertController } from 'ionic-angular';
@Component({
  selector: 'add-account',
  templateUrl: 'add-account.html'
})
export class AddAccount {
  constructor(public navCtrl: NavController, public alertCtrl: AlertController) {
    
  }
}
