import { Component} from '@angular/core';
import { App, NavController } from 'ionic-angular';
import { AppService, AppConfig } from '../../app/app.service';
import { Forget } from '../forget/forget';
import { TabsPage } from '../tabs/tabs';
@Component({
  selector: 'login',
  templateUrl: 'login.html'
})
export class Login {
  userName: string = "13761489650";
  pwd: string = "123456lb";
  isNameAndPwd: boolean = false;
  constructor(
    public navCtrl: NavController,
    public app: App,
    public appService: AppService
  ) {
  }
  login() {
    if (this.userName == "13761489650" || this.pwd == "123456lb") {
      let appNav = this.app.getRootNav();
      appNav.setRoot(TabsPage);
    }
    // 登陆实际是post或者put，暂时先使用get模拟
    //let url = AppConfig.API.;
    //let body = {
    //  userName: this.userName,
    //  password: this.pwd
    //}
    //this.appService.httpPost(url, body).then(data => {
    //  if (data.success) {
    //    let appNav = this.app.getRootNav();
    //    appNav.setRoot(TabsPage);
    //  } else {
    //    this.isNameAndPwd = true;
    //  }
    //}).catch(error => {
    //  console.log(error);
    //});
  }
  forget() {
    this.navCtrl.push(Forget);
  }
}
