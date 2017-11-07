import { Component } from '@angular/core';
import { App, NavController } from 'ionic-angular';
import { AppService, AppConfig } from '../../app/app.service';
import { Forget } from '../forget/forget';
import { TabsPage } from '../tabs/tabs';
@Component({
  selector: 'login',
  templateUrl: 'login.html'
})
export class Login{
  userName: string = "";
  pwd: string = "";
  isNameAndPwd: boolean = false;
  rememberPassword: boolean = false;
  constructor(
    public navCtrl: NavController,
    public app: App,
    public appService: AppService
  ) {
    this.pageInit();
  }
  // 页面初始化时执行
  pageInit() {
    let user = this.appService.getItem("user");
    if (user) {
      user = JSON.parse(user);
      this.userName = user.userName;
      this.pwd = user.pwd;
      if (this.pwd) {
        this.rememberPassword = true;
      }
    }
  }
  login() {
    //存储用户(此代码执行前需要进行用户名和密码非空校验)
    let user = {
      userName: this.userName,
      pwd: this.pwd
    };
    if (!this.rememberPassword){
      user.pwd = ""; 
    }
    this.appService.setItem("user", JSON.stringify(user));

    // 登录时判断用户名和密码是否正确
    if (this.userName == "15618146206" && this.pwd == "123456hc") {
      let appNav = this.app.getRootNav();
      appNav.setRoot(TabsPage);
    }
    else if (this.userName == "13761489650" && this.pwd == "123456") {
      let appNav = this.app.getRootNav();
      appNav.setRoot(TabsPage);
    } else {
      this.isNameAndPwd = true;
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
