import { Component} from '@angular/core';
import { NavController, NavParams, AlertController } from 'ionic-angular';
import { AppService, AppConfig } from '../../app/app.service';
@Component({
  selector: 'award-activity',
  templateUrl: 'award-activity.html'
})
export class AwardActivity {
  pageSize: number = 10;
  currentPage: number = 1;
  awardActivity: any = [];
  count: number = 0;
  sum: any;
  isShow: boolean = false;
  constructor(
    public navCtrl: NavController, 
    public alertCtrl: AlertController,
    public appService: AppService
  ) {
    this.getAwardActivity();
    this.getBonusSum();
  }
  getAwardActivity() {
    let url = `${AppConfig.API.bonusList}?typeList=3,4&statusList=0,1&start=${(this.currentPage - 1) * this.pageSize}&limit=${this.pageSize}`;
    this.appService.httpGet(url)
      .then(data => {
        if (data.data.length > 0) {
          data.data.map(item => {
            item.baseAmount = item.baseAmount.toFixed(2);
            item.percent = item.percent.toFixed(2);
            item.amount = item.amount.toFixed(2);
            item.returnAmount = item.returnAmount.toFixed(2);
          });
          this.awardActivity.push(...data.data);
        }
        this.count = data.count;
      }).catch(error => {
        console.log(error);
      });
  }
  // 获取总金额
  getBonusSum() {
    let url = `${AppConfig.API.bonusSum}?typeList=3,4&statusList=0,1`;
    this.appService.httpGet(url)
      .then(data => {
        this.sum = data.sum;
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
      this.getAwardActivity();
      infiniteScroll.complete();
    }, 500);
  }
}
