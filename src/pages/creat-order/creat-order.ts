import { Component} from '@angular/core';
import { ModalController, NavController, NavParams, AlertController} from 'ionic-angular';
import { OrderLayer } from '../order-layer/order-layer';
import { OrderStore } from '../order-store/order-store';
import { AppService, AppConfig } from '../../app/app.service';

@Component({
  selector: 'creat-order',
  templateUrl: 'creat-order.html',
})
export class CreatOrder {
  productList: any;
  currentPage: number = 1;
  pageSize: number = 10;
  constructor(
    public modalCtrl: ModalController, 
    public navCtrl: NavController, 
    public alertCtrl: AlertController,
    public appService: AppService
  ) {
    this.productList = [{
      id: '1',
      imageName: "../assets/image/productimg2.png",
      name: "1可爱小裙子 女童 秋冬 时尚QS1226603"
    },{
      id: '2',
      imageName: "../assets/image/productimg2.png",
      name: "2可爱小裙子 女童 秋冬 时尚QS1226603"
    },{
      id: '3',
      imageName: "../assets/image/productimg2.png",
      name: "3可爱小裙子 女童 秋冬 时尚QS1226603"
    },{
      id: '4',
      imageName: "../assets/image/productimg2.png",
      name: "4可爱小裙子 女童 秋冬 时尚QS1226603"
    }];
  }
  //获取商品列表
  getProductList() {
    // let url = `${AppConfig.API}&start=${(this.currentPage - 1) * this.pageSize}&limit=${this.pageSize}`;
    // this.appService.httpGet(url).then(data => {
    //   this.productList = data.body.productList;
    //   this.currentPage ++;
    // }).catch(error => {
    //   console.log(error);
    // });
  }
  addProductModal(item) {
    const orderModal = this.modalCtrl.create(OrderLayer, {"product": item}, {
      cssClass: 'order-sku-list'
    });
    orderModal.present();
  }
  orderRepertory () {
    this.navCtrl.push(OrderStore);
  }

}
