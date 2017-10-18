import { Component } from '@angular/core';
import { CreatOrder } from '../creat-order/creat-order';
import { Login } from '../login/login';
import { ListPage } from '../list/list';
@Component({
  templateUrl: 'tabs.html'
}) 
export class TabsPage {
  tab1Root = CreatOrder;
  tab2Root = Login;
  tab3Root = ListPage;
  constructor() {
  }
}