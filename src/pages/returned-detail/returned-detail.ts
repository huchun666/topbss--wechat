import { Component} from '@angular/core';
import { NavController, NavParams, AlertController } from 'ionic-angular';
import { AppService, AppConfig } from '../../app/app.service';
@Component({
  selector: 'returned-detail',
  templateUrl: 'returned-detail.html'
})
export class ReturnedDetail {
	count: number = 4;
	returnedDetail: any;
	listIndexId: number;
	constructor(
    public navCtrl: NavController, 
    public alertCtrl: AlertController, 
    public navParams: NavParams,
    public appService: AppService ) {
		this.listIndexId = this.navParams.get('indexId')  //传上个页面当前点击的id来获取详情页信息
		//this.getReturnedDetailList();
		this.returnedDetail = {
      orderReturn: {
        orderReturnSeq: '20161104054453',
        returnOrderId: '20161104054453',
        invoiced: '1',
        detail: '问题描述',
        mobile: '18888888888',
        number: '2',
        returnType: '1',
        totalReturnPrice: '100',
        returnReason: '七天无理由退货',
        status: '1'
      },
      order: {
        orderSeq: '',
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

	getReturnedDetailList(listIndexId){
		// 点击审核时的详情页 请求数据
		// let url = `${AppConfig.hostUrl}${AppConfig.API.returnDetail}?id=${this.listIndexId}`;
		// this.appService.httpGet(url).then( data=>{
    //   this.returnedDetail = data;
    // }).catch( error=>{
    //   console.log(error);
    // })
	}
}
