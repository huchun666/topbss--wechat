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
import { AppService, AppConfig } from '../../app/app.service';
@Component({
  selector: 'personl',
  templateUrl: 'personl.html'
})
export class Personl {
  /* 当前导购员基本信息
   * 用户ID,手机号，门店ID，微信号，身份证
  */
  userCurrent: any = {
    id: '', //用户id
    telphone: '13761489650', //手机
    brandshopId: '12345', //门店id
    wechatNumber: '', //微信号
    idcard: '' //身份证
  }
  /* 当前导购员账户信息
   * 导购员ID,类型账户，已审核金额（旧版本的总金额），可提现金额，审核中金额，已提取金额
   */
  userAccount: any = {
    userId: null,
    acctType: null,
    totalAmount: 118.01,
    balance: 69922.36,
    verifyAmount: 18889.62,
    withdrawAmount: 2689.63
  }
  /* 临时存储可提现金额，审核中金额，和已提现金额 */
  moneyList: any = {
    balance: 69922.36,
    verifyAmount: 18889.62,
    withdrawAmount: 2689.63
  }
  isStar: boolean = false;
  showImg: string = 'hide.png';
  showText: string = '隐藏';
  pageList: any = null;
  constructor(
    public nav: Nav,
    public navCtrl: NavController,
    public modalCtrl: ModalController, 
    public viewCtrl: ViewController,
    private app: App,
    public appService: AppService,
  ) {
    /* 设置组件名称，方便跳转参数调用 */
    this.pageList = {
      "withdraw": Withdraw,
      "myCode": MyCode,
      "detailTabs": DetailTabs,
      "awardTabs": AwardTabs,
      "withdrawRecord": WithdrawRecord,
      "bindAccount": BindAccount,
      "help": Help
    }
    /* 获取当前用户 */
    this.getCurrent();
  }
  /* 显示和隐藏金额 */
  showMoney() {
    this.isStar = !this.isStar;
    this.showText = !this.isStar ? '隐藏' : '显示';
    this.showImg = !this.isStar ? 'hide.png' : 'show.png';
    this.userAccount.balance = !this.isStar ?  this.moneyList.balance : '*****';
    this.userAccount.verifyAmount = !this.isStar ?  this.moneyList.verifyAmount : '*****';
    this.userAccount.withdrawAmount = !this.isStar ?  this.moneyList.withdrawAmount : '*****';
  }
  formatMoney() {

  }
  /* 退出登录 */
  logOut() {
    let appNav = this.app.getRootNav();
    appNav.setRoot(Login);
  }
  /* 跳转页面 */
  redirectPage(page) {
    let pageModal = this.modalCtrl.create(page);
    pageModal.present();
  }
  /* 将电话号码格式化 */
  formatTelphone() {
    this.userCurrent.telphone = this.userCurrent.telphone.replace(/(\d{3})\d{4}(\d{4})/, '$1****$2');
  }
  /* 获取当前导购员基本信息 */
  getCurrent() {
    let url = `${AppConfig.hostUrl + AppConfig.API.current}`;
    this.appService.httpGet(url)
      .then( data => {
        this.userCurrent = data;
        this.formatTelphone();
      })
      .catch(error => {
        console.log(error);
      });
  }
}
