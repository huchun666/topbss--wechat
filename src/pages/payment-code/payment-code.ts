import { Component} from '@angular/core';
import { App, NavController, NavParams } from 'ionic-angular';
@Component({
  selector: 'payment-code',
  templateUrl: 'payment-code.html'
})
export class PaymentCode {
  myCode: string = "";
  constructor(
    public navCtrl: NavController,
    public app: App,
    public navParams: NavParams
  ) {
    if (this.navParams.get('returnUrl')){
      this.myCode = this.navParams.get('returnUrl');
    }else {
      this.myCode = "https://www.baidu.com/";
    }
    
  }
  // 修改此单
  updateOrder() {
    this.navCtrl.pop();
  }
  // 再来一单
  orderAgain() {
    this.navCtrl.remove(this.navCtrl.length() - 2, 2);
  }
  //关闭(完成)移除所有的view,直接显示home
  goTabs() {
    this.navCtrl.remove(0, this.navCtrl.length());
  }
}
