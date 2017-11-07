import { Component} from '@angular/core';
import { NavController, NavParams, ModalController } from 'ionic-angular';
import { AddAccount } from '../add-account/add-account';
@Component({
  selector: 'bind-account',
  templateUrl: 'bind-account.html'
})
export class BindAccount {
  constructor(public navCtrl: NavController, public modalCtrl: ModalController) {
  }
  goAccount() {
    let accountModal = this.modalCtrl.create(AddAccount);
    accountModal.present();
  }
}
