import { Component, OnInit } from '@angular/core';
import { App, NavController } from 'ionic-angular';
import { AppService, AppConfig } from '../../app/app.service';
import { Forget } from '../forget/forget';
import { TabsPage } from '../tabs/tabs';
@Component({
  selector: 'login',
  templateUrl: 'login.html'
})
export class Login implements OnInit{
  userName: string = "";
  pwd: string = "";
  isNameAndPwd: boolean = false;
  rememberPassword: boolean = false;
  constructor(
    public navCtrl: NavController,
    public app: App,
    public appService: AppService
  ) {
  }
  ngOnInit() {
    var userNameAndPwd = this.appService.getItem("userNameAndPwd");
    if ( userNameAndPwd ) {
      if (userNameAndPwd.includes("&")){
        let userNameAndPwdArray = userNameAndPwd.split("&");
        let userName = userNameAndPwdArray[0];
        let pwd = userNameAndPwdArray[1];
        this.userName = userName;
        this.pwd = pwd;
        this.rememberPassword = true;
      }else {
        this.userName = userNameAndPwd;
        this.pwd = "";
        this.rememberPassword = false;
      }
    }
  }
  login() {
    
    if (Boolean(this.rememberPassword)){
      this.appService.setItem("userNameAndPwd",this.userName + "&" + this.pwd)
    }else {
      this.appService.setItem("userNameAndPwd",this.userName)
    }
    if (this.userName == "15618146206" && this.pwd == "123456hc") {
      let appNav = this.app.getRootNav();
      appNav.setRoot(TabsPage);
    }
    if (this.userName == "15618146666" && this.pwd == "123456") {
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
