import { Component} from '@angular/core';
import { NavController, NavParams, AlertController } from 'ionic-angular';
import { UnhandleSelfgift } from '../unhandle-selfgift/unhandle-selfgift';
import { UnhandleExpressgift } from '../unhandle-expressgift/unhandle-expressgift';
import { AppService, AppConfig } from '../../app/app.service';
@Component({
  selector: 'unhandle-tabs',
  templateUrl: 'unhandle-tabs.html'
})
export class UnhandleTabs {
  seflGift = UnhandleSelfgift;
  Expressgift = UnhandleExpressgift;
  selfCount: string;
  expressCount: string;
  reserved: number;  //自提赠品数量
  undelivered: number;  //快递赠品数量
  brandshopSeqId: number;  //门店ID
  constructor(public navCtrl: NavController, public alertCtrl: AlertController) {
    //getUnhandleGiftNumber();
    this.selfCount = this.setCount('0', 12);//this.reserved
    this.expressCount = this.setCount('1', 8);//this.undelivered
  }
  setCount(type, num) {
	  if (type === '0') {
      return "自提赠品" + "(" + num + ")";
	  } else {
	    return "快递赠品" + "(" + num + ")";
	  }
  }
  getUnhandleGiftNumber() {
    // let url = `$(AppConfig.API.)?brandshopSeq=$(this.brandshopSeqId)`;
	  // this.appService.httpGet(url).then( data => {
    //   this.reserved = data.reserved;
    //   this.undelivered = data.undelivered;
	  // }).catch(error => {
    //  console.log(error.message);
    // });
  }
}