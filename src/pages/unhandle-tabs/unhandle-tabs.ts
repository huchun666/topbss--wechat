import { Component} from '@angular/core';
import { NavController, NavParams, AlertController } from 'ionic-angular';
import { UnhandleSelfgift } from '../unhandle-selfgift/unhandle-selfgift';
import { UnhandleExpressgift } from '../unhandle-expressgift/unhandle-expressgift';
@Component({
  selector: 'unhandle-tabs',
  templateUrl: 'unhandle-tabs.html'
})
export class UnhandleTabs {
	seflGift = UnhandleSelfgift;
	Expressgift = UnhandleExpressgift;
	selfCount: string;
	expressCount: string;
	constructor(public navCtrl: NavController, public alertCtrl: AlertController) {
		this.selfCount = this.setCount('0', 12);
		this.expressCount = this.setCount('1', 8);
	}
	setCount(type, num) {
		if (type === '0') {
			return "自提赠品" + "(" + num + ")";
		} else {
			return "快递赠品" + "(" + num + ")";
		}
	}
}