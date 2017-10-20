import { Component} from '@angular/core';
import { NavController, NavParams, ViewController, AlertController } from 'ionic-angular';
@Component({
  selector: 'return-detail',
  templateUrl: 'return-detail.html'
})
export class ReturnDetail {
	count: number = 4;
	constructor(public navCtrl: NavController, public viewCtrl: ViewController, public alertCtrl: AlertController) {
	}
	agreeReturn() {
		let alert = this.alertCtrl.create({
			message: '退货数量: ' + this.count  + '<span>拟退款金额：</span>',
			inputs: [
		      {
		        name: 'price',
		        label: '退款金额',
		        type: 'number'
		      }
		    ],
			buttons: [
			  {
			    text: '取消',
			    handler: () => {
			      //点击取消后的执行代码
			    }
			  },
			  {
			    text: '确认',
			    handler: data => {
			      console.log(data);
			    }
			  }
			],
			cssClass: 'detail-alert'
		});
		alert.present();
	}
	refuseReturn() {
		let alert = this.alertCtrl.create({
			message: '确认拒绝会员13761489650的订单201745631102退货申请？',
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
			    	var data = {id: '123'};
			    	this.viewCtrl.dismiss(data);
			    }
			  }
			]
		});
		alert.present();
	}

}
