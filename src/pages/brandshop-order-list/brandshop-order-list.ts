import { Component, ViewChild } from '@angular/core';
import { NavController, Content } from 'ionic-angular';
import { AppService, AppConfig } from '../../app/app.service';
@Component({
  selector: 'order-list',
  templateUrl: 'brandshop-order-list.html'
})
export class BrandshopOrderList {
  @ViewChild(Content) content: Content;
  dateStart: string = '';
  dateEnd: string = '';
  isShowDetail = [];
  orderList = [];
  orderStatusList: any;
  currentStatus: any;
  pageSize: number = 10;
  paramsStatus: string = '';
  paramsDate: string = '';
  up: Boolean = false;
  down: Boolean = true;
  noData: Boolean = false;
  start: number = 0;
  showNoMore: Boolean = false;
  loadingShow: Boolean = true;
  load: any = {};
  dateEndMin = '1970'; //结束日期的最小值
  dateEndMax: string = ''; //结束日期的最大值
  dateStartMax: string = ''; //开始日期的最大值
  requestDefeat: Boolean = false;
  constructor(
    public navCtrl: NavController,
    public appService: AppService) {
    this.orderStatusList = [{
      label: "全部",
      status: 'all'
    }, {
      label: "待支付",
      status: '0'
    }, {
      label: "已收货",
      status: '3'
    }, {
      label: "已取消",
      status: '4'
    }, {
      label: "取消中",
      status: '6'
    }, {
      label: "已完成",
      status: 'C'
    }];
    this.currentStatus = this.orderStatusList[0].status;
    this.load = AppConfig.load;
    this.dateStartMax = new Date().getFullYear() + '-' + (new Date().getMonth() + 1) + '-' + new Date().getDate();
    this.dateEndMax = new Date().getFullYear() + '-' + (new Date().getMonth() + 1) + '-' + new Date().getDate();
    this.getOrderList();
  }

  // 获取订单列表
  getOrderList() {
    this.loadingShow = true;
    this.showNoMore = false;
    this.noData = false;
    this.requestDefeat = false;
    var url = `${AppConfig.API.getOrderList}?start=${this.start}&limit=${this.pageSize}`;
    if (this.paramsDate != '')
      url += this.paramsDate;
    if (this.paramsStatus != '')
      url += this.paramsStatus;
    this.appService.httpGet(url).then(data => {
      this.loadingShow = false;
      if (this.start < data.count) {
        this.showNoMore = false;
        this.noData = false;
        this.start += this.pageSize;
        if (this.up) {
          this.orderList.push(...data.data);
        } else if (this.down) {
          this.orderList = [...data.data];
        }
      } else if (data.count == 0) {
        this.noData = true;
        this.showNoMore = false;
        this.orderList = [];
      } else if (data.data.length == 0) {
        this.noData = false;
        this.showNoMore = true;
      }
    }).catch(error => {
      this.loadingShow = false;
      console.log(error);
      this.requestDefeat = true;
    })
  }
  // 选中时间获取订单
  getOrderListByDate() {
    this.start = 0;
    this.down = true;
    this.up = false;
    this.paramsDate = '';
    this.orderList = [];
    if (this.dateStart != '') {
      this.paramsDate += `&dateStart=${this.dateStart}`;
      this.dateEndMin = this.dateStart;
    }
    if (this.dateEnd != '') {
      this.paramsDate += `&dateEnd=${this.dateEnd}`;
      this.dateStartMax = this.dateEnd;
    }
    this.content.scrollTo(0, 0, 0);
    this.getOrderList();
  }
  // 点击状态时切换，获取当前订单状态
  getCurrentStatus(index) {
    this.start = 0;
    this.down = true;
    this.up = false;
    this.paramsStatus = '';
    this.orderList = [];
    this.currentStatus = this.orderStatusList[index].status
    if (this.orderStatusList[index].status != 'all') {
      this.paramsStatus += '&status=' + this.currentStatus
    }
    this.content.scrollTo(0, 0, 0);
    this.getOrderList();
  }
  // 是否显示明细
  showDetail(index) {
    this.isShowDetail[index] = !this.isShowDetail[index];
  }
  // 进入门店所有订单
  goBrandshoOrder() {
    this.navCtrl.push(BrandshopOrderList);
  }
  // 清除开始日期
  clearDateStart() {
    this.dateStart = '';
    this.dateEndMin = '1970';
  }
  // 清除结束日期
  clearDateEnd() {
    this.dateEnd = '';
    this.dateStartMax = new Date().getFullYear() + '-' + (new Date().getMonth() + 1) + '-' + new Date().getDate();
  }

  // 下拉刷新请求数据
  doRefresh(refresher) {
    this.start = 0;
    this.down = true;
    this.up = false;
    setTimeout(() => {
      this.getOrderList();
      refresher.complete();
    }, 1000);
    this.showNoMore = false;
  }

  // 上拉刷新请求数据
  loadMore(infiniteScroll) {
    if (!this.showNoMore) {
      this.down = false;
      this.up = true;
      setTimeout(() => {
        this.getOrderList();
        infiniteScroll.complete();
      }, 1000)
    } else {
      infiniteScroll.complete();
    }
  }

  
  //请求失败后刷新
  requestDefeatRefresh() {
    this.requestDefeat = false;
    this.loadingShow = true;
    this.start = 0;
    this.up = false;
    this.down = true;
    this.getOrderList();
  }
}