import { Component} from '@angular/core';
import { NavController, NavParams, ModalController, AlertController } from 'ionic-angular';
import { PaymentCode } from '../payment-code/payment-code';
import { AppService, AppConfig } from '../../app/app.service';
@Component({
  selector: 'order-store',
  templateUrl: 'order-store.html'
})
export class OrderStore {
  start: number = 0;
  limit: number = 10;
  showNoMore: Boolean = false;
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
    public appService: AppService,
  ) {
    this.start = 0;
    this.down = true;
	  this.up = false;
    this.getOrderStore();
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
              this.orderStoreDataArray = data.data;
              console.log(this.orderStoreDataArray)
              this.start += this.limit;
            }
          }else {
              this.showNoMore = true;
          }
        }
      
      }).catch(error => {
        loading.dismiss();
        console.log(error);
        this.appService.toast('网络异常，请稍后再试', 1000, 'middle');
      });
  }

  //更新的函数
  warehouseUpdate(index) {
    let body = [];
    let url = AppConfig.API.warehouseUpdate;
    this.orderStoreDataArray.map(function(item) {
      console.log(item.productNum)
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
      this.appService.toast('更新失败！', 1000, 'middle');
    })
  }

  //加
  addCount(index) {
    if (this.orderStoreDataArray[index].productSkuDTO.stock > this.orderStoreDataArray[index].productNum) {//this.orderStoreDataArray[index].productSkuDTO.stock
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
    this.orderStoreDataArray.splice(index,1);
    let url = `${AppConfig.API.warehouseDeleteById}?id=${this.orderStoreDataArray[index].warehouseItemId}`;
    this.appService.httpDelete(url).then( data => {
      if (data.type == "success") {
        console.log("delete success")
      }
    }).catch(error => {
      console.log(error);
      this.appService.toast('删除失败', 1000, 'middle');
    })
  }
  //失去焦点
  resetCount(index) {
    this.warehouseUpdate(index);
  }
  //确认订单
  addProductModal() {
    let url = `${AppConfig.API.warehouseGenerateCode}`;
    this.appService.httpGetReturnData(url).then( data => {
      this.returnUrl = data['_body'];
      console.log(this.returnUrl);
    }).catch(error=>{
      console.log(error);
      this.appService.toast('操作失败', 1000, 'middle');
    })
    // this.returnUrl = "http://www.61topbaby.com/evercos/payment/generateOrder.html?warehouseId=1";//后面要删除
    
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
      console.log(data)
      refresher.complete();
      if (data.count == 0) {
        //空空如也
        this.noData = true;
      }else {
        this.noData = false;
        if (data.data.length != 0) {
          this.orderStoreDataArray = data.data;
          this.start += this.limit;
        }else {
          this.showNoMore = true;
        }
      }
    
    }).catch(error => {
      refresher.complete();
      console.log(error);
      this.appService.toast('网络异常，请稍后再试', 1000, 'middle');
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
        if (data.data.length != 0) {
          this.orderStoreDataArray.push(...data.data);
          this.start += this.limit;
        }else {
          this.showNoMore = true;
        }
      }
    }).catch(error => {
      infiniteScroll.complete();
      console.log(error);
      this.appService.toast('网络异常，请稍后再试', 1000, 'middle');
    });
  }
}
