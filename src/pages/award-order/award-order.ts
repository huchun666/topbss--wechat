import { Component} from '@angular/core';
import { NavController, NavParams, AlertController } from 'ionic-angular';
@Component({
  selector: 'award-order',
  templateUrl: 'award-order.html'
})
export class AwardOrder {
  constructor(public navCtrl: NavController, public alertCtrl: AlertController) {
  }
}
