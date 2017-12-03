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
  accountContent: Boolean = false;//见html
  noBind: Boolean = true;//见html
  boundWechat: Boolean;//是否绑定微信
  requestDefeat: Boolean = false;
  loadingShow: Boolean = false;
  load: any = {}; 
  userId: number;
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public viewCtrl : ViewController,
    public appService: AppService,
    public app: App,
  ) {
    
  }
  bindWX() {
    let code = "";
    let redirectUri = "";//还没给；这里的重定向地址也需要push
    let getCodeUrl = `${AppConfig.API.connect}?appid=${AppConfig.appID}&redirect_uri=${redirectUri}&response_type=code&scope=snsapi_userinfo&state=STATE#wechat_redirect`;
    this.appService.httpGet(getCodeUrl).then(() => {
      
    }).catch(error => {
      console.log(error);
    });
  }
  editCurrent() {
    this.loadingShow = true;
    let editCurrentUrl = AppConfig.API.current;
    let editParameters = {
      salesName: this.salesName,
      cellphone: this.cellphone,
      IDcard: this.IDcard
    }
    //更新导购员账户
    this.appService.httpPut(editCurrentUrl, editParameters).then(data => {
      if (data.type == "SUCCESS") {
        this.loadingShow = false;
        this.getCurrent();
      }
    }).catch(error => {
      this.loadingShow = false;
      console.log(error);
      this.appService.toast('更新失败，请稍后重试', 1000, 'middle');
    });
  }
  //查询当前导购员信息
  getCurrent() {
    this.load = AppConfig.load;
    this.loadingShow = true;
    this.accountContent = false;
    let getCurrentUrl = AppConfig.API.current;
    this.appService.httpGet(getCurrentUrl)
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
    this.userId = this.navParams.get("userId");
    //重定向判断
    if (this.userId && window.location.search && window.location.search.split("?")[1].indexOf("code") > -1) {
      this.accountContent = false;
      let loading = this.appService.loading();
      loading.present();
      let code = window.location.search.split("?")[1].split("&")[0].split("=")[1];
      let getTokenUrl = `${AppConfig.API.sns}?appid=${AppConfig.appID}&secret=${AppConfig.appSecret}&code=${code}&grant_type=authorization_code`;
      this.appService.httpGet(getTokenUrl).then(data => {
        if (data.errcode) {//请求token失败时
          loading.dismiss();
          this.requestDefeat = true;
          this.noBind = true;
        }else {
          let openid = data.openid;
          let updateCurrentUrl = AppConfig.API.current;
          let updateParameters = {
            id: this.userId,
            salesName: this.salesName,
            cellphone: this.cellphone,
            wechatOpenid: openid,
            IDcard: this.IDcard
          }
          //更新导购员账户
          this.appService.httpPut(updateCurrentUrl, updateParameters).then(data => {
            if (data.type == "SUCCESS") {
              loading.dismiss();
              this.noBind = false;
              this.getCurrent();
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
      this.getCurrent();
    }
  }
}
