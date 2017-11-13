import { Component} from '@angular/core';
import { NavController, NavParams, ModalController, AlertController, ToastController } from 'ionic-angular';
import { PaymentCode } from '../payment-code/payment-code';
@Component({
  selector: 'order-store',
  templateUrl: 'order-store.html'
})
export class OrderStore {
  // count: number = 2;
  total: number = 200.00;

  orderStoreData: any;
  orderStoreDataArray: any;//得到的数据里面的data数组
  constructor(
    public navCtrl: NavController,
    public modalCtrl: ModalController,
    public alertCtrl: AlertController,
    public toastCtrl: ToastController,
  ) {
    this.orderStoreData = {
      "count": 2,
      "data": [
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
      ],
      "pageParamModel": null
    }
    this.orderStoreDataArray = this.orderStoreData.data;
    console.log(this.orderStoreDataArray)
  }

  getOrderStore() {

  }
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

  removeCount(index) {
	  this.orderStoreDataArray[index].productNum = this.orderStoreDataArray[index].productNum === 1 ? 1 : (this.orderStoreDataArray[index].productNum - 1);
  }
  delete() {
    
  }
  resetCount() {

  }
  addProductModal() {
    this.navCtrl.push(PaymentCode);
  }
}
