import { Injectable } from '@angular/core';
import { LoadingController, Loading } from 'ionic-angular';
import { Dialogs } from '@ionic-native/dialogs';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/observable';
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/timeout';

@Injectable()
export class AppConfig {

  //域名基地址
  static hostUrl: string = "http://192.168.31.202:8080";

  //请求超时时间
  static TIME_OUT: number = 30000;

  //接口url
  static API: any = {
    login: "/assets/data/login.json",
    getOrderList: "/rest/order/bssList",    //门店/导购员订单列表
    getCancelorder: "/rest/order/cancel/list",    //待审核/已审核取消订单列表
    auditCancelOrder: "/rest/order/cancel/approval",    //审核取消订单
    getReturnorderList: '/rest/order/return/list',    //未处理/已处理退货订单列表
    returnDetail: '/rest/order/return/details',    //退货订单详情
    returnReceived: '/rest/order/return/received',    // 退货-确认收货
    auditReturnOrder: '/rest/order/return/approval',    //审核退货订单
  };
  
}
@Injectable()
export class AppService {

  constructor(
    private http: Http,
    public loadingCtrl: LoadingController,
    private dialogs: Dialogs
  ) {

  }
  
  //get request
  httpGet(url: string) {
    return this.http.get(url).timeout(AppConfig.TIME_OUT).toPromise()
      .then(res => res.json())
      .catch(error => {
        console.log(`访问错误:${error}`);
        this.handleError(error);
      }
    );
  }
  
  //post request
  httpPost(url: string, body: any) {
    return this.http.post(url, body).timeout(AppConfig.TIME_OUT).toPromise()
      .then(res => res.json())
      .catch(error => {
        console.log(`访问错误:${error}`);
        this.handleError(error);
      }
    );
  }
  
  //put request
  httpPut(url: string, parameters: any) {
  	return this.http.put(url, parameters).timeout(AppConfig.TIME_OUT).toPromise()
      .then(res => res.json())
      .catch(error => {
        console.log(`访问错误:${error}`);
        this.handleError(error);
      }
    );
  }
  
  //错误或者异常处理提示
  private handleError(error: Response) {
    this.alert("提示", error.toString());
    return Observable.throw(error.status || "服务错误");
  }
  
  //弹出提示信息
  public alert(msg: string, title?: string) {
    if (!title) {
      title = '提示';
    }
    this.dialogs.alert(msg, title);
  }
  
  //加载中的友好提示loader.present();
  public loading(): Loading {
    let loader = this.loadingCtrl.create({
      spinner: "dots",
      content: "加载中...",
      dismissOnPageChange: true, //切换页面之后关闭loading框 
      showBackdrop: false //不显示遮罩层
    });
    return loader;
  }

  //localstorage设置key
  setItem(key: string, value: any) {
    try {
      window.localStorage[key] = value;
    }
    catch (e) {
      console.error("window.localStorage error:" + e);
    }
  }
  
  //localstorage获取key
  getItem(key: string) {
    try {
      return window.localStorage[key];
    }
    catch (e) {
      console.error("window.localStorage error:" + e);
    }
  }
  
}