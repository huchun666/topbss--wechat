import { Component} from '@angular/core';
import { NavController, NavParams, AlertController } from 'ionic-angular';
@Component({
  selector: 'handle-expressgift',
  templateUrl: 'handle-expressgift.html'
})
export class HandleExpressgift {
  handleExpressGiftArray: any;
	constructor(public navCtrl: NavController, public alertCtrl: AlertController) {
    // 获取已兑换快递赠品列表
    // getHandleExpressGiftList()
    this.handleExpressGiftArray = [
			{
				id: 1,
				name: "爱法呗赠品小马甲",
				memberPhone: "12131415161",
				subscribePhone: "222222222",
        getTime: "2017.09.27 23:59",
        subscribeTime: "2017.09.28 23:59",
        shoppingGuideName: "周三",
				imgUrl: "../assets/image/productimg.png",
				subscribeState: "2",//1: 未兑换，2: 已兑换
				patriarchName: "张家长",
				patriarchPhone: "12313231545",
				babyName: "张宝宝",
				babyHeight: "120",
				babyIDNumber: "32088888888888",
				remarkInfo: "圆通物流  12341234123"
			},
			{
				id: 1,
				name: "爱法呗赠品小马甲",
				memberPhone: "12131415161",
				subscribePhone: "222222222",
        getTime: "2017.09.27 23:59",
        subscribeTime: "2017.09.28 23:59",
        shoppingGuideName: "周四",
				imgUrl: "../assets/image/productimg.png",
				subscribeState: "2",//1: 未兑换，2: 已兑换
				patriarchName: "张家长",
				patriarchPhone: "12313231545",
				babyName: "张宝宝",
				babyHeight: "120",
				babyIDNumber: "32088888888888",
				remarkInfo: "圆通物流  12341234123"
			},
			{
				id: 1,
				name: "爱法呗赠品小马甲",
				memberPhone: "12131415161",
				subscribePhone: "222222222",
        getTime: "2017.09.27 23:59",
        subscribeTime: "2017.09.28 23:59",
        shoppingGuideName: "周五",
				imgUrl: "../assets/image/productimg.png",
				subscribeState: "2",//1: 未兑换，2: 已兑换
				patriarchName: "张家长",
				patriarchPhone: "12313231545",
				babyName: "张宝宝",
				babyHeight: "120",
				babyIDNumber: "32088888888888",
				remarkInfo: "圆通物流  12341234123"
			}
		]
  }
  getHandleExpressGiftList() {
    // let url = this.appConFig.API.;page=1
	  // this.appService.httpGet(url).then( data => {
    //   this.seflGiftArray = data;
	  // }).catch(error => {
    //  console.log(error);
    // });
  }
}
