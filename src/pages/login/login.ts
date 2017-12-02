import { Http, Headers } from '@angular/http';
import { Component } from '@angular/core';
import { App, NavController } from 'ionic-angular';
import { AppService, AppConfig } from '../../app/app.service';
import { Forget } from '../forget/forget';
import { TabsPage } from '../tabs/tabs';
import { Buffer } from 'buffer';
@Component({
  selector: 'login',
  templateUrl: 'login.html'
})
export class Login{
  oauthTokenHeaders: any;
  loginHeaders: any;
  username: string = "restUser";//后面清空
  pwd: string = "1234";//后面清空
  isNameAndPwd: boolean = false;
  rememberPassword: boolean = false;
  constructor(
    public navCtrl: NavController,
    public app: App,
    public appService: AppService,
    public http: Http
  ) {
    // this.pageInit();
    if (window.location.search && window.location.search.split("?")[1].indexOf("code") > -1) {
      let appNav = this.app.getRootNav();
      appNav.setRoot(TabsPage);
    }
  }
  // 页面初始化时执行
  // pageInit() {
  //   let user = this.appService.getItem("user");
  //   if (user) {
  //     user = JSON.parse(user);
  //     this.username = user.username;
  //     this.pwd = user.pwd;
  //     if (this.pwd) {
  //       this.rememberPassword = true;
  //     }
  //   }
  // }
  login() {
    // // 登录时判断用户名和密码是否正确
    // if (this.userName == "15618146206" && this.pwd == "123456hc") {
    //   let appNav = this.app.getRootNav();
    //   appNav.setRoot(TabsPage);
    // }
    // else if (this.userName == "13761489650" && this.pwd == "123456") {
    //   let appNav = this.app.getRootNav();
    //   appNav.setRoot(TabsPage);
    // } else {
    //   this.isNameAndPwd = true;
    // }
    
    
    // let base64encode = new Buffer('fooClientIdPassword:secret').toString('base64');
    // this.oauthTokenHeaders = new Headers({
    //   'Authorization': 'Basic '+ base64encode,
    //   'Content-Type': 'application/x-www-form-urlencoded'
    // });
    // let oauthTokenUrl = AppConfig.oauthTokenUrl;
    // let loginUrl = AppConfig.API.login;
    // // let body = `username=restUser&password=1234&grant_type=password&client_id=fooClientIdPassword`;
    // let body = `username=${this.username}&password=${this.pwd}&grant_type=password&client_id=fooClientIdPassword`;
    let appNav = this.app.getRootNav();//后面注释
    appNav.setRoot(TabsPage);
    // this.appService.httpPostHeader(oauthTokenUrl, body, this.oauthTokenHeaders)
    // .then(data => {
    //   console.log(data.access_token)
    //   if (data.access_token) {
    //     this.appService.setItem("tpb_token",data.access_token);
    //     console.log("inter...");
    //     this.loginHeaders = new Headers(
    //     {
    //       'Authorization': 'Bearer '+ data.access_token
    //     });
    //     this.appService.httpGetHeader(loginUrl, this.loginHeaders).then(data => {
    //       console.log(data);
            //if (data.username == this.username) {
            // let user = {
            //   userName: this.username,
            //   pwd: this.pwd
            // };
            // if (!this.rememberPassword){
            //   user.pwd = ""; 
            // }
            // this.appService.setItem("user", JSON.stringify(user));
            //}
            
    //       let appNav = this.app.getRootNav();
    //       appNav.setRoot(TabsPage);
    //     }).catch(error => {
    //       this.isNameAndPwd = true;
    //       console.log(`访问错误1:${error}`);
    //     });
    //   }else {
    //     console.log("没有token值");
    //   }
    // })
    // .catch(error => {
    //   console.log(`访问错误:${error}`);
    //   console.log("认证失败");
    // })

    
  }
  
  forget() {
    this.navCtrl.push(Forget);
  }
  onblurAffirm() {
    // console.log(this.base64encode(this.username))
    //let url = AppConfig.API.;
    //let body = {
    //  userName: this.userName
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
}
