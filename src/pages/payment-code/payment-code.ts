import { Component} from '@angular/core';
import { App, NavController } from 'ionic-angular';
import { TabsPage} from '../tabs/tabs';
@Component({
  selector: 'payment-code',
  templateUrl: 'payment-code.html'
})
export class PaymentCode {
  constructor(
    public navCtrl: NavController,
    public app: App
  ) {
  }
  //移除所有的view,直接显示home
  goTabs() {
    this.navCtrl.remove(0, this.navCtrl.length());
  }
}
