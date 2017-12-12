import { Component, ViewChild } from '@angular/core';
import { NavController, AlertController, Content } from 'ionic-angular';
import { AppService, AppConfig } from '../../app/app.service';
@Component({
  selector: 'handle-expressgift',
  templateUrl: 'handle-expressgift.html'
})
export class HandleExpressgift {
  @ViewChild(Content) content: Content;
  handleExpressGiftArray: any;
  start: number = 0;
  limit: number = 10;
  showNoMore: Boolean = false;
  noData: Boolean;
  up: Boolean;//上拉刷新和第一次进入页面时
  down: Boolean;//下拉刷新和返回上一级页面时
  load: any = {};
  loadingShow: Boolean = true;
  requestDefeat: Boolean = false;
  showInfinite: Boolean = false;
  constructor(
    public navCtrl: NavController,
    public alertCtrl: AlertController,
    public appService: AppService,
  ) {
    // 获取已兑换快递赠品列表
    this.down = true;
    this.up = false;
    this.load = AppConfig.load;
    this.getHandleExpressGiftList()
  }
  getHandleExpressGiftList() {
    let url = `${AppConfig.API.getGiftList}?type=1&start=${this.start}&limit=${this.limit}`;
    this.appService.httpGet(url).then(data => {
      this.loadingShow = false;
      if (data.count == 0) {
        //空空如也
        this.noData = true;
      } else {
        this.noData = false;
        this.showInfinite = true;
        if (this.start < data.count) {
          if (this.up) {
            this.handleExpressGiftArray.push(...data.data);
            this.start += this.limit;
          } else if (this.down) {
            this.handleExpressGiftArray = data.data;
            this.start += this.limit;
            this.content.scrollTo(0, 0, 0);
          }
        } else {
          this.showNoMore = true;
        }
      }
    }).catch(error => {
      this.appService.getToken(error, () => {
				this.getHandleExpressGiftList();
			});
      this.handleExpressGiftArray = [];
      this.loadingShow = false;
      console.log(error);
      this.showInfinite = false;
      this.requestDefeat = true;
    });
  }

  // 下拉刷新请求数据
  refreshGetHandleExpressGiftList(refresher) {
    this.start = 0;
    this.down = true;
    this.up = false;
    let url = `${AppConfig.API.getGiftList}?type=3&start=${this.start}&limit=${this.limit}`;
    this.appService.httpGet(url).then(data => {
      refresher.complete();
      if (data.count == 0) {
        //空空如也
        this.noData = true;
      } else {
        this.noData = false;
        this.showInfinite = true;
        if (data.data.length != 0) {
          this.handleExpressGiftArray = data.data;
          this.start += this.limit;
        } else {
          this.showNoMore = true;
        }
      }
    }).catch(error => {
      this.appService.getToken(error, () => {
				this.refreshGetHandleExpressGiftList(refresher);
			});
      this.handleExpressGiftArray = [];
      refresher.complete();
      console.log(error);
      this.showInfinite = false;
      this.requestDefeat = true;
    });
  }

  // 上拉刷新请求数据
  infiniteGetHandleExpressGiftList(infiniteScroll) {
    this.down = false;
    this.up = true;
    let url = `${AppConfig.API.getGiftList}?type=3&start=${this.start}&limit=${this.limit}`;
    this.appService.httpGet(url).then(data => {
      infiniteScroll.complete();
      if (data.count == 0) {
        //空空如也
        this.noData = true;
      } else {
        this.noData = false;
        if (data.data.length != 0) {
          this.handleExpressGiftArray.push(...data.data);
          this.start += this.limit;
        } else {
          this.showNoMore = true;
        }
      }
    }).catch(error => {
      this.appService.getToken(error, () => {
				this.infiniteGetHandleExpressGiftList(infiniteScroll);
			});
      infiniteScroll.complete();
      console.log(error);
      this.appService.toast('网络异常，请稍后再试', 1000, 'middle');
    });
  }

  //请求失败后刷新
  requestDefeatRefresh() {
    this.requestDefeat = false;
    this.loadingShow = true;
    this.start = 0;
    this.down = true;
    this.up = false;
    this.getHandleExpressGiftList();
  }
}
