import { BrowserModule } from '@angular/platform-browser';
import { NgModule, ErrorHandler } from '@angular/core';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';

import { Login } from '../pages/login/login';
import { ItemDetailsPage } from '../pages/item-details/item-details';
import { ListPage } from '../pages/list/list';
import { forget } from '../pages/forget/forget';
import { Home } from '../pages/home/home';
import { TabsPage } from '../pages/tabs/tabs';
import { Personl } from '../pages/personl/personl';
import { OrderInfo } from '../pages/order-info/order-info'
import { GiftInfo } from '../pages/gift-info/gift-info'
import { Help } from '../pages/help/help'

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

@NgModule({
  declarations: [
    MyApp,
    Login,
    ItemDetailsPage,
    ListPage,
    forget,
    Home,
    TabsPage,
    Personl,
    OrderInfo,
    GiftInfo,
    Help
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp, {
      backButtonText: '返回'
    }),
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    Login,
    ItemDetailsPage,
    ListPage,
    forget,
    Home,
    TabsPage,
    Personl,
    OrderInfo,
    GiftInfo,
    Help
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
