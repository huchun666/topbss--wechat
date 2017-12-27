import { Component, ViewChild } from '@angular/core';
import { Tabs } from 'ionic-angular';
import { Home } from '../home/home';
import { OrderList } from '../order-list/order-list';
import { Personl } from '../personl/personl';
@Component({
  templateUrl: 'tabs.html'
}) 
export class TabsPage {
  @ViewChild('myTabs') tabRef: Tabs;
  home = Home;
  orderList = OrderList;
  personl = Personl;
  constructor() {
  }
  ionViewDidEnter() {
    if (window.location.search && window.location.search.split("?")[1].indexOf("code") > -1) {
      this.tabRef.select(2);
    }
  }
}