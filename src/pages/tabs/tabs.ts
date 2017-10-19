import { Component } from '@angular/core';
import { NavController, NavParams, AlertController } from 'ionic-angular';
import { CreatOrder } from '../creat-order/creat-order';
import { Home } from '../home/home';
import { Login } from '../login/login';
import { ListPage } from '../list/list';
@Component({
  templateUrl: 'tabs.html'
}) 
export class TabsPage {
  tab1Root = Home;
  tab2Root = Login;
  tab3Root = CreatOrder;
  constructor() {
  }
}