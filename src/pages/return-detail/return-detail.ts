import { Component} from '@angular/core';
import { NavController, NavParams, ViewController, AlertController } from 'ionic-angular';
import { AppService, AppConfig } from '../../app/app.service';
@Component({
  selector: 'return-detail',
  templateUrl: 'return-detail.html'
})
export class ReturnDetail {
	count: number = 4;
  returnDetail: any;
	listIndexId: number;
  constructor(
    public navCtrl: NavController, 
    public viewCtrl: ViewController, 
    public alertCtrl: AlertController, 
    public navParams: NavParams, 
    public appService: AppService ) {
      this.listIndexId = this.navParams.get('indexId')  //传上个页面当前点击的id来获取详情页信息
      this.returnDetail = {
        orderReturn: {
          orderReturnSeq: '20161104054453',
          returnOrderId: '20161104054453',
          invoiced: '1',
          detail: '问题描述',
          mobile: '18888888888',
          number: '2',
          name: '18888888888',
          returnType: '1',
          totalReturnPrice: '100',
          status: '1',
          returnReason: '七天无理由退货'
        },
        order: {
          orderSeq: '20161104054453',
          orderId: '',
          payAmount: '100'
        },
        itemProductSkuDTO: {
          orderItemSeq: 612,
          prodSeq: 18,
          skuSeq: 45,
          unitPrice: 24, 
          number: 1,
          productSkuDTO: { 
            productSeq: 289,
            skuSeq: 939,
            unitPrice: '100',
            number: '10',
            productName: "MQD2016夏季印花短袖T恤216220510",
            fileName: './assets/image/productimg.png',
            attrValueList: [
              {
                skuSeq: null,
                attrSeq: 300,
                attrName: "颜色",
                attrValue: "蓝色",
                type: null,
                fileSeq: null,
                price: null,
                selectedAttrValue: null,
                invalidAttrValue: null
              },
              {
                  skuSeq: null,
                  attrSeq: 322,
                  attrName: "尺码",
                  attrValue: "100（3-4岁）",
                  type: null,
                  fileSeq: null,
                  price: null,
                  selectedAttrValue: null,
                  invalidAttrValue: null
              }
            ],
            fallback: null
          }
        },
      }
	}
	agreeReturn() {
		let alert = this.alertCtrl.create({
			message: '退货数量: ' + this.returnDetail.orderReturn.number  + '<span>拟退款金额：</span>',
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
            let url = `${AppConfig.hostUrl+AppConfig.API.auditReturnOrder}`;
			    	let body = {
              id: this.listIndexId,
              isAgree: 1,
              totalReturnPrice: data.price
            };
            // this.appService.httpPost(url, body).then( data=>{
            //   //这里需要修改  跳转后要刷新审核退货列表页
            //   this.navCtrl.pop();
            // }).catch( error=>{
            //   console.log(error);
            // })
			    }
			  }
			],
			cssClass: 'detail-alert'
		});
		alert.present();
	}
	refuseReturn() {
		let alert = this.alertCtrl.create({
			message: `确认拒绝会员${this.returnDetail.orderReturn.name}的订单${this.returnDetail.orderReturn.returnOrderId}退货申请？`,
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
            let url = `${AppConfig.hostUrl+AppConfig.API.auditReturnOrder}`;
			    	let data = {
              id: this.listIndexId,
              isAgree: 0,
              totalReturnPrice: 0
            };
            // this.appService.httpPost(url, data).then( data=>{
            //   this.viewCtrl.dismiss(data);
            // }).catch( error=>{
            //   console.log(error);
            // })
			    }
			  }
      ],
		});
		alert.present();
	}
	getReturnDetailList(){
    // 待审核退货订单 点击审核时的详情页 请求数据
    let url = `${AppConfig.hostUrl+AppConfig.API.returnDetail}?id=${this.listIndexId}`;
		this.appService.httpGet(url).then( data=>{
      this.returnDetail = data;
    }).catch( error=>{
      console.log(error);
    })
	}

}
