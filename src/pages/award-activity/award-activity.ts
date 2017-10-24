import { Component} from '@angular/core';
import { NavController, NavParams, AlertController } from 'ionic-angular';
@Component({
  selector: 'award-activity',
  templateUrl: 'award-activity.html'
})
export class AwardActivity {
  constructor(public navCtrl: NavController, public alertCtrl: AlertController) {
  }
}
