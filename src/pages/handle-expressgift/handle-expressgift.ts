import { Component, ViewChild } from '@angular/core';
import { NavController, NavParams, AlertController, Content } from 'ionic-angular';
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
  showNoMoreGift: Boolean = false;
  noData: Boolean;
  up: Boolean;//上拉刷新和第一次进入页面时
  down: Boolean;//下拉刷新和返回上一级页面时
	constructor(
		public navCtrl: NavController, 
		public alertCtrl: AlertController,
		public appService: AppService,
	) {
	// 获取已兑换快递赠品列表
	this.down = true;
	this.up = false;
    this.getHandleExpressGiftList()
  }
  getHandleExpressGiftList() {
	let loading = this.appService.loading();
	loading.present();
	let url = `${AppConfig.API.getGiftList}?brandshopSeq=133&type=1&start=${this.start}&limit=${this.limit}`;//brandshopSeq=${this.brandshopSeqId}
	this.appService.httpGet(url).then( data => {
		loading.dismiss();
		console.log(data)
		if (data.totalRecord == 0) {
			//空空如也
			this.noData = true;
		}else {
			this.noData = false;
			if( this.start < data.totalRecord ) {
				if (this.up) {
					this.handleExpressGiftArray.push(...data.data);
					this.start += this.limit;
				}else if (this.down){
					this.handleExpressGiftArray = data.data;
					this.start += this.limit;
					this.content.scrollTo(0,0,0); 
				}
			}else {
				this.showNoMoreGift = true;
			}
		}
	}).catch(error => {
		loading.dismiss();
		console.log(error);
		this.appService.toast('网络异常，请稍后再试', 1000, 'middle');
	});
  }

  // 下拉刷新请求数据
  refreshGetHandleExpressGiftList(refresher) {
	this.start = 0;
	this.down = true;
	this.up = false;
	let url = `${AppConfig.API.getGiftList}?brandshopSeq=133&type=1&start=${this.start}&limit=${this.limit}`;
    this.appService.httpGet(url).then( data => {
      refresher.complete();
      if (data.totalRecord == 0) {
        //空空如也
        this.noData = true;
      }else {
        this.noData = false;
        if( this.start < data.totalRecord ) {
          if (this.up) {
            this.handleExpressGiftArray.push(...data.data);
            this.start += this.limit;
          }else if (this.down){
            this.handleExpressGiftArray = data.data;
            this.start += this.limit;
          }
        }else {
          this.showNoMoreGift = true;
        }
      }
    }).catch(error => {
      refresher.complete();
      console.log(error);
			this.appService.toast('网络异常，请稍后再试', 1000, 'middle');
    });
  }

  // 上拉刷新请求数据
  infiniteGetHandleExpressGiftList(infiniteScroll) {
	this.down = false;
	this.up = true;
	let url = `${AppConfig.API.getGiftList}?brandshopSeq=133&type=1&start=${this.start}&limit=${this.limit}`;
	this.appService.httpGet(url).then( data => {
		infiniteScroll.complete();
		if (data.data.length != 0) {
			this.handleExpressGiftArray.push(...data.data);
			this.start += this.limit;
		}else {
			this.showNoMoreGift = true;
		}
	}).catch(error => {
		infiniteScroll.complete();
		console.log(error);
		this.appService.toast('网络异常，请稍后再试', 1000, 'middle');
	});
  }
}
