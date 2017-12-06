import { Component} from '@angular/core';
import { NavController, AlertController, ViewController } from 'ionic-angular';
@Component({
  selector: 'order-info',
  templateUrl: 'order-info.html'
})
export class OrderInfo {
	orderDetail: any;
  constructor(public navCtrl: NavController, public alertCtrl: AlertController, public viewCtrl: ViewController) {
		this.orderDetail = {
			brandshopName: "商汉城市部落速递臻品童装",
			orderNumber: "2017122215242",
			productList: [{
				image: "./assets/image/productimg.png",
				name: "可爱的小裙子 厚实的 保暖 秋冬季",
				skuList: [{
					value: "140"
				},{
					value: "蓝色"
				}, {
					value: "无袖"
				}],
				price: "128.00",
				count: 4
			}]
		}
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
}
