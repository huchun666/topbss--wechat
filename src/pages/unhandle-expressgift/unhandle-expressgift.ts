import { Component} from '@angular/core';
import { NavController, NavParams, ModalController, AlertController } from 'ionic-angular';
import { HandleExpressgift } from '../handle-expressgift/handle-expressgift';
@Component({
  selector: 'unhandle-expressgift',
  templateUrl: 'unhandle-expressgift.html'
})
export class UnhandleExpressgift {
	constructor(public navCtrl: NavController, public modalCtrl: ModalController, public alertCtrl: AlertController) {
	}
	goExpressgift() {
		const orderModal = this.modalCtrl.create(HandleExpressgift);
		orderModal.present();
	}
	sendProduct() {
		let alert = this.alertCtrl.create({
			message: '赠品发货确认',
			inputs: [
		      {
		        name: 'companyName',
		        type: 'text',
		        placeholder: '请再此输入快递公司名称'
		      },{
		        name: 'orderNum',
		        type: 'text',
		        placeholder: '请再此输入快递单号'
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
			]
		});
		alert.present();
	}
}
