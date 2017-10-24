import { Component } from '@angular/core';
import { NavController, NavParams, AlertController } from 'ionic-angular';
import { CreatOrder } from '../creat-order/creat-order';
import { AwardTabs } from '../award-tabs/award-tabs';
import { Login } from '../login/login';
@Component({
  templateUrl: 'tabs.html'
}) 
export class TabsPage {
  tab1Root = AwardTabs;
  tab2Root = Login;
  tab3Root = Login;
  constructor() {
  }
}