import { Component} from '@angular/core';
import { ModalController, NavController } from 'ionic-angular';
import { AppService, AppConfig } from '../../app/app.service';
import { BarcodeScanner } from '@ionic-native/barcode-scanner';
import { MyCode } from '../mycode/mycode';
import { CreatOrder } from '../creat-order/creat-order';
import { OrderInfo } from '../order-info/order-info';
import { UnauditTabs } from '../unaudit-tabs/unaudit-tabs';
import { UnhandleTabs } from '../unhandle-tabs/unhandle-tabs';
@Component({
  selector: 'home',
  templateUrl: 'home.html'
})
export class Home {
  cancelOrderCount: number = 0;
  returnOrderCount: number = 0;
  selfGiftCount: number = 0;
  expressgiftCount: number = 0;
  constructor(
    public modalCtrl: ModalController,
    public navCtrl: NavController,
    private barcodeScanner: BarcodeScanner,
    public appService: AppService
  ) {
    this.getUnAuditCount();
    this.getUnHandleCount();
  }
  //获取取消订单、退货订单数量
  getUnAuditCount() {
    this.cancelOrderCount = 5;
    this.returnOrderCount = 10;
    //let url = AppConfig.API.
    //this.appService.httpGet(url)
    //  .then(data => {
    //    this.cancelOrderCount = data.body.cancelOrderCount;
    //    this.returnOrderCount = data.body.returnOrderCount;
    //  })
    //  .catch(error => {
    //    console.log(error);
    //  });
  }
  //获取自提赠品、快递赠品数量
  getUnHandleCount() {
    this.selfGiftCount = 15;
    this.expressgiftCount = 20;
    //let url = AppConfig.API.
    //this.appService.httpGet(url)
    //  .then(data => {
    //    this.selfGiftCount = data.body.selfGiftCount;
    //    this.expressgiftCount = data.body.expressgiftCount;
    //  })
    //  .catch(error => {
    //    console.log(error);
    //  });
  }
  goUnAudit() {
    let unAuditModal = this.modalCtrl.create(UnauditTabs);
    unAuditModal.present();
  }
  goUnHandle() {
    let unHandleModal = this.modalCtrl.create(UnhandleTabs);
    unHandleModal.present();
  }
  qrCodeScan() {
    //this.barcodeScanner.scan().then((barcodeData) => {
    //  let myCodeModal = this.modalCtrl.create(OrderInfo, {});
    //  myCodeModal.present();
    //}, (err) => {
    //    console.log('扫码失败');
    //});
  }
  goMyCode() {
    let myCodeModal = this.modalCtrl.create(MyCode);
    myCodeModal.present();
  }
  goCreatOrder() {
    let creatOrderModal = this.modalCtrl.create(CreatOrder);
    creatOrderModal.present();
  }
}
