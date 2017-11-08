import { Component, ChangeDetectorRef } from '@angular/core';
import { NavController, NavParams, ModalController, AlertController, ToastController } from 'ionic-angular';
import { HandleSelfgift } from '../handle-selfgift/handle-selfgift';
import { AppService, AppConfig } from '../../app/app.service';
@Component({
  selector: 'unhandle-selfgift',
  templateUrl: 'unhandle-selfgift.html'
})
export class UnhandleSelfgift {
  seflGiftArray: any;
  seflGiftArray1: any;
  page: number = 1;
  constructor(
		public navCtrl: NavController, 
		public modalCtrl: ModalController, 
		public alertCtrl: AlertController, 
		public changeDetectorRef: ChangeDetectorRef, 
		public appConFig: AppConfig, 
		public appService: AppService,
		public toastCtrl: ToastController
	) {
		// ngOnInit() { 请求数据 }
		this.seflGiftArray = [
			{
				id: 1,
				name: "爱法呗赠品小马甲",
				memberPhone: "12131415161",
				subscribePhone: "222222222",
				getTime: "2017.09.27 23:59",
				subscribeArriveTime: "",
				imgUrl: "../assets/image/productimg.png",
				subscribeState: "1",//1: 预约兑换，2: 预约成功，3: 到店兑换
				subscribeAffirmState: true
			}, {
				id: 2,
				name: "爱法呗赠品小马甲",
				memberPhone: "",
				subscribePhone: "222222222",
				getTime: "2017.08.27 23:59",
				subscribeArriveTime: "",
				imgUrl: "../assets/image/productimg.png",
				subscribeState: "3",
				subscribeAffirmState: true
			}, {
				id: 3,
				name: "爱法呗赠品小马甲",
				memberPhone: "12131415161",
				subscribePhone: "222222222",
				getTime: "2017.10.27 23:59",
				subscribeArriveTime: "",
				imgUrl: "../assets/image/productimg.png",
				subscribeState: "1",
				subscribeAffirmState: true
			}, {
				id: 4,
				name: "爱法呗赠品小马甲",
				memberPhone: "12131415161",
				subscribePhone: "222222222",
				getTime: "2017.06.27 23:59",
				subscribeArriveTime: "2017.09.28 13:59",
				imgUrl: "../assets/image/productimg.png",
				subscribeState: "2",
				subscribeAffirmState: true
			},
			{
				id: 5,
				name: "爱法呗赠品小马甲",
				memberPhone: "12131415161",
				subscribePhone: "222222222",
				getTime: "2017.06.27 23:59",
				subscribeArriveTime: "2017.09.28 13:59",
				imgUrl: "../assets/image/productimg.png",
				subscribeState: "2",
				subscribeAffirmState: true
			}
			
		]
	}
  goSelfgift() {
	  const orderModal = this.modalCtrl.create(HandleSelfgift);
	  orderModal.present();
  }
  clearSubscribeArriveTime(index) {
    this.seflGiftArray[index].subscribeArriveTime = "";
  }
  subscribeAffirm(index) {
	if (this.seflGiftArray[index].subscribeArriveTime) {
		this.seflGiftArray[index].subscribeState = "2";
		this.changeDetectorRef.detectChanges();
	} else {
		let toast = this.toastCtrl.create({
			message: '请选择会员预约到店时间',
			duration: 2000,
			position: 'middle'
		});

		toast.present(toast);
	}

	// 预约确认更改数据
	//let url = AppConfig.API.;
    //let body = {
    //  id: this.seflGiftArray[index].id,
    //  subscribeState: this.seflGiftArray[index].subscribeState
    //}
    //this.appService.httpPost(url, body).then(data => {
    //  if (data.success) {
    //   this.seflGiftArray = data;
    //  }
    //}).catch(error => {
    //  console.log(error);
    //});
	
	// 预约确认请求数据
	// let url = this.appConFig.API.;page=1
	// this.appService.httpGet(url).then( data => {
    //   this.seflGiftArray = data;
	// }).catch(error => {
    //  console.log(error);
    // });
	}
	getSubscribeAffirmState(index) {
		console.log(index);
		if(this.seflGiftArray[index].subscribeArriveTime) {
			this.seflGiftArray[index].subscribeAffirmState = false;
		}
	}
	doRefreshGetSelfGiftList(refresher) {
	// 下拉刷新请求数据
	// let url = this.appConFig.API.;page
	// this.appService.httpGet(url).then( data => {
	// 	if(data){
	// 		this.seflGiftArray = data;
	// 		refresher.complete();
	// 	}
	// }).catch(error => {
    //   console.log(error);
    // });
	}
	doInfiniteGetSelfGiftList(infiniteScroll) {
	// 上拉刷新请求数据（注意记录一下高度，回到当前位置）
	// let url = this.appConFig.API.;page++
	// this.appService.httpGet(url).then( data => {
	// 	if(data){
	// 		this.seflGiftArray = data;
	// 		infiniteScroll.complete();
	// 	}
	// }).catch(error => {
    //   console.log(error);
    // });
	}
}
