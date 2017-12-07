import { Component, ViewChild } from '@angular/core';
import { NavController, Content, Events } from 'ionic-angular';
import { BrandshopOrderList } from '../brandshop-order-list/brandshop-order-list';
import { AppService, AppConfig } from '../../app/app.service';
@Component({
  selector: 'order-list',
  templateUrl: 'order-list.html'
})

export class OrderList {
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
  noData: Boolean = false;
  start: number = 0;
  showNoMore: Boolean = false;
  loadingShow: Boolean = true;
  load: any = {};
  dateEndMin = '1970'; //结束日期的最小值
  dateEndMax: string; //结束日期的最大值
  dateStartMax: string; //开始日期的最大值
  requestDefeat: Boolean = false;
  showInfinite: Boolean = true;
  constructor(
    public navCtrl: NavController,
    public appService: AppService,
    public events: Events) {
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
      label: "已完成",
      status: 'C'
    }];
    this.load = AppConfig.load;
  }
  // 每次进入页面的时候都会执行
  ionViewDidEnter(){
    this.start = 0;
    this.paramsDate = '';
    this.paramsStatus = '';
    this.dateStart = '';
    this.dateEnd = '';
    this.dateStartMax = this.appService.reserveDate();
    this.dateEndMax = this.appService.reserveDate();
    this.currentStatus = this.orderStatusList[0].status;
    this.events.subscribe('order:status', (orderStatus) => {
      console.log('subscribe events');
      this.currentStatus = orderStatus;
      this.paramsStatus += '&status=' + orderStatus;
    });
    this.orderList = [];
    this.getOrderList();
  }
  // 每次离开页面的时候执行
  ionViewDidLeave(){
    this.events.unsubscribe('order:status', () => {
      console.log('did unsubscribe');
    });
  }
  // 获取订单列表
  getOrderList() {
    this.loadingShow = true;
    this.noData = false;
    this.requestDefeat = false;
    this.showNoMore = false;
    this.showInfinite = true;
    var url = `${AppConfig.API.getOrderList}?userType=A&start=${this.start}&limit=${this.pageSize}`;
    if (this.paramsDate != '')
      url += this.paramsDate;
    if (this.paramsStatus != '')
      url += this.paramsStatus;
    this.appService.httpGet(url).then(data => {
      this.loadingShow = false;
      if (this.start < data.count) {
        this.start += this.pageSize;
        this.orderList.push(...data.data);
        for (let i = 0; i < this.orderList.length; i++) {
          this.isShowDetail[i] = false;
        }
      } else if (data.count == 0) {
        this.noData = true;
      }
    }).catch(error => {
      this.orderList = [];
      this.loadingShow = false;
      this.showInfinite = false;
      this.requestDefeat = true;
      console.log(error);
    })
  }
  // 通过日期获取订单
  getOrderListByDate() {
    this.start = 0;
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
  // 点击状态时切换当前订单列表
  getCurrentStatus(index) {
    this.start = 0;
    this.paramsStatus = '';
    this.orderList = [];
    this.currentStatus = this.orderStatusList[index].status
    if (this.orderStatusList[index].status != 'all') {
      this.paramsStatus += '&status=' + this.currentStatus
    }
    this.getOrderList();
    this.content.scrollTo(0, 0, 0);
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
    this.dateStartMax = this.appService.reserveDate();;
  }

  // 下拉刷新请求数据
  doRefresh(refresher) {
    this.showNoMore = false;
    this.requestDefeat = false;
    this.noData = false;
    this.start = 0;
    this.orderList = [];
    setTimeout(() => {
      this.getOrderList();
      refresher.complete();
    }, AppConfig.LOAD_TIME);
  }

  // 上拉加载更多 请求数据
  loadMore(infiniteScroll) {
    let url = `${AppConfig.API.getOrderList}?userType=A&start=${this.start}&limit=${this.pageSize}`;
    if (this.paramsDate != '')
      url += this.paramsDate;
    if (this.paramsStatus != '')
      url += this.paramsStatus;
    this.appService.httpGet(url).then(data => {
      infiniteScroll.complete();
      if (this.start < data.count) {
        this.orderList.push(...data.data);
        this.start += this.pageSize;
        for (let i = 0; i < this.orderList.length; i++) {
          this.isShowDetail[i] = false;
        }
      } else if (data.data.length == 0) {
        this.showInfinite = false;
        this.showNoMore = true;
      }
    }).catch(error => {
      this.showInfinite = false;
      infiniteScroll.complete();
      this.appService.toast('网络异常，请稍后再试', 1000, 'middle');
      console.log(error);
    })
  }

  //请求失败后刷新
  requestDefeatRefresh() {
    this.requestDefeat = false;
    this.loadingShow = true;
    this.start = 0;
    this.orderList = [];
    this.getOrderList();
  }

}