import { Component } from '@angular/core';
import { NavController, NavParams, AlertController } from 'ionic-angular';
import { Home } from '../home/home';
import { OrderList } from '../order-list/order-list';
import { Personl } from '../personl/personl';
@Component({
  templateUrl: 'tabs.html'
}) 
export class TabsPage {
  tab1Root = Home;
  tab2Root = OrderList;
  tab3Root = Personl;
  constructor() {
  }
}