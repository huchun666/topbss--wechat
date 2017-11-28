import { Component, OnInit} from '@angular/core';
import { NavController, NavParams, ModalController, AlertController } from 'ionic-angular';
import { AuditReturnorder } from '../audit-returnorder/audit-returnorder';
import { ReturnDetail } from '../return-detail/return-detail';
import { AppService, AppConfig } from '../../app/app.service';
@Component({
  selector: 'unaudit-returnorder',
  templateUrl: 'unaudit-returnorder.html'
})
export class UnauditReturnorder{
  unauditReturnorderArray: any = [];
  limit: number = 10;
  up: Boolean = true;//上拉刷新和第一次进入页面时
  down: Boolean = false;//下拉刷新和返回上一级页面时
  noData:Boolean = false;
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
    public appService: AppService) {
    this.load = AppConfig.load;
    this.getUnauditReturnorderList();
	}
	confirmReturn(index) {
		const alert = this.alertCtrl.create({
			message: `确认已收到会员${this.unauditReturnorderArray[index].mobile}的订单${this.unauditReturnorderArray[index].orderId}的${this.unauditReturnorderArray[index].number}件退货商品？`,
			buttons: [
			  {
			    text: '取消',
			    handler: () => {
			      //点击取消后的执行代码
			    }
			  },
			  {
			    text: '确认',
			    handler: () => {
            // 点击确认后的执行代码
            let loading = this.appService.loading();
            loading.present();
            let url = `${AppConfig.API.returnReceived}?id=${this.unauditReturnorderArray[index].orderReturnSeq}`;
						this.appService.httpPost(url, null).then(data => {
              loading.dismiss();
              if (data.type == 'success') {
                this.start = 0;
                this.up = false;
                this.down = true;
                this.getUnauditReturnorderList();
              }
						}).catch(error => {
              loading.dismiss();
              console.log(error);
              this.appService.toast('操作失败，请稍后再试', 1000, 'middle');
						});
			    }
			  }
			]
		});
		alert.present();
	}
	auditReturn(index) {
    const orderModal = this.modalCtrl.create(ReturnDetail,{ productId: this.unauditReturnorderArray[index].orderReturnSeq});
    orderModal.onDidDismiss(() => {
      this.start = 0;
      this.down = true;
      this.up = false;
      this.getUnauditReturnorderList();
    })
    orderModal.present();
	}
	goAuditReturn() {
    const orderModal = this.modalCtrl.create(AuditReturnorder);
		orderModal.present();
  }
	getUnauditReturnorderList() {
    // 待审核退货订单 请求数据
	  let url = `${AppConfig.API.getReturnorderList}?deliveryType=1&status=0&start=${this.start}&limit=${this.limit}`;
	  this.appService.httpGet(url).then( data => {
      this.loadingShow = false;
      if (data.count == 0 && this.unauditReturnorderArray.length == 0) {
		    //空空如也
		    this.noData = true;
	    } else {
        this.noData = false;
        this.showInfinite = true;
        if (this.start < data.count) {
          if (this.up) {
            this.unauditReturnorderArray.push(...data.data);
            this.start += this.limit;
          } else if (this.down) {
            this.unauditReturnorderArray = data.data;
            this.start += this.limit;
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
  doRefresh(refresher) {
    this.start = 0;
    this.up = false;
    this.down = true;
    let url = `${AppConfig.API.getReturnorderList}?deliveryType=1&status=0&start=${this.start}&limit=${this.limit}`;
	  this.appService.httpGet(url).then( data => {
      refresher.complete();
      if (data.count == 0) {
        //空空如也
        this.noData = true;
      }else {
        this.noData = false;
        this.showInfinite = true;
        if (data.data.length != 0) {
          this.unauditReturnorderArray = data.data;
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
  infiniteGetSelfGiftList(infiniteScroll) {
    this.up = true;
    this.down = false;
    this.up = true;
    let url = `${AppConfig.API.getReturnorderList}?deliveryType=1&status=0&start=${this.start}&limit=${this.limit}`;
	  this.appService.httpGet(url).then( data => {
      infiniteScroll.complete();
      if (data.count == 0) {
        //空空如也
        this.noData = true;
      }else {
        this.noData = false;
        this.showInfinite = true;
        if (data.data.length != 0) {
          this.unauditReturnorderArray.push(...data.data);
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
    this.getUnauditReturnorderList();
  }
}
