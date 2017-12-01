import { Component, ViewChild } from '@angular/core';
import { NavController, ModalController, AlertController, Content } from 'ionic-angular';
import { HandleExpressgift } from '../handle-expressgift/handle-expressgift';
import { AppService, AppConfig } from '../../app/app.service';
@Component({
  selector: 'unhandle-expressgift',
  templateUrl: 'unhandle-expressgift.html'
})
export class UnhandleExpressgift {
	@ViewChild(Content) content: Content;
	unhandleExpressGiftArray: any;
	start: number = 0;
	limit: number = 10;
  showNoMore: Boolean = false;
	noData: Boolean;
	up: Boolean;//上拉刷新和第一次进入页面时
	down: Boolean;//下拉刷新和返回上一级页面时
	load: any = {};
  loadingShow: Boolean = true;
	constructor(public navCtrl: NavController, 
		public modalCtrl: ModalController, 
		public alertCtrl: AlertController,
		public appService: AppService,
	) {
		//请求接口得到数据
		this.down = true;
		this.up = false;
		this.unhandleExpressGiftArray = [];
		this.load = AppConfig.load;
		this.getUnhandleExpressGiftList();
	}
	getUnhandleExpressGiftList() {
		let url = `${AppConfig.API.getGiftList}?brandshopSeq=133&type=1&start=${this.start}&limit=${this.limit}`;//brandshopSeq=${this.brandshopSeqId}
		this.appService.httpGet(url).then( data => {
			this.loadingShow = false;
			console.log(data)
			if (data.count == 0) {
				//空空如也
				this.noData = true;
			}else {
				this.noData = false;
				if( this.start < data.count ) {
					if (this.up) {
						this.unhandleExpressGiftArray.push(...data.data);
						this.start += this.limit;
					}else if (this.down){
						this.unhandleExpressGiftArray = data.data;
						this.start += this.limit;
						this.content.scrollTo(0,0,0); 
					}
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
						}else {
							this.appService.toast('请填写快递信息', 1000, 'middle');
						}
			    }
			  }
			]
		});
		alert.present();
	}

	// 下拉刷新请求数据
	refreshGetUnhandleExpressGiftList(refresher) {
	this.start = 0;
	this.down = true;
	this.up = false;
	let url = `${AppConfig.API.getGiftList}?brandshopSeq=133&type=1&start=${this.start}&limit=${this.limit}`;
    this.appService.httpGet(url).then( data => {
			refresher.complete();
			if (data.count == 0) {
        //空空如也
        this.noData = true;
      }else {
        this.noData = false;
				if (data.data.length != 0) {
					this.unhandleExpressGiftArray = data.data;
					this.start += this.limit;
				}else {
					this.showNoMore = true;
				}
			}
    }).catch(error => {
      refresher.complete();
      console.log(error);
      this.appService.toast('网络异常，请稍后再试', 1000, 'middle');
    });
	}
	infiniteGetUnhandleExpressGiftList(infiniteScroll) {
	// 上拉刷新请求数据
		this.down = false;
		this.up = true;
		let url = `${AppConfig.API.getGiftList}?brandshopSeq=133&type=1&start=${this.start}&limit=${this.limit}`;
		this.appService.httpGet(url).then( data => {
			infiniteScroll.complete();
			if (data.count == 0) {
        //空空如也
        this.noData = true;
      }else {
        this.noData = false;
				if (data.data.length != 0) {
					this.unhandleExpressGiftArray.push(...data.data);
					this.start += this.limit;
				}else {
					this.showNoMore = true;
				}
			}
		}).catch(error => {
			infiniteScroll.complete();
			console.log(error);
			this.appService.toast('网络异常，请稍后再试', 1000, 'middle');
		});
	}
}
