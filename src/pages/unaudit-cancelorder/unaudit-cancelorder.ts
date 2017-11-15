import { Component} from '@angular/core';
import { NavController, NavParams, ModalController, AlertController } from 'ionic-angular';
import { AuditCancelorder } from '../audit-cancelorder/audit-cancelorder';
@Component({
  selector: 'unaudit-cancelorder',
  templateUrl: 'unaudit-cancelorder.html'
})
export class UnauditCancelorder {
	unauditCancelorderArray: any;
	constructor(public navCtrl: NavController, public modalCtrl: ModalController, public alertCtrl: AlertController) {
		// 请求接口得到数据
		// getUnauditCancelorder()

		this.unauditCancelorderArray = [
			{
				id: 1,
				orderId: '20161104054453',
				totlePrice: '606',
				memberPhone: '123333333333',
				unauditState: '1',
				totleNumber: '8',
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
				unauditState: '1',
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
	//审核点击事件
	auditOrder(index) {
		const alert = this.alertCtrl.create({
			message: '同意会员13212341234 的订单20170809123456取消申请？',
			buttons: [
			  {
			    text: '拒绝',
			    handler: (index) => {
						// 点击拒绝后的执行代码
						// 将当前点击的index状态改成3

						//let url = AppConfig.API.;
						//let body = {
						//  id: this.unauditCancelorderArray[index].id;
						//}
						//this.appService.httpPost(url, body).then(data => {
						//  if (data.success) {
						//   this.unauditCancelorderArray = data;
						//  }
						//}).catch(error => {
						//  console.log(error);
						//});
			    }
			  },
			  {
			    text: '通过',
			    handler: (index) => {
						// 点击同意后的执行代码
						// 将当前点击的index状态改成2
						//let url = AppConfig.API.;
						//let body = {
						//  id: this.unauditCancelorderArray[index].id;
						//}
						//this.appService.httpPost(url, body).then(data => {
						//  if (data.success) {
						//   this.unauditCancelorderArray = data;
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
	goAuditCancel() {
		const orderModal = this.modalCtrl.create(AuditCancelorder);
		orderModal.present();
	}
	getUnauditCancelorder() {
		// 待审核取消订单 请求数据
	  // let url = AppConfig.API.;page=1
	  // this.appService.httpGet(url).then( data => {
    //   this.unauditCancelorderArray = data;
	  // }).catch(error => {
    //  console.log(error);
    // });
	}
}
