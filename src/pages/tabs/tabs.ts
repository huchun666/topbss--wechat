import { Component } from '@angular/core';
import { GiftInfo } from '../gift-info/gift-info';
import { Login } from '../login/login';
import { ListPage } from '../list/list';
@Component({
  templateUrl: 'tabs.html'
}) 
export class TabsPage {
  tab1Root = GiftInfo;
  tab2Root = Login;
  tab3Root = ListPage;
  constructor() {
  }
}