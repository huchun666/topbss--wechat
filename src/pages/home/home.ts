import { Component } from '@angular/core';
import { ModalController, NavController, Events } from 'ionic-angular';
import { AppService, AppConfig } from '../../app/app.service';
import { BarcodeScanner } from '@ionic-native/barcode-scanner';
import { MyCode } from '../mycode/mycode';
import { CreatOrder } from '../creat-order/creat-order';
import { GiftInfo } from '../gift-info/gift-info';
import { OrderInfo } from '../order-info/order-info';
import { UnauditTabs } from '../unaudit-tabs/unaudit-tabs';
import { UnhandleTabs } from '../unhandle-tabs/unhandle-tabs';
import { HandleSelfgift } from '../handle-selfgift/handle-selfgift';
declare var wx: any;
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
    let url = `${AppConfig.API.getUnhandleGiftCount}`;
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
    let signUrl = "https%3A%2F%2Fwww.61topbaby.com%2Fevercos%2Fmember%2Findex.html&_=1512438037846";
    let url = `${AppConfig.API.signature}?url=${signUrl}`;
    this.appService.httpGet(url).then(data => {
      wx.config({
        debug: false,
        appId: data.appId,
        timestamp: data.timestamp,
        nonceStr: data.noncestr,
        signature: data.signature,
        jsApiList: ['scanQRCode']
      });
      wx.error(function(res){
        console.log("微信验证失败"+res);
        let alert = this.alertCtrl.create({
          title: '提示',
          subTitle: '扫描失败，请重新再试',
          buttons: ['确定']
        });
        alert.present();
      });
      wx.scanQRCode({
        needResult: 1, // 默认为0，扫描结果由微信处理，1则直接返回扫描结果，
        scanType: ["qrCode","barCode"],
        success: function (res) {
          var url = res.resultStr; // 当needResult 为 1 时，扫码返回的结果
          if (url.indexOf(AppConfig.hostUrl) < 0) {
            let alert = this.alertCtrl.create({
              title: '提示',
              subTitle: '请扫描淘璞系统内二维码',
              buttons: ['确定']
            });
          }else {
            if (url.indexOf('id') > 0) {
              let myCodeModal = this.modalCtrl.create(OrderInfo, {'url': url});
              myCodeModal.onDidDismiss(data => {
                if (!data) {
                  return;
                }
                if (data.type === '1') {
                  this.qrCodeScan();
                } else if (data.type === '0') {
                  this.navCtrl.parent.select(1);
                  let orderStatus = 'C';
                  this.events.publish('order:status', orderStatus);
                }
              });
              myCodeModal.present();
            }else if (url.indexOf('giftCode') > 0) {
              let myCodeModal = this.modalCtrl.create(GiftInfo, {'url': url});
              myCodeModal.onDidDismiss(data => {
                if (!data) {
                  return;
                }
                if (data.type === '1') {
                  this.qrCodeScan();
                } else if (data.type === '0') {
                  const giftModal = this.modalCtrl.create(HandleSelfgift);
                  giftModal.present();
                }
              });
              myCodeModal.present();
            }else {
              let alert = this.alertCtrl.create({
                title: '提示',
                subTitle: '请扫描订单或者赠品二维码',
                buttons: ['确定']
              });
              alert.present();
            }
          }
        },
        fail: function(error) {
          console.log(error);
          let alert = this.alertCtrl.create({
            title: '提示',
            subTitle: '扫描失败，请重新再试',
            buttons: ['确定']
          });
          alert.present();
        }
      });
    }).catch(error => {
      console.log(error);
      this.appService.toast('操作失败，请稍后重试', 1000, 'middle');
    })
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
