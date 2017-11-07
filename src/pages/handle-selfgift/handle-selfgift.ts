import { Component} from '@angular/core';
import { NavController, NavParams, AlertController } from 'ionic-angular';
import { AppService, AppConfig } from '../../app/app.service';
@Component({
  selector: 'handle-selfgift',
  templateUrl: 'handle-selfgift.html'
})
export class HandleSelfgift {
  seflGiftArray: any;
	constructor(public navCtrl: NavController, public alertCtrl: AlertController) {
    //getHandleSelfGiftList()

    //模拟数据
    this.seflGiftArray = [
      {
        id: 1,
				name: "爱法呗赠品小马甲1",
				memberPhone: "12131415161",
				subscribePhone: "222222222",
        getTime: "2017.09.27 23:59",
        exchangeTime: "2017.09.27 11:59",
				subscribeArriveTime: "2017.09.28 23:59",
				imgUrl: "../assets/image/productimg.png",
        subscribeState: "1",//1: 预约兑换，2：到店兑换
        shoppingGuideName: "周三"
      },
      {
        id: 1,
				name: "爱法呗赠品小马甲2",
				memberPhone: "12131415161",
				subscribePhone: "",
        getTime: "2017.09.27 23:59",
        exchangeTime: "2017.09.27 11:59",
				subscribeArriveTime: "",
				imgUrl: "../assets/image/productimg.png",
        subscribeState: "2",//1: 预约兑换，2：到店兑换
        shoppingGuideName: "王四"
      }
    ]
  }
  
  //进入页面，请求接口，得到数据
  getHandleSelfGiftList() {
    // let url = this.appConFig.API.;page=1
	  // this.appService.httpGet(url).then( data => {
    //   this.seflGiftArray = data;
	  // }).catch(error => {
    //  console.log(error);
    // });
  }
	
}
