import { Component} from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { Home } from '../home/home';
import { Forget } from '../forget/forget';
import { TabsPage } from '../tabs/tabs';
@Component({
  selector: 'login',
  templateUrl: 'login.html'
})
export class Login {
  userName: string = '13761489650';
  pwd: string = '123456lb';
  isNameAndPwd: boolean = false;
  constructor(public navCtrl: NavController) {
    console.log(this.userName);
  }
  login() {
    if (this.userName === '13761489650' && this.pwd === '123456lb'){
      this.navCtrl.push(TabsPage);
    } else {
      this.isNameAndPwd = true;
    }
  }
  forget() {
    this.navCtrl.push(Forget);
  }
  
}
