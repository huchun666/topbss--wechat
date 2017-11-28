import { Component } from '@angular/core';
import { AppService, AppConfig } from '../../app/app.service';
@Component({
  templateUrl: 'order-detail.html',
  selector: 'withdraw-orderDetail'
})
export class OrderDetail{
  /* pageSize, currentPage, orderDetail, sum, isShow
  *  每一页数量，当前页，处理订单列表，总金额，有无列表明细时的判断
  */
  pageSize: number = 10;
  currentPage: number = 1;
  orderDetail: any = [];
  count: number = 0;
  sum: any;
  isShow: boolean = false;
  isEmpty: boolean = false;
  requestFail: boolean = false;
  constructor(public appService: AppService){
    this.getOrderDetail();
    this.getBonusSum();
  }
  // 获取总金额
  getBonusSum() {
    let url = `${AppConfig.API.bonusSum}?typeList=1&statusList=2`;
    this.appService.httpGet(url)
      .then(data => {
        this.sum = data.sum;
        this.setIsShow(this.sum);
      }).catch(error => {
        console.log(error);
      });
  }
  // 获取已审核明细列表
  getOrderDetail() {
    let url = `${AppConfig.API.bonusList}?typeList=1&statusList=2&start=${(this.currentPage - 1) * this.pageSize}&limit=${this.pageSize}`;
    this.appService.httpGet(url)
      .then(data => {
        if (data.data.length > 0) {
          data.data.map(item => {
            item.baseAmount = item.baseAmount.toFixed(2);
            item.percent = item.percent.toFixed(2);
            item.amount = item.amount.toFixed(2);
            item.returnAmount = item.returnAmount.toFixed(2);
          });
          this.orderDetail.push(...data.data);
        }
        this.count = data.count;
        this.isEmpty = data.count === 0 ? true : false;
        this.requestFail = false;
      }).catch(error => {
        console.log(error);
        this.requestFail = true;
        this.isEmpty = false;
      });
  }
  // 有无明细列表时的判断（判断总金额是否为0）
  setIsShow(sum) {
    return this.isShow = sum > 0 ? true : false;
  }
  loadMore(infiniteScroll) {
    this.currentPage ++;
    setTimeout(() => {
      this.getOrderDetail();
      infiniteScroll.complete();
    }, 500);
  }
  refresh() {
    this.requestFail = false;
    this.currentPage = 1;
    this.getOrderDetail();
  }
}