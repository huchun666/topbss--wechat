import { Component, ViewChild, NgZone } from '@angular/core';
import { NavController, NavParams, AlertController, Content, ModalController } from 'ionic-angular';
import { UnhandleSelfgift } from '../unhandle-selfgift/unhandle-selfgift';
import { UnhandleExpressgift } from '../unhandle-expressgift/unhandle-expressgift';
import { AppService, AppConfig } from '../../app/app.service';
import { HandleSelfgift } from '../handle-selfgift/handle-selfgift';
import { HandleExpressgift } from '../handle-expressgift/handle-expressgift';
@Component({
  selector: 'unhandle-tabs',
  templateUrl: 'unhandle-tabs.html'
})
export class UnhandleTabs {
  @ViewChild(Content) content: Content;
  selfGiftCount: string;
  expressGiftCount: string;
  currentStatus: any;
  statusList: any;
  unhandleSeflGiftArray: any = [];
  unhandleExpressGiftArray: any = [];
  limit: number = 10;
  up: Boolean = false;
  down: Boolean = true;
  noData: Boolean = false;
  start: number = 0;
  showNoMore: Boolean = false;
  load: any = {};
  loadingShow: Boolean = true;
  currentIndex = 0;
	toTop: Boolean;//是否显示返回顶部按钮
  constructor(
    public navCtrl: NavController,
    public alertCtrl: AlertController,
    public navParams: NavParams,
    public appService: AppService,
    public modalCtrl: ModalController,
    public zone: NgZone
  ) {
    this.start = 0;
    this.down = true;
    this.up = false;
    this.load = AppConfig.load;
    this.currentStatus = '到店自提赠品'
    this.selfGiftCount = navParams.get('selfGiftCount'); //自提赠品数量
    this.expressGiftCount = navParams.get('expressGiftCount'); //快递赠品数量
    this.statusList = [{
      label: '到店自提赠品',
      num: this.selfGiftCount
    }, {
      label: '快递到家赠品',
      num: this.expressGiftCount
    }];
    // 获取待审核取消订单
    this.getUnhandleSelfGiftList();
  }

  // 获取自提赠品
  getUnhandleSelfGiftList(){
    this.loadingShow = true;
    this.showNoMore = false;
    this.noData = false;
    let url = `${AppConfig.API.getGiftList}?brandshopSeq=133&type=0&start=${this.start}&limit=${this.limit}`;
    this.appService.httpGet(url).then(data => {
      this.loadingShow = false;
      this.statusList[this.currentIndex].num = data.totalRecord;
      if (this.start < data.totalRecord) {
        this.showNoMore = false;
        this.noData = false;
        this.start += this.limit;
        if (this.up) {
          this.unhandleSeflGiftArray.push(...data.data);
        } else if (this.down) {
          this.unhandleSeflGiftArray = [...data.data];
        }
        this.addOrderStatusClass(this.unhandleSeflGiftArray);
      } else if (data.totalRecord == 0) {
        this.noData = true;
        this.showNoMore = false;
        this.unhandleSeflGiftArray = [];
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
  // 查看已完成的自提
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
  
  // 获取快递赠品
  getUnhandleExpressGiftList(){
    this.loadingShow = true;
    this.showNoMore = false;
    this.noData = false;
    let url = `${AppConfig.API.getGiftList}?brandshopSeq=133&type=1&start=${this.start}&limit=${this.limit}`;
    this.appService.httpGet(url).then(data => {
      this.loadingShow = false;
      this.statusList[this.currentIndex].num = data.totalRecord;
      if (this.start < data.totalRecord) {
        this.showNoMore = false;
        this.noData = false;
        this.start += this.limit;
        if (this.up) {
          this.unhandleExpressGiftArray.push(...data.data);
        } else if (this.down) {
          this.unhandleExpressGiftArray = [...data.data];
        }
        this.addOrderStatusClass(this.unhandleExpressGiftArray);
      } else if (data.totalRecord == 0) {
        this.noData = true;
        this.showNoMore = false;
        this.unhandleExpressGiftArray = [];
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
  
	goExpressgift() {
		const orderModal = this.modalCtrl.create(HandleExpressgift);
		orderModal.onDidDismiss(() => {
		// 返回自提赠品页重新请求接口，渲染页面
			this.start = 0;
			this.down = true;
			this.up = false;
			this.getUnhandleExpressGiftList();
		})
		orderModal.present();
	}
	sendProduct(index) {
		let alert = this.alertCtrl.create({
			message: '赠品发货确认',
			inputs: [
		      {
		        name: 'companyName',
		        type: 'text',
		        placeholder: '请在此输入快递公司名称'
		      },{
		        name: 'orderNum',
		        type: 'text',
		        placeholder: '请在此输入快递单号'
		      }
			],
			buttons: [
			  {
			    text: '取消',
			    handler: () => {
			      //点击取消后的执行代码
			    }
			  },
			  {
			    text: '确认',
			    handler: data => {
						if (data.companyName != "" && data.orderNum != ""){
							let body = {
								memberGiftAccountSeq: this.unhandleExpressGiftArray[index].memberGiftAccountSeq,
								expressCompany: data.companyName,
								expressNo: data.orderNum
							}
							let loading = this.appService.loading();
							loading.present();
							let url = AppConfig.API.confirmExpressInfo;
							this.appService.httpPost(url, body).then( data => {
								if (data.type == "success") {
									this.start = 0;
									this.down = true;
									this.up = false;
									loading.dismiss();
									this.getUnhandleExpressGiftList();
								}
							}).catch(error => {
								loading.dismiss();
								console.log(error);
								this.appService.toast('网络异常，请稍后再试', 1000, 'middle');
							});
						}else if (data.companyName != "") {
							this.appService.toast('网络异常，请稍后再试', 1000, 'middle');
						}else if (data.orderNum != "") {
							this.appService.toast('请填写快递单号', 1000, 'middle');
						}
			    }
			  }
			]
		});
		alert.present();
	}

  // 下拉刷新请求数据
  doRefresh(refresher) {
    this.start = 0;
    this.down = true;
    this.up = false;
    setTimeout(() => {
      if (this.currentIndex == 0) {
        this.getUnhandleSelfGiftList();
      } else {
        this.getUnhandleExpressGiftList();
      }
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
        if (this.currentIndex == 0) {
          this.getUnhandleSelfGiftList();
        } else {
          this.getUnhandleExpressGiftList();
        }
        infiniteScroll.complete();
      }, 1000)
    } else {
      infiniteScroll.complete();
    }
  }

  // 切换tab标签
  getCurrentStatus(index) {
    this.start = 0;
    this.up = false;
    this.down = true;
    this.content.scrollTo(0, 0, 0);
    this.currentStatus = this.statusList[index].label;
    this.currentIndex = index;
    if (this.currentIndex == 0) {
      this.getUnhandleSelfGiftList();
    } else {
      this.getUnhandleExpressGiftList();
    }
  }
}