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
    if (this.userName != "13761489650" || this.pwd != "123456lb") {
      this.isNameAndPwd = true;
      return;
    }

    let url = `${AppConfig.API.login}?user=${this.userName}&password=${this.pwd}`;
    this.appService.httpGet(url).then(data => {
      if (data.success) {
        let appNav = this.app.getRootNav();
        appNav.setRoot(TabsPage);
      } else {
        this.isNameAndPwd = true;
      }
    }).catch(error => {
      console.log(error);
    });

  }
  forget() {
    this.navCtrl.push(Forget);
  }
}
