import { Component} from '@angular/core';
import { NavController, NavParams, AlertController } from 'ionic-angular';
import { AwardActivity } from '../award-activity/award-activity';
import { AwardOrder } from '../award-order/award-order';
@Component({
  selector: 'award-tabs',
  templateUrl: 'award-tabs.html'
})
export class AwardTabs {
	awardActivity = AwardActivity;
	awardOrder = AwardOrder;
	constructor(public navCtrl: NavController, public alertCtrl: AlertController) {
		
	}
	
}
