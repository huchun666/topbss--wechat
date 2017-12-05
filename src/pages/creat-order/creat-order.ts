import { Component} from '@angular/core';
import { ModalController, NavController, AlertController } from 'ionic-angular';
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
  start: number = 0;
  limit: number = 20;
  showNoMore: Boolean = false;
  up: Boolean;//上拉刷新和第一次进入页面时
  down: Boolean;//下拉刷新和返回上一级页面时
  warehouseCount: number;//配单仓数目
  searchKeyWord: string = '';//搜索内容
  loadingShow: Boolean = true;
  load: any = {}; 
  requestDefeat: Boolean = false;
  showInfinite: Boolean = false;
  constructor(public modalCtrl: ModalController, 
    public navCtrl: NavController, 
    public alertCtrl: AlertController,
    public appService: AppService,
  ) {
    this.down = true;
    this.up = false;
    this.load = AppConfig.load;
    this.creatOrderArray = [];
    this.getCreatOrderList();
  }

  //进入页面，请求接口，得到数据
  getCreatOrderList() {
    this.loadingShow = true;
    console.log(this.searchKeyWord)
    let url = `${AppConfig.API.getBrandshopProducts}?brandshopSeq=133&start=${this.start}&limit=${this.limit}`;
    // 网络状况不好时，点击刷新按钮，保留搜索栏的关键字进行刷新
    if(this.searchKeyWord != '' && this.searchKeyWord != undefined) {
      url = url + `&searchKeyWord=${this.searchKeyWord}`;
    }
    this.appService.httpGet(url).then( data => {
      this.loadingShow = false;
      if (data.count == 0) {
        //空空如也
        this.noData = true;
      }else {
        this.noData = false;
        this.showInfinite = true;
        if( this.start < data.count ) {
          if (this.up) {
            this.creatOrderArray.push(...data.data);
            this.start += this.limit;
          }else if (this.down){
            this.creatOrderArray = data.data;
            this.start += this.limit;
          }
        }else {
          this.showNoMore = true;
        }
      }
      
    }).catch(error => {
      this.showInfinite = false;
      this.loadingShow = false;
      this.requestDefeat = true;
      console.log(error);
    });
  }

  addProductModal(index) {
	  const orderModal = this.modalCtrl.create(OrderLayer, {
      productSeq: this.creatOrderArray[index].productSeq,
      productName: this.creatOrderArray[index].productName,
      warehouseCount: this.warehouseCount,
      fileSeq: this.creatOrderArray[index].fileSeq
    }, {
	    cssClass: 'order-sku-list'
    });
	  orderModal.present();
  }
  orderRepertory () {
	  this.navCtrl.push(OrderStore);
  }

  // 搜索
  onInput(event) {
    this.down = true;
    this.up = false;
    this.start = 0;
    this.requestDefeat = false;
    this.searchKeyWord = event.target.value;
    if (this.searchKeyWord){
      this.loadingShow = true;
      let url = `${AppConfig.API.getBrandshopProducts}?brandshopSeq=133&searchKeyWord=${this.searchKeyWord}&start=${this.start}&limit=${this.limit}`;
      this.appService.httpGet(url).then( data => {
        this.loadingShow = false;
        if (data.count == 0) {
          //空空如也
          this.noData = true;
        }else {
          this.noData = false;
          this.showInfinite = true;
          if( this.start < data.count ) {
            if (this.up) {
              this.creatOrderArray.push(...data.data);
              this.start += this.limit;
            }else if (this.down){
              this.creatOrderArray = data.data;
              this.start += this.limit;
            }
          }else {
            this.showNoMore = true;
          }
        }
      }).catch(error => {
        console.log(error);
        this.requestDefeat = true;
        this.showInfinite = false;
        this.loadingShow = false;
      });
    }else {
      this.start = 0;
      this.down = true;
      this.up = false;
      this.getCreatOrderList();
    }
  }

  // 下拉刷新请求数据
  refreshGetCreatOrderList(refresher) {
    this.start = 0;
    this.down = true;
    this.up = false;
    this.requestDefeat = false;
    let url = `${AppConfig.API.getBrandshopProducts}?brandshopSeq=133&start=${this.start}&limit=${this.limit}`;
    // 下拉刷新时，判断当前搜索框的关键字是否为空 
    if(this.searchKeyWord != '') {
      url = url + `&searchKeyWord=${this.searchKeyWord}`
    }
    this.appService.httpGet(url).then( data => {
      refresher.complete();
      if (data.count == 0) {
        //空空如也
        this.noData = true;
      }else {
        this.noData = false;
        this.showInfinite = true;
        if (data.data.length != 0) {
          this.creatOrderArray = data.data;
          this.start += this.limit;
        }else {
          this.showNoMore = true;
        }
      }
    }).catch(error => {
      refresher.complete();
      console.log(error);
      this.showInfinite = false;
      this.requestDefeat = true;
    });
  }

  // 上拉刷新请求数据
  infiniteGetCreatOrderList(infiniteScroll) {
    this.down = false;
	  this.up = true;
    if (this.searchKeyWord) {
      let url = `${AppConfig.API.getBrandshopProducts}?brandshopSeq=133&searchKeyWord=${this.searchKeyWord}&start=${this.start}&limit=${this.limit}`;
      this.appService.httpGet(url).then( data => {
        infiniteScroll.complete();
        if (data.count == 0) {
          //空空如也
          this.noData = true;
        }else {
          if (data.data.length != 0) {
            this.creatOrderArray.push(...data.data);
            this.start += this.limit;
          }else {
            this.showNoMore = true;
          }
        }
      }).catch(error => {
        console.log(error);
        this.requestDefeat = true;
      });
    }else {
      let url = `${AppConfig.API.getBrandshopProducts}?brandshopSeq=133&start=${this.start}&limit=${this.limit}`;
      this.appService.httpGet(url).then( data => {
        infiniteScroll.complete();
        if (data.count == 0) {
          //空空如也
          this.noData = true;
        }else {
          this.noData = false;
          if (data.data.length != 0) {
            this.creatOrderArray.push(...data.data);
            this.start += this.limit;
          }else {
            this.showNoMore = true;
          }
        }
      }).catch(error => {
        infiniteScroll.complete();
        console.log(error);
        this.requestDefeat = true;
      });
    }
  }

  //查看配单仓订单总数
  getWarehouseCount() {
    let url = `${AppConfig.API.warehouseGetCount}`;
    this.appService.httpGet(url).then( number => {
      this.warehouseCount = number;
      this.showInfinite = true;
    }).catch(error => {
      console.log(error);
      this.showInfinite = false;
      this.requestDefeat = true;
    });
  }

  //再来一单按钮进来后，更新配单仓数量
  ionViewDidEnter() {
    this.getWarehouseCount();
  }

  //请求失败后刷新
  requestDefeatRefresh() {
    this.requestDefeat = false;
    this.loadingShow = true;
    this.start = 0;
    this.down = true;
    this.up = false;
    this.requestDefeat = false;
    this.getCreatOrderList();
  }
}
