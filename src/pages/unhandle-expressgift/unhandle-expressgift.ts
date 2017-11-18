import { Component, ViewChild } from '@angular/core';
import { NavController, NavParams, ModalController, AlertController, ToastController, Content } from 'ionic-angular';
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
    showNoMoreGift: Boolean = false;
	noData: Boolean;
	up: Boolean;//上拉刷新和第一次进入页面时
	down: Boolean;//下拉刷新和返回上一级页面时
	constructor(public navCtrl: NavController, 
		public modalCtrl: ModalController, 
		public alertCtrl: AlertController,
		public appService: AppService,
		public toastCtrl: ToastController
	) {
		//请求接口得到数据
		this.down = true;
		this.up = false;
		this.unhandleExpressGiftArray = [];
		this.getUnhandleExpressGiftList();
	}
	getUnhandleExpressGiftList() {
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
						this.unhandleExpressGiftArray.push(...data.data);
						this.start += this.limit;
					}else if (this.down){
						this.unhandleExpressGiftArray = [...data.data];
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
				let toast = this.toastCtrl.create({
				message: '网络异常，请稍后再试',
				duration: 1000,
				position: 'middle'
			});
			toast.present(toast);
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
					if (data.companyName!="" && data.orderNum!=""){
						let body = {
							memberGiftAccountSeq: this.unhandleExpressGiftArray[index].memberGiftAccountSeq,
							expressCompany: data.companyName,
							expressNo: data.orderNum
						}
						console.log(body)
						let url = AppConfig.API.confirmExpressInfo;
						console.log(url)
						this.appService.httpPost(url, body).then( data => {
							console.log(data)
							if (data.type =="success") {
								this.start = 0;
								this.down = true;
								this.up = false;
								this.getUnhandleExpressGiftList();
							}
						}).catch(error => {
							console.log(error);
							let toast = this.toastCtrl.create({
								message: '操作失败，请稍后重试！',
								duration: 1000,
								position: 'middle'
							});
							toast.present(toast);
						});
					}else if (data.companyName!="") {
						let toast = this.toastCtrl.create({
							message: '请填写公司名称',
							duration: 1000,
							position: 'middle'
						});
						toast.present(toast);
					}else if (data.orderNum!="") {
						let toast = this.toastCtrl.create({
							message: '请填写快递单号',
							duration: 1000,
							position: 'middle'
						});
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
      if (data.totalRecord == 0) {
        //空空如也
        this.noData = true;
      }else {
        this.noData = false;
        if( this.start < data.totalRecord ) {
          if (this.up) {
            this.unhandleExpressGiftArray.push(...data.data);
            this.start += this.limit;
          }else if (this.down){
            this.unhandleExpressGiftArray = [...data.data];
            this.start += this.limit;
          }
        }else {
          this.showNoMoreGift = true;
        }
      }
    }).catch(error => {
      refresher.complete();
      console.log(error);
        let toast = this.toastCtrl.create({
        message: '网络异常，请稍后再试',
        duration: 1000,
        position: 'middle'
      });
      toast.present(toast);
    });
	}
	infiniteGetUnhandleExpressGiftList(infiniteScroll) {
	// 上拉刷新请求数据
		this.down = false;
		this.up = true;
		let url = `${AppConfig.API.getGiftList}?brandshopSeq=133&type=1&start=${this.start}&limit=${this.limit}`;
		this.appService.httpGet(url).then( data => {
			infiniteScroll.complete();
			if (data.totalRecord == 0) {
				//空空如也
				this.noData = true;
			}else {
				this.noData = false;
			if( this.start < data.totalRecord ) {
				if (this.up) {
				this.unhandleExpressGiftArray.push(...data.data);
				this.start += this.limit;
				}else if (this.down){
				this.unhandleExpressGiftArray = [...data.data];
				this.start += this.limit;
				}
			}else {
				this.showNoMoreGift = true;
			}
			}
		}).catch(error => {
			infiniteScroll.complete();
			console.log(error);
			let toast = this.toastCtrl.create({
			message: '网络异常，请稍后再试',
			duration: 1000,
			position: 'middle'
			});
			toast.present(toast);
		});
	}
}
