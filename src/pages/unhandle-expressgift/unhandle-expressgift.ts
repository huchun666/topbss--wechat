import { Component} from '@angular/core';
import { NavController, NavParams, ModalController, AlertController } from 'ionic-angular';
import { HandleExpressgift } from '../handle-expressgift/handle-expressgift';
@Component({
  selector: 'unhandle-expressgift',
  templateUrl: 'unhandle-expressgift.html'
})
export class UnhandleExpressgift {
	unhandleExpressGiftArray: any;
	constructor(public navCtrl: NavController, public modalCtrl: ModalController, public alertCtrl: AlertController) {
		//请求接口得到数据
		//getUnhandleExpressGiftList();
		this.unhandleExpressGiftArray = [
			{
				id: 1,
				name: "爱法呗赠品小马甲",
				memberPhone: "12131415161",
				subscribePhone: "222222222",
				getTime: "2017.09.27 23:59",
				subscribeTime: "",
				shoppingGuideName: "",
				imgUrl: "../assets/image/productimg.png",
				subscribeState: "1",//1: 未兑换，2: 已兑换
				patriarchName: "张家长",
				patriarchPhone: "12313231545",
				babyName: "张宝宝",
				babyHeight: "120",
				babyIDNumber: "32088888888888",
				remarkInfo: ""
			},
			{
				id: 2,
				name: "爱法呗赠品小马甲",
				memberPhone: "12131415161",
				subscribePhone: "222222222",
				getTime: "2017.09.27 23:59",
				subscribeTime: "",
				shoppingGuideName: "",
				imgUrl: "../assets/image/productimg.png",
				subscribeState: "1",//1: 未兑换，2: 已兑换
				patriarchName: "张家长",
				patriarchPhone: "12313231545",
				babyName: "张宝宝",
				babyHeight: "120",
				babyIDNumber: "32088888888888",
				remarkInfo: ""
			},
			{
				id: 3,
				name: "爱法呗赠品小马甲",
				memberPhone: "12131415161",
				subscribePhone: "222222222",
				getTime: "2017.09.27 23:59",
				subscribeTime: "",
				shoppingGuideName: "",
				imgUrl: "../assets/image/productimg.png",
				subscribeState: "1",//1: 未兑换，2: 已兑换
				patriarchName: "张家长",
				patriarchPhone: "12313231545",
				babyName: "张宝宝",
				babyHeight: "120",
				babyIDNumber: "32088888888888",
				remarkInfo: ""
			}
		]
	}
	getUnhandleExpressGiftList() {
    // let url = this.appConFig.API.;page=1
	  // this.appService.httpGet(url).then( data => {
    //   this.seflGiftArray = data;
	  // }).catch(error => {
    //  console.log(error);
    // });
  }
	goExpressgift() {
		const orderModal = this.modalCtrl.create(HandleExpressgift);
		orderModal.present();
	}
	sendProduct(index) {
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
						//点击确认后提交物流信息，并改变状态为2
						//let url = AppConfig.API.;
						//let body = {
						//  id: this.seflGiftArray[index].id;  //点击时当前的item
						//  remarkInfo: data.companyName + "" + data.orderNum;
						//}
						//this.appService.httpPost(url, body).then(data => {
						//  if (data.success) {
						//   this.unhandleExpressGiftArray = data;
						//  }
						//}).catch(error => {
						//  console.log(error);
						//});
			    }
			  }
			]
		});
		alert.present();
	}
}
