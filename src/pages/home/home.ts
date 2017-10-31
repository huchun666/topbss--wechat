import { Component} from '@angular/core';
import { ModalController, NavController, NavParams } from 'ionic-angular';
import { BarcodeScanner } from '@ionic-native/barcode-scanner';
import { MyCode } from '../mycode/mycode';
import { CreatOrder } from '../creat-order/creat-order';
import { UnauditTabs } from '../unaudit-tabs/unaudit-tabs';
import { UnhandleTabs } from '../unhandle-tabs/unhandle-tabs';
@Component({
  selector: 'home',
  templateUrl: 'home.html'
})
export class Home {
  constructor(
    public modalCtrl: ModalController,
    public navCtrl: NavController,
    private barcodeScanner: BarcodeScanner
  ) {

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
    //  console.log('扫码成功');
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
