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
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public alertCtrl: AlertController,
    public appService: AppService
  ) {
    this.id = this.navParams.get('userId');
  }
  updateCurrent() {
    let url = `${AppConfig.hostUrl + AppConfig.API.current}`;
    let body = {
      id: this.id,
      salesName: this.salesName,
      cellphone: this.cellphone,
      IDcard: this.IDcard
    }
    this.appService.httpPost(url, body)
      .then(data => {
        this.appService.toast('更新成功', 3000, 'middle');
      })
      .catch(error => {
        console.log(error);
      })
  }
}
