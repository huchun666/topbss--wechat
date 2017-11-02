import { BrowserModule } from '@angular/platform-browser';
import { HttpModule } from '@angular/http';
import { AppService, AppConfig } from './app.service';
import { NgModule, ErrorHandler } from '@angular/core';
import { BarcodeScanner } from '@ionic-native/barcode-scanner';
import { Dialogs } from '@ionic-native/dialogs';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';

import { Login } from '../pages/login/login';
import { Forget } from '../pages/forget/forget';
import { UpdatePwd } from '../pages/update-pwd/update-pwd';
import { Home } from '../pages/home/home';
import { TabsPage } from '../pages/tabs/tabs';
import { Personl } from '../pages/personl/personl';
import { OrderInfo } from '../pages/order-info/order-info';
import { GiftInfo } from '../pages/gift-info/gift-info';
import { CreatOrder } from '../pages/creat-order/creat-order';
import { Help } from '../pages/help/help';
import { OrderLayer } from '../pages/order-layer/order-layer';
import { OrderStore } from '../pages/order-store/order-store';
import { PaymentCode } from '../pages/payment-code/payment-code';
import { UnauditTabs } from '../pages/unaudit-tabs/unaudit-tabs';
import { UnhandleTabs } from '../pages/unhandle-tabs/unhandle-tabs';
import { UnauditCancelorder } from '../pages/unaudit-cancelorder/unaudit-cancelorder';
import { UnauditReturnorder } from '../pages/unaudit-returnorder/unaudit-returnorder';
import { AuditCancelorder } from '../pages/audit-cancelorder/audit-cancelorder';
import { AuditReturnorder } from '../pages/audit-returnorder/audit-returnorder';
import { ReturnDetail } from '../pages/return-detail/return-detail';
import { ReturnedDetail } from '../pages/returned-detail/returned-detail';
import { UnhandleExpressgift } from '../pages/unhandle-expressgift/unhandle-expressgift';
import { UnhandleSelfgift } from '../pages/unhandle-selfgift/unhandle-selfgift';
import { HandleSelfgift } from '../pages/handle-selfgift/handle-selfgift';
import { HandleExpressgift } from '../pages/handle-expressgift/handle-expressgift';
import { Withdraw } from '../pages/withdraw/withdraw';
import { WithdrawRecord } from '../pages/withdraw-record/withdraw-record';
import { MyCode } from '../pages/mycode/mycode';
import { AwardTabs } from '../pages/award-tabs/award-tabs';
import { AwardActivity } from '../pages/award-activity/award-activity';
import { AwardOrder } from '../pages/award-order/award-order';
import { BindAccount } from '../pages/account/bind-account/bind-account';
import { AddAccount } from '../pages/account/add-account/add-account';
import { EditAccount } from '../pages/account/edit-account/edit-account';
import { OrderList } from '../pages/order-list/order-list';
import { BrandshopOrderList } from '../pages/brandshop-order-list/brandshop-order-list';
import { OrderDetail } from '../pages/order-detail/order-detail';
import { AwardDetail } from '../pages/award-detail/award-detail';
import { DetailTabs } from '../pages/detail-tabs/detail-tabs';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
let componentsList = [
  MyApp,
  Login,
  Forget,
  UpdatePwd,
  Home,
  TabsPage,
  Personl,
  OrderInfo,
  GiftInfo,
  CreatOrder,
  Help,
  OrderLayer,
  OrderStore,
  PaymentCode,
  UnauditTabs,
  UnauditCancelorder,
  UnauditReturnorder,
  AuditCancelorder,
  AuditReturnorder,
  ReturnDetail,
  ReturnedDetail,
  UnhandleTabs,
  UnhandleSelfgift,
  UnhandleExpressgift,
  HandleSelfgift,
  HandleExpressgift,
  Withdraw,
  WithdrawRecord,
  MyCode,
  AwardTabs,
  AwardActivity,
  AwardOrder,
  BindAccount,
  AddAccount,
  EditAccount,
  OrderList,
  BrandshopOrderList,
  OrderDetail,
  AwardDetail,
  DetailTabs
];
@NgModule({
  declarations: componentsList,
  imports: [
    BrowserModule,
    HttpModule,
    IonicModule.forRoot(MyApp, {
      backButtonText: '返回',
      modalEnter: 'modal-slide-in',
      modalLeave: 'modal-slide-out'
    }),
  ],
  bootstrap: [IonicApp],
  entryComponents: componentsList,
  providers: [
    StatusBar,
    SplashScreen,
    AppService,
    AppConfig,
    Dialogs,
    BarcodeScanner,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
