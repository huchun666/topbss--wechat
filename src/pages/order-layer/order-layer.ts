import { Component} from '@angular/core';
import { NavController, NavParams, ViewController, ToastController } from 'ionic-angular';
import { AppService, AppConfig } from '../../app/app.service';
@Component({
  selector: 'order-layer',
  templateUrl: 'order-layer.html'
})
export class OrderLayer {
  skuSize: string = "110";
  skuColor: string = "蓝色";
  count: number = 1;

  orderLayerData: any;//请求接口得到的数据
  attrMap: any = [];//转换后的数据（数组格式）
  productSeq: number;//商品ID
  productName: string;//商品名称
  noData: Boolean;
  start: number;
  showNoMoreGift: Boolean = false;
  up: Boolean;//上拉刷新和第一次进入页面时
  down: Boolean;//下拉刷新和返回上一级页面时
  skuAttrValue: any;//sku切换时选中的值
  attrSeqArr: any;//选中属性的attrSeq数组
  attrValueArr: any;//选中属性的attrValue数组
  warehouseCount: number;

  constructor(
    public navCtrl: NavController, 
    public viewCtrl: ViewController, 
    public navParams: NavParams,
    public appService: AppService,
    public toastCtrl: ToastController,
  ) {
    //this.getProductSkuWithDefault();
    this.productSeq = navParams.get('productSeq');
    this.productName = navParams.get('productName');
    this.warehouseCount = navParams.get('warehouseCount');
    this.attrSeqArr = [];
    this.attrValueArr = [];
    
    this.orderLayerData = {
      "brandshopSeq": 133,  //门店ID
      "productSeq": 367,    //商品ID
      "skuLength": 7,       //sku属性组合长度
      "skuSeq": 1049,       //sku ID
      "price": 333.00,      //淘璞价
      "stock": 5,                   //库存整数/null
      "attrMap": {          //sku属性组合
        "1136": [               //属性ID
          {
            "skuSeq": 1049, 
            "attrSeq": 1136,    
            "attrName": "颜色", //属性名
            "attrValue": "白色",      //属性值
            "type": "S",                    
            "fileSeq": null,                //属性图片
            "price": 333.00,
            "selectedAttrValue": "白色",   //默认选中的属性
            "invalidAttrValue": "invalidAttrValue"    //是否置灰,null-不置灰,"invalidAttrValue"-置灰不可选
          },
          {
            "skuSeq": 1049, 
            "attrSeq": 1136,    
            "attrName": "颜色", //属性名
            "attrValue": "红色",      //属性值
            "type": "S",                    
            "fileSeq": null,                //属性图片
            "price": 333.00,
            "selectedAttrValue": "白色",   //默认选中的属性
            "invalidAttrValue": "invalidAttrValue"    //是否置灰,null-不置灰,"invalidAttrValue"-置灰不可选
          },
          {
            "skuSeq": 1049, 
            "attrSeq": 1136,    
            "attrName": "颜色", //属性名
            "attrValue": "绿色",      //属性值
            "type": "S",                    
            "fileSeq": null,                //属性图片
            "price": 333.00,
            "selectedAttrValue": "白色",   //默认选中的属性
            "invalidAttrValue": "invalidAttrValue"    //是否置灰,null-不置灰,"invalidAttrValue"-置灰不可选
          },
          {
            "skuSeq": 1049, 
            "attrSeq": 1136,    
            "attrName": "颜色", //属性名
            "attrValue": "蓝色",      //属性值
            "type": "S",                    
            "fileSeq": null,                //属性图片
            "price": 333.00,
            "selectedAttrValue": "白色",   //默认选中的属性
            "invalidAttrValue": null    //是否置灰,null-不置灰,"invalidAttrValue"-置灰不可选
          },
          {
            "skuSeq": 1049, 
            "attrSeq": 1136,    
            "attrName": "颜色", //属性名
            "attrValue": "黄色",      //属性值
            "type": "S",                    
            "fileSeq": null,                //属性图片
            "price": 333.00,
            "selectedAttrValue": "白色",   //默认选中的属性
            "invalidAttrValue": null    //是否置灰,null-不置灰,"invalidAttrValue"-置灰不可选
          }
        ],
        "1158": [
          {
            "skuSeq": 1049,
            "attrSeq": 1158,
            "attrName": "入园",
            "attrValue": "凭借门票凭证换取门票入园",
            "type": "S",
            "fileSeq": null,
            "price": 333.00,
            "selectedAttrValue": "刷身份证件入园",
            "invalidAttrValue": "invalidAttrValue"
          },
          {
            "skuSeq": 1052,
            "attrSeq": 1158,
            "attrName": "入园",
            "attrValue": "刷身份证件入园",
            "type": "S",
            "fileSeq": null,
            "price": 333.00,
            "selectedAttrValue": "刷身份证件入园",
            "invalidAttrValue": "invalidAttrValue"
          }
        ],
        "1124": [
          {
            "skuSeq": 1049,
            "attrSeq": 1124,
            "attrName": "入园",
            "attrValue": "无",
            "type": "S",
            "fileSeq": null,
            "price": 333.00,
            "selectedAttrValue": "无",
            "invalidAttrValue": "invalidAttrValue"
          }
        ]
      }
    }
    // this.attrMap = [];
    this.skuAttrValue = [];
    for(let key in this.orderLayerData.attrMap){//后面需要将这个转换数据的注释掉
      this.attrMap.push(this.orderLayerData.attrMap[key])
    }
    console.log(this.attrMap)
    for(let i=0;i<this.attrMap.length;i++){
      this.skuAttrValue.push(this.attrMap[i][0].selectedAttrValue);
    }
    for(let i=0;i<this.attrMap.length;i++){
      this.attrSeqArr.push(this.attrMap[i][0].attrSeq);
    }
    this.attrValueArr = this.skuAttrValue;
    console.log(this.attrSeqArr)
    console.log(this.attrValueArr)
  }

