import { Component} from '@angular/core';
import { NavController, NavParams, ModalController, AlertController } from 'ionic-angular';
import { ReturnedDetail } from '../returned-detail/returned-detail';
@Component({
  selector: 'audit-returnorder',
  templateUrl: 'audit-returnorder.html'
})
export class AuditReturnorder {
	auditReturnorderArray: any;
	constructor(public navCtrl: NavController, public modalCtrl: ModalController, public alertCtrl: AlertController) {
		//getAuditReturnorderList();
		this.auditReturnorderArray = [
			{
				id: 3,
				orderId: '20161104054453',
				totlePrice: '606',
				memberPhone: '123333333333',
				unauditState: '3',//1、 申请审核中 2、申请已通过 3、申请已拒绝 4、客户已退货 5、退款已完成
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
			},{
				id: 4,
				orderId: '20161104054453',
				totlePrice: '606',
				memberPhone: '123333333333',
				unauditState: '4',//1、 申请审核中 2、申请已通过 3、申请已拒绝 4、客户已退货 5、退款已完成
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
			},{
				id: 5,
				orderId: '20161104054453',
				totlePrice: '606',
				memberPhone: '123333333333',
				unauditState: '5',//1、 申请审核中 2、申请已通过 3、申请已拒绝 4、客户已退货 5、退款已完成
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
			}
		]
	}
	goReturnedDetail(index) {
		let contactModal = this.modalCtrl.create(ReturnedDetail,{ indexId: this.auditReturnorderArray[index].id });
    contactModal.present();
	}
	getAuditReturnorderList() {
		// 已审核退货订单 请求数据
	  // let url = AppConfig.API.;page=1;unauditState=3,4,5 ;
	  // this.appService.httpGet(url).then( data => {
    //   this.auditReturnorderArray = data;
	  // }).catch(error => {
    //  console.log(error);
    // });
	}
}
