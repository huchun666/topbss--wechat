import { Component } from '@angular/core';
import { ModalController, NavController, AlertController } from 'ionic-angular';
import { AppService, AppConfig } from '../../app/app.service';
import { BarcodeScanner } from '@ionic-native/barcode-scanner';
import { MyCode } from '../mycode/mycode';
import { CreatOrder } from '../creat-order/creat-order';
import { GiftInfo } from '../gift-info/gift-info';
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
    public alertCtrl: AlertController,
    public appService: AppService,
    public barcodeScanner: BarcodeScanner
  ) {
    this.getUnAuditCount();
    this.getUnHandleCount();
  }
  //获取取消订单、退货订单数量
  getUnAuditCount() {
    let url = AppConfig.API.untreatedCount
    this.appService.httpGet(url).then( data => {
      this.cancelOrderCount = data.cancelCount;
      this.returnOrderCount = data.returnCount;
    })
    .catch(error => {
      console.log(error);
    });
  }
  //获取自提赠品、快递赠品数量
  getUnHandleCount() {
    let url = `${AppConfig.API.getUnhandleGiftCount}?brandshopSeq=133`;
    this.appService.httpGet(url).then( data => {
       this.selfGiftCount = data.reserved;
       this.expressgiftCount = data.undelivered;
     })
     .catch(error => {
       console.log(error);
     });
  }
  goUnAudit() {
    let unAuditModal = this.modalCtrl.create(UnauditTabs,{
      cancelOrderCount: this.cancelOrderCount,
      returnOrderCount: this.returnOrderCount
    });
    unAuditModal.present();
    unAuditModal.onDidDismiss(() => {
      this.getUnAuditCount();
    })
  }
  goUnHandle() {
    let unHandleModal = this.modalCtrl.create(UnhandleTabs,{
      selfGiftCount: this.selfGiftCount,
      expressGiftCount: this.expressgiftCount
    });
    unHandleModal.present();
    unHandleModal.onDidDismiss(() => {
      this.getUnHandleCount();
    })
  }
  qrCodeScan() {
    // 订单
    // let myCodeModal = this.modalCtrl.create(OrderInfo);
    // myCodeModal.onDidDismiss(data => {
    //   if (data && data.type == "0") {
    //     this.navCtrl.parent.select(1);
    //   }
    // });
    // myCodeModal.present();
    // 赠品信息
    this.barcodeScanner.scan().then((barcodeData) => { 
      let url = barcodeData.text;
      alert(url);
      if (url.indexOf('https://www.61topbaby.com') < 0) {
        let alert = this.alertCtrl.create({
          title: '提示',
          subTitle: '请扫描淘璞系统内二维码',
          buttons: ['确定']
        });
        alert.present();
      } else {
        
      }
    }, (err) => {
       console.log('扫码失败');
      let alert = this.alertCtrl.create({
        title: '提示',
        subTitle: '扫描失败，请重新再试',
        buttons: ['确定']
      });
      alert.present();
    });
  }
  /** 弹出层消息 **/
  alertModal(parmas) {
    let alert = this.alertCtrl.create({
      title: parmas.title,
      subTitle: parmas.subTitle,
      buttons: [parmas.buttonText]
    });
    alert.present();
  }
  /** 我的二维码 **/
  goMyCode() {
    let myCodeModal = this.modalCtrl.create(MyCode);
    myCodeModal.present();
  }
  /** 配单仓 **/
  goCreatOrder() {
    let creatOrderModal = this.modalCtrl.create(CreatOrder);
    creatOrderModal.present();
  }
}
