import { NavParams } from 'ionic-angular';
import { Component } from '@angular/core';
@Component({
  templateUrl: 'award-detail.html',
  selector: 'withdraw-awardDetail'
})
export class AwardDetail{
  awardDetail: any;
  constructor(public navParams: NavParams){
    //getAwardDetail();

    this.awardDetail = {
      totalMoney: 6000.00,
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

  getAwardDetail() {
    // let url = AppConfig.API.;
    // 所需参数：page=1,moneyDetailType='2'  //1、订单金额明细  2、奖励活动金额明细
	  // this.appService.httpGet(url).then( data => {
    //   this.awardDetail = data;
	  // }).catch(error => {
    //  console.log(error);
    // });
  }
}