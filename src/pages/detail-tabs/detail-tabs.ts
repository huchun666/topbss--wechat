import { NavController, NavParams, ViewController,Platform } from 'ionic-angular';
import { Component } from '@angular/core';

import { OrderDetail } from '../order-detail/order-detail';
import { AwardDetail } from '../award-detail/award-detail';

@Component({
    templateUrl: 'detail-tabs.html',
    selector: 'withdraw-detailTabs'
})
export class DetailTabs{
    orderDetail = OrderDetail;
    awardDetail = AwardDetail;
    constructor(public navController: NavController, public navParams: NavParams, public viewController: ViewController, public platform: Platform){ 

    }
    dismiss() {
        this.viewController.dismiss();
    }
}