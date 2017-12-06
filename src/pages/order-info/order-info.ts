import { Component} from '@angular/core';
import { NavController, AlertController, ViewController, NavParams } from 'ionic-angular';
import { AppService, AppConfig } from '../../app/app.service';
@Component({
  selector: 'order-info',
  templateUrl: 'order-info.html'
})
export class OrderInfo {
	orderDetail: any = {
    "orderSeq": null,//订单Seq
    "orderId": "",//订单ID
    "brandshopName": "",//门店名称
    "orderItemProductSkuDTOS": [//子订单以及商品SKU信息
			{
				"orderItemSeq": null,//子订单Seq
				"prodSeq": null,//商品Seq
				"skuSeq": null,//SkuSeq
				"unitPrice": 0,//商品单价
				"number": 0,//购买数量
				"productSkuDTO": {
					"productSeq": null,//商品Seq
					"skuSeq": null,//SKUseq
					"productName": "",//商品名称
					"fileSeq": null,//主图ID
					"attrValueList": [//SKU信息
						{
							"skuSeq": null,
							"attrSeq": null,
							"attrName": "",
							"attrValue": "",
							"type": null,
							"fileSeq": null,
							"price": null,
							"selectedAttrValue": null,
							"invalidAttrValue": null
						}
					],
					"fallback": null
				}
			}
    ]
	};
	requestDefeat: Boolean = false;
  constructor(
	public navCtrl: NavController, 
	public alertCtrl: AlertController, 
	public viewCtrl: ViewController,
	public navParams: NavParams,
	public appService: AppService) {
		this.getOrderDetail();
  }
  getOrderDetail() {
    let url = this.navParams.get("url"); //提现总计，从当前账户传入过来;
    this.appService.httpGet(url)
		.then(data => {
			console.log(data);
			this.requestDefeat = false;
			this.orderDetail = data;
		}).catch(error => {
			console.log(error);
			this.requestDefeat = true;
		});
	}
	presentConfirm() {
    let url = `${AppConfig.API.orderReceive}`;
    let body = {
      id: this.orderDetail.orderSeq
    }
    this.appService.httpPost(url, body)
		.then(data => {
			this.requestDefeat = false;
			this.alertLayer();
		})
		.catch(error => {
			console.log(error);
			this.requestDefeat = true;
		});
  }
  alertLayer() {
    const alert = this.alertCtrl.create({
      message: '确认提货完成',
      buttons: [
        {
          text: '查看订单',  //type: 0
          handler: () => {
            let data = { 'type': '0' };
            this.viewCtrl.dismiss(data);
          }
        },
        {
          text: '继续扫码',  //type: 1
          handler: () => {
            let data = { 'type': '1' };
            this.viewCtrl.dismiss(data);
          }
        }
      ]
    });
    alert.present();
  }
}
