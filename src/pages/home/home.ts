import { Component } from '@angular/core';
import { ModalController, NavController, AlertController, Events } from 'ionic-angular';
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
    public alertCtrl: AlertController,
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
    // let signUrl = window.location.href;
    // let encodeUrl = encodeURIComponent(signUrl);
    // let url = `${AppConfig.API.signature}?url=${encodeUrl}`;
    var self = this;
    // self.appService.httpGet(url).then(data => {
    //   wx.config({
    //     debug: false,
    //     appId: data.appId,
    //     timestamp: data.timestamp,
    //     nonceStr: data.noncestr,
    //     signature: data.signature,
    //     jsApiList: ['scanQRCode']
    //   });
    //   // wx.error(function(res){
    //   //   console.log("微信验证失败"+res);
    //   //   let alert = self.alertCtrl.create({
    //   //     title: '提示',
    //   //     subTitle: '扫描失败，请重新再试',
    //   //     buttons: ['确定']
    //   //   });
    //   //   alert.present();
    //   // });
      wx.scanQRCode({
        needResult: 1, // 默认为0，扫描结果由微信处理，1则直接返回扫描结果，
        scanType: ["qrCode","barCode"],
        success: function (res) {
          var url = res.resultStr; // 当needResult 为 1 时，扫码返回的结果
          if (!url) {
            return;
          }
          if (url.indexOf(AppConfig.mainUrl) < 0) {
            let alert = self.alertCtrl.create({
              title: '提示',
              subTitle: '请扫描淘璞系统内二维码',
              buttons: ['确定']
            });
          }else {
            if (url.indexOf('id') > 0) {
              let myCodeModal = self.modalCtrl.create(OrderInfo, {'url': url});
              myCodeModal.onDidDismiss(data => {
                if (!data) {
                  return;
                }
                if (data.type === '1') {
                  self.qrCodeScan();
                } else if (data.type === '0') {
                  self.navCtrl.parent.select(1);
                  let orderStatus = 'C';
                  self.events.publish('order:status', orderStatus);
                }
              });
              myCodeModal.present();
            }else if (url.indexOf('giftCode') > 0) {
              let myCodeModal = self.modalCtrl.create(GiftInfo, {'url': url});
              myCodeModal.onDidDismiss(data => {
                if (!data) {
                  return;
                }
                if (data.type === '1') {
                  self.qrCodeScan();
                } else if (data.type === '0') {
                  const giftModal = self.modalCtrl.create(HandleSelfgift);
                  giftModal.present();
                }
              });
              myCodeModal.present();
            }else {
              let alert = self.alertCtrl.create({
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
          let alert = self.alertCtrl.create({
            title: '提示',
            subTitle: '扫描失败，请重新再试!!',
            buttons: ['确定']
          });
          alert.present();
        }
      });
    // }).catch(error => {
    //   self.appService.getToken(error, () => {
    //     self.qrCodeScan();
    //   });
    //   console.log(error);
    //   self.appService.toast('操作失败，请稍后重试', 1000, 'middle');
    // })
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
      if (data == true) {
        this.navCtrl.parent.select(1);
      }
    });
    let signUrl = window.location.href;
    let encodeUrl = encodeURIComponent(signUrl);
    let url = `${AppConfig.API.signature}?url=${encodeUrl}`;
    this.appService.httpGet(url).then(data => {
      wx.config({
        debug: false,
        appId: data.appId,
        timestamp: data.timestamp,
        nonceStr: data.noncestr,
        signature: data.signature,
        jsApiList: ['scanQRCode']
      });
    })
    .catch(error => {
      this.appService.getToken(error, () => {
        this.getUnHandleCount();
      });
       console.log(error);
       this.appService.toast('网络阻塞，请稍后重试。', 1000, 'middle');
     })
  }
}
