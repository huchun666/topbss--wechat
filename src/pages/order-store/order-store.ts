import { Component} from '@angular/core';
import { NavController, NavParams, ModalController, AlertController, ToastController } from 'ionic-angular';
import { PaymentCode } from '../payment-code/payment-code';
import { AppService, AppConfig } from '../../app/app.service';
@Component({
  selector: 'order-store',
  templateUrl: 'order-store.html'
})
export class OrderStore {
  start: number = 0;
  limit: number = 10;
  showNoMoreGift: Boolean = false;
  noData: Boolean;
  up: Boolean;//上拉刷新和第一次进入页面时
  down: Boolean;//下拉刷新和返回上一级页面时
  // count: number = 2;
  total: number = 200.00;
  orderStoreDataArray: any;//得到的数据里面的data数组
  returnUrl: string;//返回得到的url字符串
  constructor(
    public navCtrl: NavController,
    public modalCtrl: ModalController,
    public alertCtrl: AlertController,
    public toastCtrl: ToastController,
    public appService: AppService,
  ) {
    // this.getOrderStore();
    this.orderStoreDataArray = 
      [
          {
              "warehouseItemId": 1,
              "warehouseId": 3,
              "skuId": 1020,
              "itemPrice": 23.34,
              "productNum": 2,
              "remark": "测试添加配单仓商品1号",
              "isSelected": 1,
              "status": 1,
              "createTime": 1509507135000,
              "stock": 4,
              "productSkuDTO": {
                  "productSeq": 347,
                  "skuSeq": 1020,
                  "productName": "1031测试门票1",
                  "fileName": null,
                  "attrValueList": [
                      {
                          "skuSeq": null,
                          "attrSeq": 1136,
                          "attrName": "门票颜色",
                          "attrValue": "白色",
                          "type": null,
                          "fileSeq": "../assets/image/productimg2.png",
                          "price": null,
                          "selectedAttrValue": null,
                          "invalidAttrValue": null
                      },
                      {
                          "skuSeq": null,
                          "attrSeq": 1121,
                          "attrName": "门票种类",
                          "attrValue": "标准票",
                          "type": null,
                          "fileSeq": "../assets/image/productimg2.png",
                          "price": null,
                          "selectedAttrValue": null,
                          "invalidAttrValue": null
                      },
                  ],
                  "fallback": null
              }
          },
          {
              "warehouseItemId": 2,
              "warehouseId": 3,
              "skuId": 998,
              "itemPrice": 23.34,
              "productNum": 3,
              "remark": "测试添加配单仓商品1号",
              "isSelected": 1,
              "status": 1,
              "createTime": 1509514319000,
              "stock": 5,
              "productSkuDTO": {
                "productSeq": 347,
                "skuSeq": 1020,
                "productName": "1031测试门票1",
                "fileName": null,
                "attrValueList": [
                    {
                        "skuSeq": null,
                        "attrSeq": 1136,
                        "attrName": "门票颜色",
                        "attrValue": "白色",
                        "type": null,
                        "fileSeq": "../assets/image/productimg2.png",
                        "price": null,
                        "selectedAttrValue": null,
                        "invalidAttrValue": null
                    },
                    {
                        "skuSeq": null,
                        "attrSeq": 1121,
                        "attrName": "门票种类",
                        "attrValue": "标准票",
                        "type": null,
                        "fileSeq": "../assets/image/productimg2.png",
                        "price": null,
                        "selectedAttrValue": null,
                        "invalidAttrValue": null
                    },
                ],
                "fallback": null
              }
          }
      ]
      this.orderStoreDataArray.map((x,i)=>console.log(x,i))
  }

  getOrderStore() {
    // let loading = this.appService.loading();
    // // loading.present();
    // let url = `${AppConfig.API.warehouseList}?start=${this.start}&limit=${this.limit}`;
    //     this.appService.httpGet(url).then( data => {
    //     loading.dismiss();
    //     if (data.totalRecord == 0) {
    //       //空空如也
    //       this.noData = true;
    //     }else {
    //       this.noData = false;
    //       if( this.start < data.totalRecord ) {
    //         if (this.up) {
    //           this.orderStoreDataArray.push(...data.data);
    //           this.start+=10;
    //         }else if (this.down){
    //           this.orderStoreDataArray = [...data.data];
    //           this.start+=10;
    //         }
    //       }else {
    //           this.showNoMoreGift = true;
    //       }
    //     }
      
    //   }).catch(error => {
    //     console.log(error);
    //   });
  }
  //加
  addCount(index) {
    if (this.orderStoreDataArray[index].stock > this.orderStoreDataArray[index].productNum) {
      this.orderStoreDataArray[index].productNum++;
    }else {
      let toast = this.toastCtrl.create({
        message: '不能添加更多宝贝了哦',
        duration: 1000,
        position: 'middle'
      });
		  toast.present(toast);
    }
	  
  }
  //减
  removeCount(index) {
	  this.orderStoreDataArray[index].productNum = this.orderStoreDataArray[index].productNum === 1 ? 1 : (this.orderStoreDataArray[index].productNum - 1);
  }
  //删除
  delete() {
    console.log("delete")
  }
  resetCount() {

  }
  //确认订单
  addProductModal() {
    // let body = [];
    // let url = AppConfig.API.generateCode;
    // this.orderStoreDataArray.map(function(item) {
    //   let order = {};
    //   order['warehouseItemId'] = item.warehouseItemId;
    //   order['skuId'] = item.skuId;
    //   order['itemPrice'] = item.itemPrice;
    //   order['productNum'] = item.productNum;
    //   order['isSelected'] = item.isSelected;
    //   order['remark'] = item.remark;
    //   body.push(order);
    // })
    // this.appService.httpPut(url, body).then( data => {
    //   this.returnUrl = data;
    // }).catch(error=>{
    //   console.log(error);
    // })
    this.returnUrl = "http://www.61topbaby.com/evercos/payment/generateOrder.html?warehouseId=1";//后面要删除
    
    this.navCtrl.push(PaymentCode,{
      returnUrl: this.returnUrl
    });
  }

  refreshGetOrderStoreList(refresher) {
    // 下拉刷新请求数据
    // this.start = 0;
    // this.down = true;
    // this.up = false;
    // setTimeout(() => {
    //   this.getOrderStore();
    //   refresher.complete();
    // },1000)
  }
  infiniteGetOrderStoreList(infiniteScroll) {
    // 上拉刷新请求数据
    // this.down = false;
    // this.up = true;
    // setTimeout(() => {
    //   this.getOrderStore();
    //   infiniteScroll.complete();
    // },1000)
  }
}
