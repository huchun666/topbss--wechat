import { Component } from '@angular/core';
import { Help } from '../help/help';
import { Login } from '../login/login';
import { ListPage } from '../list/list';
@Component({
  templateUrl: 'tabs.html'
}) 
export class TabsPage {
  tab1Root = Help;
  tab2Root = Login;
  tab3Root = ListPage;
  constructor() {
  }
}