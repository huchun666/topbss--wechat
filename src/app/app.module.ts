import { BrowserModule } from '@angular/platform-browser';
import { NgModule, ErrorHandler } from '@angular/core';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';

import { Login } from '../pages/login/login';
import { forget } from '../pages/forget/forget';
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

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
let componentsList = [
    MyApp,
    Login,
    forget,
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
    AwardOrder
];
@NgModule({
  declarations: componentsList,
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp, {
      backButtonText: '返回'
    }),
  ],
  bootstrap: [IonicApp],
  entryComponents: componentsList,
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
