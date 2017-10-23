import { Component } from '@angular/core';
import { NavController, NavParams, AlertController } from 'ionic-angular';
import { CreatOrder } from '../creat-order/creat-order';
import { Personl } from '../personl/personl';
import { Login } from '../login/login';
@Component({
  templateUrl: 'tabs.html'
}) 
export class TabsPage {
  tab1Root = Personl;
  tab2Root = Login;
  tab3Root = Login;
  constructor() {
  }
}