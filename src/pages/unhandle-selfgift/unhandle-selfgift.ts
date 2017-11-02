import { Component} from '@angular/core';
import { NavController, NavParams, ModalController, AlertController } from 'ionic-angular';
import { HandleSelfgift } from '../handle-selfgift/handle-selfgift';
@Component({
  selector: 'unhandle-selfgift',
  templateUrl: 'unhandle-selfgift.html'
})
export class UnhandleSelfgift {
	seflGiftArray: any;
	seflGiftArray1: any;
  constructor(public navCtrl: NavController, public modalCtrl: ModalController, public alertCtrl: AlertController) {
	  this.seflGiftArray = [
			{
				id: 1,
				name: "爱法呗赠品小马甲",
				memberPhone: "12131415161",
				subscribePhone: "222222222",
				getTime: "2017.09.27 23:59",
				subscribeArriveTime: "",
				imgUrl: "../assets/image/productimg.png",
				subscribeState: "1"
			}, {
				id: 2,
				name: "爱法呗赠品小马甲",
				memberPhone: "12131415161",
				subscribePhone: "222222222",
				getTime: "2017.08.27 23:59",
				subscribeArriveTime: "",
				imgUrl: "../assets/image/productimg.png",
				subscribeState: "1"
			}, {
				id: 3,
				name: "爱法呗赠品小马甲",
				memberPhone: "12131415161",
				subscribePhone: "222222222",
				getTime: "2017.10.27 23:59",
				subscribeArriveTime: "",
				imgUrl: "../assets/image/productimg.png",
				subscribeState: "1"
			}, {
				id: 4,
				name: "爱法呗赠品小马甲",
				memberPhone: "12131415161",
				subscribePhone: "222222222",
				getTime: "2017.06.27 23:59",
				subscribeArriveTime: "2017.09.28 13:59",
				imgUrl: "../assets/image/productimg.png",
				subscribeState: "2"
			},
			{
				id: 5,
				name: "爱法呗赠品小马甲",
				memberPhone: "12131415161",
				subscribePhone: "222222222",
				getTime: "2017.06.27 23:59",
				subscribeArriveTime: "2017.09.28 13:59",
				imgUrl: "../assets/image/productimg.png",
				subscribeState: "2"
			}
			
		]
	}
  goSelfgift() {
	  const orderModal = this.modalCtrl.create(HandleSelfgift);
	  orderModal.present();
  }
  clearSubscribeArriveTime(index) {
	  this.seflGiftArray[index].subscribeArriveTime = "";
  }
}
