import { Component} from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { home } from '../home/home';
import { forget } from '../forget/forget';
@Component({
  selector: 'login',
  templateUrl: 'login.html'
})
export class Login {
  userName: string;
  pwd: string;
  isNameAndPwd: boolean = false;
  constructor(public navCtrl: NavController) {
    console.log(this.userName);
  }
  login() {
    if (this.userName === '13761489650' && this.pwd === '123456lb'){
      this.navCtrl.push(home);
    } else {
      this.isNameAndPwd = true;
    }
  }
  forget() {
    this.navCtrl.push(forget);
  }
  
}
