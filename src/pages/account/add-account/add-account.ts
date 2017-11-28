import { Component} from '@angular/core';
import { NavController, NavParams, ViewController  } from 'ionic-angular';
import { AppService, AppConfig } from '../../../app/app.service';
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
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public viewCtrl : ViewController,
    public appService: AppService
  ) {
    this.userCurrent = this.navParams.get('param2');
  }
  updateCurrent() {
    let url = `${AppConfig.API.current}`;
    let body = {
      id: this.userCurrent.id,
      salesName: this.salesName,
      cellphone: this.cellphone,
      IDcard: this.IDcard,
      wechatOpenid: this.wechatOpenid
    }
    this.appService.httpPut(url, body)
      .then(data => {
        this.appService.toast('更新成功', 1000, 'middle');
        setTimeout(() => {
          let Refash = {'isRefash': true}
          this.viewCtrl.dismiss(Refash)
        }, 1500)
      })
      .catch(error => {
        console.log(error);
      })
  }
}
