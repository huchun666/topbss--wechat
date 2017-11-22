import { Component} from '@angular/core';
import { NavController, NavParams, ViewController, AlertController } from 'ionic-angular';
import { AppService, AppConfig } from '../../app/app.service';
@Component({
  selector: 'return-detail',
  templateUrl: 'return-detail.html'
})
export class ReturnDetail {
  returnDetail: any = {
    orderReturn: {
      orderReturnSeq: '',
      returnOrderId: '',
      invoiced: '',
      detail: '',
      mobile: '',
      number: '',
      name: '',
      returnType: '',
      totalReturnPrice: '',
      status: '',
      returnReason: ''
    },
    order: {
      orderSeq: '',
      orderId: '',
      payAmount: ''
    },
    itemProductSkuDTO: {
      orderItemSeq: null,
      prodSeq: null,
      skuSeq: null,
      unitPrice: null, 
      number: null,
      productSkuDTO: { 
        productSeq: null,
        skuSeq: null,
        unitPrice: '',
        number: '',
        productName: "",
        fileName: '',
        attrValueList: [
          {
            skuSeq: null,
            attrSeq: null,
            attrName: "",
            attrValue: "",
            type: null,
            fileSeq: null,
            price: null,
            selectedAttrValue: null,
            invalidAttrValue: null
          },
          {
              skuSeq: null,
              attrSeq: null,
              attrName: "",
              attrValue: "",
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
    returnAmount: null
  };
  productId: number;
  imageArray: any;
  constructor(
    public navCtrl: NavController, 
    public viewCtrl: ViewController, 
    public alertCtrl: AlertController, 
    public navParams: NavParams, 
    public appService: AppService 
  ) {
      this.productId = this.navParams.get('productId');  //传上个页面当前点击的id来获取详情页信息
      this.getReturnDetailList();
  }
  getReturnDetailList(){
    // 待审核退货订单 点击审核时的详情页 请求数据
    let url = `${AppConfig.API.returnDetail}?id=${this.productId}`;
		this.appService.httpGet(url).then( data => {
      console.log(data)
      this.returnDetail = data;
      if (this.returnDetail.orderReturn.imageIds) {
        this.imageArray = this.returnDetail.orderReturn.imageIds.split(",");
      }
    }).catch( error=>{
      console.log(error);
    })
	}
	agreeReturn() {
		let alert = this.alertCtrl.create({
			message: '退货数量: ' + this.returnDetail.orderReturn.number  + '<span>拟退款金额：</span>',
			inputs: [
        {
          name: 'price',
          label: '退款金额',
          type: 'number',
          value: `${this.returnDetail.returnAmount}`
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
            let url = `${AppConfig.API.auditReturnOrder}?id=${this.productId}&isAgree=1&totalReturnPrice=${data.price}`;
            this.appService.httpPost(url, null).then( data => {
              if (data.type == "success") {
                this.viewCtrl.dismiss();
              }
            }).catch( error=>{
              console.log(error);
              this.appService.toast('操作失败，请稍后再试', 1000, 'middle');
            })
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
            let url = `${AppConfig.API.auditReturnOrder}?id=${this.productId}&isAgree=0&totalReturnPrice=${this.returnDetail.returnAmount}`;
            this.appService.httpPost(url, null).then( data => {
              if (data.type == "success") {
                this.viewCtrl.dismiss();
              }
            }).catch( error=>{
              console.log(error);
              this.appService.toast('操作失败，请稍后再试', 1000, 'middle');
            })
			    }
			  }
      ],
		});
		alert.present();
	}

}
