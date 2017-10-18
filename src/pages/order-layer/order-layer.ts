import { Component} from '@angular/core';
import { NavController, NavParams, ViewController } from 'ionic-angular';
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
	constructor(public navCtrl: NavController, public viewCtrl: ViewController) {
		this.SizeList = ["110", "120", "130", "140"];
		this.ColorList = ["蓝色", "紫色", "黄色", "灰色"];
	}
	dismiss() {
		let data = { 'foo': 'bar' };
		this.viewCtrl.dismiss(data);
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
