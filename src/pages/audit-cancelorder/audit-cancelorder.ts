import { Component} from '@angular/core';
import { NavController, NavParams, AlertController } from 'ionic-angular';
@Component({
  selector: 'audit-cancelorder',
  templateUrl: 'audit-cancelorder.html'
})
export class AuditCancelorder {
	audutCancelorderArray: any;
	constructor(public navCtrl: NavController, public alertCtrl: AlertController) {
		// 请求接口得到数据
		// getAuditCancelorder()

		this.audutCancelorderArray = [
			{
				id: 1,
				orderId: '20161104054453',
				totlePrice: '606',
				memberPhone: '123333333333',
				unauditState: '2',
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
				unauditState: '3',
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
	auditOrder() {
	
	}
	getAuditCancelorder() {
		// 待审核已取消订单 请求数据
	  // let url = AppConfig.API.;page=1
	  // this.appService.httpGet(url).then( data => {
    //   this.audutCancelorderArray = data;
	  // }).catch(error => {
    //  console.log(error);
    // });
	}
}
