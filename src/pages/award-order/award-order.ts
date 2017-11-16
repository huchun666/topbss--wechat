import { Component} from '@angular/core';
import { NavController, NavParams, AlertController } from 'ionic-angular';
@Component({
  selector: 'award-order',
  templateUrl: 'award-order.html'
})
export class AwardOrder {
  awardOrder: any;
  constructor(public navCtrl: NavController, public alertCtrl: AlertController) {
    //getOrderDetail();
    this.awardOrder = {
      totalMoney: 2000.00,
      basicData: [
        {
          orderId: '20162222252',
          accountCardinalzNumber: 2000,
          accountProportion: 0.01,
          awardMoney: 2.00,
          state: '1'  //1、已收货  2、已完成
        },{
          orderId: '20162222252',
          accountCardinalzNumber: 2000,
          accountProportion: 0.01,
          awardMoney: 2.00,
          state: '2'
        }
      ]
    }
  }
  getOrderDetail() {
    // let url = AppConfig.API.;
    // 所需参数：page=1,moneyDetailType='1'  //1、订单金额明细  2、奖励活动金额明细
	  // this.appService.httpGet(url).then( data => {
    //   this.awardOrder = data;
	  // }).catch(error => {
    //  console.log(error);
    // });
  }
}
