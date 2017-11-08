import { Component} from '@angular/core';
import { NavController, NavParams, AlertController, ViewController } from 'ionic-angular';
import { HandleSelfgift } from '../handle-selfgift/handle-selfgift';
@Component({
  selector: 'gift-info',
  templateUrl: 'gift-info.html'
})
export class GiftInfo {
	giftInfo: any;
	constructor(public navCtrl: NavController, public alertCtrl: AlertController, public viewCtrl: ViewController) {
    this.giftInfo = {
			brandshopName: "商汉城市部落速递臻品童装",
			gift: {
				image: "./assets/image/productimg.png",
				name: "可爱的小裙子 厚实的 保暖 秋冬季",
				receiveTime: "2017.09.09 23:58",
			}
		}
	}
	presentConfirm() {
		const alert = this.alertCtrl.create({
			message: '确认兑换完成',
			buttons: [
			  {
			    text: '查看赠品',
			    handler: () => {
						//点击查看赠品后的执行代码
						this.viewCtrl.dismiss();
						this.navCtrl.push(HandleSelfgift);
			    }
			  },
			  {
			    text: '继续扫码',
			    handler: () => {
						this.viewCtrl.dismiss();
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
}
