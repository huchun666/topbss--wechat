import { Component, ChangeDetectorRef, ViewChild, NgZone } from '@angular/core';
import { NavController, NavParams, ModalController, AlertController, Content } from 'ionic-angular';
import { HandleSelfgift } from '../handle-selfgift/handle-selfgift';
import { AppService, AppConfig } from '../../app/app.service';
@Component({
  selector: 'unhandle-selfgift',
  templateUrl: 'unhandle-selfgift.html'
})
export class UnhandleSelfgift {
  @ViewChild(Content) content: Content;
  unhandleSeflGiftArray: any;
  start: number = 0;
  limit: number = 10;
  showNoMore: Boolean = false;
  noData: Boolean;
  up: Boolean;//上拉刷新和第一次进入页面时
  down: Boolean;//下拉刷新和返回上一级页面时
	toTop: Boolean;//是否显示返回顶部按钮
	load: any = {};
  loadingShow: Boolean = true;
  constructor(
	public navCtrl: NavController, 
	public modalCtrl: ModalController, 
	public alertCtrl: AlertController, 
	public changeDetectorRef: ChangeDetectorRef, 
	public appService: AppService,
	public zone: NgZone
  ) {
	this.unhandleSeflGiftArray = [];
	this.down = true;
	this.up = false;
	this.load = AppConfig.load;
	this.getUnhandleSelfGiftList();
  }
  addOrderStatusClass(param: any) {
    param.map(function(item) {
			if (item.giftType == '0' && item.status == '2') {
				item.className = 'unstart';
			} else if (item.giftType == '1') {
				item.className = 'unstart';
			} else {
				item.className = 'success';
			}
		});
  }
  getUnhandleSelfGiftList() {
		let url = `${AppConfig.API.getGiftList}?brandshopSeq=133&type=0&start=${this.start}&limit=${this.limit}`;//brandshopSeq=${this.brandshopSeqId}
		this.appService.httpGet(url).then( data => {
			this.loadingShow = false;
			if (data.totalRecord == 0) {
				//空空如也
				this.noData = true;
			}else {
				this.noData = false;
				if( this.start < data.totalRecord ) {
					if (this.up) {
						this.unhandleSeflGiftArray.push(...data.data);
						this.start += this.limit;
					}else if (this.down){
						this.unhandleSeflGiftArray = data.data;
						this.start += this.limit;
						this.content.scrollTo(0,0,0); 
					}
					this.addOrderStatusClass(this.unhandleSeflGiftArray);
				}else {
					this.showNoMore = true;
				}
			}
		}).catch(error => {
			this.loadingShow = false;
			console.log(error);
			this.appService.toast('网络异常，请稍后再试', 1000, 'middle');
		});
  }

  goSelfgift() {
		const orderModal = this.modalCtrl.create(HandleSelfgift);
		orderModal.onDidDismiss(() => {
			// 返回自提赠品页重新请求接口，渲染页面
			this.start = 0;
			this.down = true;
			this.up = false;
			this.getUnhandleSelfGiftList();
		})
		orderModal.present();
  }

  clearReserveArriveTime(index) {
    this.unhandleSeflGiftArray[index].reserveShopTime = "";
  }

  reserveAffirm(index) {
		if (this.unhandleSeflGiftArray[index].reserveShopTime != null) {
			// 预约确认更改数据
			let body = {
				memberGiftAccountSeq: this.unhandleSeflGiftArray[index].memberGiftAccountSeq,
				reserveShopTime: new Date(this.unhandleSeflGiftArray[index].reserveShopTime).getTime()
			}
			let loading = this.appService.loading();
			loading.present();
			let url = AppConfig.API.confirmReserveShopTime;
			this.appService.httpPost(url, body).then( data => {
				if (data.type == "success") {
					this.start = 0;
					this.down = true;
					this.up = false;
					loading.dismiss();
					this.getUnhandleSelfGiftList();
				}
			}).catch(error => {
				loading.dismiss();
				console.log(error.message);
				this.appService.toast('操作失败，请稍后重试', 1000, 'middle');
			});
		} else {
			this.appService.toast('请选择会员预约到店时间', 1000, 'middle');
		}
  }

  refreshGetUnhandleSelfGiftList(refresher) {
	// 下拉刷新请求数据
		this.start = 0;
		this.down = true;
		this.up = false;
		let url = `${AppConfig.API.getGiftList}?brandshopSeq=133&type=0&start=${this.start}&limit=${this.limit}`;
		this.appService.httpGet(url).then( data => {
			refresher.complete();
			if (data.data.length != 0) {
				this.unhandleSeflGiftArray = data.data;
				this.start += this.limit;
				this.addOrderStatusClass(this.unhandleSeflGiftArray);
			}else {
				this.showNoMore = true;
			}
		}).catch(error => {
			refresher.complete();
			console.log(error);
			this.appService.toast('网络异常，请稍后再试', 1000, 'middle');
		});
  }

  infiniteGetUnhandleSelfGiftList(infiniteScroll) {
	// 上拉刷新请求数据
		this.down = false;
		this.up = true;
		let url = `${AppConfig.API.getGiftList}?brandshopSeq=133&type=0&start=${this.start}&limit=${this.limit}`;
		this.appService.httpGet(url).then( data => {
			infiniteScroll.complete();
			if (data.data.length != 0) {
				this.unhandleSeflGiftArray.push(...data.data);
				this.start += this.limit;
				this.addOrderStatusClass(this.unhandleSeflGiftArray);
			}else {
				this.showNoMore = true;
			}
		}).catch(error => {
			infiniteScroll.complete();
			console.log(error);
			this.appService.toast('网络异常，请稍后再试', 1000, 'middle');
		});
  }
  
  //回到顶部
  scrollTo() {
		this.content.scrollTo(0, 0, 300);
  }

  //获取当前距离顶部位置
  scrollHandler(event) {
		this.zone.run(() => {
			if (event.scrollTop >= 300) {
			this.toTop = true;
			}else {
			this.toTop = false;
			}
		})
  }
}
