import { Component} from '@angular/core';
import { NavController, NavParams, ModalController, AlertController, ToastController } from 'ionic-angular';
import { HandleExpressgift } from '../handle-expressgift/handle-expressgift';
import { AppService, AppConfig } from '../../app/app.service';
@Component({
  selector: 'unhandle-expressgift',
  templateUrl: 'unhandle-expressgift.html'
})
export class UnhandleExpressgift {
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
		//this.down = true;
		//this.up = false;
		//getUnhandleExpressGiftList();
		this.unhandleExpressGiftArray = [
			{
				"memberGiftAccountSeq": 260,
				"giftSeq": 11,
				"giftCode": "COUPON00020154",
				"giftName": "爱法呗赠品小马甲1",
				"giftType": "2",
				"imageName": "../assets/image/productimg.png",
				"giftRemark": "1.适用年龄：0-2岁 2.课程总共4节 5.需提前预约，再到店兑换使用",
				"brandshopSeq": 133,
				"brandshopName": "1001夜杭州旗舰店",
				"startDate": 1492706727000,
				"endDate": 1493916327000,
				"status": "4",
				"receiveDate": 1492706727000,
				"useDate": 1492713204000,
				"memberSeq": 435,
				"memberPhone": "18366155533",
				"reservePhone": null,
				"reserveShopTime": null,
				"expressCompany": null,
				"expressNo": null,
				"deliveryTime": null,
				"brandshopUserSeq": null,
				"brandshopUserName": null,
				"attrValueList": [
					{
						"memberGiftAccountId": 457,
						"attrId": 1,
						"label": "家长姓名",
						"name": "receiverName",
						"value": "家长1"
					},
					{
						"memberGiftAccountId": 457,
						"attrId": 10,
						"label": "家长手机号",
						"name": "detailAddress",
						"value": "1388888888"
					},
					{
						"memberGiftAccountId": 457,
						"attrId": 10,
						"label": "宝宝姓名",
						"name": "detailAddress",
						"value": "宝宝1"
					},
					{
						"memberGiftAccountId": 457,
						"attrId": 10,
						"label": "宝宝身高",
						"name": "detailAddress",
						"value": "120"
					},
					{
						"memberGiftAccountId": 457,
						"attrId": 10,
						"label": "宝宝证件号",
						"name": "detailAddress",
						"value": "32099999999999999"
					},
				], 
			},
			{
				"memberGiftAccountSeq": 260,
				"giftSeq": 11,
				"giftCode": "COUPON00020154",
				"giftName": "爱法呗赠品小马甲2",
				"giftType": "2",
				"imageName": "../assets/image/productimg.png",
				"giftRemark": "1.适用年龄：0-2岁 2.课程总共4节 5.需提前预约，再到店兑换使用",
				"brandshopSeq": 133,
				"brandshopName": "1001夜杭州旗舰店",
				"startDate": 1492706727000,
				"endDate": 1493916327000,
				"status": "4",
				"receiveDate": 1492706727000,
				"useDate": 1492713204000,
				"memberSeq": 435,
				"memberPhone": "18366155533",
				"reservePhone": null,
				"reserveShopTime": null,
				"expressCompany": null,
				"expressNo": null,
				"deliveryTime": null,
				"brandshopUserSeq": null,
				"brandshopUserName": null,
				"attrValueList": [
					{
						"memberGiftAccountId": 457,
						"attrId": 1,
						"label": "家长姓名",
						"name": "receiverName",
						"value": "家长1"
					},
					{
						"memberGiftAccountId": 457,
						"attrId": 10,
						"label": "家长手机号",
						"name": "detailAddress",
						"value": "1388888888"
					},
					{
						"memberGiftAccountId": 457,
						"attrId": 10,
						"label": "宝宝姓名",
						"name": "detailAddress",
						"value": "宝宝1"
					},
					{
						"memberGiftAccountId": 457,
						"attrId": 10,
						"label": "宝宝身高",
						"name": "detailAddress",
						"value": "120"
					},
					{
						"memberGiftAccountId": 457,
						"attrId": 10,
						"label": "宝宝证件号",
						"name": "detailAddress",
						"value": "32099999999999999"
					},
				], 
			},
			{
				"memberGiftAccountSeq": 260,
				"giftSeq": 11,
				"giftCode": "COUPON00020154",
				"giftName": "爱法呗赠品小马甲2",
				"giftType": "2",
				"imageName": "../assets/image/productimg.png",
				"giftRemark": "1.适用年龄：0-2岁 2.课程总共4节 5.需提前预约，再到店兑换使用",
				"brandshopSeq": 133,
				"brandshopName": "1001夜杭州旗舰店",
				"startDate": 1492706727000,
				"endDate": 1493916327000,
				"status": "4",
				"receiveDate": 1492706727000,
				"useDate": 1492713204000,
				"memberSeq": 435,
				"memberPhone": "18366155533",
				"reservePhone": null,
				"reserveShopTime": null,
				"expressCompany": null,
				"expressNo": null,
				"deliveryTime": null,
				"brandshopUserSeq": null,
				"brandshopUserName": null,
				"attrValueList": [
					{
						"memberGiftAccountId": 457,
						"attrId": 1,
						"label": "家长姓名",
						"name": "receiverName",
						"value": "家长1"
					},
					{
						"memberGiftAccountId": 457,
						"attrId": 10,
						"label": "家长手机号",
						"name": "detailAddress",
						"value": "1388888888"
					},
					{
						"memberGiftAccountId": 457,
						"attrId": 10,
						"label": "宝宝姓名",
						"name": "detailAddress",
						"value": "宝宝1"
					},
					{
						"memberGiftAccountId": 457,
						"attrId": 10,
						"label": "宝宝身高",
						"name": "detailAddress",
						"value": "120"
					},
					{
						"memberGiftAccountId": 457,
						"attrId": 10,
						"label": "宝宝证件号",
						"name": "detailAddress",
						"value": "32099999999999999"
					},
				], 
			},
		]
	}
	getUnhandleExpressGiftList() {
		// let loading = this.appService.loading();
		// loading.present();
		// let url = `${AppConfig.API.getGiftList}?brandshopSeq=${this.brandshopSeqId}&type=2&start=${this.start}&limit=${this.limit}`;
		// this.appService.httpGet(url).then( data => {
		// 	loading.dismiss();
		// 	if (data.totalRecord == 0) {
		// 		//空空如也
		// 		this.noData = true;
		// 	}else {
		// 		this.noData = false;
		// 		if( this.start < data.totalRecord ) {
		// 			if (this.up) {
		// 				this.unhandleExpressGiftArray.push(...data.data);
		// 				this.start += this.limit;
		// 			}else if (this.down){
		// 				this.unhandleExpressGiftArray = [...data.data];
		// 				this.start += this.limit;
		// 			}
		// 		}else {
		// 			this.showNoMoreGift = true;
		// 		}
		// 	}
		
		// }).catch(error => {
		// 	console.log(error);
		// });
    }
	goExpressgift() {
		const orderModal = this.modalCtrl.create(HandleExpressgift);
		orderModal.onDidDismiss(() => {
		// 返回自提赠品页重新请求接口，渲染页面
		// this.start = 0;
		// this.down = true;
	    // this.up = false;
		// this.getUnhandleExpressGiftList();
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
						// let body = {
						// 	memberGiftAccountSeq: this.unhandleExpressGiftArray[index].memberGiftAccountSeq,
						// 	expressCompany: data.companyName,
						// 	expressNo: data.orderNum
						// }
						// let url = AppConfig.API.confirmExpressInfo;
						// this.appService.httpPost(url, body).then( data => {
						// 	if (data.type =="success") {
						// 		this.start = 0;
						// 		this.down = true;
						// 		this.up = false;
						// 		this.getUnhandleExpressGiftList();
						// 	}
						// }).catch(error => {
						// 	console.log(error.message);
						// });
					}else if (data.companyName!="") {
						//提示
					}else if (data.orderNum!="") {
						//提示
					}
			    }
			  }
			]
		});
		alert.present();
	}
	refreshGetUnhandleExpressGiftList(refresher) {
	// 下拉刷新请求数据
	// this.start = 0;
	// this.down = true;
	// this.up = false;
	// setTimeout(() => {
	//   this.getUnhandleExpressGiftList();
	//   refresher.complete();
	// },1000)
	}
	infiniteGetUnhandleExpressGiftList(infiniteScroll) {
	// 上拉刷新请求数据
	// this.down = false;
	// this.up = true;
	// setTimeout(() => {
	//   this.getUnhandleExpressGiftList();
	//   infiniteScroll.complete();
	// },1000)
	}
}
