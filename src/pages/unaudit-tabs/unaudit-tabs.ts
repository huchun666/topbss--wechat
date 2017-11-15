import { Component} from '@angular/core';
import { NavController, NavParams, AlertController } from 'ionic-angular';
import { UnauditCancelorder } from '../unaudit-cancelorder/unaudit-cancelorder';
import { UnauditReturnorder } from '../unaudit-returnorder/unaudit-returnorder';
@Component({
  selector: 'unaudit-tabs',
  templateUrl: 'unaudit-tabs.html'
})
export class UnauditTabs {
  orderCancel = UnauditCancelorder;
  orderReturn = UnauditReturnorder;
  cancelCount: string;
  returnCount: string;
  constructor(public navCtrl: NavController, public alertCtrl: AlertController) {
	this.cancelCount = this.setCount('0', 22);
	this.returnCount = this.setCount('1', 12);
  }
  setCount(type, num) {
	if (type === '0') {
	  return "待审核取消订单" + "(" + num + ")";
	} else {
	  return "待处理退货订单" + "(" + num + ")";
	}
  }
}
