import { Component} from '@angular/core';
import { NavController, NavParams} from 'ionic-angular';
import { AppService, AppConfig } from '../../app/app.service';
@Component({
  selector: 'order-list',
  templateUrl: 'brandshop-order-list.html'
})
export class BrandshopOrderList {
  dateStart: string = '';
  dateEnd: string = '';
  isShowDetail: boolean = false;
  orderList: any;
  orderStatusList: any;
  currentStatus: any;
  currentPage: number = 1;
  pageSize: number = 10;
  paramsStatus: string = '';
  paramsDate: string = '';
  up: Boolean;
  down: Boolean;
  noData:Boolean;
  constructor(
    public navCtrl: NavController, 
    public appService: AppService) {
      this.orderStatusList = [
        {
          label: "全部",
          status: 'all'
        },
        {
          label: "待支付",
          status: '0'
        },
        {
          label: "已收货",
          status: '3'
        },
        {
          label: "已取消",
          status: '4'
        },
        {
          label: "取消中",
          status: '6'
        },
        {
          label: "已完成",
          status: 'C'
        } ];
      this.currentStatus = this.orderStatusList[0].status;
      this.orderList = [
        {
          orderSeq: 1336,
          splited: false,
          orderId: "20160426028456",
          deliveryType: "1",
          status: "0",
          totalAmount: 1998.4,
          discountAmount: 0,
          integralAmount: 0,
          couponAmount: null,
          merchantCouponAmount: 0,
          payAmount: 1998.4,
          companyName: null,
          feeRate: null,
          parentOrderId: null,
          brandshopName: null,
          orderItemProductSkuDTOS: [
            {
              orderItemSeq: 1470,
              prodSeq: 101,
              skuSeq: 387,
              unitPrice: 1998.4,
              number: 1,
              productSkuDTO: {
                productSeq: 101,
                skuSeq: 387,
                productName: "德国Kiddy守护者2代Isofix接口汽车用宝宝儿童安全座椅9个月-12岁",
                fileName: './assets/image/productimg.png',
                attrValueList: [
                  {
                    skuSeq: null,
                    attrSeq: 537,
                    attrName: "颜色",
                    attrValue: "灰色",
                    type: null,
                    fileSeq: null,
                    price: null,
                    selectedAttrValue: null,
                    invalidAttrValue: null
                  },
                  {
                    skuSeq: null,
                    attrSeq: 538,
                    attrName: "适合体重",
                    attrValue: "24-36kg",
                    type: null,
                    fileSeq: null,
                    price: null,
                    selectedAttrValue: null,
                    invalidAttrValue: null
                  }
                ],
                fallbac: null
              }
            },
          ]
        },
        {
          orderSeq: 1336,
          splited: false,
          orderId: "20160426028456",
          deliveryType: "1",
          status: "1",
          totalAmount: 1998.4,
          discountAmount: 0,
          integralAmount: 0,
          couponAmount: null,
          merchantCouponAmount: 0,
          payAmount: 1998.4,
          companyName: null,
          feeRate: null,
          parentOrderId: null,
          brandshopName: null,
          orderItemProductSkuDTOS: [
            {
              orderItemSeq: 1470,
              prodSeq: 101,
              skuSeq: 387,
              unitPrice: 1998.4,
              number: 1,
              productSkuDTO: {
                productSeq: 101,
                skuSeq: 387,
                productName: "德国Kiddy守护者2代Isofix接口汽车用宝宝儿童安全座椅9个月-12岁",
                fileName: './assets/image/productimg.png',
                attrValueList: [
                  {
                    skuSeq: null,
                    attrSeq: 537,
                    attrName: "颜色",
                    attrValue: "灰色",
                    type: null,
                    fileSeq: null,
                    price: null,
                    selectedAttrValue: null,
                    invalidAttrValue: null
                  },
                  {
                    skuSeq: null,
                    attrSeq: 538,
                    attrName: "适合体重",
                    attrValue: "24-36kg",
                    type: null,
                    fileSeq: null,
                    price: null,
                    selectedAttrValue: null,
                    invalidAttrValue: null
                  }
                ],
                fallbac: null
              }
            },
          ]
        },
        {
          orderSeq: 1336,
          splited: false,
          orderId: "20160426028456",
          deliveryType: "1",
          status: "2",
          totalAmount: 1998.4,
          discountAmount: 0,
          integralAmount: 0,
          couponAmount: null,
          merchantCouponAmount: 0,
          payAmount: 1998.4,
          companyName: null,
          feeRate: null,
          parentOrderId: null,
          brandshopName: null,
          orderItemProductSkuDTOS: [
            {
              orderItemSeq: 1470,
              prodSeq: 101,
              skuSeq: 387,
              unitPrice: 1998.4,
              number: 1,
              productSkuDTO: {
                productSeq: 101,
                skuSeq: 387,
                productName: "德国Kiddy守护者2代Isofix接口汽车用宝宝儿童安全座椅9个月-12岁",
                fileName: './assets/image/productimg.png',
                attrValueList: [
                  {
                    skuSeq: null,
                    attrSeq: 537,
                    attrName: "颜色",
                    attrValue: "灰色",
                    type: null,
                    fileSeq: null,
                    price: null,
                    selectedAttrValue: null,
                    invalidAttrValue: null
                  },
                  {
                    skuSeq: null,
                    attrSeq: 538,
                    attrName: "适合体重",
                    attrValue: "24-36kg",
                    type: null,
                    fileSeq: null,
                    price: null,
                    selectedAttrValue: null,
                    invalidAttrValue: null
                  }
                ],
                fallbac: null
              }
            },
          ]
        },
        {
          orderSeq: 1336,
          splited: false,
          orderId: "20160426028456",
          deliveryType: "1",
          status: "3",
          totalAmount: 1998.4,
          discountAmount: 0,
          integralAmount: 0,
          couponAmount: null,
          merchantCouponAmount: 0,
          payAmount: 1998.4,
          companyName: null,
          feeRate: null,
          parentOrderId: null,
          brandshopName: null,
          orderItemProductSkuDTOS: [
            {
              orderItemSeq: 1470,
              prodSeq: 101,
              skuSeq: 387,
              unitPrice: 1998.4,
              number: 1,
              productSkuDTO: {
                productSeq: 101,
                skuSeq: 387,
                productName: "德国Kiddy守护者2代Isofix接口汽车用宝宝儿童安全座椅9个月-12岁",
                fileName: './assets/image/productimg.png',
                attrValueList: [
                  {
                    skuSeq: null,
                    attrSeq: 537,
                    attrName: "颜色",
                    attrValue: "灰色",
                    type: null,
                    fileSeq: null,
                    price: null,
                    selectedAttrValue: null,
                    invalidAttrValue: null
                  },
                  {
                    skuSeq: null,
                    attrSeq: 538,
                    attrName: "适合体重",
                    attrValue: "24-36kg",
                    type: null,
                    fileSeq: null,
                    price: null,
                    selectedAttrValue: null,
                    invalidAttrValue: null
                  }
                ],
                fallbac: null
              }
            },
          ]
        },
        {
          orderSeq: 1336,
          splited: false,
          orderId: "20160426028456",
          deliveryType: "1",
          status: "4",
          totalAmount: 1998.4,
          discountAmount: 0,
          integralAmount: 0,
          couponAmount: null,
          merchantCouponAmount: 0,
          payAmount: 1998.4,
          companyName: null,
          feeRate: null,
          parentOrderId: null,
          brandshopName: null,
          orderItemProductSkuDTOS: [
            {
              orderItemSeq: 1470,
              prodSeq: 101,
              skuSeq: 387,
              unitPrice: 1998.4,
              number: 1,
              productSkuDTO: {
                productSeq: 101,
                skuSeq: 387,
                productName: "德国Kiddy守护者2代Isofix接口汽车用宝宝儿童安全座椅9个月-12岁",
                fileName: './assets/image/productimg.png',
                attrValueList: [
                  {
                    skuSeq: null,
                    attrSeq: 537,
                    attrName: "颜色",
                    attrValue: "灰色",
                    type: null,
                    fileSeq: null,
                    price: null,
                    selectedAttrValue: null,
                    invalidAttrValue: null
                  },
                  {
                    skuSeq: null,
                    attrSeq: 538,
                    attrName: "适合体重",
                    attrValue: "24-36kg",
                    type: null,
                    fileSeq: null,
                    price: null,
                    selectedAttrValue: null,
                    invalidAttrValue: null
                  }
                ],
                fallbac: null
              }
            },
          ]
        },
      ];
      this.getOrderList(); 
  }
  // 获取订单列表
  getOrderList() {
    var url = `${AppConfig.hostUrl + AppConfig.API.getOrderList}?userType=A&start=${this.pageSize * (this.currentPage - 1)}&limit=${this.pageSize}`;
    if(this.paramsDate != ''){
      url += this.paramsDate;
    }
    if(this.paramsStatus != ''){
      url += this.paramsStatus;
    }
    // this.appService.httpGet(url).then(data => {
    //   if (data.count == 0 && this.orderList.length == 0) {
		//     //空空如也
		//     this.noData = true;
	  //   } else {
    //     this.noData = false;
    //     if(this.up){
    //       this.orderList.push(...data.data);
    //       this.currentPage++;
    //     }
    //   }
    // }).catch(error => {
    //   console.log(error);
    // })
  }
  getOrderListByDate() {
    this.currentPage = 1;
    this.paramsDate = '';
    if(this.dateStart != ''){
      this.paramsDate+= `&dateStart=${this.dateStart}`;
    }
    if(this.dateEnd != ''){
      this.paramsDate+= `&dateEnd=${this.dateEnd}`;
    }
    this.getOrderList();
  }
  // 点击状态时切换，获取当前订单状态
  getCurrentStatus(index) {
    this.currentPage = 1;
    this.paramsStatus = ''
    this.currentStatus = this.orderStatusList[index].status
    if(this.orderStatusList[index].status != 'all'){
      this.paramsStatus+= '&status='+this.currentStatus
    }
    this.getOrderList();
  }
  // 是否显示明细
  showDetail() {
    this.isShowDetail = !this.isShowDetail;
  }
  // 进入门店所有订单
  goBrandshoOrder() {
    this.navCtrl.push(BrandshopOrderList);
  }
  // 清除开始日期
  clearDateStart() {
    this.dateStart = '';
  }
  // 清除结束日期
  clearDateEnd() {
    this.dateEnd = '';
  }
   
  // 下拉刷新请求数据
  doRefresh(refresher) {
    this.down = true;
    this.up = false;
    setTimeout(() => {
      this.currentPage = 1;
      // this.getOrderList();
      refresher.complete();
    },1000)
  }
  
  // 上拉刷新请求数据
  infiniteGetSelfGiftList(infiniteScroll) {
    this.down = false;
    this.up = true;
    setTimeout(() => {
      // this.getOrderList();
      infiniteScroll.complete();
    },1000)
  }
}