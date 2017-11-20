import { Component} from '@angular/core';
import { NavController, NavParams, AlertController } from 'ionic-angular';
import { AppService, AppConfig } from '../../app/app.service';
@Component({
  selector: 'withdraw',
  templateUrl: 'withdraw.html'
})
export class Withdraw {
  amout: number;
  balance: string = '';
  isAllow: boolean = true;
  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public alertCtrl: AlertController,
    public appService: AppService
  ) {
    this.getBalance();
  }
  /* 获取可提现金额 */
  getBalance () {
    console.log(this.navParams.get("param"));
    this.balance = this.navParams.get("param");
  }
  /* 提现 */
  withdraw() {
    this.appService.toast('提现成功', 300000, 'middle');
    return;
    // if (!this.isAllow) {
    //   return;
    // }
    // this.isAllow = false;
    // let url = `${AppConfig.hostUrl + AppConfig.API.withdraw}`;
    // let body = {
    //   amout: this.amout
    // }
    // this.appService.httpPost(url, body).then(data => {
    //   this.isAllow = true;
    // }).catch(error => {
    //   console.log(error);
    //   this.isAllow = true
    // });
  }
}
