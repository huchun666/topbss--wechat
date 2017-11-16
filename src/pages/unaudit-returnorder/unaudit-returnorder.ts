import { Component, OnInit} from '@angular/core';
import { NavController, NavParams, ModalController, AlertController } from 'ionic-angular';
import { AuditReturnorder } from '../audit-returnorder/audit-returnorder';
import { ReturnDetail } from '../return-detail/return-detail';
import { AppService, AppConfig } from '../../app/app.service';
@Component({
  selector: 'unaudit-returnorder',
  templateUrl: 'unaudit-returnorder.html'
})
export class UnauditReturnorder{
  unauditReturnorderArray: any;
  currentPage: number = 1;
  pageSize: number = 10;
  up: Boolean = true;//上拉刷新和第一次进入页面时
  down: Boolean = false;//下拉刷新和返回上一级页面时
  noData:Boolean = false;
	constructor(
    public navCtrl: NavController, 
    public modalCtrl: ModalController, 
    public alertCtrl: AlertController, 
    public appService: AppService) {
      //this.getUnauditReturnorderList();
      
      this.unauditReturnorderArray = [
        { 
          orderId: "20170110068552",
          orderReturnSeq: '20170110068550',
          mobile: "18321763810",
          number: 1,
          unitPrice: 100,
          buyNumber: 2,
          status: "0",
          productSkuDTO: {
            productSeq: 289,
            skuSeq: 939,
            productName: "MQD2016夏季印花短袖T恤216220510",
            fileName: './assets/image/productimg.png',
            fileSeq: 7954,
            attrValueList: [
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
        { 
          orderId: "20170110068552",
          orderReturnSeq: '20170110068550',
          mobile: "18321763810",
          number: 1,
          buyNumber: 2,
          unitPrice: 100,
          status: "1",
          productSkuDTO: {
            productSeq: 289,
            skuSeq: 939,
            productName: "MQD2016夏季印花短袖T恤216220510",
            fileName: './assets/image/productimg.png',
            fileSeq: 7954,
            attrValueList: [
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
        { 
          orderId: "20170110068552",
          orderReturnSeq: '20170110068550',
          mobile: "18321763810",
          number: 1,
          buyNumber: 2,
          unitPrice: 100,
          status: "2",
          productSkuDTO: {
            productSeq: 289,
            skuSeq: 939,
            productName: "MQD2016夏季印花短袖T恤216220510",
            fileName: './assets/image/productimg.png',
            fileSeq: 7954,
            attrValueList: [
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
        { 
          orderId: "20170110068552",
          orderReturnSeq: '20170110068550',
          mobile: "18321763810",
          number: 1,
          buyNumber: 2,
          unitPrice: 100,
          status: "3",
          productSkuDTO: {
            productSeq: 289,
            skuSeq: 939,
            productName: "MQD2016夏季印花短袖T恤216220510",
            fileName: './assets/image/productimg.png',
            fileSeq: 7954,
            attrValueList: [
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
        { 
          orderId: "20170110068552",
          orderReturnSeq: '20170110068550',
          mobile: "18321763810",
          number: 1,
          buyNumber: 2,
          unitPrice: 100,
          status: "4",
          productSkuDTO: {
            productSeq: 289,
            skuSeq: 939,
            productName: "MQD2016夏季印花短袖T恤216220510",
            fileName: './assets/image/productimg.png',
            fileSeq: 7954,
            attrValueList: [
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
      ]
	}
	confirmReturn(index) {
		const alert = this.alertCtrl.create({
			message: `确认已收到会员${this.unauditReturnorderArray[index].mobile}的订单${this.unauditReturnorderArray[index].orderId}的${this.unauditReturnorderArray[index].number}件退货商品？`,
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
						// 点击确认后的执行代码
						// 将当前点击的index状态改成4
						let url = `${AppConfig.hostUrl+AppConfig.API.returnReceived}`;
						let body = {
             id: this.unauditReturnorderArray[index].orderReturnSeq
            }
						// this.appService.httpPost(url, body).then(data => {
						//  if (data.type == 'success') {
						//   this.getUnauditReturnorderList();
						//  }
						// }).catch(error => {
						//  console.log(error);
						// });
			    }
			  }
			]
		});
		alert.present();
	}
	auditReturn(index) {
		const orderModal = this.modalCtrl.create(ReturnDetail,{ indexId: this.unauditReturnorderArray[index].orderReturnSeq});
		orderModal.present();
	}
	goAuditReturn() {
		const orderModal = this.modalCtrl.create(AuditReturnorder);
		orderModal.present();
	}
	getUnauditReturnorderList() {
    // 待审核退货订单 请求数据
    let loading = this.appService.loading();
	  let url = `${AppConfig.hostUrl + AppConfig.API.getReturnorderList}?deliveryType=1&status=0&start=${this.pageSize * (this.currentPage - 1)}&limit=${this.pageSize}`;
	  this.appService.httpGet(url).then( data => {
      loading.dismiss();
      if (data.count == 0 && this.unauditReturnorderArray.length == 0) {
		    //空空如也
		    this.noData = true;
	    } else {
        this.noData = false;
        if(this.up){
          this.unauditReturnorderArray.push(...data.data);
          this.currentPage++;
        } else if(this.down){
          this.unauditReturnorderArray = data.data;
        }
      }
	  }).catch(error => {
     console.log(error);
    });
  }
  
  // 下拉刷新请求数据
  doRefresh(refresher) {
    this.down = true;
    this.up = false;
    setTimeout(() => {
      this.currentPage = 1;
      // this.getUnauditReturnorderList();
      refresher.complete();
    },1000)
  }
  
  // 上拉刷新请求数据
  infiniteGetSelfGiftList(infiniteScroll) {
    this.down = false;
    this.up = true;
    setTimeout(() => {
      // this.getUnauditReturnorderList();
      infiniteScroll.complete();
    },1000)
  }
}
