import { Component} from '@angular/core';
import { NavController, NavParams, AlertController } from 'ionic-angular';
import { AppService, AppConfig } from '../../../app/app.service';
@Component({
  selector: 'add-account',
  templateUrl: 'add-account.html'
})
export class AddAccount {
  salesName: string = '';
  cellphone: string = '';
  IDcard: string = '';
  id: any;
  wechatOpenid: any;
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public alertCtrl: AlertController,
    public appService: AppService
  ) {
    this.id = this.navParams.get('param');
  }
  updateCurrent() {
    let url = `${AppConfig.API.current}`;
    let body = {
      id: this.id,
      salesName: this.salesName,
      cellphone: this.cellphone,
      IDcard: this.IDcard,
      wechatOpenid: this.wechatOpenid
    }
    this.appService.httpPut(url, body)
      .then(data => {
        this.appService.toast('更新成功', 3000, 'middle');
      })
      .catch(error => {
        console.log(error);
      })
  }
}
