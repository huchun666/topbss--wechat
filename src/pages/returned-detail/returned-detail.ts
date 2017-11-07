import { Component} from '@angular/core';
import { NavController, NavParams, AlertController } from 'ionic-angular';
@Component({
  selector: 'returned-detail',
  templateUrl: 'returned-detail.html'
})
export class ReturnedDetail {
	count: number = 4;
	returnedDetail: any;
	listIndexId: number;
	constructor(public navCtrl: NavController, public alertCtrl: AlertController, public navParams: NavParams) {
		this.listIndexId = this.navParams.get('indexId')  //传上个页面当前点击的id来获取详情页信息
		//getReturnedDetailList(this.listIndexId);
		this.returnedDetail = [
			{
				id: 4,
				orderId: '20161104054453',
				totlePrice: '606',
				memberPhone: '123333333333',
				unauditState: '4',//1、 申请审核中 2、申请已通过 3、申请已拒绝 4、客户已退货 5、退款已完成
				totleNumber: '8',
				returnNumber: '4',
				contactWay: '1568888888',
				returnWay: '其他',//退货方式
				hasInvoice: '否',//是否要发票
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
				applyReturnTime: '2017-09-20 11:22:33',//申请退货时间
				applyAuditTime: '2017-09-20 11:22:33',//申请审核时间
				affirmTakeGoodsTime: '2017-09-20 11:22:33',//确认收货时间
				goodsMoneyReturnChangeTime: '2017-09-20 11:22:33',//货款退换时间
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

	getReturnedDetailList(listIndexId){
		// 待审核退货订单 点击审核时的详情页 请求数据
		// let url = this.appConFig.API.;
		// 所需参数：page=1; listIndexId;
	  // this.appService.httpGet(url).then( data => {
    //   this.returnDetail = data;
	  // }).catch(error => {
    //  console.log(error);
    // });
	}
}
