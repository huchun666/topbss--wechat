import { Login } from './../login/login';
import { Component} from '@angular/core';
import { ModalController, NavController, NavParams, AlertController} from 'ionic-angular';
import { OrderLayer } from '../order-layer/order-layer';
import { OrderStore } from '../order-store/order-store';
import { AppService, AppConfig } from '../../app/app.service';

@Component({
  selector: 'creat-order',
  templateUrl: 'creat-order.html',
})
export class CreatOrder {
  creatOrderArray: any;
  noData: Boolean;
  start: number;
  showNoMoreGift: Boolean = false;
  up: Boolean;//上拉刷新和第一次进入页面时
  down: Boolean;//下拉刷新和返回上一级页面时
  warehouseCount: number;//配单仓数目
  constructor(public modalCtrl: ModalController, 
    public navCtrl: NavController, 
    public alertCtrl: AlertController,
    public appService: 
  ) {
    // this.down = false;
		// this.up = true;
    // this.getHandleSelfGiftList();
    // this.getWarehouseCount();
    this.warehouseCount = 6;//后面要删除
    this.creatOrderArray = [
      {
        "brandshopSeq": 286,  //门店id
        "productSeq": 485,        //商品id
        "productName": "多乐米 背心",    //商品名称
        "productNo": "PROD0000006607",
        "productCreateDate": 1487670689000,
        "salesVolume": 43,        
        "fileSeq": "../assets/image/productimg2.png"           //商品图片
      },
      {
        "brandshopSeq": 286,
        "productSeq": 496,
        "productName": "迪士尼门票（门票类商品）",
        "productNo": "PROD0000006801",
        "productCreateDate": 1493185732000,
        "salesVolume": 1,
        "fileSeq": "../assets/image/productimg2.png"
      },
      {
        "brandshopSeq": 286,
        "productSeq": 496,
        "productName": "迪士尼门票（门票类商品）",
        "productNo": "PROD0000006801",
        "productCreateDate": 1493185732000,
        "salesVolume": 1,
        "fileSeq": "../assets/image/productimg2.png"
      },
      {
        "brandshopSeq": 286,
        "productSeq": 496,
        "productName": "迪士尼门票（门票类商品）",
        "productNo": "PROD0000006801",
        "productCreateDate": 1493185732000,
        "salesVolume": 1,
        "fileSeq": "../assets/image/productimg2.png"
      },
      {
        "brandshopSeq": 286,
        "productSeq": 496,
        "productName": "迪士尼门票（门票类商品）",
        "productNo": "PROD0000006801",
        "productCreateDate": 1493185732000,
        "salesVolume": 1,
        "fileSeq": "../assets/image/productimg2.png"
      }
    ]
  }

  //进入页面，请求接口，得到数据
  getCreatOrderList() {
    let loading = this.appService.loading();
		// loading.present();
    let url = `$(AppConfig.API.)?brandshopSeq=$(this.brandshopSeqId)&start=$(this.start)&limit=10`;
    this.appService.httpGet(url).then( data => {
      loading.dismiss();
      if (data.totalRecord == 0) {
        //空空如也
        this.noData = true;
      }else {
        this.noData = false;
        if( this.start < data.totalRecord ) {
          if (this.up) {
            this.creatOrderArray.push(...data.data);
            this.start+=10;
          }else if (this.down){
            this.creatOrderArray = [...data.data];
            this.start+=10;
          }
        }else {
          this.showNoMoreGift = true;
        }
      }
      
      }).catch(error => {
        console.log(error);
      });
  }
  addProductModal(index) {
	  const orderModal = this.modalCtrl.create(OrderLayer, {
      productSeq: this.creatOrderArray[index].productSeq,
      productName: this.creatOrderArray[index].productName,
      warehouseCount: this.warehouseCount
    }, {
	    cssClass: 'order-sku-list'
    });
    orderModal.onDidDismiss(data => {
      this.warehouseCount = data.warehouseCount;
    })
	  orderModal.present();
  }
  orderRepertory () {
	  this.navCtrl.push(OrderStore);
  }
  // 搜索
  onInput(event) {
    console.log(event.target.value)
  }
  refreshGetCreatOrderList(refresher) {
    // 下拉刷新请求数据
    // this.start = 0;
    // this.down = true;
	  // this.up = false;
    // setTimeout(() => {
    //   this.getCreatOrderList();
    //   refresher.complete();
    // },1000)
  }
  infiniteGetCreatOrderList(infiniteScroll) {
    // 上拉刷新请求数据
    // this.down = false;
	  // this.up = true;
    // setTimeout(() => {
    //   this.getCreatOrderList();
    //   infiniteScroll.complete();
    // },1000)
  }

  //查看配单仓订单总数
  getWarehouseCount() {
    // let url = `$(AppConfig.API.)`;
    //   this.appService.httpGet(url).then( number => {
    //     this.warehouseCount = number;
    //   }).catch(error => {
    //   console.log(error);
    // });
  }

}
