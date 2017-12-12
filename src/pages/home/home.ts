import { Component } from '@angular/core';
import { ModalController, NavController, Events } from 'ionic-angular';
import { AppService, AppConfig } from '../../app/app.service';
import { BarcodeScanner } from '@ionic-native/barcode-scanner';
import { MyCode } from '../mycode/mycode';
import { CreatOrder } from '../creat-order/creat-order';
import { GiftInfo } from '../gift-info/gift-info';
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
    public appService: AppService,
    public events: Events
  ) {
    this.getUnAuditCount();
    this.getUnHandleCount();
  }
  // 每次离开页面的时候执行
  ionViewDidLeave(){
    this.events.unsubscribe('check: status', () => {
      console.log('did unsubscribe');
    });
  }
  //获取取消订单、退货订单数量
  getUnAuditCount() {
    let url = AppConfig.API.untreatedCount
    this.appService.httpGet(url).then( data => {
      this.cancelOrderCount = data.cancelCount;
      this.returnOrderCount = data.returnCount;
    })
    .catch(error => {
      this.appService.getToken(error, () => {
        this.getUnAuditCount();
      });
      console.log(error);
    });
  }
  //获取自提赠品、快递赠品数量
  getUnHandleCount() {
    let url = `${AppConfig.API.getUnhandleGiftCount}`;
    this.appService.httpGet(url).then( data => {
       this.selfGiftCount = data.reserved;
       this.expressgiftCount = data.undelivered;
     })
     .catch(error => {
      this.appService.getToken(error, () => {
        this.getUnHandleCount();
      });
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
    let myCodeModal = this.modalCtrl.create(GiftInfo);
    myCodeModal.present();
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
  ionViewDidEnter() {
    this.events.subscribe('check: status', (data) => {
      if (data) {
        this.navCtrl.parent.select(1);
      }
    });
  }
}
