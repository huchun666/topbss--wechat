import { Component} from '@angular/core';
import { NavController, NavParams, AlertController, ViewController } from 'ionic-angular';
import { BarcodeScanner } from '@ionic-native/barcode-scanner';
import { AppService, AppConfig } from '../../app/app.service';
@Component({
  selector: 'order-info',
  templateUrl: 'order-info.html'
})
export class OrderInfo {
  orderDetail: any;
  constructor(
    public navCtrl: NavController,
    public alertCtrl: AlertController,
    public viewCtrl: ViewController,
    public navParams: NavParams,
    public appService: AppService
  ) {
  }
  presentConfirm() {
    const alert = this.alertCtrl.create({
      message: '确认提货完成',
      buttons: [
        {
          text: '查看订单',  //type: 0
          handler: () => {
            let data = { 'type': '0' };
            this.viewCtrl.dismiss(data);
          }
        },
        {
          text: '继续扫码',  //type: 1
          handler: () => {
          let data = { 'type': '1' };
          this.viewCtrl.dismiss(data);
            //this.barcodeScanner.scan().then((barcodeData) => {
            //  let myCodeModal = this.modalCtrl.create(OrderInfo, {});
            //  myCodeModal.present();
            //}, (err) => {
            //    console.log('扫码失败');
            //});
          }
        }
      ]
    });
    alert.present();
  }
  getOrderDetail() {
    let url = this.navParams.get("url"); //提现总计，从当前账户传入过来;
    this.appService.httpGet(url)
      .then(data => {
        this.orderDetail = data.data;
      }).catch(error => {
        console.log(error);
      });
    }
  }
