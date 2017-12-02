import { Component} from '@angular/core';
import { NavController, NavParams, ViewController, App  } from 'ionic-angular';
import { AppService, AppConfig } from '../../../app/app.service';
import { TabsPage } from '../../tabs/tabs';
@Component({
  selector: 'add-account',
  templateUrl: 'add-account.html'
})
export class AddAccount {
  salesName: string = '';
  cellphone: string = '';
  IDcard: string = '';
  wechatOpenid: any;
  userCurrent: any;
  accountContent: Boolean = false;//
  noBind: Boolean = true;
  boundWechat: Boolean;
  requestDefeat: Boolean = false;
  loadingShow: Boolean = false;
  load: any = {}; 
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public viewCtrl : ViewController,
    public appService: AppService,
    public app: App,
  ) {
    
  }
  updateCurrent() {
    let code = "";
    let redirectUri = "";//还没给；这里的重定向地址也需要push
    let url = `${AppConfig.API.connect}?appid=${AppConfig.appID}&redirect_uri=${redirectUri}&response_type=code&scope=snsapi_userinfo&state=STATE#wechat_redirect`;
    this.appService.httpGet(url).then(() => {
      
    }).catch(error => {
      console.log(error);
    });
  }
  getCurrent() {
    this.loadingShow = true;
    this.accountContent = false;
    let url = AppConfig.API.current;
    this.appService.httpGet(url)
      .then( data => {
        this.loadingShow = false;
        this.requestDefeat = false;
        this.accountContent = true;
        this.boundWechat = data.boundWechat;
        this.salesName = data.salesName;
        this.cellphone = data.cellphone;
        this.IDcard = data.idcard;
        if (this.boundWechat) {
          this.noBind = false;
        }else {
          this.noBind = true;
        }
      })
      .catch(error => {
        console.log(error);
        this.loadingShow = false;
        this.requestDefeat = true;
        this.accountContent = false;
      });
  }
  ionViewDidEnter() {
    //重定向判断
    if (window.location.search && window.location.search.split("?")[1].indexOf("code") > -1) {
      let userId = this.navParams.get("userId");
      this.accountContent = false;
      let loading = this.appService.loading();
      loading.present();
      let code = window.location.search.split("?")[1].split("&")[0].split("=")[1];
      let url = `${AppConfig.API.sns}?appid=${AppConfig.appID}&secret=${AppConfig.appSecret}&code=${code}&grant_type=authorization_code`;
      this.appService.httpGet(url).then(data => {
        if (data.errcode) {
          loading.dismiss();
          this.accountContent = false;
          this.requestDefeat = true;
          this.noBind = true;
        }else {
          let openid = data.openid;
          let url = AppConfig.API.current;
          let parameters = {
            id: userId,
            salesName: this.salesName,
            cellphone: this.cellphone,
            wechatOpenid: openid,
            IDcard: this.IDcard
          }
          this.appService.httpPut(url, parameters).then(data => {
            if (data.type == "SUCCESS") {
              loading.dismiss();
              this.accountContent = true;
              this.noBind = false;
            }
          }).catch(error => {
            loading.dismiss();
            this.accountContent = false;
            this.noBind = true;
            console.log(error);
            this.appService.toast('更新失败，请稍后重试', 1000, 'middle');
          });
        }
      })
    }else {
      this.load = AppConfig.load;
      this.getCurrent();
    }
  }
}
