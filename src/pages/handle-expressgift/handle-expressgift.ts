import { Component} from '@angular/core';
import { NavController, NavParams, AlertController } from 'ionic-angular';
import { AppService, AppConfig } from '../../app/app.service';
@Component({
  selector: 'handle-expressgift',
  templateUrl: 'handle-expressgift.html'
})
export class HandleExpressgift {
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
	// this.down = false;
	// this.up = true;
    // getHandleExpressGiftList()
    this.handleExpressGiftArray = [
			{
				"memberGiftAccountSeq": 260,
				"giftSeq": 11,
				"giftCode": "COUPON00020154",
				"giftName": "爱法呗赠品小马甲1",
				"giftType": "2",
				"imageName": "../assets/image/productimg.png",
				"giftRemark": "圆通物流  12341234123",
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
				"brandshopUserName": "张三",
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
				"giftRemark": "圆通物流  12341234123",
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
				"brandshopUserName": "张四",
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
				"giftRemark": "圆通物流  12341234123",
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
				"brandshopUserName": "张五",
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
  getHandleExpressGiftList() {
	// let loading = this.appService.loading();
	// loading.present();
    // let url = `${AppConfig.API.getGiftList}?brandshopSeq=${this.brandshopSeqId}&type=3&start=${this.start}&limit=${this.limit}`;
    // this.appService.httpGet(url).then( data => {
	// 	loading.dismiss();
	//     if (data.totalRecord == 0) {
	// 	    //空空如也
	// 	    this.noData = true;
	//     }else {
	// 	    this.noData = false;
	// 	    if( this.start < data.totalRecord ) {
	// 		  if (this.up) {
	// 			this.handleExpressGiftArray.push(...data.data);
	// 	        this.start += this.limit;
	// 		  }else if (this.down){
	// 			this.handleExpressGiftArray = [...data.data];
	// 			this.start += this.limit;
	// 		  }
	// 	    }else {
	// 	      this.showNoMoreGift = true;
	// 	    }
	//     }
	
	//   }).catch(error => {
	// 	  console.log(error);
	//   });
  }
  refreshGetHandleExpressGiftList(refresher) {
	// 下拉刷新请求数据
	// this.start = 0;
	// this.down = true;
	// this.up = false;
	// setTimeout(() => {
	//   this.getHandleExpressGiftList();
	//   refresher.complete();
	// },1000)
  }
  infiniteGetHandleExpressGiftList(infiniteScroll) {
	// 上拉刷新请求数据
	// this.down = false;
	// this.up = true;
	// setTimeout(() => {
	//   this.getHandleExpressGiftList();
	//   infiniteScroll.complete();
	// },1000)
  }
}
