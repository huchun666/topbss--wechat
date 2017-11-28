import { Component, ViewChild } from '@angular/core';
import { NavController, NavParams, ModalController, AlertController, Content } from 'ionic-angular';
import { PaymentCode } from '../payment-code/payment-code';
import { AppService, AppConfig } from '../../app/app.service';
@Component({
  selector: 'order-store',
  templateUrl: 'order-store.html'
})
export class OrderStore {
  @ViewChild(Content) content: Content;
  start: number = 0;
  limit: number = 50;
  noData: Boolean;
  up: Boolean;//上拉刷新和第一次进入页面时
  down: Boolean;//下拉刷新和返回上一级页面时
  orderStoreDataArray: any = [];//得到的数据里面的data数组
  returnUrl: string;//返回得到的url字符串
  loadingShow: Boolean = true;
  load: any = {}; 
  totalPrice: number = 0;
  confirmOrder: Boolean = false;
  totalPriceFloat: any;
  overStock: Boolean;
  requestDefeat: Boolean = false;
  constructor(
    public navCtrl: NavController,
    public modalCtrl: ModalController,
    public alertCtrl: AlertController,
    public appService: AppService,
  ) {
    this.start = 0;
    this.down = true;
    this.up = false;
    this.load = AppConfig.load;
    this.getOrderStore();
    
  }

  getOrderStore() {
    let url = `${AppConfig.API.warehouseList}?start=${this.start}&limit=${this.limit}`;
        this.appService.httpGet(url).then( data => {
        this.loadingShow = false;
        if (data.count == 0) {
          //空空如也
          this.noData = true;
          this.confirmOrder = false;
        }else {
          this.noData = false;
          this.confirmOrder = true;
          if (this.up) {
            this.orderStoreDataArray.push(...data.data);
            this.start += this.limit;
          }else if (this.down){
            this.orderStoreDataArray = data.data;
            this.start += this.limit;
          }
          this.orderStoreDataArray.map((item) => {
            this.totalPrice += item.itemPrice;
          })
          this.orderStoreDataArray.map((item) => {
            item.productSkuDTO.attrValueList.map((single) => {
              if (single.fileSeq) {
                item.productSkuDTO.fileSeq = single.fileSeq;
                return
              }
            })
          })
          this.totalPriceFloat = parseFloat(`${this.totalPrice.toString()}`).toFixed(2);
        }
      
      }).catch(error => {
        this.loadingShow = false;
        this.requestDefeat = true;
        console.log(error);
      });
  }

  //更新的函数
  warehouseUpdate(index) {
    let body = [];
    let url = AppConfig.API.warehouseUpdate;
    let loading = this.appService.loading();
    loading.present();
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
        loading.dismiss();
        console.log("update success!")
        this.totalPrice = 0;
        this.orderStoreDataArray.map((item) => {
          this.totalPrice += item.itemPrice;
        })
        this.totalPriceFloat = parseFloat(`${this.totalPrice.toString()}`).toFixed(2);
      }
    }).catch(error=>{
      loading.dismiss();
      console.log(error);
      this.appService.toast('更新失败，请稍后再试', 1000, 'middle');
    })
  }

  //加
  addCount(index) {
    if (this.orderStoreDataArray[index].productSkuDTO.stock > this.orderStoreDataArray[index].productNum) {
      this.orderStoreDataArray[index].productNum++;
      this.warehouseUpdate(index);
    }else {
      this.appService.toast('不能添加更多宝贝了哦！', 1000, 'middle');
    }
  }
  //减
  removeCount(index) {
    if (this.orderStoreDataArray[index].productNum > 1) {
      this.orderStoreDataArray[index].productNum--;
      this.warehouseUpdate(index);
    }
  }
  //删除
  delete(index) {
    let loading = this.appService.loading();
    loading.present();
    let url = `${AppConfig.API.warehouseDeleteById}?id=${this.orderStoreDataArray[index].warehouseItemId}`;
    this.appService.httpDelete(url).then( data => {
      if (data.type == "success") {
        loading.dismiss();
        this.orderStoreDataArray.splice(index,1);
        this.totalPrice = 0;
        this.orderStoreDataArray.map((item) => {
          this.totalPrice += item.itemPrice;
        })
        this.totalPriceFloat = parseFloat(`${this.totalPrice.toString()}`).toFixed(2);
        if (this.orderStoreDataArray.length == 0) {
          this.confirmOrder = false;
          this.noData = true;
        }
      }
    }).catch(error => {
      loading.dismiss();
      console.log(error);
      this.appService.toast('删除失败，请稍后再试', 1000, 'middle');
    })
  }
  //失去焦点
  resetCount(index) {
    this.warehouseUpdate(index);
  }
  resetProductNum(index) {
    if (this.orderStoreDataArray[index].productSkuDTO.stock >= this.orderStoreDataArray[index].productNum) {
      this.warehouseUpdate(index);
    }else {
      this.appService.toast('不能超出库存哦', 1000, 'middle');
      this.orderStoreDataArray[index].productNum = this.orderStoreDataArray[index].productSkuDTO.stock;
    }
  }
  //确认订单
  addProductModal() {
    let loading = this.appService.loading();
    loading.present();
    let url = `${AppConfig.API.warehouseGenerateCode}`;
    this.appService.httpGetReturnData(url).then( data => {
      loading.dismiss();
      this.returnUrl = data['_body'];
      this.navCtrl.push(PaymentCode,{
        returnUrl: this.returnUrl,
        totalPriceFloat: this.totalPriceFloat
      });
    }).catch(error=>{
      loading.dismiss();
      console.log(error);
      this.appService.toast('操作失败，请稍后再试', 1000, 'middle');
    })
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
        this.orderStoreDataArray = data.data;
        this.start += this.limit;
      }
    
    }).catch(error => {
      refresher.complete();
      console.log(error);
      this.appService.toast('网络异常，请稍后再试', 1000, 'middle');
    });
  }

  //请求失败后刷新
  requestDefeatRefresh() {
    this.requestDefeat = false;
    this.loadingShow = true;
    this.start = 0;
    this.down = true;
    this.up = false;
    this.getOrderStore();
  }
}
