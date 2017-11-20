import { Component } from '@angular/core';
import { AppService, AppConfig } from '../../app/app.service';
@Component({
  templateUrl: 'order-detail.html',
  selector: 'withdraw-orderDetail'
})
export class OrderDetail{
  pageSize: number = 10;
  currentPage: number = 1;
  orderDetail: any = [{
      "id": 1, //主键
      "type": 1, //奖励类型：1-导购员处理订单；2-导购员发展会员；3-奖励活动导购员处理订单；4-奖励活动导购员发展会员；5-异业联盟门店发展会员
      "relateId": 20151030001651,//关联ID:当type=1,3时，为orderId;当type=2,4,5时，为memberId
      "userId": 1, //奖励对象ID:当type=1,2,3,4时，为brandshopUserId;当type=5时，为brandshopId(异业联盟门店ID);
      "rewardActivityId": 1, //导购员奖励活动ID
      "baseAmount": 699.00, //基础金额（基数）
      "percent": 0.1000, //奖励比例
      "amount": 69.90, //奖励金额
      "returnAmount": 0.00, //退货扣除金额
      "status": 1, //状态：0-异常锁定；1-正常（审核中）；2-已结算（可提现）
      "startTime": 1481212800000, //奖励活动开始时间
      "endTime": 1544284800000, //奖励活动结束时间
      "createTime": 1509434651000, //创建时间
      "updateTime": 1509434651000 //更新时间
  }];
  constructor(public appService: AppService){
    //this.getOrderDetail();
  }
  getOrderDetail() {
    let url = `${AppConfig.hostUrl + AppConfig.API.bonusList}?type=['1','3']&status=['2']$start=
      ${(this.currentPage - 1) * this.pageSize}&limit=${this.pageSize}`;
    this.appService.httpGet(url)
      .then(data => {
        this.orderDetail = data;
      }).catch(error => {
        console.log(error);
      });
  }
}