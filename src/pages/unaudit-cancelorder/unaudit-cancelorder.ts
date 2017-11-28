import { Component, ViewChild } from '@angular/core';
import { NavController, ModalController, AlertController, ToastController, Content } from 'ionic-angular';
import { AuditCancelorder } from '../audit-cancelorder/audit-cancelorder';
import { AppService, AppConfig } from '../../app/app.service';
@Component({
  selector: 'unaudit-cancelorder',
  templateUrl: 'unaudit-cancelorder.html'
})
export class UnauditCancelorder {
  @ViewChild(Content) content: Content;
  unauditCancelorderArray: any = [];
  limit: number = 10;
  up: Boolean = true;//上拉刷新和第一次进入页面时
  down: Boolean = false;//下拉刷新和返回上一级页面时
  noData: Boolean = false;
  start: number = 0;
  showNoMore: Boolean = false;
  load: any = {};
  loadingShow: Boolean = true;
  requestDefeat: Boolean = false;
  showInfinite: Boolean = false;
  constructor(
    public navCtrl: NavController,
    public modalCtrl: ModalController,
    public alertCtrl: AlertController,
    public toastCtrl: ToastController,
    public appService: AppService) {
    this.start = 0;
    this.down = true;
    this.up = false;
    this.load = AppConfig.load;
    this.getUnauditCancelorder();
  }
  //审核点击事件
  auditOrder(index) {
    const alert = this.alertCtrl.create({
      message: `同意会员${this.unauditCancelorderArray[index].memberMobile}的订单${this.unauditCancelorderArray[index].orderId}取消申请？`,
      buttons: [
        {
          text: '拒绝',
          handler: () => {
            this.start = 0;
            this.down = true;
            this.up = false;
            // 点击拒绝后的执行代码
            let loading = this.appService.loading();
            loading.present();
            let url = `${AppConfig.API.auditCancelOrder}?id=${this.unauditCancelorderArray[index].orderSeq}&isAgree=0`;
            this.appService.httpPost(url, null).then(data => {
              if (data.type == 'success') {
                loading.dismiss();
                this.getUnauditCancelorder();
              }
            }).catch(error => {
              loading.dismiss();
              console.log(error);
              this.appService.toast('操作失败，请稍后重试', 1000, 'middle');
            });
          }
        },
        {
          text: '通过',
          handler: () => {
            this.start = 0;
            this.down = true;
            this.up = false;
            // 点击同意后的执行代码
            let loading = this.appService.loading();
            loading.present();
            let url = `${AppConfig.API.auditCancelOrder}?id=${this.unauditCancelorderArray[index].orderSeq}&isAgree=1`;
            this.appService.httpPost(url, null).then(data => {
              if (data.type == 'success') {
                loading.dismiss();
                this.getUnauditCancelorder();
              }
            }).catch(error => {
              loading.dismiss();
              console.log(error);
              this.appService.toast('操作失败', 1000, 'middle');
            });
          }
        }
      ]
    });
    alert.present();
  }
  goAuditCancel() {
    const orderModal = this.modalCtrl.create(AuditCancelorder);
    orderModal.present();
  }
  getUnauditCancelorder() {
    // 待审核取消订单 请求数据
    let url = `${AppConfig.API.getCancelorder}?deliveryType=1&status=0&start=${this.start}&limit=${this.limit}`
    this.appService.httpGet(url).then(data => {
      this.loadingShow = false;
      if (data.count == 0 && this.unauditCancelorderArray.length == 0) {
        //空空如也
        this.noData = true;
      } else {
        this.noData = false;
        this.showInfinite = true;
        if (this.start < data.count) {
          if (this.up) {
            this.unauditCancelorderArray.push(...data.data);
            this.start += this.limit;
          } else if (this.down) {
            this.unauditCancelorderArray = data.data;
            this.start += this.limit;
            this.content.scrollTo(0,0,0);
          }
        } else {
          this.showNoMore = true;
        }
      }
    }).catch(error => {
      this.loadingShow = false;
      console.log(error);
      this.requestDefeat = true;
      this.showInfinite = false;
    });
  }

  // 下拉刷新请求数据
  refreshMore(refresher) {
    this.start = 0;
    this.down = true;
    this.up = false;
    let url = `${AppConfig.API.getCancelorder}?deliveryType=1&status=0&start=${this.start}&limit=${this.limit}`
    this.appService.httpGet(url).then(data => {
      refresher.complete();
      if (data.count == 0) {
        //空空如也
        this.noData = true;
      }else {
        this.noData = false;
        this.showInfinite = true;
        if (data.data.length != 0) {
          this.unauditCancelorderArray = data.data;
          this.start += this.limit;
        }else {
          this.showNoMore = true;
        }
      }
    }).catch(error => {
      refresher.complete();
      console.log(error);
      this.requestDefeat = true;
      this.showInfinite = false;
    });
  }

  // 上拉刷新请求数据
  loadMore(infiniteScroll) {
    this.down = false;
    this.up = true;
    let url = `${AppConfig.API.getCancelorder}?deliveryType=1&status=0&start=${this.start}&limit=${this.limit}`
    this.appService.httpGet(url).then(data => {
      infiniteScroll.complete();
      if (data.count == 0) {
        //空空如也
        this.noData = true;
      }else {
        this.noData = false;
        this.showInfinite = true;
        if (data.data.length != 0) {
          this.unauditCancelorderArray.push(...data.data);
          this.start += this.limit;
        }else {
          this.showNoMore = true;
        }
      }
    }).catch(error => {
      infiniteScroll.complete();
      console.log(error);
      this.requestDefeat = true;
      this.showInfinite = false;
    });
  }
  
  //请求失败后刷新
  requestDefeatRefresh() {
    this.requestDefeat = false;
    this.loadingShow = true;
    this.start = 0;
    this.down = true;
    this.up = false;
    this.getUnauditCancelorder();
  }
}
