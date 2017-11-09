import { Component, ChangeDetectorRef } from '@angular/core';
import { NavController, NavParams, ModalController, AlertController, ToastController, LoadingController } from 'ionic-angular';
import { HandleSelfgift } from '../handle-selfgift/handle-selfgift';
import { AppService, AppConfig } from '../../app/app.service';
@Component({
  selector: 'unhandle-selfgift',
  templateUrl: 'unhandle-selfgift.html'
})
export class UnhandleSelfgift {
  unhandleSeflGiftArray: any;
  start: number;
  showNoMoreGift: Boolean = true;
  noData: Boolean;
  up: Boolean;//上拉刷新和第一次进入页面时
  down: Boolean;//下拉刷新和返回上一级页面时
  constructor(
		public navCtrl: NavController, 
		public modalCtrl: ModalController, 
		public alertCtrl: AlertController, 
		public changeDetectorRef: ChangeDetectorRef, 
		public appConFig: AppConfig, 
		public appService: AppService,
		public toastCtrl: ToastController,
		public loadingCtrl: LoadingController
	) {
		// this.down = false;
		// this.up = true;
		this.getUnhandleSelfGiftList();
		// ngOnInit() { 请求数据 }
		// 要改下：将this.unhandleSeflGiftArray = []
		this.unhandleSeflGiftArray = [
			{
				"memberGiftAccountSeq": 294,		//会员赠品账户ID
				"giftSeq": 13,						//赠品ID
				"giftCode": "COUPON00021602",	//赠品领取码
				"giftName": "爱法呗赠品小马甲1",				//赠品名
				"giftType": "0",						//赠品类型：0-预约兑换, 1-到店兑换, 2-立即兑换
				"imageName": "../assets/image/productimg.png",	//赠品图片名
				"giftRemark": "1.适用年龄：2-3岁 2.课程数量：2节 3.提前预约，到店兑换使用",	//赠品备注
				"brandshopSeq": 133,				//门店ID
				"brandshopName": "1001夜杭州旗舰店",	//门店名
				"startDate": 1494419211000,		//赠品机会开始时间
				"endDate": 1495628811000,			//赠品机会过期时间
				"status": "2",						//赠品机会状态  0=未使用, 1=已使用, 2-已预约, 3-已确认, 4-待发货
				"receiveDate": 1495619431000,		//赠品机会领取时间
				"useDate": null,						//赠品兑换时间
				"memberSeq": 435,					//会员ID
				"memberPhone": "18366155533",	//会员手机号
				"reservePhone": "12312341234",		//预约手机
				"reserveShopTime": null,//预约到店时间
				"expressCompany": null,			//快递公司
				"expressNo": null,					//快递单号
				"deliveryTime": null,				//发货时间
				"brandshopUserSeq": null,			//导购员ID
				"brandshopUserName": null,		//导购员姓名
				"attrValueList": []					//赠品动态表单收集信息
			},
			{
				"memberGiftAccountSeq": 294,
				"giftSeq": 13,
				"giftCode": "COUPON00021602",
				"giftName": "爱法呗赠品小马甲2",
				"giftType": "0",
				"imageName": "../assets/image/productimg.png",
				"giftRemark": "1.适用年龄：2-3岁 2.课程数量：2节 3.提前预约，到店兑换使用",
				"brandshopSeq": 133,
				"brandshopName": "1001夜杭州旗舰店",
				"startDate": 1494419211000,
				"endDate": 1495628811000,
				"status": "3",
				"receiveDate": 1495619431000,
				"useDate": null,
				"memberSeq": 435,
				"memberPhone": "18366155533",
				"reservePhone": "12312341234",
				"reserveShopTime": 1495788424000,
				"expressCompany": null,
				"expressNo": null,
				"deliveryTime": null,
				"brandshopUserSeq": null,
				"brandshopUserName": null,
				"attrValueList": []
			},
			{
				"memberGiftAccountSeq": 294,
				"giftSeq": 13,
				"giftCode": "COUPON00021602",
				"giftName": "爱法呗赠品小马甲3",
				"giftType": "1",
				"imageName": "../assets/image/productimg.png",
				"giftRemark": "1.适用年龄：2-3岁 2.课程数量：2节 3.提前预约，到店兑换使用",
				"brandshopSeq": 133,
				"brandshopName": "1001夜杭州旗舰店",
				"startDate": 1494419211000,
				"endDate": 1495628811000,
				"status": "",
				"receiveDate": 1495619431000,
				"useDate": null,
				"memberSeq": 435,
				"memberPhone": "18366155533",
				"reservePhone": "12312341234",
				"reserveShopTime": 1495788424000,
				"expressCompany": null,
				"expressNo": null,
				"deliveryTime": null,
				"brandshopUserSeq": null,
				"brandshopUserName": null,
				"attrValueList": []
			},
			{
				"memberGiftAccountSeq": 294,
				"giftSeq": 13,
				"giftCode": "COUPON00021602",
				"giftName": "爱法呗赠品小马甲4",
				"giftType": "0",
				"imageName": "../assets/image/productimg.png",
				"giftRemark": "1.适用年龄：2-3岁 2.课程数量：2节 3.提前预约，到店兑换使用",
				"brandshopSeq": 133,
				"brandshopName": "1001夜杭州旗舰店",
				"startDate": 1494419211000,
				"endDate": 1495628811000,
				"status": "2",
				"receiveDate": 1495619431000,
				"useDate": null,
				"memberSeq": 435,
				"memberPhone": "18366155533",
				"reservePhone": "12312341234",
				"reserveShopTime": null,
				"expressCompany": null,
				"expressNo": null,
				"deliveryTime": null,
				"brandshopUserSeq": null,
				"brandshopUserName": null,
				"attrValueList": []
			}
		]

}
  getUnhandleSelfGiftList() {
		let loading = this.appService.loading();
		// loading.present();
		let url = `$(this.appConFig.API.)?brandshopSeq=$(this.brandshopSeqId)&type=0&start=$(this.start)&limit=10`;
    this.appService.httpGet(url).then( data => {
			loading.dismiss();
			if (data.totalRecord == 0) {
				//空空如也
				this.noData = false;
			}else {
				this.noData = true;
				if( this.start < data.totalRecord ) {
					if (this.up) {
						this.unhandleSeflGiftArray.push(...data.data);
						this.start+=10;
					}else if (this.down){
						this.unhandleSeflGiftArray = [...data.data];
						this.start+=10;
					}
				}else {
						this.showNoMoreGift = false;
				}
			}
		
		}).catch(error => {
			console.log(error);
		});
  }
  goSelfgift() {
	const orderModal = this.modalCtrl.create(HandleSelfgift);
	orderModal.onDidDismiss(() => {
	// 返回自提赠品页重新请求接口，渲染页面
	// this.start = 0;
	// this.down = true;
	// this.up = false;
	// this.getUnhandleSelfGiftList();
	})
	orderModal.present();
  }
  clearReserveArriveTime(index) {
    this.unhandleSeflGiftArray[index].reserveShopTime = "";
  }
  reserveAffirm(index) {
	// if (this.unhandleSeflGiftArray[index].reserveShopTime!=null) {
	//   // 预约确认更改数据
	//   let body = {
	// 	   memberGiftAccountSeq: this.unhandleSeflGiftArray[index].memberGiftAccountSeq,
	// 	   reserveShopTime: new Date(this.unhandleSeflGiftArray[index].reserveShopTime).getTime()
	//   }
	//   let url = this.appConFig.API.;
	//   this.appService.httpPost(url, body).then( data => {
	// 	if (data.type == "success") {
	// 	  this.start = 0;
	//    this.down = true;
	//    this.up = false;
	// 	  // 预约确认请求数据
	// 	  this.getUnhandleSelfGiftList();
	// 	}
	//   }).catch(error => {
	//     console.log(error.message);
	//   });
	// } else {
	// 	let toast = this.toastCtrl.create({
	// 		message: '请选择会员预约到店时间',
	// 		duration: 1000,
	// 		position: 'middle'
	// 	});

	// 	toast.present(toast);
	// }
  }
  refreshGetSelfGiftList(refresher) {
	// 下拉刷新请求数据
	// this.start = 0;
	// this.down = true;
	// this.up = false;
	// setTimeout(() => {
	//   this.getUnhandleSelfGiftList();
	//   refresher.complete();
	// },1000)
  }
  infiniteGetSelfGiftList(infiniteScroll) {
	// 上拉刷新请求数据
	// this.down = false;
	// this.up = true;
	// setTimeout(() => {
	//   this.getUnhandleSelfGiftList();
	//   infiniteScroll.complete();
	// },1000)
  }
}
