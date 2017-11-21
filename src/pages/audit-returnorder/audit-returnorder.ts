import { Component } from '@angular/core';
import { NavController, NavParams, ModalController, AlertController } from 'ionic-angular';
import { ReturnedDetail } from '../returned-detail/returned-detail';
import { AppService, AppConfig } from '../../app/app.service';
@Component({
  selector: 'audit-returnorder',
  templateUrl: 'audit-returnorder.html'
})
export class AuditReturnorder {
  auditReturnorderArray: any;
  limit: number = 10; 
  up: Boolean = true;//上拉刷新和第一次进入页面时
  down: Boolean = false;//下拉刷新和返回上一级页面时
  noData: Boolean = false;
  start: number = 0;
  showNoMore: Boolean = false;
  constructor(
    public navCtrl: NavController,
    public modalCtrl: ModalController,
    public alertCtrl: AlertController,
    public appService: AppService) {
      this.up = false;
      this.down = true;
      this.getAuditReturnorderList();
    // this.auditReturnorderArray = [
    //   {
    //     orderId: "20170110068552",
    //     orderReturnSeq: "20170110068552",
    //     mobile: "18321763810",
    //     number: 1,
    //     unitPrice: 100,
    //     status: "0",
    //     productSkuDTO: {
    //       productSeq: 289,
    //       skuSeq: 939,
    //       productName: "MQD2016夏季印花短袖T恤216220510",
    //       fileName: './assets/image/productimg.png',
    //       fileSeq: 7954,
    //       attrValueList: [
    //         {
    //           skuSeq: null,
    //           attrSeq: 322,
    //           attrName: "尺码",
    //           attrValue: "100（3-4岁）",
    //           type: null,
    //           fileSeq: null,
    //           price: null,
    //           selectedAttrValue: null,
    //           invalidAttrValue: null
    //         }
    //       ],
    //       fallback: null
    //     }
    //   },
    //   {
    //     orderId: "20170110068552",
    //     orderReturnSeq: "20170110068552",
    //     mobile: "18321763810",
    //     number: 1,
    //     unitPrice: 100,
    //     status: "1",
    //     productSkuDTO: {
    //       productSeq: 289,
    //       skuSeq: 939,
    //       productName: "MQD2016夏季印花短袖T恤216220510",
    //       fileName: './assets/image/productimg.png',
    //       fileSeq: 7954,
    //       attrValueList: [
    //         {
    //           skuSeq: null,
    //           attrSeq: 322,
    //           attrName: "尺码",
    //           attrValue: "100（3-4岁）",
    //           type: null,
    //           fileSeq: null,
    //           price: null,
    //           selectedAttrValue: null,
    //           invalidAttrValue: null
    //         }
    //       ],
    //       fallback: null
    //     }
    //   },
    // ]
  }
  goReturnedDetail(index) {
    let contactModal = this.modalCtrl.create(ReturnedDetail, { indexId: this.auditReturnorderArray[index].orderReturnSeq });
    contactModal.present();
  }
  getAuditReturnorderList() {
    // 已审核退货订单 请求数据
    let loading = this.appService.loading();
    let url = `${AppConfig.API.getReturnorderList}?deliveryType=1&status=1&start=${this.start}&limit=${this.limit}`
    this.appService.httpGet(url).then(data => {
      console.log(data)
      loading.dismiss();
      if (data.count == 0 && this.auditReturnorderArray.length == 0) {
        //空空如也
        this.noData = true;
      } else {
        this.noData = false;
        if (this.start < data.count) {
          if (this.up) {
            this.auditReturnorderArray.push(...data.data);
            this.start += this.limit;
          } else if (this.down) {
            this.auditReturnorderArray = data.data;
            this.start += this.limit;
          }
        } else {
          this.showNoMore = true;
        }
      }
    }).catch(error => {
      loading.dismiss();
      console.log(error);
      this.appService.toast('网络异常，请稍后再试', 1000, 'middle');
    });
  }

  // 下拉刷新请求数据
  doRefresh(refresher) {
    this.start = 0;
    this.down = true;
    this.up = false;
    let url = `${AppConfig.API.getReturnorderList}?deliveryType=1&status=1&start=${this.start}&limit=${this.limit}`;
    this.appService.httpGet(url).then(data => {
      console.log(data)
      refresher.complete();
      if (data.totalRecord == 0) {
        //空空如也
        this.noData = true;
      }else {
        this.noData = false;
        if (data.data.length != 0) {
          this.auditReturnorderArray = data.data;
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
  infiniteGetSelfGiftList(infiniteScroll) {
    this.down = false;
    this.up = true;
    let url = `${AppConfig.API.getReturnorderList}?deliveryType=1&status=1&start=${this.start}&limit=${this.limit}`
    this.appService.httpGet(url).then(data => {
      infiniteScroll.complete();
      if (data.totalRecord == 0) {
        //空空如也
        this.noData = true;
      }else {
        this.noData = false;
        if (data.data.length != 0) {
          this.auditReturnorderArray.push(...data.data);
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
