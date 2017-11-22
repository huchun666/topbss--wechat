import { NavParams } from 'ionic-angular';
import { Component } from '@angular/core';
import { AppService, AppConfig } from '../../app/app.service';
@Component({
  templateUrl: 'award-detail.html',
  selector: 'withdraw-awardDetail'
})
export class AwardDetail{
  pageSize: number = 10;
  currentPage: number = 1;
  awardDetail: any = [];
  count: number = 0;
  sum: any;
  isShow: boolean = false;
  constructor(
    public navParams: NavParams,
    public appService: AppService
  ){
    this.getAwardDetail();
    this.getBonusSum();
  }
  getAwardDetail() {
    let url = `${AppConfig.API.bonusList}?typeList=3,4&statusList=2$start=${(this.currentPage - 1) * this.pageSize}&limit=${this.pageSize}`;
    this.appService.httpGet(url)
      .then(data => {
        this.awardDetail = data.data;
      }).catch(error => {
        console.log(error);
      });
  }
  // 获取总金额
  getBonusSum() {
    let url = `${AppConfig.API.bonusSum}?typeList=3,4&statusList=2`;
    this.appService.httpGet(url)
      .then(data => {
        this.sum = data;
        this.setIsShow(this.sum);
      }).catch(error => {
        console.log(error);
      });
  }
  // 有无明细列表时的判断（判断总金额是否为0）
  setIsShow(sum) {
    return this.isShow = sum > 0 ? true : false;
  }
  loadMore(infiniteScroll) {
    this.currentPage ++;
    setTimeout(() => {
      this.getAwardDetail();
      infiniteScroll.complete();
    }, 500);
  }
}