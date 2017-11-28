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
  isEmpty: boolean = false;
  requestFail: boolean = false;
  constructor(
    public navCtrl: NavController, 
    public alertCtrl: AlertController,
    public navParams: NavParams,
    public appService: AppService
  ) {
    this.withdrawAmount = this.navParams.get("param1"); //提现总计，从当前账户传入过来
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
        this.isEmpty = data.count === 0 ? true : false;
        this.requestFail = false;
      })
      .catch(error => {
        console.log(error);
        this.requestFail = true;
        this.isEmpty = false;
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
  refresh() {
    this.requestFail = false;
    this.currentPage = 1;
    this.getWithdrawList();
  }
}
