import { Component} from '@angular/core';
import { NavController, NavParams, AlertController } from 'ionic-angular';
import { AppService, AppConfig } from '../../app/app.service';
@Component({
  selector: 'withdraw',
  templateUrl: 'withdraw.html'
})
export class Withdraw {
  amout: number;
  allAmout: number = 123.00;
  isAllow: boolean = true;
  constructor(
    public navCtrl: NavController, 
    public alertCtrl: AlertController,
    public appService: AppService
  ) {
  }
  withdraw() {
    console.log(2222);
    // 防重复提交
    if (!this.isAllow) {
      return;
    }
    this.isAllow = false;
    // let url = `${AppConfig.API}`;
    // let body = {
    //   "amout": this.amout
    // };
    // this.appService.httpPost(url,body).then(data => {
    //   this.isAllow = true;
    // }).catch(error => {
    //   console.log(error);
    //   this.isAllow = true
    // });
  }
}
