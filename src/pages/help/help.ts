import { Component} from '@angular/core';
import { NavController, NavParams, AlertController } from 'ionic-angular';
@Component({
  selector: 'help',
  templateUrl: 'help.html'
})
export class Help {
  constructor(public navCtrl: NavController, public alertCtrl: AlertController) {
  }
}
