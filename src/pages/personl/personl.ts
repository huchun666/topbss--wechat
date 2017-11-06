import { Component} from '@angular/core';
import { App, Nav, NavController, NavParams, ModalController, ViewController  } from 'ionic-angular';
import { Withdraw } from '../withdraw/withdraw';
import { Login } from '../login/login';
import { MyCode } from '../mycode/mycode';
import { DetailTabs } from '../detail-tabs/detail-tabs';
import { AwardTabs } from '../award-tabs/award-tabs';
import { WithdrawRecord } from '../withdraw-record/withdraw-record';
import { Help } from '../help/help';
import { BindAccount } from '../account/bind-account/bind-account';
@Component({
  selector: 'personl',
  templateUrl: 'personl.html'
})
export class Personl {
  total: string = '69922.36';
  gotMoney: string = '2689.63';
  unGetMoney: string = '18889.62';
  isStar: boolean = false;
  showImg: string = 'hide.png';
  showText: string = '隐藏';
  pageList: any = null;
  constructor(
    public nav: Nav,
    public navCtrl: NavController,
    public modalCtrl: ModalController, 
    public viewCtrl: ViewController,
    private app: App
  ) {
    this.pageList = {
      "withdraw": Withdraw,
      "myCode": MyCode,
      "detailTabs": DetailTabs,
      "awardTabs": AwardTabs,
      "withdrawRecord": WithdrawRecord,
      "bindAccount": BindAccount,
      "help": Help
    }
  }
  // 显示和隐藏金额
  showMoney() {
    this.isStar = !this.isStar;
    this.showText = !this.isStar ? '隐藏' : '显示';
    this.showImg = !this.isStar ? 'hide.png' : 'show.png';
    this.total = !this.isStar ?  '69922.36' : '*****';
    this.gotMoney = !this.isStar ?  '2689.63' : '*****';
    this.unGetMoney = !this.isStar ?  '18889.62' : '*****';
  }
  // 退出登录
  logOut() {
    let appNav = this.app.getRootNav();
    appNav.setRoot(Login);
  }
  // 跳转页面
  redirectPage(page) {
    let pageModal = this.modalCtrl.create(page);
    pageModal.present();
  }
}
