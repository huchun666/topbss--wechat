import { Component, OnInit} from '@angular/core';
import { NavController, NavParams, ModalController, AlertController } from 'ionic-angular';
import { AuditReturnorder } from '../audit-returnorder/audit-returnorder';
import { ReturnDetail } from '../return-detail/return-detail';
@Component({
  selector: 'unaudit-returnorder',
  templateUrl: 'unaudit-returnorder.html'
})
export class UnauditReturnorder implements OnInit {
	unauditReturnorderArray: any;
	constructor(public navCtrl: NavController, public modalCtrl: ModalController, public alertCtrl: AlertController) {
		//getUnauditReturnorderList();
		
		this.unauditReturnorderArray = [
			{
				id: 1,
				orderId: '20161104054453',
				totlePrice: '606',
				memberPhone: '123333333333',
				unauditState: '1',//1、 申请审核中 2、申请已通过 3、申请已拒绝 4、客户已退货 5、退款已完成
				totleNumber: '8',
				returnNumber: '4',
				contactWay: '1568888888',
				returnWay: '其他',//退货方式
				hasInvoice: false,//是否要发票
				returnReason: '七天无理由退换',
				problemDescription: "嗯，啊，哦，这个嘛",
				detailImg: [
					'./assets/image/productimg.png',
					'./assets/image/productimg.png',
					'./assets/image/productimg.png',
					'./assets/image/productimg.png',
					'./assets/image/productimg.png'
				],
				returnPrice: '',//拟退金额
				applyReturnTime: '',//申请退货时间
				applyAuditTime: '',//申请审核时间
				affirmTakeGoodsTime: '',//确认收货时间
				goodsMoneyReturnChangeTime: '',//货款退换时间
				basicData: [
					{
						goodsName: '可爱的小裙子 厚实的 保暖 秋冬季',
						SKUSize: '140',
						SKUColor: '蓝色',
						SKUType: '无袖',
						unitPrice: '128',
						number: 4,
						imgUrl: "./assets/image/productimg.png"
					},
					{
						goodsName: '可爱的小裙子 厚实的 保暖 秋冬季',
						SKUSize: '150',
						SKUColor: '红色',
						SKUType: '有袖',
						unitPrice: '128',
						number: 4,
						imgUrl: "./assets/image/productimg.png"
					}
				]
			},
			{
				id: 2,
				orderId: '201611040522222',
				totlePrice: '406',
				memberPhone: '456666666666',
				unauditState: '2',
				totleNumber: '4',
				basicData: [
					{
						goodsName: '可爱的小裙子 厚实的 保暖 秋冬季',
						SKUSize: '150',
						SKUColor: '红色',
						SKUType: '有袖',
						unitPrice: '128',
						number: 4,
						imgUrl: "./assets/image/productimg.png"
					}
				]
			}
		]
	}
	ngOnInit() { console.log("after...") }
	confirmReturn(index) {
		const alert = this.alertCtrl.create({
			message: '确认已收到会员13212341234的订单20170809123456的3件退货商品？',
			buttons: [
			  {
			    text: '取消',
			    handler: () => {
			      //点击取消后的执行代码
			    }
			  },
			  {
			    text: '确认',
			    handler: (index) => {
						// 点击确认后的执行代码
						// 将当前点击的index状态改成4
						//let url = AppConfig.API.;
						//let body = {
						//  id: this.unauditReturnorderArray[index].id;
						//}
						//this.appService.httpPost(url, body).then(data => {
						//  if (data.success) {
						//   this.unauditReturnorderArray = data;
						//  }
						//}).catch(error => {
						//  console.log(error);
						//});
			    }
			  }
			]
		});
		alert.present();
	}
	auditReturn(index) {
		const orderModal = this.modalCtrl.create(ReturnDetail,{ indexId: this.unauditReturnorderArray[index].id});
		orderModal.present();
	}
	goAuditReturn() {
		const orderModal = this.modalCtrl.create(AuditReturnorder);
		orderModal.present();
	}
	getUnauditReturnorderList() {
		// 待审核退货订单 请求数据
	  // let url = this.appConFig.API.;page=1;unauditState=1,2 ;
	  // this.appService.httpGet(url).then( data => {
    //   this.unauditReturnorderArray = data;
	  // }).catch(error => {
    //  console.log(error);
    // });
	}
}
