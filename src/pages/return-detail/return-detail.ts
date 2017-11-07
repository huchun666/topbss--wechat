import { Component} from '@angular/core';
import { NavController, NavParams, ViewController, AlertController } from 'ionic-angular';
@Component({
  selector: 'return-detail',
  templateUrl: 'return-detail.html'
})
export class ReturnDetail {
	count: number = 4;
	returnDetail: any;
	listIndexId: number;
	constructor(public navCtrl: NavController, public viewCtrl: ViewController, public alertCtrl: AlertController, public navParams: NavParams ) {
		this.listIndexId = this.navParams.get('indexId')  //传上个页面当前点击的id来获取详情页信息
		//getReturnDetailList(this.listIndexId);
		this.returnDetail = [
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
	agreeReturn() {
		let alert = this.alertCtrl.create({
			message: '退货数量: ' + this.count  + '<span>拟退款金额：</span>',
			inputs: [
		      {
		        name: 'price',
		        label: '退款金额',
		        type: 'number'
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
						console.log(data);
						// 点击确认后的执行代码
						// 将当前点击的returnDetail的状态（unauditState）改成2，添加returnPrice为data.price
						//let url = AppConfig.API.;
						//let body = {
						//  id: this.returnDetail.id;
						//  returnPrice: data.price;
						//}
						//this.appService.httpPost(url, body).then(data => {
						//  if (data.success) {
						//    
						//  }
						//}).catch(error => {
						//  console.log(error);
						//});

						//这里需要修改  跳转后要刷新审核退货列表页
						this.navCtrl.pop();
			    }
			  }
			],
			cssClass: 'detail-alert'
		});
		alert.present();
	}
	refuseReturn() {
		let alert = this.alertCtrl.create({
			message: '确认拒绝会员13761489650的订单201745631102退货申请？',
			buttons: [
			  {
			    text: '取消',
			    handler: () => {
			      //点击取消后的执行代码
			    }
			  },
			  {
			    text: '确认',
			    handler: () => {
			    	var data = {id: '123'};
			    	this.viewCtrl.dismiss(data);
			    }
			  }
			]
		});
		alert.present();
	}
	getReturnDetailList(listIndexId){
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