  //初始化sku属性
  getProductSkuWithDefault() {
    let loading = this.appService.loading();
		// loading.present();
    let url = `$(AppConfig.API.)?brandshopSeq=$(this.brandshopSeqId)&productSeq=$(this.productSeq)`;
    this.appService.httpGet(url).then( data => {
      loading.dismiss();
      if (data.skuLength != 0) {
        this.orderLayerData = data;
        // this.orderLayerData.attrArray = [];
        // for(let key in this.orderLayerData.attrMap){
        //   this.orderLayerData.attrArray.push(this.orderLayerData.attrMap[key])
        // }
      }else {
        this.orderLayerData = {}
      }
      
    }).catch(error => {
      console.log(error);
    });
  }

  dismiss() {
    let data = { 'warehouseCount': this.warehouseCount };
    this.viewCtrl.dismiss(data);
  }

  addCount() {
    if (this.orderLayerData.stock > this.count) {
      this.count++;
    }else {
      let toast = this.toastCtrl.create({
        message: '不能添加更多宝贝了哦',
        duration: 1000,
        position: 'middle'
      });
		  toast.present(toast);
    }
	  
  }

  removeCount() {
	  this.count = this.count === 1 ? 1 : (this.count - 1);
  }

  //输入数字为负数时重置为1
  resetCount() {
	  this.count = this.count <= 0 ? 1 : this.count;
  }

  // 切换sku属性时
  changeRadio(event,index) {
    var currentValue = event.target.getAttribute("ng-reflect-value");
    if (this.attrValueArr[index] != currentValue){
      this.attrValueArr[index] = currentValue;
      // let url = `$(AppConfig.API.)?brandshopSeq=$(this.brandshopSeqId)&productSeq=$(this.orderLayerData.productSeq)&skulength=$(this.orderLayerData.skulength)&attrSeqArr=(this.attrSeqArr)&attrValueArr=$(this.attrValueArr)`;
      //   this.appService.httpGet(url).then( data => {
      //     this.orderLayerData = data;
      //   }).catch(error => {
      //   console.log(error);
      // });
      console.log(this.attrValueArr);
    }else{
      this.attrValueArr[index] = "";
      event.target.setAttribute("checked",false);
      console.log(this.attrValueArr);
    }
  }

  //确认添加
  affirmAdd() {
    // let url = AppConfig.API.;
    // let body = {
    //   "productId": this.orderLayerData.productSeq,
    //   "skuId": this.orderLayerData.skuSeq,
    //   "itemPrice": this.orderLayerData.price,
    //   "productNum": this.count,
    //   "remark": ""
    // }
    // this.appService.httpPost(url, body).then( data => {
    //   if (data.type=='success') {
    //     this.warehouseCount++;
    //     this.dismiss();
    //   }
    // }).catch( error => {
    //   console.log(error.message);
    // })
  }

}
