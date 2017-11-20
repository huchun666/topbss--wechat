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
  withdrawList: any = [{
    "id": null, //主键
    "amount": 0.00, //申请提现金额
    "realAmount": 0.00, //实际提现金额
    "individualTax": 0.00, //个税扣除金额
    "applyDate": null, //申请日期
    "applyDateTime": null, //申请时间
    "applyUser": null, //申请人ID
    "processDate": 1457452800000, //审核日期
    "processDateTime": null, //审核时间
    "processUser": null, //审核人ID
    "status": "1", //状态：0-处理失败；1-处理成功；3-申请拒绝；9-处理中
    "refusalReason": "" //拒绝原因
  }];
  constructor(
    public navCtrl: NavController, 
    public alertCtrl: AlertController,
    public appService: AppService
  ) {
  }
  getWithdrawList() {
    let url = `${AppConfig.hostUrl + AppConfig.API.withdrawList}?applyDateTime=&status=&start=
      ${(this.currentPage - 1) * this.pageSize}&limit=${this.pageSize}`;
    this.appService.httpGet(url)
      .then(data => {
        this.withdrawList = data;
      })
      .catch(error => {

      })
  }
  refreshGetCreatOrderList() {
    console.log(222);
  }
}
