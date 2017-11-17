import { Http, Headers } from '@angular/http';
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
  oauthTokenHeaders: any;
  loginHeaders: any;
  username: string = "restUser";
  pwd: string = "1234";
  isNameAndPwd: boolean = false;
  rememberPassword: boolean = false;
  constructor(
    public navCtrl: NavController,
    public app: App,
    public appService: AppService,
    public http: Http
  ) {
    // this.pageInit();
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
    //存储用户(此代码执行前需要进行用户名和密码非空校验)
    // let user = {
    //   userName: this.userName,
    //   pwd: this.pwd
    // };
    // if (!this.rememberPassword){
    //   user.pwd = ""; 
    // }
    // this.appService.setItem("user", JSON.stringify(user));

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
    
    
    // 登陆实际是post或者put，暂时先使用get模拟
    this.oauthTokenHeaders = new Headers({
      'Authorization': 'Basic '+ this.base64encode("fooClientIdPassword:secret"),
      'Content-Type': 'application/x-www-form-urlencoded'
    });
    let oauthTokenUrl = AppConfig.oauthTokenUrl;
    let loginUrl = AppConfig.API.login;
    // let body = `username=restUser&password=1234&grant_type=password&client_id=fooClientIdPassword`;
    let body = `username=${this.username}&password=${this.pwd}&grant_type=password&client_id=fooClientIdPassword`;

    this.appService.httpPostHeader(oauthTokenUrl, body, this.oauthTokenHeaders)
    .then(data => {
      console.log(data.access_token)
      if (data.access_token) {
        this.appService.setItem("tpb_token",data.access_token);
        console.log("inter...");
        this.loginHeaders = new Headers(
        {
          'Authorization': 'Bearer '+ data.access_token
        });
        this.appService.httpGetHeader(loginUrl, this.loginHeaders).then(data => {
          console.log(data);
          let appNav = this.app.getRootNav();
          appNav.setRoot(TabsPage);
        }).catch(error => {
          this.isNameAndPwd = true;
          console.log(`访问错误1:${error}`);
        });
      }else {
        console.log("没有token值");
      }
    })
    .catch(error => {
      console.log(`访问错误:${error}`);
      console.log("认证失败");
    })

    
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
  
  base64encode(str) {
        var base64EncodeChars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";
    　　var out, i, len;
    　　var c1, c2, c3;
    　　len = str.length;
    　　i = 0;
    　　out = "";
    　　while(i < len) {
     c1 = str.charCodeAt(i++) & 0xff;
     if(i == len)
     {
    　　 out += base64EncodeChars.charAt(c1 >> 2);
    　　 out += base64EncodeChars.charAt((c1 & 0x3) << 4);
    　　 out += "==";
    　　 break;
     }
     c2 = str.charCodeAt(i++);
     if(i == len)
     {
    　　 out += base64EncodeChars.charAt(c1 >> 2);
    　　 out += base64EncodeChars.charAt(((c1 & 0x3)<< 4) | ((c2 & 0xF0) >> 4));
    　　 out += base64EncodeChars.charAt((c2 & 0xF) << 2);
    　　 out += "=";
    　　 break;
     }
     c3 = str.charCodeAt(i++);
     out += base64EncodeChars.charAt(c1 >> 2);
     out += base64EncodeChars.charAt(((c1 & 0x3)<< 4) | ((c2 & 0xF0) >> 4));
     out += base64EncodeChars.charAt(((c2 & 0xF) << 2) | ((c3 & 0xC0) >>6));
     out += base64EncodeChars.charAt(c3 & 0x3F);
    　　}
    　　return out;
    }
}
