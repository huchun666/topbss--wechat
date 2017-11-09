import { Component} from '@angular/core';
import { ModalController, NavController, NavParams, ViewController } from 'ionic-angular';
import { OrderStore } from '../order-store/order-store';
import { AppService, AppConfig } from '../../app/app.service';
@Component({
  selector: 'order-layer',
  templateUrl: 'order-layer.html'
})
export class OrderLayer {
  skuSize: string = "110";
  skuColor: string = "蓝色";
  SizeList: any;
  ColorList: any;
  count: number = 1;
  product: any;
  skuList: any;
  order: any;
  constructor(
    public modalCtrl: ModalController,
    public navCtrl: NavController,
    public viewCtrl: ViewController,
    public navParams: NavParams,
    public appService: AppService
  ) {
    // 获取当前产品
    this.product = this.navParams.get("product");
    console.log(this.product);
    this.SizeList = ["110", "120", "130", "140"];
    this.ColorList = ["蓝色", "紫色", "黄色", "灰色"];
  }
  // 获取商品sku属性
  getSkuListById(id) {
    // let url = `${AppConfig.API}&productId=${this.product.id}`;
    // this.appService.httpGet(url)
    //   .then(data => {
    //     this.skuList = data.body.skuList;
    //   })
    //   .catch(error => {
    //     console.log(error);
    //   }
    // );
  }
  dismiss() {
    this.viewCtrl.dismiss();
  }
  goOrderStore() {
    this.navCtrl.push(OrderStore, {"order": this.order});
    this.viewCtrl.dismiss();
  }
  addCount() {
    this.count++;
  }
  removeCount() {
    this.count = this.count === 1 ? 1 : (this.count - 1);
  }
//输入数字为负数时重置为1
  resetCount() {
    this.count = this.count <= 0 ? 1 : this.count;
  }
}
