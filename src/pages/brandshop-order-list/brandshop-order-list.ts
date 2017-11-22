import { Component, ViewChild } from '@angular/core';
import { NavController, NavParams, Content } from 'ionic-angular';
import { AppService, AppConfig } from '../../app/app.service';
@Component({
  selector: 'order-list',
  templateUrl: 'brandshop-order-list.html'
})
export class BrandshopOrderList {
  @ViewChild(Content) content: Content;
  dateStart: string = '';
  dateEnd: string = '';
  isShowDetail: boolean = false;
  orderList = [];
  orderStatusList: any;
  currentStatus: any;
  currentPage: number = 1;
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
    // '加载中'提示定义
    this.load = {
      spinner: 'dots',
      content: '加载中'
    }
    this.currentStatus = this.orderStatusList[0].status;
    this.getOrderList();
  }

  // 获取订单列表
  getOrderList() {
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
      this.appService.toast('网络异常，请稍后再试', 1000, 'middle');
    })
  }
  // 选中时间获取订单
  getOrderListByDate() {
    this.start = 0;
    this.down = true;
    this.up = false;
    this.paramsDate = '';
    if (this.dateStart != '') {
      this.paramsDate += `&dateStart=${this.dateStart}`;
    }
    if (this.dateEnd != '') {
      this.paramsDate += `&dateEnd=${this.dateEnd}`;
    }
    this.content.scrollTo(0, 0, 0);
    this.getOrderList();
  }
  // 点击状态时切换，获取当前订单状态
  getCurrentStatus(index) {
    this.start = 0;
    this.down = true;
    this.up = false;
    this.paramsStatus = ''
    this.currentStatus = this.orderStatusList[index].status
    if (this.orderStatusList[index].status != 'all') {
      this.paramsStatus += '&status=' + this.currentStatus
    }
    this.content.scrollTo(0, 0, 0);
    this.getOrderList();
  }
  // 是否显示明细
  showDetail() {
    this.isShowDetail = !this.isShowDetail;
  }
  // 进入门店所有订单
  goBrandshoOrder() {
    this.navCtrl.push(BrandshopOrderList);
  }
  // 清除开始日期
  clearDateStart() {
    this.dateStart = '';
  }
  // 清除结束日期
  clearDateEnd() {
    this.dateEnd = '';
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
}