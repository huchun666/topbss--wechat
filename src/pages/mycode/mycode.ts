import { Component} from '@angular/core';
import { AppService, AppConfig } from '../../app/app.service';
import { NavController, NavParams, ViewController } from 'ionic-angular';
@Component({
  selector: 'mycode',
  templateUrl: 'mycode.html'
})
export class MyCode {
  btnText: string = "查看门店二维码";
  isShow: boolean = false;
  myCode: string = "";
  brandshopCode: string = "";
  constructor(
    public navCtrl: NavController,
    public viewCtrl: ViewController,
    public appService: AppService
  ) {
    this.getQRcodeList();
  }
  showBrandshopCode() {
    this.isShow = !this.isShow;
    this.btnText = !this.isShow ? "查看门店二维码" : "收起门店二维码";
  }
  getQRcodeList() {
    this.myCode = "https:www.baidu.com";
    this.brandshopCode = "https:www.baidu.com";
    console.log(222);
    //let url = AppConfig.API.
    //this.appService.httpGet(url)
    //  .then(data => {
    //    this.myCode = data.body.myCode;
    //    this.brandshopCode = data.body.brandshopCode;
    //  })
    //  .catch(error => {
    //    console.log(errror);
    //  })
  }
}
