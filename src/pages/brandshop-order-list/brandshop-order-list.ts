import { Component} from '@angular/core';
import { NavController, NavParams} from 'ionic-angular';
import { AppService, AppConfig } from '../../app/app.service';
@Component({
  selector: 'order-list',
  templateUrl: 'brandshop-order-list.html'
})
export class BrandshopOrderList {
  dateStart: string = '';
  dateEnd: string = '';
  isShowDetail: boolean = false;
  orderStatus: string = '';
  orderList: any;
  orderStatusList: any;
  currentStaus: any;
  currentPage: number = 1;
  pageSize: number = 10;
  constructor(public navCtrl: NavController, public appService: AppService) {
    this.orderStatusList = ["全部", "待支付", "已收货", "取消中", "已取消", "已完成"];
    this.currentStaus = this.orderStatusList[0];
    this.orderList = [{
      orderNumber: "201444145695",
      orderStauts: 0,
      total: "1200.00",
      promotions: "00.00",
      topDiscount: "00.00",
      merchantDiscount: "10.00",
      integralDiscount: "00.00",
      payAmount: "566.96",
      memberMobile: "13761489650",
      receivedTime: "2017.10.26",
      productList: [{
        images: "./assets/image/productimg.png",
        name: "可爱的小裙子 厚实的 保暖 秋冬季",
        skuList: [{
          value: "140"
        },{
          value: "蓝色"
        },{
          value: "无袖"
        }],
        price: "128.00",
        count: "4"
      }]
    }]
  }
  // 获取门店订单列表
  getOrderList(parmas) {
    let url = `${AppConfig.API}?status=${this.currentStaus}&start=${this.pageSize * (this.currentPage) - 1}&limit=${this.pageSize}&${parmas}`;
    this.appService.httpGet(url).then(data => {
      this.orderList = data.body.orderList;
      this.currentPage++;
    }).catch(error => {
      console.log(error);
    })
  }
  getOrderListByDate() {
    // let parmas= `&dateStart=${this.dateStart}&dateEnd=${this.dateEnd}`;
    // this.getOrderList(parmas);
  }
  // 点击状态时切换，获取当前门店订单状态
  getCurrentStaus(index) {
    this.currentStaus = this.orderStatusList[index];
    // this.getOrderList(url);
  }
  // 是否显示明细
  showDetail() {
    this.isShowDetail = !this.isShowDetail;
  }
  // 清除开始日期
  clearDateStart() {
    this.dateStart = '';
  }
  // 清除结束日期
  clearDateEnd() {
    this.dateEnd = '';
  }
}