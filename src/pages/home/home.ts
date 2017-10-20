import { Component} from '@angular/core';
import { ModalController, NavController, NavParams } from 'ionic-angular';
import { UnauditTabs } from '../unaudit-tabs/unaudit-tabs';
import { UnhandleTabs } from '../unhandle-tabs/unhandle-tabs';
@Component({
  selector: 'home',
  templateUrl: 'home.html'
})
export class Home {
  constructor(public modalCtrl: ModalController, public navCtrl: NavController) {
  }
  goUnAudit() {
	let orderModal = this.modalCtrl.create(UnauditTabs);
	orderModal.present();
  }
  goUnHandle() {
	let orderModal = this.modalCtrl.create(UnhandleTabs);
	orderModal.present();
  }
}
