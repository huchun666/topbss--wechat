import { Component} from '@angular/core';
import { App, NavController } from 'ionic-angular';
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
  constructor(
    public navCtrl: NavController,
    public app: App
  ) {
  }
  login() {
    if (this.userName === '13761489650' && this.pwd === '123456lb'){
      let appNav = this.app.getRootNav();
      appNav.setRoot(TabsPage);
    } else {
      this.isNameAndPwd = true;
    }
  }
  forget() {
    this.navCtrl.push(Forget);
  }
}
