import { Component} from '@angular/core';
import { NavController, NavParams, AlertController } from 'ionic-angular';
import { AppService, AppConfig } from '../../app/app.service';
@Component({
  selector: 'withdraw-record',
  templateUrl: 'withdraw-record.html'
})
export class WithdrawRecord {
  pageSize: number = 10;
  currentPage: number = 1;
  withdrawAmount: number = 0;
  count: number = 0;
  withdrawList: any = [];
  constructor(
    public navCtrl: NavController, 
    public alertCtrl: AlertController,
    public navParams: NavParams,
    public appService: AppService
  ) {
    this.withdrawAmount = this.navParams.get("param");
    this.getWithdrawList();
  }
  getWithdrawList() {
    let url = `${AppConfig.API.withdrawList}?start=${(this.currentPage - 1) * this.pageSize}&limit=${this.pageSize}`;
    this.appService.httpGet(url)
      .then(data => {
        if (data.data.length > 0) {
          data.data.map(item => {
            item.amount = item.amount.toFixed(2);
            item.realAmount = item.realAmount.toFixed(2);
            item.individualTax = item.individualTax.toFixed(2);
          });
          this.withdrawList.push(...data.data);
        }
        this.count = data.count;
      })
      .catch(error => {
        console.log(error);
      }
    );
  }
  loadMore(infiniteScroll) {
    this.currentPage ++;
    setTimeout(() => {
      this.getWithdrawList();
      infiniteScroll.complete();
    }, 500);
  }
}
