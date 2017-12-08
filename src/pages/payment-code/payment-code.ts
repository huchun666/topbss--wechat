import { Component} from '@angular/core';
import { App, NavController, NavParams, Events } from 'ionic-angular';
import { AppService, AppConfig } from '../../app/app.service';
@Component({
  selector: 'payment-code',
  templateUrl: 'payment-code.html'
})
export class PaymentCode {
  myCode: string = "";
  totalPriceFloat: any;
  warehouseId: number;
  isStatus: Boolean = true;
  timer: any;
  constructor(
    public navCtrl: NavController,
    public app: App,
    public navParams: NavParams,
    public appService: AppService,
    public events: Events
  ) {
    this.myCode = this.navParams.get('returnUrl');
    this.totalPriceFloat = this.navParams.get('totalPriceFloat');
    this.warehouseId = this.navParams.get('warehouseId');
    this.Interval();
  }
  // 修改此单
  updateOrder() {
    this.navCtrl.pop();
  }
  // 再来一单
  orderAgain() {
    let loading = this.appService.loading();
    loading.present();
    let url = `${AppConfig.API.warehouseEmpty}`
    this.appService.httpPut(url, null).then( data => {
      if (data.type=="success") {
        loading.dismiss();
        this.navCtrl.remove(this.navCtrl.length() - 2, 2);
      }
    }).catch(error=>{
      loading.dismiss();
      console.log(error);
      this.appService.toast('操作失败', 1000, 'middle');
    })
  }
  //关闭(完成)移除所有的view,直接显示home
  goTabs() {
    this.navCtrl.remove(0, this.navCtrl.length());
  }
  //定时检测配单仓状态
  Interval() {
    var self = this;
    let url = `${AppConfig.API.checkStatus}?warehouseId=${this.warehouseId}`;
    this.timer = window.setInterval(function() {
      self.appService.httpGet(url).then(data => {
      if (data.status == 0) {
        self.isStatus = true;
        window.clearInterval(self.timer);
        self.navCtrl.remove(0, self.navCtrl.length());
        self.events.publish('check: status', self.isStatus);
      }else {
        self.isStatus = false;
      }
    }).catch(error => {
      console.log(error);
    })},1000);
  }
  ionViewDidLeave() {
    window.clearInterval(this.timer);
  }
}
