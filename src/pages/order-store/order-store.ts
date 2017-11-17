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
  orderStoreDataArray: any = [];//得到的数据里面的data数组
  returnUrl: string;//返回得到的url字符串
  constructor(
    public navCtrl: NavController,
    public modalCtrl: ModalController,
    public alertCtrl: AlertController,
    public toastCtrl: ToastController,
    public appService: AppService,
  ) {
    this.start = 0;
    this.down = true;
	  this.up = false;
    this.getOrderStore();
    // this.orderStoreDataArray = 
    //   [
    //       {
    //           "warehouseItemId": 1,
    //           "warehouseId": 3,
    //           "skuId": 1020,
    //           "itemPrice": 23.34,
    //           "productNum": 2,
    //           "remark": "测试添加配单仓商品1号",
    //           "isSelected": 1,
    //           "status": 1,
    //           "createTime": 1509507135000,
    //           "stock": 4,
    //           "productSkuDTO": {
    //               "productSeq": 347,
    //               "skuSeq": 1020,
    //               "productName": "1031测试门票1",
    //               "fileName": null,
    //               "attrValueList": [
    //                   {
    //                       "skuSeq": null,
    //                       "attrSeq": 1136,
    //                       "attrName": "门票颜色",
    //                       "attrValue": "白色",
    //                       "type": null,
    //                       "fileSeq": "../assets/image/productimg2.png",
    //                       "price": null,
    //                       "selectedAttrValue": null,
    //                       "invalidAttrValue": null
    //                   },
    //                   {
    //                       "skuSeq": null,
    //                       "attrSeq": 1121,
    //                       "attrName": "门票种类",
    //                       "attrValue": "标准票",
    //                       "type": null,
    //                       "fileSeq": "../assets/image/productimg2.png",
    //                       "price": null,
    //                       "selectedAttrValue": null,
    //                       "invalidAttrValue": null
    //                   },
    //               ],
    //               "fallback": null
    //           }
    //       },
    //       {
    //           "warehouseItemId": 2,
    //           "warehouseId": 3,
    //           "skuId": 998,
    //           "itemPrice": 23.34,
    //           "productNum": 3,
    //           "remark": "测试添加配单仓商品1号",
    //           "isSelected": 1,
    //           "status": 1,
    //           "createTime": 1509514319000,
    //           "stock": 5,
    //           "productSkuDTO": {
    //             "productSeq": 347,
    //             "skuSeq": 1020,
    //             "productName": "1031测试门票1",
    //             "fileName": null,
    //             "attrValueList": [
    //                 {
    //                     "skuSeq": null,
    //                     "attrSeq": 1136,
    //                     "attrName": "门票颜色",
    //                     "attrValue": "白色",
    //                     "type": null,
    //                     "fileSeq": "../assets/image/productimg2.png",
    //                     "price": null,
    //                     "selectedAttrValue": null,
    //                     "invalidAttrValue": null
    //                 },
    //                 {
    //                     "skuSeq": null,
    //                     "attrSeq": 1121,
    //                     "attrName": "门票种类",
    //                     "attrValue": "标准票",
    //                     "type": null,
    //                     "fileSeq": "../assets/image/productimg2.png",
    //                     "price": null,
    //                     "selectedAttrValue": null,
    //                     "invalidAttrValue": null
    //                 },
    //             ],
    //             "fallback": null
    //           }
    //       }
    //   ]
  }

  getOrderStore() {
    let loading = this.appService.loading();
    loading.present();
    let url = `${AppConfig.API.warehouseList}?start=${this.start}&limit=${this.limit}`;
        this.appService.httpGet(url).then( data => {
        console.log(data)
        loading.dismiss();
        if (data.count == 0) {
          //空空如也
          this.noData = true;
        }else {
          this.noData = false;
          if( this.start < data.count ) {
            if (this.up) {
              this.orderStoreDataArray.push(...data.data);
              console.log(this.orderStoreDataArray)
              this.start += this.limit;
            }else if (this.down){
              this.orderStoreDataArray = [...data.data];
              console.log(this.orderStoreDataArray)
              this.start += this.limit;
            }
          }else {
              this.showNoMoreGift = true;
          }
        }
      
      }).catch(error => {
        loading.dismiss();
        console.log(error);
        let toast = this.toastCtrl.create({
          message: '网络异常，请稍后再试',
          duration: 1000,
          position: 'middle'
        });
        toast.present(toast);
      });
  }

  //更新的函数
  warehouseUpdate(index) {
    let body = [];
    let url = AppConfig.API.warehouseUpdate;
    this.orderStoreDataArray.map(function(item) {
      let order = {};
      order['warehouseItemId'] = item.warehouseItemId;
      order['itemPrice'] = item.itemPrice;
      order['productNum'] = item.productNum;
      order['remark'] = item.remark;
      body.push(order);
    })
    this.appService.httpPut(url, body[index]).then( data => {
      if (data.type=="success") {
        console.log("update success!")
      }
    }).catch(error=>{
      console.log(error);
    })
  }

  //加
  addCount(index) {
    if (this.orderStoreDataArray[index].productSkuDTO.stock > this.orderStoreDataArray[index].productNum) {//this.orderStoreDataArray[index].productSkuDTO.stock
      this.orderStoreDataArray[index].productNum++;
      this.warehouseUpdate(index);
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
    if (this.orderStoreDataArray[index].productNum != 1) {
      this.warehouseUpdate(index);
    }
  }
  //删除
  delete(index) {
    this.orderStoreDataArray.splice(index,1);
    let url = `${AppConfig.API.warehouseDeleteById}?id=${this.orderStoreDataArray[index].warehouseItemId}`;
    this.appService.httpDelete(url).then( data => {
      if (data.type == "success") {
        console.log("delete success")
      }
    }).catch(error => {
      console.log(error);
    })
  }
  //失去焦点
  resetCount(index) {
    this.warehouseUpdate(index);
  }
  //确认订单
  addProductModal() {
    // let url = `${AppConfig.API.warehouseGenerateCode}`;
    // this.appService.httpGet(url).then( data => {
    //   // this.returnUrl = data['_body'];
    //   console.log(data);
    // }).catch(error=>{
    //   console.log(error);
    // })
    this.returnUrl = "http://www.61topbaby.com/evercos/payment/generateOrder.html?warehouseId=1";//后面要删除
    
    this.navCtrl.push(PaymentCode,{
      returnUrl: this.returnUrl
    });
  }

  // 下拉刷新请求数据
  refreshGetOrderStoreList(refresher) {
    this.start = 0;
    this.down = true;
    this.up = false;
    let url = `${AppConfig.API.warehouseList}?start=${this.start}&limit=${this.limit}`;
    this.appService.httpGet(url).then( data => {
      refresher.complete();
      if (data.count == 0) {
        //空空如也
        this.noData = true;
      }else {
        this.noData = false;
        if( this.start < data.count ) {
          if (this.up) {
            this.orderStoreDataArray.push(...data.data);
            console.log(this.orderStoreDataArray)
            this.start += this.limit;
          }else if (this.down){
            this.orderStoreDataArray = [...data.data];
            console.log(this.orderStoreDataArray)
            this.start += this.limit;
          }
        }else {
            this.showNoMoreGift = true;
        }
      }
    
    }).catch(error => {
      refresher.complete();
      console.log(error);
      let toast = this.toastCtrl.create({
        message: '网络异常，请稍后再试',
        duration: 1000,
        position: 'middle'
      });
      toast.present(toast);
    });
  }

  // 上拉刷新请求数据
  infiniteGetOrderStoreList(infiniteScroll) {
    this.down = false;
    this.up = true;
    let url = `${AppConfig.API.warehouseList}?start=${this.start}&limit=${this.limit}`;
    this.appService.httpGet(url).then( data => {
      infiniteScroll.complete();
      if (data.count == 0) {
        //空空如也
        this.noData = true;
      }else {
        this.noData = false;
        if( this.start < data.count ) {
          if (this.up) {
            this.orderStoreDataArray.push(...data.data);
            console.log(this.orderStoreDataArray)
            this.start += this.limit;
          }else if (this.down){
            this.orderStoreDataArray = [...data.data];
            console.log(this.orderStoreDataArray)
            this.start += this.limit;
          }
        }else {
            this.showNoMoreGift = true;
        }
      }
    
    }).catch(error => {
      infiniteScroll.complete();
      console.log(error);
      let toast = this.toastCtrl.create({
        message: '网络异常，请稍后再试',
        duration: 1000,
        position: 'middle'
      });
      toast.present(toast);
    });
  }
}
