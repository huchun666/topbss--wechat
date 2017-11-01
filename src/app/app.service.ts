import { Injectable } from '@angular/core';
import { LoadingController, Loading } from 'ionic-angular';
import { Dialogs } from '@ionic-native/dialogs';
import { Http, Response } from '@angular/http';
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/timeout';

@Injectable()
export class AppConfig {

  //域名基地址
  static hostUrl: string = "https://www.61topbaby.com";

  //请求超时时间
  static TIME_OUT: number = 30000;

  //接口url
  static API: any = {
    getProductList: '',
    getOrderList: ''
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
        console.log('访问错误：'+ error);
        this.handleError(error);
      }
    );
  }
  
  //post request
  httpPost(url: string, body: any) {
    return this.http.post(url, body).timeout(AppConfig.TIME_OUT).toPromise()
      .then(res => res.json())
      .catch(error => {
        console.log('访问错误：'+ error);
        this.handleError(error);
      }
    );
  }
  
  //put request
  httpPut(url: string, parameters: any) {
  	return this.http.put(url, parameters).timeout(AppConfig.TIME_OUT).toPromise()
      .then(res => res.json())
      .catch(error => {
        console.log('访问错误：'+ error);
        this.handleError(error);
      }
    );
  }
  
  //错误或者异常处理提示
  private handleError(error: Response) {
    this.alert("提示", error.toString());
    return Observable.throw(error.json().error || "服务错误");
  }
  
  //弹出提示信息
  public alert(msg: string, title?: string) {
    if (!title) {
      title = '提示';
    }
    this.dialogs.alert(msg, title);
  }
  
  //加载中的友好提示
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
      window.localStorage[key] = JSON.stringify(value);
    }
    catch (e) {
      console.error("window.localStorage error:" + e);
    }
  }
  
  //localstorage获取key
  getItem(key: string) {
    try {
      return JSON.parse(window.localStorage[key]);
    }
    catch (e) {
      console.error("window.localStorage error:" + e);
    }
  }

}