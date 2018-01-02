<<<<<<< HEAD
webpackJsonp([0],{

/***/ 112:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return Login; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_http__ = __webpack_require__(40);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_ionic_angular__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__app_app_service__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__forget_forget__ = __webpack_require__(210);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__tabs_tabs__ = __webpack_require__(60);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_buffer__ = __webpack_require__(58);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_buffer___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_6_buffer__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__update_pwd_update_pwd__ = __webpack_require__(234);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};








var Login = (function () {
    function Login(navCtrl, app, appService, http) {
        this.navCtrl = navCtrl;
        this.app = app;
        this.appService = appService;
        this.http = http;
        this.username = "";
        this.pwd = "";
        this.isUserName = false;
        this.isPwd = false;
        this.rememberPassword = true;
        this.userNameValue = "*账号不正确，请确认后重新输入";
        this.userPwdValue = "*请输入密码";
        this.pageInit();
    }
    Login.prototype.pageInit = function () {
        var user = this.appService.getItem("user");
        if (user) {
            user = JSON.parse(user);
            this.username = user.username;
            this.pwd = user.pwd;
            if (this.pwd) {
                this.rememberPassword = true;
            }
            else {
                this.rememberPassword = false;
            }
        }
    };
    Login.prototype.login = function () {
        var _this = this;
        if (this.pwd == "") {
            this.isPwd = true;
            this.userNameValue = "*请输入密码";
        }
        else {
            this.isPwd = false;
        }
        if (this.username == "") {
            this.isUserName = true;
            this.userNameValue = "*请输入账号或手机号";
        }
        else {
            this.isUserName = false;
        }
        if (this.isUserName == false && this.username != "" && this.pwd != "") {
            this.isPwd = false;
            var loading_1 = this.appService.loading();
            loading_1.present();
            var base64encode = new __WEBPACK_IMPORTED_MODULE_6_buffer__["Buffer"](__WEBPACK_IMPORTED_MODULE_3__app_app_service__["a" /* AppConfig */].client_id + ":" + __WEBPACK_IMPORTED_MODULE_3__app_app_service__["a" /* AppConfig */].secret).toString('base64');
            this.oauthTokenHeaders = new __WEBPACK_IMPORTED_MODULE_0__angular_http__["a" /* Headers */]({
                'Authorization': 'Basic ' + base64encode,
                'Content-Type': 'application/x-www-form-urlencoded'
            });
            var oauthTokenUrl = __WEBPACK_IMPORTED_MODULE_3__app_app_service__["a" /* AppConfig */].oauthTokenUrl;
            var body = "username=" + this.username + "&password=" + this.pwd + "&grant_type=" + __WEBPACK_IMPORTED_MODULE_3__app_app_service__["a" /* AppConfig */].grant_type;
            this.appService.httpPostHeader(oauthTokenUrl, body, this.oauthTokenHeaders).then(function (data) {
                if (data.access_token) {
                    loading_1.dismiss();
                    var firstLoginUrl = __WEBPACK_IMPORTED_MODULE_3__app_app_service__["a" /* AppConfig */].API.firstLogin;
                    _this.loginHeaders = new __WEBPACK_IMPORTED_MODULE_0__angular_http__["a" /* Headers */]({
                        'Authorization': 'Bearer ' + data.access_token
                    });
                    _this.appService.httpGetHeader(firstLoginUrl, _this.loginHeaders).then(function (firstLoginData) {
                        var user = {
                            username: _this.username,
                            pwd: _this.pwd
                        };
                        if (!_this.rememberPassword) {
                            user.pwd = "";
                        }
                        if (firstLoginData.firstLogin == 1) {
                            var appNav = _this.app.getRootNav();
                            appNav.setRoot(__WEBPACK_IMPORTED_MODULE_7__update_pwd_update_pwd__["a" /* UpdatePwd */], { initialPwd: _this.pwd, tpb_token: data.access_token, refresh_token: data.refresh_token, user: user, rememberPassword: _this.rememberPassword });
                        }
                        else if (firstLoginData.firstLogin == 0) {
                            var newDateMS = (new Date()).getTime() + data.expires_in * 1000 - __WEBPACK_IMPORTED_MODULE_3__app_app_service__["a" /* AppConfig */].RESERVED_TIME;
                            _this.appService.setItem("newDateMS", newDateMS);
                            _this.appService.setItem("user", JSON.stringify(user));
                            _this.appService.setItem("tpb_token", data.access_token);
                            _this.appService.setItem("refresh_token", data.refresh_token);
                            var appNav = _this.app.getRootNav();
                            appNav.setRoot(__WEBPACK_IMPORTED_MODULE_5__tabs_tabs__["a" /* TabsPage */]);
                        }
                    }).catch(function (error) {
                        console.log(error);
                        _this.appService.toast('网络错误，请稍后重试', 1000, 'middle');
                    });
                }
                else {
                    loading_1.dismiss();
                    _this.appService.toast('网络错误，请稍后重试', 1000, 'middle');
                }
            }).catch(function (error) {
                loading_1.dismiss();
                console.log("\u8BBF\u95EE\u9519\u8BEF:" + error);
                if (error.status == 400 && error.json().error == "invalid_grant") {
                    _this.appService.toast('用户名或密码错误', 1000, 'middle');
                }
                else {
                    _this.appService.toast('网络异常，请稍后重试', 1000, 'middle');
                }
            });
        }
    };
    //忘记密码
    Login.prototype.forget = function () {
        this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_4__forget_forget__["a" /* Forget */]);
    };
    Login.prototype.onblurAffirm = function () {
        if (this.username == '') {
            this.isUserName = true;
            this.userNameValue = '*账号不得为空';
        }
        else {
            this.isUserName = false;
            this.userNameValue = '*账号不正确，请确认后重新输入';
        }
    };
    return Login;
}());
Login = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_1__angular_core__["n" /* Component */])({
        selector: 'login',template:/*ion-inline-start:"C:\Users\think\huchunGit\tpb02\tpb\src\pages\login\login.html"*/'<ion-header class="header-title-hidden">\n\n  <ion-navbar>\n\n    <ion-title text-center>登录</ion-title>\n\n  </ion-navbar>\n\n</ion-header>\n\n<ion-content>\n\n  <h1 class="logo" ><img src="./assets/image/logo.png" alt="淘璞帮"></h1>\n\n  <div class="login-content">\n\n    <ion-list>\n\n      <ion-item>\n\n        <ion-input [(ngModel)]="username" type="text" placeholder="账号或手机号码" required clearInput=true (ionBlur)="onblurAffirm()"></ion-input>\n\n      </ion-item>\n\n      <div class=\'login-error\' *ngIf="isUserName">{{userNameValue}}</div>\n\n      <ion-item>\n\n        <ion-input [(ngModel)]="pwd" type="password" placeholder="密码" required clearInput=true></ion-input>\n\n      </ion-item>\n\n      <div class=\'login-error\' *ngIf="isPwd">{{userPwdValue}}</div>\n\n      <ion-item>\n\n        <ion-label>记住密码</ion-label>\n\n        <ion-checkbox [(ngModel)]="rememberPassword"></ion-checkbox>\n\n      </ion-item>\n\n      <!-- <ion-item  class="forget" (click)="forget()">\n\n        <span>忘记密码?</span>s\n\n      </ion-item> -->\n\n    </ion-list>\n\n    <button class="btn-login" ion-button block round (click)="login()">登录</button>\n\n  </div>\n\n</ion-content>\n\n'/*ion-inline-end:"C:\Users\think\huchunGit\tpb02\tpb\src\pages\login\login.html"*/
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_2_ionic_angular__["l" /* NavController */],
        __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["b" /* App */],
        __WEBPACK_IMPORTED_MODULE_3__app_app_service__["b" /* AppService */],
        __WEBPACK_IMPORTED_MODULE_0__angular_http__["b" /* Http */]])
], Login);

//# sourceMappingURL=login.js.map

/***/ }),

/***/ 113:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return MyCode; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__app_app_service__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_ionic_angular__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_crypto_js__ = __webpack_require__(323);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_crypto_js___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_crypto_js__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_js_base64__ = __webpack_require__(347);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_js_base64___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4_js_base64__);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};





var MyCode = (function () {
    function MyCode(navCtrl, viewCtrl, appService) {
        this.navCtrl = navCtrl;
        this.viewCtrl = viewCtrl;
        this.appService = appService;
        this.btnText = "查看门店二维码";
        this.isShow = false;
        this.myCode = "";
        this.brandshopIndexUrl = "";
        this.getParams();
    }
    // 是否显示门店二维码
    MyCode.prototype.showBrandshopCode = function () {
        this.isShow = !this.isShow;
        this.btnText = !this.isShow ? "查看门店二维码" : "收起门店二维码";
    };
    //获取门店二维码，以及导购员参数
    MyCode.prototype.getParams = function () {
        var _this = this;
        var obj = this.restFulSha("GET", "/topbaby/restful/wechat/qrCode/getQRCodeUrl", "bsSecret2017");
        var url = __WEBPACK_IMPORTED_MODULE_1__app_app_service__["a" /* AppConfig */].API.qrcode;
        this.appService.httpGet(url)
            .then(function (data) {
            _this.brandshopIndexUrl = data.brandshopIndexUrl + "?id=" + data.brandshopId;
            var myCodeUrl = data.userRecommendWechatQrCodeUrl + "?type=U&userId=" + data.brandshopUserId + "&accessKeyId=topbabyBs&signature=" + obj.signature + "&expires=" + obj.expires;
            _this.getMyQRcode(myCodeUrl);
        })
            .catch(function (error) {
            _this.appService.getToken(error, function () {
                _this.getParams();
            });
            console.log(error);
        });
    };
    // 获取导购员带参二维码
    MyCode.prototype.getMyQRcode = function (paramUrl) {
        var _this = this;
        this.appService.httpGetNoAuthor(paramUrl)
            .then(function (data) {
            _this.myCode = data.url;
        })
            .catch(function (error) {
            _this.appService.getToken(error, function () {
                _this.getMyQRcode(paramUrl);
            });
            console.log(error);
        });
    };
    /** 获取时间 **/
    MyCode.prototype.getNowUtcTime = function () {
        var date = new Date();
        var nowYear = date.getFullYear();
        var nowMoth = date.getMonth() + 1;
        var nowDay = date.getDate();
        var nowHour = date.getHours();
        var nowMinute = date.getMinutes();
        var nowSecond = date.getSeconds();
        // console.log(Date.UTC(nowYear, nowMoth, nowDay, nowHour,nowMinute + 10,nowSecond));
        var expired = Date.UTC(nowYear, nowMoth, nowDay, nowHour, nowMinute + 10, nowSecond) + '';
        // console.log(Number(expired.substr(0,10)));
        return Number(expired.substr(0, 10));
    };
    // 加密
    MyCode.prototype.restFulSha = function (RequestMethod, url, topbabysecret) {
        var expired = this.getNowUtcTime();
        url = RequestMethod + "\n" + url + "\n" + expired + "\n";
        var signature = __WEBPACK_IMPORTED_MODULE_3_crypto_js___default.a.HmacSHA1(url, topbabysecret);
        signature = __WEBPACK_IMPORTED_MODULE_4_js_base64___default.a.Base64.encode(signature);
        var obj = {
            expires: expired,
            signature: signature
        };
        return obj;
    };
    return MyCode;
}());
MyCode = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["n" /* Component */])({
        selector: 'mycode',template:/*ion-inline-start:"C:\Users\think\huchunGit\tpb02\tpb\src\pages\mycode\mycode.html"*/'<ion-header>\n\n  <ion-navbar>\n\n    <ion-title text-center>我的二维码</ion-title>\n\n  </ion-navbar>\n\n</ion-header>\n\n<ion-content>\n\n	<div class="qrcode-box">\n\n		<div class=\'qrcode\'>\n\n			<qr-code *ngIf="myCode" [value]="myCode" [size]="180"></qr-code>\n\n		</div>\n\n		<div class="total">扫码注册淘璞，享更多优惠</div>\n\n		<div class="btn-brandshop-code" (touchstart)="showBrandshopCode()">{{ btnText }}</div>\n\n		<div class="brandshop-code" *ngIf="isShow">\n\n			<div class=\'qrcode\'>\n\n				<qr-code *ngIf="brandshopIndexUrl" [value]="brandshopIndexUrl" [size]="180"></qr-code>\n\n			</div>\n\n			<div class="total">扫门店二维码，可快速定位到门店首页</div>\n\n		</div>\n\n	</div>\n\n</ion-content>\n\n'/*ion-inline-end:"C:\Users\think\huchunGit\tpb02\tpb\src\pages\mycode\mycode.html"*/
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_2_ionic_angular__["l" /* NavController */],
        __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["q" /* ViewController */],
        __WEBPACK_IMPORTED_MODULE_1__app_app_service__["b" /* AppService */]])
], MyCode);

//# sourceMappingURL=mycode.js.map

/***/ }),

/***/ 116:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AuditCancelorder; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__app_app_service__ = __webpack_require__(4);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



var AuditCancelorder = (function () {
    function AuditCancelorder(navCtrl, alertCtrl, appService) {
        this.navCtrl = navCtrl;
        this.alertCtrl = alertCtrl;
        this.appService = appService;
        this.auditCancelorderArray = [];
        this.currentPage = 1;
        this.limit = 10;
        this.up = true; //上拉刷新和第一次进入页面时
        this.down = false; //下拉刷新和返回上一级页面时
        this.noData = false;
        this.start = 0;
        this.showNoMore = false;
        this.load = {};
        this.loadingShow = true;
        this.requestDefeat = false;
        this.showInfinite = false;
        this.start = 0;
        this.down = true;
        this.up = false;
        this.load = __WEBPACK_IMPORTED_MODULE_2__app_app_service__["a" /* AppConfig */].load;
        this.getAuditCancelorder();
    }
    AuditCancelorder.prototype.getAuditCancelorder = function () {
        var _this = this;
        // 待审核已取消订单 请求数据
        var url = __WEBPACK_IMPORTED_MODULE_2__app_app_service__["a" /* AppConfig */].API.getCancelorder + "?deliveryType=1&status=1&start=" + this.start + "&limit=" + this.limit;
        this.appService.httpGet(url).then(function (data) {
            _this.loadingShow = false;
            if (data.count == 0 && _this.auditCancelorderArray.length == 0) {
                //空空如也
                _this.noData = true;
            }
            else {
                _this.noData = false;
                _this.showInfinite = true;
                if (_this.start < data.count) {
                    if (_this.up) {
                        (_a = _this.auditCancelorderArray).push.apply(_a, data.data);
                        _this.start += _this.limit;
                    }
                    else if (_this.down) {
                        _this.auditCancelorderArray = data.data;
                        _this.start += _this.limit;
                    }
                }
                else {
                    _this.showNoMore = true;
                }
            }
            var _a;
        }).catch(function (error) {
            _this.appService.getToken(error, function () {
                _this.getAuditCancelorder();
            });
            _this.auditCancelorderArray = [];
            _this.loadingShow = false;
            console.log(error);
            _this.showInfinite = false;
            _this.requestDefeat = true;
        });
    };
    // 下拉刷新请求数据
    AuditCancelorder.prototype.refreshGetSelfGiftList = function (refresher) {
        var _this = this;
        this.start = 0;
        this.down = true;
        this.up = false;
        this.showNoMore = false;
        this.showInfinite = true;
        var url = __WEBPACK_IMPORTED_MODULE_2__app_app_service__["a" /* AppConfig */].API.getCancelorder + "?deliveryType=1&status=1&start=" + this.start + "&limit=" + this.limit;
        this.appService.httpGet(url).then(function (data) {
            refresher.complete();
            if (data.count == 0) {
                //空空如也
                _this.noData = true;
            }
            else {
                _this.noData = false;
                _this.showInfinite = true;
                if (data.data.length != 0) {
                    _this.auditCancelorderArray = data.data;
                    _this.start += _this.limit;
                }
                else {
                    _this.showNoMore = true;
                }
            }
        }).catch(function (error) {
            _this.appService.getToken(error, function () {
                _this.refreshGetSelfGiftList(refresher);
            });
            _this.auditCancelorderArray = [];
            refresher.complete();
            console.log(error);
            _this.showInfinite = false;
            _this.requestDefeat = true;
        });
    };
    // 上拉刷新请求数据
    AuditCancelorder.prototype.infiniteGetSelfGiftList = function (infiniteScroll) {
        var _this = this;
        this.down = false;
        this.up = true;
        var url = __WEBPACK_IMPORTED_MODULE_2__app_app_service__["a" /* AppConfig */].API.getCancelorder + "?deliveryType=1&status=1&start=" + this.start + "&limit=" + this.limit;
        this.appService.httpGet(url).then(function (data) {
            infiniteScroll.complete();
            if (data.count == 0) {
                //空空如也
                _this.noData = true;
            }
            else {
                _this.noData = false;
                if (data.data.length != 0) {
                    (_a = _this.auditCancelorderArray).push.apply(_a, data.data);
                    _this.start += _this.limit;
                }
                else {
                    _this.showNoMore = true;
                }
            }
            var _a;
        }).catch(function (error) {
            _this.appService.getToken(error, function () {
                _this.infiniteGetSelfGiftList(infiniteScroll);
            });
            infiniteScroll.complete();
            console.log(error);
            _this.appService.toast('网络异常，请稍后再试', 1000, 'middle');
        });
    };
    //请求失败后刷新
    AuditCancelorder.prototype.requestDefeatRefresh = function () {
        this.requestDefeat = false;
        this.loadingShow = true;
        this.start = 0;
        this.down = true;
        this.up = false;
        this.getAuditCancelorder();
    };
    return AuditCancelorder;
}());
AuditCancelorder = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["n" /* Component */])({
        selector: 'audit-cancelorder',template:/*ion-inline-start:"C:\Users\think\huchunGit\tpb02\tpb\src\pages\audit-cancelorder\audit-cancelorder.html"*/'<ion-header>\n\n  <ion-navbar>\n\n    <ion-title text-center>已审核取消订单</ion-title>\n\n  </ion-navbar>\n\n  \n\n</ion-header>\n\n<ion-content>\n\n  <ion-refresher (ionRefresh)="refreshGetSelfGiftList($event)" *ngIf="!loadingShow">\n\n    <ion-refresher-content></ion-refresher-content>\n\n  </ion-refresher>\n\n  <div class="order-list">\n\n    <!-- loading -->\n\n    <div class="loading-wrapper" *ngIf="loadingShow">\n\n      <div>\n\n        <ion-spinner item-start [name]="load.spinner"></ion-spinner>\n\n      </div>\n\n      <div [innerHTML]="load.content"></div>\n\n    </div>\n\n    <div class="order-items" *ngFor="let item of auditCancelorderArray;let i = index">\n\n      <div class="order-title">\n\n        <h2>订单编号：\n\n          <span>{{item.orderId}}</span>\n\n        </h2>\n\n        <span [ngClass]="{auditStatus: true, pass:(item.status | setCancelOrderStatus).pass , auditing:(item.status | setCancelOrderStatus).audit} ">{{(item.status | setCancelOrderStatus).status}}</span>\n\n      </div>\n\n\n\n      <div class="order-item" *ngFor="let single of item.itemList">\n\n        <dl>\n\n          <dt>\n\n            <img class="my-picture" [src]="single.productSkuDTO.fileSeq | productSkuDTOImage" [alt]="single.productSkuDTO.productName">\n\n          </dt>\n\n          <dd class="product-title">{{ single.productSkuDTO.productName }}</dd>\n\n          <dd class="sku-list">\n\n            <span *ngFor="let sku of single.productSkuDTO.attrValueList">{{ sku.attrValue }} </span>\n\n          </dd>\n\n          <dd class=\'price\'>￥{{ single.unitPrice }}</dd>\n\n          <dd class="count">X{{ single.number }}</dd>\n\n        </dl>\n\n      </div>\n\n\n\n      <div class="orderOperate">\n\n        <dl>\n\n          <dd class="total">{{item.totalNumber}}件商品，实付￥{{item.payAmount}}</dd>\n\n          <dd class="member-phone">会员手机：{{item.memberMobile}}</dd>\n\n        </dl>\n\n      </div>\n\n    </div>\n\n\n\n    <div class="no-data" *ngIf = "noData">\n\n      <img src="./assets/image/nodata.png" alt="">\n\n      <p>空空如也</p>\n\n    </div>\n\n    <div class="btn-noMore" *ngIf = "showNoMore">\n\n      <span>—— 没有更多信息了 ——</span>\n\n    </div>\n\n    <div class="request-defeat" *ngIf = "requestDefeat">\n\n      <img src="./assets/image/requestDefeat.png" alt="">\n\n      <p>啊哦！页面走丢了</p>\n\n      <button class="btn-request-defeat" ion-button full (touchstart)="requestDefeatRefresh()">\n\n        刷新再找一找\n\n      </button>\n\n    </div>\n\n    <ion-infinite-scroll (ionInfinite)="infiniteGetSelfGiftList($event)" *ngIf = "!showNoMore && showInfinite">\n\n      <ion-infinite-scroll-content loadingText="加载更多..."></ion-infinite-scroll-content>\n\n    </ion-infinite-scroll>\n\n\n\n  </div>\n\n\n\n</ion-content>'/*ion-inline-end:"C:\Users\think\huchunGit\tpb02\tpb\src\pages\audit-cancelorder\audit-cancelorder.html"*/
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["l" /* NavController */],
        __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["a" /* AlertController */],
        __WEBPACK_IMPORTED_MODULE_2__app_app_service__["b" /* AppService */]])
], AuditCancelorder);

//# sourceMappingURL=audit-cancelorder.js.map

/***/ }),

/***/ 117:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AuditReturnorder; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__returned_detail_returned_detail__ = __webpack_require__(223);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__app_app_service__ = __webpack_require__(4);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




var AuditReturnorder = (function () {
    function AuditReturnorder(navCtrl, modalCtrl, alertCtrl, appService) {
        this.navCtrl = navCtrl;
        this.modalCtrl = modalCtrl;
        this.alertCtrl = alertCtrl;
        this.appService = appService;
        this.auditReturnorderArray = [];
        this.limit = 10;
        this.up = true; //上拉刷新和第一次进入页面时
        this.down = false; //下拉刷新和返回上一级页面时
        this.noData = false;
        this.start = 0;
        this.showNoMore = false;
        this.load = {};
        this.loadingShow = true;
        this.requestDefeat = false;
        this.showInfinite = false;
        this.up = false;
        this.down = true;
        this.load = __WEBPACK_IMPORTED_MODULE_3__app_app_service__["a" /* AppConfig */].load;
        this.getAuditReturnorderList();
    }
    AuditReturnorder.prototype.goReturnedDetail = function (index) {
        var contactModal = this.modalCtrl.create(__WEBPACK_IMPORTED_MODULE_2__returned_detail_returned_detail__["a" /* ReturnedDetail */], { indexId: this.auditReturnorderArray[index].orderReturnSeq, status: this.auditReturnorderArray[index].status });
        contactModal.present();
    };
    AuditReturnorder.prototype.getAuditReturnorderList = function () {
        var _this = this;
        // 已审核退货订单 请求数据
        var url = __WEBPACK_IMPORTED_MODULE_3__app_app_service__["a" /* AppConfig */].API.getReturnorderList + "?deliveryType=1&status=1&start=" + this.start + "&limit=" + this.limit;
        this.appService.httpGet(url).then(function (data) {
            _this.loadingShow = false;
            if (data.count == 0 && _this.auditReturnorderArray.length == 0) {
                //空空如也
                _this.noData = true;
            }
            else {
                _this.noData = false;
                _this.showInfinite = true;
                if (_this.start < data.count) {
                    if (_this.up) {
                        (_a = _this.auditReturnorderArray).push.apply(_a, data.data);
                        _this.start += _this.limit;
                    }
                    else if (_this.down) {
                        _this.auditReturnorderArray = data.data;
                        _this.start += _this.limit;
                    }
                }
                else {
                    _this.showNoMore = true;
                }
            }
            var _a;
        }).catch(function (error) {
            _this.appService.getToken(error, function () {
                _this.getAuditReturnorderList();
            });
            _this.auditReturnorderArray = [];
            _this.loadingShow = false;
            console.log(error);
            _this.showInfinite = false;
            _this.requestDefeat = true;
        });
    };
    // 下拉刷新请求数据
    AuditReturnorder.prototype.doRefresh = function (refresher) {
        var _this = this;
        this.start = 0;
        this.down = true;
        this.up = false;
        this.showNoMore = false;
        this.showInfinite = true;
        var url = __WEBPACK_IMPORTED_MODULE_3__app_app_service__["a" /* AppConfig */].API.getReturnorderList + "?deliveryType=1&status=1&start=" + this.start + "&limit=" + this.limit;
        this.appService.httpGet(url).then(function (data) {
            refresher.complete();
            if (data.count == 0) {
                //空空如也
                _this.noData = true;
            }
            else {
                _this.noData = false;
                _this.showInfinite = true;
                if (data.data.length != 0) {
                    _this.auditReturnorderArray = data.data;
                    _this.start += _this.limit;
                }
                else {
                    _this.showNoMore = true;
                }
            }
        }).catch(function (error) {
            _this.appService.getToken(error, function () {
                _this.doRefresh(refresher);
            });
            _this.auditReturnorderArray = [];
            refresher.complete();
            console.log(error);
            _this.showInfinite = false;
            _this.requestDefeat = true;
        });
    };
    // 上拉刷新请求数据
    AuditReturnorder.prototype.infiniteGetSelfGiftList = function (infiniteScroll) {
        var _this = this;
        this.down = false;
        this.up = true;
        var url = __WEBPACK_IMPORTED_MODULE_3__app_app_service__["a" /* AppConfig */].API.getReturnorderList + "?deliveryType=1&status=1&start=" + this.start + "&limit=" + this.limit;
        this.appService.httpGet(url).then(function (data) {
            infiniteScroll.complete();
            if (data.count == 0) {
                //空空如也
                _this.noData = true;
            }
            else {
                _this.noData = false;
                if (data.data.length != 0) {
                    (_a = _this.auditReturnorderArray).push.apply(_a, data.data);
                    _this.start += _this.limit;
                }
                else {
                    _this.showNoMore = true;
                }
            }
            var _a;
        }).catch(function (error) {
            _this.appService.getToken(error, function () {
                _this.infiniteGetSelfGiftList(infiniteScroll);
            });
            infiniteScroll.complete();
            console.log(error);
            _this.appService.toast('网络异常，请稍后再试', 1000, 'middle');
        });
    };
    //请求失败后刷新
    AuditReturnorder.prototype.requestDefeatRefresh = function () {
        this.requestDefeat = false;
        this.loadingShow = true;
        this.start = 0;
        this.down = true;
        this.up = false;
        this.getAuditReturnorderList();
    };
    return AuditReturnorder;
}());
AuditReturnorder = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["n" /* Component */])({
        selector: 'audit-returnorder',template:/*ion-inline-start:"C:\Users\think\huchunGit\tpb02\tpb\src\pages\audit-returnorder\audit-returnorder.html"*/'<ion-header>\n\n  <ion-navbar>\n\n    <ion-title text-center>已处理退货订单</ion-title>\n\n  </ion-navbar>\n\n</ion-header>\n\n<ion-content>\n\n  <ion-refresher (ionRefresh)="doRefresh($event)" *ngIf="!loadingShow">\n\n    <ion-refresher-content></ion-refresher-content>\n\n  </ion-refresher>\n\n	<div class="order-list">\n\n    <!-- loading -->\n\n    <div class="loading-wrapper" *ngIf="loadingShow">\n\n      <div>\n\n        <ion-spinner item-start [name]="load.spinner"></ion-spinner>\n\n      </div>\n\n      <div [innerHTML]="load.content"></div>\n\n    </div>\n\n		<div class="order-items" (click)="goReturnedDetail(i)" *ngFor = "let item of auditReturnorderArray;let i = index">\n\n			<div class="order-title">\n\n          <h2>订单编号：\n\n            <span>{{item.orderId}}</span>\n\n          </h2>\n\n          <span [ngClass]="{auditStatus: true, pass:(item.status | setReturnOrderStatus).pass , auditing:(item.status | setReturnOrderStatus).audit} ">{{(item.status | setReturnOrderStatus).status}}</span>\n\n        </div>\n\n    \n\n        <div class="order-item">\n\n          <dl>\n\n            <dt>\n\n              <img class="my-picture" [src]="item.productSkuDTO.fileSeq | productSkuDTOImage" [alt]="item.productSkuDTO.productName">\n\n            </dt>\n\n            <dd class="product-title">{{ item.productSkuDTO.productName }}</dd>\n\n            <dd class="sku-list">\n\n              <span *ngFor="let sku of item.productSkuDTO.attrValueList">{{ sku.attrValue }} </span>\n\n            </dd>\n\n            <dd class=\'price\'>￥{{ item.unitPrice }}</dd>\n\n            <dd class="count">X{{ item.number }}</dd>\n\n          </dl>\n\n        </div>\n\n			\n\n			<div class="orderOperate">\n\n				<dl>\n\n					<dt>\n\n						\n\n					</dt>\n\n					<dd class="total">退货数量: {{item.number}}</dd>\n\n					<dd class="member-phone">会员手机：{{item.mobile}}</dd>\n\n				</dl>\n\n			</div>\n\n    </div>\n\n    \n\n		<div class="no-data" *ngIf = "noData">\n\n      <img src="./assets/image/nodata.png" alt="">\n\n      <p>空空如也</p>\n\n    </div>\n\n    <div class="btn-noMore" *ngIf = "showNoMore">\n\n      <span>—— 没有更多信息了 ——</span>\n\n    </div>\n\n    <div class="request-defeat" *ngIf = "requestDefeat">\n\n      <img src="./assets/image/requestDefeat.png" alt="">\n\n      <p>啊哦！页面走丢了</p>\n\n      <button class="btn-request-defeat" ion-button full (touchstart)="requestDefeatRefresh()">\n\n        刷新再找一找\n\n      </button>\n\n    </div>\n\n    <ion-infinite-scroll (ionInfinite)="infiniteGetSelfGiftList($event)" *ngIf = "!showNoMore && showInfinite">\n\n      <ion-infinite-scroll-content loadingText="加载更多..."></ion-infinite-scroll-content>\n\n    </ion-infinite-scroll>\n\n	</div>\n\n\n\n</ion-content>\n\n'/*ion-inline-end:"C:\Users\think\huchunGit\tpb02\tpb\src\pages\audit-returnorder\audit-returnorder.html"*/
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["l" /* NavController */],
        __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["j" /* ModalController */],
        __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["a" /* AlertController */],
        __WEBPACK_IMPORTED_MODULE_3__app_app_service__["b" /* AppService */]])
], AuditReturnorder);

//# sourceMappingURL=audit-returnorder.js.map

/***/ }),

/***/ 118:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ReturnDetail; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__app_app_service__ = __webpack_require__(4);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



var ReturnDetail = (function () {
    function ReturnDetail(navCtrl, viewCtrl, alertCtrl, navParams, appService) {
        this.navCtrl = navCtrl;
        this.viewCtrl = viewCtrl;
        this.alertCtrl = alertCtrl;
        this.navParams = navParams;
        this.appService = appService;
        this.returnDetail = {
            orderReturn: {
                orderReturnSeq: '',
                returnOrderId: '',
                invoiced: '',
                detail: '',
                mobile: '',
                number: '',
                name: '',
                returnType: '',
                totalReturnPrice: '',
                status: '',
                returnReason: ''
            },
            order: {
                orderSeq: '',
                orderId: '',
                payAmount: ''
            },
            itemProductSkuDTO: {
                orderItemSeq: null,
                prodSeq: null,
                skuSeq: null,
                unitPrice: null,
                number: null,
                productSkuDTO: {
                    productSeq: null,
                    skuSeq: null,
                    unitPrice: '',
                    number: '',
                    productName: "",
                    fileName: '',
                    attrValueList: [
                        {
                            skuSeq: null,
                            attrSeq: null,
                            attrName: "",
                            attrValue: "",
                            type: null,
                            fileSeq: null,
                            price: null,
                            selectedAttrValue: null,
                            invalidAttrValue: null
                        },
                        {
                            skuSeq: null,
                            attrSeq: null,
                            attrName: "",
                            attrValue: "",
                            type: null,
                            fileSeq: null,
                            price: null,
                            selectedAttrValue: null,
                            invalidAttrValue: null
                        }
                    ],
                    fallback: null
                }
            },
            returnAmount: null
        };
        this.load = {};
        this.loadingShow = true;
        this.productId = this.navParams.get('productId'); //传上个页面当前点击的id来获取详情页信息
        this.load = __WEBPACK_IMPORTED_MODULE_2__app_app_service__["a" /* AppConfig */].load;
        this.getReturnDetailList();
    }
    ReturnDetail.prototype.getReturnDetailList = function () {
        var _this = this;
        var url = __WEBPACK_IMPORTED_MODULE_2__app_app_service__["a" /* AppConfig */].API.returnDetail + "?id=" + this.productId;
        this.appService.httpGet(url).then(function (data) {
            _this.loadingShow = false;
            _this.returnDetail = data;
            if (_this.returnDetail.orderReturn.imageIds) {
                _this.imageArray = _this.returnDetail.orderReturn.imageIds.split(",");
            }
        }).catch(function (error) {
            _this.appService.getToken(error, function () {
                _this.getReturnDetailList();
            });
            _this.loadingShow = false;
            console.log(error);
            _this.appService.toast('网络异常，请稍后再试', 1000, 'middle');
        });
    };
    ReturnDetail.prototype.agreeReturn = function () {
        var _this = this;
        var alert = this.alertCtrl.create({
            message: '退货数量: ' + this.returnDetail.orderReturn.number + ("<span>\u62DF\u9000\u6B3E\u91D1\u989D\uFF1A" + this.returnDetail.returnAmount + " \u5143</span>"),
            buttons: [
                {
                    text: '取消',
                    handler: function () {
                        //点击取消后的执行代码
                    }
                },
                {
                    text: '确认',
                    handler: function () {
                        var loading = _this.appService.loading();
                        loading.present();
                        var url = __WEBPACK_IMPORTED_MODULE_2__app_app_service__["a" /* AppConfig */].API.auditReturnOrder + "?id=" + _this.productId + "&isAgree=1&totalReturnPrice=" + _this.returnDetail.returnAmount;
                        _this.appService.httpPost(url, null).then(function (data) {
                            if (data.type == "success") {
                                loading.dismiss();
                                _this.viewCtrl.dismiss();
                            }
                        }).catch(function (error) {
                            loading.dismiss();
                            console.log(error);
                            _this.appService.toast('操作失败，请稍后再试', 1000, 'middle');
                        });
                    }
                }
            ],
            cssClass: 'detail-alert'
        });
        alert.present();
    };
    ReturnDetail.prototype.refuseReturn = function () {
        var _this = this;
        var alert = this.alertCtrl.create({
            message: "\u786E\u8BA4\u62D2\u7EDD\u4F1A\u5458" + this.returnDetail.orderReturn.mobile + "\u7684\u8BA2\u5355" + this.returnDetail.orderReturn.returnOrderId + "\u9000\u8D27\u7533\u8BF7\uFF1F",
            buttons: [
                {
                    text: '取消',
                    handler: function () {
                        //点击取消后的执行代码
                    }
                },
                {
                    text: '确认',
                    handler: function () {
                        var loading = _this.appService.loading();
                        loading.present();
                        var url = __WEBPACK_IMPORTED_MODULE_2__app_app_service__["a" /* AppConfig */].API.auditReturnOrder + "?id=" + _this.productId + "&isAgree=0&totalReturnPrice=" + _this.returnDetail.returnAmount;
                        _this.appService.httpPost(url, null).then(function (data) {
                            if (data.type == "success") {
                                loading.dismiss();
                                _this.viewCtrl.dismiss();
                            }
                        }).catch(function (error) {
                            loading.dismiss();
                            console.log(error);
                            _this.appService.toast('操作失败，请稍后再试', 1000, 'middle');
                        });
                    }
                }
            ],
        });
        alert.present();
    };
    return ReturnDetail;
}());
ReturnDetail = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["n" /* Component */])({
        selector: 'return-detail',template:/*ion-inline-start:"C:\Users\think\huchunGit\tpb02\tpb\src\pages\return-detail\return-detail.html"*/'<ion-header>\n\n  <ion-navbar>\n\n    <ion-title text-center>退货详情</ion-title>\n\n  </ion-navbar>\n\n</ion-header>\n\n<ion-content>\n\n	<div class="order-list">\n\n		<!-- loading -->\n\n		<div class="loading-wrapper" *ngIf="loadingShow">\n\n			<div>\n\n				<ion-spinner item-start [name]="load.spinner"></ion-spinner>\n\n			</div>\n\n			<div [innerHTML]="load.content"></div>\n\n		</div>\n\n		<div class="order-items">\n\n			<div class="order-title">\n\n				<h2>订单编号：<span>{{returnDetail.orderReturn.returnOrderId}}</span></h2>\n\n				<span class="auditStatus">申请审核中</span>\n\n			</div>\n\n			<div class="order-item">\n\n			  <dl>\n\n			    <dt>\n\n			      <img class="my-picture" [src]="returnDetail.itemProductSkuDTO.productSkuDTO.fileSeq | productSkuDTOImage" [alt]="returnDetail.itemProductSkuDTO.productSkuDTO.productName">\n\n			    </dt>\n\n			    <dd class="product-title">{{returnDetail.itemProductSkuDTO.productSkuDTO.productName}}</dd>\n\n			    <dd class="sku-list">\n\n			      <span *ngFor="let sku of returnDetail.itemProductSkuDTO.productSkuDTO.attrValueList"> {{sku.attrValue}} </span>\n\n			    </dd>\n\n			    <dd class=\'price\'>￥{{returnDetail.itemProductSkuDTO.unitPrice}}</dd>\n\n			    <dd class="count">X{{returnDetail.itemProductSkuDTO.number}}</dd>\n\n			  </dl>\n\n			</div>\n\n			\n\n			<div class="orderOperate">\n\n				<dl>\n\n					<dt>\n\n					</dt>\n\n					<dd class="total">共{{returnDetail.orderReturn.number}}件商品，实付￥{{returnDetail.returnAmount}}</dd>\n\n				</dl>\n\n			</div>\n\n		</div>\n\n\n\n		<div class="return-detail">\n\n			<ul>\n\n				<li>退货数量：{{returnDetail.orderReturn.number}}</li>\n\n				<li>联系方式：{{returnDetail.orderReturn.mobile}}</li> \n\n				<li>退货方式：\n\n          <span *ngIf="returnDetail.orderReturn.returnType == 1">门店</span>\n\n          <span *ngIf="returnDetail.orderReturn.returnType == 2">快递</span>\n\n          <span *ngIf="returnDetail.orderReturn.returnType == 0">其他</span>\n\n        </li>\n\n				<li>是否有发票：{{returnDetail.orderReturn.invoiced==1?\'有\': \'无\'}}</li>\n\n				<li>退货原因：{{returnDetail.orderReturn.reasonType | reasonType}}</li>\n\n				<li>问题描述：{{returnDetail.orderReturn.detail}}</li>\n\n				<li class="img-list" *ngIf = "imageArray">\n\n					<img [src]="itemImg | productSkuDTOImage" alt="" *ngFor = "let itemImg of imageArray">\n\n				</li>\n\n			</ul>\n\n		</div>\n\n	</div>\n\n\n\n	<div class="btn-list">\n\n		<button class="btn-update" ion-button outline (touchstart)="refuseReturn()">拒绝</button>\n\n		<button class="order-again" ion-button (touchstart)="agreeReturn()">同意</button>\n\n	</div>\n\n\n\n</ion-content>\n\n'/*ion-inline-end:"C:\Users\think\huchunGit\tpb02\tpb\src\pages\return-detail\return-detail.html"*/
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["l" /* NavController */],
        __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["q" /* ViewController */],
        __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["a" /* AlertController */],
        __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["m" /* NavParams */],
        __WEBPACK_IMPORTED_MODULE_2__app_app_service__["b" /* AppService */]])
], ReturnDetail);

//# sourceMappingURL=return-detail.js.map

/***/ }),

/***/ 119:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return HandleExpressgift; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__app_app_service__ = __webpack_require__(4);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



var HandleExpressgift = (function () {
    function HandleExpressgift(navCtrl, alertCtrl, appService) {
        this.navCtrl = navCtrl;
        this.alertCtrl = alertCtrl;
        this.appService = appService;
        this.start = 0;
        this.limit = 10;
        this.showNoMore = false;
        this.up = true; //上拉刷新和第一次进入页面时
        this.down = false; //下拉刷新和返回上一级页面时
        this.noData = false;
        this.load = {};
        this.loadingShow = true;
        this.requestDefeat = false;
        this.showInfinite = false;
        // 获取已兑换快递赠品列表
        this.down = true;
        this.up = false;
        this.load = __WEBPACK_IMPORTED_MODULE_2__app_app_service__["a" /* AppConfig */].load;
    }
    HandleExpressgift.prototype.ionViewDidEnter = function () {
        setTimeout(this.getHandleExpressGiftList(), 100);
    };
    HandleExpressgift.prototype.getHandleExpressGiftList = function () {
        var _this = this;
        var url = __WEBPACK_IMPORTED_MODULE_2__app_app_service__["a" /* AppConfig */].API.getGiftList + "?type=3&start=" + this.start + "&limit=" + this.limit;
        this.appService.httpGet(url).then(function (data) {
            _this.loadingShow = false;
            if (data.count == 0) {
                //空空如也
                _this.noData = true;
            }
            else {
                _this.noData = false;
                _this.showInfinite = true;
                if (_this.start < data.count) {
                    if (_this.up) {
                        (_a = _this.handleExpressGiftArray).push.apply(_a, data.data);
                        _this.start += _this.limit;
                    }
                    else if (_this.down) {
                        _this.handleExpressGiftArray = data.data;
                        _this.start += _this.limit;
                        _this.content.scrollTo(0, 0, 0);
                    }
                }
                else {
                    _this.showNoMore = true;
                }
            }
            var _a;
        }).catch(function (error) {
            _this.appService.getToken(error, function () {
                _this.getHandleExpressGiftList();
            });
            _this.handleExpressGiftArray = [];
            _this.loadingShow = false;
            console.log(error);
            _this.showInfinite = false;
            _this.requestDefeat = true;
        });
    };
    // 下拉刷新请求数据
    HandleExpressgift.prototype.refreshGetHandleExpressGiftList = function (refresher) {
        var _this = this;
        this.start = 0;
        this.down = true;
        this.up = false;
        this.showNoMore = false;
        this.showInfinite = true;
        var url = __WEBPACK_IMPORTED_MODULE_2__app_app_service__["a" /* AppConfig */].API.getGiftList + "?type=3&start=" + this.start + "&limit=" + this.limit;
        this.appService.httpGet(url).then(function (data) {
            refresher.complete();
            if (data.count == 0) {
                //空空如也
                _this.noData = true;
            }
            else {
                _this.noData = false;
                _this.showInfinite = true;
                if (data.data.length != 0) {
                    _this.handleExpressGiftArray = data.data;
                    _this.start += _this.limit;
                }
                else {
                    _this.showNoMore = true;
                }
            }
        }).catch(function (error) {
            _this.appService.getToken(error, function () {
                _this.refreshGetHandleExpressGiftList(refresher);
            });
            _this.handleExpressGiftArray = [];
            refresher.complete();
            console.log(error);
            _this.showInfinite = false;
            _this.requestDefeat = true;
        });
    };
    // 上拉刷新请求数据
    HandleExpressgift.prototype.infiniteGetHandleExpressGiftList = function (infiniteScroll) {
        var _this = this;
        this.down = false;
        this.up = true;
        var url = __WEBPACK_IMPORTED_MODULE_2__app_app_service__["a" /* AppConfig */].API.getGiftList + "?type=3&start=" + this.start + "&limit=" + this.limit;
        this.appService.httpGet(url).then(function (data) {
            infiniteScroll.complete();
            if (data.count == 0) {
                //空空如也
                _this.noData = true;
            }
            else {
                _this.noData = false;
                if (data.data.length != 0) {
                    (_a = _this.handleExpressGiftArray).push.apply(_a, data.data);
                    _this.start += _this.limit;
                }
                else {
                    _this.showNoMore = true;
                }
            }
            var _a;
        }).catch(function (error) {
            _this.appService.getToken(error, function () {
                _this.infiniteGetHandleExpressGiftList(infiniteScroll);
            });
            infiniteScroll.complete();
            console.log(error);
            _this.appService.toast('网络异常，请稍后再试', 1000, 'middle');
        });
    };
    //请求失败后刷新
    HandleExpressgift.prototype.requestDefeatRefresh = function () {
        this.requestDefeat = false;
        this.loadingShow = true;
        this.start = 0;
        this.down = true;
        this.up = false;
        this.getHandleExpressGiftList();
    };
    return HandleExpressgift;
}());
__decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_14" /* ViewChild */])(__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["c" /* Content */]),
    __metadata("design:type", __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["c" /* Content */])
], HandleExpressgift.prototype, "content", void 0);
HandleExpressgift = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["n" /* Component */])({
        selector: 'handle-expressgift',template:/*ion-inline-start:"C:\Users\think\huchunGit\tpb02\tpb\src\pages\handle-expressgift\handle-expressgift.html"*/'<ion-header>\n\n  <ion-navbar>\n\n    <ion-title text-center>已发货赠品</ion-title>\n\n  </ion-navbar>\n\n</ion-header>\n\n<ion-content>\n\n  <ion-refresher (ionRefresh)="refreshGetHandleExpressGiftList($event)" *ngIf="!loadingShow">\n\n    <ion-refresher-content></ion-refresher-content>\n\n  </ion-refresher>\n\n  <div class="gift-list">\n\n    <!-- loading -->\n\n    <div class="loading-wrapper" *ngIf="loadingShow">\n\n      <div>\n\n        <ion-spinner item-start [name]="load.spinner"></ion-spinner>\n\n      </div>\n\n      <div [innerHTML]="load.content"></div>\n\n    </div>\n\n    <div class="gift-item" *ngFor = "let item of handleExpressGiftArray">\n\n      <dl>\n\n        <dt><img [src]="item.imageName | handleGiftImage" alt=""></dt>\n\n        <dd class="product-title">\n\n          <h2>{{item.giftName}}</h2>\n\n          <span class="unstart">立即兑换</span>\n\n        </dd>\n\n        <dd class="reserve-phone">\n\n          <span>会员手机：{{item.memberPhone}}</span>\n\n        </dd>\n\n        <dd class="get-time">领取时间：{{item.receiveDate | date:\'yyyy-MM-dd HH:mm:ss\'}}</dd>\n\n        <dd class="get-time">兑换时间：{{item.useDate | date:\'yyyy-MM-dd HH:mm:ss\'}}</dd>\n\n        <dd class="get-time">导购员：{{item.brandshopUserName}}</dd>\n\n      </dl>\n\n      <div class="reserve-time member-box">\n\n        <div class="member-info">\n\n          <ul>\n\n            <li *ngFor = "let single of item.attrValueList">{{single.label}}：{{single.value}}</li>\n\n          </ul>\n\n        </div>\n\n      </div>\n\n      <div class="reserve-time">\n\n        <div class="show-time">备注信息：{{item.expressCompany}} {{item.expressNo}}</div>\n\n      </div>\n\n    </div>\n\n    <div class="no-data" *ngIf = "noData">\n\n      <img src="./assets/image/nodata.png" alt="">\n\n      <p>空空如也</p>\n\n    </div>\n\n    <div class="btn-noMore" *ngIf = "showNoMore">\n\n      <span>—— 没有更多已兑换赠品了 ——</span>\n\n    </div>\n\n    <div class="request-defeat" *ngIf = "requestDefeat">\n\n      <img src="./assets/image/requestDefeat.png" alt="">\n\n      <p>啊哦！页面走丢了</p>\n\n      <button class="btn-request-defeat" ion-button full (touchstart)="requestDefeatRefresh()">\n\n        刷新再找一找\n\n      </button>\n\n    </div>\n\n    <ion-infinite-scroll (ionInfinite)="infiniteGetHandleExpressGiftList($event)" *ngIf = "!showNoMore && showInfinite">\n\n      <ion-infinite-scroll-content loadingText="加载更多..."></ion-infinite-scroll-content>\n\n    </ion-infinite-scroll>\n\n  </div>\n\n</ion-content>\n\n'/*ion-inline-end:"C:\Users\think\huchunGit\tpb02\tpb\src\pages\handle-expressgift\handle-expressgift.html"*/
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["l" /* NavController */],
        __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["a" /* AlertController */],
        __WEBPACK_IMPORTED_MODULE_2__app_app_service__["b" /* AppService */]])
], HandleExpressgift);

//# sourceMappingURL=handle-expressgift.js.map

/***/ }),

/***/ 120:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AddAccount; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__app_app_service__ = __webpack_require__(4);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



var AddAccount = (function () {
    function AddAccount(navCtrl, navParams, viewCtrl, appService, app, alertCtrl) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.viewCtrl = viewCtrl;
        this.appService = appService;
        this.app = app;
        this.alertCtrl = alertCtrl;
        this.salesName = '';
        this.cellphone = '';
        this.IDcard = '';
        this.accountContent = false; //见html
        this.noBind = true; //见html
        this.requestDefeat = false;
        this.loadingShow = false;
        this.load = {};
        this.isName = false; //校验姓名
        this.isPhone = false; //校验手机
        this.isIDCard = false; //校验身份证
    }
    AddAccount.prototype.bindWX = function () {
        var _this = this;
        if (this.salesName != "" && this.cellphone.length == 11 && this.IdentityCodeValid(this.IDcard)) {
            this.isName = false;
            this.isPhone = false;
            this.isIDCard = false;
            this.loadingShow = true;
            var editCurrentUrl = __WEBPACK_IMPORTED_MODULE_2__app_app_service__["a" /* AppConfig */].API.current;
            var editParameters = {
                salesName: this.salesName,
                cellphone: this.cellphone,
                idcard: this.IDcard
            };
            //更新导购员账户
            this.appService.httpPut(editCurrentUrl, editParameters).then(function (data) {
                if (data.type == "success") {
                    _this.loadingShow = false;
                    var redirectUri = "https://mobile." + __WEBPACK_IMPORTED_MODULE_2__app_app_service__["a" /* AppConfig */].mainUrl;
                    var encodeUrl = encodeURIComponent(redirectUri);
                    var getCodeUrl = __WEBPACK_IMPORTED_MODULE_2__app_app_service__["a" /* AppConfig */].API.connect + "?appid=" + __WEBPACK_IMPORTED_MODULE_2__app_app_service__["a" /* AppConfig */].appID + "&redirect_uri=" + encodeUrl + "&response_type=code&scope=snsapi_userinfo&state=STATE#wechat_redirect";
                    window.location.href = getCodeUrl;
                }
            }).catch(function (error) {
                _this.appService.getToken(error, function () {
                    _this.bindWX();
                });
                _this.loadingShow = false;
                console.log(error);
                _this.appService.toast('操作失败，请稍后重试', 1000, 'middle');
            });
        }
        else if (this.salesName == "") {
            this.isName = true;
            this.isPhone = false;
            this.isIDCard = false;
        }
        else if (this.cellphone.length != 11) {
            this.isName = false;
            this.isPhone = true;
            this.isIDCard = false;
        }
        else if (!this.IdentityCodeValid(this.IDcard)) {
            this.isName = false;
            this.isPhone = false;
            this.isIDCard = true;
        }
    };
    //修改收款人信息
    AddAccount.prototype.editCurrent = function () {
        var _this = this;
        if (this.salesName != "" && this.cellphone.length == 11 && this.IdentityCodeValid(this.IDcard)) {
            var confirm_1 = this.alertCtrl.create({
                title: '确认修改收款人信息？',
                buttons: [
                    {
                        text: '取消',
                        handler: function () {
                        }
                    },
                    {
                        text: '确定',
                        handler: function () {
                            _this.isName = false;
                            _this.isPhone = false;
                            _this.isIDCard = false;
                            _this.loadingShow = true;
                            var editCurrentUrl = __WEBPACK_IMPORTED_MODULE_2__app_app_service__["a" /* AppConfig */].API.current;
                            var editParameters = {
                                salesName: _this.salesName,
                                cellphone: _this.cellphone,
                                idcard: _this.IDcard
                            };
                            //更新导购员账户
                            _this.appService.httpPut(editCurrentUrl, editParameters).then(function (data) {
                                if (data.type == "success") {
                                    _this.loadingShow = false;
                                    _this.getCurrent();
                                    _this.appService.toast('更新成功', 1000, 'middle');
                                }
                            }).catch(function (error) {
                                _this.appService.getToken(error, function () {
                                    _this.editCurrent();
                                });
                                _this.loadingShow = false;
                                console.log(error);
                                _this.appService.toast('更新失败，请稍后重试', 1000, 'middle');
                            });
                        }
                    }
                ]
            });
            confirm_1.present();
        }
        else if (this.salesName == "") {
            this.isName = true;
            this.isPhone = false;
            this.isIDCard = false;
        }
        else if (this.cellphone.length != 11) {
            this.isName = false;
            this.isPhone = true;
            this.isIDCard = false;
        }
        else if (!this.IdentityCodeValid(this.IDcard)) {
            this.isName = false;
            this.isPhone = false;
            this.isIDCard = true;
        }
    };
    //查询当前导购员信息
    AddAccount.prototype.getCurrent = function () {
        var _this = this;
        this.load = __WEBPACK_IMPORTED_MODULE_2__app_app_service__["a" /* AppConfig */].load;
        this.loadingShow = true;
        this.accountContent = false;
        var getCurrentUrl = __WEBPACK_IMPORTED_MODULE_2__app_app_service__["a" /* AppConfig */].API.current;
        this.appService.httpGet(getCurrentUrl)
            .then(function (data) {
            _this.loadingShow = false;
            _this.requestDefeat = false;
            _this.accountContent = true;
            _this.boundWechat = data.boundWechat;
            _this.salesName = data.salesName;
            _this.cellphone = data.cellphone;
            _this.IDcard = data.idcard;
            if (_this.boundWechat) {
                _this.noBind = false;
            }
            else {
                _this.noBind = true;
            }
        })
            .catch(function (error) {
            _this.appService.getToken(error, function () {
                _this.getCurrent();
            });
            console.log(error);
            _this.loadingShow = false;
            _this.requestDefeat = true;
            _this.accountContent = false;
        });
    };
    AddAccount.prototype.ionViewDidEnter = function () {
        var _this = this;
        //重定向判断
        if (window.location.search && window.location.search.split("?")[1].indexOf("code") > -1) {
            this.accountContent = false;
            var loading_1 = this.appService.loading();
            loading_1.present();
            var code = window.location.search.split("?")[1].split("&")[0].split("=")[1];
            var getTokenUrl = __WEBPACK_IMPORTED_MODULE_2__app_app_service__["a" /* AppConfig */].API.callback + "?code=" + code + "&state=STATE";
            this.appService.httpGet(getTokenUrl).then(function (data) {
                if (data.type == "success") {
                    _this.appService.setItem("stopReturn", "have");
                    loading_1.dismiss();
                    _this.noBind = false;
                    _this.getCurrent();
                }
            }).catch(function (error) {
                loading_1.dismiss();
                _this.accountContent = false;
                _this.noBind = true;
                console.log(error);
                _this.appService.toast('更新失败，请稍后重试', 1000, 'middle');
            });
        }
        else {
            this.getCurrent();
        }
    };
    //身份证校验
    AddAccount.prototype.IdentityCodeValid = function (code) {
        var city = { 11: "北京", 12: "天津", 13: "河北", 14: "山西", 15: "内蒙古", 21: "辽宁", 22: "吉林", 23: "黑龙江 ", 31: "上海", 32: "江苏", 33: "浙江", 34: "安徽", 35: "福建", 36: "江西", 37: "山东", 41: "河南", 42: "湖北 ", 43: "湖南", 44: "广东", 45: "广西", 46: "海南", 50: "重庆", 51: "四川", 52: "贵州", 53: "云南", 54: "西藏 ", 61: "陕西", 62: "甘肃", 63: "青海", 64: "宁夏", 65: "新疆", 71: "台湾", 81: "香港", 82: "澳门", 91: "国外 " };
        var pass = true;
        if (!code || !/^\d{6}(18|19|20)?\d{2}(0[1-9]|1[012])(0[1-9]|[12]\d|3[01])\d{3}(\d|X)$/i.test(code)) {
            pass = false;
        }
        else if (!city[code.substr(0, 2)]) {
            pass = false;
        }
        else {
            //18位身份证需要验证最后一位校验位
            if (code.length == 18) {
                code = code.split('');
                //∑(ai×Wi)(mod 11)
                //加权因子
                var factor = [7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5, 8, 4, 2];
                //校验位
                var parity = [1, 0, 'X', 9, 8, 7, 6, 5, 4, 3, 2];
                var sum = 0;
                var ai = 0;
                var wi = 0;
                for (var i = 0; i < 17; i++) {
                    ai = code[i];
                    wi = factor[i];
                    sum += ai * wi;
                }
                if (parity[sum % 11] != code[17]) {
                    pass = false;
                }
            }
        }
        return pass;
    };
    return AddAccount;
}());
AddAccount = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["n" /* Component */])({
        selector: 'add-account',template:/*ion-inline-start:"C:\Users\think\huchunGit\tpb02\tpb\src\pages\account\add-account\add-account.html"*/'<ion-header>\n\n  <ion-navbar>\n\n    <ion-title text-center>收款账户</ion-title>\n\n  </ion-navbar>\n\n</ion-header>\n\n<ion-content>\n\n  <!-- loading -->\n\n  <div class="loading-wrapper" *ngIf="loadingShow">\n\n    <div>\n\n      <ion-spinner item-start [name]="load.spinner"></ion-spinner>\n\n    </div>\n\n    <div [innerHTML]="load.content"></div>\n\n  </div>\n\n  <div *ngIf="accountContent">\n\n    <div class="account-title" *ngIf="noBind">\n\n      填写收款人信息并绑定微信作为收款账户\n\n    </div>\n\n    <div class="account-title" *ngIf="!noBind">\n\n      <div class="binded"><img src="./assets/image/OK.png" alt="">已绑定微信</div>\n\n    </div>\n\n    <div class="form-list">\n\n      <ion-list>\n\n        <ion-item>\n\n          <ion-input [(ngModel)]="salesName" placeholder="输入收款人姓名" required></ion-input>\n\n        </ion-item>\n\n        <div class=\'bind-error\' *ngIf="isName">*请填写收款人</div>\n\n        <ion-item>\n\n          <ion-input type="tel" [(ngModel)]="cellphone" placeholder="输入收款人手机号码" maxlength=11 required></ion-input>\n\n        </ion-item>\n\n        <div class=\'bind-error\' *ngIf="isPhone">*请输入正确的手机号</div>\n\n        <ion-item>\n\n          <ion-input [(ngModel)]="IDcard" placeholder="输入收款人身份证号" required></ion-input>\n\n        </ion-item>\n\n        <div class=\'bind-error\' *ngIf="isIDCard">*请输入正确的身份证号</div>\n\n      </ion-list>\n\n    <button class="btn-bind" ion-button (click)="bindWX()" *ngIf="noBind">绑定微信</button>\n\n    <button class="btn-bind" ion-button (click)="editCurrent()" *ngIf="!noBind">确定</button>\n\n    <div class="message" *ngIf="noBind">*微信账户一旦绑定不能改，请谨慎操作</div>\n\n    </div>\n\n  </div>\n\n  <div class="request-defeat" *ngIf = "requestDefeat">\n\n    <img src="./assets/image/requestDefeat.png" alt="">\n\n    <p>啊哦！页面走丢了</p>\n\n    <button class="btn-request-defeat" ion-button full (touchstart)="getCurrent()">\n\n      刷新再找一找\n\n    </button>\n\n  </div>\n\n</ion-content>'/*ion-inline-end:"C:\Users\think\huchunGit\tpb02\tpb\src\pages\account\add-account\add-account.html"*/
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["l" /* NavController */],
        __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["m" /* NavParams */],
        __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["q" /* ViewController */],
        __WEBPACK_IMPORTED_MODULE_2__app_app_service__["b" /* AppService */],
        __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["b" /* App */],
        __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["a" /* AlertController */]])
], AddAccount);

//# sourceMappingURL=add-account.js.map

/***/ }),

/***/ 128:
/***/ (function(module, exports) {

function webpackEmptyAsyncContext(req) {
	// Here Promise.resolve().then() is used instead of new Promise() to prevent
	// uncatched exception popping up in devtools
	return Promise.resolve().then(function() {
		throw new Error("Cannot find module '" + req + "'.");
	});
}
webpackEmptyAsyncContext.keys = function() { return []; };
webpackEmptyAsyncContext.resolve = webpackEmptyAsyncContext;
module.exports = webpackEmptyAsyncContext;
webpackEmptyAsyncContext.id = 128;

/***/ }),

/***/ 169:
/***/ (function(module, exports) {

function webpackEmptyAsyncContext(req) {
	// Here Promise.resolve().then() is used instead of new Promise() to prevent
	// uncatched exception popping up in devtools
	return Promise.resolve().then(function() {
		throw new Error("Cannot find module '" + req + "'.");
	});
}
webpackEmptyAsyncContext.keys = function() { return []; };
webpackEmptyAsyncContext.resolve = webpackEmptyAsyncContext;
module.exports = webpackEmptyAsyncContext;
webpackEmptyAsyncContext.id = 169;

/***/ }),

/***/ 210:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return Forget; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(3);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


var Forget = (function () {
    function Forget(navCtrl) {
        this.navCtrl = navCtrl;
    }
    return Forget;
}());
Forget = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["n" /* Component */])({
        selector: 'forget',template:/*ion-inline-start:"C:\Users\think\huchunGit\tpb02\tpb\src\pages\forget\forget.html"*/'<ion-header>\n\n  <ion-navbar>\n\n    <ion-title text-center>找回密码</ion-title>\n\n  </ion-navbar>\n\n</ion-header>\n\n<ion-content>\n\n<div class="forget-box">\n\n  <ion-list>\n\n    <ion-item class="">\n\n      <ion-input type="tel" placeholder="请输入手机号" maxlength=11 required clearInput=true></ion-input>\n\n    </ion-item>\n\n    <ion-item class="img-input">\n\n      <ion-input type="text" placeholder="图形验证码" required clearInput=true></ion-input>\n\n    </ion-item>\n\n    <ion-item class="img-validate">\n\n        <img src="./assets/image/imgvalidate.png" alt="">\n\n    </ion-item>\n\n    <ion-item class="msg-input">\n\n      <ion-input type="text" placeholder="短信验证码" required clearInput=true></ion-input>\n\n    </ion-item>\n\n    <ion-item class="msg-validate">\n\n        <button ion-button block>获取验证码</button>\n\n    </ion-item>\n\n    <ion-item>\n\n      <ion-input type="password" placeholder="输入新密码" required clearInput=true></ion-input>\n\n    </ion-item>\n\n    <ion-item>\n\n      <ion-input type="password" placeholder="重复密码" required clearInput=true></ion-input>\n\n    </ion-item>\n\n  </ion-list>\n\n  <button class="btn-forget" ion-button block round>确认</button>\n\n</div>\n\n</ion-content>\n\n'/*ion-inline-end:"C:\Users\think\huchunGit\tpb02\tpb\src\pages\forget\forget.html"*/
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["l" /* NavController */]])
], Forget);

//# sourceMappingURL=forget.js.map

/***/ }),

/***/ 211:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return Home; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__app_app_service__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__mycode_mycode__ = __webpack_require__(113);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__creat_order_creat_order__ = __webpack_require__(214);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__gift_info_gift_info__ = __webpack_require__(218);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__order_info_order_info__ = __webpack_require__(219);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__unaudit_tabs_unaudit_tabs__ = __webpack_require__(220);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__unhandle_tabs_unhandle_tabs__ = __webpack_require__(224);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__handle_selfgift_handle_selfgift__ = __webpack_require__(62);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};










var Home = (function () {
    function Home(modalCtrl, navCtrl, appService, alertCtrl, events) {
        this.modalCtrl = modalCtrl;
        this.navCtrl = navCtrl;
        this.appService = appService;
        this.alertCtrl = alertCtrl;
        this.events = events;
        this.cancelOrderCount = 0;
        this.returnOrderCount = 0;
        this.selfGiftCount = 0;
        this.expressgiftCount = 0;
        this.getUnAuditCount();
        this.getUnHandleCount();
    }
    // 每次离开页面的时候执行
    Home.prototype.ionViewDidLeave = function () {
        this.events.unsubscribe('check: status', function () {
            console.log('did unsubscribe');
        });
    };
    //获取取消订单、退货订单数量
    Home.prototype.getUnAuditCount = function () {
        var _this = this;
        var url = __WEBPACK_IMPORTED_MODULE_2__app_app_service__["a" /* AppConfig */].API.untreatedCount;
        this.appService.httpGet(url).then(function (data) {
            _this.cancelOrderCount = data.cancelCount;
            _this.returnOrderCount = data.returnCount;
        })
            .catch(function (error) {
            _this.appService.getToken(error, function () {
                _this.getUnAuditCount();
            });
            console.log(error);
        });
    };
    //获取自提赠品、快递赠品数量
    Home.prototype.getUnHandleCount = function () {
        var _this = this;
        var url = "" + __WEBPACK_IMPORTED_MODULE_2__app_app_service__["a" /* AppConfig */].API.getUnhandleGiftCount;
        this.appService.httpGet(url).then(function (data) {
            _this.selfGiftCount = data.reserved;
            _this.expressgiftCount = data.undelivered;
        })
            .catch(function (error) {
            _this.appService.getToken(error, function () {
                _this.getUnHandleCount();
            });
            console.log(error);
        });
    };
    Home.prototype.goUnAudit = function () {
        var _this = this;
        var unAuditModal = this.modalCtrl.create(__WEBPACK_IMPORTED_MODULE_7__unaudit_tabs_unaudit_tabs__["a" /* UnauditTabs */], {
            cancelOrderCount: this.cancelOrderCount,
            returnOrderCount: this.returnOrderCount
        });
        unAuditModal.present();
        unAuditModal.onDidDismiss(function () {
            _this.getUnAuditCount();
        });
    };
    Home.prototype.goUnHandle = function () {
        var _this = this;
        var unHandleModal = this.modalCtrl.create(__WEBPACK_IMPORTED_MODULE_8__unhandle_tabs_unhandle_tabs__["a" /* UnhandleTabs */], {
            selfGiftCount: this.selfGiftCount,
            expressGiftCount: this.expressgiftCount
        });
        unHandleModal.present();
        unHandleModal.onDidDismiss(function () {
            _this.getUnHandleCount();
        });
    };
    Home.prototype.qrCodeScan = function () {
        var self = this;
        wx.scanQRCode({
            needResult: 1,
            scanType: ["qrCode", "barCode"],
            success: function (res) {
                var url = res.resultStr; // 当needResult 为 1 时，扫码返回的结果
                if (!url) {
                    return;
                }
                if (url.indexOf(__WEBPACK_IMPORTED_MODULE_2__app_app_service__["a" /* AppConfig */].mainUrl) < 0) {
                    var alert = self.alertCtrl.create({
                        title: '提示',
                        subTitle: '请扫描淘璞系统内二维码',
                        buttons: ['确定']
                    });
                    alert.present();
                }
                else {
                    if (url.indexOf('id') > 0) {
                        var myCodeModal = self.modalCtrl.create(__WEBPACK_IMPORTED_MODULE_6__order_info_order_info__["a" /* OrderInfo */], { 'url': url });
                        myCodeModal.onDidDismiss(function (data) {
                            if (!data) {
                                return;
                            }
                            if (data.type === '1') {
                                self.qrCodeScan();
                            }
                            else if (data.type === '0') {
                                self.navCtrl.parent.select(1);
                                // 注册事件-订单状态(扫码取货传订单状态)
                                // let orderStatus = 'C';
                                // self.events.publish('order:status', orderStatus);
                            }
                        });
                        myCodeModal.present();
                    }
                    else if (url.indexOf('giftCode') > 0) {
                        var myCodeModal = self.modalCtrl.create(__WEBPACK_IMPORTED_MODULE_5__gift_info_gift_info__["a" /* GiftInfo */], { 'url': url });
                        myCodeModal.onDidDismiss(function (data) {
                            if (!data) {
                                return;
                            }
                            if (data.type === '1') {
                                self.qrCodeScan();
                            }
                            else if (data.type === '0') {
                                var giftModal = self.modalCtrl.create(__WEBPACK_IMPORTED_MODULE_9__handle_selfgift_handle_selfgift__["a" /* HandleSelfgift */]);
                                giftModal.present();
                            }
                        });
                        myCodeModal.present();
                    }
                    else {
                        var alert = self.alertCtrl.create({
                            title: '提示',
                            subTitle: '请扫描订单或者赠品二维码',
                            buttons: ['确定']
                        });
                        alert.present();
                    }
                }
            },
            fail: function (error) {
                console.log(error);
                var alert = self.alertCtrl.create({
                    title: '提示',
                    subTitle: '扫描失败，请重新再试!!',
                    buttons: ['确定']
                });
                alert.present();
            }
        });
    };
    Home.prototype.goMyCode = function () {
        var myCodeModal = this.modalCtrl.create(__WEBPACK_IMPORTED_MODULE_3__mycode_mycode__["a" /* MyCode */]);
        myCodeModal.present();
    };
    Home.prototype.goCreatOrder = function () {
        var creatOrderModal = this.modalCtrl.create(__WEBPACK_IMPORTED_MODULE_4__creat_order_creat_order__["a" /* CreatOrder */]);
        creatOrderModal.present();
    };
    Home.prototype.ionViewDidEnter = function () {
        var _this = this;
        this.events.subscribe('check: status', function (data) {
            if (data == true) {
                _this.navCtrl.parent.select(1);
            }
        });
        var loading = this.appService.loading();
        loading.present();
        var signUrl = window.location.href;
        var encodeUrl = encodeURIComponent(signUrl);
        var url = __WEBPACK_IMPORTED_MODULE_2__app_app_service__["a" /* AppConfig */].API.signature + "?url=" + encodeUrl;
        this.appService.httpGet(url).then(function (data) {
            loading.dismiss();
            wx.config({
                debug: false,
                appId: data.appId,
                timestamp: data.timestamp,
                nonceStr: data.noncestr,
                signature: data.signature,
                jsApiList: ['scanQRCode']
            });
        })
            .catch(function (error) {
            _this.appService.getToken(error, function () {
                _this.ionViewDidEnter();
            });
            loading.dismiss();
            _this.appService.toast('网络阻塞，请稍后重试', 1000, 'middle');
            console.log(error);
        });
    };
    return Home;
}());
Home = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["n" /* Component */])({
        selector: 'home',template:/*ion-inline-start:"C:\Users\think\huchunGit\tpb02\tpb\src\pages\home\home.html"*/'<ion-header class="header-title-hidden">\n\n  <ion-navbar>\n\n    <ion-title text-center>首页</ion-title>\n\n  </ion-navbar>\n\n</ion-header>\n\n<ion-content>\n\n  <ion-toolbar>\n\n	  <img class="logo-img" src="./assets/image/top.png" alt="淘璞帮">\n\n		<img class="logo-text" src="./assets/image/tpb.png" alt="淘璞帮">\n\n		<!-- <img class="logo-info" src="./assets/image/info.png" alt="淘璞帮"> -->\n\n  </ion-toolbar>\n\n  <div class="menu-list">\n\n    <ion-grid>\n\n      <ion-row>\n\n        <ion-col (touchstart)="qrCodeScan()">\n\n          <img class="logo-img" src="./assets/image/scan.png" alt="扫码确认">\n\n          <span>扫一扫</span>\n\n        </ion-col>\n\n        <ion-col (touchstart)="goMyCode()">\n\n          <img class="logo-img" src="./assets/image/mycode.png" alt="我的二维码">\n\n          <span>我的二维码</span>\n\n        </ion-col>\n\n        <ion-col (touchstart)="goCreatOrder()">\n\n          <img class="logo-img" src="./assets/image/order.png" alt="生成订单">\n\n          <span>生成订单</span>\n\n        </ion-col>\n\n      </ion-row>\n\n    </ion-grid>\n\n  </div>\n\n  <div class="order-unaudit">\n\n    <ion-grid>\n\n      <ion-row>\n\n        <ion-col>\n\n          <dl>\n\n            <dt class="order-title">待审核订单<span>{{ cancelOrderCount + returnOrderCount }}</span></dt>\n\n            <dd>取消订单<span>({{ cancelOrderCount }})</span></dd>\n\n            <dd>退货订单<span>({{ returnOrderCount }})</span></dd>\n\n          </dl>\n\n        </ion-col>\n\n        <ion-col>\n\n          <button ion-button outline round color="light" (touchstart)="goUnAudit()">立即处理</button>\n\n        </ion-col>\n\n      </ion-row>\n\n    </ion-grid>\n\n  </div>\n\n  <div class="gift-unhandle">\n\n    <ion-grid>\n\n      <ion-row>\n\n        <ion-col>\n\n          <dl>\n\n            <dt class="gift-title">待处理赠品<span>{{ selfGiftCount + expressgiftCount }}</span></dt>\n\n            <dd>自提赠品<span>({{ selfGiftCount }})</span></dd>\n\n            <dd>快递赠品<span>({{ expressgiftCount }})</span></dd>\n\n          </dl>\n\n        </ion-col>\n\n        <ion-col>\n\n          <button ion-button outline round color="light" (touchstart)="goUnHandle()">立即处理</button>\n\n        </ion-col>\n\n      </ion-row>\n\n    </ion-grid>\n\n  </div>\n\n</ion-content>\n\n'/*ion-inline-end:"C:\Users\think\huchunGit\tpb02\tpb\src\pages\home\home.html"*/
    }),
    __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["j" /* ModalController */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["j" /* ModalController */]) === "function" && _a || Object, typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["l" /* NavController */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["l" /* NavController */]) === "function" && _b || Object, typeof (_c = typeof __WEBPACK_IMPORTED_MODULE_2__app_app_service__["b" /* AppService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_2__app_app_service__["b" /* AppService */]) === "function" && _c || Object, typeof (_d = typeof __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["a" /* AlertController */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["a" /* AlertController */]) === "function" && _d || Object, typeof (_e = typeof __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["d" /* Events */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["d" /* Events */]) === "function" && _e || Object])
], Home);

var _a, _b, _c, _d, _e;
//# sourceMappingURL=home.js.map

/***/ }),

/***/ 214:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return CreatOrder; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__order_layer_order_layer__ = __webpack_require__(215);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__order_store_order_store__ = __webpack_require__(216);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__app_app_service__ = __webpack_require__(4);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};





var CreatOrder = (function () {
    function CreatOrder(modalCtrl, navCtrl, alertCtrl, appService) {
        this.modalCtrl = modalCtrl;
        this.navCtrl = navCtrl;
        this.alertCtrl = alertCtrl;
        this.appService = appService;
        this.start = 0;
        this.limit = 20;
        this.showNoMore = false;
        this.searchKeyWord = ''; //搜索内容
        this.loadingShow = true;
        this.load = {};
        this.requestDefeat = false;
        this.showInfinite = false;
        this.down = true;
        this.up = false;
        this.load = __WEBPACK_IMPORTED_MODULE_4__app_app_service__["a" /* AppConfig */].load;
        this.creatOrderArray = [];
        this.getCreatOrderList();
    }
    //进入页面，请求接口，得到数据
    CreatOrder.prototype.getCreatOrderList = function () {
        var _this = this;
        this.loadingShow = true;
        var url = __WEBPACK_IMPORTED_MODULE_4__app_app_service__["a" /* AppConfig */].API.getBrandshopProducts + "?start=" + this.start + "&limit=" + this.limit;
        // 网络状况不好时，点击刷新按钮，保留搜索栏的关键字进行刷新
        if (this.searchKeyWord != '' && this.searchKeyWord != undefined) {
            url = url + ("&searchKeyWord=" + this.searchKeyWord);
        }
        this.appService.httpGet(url).then(function (data) {
            _this.loadingShow = false;
            if (data.count == 0) {
                //空空如也
                _this.noData = true;
            }
            else {
                _this.noData = false;
                _this.showInfinite = true;
                if (_this.start < data.count) {
                    if (_this.up) {
                        (_a = _this.creatOrderArray).push.apply(_a, data.data);
                        _this.start += _this.limit;
                    }
                    else if (_this.down) {
                        _this.creatOrderArray = data.data;
                        _this.start += _this.limit;
                    }
                }
                else {
                    _this.showNoMore = true;
                }
            }
            var _a;
        }).catch(function (error) {
            _this.appService.getToken(error, function () {
                _this.getCreatOrderList();
            });
            _this.showInfinite = false;
            _this.loadingShow = false;
            _this.requestDefeat = true;
            console.log(error);
        });
    };
    CreatOrder.prototype.addProductModal = function (index) {
        var orderModal = this.modalCtrl.create(__WEBPACK_IMPORTED_MODULE_2__order_layer_order_layer__["a" /* OrderLayer */], {
            productSeq: this.creatOrderArray[index].productSeq,
            productName: this.creatOrderArray[index].productName,
            warehouseCount: this.warehouseCount,
            fileSeq: this.creatOrderArray[index].fileSeq,
            brandshopSeq: this.creatOrderArray[index].brandshopSeq
        }, {
            cssClass: 'order-sku-list'
        });
        orderModal.present();
    };
    CreatOrder.prototype.orderRepertory = function () {
        this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_3__order_store_order_store__["a" /* OrderStore */]);
    };
    // 搜索
    CreatOrder.prototype.onInput = function (event) {
        var _this = this;
        this.down = true;
        this.up = false;
        this.start = 0;
        this.requestDefeat = false;
        if (this.searchKeyWord) {
            this.loadingShow = true;
            var url = __WEBPACK_IMPORTED_MODULE_4__app_app_service__["a" /* AppConfig */].API.getBrandshopProducts + "?searchKeyWord=" + this.searchKeyWord + "&start=" + this.start + "&limit=" + this.limit;
            this.appService.httpGet(url).then(function (data) {
                _this.loadingShow = false;
                if (data.count == 0) {
                    //空空如也
                    _this.noData = true;
                }
                else {
                    _this.noData = false;
                    _this.showInfinite = true;
                    if (_this.start < data.count) {
                        if (_this.up) {
                            (_a = _this.creatOrderArray).push.apply(_a, data.data);
                            _this.start += _this.limit;
                        }
                        else if (_this.down) {
                            _this.creatOrderArray = data.data;
                            _this.start += _this.limit;
                        }
                    }
                    else {
                        _this.showNoMore = true;
                    }
                }
                var _a;
            }).catch(function (error) {
                _this.appService.getToken(error, function () {
                    _this.onInput(event);
                });
                console.log(error);
                _this.creatOrderArray = [];
                _this.requestDefeat = true;
                _this.showInfinite = false;
                _this.loadingShow = false;
            });
        }
        else {
            this.start = 0;
            this.down = true;
            this.up = false;
            this.showInfinite = true;
            this.showNoMore = false;
            this.getCreatOrderList();
        }
    };
    // 下拉刷新请求数据
    CreatOrder.prototype.refreshGetCreatOrderList = function (refresher) {
        var _this = this;
        this.start = 0;
        this.down = true;
        this.up = false;
        this.requestDefeat = false;
        this.showNoMore = false;
        var url = __WEBPACK_IMPORTED_MODULE_4__app_app_service__["a" /* AppConfig */].API.getBrandshopProducts + "?start=" + this.start + "&limit=" + this.limit;
        // 下拉刷新时，判断当前搜索框的关键字是否为空 
        if (this.searchKeyWord) {
            url = url + ("&searchKeyWord=" + this.searchKeyWord);
        }
        this.appService.httpGet(url).then(function (data) {
            refresher.complete();
            if (data.count == 0) {
                //空空如也
                _this.noData = true;
            }
            else {
                _this.noData = false;
                _this.showInfinite = true;
                if (data.data.length != 0) {
                    _this.creatOrderArray = data.data;
                    _this.start += _this.limit;
                }
                else {
                    _this.showNoMore = true;
                }
            }
        }).catch(function (error) {
            _this.appService.getToken(error, function () {
                _this.refreshGetCreatOrderList(refresher);
            });
            _this.creatOrderArray = [];
            refresher.complete();
            console.log(error);
            _this.showInfinite = false;
            _this.requestDefeat = true;
        });
    };
    // 上拉刷新请求数据
    CreatOrder.prototype.infiniteGetCreatOrderList = function (infiniteScroll) {
        var _this = this;
        this.down = false;
        this.up = true;
        if (this.searchKeyWord) {
            var url = __WEBPACK_IMPORTED_MODULE_4__app_app_service__["a" /* AppConfig */].API.getBrandshopProducts + "?searchKeyWord=" + this.searchKeyWord + "&start=" + this.start + "&limit=" + this.limit;
            this.appService.httpGet(url).then(function (data) {
                infiniteScroll.complete();
                if (data.count == 0) {
                    //空空如也
                    _this.noData = true;
                }
                else {
                    if (data.data.length != 0) {
                        (_a = _this.creatOrderArray).push.apply(_a, data.data);
                        _this.start += _this.limit;
                    }
                    else {
                        _this.showNoMore = true;
                    }
                }
                var _a;
            }).catch(function (error) {
                _this.appService.getToken(error, function () {
                    _this.infiniteGetCreatOrderList(infiniteScroll);
                });
                console.log(error);
                _this.appService.toast("网络不好，请稍后重试", 1000, "middle");
            });
        }
        else {
            var url = __WEBPACK_IMPORTED_MODULE_4__app_app_service__["a" /* AppConfig */].API.getBrandshopProducts + "?start=" + this.start + "&limit=" + this.limit;
            this.appService.httpGet(url).then(function (data) {
                infiniteScroll.complete();
                if (data.count == 0) {
                    //空空如也
                    _this.noData = true;
                }
                else {
                    _this.noData = false;
                    if (data.data.length != 0) {
                        (_a = _this.creatOrderArray).push.apply(_a, data.data);
                        _this.start += _this.limit;
                    }
                    else {
                        _this.showNoMore = true;
                    }
                }
                var _a;
            }).catch(function (error) {
                _this.appService.getToken(error, function () {
                    _this.infiniteGetCreatOrderList(infiniteScroll);
                });
                infiniteScroll.complete();
                console.log(error);
                _this.appService.toast("网络不好，请稍后重试", 1000, "middle");
            });
        }
    };
    //查看配单仓订单总数
    CreatOrder.prototype.getWarehouseCount = function () {
        var _this = this;
        var url = "" + __WEBPACK_IMPORTED_MODULE_4__app_app_service__["a" /* AppConfig */].API.warehouseGetCount;
        this.appService.httpGet(url).then(function (number) {
            _this.warehouseCount = number;
            _this.showInfinite = true;
        }).catch(function (error) {
            _this.appService.getToken(error, function () {
                _this.getWarehouseCount();
            });
            console.log(error);
            _this.showInfinite = false;
            _this.requestDefeat = true;
        });
    };
    //再来一单按钮进来后，更新配单仓数量
    CreatOrder.prototype.ionViewDidEnter = function () {
        this.getWarehouseCount();
    };
    //请求失败后刷新
    CreatOrder.prototype.requestDefeatRefresh = function () {
        this.requestDefeat = false;
        this.loadingShow = true;
        this.start = 0;
        this.down = true;
        this.up = false;
        this.requestDefeat = false;
        this.getCreatOrderList();
    };
    return CreatOrder;
}());
CreatOrder = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["n" /* Component */])({
        selector: 'creat-order',template:/*ion-inline-start:"C:\Users\think\huchunGit\tpb02\tpb\src\pages\creat-order\creat-order.html"*/'<ion-header>\n\n  <ion-navbar>\n\n    <ion-title text-center>配单列表</ion-title>\n\n    <span class=\'icon-creat-order\' (touchstart)="orderRepertory()">\n\n      <img src="./assets/image/creatorder.png" alt="配单仓">\n\n      配单仓\n\n      <ion-badge item-end>{{warehouseCount > 9 ? \'9+\' : warehouseCount}}</ion-badge>\n\n    </span>\n\n  </ion-navbar>\n\n  <!-- 搜索框 -->\n\n  <div class="search-box">\n\n    <ion-item>\n\n      <ion-input [(ngModel)]="searchKeyWord" (ionBlur)="onInput($event)" type="search" clearInput=true placeholder="请输入商品名称" >\n\n    </ion-input>\n\n    </ion-item>  \n\n  </div>\n\n</ion-header>\n\n<ion-content>\n\n<ion-refresher (ionRefresh)="refreshGetCreatOrderList($event)" *ngIf="!loadingShow">\n\n  <ion-refresher-content></ion-refresher-content>\n\n</ion-refresher>\n\n<div>\n\n  <!-- loading -->\n\n  <div class="loading-wrapper" *ngIf="loadingShow">\n\n    <div>\n\n      <ion-spinner item-start [name]="load.spinner"></ion-spinner>\n\n    </div>\n\n    <div [innerHTML]="load.content"></div>\n\n  </div>\n\n</div>\n\n<div class="product-list" *ngIf = "!noData">\n\n  <ul>\n\n    <li *ngFor = "let item of creatOrderArray;let i = index">\n\n      <img [src]="item.fileSeq | productSkuDTOImage" alt="产品">\n\n      <p>{{item.productName}}</p>\n\n      <div class="btn-add"><button ion-button round (click)="addProductModal(i)">加入配单仓</button></div>\n\n    </li>\n\n  </ul>\n\n</div>\n\n<div class="no-data" *ngIf = "noData">\n\n  <img src="./assets/image/nodata.png" alt="">\n\n  <p>空空如也</p>\n\n</div>\n\n<div class="btn-noMore" *ngIf = "showNoMore">\n\n  <span>—— 没有更多商品了 ——</span>\n\n</div>\n\n<div class="request-defeat" *ngIf = "requestDefeat">\n\n  <img src="./assets/image/requestDefeat.png" alt="">\n\n  <p>啊哦！页面走丢了</p>\n\n  <button class="btn-request-defeat" ion-button full (touchstart)="requestDefeatRefresh()">\n\n    刷新再找一找\n\n  </button>\n\n</div>\n\n<ion-infinite-scroll (ionInfinite)="infiniteGetCreatOrderList($event)" *ngIf = "!showNoMore && showInfinite">\n\n  <ion-infinite-scroll-content loadingText="加载更多..."></ion-infinite-scroll-content>\n\n</ion-infinite-scroll>\n\n</ion-content>\n\n'/*ion-inline-end:"C:\Users\think\huchunGit\tpb02\tpb\src\pages\creat-order\creat-order.html"*/,
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["j" /* ModalController */],
        __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["l" /* NavController */],
        __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["a" /* AlertController */],
        __WEBPACK_IMPORTED_MODULE_4__app_app_service__["b" /* AppService */]])
], CreatOrder);

//# sourceMappingURL=creat-order.js.map

/***/ }),

/***/ 215:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return OrderLayer; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__app_app_service__ = __webpack_require__(4);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



var OrderLayer = (function () {
    function OrderLayer(navCtrl, viewCtrl, navParams, appService, loadingCtrl) {
        this.navCtrl = navCtrl;
        this.viewCtrl = viewCtrl;
        this.navParams = navParams;
        this.appService = appService;
        this.loadingCtrl = loadingCtrl;
        this.count = 1;
        this.attrMap = []; //转换后的数据（数组格式）
        this.showNoMoreGift = false;
        this.skuAttrValue = []; //sku切换时选中的值
        this.attrSeqArr = []; //选中属性的attrSeq数组
        this.attrSeqArrPJ = []; //拼接的attrSeq数组
        this.attrValueArr = []; //选中属性的attrValue数组
        this.loadingShow = true;
        this.load = {};
        this.confirmAdd = false;
        this.overStock = false;
        this.isShowAddNumber = false;
        this.productSeq = navParams.get('productSeq');
        this.productName = navParams.get('productName');
        this.warehouseCount = navParams.get('warehouseCount');
        this.fileSeq = navParams.get('fileSeq');
        this.brandshopSeq = navParams.get('brandshopSeq');
        this.load = __WEBPACK_IMPORTED_MODULE_2__app_app_service__["a" /* AppConfig */].load;
        this.getProductSkuWithDefault();
    }
    //初始化sku属性
    OrderLayer.prototype.getProductSkuWithDefault = function () {
        var _this = this;
        var url = __WEBPACK_IMPORTED_MODULE_2__app_app_service__["a" /* AppConfig */].API.getProductSkuWithDefault + "?brandshopSeq=" + this.brandshopSeq + "&productSeq=" + this.productSeq;
        this.appService.httpGet(url).then(function (data) {
            _this.isShowAddNumber = true;
            _this.skuPrice = data.price;
            _this.loadingShow = false;
            _this.confirmAdd = true;
            if (data.skuLength != 0) {
                _this.orderLayerData = data;
                _this.attrImageSeq = _this.orderLayerData.attrImageSeq;
                for (var key in _this.orderLayerData.attrMap) {
                    _this.attrMap.push(_this.orderLayerData.attrMap[key]);
                }
                for (var i = 0; i < _this.attrMap.length; i++) {
                    for (var j = 0; j < _this.attrMap[i].length; j++) {
                        if (_this.attrMap[i][j].selectedAttrValue == "selectedAttrValue") {
                            _this.skuAttrValue.push(_this.attrMap[i][j].attrValue);
                        }
                    }
                }
                for (var i = 0; i < _this.attrMap.length; i++) {
                    _this.attrSeqArr.push(_this.attrMap[i][0].attrSeq);
                }
                for (var i = 0; i < _this.attrMap.length; i++) {
                    _this.attrSeqArrPJ.push(_this.attrMap[i][0].attrSeq);
                }
                _this.attrValueArr = _this.skuAttrValue;
            }
            else {
                _this.orderLayerData = {};
            }
        }).catch(function (error) {
            _this.appService.getToken(error, function () {
                _this.getProductSkuWithDefault();
            });
            _this.loadingShow = false;
            _this.isShowAddNumber = false;
            console.log(error);
            _this.appService.toast('网络异常，请稍后再试', 1000, 'middle');
        });
    };
    OrderLayer.prototype.dismiss = function () {
        var data = { 'warehouseCount': this.warehouseCount };
        this.viewCtrl.dismiss(data);
    };
    OrderLayer.prototype.addCount = function () {
        if (this.overStock == true) {
            return;
        }
        if (this.orderLayerData.stock > this.count) {
            this.overStock = false;
            this.count++;
        }
        else {
            this.overStock = true;
            this.appService.toast('不能添加更多宝贝了哦', 1000, 'middle');
        }
    };
    OrderLayer.prototype.removeCount = function () {
        this.overStock = false;
        this.count = this.count === 1 ? 1 : (this.count - 1);
    };
    //输入数字为负数时重置为1
    OrderLayer.prototype.resetCount = function () {
        this.count = this.count <= 0 ? 1 : this.count;
        if (this.count >= this.orderLayerData.stock) {
            this.count = this.orderLayerData.stock;
            this.appService.toast('不能超出库存哦', 1000, 'middle');
        }
        else {
            this.count = this.count;
        }
    };
    // 切换sku属性时
    OrderLayer.prototype.changeRadio = function (event, index, currentValue) {
        var _this = this;
        if (this.attrValueArr[index] != currentValue) {
            this.attrValueArr[index] = currentValue;
            this.attrSeqArrPJ[index] = this.attrSeqArr[index];
        }
        else {
            this.attrValueArr[index] = "";
            this.attrSeqArrPJ[index] = "";
            event.target.setAttribute("class", "labelTag");
        }
        var attrSeqString = "";
        var attrValueString = "";
        var attrString = "";
        this.attrSeqArrPJ.map(function (item, i) {
            if (item) {
                attrSeqString += "&" + "attrSeqArr=" + item;
            }
        });
        this.attrValueArr.map(function (item, i) {
            if (item) {
                attrValueString += "&" + "attrValueArr=" + item;
            }
        });
        attrString = attrSeqString + attrValueString;
        var url = __WEBPACK_IMPORTED_MODULE_2__app_app_service__["a" /* AppConfig */].API.getValidSKUAttrValue + "?brandshopSeq=" + this.brandshopSeq + "&productSeq=" + this.orderLayerData.productSeq + "&skulength=" + this.orderLayerData.skuLength + attrString;
        this.appService.httpGet(url).then(function (data) {
            _this.skuPrice = data.price;
            _this.orderLayerData = data;
            _this.attrMap = [];
            for (var key in _this.orderLayerData.attrMap) {
                _this.attrMap.push(_this.orderLayerData.attrMap[key]);
            }
            _this.attrImageSeq = _this.orderLayerData.attrImageSeq;
        }).catch(function (error) {
            _this.appService.getToken(error, function () {
                _this.changeRadio(event, index, currentValue);
            });
            console.log(error);
            _this.appService.toast('操作失败，请稍后重试', 1000, 'middle');
        });
    };
    //确认添加
    OrderLayer.prototype.warehouseAdd = function () {
        var _this = this;
        var olabel = document.getElementsByClassName('labelTag');
        var classLength = 0;
        for (var i = 0; i < olabel.length; i++) {
            if (olabel[i].className == 'labelTag active') {
                classLength++;
            }
        }
        if (this.attrMap.length == classLength) {
            var url = __WEBPACK_IMPORTED_MODULE_2__app_app_service__["a" /* AppConfig */].API.warehouseAdd;
            var body = {
                "productId": this.orderLayerData.productSeq,
                "skuId": this.orderLayerData.skuSeq,
                "itemPrice": this.orderLayerData.price,
                "productNum": this.count,
                "remark": ""
            };
            this.appService.httpPost(url, body).then(function (data) {
                if (data.type == 'success') {
                    _this.appService.toast('添加成功！', 1000, 'middle');
                    _this.dismiss();
                }
            }).catch(function (error) {
                _this.appService.getToken(error, function () {
                    _this.warehouseAdd();
                });
                console.log(error.message);
                _this.appService.toast('操作失败，请稍后重试', 1000, 'middle');
            });
        }
        else {
            this.appService.toast('请选择商品参数信息', 1000, 'middle');
        }
    };
    return OrderLayer;
}());
OrderLayer = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["n" /* Component */])({
        selector: 'order-layer',template:/*ion-inline-start:"C:\Users\think\huchunGit\tpb02\tpb\src\pages\order-layer\order-layer.html"*/'<ion-content>\n\n	<div class="layer-out" (touchstart)="dismiss()"></div>\n\n	<div class="sku-box">\n\n		<ion-list>\n\n		  <ion-item>\n\n		    <ion-thumbnail item-start>\n\n					<img [src]="attrImageSeq | productSkuDTOImage">\n\n		    </ion-thumbnail>\n\n				<h2>{{ productName }}</h2>\n\n				<h2>￥{{ skuPrice }}</h2>\n\n		  </ion-item>\n\n		</ion-list>\n\n\n\n		<div class="sku-list">\n\n			<!-- loading -->\n\n			<div class="loading-wrapper" *ngIf="loadingShow">\n\n				<div>\n\n					<ion-spinner item-start [name]="load.spinner"></ion-spinner>\n\n				</div>\n\n				<div [innerHTML]="load.content"></div>\n\n			</div>\n\n			<div class="sku-attr" *ngFor = "let item of attrMap;let i = index">\n\n				<div class="sku-key">{{ item[0].attrName }}</div>\n\n				<div class="sku-value">\n\n					<ul>\n\n						<li class="labelTag" [ngClass]="{active: skuAttrValue[i] === skuAttr.attrValue, invalidAttrValueClass: skuAttr.invalidAttrValue | invalidAttrValueClass}" *ngFor="let skuAttr of item">\n\n							<span (click)="changeRadio($event, i, skuAttr.attrValue)">{{ skuAttr.attrValue }}</span>\n\n							<span *ngIf="skuAttr.invalidAttrValue == \'invalidAttrValue\'" class="modal">{{ skuAttr.attrValue }}</span>\n\n						</li>\n\n					</ul>\n\n				</div>\n\n			</div>\n\n			\n\n			<div class="sku-attr" *ngIf="isShowAddNumber">\n\n				<div class="sku-key">数量</div>\n\n				<div class="sku-value count">\n\n					<ion-icon class="icon-add" [ngClass]="{changeGray: overStock | overStockPipe}" name="add" (touchstart)="addCount()"></ion-icon>\n\n					<ion-icon class="icon-remove" [ngClass]="{changeGray: count | changeGray}" name="remove" (touchstart)="removeCount()"></ion-icon>\n\n					<div class="add-count">\n\n						<ion-input (ionBlur)="resetCount()" [(ngModel)]="count" type="number" clearInput=true></ion-input>\n\n					</div>\n\n				</div>\n\n			</div>\n\n		</div>\n\n	</div>\n\n	<button class="btn-add" ion-button full (touchstart)="warehouseAdd()" *ngIf="confirmAdd">确认添加</button>\n\n	\n\n</ion-content>'/*ion-inline-end:"C:\Users\think\huchunGit\tpb02\tpb\src\pages\order-layer\order-layer.html"*/
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["l" /* NavController */],
        __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["q" /* ViewController */],
        __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["m" /* NavParams */],
        __WEBPACK_IMPORTED_MODULE_2__app_app_service__["b" /* AppService */],
        __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["h" /* LoadingController */]])
], OrderLayer);

//# sourceMappingURL=order-layer.js.map

/***/ }),

/***/ 216:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return OrderStore; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__payment_code_payment_code__ = __webpack_require__(217);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__app_app_service__ = __webpack_require__(4);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




var OrderStore = (function () {
    function OrderStore(navCtrl, modalCtrl, alertCtrl, appService) {
        this.navCtrl = navCtrl;
        this.modalCtrl = modalCtrl;
        this.alertCtrl = alertCtrl;
        this.appService = appService;
        this.start = 0;
        this.limit = 50;
        this.orderStoreDataArray = []; //得到的数据里面的data数组
        this.loadingShow = true;
        this.load = {};
        this.totalPrice = 0;
        this.confirmOrder = false;
        this.requestDefeat = false;
        this.start = 0;
        this.down = true;
        this.up = false;
        this.load = __WEBPACK_IMPORTED_MODULE_3__app_app_service__["a" /* AppConfig */].load;
        this.getOrderStore();
    }
    OrderStore.prototype.getOrderStore = function () {
        var _this = this;
        var url = __WEBPACK_IMPORTED_MODULE_3__app_app_service__["a" /* AppConfig */].API.warehouseList + "?start=" + this.start + "&limit=" + this.limit;
        this.appService.httpGet(url).then(function (data) {
            _this.loadingShow = false;
            if (data.count == 0) {
                //空空如也
                _this.noData = true;
                _this.confirmOrder = false;
            }
            else {
                _this.noData = false;
                _this.confirmOrder = true;
                if (_this.up) {
                    (_a = _this.orderStoreDataArray).push.apply(_a, data.data);
                    _this.start += _this.limit;
                }
                else if (_this.down) {
                    _this.orderStoreDataArray = data.data;
                    _this.start += _this.limit;
                }
                _this.orderStoreDataArray.map(function (item) {
                    _this.totalPrice += item.itemPrice;
                });
                _this.orderStoreDataArray.map(function (item) {
                    item.productSkuDTO.attrValueList.map(function (single) {
                        if (single.fileSeq) {
                            item.productSkuDTO.fileSeq = single.fileSeq;
                            return;
                        }
                    });
                });
                _this.totalPriceFloat = parseFloat("" + _this.totalPrice.toString()).toFixed(2);
            }
            var _a;
        }).catch(function (error) {
            _this.appService.getToken(error, function () {
                _this.getOrderStore();
            });
            _this.loadingShow = false;
            _this.requestDefeat = true;
            console.log(error);
        });
    };
    //更新的函数
    OrderStore.prototype.warehouseUpdate = function (index, addOrRemove) {
        var _this = this;
        var body = [];
        var url = __WEBPACK_IMPORTED_MODULE_3__app_app_service__["a" /* AppConfig */].API.warehouseUpdate;
        var loading = this.appService.loading();
        loading.present();
        this.orderStoreDataArray.map(function (item) {
            var order = {};
            order['warehouseItemId'] = item.warehouseItemId;
            order['warehouseId'] = item.warehouseId;
            order['itemPrice'] = item.itemPrice;
            order['productNum'] = item.productNum;
            order['remark'] = item.remark;
            body.push(order);
        });
        this.appService.httpPut(url, body[index]).then(function (data) {
            if (data.type == "success") {
                loading.dismiss();
                _this.totalPrice = 0;
                _this.orderStoreDataArray.map(function (item) {
                    _this.totalPrice += item.itemPrice;
                });
                _this.totalPriceFloat = parseFloat("" + _this.totalPrice.toString()).toFixed(2);
            }
        }).catch(function (error) {
            _this.appService.getToken(error, function () {
                _this.warehouseUpdate(index, addOrRemove);
            });
            if (addOrRemove == "add") {
                _this.orderStoreDataArray[index].productNum--;
            }
            else if (addOrRemove == "remove") {
                _this.orderStoreDataArray[index].productNum++;
            }
            loading.dismiss();
            console.log(error);
            _this.appService.toast('更新失败，请稍后再试', 1000, 'middle');
        });
    };
    //加
    OrderStore.prototype.addCount = function (index) {
        if (this.orderStoreDataArray[index].productSkuDTO.stock > this.orderStoreDataArray[index].productNum) {
            this.orderStoreDataArray[index].productNum++;
            this.warehouseUpdate(index, "add");
        }
        else {
            this.appService.toast('不能添加更多宝贝了哦！', 1000, 'middle');
        }
    };
    //减
    OrderStore.prototype.removeCount = function (index) {
        if (this.orderStoreDataArray[index].productNum > 1) {
            this.orderStoreDataArray[index].productNum--;
            this.warehouseUpdate(index, "remove");
        }
    };
    //删除
    OrderStore.prototype.delete = function (index) {
        var _this = this;
        var loading = this.appService.loading();
        loading.present();
        var url = __WEBPACK_IMPORTED_MODULE_3__app_app_service__["a" /* AppConfig */].API.warehouseDeleteById + "?id=" + this.orderStoreDataArray[index].warehouseItemId;
        this.appService.httpDelete(url).then(function (data) {
            if (data.type == "success") {
                loading.dismiss();
                _this.orderStoreDataArray.splice(index, 1);
                _this.totalPrice = 0;
                _this.orderStoreDataArray.map(function (item) {
                    _this.totalPrice += item.itemPrice;
                });
                _this.totalPriceFloat = parseFloat("" + _this.totalPrice.toString()).toFixed(2);
                if (_this.orderStoreDataArray.length == 0) {
                    _this.confirmOrder = false;
                    _this.noData = true;
                }
            }
        }).catch(function (error) {
            _this.appService.getToken(error, function () {
                _this.delete(index);
            });
            loading.dismiss();
            console.log(error);
            _this.appService.toast('删除失败，请稍后再试', 1000, 'middle');
        });
    };
    //失去焦点
    OrderStore.prototype.resetCount = function (index) {
        if (this.orderStoreDataArray[index].itemPrice == null) {
            this.orderStoreDataArray[index].itemPrice = 0;
            this.appService.toast('商品总额不能为空', 1000, 'middle');
        }
        this.warehouseUpdate(index, "reset");
    };
    OrderStore.prototype.resetProductNum = function (index) {
        if (this.orderStoreDataArray[index].productNum <= 0) {
            this.orderStoreDataArray[index].productNum = 1;
            this.appService.toast('商品数量不能为空', 1000, 'middle');
        }
        if (this.orderStoreDataArray[index].productSkuDTO.stock >= this.orderStoreDataArray[index].productNum) {
            this.warehouseUpdate(index, "reset");
        }
        else {
            this.appService.toast('不能超出库存哦', 1000, 'middle');
            this.orderStoreDataArray[index].productNum = this.orderStoreDataArray[index].productSkuDTO.stock;
            this.warehouseUpdate(index, "reset");
        }
    };
    //确认订单
    OrderStore.prototype.addProductModal = function () {
        var _this = this;
        var loading = this.appService.loading();
        loading.present();
        var url = __WEBPACK_IMPORTED_MODULE_3__app_app_service__["a" /* AppConfig */].API.warehouseGenerateCode + "?warehouseId=" + this.orderStoreDataArray[0].warehouseId;
        this.appService.httpGetReturnData(url).then(function (data) {
            loading.dismiss();
            _this.returnUrl = data['_body'];
            _this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_2__payment_code_payment_code__["a" /* PaymentCode */], {
                returnUrl: _this.returnUrl,
                totalPriceFloat: _this.totalPriceFloat,
                warehouseId: _this.orderStoreDataArray[0].warehouseId
            });
        }).catch(function (error) {
            _this.appService.getToken(error, function () {
                _this.addProductModal();
            });
            loading.dismiss();
            console.log(error);
            _this.appService.toast('操作失败，请稍后再试', 1000, 'middle');
        });
    };
    // 下拉刷新请求数据
    OrderStore.prototype.refreshGetOrderStoreList = function (refresher) {
        var _this = this;
        this.start = 0;
        this.down = true;
        this.up = false;
        this.requestDefeat = false;
        this.noData = false;
        var url = __WEBPACK_IMPORTED_MODULE_3__app_app_service__["a" /* AppConfig */].API.warehouseList + "?start=" + this.start + "&limit=" + this.limit;
        this.appService.httpGet(url).then(function (data) {
            refresher.complete();
            if (data.count == 0) {
                //空空如也
                _this.noData = true;
            }
            else {
                _this.noData = false;
                _this.orderStoreDataArray = data.data;
                _this.start += _this.limit;
            }
        }).catch(function (error) {
            _this.appService.getToken(error, function () {
                _this.refreshGetOrderStoreList(refresher);
            });
            _this.orderStoreDataArray = [];
            refresher.complete();
            console.log(error);
            _this.requestDefeat = true;
        });
    };
    //请求失败后刷新
    OrderStore.prototype.requestDefeatRefresh = function () {
        this.requestDefeat = false;
        this.loadingShow = true;
        this.start = 0;
        this.down = true;
        this.up = false;
        this.getOrderStore();
    };
    return OrderStore;
}());
__decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_14" /* ViewChild */])(__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["c" /* Content */]),
    __metadata("design:type", __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["c" /* Content */])
], OrderStore.prototype, "content", void 0);
OrderStore = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["n" /* Component */])({
        selector: 'order-store',template:/*ion-inline-start:"C:\Users\think\huchunGit\tpb02\tpb\src\pages\order-store\order-store.html"*/'<ion-header>\n\n  <ion-navbar>\n\n    <ion-title text-center>配单仓</ion-title>\n\n  </ion-navbar>\n\n</ion-header>\n\n<ion-content>\n\n\n\n  <ion-refresher (ionRefresh)="refreshGetOrderStoreList($event)" *ngIf="!loadingShow">\n\n    <ion-refresher-content></ion-refresher-content>\n\n  </ion-refresher>\n\n\n\n  <ion-list>\n\n    <!-- loading -->\n\n    <div class="loading-wrapper" *ngIf="loadingShow">\n\n      <div>\n\n        <ion-spinner item-start [name]="load.spinner"></ion-spinner>\n\n      </div>\n\n      <div [innerHTML]="load.content"></div>\n\n    </div>\n\n    <ion-item-sliding #item *ngFor="let single of orderStoreDataArray;let i = index">\n\n      <ion-item>\n\n        <ion-thumbnail item-start>\n\n          <img [src]="single.productSkuDTO.fileSeq | productSkuDTOImage" alt="产品">\n\n        </ion-thumbnail>\n\n        <h2>{{single.productSkuDTO.productName}}</h2>\n\n        <div class="count">\n\n          <span class="btn-add" (touchstart)="addCount(i,$event)">+</span>\n\n          <span class="btn-remove" [ngClass]="{changeGray: single.productNum | changeGray}" (touchstart)="removeCount(i,$event)">-</span>\n\n          <div class="add-count">\n\n            <input (change)="resetProductNum(i)" [(ngModel)]="single.productNum"  type="number">\n\n          </div>\n\n        </div>\n\n        <div class="total">\n\n            <div class="total-text">商品总额</div>\n\n            <div class="total-input">\n\n              <input (change)="resetCount(i,$event)" [(ngModel)]="single.itemPrice"  type="number">\n\n            </div>\n\n        </div>\n\n        <div class="remark">\n\n          <input (change)="resetCount(i)" placeholder="备注一下商品信息吧"  type="text" [(ngModel)]="single.remark">\n\n        </div>\n\n      </ion-item>\n\n      \n\n      <ion-item-options side="right">\n\n        <button class="btn-delete" ion-button color="danger" (click)="delete(i)">\n\n          <ion-icon name="trash"></ion-icon>\n\n          删除\n\n        </button>\n\n      </ion-item-options>\n\n    </ion-item-sliding>\n\n    \n\n  </ion-list>\n\n\n\n  <div class="no-data" *ngIf = "noData">\n\n		<img src="./assets/image/nodata.png" alt="">\n\n		<p>空空如也</p>\n\n  </div>\n\n  <div class="request-defeat" *ngIf = "requestDefeat">\n\n		<img src="./assets/image/requestDefeat.png" alt="">\n\n    <p>啊哦！页面走丢了</p>\n\n    <button class="btn-request-defeat" ion-button full (touchstart)="requestDefeatRefresh()">\n\n      刷新再找一找\n\n    </button>\n\n	</div>\n\n  <button class="btn-confirm" ion-button full (touchstart)="addProductModal()" *ngIf = "confirmOrder">\n\n    <span class="confirm">确认订单</span>\n\n    <span>（总额：￥{{totalPriceFloat}}）</span>\n\n  </button>\n\n\n\n</ion-content>\n\n\n\n\n\n        \n\n'/*ion-inline-end:"C:\Users\think\huchunGit\tpb02\tpb\src\pages\order-store\order-store.html"*/
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["l" /* NavController */],
        __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["j" /* ModalController */],
        __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["a" /* AlertController */],
        __WEBPACK_IMPORTED_MODULE_3__app_app_service__["b" /* AppService */]])
], OrderStore);

//# sourceMappingURL=order-store.js.map

/***/ }),

/***/ 217:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return PaymentCode; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__app_app_service__ = __webpack_require__(4);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



var PaymentCode = (function () {
    function PaymentCode(navCtrl, app, navParams, appService, events) {
        this.navCtrl = navCtrl;
        this.app = app;
        this.navParams = navParams;
        this.appService = appService;
        this.events = events;
        this.myCode = "";
        this.isStatus = false;
        this.isOrderAgain = false;
        this.myCode = this.navParams.get('returnUrl');
        this.totalPriceFloat = this.navParams.get('totalPriceFloat');
        this.warehouseId = this.navParams.get('warehouseId');
        this.Interval();
    }
    // 修改此单
    PaymentCode.prototype.updateOrder = function () {
        this.navCtrl.pop();
    };
    // 再来一单
    PaymentCode.prototype.orderAgain = function () {
        var _this = this;
        this.isOrderAgain = true;
        var loading = this.appService.loading();
        loading.present();
        var url = "" + __WEBPACK_IMPORTED_MODULE_2__app_app_service__["a" /* AppConfig */].API.warehouseEmpty;
        this.appService.httpPut(url, null).then(function (data) {
            if (data.type == "success") {
                loading.dismiss();
                _this.navCtrl.remove(_this.navCtrl.length() - 2, 2);
            }
        }).catch(function (error) {
            _this.appService.getToken(error, function () {
                _this.orderAgain();
            });
            loading.dismiss();
            console.log(error);
            _this.appService.toast('操作失败', 1000, 'middle');
        });
    };
    //关闭(完成)移除所有的view,直接显示home
    PaymentCode.prototype.goTabs = function () {
        this.navCtrl.remove(0, this.navCtrl.length());
    };
    //定时检测配单仓状态
    PaymentCode.prototype.Interval = function () {
        var self = this;
        var url = __WEBPACK_IMPORTED_MODULE_2__app_app_service__["a" /* AppConfig */].API.checkStatus + "?warehouseId=" + this.warehouseId;
        this.timer = window.setInterval(function () {
            self.appService.httpGet(url).then(function (data) {
                if (data.status == 0 && !self.isOrderAgain) {
                    self.isStatus = true;
                    window.clearInterval(self.timer);
                    self.navCtrl.remove(0, self.navCtrl.length());
                    self.events.publish('check: status', self.isStatus);
                }
                else {
                    self.isStatus = false;
                }
            }).catch(function (error) {
                console.log(error);
            });
        }, 1000);
    };
    PaymentCode.prototype.ionViewDidLeave = function () {
        window.clearInterval(this.timer);
    };
    return PaymentCode;
}());
PaymentCode = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["n" /* Component */])({
        selector: 'payment-code',template:/*ion-inline-start:"C:\Users\think\huchunGit\tpb02\tpb\src\pages\payment-code\payment-code.html"*/'<ion-header>\n\n  <ion-navbar hideBackButton>\n\n    <ion-title text-center>收款码</ion-title>\n\n    <div class="btn-close" (touchstart)="goTabs()">关闭</div>\n\n  </ion-navbar>\n\n</ion-header>\n\n<ion-content>\n\n	<div class="qrcode-box">\n\n		<div class=\'qrcode\'>\n\n			<qr-code [value]="myCode" [size]="200"></qr-code>\n\n			<span>扫码完成支付</span>\n\n			<div class="total">￥{{ totalPriceFloat }}</div>\n\n		</div>\n\n	</div>\n\n	<div class="btn-list">\n\n		<button class="btn-update" ion-button outline (touchstart)="updateOrder()">修改此单</button>\n\n		<button class="order-again" ion-button (touchstart)="orderAgain()">再来一单</button>\n\n	</div>\n\n</ion-content>'/*ion-inline-end:"C:\Users\think\huchunGit\tpb02\tpb\src\pages\payment-code\payment-code.html"*/
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["l" /* NavController */],
        __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["b" /* App */],
        __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["m" /* NavParams */],
        __WEBPACK_IMPORTED_MODULE_2__app_app_service__["b" /* AppService */],
        __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["d" /* Events */]])
], PaymentCode);

//# sourceMappingURL=payment-code.js.map

/***/ }),

/***/ 218:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return GiftInfo; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__app_app_service__ = __webpack_require__(4);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



var GiftInfo = (function () {
    function GiftInfo(navCtrl, alertCtrl, viewCtrl, navParams, appService) {
        this.navCtrl = navCtrl;
        this.alertCtrl = alertCtrl;
        this.viewCtrl = viewCtrl;
        this.navParams = navParams;
        this.appService = appService;
        this.isAllow = true;
        this.giftInfo = {
            "memberGiftAccountSeq": null,
            "giftSeq": null,
            "giftCode": "",
            "giftName": "",
            "giftType": "",
            "imageName": "",
            "giftRemark": "",
            "brandshopSeq": null,
            "brandshopName": "",
            "startDate": null,
            "endDate": null,
            "status": "",
            "receiveDate": null,
            "useDate": null,
            "memberSeq": null,
            "memberPhone": null,
            "reservePhone": "",
            "reserveShopTime": null,
            "expressCompany": null,
            "expressNo": null,
            "deliveryTime": null,
            "brandshopUserSeq": null,
            "brandshopUserName": null,
            "attrValueList": null
        };
        this.requestDefeat = false;
        this.getGiftDetail();
    }
    GiftInfo.prototype.getGiftDetail = function () {
        var _this = this;
        var url = this.navParams.get("url"); //提现总计，从当前账户传入过来;
        this.appService.httpGet(url)
            .then(function (data) {
            console.log(data);
            _this.giftInfo = data;
        }).catch(function (error) {
            _this.appService.getToken(error, function () {
                _this.getGiftDetail();
            });
            console.log(error);
            if (error.type) {
                var alert_1 = _this.alertCtrl.create({
                    message: error.message,
                    enableBackdropDismiss: false,
                    buttons: [
                        {
                            text: '确定',
                            handler: function () {
                                _this.viewCtrl.dismiss();
                            }
                        }
                    ]
                });
                alert_1.present();
            }
        });
    };
    GiftInfo.prototype.presentConfirm = function () {
        var _this = this;
        if (!this.isAllow) {
            return;
        }
        this.isAllow = false;
        var url = "" + __WEBPACK_IMPORTED_MODULE_2__app_app_service__["a" /* AppConfig */].API.receiveGift;
        var body = {
            giftCode: this.giftInfo.giftCode
        };
        this.appService.httpPost(url, body)
            .then(function (data) {
            _this.isAllow = true;
            _this.alertLayer();
        })
            .catch(function (error) {
            _this.appService.getToken(error, function () {
                _this.presentConfirm();
            });
            _this.isAllow = true;
            console.log(error);
        });
    };
    GiftInfo.prototype.alertLayer = function () {
        var _this = this;
        var alert = this.alertCtrl.create({
            message: '确认兑换完成',
            enableBackdropDismiss: false,
            buttons: [
                {
                    text: '查看赠品',
                    handler: function () {
                        var data = { 'type': '0' };
                        //点击查看赠品后的执行代码
                        _this.viewCtrl.dismiss(data);
                    }
                },
                {
                    text: '继续扫码',
                    handler: function () {
                        var data = { 'type': '1' };
                        _this.viewCtrl.dismiss(data);
                    }
                }
            ]
        });
        alert.present();
    };
    return GiftInfo;
}());
GiftInfo = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["n" /* Component */])({
        selector: 'gift-info',template:/*ion-inline-start:"C:\Users\think\huchunGit\tpb02\tpb\src\pages\gift-info\gift-info.html"*/'<ion-header>\n\n    <ion-navbar>\n\n      <ion-title text-center>赠品信息</ion-title>\n\n    </ion-navbar>\n\n  </ion-header>\n\n  <ion-content>\n\n    <div class="order-title">\n\n      <img class="my-picture" src="./assets/image/store.png" alt="店铺">\n\n      <h2>{{ giftInfo.brandshopName }}</h2>\n\n    </div>\n\n    <div class="order-list">\n\n  \n\n      <div class="order-item">\n\n        <dl>\n\n          <dt>\n\n            <img class="my-picture" [src]="giftInfo.imageName | handleGiftImage" alt="小裙子">\n\n          </dt>\n\n          <dd class="product-title">{{ giftInfo.giftName }}</dd>\n\n          <dd class="sku-list">\n\n            <span>领取时间：{{ giftInfo.receiveDate | date:\'yyyy.MM.dd HH:mm\' }}</span>\n\n          </dd>\n\n        </dl>\n\n      </div>\n\n  \n\n    </div>\n\n    <button class="btn-confirm" ion-button (click)="presentConfirm()">确认兑换</button>\n\n    <div class="request-defeat" *ngIf = "requestDefeat">\n\n      <img src="./assets/image/requestDefeat.png" alt="">\n\n      <p>啊哦！页面走丢了</p>\n\n      <button class="btn-request-defeat" ion-button full (touchstart)="getGiftDetail()">\n\n        刷新再找一找\n\n      </button>\n\n    </div>\n\n  </ion-content>\n\n  '/*ion-inline-end:"C:\Users\think\huchunGit\tpb02\tpb\src\pages\gift-info\gift-info.html"*/
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["l" /* NavController */],
        __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["a" /* AlertController */],
        __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["q" /* ViewController */],
        __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["m" /* NavParams */],
        __WEBPACK_IMPORTED_MODULE_2__app_app_service__["b" /* AppService */]])
], GiftInfo);

//# sourceMappingURL=gift-info.js.map

/***/ }),

/***/ 219:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return OrderInfo; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__app_app_service__ = __webpack_require__(4);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



var OrderInfo = (function () {
    function OrderInfo(navCtrl, alertCtrl, viewCtrl, navParams, appService) {
        this.navCtrl = navCtrl;
        this.alertCtrl = alertCtrl;
        this.viewCtrl = viewCtrl;
        this.navParams = navParams;
        this.appService = appService;
        this.isAllow = true;
        this.orderDetail = {
            "orderSeq": null,
            "orderId": "",
            "brandshopName": "",
            "orderItemProductSkuDTOS": [
                {
                    "orderItemSeq": null,
                    "prodSeq": null,
                    "skuSeq": null,
                    "unitPrice": 0,
                    "number": 0,
                    "productSkuDTO": {
                        "productSeq": null,
                        "skuSeq": null,
                        "productName": "",
                        "fileSeq": null,
                        "attrValueList": [
                            {
                                "skuSeq": null,
                                "attrSeq": null,
                                "attrName": "",
                                "attrValue": "",
                                "type": null,
                                "fileSeq": null,
                                "price": null,
                                "selectedAttrValue": null,
                                "invalidAttrValue": null
                            }
                        ],
                        "fallback": null
                    }
                }
            ]
        };
        this.requestDefeat = false;
        this.getOrderDetail();
    }
    OrderInfo.prototype.getOrderDetail = function () {
        var _this = this;
        var url = this.navParams.get("url"); //提现总计，从当前账户传入过来;
        this.appService.httpGet(url)
            .then(function (data) {
            console.log(data);
            _this.orderDetail.orderSeq = data.orderSeq;
            alert(_this.orderDetail.orderSeq);
            _this.orderDetail = data;
            alert(_this.orderDetail);
        }).catch(function (error) {
            console.log(error);
            _this.appService.getToken(error, function () {
                _this.getOrderDetail();
            });
            if (error.type) {
                var alert = _this.alertCtrl.create({
                    message: error.message,
                    enableBackdropDismiss: false,
                    buttons: [
                        {
                            text: '确定',
                            handler: function () {
                                _this.viewCtrl.dismiss();
                            }
                        }
                    ]
                });
                alert.present();
            }
        });
    };
    OrderInfo.prototype.presentConfirm = function () {
        var _this = this;
        if (!this.isAllow) {
            return;
        }
        this.isAllow = false;
        var url = "" + __WEBPACK_IMPORTED_MODULE_2__app_app_service__["a" /* AppConfig */].API.orderReceive;
        this.appService.httpPost(url, this.orderDetail.orderSeq)
            .then(function (data) {
            _this.isAllow = true;
            _this.alertLayer();
        })
            .catch(function (error) {
            _this.appService.getToken(error, function () {
                _this.presentConfirm();
            });
            _this.isAllow = true;
            console.log(error);
        });
    };
    OrderInfo.prototype.alertLayer = function () {
        var _this = this;
        var alert = this.alertCtrl.create({
            message: '确认提货完成',
            enableBackdropDismiss: false,
            buttons: [
                {
                    text: '查看订单',
                    handler: function () {
                        var data = { 'type': '0' };
                        _this.viewCtrl.dismiss(data);
                    }
                },
                {
                    text: '继续扫码',
                    handler: function () {
                        var data = { 'type': '1' };
                        _this.viewCtrl.dismiss(data);
                    }
                }
            ]
        });
        alert.present();
    };
    return OrderInfo;
}());
OrderInfo = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["n" /* Component */])({
        selector: 'order-info',template:/*ion-inline-start:"C:\Users\think\huchunGit\tpb02\tpb\src\pages\order-info\order-info.html"*/'<ion-header>\n\n  <ion-navbar>\n\n    <ion-title text-center>订单信息</ion-title>\n\n  </ion-navbar>\n\n</ion-header>\n\n<ion-content>\n\n  <div *ngIf="orderDetail.orderSeq">\n\n    <div class="order-title">\n\n      <img class="my-picture" src="./assets/image/store.png" alt="店铺">\n\n      <h2>{{ orderDetail.brandshopName }}</h2>\n\n      <span>{{ orderDetail.orderId }}</span>\n\n    </div>\n\n    <div class="order-list">\n\n\n\n      <div class="order-item" *ngFor="let product of orderDetail.orderItemProductSkuDTOS">\n\n        <dl>\n\n          <dt>\n\n            <img class="my-picture" [src]="product.productSkuDTO.fileSeq | productSkuDTOImage" alt="小裙子">\n\n          </dt>\n\n          <dd class="product-title">{{ product.productSkuDTO.productName }}</dd>\n\n          <dd class="sku-list">\n\n            <span *ngFor="let sku of product.productSkuDTO.attrValueList">{{ sku.attrValue }}</span>\n\n          </dd>\n\n          <dd class=\'price\'>{{ product.unitPrice }}</dd>\n\n          <dd class="count">X {{ product.number }}</dd>\n\n        </dl>\n\n      </div>\n\n    </div>\n\n    <button class="btn-confirm" ion-button (click)="presentConfirm()">确认提货</button>\n\n  </div>\n\n  <div class="request-defeat" *ngIf = "requestDefeat">\n\n    <img src="./assets/image/requestDefeat.png" alt="">\n\n    <p>啊哦！页面走丢了</p>\n\n    <button class="btn-request-defeat" ion-button full (touchstart)="getOrderDetail()">\n\n      刷新再找一找\n\n    </button>\n\n  </div>\n\n</ion-content>\n\n'/*ion-inline-end:"C:\Users\think\huchunGit\tpb02\tpb\src\pages\order-info\order-info.html"*/
    }),
    __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["l" /* NavController */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["l" /* NavController */]) === "function" && _a || Object, typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["a" /* AlertController */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["a" /* AlertController */]) === "function" && _b || Object, typeof (_c = typeof __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["q" /* ViewController */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["q" /* ViewController */]) === "function" && _c || Object, typeof (_d = typeof __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["m" /* NavParams */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["m" /* NavParams */]) === "function" && _d || Object, typeof (_e = typeof __WEBPACK_IMPORTED_MODULE_2__app_app_service__["b" /* AppService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_2__app_app_service__["b" /* AppService */]) === "function" && _e || Object])
], OrderInfo);

var _a, _b, _c, _d, _e;
//# sourceMappingURL=order-info.js.map

/***/ }),

/***/ 220:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return UnauditTabs; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__unaudit_cancelorder_unaudit_cancelorder__ = __webpack_require__(221);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__unaudit_returnorder_unaudit_returnorder__ = __webpack_require__(222);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__app_app_service__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__audit_cancelorder_audit_cancelorder__ = __webpack_require__(116);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__audit_returnorder_audit_returnorder__ = __webpack_require__(117);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__return_detail_return_detail__ = __webpack_require__(118);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};








var UnauditTabs = (function () {
    function UnauditTabs(navCtrl, alertCtrl, navParams, appService, modalCtrl) {
        this.navCtrl = navCtrl;
        this.alertCtrl = alertCtrl;
        this.navParams = navParams;
        this.appService = appService;
        this.modalCtrl = modalCtrl;
        this.orderCancel = __WEBPACK_IMPORTED_MODULE_2__unaudit_cancelorder_unaudit_cancelorder__["a" /* UnauditCancelorder */];
        this.orderReturn = __WEBPACK_IMPORTED_MODULE_3__unaudit_returnorder_unaudit_returnorder__["a" /* UnauditReturnorder */];
        this.unauditCancelorderArray = [];
        this.unauditReturnorderArray = [];
        this.limit = 10;
        this.noData = false;
        this.start = 0;
        this.showNoMore = false;
        this.load = {};
        this.loadingShow = true;
        this.currentIndex = 0;
        this.requestDefeat = false;
        this.showInfinite = false;
        this.start = 0;
        this.down = true;
        this.up = false;
        this.load = __WEBPACK_IMPORTED_MODULE_4__app_app_service__["a" /* AppConfig */].load;
        // 获取待审核取消订单
        this.currentStatus = '待审核取消订单';
        this.cancelOrderCount = navParams.get('cancelOrderCount'); //待审核取消订单数量
        this.returnOrderCount = navParams.get('returnOrderCount'); //待审核退货订单数量
        this.statusList = [{
                label: '待审核取消订单',
                num: this.cancelOrderCount
            }, {
                label: '待处理退货订单',
                num: this.returnOrderCount
            }];
        this.getUnauditCancelorder();
    }
    // 获取待审核取消订单列表
    UnauditTabs.prototype.getUnauditCancelorder = function () {
        var _this = this;
        this.loadingShow = true;
        this.showNoMore = false;
        this.noData = false;
        this.requestDefeat = false;
        var url = __WEBPACK_IMPORTED_MODULE_4__app_app_service__["a" /* AppConfig */].API.getCancelorder + "?deliveryType=1&status=0&start=" + this.start + "&limit=" + this.limit;
        this.appService.httpGet(url).then(function (data) {
            _this.loadingShow = false;
            _this.statusList[0].num = data.count;
            if (_this.start < data.count) {
                _this.showNoMore = false;
                _this.noData = false;
                _this.start += _this.limit;
                _this.showInfinite = true;
                if (_this.up) {
                    (_a = _this.unauditCancelorderArray).push.apply(_a, data.data);
                }
                else if (_this.down) {
                    _this.unauditCancelorderArray = data.data;
                }
            }
            else if (data.count == 0) {
                _this.noData = true;
                _this.showNoMore = false;
                _this.unauditCancelorderArray = [];
            }
            else if (data.data.length == 0) {
                _this.noData = false;
                _this.showNoMore = true;
            }
            var _a;
        }).catch(function (error) {
            _this.appService.getToken(error, function () {
                _this.getUnauditCancelorder();
            });
            _this.unauditCancelorderArray = [];
            _this.loadingShow = false;
            console.log(error);
            _this.showInfinite = false;
            _this.requestDefeat = true;
        });
    };
    //审核点击事件
    UnauditTabs.prototype.auditOrder = function (index) {
        var _this = this;
        var alert = this.alertCtrl.create({
            message: "\u540C\u610F\u4F1A\u5458" + this.unauditCancelorderArray[index].memberMobile + "\u7684\u8BA2\u5355" + this.unauditCancelorderArray[index].orderId + "\u53D6\u6D88\u7533\u8BF7\uFF1F",
            buttons: [
                {
                    text: '拒绝',
                    handler: function () {
                        _this.start = 0;
                        _this.down = true;
                        _this.up = false;
                        // 点击拒绝后的执行代码
                        var loading = _this.appService.loading();
                        loading.present();
                        var url = __WEBPACK_IMPORTED_MODULE_4__app_app_service__["a" /* AppConfig */].API.auditCancelOrder + "?id=" + _this.unauditCancelorderArray[index].orderSeq + "&isAgree=0";
                        _this.appService.httpPost(url, null).then(function (data) {
                            if (data.type == 'success') {
                                loading.dismiss();
                                _this.getUnauditCancelorder();
                            }
                        }).catch(function (error) {
                            loading.dismiss();
                            console.log(error);
                            _this.appService.toast('操作失败，请稍后重试', 1000, 'middle');
                        });
                    }
                },
                {
                    text: '通过',
                    handler: function () {
                        _this.start = 0;
                        _this.down = true;
                        _this.up = false;
                        // 点击同意后的执行代码
                        var loading = _this.appService.loading();
                        loading.present();
                        var url = __WEBPACK_IMPORTED_MODULE_4__app_app_service__["a" /* AppConfig */].API.auditCancelOrder + "?id=" + _this.unauditCancelorderArray[index].orderSeq + "&isAgree=1";
                        _this.appService.httpPost(url, null).then(function (data) {
                            if (data.type == 'success') {
                                loading.dismiss();
                                _this.getUnauditCancelorder();
                            }
                        }).catch(function (error) {
                            loading.dismiss();
                            console.log(error);
                            _this.appService.toast('操作失败', 1000, 'middle');
                        });
                    }
                }
            ]
        });
        alert.present();
    };
    UnauditTabs.prototype.goAuditCancel = function () {
        var orderModal = this.modalCtrl.create(__WEBPACK_IMPORTED_MODULE_5__audit_cancelorder_audit_cancelorder__["a" /* AuditCancelorder */]);
        orderModal.present();
    };
    // 获取待审核退货订单列表
    UnauditTabs.prototype.getUnauditReturnorderList = function () {
        var _this = this;
        this.loadingShow = true;
        this.showNoMore = false;
        this.noData = false;
        this.requestDefeat = false;
        var url = __WEBPACK_IMPORTED_MODULE_4__app_app_service__["a" /* AppConfig */].API.getReturnorderList + "?deliveryType=1&status=0&start=" + this.start + "&limit=" + this.limit;
        this.appService.httpGet(url).then(function (data) {
            _this.loadingShow = false;
            _this.statusList[1].num = data.count;
            if (_this.start < data.count) {
                _this.showNoMore = false;
                _this.noData = false;
                _this.start += _this.limit;
                _this.showInfinite = true;
                if (_this.up) {
                    (_a = _this.unauditReturnorderArray).push.apply(_a, data.data);
                }
                else if (_this.down) {
                    _this.unauditReturnorderArray = data.data;
                }
            }
            else if (data.count == 0) {
                _this.noData = true;
                _this.showNoMore = false;
                _this.unauditReturnorderArray = [];
            }
            else if (data.data.length == 0) {
                _this.noData = false;
                _this.showNoMore = true;
            }
            var _a;
        }).catch(function (error) {
            _this.appService.getToken(error, function () {
                _this.getUnauditReturnorderList();
            });
            _this.unauditReturnorderArray = [];
            _this.loadingShow = false;
            console.log(error);
            _this.showInfinite = false;
            _this.requestDefeat = true;
        });
    };
    // 处理订单操作
    UnauditTabs.prototype.confirmReturn = function (index) {
        var _this = this;
        var alert = this.alertCtrl.create({
            message: "\u786E\u8BA4\u5DF2\u6536\u5230\u4F1A\u5458" + this.unauditReturnorderArray[index].mobile + "\u7684\u8BA2\u5355" + this.unauditReturnorderArray[index].orderId + "\u7684" + this.unauditReturnorderArray[index].number + "\u4EF6\u9000\u8D27\u5546\u54C1\uFF1F",
            buttons: [
                {
                    text: '取消',
                    handler: function () {
                        //点击取消后的执行代码
                    }
                },
                {
                    text: '确认',
                    handler: function () {
                        // 点击确认后的执行代码
                        var loading = _this.appService.loading();
                        loading.present();
                        var url = __WEBPACK_IMPORTED_MODULE_4__app_app_service__["a" /* AppConfig */].API.returnReceived + "?id=" + _this.unauditReturnorderArray[index].orderReturnSeq;
                        _this.appService.httpPost(url, null).then(function (data) {
                            loading.dismiss();
                            if (data.type == 'success') {
                                _this.start = 0;
                                _this.up = false;
                                _this.down = true;
                                _this.getUnauditReturnorderList();
                            }
                        }).catch(function (error) {
                            loading.dismiss();
                            console.log(error);
                            _this.appService.toast('操作失败，请稍后再试', 1000, 'middle');
                        });
                    }
                }
            ]
        });
        alert.present();
    };
    UnauditTabs.prototype.auditReturn = function (index) {
        var _this = this;
        var orderModal = this.modalCtrl.create(__WEBPACK_IMPORTED_MODULE_7__return_detail_return_detail__["a" /* ReturnDetail */], { productId: this.unauditReturnorderArray[index].orderReturnSeq });
        orderModal.onDidDismiss(function () {
            _this.start = 0;
            _this.down = true;
            _this.up = false;
            _this.getUnauditReturnorderList();
        });
        orderModal.present();
    };
    UnauditTabs.prototype.goAuditReturn = function () {
        var orderModal = this.modalCtrl.create(__WEBPACK_IMPORTED_MODULE_6__audit_returnorder_audit_returnorder__["a" /* AuditReturnorder */]);
        orderModal.present();
    };
    // 下拉刷新请求数据
    UnauditTabs.prototype.doRefresh = function (refresher) {
        var _this = this;
        this.start = 0;
        this.down = true;
        this.up = false;
        this.requestDefeat = false;
        setTimeout(function () {
            if (_this.currentIndex == 0) {
                _this.getUnauditCancelorder();
            }
            else {
                _this.getUnauditReturnorderList();
            }
            refresher.complete();
        }, __WEBPACK_IMPORTED_MODULE_4__app_app_service__["a" /* AppConfig */].LOAD_TIME);
        this.showNoMore = false;
    };
    // 上拉刷新请求数据
    UnauditTabs.prototype.loadMore = function (infiniteScroll) {
        var _this = this;
        if (this.currentIndex == 0) {
            var url = __WEBPACK_IMPORTED_MODULE_4__app_app_service__["a" /* AppConfig */].API.getCancelorder + "?deliveryType=1&status=0&start=" + this.start + "&limit=" + this.limit;
            this.appService.httpGet(url).then(function (data) {
                infiniteScroll.complete();
                if (data.count == 0) {
                    //空空如也
                    _this.noData = true;
                }
                else {
                    _this.noData = false;
                    _this.showInfinite = true;
                    if (data.data.length != 0) {
                        (_a = _this.unauditCancelorderArray).push.apply(_a, data.data);
                        _this.start += _this.limit;
                    }
                    else {
                        _this.showNoMore = true;
                    }
                }
                var _a;
            }).catch(function (error) {
                _this.appService.getToken(error, function () {
                    _this.loadMore(infiniteScroll);
                });
                infiniteScroll.complete();
                console.log(error);
                _this.appService.toast('网络异常，请稍后再试', 1000, 'middle');
            });
        }
        else {
            var url = __WEBPACK_IMPORTED_MODULE_4__app_app_service__["a" /* AppConfig */].API.getReturnorderList + "?deliveryType=1&status=0&start=" + this.start + "&limit=" + this.limit;
            this.appService.httpGet(url).then(function (data) {
                infiniteScroll.complete();
                if (data.count == 0) {
                    //空空如也
                    _this.noData = true;
                }
                else {
                    _this.noData = false;
                    _this.showInfinite = true;
                    if (data.data.length != 0) {
                        (_a = _this.unauditReturnorderArray).push.apply(_a, data.data);
                        _this.start += _this.limit;
                    }
                    else {
                        _this.showNoMore = true;
                    }
                }
                var _a;
            }).catch(function (error) {
                _this.appService.getToken(error, function () {
                    _this.loadMore(infiniteScroll);
                });
                infiniteScroll.complete();
                console.log(error);
                _this.appService.toast('网络异常，请稍后再试', 1000, 'middle');
            });
        }
    };
    // 切换tab标签
    UnauditTabs.prototype.getCurrentStatus = function (index) {
        this.start = 0;
        this.up = false;
        this.down = true;
        this.content.scrollTo(0, 0, 0);
        this.currentStatus = this.statusList[index].label;
        this.currentIndex = index;
        this.requestDefeat = false;
        if (this.currentIndex == 0) {
            this.getUnauditCancelorder();
        }
        else {
            this.getUnauditReturnorderList();
        }
    };
    //请求失败后刷新
    UnauditTabs.prototype.requestDefeatRefreshReturnorder = function () {
        this.requestDefeat = false;
        this.loadingShow = true;
        this.start = 0;
        this.down = true;
        this.up = false;
        this.getUnauditReturnorderList();
    };
    UnauditTabs.prototype.requestDefeatRefreshCancelorder = function () {
        this.requestDefeat = false;
        this.loadingShow = true;
        this.start = 0;
        this.down = true;
        this.up = false;
        this.getUnauditCancelorder();
    };
    return UnauditTabs;
}());
__decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_14" /* ViewChild */])(__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["c" /* Content */]),
    __metadata("design:type", __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["c" /* Content */])
], UnauditTabs.prototype, "content", void 0);
UnauditTabs = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["n" /* Component */])({
        selector: 'unaudit-tabs',template:/*ion-inline-start:"C:\Users\think\huchunGit\tpb02\tpb\src\pages\unaudit-tabs\unaudit-tabs.html"*/'<ion-header>\n\n    <ion-navbar>\n\n      <ion-title text-center>待审核订单</ion-title>\n\n    </ion-navbar>\n\n    <ion-toolbar class="statusBox">\n\n      <ul>\n\n        <li *ngFor="let status of statusList, let i = index" [ngClass]="{active:currentStatus == status.label}" (click)="getCurrentStatus(i)">{{ status.label }}（{{status.num}}）</li>\n\n      </ul>\n\n    </ion-toolbar>\n\n  </ion-header>\n\n  <ion-content>\n\n    <!-- 下拉刷新 -->\n\n    <ion-refresher (ionRefresh)="doRefresh($event)" *ngIf="!loadingShow">\n\n      <ion-refresher-content></ion-refresher-content>\n\n    </ion-refresher>\n\n  \n\n    <!-- 待审核取消订单列表 -->\n\n    <div class="order-cancelList" *ngIf="currentIndex == 0">\n\n      <!-- loading -->\n\n      <div class="loading-wrapper" *ngIf="loadingShow">\n\n        <div>\n\n          <ion-spinner item-start [name]="load.spinner"></ion-spinner>\n\n        </div>\n\n        <div [innerHTML]="load.content"></div>\n\n      </div>\n\n      <div class="order-items" *ngFor="let item of unauditCancelorderArray;let i = index">\n\n        <div class="order-title">\n\n          <h2>订单编号：\n\n            <span>{{item.orderId}}</span>\n\n          </h2>\n\n          <span [ngClass]="{auditStatus: true, pass:(item.status | setCancelOrderStatus).pass , auditing:(item.status | setCancelOrderStatus).audit} ">{{(item.status | setCancelOrderStatus).status}}</span>\n\n        </div>\n\n  \n\n        <div class="order-item" *ngFor="let single of item.itemList">\n\n          <dl>\n\n            <dt>\n\n              <img class="my-picture" [src]="single.productSkuDTO.fileSeq | productSkuDTOImage" [alt]="single.productSkuDTO.productName">\n\n            </dt>\n\n            <dd class="product-title">{{ single.productSkuDTO.productName }}</dd>\n\n            <dd class="sku-list">\n\n              <span *ngFor="let sku of single.productSkuDTO.attrValueList">{{ sku.attrValue }} </span>\n\n            </dd>\n\n            <dd class=\'price\'>￥{{ single.unitPrice }}</dd>\n\n            <dd class="count">X{{ single.number }}</dd>\n\n          </dl>\n\n        </div>\n\n  \n\n        <div class="orderOperate">\n\n          <dl>\n\n            <dt>\n\n              <button class="btn-audit" ion-button (click)="auditOrder(i)">审核</button>\n\n            </dt>\n\n            <dd class="total">{{item.totalNumber}}件商品，实付￥{{item.payAmount}}</dd>\n\n            <dd class="member-phone">会员手机：{{item.memberMobile}}</dd>\n\n          </dl>\n\n        </div>\n\n      </div>\n\n      <ion-infinite-scroll (ionInfinite)="loadMore($event)" *ngIf="!showNoMore && showInfinite">\n\n        <ion-infinite-scroll-content loadingText="加载更多..."></ion-infinite-scroll-content>\n\n      </ion-infinite-scroll>\n\n      <div class="no-data" *ngIf="noData">\n\n        <img src="./assets/image/nodata.png" alt="">\n\n        <p>空空如也</p>\n\n      </div>\n\n      <div class="btn-cancelView" (touchstart)="goAuditCancel()">\n\n        <span>查看审核完成订单</span>\n\n      </div>\n\n      <div class="btn-noMore" *ngIf="showNoMore">\n\n        <span>—— 没有更多信息了 ——</span>\n\n      </div>\n\n      <div class="request-defeat" *ngIf="requestDefeat">\n\n        <img src="./assets/image/requestDefeat.png" alt="">\n\n        <p>啊哦！页面走丢了</p>\n\n        <button class="btn-request-defeat" ion-button full (touchstart)="requestDefeatRefreshCancelorder()">\n\n          刷新再找一找\n\n        </button>\n\n      </div>\n\n    </div>\n\n  \n\n    <!-- 待审核退货订单列表 -->\n\n    <div class="order-returnList" *ngIf="currentIndex == 1">\n\n      <!-- loading -->\n\n      <div class="loading-wrapper" *ngIf="loadingShow">\n\n        <div>\n\n          <ion-spinner item-start [name]="load.spinner"></ion-spinner>\n\n        </div>\n\n        <div [innerHTML]="load.content"></div>\n\n      </div>\n\n      <div class="order-items" *ngFor="let item of unauditReturnorderArray;let i = index">\n\n        <div class="order-title">\n\n          <h2>订单编号：\n\n            <span>{{item.orderId}}</span>\n\n          </h2>\n\n          <span [ngClass]="{auditStatus: true, pass:(item.status | setReturnOrderStatus).pass , auditing:(item.status | setReturnOrderStatus).audit} ">{{(item.status | setReturnOrderStatus).status}}</span>\n\n        </div>\n\n  \n\n        <div class="order-item">\n\n          <dl>\n\n            <dt>\n\n              <img class="my-picture" [src]="item.productSkuDTO.fileSeq | productSkuDTOImage" [alt]="item.productSkuDTO.productName">\n\n            </dt>\n\n            <dd class="product-title">{{ item.productSkuDTO.productName }}</dd>\n\n            <dd class="sku-list">\n\n              <span *ngFor="let sku of item.productSkuDTO.attrValueList">{{ sku.attrValue }} </span>\n\n            </dd>\n\n            <dd class=\'price\'>￥{{ item.unitPrice }}</dd>\n\n            <dd class="count">X{{ item.buyNumber }}</dd>\n\n          </dl>\n\n        </div>\n\n  \n\n        <div class="orderOperate">\n\n          <dl>\n\n            <dt>\n\n              <button class="btn-audit" ion-button (click)="auditReturn(i)" *ngIf="item.status==0">审核</button>\n\n              <button class="btn-audit" ion-button (click)="confirmReturn(i)" *ngIf="item.status==1">确认收货</button>\n\n            </dt>\n\n            <dd class="total">退货数量: {{item.number}}</dd>\n\n            <dd class="member-phone">会员手机：{{item.mobile}}</dd>\n\n          </dl>\n\n        </div>\n\n      </div>\n\n      <ion-infinite-scroll (ionInfinite)="loadMore($event)" *ngIf="!showNoMore && showInfinite">\n\n        <ion-infinite-scroll-content loadingText="加载更多..."></ion-infinite-scroll-content>\n\n      </ion-infinite-scroll>\n\n      <div class="no-data" *ngIf="noData">\n\n        <img src="./assets/image/nodata.png" alt="">\n\n        <p>空空如也</p>\n\n      </div>\n\n      <div class="btn-cancelView" (touchstart)="goAuditReturn()">\n\n        <span>查看已处理退货订单</span>\n\n      </div>\n\n      <div class="btn-noMore" *ngIf="showNoMore">\n\n        <span>—— 没有更多信息了 ——</span>\n\n      </div>\n\n      <div class="request-defeat" *ngIf="requestDefeat">\n\n        <img src="./assets/image/requestDefeat.png" alt="">\n\n        <p>啊哦！页面走丢了</p>\n\n        <button class="btn-request-defeat" ion-button full (touchstart)="requestDefeatRefreshReturnorder()">\n\n          刷新再找一找\n\n        </button>\n\n      </div>\n\n      <ion-infinite-scroll (ionInfinite)="loadMore($event)" *ngIf="!showNoMore && showInfinite">\n\n        <ion-infinite-scroll-content loadingText="加载更多..."></ion-infinite-scroll-content>\n\n      </ion-infinite-scroll>\n\n    </div>\n\n  </ion-content>'/*ion-inline-end:"C:\Users\think\huchunGit\tpb02\tpb\src\pages\unaudit-tabs\unaudit-tabs.html"*/
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["l" /* NavController */],
        __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["a" /* AlertController */],
        __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["m" /* NavParams */],
        __WEBPACK_IMPORTED_MODULE_4__app_app_service__["b" /* AppService */],
        __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["j" /* ModalController */]])
], UnauditTabs);

//# sourceMappingURL=unaudit-tabs.js.map

/***/ }),

/***/ 221:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return UnauditCancelorder; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__audit_cancelorder_audit_cancelorder__ = __webpack_require__(116);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__app_app_service__ = __webpack_require__(4);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




var UnauditCancelorder = (function () {
    function UnauditCancelorder(navCtrl, modalCtrl, alertCtrl, toastCtrl, appService) {
        this.navCtrl = navCtrl;
        this.modalCtrl = modalCtrl;
        this.alertCtrl = alertCtrl;
        this.toastCtrl = toastCtrl;
        this.appService = appService;
        this.unauditCancelorderArray = [];
        this.limit = 10;
        this.up = true; //上拉刷新和第一次进入页面时
        this.down = false; //下拉刷新和返回上一级页面时
        this.noData = false;
        this.start = 0;
        this.showNoMore = false;
        this.load = {};
        this.loadingShow = true;
        this.requestDefeat = false;
        this.showInfinite = false;
        this.start = 0;
        this.down = true;
        this.up = false;
        this.load = __WEBPACK_IMPORTED_MODULE_3__app_app_service__["a" /* AppConfig */].load;
        this.getUnauditCancelorder();
    }
    //审核点击事件
    UnauditCancelorder.prototype.auditOrder = function (index) {
        var _this = this;
        var alert = this.alertCtrl.create({
            message: "\u540C\u610F\u4F1A\u5458" + this.unauditCancelorderArray[index].memberMobile + "\u7684\u8BA2\u5355" + this.unauditCancelorderArray[index].orderId + "\u53D6\u6D88\u7533\u8BF7\uFF1F",
            buttons: [
                {
                    text: '拒绝',
                    handler: function () {
                        _this.start = 0;
                        _this.down = true;
                        _this.up = false;
                        // 点击拒绝后的执行代码
                        var loading = _this.appService.loading();
                        loading.present();
                        var url = __WEBPACK_IMPORTED_MODULE_3__app_app_service__["a" /* AppConfig */].API.auditCancelOrder + "?id=" + _this.unauditCancelorderArray[index].orderSeq + "&isAgree=0";
                        _this.appService.httpPost(url, null).then(function (data) {
                            if (data.type == 'success') {
                                loading.dismiss();
                                _this.getUnauditCancelorder();
                            }
                        }).catch(function (error) {
                            loading.dismiss();
                            console.log(error);
                            _this.appService.toast('操作失败，请稍后重试', 1000, 'middle');
                        });
                    }
                },
                {
                    text: '通过',
                    handler: function () {
                        _this.start = 0;
                        _this.down = true;
                        _this.up = false;
                        // 点击同意后的执行代码
                        var loading = _this.appService.loading();
                        loading.present();
                        var url = __WEBPACK_IMPORTED_MODULE_3__app_app_service__["a" /* AppConfig */].API.auditCancelOrder + "?id=" + _this.unauditCancelorderArray[index].orderSeq + "&isAgree=1";
                        _this.appService.httpPost(url, null).then(function (data) {
                            if (data.type == 'success') {
                                loading.dismiss();
                                _this.getUnauditCancelorder();
                            }
                        }).catch(function (error) {
                            loading.dismiss();
                            console.log(error);
                            _this.appService.toast('操作失败', 1000, 'middle');
                        });
                    }
                }
            ]
        });
        alert.present();
    };
    UnauditCancelorder.prototype.goAuditCancel = function () {
        var orderModal = this.modalCtrl.create(__WEBPACK_IMPORTED_MODULE_2__audit_cancelorder_audit_cancelorder__["a" /* AuditCancelorder */]);
        orderModal.present();
    };
    UnauditCancelorder.prototype.getUnauditCancelorder = function () {
        var _this = this;
        // 待审核取消订单 请求数据
        var url = __WEBPACK_IMPORTED_MODULE_3__app_app_service__["a" /* AppConfig */].API.getCancelorder + "?deliveryType=1&status=0&start=" + this.start + "&limit=" + this.limit;
        this.appService.httpGet(url).then(function (data) {
            _this.loadingShow = false;
            if (data.count == 0 && _this.unauditCancelorderArray.length == 0) {
                //空空如也
                _this.noData = true;
            }
            else {
                _this.noData = false;
                _this.showInfinite = true;
                if (_this.start < data.count) {
                    if (_this.up) {
                        (_a = _this.unauditCancelorderArray).push.apply(_a, data.data);
                        _this.start += _this.limit;
                    }
                    else if (_this.down) {
                        _this.unauditCancelorderArray = data.data;
                        _this.start += _this.limit;
                        _this.content.scrollTo(0, 0, 0);
                    }
                }
                else {
                    _this.showNoMore = true;
                }
            }
            var _a;
        }).catch(function (error) {
            _this.appService.getToken(error, function () {
                _this.getUnauditCancelorder();
            });
            _this.loadingShow = false;
            console.log(error);
            _this.requestDefeat = true;
            _this.showInfinite = false;
        });
    };
    // 下拉刷新请求数据
    UnauditCancelorder.prototype.refreshMore = function (refresher) {
        var _this = this;
        this.start = 0;
        this.down = true;
        this.up = false;
        var url = __WEBPACK_IMPORTED_MODULE_3__app_app_service__["a" /* AppConfig */].API.getCancelorder + "?deliveryType=1&status=0&start=" + this.start + "&limit=" + this.limit;
        this.appService.httpGet(url).then(function (data) {
            refresher.complete();
            if (data.count == 0) {
                //空空如也
                _this.noData = true;
            }
            else {
                _this.noData = false;
                _this.showInfinite = true;
                if (data.data.length != 0) {
                    _this.unauditCancelorderArray = data.data;
                    _this.start += _this.limit;
                }
                else {
                    _this.showNoMore = true;
                }
            }
        }).catch(function (error) {
            _this.appService.getToken(error, function () {
                _this.refreshMore(refresher);
            });
            refresher.complete();
            console.log(error);
            _this.requestDefeat = true;
            _this.showInfinite = false;
        });
    };
    // 上拉刷新请求数据
    UnauditCancelorder.prototype.loadMore = function (infiniteScroll) {
        var _this = this;
        this.down = false;
        this.up = true;
        var url = __WEBPACK_IMPORTED_MODULE_3__app_app_service__["a" /* AppConfig */].API.getCancelorder + "?deliveryType=1&status=0&start=" + this.start + "&limit=" + this.limit;
        this.appService.httpGet(url).then(function (data) {
            infiniteScroll.complete();
            if (data.count == 0) {
                //空空如也
                _this.noData = true;
            }
            else {
                _this.noData = false;
                _this.showInfinite = true;
                if (data.data.length != 0) {
                    (_a = _this.unauditCancelorderArray).push.apply(_a, data.data);
                    _this.start += _this.limit;
                }
                else {
                    _this.showNoMore = true;
                }
            }
            var _a;
        }).catch(function (error) {
            _this.appService.getToken(error, function () {
                _this.loadMore(infiniteScroll);
            });
            infiniteScroll.complete();
            console.log(error);
            _this.requestDefeat = true;
            _this.showInfinite = false;
        });
    };
    //请求失败后刷新
    UnauditCancelorder.prototype.requestDefeatRefresh = function () {
        this.requestDefeat = false;
        this.loadingShow = true;
        this.start = 0;
        this.down = true;
        this.up = false;
        this.getUnauditCancelorder();
    };
    return UnauditCancelorder;
}());
__decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_14" /* ViewChild */])(__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["c" /* Content */]),
    __metadata("design:type", __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["c" /* Content */])
], UnauditCancelorder.prototype, "content", void 0);
UnauditCancelorder = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["n" /* Component */])({
        selector: 'unaudit-cancelorder',template:/*ion-inline-start:"C:\Users\think\huchunGit\tpb02\tpb\src\pages\unaudit-cancelorder\unaudit-cancelorder.html"*/'<ion-content>\n\n  <ion-refresher (ionRefresh)="refreshMore($event)">\n\n    <ion-refresher-content></ion-refresher-content>\n\n  </ion-refresher>\n\n	<div class="order-list">\n\n    <!-- loading -->\n\n    <div class="loading-wrapper" *ngIf="loadingShow">\n\n      <div>\n\n        <ion-spinner item-start [name]="load.spinner"></ion-spinner>\n\n      </div>\n\n      <div [innerHTML]="load.content"></div>\n\n    </div>\n\n		<div class="order-items" *ngFor = "let item of unauditCancelorderArray;let i = index">\n\n			<div class="order-title">\n\n				<h2>订单编号：<span>{{item.orderId}}</span></h2>\n\n				<span [ngClass]="{auditStatus: true, pass:(item.status | setCancelOrderStatus).pass , auditing:(item.status | setCancelOrderStatus).audit} ">{{(item.status | setCancelOrderStatus).status}}</span> \n\n			</div>\n\n\n\n			<div class="order-item" *ngFor = "let single of item.itemList">\n\n        <dl>\n\n          <dt>\n\n            <img class="my-picture" [src]="single.productSkuDTO.fileSeq | productSkuDTOImage" [alt]="single.productSkuDTO.productName">\n\n          </dt>\n\n          <dd class="product-title">{{ single.productSkuDTO.productName }}</dd>\n\n          <dd class="sku-list">\n\n            <span *ngFor="let sku of single.productSkuDTO.attrValueList">{{ sku.attrValue }} </span>\n\n          </dd>\n\n          <dd class=\'price\'>￥{{ single.unitPrice }}</dd>\n\n          <dd class="count">X{{ single.number }}</dd>\n\n        </dl>\n\n			</div>\n\n			\n\n			<div class="orderOperate">\n\n				<dl>\n\n					<dt>\n\n						<button class="btn-audit" ion-button (click)="auditOrder(i)">审核</button>\n\n					</dt>\n\n					<dd class="total">{{item.amount}}件商品，实付￥{{item.payAmount}}</dd>\n\n					<dd class="member-phone">会员手机：{{item.memberMobile}}</dd>\n\n				</dl>\n\n			</div>\n\n    </div>\n\n		<div class="btn-cancelView" (touchstart)="goAuditCancel()" *ngIf = "showInfinite">\n\n			<span>查看审核完成订单</span>\n\n    </div>\n\n    <div class="no-data" *ngIf = "noData">\n\n      <img src="./assets/image/nodata.png" alt="">\n\n      <p>空空如也</p>\n\n    </div>\n\n    <div class="btn-noMore" *ngIf = "showNoMore">\n\n      <span>—— 没有更多赠品了 ——</span>\n\n    </div>\n\n    <div class="request-defeat" *ngIf = "requestDefeat">\n\n      <img src="./assets/image/requestDefeat.png" alt="">\n\n      <p>啊哦！页面走丢了</p>\n\n      <button class="btn-request-defeat" ion-button full (touchstart)="requestDefeatRefresh()">\n\n        刷新再找一找\n\n      </button>\n\n    </div>\n\n    <ion-infinite-scroll (ionInfinite)="loadMore($event)" *ngIf = "!showNoMore && showInfinite">\n\n      <ion-infinite-scroll-content loadingText="加载更多..."></ion-infinite-scroll-content>\n\n    </ion-infinite-scroll>\n\n	</div>\n\n\n\n</ion-content>\n\n'/*ion-inline-end:"C:\Users\think\huchunGit\tpb02\tpb\src\pages\unaudit-cancelorder\unaudit-cancelorder.html"*/
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["l" /* NavController */],
        __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["j" /* ModalController */],
        __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["a" /* AlertController */],
        __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["p" /* ToastController */],
        __WEBPACK_IMPORTED_MODULE_3__app_app_service__["b" /* AppService */]])
], UnauditCancelorder);

//# sourceMappingURL=unaudit-cancelorder.js.map

/***/ }),

/***/ 222:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return UnauditReturnorder; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__audit_returnorder_audit_returnorder__ = __webpack_require__(117);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__return_detail_return_detail__ = __webpack_require__(118);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__app_app_service__ = __webpack_require__(4);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};





var UnauditReturnorder = (function () {
    function UnauditReturnorder(navCtrl, modalCtrl, alertCtrl, appService) {
        this.navCtrl = navCtrl;
        this.modalCtrl = modalCtrl;
        this.alertCtrl = alertCtrl;
        this.appService = appService;
        this.unauditReturnorderArray = [];
        this.limit = 10;
        this.up = true; //上拉刷新和第一次进入页面时
        this.down = false; //下拉刷新和返回上一级页面时
        this.noData = false;
        this.start = 0;
        this.showNoMore = false;
        this.load = {};
        this.loadingShow = true;
        this.requestDefeat = false;
        this.showInfinite = false;
        this.load = __WEBPACK_IMPORTED_MODULE_4__app_app_service__["a" /* AppConfig */].load;
        this.getUnauditReturnorderList();
    }
    UnauditReturnorder.prototype.confirmReturn = function (index) {
        var _this = this;
        var alert = this.alertCtrl.create({
            message: "\u786E\u8BA4\u5DF2\u6536\u5230\u4F1A\u5458" + this.unauditReturnorderArray[index].mobile + "\u7684\u8BA2\u5355" + this.unauditReturnorderArray[index].orderId + "\u7684" + this.unauditReturnorderArray[index].number + "\u4EF6\u9000\u8D27\u5546\u54C1\uFF1F",
            buttons: [
                {
                    text: '取消',
                    handler: function () {
                        //点击取消后的执行代码
                    }
                },
                {
                    text: '确认',
                    handler: function () {
                        // 点击确认后的执行代码
                        var loading = _this.appService.loading();
                        loading.present();
                        var url = __WEBPACK_IMPORTED_MODULE_4__app_app_service__["a" /* AppConfig */].API.returnReceived + "?id=" + _this.unauditReturnorderArray[index].orderReturnSeq;
                        _this.appService.httpPost(url, null).then(function (data) {
                            loading.dismiss();
                            if (data.type == 'success') {
                                _this.start = 0;
                                _this.up = false;
                                _this.down = true;
                                _this.getUnauditReturnorderList();
                            }
                        }).catch(function (error) {
                            loading.dismiss();
                            console.log(error);
                            _this.appService.toast('操作失败，请稍后再试', 1000, 'middle');
                        });
                    }
                }
            ]
        });
        alert.present();
    };
    UnauditReturnorder.prototype.auditReturn = function (index) {
        var _this = this;
        var orderModal = this.modalCtrl.create(__WEBPACK_IMPORTED_MODULE_3__return_detail_return_detail__["a" /* ReturnDetail */], { productId: this.unauditReturnorderArray[index].orderReturnSeq });
        orderModal.onDidDismiss(function () {
            _this.start = 0;
            _this.down = true;
            _this.up = false;
            _this.getUnauditReturnorderList();
        });
        orderModal.present();
    };
    UnauditReturnorder.prototype.goAuditReturn = function () {
        var orderModal = this.modalCtrl.create(__WEBPACK_IMPORTED_MODULE_2__audit_returnorder_audit_returnorder__["a" /* AuditReturnorder */]);
        orderModal.present();
    };
    UnauditReturnorder.prototype.getUnauditReturnorderList = function () {
        var _this = this;
        // 待审核退货订单 请求数据
        var url = __WEBPACK_IMPORTED_MODULE_4__app_app_service__["a" /* AppConfig */].API.getReturnorderList + "?deliveryType=1&status=0&start=" + this.start + "&limit=" + this.limit;
        this.appService.httpGet(url).then(function (data) {
            _this.loadingShow = false;
            if (data.count == 0 && _this.unauditReturnorderArray.length == 0) {
                //空空如也
                _this.noData = true;
            }
            else {
                _this.noData = false;
                _this.showInfinite = true;
                if (_this.start < data.count) {
                    if (_this.up) {
                        (_a = _this.unauditReturnorderArray).push.apply(_a, data.data);
                        _this.start += _this.limit;
                    }
                    else if (_this.down) {
                        _this.unauditReturnorderArray = data.data;
                        _this.start += _this.limit;
                    }
                }
                else {
                    _this.showNoMore = true;
                }
            }
            var _a;
        }).catch(function (error) {
            _this.appService.getToken(error, function () {
                _this.getUnauditReturnorderList();
            });
            _this.loadingShow = false;
            console.log(error);
            _this.requestDefeat = true;
            _this.showInfinite = false;
        });
    };
    // 下拉刷新请求数据
    UnauditReturnorder.prototype.doRefresh = function (refresher) {
        var _this = this;
        this.start = 0;
        this.up = false;
        this.down = true;
        var url = __WEBPACK_IMPORTED_MODULE_4__app_app_service__["a" /* AppConfig */].API.getReturnorderList + "?deliveryType=1&status=0&start=" + this.start + "&limit=" + this.limit;
        this.appService.httpGet(url).then(function (data) {
            refresher.complete();
            if (data.count == 0) {
                //空空如也
                _this.noData = true;
            }
            else {
                _this.noData = false;
                _this.showInfinite = true;
                if (data.data.length != 0) {
                    _this.unauditReturnorderArray = data.data;
                    _this.start += _this.limit;
                }
                else {
                    _this.showNoMore = true;
                }
            }
        }).catch(function (error) {
            _this.appService.getToken(error, function () {
                _this.doRefresh(refresher);
            });
            refresher.complete();
            console.log(error);
            _this.requestDefeat = true;
            _this.showInfinite = false;
        });
    };
    // 上拉刷新请求数据
    UnauditReturnorder.prototype.infiniteGetSelfGiftList = function (infiniteScroll) {
        var _this = this;
        this.up = true;
        this.down = false;
        this.up = true;
        var url = __WEBPACK_IMPORTED_MODULE_4__app_app_service__["a" /* AppConfig */].API.getReturnorderList + "?deliveryType=1&status=0&start=" + this.start + "&limit=" + this.limit;
        this.appService.httpGet(url).then(function (data) {
            infiniteScroll.complete();
            if (data.count == 0) {
                //空空如也
                _this.noData = true;
            }
            else {
                _this.noData = false;
                _this.showInfinite = true;
                if (data.data.length != 0) {
                    (_a = _this.unauditReturnorderArray).push.apply(_a, data.data);
                    _this.start += _this.limit;
                }
                else {
                    _this.showNoMore = true;
                }
            }
            var _a;
        }).catch(function (error) {
            _this.appService.getToken(error, function () {
                _this.infiniteGetSelfGiftList(infiniteScroll);
            });
            infiniteScroll.complete();
            console.log(error);
            _this.requestDefeat = true;
            _this.showInfinite = false;
        });
    };
    //请求失败后刷新
    UnauditReturnorder.prototype.requestDefeatRefresh = function () {
        this.requestDefeat = false;
        this.loadingShow = true;
        this.start = 0;
        this.down = true;
        this.up = false;
        this.getUnauditReturnorderList();
    };
    return UnauditReturnorder;
}());
UnauditReturnorder = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["n" /* Component */])({
        selector: 'unaudit-returnorder',template:/*ion-inline-start:"C:\Users\think\huchunGit\tpb02\tpb\src\pages\unaudit-returnorder\unaudit-returnorder.html"*/'<ion-content>\n\n  <ion-refresher (ionRefresh)="doRefresh($event)">\n\n    <ion-refresher-content></ion-refresher-content>\n\n  </ion-refresher>\n\n	<div class="order-list">\n\n    <!-- loading -->\n\n    <div class="loading-wrapper" *ngIf="loadingShow">\n\n      <div>\n\n        <ion-spinner item-start [name]="load.spinner"></ion-spinner>\n\n      </div>\n\n      <div [innerHTML]="load.content"></div>\n\n    </div>\n\n		<div class="order-items" *ngFor = "let item of unauditReturnorderArray;let i = index">\n\n      <div class="order-title">\n\n        <h2>订单编号：\n\n          <span>{{item.orderId}}</span>\n\n        </h2>\n\n        <span [ngClass]="{auditStatus: true, pass:(item.status | setReturnOrderStatus).pass , auditing:(item.status | setReturnOrderStatus).audit} ">{{(item.status | setReturnOrderStatus).status}}</span>\n\n      </div>\n\n  \n\n      <div class="order-item">\n\n        <dl>\n\n          <dt>\n\n            <img class="my-picture" [src]="item.productSkuDTO.fileSeq | productSkuDTOImage" [alt]="item.productSkuDTO.productName">\n\n          </dt>\n\n          <dd class="product-title">{{ item.productSkuDTO.productName }}</dd>\n\n          <dd class="sku-list">\n\n            <span *ngFor="let sku of item.productSkuDTO.attrValueList">{{ sku.attrValue }} </span>\n\n          </dd>\n\n          <dd class=\'price\'>￥{{ item.unitPrice }}</dd>\n\n          <dd class="count">X{{ item.buyNumber }}</dd>\n\n        </dl>\n\n      </div>\n\n			    \n\n      <div class="orderOperate">\n\n        <dl>\n\n          <dt>\n\n            <button class="btn-audit" ion-button (click)="auditReturn(i)" *ngIf = "item.status==0">审核</button>\n\n            <button class="btn-audit" ion-button (click)="confirmReturn(i)" *ngIf = "item.status==1">确认收货</button>\n\n          </dt>\n\n          <dd class="total">退货数量: {{item.number}}</dd>\n\n          <dd class="member-phone">会员手机：{{item.mobile}}</dd>\n\n        </dl>\n\n      </div>\n\n    </div>\n\n		<div class="btn-cancelView" (touchstart)="goAuditReturn()" *ngIf = "showInfinite">\n\n			<span>查看已处理退货订单</span>\n\n    </div>\n\n    <div class="no-data" *ngIf = "noData">\n\n      <img src="./assets/image/nodata.png" alt="">\n\n      <p>空空如也</p>\n\n    </div>\n\n    <div class="btn-noMore" *ngIf = "showNoMore">\n\n      <span>—— 没有更多信息了 ——</span>\n\n    </div>\n\n    <div class="request-defeat" *ngIf = "requestDefeat">\n\n      <img src="./assets/image/requestDefeat.png" alt="">\n\n      <p>啊哦！页面走丢了</p>\n\n      <button class="btn-request-defeat" ion-button full (touchstart)="requestDefeatRefresh()">\n\n        刷新再找一找\n\n      </button>\n\n    </div>\n\n    <ion-infinite-scroll (ionInfinite)="infiniteGetSelfGiftList($event)"  *ngIf = "!showNoMore && showInfinite">\n\n      <ion-infinite-scroll-content loadingText="加载更多..."></ion-infinite-scroll-content>\n\n    </ion-infinite-scroll>\n\n\n\n  </div>\n\n</ion-content>\n\n'/*ion-inline-end:"C:\Users\think\huchunGit\tpb02\tpb\src\pages\unaudit-returnorder\unaudit-returnorder.html"*/
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["l" /* NavController */],
        __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["j" /* ModalController */],
        __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["a" /* AlertController */],
        __WEBPACK_IMPORTED_MODULE_4__app_app_service__["b" /* AppService */]])
], UnauditReturnorder);

//# sourceMappingURL=unaudit-returnorder.js.map

/***/ }),

/***/ 223:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ReturnedDetail; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__app_app_service__ = __webpack_require__(4);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



var ReturnedDetail = (function () {
    function ReturnedDetail(navCtrl, alertCtrl, navParams, appService) {
        this.navCtrl = navCtrl;
        this.alertCtrl = alertCtrl;
        this.navParams = navParams;
        this.appService = appService;
        this.load = {};
        this.loadingShow = true;
        this.returnedDetail = {
            orderReturn: {
                orderReturnSeq: '',
                returnOrderId: '',
                invoiced: '',
                detail: '',
                mobile: '',
                number: '',
                name: '',
                returnType: '',
                totalReturnPrice: '',
                status: '',
                returnReason: ''
            },
            order: {
                orderSeq: '',
                orderId: '',
                payAmount: ''
            },
            itemProductSkuDTO: {
                orderItemSeq: null,
                prodSeq: null,
                skuSeq: null,
                unitPrice: null,
                number: null,
                productSkuDTO: {
                    productSeq: null,
                    skuSeq: null,
                    unitPrice: '',
                    number: '',
                    productName: "",
                    fileName: '',
                    attrValueList: [
                        {
                            skuSeq: null,
                            attrSeq: null,
                            attrName: "",
                            attrValue: "",
                            type: null,
                            fileSeq: null,
                            price: null,
                            selectedAttrValue: null,
                            invalidAttrValue: null
                        },
                        {
                            skuSeq: null,
                            attrSeq: null,
                            attrName: "",
                            attrValue: "",
                            type: null,
                            fileSeq: null,
                            price: null,
                            selectedAttrValue: null,
                            invalidAttrValue: null
                        }
                    ],
                    fallback: null
                }
            },
            returnAmount: null
        };
        this.listIndexId = this.navParams.get('indexId'); //传上个页面当前点击的id来获取详情页信息
        this.orderStatus = this.navParams.get('status'); //传过来的订单的状态
        this.load = __WEBPACK_IMPORTED_MODULE_2__app_app_service__["a" /* AppConfig */].load;
        this.getReturnedDetailList();
    }
    ReturnedDetail.prototype.getReturnedDetailList = function () {
        var _this = this;
        // 点击审核时的详情页 请求数据
        var url = __WEBPACK_IMPORTED_MODULE_2__app_app_service__["a" /* AppConfig */].API.returnDetail + "?id=" + this.listIndexId;
        this.appService.httpGet(url).then(function (data) {
            _this.loadingShow = false;
            _this.returnedDetail = data;
            if (_this.returnedDetail.orderReturn.imageIds) {
                _this.imageArray = _this.returnedDetail.orderReturn.imageIds.split(",");
            }
        }).catch(function (error) {
            _this.appService.getToken(error, function () {
                _this.getReturnedDetailList();
            });
            _this.loadingShow = false;
            console.log(error);
            _this.appService.toast('网络异常，请稍后再试', 1000, 'middle');
        });
    };
    return ReturnedDetail;
}());
ReturnedDetail = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["n" /* Component */])({
        selector: 'returned-detail',template:/*ion-inline-start:"C:\Users\think\huchunGit\tpb02\tpb\src\pages\returned-detail\returned-detail.html"*/'<ion-header>\n\n  <ion-navbar>\n\n    <ion-title text-center>退货详情</ion-title>\n\n  </ion-navbar>\n\n</ion-header>\n\n<ion-content>\n\n  <div class="order-list">\n\n    <div class="loading-wrapper" *ngIf="loadingShow">\n\n      <div>\n\n        <ion-spinner item-start [name]="load.spinner"></ion-spinner>\n\n      </div>\n\n      <div [innerHTML]="load.content"></div>\n\n    </div>\n\n    <div class="order-items">\n\n      <!-- 订单编号 -->\n\n      <div class="order-title">\n\n        <h2>订单编号：\n\n          <span>{{returnedDetail.orderReturn.returnOrderId}}</span>\n\n        </h2>\n\n        <!--color auditing or pass -->\n\n        <span [ngClass]="{auditStatus: true, pass:(orderStatus | setReturnOrderStatus).pass , auditing:(orderStatus | setReturnOrderStatus).audit} ">{{(orderStatus | setReturnOrderStatus).status}}</span>\n\n      </div>\n\n      <!-- 商品1 -->\n\n      <div class="order-item">\n\n        <dl>\n\n          <dt>\n\n            <img class="my-picture" [src]="returnedDetail.itemProductSkuDTO.productSkuDTO.fileSeq | productSkuDTOImage" [alt]="returnedDetail.itemProductSkuDTO.productSkuDTO.productName">\n\n          </dt>\n\n          <dd class="product-title">{{returnedDetail.itemProductSkuDTO.productSkuDTO.productName}}</dd>\n\n          <dd class="sku-list">\n\n            <!-- <span>{{returnedDetail.itemProductSkuDTO.productSkuDTO.attrValueList}}</span> -->\n\n            <span *ngFor="let sku of returnedDetail.itemProductSkuDTO.productSkuDTO.attrValueList"> {{sku.attrValue}} </span>\n\n          </dd>\n\n          <dd class=\'price\'>￥{{returnedDetail.itemProductSkuDTO.unitPrice}}</dd>\n\n          <dd class="count">X{{returnedDetail.itemProductSkuDTO.number}}</dd>\n\n        </dl>\n\n      </div>\n\n\n\n      <div class="orderOperate">\n\n        <dl>\n\n          <dt>\n\n          </dt>\n\n          <dd class="total">共{{returnedDetail.orderReturn.number}}件商品，实付￥{{returnedDetail.returnAmount}}</dd>\n\n        </dl>\n\n      </div>\n\n    </div>\n\n\n\n    <div class="return-detail">\n\n      <ul>\n\n        <li>退货数量：{{returnedDetail.orderReturn.number}}</li>\n\n        <li>联系方式：{{returnedDetail.orderReturn.mobile}}</li>\n\n        <li>退货方式：\n\n          <span *ngIf="returnedDetail.orderReturn.returnType == 1">门店</span>\n\n          <span *ngIf="returnedDetail.orderReturn.returnType == 2">快递</span>\n\n          <span *ngIf="returnedDetail.orderReturn.returnType == 0">其他</span>\n\n        </li>\n\n        <li>是否有发票：{{returnedDetail.orderReturn.invoiced==1?\'有\': \'无\'}}</li>\n\n        <li>退货原因：{{returnedDetail.orderReturn.reasonType | reasonType}}</li>\n\n        <li>问题描述：{{returnedDetail.orderReturn.detail}}</li>\n\n        <li class="img-list" *ngIf="imageArray">\n\n          <img [src]="itemImg | productSkuDTOImage" alt="" *ngFor="let itemImg of imageArray">\n\n        </li>\n\n      </ul>\n\n    </div>\n\n  </div>\n\n</ion-content>'/*ion-inline-end:"C:\Users\think\huchunGit\tpb02\tpb\src\pages\returned-detail\returned-detail.html"*/
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["l" /* NavController */],
        __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["a" /* AlertController */],
        __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["m" /* NavParams */],
        __WEBPACK_IMPORTED_MODULE_2__app_app_service__["b" /* AppService */]])
], ReturnedDetail);

//# sourceMappingURL=returned-detail.js.map

/***/ }),

/***/ 224:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return UnhandleTabs; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__app_app_service__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__handle_selfgift_handle_selfgift__ = __webpack_require__(62);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__handle_expressgift_handle_expressgift__ = __webpack_require__(119);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};





var UnhandleTabs = (function () {
    function UnhandleTabs(navCtrl, alertCtrl, navParams, appService, modalCtrl, zone) {
        this.navCtrl = navCtrl;
        this.alertCtrl = alertCtrl;
        this.navParams = navParams;
        this.appService = appService;
        this.modalCtrl = modalCtrl;
        this.zone = zone;
        this.unhandleSeflGiftArray = [];
        this.unhandleExpressGiftArray = [];
        this.limit = 10;
        this.noData = false;
        this.start = 0;
        this.showNoMore = false;
        this.load = {};
        this.loadingShow = true;
        this.currentIndex = 1;
        this.reserveShopTimeMin = '';
        this.requestDefeat = false;
        this.showInfinite = false;
        this.start = 0;
        this.down = true;
        this.up = false;
        this.load = __WEBPACK_IMPORTED_MODULE_2__app_app_service__["a" /* AppConfig */].load;
        this.reserveShopTimeMin = this.appService.reserveDate();
        this.currentStatus = '快递到家赠品';
        this.statusList = [{
                label: '到店自提赠品',
                num: this.selfGiftCount
            }, {
                label: '快递到家赠品',
                num: this.expressGiftCount
            }];
        // 获取tab数量
        this.getTabCount();
        // 获取快递到家赠品
        this.getUnhandleExpressGiftList();
    }
    // 获取tab上显示的数量
    UnhandleTabs.prototype.getTabCount = function () {
        var _this = this;
        var urlExpress = __WEBPACK_IMPORTED_MODULE_2__app_app_service__["a" /* AppConfig */].API.getGiftList + "?type=0&start=" + this.start + "&limit=" + this.limit;
        var urlSelf = __WEBPACK_IMPORTED_MODULE_2__app_app_service__["a" /* AppConfig */].API.getGiftList + "?type=1&start=" + this.start + "&limit=" + this.limit;
        this.appService.httpGet(urlExpress).then(function (data) {
            _this.expressGiftCount = data.count;
            _this.statusList[0].num = data.count;
        }).catch(function (error) {
            _this.appService.getToken(error, function () {
                _this.getTabCount();
            });
            _this.appService.toast('网络异常，请稍后再试', 1000, 'middle');
        });
        this.appService.httpGet(urlSelf).then(function (data) {
            _this.selfGiftCount = data.count;
            _this.statusList[1].num = data.count;
        }).catch(function (error) {
            _this.appService.getToken(error, function () {
                _this.getTabCount();
            });
            _this.appService.toast('网络异常，请稍后再试', 1000, 'middle');
        });
    };
    // 获取自提赠品
    UnhandleTabs.prototype.getUnhandleSelfGiftList = function () {
        var _this = this;
        this.loadingShow = true;
        this.showNoMore = false;
        this.noData = false;
        this.requestDefeat = false;
        var url = __WEBPACK_IMPORTED_MODULE_2__app_app_service__["a" /* AppConfig */].API.getGiftList + "?type=0&start=" + this.start + "&limit=" + this.limit;
        this.appService.httpGet(url).then(function (data) {
            _this.loadingShow = false;
            _this.statusList[0].num = data.count;
            if (_this.start < data.count) {
                _this.showNoMore = false;
                _this.noData = false;
                _this.start += _this.limit;
                _this.showInfinite = true;
                if (_this.up) {
                    (_a = _this.unhandleSeflGiftArray).push.apply(_a, data.data);
                }
                else if (_this.down) {
                    _this.unhandleSeflGiftArray = data.data;
                }
                _this.addOrderStatusClass(_this.unhandleSeflGiftArray);
            }
            else if (data.count == 0) {
                _this.noData = true;
                _this.showNoMore = false;
                _this.unhandleSeflGiftArray = [];
            }
            else if (data.data.length == 0) {
                _this.noData = false;
                _this.showNoMore = true;
            }
            var _a;
        }).catch(function (error) {
            _this.appService.getToken(error, function () {
                _this.getUnhandleSelfGiftList();
            });
            _this.unhandleSeflGiftArray = [];
            _this.loadingShow = false;
            console.log(error);
            _this.showInfinite = false;
            _this.requestDefeat = true;
        });
    };
    UnhandleTabs.prototype.addOrderStatusClass = function (param) {
        param.map(function (item) {
            if (item.giftType == '0' && item.status == '2') {
                item.className = 'unstart';
            }
            else if (item.giftType == '1') {
                item.className = 'unstart';
            }
            else {
                item.className = 'success';
            }
        });
    };
    // 查看已完成的自提
    UnhandleTabs.prototype.goSelfgift = function () {
        var _this = this;
        var orderModal = this.modalCtrl.create(__WEBPACK_IMPORTED_MODULE_3__handle_selfgift_handle_selfgift__["a" /* HandleSelfgift */]);
        orderModal.onDidDismiss(function () {
            // 返回自提赠品页重新请求接口，渲染页面
            _this.start = 0;
            _this.down = true;
            _this.up = false;
            _this.getUnhandleSelfGiftList();
        });
        orderModal.present();
    };
    UnhandleTabs.prototype.clearReserveArriveTime = function (index) {
        this.unhandleSeflGiftArray[index].reserveShopTime = "";
    };
    UnhandleTabs.prototype.reserveAffirm = function (index) {
        var _this = this;
        if (this.unhandleSeflGiftArray[index].reserveShopTime != null) {
            // 预约确认更改数据
            var body = {
                memberGiftAccountSeq: this.unhandleSeflGiftArray[index].memberGiftAccountSeq,
                reserveShopTime: new Date(this.unhandleSeflGiftArray[index].reserveShopTime).getTime()
            };
            var loading_1 = this.appService.loading();
            loading_1.present();
            var url = __WEBPACK_IMPORTED_MODULE_2__app_app_service__["a" /* AppConfig */].API.confirmReserveShopTime;
            this.appService.httpPost(url, body).then(function (data) {
                if (data.type == "success") {
                    _this.start = 0;
                    _this.down = true;
                    _this.up = false;
                    loading_1.dismiss();
                    _this.appService.toast('预约成功！', 1000, 'middle');
                    _this.getUnhandleSelfGiftList();
                }
            }).catch(function (error) {
                _this.appService.getToken(error, function () {
                    _this.reserveAffirm(index);
                });
                loading_1.dismiss();
                console.log(error.message);
                _this.appService.toast('操作失败，请稍后重试', 1000, 'middle');
            });
        }
        else {
            this.appService.toast('请选择会员预约到店时间', 1000, 'middle');
        }
    };
    //回到顶部
    UnhandleTabs.prototype.scrollTo = function () {
        this.content.scrollTo(0, 0, 300);
    };
    //获取当前距离顶部位置
    UnhandleTabs.prototype.scrollHandler = function (event) {
        var _this = this;
        this.zone.run(function () {
            if (event.scrollTop >= 300) {
                _this.toTop = true;
            }
            else {
                _this.toTop = false;
            }
        });
    };
    // 获取快递赠品
    UnhandleTabs.prototype.getUnhandleExpressGiftList = function () {
        var _this = this;
        this.loadingShow = true;
        this.showNoMore = false;
        this.noData = false;
        this.requestDefeat = false;
        this.showInfinite = true;
        var url = __WEBPACK_IMPORTED_MODULE_2__app_app_service__["a" /* AppConfig */].API.getGiftList + "?type=1&start=" + this.start + "&limit=" + this.limit;
        this.appService.httpGet(url).then(function (data) {
            _this.loadingShow = false;
            _this.statusList[_this.currentIndex].num = data.count;
            if (_this.start < data.count) {
                _this.showNoMore = false;
                _this.noData = false;
                _this.start += _this.limit;
                if (_this.up) {
                    (_a = _this.unhandleExpressGiftArray).push.apply(_a, data.data);
                }
                else if (_this.down) {
                    _this.unhandleExpressGiftArray = data.data;
                }
                _this.addOrderStatusClass(_this.unhandleExpressGiftArray);
            }
            else if (data.count == 0) {
                _this.noData = true;
                _this.showNoMore = false;
                _this.unhandleExpressGiftArray = [];
            }
            else if (data.data.length == 0) {
                _this.noData = false;
                _this.showNoMore = true;
            }
            var _a;
        }).catch(function (error) {
            _this.appService.getToken(error, function () {
                _this.getUnhandleExpressGiftList();
            });
            _this.unhandleExpressGiftArray = [];
            _this.loadingShow = false;
            console.log(error);
            _this.showInfinite = false;
            _this.requestDefeat = true;
        });
    };
    UnhandleTabs.prototype.goExpressgift = function () {
        var _this = this;
        var orderModal = this.modalCtrl.create(__WEBPACK_IMPORTED_MODULE_4__handle_expressgift_handle_expressgift__["a" /* HandleExpressgift */]);
        orderModal.onDidDismiss(function () {
            // 返回自提赠品页重新请求接口，渲染页面
            _this.start = 0;
            _this.down = true;
            _this.up = false;
            _this.getUnhandleExpressGiftList();
        });
        orderModal.present();
    };
    UnhandleTabs.prototype.sendProduct = function (index) {
        var _this = this;
        var alert = this.alertCtrl.create({
            message: '赠品发货确认',
            inputs: [
                {
                    name: 'companyName',
                    type: 'text',
                    placeholder: '请在此输入快递公司名称'
                }, {
                    name: 'orderNum',
                    type: 'text',
                    placeholder: '请在此输入快递单号'
                }
            ],
            buttons: [
                {
                    text: '取消',
                    handler: function () {
                        //点击取消后的执行代码
                    }
                },
                {
                    text: '确认',
                    handler: function (data) {
                        if (data.companyName != "" && data.orderNum != "") {
                            var body = {
                                memberGiftAccountSeq: _this.unhandleExpressGiftArray[index].memberGiftAccountSeq,
                                expressCompany: data.companyName,
                                expressNo: data.orderNum
                            };
                            var loading_2 = _this.appService.loading();
                            loading_2.present();
                            var url = __WEBPACK_IMPORTED_MODULE_2__app_app_service__["a" /* AppConfig */].API.confirmExpressInfo;
                            _this.appService.httpPost(url, body).then(function (data) {
                                if (data.type == "success") {
                                    _this.start = 0;
                                    _this.down = true;
                                    _this.up = false;
                                    loading_2.dismiss();
                                    _this.getUnhandleExpressGiftList();
                                }
                            }).catch(function (error) {
                                loading_2.dismiss();
                                console.log(error);
                                _this.appService.toast('网络异常，请稍后再试', 1000, 'middle');
                            });
                        }
                        else if (data.companyName != "") {
                            _this.appService.toast('请填写快递单号', 1000, 'middle');
                        }
                        else if (data.orderNum != "") {
                            _this.appService.toast('请填写公司名称', 1000, 'middle');
                        }
                    }
                }
            ]
        });
        alert.present();
    };
    // 下拉刷新请求数据
    UnhandleTabs.prototype.doRefresh = function (refresher) {
        var _this = this;
        this.start = 0;
        this.down = true;
        this.up = false;
        this.requestDefeat = false;
        setTimeout(function () {
            if (_this.currentIndex == 0) {
                _this.getUnhandleSelfGiftList();
            }
            else {
                _this.getUnhandleExpressGiftList();
            }
            refresher.complete();
        }, __WEBPACK_IMPORTED_MODULE_2__app_app_service__["a" /* AppConfig */].LOAD_TIME);
        this.showNoMore = false;
    };
    // 上拉刷新请求数据
    UnhandleTabs.prototype.loadMore = function (infiniteScroll) {
        var _this = this;
        if (this.currentIndex == 0) {
            var url = __WEBPACK_IMPORTED_MODULE_2__app_app_service__["a" /* AppConfig */].API.getGiftList + "?type=0&start=" + this.start + "&limit=" + this.limit;
            this.appService.httpGet(url).then(function (data) {
                infiniteScroll.complete();
                if (data.data.length != 0) {
                    (_a = _this.unhandleSeflGiftArray).push.apply(_a, data.data);
                    _this.start += _this.limit;
                    _this.addOrderStatusClass(_this.unhandleSeflGiftArray);
                }
                else {
                    _this.showNoMore = true;
                }
                var _a;
            }).catch(function (error) {
                _this.appService.getToken(error, function () {
                    _this.loadMore(infiniteScroll);
                });
                infiniteScroll.complete();
                console.log(error);
                _this.appService.toast('网络异常，请稍后再试', 1000, 'middle');
            });
        }
        else {
            var url = __WEBPACK_IMPORTED_MODULE_2__app_app_service__["a" /* AppConfig */].API.getGiftList + "?type=1&start=" + this.start + "&limit=" + this.limit;
            this.appService.httpGet(url).then(function (data) {
                infiniteScroll.complete();
                if (data.count == 0) {
                    //空空如也
                    _this.noData = true;
                }
                else {
                    _this.noData = false;
                    if (data.data.length != 0) {
                        (_a = _this.unhandleExpressGiftArray).push.apply(_a, data.data);
                        _this.start += _this.limit;
                    }
                    else {
                        _this.showNoMore = true;
                    }
                }
                var _a;
            }).catch(function (error) {
                _this.appService.getToken(error, function () {
                    _this.loadMore(infiniteScroll);
                });
                infiniteScroll.complete();
                console.log(error);
                _this.appService.toast('网络异常，请稍后再试', 1000, 'middle');
            });
        }
    };
    // 切换tab标签
    UnhandleTabs.prototype.getCurrentStatus = function (index) {
        this.start = 0;
        this.up = false;
        this.down = true;
        this.content.scrollTo(0, 0, 0);
        this.currentStatus = this.statusList[index].label;
        this.currentIndex = index;
        if (this.currentIndex == 0) {
            this.getUnhandleSelfGiftList();
        }
        else {
            this.getUnhandleExpressGiftList();
        }
    };
    //请求失败后刷新
    UnhandleTabs.prototype.requestDefeatRefresh = function () {
        this.requestDefeat = false;
        this.loadingShow = true;
        this.start = 0;
        this.down = true;
        this.up = false;
        this.getUnhandleExpressGiftList();
    };
    //请求失败后刷新
    UnhandleTabs.prototype.requestDefeatRefreshSelfGift = function () {
        this.requestDefeat = false;
        this.loadingShow = true;
        this.start = 0;
        this.down = true;
        this.up = false;
        this.getUnhandleSelfGiftList();
    };
    UnhandleTabs.prototype.requestDefeatRefreshExpressGift = function () {
        this.requestDefeat = false;
        this.loadingShow = true;
        this.start = 0;
        this.down = true;
        this.up = false;
        this.getUnhandleExpressGiftList();
    };
    return UnhandleTabs;
}());
__decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_14" /* ViewChild */])(__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["c" /* Content */]),
    __metadata("design:type", __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["c" /* Content */])
], UnhandleTabs.prototype, "content", void 0);
UnhandleTabs = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["n" /* Component */])({
        selector: 'unhandle-tabs',template:/*ion-inline-start:"C:\Users\think\huchunGit\tpb02\tpb\src\pages\unhandle-tabs\unhandle-tabs.html"*/'<ion-header>\n\n  <ion-navbar>\n\n    <ion-title text-center>待处理赠品</ion-title>\n\n  </ion-navbar>\n\n  <ion-toolbar class="statusBox">\n\n    <ul>\n\n      <li *ngFor="let status of statusList, let i = index" [ngClass]="{active:currentStatus == status.label}" (click)="getCurrentStatus(i)">{{ status.label }}（{{status.num}}）</li>\n\n    </ul>\n\n  </ion-toolbar>\n\n</ion-header>\n\n<ion-content>\n\n  <ion-refresher (ionRefresh)="doRefresh($event)" *ngIf="!loadingShow">\n\n    <ion-refresher-content></ion-refresher-content>\n\n  </ion-refresher>\n\n\n\n  <div class="selfGiftList" *ngIf="currentIndex == 0">\n\n    <div class="gift-list">\n\n      <!-- loading -->\n\n      <div class="loading-wrapper" *ngIf="loadingShow">\n\n        <div>\n\n          <ion-spinner item-start [name]="load.spinner"></ion-spinner>\n\n        </div>\n\n        <div [innerHTML]="load.content"></div>\n\n      </div>\n\n      <div class="gift-item" *ngFor="let item of unhandleSeflGiftArray;let i = index">\n\n        <dl>\n\n          <dt>\n\n            <img [src]="item.imageName | handleGiftImage" alt="">\n\n          </dt>\n\n          <dd class="product-title">\n\n            <h2>{{ item.giftName }}</h2>\n\n            <span [ngClass]="item.className">{{ item.giftType | setGiftType: item.status }}</span>\n\n          </dd>\n\n          <dd class="reserve-phone" *ngIf="item.giftType==\'0\'">\n\n            <span>预约手机：{{ item.reservePhone }}</span>\n\n            <a href="tel:{{item.reservePhone}}" style="z-index:100">\n\n              <img src="./assets/image/phone.png">\n\n            </a>\n\n          </dd>\n\n          <dd class="member-phone">会员手机：{{ item.memberPhone }}</dd>\n\n          <dd class="get-time">领取时间：{{ item.receiveDate | date:\'yyyy-MM-dd HH:mm:ss\' }}</dd>\n\n        </dl>\n\n        <div class="reserve-time" *ngIf="item.giftType==\'0\' && item.status==\'2\'">\n\n          <div class="time-text">\n\n            <ion-datetime placeholder="会员预约到店时间" cancelText="取消" doneText="确定" displayFormat="YYYY-MM-DD" [(ngModel)]="item.reserveShopTime" min="{{reserveShopTimeMin}}" max="2099">\n\n            </ion-datetime>\n\n            <span class="clear" *ngIf="item.reserveShopTime" (click)="clearReserveArriveTime(i)">X</span>\n\n          </div>\n\n          <div class="btn-time">\n\n            <button ion-button round (touchend)="reserveAffirm(i)">预约确认</button>\n\n          </div>\n\n        </div>\n\n        <div class="reserve-time" *ngIf="item.giftType==\'0\' && item.status==\'3\'">\n\n          <div class="show-time">预约到店时间：{{ item.reserveShopTime | date:\'yyyy-MM-dd HH:mm:ss\' }}</div>\n\n        </div>\n\n\n\n      </div>\n\n      <div class="no-data" *ngIf="noData">\n\n        <img src="./assets/image/nodata.png" alt="">\n\n        <p>空空如也</p>\n\n      </div>\n\n      <div class="btn-selfview" (click)="goSelfgift()">\n\n        <span>查看已兑换自提赠品</span>\n\n      </div>\n\n      <div class="btn-noMore" *ngIf="showNoMore">\n\n        <span>—— 没有更多赠品了 ——</span>\n\n      </div>\n\n      <div class="request-defeat" *ngIf = "requestDefeat">\n\n        <img src="./assets/image/requestDefeat.png" alt="">\n\n        <p>啊哦！页面走丢了</p>\n\n        <button class="btn-request-defeat" ion-button full (touchstart)="requestDefeatRefreshSelfGift()">\n\n          刷新再找一找\n\n        </button>\n\n      </div>\n\n      <ion-infinite-scroll (ionInfinite)="loadMore($event)" *ngIf="!showNoMore && showInfinite">\n\n        <ion-infinite-scroll-content loadingText="加载更多..."></ion-infinite-scroll-content>\n\n      </ion-infinite-scroll>\n\n    </div>\n\n    <ion-infinite-scroll (ionInfinite)="loadMore($event)" *ngIf="!showNoMore && showInfinite">\n\n      <ion-infinite-scroll-content loadingText="加载更多..."></ion-infinite-scroll-content>\n\n    </ion-infinite-scroll>\n\n    <div class="toTop" (click)="scrollTo()" *ngIf="toTop">\n\n      <img src="./assets/image/toTop.png" alt="">\n\n    </div>\n\n    \n\n  </div>\n\n\n\n  <div class="expressGiftList" *ngIf="currentIndex == 1">\n\n    <div class="gift-list">\n\n      <!-- loading -->\n\n      <div class="loading-wrapper" *ngIf="loadingShow">\n\n        <div>\n\n          <ion-spinner item-start [name]="load.spinner"></ion-spinner>\n\n        </div>\n\n        <div [innerHTML]="load.content"></div>\n\n      </div>\n\n      <div class="gift-item" *ngFor="let item of unhandleExpressGiftArray;let i = index">\n\n        <dl>\n\n          <dt>\n\n            <img [src]="item.imageName | handleGiftImage" alt="">\n\n          </dt>\n\n          <dd class="product-title">\n\n            <h2>{{item.giftName}}</h2>\n\n            <span class="unstart">立即兑换</span>\n\n          </dd>\n\n          <dd class="reserve-phone">\n\n            <span>会员手机：{{item.memberPhone}}</span>\n\n            <a href="tel:{{item.memberPhone}}">\n\n              <img src="assets/image/phone.png">\n\n            </a>\n\n          </dd>\n\n          <dd class="get-time">领取时间：{{item.receiveDate | date:\'yyyy-MM-dd HH:mm:ss\'}}</dd>\n\n          <dd class="get-time">兑换时间：{{item.useDate | date:\'yyyy-MM-dd HH:mm:ss\'}}</dd>\n\n        </dl>\n\n        <div class="reserve-time">\n\n          <div class="member-info">\n\n            <ul>\n\n              <li *ngFor="let single of item.attrValueList">{{single.label}}：{{single.value}}</li>\n\n            </ul>\n\n          </div>\n\n          <div class="btn-time">\n\n            <button ion-button round (click)="sendProduct(i)">发货</button>\n\n          </div>\n\n        </div>\n\n      </div>\n\n      <div class="no-data" *ngIf="noData">\n\n        <img src="./assets/image/nodata.png" alt="">\n\n        <p>空空如也</p>\n\n      </div>\n\n      <div class="btn-selfview" (click)="goExpressgift()">\n\n        <span>查看已发货赠品</span>\n\n      </div>\n\n      <div class="btn-noMore" *ngIf="showNoMore">\n\n        <span>—— 没有更多赠品了 ——</span>\n\n      </div>\n\n      <div class="request-defeat" *ngIf = "requestDefeat">\n\n        <img src="./assets/image/requestDefeat.png" alt="">\n\n        <p>啊哦！页面走丢了</p>\n\n        <button class="btn-request-defeat" ion-button full (touchstart)="requestDefeatRefreshExpressGift()">\n\n          刷新再找一找\n\n        </button>\n\n      </div>\n\n      <ion-infinite-scroll (ionInfinite)="loadMore($event)" *ngIf="!showNoMore && showInfinite">\n\n        <ion-infinite-scroll-content loadingText="加载更多..."></ion-infinite-scroll-content>\n\n      </ion-infinite-scroll>\n\n    </div>\n\n    \n\n    \n\n  </div>\n\n\n\n  \n\n</ion-content>'/*ion-inline-end:"C:\Users\think\huchunGit\tpb02\tpb\src\pages\unhandle-tabs\unhandle-tabs.html"*/
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["l" /* NavController */],
        __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["a" /* AlertController */],
        __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["m" /* NavParams */],
        __WEBPACK_IMPORTED_MODULE_2__app_app_service__["b" /* AppService */],
        __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["j" /* ModalController */],
        __WEBPACK_IMPORTED_MODULE_0__angular_core__["P" /* NgZone */]])
], UnhandleTabs);

//# sourceMappingURL=unhandle-tabs.js.map

/***/ }),

/***/ 225:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return OrderList; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__brandshop_order_list_brandshop_order_list__ = __webpack_require__(226);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__app_app_service__ = __webpack_require__(4);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




var OrderList = (function () {
    function OrderList(navCtrl, appService, events) {
        this.navCtrl = navCtrl;
        this.appService = appService;
        this.events = events;
        this.dateStart = '';
        this.dateEnd = '';
        this.isShowDetail = [];
        this.orderList = [];
        this.pageSize = 10;
        this.paramsStatus = '';
        this.paramsDate = '';
        this.noData = false;
        this.start = 0;
        this.showNoMore = false;
        this.loadingShow = true;
        this.load = {};
        this.up = false; //上拉刷新和第一次进入页面时
        this.down = true; //下拉刷新和返回上一级页面时
        this.dateEndMin = '1970'; //结束日期的最小值
        this.requestDefeat = false;
        this.showInfinite = true;
        this.orderStatusList = [{
                label: "全部",
                status: 'all'
            }, {
                label: "待支付",
                status: '0'
            }, {
                label: "已收货",
                status: '3'
            }, {
                label: "已取消",
                status: '4'
            }, {
                label: "已完成",
                status: 'C'
            }];
        this.load = __WEBPACK_IMPORTED_MODULE_3__app_app_service__["a" /* AppConfig */].load;
    }
    // 每次进入页面的时候都会执行
    OrderList.prototype.ionViewDidEnter = function () {
        this.start = 0;
        this.paramsDate = '';
        this.paramsStatus = '';
        this.dateStart = '';
        this.dateEnd = '';
        this.dateStartMax = this.appService.reserveDate();
        this.dateEndMax = this.appService.reserveDate();
        this.currentStatus = this.orderStatusList[0].status;
        // this.events.subscribe('order:status', (orderStatus) => {
        //   this.currentStatus = orderStatus;
        //   this.paramsStatus += '&status=' + orderStatus;
        // });
        this.orderList = [];
        this.getOrderList();
    };
    // 每次离开页面的时候执行
    // ionViewDidLeave(){
    //   this.events.unsubscribe('order:status', () => {
    //     console.log('did unsubscribe');
    //   });
    // }
    // 获取订单列表
    OrderList.prototype.getOrderList = function () {
        var _this = this;
        this.loadingShow = true;
        this.noData = false;
        this.requestDefeat = false;
        this.showNoMore = false;
        this.showInfinite = true;
        var url = __WEBPACK_IMPORTED_MODULE_3__app_app_service__["a" /* AppConfig */].API.getOrderList + "?userType=B&start=" + this.start + "&limit=" + this.pageSize;
        if (this.paramsDate != '')
            url += this.paramsDate;
        if (this.paramsStatus != '')
            url += this.paramsStatus;
        this.appService.httpGet(url).then(function (data) {
            _this.loadingShow = false;
            if (_this.start < data.count) {
                if (_this.pageSize >= data.count) {
                    _this.showNoMore = true;
                    _this.showInfinite = false;
                }
                else {
                    _this.showNoMore = false;
                    _this.showInfinite = true;
                }
                _this.noData = false;
                _this.start += _this.pageSize;
                if (_this.up) {
                    (_a = _this.orderList).push.apply(_a, data.data);
                    for (var i = 0; i < _this.orderList.length; i++) {
                        _this.isShowDetail[i] = false;
                    }
                }
                else if (_this.down) {
                    _this.orderList = data.data;
                    for (var i = 0; i < _this.orderList.length; i++) {
                        _this.isShowDetail[i] = false;
                    }
                }
            }
            else if (data.count == 0) {
                _this.noData = true;
                _this.showNoMore = false;
                _this.showInfinite = false;
                _this.orderList = [];
            }
            else if (data.data.length == 0 && data.count != 0) {
                _this.noData = false;
                _this.showNoMore = true;
                _this.showInfinite = false;
            }
            var _a;
        }).catch(function (error) {
            _this.appService.getToken(error, function () {
                _this.getOrderList();
            });
            _this.orderList = [];
            _this.loadingShow = false;
            _this.showInfinite = false;
            _this.requestDefeat = true;
            console.log(error);
        });
    };
    // 通过日期获取订单
    OrderList.prototype.getOrderListByDate = function () {
        this.start = 0;
        this.paramsDate = '';
        this.orderList = [];
        if (this.dateStart != '') {
            this.paramsDate += "&startTime=" + this.dateStart;
            this.dateEndMin = this.dateStart;
        }
        if (this.dateEnd != '') {
            this.paramsDate += "&endTime=" + this.dateEnd;
            this.dateStartMax = this.dateEnd;
        }
        this.content.scrollTo(0, 0, 0);
        this.getOrderList();
    };
    // 点击状态时切换当前订单列表
    OrderList.prototype.getCurrentStatus = function (index) {
        this.start = 0;
        this.paramsStatus = '';
        this.orderList = [];
        this.currentStatus = this.orderStatusList[index].status;
        if (this.orderStatusList[index].status != 'all') {
            this.paramsStatus += '&status=' + this.currentStatus;
        }
        this.getOrderList();
        this.content.scrollTo(0, 0, 0);
    };
    // 是否显示明细
    OrderList.prototype.showDetail = function (index) {
        this.isShowDetail[index] = !this.isShowDetail[index];
    };
    // 进入门店所有订单
    OrderList.prototype.goBrandshoOrder = function () {
        this.orderList = [];
        this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_2__brandshop_order_list_brandshop_order_list__["a" /* BrandshopOrderList */]);
    };
    // 清除开始日期
    OrderList.prototype.clearDateStart = function () {
        this.dateStart = '';
        this.dateEndMin = '1970';
    };
    // 清除结束日期
    OrderList.prototype.clearDateEnd = function () {
        this.dateEnd = '';
        this.dateStartMax = this.appService.reserveDate();
        ;
    };
    // 下拉刷新请求数据
    OrderList.prototype.doRefresh = function (refresher) {
        var _this = this;
        this.start = 0;
        this.down = true;
        this.up = false;
        this.requestDefeat = false;
        setTimeout(function () {
            _this.getOrderList();
            refresher.complete();
        }, __WEBPACK_IMPORTED_MODULE_3__app_app_service__["a" /* AppConfig */].LOAD_TIME);
        this.showNoMore = false;
    };
    // 上拉加载更多 请求数据
    OrderList.prototype.loadMore = function (infiniteScroll) {
        var _this = this;
        var url = __WEBPACK_IMPORTED_MODULE_3__app_app_service__["a" /* AppConfig */].API.getOrderList + "?userType=B&start=" + this.start + "&limit=" + this.pageSize;
        if (this.paramsDate != '')
            url += this.paramsDate;
        if (this.paramsStatus != '')
            url += this.paramsStatus;
        this.appService.httpGet(url).then(function (data) {
            infiniteScroll.complete();
            if (_this.start < data.count) {
                (_a = _this.orderList).push.apply(_a, data.data);
                _this.start += _this.pageSize;
                for (var i = 0; i < _this.orderList.length; i++) {
                    _this.isShowDetail[i] = false;
                }
            }
            else if (data.data.length == 0) {
                _this.showInfinite = false;
                _this.showNoMore = true;
            }
            var _a;
        }).catch(function (error) {
            _this.appService.getToken(error, function () {
                _this.loadMore(infiniteScroll);
            });
            _this.showInfinite = false;
            infiniteScroll.complete();
            _this.appService.toast('网络异常，请稍后再试', 1000, 'middle');
            console.log(error);
        });
    };
    //请求失败后刷新
    OrderList.prototype.requestDefeatRefresh = function () {
        this.requestDefeat = false;
        this.loadingShow = true;
        this.start = 0;
        this.orderList = [];
        this.getOrderList();
    };
    return OrderList;
}());
__decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_14" /* ViewChild */])(__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["c" /* Content */]),
    __metadata("design:type", __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["c" /* Content */])
], OrderList.prototype, "content", void 0);
OrderList = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["n" /* Component */])({
        selector: 'order-list',template:/*ion-inline-start:"C:\Users\think\huchunGit\tpb02\tpb\src\pages\order-list\order-list.html"*/'<ion-header>\n\n  <ion-navbar>\n\n    <ion-title text-center>订单列表</ion-title>\n\n    <span class=\'brandshop-order\' (touchstart)="goBrandshoOrder()">\n\n      门店所有订单\n\n    </span>\n\n  </ion-navbar>\n\n  <ion-toolbar class="filter-box">\n\n    <div class="time-box">\n\n      <div class="search-title">选择日期</div>\n\n      <div class="search-list">\n\n        <div class="time-start">\n\n          <ion-datetime (ionChange)="getOrderListByDate()" placeholder="请选择日期" cancelText="取消" doneText="确定" displayFormat="YYYY-MM-DD" max="{{dateStartMax}}" [(ngModel)]="dateStart">\n\n          </ion-datetime>\n\n          <span class="clear" *ngIf="dateStart" (click)="clearDateStart()">X</span>\n\n        </div>\n\n        <span class="go">到</span>\n\n        <div class="time-end">\n\n          <ion-datetime (ionChange)="getOrderListByDate()" placeholder="请选择日期" cancelText="取消" doneText="确定" displayFormat="YYYY-MM-DD" min="{{dateEndMin}}" max="{{dateEndMax}}" [(ngModel)]="dateEnd">\n\n          </ion-datetime> \n\n          <span class="clear" *ngIf="dateEnd" (click)="clearDateEnd()">X</span>\n\n        </div>\n\n      </div>\n\n    </div>\n\n    <div class="status-box">\n\n      <ul>\n\n        <li *ngFor="let orderStatus of orderStatusList, let i = index" [ngClass]="{active:currentStatus == orderStatus.status}" (click)="getCurrentStatus(i)">{{ orderStatus.label }}</li>\n\n      </ul>\n\n    </div>\n\n  </ion-toolbar>\n\n</ion-header>\n\n<ion-content>\n\n  <div class="order-list">\n\n    <!-- loading -->\n\n    <div class="loading-wrapper" *ngIf="loadingShow">\n\n      <div>\n\n        <ion-spinner item-start [name]="load.spinner"></ion-spinner>\n\n      </div>\n\n      <div [innerHTML]="load.content"></div>\n\n    </div>\n\n    <ion-refresher *ngIf="!loadingShow" (ionRefresh)="doRefresh($event)">\n\n      <ion-refresher-content>\n\n      </ion-refresher-content>\n\n    </ion-refresher>\n\n\n\n    <div class="order-items" *ngFor="let order of orderList; let i = index">\n\n      <!-- 订单编号 -->\n\n      <div class="order-title">\n\n        <h2>订单编号：\n\n          <span>{{ order.orderId }}</span>\n\n        </h2>\n\n        <!-- 订单状态-->\n\n        <span [ngClass]="{auditStatus: true, pass:(order.status | setOrderStatus).pass , auditing:(order.status | setOrderStatus).audit} ">{{(order.status | setOrderStatus).status}}</span>\n\n      </div>\n\n      <!-- 商品1 -->\n\n      <div class="order-item" *ngFor="let product of order.orderItemProductSkuDTOS">\n\n        <dl>\n\n          <dt>\n\n            <img class="my-picture" src="{{product.productSkuDTO.fileSeq | productSkuDTOImage}}" [alt]="product.productSkuDTO.productName">\n\n          </dt>\n\n          <dd class="product-title">{{ product.productSkuDTO.productName }}</dd>\n\n          <dd class="sku-list">\n\n            <span *ngFor="let sku of product.productSkuDTO.attrValueList">{{ sku.attrValue }} </span>\n\n          </dd>\n\n          <dd class=\'price\' *ngIf="order.userType != \'B\'">￥{{ product.unitPrice }}</dd>\n\n          <dd class=\'price\' *ngIf="order.userType == \'B\'">商品总额：￥{{ product.unitPrice }}</dd>\n\n          <dd class="count">X{{ product.number }}</dd>\n\n        </dl>\n\n      </div>\n\n\n\n      <!-- 已完成订单 -->\n\n      <div class="orderOperate">\n\n        <dl>\n\n          <dt>\n\n            <a href="tel:{{order.memberMobile}}">\n\n              <img src="./assets/image/phone.png" alt="">\n\n            </a>\n\n          </dt>\n\n          <dd class="total">会员手机：{{ order.memberMobile }}</dd>\n\n          <dd class="member-phone" *ngIf="order.status == 3 || order.status == 6 || order.status == \'C\'">收货时间：{{ order.receiptTime | date:\'yyyy-MM-dd HH:mm:ss\' }}</dd>\n\n          <!-- <dd class="member-phone" *ngIf="order.status == 4">退款时间：{{ order.cancelTime | date:\'yyyy-MM-dd HH:mm:ss\' }}</dd> -->\n\n        </dl>\n\n      </div>\n\n      <div class="order-dtail-box">\n\n        <div class="order-detail" *ngIf="isShowDetail[i]">\n\n          <ul>\n\n            <li>订单总额：￥{{ order.totalAmount }}</li>\n\n            <li>促销抵扣：￥{{ order.discountAmount }}</li>\n\n            <li>淘璞券折扣：￥{{ order.couponAmount }}</li>\n\n            <li>商户券抵扣：￥{{ order.merchantCouponAmount }}</li>\n\n            <li>积分抵扣：￥{{ order.integralAmount }}</li>\n\n          </ul>\n\n        </div>\n\n        <div class="pay-money">\n\n          会员实付金额\n\n          <span>￥{{ order.payAmount }}</span>\n\n          \n\n        </div>\n\n        <div class="btn-show" (click)="showDetail(i)">\n\n          <span *ngIf="isShowDetail[i] == false">点击查看明细</span>\n\n          <span *ngIf="isShowDetail[i] == true">点击收起明细</span>\n\n          <span [ngClass]="{\'icon-triangle\':true, \'icon-bottom\': isShowDetail[i]}"></span>\n\n        </div>\n\n      </div>\n\n    </div>\n\n\n\n    <ion-infinite-scroll (ionInfinite)="loadMore($event)" *ngIf="showInfinite && !loadingShow">\n\n      <ion-infinite-scroll-content loadingText="加载更多..."></ion-infinite-scroll-content>\n\n    </ion-infinite-scroll>\n\n  </div>\n\n  <div class="no-data" *ngIf="noData">\n\n    <img src="./assets/image/nodata.png" alt="">\n\n    <p>空空如也</p>\n\n  </div>\n\n  <div class="btn-noMore" *ngIf="showNoMore">\n\n    <span>—— 没有更多信息了 ——</span>\n\n  </div>\n\n  <div class="request-defeat" *ngIf = "requestDefeat">\n\n    <img src="./assets/image/requestDefeat.png" alt="">\n\n    <p>啊哦！页面走丢了</p>\n\n    <button class="btn-request-defeat" ion-button full (touchstart)="requestDefeatRefresh()">\n\n      刷新再找一找\n\n    </button>\n\n  </div>\n\n</ion-content>'/*ion-inline-end:"C:\Users\think\huchunGit\tpb02\tpb\src\pages\order-list\order-list.html"*/
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["l" /* NavController */],
        __WEBPACK_IMPORTED_MODULE_3__app_app_service__["b" /* AppService */],
        __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["d" /* Events */]])
], OrderList);

//# sourceMappingURL=order-list.js.map

/***/ }),

/***/ 226:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return BrandshopOrderList; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__app_app_service__ = __webpack_require__(4);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



var BrandshopOrderList = BrandshopOrderList_1 = (function () {
    function BrandshopOrderList(navCtrl, appService) {
        this.navCtrl = navCtrl;
        this.appService = appService;
        this.dateStart = '';
        this.dateEnd = '';
        this.isShowDetail = [];
        this.orderList = [];
        this.pageSize = 10;
        this.paramsStatus = '';
        this.paramsDate = '';
        this.noData = false;
        this.start = 0;
        this.showNoMore = false;
        this.loadingShow = true;
        this.load = {};
        this.dateEndMin = '1970'; //结束日期的最小值
        this.dateEndMax = ''; //结束日期的最大值
        this.dateStartMax = ''; //开始日期的最大值
        this.requestDefeat = false;
        this.showInfinite = true;
        this.up = false; //上拉刷新和第一次进入页面时
        this.down = true; //下拉刷新和返回上一级页面时
        this.orderStatusList = [{
                label: "全部",
                status: 'all'
            }, {
                label: "待支付",
                status: '0'
            }, {
                label: "已收货",
                status: '3'
            }, {
                label: "已取消",
                status: '4'
            }, {
                label: "取消中",
                status: '6'
            }, {
                label: "已完成",
                status: 'C'
            }];
        this.currentStatus = this.orderStatusList[0].status;
        this.load = __WEBPACK_IMPORTED_MODULE_2__app_app_service__["a" /* AppConfig */].load;
        this.dateStartMax = this.appService.reserveDate();
        this.dateEndMax = this.appService.reserveDate();
        this.getOrderList();
    }
    // 获取订单列表
    BrandshopOrderList.prototype.getOrderList = function () {
        var _this = this;
        this.loadingShow = true;
        this.noData = false;
        this.requestDefeat = false;
        this.showNoMore = false;
        this.showInfinite = true;
        var url = __WEBPACK_IMPORTED_MODULE_2__app_app_service__["a" /* AppConfig */].API.getOrderList + "?start=" + this.start + "&limit=" + this.pageSize;
        if (this.paramsDate != '')
            url += this.paramsDate;
        if (this.paramsStatus != '')
            url += this.paramsStatus;
        this.appService.httpGet(url).then(function (data) {
            _this.loadingShow = false;
            if (_this.start < data.count) {
                _this.showNoMore = false;
                _this.noData = false;
                _this.start += _this.pageSize;
                _this.showInfinite = true;
                if (_this.up) {
                    (_a = _this.orderList).push.apply(_a, data.data);
                    for (var i = 0; i < _this.orderList.length; i++) {
                        _this.isShowDetail[i] = false;
                    }
                }
                else if (_this.down) {
                    _this.orderList = data.data;
                    for (var i = 0; i < _this.orderList.length; i++) {
                        _this.isShowDetail[i] = false;
                    }
                }
            }
            else if (data.count == 0) {
                _this.noData = true;
                _this.showNoMore = false;
                _this.orderList = [];
            }
            else if (data.data.length == 0) {
                _this.noData = false;
                _this.showNoMore = true;
            }
            var _a;
        }).catch(function (error) {
            _this.appService.getToken(error, function () {
                _this.getOrderList();
            });
            _this.orderList = [];
            _this.loadingShow = false;
            _this.requestDefeat = true;
            console.log(error);
        });
    };
    // 选中时间获取订单
    BrandshopOrderList.prototype.getOrderListByDate = function () {
        this.start = 0;
        this.paramsDate = '';
        this.orderList = [];
        if (this.dateStart != '') {
            this.paramsDate += "&startTime=" + this.dateStart;
            this.dateEndMin = this.dateStart;
        }
        if (this.dateEnd != '') {
            this.paramsDate += "&endTime=" + this.dateEnd;
            this.dateStartMax = this.dateEnd;
        }
        this.content.scrollTo(0, 0, 0);
        this.getOrderList();
    };
    // 点击状态时切换，获取当前订单状态
    BrandshopOrderList.prototype.getCurrentStatus = function (index) {
        this.start = 0;
        this.paramsStatus = '';
        this.orderList = [];
        this.currentStatus = this.orderStatusList[index].status;
        if (this.orderStatusList[index].status != 'all') {
            this.paramsStatus += '&status=' + this.currentStatus;
        }
        this.content.scrollTo(0, 0, 0);
        this.getOrderList();
    };
    // 是否显示明细
    BrandshopOrderList.prototype.showDetail = function (index) {
        this.isShowDetail[index] = !this.isShowDetail[index];
    };
    // 进入门店所有订单
    BrandshopOrderList.prototype.goBrandshoOrder = function () {
        this.navCtrl.push(BrandshopOrderList_1);
    };
    // 清除开始日期
    BrandshopOrderList.prototype.clearDateStart = function () {
        this.dateStart = '';
        this.dateEndMin = '1970';
    };
    // 清除结束日期
    BrandshopOrderList.prototype.clearDateEnd = function () {
        this.dateEnd = '';
        this.dateStartMax = this.appService.reserveDate();
    };
    // 下拉刷新请求数据
    BrandshopOrderList.prototype.doRefresh = function (refresher) {
        var _this = this;
        this.start = 0;
        this.down = true;
        this.up = false;
        this.requestDefeat = false;
        setTimeout(function () {
            _this.getOrderList();
            refresher.complete();
        }, __WEBPACK_IMPORTED_MODULE_2__app_app_service__["a" /* AppConfig */].LOAD_TIME);
        this.showNoMore = false;
    };
    // 上拉加载更多 请求数据
    BrandshopOrderList.prototype.loadMore = function (infiniteScroll) {
        var _this = this;
        var url = __WEBPACK_IMPORTED_MODULE_2__app_app_service__["a" /* AppConfig */].API.getOrderList + "?start=" + this.start + "&limit=" + this.pageSize;
        if (this.paramsDate != '')
            url += this.paramsDate;
        if (this.paramsStatus != '')
            url += this.paramsStatus;
        this.appService.httpGet(url).then(function (data) {
            infiniteScroll.complete();
            if (_this.start < data.count) {
                (_a = _this.orderList).push.apply(_a, data.data);
                _this.start += _this.pageSize;
                for (var i = 0; i < _this.orderList.length; i++) {
                    _this.isShowDetail[i] = false;
                }
            }
            else if (data.data.length == 0) {
                _this.showInfinite = false;
                _this.showNoMore = true;
            }
            var _a;
        }).catch(function (error) {
            _this.appService.getToken(error, function () {
                _this.loadMore(infiniteScroll);
            });
            infiniteScroll.complete();
            _this.showInfinite = false;
            _this.appService.toast('网络异常，请稍后再试', 1000, 'middle');
            console.log(error);
        });
    };
    //请求失败后刷新
    BrandshopOrderList.prototype.requestDefeatRefresh = function () {
        this.requestDefeat = false;
        this.loadingShow = true;
        this.start = 0;
        this.orderList = [];
        this.getOrderList();
    };
    return BrandshopOrderList;
}());
__decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_14" /* ViewChild */])(__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["c" /* Content */]),
    __metadata("design:type", __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["c" /* Content */])
], BrandshopOrderList.prototype, "content", void 0);
BrandshopOrderList = BrandshopOrderList_1 = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["n" /* Component */])({
        selector: 'order-list',template:/*ion-inline-start:"C:\Users\think\huchunGit\tpb02\tpb\src\pages\brandshop-order-list\brandshop-order-list.html"*/'<ion-header>\n\n  <ion-navbar>\n\n    <ion-title text-center>门店订单列表</ion-title>\n\n  </ion-navbar>\n\n  <ion-toolbar class="filter-box">\n\n    <div class="time-box">\n\n      <div class="search-title">选择日期</div>\n\n      <div class="search-list">\n\n        <div class="time-start">\n\n          <ion-datetime (ionChange)="getOrderListByDate()" placeholder="请选择日期" cancelText="取消" doneText="确定" displayFormat="YYYY-MM-DD" max="{{dateStartMax}}" [(ngModel)]="dateStart">\n\n          </ion-datetime>\n\n          <span class="clear" *ngIf="dateStart" (click)="clearDateStart()">X</span>\n\n        </div>\n\n        <span class="go">到</span>\n\n        <div class="time-end">\n\n          <ion-datetime (ionChange)="getOrderListByDate()" placeholder="请选择日期" cancelText="取消" doneText="确定" displayFormat="YYYY-MM-DD" min="{{dateEndMin}}" max="{{dateEndMax}}" [(ngModel)]="dateEnd">\n\n          </ion-datetime>\n\n          <span class="clear" *ngIf="dateEnd" (click)="clearDateEnd()">X</span>\n\n        </div>\n\n      </div>\n\n    </div>\n\n    <div class="status-box">\n\n      <ul>\n\n        <li *ngFor="let orderStatus of orderStatusList, let i = index" [ngClass]="{active:currentStatus == orderStatus.status}" (click)="getCurrentStatus(i)">{{ orderStatus.label }}</li>\n\n      </ul>\n\n    </div>\n\n  </ion-toolbar>\n\n</ion-header>\n\n<ion-content>\n\n  <div class="order-list">\n\n    <!-- loading -->\n\n    <div class="loading-wrapper" *ngIf="loadingShow">\n\n      <div>\n\n        <ion-spinner item-start [name]="load.spinner"></ion-spinner>\n\n      </div>\n\n      <div [innerHTML]="load.content"></div>\n\n    </div>\n\n    <ion-refresher *ngIf="!loadingShow" (ionRefresh)="doRefresh($event)">\n\n      <ion-refresher-content>\n\n      </ion-refresher-content>\n\n    </ion-refresher>\n\n\n\n    <div class="order-items" *ngFor="let order of orderList;let i = index">\n\n        <!-- 订单编号 -->\n\n        <div class="order-title">\n\n          <h2>订单编号：\n\n            <span>{{ order.orderId }}</span>\n\n          </h2>\n\n          <!--color auditing or pass -->\n\n          <span [ngClass]="{auditStatus: true, pass:(order.status | setOrderStatus).pass , auditing:(order.status | setOrderStatus).audit} ">{{(order.status | setOrderStatus).status}}</span>\n\n        </div>\n\n        <!-- 商品1 -->\n\n        <div class="order-item" *ngFor="let product of order.orderItemProductSkuDTOS">\n\n          <dl>\n\n            <dt>\n\n              <img class="my-picture" [src]="product.productSkuDTO.fileSeq | productSkuDTOImage" [alt]="product.productSkuDTO.productName">\n\n            </dt>\n\n            <dd class="product-title">{{ product.productSkuDTO.productName }}</dd>\n\n            <dd class="sku-list">\n\n              <span *ngFor="let sku of product.productSkuDTO.attrValueList">{{ sku.attrValue }} </span>\n\n            </dd>\n\n            <dd class=\'price\' *ngIf="order.userType != \'B\'">￥{{ product.unitPrice }}</dd>\n\n            <dd class=\'price\' *ngIf="order.userType == \'B\'">商品总额：￥{{ product.unitPrice }}</dd>\n\n            <dd class="count">X{{ product.number }}</dd>\n\n          </dl>\n\n        </div>\n\n\n\n        <div class="orderOperate">\n\n          <dl>\n\n            <dt>\n\n              <a href="tel:{{order.memberMobile}}">\n\n                <img src="./assets/image/phone.png" alt="">\n\n              </a>\n\n            </dt>\n\n            <dd class="total">会员手机：{{ order.memberMobile }}</dd>\n\n            <dd class="member-phone" *ngIf="order.status == 3 || order.status == \'C\'">收货时间：{{ order.receiptTime | date:\'yyyy-MM-dd HH:mm:ss\' }}</dd>\n\n            <dd class="member-phone" *ngIf="order.status == 4 && order.userType != \'B\'" >退款时间：{{ order.refundTime | date:\'yyyy-MM-dd HH:mm:ss\' }}</dd>\n\n\n\n          </dl>\n\n        </div>\n\n        <div class="order-dtail-box">\n\n          <div class="order-detail" *ngIf="isShowDetail[i]">\n\n            <ul>\n\n              <li>订单总额：￥{{ order.totalAmount }}</li>\n\n              <li>促销抵扣：￥{{ order.discountAmount }}</li>\n\n              <li>淘璞券折扣：￥{{ order.couponAmount }}</li>\n\n              <li>商户券抵扣：￥{{ order.merchantCouponAmount }}</li>\n\n              <li>积分抵扣：￥{{ order.integralAmount }}</li>\n\n            </ul>\n\n          </div>\n\n          <div class="pay-money">\n\n            会员实付金额\n\n            <span>￥{{ order.payAmount }}</span>\n\n          </div>\n\n          <div class="btn-show" (click)="showDetail(i)">\n\n            <span *ngIf="isShowDetail[i] == false">点击查看明细</span>\n\n            <span *ngIf="isShowDetail[i] == true">点击收起明细</span>\n\n            <span [ngClass]="{\'icon-triangle\':true, \'icon-bottom\': isShowDetail[i]}"></span>\n\n          </div>\n\n        </div>\n\n    </div>\n\n\n\n    <ion-infinite-scroll (ionInfinite)="loadMore($event)"  *ngIf="showInfinite && !loadingShow && !requestDefeat">\n\n      <ion-infinite-scroll-content loadingText="加载更多..."></ion-infinite-scroll-content>\n\n    </ion-infinite-scroll>\n\n\n\n  </div>\n\n  <div class="no-data" *ngIf="noData">\n\n    <img src="./assets/image/nodata.png" alt="">\n\n    <p>空空如也</p>\n\n  </div>\n\n  <div class="btn-noMore" *ngIf="showNoMore">\n\n    <span>—— 没有更多信息了 ——</span>\n\n  </div>\n\n  <div class="request-defeat" *ngIf = "requestDefeat">\n\n    <img src="./assets/image/requestDefeat.png" alt="">\n\n    <p>啊哦！页面走丢了</p>\n\n    <button class="btn-request-defeat" ion-button full (touchstart)="requestDefeatRefresh()">\n\n      刷新再找一找\n\n    </button>\n\n  </div>\n\n</ion-content>'/*ion-inline-end:"C:\Users\think\huchunGit\tpb02\tpb\src\pages\brandshop-order-list\brandshop-order-list.html"*/
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["l" /* NavController */],
        __WEBPACK_IMPORTED_MODULE_2__app_app_service__["b" /* AppService */]])
], BrandshopOrderList);

var BrandshopOrderList_1;
//# sourceMappingURL=brandshop-order-list.js.map

/***/ }),

/***/ 227:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return Personl; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__withdraw_withdraw__ = __webpack_require__(228);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__login_login__ = __webpack_require__(112);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__mycode_mycode__ = __webpack_require__(113);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__detail_tabs_detail_tabs__ = __webpack_require__(229);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__award_tabs_award_tabs__ = __webpack_require__(230);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__withdraw_record_withdraw_record__ = __webpack_require__(231);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__help_help__ = __webpack_require__(232);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__account_add_account_add_account__ = __webpack_require__(120);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__app_app_service__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11__account_edit_account_edit_account__ = __webpack_require__(233);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};












var Personl = (function () {
    function Personl(nav, navCtrl, modalCtrl, viewCtrl, app, appService) {
        this.nav = nav;
        this.navCtrl = navCtrl;
        this.modalCtrl = modalCtrl;
        this.viewCtrl = viewCtrl;
        this.app = app;
        this.appService = appService;
        /* 当前导购员基本信息
         * 用户ID,手机号，门店ID，微信号，身份证
        */
        this.userCurrent = {
            id: '',
            cellphone: '',
            brandshopId: '',
            wechatNumber: '',
            idcard: '',
            boundWechat: false
        };
        /* 当前导购员账户信息
         * 导购员ID，类型账户，已审核金额（旧版本的总金额），可提现金额，审核中金额，已提取金额
         */
        this.userAccount = {
            userId: null,
            acctType: null,
            totalAmount: 0.00,
            balance: 0.00,
            verifyAmount: 0.00,
            withdrawAmount: 0.00,
        };
        /* 临时存储可提现金额，审核中金额，和已提现金额 */
        this.moneyList = {
            balance: 0.00,
            verifyAmount: 0.00,
            withdrawAmount: 0.00
        };
        this.isStar = false;
        this.showImg = 'hide.png';
        this.showText = '隐藏';
        this.pageList = null;
        /* 设置组件名称，方便跳转参数调用 */
        this.pageList = {
            "withdraw": __WEBPACK_IMPORTED_MODULE_2__withdraw_withdraw__["a" /* Withdraw */],
            "myCode": __WEBPACK_IMPORTED_MODULE_4__mycode_mycode__["a" /* MyCode */],
            "detailTabs": __WEBPACK_IMPORTED_MODULE_5__detail_tabs_detail_tabs__["a" /* DetailTabs */],
            "awardTabs": __WEBPACK_IMPORTED_MODULE_6__award_tabs_award_tabs__["a" /* AwardTabs */],
            "withdrawRecord": __WEBPACK_IMPORTED_MODULE_7__withdraw_record_withdraw_record__["a" /* WithdrawRecord */],
            "addAccount": __WEBPACK_IMPORTED_MODULE_9__account_add_account_add_account__["a" /* AddAccount */],
            "help": __WEBPACK_IMPORTED_MODULE_8__help_help__["a" /* Help */],
            "editAccount": __WEBPACK_IMPORTED_MODULE_11__account_edit_account_edit_account__["a" /* EditAccount */]
        };
        this.getCurrent();
        this.getAccount();
    }
    /* 显示和隐藏金额 */
    Personl.prototype.showMoney = function () {
        this.isStar = !this.isStar;
        this.showText = !this.isStar ? '隐藏' : '显示';
        this.showImg = !this.isStar ? 'hide.png' : 'show.png';
        this.userAccount.balance = !this.isStar ? this.moneyList.balance : '*****';
        this.userAccount.verifyAmount = !this.isStar ? this.moneyList.verifyAmount : '*****';
        this.userAccount.withdrawAmount = !this.isStar ? this.moneyList.withdrawAmount : '*****';
    };
    /* 退出登录 */
    Personl.prototype.logOut = function () {
        this.appService.setItem("tpb_token", "");
        this.appService.setItem("stopReturn", "");
        if (window.location.search && window.location.search.split("?")[1].indexOf("code") > -1) {
            window.location.href = window.location.href.split("?")[0];
        }
        else {
            var appNav = this.app.getRootNav();
            appNav.setRoot(__WEBPACK_IMPORTED_MODULE_3__login_login__["a" /* Login */]);
        }
    };
    /* 跳转页面 */
    Personl.prototype.redirectPage = function (page, param1, param2) {
        var _this = this;
        if (!this.userCurrent.boundWechat && page === __WEBPACK_IMPORTED_MODULE_2__withdraw_withdraw__["a" /* Withdraw */]) {
            page = this.pageList.addAccount;
        }
        var pageModal = this.modalCtrl.create(page, { 'param1': param1, 'param2': param2 });
        pageModal.onDidDismiss(function (data) {
            _this.getCurrent();
            _this.getAccount();
        });
        pageModal.present();
    };
    /* 将电话号码格式化 */
    Personl.prototype.formatTelphone = function () {
        this.userCurrent.cellphone = this.userCurrent.cellphone.replace(/(\d{3})\d{4}(\d{4})/, '$1****$2');
    };
    /* 获取当前导购员基本信息 */
    Personl.prototype.getCurrent = function () {
        var _this = this;
        var url = __WEBPACK_IMPORTED_MODULE_10__app_app_service__["a" /* AppConfig */].API.current;
        this.appService.httpGet(url)
            .then(function (data) {
            _this.userCurrent = data;
            _this.formatTelphone();
        })
            .catch(function (error) {
            _this.appService.getToken(error, function () {
                _this.getCurrent();
            });
            console.log(error);
        });
    };
    Personl.prototype.getAccount = function () {
        var _this = this;
        var url = __WEBPACK_IMPORTED_MODULE_10__app_app_service__["a" /* AppConfig */].API.account;
        this.appService.httpGet(url)
            .then(function (data) {
            _this.moneyList.balance = data.balance;
            _this.moneyList.verifyAmount = data.verifyAmount;
            _this.moneyList.withdrawAmount = data.withdrawAmount;
            _this.userAccount = data;
        })
            .catch(function (error) {
            _this.appService.getToken(error, function () {
                _this.getAccount();
            });
            console.log(error);
        });
    };
    Personl.prototype.ionViewDidEnter = function () {
        if ((this.appService.getItem("stopReturn") != "have") && window.location.search && window.location.search.split("?")[1].indexOf("code") > -1) {
            var pageModal = this.modalCtrl.create(this.pageList.addAccount);
            pageModal.present();
        }
    };
    return Personl;
}());
Personl = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["n" /* Component */])({
        selector: 'personl',template:/*ion-inline-start:"C:\Users\think\huchunGit\tpb02\tpb\src\pages\personl\personl.html"*/'<ion-header class="header-title-hidden">\n\n  <ion-navbar>\n\n    <ion-title text-center>我的</ion-title>\n\n  </ion-navbar>\n\n</ion-header>\n\n<ion-content>\n\n  <div class="person-header">\n\n    <ion-grid>\n\n      <ion-row>\n\n        <ion-col col-4>\n\n          <img class="my-picture" src="./assets/image/mypicture.png" alt="我的">\n\n        </ion-col>\n\n        <ion-col col-8>\n\n          <h2>{{ userCurrent.cellphone }}</h2>\n\n          <button ion-button outline round color="light" (touchstart)="redirectPage(pageList.myCode)">\n\n            <img src="./assets/image/qrcode.png" alt="我的">\n\n            我的二维码\n\n          </button>\n\n        </ion-col>\n\n      </ion-row>\n\n    </ion-grid>\n\n  </div>\n\n  <div class="funds">\n\n    <h2 class="funds-title">\n\n      我的资金\n\n      <span class="showTotal" (touchstart)="showMoney()">\n\n        {{ showText }}\n\n      </span>\n\n      <span class="showImg"><img [src]="\'./assets/image/\'+showImg" alt="我的资金"></span>\n\n    </h2>\n\n    <ion-grid>\n\n      <ion-row>\n\n        <ion-col>\n\n          <div class="total"><span>￥</span>{{ userAccount.balance }}</div>\n\n        </ion-col>\n\n      </ion-row>\n\n      <ion-row>\n\n        <ion-col>\n\n          <div class="approve">审核中金额：￥{{ userAccount.verifyAmount }}</div>\n\n        </ion-col>\n\n        <ion-col>\n\n          <div class="withdrawal">已提现：￥{{ userAccount.withdrawAmount }}</div>\n\n        </ion-col>\n\n      </ion-row>\n\n    </ion-grid>\n\n    <ion-grid class="btn-list">\n\n      <ion-row>\n\n        <ion-col col-4>\n\n          <button class="btn-canwithdrawal" ion-button outline round (touchstart)="redirectPage(pageList.detailTabs)">已审核明细</button>\n\n        </ion-col>\n\n        <ion-col col-4>\n\n          <button class="btn-approve" ion-button outline round (touchstart)="redirectPage(pageList.awardTabs)">审核中明细</button>\n\n        </ion-col>\n\n        <ion-col col-4>\n\n          <button class="btn-withdrawal" ion-button outline round (touchstart)="redirectPage(pageList.withdraw, userAccount.balance, userCurrent)">提现</button>\n\n        </ion-col>\n\n      </ion-row>\n\n    </ion-grid>\n\n    <div class="withdrawal-record" (click)="redirectPage(pageList.withdrawRecord, userAccount.withdrawAmount)">\n\n      提现记录\n\n      <span><img src="./assets/image/in.png" alt="提现记录"></span>\n\n    </div>\n\n    <div class="withdrawal-record" (click)="redirectPage(pageList.addAccount, pageList.boundWechat, userCurrent)">\n\n      收款账户\n\n      <span><img src="./assets/image/in.png" alt="收款账户"></span>\n\n    </div>\n\n  </div>\n\n  <div class="help">\n\n    <ul>\n\n      <li (click)="redirectPage(pageList.help)">帮助中心<span><img src="./assets/image/in.png" alt="帮助中心"></span></li>\n\n      <li><a href="tel:4008916161" style="display: block;">客服热线<span>400-891-6161<img src="./assets/image/in.png" alt="客服热线"></span></a></li>\n\n    </ul>\n\n  </div>\n\n  <button class="btn-logout" ion-button (click)="logOut()">退出登录</button>\n\n</ion-content>\n\n'/*ion-inline-end:"C:\Users\think\huchunGit\tpb02\tpb\src\pages\personl\personl.html"*/
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["k" /* Nav */],
        __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["l" /* NavController */],
        __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["j" /* ModalController */],
        __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["q" /* ViewController */],
        __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["b" /* App */],
        __WEBPACK_IMPORTED_MODULE_10__app_app_service__["b" /* AppService */]])
], Personl);

//# sourceMappingURL=personl.js.map

/***/ }),

/***/ 228:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return Withdraw; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__app_app_service__ = __webpack_require__(4);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



var Withdraw = (function () {
    function Withdraw(navCtrl, navParams, alertCtrl, appService) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.alertCtrl = alertCtrl;
        this.appService = appService;
        this.balance = '';
        this.isAllow = true;
        this.getBalance();
    }
    /* 获取可提现金额 */
    Withdraw.prototype.getBalance = function () {
        console.log(this.navParams.get("param1"));
        this.balance = this.navParams.get("param1");
    };
    /* 提现 */
    Withdraw.prototype.withdraw = function () {
        var _this = this;
        if (!this.isAllow) {
            return;
        }
        this.isAllow = false;
        var url = "" + __WEBPACK_IMPORTED_MODULE_2__app_app_service__["a" /* AppConfig */].API.withdraw;
        var body = Number(Number(this.amount).toFixed(2));
        this.appService.httpPost(url, body).then(function (data) {
            _this.isAllow = true;
        }).catch(function (error) {
            _this.appService.getToken(error, function () {
                _this.withdraw();
            });
            if (error.type) {
                var alert_1 = _this.alertCtrl.create({
                    title: '提示',
                    subTitle: error.message,
                    buttons: ['确定']
                });
                alert_1.present();
            }
            console.log(error);
            _this.isAllow = true;
        });
    };
    return Withdraw;
}());
Withdraw = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["n" /* Component */])({
        selector: 'withdraw',template:/*ion-inline-start:"C:\Users\think\huchunGit\tpb02\tpb\src\pages\withdraw\withdraw.html"*/'<ion-header>\n\n  <ion-navbar>\n\n    <ion-title text-center>提现</ion-title>\n\n  </ion-navbar>\n\n</ion-header>\n\n<ion-content>\n\n  <div class="withdraw">\n\n    <h2>输入提现金额</h2>\n\n    <ion-item>\n\n    <ion-label>￥</ion-label>\n\n    <ion-input type="number" [(ngModel)]="amount"></ion-input>\n\n  </ion-item>\n\n  <div class="message">*当前最多可提现金额：<span>￥{{ balance }}</span></div>\n\n  <div class="error" *ngIf="amout > allAmout">*金额值不可大于当前最多可提现金额值</div>\n\n  <button [disabled]="!(amount > 0) || (amount > balance)" class="btn-confirm" ion-button (click)="withdraw()">确定</button>\n\n  </div>\n\n</ion-content>\n\n'/*ion-inline-end:"C:\Users\think\huchunGit\tpb02\tpb\src\pages\withdraw\withdraw.html"*/
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["l" /* NavController */],
        __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["m" /* NavParams */],
        __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["a" /* AlertController */],
        __WEBPACK_IMPORTED_MODULE_2__app_app_service__["b" /* AppService */]])
], Withdraw);

//# sourceMappingURL=withdraw.js.map

/***/ }),

/***/ 229:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return DetailTabs; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_ionic_angular__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__app_app_service__ = __webpack_require__(4);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



var DetailTabs = (function () {
    function DetailTabs(navController, navParams, viewController, platform, appService) {
        this.navController = navController;
        this.navParams = navParams;
        this.viewController = viewController;
        this.platform = platform;
        this.appService = appService;
        this.statusList = [];
        this.pageSize = 10;
        this.currentPage = 1;
        this.currentStatus = 0;
        this.orderDetail = [];
        this.awardDetail = [];
        this.count = 0;
        this.start = 0;
        this.up = false;
        this.down = true;
        this.isShow = false;
        this.isEmpty = false;
        this.requestFail = false;
        this.isRefresh = true;
        this.isLoadingShow = false;
        this.showNoMore = false;
        this.load = {};
        this.loadingShow = true;
        this.noData = false;
        this.requestDefeat = false;
        this.showInfinite = false;
        this.limit = 10;
        this.statusList = [{
                label: "订单处理金额明细",
                status: 0
            }, {
                label: "奖励活动金额明细",
                status: 1
            }];
        this.load = __WEBPACK_IMPORTED_MODULE_2__app_app_service__["a" /* AppConfig */].load;
        this.getOrderDetail();
        this.getBonusSum1();
    }
    DetailTabs.prototype.getCurrentStatus = function (i) {
        this.start = 0;
        this.up = false;
        this.down = true;
        this.currentStatus = this.statusList[i].label;
        this.currentStatus = i;
        this.content.scrollTo(0, 0, 0);
        if (this.currentStatus == 0) {
            this.getOrderDetail();
            this.getBonusSum1();
        }
        else {
            this.getAwardDetail();
            this.getBonusSum2();
        }
    };
    DetailTabs.prototype.getOrderDetail = function () {
        var _this = this;
        this.loadingShow = true;
        this.showNoMore = false;
        this.noData = false;
        this.requestDefeat = false;
        var url = __WEBPACK_IMPORTED_MODULE_2__app_app_service__["a" /* AppConfig */].API.bonusList + "?typeList=1&statusList=2&start=" + this.start + "&limit=" + this.pageSize;
        this.appService.httpGet(url)
            .then(function (data) {
            _this.loadingShow = false;
            if (_this.start < data.count) {
                _this.showNoMore = false;
                _this.noData = false;
                _this.start += _this.limit;
                _this.showInfinite = true;
                if (_this.up) {
                    data.data.map(function (item) {
                        item.baseAmount = item.baseAmount.toFixed(2);
                        item.percent = item.percent;
                        item.amount = item.amount.toFixed(2);
                        item.returnAmount = item.returnAmount.toFixed(2);
                    });
                    (_a = _this.orderDetail).push.apply(_a, data.data);
                }
                else if (_this.down) {
                    data.data.map(function (item) {
                        item.baseAmount = item.baseAmount.toFixed(2);
                        item.percent = item.percent;
                        item.amount = item.amount.toFixed(2);
                        item.returnAmount = item.returnAmount.toFixed(2);
                    });
                    _this.orderDetail = data.data;
                }
            }
            else if (data.count == 0) {
                _this.noData = true;
                _this.showNoMore = false;
                _this.orderDetail = [];
            }
            else if (data.data.length == 0) {
                _this.noData = false;
                _this.showNoMore = true;
            }
            var _a;
        }).catch(function (error) {
            _this.appService.getToken(error, function () {
                _this.getOrderDetail();
            });
            console.log(error);
            _this.requestFail = true;
            _this.isEmpty = false;
            _this.isLoadingShow = false;
        });
    };
    /** 获取总金额 **/
    DetailTabs.prototype.getBonusSum1 = function () {
        var _this = this;
        var url = __WEBPACK_IMPORTED_MODULE_2__app_app_service__["a" /* AppConfig */].API.bonusSum + "?typeList=1&statusList=2";
        this.appService.httpGet(url)
            .then(function (data) {
            _this.sum = data.sum;
            _this.setIsShow(_this.sum);
        }).catch(function (error) {
            _this.appService.getToken(error, function () {
                _this.getBonusSum1();
            });
            console.log(error);
        });
    };
    DetailTabs.prototype.getAwardDetail = function () {
        var _this = this;
        this.loadingShow = true;
        this.showNoMore = false;
        this.noData = false;
        this.requestDefeat = false;
        var url = __WEBPACK_IMPORTED_MODULE_2__app_app_service__["a" /* AppConfig */].API.bonusList + "?typeList=3,4&statusList=2&start=" + this.start + "&limit=" + this.pageSize;
        this.appService.httpGet(url)
            .then(function (data) {
            _this.loadingShow = false;
            if (_this.start < data.count) {
                _this.showNoMore = false;
                _this.noData = false;
                _this.start += _this.limit;
                _this.showInfinite = true;
                if (_this.up) {
                    data.data.map(function (item) {
                        item.baseAmount = item.baseAmount.toFixed(2);
                        item.percent = item.percent;
                        item.amount = item.amount.toFixed(2);
                        item.returnAmount = item.returnAmount.toFixed(2);
                    });
                    (_a = _this.awardDetail).push.apply(_a, data.data);
                }
                else if (_this.down) {
                    data.data.map(function (item) {
                        item.baseAmount = item.baseAmount.toFixed(2);
                        item.percent = item.percent;
                        item.amount = item.amount.toFixed(2);
                        item.returnAmount = item.returnAmount.toFixed(2);
                    });
                    _this.awardDetail = data.data;
                }
            }
            else if (data.count == 0) {
                _this.noData = true;
                _this.showNoMore = false;
                _this.awardDetail = [];
            }
            else if (data.data.length == 0) {
                _this.noData = false;
                _this.showNoMore = true;
            }
            var _a;
        }).catch(function (error) {
            _this.appService.getToken(error, function () {
                _this.getAwardDetail();
            });
            console.log(error);
            _this.requestFail = true;
            _this.isEmpty = false;
            _this.isLoadingShow = false;
        });
    };
    /** 获取总金额 **/
    DetailTabs.prototype.getBonusSum2 = function () {
        var _this = this;
        var url = __WEBPACK_IMPORTED_MODULE_2__app_app_service__["a" /* AppConfig */].API.bonusSum + "?typeList=3,4&statusList=2";
        this.appService.httpGet(url)
            .then(function (data) {
            _this.sum = data.sum;
            _this.setIsShow(_this.sum);
        }).catch(function (error) {
            _this.appService.getToken(error, function () {
                _this.getBonusSum2();
            });
            console.log(error);
        });
    };
    /** 有无明细列表时的判断（判断总金额是否为0）**/
    DetailTabs.prototype.setIsShow = function (sum) {
        return this.isShow = sum > 0 ? true : false;
    };
    /** 上拉翻页 **/
    DetailTabs.prototype.loadMore = function (infiniteScroll) {
        var _this = this;
        if (this.currentStatus == 0) {
            var url = __WEBPACK_IMPORTED_MODULE_2__app_app_service__["a" /* AppConfig */].API.bonusList + "?typeList=1&statusList=2&start=" + this.start + "&limit=" + this.pageSize;
            this.appService.httpGet(url)
                .then(function (data) {
                infiniteScroll.complete();
                if (data.data.length != 0) {
                    data.data.map(function (item) {
                        item.baseAmount = item.baseAmount.toFixed(2);
                        item.percent = item.percent;
                        item.amount = item.amount.toFixed(2);
                        item.returnAmount = item.returnAmount.toFixed(2);
                    });
                    (_a = _this.orderDetail).push.apply(_a, data.data);
                    _this.start += _this.limit;
                }
                else {
                    _this.showNoMore = true;
                }
                var _a;
            }).catch(function (error) {
                _this.appService.getToken(error, function () {
                    _this.loadMore(infiniteScroll);
                });
                console.log(error);
                _this.requestFail = true;
                _this.isEmpty = false;
                _this.isLoadingShow = false;
            });
        }
        else {
            var url = __WEBPACK_IMPORTED_MODULE_2__app_app_service__["a" /* AppConfig */].API.bonusList + "?typeList=3,4&statusList=2&start=" + this.start + "&limit=" + this.pageSize;
            this.appService.httpGet(url)
                .then(function (data) {
                infiniteScroll.complete();
                if (data.data.length != 0) {
                    data.data.map(function (item) {
                        item.baseAmount = item.baseAmount.toFixed(2);
                        item.percent = item.percent;
                        item.amount = item.amount.toFixed(2);
                        item.returnAmount = item.returnAmount.toFixed(2);
                    });
                    (_a = _this.awardDetail).push.apply(_a, data.data);
                    _this.start += _this.limit;
                }
                else {
                    _this.showNoMore = true;
                }
                var _a;
            }).catch(function (error) {
                _this.appService.getToken(error, function () {
                    _this.loadMore(infiniteScroll);
                });
                console.log(error);
                _this.requestFail = true;
                _this.isEmpty = false;
                _this.isLoadingShow = false;
            });
        }
    };
    /** 下拉刷新页面 **/
    DetailTabs.prototype.pullRefresh = function (refresher) {
        var _this = this;
        this.start = 0;
        this.down = true;
        this.up = false;
        this.requestDefeat = false;
        setTimeout(function () {
            if (_this.currentStatus == 0) {
                _this.getOrderDetail();
                _this.getBonusSum1();
            }
            else {
                _this.getAwardDetail();
                _this.getBonusSum2();
            }
            refresher.complete();
        }, __WEBPACK_IMPORTED_MODULE_2__app_app_service__["a" /* AppConfig */].LOAD_TIME);
        this.showNoMore = false;
    };
    return DetailTabs;
}());
__decorate([
    Object(__WEBPACK_IMPORTED_MODULE_1__angular_core__["_14" /* ViewChild */])(__WEBPACK_IMPORTED_MODULE_0_ionic_angular__["c" /* Content */]),
    __metadata("design:type", __WEBPACK_IMPORTED_MODULE_0_ionic_angular__["c" /* Content */])
], DetailTabs.prototype, "content", void 0);
DetailTabs = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_1__angular_core__["n" /* Component */])({template:/*ion-inline-start:"C:\Users\think\huchunGit\tpb02\tpb\src\pages\detail-tabs\detail-tabs.html"*/'<ion-header>\n\n  <ion-navbar>\n\n    <ion-title text-center>已审核明细</ion-title>\n\n  </ion-navbar>\n\n  <ion-toolbar class="filter-box">\n\n    <div class="status-box">\n\n      <ul>\n\n        <li *ngFor="let orderStatus of statusList, let i = index" [ngClass]="{active:currentStatus == orderStatus.status}" (click)="getCurrentStatus(i)">{{ orderStatus.label }}</li>\n\n      </ul>\n\n    </div>\n\n  </ion-toolbar>\n\n</ion-header>\n\n<ion-content>\n\n  <div class="loading-wrapper" *ngIf="isLoadingShow">\n\n    <div>\n\n      <ion-spinner item-start [name]="load.spinner"></ion-spinner>\n\n    </div>\n\n    <div [innerHTML]="load.content"></div>\n\n  </div>\n\n  \n\n  <ion-refresher (ionRefresh)="pullRefresh($event)" *ngIf="!loadingShow" style="margin-top: 50px;z-index:100">\n\n    <ion-refresher-content></ion-refresher-content>\n\n  </ion-refresher>\n\n  <div class="withdraw-record">\n\n    <div class="withdraw-total">\n\n      <span *ngIf="isShow">总金额：￥ {{ sum }}</span>\n\n    </div>\n\n    <div class="record-list1" *ngIf="currentStatus == 0">\n\n      <div class="withdraw-item" *ngFor="let item of orderDetail">\n\n        <ul>\n\n          <li class=\'order-number\'>订单编号：{{ item.relateId }}</li>\n\n          <li class=\'base-number\'>结算基数：￥{{ item.baseAmount }}</li>\n\n          <li class=\'percentage\'>奖励比例：{{ item.percent }}</li>\n\n          <li class="money">奖励金额：￥{{ item.amount }}</li>\n\n        </ul>\n\n      </div>\n\n      <div class="no-data" *ngIf="noData">\n\n        <img src="./assets/image/nodata.png" alt="">\n\n        <p>空空如也</p>\n\n      </div>\n\n      <div class="btn-noMore" *ngIf="showNoMore">\n\n        <span>—— 没有更多赠品了 ——</span>\n\n      </div>\n\n      <div class="request-defeat" *ngIf = "requestDefeat">\n\n        <img src="./assets/image/requestDefeat.png" alt="">\n\n        <p>啊哦！页面走丢了</p>\n\n        <button class="btn-request-defeat" ion-button full (touchstart)="requestDefeatRefreshExpressGift()">\n\n          刷新再找一找\n\n        </button>\n\n      </div>\n\n      <ion-infinite-scroll (ionInfinite)="loadMore($event)" *ngIf="!showNoMore && showInfinite">\n\n        <ion-infinite-scroll-content loadingText="加载更多..."></ion-infinite-scroll-content>\n\n      </ion-infinite-scroll>\n\n    </div>\n\n    <div class="record-list2" *ngIf="currentStatus == 1">\n\n      <div class="withdraw-item" *ngFor="let item of awardDetail">\n\n        <ul>\n\n          <li class=\'order-number\'>\n\n            <span *ngIf="item.type === 3">订单编号：{{ item.relateId }}</span>\n\n            <span *ngIf="item.type === 4">会员手机：{{ item.mobile }}</span>\n\n          </li>\n\n          <li class=\'date\'>活动时间：{{ item.startTime | date:\'yyyy.MM.dd\' }}--{{ item.endTime | date:\'yyyy.MM.dd\' }} </li>\n\n          <li class=\'base-number\'>\n\n            <span *ngIf="item.type === 3">结算基数：￥{{ item.baseAmount }}</span>\n\n            <span *ngIf="item.type === 4">结算基数：——</span>\n\n          </li>\n\n          <li class=\'percentage\'>\n\n            <span *ngIf="item.type === 3">奖励比例：{{ item.percent }}</span>\n\n            <span *ngIf="item.type === 4">奖励比例：——</span>\n\n          </li>\n\n          <li class="money">奖励金额：￥{{ item.amount }}</li>\n\n        </ul>\n\n      </div>\n\n      <div class="no-data" *ngIf="noData">\n\n          <img src="./assets/image/nodata.png" alt="">\n\n          <p>空空如也</p>\n\n        </div>\n\n        <div class="btn-noMore" *ngIf="showNoMore">\n\n          <span>—— 没有更多赠品了 ——</span>\n\n        </div>\n\n        <div class="request-defeat" *ngIf = "requestDefeat">\n\n          <img src="./assets/image/requestDefeat.png" alt="">\n\n          <p>啊哦！页面走丢了</p>\n\n          <button class="btn-request-defeat" ion-button full (touchstart)="requestDefeatRefreshExpressGift()">\n\n            刷新再找一找\n\n          </button>\n\n        </div>\n\n        <ion-infinite-scroll (ionInfinite)="loadMore($event)" *ngIf="!showNoMore && showInfinite">\n\n          <ion-infinite-scroll-content loadingText="加载更多..."></ion-infinite-scroll-content>\n\n        </ion-infinite-scroll>\n\n      \n\n    </div>\n\n\n\n  </div>\n\n  <div class="request-defeat" *ngIf="requestFail">\n\n    <img src="./assets/image/requestDefeat.png" alt="">\n\n    <p>啊哦！页面走丢了</p>\n\n    <button class="btn-request-defeat" ion-button full (touchstart)="refresh()">\n\n      刷新再找一找\n\n    </button>\n\n  </div>\n\n  <ion-infinite-scroll (ionInfinite)="loadMore($event)" *ngIf="orderDetail.length < count">\n\n    <ion-infinite-scroll-content loadingSpinner="bubbles" loadingText="加载中">\n\n    </ion-infinite-scroll-content>\n\n  </ion-infinite-scroll>\n\n</ion-content>'/*ion-inline-end:"C:\Users\think\huchunGit\tpb02\tpb\src\pages\detail-tabs\detail-tabs.html"*/,
        selector: 'withdraw-detailTabs'
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_0_ionic_angular__["l" /* NavController */], __WEBPACK_IMPORTED_MODULE_0_ionic_angular__["m" /* NavParams */], __WEBPACK_IMPORTED_MODULE_0_ionic_angular__["q" /* ViewController */], __WEBPACK_IMPORTED_MODULE_0_ionic_angular__["n" /* Platform */], __WEBPACK_IMPORTED_MODULE_2__app_app_service__["b" /* AppService */]])
], DetailTabs);

//# sourceMappingURL=detail-tabs.js.map

/***/ }),

/***/ 230:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AwardTabs; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_ionic_angular__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__app_app_service__ = __webpack_require__(4);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



var AwardTabs = (function () {
    function AwardTabs(navController, navParams, viewController, platform, appService) {
        this.navController = navController;
        this.navParams = navParams;
        this.viewController = viewController;
        this.platform = platform;
        this.appService = appService;
        this.statusList = [];
        this.pageSize = 10;
        this.currentPage = 1;
        this.currentStatus = 0;
        this.orderDetail = [];
        this.awardDetail = [];
        this.count = 0;
        this.start = 0;
        this.up = false;
        this.down = true;
        this.isShow = false;
        this.isEmpty = false;
        this.requestFail = false;
        this.isRefresh = true;
        this.isLoadingShow = false;
        this.showNoMore = false;
        this.load = {};
        this.loadingShow = true;
        this.noData = false;
        this.requestDefeat = false;
        this.showInfinite = false;
        this.limit = 10;
        this.statusList = [{
                label: "订单处理金额明细",
                status: 0
            }, {
                label: "奖励活动金额明细",
                status: 1
            }];
        this.load = __WEBPACK_IMPORTED_MODULE_2__app_app_service__["a" /* AppConfig */].load;
        this.getOrderDetail();
        this.getBonusSum1();
    }
    AwardTabs.prototype.getCurrentStatus = function (i) {
        this.start = 0;
        this.up = false;
        this.down = true;
        this.currentStatus = this.statusList[i].label;
        this.currentStatus = i;
        this.content.scrollTo(0, 0, 0);
        if (this.currentStatus == 0) {
            this.getOrderDetail();
            this.getBonusSum1();
        }
        else {
            this.getAwardDetail();
            this.getBonusSum2();
        }
    };
    AwardTabs.prototype.getOrderDetail = function () {
        var _this = this;
        this.loadingShow = true;
        this.showNoMore = false;
        this.noData = false;
        this.requestDefeat = false;
        var url = __WEBPACK_IMPORTED_MODULE_2__app_app_service__["a" /* AppConfig */].API.bonusList + "?typeList=1&statusList=0,1&start=" + this.start + "&limit=" + this.pageSize;
        this.appService.httpGet(url)
            .then(function (data) {
            _this.loadingShow = false;
            if (_this.start < data.count) {
                _this.showNoMore = false;
                _this.noData = false;
                _this.start += _this.limit;
                _this.showInfinite = true;
                if (_this.up) {
                    data.data.map(function (item) {
                        item.baseAmount = item.baseAmount.toFixed(2);
                        item.percent = item.percent;
                        item.amount = item.amount.toFixed(2);
                        item.returnAmount = item.returnAmount.toFixed(2);
                    });
                    (_a = _this.orderDetail).push.apply(_a, data.data);
                }
                else if (_this.down) {
                    data.data.map(function (item) {
                        item.baseAmount = item.baseAmount.toFixed(2);
                        item.percent = item.percent;
                        item.amount = item.amount.toFixed(2);
                        item.returnAmount = item.returnAmount.toFixed(2);
                    });
                    _this.orderDetail = data.data;
                }
            }
            else if (data.count == 0) {
                _this.noData = true;
                _this.showNoMore = false;
                _this.orderDetail = [];
            }
            else if (data.data.length == 0) {
                _this.noData = false;
                _this.showNoMore = true;
            }
            var _a;
        }).catch(function (error) {
            _this.appService.getToken(error, function () {
                _this.getOrderDetail();
            });
            console.log(error);
            _this.requestFail = true;
            _this.isEmpty = false;
            _this.isLoadingShow = false;
        });
    };
    /** 获取总金额 **/
    AwardTabs.prototype.getBonusSum1 = function () {
        var _this = this;
        var url = __WEBPACK_IMPORTED_MODULE_2__app_app_service__["a" /* AppConfig */].API.bonusSum + "?typeList=1&statusList=0,1";
        this.appService.httpGet(url)
            .then(function (data) {
            _this.sum = data.sum;
            _this.setIsShow(_this.sum);
        }).catch(function (error) {
            _this.appService.getToken(error, function () {
                _this.getBonusSum1();
            });
            console.log(error);
        });
    };
    AwardTabs.prototype.getAwardDetail = function () {
        var _this = this;
        this.loadingShow = true;
        this.showNoMore = false;
        this.noData = false;
        this.requestDefeat = false;
        var url = __WEBPACK_IMPORTED_MODULE_2__app_app_service__["a" /* AppConfig */].API.bonusList + "?typeList=3,4&statusList=0,1&start=" + this.start + "&limit=" + this.pageSize;
        this.appService.httpGet(url)
            .then(function (data) {
            _this.loadingShow = false;
            if (_this.start < data.count) {
                _this.showNoMore = false;
                _this.noData = false;
                _this.start += _this.limit;
                _this.showInfinite = true;
                if (_this.up) {
                    data.data.map(function (item) {
                        item.baseAmount = item.baseAmount.toFixed(2);
                        item.percent = item.percent;
                        item.amount = item.amount.toFixed(2);
                        item.returnAmount = item.returnAmount.toFixed(2);
                    });
                    (_a = _this.awardDetail).push.apply(_a, data.data);
                }
                else if (_this.down) {
                    data.data.map(function (item) {
                        item.baseAmount = item.baseAmount.toFixed(2);
                        item.percent = item.percent;
                        item.amount = item.amount.toFixed(2);
                        item.returnAmount = item.returnAmount.toFixed(2);
                    });
                    _this.awardDetail = data.data;
                }
            }
            else if (data.count == 0) {
                _this.noData = true;
                _this.showNoMore = false;
                _this.awardDetail = [];
            }
            else if (data.data.length == 0) {
                _this.noData = false;
                _this.showNoMore = true;
            }
            var _a;
        }).catch(function (error) {
            _this.appService.getToken(error, function () {
                _this.getAwardDetail();
            });
            console.log(error);
            _this.requestFail = true;
            _this.isEmpty = false;
            _this.isLoadingShow = false;
        });
    };
    /** 获取总金额 **/
    AwardTabs.prototype.getBonusSum2 = function () {
        var _this = this;
        var url = __WEBPACK_IMPORTED_MODULE_2__app_app_service__["a" /* AppConfig */].API.bonusSum + "?typeList=3,4&statusList=0,1";
        this.appService.httpGet(url)
            .then(function (data) {
            _this.sum = data.sum;
            _this.setIsShow(_this.sum);
        }).catch(function (error) {
            _this.appService.getToken(error, function () {
                _this.getBonusSum2();
            });
            console.log(error);
        });
    };
    /** 有无明细列表时的判断（判断总金额是否为0）**/
    AwardTabs.prototype.setIsShow = function (sum) {
        return this.isShow = sum > 0 ? true : false;
    };
    /** 上拉翻页 **/
    AwardTabs.prototype.loadMore = function (infiniteScroll) {
        var _this = this;
        if (this.currentStatus == 0) {
            var url = __WEBPACK_IMPORTED_MODULE_2__app_app_service__["a" /* AppConfig */].API.bonusList + "?typeList=1&statusList=0,1&start=" + this.start + "&limit=" + this.pageSize;
            this.appService.httpGet(url)
                .then(function (data) {
                infiniteScroll.complete();
                if (data.data.length != 0) {
                    data.data.map(function (item) {
                        item.baseAmount = item.baseAmount.toFixed(2);
                        item.percent = item.percent;
                        item.amount = item.amount.toFixed(2);
                        item.returnAmount = item.returnAmount.toFixed(2);
                    });
                    (_a = _this.orderDetail).push.apply(_a, data.data);
                    _this.start += _this.limit;
                }
                else {
                    _this.showNoMore = true;
                }
                var _a;
            }).catch(function (error) {
                _this.appService.getToken(error, function () {
                    _this.loadMore(infiniteScroll);
                });
                console.log(error);
                _this.requestFail = true;
                _this.isEmpty = false;
                _this.isLoadingShow = false;
            });
        }
        else {
            var url = __WEBPACK_IMPORTED_MODULE_2__app_app_service__["a" /* AppConfig */].API.bonusList + "?typeList=3,4&statusList=0,1&start=" + this.start + "&limit=" + this.pageSize;
            this.appService.httpGet(url)
                .then(function (data) {
                infiniteScroll.complete();
                if (data.data.length != 0) {
                    data.data.map(function (item) {
                        item.baseAmount = item.baseAmount.toFixed(2);
                        item.percent = item.percent;
                        item.amount = item.amount.toFixed(2);
                        item.returnAmount = item.returnAmount.toFixed(2);
                    });
                    (_a = _this.awardDetail).push.apply(_a, data.data);
                    _this.start += _this.limit;
                }
                else {
                    _this.showNoMore = true;
                }
                var _a;
            }).catch(function (error) {
                _this.appService.getToken(error, function () {
                    _this.loadMore(infiniteScroll);
                });
                console.log(error);
                _this.requestFail = true;
                _this.isEmpty = false;
                _this.isLoadingShow = false;
            });
        }
    };
    /** 下拉刷新页面 **/
    AwardTabs.prototype.pullRefresh = function (refresher) {
        var _this = this;
        this.start = 0;
        this.down = true;
        this.up = false;
        this.requestDefeat = false;
        setTimeout(function () {
            if (_this.currentStatus == 0) {
                _this.getOrderDetail();
                _this.getBonusSum1();
            }
            else {
                _this.getAwardDetail();
                _this.getBonusSum2();
            }
            refresher.complete();
        }, __WEBPACK_IMPORTED_MODULE_2__app_app_service__["a" /* AppConfig */].LOAD_TIME);
        this.showNoMore = false;
    };
    return AwardTabs;
}());
__decorate([
    Object(__WEBPACK_IMPORTED_MODULE_1__angular_core__["_14" /* ViewChild */])(__WEBPACK_IMPORTED_MODULE_0_ionic_angular__["c" /* Content */]),
    __metadata("design:type", __WEBPACK_IMPORTED_MODULE_0_ionic_angular__["c" /* Content */])
], AwardTabs.prototype, "content", void 0);
AwardTabs = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_1__angular_core__["n" /* Component */])({
        selector: 'award-tabs',template:/*ion-inline-start:"C:\Users\think\huchunGit\tpb02\tpb\src\pages\award-tabs\award-tabs.html"*/'<ion-header>\n\n  <ion-navbar>\n\n    <ion-title text-center>审核中明细</ion-title>\n\n  </ion-navbar>\n\n  <ion-toolbar class="filter-box">\n\n    <div class="status-box">\n\n      <ul>\n\n        <li *ngFor="let orderStatus of statusList, let i = index" [ngClass]="{active:currentStatus == orderStatus.status}" (click)="getCurrentStatus(i)">{{ orderStatus.label }}</li>\n\n      </ul>\n\n    </div>\n\n  </ion-toolbar>\n\n</ion-header>\n\n<ion-content>\n\n  <div class="loading-wrapper" *ngIf="isLoadingShow">\n\n    <div>\n\n      <ion-spinner item-start [name]="load.spinner"></ion-spinner>\n\n    </div>\n\n    <div [innerHTML]="load.content"></div>\n\n  </div>\n\n  <ion-refresher (ionRefresh)="pullRefresh($event)" *ngIf="!loadingShow" style="margin-top: 50px;z-index:100">\n\n    <ion-refresher-content></ion-refresher-content>\n\n  </ion-refresher>\n\n  <div class="withdraw-record">\n\n    <div class="withdraw-total">\n\n      <span *ngIf="isShow">总金额：￥ {{ sum }}</span>\n\n    </div>\n\n    <div class="record-list1" *ngIf="currentStatus == 0">\n\n      <div class="withdraw-item" *ngFor="let item of orderDetail">\n\n        <ul>\n\n          <li class=\'order-number\'>订单编号：{{ item.relateId }}</li>\n\n          <li class=\'base-number\'>结算基数：￥{{ item.baseAmount }}</li>\n\n          <li class=\'percentage\'>奖励比例：{{ item.percent }}</li>\n\n          <li class="money">奖励金额：￥{{ item.amount }}</li>\n\n        </ul>\n\n      </div>\n\n      <div class="no-data" *ngIf="noData">\n\n        <img src="./assets/image/nodata.png" alt="">\n\n        <p>空空如也</p>\n\n      </div>\n\n      <div class="btn-noMore" *ngIf="showNoMore">\n\n        <span>—— 没有更多赠品了 ——</span>\n\n      </div>\n\n      <div class="request-defeat" *ngIf="requestDefeat">\n\n        <img src="./assets/image/requestDefeat.png" alt="">\n\n        <p>啊哦！页面走丢了</p>\n\n        <button class="btn-request-defeat" ion-button full (touchstart)="requestDefeatRefreshExpressGift()">\n\n          刷新再找一找\n\n        </button>\n\n      </div>\n\n      <ion-infinite-scroll (ionInfinite)="loadMore($event)" *ngIf="!showNoMore && showInfinite">\n\n        <ion-infinite-scroll-content loadingText="加载更多..."></ion-infinite-scroll-content>\n\n      </ion-infinite-scroll>\n\n    </div>\n\n    <div class="record-list2" *ngIf="currentStatus == 1">\n\n      <div class="withdraw-item" *ngFor="let item of awardDetail">\n\n        <ul>\n\n          <li class=\'order-number\'>\n\n            <span *ngIf="item.type === 3">订单编号：{{ item.relateId }}</span>\n\n            <span *ngIf="item.type === 4">会员手机：{{ item.mobile }}</span>\n\n          </li>\n\n          <li class=\'date\'>活动时间：{{ item.startTime | date:\'yyyy.MM.dd\' }}--{{ item.endTime | date:\'yyyy.MM.dd\' }} </li>\n\n          <li class=\'base-number\'>\n\n            <span *ngIf="item.type === 3">结算基数：￥{{ item.baseAmount }}</span>\n\n            <span *ngIf="item.type === 4">结算基数：——</span>\n\n          </li>\n\n          <li class=\'percentage\'>\n\n            <span *ngIf="item.type === 3">奖励比例：{{ item.percent }}</span>\n\n            <span *ngIf="item.type === 4">奖励比例：——</span>\n\n          </li>\n\n          <li class="money">奖励金额：￥{{ item.amount }}</li>\n\n        </ul>\n\n      </div>\n\n      <div class="no-data" *ngIf="noData">\n\n        <img src="./assets/image/nodata.png" alt="">\n\n        <p>空空如也</p>\n\n      </div>\n\n      <div class="btn-noMore" *ngIf="showNoMore">\n\n        <span>—— 没有更多赠品了 ——</span>\n\n      </div>\n\n      <div class="request-defeat" *ngIf="requestDefeat">\n\n        <img src="./assets/image/requestDefeat.png" alt="">\n\n        <p>啊哦！页面走丢了</p>\n\n        <button class="btn-request-defeat" ion-button full (touchstart)="requestDefeatRefreshExpressGift()">\n\n          刷新再找一找\n\n        </button>\n\n      </div>\n\n      <ion-infinite-scroll (ionInfinite)="loadMore($event)" *ngIf="!showNoMore && showInfinite">\n\n        <ion-infinite-scroll-content loadingText="加载更多..."></ion-infinite-scroll-content>\n\n      </ion-infinite-scroll>\n\n\n\n    </div>\n\n\n\n  </div>\n\n  <div class="request-defeat" *ngIf="requestFail">\n\n    <img src="./assets/image/requestDefeat.png" alt="">\n\n    <p>啊哦！页面走丢了</p>\n\n    <button class="btn-request-defeat" ion-button full (touchstart)="refresh()">\n\n      刷新再找一找\n\n    </button>\n\n  </div>\n\n  <ion-infinite-scroll (ionInfinite)="loadMore($event)" *ngIf="orderDetail.length < count">\n\n    <ion-infinite-scroll-content loadingSpinner="bubbles" loadingText="加载中">\n\n    </ion-infinite-scroll-content>\n\n  </ion-infinite-scroll>\n\n</ion-content>'/*ion-inline-end:"C:\Users\think\huchunGit\tpb02\tpb\src\pages\award-tabs\award-tabs.html"*/
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_0_ionic_angular__["l" /* NavController */], __WEBPACK_IMPORTED_MODULE_0_ionic_angular__["m" /* NavParams */], __WEBPACK_IMPORTED_MODULE_0_ionic_angular__["q" /* ViewController */], __WEBPACK_IMPORTED_MODULE_0_ionic_angular__["n" /* Platform */], __WEBPACK_IMPORTED_MODULE_2__app_app_service__["b" /* AppService */]])
], AwardTabs);

//# sourceMappingURL=award-tabs.js.map

/***/ }),

/***/ 231:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return WithdrawRecord; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__app_app_service__ = __webpack_require__(4);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



var WithdrawRecord = (function () {
    function WithdrawRecord(navCtrl, alertCtrl, navParams, appService) {
        this.navCtrl = navCtrl;
        this.alertCtrl = alertCtrl;
        this.navParams = navParams;
        this.appService = appService;
        this.pageSize = 10;
        this.currentPage = 1;
        this.withdrawAmount = 0;
        this.count = 0;
        this.withdrawList = [];
        this.isEmpty = false;
        this.requestFail = false;
        this.isRefresh = true;
        this.isLoadingShow = false;
        this.load = __WEBPACK_IMPORTED_MODULE_2__app_app_service__["a" /* AppConfig */].load;
        this.getWithdrawList();
    }
    WithdrawRecord.prototype.getWithdrawList = function () {
        var _this = this;
        this.isLoadingShow = true;
        var url = __WEBPACK_IMPORTED_MODULE_2__app_app_service__["a" /* AppConfig */].API.withdrawList + "?start=" + (this.currentPage - 1) * this.pageSize + "&limit=" + this.pageSize;
        this.appService.httpGet(url)
            .then(function (data) {
            if (data.data.length > 0) {
                data.data.map(function (item) {
                    item.amount = item.amount.toFixed(2);
                    item.realAmount = item.realAmount.toFixed(2);
                    item.individualTax = item.individualTax.toFixed(2);
                });
                (_a = _this.withdrawList).push.apply(_a, data.data);
            }
            _this.count = data.count;
            _this.isEmpty = data.count === 0 ? true : false;
            _this.requestFail = false;
            _this.isLoadingShow = false;
            _this.withdrawAmount = _this.navParams.get("param1"); //提现总计，从当前账户传入过来
            var _a;
        })
            .catch(function (error) {
            _this.appService.getToken(error, function () {
                _this.getWithdrawList();
            });
            console.log(error);
            _this.requestFail = true;
            _this.isEmpty = false;
            _this.isLoadingShow = false;
        });
    };
    WithdrawRecord.prototype.loadMore = function (infiniteScroll) {
        this.currentPage++;
        this.refreshPage(infiniteScroll);
    };
    WithdrawRecord.prototype.refresh = function () {
        this.requestFail = false;
        this.currentPage = 1;
        this.withdrawList = [];
        this.withdrawAmount = 0;
        this.getWithdrawList();
    };
    WithdrawRecord.prototype.pullRefresh = function (refresher) {
        this.requestFail = false;
        this.isEmpty = false;
        this.currentPage = 1;
        this.withdrawList = [];
        this.withdrawAmount = 0;
        this.refreshPage(refresher);
    };
    WithdrawRecord.prototype.refreshPage = function (refresher) {
        var _this = this;
        setTimeout(function () {
            _this.getWithdrawList();
            refresher.complete();
        }, 500);
    };
    return WithdrawRecord;
}());
WithdrawRecord = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["n" /* Component */])({
        selector: 'withdraw-record',template:/*ion-inline-start:"C:\Users\think\huchunGit\tpb02\tpb\src\pages\withdraw-record\withdraw-record.html"*/'<ion-header>\n\n  <ion-navbar>\n\n    <ion-title text-center>提现记录</ion-title>\n\n  </ion-navbar>\n\n</ion-header>\n\n<ion-content>\n\n  <div class="loading-wrapper" *ngIf="isLoadingShow">\n\n    <div>\n\n      <ion-spinner item-start [name]="load.spinner"></ion-spinner>\n\n    </div>\n\n    <div [innerHTML]="load.content"></div>\n\n  </div>\n\n  <ion-refresher *ngIf="!isLoadingShow" (ionRefresh)="pullRefresh($event)">\n\n    <ion-refresher-content></ion-refresher-content>\n\n  </ion-refresher>\n\n  <div class="withdraw-record">\n\n    <div class="withdraw-total" *ngIf="withdrawAmount > 0">\n\n     提现总计：￥ {{ withdrawAmount }}\n\n    </div>\n\n  </div>\n\n  <div class="record-list">\n\n      <div class="withdraw-item" *ngFor="let item of withdrawList; let i = index">\n\n          <ul>\n\n            <li class="money">\n\n              提现金额：￥{{ item.realAmount }}\n\n            </li>\n\n            <li class=\'date\'>\n\n              提现日期：{{ item.createTime | date:\'yyyy.MM.dd\' }}\n\n              <span [ngClass]="{status:true, fail: !(item.status | setWithdrawStatus).pass, pass: (item.status | setWithdrawStatus).pass }">{{ (item.status | setWithdrawStatus).status }}</span>\n\n            </li>\n\n          </ul>\n\n        </div>\n\n  </div>\n\n  <div class="no-data" *ngIf="isEmpty">\n\n    <img src="./assets/image/nodata.png" alt="">\n\n    <p>空空如也</p>\n\n  </div>\n\n  <div class="btn-noMore" *ngIf="withdrawList.length !== 0 && withdrawList.length === count">\n\n    <span>—— 没有更多信息了 ——</span>\n\n  </div>\n\n  <div class="request-defeat" *ngIf="requestFail">\n\n    <img src="./assets/image/requestDefeat.png" alt="">\n\n    <p>啊哦！页面走丢了</p>\n\n    <button class="btn-request-defeat" ion-button full (touchstart)="refresh()">\n\n      刷新再找一找\n\n    </button>\n\n  </div>\n\n  <ion-infinite-scroll  (ionInfinite)="loadMore($event)" *ngIf="withdrawList.length < count">\n\n      <ion-infinite-scroll-content\n\n        loadingSpinner="bubbles"\n\n        loadingText="加载中">\n\n      </ion-infinite-scroll-content>\n\n    </ion-infinite-scroll>\n\n\n\n</ion-content>\n\n'/*ion-inline-end:"C:\Users\think\huchunGit\tpb02\tpb\src\pages\withdraw-record\withdraw-record.html"*/
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["l" /* NavController */],
        __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["a" /* AlertController */],
        __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["m" /* NavParams */],
        __WEBPACK_IMPORTED_MODULE_2__app_app_service__["b" /* AppService */]])
], WithdrawRecord);

//# sourceMappingURL=withdraw-record.js.map

/***/ }),

/***/ 232:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return Help; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(3);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


var Help = (function () {
    function Help(navCtrl, alertCtrl) {
        this.navCtrl = navCtrl;
        this.alertCtrl = alertCtrl;
    }
    return Help;
}());
Help = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["n" /* Component */])({
        selector: 'help',template:/*ion-inline-start:"C:\Users\think\huchunGit\tpb02\tpb\src\pages\help\help.html"*/'<ion-header>\n\n  <ion-navbar>\n\n    <ion-title text-center>帮助中心</ion-title>\n\n  </ion-navbar>\n\n</ion-header>\n\n<ion-content>\n\n  <ul class="help">\n\n    <li>\n\n      <h2 class="title">一、账户相关</h2>\n\n    </li>\n\n    <li>\n\n      <h2>1.我的账号、密码是否可修改？</h2>\n\n      <p>由商户设置为导购员身份的账号可登录淘璞帮，账号不可修改；若通过手机号作为账号登录，可通过【登录页——忘记密码】修改登录密码。</p>\n\n    </li>\n\n    <li>\n\n      <h2 class="title">二、交易相关</h2>\n\n    </li>\n\n    <li>\n\n      <h2>1.什么是淘璞快购？</h2>\n\n      <p>淘璞快购可作为门店内还未上架商品的替换物。用户需要购买平台内未上架商品时，可通过选择淘璞快购设置购买商品数量和商品总额生成订单收款码，供用户扫码支付。</p>\n\n      <p>导购员可通过在生成订单时对淘璞快购商品增加备注信息方式，简要备注用户实际购买的商品信息。</p>\n\n    </li>\n\n    <li>\n\n      <h2>2.生成订单收款码后发现订单内容有误，怎么办？</h2>\n\n      <p>若收款码未经用户扫描成功，可以在收款码页点击【修改此单】对当前订单进行修正；若收款码一经用户扫码，则只能重新选择商品生成新的订单。</p>\n\n    </li>\n\n    <li>\n\n      <h2>3.用户扫码支付后想要退货怎么办？</h2>\n\n      <p>用户在扫描订单收款码确认订单金额并支付成功后，不能进行申请退货操作，若实际因各种原因造成支付后想要取消当次交易的，请与用户协商通过其他方式完成金额退还。</p>\n\n    </li>\n\n    <li>\n\n      <h2>4.自提赠品和快递赠品区别是什么？</h2>\n\n      <p>自提赠品是指用户领取后需要前往指定门店出示二维码待导购员扫码确认完成兑换的赠品；</p>\n\n      <p>快递赠品是指用户领取后通过填写收货地址完成兑换，待导购员发货后等待收货的赠品。</p>\n\n    </li>\n\n    <li>\n\n      <h2 class="title">三、结算相关</h2>\n\n    </li>\n\n    <li>\n\n      <h2>1.我的资金来源有哪些？</h2>\n\n      <p>导购员资金来源包括处理的有效订单和发展会员奖励中部分或全部项组成，具体奖励参见《门店导购员推广合作协议》；</p>\n\n    </li>\n\n    <li>\n\n      <h2>2.怎样核对我的奖励金额？</h2>\n\n      <p>1）确定自己的奖励来源项及奖励比例值；2）可在审核中金额明细中实时查看处理的有效订单及发展会员奖励。</p>\n\n    </li>\n\n    <li>\n\n      <h2>3.奖励金额如何提现到我自己账户？</h2>\n\n      <p>处理订单或发展会员获得的奖励，经过平台审核之后，每周四进入到可提现金额中；导购员每个月可在任意时间完成一次金额提现，提现成功对应金额直接进入到已绑定的微信账户中。</p>\n\n    </li>\n\n    <li>\n\n      <h2 class="title">四、其他问题</h2>\n\n    </li>\n\n    <li>\n\n      <h2>1.我的二维码有什么用？</h2>\n\n      <p>在有发展会员奖励来源时，将自己的二维码出示或分享给用户，用户扫描识别二维码注册成为淘璞会员，即可获取到对应奖励金。</p>\n\n    </li>\n\n    <li>\n\n      <h2>2.门店二维码有什么用？</h2>\n\n      <p>将门店二维码出示或张贴到店内，用户可通过扫描二维码快速进入到你所在门店，选择商品下单。</p>\n\n    </li>\n\n  </ul>\n\n</ion-content>\n\n'/*ion-inline-end:"C:\Users\think\huchunGit\tpb02\tpb\src\pages\help\help.html"*/
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["l" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["a" /* AlertController */]])
], Help);

//# sourceMappingURL=help.js.map

/***/ }),

/***/ 233:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return EditAccount; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(3);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


var EditAccount = (function () {
    function EditAccount(navCtrl, alertCtrl) {
        this.navCtrl = navCtrl;
        this.alertCtrl = alertCtrl;
        this.name = '';
        this.phone = '';
        this.idCard = '';
        this.name = '张小花';
        this.phone = '13761489650';
        this.idCard = '420117198902080853';
    }
    return EditAccount;
}());
EditAccount = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["n" /* Component */])({
        selector: 'edit-account',template:/*ion-inline-start:"C:\Users\think\huchunGit\tpb02\tpb\src\pages\account\edit-account\edit-account.html"*/'<ion-header>\n\n  <ion-navbar>\n\n    <ion-title text-center>收款账户</ion-title>\n\n  </ion-navbar>\n\n</ion-header>\n\n<ion-content>\n\n  <div class="account-title">\n\n  	<div class="binded"><img src="./assets/image/ok.png" alt="">已绑定微信</div>\n\n  </div>\n\n  <div class="form-list">\n\n  	<ion-list>\n\n  	  <ion-item>\n\n  	    <ion-input [ngModel]="name" clearInput=true></ion-input>\n\n  	  </ion-item>\n\n      <ion-item>\n\n      <ion-input [ngModel]="phone" clearInput=true></ion-input>\n\n    </ion-item>\n\n    <ion-item>\n\n      <ion-input [ngModel]="idCard" clearInput=true></ion-input>\n\n    </ion-item>\n\n	</ion-list>\n\n  <button class="btn-bind" ion-button>确定</button>\n\n  </div>\n\n</ion-content>\n\n'/*ion-inline-end:"C:\Users\think\huchunGit\tpb02\tpb\src\pages\account\edit-account\edit-account.html"*/
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["l" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["a" /* AlertController */]])
], EditAccount);

//# sourceMappingURL=edit-account.js.map

/***/ }),

/***/ 234:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return UpdatePwd; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_http__ = __webpack_require__(40);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_ionic_angular__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__app_app_service__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__tabs_tabs__ = __webpack_require__(60);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};





var UpdatePwd = (function () {
    function UpdatePwd(navCtrl, alertCtrl, navParams, appService, app) {
        this.navCtrl = navCtrl;
        this.alertCtrl = alertCtrl;
        this.navParams = navParams;
        this.appService = appService;
        this.app = app;
        this.initialPwd = ""; //本页面初始密码
        this.newPwd = "";
        this.repeatPwd = "";
        this.isInitialPwd = false;
        this.isNewPwd = false;
        this.isRepeatPwd = false;
        this.user = {
            username: '',
            pwd: ''
        };
        this.prevInitialPwd = this.navParams.get("initialPwd");
        this.tpb_token = this.navParams.get("tpb_token");
        this.refresh_token = this.navParams.get("refresh_token");
        this.user = this.navParams.get("user");
        this.rememberPassword = this.navParams.get("rememberPassword");
        console.log(this.user);
        this.withTokenHeaders = new __WEBPACK_IMPORTED_MODULE_0__angular_http__["a" /* Headers */]({
            'Authorization': 'Bearer ' + this.tpb_token
        });
    }
    UpdatePwd.prototype.confirm = function () {
        var _this = this;
        this.repeatPwdBlur();
        this.initialPwdBlur();
        this.newPwdBlur();
        if (!this.isInitialPwd && !this.isNewPwd && !this.isRepeatPwd && this.initialPwd != "" && this.newPwd != "" && this.repeatPwd != "") {
            var loading_1 = this.appService.loading();
            loading_1.present();
            var url = __WEBPACK_IMPORTED_MODULE_3__app_app_service__["a" /* AppConfig */].API.editPassword;
            var body = {
                password: this.newPwd
            };
            this.appService.httpPostHeader(url, body, this.withTokenHeaders).then(function (data) {
                loading_1.dismiss();
                _this.user = {
                    username: _this.user.username,
                    pwd: _this.newPwd
                };
                if (!_this.rememberPassword) {
                    _this.user.pwd = "";
                }
                ;
                var newDateMS = (new Date()).getTime() + data.expires_in * 1000 - __WEBPACK_IMPORTED_MODULE_3__app_app_service__["a" /* AppConfig */].RESERVED_TIME;
                _this.appService.setItem("newDateMS", newDateMS);
                _this.appService.setItem("user", JSON.stringify(_this.user));
                _this.appService.setItem("tpb_token", _this.tpb_token);
                _this.appService.setItem("refresh_token", _this.refresh_token);
                if (data.type == "success") {
                    _this.appService.toast('修改成功', 1000, 'middle');
                    var appNav = _this.app.getRootNav();
                    appNav.setRoot(__WEBPACK_IMPORTED_MODULE_4__tabs_tabs__["a" /* TabsPage */]);
                }
            }).catch(function (error) {
                _this.appService.getToken(error, function () {
                    _this.confirm();
                });
                loading_1.dismiss();
                console.log(error);
                _this.appService.toast('网络错误，请稍后重试', 1000, 'middle');
            });
        }
    };
    UpdatePwd.prototype.initialPwdBlur = function () {
        if (this.initialPwd == "") {
            this.isInitialPwd = true;
            this.initialPwdValue = "*请输入出示密码";
        }
        else if (this.initialPwd != this.prevInitialPwd) {
            this.isInitialPwd = true;
            this.initialPwdValue = "*初始密码不正确，请重新输入";
        }
        else {
            this.isInitialPwd = false;
            this.initialPwdValue = "";
        }
    };
    UpdatePwd.prototype.newPwdBlur = function () {
        if (this.newPwd == "") {
            this.isNewPwd = true;
            this.newPwdValue = "*请输入新密码";
        }
        else {
            this.isNewPwd = false;
            this.newPwdValue = "";
        }
    };
    UpdatePwd.prototype.repeatPwdBlur = function () {
        if (this.repeatPwd == "") {
            this.isRepeatPwd = true;
            this.repeatPwdValue = "*请输入密码";
        }
        else if (this.repeatPwd != this.newPwd) {
            this.isRepeatPwd = true;
            this.repeatPwdValue = "*两次密码不一致";
        }
        else {
            this.isRepeatPwd = false;
            this.repeatPwdValue = "";
        }
    };
    return UpdatePwd;
}());
UpdatePwd = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_1__angular_core__["n" /* Component */])({
        selector: 'update-pwd',template:/*ion-inline-start:"C:\Users\think\huchunGit\tpb02\tpb\src\pages\update-pwd\update-pwd.html"*/'<ion-content>\n\n  <div class="forget-box">\n\n    <div class="update-instruction">\n\n      <dl>\n\n        <dt><img src="./assets/image/applogo.png"></dt>\n\n        <dd>\n\n          <p>初次登录淘璞帮</p>\n\n          <p>请您修改登录密码并牢记</p>\n\n        </dd>\n\n      </dl>\n\n    </div>\n\n    <ion-list>\n\n      <ion-item>\n\n        <ion-input type="password" [(ngModel)]="initialPwd" (ionBlur)="initialPwdBlur()" placeholder="请输入初始密码" required clearInput=true></ion-input>\n\n      </ion-item>\n\n      <div class=\'login-error\' *ngIf="isInitialPwd">{{initialPwdValue}}</div>\n\n      <ion-item>\n\n        <ion-input type="password" [(ngModel)]="newPwd" (ionBlur)="newPwdBlur()" placeholder="输入新密码" required clearInput=true></ion-input>\n\n      </ion-item>\n\n      <div class=\'login-error\' *ngIf="isNewPwd">{{newPwdValue}}</div>\n\n      <ion-item>\n\n        <ion-input type="password" [(ngModel)]="repeatPwd" (ionBlur)="repeatPwdBlur()" placeholder="重复密码" required clearInput=true></ion-input>\n\n      </ion-item>\n\n      <div class=\'login-error\' *ngIf="isRepeatPwd">{{repeatPwdValue}}</div>\n\n    </ion-list>\n\n    <button class="btn-forget" ion-button block round (touchstart)="confirm()">确认</button>\n\n  </div>\n\n  </ion-content>\n\n  \n\n'/*ion-inline-end:"C:\Users\think\huchunGit\tpb02\tpb\src\pages\update-pwd\update-pwd.html"*/
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_2_ionic_angular__["l" /* NavController */],
        __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["a" /* AlertController */],
        __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["m" /* NavParams */],
        __WEBPACK_IMPORTED_MODULE_3__app_app_service__["b" /* AppService */],
        __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["b" /* App */]])
], UpdatePwd);

//# sourceMappingURL=update-pwd.js.map

/***/ }),

/***/ 237:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_platform_browser_dynamic__ = __webpack_require__(238);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__app_module__ = __webpack_require__(256);


Object(__WEBPACK_IMPORTED_MODULE_0__angular_platform_browser_dynamic__["a" /* platformBrowserDynamic */])().bootstrapModule(__WEBPACK_IMPORTED_MODULE_1__app_module__["a" /* AppModule */]);
//# sourceMappingURL=main.js.map

/***/ }),

/***/ 256:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AppModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_platform_browser__ = __webpack_require__(31);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_http__ = __webpack_require__(40);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__app_service__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__ionic_native_barcode_scanner__ = __webpack_require__(312);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__ionic_native_dialogs__ = __webpack_require__(321);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_ionic_angular__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__app_component__ = __webpack_require__(322);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__app_pipe__ = __webpack_require__(348);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9_angular2_qrcode__ = __webpack_require__(349);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__pages_login_login__ = __webpack_require__(112);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11__pages_forget_forget__ = __webpack_require__(210);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12__pages_update_pwd_update_pwd__ = __webpack_require__(234);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_13__pages_home_home__ = __webpack_require__(211);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_14__pages_tabs_tabs__ = __webpack_require__(60);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_15__pages_personl_personl__ = __webpack_require__(227);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_16__pages_order_info_order_info__ = __webpack_require__(219);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_17__pages_gift_info_gift_info__ = __webpack_require__(218);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_18__pages_creat_order_creat_order__ = __webpack_require__(214);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_19__pages_help_help__ = __webpack_require__(232);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_20__pages_order_layer_order_layer__ = __webpack_require__(215);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_21__pages_order_store_order_store__ = __webpack_require__(216);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_22__pages_payment_code_payment_code__ = __webpack_require__(217);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_23__pages_unaudit_tabs_unaudit_tabs__ = __webpack_require__(220);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_24__pages_unhandle_tabs_unhandle_tabs__ = __webpack_require__(224);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_25__pages_unaudit_cancelorder_unaudit_cancelorder__ = __webpack_require__(221);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_26__pages_unaudit_returnorder_unaudit_returnorder__ = __webpack_require__(222);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_27__pages_audit_cancelorder_audit_cancelorder__ = __webpack_require__(116);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_28__pages_audit_returnorder_audit_returnorder__ = __webpack_require__(117);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_29__pages_return_detail_return_detail__ = __webpack_require__(118);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_30__pages_returned_detail_returned_detail__ = __webpack_require__(223);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_31__pages_unhandle_expressgift_unhandle_expressgift__ = __webpack_require__(351);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_32__pages_unhandle_selfgift_unhandle_selfgift__ = __webpack_require__(352);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_33__pages_handle_selfgift_handle_selfgift__ = __webpack_require__(62);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_34__pages_handle_expressgift_handle_expressgift__ = __webpack_require__(119);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_35__pages_withdraw_withdraw__ = __webpack_require__(228);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_36__pages_withdraw_record_withdraw_record__ = __webpack_require__(231);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_37__pages_mycode_mycode__ = __webpack_require__(113);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_38__pages_award_tabs_award_tabs__ = __webpack_require__(230);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_39__pages_award_activity_award_activity__ = __webpack_require__(353);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_40__pages_award_order_award_order__ = __webpack_require__(354);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_41__pages_account_bind_account_bind_account__ = __webpack_require__(355);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_42__pages_account_add_account_add_account__ = __webpack_require__(120);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_43__pages_account_edit_account_edit_account__ = __webpack_require__(233);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_44__pages_order_list_order_list__ = __webpack_require__(225);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_45__pages_brandshop_order_list_brandshop_order_list__ = __webpack_require__(226);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_46__pages_order_detail_order_detail__ = __webpack_require__(356);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_47__pages_award_detail_award_detail__ = __webpack_require__(357);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_48__pages_detail_tabs_detail_tabs__ = __webpack_require__(229);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_49__ionic_native_status_bar__ = __webpack_require__(235);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_50__ionic_native_splash_screen__ = __webpack_require__(236);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};



















































var componentsList = [
    __WEBPACK_IMPORTED_MODULE_7__app_component__["a" /* MyApp */],
    __WEBPACK_IMPORTED_MODULE_10__pages_login_login__["a" /* Login */],
    __WEBPACK_IMPORTED_MODULE_11__pages_forget_forget__["a" /* Forget */],
    __WEBPACK_IMPORTED_MODULE_12__pages_update_pwd_update_pwd__["a" /* UpdatePwd */],
    __WEBPACK_IMPORTED_MODULE_13__pages_home_home__["a" /* Home */],
    __WEBPACK_IMPORTED_MODULE_14__pages_tabs_tabs__["a" /* TabsPage */],
    __WEBPACK_IMPORTED_MODULE_15__pages_personl_personl__["a" /* Personl */],
    __WEBPACK_IMPORTED_MODULE_16__pages_order_info_order_info__["a" /* OrderInfo */],
    __WEBPACK_IMPORTED_MODULE_17__pages_gift_info_gift_info__["a" /* GiftInfo */],
    __WEBPACK_IMPORTED_MODULE_18__pages_creat_order_creat_order__["a" /* CreatOrder */],
    __WEBPACK_IMPORTED_MODULE_19__pages_help_help__["a" /* Help */],
    __WEBPACK_IMPORTED_MODULE_20__pages_order_layer_order_layer__["a" /* OrderLayer */],
    __WEBPACK_IMPORTED_MODULE_21__pages_order_store_order_store__["a" /* OrderStore */],
    __WEBPACK_IMPORTED_MODULE_22__pages_payment_code_payment_code__["a" /* PaymentCode */],
    __WEBPACK_IMPORTED_MODULE_23__pages_unaudit_tabs_unaudit_tabs__["a" /* UnauditTabs */],
    __WEBPACK_IMPORTED_MODULE_25__pages_unaudit_cancelorder_unaudit_cancelorder__["a" /* UnauditCancelorder */],
    __WEBPACK_IMPORTED_MODULE_26__pages_unaudit_returnorder_unaudit_returnorder__["a" /* UnauditReturnorder */],
    __WEBPACK_IMPORTED_MODULE_27__pages_audit_cancelorder_audit_cancelorder__["a" /* AuditCancelorder */],
    __WEBPACK_IMPORTED_MODULE_28__pages_audit_returnorder_audit_returnorder__["a" /* AuditReturnorder */],
    __WEBPACK_IMPORTED_MODULE_29__pages_return_detail_return_detail__["a" /* ReturnDetail */],
    __WEBPACK_IMPORTED_MODULE_30__pages_returned_detail_returned_detail__["a" /* ReturnedDetail */],
    __WEBPACK_IMPORTED_MODULE_24__pages_unhandle_tabs_unhandle_tabs__["a" /* UnhandleTabs */],
    __WEBPACK_IMPORTED_MODULE_32__pages_unhandle_selfgift_unhandle_selfgift__["a" /* UnhandleSelfgift */],
    __WEBPACK_IMPORTED_MODULE_31__pages_unhandle_expressgift_unhandle_expressgift__["a" /* UnhandleExpressgift */],
    __WEBPACK_IMPORTED_MODULE_33__pages_handle_selfgift_handle_selfgift__["a" /* HandleSelfgift */],
    __WEBPACK_IMPORTED_MODULE_34__pages_handle_expressgift_handle_expressgift__["a" /* HandleExpressgift */],
    __WEBPACK_IMPORTED_MODULE_35__pages_withdraw_withdraw__["a" /* Withdraw */],
    __WEBPACK_IMPORTED_MODULE_36__pages_withdraw_record_withdraw_record__["a" /* WithdrawRecord */],
    __WEBPACK_IMPORTED_MODULE_37__pages_mycode_mycode__["a" /* MyCode */],
    __WEBPACK_IMPORTED_MODULE_38__pages_award_tabs_award_tabs__["a" /* AwardTabs */],
    __WEBPACK_IMPORTED_MODULE_39__pages_award_activity_award_activity__["a" /* AwardActivity */],
    __WEBPACK_IMPORTED_MODULE_40__pages_award_order_award_order__["a" /* AwardOrder */],
    __WEBPACK_IMPORTED_MODULE_41__pages_account_bind_account_bind_account__["a" /* BindAccount */],
    __WEBPACK_IMPORTED_MODULE_42__pages_account_add_account_add_account__["a" /* AddAccount */],
    __WEBPACK_IMPORTED_MODULE_43__pages_account_edit_account_edit_account__["a" /* EditAccount */],
    __WEBPACK_IMPORTED_MODULE_44__pages_order_list_order_list__["a" /* OrderList */],
    __WEBPACK_IMPORTED_MODULE_45__pages_brandshop_order_list_brandshop_order_list__["a" /* BrandshopOrderList */],
    __WEBPACK_IMPORTED_MODULE_46__pages_order_detail_order_detail__["a" /* OrderDetail */],
    __WEBPACK_IMPORTED_MODULE_47__pages_award_detail_award_detail__["a" /* AwardDetail */],
    __WEBPACK_IMPORTED_MODULE_48__pages_detail_tabs_detail_tabs__["a" /* DetailTabs */]
];
var AppModule = (function () {
    function AppModule() {
    }
    return AppModule;
}());
AppModule = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_3__angular_core__["L" /* NgModule */])({
        declarations: componentsList.concat([
            __WEBPACK_IMPORTED_MODULE_8__app_pipe__["f" /* FilterStatusPipe */],
            __WEBPACK_IMPORTED_MODULE_8__app_pipe__["e" /* FilterReturnStatusPipe */],
            __WEBPACK_IMPORTED_MODULE_8__app_pipe__["b" /* FilterCancelStatusPipe */],
            __WEBPACK_IMPORTED_MODULE_8__app_pipe__["g" /* FilterWithdrawStatusPipe */],
            __WEBPACK_IMPORTED_MODULE_8__app_pipe__["c" /* FilterGiftTypePipe */],
            __WEBPACK_IMPORTED_MODULE_8__app_pipe__["d" /* FilterHandleGiftTypePipe */],
            __WEBPACK_IMPORTED_MODULE_8__app_pipe__["j" /* IsOrIsnotInvalidAttrValuePipe */],
            __WEBPACK_IMPORTED_MODULE_8__app_pipe__["i" /* InvalidAttrValueClassPipe */],
            __WEBPACK_IMPORTED_MODULE_8__app_pipe__["a" /* ChangeGrayPipe */],
            __WEBPACK_IMPORTED_MODULE_8__app_pipe__["k" /* OverStockPipe */],
            __WEBPACK_IMPORTED_MODULE_8__app_pipe__["l" /* ProductSkuDTOImagePipe */],
            __WEBPACK_IMPORTED_MODULE_8__app_pipe__["m" /* ReasonTypePipe */],
            __WEBPACK_IMPORTED_MODULE_8__app_pipe__["h" /* HandleGiftImagePipe */]
        ]),
        imports: [
            __WEBPACK_IMPORTED_MODULE_0__angular_platform_browser__["a" /* BrowserModule */],
            __WEBPACK_IMPORTED_MODULE_9_angular2_qrcode__["a" /* QRCodeModule */],
            __WEBPACK_IMPORTED_MODULE_1__angular_http__["c" /* HttpModule */],
            __WEBPACK_IMPORTED_MODULE_6_ionic_angular__["g" /* IonicModule */].forRoot(__WEBPACK_IMPORTED_MODULE_7__app_component__["a" /* MyApp */], {
                backButtonText: '返回',
                modalEnter: 'modal-slide-in',
                modalLeave: 'modal-slide-out'
            }, {
                links: []
            }),
        ],
        bootstrap: [__WEBPACK_IMPORTED_MODULE_6_ionic_angular__["e" /* IonicApp */]],
        entryComponents: componentsList,
        providers: [
            __WEBPACK_IMPORTED_MODULE_49__ionic_native_status_bar__["a" /* StatusBar */],
            __WEBPACK_IMPORTED_MODULE_50__ionic_native_splash_screen__["a" /* SplashScreen */],
            __WEBPACK_IMPORTED_MODULE_2__app_service__["b" /* AppService */],
            __WEBPACK_IMPORTED_MODULE_2__app_service__["a" /* AppConfig */],
            __WEBPACK_IMPORTED_MODULE_5__ionic_native_dialogs__["a" /* Dialogs */],
            __WEBPACK_IMPORTED_MODULE_4__ionic_native_barcode_scanner__["a" /* BarcodeScanner */],
            { provide: __WEBPACK_IMPORTED_MODULE_3__angular_core__["v" /* ErrorHandler */], useClass: __WEBPACK_IMPORTED_MODULE_6_ionic_angular__["f" /* IonicErrorHandler */] }
        ]
    })
], AppModule);

//# sourceMappingURL=app.module.js.map

/***/ }),

/***/ 311:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ENV; });
var ENV = {
    mode: '91topbaby.com',
    client_id: 'shortClient',
    secret: 'secret',
    appID: 'wxadf96ade9aed2e45'
};
//# sourceMappingURL=environment.dev.js.map

/***/ }),

/***/ 322:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return MyApp; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__pages_login_login__ = __webpack_require__(112);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__pages_tabs_tabs__ = __webpack_require__(60);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__ionic_native_status_bar__ = __webpack_require__(235);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__ionic_native_splash_screen__ = __webpack_require__(236);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__app_service__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7_buffer__ = __webpack_require__(58);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7_buffer___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_7_buffer__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__angular_http__ = __webpack_require__(40);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};









var MyApp = (function () {
    function MyApp(platform, menu, statusBar, splashScreen, appService) {
        this.platform = platform;
        this.menu = menu;
        this.statusBar = statusBar;
        this.splashScreen = splashScreen;
        this.appService = appService;
        this.initializeApp();
        this.initializePage();
    }
    MyApp.prototype.initializePage = function () {
        var _this = this;
        if (this.appService.getItem("tpb_token")) {
            var getItemNewDateMs = this.appService.getItem("newDateMS");
            if ((new Date()).getTime() < getItemNewDateMs) {
                this.rootPage = __WEBPACK_IMPORTED_MODULE_3__pages_tabs_tabs__["a" /* TabsPage */];
            }
            else {
                var base64encode = new __WEBPACK_IMPORTED_MODULE_7_buffer__["Buffer"](__WEBPACK_IMPORTED_MODULE_6__app_service__["a" /* AppConfig */].client_id + ":" + __WEBPACK_IMPORTED_MODULE_6__app_service__["a" /* AppConfig */].secret).toString('base64');
                this.oauthTokenHeaders = new __WEBPACK_IMPORTED_MODULE_8__angular_http__["a" /* Headers */]({
                    'Authorization': 'Basic ' + base64encode,
                    'Content-Type': 'application/x-www-form-urlencoded'
                });
                var oauthTokenUrl = __WEBPACK_IMPORTED_MODULE_6__app_service__["a" /* AppConfig */].oauthTokenUrl;
                var body = "grant_type=refresh_token&refresh_token=" + this.appService.getItem("refresh_token");
                this.appService.httpPostHeader(oauthTokenUrl, body, this.oauthTokenHeaders).then(function (data) {
                    var newDateMS = (new Date()).getTime() + data.expires_in * 1000 - __WEBPACK_IMPORTED_MODULE_6__app_service__["a" /* AppConfig */].RESERVED_TIME;
                    _this.appService.setItem("newDateMS", newDateMS);
                    _this.appService.setItem("tpb_token", data.access_token);
                    _this.appService.setItem("refresh_token", data.refresh_token);
                    _this.rootPage = __WEBPACK_IMPORTED_MODULE_3__pages_tabs_tabs__["a" /* TabsPage */];
                }).catch(function (err) {
                    console.log(err);
                    _this.appService.setItem("tpb_token", "");
                    _this.appService.setItem("refresh_token", "");
                    _this.rootPage = __WEBPACK_IMPORTED_MODULE_2__pages_login_login__["a" /* Login */];
                });
            }
        }
        else {
            this.rootPage = __WEBPACK_IMPORTED_MODULE_2__pages_login_login__["a" /* Login */];
        }
    };
    MyApp.prototype.initializeApp = function () {
        var _this = this;
        this.platform.ready().then(function () {
            // Okay, so the platform is ready and our plugins are available.
            // Here you can do any higher level native things you might need.
            _this.statusBar.styleDefault();
            _this.splashScreen.hide();
        });
    };
    //点击事件出发页面切换
    MyApp.prototype.openPage = function (page) {
        // close the menu when clicking a link from the menu
        this.menu.close();
        // navigate to the new page if it is not the current page
        this.nav.setRoot(page.component);
    };
    return MyApp;
}());
__decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_14" /* ViewChild */])(__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["k" /* Nav */]),
    __metadata("design:type", typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["k" /* Nav */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["k" /* Nav */]) === "function" && _a || Object)
], MyApp.prototype, "nav", void 0);
MyApp = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["n" /* Component */])({template:/*ion-inline-start:"C:\Users\think\huchunGit\tpb02\tpb\src\app\app.html"*/'<ion-nav [root]="rootPage" #content swipeBackEnabled="false"></ion-nav>'/*ion-inline-end:"C:\Users\think\huchunGit\tpb02\tpb\src\app\app.html"*/
    }),
    __metadata("design:paramtypes", [typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["n" /* Platform */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["n" /* Platform */]) === "function" && _b || Object, typeof (_c = typeof __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* MenuController */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* MenuController */]) === "function" && _c || Object, typeof (_d = typeof __WEBPACK_IMPORTED_MODULE_4__ionic_native_status_bar__["a" /* StatusBar */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_4__ionic_native_status_bar__["a" /* StatusBar */]) === "function" && _d || Object, typeof (_e = typeof __WEBPACK_IMPORTED_MODULE_5__ionic_native_splash_screen__["a" /* SplashScreen */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_5__ionic_native_splash_screen__["a" /* SplashScreen */]) === "function" && _e || Object, typeof (_f = typeof __WEBPACK_IMPORTED_MODULE_6__app_service__["b" /* AppService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_6__app_service__["b" /* AppService */]) === "function" && _f || Object])
], MyApp);

var _a, _b, _c, _d, _e, _f;
//# sourceMappingURL=app.component.js.map

/***/ }),

/***/ 348:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "f", function() { return FilterStatusPipe; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "e", function() { return FilterReturnStatusPipe; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return FilterCancelStatusPipe; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "g", function() { return FilterWithdrawStatusPipe; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "c", function() { return FilterGiftTypePipe; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "d", function() { return FilterHandleGiftTypePipe; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "j", function() { return IsOrIsnotInvalidAttrValuePipe; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "i", function() { return InvalidAttrValueClassPipe; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ChangeGrayPipe; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "k", function() { return OverStockPipe; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "l", function() { return ProductSkuDTOImagePipe; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "h", function() { return HandleGiftImagePipe; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "m", function() { return ReasonTypePipe; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__app_service__ = __webpack_require__(4);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};


// 订单状态的转换
// pass:通过，字体颜色为绿  audit：字体为红色 (根据状态为其显示添加css)
var FilterStatusPipe = (function () {
    function FilterStatusPipe() {
    }
    FilterStatusPipe.prototype.transform = function (param) {
        switch (param) {
            case "0":
                return {
                    status: "待支付",
                    pass: false,
                    audit: true
                };
            case "1":
                return {
                    status: "已支付",
                    pass: true,
                    audit: false
                };
            case "2":
                return {
                    status: "已发货",
                    pass: true,
                    audit: false
                };
            case "3":
                return {
                    status: "已收货",
                    pass: true,
                    audit: false
                };
            case "4":
                return {
                    status: "已取消",
                    pass: false,
                    audit: true
                };
            case "6":
                return {
                    status: "取消中",
                    pass: true,
                    audit: false
                };
            case "C":
                return {
                    status: "已完成",
                    pass: true,
                    audit: false
                };
        }
    };
    return FilterStatusPipe;
}());
FilterStatusPipe = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["W" /* Pipe */])({ name: 'setOrderStatus' })
], FilterStatusPipe);

// 退货订单的状态转换
// pass:通过，字体颜色为绿  audit：字体为红色 (根据状态为其显示添加css)
var FilterReturnStatusPipe = (function () {
    function FilterReturnStatusPipe() {
    }
    FilterReturnStatusPipe.prototype.transform = function (param) {
        switch (param) {
            case "0":
                return {
                    status: "申请审核中",
                    pass: false,
                    audit: true
                };
            case "1":
                return {
                    status: "申请已同意",
                    pass: true,
                    audit: false
                };
            case "2":
                return {
                    status: "商家已收货",
                    pass: true,
                    audit: false
                };
            case "3":
                return {
                    status: "申请已完成",
                    pass: true,
                    audit: false
                };
            case "4":
                return {
                    status: "申请拒绝",
                    pass: false,
                    audit: true
                };
        }
    };
    return FilterReturnStatusPipe;
}());
FilterReturnStatusPipe = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["W" /* Pipe */])({ name: 'setReturnOrderStatus' })
], FilterReturnStatusPipe);

// 取消订单的状态转换
// pass:通过，字体颜色为绿  audit：字体为红色 (根据状态为其显示添加css)
var FilterCancelStatusPipe = (function () {
    function FilterCancelStatusPipe() {
    }
    FilterCancelStatusPipe.prototype.transform = function (param) {
        switch (param) {
            case "0":
                return {
                    status: "申请审核中",
                    pass: false,
                    audit: true
                };
            case "1":
                return {
                    status: "申请已通过",
                    pass: true,
                    audit: false
                };
            case "2":
                return {
                    status: "申请已拒绝",
                    pass: false,
                    audit: true
                };
            case "3":
                return {
                    status: "退款已完成",
                    pass: true,
                    audit: false
                };
        }
    };
    return FilterCancelStatusPipe;
}());
FilterCancelStatusPipe = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["W" /* Pipe */])({ name: 'setCancelOrderStatus' })
], FilterCancelStatusPipe);

// 提现明细
var FilterWithdrawStatusPipe = (function () {
    function FilterWithdrawStatusPipe() {
    }
    FilterWithdrawStatusPipe.prototype.transform = function (param) {
        switch (param) {
            case 0:
                return {
                    status: "失败",
                    pass: false
                };
            case 1:
                return {
                    status: "成功",
                    pass: true
                };
        }
    };
    return FilterWithdrawStatusPipe;
}());
FilterWithdrawStatusPipe = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["W" /* Pipe */])({ name: 'setWithdrawStatus' })
], FilterWithdrawStatusPipe);

//未使用自提赠品列表状态
var FilterGiftTypePipe = (function () {
    function FilterGiftTypePipe() {
    }
    FilterGiftTypePipe.prototype.transform = function (giftType, expoent) {
        if (giftType == '0' && expoent == '2') {
            return "预约兑换";
        }
        else if (giftType == '0' && expoent == '3') {
            return "预约成功";
        }
        else if (giftType == '1') {
            return "到店兑换";
        }
    };
    return FilterGiftTypePipe;
}());
FilterGiftTypePipe = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["W" /* Pipe */])({ name: 'setGiftType' })
], FilterGiftTypePipe);

//已使用自提赠品列表状态
var FilterHandleGiftTypePipe = (function () {
    function FilterHandleGiftTypePipe() {
    }
    FilterHandleGiftTypePipe.prototype.transform = function (giftType) {
        switch (giftType) {
            case "0":
                return "预约兑换";
            case "1":
                return "到店兑换";
        }
    };
    return FilterHandleGiftTypePipe;
}());
FilterHandleGiftTypePipe = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["W" /* Pipe */])({ name: 'setHandleGiftType' })
], FilterHandleGiftTypePipe);

//生成订单模块：sku初始加载，是否置灰
var IsOrIsnotInvalidAttrValuePipe = (function () {
    function IsOrIsnotInvalidAttrValuePipe() {
    }
    IsOrIsnotInvalidAttrValuePipe.prototype.transform = function (invalidAttrValue) {
        return invalidAttrValue == "invalidAttrValue" ? "disabled" : false;
    };
    return IsOrIsnotInvalidAttrValuePipe;
}());
IsOrIsnotInvalidAttrValuePipe = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["W" /* Pipe */])({ name: 'isOrIsnotInvalidAttrValue' })
], IsOrIsnotInvalidAttrValuePipe);

//置灰样式
var InvalidAttrValueClassPipe = (function () {
    function InvalidAttrValueClassPipe() {
    }
    InvalidAttrValueClassPipe.prototype.transform = function (invalidAttrValueClass) {
        return invalidAttrValueClass == "invalidAttrValue" ? true : false;
    };
    return InvalidAttrValueClassPipe;
}());
InvalidAttrValueClassPipe = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["W" /* Pipe */])({ name: 'invalidAttrValueClass' })
], InvalidAttrValueClassPipe);

//生成订单模块：sku数量减少为1时的样式
var ChangeGrayPipe = (function () {
    function ChangeGrayPipe() {
    }
    ChangeGrayPipe.prototype.transform = function (count) {
        return count == 1 ? true : false;
    };
    return ChangeGrayPipe;
}());
ChangeGrayPipe = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["W" /* Pipe */])({ name: 'changeGray' })
], ChangeGrayPipe);

//生成订单模块：sku数量加到库存时的样式
var OverStockPipe = (function () {
    function OverStockPipe() {
    }
    OverStockPipe.prototype.transform = function (overStock) {
        return overStock ? true : false;
    };
    return OverStockPipe;
}());
OverStockPipe = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["W" /* Pipe */])({ name: 'overStockPipe' })
], OverStockPipe);

//图片加前缀或者没有图片时放补图
var ProductSkuDTOImagePipe = (function () {
    function ProductSkuDTOImagePipe() {
    }
    ProductSkuDTOImagePipe.prototype.transform = function (productSkuDTOImage) {
        return productSkuDTOImage ? "https://www." + __WEBPACK_IMPORTED_MODULE_1__app_service__["a" /* AppConfig */].mainUrl + "/evercos/common/file/content/" + productSkuDTOImage : "./assets/image/nodata.png";
    };
    return ProductSkuDTOImagePipe;
}());
ProductSkuDTOImagePipe = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["W" /* Pipe */])({ name: 'productSkuDTOImage' })
], ProductSkuDTOImagePipe);

//赠品服务图片加前缀或者没有图片时放补图
var HandleGiftImagePipe = (function () {
    function HandleGiftImagePipe() {
    }
    HandleGiftImagePipe.prototype.transform = function (handleGiftImage) {
        return handleGiftImage ? "" + (__WEBPACK_IMPORTED_MODULE_1__app_service__["a" /* AppConfig */].imgUrl + handleGiftImage) : "./assets/image/nodata.png";
    };
    return HandleGiftImagePipe;
}());
HandleGiftImagePipe = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["W" /* Pipe */])({ name: 'handleGiftImage' })
], HandleGiftImagePipe);

//待审核退货订单详情退货原因类型
var ReasonTypePipe = (function () {
    function ReasonTypePipe() {
    }
    ReasonTypePipe.prototype.transform = function (param) {
        switch (param) {
            case "1":
                return "七天无理由退货";
            case "2":
                return "我不想要了";
            case "3":
                return "拍错了/订单信息填写错误";
            case "4":
                return "商家缺货";
            case "5":
                return "商家未按时发货";
        }
    };
    return ReasonTypePipe;
}());
ReasonTypePipe = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["W" /* Pipe */])({ name: 'reasonType' })
], ReasonTypePipe);

//# sourceMappingURL=app.pipe.js.map

/***/ }),

/***/ 351:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return UnhandleExpressgift; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__handle_expressgift_handle_expressgift__ = __webpack_require__(119);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__app_app_service__ = __webpack_require__(4);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




var UnhandleExpressgift = (function () {
    function UnhandleExpressgift(navCtrl, modalCtrl, alertCtrl, appService) {
        this.navCtrl = navCtrl;
        this.modalCtrl = modalCtrl;
        this.alertCtrl = alertCtrl;
        this.appService = appService;
        this.start = 0;
        this.limit = 10;
        this.showNoMore = false;
        this.load = {};
        this.loadingShow = true;
        //请求接口得到数据
        this.down = true;
        this.up = false;
        this.unhandleExpressGiftArray = [];
        this.load = __WEBPACK_IMPORTED_MODULE_3__app_app_service__["a" /* AppConfig */].load;
        this.getUnhandleExpressGiftList();
    }
    UnhandleExpressgift.prototype.getUnhandleExpressGiftList = function () {
        var _this = this;
        var url = __WEBPACK_IMPORTED_MODULE_3__app_app_service__["a" /* AppConfig */].API.getGiftList + "?type=1&start=" + this.start + "&limit=" + this.limit; //brandshopSeq=${this.brandshopSeqId}
        this.appService.httpGet(url).then(function (data) {
            _this.loadingShow = false;
            console.log(data);
            if (data.count == 0) {
                //空空如也
                _this.noData = true;
            }
            else {
                _this.noData = false;
                if (_this.start < data.count) {
                    if (_this.up) {
                        (_a = _this.unhandleExpressGiftArray).push.apply(_a, data.data);
                        _this.start += _this.limit;
                    }
                    else if (_this.down) {
                        _this.unhandleExpressGiftArray = data.data;
                        _this.start += _this.limit;
                        _this.content.scrollTo(0, 0, 0);
                    }
                }
                else {
                    _this.showNoMore = true;
                }
            }
            var _a;
        }).catch(function (error) {
            _this.appService.getToken(error, function () {
                _this.getUnhandleExpressGiftList();
            });
            _this.loadingShow = false;
            console.log(error);
            _this.appService.toast('网络异常，请稍后再试', 1000, 'middle');
        });
    };
    UnhandleExpressgift.prototype.goExpressgift = function () {
        var _this = this;
        var orderModal = this.modalCtrl.create(__WEBPACK_IMPORTED_MODULE_2__handle_expressgift_handle_expressgift__["a" /* HandleExpressgift */]);
        orderModal.onDidDismiss(function () {
            // 返回自提赠品页重新请求接口，渲染页面
            _this.start = 0;
            _this.down = true;
            _this.up = false;
            _this.getUnhandleExpressGiftList();
        });
        orderModal.present();
    };
    UnhandleExpressgift.prototype.sendProduct = function (index) {
        var _this = this;
        var alert = this.alertCtrl.create({
            message: '赠品发货确认',
            inputs: [
                {
                    name: 'companyName',
                    type: 'text',
                    placeholder: '请在此输入快递公司名称'
                }, {
                    name: 'orderNum',
                    type: 'text',
                    placeholder: '请在此输入快递单号'
                }
            ],
            buttons: [
                {
                    text: '取消',
                    handler: function () {
                        //点击取消后的执行代码
                    }
                },
                {
                    text: '确认',
                    handler: function (data) {
                        if (data.companyName != "" && data.orderNum != "") {
                            var body = {
                                memberGiftAccountSeq: _this.unhandleExpressGiftArray[index].memberGiftAccountSeq,
                                expressCompany: data.companyName,
                                expressNo: data.orderNum
                            };
                            var loading_1 = _this.appService.loading();
                            loading_1.present();
                            var url = __WEBPACK_IMPORTED_MODULE_3__app_app_service__["a" /* AppConfig */].API.confirmExpressInfo;
                            _this.appService.httpPost(url, body).then(function (data) {
                                if (data.type == "success") {
                                    _this.start = 0;
                                    _this.down = true;
                                    _this.up = false;
                                    loading_1.dismiss();
                                    _this.getUnhandleExpressGiftList();
                                }
                            }).catch(function (error) {
                                loading_1.dismiss();
                                console.log(error);
                                _this.appService.toast('网络异常，请稍后再试', 1000, 'middle');
                            });
                        }
                        else {
                            _this.appService.toast('请填写快递信息', 1000, 'middle');
                        }
                    }
                }
            ]
        });
        alert.present();
    };
    // 下拉刷新请求数据
    UnhandleExpressgift.prototype.refreshGetUnhandleExpressGiftList = function (refresher) {
        var _this = this;
        this.start = 0;
        this.down = true;
        this.up = false;
        var url = __WEBPACK_IMPORTED_MODULE_3__app_app_service__["a" /* AppConfig */].API.getGiftList + "?type=1&start=" + this.start + "&limit=" + this.limit;
        this.appService.httpGet(url).then(function (data) {
            refresher.complete();
            if (data.count == 0) {
                //空空如也
                _this.noData = true;
            }
            else {
                _this.noData = false;
                if (data.data.length != 0) {
                    _this.unhandleExpressGiftArray = data.data;
                    _this.start += _this.limit;
                }
                else {
                    _this.showNoMore = true;
                }
            }
        }).catch(function (error) {
            _this.appService.getToken(error, function () {
                _this.refreshGetUnhandleExpressGiftList(refresher);
            });
            refresher.complete();
            console.log(error);
            _this.appService.toast('网络异常，请稍后再试', 1000, 'middle');
        });
    };
    UnhandleExpressgift.prototype.infiniteGetUnhandleExpressGiftList = function (infiniteScroll) {
        var _this = this;
        // 上拉刷新请求数据
        this.down = false;
        this.up = true;
        var url = __WEBPACK_IMPORTED_MODULE_3__app_app_service__["a" /* AppConfig */].API.getGiftList + "?type=1&start=" + this.start + "&limit=" + this.limit;
        this.appService.httpGet(url).then(function (data) {
            infiniteScroll.complete();
            if (data.count == 0) {
                //空空如也
                _this.noData = true;
            }
            else {
                _this.noData = false;
                if (data.data.length != 0) {
                    (_a = _this.unhandleExpressGiftArray).push.apply(_a, data.data);
                    _this.start += _this.limit;
                }
                else {
                    _this.showNoMore = true;
                }
            }
            var _a;
        }).catch(function (error) {
            _this.appService.getToken(error, function () {
                _this.infiniteGetUnhandleExpressGiftList(infiniteScroll);
            });
            infiniteScroll.complete();
            console.log(error);
            _this.appService.toast('网络异常，请稍后再试', 1000, 'middle');
        });
    };
    return UnhandleExpressgift;
}());
__decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_14" /* ViewChild */])(__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["c" /* Content */]),
    __metadata("design:type", __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["c" /* Content */])
], UnhandleExpressgift.prototype, "content", void 0);
UnhandleExpressgift = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["n" /* Component */])({
        selector: 'unhandle-expressgift',template:/*ion-inline-start:"C:\Users\think\huchunGit\tpb02\tpb\src\pages\unhandle-expressgift\unhandle-expressgift.html"*/'<ion-content>\n\n	<ion-refresher (ionRefresh)="refreshGetUnhandleExpressGiftList($event)">\n\n		<ion-refresher-content></ion-refresher-content>\n\n	</ion-refresher>\n\n  <div class="gift-list">\n\n		<!-- loading -->\n\n    <div class="loading-wrapper" *ngIf="loadingShow">\n\n			<div>\n\n				<ion-spinner item-start [name]="load.spinner"></ion-spinner>\n\n			</div>\n\n			<div [innerHTML]="load.content"></div>\n\n		</div>\n\n		<div class="gift-item" *ngFor = "let item of unhandleExpressGiftArray;let i = index">\n\n			<dl>\n\n			<dt><img [src]="item.imageName | handleGiftImage" alt=""></dt>\n\n			<dd class="product-title">\n\n				<h2>{{item.giftName}}</h2>\n\n				<span class="unstart">立即兑换</span>\n\n			</dd>\n\n			<dd class="reserve-phone">\n\n						<span>预约手机：{{item.reservePhone}}</span>\n\n				<a href="tel:{{item.reservePhone}}"><img src="./assets/image/phone.png"></a>\n\n			</dd>\n\n			<dd class="member-phone">会员手机：{{item.memberPhone}}</dd>\n\n			<dd class="get-time">领取时间：{{item.receiveDate | date:\'yyyy-MM-dd HH:mm:ss\'}}</dd>\n\n			</dl>\n\n			<div class="reserve-time">\n\n				<div class="member-info">\n\n					<ul>\n\n						<li *ngFor = "let single of item.attrValueList">{{single.label}}：{{single.value}}</li>\n\n					</ul>\n\n				</div>\n\n				<div class="btn-time">\n\n					<button ion-button round (click)="sendProduct(i)">发货</button>\n\n				</div>\n\n			</div>\n\n		</div>\n\n  </div>\n\n  <div class="btn-selfview" (click)="goExpressgift()">\n\n		<span>查看已发货赠品</span>\n\n	</div>\n\n	<div class="no-data" *ngIf = "noData">\n\n		<img src="./assets/image/nodata.png" alt="">\n\n		<p>空空如也</p>\n\n	</div>\n\n	<div class="btn-noMore" *ngIf = "showNoMore">\n\n		<span>—— 没有更多赠品了 ——</span>\n\n	</div>\n\n  <ion-infinite-scroll (ionInfinite)="infiniteGetUnhandleExpressGiftList($event)" *ngIf = "!showNoMore">\n\n    <ion-infinite-scroll-content loadingText="加载更多..."></ion-infinite-scroll-content>\n\n  </ion-infinite-scroll>\n\n\n\n</ion-content>\n\n'/*ion-inline-end:"C:\Users\think\huchunGit\tpb02\tpb\src\pages\unhandle-expressgift\unhandle-expressgift.html"*/
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["l" /* NavController */],
        __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["j" /* ModalController */],
        __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["a" /* AlertController */],
        __WEBPACK_IMPORTED_MODULE_3__app_app_service__["b" /* AppService */]])
], UnhandleExpressgift);

//# sourceMappingURL=unhandle-expressgift.js.map

/***/ }),

/***/ 352:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return UnhandleSelfgift; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__handle_selfgift_handle_selfgift__ = __webpack_require__(62);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__app_app_service__ = __webpack_require__(4);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




var UnhandleSelfgift = (function () {
    function UnhandleSelfgift(navCtrl, modalCtrl, alertCtrl, changeDetectorRef, appService, zone) {
        this.navCtrl = navCtrl;
        this.modalCtrl = modalCtrl;
        this.alertCtrl = alertCtrl;
        this.changeDetectorRef = changeDetectorRef;
        this.appService = appService;
        this.zone = zone;
        this.start = 0;
        this.limit = 10;
        this.showNoMore = false;
        this.load = {};
        this.loadingShow = true;
        this.unhandleSeflGiftArray = [];
        this.down = true;
        this.up = false;
        this.load = __WEBPACK_IMPORTED_MODULE_3__app_app_service__["a" /* AppConfig */].load;
        this.getUnhandleSelfGiftList();
    }
    UnhandleSelfgift.prototype.addOrderStatusClass = function (param) {
        param.map(function (item) {
            if (item.giftType == '0' && item.status == '2') {
                item.className = 'unstart';
            }
            else if (item.giftType == '1') {
                item.className = 'unstart';
            }
            else {
                item.className = 'success';
            }
        });
    };
    UnhandleSelfgift.prototype.getUnhandleSelfGiftList = function () {
        var _this = this;
        var url = __WEBPACK_IMPORTED_MODULE_3__app_app_service__["a" /* AppConfig */].API.getGiftList + "?type=0&start=" + this.start + "&limit=" + this.limit;
        this.appService.httpGet(url).then(function (data) {
            _this.loadingShow = false;
            if (data.count == 0) {
                //空空如也
                _this.noData = true;
            }
            else {
                _this.noData = false;
                if (_this.start < data.count) {
                    if (_this.up) {
                        (_a = _this.unhandleSeflGiftArray).push.apply(_a, data.data);
                        _this.start += _this.limit;
                    }
                    else if (_this.down) {
                        _this.unhandleSeflGiftArray = data.data;
                        _this.start += _this.limit;
                        _this.content.scrollTo(0, 0, 0);
                    }
                    _this.addOrderStatusClass(_this.unhandleSeflGiftArray);
                }
                else {
                    _this.showNoMore = true;
                }
            }
            var _a;
        }).catch(function (error) {
            _this.appService.getToken(error, function () {
                _this.getUnhandleSelfGiftList();
            });
            _this.loadingShow = false;
            console.log(error);
            _this.appService.toast('网络异常，请稍后再试', 1000, 'middle');
        });
    };
    UnhandleSelfgift.prototype.goSelfgift = function () {
        var _this = this;
        var orderModal = this.modalCtrl.create(__WEBPACK_IMPORTED_MODULE_2__handle_selfgift_handle_selfgift__["a" /* HandleSelfgift */]);
        orderModal.onDidDismiss(function () {
            // 返回自提赠品页重新请求接口，渲染页面
            _this.start = 0;
            _this.down = true;
            _this.up = false;
            _this.getUnhandleSelfGiftList();
        });
        orderModal.present();
    };
    UnhandleSelfgift.prototype.clearReserveArriveTime = function (index) {
        this.unhandleSeflGiftArray[index].reserveShopTime = "";
    };
    UnhandleSelfgift.prototype.reserveAffirm = function (index) {
        var _this = this;
        if (this.unhandleSeflGiftArray[index].reserveShopTime != null) {
            // 预约确认更改数据
            var body = {
                memberGiftAccountSeq: this.unhandleSeflGiftArray[index].memberGiftAccountSeq,
                reserveShopTime: new Date(this.unhandleSeflGiftArray[index].reserveShopTime).getTime()
            };
            var loading_1 = this.appService.loading();
            loading_1.present();
            var url = __WEBPACK_IMPORTED_MODULE_3__app_app_service__["a" /* AppConfig */].API.confirmReserveShopTime;
            this.appService.httpPost(url, body).then(function (data) {
                if (data.type == "success") {
                    _this.start = 0;
                    _this.down = true;
                    _this.up = false;
                    loading_1.dismiss();
                    _this.getUnhandleSelfGiftList();
                }
            }).catch(function (error) {
                _this.appService.getToken(error, function () {
                    _this.reserveAffirm(index);
                });
                loading_1.dismiss();
                console.log(error.message);
                _this.appService.toast('操作失败，请稍后重试', 1000, 'middle');
            });
        }
        else {
            this.appService.toast('请选择会员预约到店时间', 1000, 'middle');
        }
    };
    UnhandleSelfgift.prototype.refreshGetUnhandleSelfGiftList = function (refresher) {
        var _this = this;
        // 下拉刷新请求数据
        this.start = 0;
        this.down = true;
        this.up = false;
        var url = __WEBPACK_IMPORTED_MODULE_3__app_app_service__["a" /* AppConfig */].API.getGiftList + "?type=0&start=" + this.start + "&limit=" + this.limit;
        this.appService.httpGet(url).then(function (data) {
            refresher.complete();
            if (data.data.length != 0) {
                _this.unhandleSeflGiftArray = data.data;
                _this.start += _this.limit;
                _this.addOrderStatusClass(_this.unhandleSeflGiftArray);
            }
            else {
                _this.showNoMore = true;
            }
        }).catch(function (error) {
            _this.appService.getToken(error, function () {
                _this.refreshGetUnhandleSelfGiftList(refresher);
            });
            refresher.complete();
            console.log(error);
            _this.appService.toast('网络异常，请稍后再试', 1000, 'middle');
        });
    };
    UnhandleSelfgift.prototype.infiniteGetUnhandleSelfGiftList = function (infiniteScroll) {
        var _this = this;
        // 上拉刷新请求数据
        this.down = false;
        this.up = true;
        var url = __WEBPACK_IMPORTED_MODULE_3__app_app_service__["a" /* AppConfig */].API.getGiftList + "?type=0&start=" + this.start + "&limit=" + this.limit;
        this.appService.httpGet(url).then(function (data) {
            infiniteScroll.complete();
            if (data.data.length != 0) {
                (_a = _this.unhandleSeflGiftArray).push.apply(_a, data.data);
                _this.start += _this.limit;
                _this.addOrderStatusClass(_this.unhandleSeflGiftArray);
            }
            else {
                _this.showNoMore = true;
            }
            var _a;
        }).catch(function (error) {
            _this.appService.getToken(error, function () {
                _this.infiniteGetUnhandleSelfGiftList(infiniteScroll);
            });
            infiniteScroll.complete();
            console.log(error);
            _this.appService.toast('网络异常，请稍后再试', 1000, 'middle');
        });
    };
    //回到顶部
    UnhandleSelfgift.prototype.scrollTo = function () {
        this.content.scrollTo(0, 0, 300);
    };
    //获取当前距离顶部位置
    UnhandleSelfgift.prototype.scrollHandler = function (event) {
        clearTimeout(this.timer);
        var self = this;
        this.timer = setTimeout(function () {
            self.zone.run(function () {
                if (event.scrollTop >= 300) {
                    self.toTop = true;
                }
                else {
                    self.toTop = false;
                }
            });
        }, 100);
    };
    return UnhandleSelfgift;
}());
__decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_14" /* ViewChild */])(__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["c" /* Content */]),
    __metadata("design:type", __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["c" /* Content */])
], UnhandleSelfgift.prototype, "content", void 0);
UnhandleSelfgift = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["n" /* Component */])({
        selector: 'unhandle-selfgift',template:/*ion-inline-start:"C:\Users\think\huchunGit\tpb02\tpb\src\pages\unhandle-selfgift\unhandle-selfgift.html"*/'<ion-content (ionScroll)="scrollHandler($event)">\n\n  <ion-refresher (ionRefresh)="refreshGetUnhandleSelfGiftList($event)">\n\n		<ion-refresher-content></ion-refresher-content>\n\n  </ion-refresher>\n\n  <div class="gift-list">\n\n		<!-- loading -->\n\n		<div class="loading-wrapper" *ngIf="loadingShow">\n\n			<div>\n\n				<ion-spinner item-start [name]="load.spinner"></ion-spinner>\n\n			</div>\n\n			<div [innerHTML]="load.content"></div>\n\n		</div>\n\n		<div class="gift-item" *ngFor="let item of unhandleSeflGiftArray;let i = index">\n\n			<dl>\n\n				<dt><img [src]="item.imageName | handleGiftImage" alt=""></dt>\n\n				<dd class="product-title">\n\n					<h2>{{ item.giftName }}</h2>\n\n					<span [ngClass]="item.className">{{ item.giftType | setGiftType: item.status }}</span>\n\n				</dd>\n\n				<dd class="reserve-phone">\n\n					<span>预约手机：{{ item.reservePhone }}</span>\n\n					<a href="tel:13761489650"><img src="./assets/image/phone.png"></a>\n\n				</dd>\n\n				<dd class="member-phone" *ngIf="item.giftType==\'0\'">会员手机：{{ item.memberPhone }}</dd>\n\n				<dd class="get-time">领取时间：{{ item.receiveDate | date:\'yyyy-MM-dd HH:mm:ss\' }}</dd>\n\n			</dl>\n\n			<div class="reserve-time" *ngIf="item.giftType==\'0\' && item.status==\'2\'">\n\n				<div class="time-text">\n\n					<ion-datetime \n\n						placeholder="会员预约到店时间" \n\n						cancelText="取消" \n\n						doneText="确定" \n\n						displayFormat="YYYY-MM-DD HH:mm:ss" \n\n						[(ngModel)]="item.reserveShopTime">\n\n					</ion-datetime>\n\n					<span class="clear" *ngIf="item.reserveShopTime" (click)="clearReserveArriveTime(i)">X</span>\n\n				</div>\n\n				<div class="btn-time">\n\n					<button ion-button round (touchend)="reserveAffirm(i)">预约确认</button>\n\n				</div>\n\n			</div>\n\n			<div class="reserve-time" *ngIf="item.giftType==\'0\' && item.status==\'3\'">\n\n				<div class="show-time">预约到店时间：{{ item.reserveShopTime | date:\'yyyy-MM-dd HH:mm:ss\' }}</div>\n\n			</div>\n\n		\n\n		</div>\n\n	</div>\n\n	<div class="toTop" (click)="scrollTo()" *ngIf="toTop">\n\n		<img src="./assets/image/toTop.png" alt="">\n\n	</div>\n\n  <div class="btn-selfview" (click)="goSelfgift()">\n\n    <span>查看已兑换自提赠品</span>\n\n	</div>\n\n	<div class="no-data" *ngIf = "noData">\n\n		<img src="./assets/image/nodata.png" alt="">\n\n		<p>空空如也</p>\n\n	</div>\n\n	<div class="btn-noMore" *ngIf = "showNoMore">\n\n		<span>—— 没有更多赠品了 ——</span>\n\n	</div>\n\n  <ion-infinite-scroll (ionInfinite)="infiniteGetUnhandleSelfGiftList($event)" *ngIf = "!showNoMore">\n\n    <ion-infinite-scroll-content loadingText="加载更多..."></ion-infinite-scroll-content>\n\n  </ion-infinite-scroll>\n\n</ion-content>\n\n'/*ion-inline-end:"C:\Users\think\huchunGit\tpb02\tpb\src\pages\unhandle-selfgift\unhandle-selfgift.html"*/
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["l" /* NavController */],
        __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["j" /* ModalController */],
        __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["a" /* AlertController */],
        __WEBPACK_IMPORTED_MODULE_0__angular_core__["k" /* ChangeDetectorRef */],
        __WEBPACK_IMPORTED_MODULE_3__app_app_service__["b" /* AppService */],
        __WEBPACK_IMPORTED_MODULE_0__angular_core__["P" /* NgZone */]])
], UnhandleSelfgift);

//# sourceMappingURL=unhandle-selfgift.js.map

/***/ }),

/***/ 353:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AwardActivity; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__app_app_service__ = __webpack_require__(4);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



var AwardActivity = (function () {
    function AwardActivity(navCtrl, alertCtrl, appService) {
        this.navCtrl = navCtrl;
        this.alertCtrl = alertCtrl;
        this.appService = appService;
        this.pageSize = 10;
        this.currentPage = 1;
        this.awardActivity = [];
        this.count = 0;
        this.isShow = false;
        this.isEmpty = false;
        this.requestFail = false;
        this.isRefresh = true;
        this.isLoadingShow = false;
        this.load = __WEBPACK_IMPORTED_MODULE_2__app_app_service__["a" /* AppConfig */].load;
        this.getAllData();
    }
    AwardActivity.prototype.getAwardActivity = function () {
        var _this = this;
        this.isLoadingShow = true;
        var url = __WEBPACK_IMPORTED_MODULE_2__app_app_service__["a" /* AppConfig */].API.bonusList + "?typeList=3,4&statusList=0,1&start=" + (this.currentPage - 1) * this.pageSize + "&limit=" + this.pageSize;
        this.appService.httpGet(url)
            .then(function (data) {
            if (data.data.length > 0) {
                data.data.map(function (item) {
                    item.baseAmount = item.baseAmount.toFixed(2);
                    item.percent = item.percent;
                    item.amount = item.amount.toFixed(2);
                    item.returnAmount = item.returnAmount.toFixed(2);
                });
                (_a = _this.awardActivity).push.apply(_a, data.data);
            }
            _this.count = data.count;
            _this.isEmpty = data.count === 0 ? true : false;
            _this.requestFail = false;
            _this.isLoadingShow = false;
            var _a;
        }).catch(function (error) {
            _this.appService.getToken(error, function () {
                _this.getAwardActivity();
            });
            console.log(error);
            _this.requestFail = true;
            _this.isEmpty = false;
            _this.isLoadingShow = false;
        });
    };
    /** 获取总金额 **/
    AwardActivity.prototype.getBonusSum = function () {
        var _this = this;
        var url = __WEBPACK_IMPORTED_MODULE_2__app_app_service__["a" /* AppConfig */].API.bonusSum + "?typeList=3,4&statusList=0,1";
        this.appService.httpGet(url)
            .then(function (data) {
            _this.sum = data.sum;
            _this.setIsShow(_this.sum);
        }).catch(function (error) {
            _this.appService.getToken(error, function () {
                _this.getBonusSum();
            });
            console.log(error);
        });
    };
    /** 有无明细列表时的判断（判断总金额是否为0）**/
    AwardActivity.prototype.setIsShow = function (sum) {
        return this.isShow = sum > 0 ? true : false;
    };
    /** 上拉翻页 **/
    AwardActivity.prototype.loadMore = function (infiniteScroll) {
        this.currentPage++;
        this.refreshPage(infiniteScroll);
    };
    /** 请求错误时，刷新页面 **/
    AwardActivity.prototype.refresh = function () {
        this.requestFail = false;
        this.currentPage = 1;
        this.getAllData();
    };
    /** 下拉刷新页面 **/
    AwardActivity.prototype.pullRefresh = function (refresher) {
        this.requestFail = false;
        this.isEmpty = false;
        this.currentPage = 1;
        this.awardActivity = [];
        this.refreshPage(refresher);
    };
    /** 下拉上拉公共方法 **/
    AwardActivity.prototype.refreshPage = function (refresher) {
        var _this = this;
        setTimeout(function () {
            _this.getAllData();
            refresher.complete();
        }, 500);
    };
    /** 获取列表数据和总金额 **/
    AwardActivity.prototype.getAllData = function () {
        this.getAwardActivity();
        this.getBonusSum();
    };
    return AwardActivity;
}());
AwardActivity = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["n" /* Component */])({
        selector: 'award-activity',template:/*ion-inline-start:"C:\Users\think\huchunGit\tpb02\tpb\src\pages\award-activity\award-activity.html"*/'<ion-content>\n\n  <div class="loading-wrapper" *ngIf="isLoadingShow">\n\n    <div>\n\n      <ion-spinner item-start [name]="load.spinner"></ion-spinner>\n\n    </div>\n\n    <div [innerHTML]="load.content"></div>\n\n  </div>\n\n  <ion-refresher *ngIf="!isLoadingShow" (ionRefresh)="pullRefresh($event)">\n\n    <ion-refresher-content></ion-refresher-content>\n\n  </ion-refresher>\n\n  <div class="withdraw-record">\n\n    <div class="withdraw-total">\n\n      <span *ngIf="isShow">总金额：￥ {{ sum }}</span>\n\n    </div>\n\n    <div class="record-list">\n\n      <div class="withdraw-item" *ngFor = "let item of awardActivity">\n\n        <ul>\n\n          <li class=\'order-number\'>\n\n            <span *ngIf="item.type === 3">订单编号：{{ item.relateId }}</span>\n\n            <span *ngIf="item.type === 4">会员手机：{{ item.mobile }}</span>\n\n          </li>\n\n          <li class=\'date\'>活动时间：{{ item.startTime | date:\'yyyy.MM.dd\' }}--{{ item.endTime | date:\'yyyy.MM.dd\' }} </li>\n\n          <li class=\'base-number\'>\n\n              <span *ngIf="item.type === 3">结算基数：￥{{ item.baseAmount }}</span>\n\n              <span *ngIf="item.type === 4">结算基数：——</span>\n\n          </li>\n\n          <li class=\'percentage\'>\n\n            <span *ngIf="item.type === 3">奖励比例：{{ item.percent }}</span>\n\n            <span *ngIf="item.type === 4">奖励比例：——</span>\n\n          </li>\n\n          <li class="money">奖励金额：￥{{ item.amount }}</li>\n\n        </ul>\n\n      </div>\n\n    </div>\n\n    <div class="no-data" *ngIf="isEmpty">\n\n      <img src="./assets/image/nodata.png" alt="">\n\n      <p>空空如也</p>\n\n    </div>\n\n    <div class="btn-noMore" *ngIf="awardActivity.length !== 0 && awardActivity.length === count">\n\n      <span>—— 没有更多信息了 ——</span>\n\n    </div>\n\n  </div>\n\n  <div class="request-defeat" *ngIf="requestFail">\n\n    <img src="./assets/image/requestDefeat.png" alt="">\n\n    <p>啊哦！页面走丢了</p>\n\n    <button class="btn-request-defeat" ion-button full (touchstart)="refresh()">\n\n      刷新再找一找\n\n    </button>\n\n  </div>\n\n  <ion-infinite-scroll  (ionInfinite)="loadMore($event)" *ngIf="awardActivity.length < count">\n\n    <ion-infinite-scroll-content\n\n      loadingSpinner="bubbles"\n\n      loadingText="加载中">\n\n    </ion-infinite-scroll-content>\n\n  </ion-infinite-scroll>\n\n</ion-content>\n\n'/*ion-inline-end:"C:\Users\think\huchunGit\tpb02\tpb\src\pages\award-activity\award-activity.html"*/
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["l" /* NavController */],
        __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["a" /* AlertController */],
        __WEBPACK_IMPORTED_MODULE_2__app_app_service__["b" /* AppService */]])
], AwardActivity);

//# sourceMappingURL=award-activity.js.map

/***/ }),

/***/ 354:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AwardOrder; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__app_app_service__ = __webpack_require__(4);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



var AwardOrder = (function () {
    function AwardOrder(navCtrl, alertCtrl, appService) {
        this.navCtrl = navCtrl;
        this.alertCtrl = alertCtrl;
        this.appService = appService;
        this.pageSize = 10;
        this.currentPage = 1;
        this.awardOrder = [];
        this.count = 0;
        this.isShow = false;
        this.requestFail = false;
        this.isEmpty = false;
        this.isRefresh = true;
        this.isLoadingShow = false;
        this.load = __WEBPACK_IMPORTED_MODULE_2__app_app_service__["a" /* AppConfig */].load;
        this.getAllData();
    }
    AwardOrder.prototype.getAwardOrder = function () {
        var _this = this;
        this.isLoadingShow = true;
        var url = __WEBPACK_IMPORTED_MODULE_2__app_app_service__["a" /* AppConfig */].API.bonusList + "?typeList=1&statusList=0,1&start=" + (this.currentPage - 1) * this.pageSize + "&limit=" + this.pageSize;
        this.appService.httpGet(url)
            .then(function (data) {
            if (data.data.length > 0) {
                data.data.map(function (item) {
                    item.baseAmount = item.baseAmount.toFixed(2);
                    item.percent = item.percent;
                    item.amount = item.amount.toFixed(2);
                    item.returnAmount = item.returnAmount.toFixed(2);
                });
                (_a = _this.awardOrder).push.apply(_a, data.data);
            }
            _this.count = data.count;
            _this.isEmpty = data.count === 0 ? true : false;
            _this.requestFail = false;
            _this.isLoadingShow = false;
            var _a;
        }).catch(function (error) {
            _this.appService.getToken(error, function () {
                _this.getAwardOrder();
            });
            console.log(error);
            _this.requestFail = true;
            _this.isEmpty = false;
            _this.isLoadingShow = false;
        });
    };
    /** 获取总金额 **/
    AwardOrder.prototype.getBonusSum = function () {
        var _this = this;
        var url = __WEBPACK_IMPORTED_MODULE_2__app_app_service__["a" /* AppConfig */].API.bonusSum + "?typeList=1&statusList=0,1";
        this.appService.httpGet(url)
            .then(function (data) {
            _this.sum = data.sum;
            _this.setIsShow(_this.sum);
        }).catch(function (error) {
            _this.appService.getToken(error, function () {
                _this.getBonusSum();
            });
            console.log(error);
        });
    };
    /** 有无明细列表时的判断（判断总金额是否为0）**/
    AwardOrder.prototype.setIsShow = function (sum) {
        return this.isShow = sum > 0 ? true : false;
    };
    /** 上拉翻页 **/
    AwardOrder.prototype.loadMore = function (infiniteScroll) {
        this.currentPage++;
        this.refreshPage(infiniteScroll);
    };
    /** 请求错误时，刷新页面 **/
    AwardOrder.prototype.refresh = function () {
        this.requestFail = false;
        this.currentPage = 1;
        this.getAllData();
    };
    /** 下拉刷新页面 **/
    AwardOrder.prototype.pullRefresh = function (refresher) {
        this.requestFail = false;
        this.isEmpty = false;
        this.currentPage = 1;
        this.awardOrder = [];
        this.refreshPage(refresher);
    };
    /** 下拉上拉公共方法 **/
    AwardOrder.prototype.refreshPage = function (refresher) {
        var _this = this;
        setTimeout(function () {
            _this.getAllData();
            refresher.complete();
        }, 500);
    };
    /** 获取列表数据和总金额 **/
    AwardOrder.prototype.getAllData = function () {
        this.getAwardOrder();
        this.getBonusSum();
    };
    return AwardOrder;
}());
AwardOrder = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["n" /* Component */])({
        selector: 'award-order',template:/*ion-inline-start:"C:\Users\think\huchunGit\tpb02\tpb\src\pages\award-order\award-order.html"*/'<ion-content>\n\n  <div class="loading-wrapper" *ngIf="isLoadingShow">\n\n    <div>\n\n      <ion-spinner item-start [name]="load.spinner"></ion-spinner>\n\n    </div>\n\n    <div [innerHTML]="load.content"></div>\n\n  </div>\n\n  <ion-refresher *ngIf="!isLoadingShow" (ionRefresh)="pullRefresh($event)">\n\n    <ion-refresher-content></ion-refresher-content>\n\n  </ion-refresher>\n\n  <div class="withdraw-record">\n\n    <div class="withdraw-total">\n\n     <span *ngIf="isShow">总金额：￥ {{ sum }}</span>\n\n    </div>\n\n    <div class="record-list">\n\n      <div class="withdraw-item" *ngFor = "let item of awardOrder">\n\n        <ul>\n\n          <li class=\'order-number\'>订单编号：{{ item.relateId }}</li>\n\n          <li class=\'base-number\'>结算基数：￥{{ item.baseAmount }}</li>\n\n          <li class=\'percentage\'>奖励比例：{{ item.percent }}</li>\n\n          <li class="money">奖励金额：￥{{ item.amount }}</li>\n\n        </ul>\n\n      </div>\n\n    </div>\n\n    <div class="no-data" *ngIf="isEmpty">\n\n      <img src="./assets/image/nodata.png" alt="">\n\n      <p>空空如也</p>\n\n    </div>\n\n    <div class="btn-noMore" *ngIf="awardOrder.length !== 0 && awardOrder.length === count">\n\n      <span>—— 没有更多信息了 ——</span>\n\n    </div>\n\n  </div>\n\n  <div class="request-defeat" *ngIf="requestFail">\n\n    <img src="./assets/image/requestDefeat.png" alt="">\n\n    <p>啊哦！页面走丢了</p>\n\n    <button class="btn-request-defeat" ion-button full (touchstart)="refresh()">\n\n      刷新再找一找\n\n    </button>\n\n  </div>\n\n  <ion-infinite-scroll  (ionInfinite)="loadMore($event)" *ngIf="awardOrder.length < count">\n\n      <ion-infinite-scroll-content\n\n        loadingSpinner="bubbles"\n\n        loadingText="加载中">\n\n      </ion-infinite-scroll-content>\n\n    </ion-infinite-scroll>\n\n</ion-content>\n\n'/*ion-inline-end:"C:\Users\think\huchunGit\tpb02\tpb\src\pages\award-order\award-order.html"*/
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["l" /* NavController */],
        __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["a" /* AlertController */],
        __WEBPACK_IMPORTED_MODULE_2__app_app_service__["b" /* AppService */]])
], AwardOrder);

//# sourceMappingURL=award-order.js.map

/***/ }),

/***/ 355:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return BindAccount; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__add_account_add_account__ = __webpack_require__(120);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



var BindAccount = (function () {
    function BindAccount(navCtrl, modalCtrl, navParams) {
        this.navCtrl = navCtrl;
        this.modalCtrl = modalCtrl;
        this.navParams = navParams;
        this.userId = this.navParams.get('param');
    }
    BindAccount.prototype.goAccount = function () {
        var accountModal = this.modalCtrl.create(__WEBPACK_IMPORTED_MODULE_2__add_account_add_account__["a" /* AddAccount */], { userId: this.userId });
        accountModal.present();
    };
    return BindAccount;
}());
BindAccount = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["n" /* Component */])({
        selector: 'bind-account',template:/*ion-inline-start:"C:\Users\think\huchunGit\tpb02\tpb\src\pages\account\bind-account\bind-account.html"*/'<ion-header>\n\n  <ion-navbar>\n\n    <ion-title text-center>绑定收款账户</ion-title>\n\n  </ion-navbar>\n\n</ion-header>\n\n<ion-content>\n\n  <div class="bind-account">\n\n  	<div class="img-list">\n\n  		<ul>\n\n  			<li class="logo"><img src="./assets/image/applogo.png" alt=""></li>\n\n		  	<li class="bind"><img src="./assets/image/bind.png" alt=""></li>\n\n		  	<li class="wx"><img src="./assets/image/wx.png" alt=""></li>\n\n  		</ul>\n\n  		<div class="text">绑定后的微信将作为你的收款账户</div>\n\n  	</div>\n\n  </div>\n\n  <button class="btn-bind" ion-button (touchstart)="goAccount()">绑定微信</button>\n\n</ion-content>\n\n'/*ion-inline-end:"C:\Users\think\huchunGit\tpb02\tpb\src\pages\account\bind-account\bind-account.html"*/
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["l" /* NavController */],
        __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["j" /* ModalController */],
        __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["m" /* NavParams */]])
], BindAccount);

//# sourceMappingURL=bind-account.js.map

/***/ }),

/***/ 356:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return OrderDetail; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__app_app_service__ = __webpack_require__(4);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


var OrderDetail = (function () {
    function OrderDetail(appService) {
        this.appService = appService;
        /* pageSize, currentPage, orderDetail, sum, isShow
        *  每一页数量，当前页，处理订单列表，总金额，有无列表明细时的判断
        */
        this.pageSize = 10;
        this.currentPage = 1;
        this.orderDetail = [];
        this.count = 0;
        this.isShow = false;
        this.isEmpty = false;
        this.requestFail = false;
        this.isRefresh = true;
        this.isLoadingShow = false;
        this.load = __WEBPACK_IMPORTED_MODULE_1__app_app_service__["a" /* AppConfig */].load;
        this.getAllData();
    }
    OrderDetail.prototype.getOrderDetail = function () {
        var _this = this;
        this.isLoadingShow = true;
        var url = __WEBPACK_IMPORTED_MODULE_1__app_app_service__["a" /* AppConfig */].API.bonusList + "?typeList=1&statusList=2&start=" + (this.currentPage - 1) * this.pageSize + "&limit=" + this.pageSize;
        this.appService.httpGet(url)
            .then(function (data) {
            if (data.data.length > 0) {
                data.data.map(function (item) {
                    item.baseAmount = item.baseAmount.toFixed(2);
                    item.percent = item.percent;
                    item.amount = item.amount.toFixed(2);
                    item.returnAmount = item.returnAmount.toFixed(2);
                });
                (_a = _this.orderDetail).push.apply(_a, data.data);
            }
            _this.count = data.count;
            _this.isEmpty = data.count === 0 ? true : false;
            _this.requestFail = false;
            _this.isLoadingShow = false;
            var _a;
        }).catch(function (error) {
            _this.appService.getToken(error, function () {
                _this.getOrderDetail();
            });
            console.log(error);
            _this.requestFail = true;
            _this.isEmpty = false;
            _this.isLoadingShow = false;
        });
    };
    /** 获取总金额 **/
    OrderDetail.prototype.getBonusSum = function () {
        var _this = this;
        var url = __WEBPACK_IMPORTED_MODULE_1__app_app_service__["a" /* AppConfig */].API.bonusSum + "?typeList=1&statusList=2";
        this.appService.httpGet(url)
            .then(function (data) {
            _this.sum = data.sum;
            _this.setIsShow(_this.sum);
        }).catch(function (error) {
            _this.appService.getToken(error, function () {
                _this.getBonusSum();
            });
            console.log(error);
        });
    };
    /** 有无明细列表时的判断（判断总金额是否为0）**/
    OrderDetail.prototype.setIsShow = function (sum) {
        return this.isShow = sum > 0 ? true : false;
    };
    /** 上拉翻页 **/
    OrderDetail.prototype.loadMore = function (infiniteScroll) {
        this.currentPage++;
        this.refreshPage(infiniteScroll);
    };
    /** 请求错误时，刷新页面 **/
    OrderDetail.prototype.refresh = function () {
        this.requestFail = false;
        this.currentPage = 1;
        this.getAllData();
    };
    /** 下拉刷新页面 **/
    OrderDetail.prototype.pullRefresh = function (refresher) {
        this.requestFail = false;
        this.isEmpty = false;
        this.currentPage = 1;
        this.orderDetail = [];
        this.refreshPage(refresher);
    };
    /** 下拉上拉公共方法 **/
    OrderDetail.prototype.refreshPage = function (refresher) {
        var _this = this;
        setTimeout(function () {
            _this.getAllData();
            refresher.complete();
        }, 500);
    };
    /** 获取列表数据和总金额 **/
    OrderDetail.prototype.getAllData = function () {
        this.getOrderDetail();
        this.getBonusSum();
    };
    return OrderDetail;
}());
OrderDetail = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["n" /* Component */])({template:/*ion-inline-start:"C:\Users\think\huchunGit\tpb02\tpb\src\pages\order-detail\order-detail.html"*/'<ion-content>\n\n  <div class="loading-wrapper" *ngIf="isLoadingShow">\n\n    <div>\n\n      <ion-spinner item-start [name]="load.spinner"></ion-spinner>\n\n    </div>\n\n    <div [innerHTML]="load.content"></div>\n\n  </div>\n\n  <ion-refresher *ngIf="!isLoadingShow" (ionRefresh)="pullRefresh($event)">\n\n    <ion-refresher-content></ion-refresher-content>\n\n  </ion-refresher>\n\n  <div class="withdraw-record">\n\n    <div class="withdraw-total">\n\n     <span *ngIf="isShow">总金额：￥ {{ sum }}</span>\n\n    </div>\n\n    <div class="record-list">\n\n      <div class="withdraw-item" *ngFor = "let item of orderDetail">\n\n        <ul>\n\n          <li class=\'order-number\'>订单编号：{{ item.relateId }}</li>\n\n          <li class=\'base-number\'>结算基数：￥{{ item.baseAmount }}</li>\n\n          <li class=\'percentage\'>奖励比例：{{ item.percent }}</li>\n\n          <li class="money">奖励金额：￥{{ item.amount }}</li>\n\n        </ul>\n\n      </div>\n\n    </div>\n\n    <div class="no-data" *ngIf="isEmpty">\n\n      <img src="./assets/image/nodata.png" alt="">\n\n      <p>空空如也</p>\n\n    </div>\n\n    <div class="btn-noMore" *ngIf="orderDetail.length !== 0 && orderDetail.length === count">\n\n      <span>—— 没有更多信息了 ——</span>\n\n    </div>\n\n  </div>\n\n  <div class="request-defeat" *ngIf="requestFail">\n\n    <img src="./assets/image/requestDefeat.png" alt="">\n\n    <p>啊哦！页面走丢了</p>\n\n    <button class="btn-request-defeat" ion-button full (touchstart)="refresh()">\n\n      刷新再找一找\n\n    </button>\n\n  </div>\n\n  <ion-infinite-scroll  (ionInfinite)="loadMore($event)" *ngIf="orderDetail.length < count">\n\n      <ion-infinite-scroll-content\n\n        loadingSpinner="bubbles"\n\n        loadingText="加载中">\n\n      </ion-infinite-scroll-content>\n\n    </ion-infinite-scroll>\n\n</ion-content>\n\n'/*ion-inline-end:"C:\Users\think\huchunGit\tpb02\tpb\src\pages\order-detail\order-detail.html"*/,
        selector: 'withdraw-orderDetail'
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1__app_app_service__["b" /* AppService */]])
], OrderDetail);

//# sourceMappingURL=order-detail.js.map

/***/ }),

/***/ 357:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AwardDetail; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_ionic_angular__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__app_app_service__ = __webpack_require__(4);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



var AwardDetail = (function () {
    function AwardDetail(navParams, appService) {
        this.navParams = navParams;
        this.appService = appService;
        this.pageSize = 10;
        this.currentPage = 1;
        this.awardDetail = [];
        this.count = 0;
        this.isShow = false;
        this.isEmpty = false;
        this.requestFail = false;
        this.isRefresh = true;
        this.isLoadingShow = false;
        this.load = __WEBPACK_IMPORTED_MODULE_2__app_app_service__["a" /* AppConfig */].load;
        this.getAllData();
    }
    AwardDetail.prototype.getAwardDetail = function () {
        var _this = this;
        this.isLoadingShow = true;
        var url = __WEBPACK_IMPORTED_MODULE_2__app_app_service__["a" /* AppConfig */].API.bonusList + "?typeList=3,4&statusList=2&start=" + (this.currentPage - 1) * this.pageSize + "&limit=" + this.pageSize;
        this.appService.httpGet(url)
            .then(function (data) {
            if (data.data.length > 0) {
                data.data.map(function (item) {
                    item.baseAmount = item.baseAmount.toFixed(2);
                    item.percent = item.percent;
                    item.amount = item.amount.toFixed(2);
                    item.returnAmount = item.returnAmount.toFixed(2);
                });
                (_a = _this.awardDetail).push.apply(_a, data.data);
            }
            _this.count = data.count;
            _this.isEmpty = data.count === 0 ? true : false;
            _this.requestFail = false;
            _this.isLoadingShow = false;
            var _a;
        }).catch(function (error) {
            _this.appService.getToken(error, function () {
                _this.getAwardDetail();
            });
            console.log(error);
            _this.requestFail = true;
            _this.isEmpty = false;
            _this.isLoadingShow = false;
        });
    };
    /** 获取总金额 **/
    AwardDetail.prototype.getBonusSum = function () {
        var _this = this;
        var url = __WEBPACK_IMPORTED_MODULE_2__app_app_service__["a" /* AppConfig */].API.bonusSum + "?typeList=3,4&statusList=2";
        this.appService.httpGet(url)
            .then(function (data) {
            _this.sum = data.sum;
            _this.setIsShow(_this.sum);
        }).catch(function (error) {
            _this.appService.getToken(error, function () {
                _this.getBonusSum();
            });
            console.log(error);
        });
    };
    /** 有无明细列表时的判断（判断总金额是否为0）**/
    AwardDetail.prototype.setIsShow = function (sum) {
        return this.isShow = sum > 0 ? true : false;
    };
    /** 上拉翻页 **/
    AwardDetail.prototype.loadMore = function (infiniteScroll) {
        this.currentPage++;
        this.refreshPage(infiniteScroll);
    };
    /** 请求错误时，刷新页面 **/
    AwardDetail.prototype.refresh = function () {
        this.requestFail = false;
        this.currentPage = 1;
        this.getAllData();
    };
    /** 下拉刷新页面 **/
    AwardDetail.prototype.pullRefresh = function (refresher) {
        this.requestFail = false;
        this.isEmpty = false;
        this.currentPage = 1;
        this.awardDetail = [];
        this.refreshPage(refresher);
    };
    /** 下拉上拉公共方法 **/
    AwardDetail.prototype.refreshPage = function (refresher) {
        var _this = this;
        setTimeout(function () {
            _this.getAllData();
            refresher.complete();
        }, 500);
    };
    /** 获取列表数据和总金额 **/
    AwardDetail.prototype.getAllData = function () {
        this.getAwardDetail();
        this.getBonusSum();
    };
    return AwardDetail;
}());
AwardDetail = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_1__angular_core__["n" /* Component */])({template:/*ion-inline-start:"C:\Users\think\huchunGit\tpb02\tpb\src\pages\award-detail\award-detail.html"*/'<ion-content>\n\n  <div class="loading-wrapper" *ngIf="isLoadingShow">\n\n    <div>\n\n      <ion-spinner item-start [name]="load.spinner"></ion-spinner>\n\n    </div>\n\n    <div [innerHTML]="load.content"></div>\n\n  </div>\n\n  <ion-refresher *ngIf="!isLoadingShow" (ionRefresh)="pullRefresh($event)">\n\n    <ion-refresher-content></ion-refresher-content>\n\n  </ion-refresher>\n\n  <div class="withdraw-record">\n\n    <div class="withdraw-total">\n\n      <span *ngIf="isShow">总金额：￥ {{ sum }}</span>\n\n    </div>\n\n    <div class="record-list">\n\n      <div class="withdraw-item" *ngFor = "let item of awardDetail">\n\n        <ul>\n\n          <li class=\'order-number\'>\n\n            <span *ngIf="item.type === 3">订单编号：{{ item.relateId }}</span>\n\n            <span *ngIf="item.type === 4">会员手机：{{ item.mobile }}</span>\n\n          </li>\n\n          <li class=\'date\'>活动时间：{{ item.startTime | date:\'yyyy.MM.dd\' }}--{{ item.endTime | date:\'yyyy.MM.dd\' }} </li>\n\n          <li class=\'base-number\'>\n\n              <span *ngIf="item.type === 3">结算基数：￥{{ item.baseAmount }}</span>\n\n              <span *ngIf="item.type === 4">结算基数：——</span>\n\n          </li>\n\n          <li class=\'percentage\'>\n\n            <span *ngIf="item.type === 3">奖励比例：{{ item.percent }}</span>\n\n            <span *ngIf="item.type === 4">奖励比例：——</span>\n\n          </li>\n\n          <li class="money">奖励金额：￥{{ item.amount }}</li>\n\n        </ul>\n\n      </div>\n\n    </div>\n\n    <div class="no-data" *ngIf="isEmpty">\n\n      <img src="./assets/image/nodata.png" alt="">\n\n      <p>空空如也</p>\n\n    </div>\n\n    <div class="btn-noMore" *ngIf="awardDetail.length !== 0 && awardDetail.length === count">\n\n      <span>—— 没有更多信息了 ——</span>\n\n    </div>\n\n  </div>\n\n  <div class="request-defeat" *ngIf="requestFail">\n\n    <img src="./assets/image/requestDefeat.png" alt="">\n\n    <p>啊哦！页面走丢了</p>\n\n    <button class="btn-request-defeat" ion-button full (touchstart)="refresh()">\n\n      刷新再找一找\n\n    </button>\n\n  </div>\n\n  <ion-infinite-scroll  (ionInfinite)="loadMore($event)" *ngIf="awardDetail.length < count">\n\n    <ion-infinite-scroll-content\n\n      loadingSpinner="bubbles"\n\n      loadingText="加载中">\n\n    </ion-infinite-scroll-content>\n\n  </ion-infinite-scroll>\n\n</ion-content>\n\n'/*ion-inline-end:"C:\Users\think\huchunGit\tpb02\tpb\src\pages\award-detail\award-detail.html"*/,
        selector: 'withdraw-awardDetail'
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_0_ionic_angular__["m" /* NavParams */],
        __WEBPACK_IMPORTED_MODULE_2__app_app_service__["b" /* AppService */]])
], AwardDetail);

//# sourceMappingURL=award-detail.js.map

/***/ }),

/***/ 4:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AppConfig; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return AppService; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_http__ = __webpack_require__(40);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_rxjs_add_operator_toPromise__ = __webpack_require__(297);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_rxjs_add_operator_toPromise___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_rxjs_add_operator_toPromise__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_rxjs_add_operator_timeout__ = __webpack_require__(299);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_rxjs_add_operator_timeout___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4_rxjs_add_operator_timeout__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_buffer__ = __webpack_require__(58);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_buffer___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_5_buffer__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__app_env__ = __webpack_require__(311);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};







var AppConfig = AppConfig_1 = (function () {
    function AppConfig() {
    }
    return AppConfig;
}());
//域名基地址
AppConfig.mainUrl = __WEBPACK_IMPORTED_MODULE_6__app_env__["a" /* ENV */].mode;
AppConfig.hostUrl = "https://rest." + AppConfig_1.mainUrl;
AppConfig.imgUrl = "https://images." + AppConfig_1.mainUrl + "/";
//请求超时时间
AppConfig.TIME_OUT = 30000;
// 上拉加载、下拉刷新的定时器时间
AppConfig.LOAD_TIME = 500;
// 请求token预留时间1800000毫秒（半小时）
AppConfig.RESERVED_TIME = 1800000;
//获取token的url
AppConfig.oauthTokenUrl = AppConfig_1.hostUrl + "/uaa/oauth/token";
AppConfig.client_id = __WEBPACK_IMPORTED_MODULE_6__app_env__["a" /* ENV */].client_id;
AppConfig.secret = __WEBPACK_IMPORTED_MODULE_6__app_env__["a" /* ENV */].secret;
AppConfig.grant_type = "password";
AppConfig.appID = __WEBPACK_IMPORTED_MODULE_6__app_env__["a" /* ENV */].appID;
//接口url
AppConfig.API = {
    login: AppConfig_1.hostUrl + "/uaa/user",
    getOrderList: AppConfig_1.hostUrl + "/order/bssList",
    getCancelorder: AppConfig_1.hostUrl + "/order/cancel/list",
    auditCancelOrder: AppConfig_1.hostUrl + "/order/cancel/approval",
    getReturnorderList: AppConfig_1.hostUrl + "/order/return/list",
    returnDetail: AppConfig_1.hostUrl + "/order/return/details",
    returnReceived: AppConfig_1.hostUrl + "/order/return/received",
    auditReturnOrder: AppConfig_1.hostUrl + "/order/return/approval",
    getGiftList: AppConfig_1.hostUrl + "/promotion/member/gift/account/getGiftList",
    getUnhandleGiftCount: AppConfig_1.hostUrl + "/promotion/member/gift/account/getUnhandleGiftCount",
    confirmReserveShopTime: AppConfig_1.hostUrl + "/promotion/member/gift/account/confirmReserveShopTime",
    confirmExpressInfo: AppConfig_1.hostUrl + "/promotion/member/gift/account/confirmExpressInfo",
    getBrandshopProducts: AppConfig_1.hostUrl + "/product/getBrandshopProducts",
    warehouseGetCount: AppConfig_1.hostUrl + "/order/warehouse/getCount",
    getProductSkuWithDefault: AppConfig_1.hostUrl + "/product/sku/getProductSkuWithDefault",
    getValidSKUAttrValue: AppConfig_1.hostUrl + "/product/sku/getValidSkuAttrValue",
    warehouseAdd: AppConfig_1.hostUrl + "/order/warehouse/add",
    warehouseList: AppConfig_1.hostUrl + "/order/warehouse/list",
    warehouseGenerateCode: AppConfig_1.hostUrl + "/order/warehouse/generateCode",
    warehouseDeleteById: AppConfig_1.hostUrl + "/order/warehouse/item/deleteById",
    warehouseUpdate: AppConfig_1.hostUrl + "/order/warehouse/item/update",
    warehouseEmpty: AppConfig_1.hostUrl + "/order/warehouse/empty",
    checkStatus: AppConfig_1.hostUrl + "/order/warehouse/checkStatus",
    current: AppConfig_1.hostUrl + "/account/brandshop/user/current",
    account: AppConfig_1.hostUrl + "/account/brandshop/user/account",
    withdraw: AppConfig_1.hostUrl + "/account/brandshop/user/withdraw/",
    qrcode: AppConfig_1.hostUrl + "/account/brandshop/user/qrcode",
    withdrawList: AppConfig_1.hostUrl + "/account/brandshop/user/withdraw/list",
    bonusList: AppConfig_1.hostUrl + "/account/brandshop/user/bonus/list",
    bonusSum: AppConfig_1.hostUrl + "/account/brandshop/user/bonus/sum",
    untreatedCount: AppConfig_1.hostUrl + "/order/untreatedCount",
    connect: "https://open.weixin.qq.com/connect/oauth2/authorize",
    signature: AppConfig_1.hostUrl + "/account/wechat/signature",
    orderReceive: AppConfig_1.hostUrl + "/order/receive/received",
    receiveGift: AppConfig_1.hostUrl + "/promotion/member/gift/account/receiveGift",
    firstLogin: AppConfig_1.hostUrl + "/uaa/getInfo",
    editPassword: AppConfig_1.hostUrl + "/uaa/password",
    callback: AppConfig_1.hostUrl + "/account/wechat/callback",
};
// ion-spinner
AppConfig.load = {
    spinner: 'dots',
    content: '加载中'
};
AppConfig = AppConfig_1 = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["B" /* Injectable */])()
], AppConfig);

var AppService = (function () {
    function AppService(http, loadingCtrl, toastCtrl) {
        this.http = http;
        this.loadingCtrl = loadingCtrl;
        this.toastCtrl = toastCtrl;
    }
    //get request with Authorization
    AppService.prototype.httpGet = function (url) {
        this.withTokenHeaders = new __WEBPACK_IMPORTED_MODULE_2__angular_http__["a" /* Headers */]({
            'Authorization': 'Bearer ' + this.getItem('tpb_token')
        });
        return this.http.get(url, { headers: this.withTokenHeaders }).timeout(AppConfig.TIME_OUT).toPromise()
            .then(function (res) { return res.json(); })
            .catch(this.handleError);
    };
    //get request with No Authorization
    AppService.prototype.httpGetNoAuthor = function (url) {
        return this.http.get(url).timeout(AppConfig.TIME_OUT).toPromise()
            .then(function (res) { return res.json(); })
            .catch(this.handleError);
    };
    //get request
    AppService.prototype.httpGetReturnData = function (url) {
        this.withTokenHeaders = new __WEBPACK_IMPORTED_MODULE_2__angular_http__["a" /* Headers */]({
            'Authorization': 'Bearer ' + this.getItem('tpb_token')
        });
        return this.http.get(url, { headers: this.withTokenHeaders }).timeout(AppConfig.TIME_OUT).toPromise()
            .then(function (res) { return res; })
            .catch(this.handleError);
    };
    //get request with headers
    AppService.prototype.httpGetHeader = function (url, header) {
        return this.http.get(url, { headers: header }).timeout(AppConfig.TIME_OUT).toPromise()
            .then(function (res) { return res.json(); })
            .catch(this.handleError);
    };
    //post request
    AppService.prototype.httpPost = function (url, body) {
        this.withTokenHeaders = new __WEBPACK_IMPORTED_MODULE_2__angular_http__["a" /* Headers */]({
            'Authorization': 'Bearer ' + this.getItem('tpb_token'),
            'content-type': 'application/json'
        });
        return this.http.post(url, body, { headers: this.withTokenHeaders }).timeout(AppConfig.TIME_OUT).toPromise()
            .then(function (res) { return res.json(); })
            .catch(this.handleError);
    };
    //post 带有headers 
    AppService.prototype.httpPostHeader = function (url, body, header) {
        return this.http.post(url, body, { headers: header }).timeout(AppConfig.TIME_OUT).toPromise()
            .then(function (res) { return res.json(); });
    };
    //put request
    AppService.prototype.httpPut = function (url, parameters) {
        this.withTokenHeaders = new __WEBPACK_IMPORTED_MODULE_2__angular_http__["a" /* Headers */]({
            'Authorization': 'Bearer ' + this.getItem('tpb_token')
        });
        return this.http.put(url, parameters, { headers: this.withTokenHeaders }).timeout(AppConfig.TIME_OUT).toPromise()
            .then(function (res) { return res.json(); })
            .catch(this.handleError);
    };
    //delete request
    AppService.prototype.httpDelete = function (url) {
        this.withTokenHeaders = new __WEBPACK_IMPORTED_MODULE_2__angular_http__["a" /* Headers */]({
            'Authorization': 'Bearer ' + this.getItem('tpb_token')
        });
        return this.http.delete(url, { headers: this.withTokenHeaders }).timeout(AppConfig.TIME_OUT).toPromise()
            .then(function (res) { return res.json(); })
            .catch(this.handleError);
    };
    //access_token过期
    AppService.prototype.handleError = function (error) {
        return Promise.reject(error.json() || error);
    };
    AppService.prototype.getToken = function (error, callback) {
        var self = this;
        if (error.error == "invalid_token") {
            var base64encode = new __WEBPACK_IMPORTED_MODULE_5_buffer__["Buffer"](AppConfig.client_id + ":" + AppConfig.secret).toString('base64');
            self.oauthTokenHeaders = new __WEBPACK_IMPORTED_MODULE_2__angular_http__["a" /* Headers */]({
                'Authorization': 'Basic ' + base64encode,
                'Content-Type': 'application/x-www-form-urlencoded'
            });
            var oauthTokenUrl = AppConfig.oauthTokenUrl;
            var body = "grant_type=refresh_token&refresh_token=" + self.getItem("refresh_token");
            self.httpPostHeader(oauthTokenUrl, body, self.oauthTokenHeaders).then(function (data) {
                var newDateMS = (new Date()).getTime() + data.expires_in * 1000 - AppConfig.RESERVED_TIME;
                self.setItem("newDateMS", newDateMS);
                self.setItem("tpb_token", data.access_token);
                self.setItem("refresh_token", data.refresh_token);
                callback();
            }).catch(function (err) {
                console.log(err);
                self.toast('登录已过期，请重新登录', 1000, 'middle');
                self.setItem("tpb_token", "");
                self.setItem("refresh_token", "");
                if (window.location.search && window.location.search.split("?")[1].indexOf("code") > -1) {
                    window.location.href = window.location.href.split("?")[0];
                }
                else {
                    window.location.href = window.location.href;
                }
            });
        }
    };
    //加载中的友好提示loader.present();
    AppService.prototype.loading = function () {
        var loader = this.loadingCtrl.create({
            spinner: "dots",
            content: "加载中",
            dismissOnPageChange: true,
            showBackdrop: false //不显示遮罩层
        });
        return loader;
    };
    // 提示信息
    AppService.prototype.toast = function (message, duration, position) {
        var toast = this.toastCtrl.create({
            message: message,
            duration: duration,
            position: position
        });
        toast.present();
    };
    //localstorage设置key
    AppService.prototype.setItem = function (key, value) {
        try {
            window.localStorage[key] = value;
        }
        catch (e) {
            console.error("window.localStorage error:" + e);
        }
    };
    //localstorage获取key
    AppService.prototype.getItem = function (key) {
        try {
            return window.localStorage[key];
        }
        catch (e) {
            console.error("window.localStorage error:" + e);
        }
    };
    // 将日期格式化为yyyy-mm-dd
    AppService.prototype.reserveDate = function () {
        var fillZero = function (n) {
            var result = (n).toString().length === 1 ? ('0' + n) : n;
            return result;
        };
        var formatTime = function () {
            var d = new Date();
            var year = d.getFullYear();
            var month = d.getMonth() + 1;
            var date = d.getDate();
            var result = year + "-" + fillZero(month) + "-" + fillZero(date);
            return result;
        };
        var res = formatTime();
        return res;
    };
    return AppService;
}());
AppService = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["B" /* Injectable */])(),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_2__angular_http__["b" /* Http */],
        __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["h" /* LoadingController */],
        __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["p" /* ToastController */]])
], AppService);

var AppConfig_1;
//# sourceMappingURL=app.service.js.map

/***/ }),

/***/ 60:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return TabsPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__home_home__ = __webpack_require__(211);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__order_list_order_list__ = __webpack_require__(225);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__personl_personl__ = __webpack_require__(227);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};





var TabsPage = (function () {
    function TabsPage() {
        this.home = __WEBPACK_IMPORTED_MODULE_2__home_home__["a" /* Home */];
        this.orderList = __WEBPACK_IMPORTED_MODULE_3__order_list_order_list__["a" /* OrderList */];
        this.personl = __WEBPACK_IMPORTED_MODULE_4__personl_personl__["a" /* Personl */];
    }
    TabsPage.prototype.ionViewDidEnter = function () {
        if (window.location.search && window.location.search.split("?")[1].indexOf("code") > -1) {
            this.tabRef.select(2);
        }
    };
    return TabsPage;
}());
__decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_14" /* ViewChild */])('myTabs'),
    __metadata("design:type", __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["o" /* Tabs */])
], TabsPage.prototype, "tabRef", void 0);
TabsPage = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["n" /* Component */])({template:/*ion-inline-start:"C:\Users\think\huchunGit\tpb02\tpb\src\pages\tabs\tabs.html"*/'<ion-tabs #myTabs>\n\n  <ion-tab [root]="home" tabTitle="首页" tabIcon="home"></ion-tab>\n\n  <ion-tab [root]="orderList" tabTitle="订单" tabIcon="list-box"></ion-tab>\n\n  <ion-tab [root]="personl" tabTitle="我的" tabIcon="person"></ion-tab>\n\n</ion-tabs>\n\n'/*ion-inline-end:"C:\Users\think\huchunGit\tpb02\tpb\src\pages\tabs\tabs.html"*/
    }),
    __metadata("design:paramtypes", [])
], TabsPage);

//# sourceMappingURL=tabs.js.map

/***/ }),

/***/ 62:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return HandleSelfgift; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__app_app_service__ = __webpack_require__(4);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



var HandleSelfgift = (function () {
    function HandleSelfgift(navCtrl, alertCtrl, appService) {
        this.navCtrl = navCtrl;
        this.alertCtrl = alertCtrl;
        this.appService = appService;
        this.handleSeflGiftArray = [];
        this.start = 0;
        this.limit = 10;
        this.showNoMore = false;
        this.load = {};
        this.loadingShow = true;
        this.requestDefeat = false;
        this.showInfinite = false;
        this.down = true;
        this.up = false;
        this.load = __WEBPACK_IMPORTED_MODULE_2__app_app_service__["a" /* AppConfig */].load;
    }
    HandleSelfgift.prototype.ionViewDidEnter = function () {
        setTimeout(this.getHandleSelfGiftList(), 100);
    };
    //进入页面，请求接口，得到数据
    HandleSelfgift.prototype.getHandleSelfGiftList = function () {
        var _this = this;
        var url = __WEBPACK_IMPORTED_MODULE_2__app_app_service__["a" /* AppConfig */].API.getGiftList + "?type=2&start=" + this.start + "&limit=" + this.limit; //brandshopSeq=${this.brandshopSeqId}
        this.appService.httpGet(url).then(function (data) {
            _this.loadingShow = false;
            if (data.count == 0) {
                //空空如也
                _this.noData = true;
            }
            else {
                _this.noData = false;
                _this.showInfinite = true;
                if (_this.start < data.count) {
                    if (_this.up) {
                        (_a = _this.handleSeflGiftArray).push.apply(_a, data.data);
                        _this.start += _this.limit;
                    }
                    else if (_this.down) {
                        _this.handleSeflGiftArray = data.data;
                        _this.start += _this.limit;
                        _this.content.scrollTo(0, 0, 0);
                    }
                }
                else {
                    _this.showNoMore = true;
                }
            }
            var _a;
        }).catch(function (error) {
            _this.appService.getToken(error, function () {
                _this.getHandleSelfGiftList();
            });
            _this.loadingShow = false;
            console.log(error);
            _this.showInfinite = false;
            _this.requestDefeat = true;
        });
    };
    // 下拉刷新请求数据
    HandleSelfgift.prototype.refreshGetHandleSelfGiftList = function (refresher) {
        var _this = this;
        this.start = 0;
        this.down = true;
        this.up = false;
        this.showNoMore = false;
        this.showInfinite = true;
        var url = __WEBPACK_IMPORTED_MODULE_2__app_app_service__["a" /* AppConfig */].API.getGiftList + "?type=2&start=" + this.start + "&limit=" + this.limit;
        this.appService.httpGet(url).then(function (data) {
            refresher.complete();
            if (data.count == 0) {
                //空空如也
                _this.noData = true;
            }
            else {
                _this.noData = false;
                _this.showInfinite = true;
                if (data.data.length != 0) {
                    _this.handleSeflGiftArray = data.data;
                    _this.start += _this.limit;
                }
                else {
                    _this.showNoMore = true;
                }
            }
        }).catch(function (error) {
            _this.appService.getToken(error, function () {
                _this.refreshGetHandleSelfGiftList(refresher);
            });
            _this.handleSeflGiftArray = [];
            refresher.complete();
            console.log(error);
            _this.showInfinite = false;
            _this.requestDefeat = true;
        });
    };
    // 上拉刷新请求数据
    HandleSelfgift.prototype.infiniteGetHandleSelfGiftList = function (infiniteScroll) {
        var _this = this;
        this.down = false;
        this.up = true;
        var url = __WEBPACK_IMPORTED_MODULE_2__app_app_service__["a" /* AppConfig */].API.getGiftList + "?type=2&start=" + this.start + "&limit=" + this.limit;
        this.appService.httpGet(url).then(function (data) {
            infiniteScroll.complete();
            if (data.count == 0) {
                //空空如也
                _this.noData = true;
            }
            else {
                _this.noData = false;
                if (data.data.length != 0) {
                    (_a = _this.handleSeflGiftArray).push.apply(_a, data.data);
                    _this.start += _this.limit;
                }
                else {
                    _this.showNoMore = true;
                }
            }
            var _a;
        }).catch(function (error) {
            _this.appService.getToken(error, function () {
                _this.infiniteGetHandleSelfGiftList(infiniteScroll);
            });
            infiniteScroll.complete();
            console.log(error);
            _this.appService.toast('网络异常，请稍后再试', 1000, 'middle');
        });
    };
    //请求失败后刷新
    HandleSelfgift.prototype.requestDefeatRefresh = function () {
        this.requestDefeat = false;
        this.loadingShow = true;
        this.start = 0;
        this.down = true;
        this.up = false;
        this.getHandleSelfGiftList();
    };
    return HandleSelfgift;
}());
__decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_14" /* ViewChild */])(__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["c" /* Content */]),
    __metadata("design:type", __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["c" /* Content */])
], HandleSelfgift.prototype, "content", void 0);
HandleSelfgift = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["n" /* Component */])({
        selector: 'handle-selfgift',template:/*ion-inline-start:"C:\Users\think\huchunGit\tpb02\tpb\src\pages\handle-selfgift\handle-selfgift.html"*/'<ion-header>\n\n  <ion-navbar>\n\n    <ion-title text-center>已兑换自提赠品</ion-title>\n\n  </ion-navbar>\n\n</ion-header>\n\n<ion-content>\n\n	<ion-refresher (ionRefresh)="refreshGetHandleSelfGiftList($event)" *ngIf="!loadingShow">\n\n    <ion-refresher-content></ion-refresher-content>\n\n  </ion-refresher>\n\n  <div class="gift-list">\n\n	<!-- loading -->\n\n	<div class="loading-wrapper" *ngIf="loadingShow">\n\n		<div>\n\n			<ion-spinner item-start [name]="load.spinner"></ion-spinner>\n\n		</div>\n\n		<div [innerHTML]="load.content"></div>\n\n	</div>\n\n	<div class="gift-item" *ngFor = "let item of handleSeflGiftArray">\n\n	  <dl>\n\n		<dt><img [src]="item.imageName | handleGiftImage" alt=""></dt>\n\n		<dd class="product-title">\n\n		  <h2>{{item.giftName}}</h2>\n\n			<span class="unstart">{{ item.giftType | setHandleGiftType }}</span>\n\n		</dd>\n\n			<dd class="member-phone">会员手机：{{item.memberPhone}}</dd>\n\n			<dd class="member-phone" *ngIf = "item.giftType==\'0\'">预约手机：{{item.reservePhone}}</dd>\n\n		  <dd class="get-time">领取时间：{{item.receiveDate | date:\'yyyy-MM-dd HH:mm:ss\'}}</dd>\n\n		  <dd class="get-time exchangeTime">兑换时间：{{item.useDate | date:\'yyyy-MM-dd HH:mm:ss\'}}</dd>\n\n	  </dl>\n\n	  <div class="reserve-time">\n\n		<div class="show-time" *ngIf = "item.giftType==\'0\'">预约到店时间：{{item.reserveShopTime | date:\'yyyy-MM-dd HH:mm:ss\'}}</div>\n\n		<div class="show-time">导购员：{{item.brandshopUserName}}</div>\n\n	  </div>\n\n	</div>\n\n	<ion-infinite-scroll (ionInfinite)="infiniteGetHandleSelfGiftList($event)" *ngIf = "!showNoMore && showInfinite">\n\n		<ion-infinite-scroll-content loadingText="加载更多..."></ion-infinite-scroll-content>\n\n	</ion-infinite-scroll>\n\n	<div class="no-data" *ngIf = "noData">\n\n		<img src="./assets/image/nodata.png" alt="">\n\n		<p>空空如也</p>\n\n	</div>\n\n	<div class="btn-noMore" *ngIf = "showNoMore">\n\n		<span>—— 没有更多已兑换赠品了 ——</span>\n\n	</div>\n\n	<div class="request-defeat" *ngIf = "requestDefeat">\n\n		<img src="./assets/image/requestDefeat.png" alt="">\n\n		<p>啊哦！页面走丢了</p>\n\n		<button class="btn-request-defeat" ion-button full (touchstart)="requestDefeatRefresh()">\n\n			刷新再找一找\n\n		</button>\n\n	</div>\n\n</div>\n\n</ion-content>\n\n'/*ion-inline-end:"C:\Users\think\huchunGit\tpb02\tpb\src\pages\handle-selfgift\handle-selfgift.html"*/
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["l" /* NavController */],
        __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["a" /* AlertController */],
        __WEBPACK_IMPORTED_MODULE_2__app_app_service__["b" /* AppService */]])
], HandleSelfgift);

//# sourceMappingURL=handle-selfgift.js.map

/***/ })

},[237]);
//# sourceMappingURL=main.js.map
=======
webpackJsonp([0],{155:function(l,n){function u(l){return Promise.resolve().then(function(){throw new Error("Cannot find module '"+l+"'.")})}u.keys=function(){return[]},u.resolve=u,l.exports=u,u.id=155},180:function(l,n){function u(l){return Promise.resolve().then(function(){throw new Error("Cannot find module '"+l+"'.")})}u.keys=function(){return[]},u.resolve=u,l.exports=u,u.id=180},208:function(l,n,u){"use strict";function t(l){return Ti._29(0,[Ti._25(402653184,1,{nav:0}),(l()(),Ti._6(0,null,null,2,"ion-nav",[["swipeBackEnabled","false"]],null,null,null,wc.b,wc.a)),Ti._24(6144,null,yc.a,null,[Sc.a]),Ti._4(4374528,[[1,4],["content",4]],0,Sc.a,[[2,Ic.a],[2,Oc.a],xc.a,kc.a,Dc.a,Ti.k,Ti.x,Ti.E,Ti.j,Cc.l,jc.a,[2,Ac.a],Tc.a,Ti.l],{swipeBackEnabled:[0,"swipeBackEnabled"],root:[1,"root"]},null)],function(l,n){l(n,3,0,"false",n.component.rootPage)},null)}function e(l){return Ti._29(0,[(l()(),Ti._6(0,null,null,1,"div",[["class","login-error"]],null,null,null,null,null)),(l()(),Ti._27(null,["",""]))],null,function(l,n){l(n,1,0,n.component.userNameValue)})}function i(l){return Ti._29(0,[(l()(),Ti._6(0,null,null,1,"div",[["class","login-error"]],null,null,null,null,null)),(l()(),Ti._27(null,["",""]))],null,function(l,n){l(n,1,0,n.component.userPwdValue)})}function a(l){return Ti._29(0,[(l()(),Ti._6(0,null,null,10,"ion-header",[["class","header-title-hidden"]],null,null,null,null,null)),Ti._4(16384,null,0,Lc.a,[kc.a,Ti.k,Ti.E,[2,Ic.a]],null,null),(l()(),Ti._27(null,["\n  "])),(l()(),Ti._6(0,null,null,6,"ion-navbar",[["class","toolbar"]],[[8,"hidden",0],[2,"statusbar-padding",null]],null,null,qc.b,qc.a)),Ti._4(49152,null,0,Rc.a,[xc.a,[2,Ic.a],[2,Oc.a],kc.a,Ti.k,Ti.E],null,null),(l()(),Ti._27(3,["\n    "])),(l()(),Ti._6(0,null,3,2,"ion-title",[["text-center",""]],null,null,null,$c.b,$c.a)),Ti._4(49152,null,0,Gc.a,[kc.a,Ti.k,Ti.E,[2,Kc.a],[2,Rc.a]],null,null),(l()(),Ti._27(0,["登录"])),(l()(),Ti._27(3,["\n  "])),(l()(),Ti._27(null,["\n"])),(l()(),Ti._27(null,["\n"])),(l()(),Ti._6(0,null,null,74,"ion-content",[],[[2,"statusbar-padding",null],[2,"has-refresher",null]],[["window","resize"]],function(l,n,u){var t=!0;if("window:resize"===n){t=!1!==Ti._20(l,13).resize()&&t}return t},Nc.b,Nc.a)),Ti._4(4374528,null,0,Fc.a,[kc.a,Dc.a,Tc.a,Ti.k,Ti.E,xc.a,Uc.a,Ti.x,[2,Ic.a],[2,Oc.a]],null,null),(l()(),Ti._27(1,["\n  "])),(l()(),Ti._6(0,null,1,1,"h1",[["class","logo"]],null,null,null,null,null)),(l()(),Ti._6(0,null,null,0,"img",[["alt","淘璞帮"],["src","./assets/image/logo.png"]],null,null,null,null,null)),(l()(),Ti._27(1,["\n  "])),(l()(),Ti._6(0,null,1,67,"div",[["class","login-content"]],null,null,null,null,null)),(l()(),Ti._27(null,["\n    "])),(l()(),Ti._6(0,null,null,60,"ion-list",[],null,null,null,null,null)),Ti._4(16384,null,0,zc.a,[kc.a,Ti.k,Ti.E,Dc.a,Cc.l,Tc.a],null,null),(l()(),Ti._27(null,["\n      "])),(l()(),Ti._6(0,null,null,14,"ion-item",[["class","item item-block"]],null,null,null,Vc.b,Vc.a)),Ti._4(1097728,null,3,Bc.a,[Hc.a,kc.a,Ti.k,Ti.E,[2,Yc.a]],null,null),Ti._25(335544320,1,{contentLabel:0}),Ti._25(603979776,2,{_buttons:1}),Ti._25(603979776,3,{_icons:1}),Ti._4(16384,null,0,Wc.a,[],null,null),(l()(),Ti._27(2,["\n        "])),(l()(),Ti._6(0,null,3,6,"ion-input",[["clearInput","true"],["placeholder","账号或手机号码"],["required",""],["type","text"]],[[1,"required",0],[2,"ng-untouched",null],[2,"ng-touched",null],[2,"ng-pristine",null],[2,"ng-dirty",null],[2,"ng-valid",null],[2,"ng-invalid",null],[2,"ng-pending",null]],[[null,"ngModelChange"],[null,"ionBlur"]],function(l,n,u){var t=!0,e=l.component;if("ngModelChange"===n){t=!1!==(e.username=u)&&t}if("ionBlur"===n){t=!1!==e.onblurAffirm()&&t}return t},Xc.b,Xc.a)),Ti._4(16384,null,0,Jc.l,[],{required:[0,"required"]},null),Ti._24(1024,null,Jc.f,function(l){return[l]},[Jc.l]),Ti._4(671744,null,0,Jc.j,[[8,null],[2,Jc.f],[8,null],[8,null]],{model:[0,"model"]},{update:"ngModelChange"}),Ti._24(2048,null,Jc.h,null,[Jc.j]),Ti._4(16384,null,0,Jc.i,[Jc.h],null,null),Ti._4(5423104,null,0,Qc.a,[kc.a,Dc.a,Hc.a,xc.a,Ti.k,Ti.E,[2,Fc.a],[2,Bc.a],[2,Jc.h],Tc.a],{clearInput:[0,"clearInput"],type:[1,"type"],placeholder:[2,"placeholder"]},{ionBlur:"ionBlur"}),(l()(),Ti._27(2,["\n      "])),(l()(),Ti._27(null,["\n      "])),(l()(),Ti._0(16777216,null,null,1,null,e)),Ti._4(16384,null,0,Zc.j,[Ti.O,Ti.K],{ngIf:[0,"ngIf"]},null),(l()(),Ti._27(null,["\n      "])),(l()(),Ti._6(0,null,null,14,"ion-item",[["class","item item-block"]],null,null,null,Vc.b,Vc.a)),Ti._4(1097728,null,3,Bc.a,[Hc.a,kc.a,Ti.k,Ti.E,[2,Yc.a]],null,null),Ti._25(335544320,4,{contentLabel:0}),Ti._25(603979776,5,{_buttons:1}),Ti._25(603979776,6,{_icons:1}),Ti._4(16384,null,0,Wc.a,[],null,null),(l()(),Ti._27(2,["\n        "])),(l()(),Ti._6(0,null,3,6,"ion-input",[["clearInput","true"],["placeholder","密码"],["required",""],["type","password"]],[[1,"required",0],[2,"ng-untouched",null],[2,"ng-touched",null],[2,"ng-pristine",null],[2,"ng-dirty",null],[2,"ng-valid",null],[2,"ng-invalid",null],[2,"ng-pending",null]],[[null,"ngModelChange"]],function(l,n,u){var t=!0;if("ngModelChange"===n){t=!1!==(l.component.pwd=u)&&t}return t},Xc.b,Xc.a)),Ti._4(16384,null,0,Jc.l,[],{required:[0,"required"]},null),Ti._24(1024,null,Jc.f,function(l){return[l]},[Jc.l]),Ti._4(671744,null,0,Jc.j,[[8,null],[2,Jc.f],[8,null],[8,null]],{model:[0,"model"]},{update:"ngModelChange"}),Ti._24(2048,null,Jc.h,null,[Jc.j]),Ti._4(16384,null,0,Jc.i,[Jc.h],null,null),Ti._4(5423104,null,0,Qc.a,[kc.a,Dc.a,Hc.a,xc.a,Ti.k,Ti.E,[2,Fc.a],[2,Bc.a],[2,Jc.h],Tc.a],{clearInput:[0,"clearInput"],type:[1,"type"],placeholder:[2,"placeholder"]},null),(l()(),Ti._27(2,["\n      "])),(l()(),Ti._27(null,["\n      "])),(l()(),Ti._0(16777216,null,null,1,null,i)),Ti._4(16384,null,0,Zc.j,[Ti.O,Ti.K],{ngIf:[0,"ngIf"]},null),(l()(),Ti._27(null,["\n      "])),(l()(),Ti._6(0,null,null,17,"ion-item",[["class","item item-block"]],null,null,null,Vc.b,Vc.a)),Ti._4(1097728,null,3,Bc.a,[Hc.a,kc.a,Ti.k,Ti.E,[2,Yc.a]],null,null),Ti._25(335544320,7,{contentLabel:0}),Ti._25(603979776,8,{_buttons:1}),Ti._25(603979776,9,{_icons:1}),Ti._4(16384,null,0,Wc.a,[],null,null),(l()(),Ti._27(2,["\n        "])),(l()(),Ti._6(0,null,1,2,"ion-label",[],null,null,null,null,null)),Ti._4(16384,[[7,4]],0,l_.a,[kc.a,Ti.k,Ti.E,[8,null],[8,null],[8,null],[8,null]],null,null),(l()(),Ti._27(null,["记住密码"])),(l()(),Ti._27(2,["\n        "])),(l()(),Ti._6(0,null,0,5,"ion-checkbox",[],[[2,"checkbox-disabled",null],[2,"ng-untouched",null],[2,"ng-touched",null],[2,"ng-pristine",null],[2,"ng-dirty",null],[2,"ng-valid",null],[2,"ng-invalid",null],[2,"ng-pending",null]],[[null,"ngModelChange"],[null,"click"]],function(l,n,u){var t=!0,e=l.component;if("click"===n){t=!1!==Ti._20(l,73)._click(u)&&t}if("ngModelChange"===n){t=!1!==(e.rememberPassword=u)&&t}return t},n_.b,n_.a)),Ti._4(1228800,null,0,u_.a,[kc.a,Hc.a,[2,Bc.a],Ti.k,Ti.E],null,null),Ti._24(1024,null,Jc.g,function(l){return[l]},[u_.a]),Ti._4(671744,null,0,Jc.j,[[8,null],[8,null],[8,null],[2,Jc.g]],{model:[0,"model"]},{update:"ngModelChange"}),Ti._24(2048,null,Jc.h,null,[Jc.j]),Ti._4(16384,null,0,Jc.i,[Jc.h],null,null),(l()(),Ti._27(2,["\n      "])),(l()(),Ti._27(null,["\n      "])),(l()(),Ti._27(null,["\n    "])),(l()(),Ti._27(null,["\n    "])),(l()(),Ti._6(0,null,null,2,"button",[["block",""],["class","btn-login"],["ion-button",""],["round",""]],null,[[null,"click"]],function(l,n,u){var t=!0;if("click"===n){t=!1!==l.component.login()&&t}return t},t_.b,t_.a)),Ti._4(1097728,null,0,e_.a,[[8,""],kc.a,Ti.k,Ti.E],{round:[0,"round"],block:[1,"block"]},null),(l()(),Ti._27(0,["登录"])),(l()(),Ti._27(null,["\n  "])),(l()(),Ti._27(1,["\n"])),(l()(),Ti._27(null,["\n"]))],function(l,n){var u=n.component;l(n,31,0,"");l(n,33,0,u.username);l(n,36,0,"true","text","账号或手机号码");l(n,40,0,u.isUserName);l(n,50,0,"");l(n,52,0,u.pwd);l(n,55,0,"true","password","密码");l(n,59,0,u.isPwd);l(n,75,0,u.rememberPassword);l(n,83,0,"","")},function(l,n){l(n,3,0,Ti._20(n,4)._hidden,Ti._20(n,4)._sbPadding);l(n,12,0,Ti._20(n,13).statusbarPadding,Ti._20(n,13)._hasRefresher);l(n,30,0,Ti._20(n,31).required?"":null,Ti._20(n,35).ngClassUntouched,Ti._20(n,35).ngClassTouched,Ti._20(n,35).ngClassPristine,Ti._20(n,35).ngClassDirty,Ti._20(n,35).ngClassValid,Ti._20(n,35).ngClassInvalid,Ti._20(n,35).ngClassPending);l(n,49,0,Ti._20(n,50).required?"":null,Ti._20(n,54).ngClassUntouched,Ti._20(n,54).ngClassTouched,Ti._20(n,54).ngClassPristine,Ti._20(n,54).ngClassDirty,Ti._20(n,54).ngClassValid,Ti._20(n,54).ngClassInvalid,Ti._20(n,54).ngClassPending);l(n,72,0,Ti._20(n,73)._disabled,Ti._20(n,77).ngClassUntouched,Ti._20(n,77).ngClassTouched,Ti._20(n,77).ngClassPristine,Ti._20(n,77).ngClassDirty,Ti._20(n,77).ngClassValid,Ti._20(n,77).ngClassInvalid,Ti._20(n,77).ngClassPending)})}function o(l){return Ti._29(0,[(l()(),Ti._6(0,null,null,10,"ion-header",[],null,null,null,null,null)),Ti._4(16384,null,0,Lc.a,[kc.a,Ti.k,Ti.E,[2,Ic.a]],null,null),(l()(),Ti._27(null,["\n  "])),(l()(),Ti._6(0,null,null,6,"ion-navbar",[["class","toolbar"]],[[8,"hidden",0],[2,"statusbar-padding",null]],null,null,qc.b,qc.a)),Ti._4(49152,null,0,Rc.a,[xc.a,[2,Ic.a],[2,Oc.a],kc.a,Ti.k,Ti.E],null,null),(l()(),Ti._27(3,["\n    "])),(l()(),Ti._6(0,null,3,2,"ion-title",[["text-center",""]],null,null,null,$c.b,$c.a)),Ti._4(49152,null,0,Gc.a,[kc.a,Ti.k,Ti.E,[2,Kc.a],[2,Rc.a]],null,null),(l()(),Ti._27(0,["找回密码"])),(l()(),Ti._27(3,["\n  "])),(l()(),Ti._27(null,["\n"])),(l()(),Ti._27(null,["\n"])),(l()(),Ti._6(0,null,null,90,"ion-content",[],[[2,"statusbar-padding",null],[2,"has-refresher",null]],[["window","resize"]],function(l,n,u){var t=!0;if("window:resize"===n){t=!1!==Ti._20(l,13).resize()&&t}return t},Nc.b,Nc.a)),Ti._4(4374528,null,0,Fc.a,[kc.a,Dc.a,Tc.a,Ti.k,Ti.E,xc.a,Uc.a,Ti.x,[2,Ic.a],[2,Oc.a]],null,null),(l()(),Ti._27(1,["\n"])),(l()(),Ti._6(0,null,1,86,"div",[["class","forget-box"]],null,null,null,null,null)),(l()(),Ti._27(null,["\n  "])),(l()(),Ti._6(0,null,null,79,"ion-list",[],null,null,null,null,null)),Ti._4(16384,null,0,zc.a,[kc.a,Ti.k,Ti.E,Dc.a,Cc.l,Tc.a],null,null),(l()(),Ti._27(null,["\n    "])),(l()(),Ti._6(0,null,null,9,"ion-item",[["class"," item item-block"]],null,null,null,Vc.b,Vc.a)),Ti._4(1097728,null,3,Bc.a,[Hc.a,kc.a,Ti.k,Ti.E,[2,Yc.a]],null,null),Ti._25(335544320,1,{contentLabel:0}),Ti._25(603979776,2,{_buttons:1}),Ti._25(603979776,3,{_icons:1}),Ti._4(16384,null,0,Wc.a,[],null,null),(l()(),Ti._27(2,["\n      "])),(l()(),Ti._6(0,null,3,1,"ion-input",[["clearInput","true"],["maxlength","11"],["placeholder","请输入手机号"],["required",""],["type","tel"]],null,null,null,Xc.b,Xc.a)),Ti._4(5423104,null,0,Qc.a,[kc.a,Dc.a,Hc.a,xc.a,Ti.k,Ti.E,[2,Fc.a],[2,Bc.a],[2,Jc.h],Tc.a],{clearInput:[0,"clearInput"],type:[1,"type"],placeholder:[2,"placeholder"]},null),(l()(),Ti._27(2,["\n    "])),(l()(),Ti._27(null,["\n    "])),(l()(),Ti._6(0,null,null,9,"ion-item",[["class","img-input item item-block"]],null,null,null,Vc.b,Vc.a)),Ti._4(1097728,null,3,Bc.a,[Hc.a,kc.a,Ti.k,Ti.E,[2,Yc.a]],null,null),Ti._25(335544320,4,{contentLabel:0}),Ti._25(603979776,5,{_buttons:1}),Ti._25(603979776,6,{_icons:1}),Ti._4(16384,null,0,Wc.a,[],null,null),(l()(),Ti._27(2,["\n      "])),(l()(),Ti._6(0,null,3,1,"ion-input",[["clearInput","true"],["placeholder","图形验证码"],["required",""],["type","text"]],null,null,null,Xc.b,Xc.a)),Ti._4(5423104,null,0,Qc.a,[kc.a,Dc.a,Hc.a,xc.a,Ti.k,Ti.E,[2,Fc.a],[2,Bc.a],[2,Jc.h],Tc.a],{clearInput:[0,"clearInput"],type:[1,"type"],placeholder:[2,"placeholder"]},null),(l()(),Ti._27(2,["\n    "])),(l()(),Ti._27(null,["\n    "])),(l()(),Ti._6(0,null,null,8,"ion-item",[["class","img-validate item item-block"]],null,null,null,Vc.b,Vc.a)),Ti._4(1097728,null,3,Bc.a,[Hc.a,kc.a,Ti.k,Ti.E,[2,Yc.a]],null,null),Ti._25(335544320,7,{contentLabel:0}),Ti._25(603979776,8,{_buttons:1}),Ti._25(603979776,9,{_icons:1}),Ti._4(16384,null,0,Wc.a,[],null,null),(l()(),Ti._27(2,["\n        "])),(l()(),Ti._6(0,null,2,0,"img",[["alt",""],["src","./assets/image/imgvalidate.png"]],null,null,null,null,null)),(l()(),Ti._27(2,["\n    "])),(l()(),Ti._27(null,["\n    "])),(l()(),Ti._6(0,null,null,9,"ion-item",[["class","msg-input item item-block"]],null,null,null,Vc.b,Vc.a)),Ti._4(1097728,null,3,Bc.a,[Hc.a,kc.a,Ti.k,Ti.E,[2,Yc.a]],null,null),Ti._25(335544320,10,{contentLabel:0}),Ti._25(603979776,11,{_buttons:1}),Ti._25(603979776,12,{_icons:1}),Ti._4(16384,null,0,Wc.a,[],null,null),(l()(),Ti._27(2,["\n      "])),(l()(),Ti._6(0,null,3,1,"ion-input",[["clearInput","true"],["placeholder","短信验证码"],["required",""],["type","text"]],null,null,null,Xc.b,Xc.a)),Ti._4(5423104,null,0,Qc.a,[kc.a,Dc.a,Hc.a,xc.a,Ti.k,Ti.E,[2,Fc.a],[2,Bc.a],[2,Jc.h],Tc.a],{clearInput:[0,"clearInput"],type:[1,"type"],placeholder:[2,"placeholder"]},null),(l()(),Ti._27(2,["\n    "])),(l()(),Ti._27(null,["\n    "])),(l()(),Ti._6(0,null,null,10,"ion-item",[["class","msg-validate item item-block"]],null,null,null,Vc.b,Vc.a)),Ti._4(1097728,null,3,Bc.a,[Hc.a,kc.a,Ti.k,Ti.E,[2,Yc.a]],null,null),Ti._25(335544320,13,{contentLabel:0}),Ti._25(603979776,14,{_buttons:1}),Ti._25(603979776,15,{_icons:1}),Ti._4(16384,null,0,Wc.a,[],null,null),(l()(),Ti._27(2,["\n        "])),(l()(),Ti._6(0,null,2,2,"button",[["block",""],["ion-button",""]],null,null,null,t_.b,t_.a)),Ti._4(1097728,[[14,4]],0,e_.a,[[8,""],kc.a,Ti.k,Ti.E],{block:[0,"block"]},null),(l()(),Ti._27(0,["获取验证码"])),(l()(),Ti._27(2,["\n    "])),(l()(),Ti._27(null,["\n    "])),(l()(),Ti._6(0,null,null,9,"ion-item",[["class","item item-block"]],null,null,null,Vc.b,Vc.a)),Ti._4(1097728,null,3,Bc.a,[Hc.a,kc.a,Ti.k,Ti.E,[2,Yc.a]],null,null),Ti._25(335544320,16,{contentLabel:0}),Ti._25(603979776,17,{_buttons:1}),Ti._25(603979776,18,{_icons:1}),Ti._4(16384,null,0,Wc.a,[],null,null),(l()(),Ti._27(2,["\n      "])),(l()(),Ti._6(0,null,3,1,"ion-input",[["clearInput","true"],["placeholder","输入新密码"],["required",""],["type","password"]],null,null,null,Xc.b,Xc.a)),Ti._4(5423104,null,0,Qc.a,[kc.a,Dc.a,Hc.a,xc.a,Ti.k,Ti.E,[2,Fc.a],[2,Bc.a],[2,Jc.h],Tc.a],{clearInput:[0,"clearInput"],type:[1,"type"],placeholder:[2,"placeholder"]},null),(l()(),Ti._27(2,["\n    "])),(l()(),Ti._27(null,["\n    "])),(l()(),Ti._6(0,null,null,9,"ion-item",[["class","item item-block"]],null,null,null,Vc.b,Vc.a)),Ti._4(1097728,null,3,Bc.a,[Hc.a,kc.a,Ti.k,Ti.E,[2,Yc.a]],null,null),Ti._25(335544320,19,{contentLabel:0}),Ti._25(603979776,20,{_buttons:1}),Ti._25(603979776,21,{_icons:1}),Ti._4(16384,null,0,Wc.a,[],null,null),(l()(),Ti._27(2,["\n      "])),(l()(),Ti._6(0,null,3,1,"ion-input",[["clearInput","true"],["placeholder","重复密码"],["required",""],["type","password"]],null,null,null,Xc.b,Xc.a)),Ti._4(5423104,null,0,Qc.a,[kc.a,Dc.a,Hc.a,xc.a,Ti.k,Ti.E,[2,Fc.a],[2,Bc.a],[2,Jc.h],Tc.a],{clearInput:[0,"clearInput"],type:[1,"type"],placeholder:[2,"placeholder"]},null),(l()(),Ti._27(2,["\n    "])),(l()(),Ti._27(null,["\n  "])),(l()(),Ti._27(null,["\n  "])),(l()(),Ti._6(0,null,null,2,"button",[["block",""],["class","btn-forget"],["ion-button",""],["round",""]],null,null,null,t_.b,t_.a)),Ti._4(1097728,null,0,e_.a,[[8,""],kc.a,Ti.k,Ti.E],{round:[0,"round"],block:[1,"block"]},null),(l()(),Ti._27(0,["确认"])),(l()(),Ti._27(null,["\n"])),(l()(),Ti._27(1,["\n"])),(l()(),Ti._27(null,["\n"]))],function(l,n){l(n,28,0,"true","tel","请输入手机号");l(n,39,0,"true","text","图形验证码");l(n,60,0,"true","text","短信验证码");l(n,71,0,"");l(n,83,0,"true","password","输入新密码");l(n,94,0,"true","password","重复密码");l(n,99,0,"","")},function(l,n){l(n,3,0,Ti._20(n,4)._hidden,Ti._20(n,4)._sbPadding);l(n,12,0,Ti._20(n,13).statusbarPadding,Ti._20(n,13)._hasRefresher)})}function r(l){return Ti._29(0,[(l()(),Ti._6(0,null,null,1,"div",[["class","login-error"]],null,null,null,null,null)),(l()(),Ti._27(null,["",""]))],null,function(l,n){l(n,1,0,n.component.initialPwdValue)})}function s(l){return Ti._29(0,[(l()(),Ti._6(0,null,null,1,"div",[["class","login-error"]],null,null,null,null,null)),(l()(),Ti._27(null,["",""]))],null,function(l,n){l(n,1,0,n.component.newPwdValue)})}function c(l){return Ti._29(0,[(l()(),Ti._6(0,null,null,1,"div",[["class","login-error"]],null,null,null,null,null)),(l()(),Ti._27(null,["",""]))],null,function(l,n){l(n,1,0,n.component.repeatPwdValue)})}function _(l){return Ti._29(0,[(l()(),Ti._6(0,null,null,88,"ion-content",[],[[2,"statusbar-padding",null],[2,"has-refresher",null]],[["window","resize"]],function(l,n,u){var t=!0;if("window:resize"===n){t=!1!==Ti._20(l,1).resize()&&t}return t},Nc.b,Nc.a)),Ti._4(4374528,null,0,Fc.a,[kc.a,Dc.a,Tc.a,Ti.k,Ti.E,xc.a,Uc.a,Ti.x,[2,Ic.a],[2,Oc.a]],null,null),(l()(),Ti._27(1,["\n  "])),(l()(),Ti._6(0,null,1,84,"div",[["class","forget-box"]],null,null,null,null,null)),(l()(),Ti._27(null,["\n    "])),(l()(),Ti._6(0,null,null,16,"div",[["class","update-instruction"]],null,null,null,null,null)),(l()(),Ti._27(null,["\n      "])),(l()(),Ti._6(0,null,null,13,"dl",[],null,null,null,null,null)),(l()(),Ti._27(null,["\n        "])),(l()(),Ti._6(0,null,null,1,"dt",[],null,null,null,null,null)),(l()(),Ti._6(0,null,null,0,"img",[["src","./assets/image/applogo.png"]],null,null,null,null,null)),(l()(),Ti._27(null,["\n        "])),(l()(),Ti._6(0,null,null,7,"dd",[],null,null,null,null,null)),(l()(),Ti._27(null,["\n          "])),(l()(),Ti._6(0,null,null,1,"p",[],null,null,null,null,null)),(l()(),Ti._27(null,["初次登录淘璞帮"])),(l()(),Ti._27(null,["\n          "])),(l()(),Ti._6(0,null,null,1,"p",[],null,null,null,null,null)),(l()(),Ti._27(null,["请您修改登录密码并牢记"])),(l()(),Ti._27(null,["\n        "])),(l()(),Ti._27(null,["\n      "])),(l()(),Ti._27(null,["\n    "])),(l()(),Ti._27(null,["\n    "])),(l()(),Ti._6(0,null,null,59,"ion-list",[],null,null,null,null,null)),Ti._4(16384,null,0,zc.a,[kc.a,Ti.k,Ti.E,Dc.a,Cc.l,Tc.a],null,null),(l()(),Ti._27(null,["\n      "])),(l()(),Ti._6(0,null,null,14,"ion-item",[["class","item item-block"]],null,null,null,Vc.b,Vc.a)),Ti._4(1097728,null,3,Bc.a,[Hc.a,kc.a,Ti.k,Ti.E,[2,Yc.a]],null,null),Ti._25(335544320,1,{contentLabel:0}),Ti._25(603979776,2,{_buttons:1}),Ti._25(603979776,3,{_icons:1}),Ti._4(16384,null,0,Wc.a,[],null,null),(l()(),Ti._27(2,["\n        "])),(l()(),Ti._6(0,null,3,6,"ion-input",[["clearInput","true"],["placeholder","请输入初始密码"],["required",""],["type","password"]],[[1,"required",0],[2,"ng-untouched",null],[2,"ng-touched",null],[2,"ng-pristine",null],[2,"ng-dirty",null],[2,"ng-valid",null],[2,"ng-invalid",null],[2,"ng-pending",null]],[[null,"ngModelChange"],[null,"ionBlur"]],function(l,n,u){var t=!0,e=l.component;if("ngModelChange"===n){t=!1!==(e.initialPwd=u)&&t}if("ionBlur"===n){t=!1!==e.initialPwdBlur()&&t}return t},Xc.b,Xc.a)),Ti._4(16384,null,0,Jc.l,[],{required:[0,"required"]},null),Ti._24(1024,null,Jc.f,function(l){return[l]},[Jc.l]),Ti._4(671744,null,0,Jc.j,[[8,null],[2,Jc.f],[8,null],[8,null]],{model:[0,"model"]},{update:"ngModelChange"}),Ti._24(2048,null,Jc.h,null,[Jc.j]),Ti._4(16384,null,0,Jc.i,[Jc.h],null,null),Ti._4(5423104,null,0,Qc.a,[kc.a,Dc.a,Hc.a,xc.a,Ti.k,Ti.E,[2,Fc.a],[2,Bc.a],[2,Jc.h],Tc.a],{clearInput:[0,"clearInput"],type:[1,"type"],placeholder:[2,"placeholder"]},{ionBlur:"ionBlur"}),(l()(),Ti._27(2,["\n      "])),(l()(),Ti._27(null,["\n      "])),(l()(),Ti._0(16777216,null,null,1,null,r)),Ti._4(16384,null,0,Zc.j,[Ti.O,Ti.K],{ngIf:[0,"ngIf"]},null),(l()(),Ti._27(null,["\n      "])),(l()(),Ti._6(0,null,null,14,"ion-item",[["class","item item-block"]],null,null,null,Vc.b,Vc.a)),Ti._4(1097728,null,3,Bc.a,[Hc.a,kc.a,Ti.k,Ti.E,[2,Yc.a]],null,null),Ti._25(335544320,4,{contentLabel:0}),Ti._25(603979776,5,{_buttons:1}),Ti._25(603979776,6,{_icons:1}),Ti._4(16384,null,0,Wc.a,[],null,null),(l()(),Ti._27(2,["\n        "])),(l()(),Ti._6(0,null,3,6,"ion-input",[["clearInput","true"],["placeholder","输入新密码"],["required",""],["type","password"]],[[1,"required",0],[2,"ng-untouched",null],[2,"ng-touched",null],[2,"ng-pristine",null],[2,"ng-dirty",null],[2,"ng-valid",null],[2,"ng-invalid",null],[2,"ng-pending",null]],[[null,"ngModelChange"],[null,"ionBlur"]],function(l,n,u){var t=!0,e=l.component;if("ngModelChange"===n){t=!1!==(e.newPwd=u)&&t}if("ionBlur"===n){t=!1!==e.newPwdBlur()&&t}return t},Xc.b,Xc.a)),Ti._4(16384,null,0,Jc.l,[],{required:[0,"required"]},null),Ti._24(1024,null,Jc.f,function(l){return[l]},[Jc.l]),Ti._4(671744,null,0,Jc.j,[[8,null],[2,Jc.f],[8,null],[8,null]],{model:[0,"model"]},{update:"ngModelChange"}),Ti._24(2048,null,Jc.h,null,[Jc.j]),Ti._4(16384,null,0,Jc.i,[Jc.h],null,null),Ti._4(5423104,null,0,Qc.a,[kc.a,Dc.a,Hc.a,xc.a,Ti.k,Ti.E,[2,Fc.a],[2,Bc.a],[2,Jc.h],Tc.a],{clearInput:[0,"clearInput"],type:[1,"type"],placeholder:[2,"placeholder"]},{ionBlur:"ionBlur"}),(l()(),Ti._27(2,["\n      "])),(l()(),Ti._27(null,["\n      "])),(l()(),Ti._0(16777216,null,null,1,null,s)),Ti._4(16384,null,0,Zc.j,[Ti.O,Ti.K],{ngIf:[0,"ngIf"]},null),(l()(),Ti._27(null,["\n      "])),(l()(),Ti._6(0,null,null,14,"ion-item",[["class","item item-block"]],null,null,null,Vc.b,Vc.a)),Ti._4(1097728,null,3,Bc.a,[Hc.a,kc.a,Ti.k,Ti.E,[2,Yc.a]],null,null),Ti._25(335544320,7,{contentLabel:0}),Ti._25(603979776,8,{_buttons:1}),Ti._25(603979776,9,{_icons:1}),Ti._4(16384,null,0,Wc.a,[],null,null),(l()(),Ti._27(2,["\n        "])),(l()(),Ti._6(0,null,3,6,"ion-input",[["clearInput","true"],["placeholder","重复密码"],["required",""],["type","password"]],[[1,"required",0],[2,"ng-untouched",null],[2,"ng-touched",null],[2,"ng-pristine",null],[2,"ng-dirty",null],[2,"ng-valid",null],[2,"ng-invalid",null],[2,"ng-pending",null]],[[null,"ngModelChange"],[null,"ionBlur"]],function(l,n,u){var t=!0,e=l.component;if("ngModelChange"===n){t=!1!==(e.repeatPwd=u)&&t}if("ionBlur"===n){t=!1!==e.repeatPwdBlur()&&t}return t},Xc.b,Xc.a)),Ti._4(16384,null,0,Jc.l,[],{required:[0,"required"]},null),Ti._24(1024,null,Jc.f,function(l){return[l]},[Jc.l]),Ti._4(671744,null,0,Jc.j,[[8,null],[2,Jc.f],[8,null],[8,null]],{model:[0,"model"]},{update:"ngModelChange"}),Ti._24(2048,null,Jc.h,null,[Jc.j]),Ti._4(16384,null,0,Jc.i,[Jc.h],null,null),Ti._4(5423104,null,0,Qc.a,[kc.a,Dc.a,Hc.a,xc.a,Ti.k,Ti.E,[2,Fc.a],[2,Bc.a],[2,Jc.h],Tc.a],{clearInput:[0,"clearInput"],type:[1,"type"],placeholder:[2,"placeholder"]},{ionBlur:"ionBlur"}),(l()(),Ti._27(2,["\n      "])),(l()(),Ti._27(null,["\n      "])),(l()(),Ti._0(16777216,null,null,1,null,c)),Ti._4(16384,null,0,Zc.j,[Ti.O,Ti.K],{ngIf:[0,"ngIf"]},null),(l()(),Ti._27(null,["\n    "])),(l()(),Ti._27(null,["\n    "])),(l()(),Ti._6(0,null,null,2,"button",[["block",""],["class","btn-forget"],["ion-button",""],["round",""]],null,[[null,"touchstart"]],function(l,n,u){var t=!0;if("touchstart"===n){t=!1!==l.component.confirm()&&t}return t},t_.b,t_.a)),Ti._4(1097728,null,0,e_.a,[[8,""],kc.a,Ti.k,Ti.E],{round:[0,"round"],block:[1,"block"]},null),(l()(),Ti._27(0,["确认"])),(l()(),Ti._27(null,["\n  "])),(l()(),Ti._27(1,["\n  "])),(l()(),Ti._27(null,["\n  \n"]))],function(l,n){var u=n.component;l(n,34,0,"");l(n,36,0,u.initialPwd);l(n,39,0,"true","password","请输入初始密码");l(n,43,0,u.isInitialPwd);l(n,53,0,"");l(n,55,0,u.newPwd);l(n,58,0,"true","password","输入新密码");l(n,62,0,u.isNewPwd);l(n,72,0,"");l(n,74,0,u.repeatPwd);l(n,77,0,"true","password","重复密码");l(n,81,0,u.isRepeatPwd);l(n,85,0,"","")},function(l,n){l(n,0,0,Ti._20(n,1).statusbarPadding,Ti._20(n,1)._hasRefresher);l(n,33,0,Ti._20(n,34).required?"":null,Ti._20(n,38).ngClassUntouched,Ti._20(n,38).ngClassTouched,Ti._20(n,38).ngClassPristine,Ti._20(n,38).ngClassDirty,Ti._20(n,38).ngClassValid,Ti._20(n,38).ngClassInvalid,Ti._20(n,38).ngClassPending);l(n,52,0,Ti._20(n,53).required?"":null,Ti._20(n,57).ngClassUntouched,Ti._20(n,57).ngClassTouched,Ti._20(n,57).ngClassPristine,Ti._20(n,57).ngClassDirty,Ti._20(n,57).ngClassValid,Ti._20(n,57).ngClassInvalid,Ti._20(n,57).ngClassPending);l(n,71,0,Ti._20(n,72).required?"":null,Ti._20(n,76).ngClassUntouched,Ti._20(n,76).ngClassTouched,Ti._20(n,76).ngClassPristine,Ti._20(n,76).ngClassDirty,Ti._20(n,76).ngClassValid,Ti._20(n,76).ngClassInvalid,Ti._20(n,76).ngClassPending)})}function d(l){return Ti._29(0,[(l()(),Ti._6(0,null,null,10,"ion-header",[["class","header-title-hidden"]],null,null,null,null,null)),Ti._4(16384,null,0,Lc.a,[kc.a,Ti.k,Ti.E,[2,Ic.a]],null,null),(l()(),Ti._27(null,["\n  "])),(l()(),Ti._6(0,null,null,6,"ion-navbar",[["class","toolbar"]],[[8,"hidden",0],[2,"statusbar-padding",null]],null,null,qc.b,qc.a)),Ti._4(49152,null,0,Rc.a,[xc.a,[2,Ic.a],[2,Oc.a],kc.a,Ti.k,Ti.E],null,null),(l()(),Ti._27(3,["\n    "])),(l()(),Ti._6(0,null,3,2,"ion-title",[["text-center",""]],null,null,null,$c.b,$c.a)),Ti._4(49152,null,0,Gc.a,[kc.a,Ti.k,Ti.E,[2,Kc.a],[2,Rc.a]],null,null),(l()(),Ti._27(0,["首页"])),(l()(),Ti._27(3,["\n  "])),(l()(),Ti._27(null,["\n"])),(l()(),Ti._27(null,["\n"])),(l()(),Ti._6(0,null,null,131,"ion-content",[],[[2,"statusbar-padding",null],[2,"has-refresher",null]],[["window","resize"]],function(l,n,u){var t=!0;if("window:resize"===n){t=!1!==Ti._20(l,13).resize()&&t}return t},Nc.b,Nc.a)),Ti._4(4374528,null,0,Fc.a,[kc.a,Dc.a,Tc.a,Ti.k,Ti.E,xc.a,Uc.a,Ti.x,[2,Ic.a],[2,Oc.a]],null,null),(l()(),Ti._27(1,["\n  "])),(l()(),Ti._6(0,null,1,7,"ion-toolbar",[["class","toolbar"]],[[2,"statusbar-padding",null]],null,null,p_.b,p_.a)),Ti._4(49152,null,0,Kc.a,[kc.a,Ti.k,Ti.E],null,null),(l()(),Ti._27(3,["\n\t  "])),(l()(),Ti._6(0,null,3,0,"img",[["alt","淘璞帮"],["class","logo-img"],["src","./assets/image/top.png"]],null,null,null,null,null)),(l()(),Ti._27(3,["\n\t\t"])),(l()(),Ti._6(0,null,3,0,"img",[["alt","淘璞帮"],["class","logo-text"],["src","./assets/image/tpb.png"]],null,null,null,null,null)),(l()(),Ti._27(3,["\n\t\t"])),(l()(),Ti._27(3,["\n  "])),(l()(),Ti._27(1,["\n  "])),(l()(),Ti._6(0,null,1,36,"div",[["class","menu-list"]],null,null,null,null,null)),(l()(),Ti._27(null,["\n    "])),(l()(),Ti._6(0,null,null,33,"ion-grid",[["class","grid"]],null,null,null,null,null)),Ti._4(16384,null,0,f_.a,[],null,null),(l()(),Ti._27(null,["\n      "])),(l()(),Ti._6(0,null,null,29,"ion-row",[["class","row"]],null,null,null,null,null)),Ti._4(16384,null,0,h_.a,[],null,null),(l()(),Ti._27(null,["\n        "])),(l()(),Ti._6(0,null,null,7,"ion-col",[["class","col"]],null,[[null,"touchstart"]],function(l,n,u){var t=!0;if("touchstart"===n){t=!1!==l.component.qrCodeScan()&&t}return t},null,null)),Ti._4(16384,null,0,g_.a,[],null,null),(l()(),Ti._27(null,["\n          "])),(l()(),Ti._6(0,null,null,0,"img",[["alt","扫码确认"],["class","logo-img"],["src","./assets/image/scan.png"]],null,null,null,null,null)),(l()(),Ti._27(null,["\n          "])),(l()(),Ti._6(0,null,null,1,"span",[],null,null,null,null,null)),(l()(),Ti._27(null,["扫一扫"])),(l()(),Ti._27(null,["\n        "])),(l()(),Ti._27(null,["\n        "])),(l()(),Ti._6(0,null,null,7,"ion-col",[["class","col"]],null,[[null,"touchstart"]],function(l,n,u){var t=!0;if("touchstart"===n){t=!1!==l.component.goMyCode()&&t}return t},null,null)),Ti._4(16384,null,0,g_.a,[],null,null),(l()(),Ti._27(null,["\n          "])),(l()(),Ti._6(0,null,null,0,"img",[["alt","我的二维码"],["class","logo-img"],["src","./assets/image/mycode.png"]],null,null,null,null,null)),(l()(),Ti._27(null,["\n          "])),(l()(),Ti._6(0,null,null,1,"span",[],null,null,null,null,null)),(l()(),Ti._27(null,["我的二维码"])),(l()(),Ti._27(null,["\n        "])),(l()(),Ti._27(null,["\n        "])),(l()(),Ti._6(0,null,null,7,"ion-col",[["class","col"]],null,[[null,"touchstart"]],function(l,n,u){var t=!0;if("touchstart"===n){t=!1!==l.component.goCreatOrder()&&t}return t},null,null)),Ti._4(16384,null,0,g_.a,[],null,null),(l()(),Ti._27(null,["\n          "])),(l()(),Ti._6(0,null,null,0,"img",[["alt","生成订单"],["class","logo-img"],["src","./assets/image/order.png"]],null,null,null,null,null)),(l()(),Ti._27(null,["\n          "])),(l()(),Ti._6(0,null,null,1,"span",[],null,null,null,null,null)),(l()(),Ti._27(null,["生成订单"])),(l()(),Ti._27(null,["\n        "])),(l()(),Ti._27(null,["\n      "])),(l()(),Ti._27(null,["\n    "])),(l()(),Ti._27(null,["\n  "])),(l()(),Ti._27(1,["\n  "])),(l()(),Ti._6(0,null,1,39,"div",[["class","order-unaudit"]],null,null,null,null,null)),(l()(),Ti._27(null,["\n    "])),(l()(),Ti._6(0,null,null,36,"ion-grid",[["class","grid"]],null,null,null,null,null)),Ti._4(16384,null,0,f_.a,[],null,null),(l()(),Ti._27(null,["\n      "])),(l()(),Ti._6(0,null,null,32,"ion-row",[["class","row"]],null,null,null,null,null)),Ti._4(16384,null,0,h_.a,[],null,null),(l()(),Ti._27(null,["\n        "])),(l()(),Ti._6(0,null,null,20,"ion-col",[["class","col"]],null,null,null,null,null)),Ti._4(16384,null,0,g_.a,[],null,null),(l()(),Ti._27(null,["\n          "])),(l()(),Ti._6(0,null,null,16,"dl",[],null,null,null,null,null)),(l()(),Ti._27(null,["\n            "])),(l()(),Ti._6(0,null,null,3,"dt",[["class","order-title"]],null,null,null,null,null)),(l()(),Ti._27(null,["待审核订单"])),(l()(),Ti._6(0,null,null,1,"span",[],null,null,null,null,null)),(l()(),Ti._27(null,["",""])),(l()(),Ti._27(null,["\n            "])),(l()(),Ti._6(0,null,null,3,"dd",[],null,null,null,null,null)),(l()(),Ti._27(null,["取消订单"])),(l()(),Ti._6(0,null,null,1,"span",[],null,null,null,null,null)),(l()(),Ti._27(null,["(",")"])),(l()(),Ti._27(null,["\n            "])),(l()(),Ti._6(0,null,null,3,"dd",[],null,null,null,null,null)),(l()(),Ti._27(null,["退货订单"])),(l()(),Ti._6(0,null,null,1,"span",[],null,null,null,null,null)),(l()(),Ti._27(null,["(",")"])),(l()(),Ti._27(null,["\n          "])),(l()(),Ti._27(null,["\n        "])),(l()(),Ti._27(null,["\n        "])),(l()(),Ti._6(0,null,null,6,"ion-col",[["class","col"]],null,null,null,null,null)),Ti._4(16384,null,0,g_.a,[],null,null),(l()(),Ti._27(null,["\n          "])),(l()(),Ti._6(0,null,null,2,"button",[["color","light"],["ion-button",""],["outline",""],["round",""]],null,[[null,"touchstart"]],function(l,n,u){var t=!0;if("touchstart"===n){t=!1!==l.component.goUnAudit()&&t}return t},t_.b,t_.a)),Ti._4(1097728,null,0,e_.a,[[8,""],kc.a,Ti.k,Ti.E],{color:[0,"color"],outline:[1,"outline"],round:[2,"round"]},null),(l()(),Ti._27(0,["立即处理"])),(l()(),Ti._27(null,["\n        "])),(l()(),Ti._27(null,["\n      "])),(l()(),Ti._27(null,["\n    "])),(l()(),Ti._27(null,["\n  "])),(l()(),Ti._27(1,["\n  "])),(l()(),Ti._6(0,null,1,39,"div",[["class","gift-unhandle"]],null,null,null,null,null)),(l()(),Ti._27(null,["\n    "])),(l()(),Ti._6(0,null,null,36,"ion-grid",[["class","grid"]],null,null,null,null,null)),Ti._4(16384,null,0,f_.a,[],null,null),(l()(),Ti._27(null,["\n      "])),(l()(),Ti._6(0,null,null,32,"ion-row",[["class","row"]],null,null,null,null,null)),Ti._4(16384,null,0,h_.a,[],null,null),(l()(),Ti._27(null,["\n        "])),(l()(),Ti._6(0,null,null,20,"ion-col",[["class","col"]],null,null,null,null,null)),Ti._4(16384,null,0,g_.a,[],null,null),(l()(),Ti._27(null,["\n          "])),(l()(),Ti._6(0,null,null,16,"dl",[],null,null,null,null,null)),(l()(),Ti._27(null,["\n            "])),(l()(),Ti._6(0,null,null,3,"dt",[["class","gift-title"]],null,null,null,null,null)),(l()(),Ti._27(null,["待处理赠品"])),(l()(),Ti._6(0,null,null,1,"span",[],null,null,null,null,null)),(l()(),Ti._27(null,["",""])),(l()(),Ti._27(null,["\n            "])),(l()(),Ti._6(0,null,null,3,"dd",[],null,null,null,null,null)),(l()(),Ti._27(null,["自提赠品"])),(l()(),Ti._6(0,null,null,1,"span",[],null,null,null,null,null)),(l()(),Ti._27(null,["(",")"])),(l()(),Ti._27(null,["\n            "])),(l()(),Ti._6(0,null,null,3,"dd",[],null,null,null,null,null)),(l()(),Ti._27(null,["快递赠品"])),(l()(),Ti._6(0,null,null,1,"span",[],null,null,null,null,null)),(l()(),Ti._27(null,["(",")"])),(l()(),Ti._27(null,["\n          "])),(l()(),Ti._27(null,["\n        "])),(l()(),Ti._27(null,["\n        "])),(l()(),Ti._6(0,null,null,6,"ion-col",[["class","col"]],null,null,null,null,null)),Ti._4(16384,null,0,g_.a,[],null,null),(l()(),Ti._27(null,["\n          "])),(l()(),Ti._6(0,null,null,2,"button",[["color","light"],["ion-button",""],["outline",""],["round",""]],null,[[null,"touchstart"]],function(l,n,u){var t=!0;if("touchstart"===n){t=!1!==l.component.goUnHandle()&&t}return t},t_.b,t_.a)),Ti._4(1097728,null,0,e_.a,[[8,""],kc.a,Ti.k,Ti.E],{color:[0,"color"],outline:[1,"outline"],round:[2,"round"]},null),(l()(),Ti._27(0,["立即处理"])),(l()(),Ti._27(null,["\n        "])),(l()(),Ti._27(null,["\n      "])),(l()(),Ti._27(null,["\n    "])),(l()(),Ti._27(null,["\n  "])),(l()(),Ti._27(1,["\n"])),(l()(),Ti._27(null,["\n"]))],function(l,n){l(n,96,0,"light","","");l(n,137,0,"light","","")},function(l,n){var u=n.component;l(n,3,0,Ti._20(n,4)._hidden,Ti._20(n,4)._sbPadding);l(n,12,0,Ti._20(n,13).statusbarPadding,Ti._20(n,13)._hasRefresher);l(n,15,0,Ti._20(n,16)._sbPadding);l(n,78,0,u.cancelOrderCount+u.returnOrderCount);l(n,83,0,u.cancelOrderCount);l(n,88,0,u.returnOrderCount);l(n,119,0,u.selfGiftCount+u.expressgiftCount);l(n,124,0,u.selfGiftCount);l(n,129,0,u.expressgiftCount)})}function p(l){return Ti._29(0,[Ti._25(402653184,1,{tabRef:0}),(l()(),Ti._6(0,null,null,12,"ion-tabs",[],null,null,null,y_.b,y_.a)),Ti._24(6144,null,yc.a,null,[S_.a]),Ti._4(4374528,[[1,4],["myTabs",4]],0,S_.a,[[2,Oc.a],[2,Ic.a],xc.a,kc.a,Ti.k,Dc.a,Ti.E,Ac.a,Uc.a],null,null),(l()(),Ti._27(0,["\n  "])),(l()(),Ti._6(0,null,0,1,"ion-tab",[["role","tabpanel"],["tabIcon","home"],["tabTitle","首页"]],[[1,"id",0],[1,"aria-labelledby",0]],null,null,I_.b,I_.a)),Ti._4(245760,null,0,O_.a,[S_.a,xc.a,kc.a,Dc.a,Ti.k,Ti.x,Ti.E,Ti.j,Ti.g,Cc.l,jc.a,[2,Ac.a],Tc.a,Ti.l],{root:[0,"root"],tabTitle:[1,"tabTitle"],tabIcon:[2,"tabIcon"]},null),(l()(),Ti._27(0,["\n  "])),(l()(),Ti._6(0,null,0,1,"ion-tab",[["role","tabpanel"],["tabIcon","list-box"],["tabTitle","订单"]],[[1,"id",0],[1,"aria-labelledby",0]],null,null,I_.b,I_.a)),Ti._4(245760,null,0,O_.a,[S_.a,xc.a,kc.a,Dc.a,Ti.k,Ti.x,Ti.E,Ti.j,Ti.g,Cc.l,jc.a,[2,Ac.a],Tc.a,Ti.l],{root:[0,"root"],tabTitle:[1,"tabTitle"],tabIcon:[2,"tabIcon"]},null),(l()(),Ti._27(0,["\n  "])),(l()(),Ti._6(0,null,0,1,"ion-tab",[["role","tabpanel"],["tabIcon","person"],["tabTitle","我的"]],[[1,"id",0],[1,"aria-labelledby",0]],null,null,I_.b,I_.a)),Ti._4(245760,null,0,O_.a,[S_.a,xc.a,kc.a,Dc.a,Ti.k,Ti.x,Ti.E,Ti.j,Ti.g,Cc.l,jc.a,[2,Ac.a],Tc.a,Ti.l],{root:[0,"root"],tabTitle:[1,"tabTitle"],tabIcon:[2,"tabIcon"]},null),(l()(),Ti._27(0,["\n"])),(l()(),Ti._27(null,["\n"]))],function(l,n){var u=n.component;l(n,6,0,u.home,"首页","home");l(n,9,0,u.orderList,"订单","list-box");l(n,12,0,u.personl,"我的","person")},function(l,n){l(n,5,0,Ti._20(n,6)._tabId,Ti._20(n,6)._btnId);l(n,8,0,Ti._20(n,9)._tabId,Ti._20(n,9)._btnId);l(n,11,0,Ti._20(n,12)._tabId,Ti._20(n,12)._btnId)})}function f(l){return Ti._29(0,[(l()(),Ti._6(0,null,null,10,"ion-header",[["class","header-title-hidden"]],null,null,null,null,null)),Ti._4(16384,null,0,Lc.a,[kc.a,Ti.k,Ti.E,[2,Ic.a]],null,null),(l()(),Ti._27(null,["\n  "])),(l()(),Ti._6(0,null,null,6,"ion-navbar",[["class","toolbar"]],[[8,"hidden",0],[2,"statusbar-padding",null]],null,null,qc.b,qc.a)),Ti._4(49152,null,0,Rc.a,[xc.a,[2,Ic.a],[2,Oc.a],kc.a,Ti.k,Ti.E],null,null),(l()(),Ti._27(3,["\n    "])),(l()(),Ti._6(0,null,3,2,"ion-title",[["text-center",""]],null,null,null,$c.b,$c.a)),Ti._4(49152,null,0,Gc.a,[kc.a,Ti.k,Ti.E,[2,Kc.a],[2,Rc.a]],null,null),(l()(),Ti._27(0,["我的"])),(l()(),Ti._27(3,["\n  "])),(l()(),Ti._27(null,["\n"])),(l()(),Ti._27(null,["\n"])),(l()(),Ti._6(0,null,null,145,"ion-content",[],[[2,"statusbar-padding",null],[2,"has-refresher",null]],[["window","resize"]],function(l,n,u){var t=!0;if("window:resize"===n){t=!1!==Ti._20(l,13).resize()&&t}return t},Nc.b,Nc.a)),Ti._4(4374528,null,0,Fc.a,[kc.a,Dc.a,Tc.a,Ti.k,Ti.E,xc.a,Uc.a,Ti.x,[2,Ic.a],[2,Oc.a]],null,null),(l()(),Ti._27(1,["\n  "])),(l()(),Ti._6(0,null,1,28,"div",[["class","person-header"]],null,null,null,null,null)),(l()(),Ti._27(null,["\n    "])),(l()(),Ti._6(0,null,null,25,"ion-grid",[["class","grid"]],null,null,null,null,null)),Ti._4(16384,null,0,f_.a,[],null,null),(l()(),Ti._27(null,["\n      "])),(l()(),Ti._6(0,null,null,21,"ion-row",[["class","row"]],null,null,null,null,null)),Ti._4(16384,null,0,h_.a,[],null,null),(l()(),Ti._27(null,["\n        "])),(l()(),Ti._6(0,null,null,4,"ion-col",[["class","col"],["col-4",""]],null,null,null,null,null)),Ti._4(16384,null,0,g_.a,[],null,null),(l()(),Ti._27(null,["\n          "])),(l()(),Ti._6(0,null,null,0,"img",[["alt","我的"],["class","my-picture"],["src","./assets/image/mypicture.png"]],null,null,null,null,null)),(l()(),Ti._27(null,["\n        "])),(l()(),Ti._27(null,["\n        "])),(l()(),Ti._6(0,null,null,11,"ion-col",[["class","col"],["col-8",""]],null,null,null,null,null)),Ti._4(16384,null,0,g_.a,[],null,null),(l()(),Ti._27(null,["\n          "])),(l()(),Ti._6(0,null,null,1,"h2",[],null,null,null,null,null)),(l()(),Ti._27(null,["",""])),(l()(),Ti._27(null,["\n          "])),(l()(),Ti._6(0,null,null,4,"button",[["color","light"],["ion-button",""],["outline",""],["round",""]],null,[[null,"touchstart"]],function(l,n,u){var t=!0,e=l.component;if("touchstart"===n){t=!1!==e.redirectPage(e.pageList.myCode)&&t}return t},t_.b,t_.a)),Ti._4(1097728,null,0,e_.a,[[8,""],kc.a,Ti.k,Ti.E],{color:[0,"color"],outline:[1,"outline"],round:[2,"round"]},null),(l()(),Ti._27(0,["\n            "])),(l()(),Ti._6(0,null,0,0,"img",[["alt","我的"],["src","./assets/image/qrcode.png"]],null,null,null,null,null)),(l()(),Ti._27(0,["\n            我的二维码\n          "])),(l()(),Ti._27(null,["\n        "])),(l()(),Ti._27(null,["\n      "])),(l()(),Ti._27(null,["\n    "])),(l()(),Ti._27(null,["\n  "])),(l()(),Ti._27(1,["\n  "])),(l()(),Ti._6(0,null,1,89,"div",[["class","funds"]],null,null,null,null,null)),(l()(),Ti._27(null,["\n    "])),(l()(),Ti._6(0,null,null,7,"h2",[["class","funds-title"]],null,null,null,null,null)),(l()(),Ti._27(null,["\n      我的资金\n      "])),(l()(),Ti._6(0,null,null,1,"span",[["class","showTotal"]],null,[[null,"touchstart"]],function(l,n,u){var t=!0;if("touchstart"===n){t=!1!==l.component.showMoney()&&t}return t},null,null)),(l()(),Ti._27(null,["\n        ","\n      "])),(l()(),Ti._27(null,["\n      "])),(l()(),Ti._6(0,null,null,1,"span",[["class","showImg"]],null,null,null,null,null)),(l()(),Ti._6(0,null,null,0,"img",[["alt","我的资金"]],[[8,"src",4]],null,null,null,null)),(l()(),Ti._27(null,["\n    "])),(l()(),Ti._27(null,["\n    "])),(l()(),Ti._6(0,null,null,33,"ion-grid",[["class","grid"]],null,null,null,null,null)),Ti._4(16384,null,0,f_.a,[],null,null),(l()(),Ti._27(null,["\n      "])),(l()(),Ti._6(0,null,null,11,"ion-row",[["class","row"]],null,null,null,null,null)),Ti._4(16384,null,0,h_.a,[],null,null),(l()(),Ti._27(null,["\n        "])),(l()(),Ti._6(0,null,null,7,"ion-col",[["class","col"]],null,null,null,null,null)),Ti._4(16384,null,0,g_.a,[],null,null),(l()(),Ti._27(null,["\n          "])),(l()(),Ti._6(0,null,null,3,"div",[["class","total"]],null,null,null,null,null)),(l()(),Ti._6(0,null,null,1,"span",[],null,null,null,null,null)),(l()(),Ti._27(null,["￥"])),(l()(),Ti._27(null,["",""])),(l()(),Ti._27(null,["\n        "])),(l()(),Ti._27(null,["\n      "])),(l()(),Ti._27(null,["\n      "])),(l()(),Ti._6(0,null,null,16,"ion-row",[["class","row"]],null,null,null,null,null)),Ti._4(16384,null,0,h_.a,[],null,null),(l()(),Ti._27(null,["\n        "])),(l()(),Ti._6(0,null,null,5,"ion-col",[["class","col"]],null,null,null,null,null)),Ti._4(16384,null,0,g_.a,[],null,null),(l()(),Ti._27(null,["\n          "])),(l()(),Ti._6(0,null,null,1,"div",[["class","approve"]],null,null,null,null,null)),(l()(),Ti._27(null,["审核中金额：￥",""])),(l()(),Ti._27(null,["\n        "])),(l()(),Ti._27(null,["\n        "])),(l()(),Ti._6(0,null,null,5,"ion-col",[["class","col"]],null,null,null,null,null)),Ti._4(16384,null,0,g_.a,[],null,null),(l()(),Ti._27(null,["\n          "])),(l()(),Ti._6(0,null,null,1,"div",[["class","withdrawal"]],null,null,null,null,null)),(l()(),Ti._27(null,["已提现：￥",""])),(l()(),Ti._27(null,["\n        "])),(l()(),Ti._27(null,["\n      "])),(l()(),Ti._27(null,["\n    "])),(l()(),Ti._27(null,["\n    "])),(l()(),Ti._6(0,null,null,30,"ion-grid",[["class","btn-list grid"]],null,null,null,null,null)),Ti._4(16384,null,0,f_.a,[],null,null),(l()(),Ti._27(null,["\n      "])),(l()(),Ti._6(0,null,null,26,"ion-row",[["class","row"]],null,null,null,null,null)),Ti._4(16384,null,0,h_.a,[],null,null),(l()(),Ti._27(null,["\n        "])),(l()(),Ti._6(0,null,null,6,"ion-col",[["class","col"],["col-4",""]],null,null,null,null,null)),Ti._4(16384,null,0,g_.a,[],null,null),(l()(),Ti._27(null,["\n          "])),(l()(),Ti._6(0,null,null,2,"button",[["class","btn-canwithdrawal"],["ion-button",""],["outline",""],["round",""]],null,[[null,"touchstart"]],function(l,n,u){var t=!0,e=l.component;if("touchstart"===n){t=!1!==e.redirectPage(e.pageList.detailTabs)&&t}return t},t_.b,t_.a)),Ti._4(1097728,null,0,e_.a,[[8,""],kc.a,Ti.k,Ti.E],{outline:[0,"outline"],round:[1,"round"]},null),(l()(),Ti._27(0,["已审核明细"])),(l()(),Ti._27(null,["\n        "])),(l()(),Ti._27(null,["\n        "])),(l()(),Ti._6(0,null,null,6,"ion-col",[["class","col"],["col-4",""]],null,null,null,null,null)),Ti._4(16384,null,0,g_.a,[],null,null),(l()(),Ti._27(null,["\n          "])),(l()(),Ti._6(0,null,null,2,"button",[["class","btn-approve"],["ion-button",""],["outline",""],["round",""]],null,[[null,"touchstart"]],function(l,n,u){var t=!0,e=l.component;if("touchstart"===n){t=!1!==e.redirectPage(e.pageList.awardTabs)&&t}return t},t_.b,t_.a)),Ti._4(1097728,null,0,e_.a,[[8,""],kc.a,Ti.k,Ti.E],{outline:[0,"outline"],round:[1,"round"]},null),(l()(),Ti._27(0,["审核中明细"])),(l()(),Ti._27(null,["\n        "])),(l()(),Ti._27(null,["\n        "])),(l()(),Ti._6(0,null,null,6,"ion-col",[["class","col"],["col-4",""]],null,null,null,null,null)),Ti._4(16384,null,0,g_.a,[],null,null),(l()(),Ti._27(null,["\n          "])),(l()(),Ti._6(0,null,null,2,"button",[["class","btn-withdrawal"],["ion-button",""],["outline",""],["round",""]],null,[[null,"touchstart"]],function(l,n,u){var t=!0,e=l.component;if("touchstart"===n){t=!1!==e.redirectPage(e.pageList.withdraw,e.userAccount.balance,e.userCurrent)&&t}return t},t_.b,t_.a)),Ti._4(1097728,null,0,e_.a,[[8,""],kc.a,Ti.k,Ti.E],{outline:[0,"outline"],round:[1,"round"]},null),(l()(),Ti._27(0,["提现"])),(l()(),Ti._27(null,["\n        "])),(l()(),Ti._27(null,["\n      "])),(l()(),Ti._27(null,["\n    "])),(l()(),Ti._27(null,["\n    "])),(l()(),Ti._6(0,null,null,4,"div",[["class","withdrawal-record"]],null,[[null,"click"]],function(l,n,u){var t=!0,e=l.component;if("click"===n){t=!1!==e.redirectPage(e.pageList.withdrawRecord,e.userAccount.withdrawAmount)&&t}return t},null,null)),(l()(),Ti._27(null,["\n      提现记录\n      "])),(l()(),Ti._6(0,null,null,1,"span",[],null,null,null,null,null)),(l()(),Ti._6(0,null,null,0,"img",[["alt","提现记录"],["src","./assets/image/in.png"]],null,null,null,null,null)),(l()(),Ti._27(null,["\n    "])),(l()(),Ti._27(null,["\n    "])),(l()(),Ti._6(0,null,null,4,"div",[["class","withdrawal-record"]],null,[[null,"click"]],function(l,n,u){var t=!0,e=l.component;if("click"===n){t=!1!==e.redirectPage(e.pageList.addAccount,e.pageList.boundWechat,e.userCurrent)&&t}return t},null,null)),(l()(),Ti._27(null,["\n      收款账户\n      "])),(l()(),Ti._6(0,null,null,1,"span",[],null,null,null,null,null)),(l()(),Ti._6(0,null,null,0,"img",[["alt","收款账户"],["src","./assets/image/in.png"]],null,null,null,null,null)),(l()(),Ti._27(null,["\n    "])),(l()(),Ti._27(null,["\n  "])),(l()(),Ti._27(1,["\n  "])),(l()(),Ti._6(0,null,1,16,"div",[["class","help"]],null,null,null,null,null)),(l()(),Ti._27(null,["\n    "])),(l()(),Ti._6(0,null,null,13,"ul",[],null,null,null,null,null)),(l()(),Ti._27(null,["\n      "])),(l()(),Ti._6(0,null,null,3,"li",[],null,[[null,"click"]],function(l,n,u){var t=!0,e=l.component;if("click"===n){t=!1!==e.redirectPage(e.pageList.help)&&t}return t},null,null)),(l()(),Ti._27(null,["帮助中心"])),(l()(),Ti._6(0,null,null,1,"span",[],null,null,null,null,null)),(l()(),Ti._6(0,null,null,0,"img",[["alt","帮助中心"],["src","./assets/image/in.png"]],null,null,null,null,null)),(l()(),Ti._27(null,["\n      "])),(l()(),Ti._6(0,null,null,5,"li",[],null,null,null,null,null)),(l()(),Ti._6(0,null,null,4,"a",[["href","tel:4008916161"],["style","display: block;"]],null,null,null,null,null)),(l()(),Ti._27(null,["客服热线"])),(l()(),Ti._6(0,null,null,2,"span",[],null,null,null,null,null)),(l()(),Ti._27(null,["400-891-6161"])),(l()(),Ti._6(0,null,null,0,"img",[["alt","客服热线"],["src","./assets/image/in.png"]],null,null,null,null,null)),(l()(),Ti._27(null,["\n    "])),(l()(),Ti._27(null,["\n  "])),(l()(),Ti._27(1,["\n  "])),(l()(),Ti._6(0,null,1,2,"button",[["class","btn-logout"],["ion-button",""]],null,[[null,"click"]],function(l,n,u){var t=!0;if("click"===n){t=!1!==l.component.logOut()&&t}return t},t_.b,t_.a)),Ti._4(1097728,null,0,e_.a,[[8,""],kc.a,Ti.k,Ti.E],null,null),(l()(),Ti._27(0,["退出登录"])),(l()(),Ti._27(1,["\n"])),(l()(),Ti._27(null,["\n"]))],function(l,n){l(n,36,0,"light","","");l(n,101,0,"","");l(n,109,0,"","");l(n,117,0,"","")},function(l,n){var u=n.component;l(n,3,0,Ti._20(n,4)._hidden,Ti._20(n,4)._sbPadding);l(n,12,0,Ti._20(n,13).statusbarPadding,Ti._20(n,13)._hasRefresher);l(n,33,0,u.userCurrent.cellphone);l(n,50,0,u.showText);l(n,53,0,"./assets/image/"+u.showImg);l(n,68,0,u.userAccount.balance);l(n,79,0,u.userAccount.verifyAmount);l(n,86,0,u.userAccount.withdrawAmount)})}function h(l){return Ti._29(0,[(l()(),Ti._6(0,null,null,1,"span",[],null,null,null,null,null)),(l()(),Ti._27(null,["",""]))],null,function(l,n){l(n,1,0,n.context.$implicit.attrValue)})}function g(l){return Ti._29(0,[(l()(),Ti._6(0,null,null,25,"div",[["class","order-item"]],null,null,null,null,null)),(l()(),Ti._27(null,["\n        "])),(l()(),Ti._6(0,null,null,22,"dl",[],null,null,null,null,null)),(l()(),Ti._27(null,["\n          "])),(l()(),Ti._6(0,null,null,4,"dt",[],null,null,null,null,null)),(l()(),Ti._27(null,["\n            "])),(l()(),Ti._6(0,null,null,1,"img",[["alt","小裙子"],["class","my-picture"]],[[8,"src",4]],null,null,null,null)),Ti._23(1),(l()(),Ti._27(null,["\n          "])),(l()(),Ti._27(null,["\n          "])),(l()(),Ti._6(0,null,null,1,"dd",[["class","product-title"]],null,null,null,null,null)),(l()(),Ti._27(null,["",""])),(l()(),Ti._27(null,["\n          "])),(l()(),Ti._6(0,null,null,4,"dd",[["class","sku-list"]],null,null,null,null,null)),(l()(),Ti._27(null,["\n            "])),(l()(),Ti._0(16777216,null,null,1,null,h)),Ti._4(802816,null,0,Zc.i,[Ti.O,Ti.K,Ti.r],{ngForOf:[0,"ngForOf"]},null),(l()(),Ti._27(null,["\n          "])),(l()(),Ti._27(null,["\n          "])),(l()(),Ti._6(0,null,null,1,"dd",[["class","price"]],null,null,null,null,null)),(l()(),Ti._27(null,["",""])),(l()(),Ti._27(null,["\n          "])),(l()(),Ti._6(0,null,null,1,"dd",[["class","count"]],null,null,null,null,null)),(l()(),Ti._27(null,["X ",""])),(l()(),Ti._27(null,["\n        "])),(l()(),Ti._27(null,["\n      "]))],function(l,n){l(n,16,0,n.context.$implicit.productSkuDTO.attrValueList)},function(l,n){l(n,6,0,Ti._28(n,6,0,l(n,7,0,Ti._20(n.parent.parent,0),n.context.$implicit.productSkuDTO.fileSeq)));l(n,11,0,n.context.$implicit.productSkuDTO.productName);l(n,20,0,n.context.$implicit.unitPrice);l(n,23,0,n.context.$implicit.number)})}function m(l){return Ti._29(0,[(l()(),Ti._6(0,null,null,22,"div",[],null,null,null,null,null)),(l()(),Ti._27(null,["\n    "])),(l()(),Ti._6(0,null,null,9,"div",[["class","order-title"]],null,null,null,null,null)),(l()(),Ti._27(null,["\n      "])),(l()(),Ti._6(0,null,null,0,"img",[["alt","店铺"],["class","my-picture"],["src","./assets/image/store.png"]],null,null,null,null,null)),(l()(),Ti._27(null,["\n      "])),(l()(),Ti._6(0,null,null,1,"h2",[],null,null,null,null,null)),(l()(),Ti._27(null,["",""])),(l()(),Ti._27(null,["\n      "])),(l()(),Ti._6(0,null,null,1,"span",[],null,null,null,null,null)),(l()(),Ti._27(null,["",""])),(l()(),Ti._27(null,["\n    "])),(l()(),Ti._27(null,["\n    "])),(l()(),Ti._6(0,null,null,4,"div",[["class","order-list"]],null,null,null,null,null)),(l()(),Ti._27(null,["\n\n      "])),(l()(),Ti._0(16777216,null,null,1,null,g)),Ti._4(802816,null,0,Zc.i,[Ti.O,Ti.K,Ti.r],{ngForOf:[0,"ngForOf"]},null),(l()(),Ti._27(null,["\n    "])),(l()(),Ti._27(null,["\n    "])),(l()(),Ti._6(0,null,null,2,"button",[["class","btn-confirm"],["ion-button",""]],null,[[null,"click"]],function(l,n,u){var t=!0;if("click"===n){t=!1!==l.component.presentConfirm()&&t}return t},t_.b,t_.a)),Ti._4(1097728,null,0,e_.a,[[8,""],kc.a,Ti.k,Ti.E],null,null),(l()(),Ti._27(0,["确认提货"])),(l()(),Ti._27(null,["\n  "]))],function(l,n){l(n,16,0,n.component.orderDetail.orderItemProductSkuDTOS)},function(l,n){var u=n.component;l(n,7,0,u.orderDetail.brandshopName);l(n,10,0,u.orderDetail.orderId)})}function v(l){return Ti._29(0,[(l()(),Ti._6(0,null,null,10,"div",[["class","request-defeat"]],null,null,null,null,null)),(l()(),Ti._27(null,["\n    "])),(l()(),Ti._6(0,null,null,0,"img",[["alt",""],["src","./assets/image/requestDefeat.png"]],null,null,null,null,null)),(l()(),Ti._27(null,["\n    "])),(l()(),Ti._6(0,null,null,1,"p",[],null,null,null,null,null)),(l()(),Ti._27(null,["啊哦！页面走丢了"])),(l()(),Ti._27(null,["\n    "])),(l()(),Ti._6(0,null,null,2,"button",[["class","btn-request-defeat"],["full",""],["ion-button",""]],null,[[null,"touchstart"]],function(l,n,u){var t=!0;if("touchstart"===n){t=!1!==l.component.getOrderDetail()&&t}return t},t_.b,t_.a)),Ti._4(1097728,null,0,e_.a,[[8,""],kc.a,Ti.k,Ti.E],{full:[0,"full"]},null),(l()(),Ti._27(0,["\n      刷新再找一找\n    "])),(l()(),Ti._27(null,["\n  "]))],function(l,n){l(n,8,0,"")},null)}function b(l){return Ti._29(0,[Ti._21(0,Ds,[]),(l()(),Ti._6(0,null,null,10,"ion-header",[],null,null,null,null,null)),Ti._4(16384,null,0,Lc.a,[kc.a,Ti.k,Ti.E,[2,Ic.a]],null,null),(l()(),Ti._27(null,["\n  "])),(l()(),Ti._6(0,null,null,6,"ion-navbar",[["class","toolbar"]],[[8,"hidden",0],[2,"statusbar-padding",null]],null,null,qc.b,qc.a)),Ti._4(49152,null,0,Rc.a,[xc.a,[2,Ic.a],[2,Oc.a],kc.a,Ti.k,Ti.E],null,null),(l()(),Ti._27(3,["\n    "])),(l()(),Ti._6(0,null,3,2,"ion-title",[["text-center",""]],null,null,null,$c.b,$c.a)),Ti._4(49152,null,0,Gc.a,[kc.a,Ti.k,Ti.E,[2,Kc.a],[2,Rc.a]],null,null),(l()(),Ti._27(0,["订单信息"])),(l()(),Ti._27(3,["\n  "])),(l()(),Ti._27(null,["\n"])),(l()(),Ti._27(null,["\n"])),(l()(),Ti._6(0,null,null,8,"ion-content",[],[[2,"statusbar-padding",null],[2,"has-refresher",null]],[["window","resize"]],function(l,n,u){var t=!0;if("window:resize"===n){t=!1!==Ti._20(l,14).resize()&&t}return t},Nc.b,Nc.a)),Ti._4(4374528,null,0,Fc.a,[kc.a,Dc.a,Tc.a,Ti.k,Ti.E,xc.a,Uc.a,Ti.x,[2,Ic.a],[2,Oc.a]],null,null),(l()(),Ti._27(1,["\n  "])),(l()(),Ti._0(16777216,null,1,1,null,m)),Ti._4(16384,null,0,Zc.j,[Ti.O,Ti.K],{ngIf:[0,"ngIf"]},null),(l()(),Ti._27(1,["\n  "])),(l()(),Ti._0(16777216,null,1,1,null,v)),Ti._4(16384,null,0,Zc.j,[Ti.O,Ti.K],{ngIf:[0,"ngIf"]},null),(l()(),Ti._27(1,["\n"])),(l()(),Ti._27(null,["\n"]))],function(l,n){var u=n.component;l(n,17,0,u.orderDetail.orderSeq);l(n,20,0,u.requestDefeat)},function(l,n){l(n,4,0,Ti._20(n,5)._hidden,Ti._20(n,5)._sbPadding);l(n,13,0,Ti._20(n,14).statusbarPadding,Ti._20(n,14)._hasRefresher)})}function w(l){return Ti._29(0,[(l()(),Ti._6(0,null,null,10,"div",[["class","request-defeat"]],null,null,null,null,null)),(l()(),Ti._27(null,["\n      "])),(l()(),Ti._6(0,null,null,0,"img",[["alt",""],["src","./assets/image/requestDefeat.png"]],null,null,null,null,null)),(l()(),Ti._27(null,["\n      "])),(l()(),Ti._6(0,null,null,1,"p",[],null,null,null,null,null)),(l()(),Ti._27(null,["啊哦！页面走丢了"])),(l()(),Ti._27(null,["\n      "])),(l()(),Ti._6(0,null,null,2,"button",[["class","btn-request-defeat"],["full",""],["ion-button",""]],null,[[null,"touchstart"]],function(l,n,u){var t=!0;if("touchstart"===n){t=!1!==l.component.getGiftDetail()&&t}return t},t_.b,t_.a)),Ti._4(1097728,null,0,e_.a,[[8,""],kc.a,Ti.k,Ti.E],{full:[0,"full"]},null),(l()(),Ti._27(0,["\n        刷新再找一找\n      "])),(l()(),Ti._27(null,["\n    "]))],function(l,n){l(n,8,0,"")},null)}function y(l){return Ti._29(0,[Ti._21(0,Cs,[]),Ti._21(0,Zc.d,[Ti.t]),(l()(),Ti._6(0,null,null,10,"ion-header",[],null,null,null,null,null)),Ti._4(16384,null,0,Lc.a,[kc.a,Ti.k,Ti.E,[2,Ic.a]],null,null),(l()(),Ti._27(null,["\n    "])),(l()(),Ti._6(0,null,null,6,"ion-navbar",[["class","toolbar"]],[[8,"hidden",0],[2,"statusbar-padding",null]],null,null,qc.b,qc.a)),Ti._4(49152,null,0,Rc.a,[xc.a,[2,Ic.a],[2,Oc.a],kc.a,Ti.k,Ti.E],null,null),(l()(),Ti._27(3,["\n      "])),(l()(),Ti._6(0,null,3,2,"ion-title",[["text-center",""]],null,null,null,$c.b,$c.a)),Ti._4(49152,null,0,Gc.a,[kc.a,Ti.k,Ti.E,[2,Kc.a],[2,Rc.a]],null,null),(l()(),Ti._27(0,["赠品信息"])),(l()(),Ti._27(3,["\n    "])),(l()(),Ti._27(null,["\n  "])),(l()(),Ti._27(null,["\n  "])),(l()(),Ti._6(0,null,null,42,"ion-content",[],[[2,"statusbar-padding",null],[2,"has-refresher",null]],[["window","resize"]],function(l,n,u){var t=!0;if("window:resize"===n){t=!1!==Ti._20(l,15).resize()&&t}return t},Nc.b,Nc.a)),Ti._4(4374528,null,0,Fc.a,[kc.a,Dc.a,Tc.a,Ti.k,Ti.E,xc.a,Uc.a,Ti.x,[2,Ic.a],[2,Oc.a]],null,null),(l()(),Ti._27(1,["\n    "])),(l()(),Ti._6(0,null,1,6,"div",[["class","order-title"]],null,null,null,null,null)),(l()(),Ti._27(null,["\n      "])),(l()(),Ti._6(0,null,null,0,"img",[["alt","店铺"],["class","my-picture"],["src","./assets/image/store.png"]],null,null,null,null,null)),(l()(),Ti._27(null,["\n      "])),(l()(),Ti._6(0,null,null,1,"h2",[],null,null,null,null,null)),(l()(),Ti._27(null,["",""])),(l()(),Ti._27(null,["\n    "])),(l()(),Ti._27(1,["\n    "])),(l()(),Ti._6(0,null,1,23,"div",[["class","order-list"]],null,null,null,null,null)),(l()(),Ti._27(null,["\n  \n      "])),(l()(),Ti._6(0,null,null,20,"div",[["class","order-item"]],null,null,null,null,null)),(l()(),Ti._27(null,["\n        "])),(l()(),Ti._6(0,null,null,17,"dl",[],null,null,null,null,null)),(l()(),Ti._27(null,["\n          "])),(l()(),Ti._6(0,null,null,4,"dt",[],null,null,null,null,null)),(l()(),Ti._27(null,["\n            "])),(l()(),Ti._6(0,null,null,1,"img",[["alt","小裙子"],["class","my-picture"]],[[8,"src",4]],null,null,null,null)),Ti._23(1),(l()(),Ti._27(null,["\n          "])),(l()(),Ti._27(null,["\n          "])),(l()(),Ti._6(0,null,null,1,"dd",[["class","product-title"]],null,null,null,null,null)),(l()(),Ti._27(null,["",""])),(l()(),Ti._27(null,["\n          "])),(l()(),Ti._6(0,null,null,5,"dd",[["class","sku-list"]],null,null,null,null,null)),(l()(),Ti._27(null,["\n            "])),(l()(),Ti._6(0,null,null,2,"span",[],null,null,null,null,null)),(l()(),Ti._27(null,["领取时间：",""])),Ti._23(2),(l()(),Ti._27(null,["\n          "])),(l()(),Ti._27(null,["\n        "])),(l()(),Ti._27(null,["\n      "])),(l()(),Ti._27(null,["\n  \n    "])),(l()(),Ti._27(1,["\n    "])),(l()(),Ti._6(0,null,1,2,"button",[["class","btn-confirm"],["ion-button",""]],null,[[null,"click"]],function(l,n,u){var t=!0;if("click"===n){t=!1!==l.component.presentConfirm()&&t}return t},t_.b,t_.a)),Ti._4(1097728,null,0,e_.a,[[8,""],kc.a,Ti.k,Ti.E],null,null),(l()(),Ti._27(0,["确认兑换"])),(l()(),Ti._27(1,["\n    "])),(l()(),Ti._0(16777216,null,1,1,null,w)),Ti._4(16384,null,0,Zc.j,[Ti.O,Ti.K],{ngIf:[0,"ngIf"]},null),(l()(),Ti._27(1,["\n  "])),(l()(),Ti._27(null,["\n  "]))],function(l,n){l(n,55,0,n.component.requestDefeat)},function(l,n){var u=n.component;l(n,5,0,Ti._20(n,6)._hidden,Ti._20(n,6)._sbPadding);l(n,14,0,Ti._20(n,15).statusbarPadding,Ti._20(n,15)._hasRefresher);l(n,22,0,u.giftInfo.brandshopName);l(n,33,0,Ti._28(n,33,0,l(n,34,0,Ti._20(n,0),u.giftInfo.imageName)));l(n,38,0,u.giftInfo.giftName);l(n,43,0,Ti._28(n,43,0,l(n,44,0,Ti._20(n,1),u.giftInfo.receiveDate,"yyyy.MM.dd HH:mm")))})}function S(l){return Ti._29(0,[(l()(),Ti._6(0,null,null,5,"ion-refresher",[],[[2,"refresher-active",null],[4,"top",null]],[[null,"ionRefresh"]],function(l,n,u){var t=!0;if("ionRefresh"===n){t=!1!==l.component.refreshGetCreatOrderList(u)&&t}return t},null,null)),Ti._4(212992,null,0,E_.a,[Dc.a,Fc.a,Ti.x,Cc.l],null,{ionRefresh:"ionRefresh"}),(l()(),Ti._27(null,["\n  "])),(l()(),Ti._6(0,null,null,1,"ion-refresher-content",[],[[1,"state",0]],null,null,M_.b,M_.a)),Ti._4(114688,null,0,L_.a,[E_.a,kc.a],null,null),(l()(),Ti._27(null,["\n"]))],function(l,n){l(n,1,0),l(n,4,0)},function(l,n){l(n,0,0,"inactive"!==Ti._20(n,1).state,Ti._20(n,1)._top);l(n,3,0,Ti._20(n,4).r.state)})}function I(l){return Ti._29(0,[(l()(),Ti._6(0,null,null,9,"div",[["class","loading-wrapper"]],null,null,null,null,null)),(l()(),Ti._27(null,["\n    "])),(l()(),Ti._6(0,null,null,4,"div",[],null,null,null,null,null)),(l()(),Ti._27(null,["\n      "])),(l()(),Ti._6(0,null,null,1,"ion-spinner",[["item-start",""]],[[2,"spinner-paused",null]],null,null,q_.b,q_.a)),Ti._4(114688,null,0,R_.a,[kc.a,Ti.k,Ti.E],{name:[0,"name"]},null),(l()(),Ti._27(null,["\n    "])),(l()(),Ti._27(null,["\n    "])),(l()(),Ti._6(0,null,null,0,"div",[],[[8,"innerHTML",1]],null,null,null,null)),(l()(),Ti._27(null,["\n  "]))],function(l,n){l(n,5,0,n.component.load.spinner)},function(l,n){var u=n.component;l(n,4,0,Ti._20(n,5)._paused);l(n,8,0,u.load.content)})}function O(l){return Ti._29(0,[(l()(),Ti._6(0,null,null,12,"li",[],null,null,null,null,null)),(l()(),Ti._27(null,["\n      "])),(l()(),Ti._6(0,null,null,1,"img",[["alt","产品"]],[[8,"src",4]],null,null,null,null)),Ti._23(1),(l()(),Ti._27(null,["\n      "])),(l()(),Ti._6(0,null,null,1,"p",[],null,null,null,null,null)),(l()(),Ti._27(null,["",""])),(l()(),Ti._27(null,["\n      "])),(l()(),Ti._6(0,null,null,3,"div",[["class","btn-add"]],null,null,null,null,null)),(l()(),Ti._6(0,null,null,2,"button",[["ion-button",""],["round",""]],null,[[null,"click"]],function(l,n,u){var t=!0;if("click"===n){t=!1!==l.component.addProductModal(l.context.index)&&t}return t},t_.b,t_.a)),Ti._4(1097728,null,0,e_.a,[[8,""],kc.a,Ti.k,Ti.E],{round:[0,"round"]},null),(l()(),Ti._27(0,["加入配单仓"])),(l()(),Ti._27(null,["\n    "]))],function(l,n){l(n,10,0,"")},function(l,n){l(n,2,0,Ti._28(n,2,0,l(n,3,0,Ti._20(n.parent.parent,0),n.context.$implicit.fileSeq)));l(n,6,0,n.context.$implicit.productName)})}function x(l){return Ti._29(0,[(l()(),Ti._6(0,null,null,7,"div",[["class","product-list"]],null,null,null,null,null)),(l()(),Ti._27(null,["\n  "])),(l()(),Ti._6(0,null,null,4,"ul",[],null,null,null,null,null)),(l()(),Ti._27(null,["\n    "])),(l()(),Ti._0(16777216,null,null,1,null,O)),Ti._4(802816,null,0,Zc.i,[Ti.O,Ti.K,Ti.r],{ngForOf:[0,"ngForOf"]},null),(l()(),Ti._27(null,["\n  "])),(l()(),Ti._27(null,["\n"]))],function(l,n){l(n,5,0,n.component.creatOrderArray)},null)}function k(l){return Ti._29(0,[(l()(),Ti._6(0,null,null,6,"div",[["class","no-data"]],null,null,null,null,null)),(l()(),Ti._27(null,["\n  "])),(l()(),Ti._6(0,null,null,0,"img",[["alt",""],["src","./assets/image/nodata.png"]],null,null,null,null,null)),(l()(),Ti._27(null,["\n  "])),(l()(),Ti._6(0,null,null,1,"p",[],null,null,null,null,null)),(l()(),Ti._27(null,["空空如也"])),(l()(),Ti._27(null,["\n"]))],null,null)}function D(l){return Ti._29(0,[(l()(),Ti._6(0,null,null,4,"div",[["class","btn-noMore"]],null,null,null,null,null)),(l()(),Ti._27(null,["\n  "])),(l()(),Ti._6(0,null,null,1,"span",[],null,null,null,null,null)),(l()(),Ti._27(null,["—— 没有更多商品了 ——"])),(l()(),Ti._27(null,["\n"]))],null,null)}function C(l){return Ti._29(0,[(l()(),Ti._6(0,null,null,10,"div",[["class","request-defeat"]],null,null,null,null,null)),(l()(),Ti._27(null,["\n  "])),(l()(),Ti._6(0,null,null,0,"img",[["alt",""],["src","./assets/image/requestDefeat.png"]],null,null,null,null,null)),(l()(),Ti._27(null,["\n  "])),(l()(),Ti._6(0,null,null,1,"p",[],null,null,null,null,null)),(l()(),Ti._27(null,["啊哦！页面走丢了"])),(l()(),Ti._27(null,["\n  "])),(l()(),Ti._6(0,null,null,2,"button",[["class","btn-request-defeat"],["full",""],["ion-button",""]],null,[[null,"touchstart"]],function(l,n,u){var t=!0;if("touchstart"===n){t=!1!==l.component.requestDefeatRefresh()&&t}return t},t_.b,t_.a)),Ti._4(1097728,null,0,e_.a,[[8,""],kc.a,Ti.k,Ti.E],{full:[0,"full"]},null),(l()(),Ti._27(0,["\n    刷新再找一找\n  "])),(l()(),Ti._27(null,["\n"]))],function(l,n){l(n,8,0,"")},null)}function j(l){return Ti._29(0,[(l()(),Ti._6(0,null,null,5,"ion-infinite-scroll",[],null,[[null,"ionInfinite"]],function(l,n,u){var t=!0;if("ionInfinite"===n){t=!1!==l.component.infiniteGetCreatOrderList(u)&&t}return t},null,null)),Ti._4(1196032,null,0,$_.a,[Fc.a,Ti.x,Ti.k,Tc.a],null,{ionInfinite:"ionInfinite"}),(l()(),Ti._27(null,["\n  "])),(l()(),Ti._6(0,null,null,1,"ion-infinite-scroll-content",[["loadingText","加载更多..."]],[[1,"state",0]],null,null,G_.b,G_.a)),Ti._4(114688,null,0,K_.a,[$_.a,kc.a],{loadingText:[0,"loadingText"]},null),(l()(),Ti._27(null,["\n"]))],function(l,n){l(n,4,0,"加载更多...")},function(l,n){l(n,3,0,Ti._20(n,4).inf.state)})}function A(l){return Ti._29(0,[Ti._21(0,Ds,[]),(l()(),Ti._6(0,null,null,38,"ion-header",[],null,null,null,null,null)),Ti._4(16384,null,0,Lc.a,[kc.a,Ti.k,Ti.E,[2,Ic.a]],null,null),(l()(),Ti._27(null,["\n  "])),(l()(),Ti._6(0,null,null,15,"ion-navbar",[["class","toolbar"]],[[8,"hidden",0],[2,"statusbar-padding",null]],null,null,qc.b,qc.a)),Ti._4(49152,null,0,Rc.a,[xc.a,[2,Ic.a],[2,Oc.a],kc.a,Ti.k,Ti.E],null,null),(l()(),Ti._27(3,["\n    "])),(l()(),Ti._6(0,null,3,2,"ion-title",[["text-center",""]],null,null,null,$c.b,$c.a)),Ti._4(49152,null,0,Gc.a,[kc.a,Ti.k,Ti.E,[2,Kc.a],[2,Rc.a]],null,null),(l()(),Ti._27(0,["配单列表"])),(l()(),Ti._27(3,["\n    "])),(l()(),Ti._6(0,null,3,7,"span",[["class","icon-creat-order"]],null,[[null,"touchstart"]],function(l,n,u){var t=!0;if("touchstart"===n){t=!1!==l.component.orderRepertory()&&t}return t},null,null)),(l()(),Ti._27(null,["\n      "])),(l()(),Ti._6(0,null,null,0,"img",[["alt","配单仓"],["src","./assets/image/creatorder.png"]],null,null,null,null,null)),(l()(),Ti._27(null,["\n      配单仓\n      "])),(l()(),Ti._6(0,null,null,2,"ion-badge",[["item-end",""]],null,null,null,null,null)),Ti._4(16384,null,0,N_.a,[kc.a,Ti.k,Ti.E],null,null),(l()(),Ti._27(null,["",""])),(l()(),Ti._27(null,["\n    "])),(l()(),Ti._27(3,["\n  "])),(l()(),Ti._27(null,["\n  "])),(l()(),Ti._27(null,["\n  "])),(l()(),Ti._6(0,null,null,16,"div",[["class","search-box"]],null,null,null,null,null)),(l()(),Ti._27(null,["\n    "])),(l()(),Ti._6(0,null,null,13,"ion-item",[["class","item item-block"]],null,null,null,Vc.b,Vc.a)),Ti._4(1097728,null,3,Bc.a,[Hc.a,kc.a,Ti.k,Ti.E,[2,Yc.a]],null,null),Ti._25(335544320,1,{contentLabel:0}),Ti._25(603979776,2,{_buttons:1}),Ti._25(603979776,3,{_icons:1}),Ti._4(16384,null,0,Wc.a,[],null,null),(l()(),Ti._27(2,["\n      "])),(l()(),Ti._6(0,null,3,5,"ion-input",[["clearInput","true"],["placeholder","请输入商品名称"],["type","search"]],[[2,"ng-untouched",null],[2,"ng-touched",null],[2,"ng-pristine",null],[2,"ng-dirty",null],[2,"ng-valid",null],[2,"ng-invalid",null],[2,"ng-pending",null]],[[null,"ngModelChange"],[null,"ionBlur"]],function(l,n,u){var t=!0,e=l.component;if("ngModelChange"===n){t=!1!==(e.searchKeyWord=u)&&t}if("ionBlur"===n){t=!1!==e.onInput(u)&&t}return t},Xc.b,Xc.a)),Ti._4(671744,null,0,Jc.j,[[8,null],[8,null],[8,null],[8,null]],{model:[0,"model"]},{update:"ngModelChange"}),Ti._24(2048,null,Jc.h,null,[Jc.j]),Ti._4(16384,null,0,Jc.i,[Jc.h],null,null),Ti._4(5423104,null,0,Qc.a,[kc.a,Dc.a,Hc.a,xc.a,Ti.k,Ti.E,[2,Fc.a],[2,Bc.a],[2,Jc.h],Tc.a],{clearInput:[0,"clearInput"],type:[1,"type"],placeholder:[2,"placeholder"]},{ionBlur:"ionBlur"}),(l()(),Ti._27(null,["\n    "])),(l()(),Ti._27(2,["\n    "])),(l()(),Ti._27(null,["  \n  "])),(l()(),Ti._27(null,["\n"])),(l()(),Ti._27(null,["\n"])),(l()(),Ti._6(0,null,null,27,"ion-content",[],[[2,"statusbar-padding",null],[2,"has-refresher",null]],[["window","resize"]],function(l,n,u){var t=!0;if("window:resize"===n){t=!1!==Ti._20(l,42).resize()&&t}return t},Nc.b,Nc.a)),Ti._4(4374528,null,0,Fc.a,[kc.a,Dc.a,Tc.a,Ti.k,Ti.E,xc.a,Uc.a,Ti.x,[2,Ic.a],[2,Oc.a]],null,null),(l()(),Ti._27(1,["\n"])),(l()(),Ti._0(16777216,null,2,1,null,S)),Ti._4(16384,null,0,Zc.j,[Ti.O,Ti.K],{ngIf:[0,"ngIf"]},null),(l()(),Ti._27(1,["\n"])),(l()(),Ti._6(0,null,1,5,"div",[],null,null,null,null,null)),(l()(),Ti._27(null,["\n  "])),(l()(),Ti._27(null,["\n  "])),(l()(),Ti._0(16777216,null,null,1,null,I)),Ti._4(16384,null,0,Zc.j,[Ti.O,Ti.K],{ngIf:[0,"ngIf"]},null),(l()(),Ti._27(null,["\n"])),(l()(),Ti._27(1,["\n"])),(l()(),Ti._0(16777216,null,1,1,null,x)),Ti._4(16384,null,0,Zc.j,[Ti.O,Ti.K],{ngIf:[0,"ngIf"]},null),(l()(),Ti._27(1,["\n"])),(l()(),Ti._0(16777216,null,1,1,null,k)),Ti._4(16384,null,0,Zc.j,[Ti.O,Ti.K],{ngIf:[0,"ngIf"]},null),(l()(),Ti._27(1,["\n"])),(l()(),Ti._0(16777216,null,1,1,null,D)),Ti._4(16384,null,0,Zc.j,[Ti.O,Ti.K],{ngIf:[0,"ngIf"]},null),(l()(),Ti._27(1,["\n"])),(l()(),Ti._0(16777216,null,1,1,null,C)),Ti._4(16384,null,0,Zc.j,[Ti.O,Ti.K],{ngIf:[0,"ngIf"]},null),(l()(),Ti._27(1,["\n"])),(l()(),Ti._0(16777216,null,1,1,null,j)),Ti._4(16384,null,0,Zc.j,[Ti.O,Ti.K],{ngIf:[0,"ngIf"]},null),(l()(),Ti._27(1,["\n"])),(l()(),Ti._27(null,["\n"]))],function(l,n){var u=n.component;l(n,32,0,u.searchKeyWord);l(n,35,0,"true","search","请输入商品名称");l(n,45,0,!u.loadingShow);l(n,51,0,u.loadingShow);l(n,55,0,!u.noData);l(n,58,0,u.noData);l(n,61,0,u.showNoMore);l(n,64,0,u.requestDefeat);l(n,67,0,!u.showNoMore&&u.showInfinite)},function(l,n){var u=n.component;l(n,4,0,Ti._20(n,5)._hidden,Ti._20(n,5)._sbPadding);l(n,17,0,u.warehouseCount>9?"9+":u.warehouseCount);l(n,31,0,Ti._20(n,34).ngClassUntouched,Ti._20(n,34).ngClassTouched,Ti._20(n,34).ngClassPristine,Ti._20(n,34).ngClassDirty,Ti._20(n,34).ngClassValid,Ti._20(n,34).ngClassInvalid,Ti._20(n,34).ngClassPending);l(n,41,0,Ti._20(n,42).statusbarPadding,Ti._20(n,42)._hasRefresher)})}function T(l){return Ti._29(0,[(l()(),Ti._6(0,null,null,10,"ion-header",[],null,null,null,null,null)),Ti._4(16384,null,0,Lc.a,[kc.a,Ti.k,Ti.E,[2,Ic.a]],null,null),(l()(),Ti._27(null,["\n  "])),(l()(),Ti._6(0,null,null,6,"ion-navbar",[["class","toolbar"]],[[8,"hidden",0],[2,"statusbar-padding",null]],null,null,qc.b,qc.a)),Ti._4(49152,null,0,Rc.a,[xc.a,[2,Ic.a],[2,Oc.a],kc.a,Ti.k,Ti.E],null,null),(l()(),Ti._27(3,["\n    "])),(l()(),Ti._6(0,null,3,2,"ion-title",[["text-center",""]],null,null,null,$c.b,$c.a)),Ti._4(49152,null,0,Gc.a,[kc.a,Ti.k,Ti.E,[2,Kc.a],[2,Rc.a]],null,null),(l()(),Ti._27(0,["帮助中心"])),(l()(),Ti._27(3,["\n  "])),(l()(),Ti._27(null,["\n"])),(l()(),Ti._27(null,["\n"])),(l()(),Ti._6(0,null,null,125,"ion-content",[],[[2,"statusbar-padding",null],[2,"has-refresher",null]],[["window","resize"]],function(l,n,u){var t=!0;if("window:resize"===n){t=!1!==Ti._20(l,13).resize()&&t}return t},Nc.b,Nc.a)),Ti._4(4374528,null,0,Fc.a,[kc.a,Dc.a,Tc.a,Ti.k,Ti.E,xc.a,Uc.a,Ti.x,[2,Ic.a],[2,Oc.a]],null,null),(l()(),Ti._27(1,["\n  "])),(l()(),Ti._6(0,null,1,121,"ul",[["class","help"]],null,null,null,null,null)),(l()(),Ti._27(null,["\n    "])),(l()(),Ti._6(0,null,null,4,"li",[],null,null,null,null,null)),(l()(),Ti._27(null,["\n      "])),(l()(),Ti._6(0,null,null,1,"h2",[["class","title"]],null,null,null,null,null)),(l()(),Ti._27(null,["一、账户相关"])),(l()(),Ti._27(null,["\n    "])),(l()(),Ti._27(null,["\n    "])),(l()(),Ti._6(0,null,null,7,"li",[],null,null,null,null,null)),(l()(),Ti._27(null,["\n      "])),(l()(),Ti._6(0,null,null,1,"h2",[],null,null,null,null,null)),(l()(),Ti._27(null,["1.我的账号、密码是否可修改？"])),(l()(),Ti._27(null,["\n      "])),(l()(),Ti._6(0,null,null,1,"p",[],null,null,null,null,null)),(l()(),Ti._27(null,["由商户设置为导购员身份的账号可登录淘璞帮，账号不可修改；若通过手机号作为账号登录，可通过【登录页——忘记密码】修改登录密码。"])),(l()(),Ti._27(null,["\n    "])),(l()(),Ti._27(null,["\n    "])),(l()(),Ti._6(0,null,null,4,"li",[],null,null,null,null,null)),(l()(),Ti._27(null,["\n      "])),(l()(),Ti._6(0,null,null,1,"h2",[["class","title"]],null,null,null,null,null)),(l()(),Ti._27(null,["二、交易相关"])),(l()(),Ti._27(null,["\n    "])),(l()(),Ti._27(null,["\n    "])),(l()(),Ti._6(0,null,null,10,"li",[],null,null,null,null,null)),(l()(),Ti._27(null,["\n      "])),(l()(),Ti._6(0,null,null,1,"h2",[],null,null,null,null,null)),(l()(),Ti._27(null,["1.什么是淘璞快购？"])),(l()(),Ti._27(null,["\n      "])),(l()(),Ti._6(0,null,null,1,"p",[],null,null,null,null,null)),(l()(),Ti._27(null,["淘璞快购可作为门店内还未上架商品的替换物。用户需要购买平台内未上架商品时，可通过选择淘璞快购设置购买商品数量和商品总额生成订单收款码，供用户扫码支付。"])),(l()(),Ti._27(null,["\n      "])),(l()(),Ti._6(0,null,null,1,"p",[],null,null,null,null,null)),(l()(),Ti._27(null,["导购员可通过在生成订单时对淘璞快购商品增加备注信息方式，简要备注用户实际购买的商品信息。"])),(l()(),Ti._27(null,["\n    "])),(l()(),Ti._27(null,["\n    "])),(l()(),Ti._6(0,null,null,7,"li",[],null,null,null,null,null)),(l()(),Ti._27(null,["\n      "])),(l()(),Ti._6(0,null,null,1,"h2",[],null,null,null,null,null)),(l()(),Ti._27(null,["2.生成订单收款码后发现订单内容有误，怎么办？"])),(l()(),Ti._27(null,["\n      "])),(l()(),Ti._6(0,null,null,1,"p",[],null,null,null,null,null)),(l()(),Ti._27(null,["若收款码未经用户扫描成功，可以在收款码页点击【修改此单】对当前订单进行修正；若收款码一经用户扫码，则只能重新选择商品生成新的订单。"])),(l()(),Ti._27(null,["\n    "])),(l()(),Ti._27(null,["\n    "])),(l()(),Ti._6(0,null,null,7,"li",[],null,null,null,null,null)),(l()(),Ti._27(null,["\n      "])),(l()(),Ti._6(0,null,null,1,"h2",[],null,null,null,null,null)),(l()(),Ti._27(null,["3.用户扫码支付后想要退货怎么办？"])),(l()(),Ti._27(null,["\n      "])),(l()(),Ti._6(0,null,null,1,"p",[],null,null,null,null,null)),(l()(),Ti._27(null,["用户在扫描订单收款码确认订单金额并支付成功后，不能进行申请退货操作，若实际因各种原因造成支付后想要取消当次交易的，请与用户协商通过其他方式完成金额退还。"])),(l()(),Ti._27(null,["\n    "])),(l()(),Ti._27(null,["\n    "])),(l()(),Ti._6(0,null,null,10,"li",[],null,null,null,null,null)),(l()(),Ti._27(null,["\n      "])),(l()(),Ti._6(0,null,null,1,"h2",[],null,null,null,null,null)),(l()(),Ti._27(null,["4.自提赠品和快递赠品区别是什么？"])),(l()(),Ti._27(null,["\n      "])),(l()(),Ti._6(0,null,null,1,"p",[],null,null,null,null,null)),(l()(),Ti._27(null,["自提赠品是指用户领取后需要前往指定门店出示二维码待导购员扫码确认完成兑换的赠品；"])),(l()(),Ti._27(null,["\n      "])),(l()(),Ti._6(0,null,null,1,"p",[],null,null,null,null,null)),(l()(),Ti._27(null,["快递赠品是指用户领取后通过填写收货地址完成兑换，待导购员发货后等待收货的赠品。"])),(l()(),Ti._27(null,["\n    "])),(l()(),Ti._27(null,["\n    "])),(l()(),Ti._6(0,null,null,4,"li",[],null,null,null,null,null)),(l()(),Ti._27(null,["\n      "])),(l()(),Ti._6(0,null,null,1,"h2",[["class","title"]],null,null,null,null,null)),(l()(),Ti._27(null,["三、结算相关"])),(l()(),Ti._27(null,["\n    "])),(l()(),Ti._27(null,["\n    "])),(l()(),Ti._6(0,null,null,7,"li",[],null,null,null,null,null)),(l()(),Ti._27(null,["\n      "])),(l()(),Ti._6(0,null,null,1,"h2",[],null,null,null,null,null)),(l()(),Ti._27(null,["1.我的资金来源有哪些？"])),(l()(),Ti._27(null,["\n      "])),(l()(),Ti._6(0,null,null,1,"p",[],null,null,null,null,null)),(l()(),Ti._27(null,["导购员资金来源包括处理的有效订单和发展会员奖励中部分或全部项组成，具体奖励参见《门店导购员推广合作协议》；"])),(l()(),Ti._27(null,["\n    "])),(l()(),Ti._27(null,["\n    "])),(l()(),Ti._6(0,null,null,7,"li",[],null,null,null,null,null)),(l()(),Ti._27(null,["\n      "])),(l()(),Ti._6(0,null,null,1,"h2",[],null,null,null,null,null)),(l()(),Ti._27(null,["2.怎样核对我的奖励金额？"])),(l()(),Ti._27(null,["\n      "])),(l()(),Ti._6(0,null,null,1,"p",[],null,null,null,null,null)),(l()(),Ti._27(null,["1）确定自己的奖励来源项及奖励比例值；2）可在审核中金额明细中实时查看处理的有效订单及发展会员奖励。"])),(l()(),Ti._27(null,["\n    "])),(l()(),Ti._27(null,["\n    "])),(l()(),Ti._6(0,null,null,7,"li",[],null,null,null,null,null)),(l()(),Ti._27(null,["\n      "])),(l()(),Ti._6(0,null,null,1,"h2",[],null,null,null,null,null)),(l()(),Ti._27(null,["3.奖励金额如何提现到我自己账户？"])),(l()(),Ti._27(null,["\n      "])),(l()(),Ti._6(0,null,null,1,"p",[],null,null,null,null,null)),(l()(),Ti._27(null,["处理订单或发展会员获得的奖励，经过平台审核之后，每周四进入到可提现金额中；导购员每个月可在任意时间完成一次金额提现，提现成功对应金额直接进入到已绑定的微信账户中。"])),(l()(),Ti._27(null,["\n    "])),(l()(),Ti._27(null,["\n    "])),(l()(),Ti._6(0,null,null,4,"li",[],null,null,null,null,null)),(l()(),Ti._27(null,["\n      "])),(l()(),Ti._6(0,null,null,1,"h2",[["class","title"]],null,null,null,null,null)),(l()(),Ti._27(null,["四、其他问题"])),(l()(),Ti._27(null,["\n    "])),(l()(),Ti._27(null,["\n    "])),(l()(),Ti._6(0,null,null,7,"li",[],null,null,null,null,null)),(l()(),Ti._27(null,["\n      "])),(l()(),Ti._6(0,null,null,1,"h2",[],null,null,null,null,null)),(l()(),Ti._27(null,["1.我的二维码有什么用？"])),(l()(),Ti._27(null,["\n      "])),(l()(),Ti._6(0,null,null,1,"p",[],null,null,null,null,null)),(l()(),Ti._27(null,["在有发展会员奖励来源时，将自己的二维码出示或分享给用户，用户扫描识别二维码注册成为淘璞会员，即可获取到对应奖励金。"])),(l()(),Ti._27(null,["\n    "])),(l()(),Ti._27(null,["\n    "])),(l()(),Ti._6(0,null,null,7,"li",[],null,null,null,null,null)),(l()(),Ti._27(null,["\n      "])),(l()(),Ti._6(0,null,null,1,"h2",[],null,null,null,null,null)),(l()(),Ti._27(null,["2.门店二维码有什么用？"])),(l()(),Ti._27(null,["\n      "])),(l()(),Ti._6(0,null,null,1,"p",[],null,null,null,null,null)),(l()(),Ti._27(null,["将门店二维码出示或张贴到店内，用户可通过扫描二维码快速进入到你所在门店，选择商品下单。"])),(l()(),Ti._27(null,["\n    "])),(l()(),Ti._27(null,["\n  "])),(l()(),Ti._27(1,["\n"])),(l()(),Ti._27(null,["\n"]))],null,function(l,n){l(n,3,0,Ti._20(n,4)._hidden,Ti._20(n,4)._sbPadding);l(n,12,0,Ti._20(n,13).statusbarPadding,Ti._20(n,13)._hasRefresher)})}function P(l){return Ti._29(0,[(l()(),Ti._6(0,null,null,9,"div",[["class","loading-wrapper"]],null,null,null,null,null)),(l()(),Ti._27(null,["\n\t\t\t\t"])),(l()(),Ti._6(0,null,null,4,"div",[],null,null,null,null,null)),(l()(),Ti._27(null,["\n\t\t\t\t\t"])),(l()(),Ti._6(0,null,null,1,"ion-spinner",[["item-start",""]],[[2,"spinner-paused",null]],null,null,q_.b,q_.a)),Ti._4(114688,null,0,R_.a,[kc.a,Ti.k,Ti.E],{name:[0,"name"]},null),(l()(),Ti._27(null,["\n\t\t\t\t"])),(l()(),Ti._27(null,["\n\t\t\t\t"])),(l()(),Ti._6(0,null,null,0,"div",[],[[8,"innerHTML",1]],null,null,null,null)),(l()(),Ti._27(null,["\n\t\t\t"]))],function(l,n){l(n,5,0,n.component.load.spinner)},function(l,n){var u=n.component;l(n,4,0,Ti._20(n,5)._paused);l(n,8,0,u.load.content)})}function E(l){return Ti._29(0,[(l()(),Ti._6(0,null,null,1,"span",[["class","modal"]],null,null,null,null,null)),(l()(),Ti._27(null,["",""]))],null,function(l,n){l(n,1,0,n.parent.context.$implicit.attrValue)})}function M(l){return Ti._29(0,[(l()(),Ti._6(0,null,null,10,"li",[["class","labelTag"]],null,null,null,null,null)),Ti._4(278528,null,0,Zc.h,[Ti.r,Ti.s,Ti.k,Ti.E],{klass:[0,"klass"],ngClass:[1,"ngClass"]},null),Ti._23(1),Ti._22({active:0,invalidAttrValueClass:1}),(l()(),Ti._27(null,["\n\t\t\t\t\t\t\t"])),(l()(),Ti._6(0,null,null,1,"span",[],null,[[null,"click"]],function(l,n,u){var t=!0;if("click"===n){t=!1!==l.component.changeRadio(u,l.parent.context.index,l.context.$implicit.attrValue)&&t}return t},null,null)),(l()(),Ti._27(null,["",""])),(l()(),Ti._27(null,["\n\t\t\t\t\t\t\t"])),(l()(),Ti._0(16777216,null,null,1,null,E)),Ti._4(16384,null,0,Zc.j,[Ti.O,Ti.K],{ngIf:[0,"ngIf"]},null),(l()(),Ti._27(null,["\n\t\t\t\t\t\t"]))],function(l,n){l(n,1,0,"labelTag",l(n,3,0,n.component.skuAttrValue[n.parent.context.index]===n.context.$implicit.attrValue,Ti._28(n,1,1,l(n,2,0,Ti._20(n.parent.parent,1),n.context.$implicit.invalidAttrValue))));l(n,9,0,"invalidAttrValue"==n.context.$implicit.invalidAttrValue)},function(l,n){l(n,6,0,n.context.$implicit.attrValue)})}function L(l){return Ti._29(0,[(l()(),Ti._6(0,null,null,13,"div",[["class","sku-attr"]],null,null,null,null,null)),(l()(),Ti._27(null,["\n\t\t\t\t"])),(l()(),Ti._6(0,null,null,1,"div",[["class","sku-key"]],null,null,null,null,null)),(l()(),Ti._27(null,["",""])),(l()(),Ti._27(null,["\n\t\t\t\t"])),(l()(),Ti._6(0,null,null,7,"div",[["class","sku-value"]],null,null,null,null,null)),(l()(),Ti._27(null,["\n\t\t\t\t\t"])),(l()(),Ti._6(0,null,null,4,"ul",[],null,null,null,null,null)),(l()(),Ti._27(null,["\n\t\t\t\t\t\t"])),(l()(),Ti._0(16777216,null,null,1,null,M)),Ti._4(802816,null,0,Zc.i,[Ti.O,Ti.K,Ti.r],{ngForOf:[0,"ngForOf"]},null),(l()(),Ti._27(null,["\n\t\t\t\t\t"])),(l()(),Ti._27(null,["\n\t\t\t\t"])),(l()(),Ti._27(null,["\n\t\t\t"]))],function(l,n){l(n,10,0,n.context.$implicit)},function(l,n){l(n,3,0,n.context.$implicit[0].attrName)})}function q(l){return Ti._29(0,[(l()(),Ti._6(0,null,null,28,"div",[["class","sku-attr"]],null,null,null,null,null)),(l()(),Ti._27(null,["\n\t\t\t\t"])),(l()(),Ti._6(0,null,null,1,"div",[["class","sku-key"]],null,null,null,null,null)),(l()(),Ti._27(null,["数量"])),(l()(),Ti._27(null,["\n\t\t\t\t"])),(l()(),Ti._6(0,null,null,22,"div",[["class","sku-value count"]],null,null,null,null,null)),(l()(),Ti._27(null,["\n\t\t\t\t\t"])),(l()(),Ti._6(0,null,null,4,"ion-icon",[["class","icon-add"],["name","add"],["role","img"]],[[2,"hide",null]],[[null,"touchstart"]],function(l,n,u){var t=!0;if("touchstart"===n){t=!1!==l.component.addCount()&&t}return t},null,null)),Ti._4(278528,null,0,Zc.h,[Ti.r,Ti.s,Ti.k,Ti.E],{klass:[0,"klass"],ngClass:[1,"ngClass"]},null),Ti._23(1),Ti._22({changeGray:0}),Ti._4(147456,null,0,B_.a,[kc.a,Ti.k,Ti.E],{name:[0,"name"]},null),(l()(),Ti._27(null,["\n\t\t\t\t\t"])),(l()(),Ti._6(0,null,null,4,"ion-icon",[["class","icon-remove"],["name","remove"],["role","img"]],[[2,"hide",null]],[[null,"touchstart"]],function(l,n,u){var t=!0;if("touchstart"===n){t=!1!==l.component.removeCount()&&t}return t},null,null)),Ti._4(278528,null,0,Zc.h,[Ti.r,Ti.s,Ti.k,Ti.E],{klass:[0,"klass"],ngClass:[1,"ngClass"]},null),Ti._23(1),Ti._22({changeGray:0}),Ti._4(147456,null,0,B_.a,[kc.a,Ti.k,Ti.E],{name:[0,"name"]},null),(l()(),Ti._27(null,["\n\t\t\t\t\t"])),(l()(),Ti._6(0,null,null,7,"div",[["class","add-count"]],null,null,null,null,null)),(l()(),Ti._27(null,["\n\t\t\t\t\t\t"])),(l()(),Ti._6(0,null,null,4,"ion-input",[["clearInput","true"],["type","number"]],[[2,"ng-untouched",null],[2,"ng-touched",null],[2,"ng-pristine",null],[2,"ng-dirty",null],[2,"ng-valid",null],[2,"ng-invalid",null],[2,"ng-pending",null]],[[null,"ionBlur"],[null,"ngModelChange"]],function(l,n,u){var t=!0,e=l.component;if("ionBlur"===n){t=!1!==e.resetCount()&&t}if("ngModelChange"===n){t=!1!==(e.count=u)&&t}return t},Xc.b,Xc.a)),Ti._4(671744,null,0,Jc.j,[[8,null],[8,null],[8,null],[8,null]],{model:[0,"model"]},{update:"ngModelChange"}),Ti._24(2048,null,Jc.h,null,[Jc.j]),Ti._4(16384,null,0,Jc.i,[Jc.h],null,null),Ti._4(5423104,null,0,Qc.a,[kc.a,Dc.a,Hc.a,xc.a,Ti.k,Ti.E,[2,Fc.a],[2,Bc.a],[2,Jc.h],Tc.a],{clearInput:[0,"clearInput"],type:[1,"type"]},{ionBlur:"ionBlur"}),(l()(),Ti._27(null,["\n\t\t\t\t\t"])),(l()(),Ti._27(null,["\n\t\t\t\t"])),(l()(),Ti._27(null,["\n\t\t\t"]))],function(l,n){var u=n.component;l(n,8,0,"icon-add",l(n,10,0,Ti._28(n,8,1,l(n,9,0,Ti._20(n.parent,2),u.overStock))));l(n,11,0,"add");l(n,14,0,"icon-remove",l(n,16,0,Ti._28(n,14,1,l(n,15,0,Ti._20(n.parent,3),u.count))));l(n,17,0,"remove");l(n,22,0,u.count);l(n,25,0,"true","number")},function(l,n){l(n,7,0,Ti._20(n,11)._hidden);l(n,13,0,Ti._20(n,17)._hidden);l(n,21,0,Ti._20(n,24).ngClassUntouched,Ti._20(n,24).ngClassTouched,Ti._20(n,24).ngClassPristine,Ti._20(n,24).ngClassDirty,Ti._20(n,24).ngClassValid,Ti._20(n,24).ngClassInvalid,Ti._20(n,24).ngClassPending)})}function R(l){return Ti._29(0,[(l()(),Ti._6(0,null,null,2,"button",[["class","btn-add"],["full",""],["ion-button",""]],null,[[null,"touchstart"]],function(l,n,u){var t=!0;if("touchstart"===n){t=!1!==l.component.warehouseAdd()&&t}return t},t_.b,t_.a)),Ti._4(1097728,null,0,e_.a,[[8,""],kc.a,Ti.k,Ti.E],{full:[0,"full"]},null),(l()(),Ti._27(0,["确认添加"]))],function(l,n){l(n,1,0,"")},null)}function $(l){return Ti._29(0,[Ti._21(0,Ds,[]),Ti._21(0,Os,[]),Ti._21(0,ks,[]),Ti._21(0,xs,[]),(l()(),Ti._6(0,null,null,48,"ion-content",[],[[2,"statusbar-padding",null],[2,"has-refresher",null]],[["window","resize"]],function(l,n,u){var t=!0;if("window:resize"===n){t=!1!==Ti._20(l,5).resize()&&t}return t},Nc.b,Nc.a)),Ti._4(4374528,null,0,Fc.a,[kc.a,Dc.a,Tc.a,Ti.k,Ti.E,xc.a,Uc.a,Ti.x,[2,Ic.a],[2,Oc.a]],null,null),(l()(),Ti._27(1,["\n\t"])),(l()(),Ti._6(0,null,1,0,"div",[["class","layer-out"]],null,[[null,"touchstart"]],function(l,n,u){var t=!0;if("touchstart"===n){t=!1!==l.component.dismiss()&&t}return t},null,null)),(l()(),Ti._27(1,["\n\t"])),(l()(),Ti._6(0,null,1,39,"div",[["class","sku-box"]],null,null,null,null,null)),(l()(),Ti._27(null,["\n\t\t"])),(l()(),Ti._6(0,null,null,23,"ion-list",[],null,null,null,null,null)),Ti._4(16384,null,0,zc.a,[kc.a,Ti.k,Ti.E,Dc.a,Cc.l,Tc.a],null,null),(l()(),Ti._27(null,["\n\t\t  "])),(l()(),Ti._6(0,null,null,19,"ion-item",[["class","item item-block"]],null,null,null,Vc.b,Vc.a)),Ti._4(1097728,null,3,Bc.a,[Hc.a,kc.a,Ti.k,Ti.E,[2,Yc.a]],null,null),Ti._25(335544320,1,{contentLabel:0}),Ti._25(603979776,2,{_buttons:1}),Ti._25(603979776,3,{_icons:1}),Ti._4(16384,null,0,Wc.a,[],null,null),(l()(),Ti._27(2,["\n\t\t    "])),(l()(),Ti._6(0,null,0,5,"ion-thumbnail",[["item-start",""]],null,null,null,null,null)),Ti._4(16384,null,0,H_.a,[],null,null),(l()(),Ti._27(null,["\n\t\t\t\t\t"])),(l()(),Ti._6(0,null,null,1,"img",[],[[8,"src",4]],null,null,null,null)),Ti._23(1),(l()(),Ti._27(null,["\n\t\t    "])),(l()(),Ti._27(2,["\n\t\t\t\t"])),(l()(),Ti._6(0,null,2,1,"h2",[],null,null,null,null,null)),(l()(),Ti._27(null,["",""])),(l()(),Ti._27(2,["\n\t\t\t\t"])),(l()(),Ti._6(0,null,2,1,"h2",[],null,null,null,null,null)),(l()(),Ti._27(null,["￥",""])),(l()(),Ti._27(2,["\n\t\t  "])),(l()(),Ti._27(null,["\n\t\t"])),(l()(),Ti._27(null,["\n\n\t\t"])),(l()(),Ti._6(0,null,null,11,"div",[["class","sku-list"]],null,null,null,null,null)),(l()(),Ti._27(null,["\n\t\t\t"])),(l()(),Ti._27(null,["\n\t\t\t"])),(l()(),Ti._0(16777216,null,null,1,null,P)),Ti._4(16384,null,0,Zc.j,[Ti.O,Ti.K],{ngIf:[0,"ngIf"]},null),(l()(),Ti._27(null,["\n\t\t\t"])),(l()(),Ti._0(16777216,null,null,1,null,L)),Ti._4(802816,null,0,Zc.i,[Ti.O,Ti.K,Ti.r],{ngForOf:[0,"ngForOf"]},null),(l()(),Ti._27(null,["\n\t\t\t\n\t\t\t"])),(l()(),Ti._0(16777216,null,null,1,null,q)),Ti._4(16384,null,0,Zc.j,[Ti.O,Ti.K],{ngIf:[0,"ngIf"]},null),(l()(),Ti._27(null,["\n\t\t"])),(l()(),Ti._27(null,["\n\t"])),(l()(),Ti._27(1,["\n\t"])),(l()(),Ti._0(16777216,null,1,1,null,R)),Ti._4(16384,null,0,Zc.j,[Ti.O,Ti.K],{ngIf:[0,"ngIf"]},null),(l()(),Ti._27(1,["\n\t\n"]))],function(l,n){var u=n.component;l(n,40,0,u.loadingShow);l(n,43,0,u.attrMap);l(n,46,0,u.isShowAddNumber);l(n,51,0,u.confirmAdd)},function(l,n){var u=n.component;l(n,4,0,Ti._20(n,5).statusbarPadding,Ti._20(n,5)._hasRefresher);l(n,24,0,Ti._28(n,24,0,l(n,25,0,Ti._20(n,0),u.attrImageSeq)));l(n,29,0,u.productName);l(n,32,0,u.skuPrice)})}function G(l){return Ti._29(0,[(l()(),Ti._6(0,null,null,5,"ion-refresher",[],[[2,"refresher-active",null],[4,"top",null]],[[null,"ionRefresh"]],function(l,n,u){var t=!0;if("ionRefresh"===n){t=!1!==l.component.refreshGetOrderStoreList(u)&&t}return t},null,null)),Ti._4(212992,null,0,E_.a,[Dc.a,Fc.a,Ti.x,Cc.l],null,{ionRefresh:"ionRefresh"}),(l()(),Ti._27(null,["\n    "])),(l()(),Ti._6(0,null,null,1,"ion-refresher-content",[],[[1,"state",0]],null,null,M_.b,M_.a)),Ti._4(114688,null,0,L_.a,[E_.a,kc.a],null,null),(l()(),Ti._27(null,["\n  "]))],function(l,n){l(n,1,0),l(n,4,0)},function(l,n){l(n,0,0,"inactive"!==Ti._20(n,1).state,Ti._20(n,1)._top);l(n,3,0,Ti._20(n,4).r.state)})}function K(l){return Ti._29(0,[(l()(),Ti._6(0,null,null,9,"div",[["class","loading-wrapper"]],null,null,null,null,null)),(l()(),Ti._27(null,["\n      "])),(l()(),Ti._6(0,null,null,4,"div",[],null,null,null,null,null)),(l()(),Ti._27(null,["\n        "])),(l()(),Ti._6(0,null,null,1,"ion-spinner",[["item-start",""]],[[2,"spinner-paused",null]],null,null,q_.b,q_.a)),Ti._4(114688,null,0,R_.a,[kc.a,Ti.k,Ti.E],{name:[0,"name"]},null),(l()(),Ti._27(null,["\n      "])),(l()(),Ti._27(null,["\n      "])),(l()(),Ti._6(0,null,null,0,"div",[],[[8,"innerHTML",1]],null,null,null,null)),(l()(),Ti._27(null,["\n    "]))],function(l,n){l(n,5,0,n.component.load.spinner)},function(l,n){var u=n.component;l(n,4,0,Ti._20(n,5)._paused);l(n,8,0,u.load.content)})}function N(l){return Ti._29(0,[(l()(),Ti._6(0,null,null,83,"ion-item-sliding",[],null,null,null,J_.b,J_.a)),Ti._4(49152,[["item",4]],2,Q_.a,[[2,zc.a],Dc.a,Ti.E,Ti.k,Ti.x],null,null),Ti._25(335544320,2,{item:0}),Ti._25(603979776,3,{_itemOptions:1}),(l()(),Ti._27(null,["\n      "])),(l()(),Ti._6(0,null,0,66,"ion-item",[["class","item item-block"]],null,null,null,Vc.b,Vc.a)),Ti._4(1097728,[[2,4]],3,Bc.a,[Hc.a,kc.a,Ti.k,Ti.E,[2,Yc.a]],null,null),Ti._25(335544320,4,{contentLabel:0}),Ti._25(603979776,5,{_buttons:1}),Ti._25(603979776,6,{_icons:1}),Ti._4(16384,null,0,Wc.a,[],null,null),(l()(),Ti._27(2,["\n        "])),(l()(),Ti._6(0,null,0,5,"ion-thumbnail",[["item-start",""]],null,null,null,null,null)),Ti._4(16384,null,0,H_.a,[],null,null),(l()(),Ti._27(null,["\n          "])),(l()(),Ti._6(0,null,null,1,"img",[["alt","产品"]],[[8,"src",4]],null,null,null,null)),Ti._23(1),(l()(),Ti._27(null,["\n        "])),(l()(),Ti._27(2,["\n        "])),(l()(),Ti._6(0,null,2,1,"h2",[],null,null,null,null,null)),(l()(),Ti._27(null,["",""])),(l()(),Ti._27(2,["\n        "])),(l()(),Ti._6(0,null,2,21,"div",[["class","count"]],null,null,null,null,null)),(l()(),Ti._27(null,["\n          "])),(l()(),Ti._6(0,null,null,1,"span",[["class","btn-add"]],null,[[null,"touchstart"]],function(l,n,u){var t=!0;if("touchstart"===n){t=!1!==l.component.addCount(l.context.index,u)&&t}return t},null,null)),(l()(),Ti._27(null,["+"])),(l()(),Ti._27(null,["\n          "])),(l()(),Ti._6(0,null,null,4,"span",[["class","btn-remove"]],null,[[null,"touchstart"]],function(l,n,u){var t=!0;if("touchstart"===n){t=!1!==l.component.removeCount(l.context.index,u)&&t}return t},null,null)),Ti._4(278528,null,0,Zc.h,[Ti.r,Ti.s,Ti.k,Ti.E],{klass:[0,"klass"],ngClass:[1,"ngClass"]},null),Ti._23(1),Ti._22({changeGray:0}),(l()(),Ti._27(null,["-"])),(l()(),Ti._27(null,["\n          "])),(l()(),Ti._6(0,null,null,9,"div",[["class","add-count"]],null,null,null,null,null)),(l()(),Ti._27(null,["\n            "])),(l()(),Ti._6(0,null,null,6,"input",[["type","number"]],[[2,"ng-untouched",null],[2,"ng-touched",null],[2,"ng-pristine",null],[2,"ng-dirty",null],[2,"ng-valid",null],[2,"ng-invalid",null],[2,"ng-pending",null]],[[null,"change"],[null,"ngModelChange"],[null,"input"],[null,"blur"],[null,"compositionstart"],[null,"compositionend"]],function(l,n,u){var t=!0,e=l.component;if("input"===n){t=!1!==Ti._20(l,36)._handleInput(u.target.value)&&t}if("blur"===n){t=!1!==Ti._20(l,36).onTouched()&&t}if("compositionstart"===n){t=!1!==Ti._20(l,36)._compositionStart()&&t}if("compositionend"===n){t=!1!==Ti._20(l,36)._compositionEnd(u.target.value)&&t}if("change"===n){t=!1!==Ti._20(l,37).onChange(u.target.value)&&t}if("input"===n){t=!1!==Ti._20(l,37).onChange(u.target.value)&&t}if("blur"===n){t=!1!==Ti._20(l,37).onTouched()&&t}if("change"===n){t=!1!==e.resetProductNum(l.context.index)&&t}if("ngModelChange"===n){t=!1!==(l.context.$implicit.productNum=u)&&t}return t},null,null)),Ti._4(16384,null,0,Jc.b,[Ti.F,Ti.k,[2,Jc.a]],null,null),Ti._4(16384,null,0,Jc.n,[Ti.F,Ti.k],null,null),Ti._24(1024,null,Jc.g,function(l,n){return[l,n]},[Jc.b,Jc.n]),Ti._4(671744,null,0,Jc.j,[[8,null],[8,null],[8,null],[2,Jc.g]],{model:[0,"model"]},{update:"ngModelChange"}),Ti._24(2048,null,Jc.h,null,[Jc.j]),Ti._4(16384,null,0,Jc.i,[Jc.h],null,null),(l()(),Ti._27(null,["\n          "])),(l()(),Ti._27(null,["\n        "])),(l()(),Ti._27(2,["\n        "])),(l()(),Ti._6(0,null,2,15,"div",[["class","total"]],null,null,null,null,null)),(l()(),Ti._27(null,["\n            "])),(l()(),Ti._6(0,null,null,1,"div",[["class","total-text"]],null,null,null,null,null)),(l()(),Ti._27(null,["商品总额"])),(l()(),Ti._27(null,["\n            "])),(l()(),Ti._6(0,null,null,9,"div",[["class","total-input"]],null,null,null,null,null)),(l()(),Ti._27(null,["\n              "])),(l()(),Ti._6(0,null,null,6,"input",[["type","number"]],[[2,"ng-untouched",null],[2,"ng-touched",null],[2,"ng-pristine",null],[2,"ng-dirty",null],[2,"ng-valid",null],[2,"ng-invalid",null],[2,"ng-pending",null]],[[null,"change"],[null,"ngModelChange"],[null,"input"],[null,"blur"],[null,"compositionstart"],[null,"compositionend"]],function(l,n,u){var t=!0,e=l.component;if("input"===n){t=!1!==Ti._20(l,53)._handleInput(u.target.value)&&t}if("blur"===n){t=!1!==Ti._20(l,53).onTouched()&&t}if("compositionstart"===n){t=!1!==Ti._20(l,53)._compositionStart()&&t}if("compositionend"===n){t=!1!==Ti._20(l,53)._compositionEnd(u.target.value)&&t}if("change"===n){t=!1!==Ti._20(l,54).onChange(u.target.value)&&t}if("input"===n){t=!1!==Ti._20(l,54).onChange(u.target.value)&&t}if("blur"===n){t=!1!==Ti._20(l,54).onTouched()&&t}if("change"===n){t=!1!==e.resetCount(l.context.index,u)&&t}if("ngModelChange"===n){t=!1!==(l.context.$implicit.itemPrice=u)&&t}return t},null,null)),Ti._4(16384,null,0,Jc.b,[Ti.F,Ti.k,[2,Jc.a]],null,null),Ti._4(16384,null,0,Jc.n,[Ti.F,Ti.k],null,null),Ti._24(1024,null,Jc.g,function(l,n){return[l,n]},[Jc.b,Jc.n]),Ti._4(671744,null,0,Jc.j,[[8,null],[8,null],[8,null],[2,Jc.g]],{model:[0,"model"]},{update:"ngModelChange"}),Ti._24(2048,null,Jc.h,null,[Jc.j]),Ti._4(16384,null,0,Jc.i,[Jc.h],null,null),(l()(),Ti._27(null,["\n            "])),(l()(),Ti._27(null,["\n        "])),(l()(),Ti._27(2,["\n        "])),(l()(),Ti._6(0,null,2,8,"div",[["class","remark"]],null,null,null,null,null)),(l()(),Ti._27(null,["\n          "])),(l()(),Ti._6(0,null,null,5,"input",[["placeholder","备注一下商品信息吧"],["type","text"]],[[2,"ng-untouched",null],[2,"ng-touched",null],[2,"ng-pristine",null],[2,"ng-dirty",null],[2,"ng-valid",null],[2,"ng-invalid",null],[2,"ng-pending",null]],[[null,"change"],[null,"ngModelChange"],[null,"input"],[null,"blur"],[null,"compositionstart"],[null,"compositionend"]],function(l,n,u){var t=!0,e=l.component;if("input"===n){t=!1!==Ti._20(l,65)._handleInput(u.target.value)&&t}if("blur"===n){t=!1!==Ti._20(l,65).onTouched()&&t}if("compositionstart"===n){t=!1!==Ti._20(l,65)._compositionStart()&&t}if("compositionend"===n){t=!1!==Ti._20(l,65)._compositionEnd(u.target.value)&&t}if("change"===n){t=!1!==e.resetCount(l.context.index)&&t}if("ngModelChange"===n){t=!1!==(l.context.$implicit.remark=u)&&t}return t},null,null)),Ti._4(16384,null,0,Jc.b,[Ti.F,Ti.k,[2,Jc.a]],null,null),Ti._24(1024,null,Jc.g,function(l){return[l]},[Jc.b]),Ti._4(671744,null,0,Jc.j,[[8,null],[8,null],[8,null],[2,Jc.g]],{model:[0,"model"]},{update:"ngModelChange"}),Ti._24(2048,null,Jc.h,null,[Jc.j]),Ti._4(16384,null,0,Jc.i,[Jc.h],null,null),(l()(),Ti._27(null,["\n        "])),(l()(),Ti._27(2,["\n      "])),(l()(),Ti._27(null,["\n      \n      "])),(l()(),Ti._6(0,null,1,9,"ion-item-options",[["side","right"]],null,null,null,null,null)),Ti._4(16384,[[3,4]],0,Z_.a,[Ti.k,Dc.a],{side:[0,"side"]},null),(l()(),Ti._27(null,["\n        "])),(l()(),Ti._6(0,null,null,5,"button",[["class","btn-delete"],["color","danger"],["ion-button",""]],null,[[null,"click"]],function(l,n,u){var t=!0;if("click"===n){t=!1!==l.component.delete(l.context.index)&&t}return t},t_.b,t_.a)),Ti._4(1097728,null,0,e_.a,[[8,""],kc.a,Ti.k,Ti.E],{color:[0,"color"]},null),(l()(),Ti._27(0,["\n          "])),(l()(),Ti._6(0,null,0,1,"ion-icon",[["name","trash"],["role","img"]],[[2,"hide",null]],null,null,null,null)),Ti._4(147456,null,0,B_.a,[kc.a,Ti.k,Ti.E],{name:[0,"name"]},null),(l()(),Ti._27(0,["\n          删除\n        "])),(l()(),Ti._27(null,["\n      "])),(l()(),Ti._27(null,["\n    "]))],function(l,n){l(n,28,0,"btn-remove",l(n,30,0,Ti._28(n,28,1,l(n,29,0,Ti._20(n.parent,1),n.context.$implicit.productNum))));l(n,39,0,n.context.$implicit.productNum);l(n,56,0,n.context.$implicit.itemPrice);l(n,67,0,n.context.$implicit.remark);l(n,74,0,"right");l(n,77,0,"danger");l(n,80,0,"trash")},function(l,n){l(n,15,0,Ti._28(n,15,0,l(n,16,0,Ti._20(n.parent,0),n.context.$implicit.productSkuDTO.fileSeq)));l(n,20,0,n.context.$implicit.productSkuDTO.productName);l(n,35,0,Ti._20(n,41).ngClassUntouched,Ti._20(n,41).ngClassTouched,Ti._20(n,41).ngClassPristine,Ti._20(n,41).ngClassDirty,Ti._20(n,41).ngClassValid,Ti._20(n,41).ngClassInvalid,Ti._20(n,41).ngClassPending);l(n,52,0,Ti._20(n,58).ngClassUntouched,Ti._20(n,58).ngClassTouched,Ti._20(n,58).ngClassPristine,Ti._20(n,58).ngClassDirty,Ti._20(n,58).ngClassValid,Ti._20(n,58).ngClassInvalid,Ti._20(n,58).ngClassPending);l(n,64,0,Ti._20(n,69).ngClassUntouched,Ti._20(n,69).ngClassTouched,Ti._20(n,69).ngClassPristine,Ti._20(n,69).ngClassDirty,Ti._20(n,69).ngClassValid,Ti._20(n,69).ngClassInvalid,Ti._20(n,69).ngClassPending);l(n,79,0,Ti._20(n,80)._hidden)})}function F(l){return Ti._29(0,[(l()(),Ti._6(0,null,null,6,"div",[["class","no-data"]],null,null,null,null,null)),(l()(),Ti._27(null,["\n\t\t"])),(l()(),Ti._6(0,null,null,0,"img",[["alt",""],["src","./assets/image/nodata.png"]],null,null,null,null,null)),(l()(),Ti._27(null,["\n\t\t"])),(l()(),Ti._6(0,null,null,1,"p",[],null,null,null,null,null)),(l()(),Ti._27(null,["空空如也"])),(l()(),Ti._27(null,["\n  "]))],null,null)}function U(l){return Ti._29(0,[(l()(),Ti._6(0,null,null,10,"div",[["class","request-defeat"]],null,null,null,null,null)),(l()(),Ti._27(null,["\n\t\t"])),(l()(),Ti._6(0,null,null,0,"img",[["alt",""],["src","./assets/image/requestDefeat.png"]],null,null,null,null,null)),(l()(),Ti._27(null,["\n    "])),(l()(),Ti._6(0,null,null,1,"p",[],null,null,null,null,null)),(l()(),Ti._27(null,["啊哦！页面走丢了"])),(l()(),Ti._27(null,["\n    "])),(l()(),Ti._6(0,null,null,2,"button",[["class","btn-request-defeat"],["full",""],["ion-button",""]],null,[[null,"touchstart"]],function(l,n,u){var t=!0;if("touchstart"===n){t=!1!==l.component.requestDefeatRefresh()&&t}return t},t_.b,t_.a)),Ti._4(1097728,null,0,e_.a,[[8,""],kc.a,Ti.k,Ti.E],{full:[0,"full"]},null),(l()(),Ti._27(0,["\n      刷新再找一找\n    "])),(l()(),Ti._27(null,["\n\t"]))],function(l,n){l(n,8,0,"")},null)}function z(l){return Ti._29(0,[(l()(),Ti._6(0,null,null,8,"button",[["class","btn-confirm"],["full",""],["ion-button",""]],null,[[null,"touchstart"]],function(l,n,u){var t=!0;if("touchstart"===n){t=!1!==l.component.addProductModal()&&t}return t},t_.b,t_.a)),Ti._4(1097728,null,0,e_.a,[[8,""],kc.a,Ti.k,Ti.E],{full:[0,"full"]},null),(l()(),Ti._27(0,["\n    "])),(l()(),Ti._6(0,null,0,1,"span",[["class","confirm"]],null,null,null,null,null)),(l()(),Ti._27(null,["确认订单"])),(l()(),Ti._27(0,["\n    "])),(l()(),Ti._6(0,null,0,1,"span",[],null,null,null,null,null)),(l()(),Ti._27(null,["（总额：￥","）"])),(l()(),Ti._27(0,["\n  "]))],function(l,n){l(n,1,0,"")},function(l,n){l(n,7,0,n.component.totalPriceFloat)})}function V(l){return Ti._29(0,[Ti._21(0,Ds,[]),Ti._21(0,xs,[]),Ti._25(402653184,1,{content:0}),(l()(),Ti._6(0,null,null,10,"ion-header",[],null,null,null,null,null)),Ti._4(16384,null,0,Lc.a,[kc.a,Ti.k,Ti.E,[2,Ic.a]],null,null),(l()(),Ti._27(null,["\n  "])),(l()(),Ti._6(0,null,null,6,"ion-navbar",[["class","toolbar"]],[[8,"hidden",0],[2,"statusbar-padding",null]],null,null,qc.b,qc.a)),Ti._4(49152,null,0,Rc.a,[xc.a,[2,Ic.a],[2,Oc.a],kc.a,Ti.k,Ti.E],null,null),(l()(),Ti._27(3,["\n    "])),(l()(),Ti._6(0,null,3,2,"ion-title",[["text-center",""]],null,null,null,$c.b,$c.a)),Ti._4(49152,null,0,Gc.a,[kc.a,Ti.k,Ti.E,[2,Kc.a],[2,Rc.a]],null,null),(l()(),Ti._27(0,["配单仓"])),(l()(),Ti._27(3,["\n  "])),(l()(),Ti._27(null,["\n"])),(l()(),Ti._27(null,["\n"])),(l()(),Ti._6(0,null,null,25,"ion-content",[],[[2,"statusbar-padding",null],[2,"has-refresher",null]],[["window","resize"]],function(l,n,u){var t=!0;if("window:resize"===n){t=!1!==Ti._20(l,16).resize()&&t}return t},Nc.b,Nc.a)),Ti._4(4374528,[[1,4]],0,Fc.a,[kc.a,Dc.a,Tc.a,Ti.k,Ti.E,xc.a,Uc.a,Ti.x,[2,Ic.a],[2,Oc.a]],null,null),(l()(),Ti._27(1,["\n\n  "])),(l()(),Ti._0(16777216,null,2,1,null,G)),Ti._4(16384,null,0,Zc.j,[Ti.O,Ti.K],{ngIf:[0,"ngIf"]},null),(l()(),Ti._27(1,["\n\n  "])),(l()(),Ti._6(0,null,1,9,"ion-list",[],null,null,null,null,null)),Ti._4(16384,null,0,zc.a,[kc.a,Ti.k,Ti.E,Dc.a,Cc.l,Tc.a],null,null),(l()(),Ti._27(null,["\n    "])),(l()(),Ti._27(null,["\n    "])),(l()(),Ti._0(16777216,null,null,1,null,K)),Ti._4(16384,null,0,Zc.j,[Ti.O,Ti.K],{ngIf:[0,"ngIf"]},null),(l()(),Ti._27(null,["\n    "])),(l()(),Ti._0(16777216,null,null,1,null,N)),Ti._4(802816,null,0,Zc.i,[Ti.O,Ti.K,Ti.r],{ngForOf:[0,"ngForOf"]},null),(l()(),Ti._27(null,["\n    \n  "])),(l()(),Ti._27(1,["\n\n  "])),(l()(),Ti._0(16777216,null,1,1,null,F)),Ti._4(16384,null,0,Zc.j,[Ti.O,Ti.K],{ngIf:[0,"ngIf"]},null),(l()(),Ti._27(1,["\n  "])),(l()(),Ti._0(16777216,null,1,1,null,U)),Ti._4(16384,null,0,Zc.j,[Ti.O,Ti.K],{ngIf:[0,"ngIf"]},null),(l()(),Ti._27(1,["\n  "])),(l()(),Ti._0(16777216,null,1,1,null,z)),Ti._4(16384,null,0,Zc.j,[Ti.O,Ti.K],{ngIf:[0,"ngIf"]},null),(l()(),Ti._27(1,["\n\n"])),(l()(),Ti._27(null,["\n\n\n        \n"]))],function(l,n){var u=n.component;l(n,19,0,!u.loadingShow);l(n,26,0,u.loadingShow);l(n,29,0,u.orderStoreDataArray);l(n,33,0,u.noData);l(n,36,0,u.requestDefeat);l(n,39,0,u.confirmOrder)},function(l,n){l(n,6,0,Ti._20(n,7)._hidden,Ti._20(n,7)._sbPadding);l(n,15,0,Ti._20(n,16).statusbarPadding,Ti._20(n,16)._hasRefresher)})}function B(l){return Ti._29(0,[(l()(),Ti._6(0,null,null,13,"ion-header",[],null,null,null,null,null)),Ti._4(16384,null,0,Lc.a,[kc.a,Ti.k,Ti.E,[2,Ic.a]],null,null),(l()(),Ti._27(null,["\n  "])),(l()(),Ti._6(0,null,null,9,"ion-navbar",[["class","toolbar"],["hideBackButton",""]],[[8,"hidden",0],[2,"statusbar-padding",null]],null,null,qc.b,qc.a)),Ti._4(49152,null,0,Rc.a,[xc.a,[2,Ic.a],[2,Oc.a],kc.a,Ti.k,Ti.E],{hideBackButton:[0,"hideBackButton"]},null),(l()(),Ti._27(3,["\n    "])),(l()(),Ti._6(0,null,3,2,"ion-title",[["text-center",""]],null,null,null,$c.b,$c.a)),Ti._4(49152,null,0,Gc.a,[kc.a,Ti.k,Ti.E,[2,Kc.a],[2,Rc.a]],null,null),(l()(),Ti._27(0,["收款码"])),(l()(),Ti._27(3,["\n    "])),(l()(),Ti._6(0,null,3,1,"div",[["class","btn-close"]],null,[[null,"touchstart"]],function(l,n,u){var t=!0;if("touchstart"===n){t=!1!==l.component.goTabs()&&t}return t},null,null)),(l()(),Ti._27(null,["关闭"])),(l()(),Ti._27(3,["\n  "])),(l()(),Ti._27(null,["\n"])),(l()(),Ti._27(null,["\n"])),(l()(),Ti._6(0,null,null,28,"ion-content",[],[[2,"statusbar-padding",null],[2,"has-refresher",null]],[["window","resize"]],function(l,n,u){var t=!0;if("window:resize"===n){t=!1!==Ti._20(l,16).resize()&&t}return t},Nc.b,Nc.a)),Ti._4(4374528,null,0,Fc.a,[kc.a,Dc.a,Tc.a,Ti.k,Ti.E,xc.a,Uc.a,Ti.x,[2,Ic.a],[2,Oc.a]],null,null),(l()(),Ti._27(1,["\n\t"])),(l()(),Ti._6(0,null,1,13,"div",[["class","qrcode-box"]],null,null,null,null,null)),(l()(),Ti._27(null,["\n\t\t"])),(l()(),Ti._6(0,null,null,10,"div",[["class","qrcode"]],null,null,null,null,null)),(l()(),Ti._27(null,["\n\t\t\t"])),(l()(),Ti._6(0,null,null,1,"qr-code",[],null,null,null,ud.b,ud.a)),Ti._4(573440,null,0,As.a,[Ti.k],{size:[0,"size"],value:[1,"value"]},null),(l()(),Ti._27(null,["\n\t\t\t"])),(l()(),Ti._6(0,null,null,1,"span",[],null,null,null,null,null)),(l()(),Ti._27(null,["扫码完成支付"])),(l()(),Ti._27(null,["\n\t\t\t"])),(l()(),Ti._6(0,null,null,1,"div",[["class","total"]],null,null,null,null,null)),(l()(),Ti._27(null,["￥",""])),(l()(),Ti._27(null,["\n\t\t"])),(l()(),Ti._27(null,["\n\t"])),(l()(),Ti._27(1,["\n\t"])),(l()(),Ti._6(0,null,1,9,"div",[["class","btn-list"]],null,null,null,null,null)),(l()(),Ti._27(null,["\n\t\t"])),(l()(),Ti._6(0,null,null,2,"button",[["class","btn-update"],["ion-button",""],["outline",""]],null,[[null,"touchstart"]],function(l,n,u){var t=!0;if("touchstart"===n){t=!1!==l.component.updateOrder()&&t}return t},t_.b,t_.a)),Ti._4(1097728,null,0,e_.a,[[8,""],kc.a,Ti.k,Ti.E],{outline:[0,"outline"]},null),(l()(),Ti._27(0,["修改此单"])),(l()(),Ti._27(null,["\n\t\t"])),(l()(),Ti._6(0,null,null,2,"button",[["class","order-again"],["ion-button",""]],null,[[null,"touchstart"]],function(l,n,u){var t=!0;if("touchstart"===n){t=!1!==l.component.orderAgain()&&t}return t},t_.b,t_.a)),Ti._4(1097728,null,0,e_.a,[[8,""],kc.a,Ti.k,Ti.E],null,null),(l()(),Ti._27(0,["再来一单"])),(l()(),Ti._27(null,["\n\t"])),(l()(),Ti._27(1,["\n"]))],function(l,n){var u=n.component;l(n,4,0,"");l(n,23,0,200,u.myCode);l(n,36,0,"")},function(l,n){var u=n.component;l(n,3,0,Ti._20(n,4)._hidden,Ti._20(n,4)._sbPadding);l(n,15,0,Ti._20(n,16).statusbarPadding,Ti._20(n,16)._hasRefresher);l(n,29,0,u.totalPriceFloat)})}function H(l){return Ti._29(0,[(l()(),Ti._6(0,null,null,3,"li",[],null,[[null,"click"]],function(l,n,u){var t=!0;if("click"===n){t=!1!==l.component.getCurrentStatus(l.context.index)&&t}return t},null,null)),Ti._4(278528,null,0,Zc.h,[Ti.r,Ti.s,Ti.k,Ti.E],{ngClass:[0,"ngClass"]},null),Ti._22({active:0}),(l()(),Ti._27(null,["","（","）"]))],function(l,n){l(n,1,0,l(n,2,0,n.component.currentStatus==n.context.$implicit.label))},function(l,n){l(n,3,0,n.context.$implicit.label,n.context.$implicit.num)})}function Y(l){return Ti._29(0,[(l()(),Ti._6(0,null,null,5,"ion-refresher",[],[[2,"refresher-active",null],[4,"top",null]],[[null,"ionRefresh"]],function(l,n,u){var t=!0;if("ionRefresh"===n){t=!1!==l.component.doRefresh(u)&&t}return t},null,null)),Ti._4(212992,null,0,E_.a,[Dc.a,Fc.a,Ti.x,Cc.l],null,{ionRefresh:"ionRefresh"}),(l()(),Ti._27(null,["\n      "])),(l()(),Ti._6(0,null,null,1,"ion-refresher-content",[],[[1,"state",0]],null,null,M_.b,M_.a)),Ti._4(114688,null,0,L_.a,[E_.a,kc.a],null,null),(l()(),Ti._27(null,["\n    "]))],function(l,n){l(n,1,0),l(n,4,0)},function(l,n){l(n,0,0,"inactive"!==Ti._20(n,1).state,Ti._20(n,1)._top);l(n,3,0,Ti._20(n,4).r.state)})}function W(l){return Ti._29(0,[(l()(),Ti._6(0,null,null,9,"div",[["class","loading-wrapper"]],null,null,null,null,null)),(l()(),Ti._27(null,["\n        "])),(l()(),Ti._6(0,null,null,4,"div",[],null,null,null,null,null)),(l()(),Ti._27(null,["\n          "])),(l()(),Ti._6(0,null,null,1,"ion-spinner",[["item-start",""]],[[2,"spinner-paused",null]],null,null,q_.b,q_.a)),Ti._4(114688,null,0,R_.a,[kc.a,Ti.k,Ti.E],{name:[0,"name"]},null),(l()(),Ti._27(null,["\n        "])),(l()(),Ti._27(null,["\n        "])),(l()(),Ti._6(0,null,null,0,"div",[],[[8,"innerHTML",1]],null,null,null,null)),(l()(),Ti._27(null,["\n      "]))],function(l,n){l(n,5,0,n.component.load.spinner)},function(l,n){var u=n.component;l(n,4,0,Ti._20(n,5)._paused);l(n,8,0,u.load.content)})}function X(l){return Ti._29(0,[(l()(),Ti._6(0,null,null,1,"span",[],null,null,null,null,null)),(l()(),Ti._27(null,[""," "]))],null,function(l,n){l(n,1,0,n.context.$implicit.attrValue)})}function J(l){return Ti._29(0,[(l()(),Ti._6(0,null,null,25,"div",[["class","order-item"]],null,null,null,null,null)),(l()(),Ti._27(null,["\n          "])),(l()(),Ti._6(0,null,null,22,"dl",[],null,null,null,null,null)),(l()(),Ti._27(null,["\n            "])),(l()(),Ti._6(0,null,null,4,"dt",[],null,null,null,null,null)),(l()(),Ti._27(null,["\n              "])),(l()(),Ti._6(0,null,null,1,"img",[["class","my-picture"]],[[8,"src",4],[8,"alt",0]],null,null,null,null)),Ti._23(1),(l()(),Ti._27(null,["\n            "])),(l()(),Ti._27(null,["\n            "])),(l()(),Ti._6(0,null,null,1,"dd",[["class","product-title"]],null,null,null,null,null)),(l()(),Ti._27(null,["",""])),(l()(),Ti._27(null,["\n            "])),(l()(),Ti._6(0,null,null,4,"dd",[["class","sku-list"]],null,null,null,null,null)),(l()(),Ti._27(null,["\n              "])),(l()(),Ti._0(16777216,null,null,1,null,X)),Ti._4(802816,null,0,Zc.i,[Ti.O,Ti.K,Ti.r],{ngForOf:[0,"ngForOf"]},null),(l()(),Ti._27(null,["\n            "])),(l()(),Ti._27(null,["\n            "])),(l()(),Ti._6(0,null,null,1,"dd",[["class","price"]],null,null,null,null,null)),(l()(),Ti._27(null,["￥",""])),(l()(),Ti._27(null,["\n            "])),(l()(),Ti._6(0,null,null,1,"dd",[["class","count"]],null,null,null,null,null)),(l()(),Ti._27(null,["X",""])),(l()(),Ti._27(null,["\n          "])),(l()(),Ti._27(null,["\n        "]))],function(l,n){l(n,16,0,n.context.$implicit.productSkuDTO.attrValueList)},function(l,n){l(n,6,0,Ti._28(n,6,0,l(n,7,0,Ti._20(n.parent.parent.parent,1),n.context.$implicit.productSkuDTO.fileSeq)),n.context.$implicit.productSkuDTO.productName);l(n,11,0,n.context.$implicit.productSkuDTO.productName);l(n,20,0,n.context.$implicit.unitPrice);l(n,23,0,n.context.$implicit.number)})}function Q(l){return Ti._29(0,[(l()(),Ti._6(0,null,null,40,"div",[["class","order-items"]],null,null,null,null,null)),(l()(),Ti._27(null,["\n        "])),(l()(),Ti._6(0,null,null,15,"div",[["class","order-title"]],null,null,null,null,null)),(l()(),Ti._27(null,["\n          "])),(l()(),Ti._6(0,null,null,4,"h2",[],null,null,null,null,null)),(l()(),Ti._27(null,["订单编号：\n            "])),(l()(),Ti._6(0,null,null,1,"span",[],null,null,null,null,null)),(l()(),Ti._27(null,["",""])),(l()(),Ti._27(null,["\n          "])),(l()(),Ti._27(null,["\n          "])),(l()(),Ti._6(0,null,null,6,"span",[],null,null,null,null,null)),Ti._4(278528,null,0,Zc.h,[Ti.r,Ti.s,Ti.k,Ti.E],{ngClass:[0,"ngClass"]},null),Ti._23(1),Ti._23(1),Ti._22({auditStatus:0,pass:1,auditing:2}),(l()(),Ti._27(null,["",""])),Ti._23(1),(l()(),Ti._27(null,["\n        "])),(l()(),Ti._27(null,["\n  \n        "])),(l()(),Ti._0(16777216,null,null,1,null,J)),Ti._4(802816,null,0,Zc.i,[Ti.O,Ti.K,Ti.r],{ngForOf:[0,"ngForOf"]},null),(l()(),Ti._27(null,["\n  \n        "])),(l()(),Ti._6(0,null,null,17,"div",[["class","orderOperate"]],null,null,null,null,null)),(l()(),Ti._27(null,["\n          "])),(l()(),Ti._6(0,null,null,14,"dl",[],null,null,null,null,null)),(l()(),Ti._27(null,["\n            "])),(l()(),Ti._6(0,null,null,5,"dt",[],null,null,null,null,null)),(l()(),Ti._27(null,["\n              "])),(l()(),Ti._6(0,null,null,2,"button",[["class","btn-audit"],["ion-button",""]],null,[[null,"click"]],function(l,n,u){var t=!0;if("click"===n){t=!1!==l.component.auditOrder(l.context.index)&&t}return t},t_.b,t_.a)),Ti._4(1097728,null,0,e_.a,[[8,""],kc.a,Ti.k,Ti.E],null,null),(l()(),Ti._27(0,["审核"])),(l()(),Ti._27(null,["\n            "])),(l()(),Ti._27(null,["\n            "])),(l()(),Ti._6(0,null,null,1,"dd",[["class","total"]],null,null,null,null,null)),(l()(),Ti._27(null,["","件商品，实付￥",""])),(l()(),Ti._27(null,["\n            "])),(l()(),Ti._6(0,null,null,1,"dd",[["class","member-phone"]],null,null,null,null,null)),(l()(),Ti._27(null,["会员手机：",""])),(l()(),Ti._27(null,["\n          "])),(l()(),Ti._27(null,["\n        "])),(l()(),Ti._27(null,["\n      "]))],function(l,n){l(n,11,0,l(n,14,0,!0,Ti._28(n,11,0,l(n,12,0,Ti._20(n.parent.parent,0),n.context.$implicit.status)).pass,Ti._28(n,11,0,l(n,13,0,Ti._20(n.parent.parent,0),n.context.$implicit.status)).audit));l(n,20,0,n.context.$implicit.itemList)},function(l,n){l(n,7,0,n.context.$implicit.orderId);l(n,15,0,Ti._28(n,15,0,l(n,16,0,Ti._20(n.parent.parent,0),n.context.$implicit.status)).status);l(n,34,0,n.context.$implicit.totalNumber,n.context.$implicit.payAmount);l(n,37,0,n.context.$implicit.memberMobile)})}function Z(l){return Ti._29(0,[(l()(),Ti._6(0,null,null,5,"ion-infinite-scroll",[],null,[[null,"ionInfinite"]],function(l,n,u){var t=!0;if("ionInfinite"===n){t=!1!==l.component.loadMore(u)&&t}return t},null,null)),Ti._4(1196032,null,0,$_.a,[Fc.a,Ti.x,Ti.k,Tc.a],null,{ionInfinite:"ionInfinite"}),(l()(),Ti._27(null,["\n        "])),(l()(),Ti._6(0,null,null,1,"ion-infinite-scroll-content",[["loadingText","加载更多..."]],[[1,"state",0]],null,null,G_.b,G_.a)),Ti._4(114688,null,0,K_.a,[$_.a,kc.a],{loadingText:[0,"loadingText"]},null),(l()(),Ti._27(null,["\n      "]))],function(l,n){l(n,4,0,"加载更多...")},function(l,n){l(n,3,0,Ti._20(n,4).inf.state)})}function ll(l){return Ti._29(0,[(l()(),Ti._6(0,null,null,6,"div",[["class","no-data"]],null,null,null,null,null)),(l()(),Ti._27(null,["\n        "])),(l()(),Ti._6(0,null,null,0,"img",[["alt",""],["src","./assets/image/nodata.png"]],null,null,null,null,null)),(l()(),Ti._27(null,["\n        "])),(l()(),Ti._6(0,null,null,1,"p",[],null,null,null,null,null)),(l()(),Ti._27(null,["空空如也"])),(l()(),Ti._27(null,["\n      "]))],null,null)}function nl(l){return Ti._29(0,[(l()(),Ti._6(0,null,null,4,"div",[["class","btn-noMore"]],null,null,null,null,null)),(l()(),Ti._27(null,["\n        "])),(l()(),Ti._6(0,null,null,1,"span",[],null,null,null,null,null)),(l()(),Ti._27(null,["—— 没有更多信息了 ——"])),(l()(),Ti._27(null,["\n      "]))],null,null)}function ul(l){return Ti._29(0,[(l()(),Ti._6(0,null,null,10,"div",[["class","request-defeat"]],null,null,null,null,null)),(l()(),Ti._27(null,["\n        "])),(l()(),Ti._6(0,null,null,0,"img",[["alt",""],["src","./assets/image/requestDefeat.png"]],null,null,null,null,null)),(l()(),Ti._27(null,["\n        "])),(l()(),Ti._6(0,null,null,1,"p",[],null,null,null,null,null)),(l()(),Ti._27(null,["啊哦！页面走丢了"])),(l()(),Ti._27(null,["\n        "])),(l()(),Ti._6(0,null,null,2,"button",[["class","btn-request-defeat"],["full",""],["ion-button",""]],null,[[null,"touchstart"]],function(l,n,u){var t=!0;if("touchstart"===n){t=!1!==l.component.requestDefeatRefreshCancelorder()&&t}return t},t_.b,t_.a)),Ti._4(1097728,null,0,e_.a,[[8,""],kc.a,Ti.k,Ti.E],{full:[0,"full"]},null),(l()(),Ti._27(0,["\n          刷新再找一找\n        "])),(l()(),Ti._27(null,["\n      "]))],function(l,n){l(n,8,0,"")},null)}function tl(l){return Ti._29(0,[(l()(),Ti._6(0,null,null,26,"div",[["class","order-cancelList"]],null,null,null,null,null)),(l()(),Ti._27(null,["\n      "])),(l()(),Ti._27(null,["\n      "])),(l()(),Ti._0(16777216,null,null,1,null,W)),Ti._4(16384,null,0,Zc.j,[Ti.O,Ti.K],{ngIf:[0,"ngIf"]},null),(l()(),Ti._27(null,["\n      "])),(l()(),Ti._0(16777216,null,null,1,null,Q)),Ti._4(802816,null,0,Zc.i,[Ti.O,Ti.K,Ti.r],{ngForOf:[0,"ngForOf"]},null),(l()(),Ti._27(null,["\n      "])),(l()(),Ti._0(16777216,null,null,1,null,Z)),Ti._4(16384,null,0,Zc.j,[Ti.O,Ti.K],{ngIf:[0,"ngIf"]},null),(l()(),Ti._27(null,["\n      "])),(l()(),Ti._0(16777216,null,null,1,null,ll)),Ti._4(16384,null,0,Zc.j,[Ti.O,Ti.K],{ngIf:[0,"ngIf"]},null),(l()(),Ti._27(null,["\n      "])),(l()(),Ti._6(0,null,null,4,"div",[["class","btn-cancelView"]],null,[[null,"touchstart"]],function(l,n,u){var t=!0;if("touchstart"===n){t=!1!==l.component.goAuditCancel()&&t}return t},null,null)),(l()(),Ti._27(null,["\n        "])),(l()(),Ti._6(0,null,null,1,"span",[],null,null,null,null,null)),(l()(),Ti._27(null,["查看审核完成订单"])),(l()(),Ti._27(null,["\n      "])),(l()(),Ti._27(null,["\n      "])),(l()(),Ti._0(16777216,null,null,1,null,nl)),Ti._4(16384,null,0,Zc.j,[Ti.O,Ti.K],{ngIf:[0,"ngIf"]},null),(l()(),Ti._27(null,["\n      "])),(l()(),Ti._0(16777216,null,null,1,null,ul)),Ti._4(16384,null,0,Zc.j,[Ti.O,Ti.K],{ngIf:[0,"ngIf"]},null),(l()(),Ti._27(null,["\n    "]))],function(l,n){var u=n.component;l(n,4,0,u.loadingShow);l(n,7,0,u.unauditCancelorderArray);l(n,10,0,!u.showNoMore&&u.showInfinite);l(n,13,0,u.noData);l(n,22,0,u.showNoMore);l(n,25,0,u.requestDefeat)},null)}function el(l){return Ti._29(0,[(l()(),Ti._6(0,null,null,9,"div",[["class","loading-wrapper"]],null,null,null,null,null)),(l()(),Ti._27(null,["\n        "])),(l()(),Ti._6(0,null,null,4,"div",[],null,null,null,null,null)),(l()(),Ti._27(null,["\n          "])),(l()(),Ti._6(0,null,null,1,"ion-spinner",[["item-start",""]],[[2,"spinner-paused",null]],null,null,q_.b,q_.a)),Ti._4(114688,null,0,R_.a,[kc.a,Ti.k,Ti.E],{name:[0,"name"]},null),(l()(),Ti._27(null,["\n        "])),(l()(),Ti._27(null,["\n        "])),(l()(),Ti._6(0,null,null,0,"div",[],[[8,"innerHTML",1]],null,null,null,null)),(l()(),Ti._27(null,["\n      "]))],function(l,n){l(n,5,0,n.component.load.spinner)},function(l,n){var u=n.component;l(n,4,0,Ti._20(n,5)._paused);l(n,8,0,u.load.content)})}function il(l){return Ti._29(0,[(l()(),Ti._6(0,null,null,1,"span",[],null,null,null,null,null)),(l()(),Ti._27(null,[""," "]))],null,function(l,n){l(n,1,0,n.context.$implicit.attrValue)})}function al(l){return Ti._29(0,[(l()(),Ti._6(0,null,null,2,"button",[["class","btn-audit"],["ion-button",""]],null,[[null,"click"]],function(l,n,u){var t=!0;if("click"===n){t=!1!==l.component.auditReturn(l.parent.context.index)&&t}return t},t_.b,t_.a)),Ti._4(1097728,null,0,e_.a,[[8,""],kc.a,Ti.k,Ti.E],null,null),(l()(),Ti._27(0,["审核"]))],null,null)}function ol(l){return Ti._29(0,[(l()(),Ti._6(0,null,null,2,"button",[["class","btn-audit"],["ion-button",""]],null,[[null,"click"]],function(l,n,u){var t=!0;if("click"===n){t=!1!==l.component.confirmReturn(l.parent.context.index)&&t}return t},t_.b,t_.a)),Ti._4(1097728,null,0,e_.a,[[8,""],kc.a,Ti.k,Ti.E],null,null),(l()(),Ti._27(0,["确认收货"]))],null,null)}function rl(l){return Ti._29(0,[(l()(),Ti._6(0,null,null,66,"div",[["class","order-items"]],null,null,null,null,null)),(l()(),Ti._27(null,["\n        "])),(l()(),Ti._6(0,null,null,15,"div",[["class","order-title"]],null,null,null,null,null)),(l()(),Ti._27(null,["\n          "])),(l()(),Ti._6(0,null,null,4,"h2",[],null,null,null,null,null)),(l()(),Ti._27(null,["订单编号：\n            "])),(l()(),Ti._6(0,null,null,1,"span",[],null,null,null,null,null)),(l()(),Ti._27(null,["",""])),(l()(),Ti._27(null,["\n          "])),(l()(),Ti._27(null,["\n          "])),(l()(),Ti._6(0,null,null,6,"span",[],null,null,null,null,null)),Ti._4(278528,null,0,Zc.h,[Ti.r,Ti.s,Ti.k,Ti.E],{ngClass:[0,"ngClass"]},null),Ti._23(1),Ti._23(1),Ti._22({auditStatus:0,pass:1,auditing:2}),(l()(),Ti._27(null,["",""])),Ti._23(1),(l()(),Ti._27(null,["\n        "])),(l()(),Ti._27(null,["\n  \n        "])),(l()(),Ti._6(0,null,null,25,"div",[["class","order-item"]],null,null,null,null,null)),(l()(),Ti._27(null,["\n          "])),(l()(),Ti._6(0,null,null,22,"dl",[],null,null,null,null,null)),(l()(),Ti._27(null,["\n            "])),(l()(),Ti._6(0,null,null,4,"dt",[],null,null,null,null,null)),(l()(),Ti._27(null,["\n              "])),(l()(),Ti._6(0,null,null,1,"img",[["class","my-picture"]],[[8,"src",4],[8,"alt",0]],null,null,null,null)),Ti._23(1),(l()(),Ti._27(null,["\n            "])),(l()(),Ti._27(null,["\n            "])),(l()(),Ti._6(0,null,null,1,"dd",[["class","product-title"]],null,null,null,null,null)),(l()(),Ti._27(null,["",""])),(l()(),Ti._27(null,["\n            "])),(l()(),Ti._6(0,null,null,4,"dd",[["class","sku-list"]],null,null,null,null,null)),(l()(),Ti._27(null,["\n              "])),(l()(),Ti._0(16777216,null,null,1,null,il)),Ti._4(802816,null,0,Zc.i,[Ti.O,Ti.K,Ti.r],{ngForOf:[0,"ngForOf"]},null),(l()(),Ti._27(null,["\n            "])),(l()(),Ti._27(null,["\n            "])),(l()(),Ti._6(0,null,null,1,"dd",[["class","price"]],null,null,null,null,null)),(l()(),Ti._27(null,["￥",""])),(l()(),Ti._27(null,["\n            "])),(l()(),Ti._6(0,null,null,1,"dd",[["class","count"]],null,null,null,null,null)),(l()(),Ti._27(null,["X",""])),(l()(),Ti._27(null,["\n          "])),(l()(),Ti._27(null,["\n        "])),(l()(),Ti._27(null,["\n  \n        "])),(l()(),Ti._6(0,null,null,19,"div",[["class","orderOperate"]],null,null,null,null,null)),(l()(),Ti._27(null,["\n          "])),(l()(),Ti._6(0,null,null,16,"dl",[],null,null,null,null,null)),(l()(),Ti._27(null,["\n            "])),(l()(),Ti._6(0,null,null,7,"dt",[],null,null,null,null,null)),(l()(),Ti._27(null,["\n              "])),(l()(),Ti._0(16777216,null,null,1,null,al)),Ti._4(16384,null,0,Zc.j,[Ti.O,Ti.K],{ngIf:[0,"ngIf"]},null),(l()(),Ti._27(null,["\n              "])),(l()(),Ti._0(16777216,null,null,1,null,ol)),Ti._4(16384,null,0,Zc.j,[Ti.O,Ti.K],{ngIf:[0,"ngIf"]},null),(l()(),Ti._27(null,["\n            "])),(l()(),Ti._27(null,["\n            "])),(l()(),Ti._6(0,null,null,1,"dd",[["class","total"]],null,null,null,null,null)),(l()(),Ti._27(null,["退货数量: ",""])),(l()(),Ti._27(null,["\n            "])),(l()(),Ti._6(0,null,null,1,"dd",[["class","member-phone"]],null,null,null,null,null)),(l()(),Ti._27(null,["会员手机：",""])),(l()(),Ti._27(null,["\n          "])),(l()(),Ti._27(null,["\n        "])),(l()(),Ti._27(null,["\n      "]))],function(l,n){l(n,11,0,l(n,14,0,!0,Ti._28(n,11,0,l(n,12,0,Ti._20(n.parent.parent,2),n.context.$implicit.status)).pass,Ti._28(n,11,0,l(n,13,0,Ti._20(n.parent.parent,2),n.context.$implicit.status)).audit));l(n,35,0,n.context.$implicit.productSkuDTO.attrValueList);l(n,53,0,0==n.context.$implicit.status);l(n,56,0,1==n.context.$implicit.status)},function(l,n){l(n,7,0,n.context.$implicit.orderId);l(n,15,0,Ti._28(n,15,0,l(n,16,0,Ti._20(n.parent.parent,2),n.context.$implicit.status)).status);l(n,25,0,Ti._28(n,25,0,l(n,26,0,Ti._20(n.parent.parent,1),n.context.$implicit.productSkuDTO.fileSeq)),n.context.$implicit.productSkuDTO.productName);l(n,30,0,n.context.$implicit.productSkuDTO.productName);l(n,39,0,n.context.$implicit.unitPrice);l(n,42,0,n.context.$implicit.buyNumber);l(n,60,0,n.context.$implicit.number);l(n,63,0,n.context.$implicit.mobile)})}function sl(l){return Ti._29(0,[(l()(),Ti._6(0,null,null,5,"ion-infinite-scroll",[],null,[[null,"ionInfinite"]],function(l,n,u){var t=!0;if("ionInfinite"===n){t=!1!==l.component.loadMore(u)&&t}return t},null,null)),Ti._4(1196032,null,0,$_.a,[Fc.a,Ti.x,Ti.k,Tc.a],null,{ionInfinite:"ionInfinite"}),(l()(),Ti._27(null,["\n        "])),(l()(),Ti._6(0,null,null,1,"ion-infinite-scroll-content",[["loadingText","加载更多..."]],[[1,"state",0]],null,null,G_.b,G_.a)),Ti._4(114688,null,0,K_.a,[$_.a,kc.a],{loadingText:[0,"loadingText"]},null),(l()(),Ti._27(null,["\n      "]))],function(l,n){l(n,4,0,"加载更多...")},function(l,n){l(n,3,0,Ti._20(n,4).inf.state)})}function cl(l){return Ti._29(0,[(l()(),Ti._6(0,null,null,6,"div",[["class","no-data"]],null,null,null,null,null)),(l()(),Ti._27(null,["\n        "])),(l()(),Ti._6(0,null,null,0,"img",[["alt",""],["src","./assets/image/nodata.png"]],null,null,null,null,null)),(l()(),Ti._27(null,["\n        "])),(l()(),Ti._6(0,null,null,1,"p",[],null,null,null,null,null)),(l()(),Ti._27(null,["空空如也"])),(l()(),Ti._27(null,["\n      "]))],null,null)}function _l(l){return Ti._29(0,[(l()(),Ti._6(0,null,null,4,"div",[["class","btn-noMore"]],null,null,null,null,null)),(l()(),Ti._27(null,["\n        "])),(l()(),Ti._6(0,null,null,1,"span",[],null,null,null,null,null)),(l()(),Ti._27(null,["—— 没有更多信息了 ——"])),(l()(),Ti._27(null,["\n      "]))],null,null)}function dl(l){return Ti._29(0,[(l()(),Ti._6(0,null,null,10,"div",[["class","request-defeat"]],null,null,null,null,null)),(l()(),Ti._27(null,["\n        "])),(l()(),Ti._6(0,null,null,0,"img",[["alt",""],["src","./assets/image/requestDefeat.png"]],null,null,null,null,null)),(l()(),Ti._27(null,["\n        "])),(l()(),Ti._6(0,null,null,1,"p",[],null,null,null,null,null)),(l()(),Ti._27(null,["啊哦！页面走丢了"])),(l()(),Ti._27(null,["\n        "])),(l()(),Ti._6(0,null,null,2,"button",[["class","btn-request-defeat"],["full",""],["ion-button",""]],null,[[null,"touchstart"]],function(l,n,u){var t=!0;if("touchstart"===n){t=!1!==l.component.requestDefeatRefreshReturnorder()&&t}return t},t_.b,t_.a)),Ti._4(1097728,null,0,e_.a,[[8,""],kc.a,Ti.k,Ti.E],{full:[0,"full"]},null),(l()(),Ti._27(0,["\n          刷新再找一找\n        "])),(l()(),Ti._27(null,["\n      "]))],function(l,n){l(n,8,0,"")},null)}function pl(l){return Ti._29(0,[(l()(),Ti._6(0,null,null,5,"ion-infinite-scroll",[],null,[[null,"ionInfinite"]],function(l,n,u){var t=!0;if("ionInfinite"===n){t=!1!==l.component.loadMore(u)&&t}return t},null,null)),Ti._4(1196032,null,0,$_.a,[Fc.a,Ti.x,Ti.k,Tc.a],null,{ionInfinite:"ionInfinite"}),(l()(),Ti._27(null,["\n        "])),(l()(),Ti._6(0,null,null,1,"ion-infinite-scroll-content",[["loadingText","加载更多..."]],[[1,"state",0]],null,null,G_.b,G_.a)),Ti._4(114688,null,0,K_.a,[$_.a,kc.a],{loadingText:[0,"loadingText"]},null),(l()(),Ti._27(null,["\n      "]))],function(l,n){l(n,4,0,"加载更多...")},function(l,n){l(n,3,0,Ti._20(n,4).inf.state)})}function fl(l){return Ti._29(0,[(l()(),Ti._6(0,null,null,29,"div",[["class","order-returnList"]],null,null,null,null,null)),(l()(),Ti._27(null,["\n      "])),(l()(),Ti._27(null,["\n      "])),(l()(),Ti._0(16777216,null,null,1,null,el)),Ti._4(16384,null,0,Zc.j,[Ti.O,Ti.K],{ngIf:[0,"ngIf"]},null),(l()(),Ti._27(null,["\n      "])),(l()(),Ti._0(16777216,null,null,1,null,rl)),Ti._4(802816,null,0,Zc.i,[Ti.O,Ti.K,Ti.r],{ngForOf:[0,"ngForOf"]},null),(l()(),Ti._27(null,["\n      "])),(l()(),Ti._0(16777216,null,null,1,null,sl)),Ti._4(16384,null,0,Zc.j,[Ti.O,Ti.K],{ngIf:[0,"ngIf"]},null),(l()(),Ti._27(null,["\n      "])),(l()(),Ti._0(16777216,null,null,1,null,cl)),Ti._4(16384,null,0,Zc.j,[Ti.O,Ti.K],{ngIf:[0,"ngIf"]},null),(l()(),Ti._27(null,["\n      "])),(l()(),Ti._6(0,null,null,4,"div",[["class","btn-cancelView"]],null,[[null,"touchstart"]],function(l,n,u){var t=!0;if("touchstart"===n){t=!1!==l.component.goAuditReturn()&&t}return t},null,null)),(l()(),Ti._27(null,["\n        "])),(l()(),Ti._6(0,null,null,1,"span",[],null,null,null,null,null)),(l()(),Ti._27(null,["查看已处理退货订单"])),(l()(),Ti._27(null,["\n      "])),(l()(),Ti._27(null,["\n      "])),(l()(),Ti._0(16777216,null,null,1,null,_l)),Ti._4(16384,null,0,Zc.j,[Ti.O,Ti.K],{ngIf:[0,"ngIf"]},null),(l()(),Ti._27(null,["\n      "])),(l()(),Ti._0(16777216,null,null,1,null,dl)),Ti._4(16384,null,0,Zc.j,[Ti.O,Ti.K],{ngIf:[0,"ngIf"]},null),(l()(),Ti._27(null,["\n      "])),(l()(),Ti._0(16777216,null,null,1,null,pl)),Ti._4(16384,null,0,Zc.j,[Ti.O,Ti.K],{ngIf:[0,"ngIf"]},null),(l()(),Ti._27(null,["\n    "]))],function(l,n){var u=n.component;l(n,4,0,u.loadingShow);l(n,7,0,u.unauditReturnorderArray);l(n,10,0,!u.showNoMore&&u.showInfinite);l(n,13,0,u.noData);l(n,22,0,u.showNoMore);l(n,25,0,u.requestDefeat);l(n,28,0,!u.showNoMore&&u.showInfinite)},null)}function hl(l){return Ti._29(0,[Ti._21(0,bs,[]),Ti._21(0,Ds,[]),Ti._21(0,vs,[]),Ti._25(402653184,1,{content:0}),(l()(),Ti._6(0,null,null,20,"ion-header",[],null,null,null,null,null)),Ti._4(16384,null,0,Lc.a,[kc.a,Ti.k,Ti.E,[2,Ic.a]],null,null),(l()(),Ti._27(null,["\n    "])),(l()(),Ti._6(0,null,null,6,"ion-navbar",[["class","toolbar"]],[[8,"hidden",0],[2,"statusbar-padding",null]],null,null,qc.b,qc.a)),Ti._4(49152,null,0,Rc.a,[xc.a,[2,Ic.a],[2,Oc.a],kc.a,Ti.k,Ti.E],null,null),(l()(),Ti._27(3,["\n      "])),(l()(),Ti._6(0,null,3,2,"ion-title",[["text-center",""]],null,null,null,$c.b,$c.a)),Ti._4(49152,null,0,Gc.a,[kc.a,Ti.k,Ti.E,[2,Kc.a],[2,Rc.a]],null,null),(l()(),Ti._27(0,["待审核订单"])),(l()(),Ti._27(3,["\n    "])),(l()(),Ti._27(null,["\n    "])),(l()(),Ti._6(0,null,null,8,"ion-toolbar",[["class","statusBox toolbar"]],[[2,"statusbar-padding",null]],null,null,p_.b,p_.a)),Ti._4(49152,null,0,Kc.a,[kc.a,Ti.k,Ti.E],null,null),(l()(),Ti._27(3,["\n      "])),(l()(),Ti._6(0,null,3,4,"ul",[],null,null,null,null,null)),(l()(),Ti._27(null,["\n        "])),(l()(),Ti._0(16777216,null,null,1,null,H)),Ti._4(802816,null,0,Zc.i,[Ti.O,Ti.K,Ti.r],{ngForOf:[0,"ngForOf"]},null),(l()(),Ti._27(null,["\n      "])),(l()(),Ti._27(3,["\n    "])),(l()(),Ti._27(null,["\n  "])),(l()(),Ti._27(null,["\n  "])),(l()(),Ti._6(0,null,null,14,"ion-content",[],[[2,"statusbar-padding",null],[2,"has-refresher",null]],[["window","resize"]],function(l,n,u){var t=!0;if("window:resize"===n){t=!1!==Ti._20(l,27).resize()&&t}return t},Nc.b,Nc.a)),Ti._4(4374528,[[1,4]],0,Fc.a,[kc.a,Dc.a,Tc.a,Ti.k,Ti.E,xc.a,Uc.a,Ti.x,[2,Ic.a],[2,Oc.a]],null,null),(l()(),Ti._27(1,["\n    "])),(l()(),Ti._27(1,["\n    "])),(l()(),Ti._0(16777216,null,2,1,null,Y)),Ti._4(16384,null,0,Zc.j,[Ti.O,Ti.K],{ngIf:[0,"ngIf"]},null),(l()(),Ti._27(1,["\n  \n    "])),(l()(),Ti._27(1,["\n    "])),(l()(),Ti._0(16777216,null,1,1,null,tl)),Ti._4(16384,null,0,Zc.j,[Ti.O,Ti.K],{ngIf:[0,"ngIf"]},null),(l()(),Ti._27(1,["\n  \n    "])),(l()(),Ti._27(1,["\n    "])),(l()(),Ti._0(16777216,null,1,1,null,fl)),Ti._4(16384,null,0,Zc.j,[Ti.O,Ti.K],{ngIf:[0,"ngIf"]},null),(l()(),Ti._27(1,["\n  "]))],function(l,n){var u=n.component;l(n,21,0,u.statusList);l(n,31,0,!u.loadingShow);l(n,35,0,0==u.currentIndex);l(n,39,0,1==u.currentIndex)},function(l,n){l(n,7,0,Ti._20(n,8)._hidden,Ti._20(n,8)._sbPadding);l(n,15,0,Ti._20(n,16)._sbPadding);l(n,26,0,Ti._20(n,27).statusbarPadding,Ti._20(n,27)._hasRefresher)})}function gl(l){return Ti._29(0,[(l()(),Ti._6(0,null,null,9,"div",[["class","loading-wrapper"]],null,null,null,null,null)),(l()(),Ti._27(null,["\n      "])),(l()(),Ti._6(0,null,null,4,"div",[],null,null,null,null,null)),(l()(),Ti._27(null,["\n        "])),(l()(),Ti._6(0,null,null,1,"ion-spinner",[["item-start",""]],[[2,"spinner-paused",null]],null,null,q_.b,q_.a)),Ti._4(114688,null,0,R_.a,[kc.a,Ti.k,Ti.E],{name:[0,"name"]},null),(l()(),Ti._27(null,["\n      "])),(l()(),Ti._27(null,["\n      "])),(l()(),Ti._6(0,null,null,0,"div",[],[[8,"innerHTML",1]],null,null,null,null)),(l()(),Ti._27(null,["\n    "]))],function(l,n){l(n,5,0,n.component.load.spinner)},function(l,n){var u=n.component;l(n,4,0,Ti._20(n,5)._paused);l(n,8,0,u.load.content)})}function ml(l){return Ti._29(0,[(l()(),Ti._6(0,null,null,1,"span",[],null,null,null,null,null)),(l()(),Ti._27(null,[""," "]))],null,function(l,n){l(n,1,0,n.context.$implicit.attrValue)})}function vl(l){return Ti._29(0,[(l()(),Ti._6(0,null,null,25,"div",[["class","order-item"]],null,null,null,null,null)),(l()(),Ti._27(null,["\n        "])),(l()(),Ti._6(0,null,null,22,"dl",[],null,null,null,null,null)),(l()(),Ti._27(null,["\n          "])),(l()(),Ti._6(0,null,null,4,"dt",[],null,null,null,null,null)),(l()(),Ti._27(null,["\n            "])),(l()(),Ti._6(0,null,null,1,"img",[["class","my-picture"]],[[8,"src",4],[8,"alt",0]],null,null,null,null)),Ti._23(1),(l()(),Ti._27(null,["\n          "])),(l()(),Ti._27(null,["\n          "])),(l()(),Ti._6(0,null,null,1,"dd",[["class","product-title"]],null,null,null,null,null)),(l()(),Ti._27(null,["",""])),(l()(),Ti._27(null,["\n          "])),(l()(),Ti._6(0,null,null,4,"dd",[["class","sku-list"]],null,null,null,null,null)),(l()(),Ti._27(null,["\n            "])),(l()(),Ti._0(16777216,null,null,1,null,ml)),Ti._4(802816,null,0,Zc.i,[Ti.O,Ti.K,Ti.r],{ngForOf:[0,"ngForOf"]},null),(l()(),Ti._27(null,["\n          "])),(l()(),Ti._27(null,["\n          "])),(l()(),Ti._6(0,null,null,1,"dd",[["class","price"]],null,null,null,null,null)),(l()(),Ti._27(null,["￥",""])),(l()(),Ti._27(null,["\n          "])),(l()(),Ti._6(0,null,null,1,"dd",[["class","count"]],null,null,null,null,null)),(l()(),Ti._27(null,["X",""])),(l()(),Ti._27(null,["\n        "])),(l()(),Ti._27(null,["\n\t\t\t"]))],function(l,n){l(n,16,0,n.context.$implicit.productSkuDTO.attrValueList)},function(l,n){l(n,6,0,Ti._28(n,6,0,l(n,7,0,Ti._20(n.parent.parent,1),n.context.$implicit.productSkuDTO.fileSeq)),n.context.$implicit.productSkuDTO.productName);l(n,11,0,n.context.$implicit.productSkuDTO.productName);l(n,20,0,n.context.$implicit.unitPrice);l(n,23,0,n.context.$implicit.number)})}function bl(l){return Ti._29(0,[(l()(),Ti._6(0,null,null,39,"div",[["class","order-items"]],null,null,null,null,null)),(l()(),Ti._27(null,["\n\t\t\t"])),(l()(),Ti._6(0,null,null,14,"div",[["class","order-title"]],null,null,null,null,null)),(l()(),Ti._27(null,["\n\t\t\t\t"])),(l()(),Ti._6(0,null,null,3,"h2",[],null,null,null,null,null)),(l()(),Ti._27(null,["订单编号："])),(l()(),Ti._6(0,null,null,1,"span",[],null,null,null,null,null)),(l()(),Ti._27(null,["",""])),(l()(),Ti._27(null,["\n\t\t\t\t"])),(l()(),Ti._6(0,null,null,6,"span",[],null,null,null,null,null)),Ti._4(278528,null,0,Zc.h,[Ti.r,Ti.s,Ti.k,Ti.E],{ngClass:[0,"ngClass"]},null),Ti._23(1),Ti._23(1),Ti._22({auditStatus:0,pass:1,auditing:2}),(l()(),Ti._27(null,["",""])),Ti._23(1),(l()(),Ti._27(null,[" \n\t\t\t"])),(l()(),Ti._27(null,["\n\n\t\t\t"])),(l()(),Ti._0(16777216,null,null,1,null,vl)),Ti._4(802816,null,0,Zc.i,[Ti.O,Ti.K,Ti.r],{ngForOf:[0,"ngForOf"]},null),(l()(),Ti._27(null,["\n\t\t\t\n\t\t\t"])),(l()(),Ti._6(0,null,null,17,"div",[["class","orderOperate"]],null,null,null,null,null)),(l()(),Ti._27(null,["\n\t\t\t\t"])),(l()(),Ti._6(0,null,null,14,"dl",[],null,null,null,null,null)),(l()(),Ti._27(null,["\n\t\t\t\t\t"])),(l()(),Ti._6(0,null,null,5,"dt",[],null,null,null,null,null)),(l()(),Ti._27(null,["\n\t\t\t\t\t\t"])),(l()(),Ti._6(0,null,null,2,"button",[["class","btn-audit"],["ion-button",""]],null,[[null,"click"]],function(l,n,u){var t=!0;if("click"===n){t=!1!==l.component.auditOrder(l.context.index)&&t}return t},t_.b,t_.a)),Ti._4(1097728,null,0,e_.a,[[8,""],kc.a,Ti.k,Ti.E],null,null),(l()(),Ti._27(0,["审核"])),(l()(),Ti._27(null,["\n\t\t\t\t\t"])),(l()(),Ti._27(null,["\n\t\t\t\t\t"])),(l()(),Ti._6(0,null,null,1,"dd",[["class","total"]],null,null,null,null,null)),(l()(),Ti._27(null,["","件商品，实付￥",""])),(l()(),Ti._27(null,["\n\t\t\t\t\t"])),(l()(),Ti._6(0,null,null,1,"dd",[["class","member-phone"]],null,null,null,null,null)),(l()(),Ti._27(null,["会员手机：",""])),(l()(),Ti._27(null,["\n\t\t\t\t"])),(l()(),Ti._27(null,["\n\t\t\t"])),(l()(),Ti._27(null,["\n    "]))],function(l,n){l(n,10,0,l(n,13,0,!0,Ti._28(n,10,0,l(n,11,0,Ti._20(n.parent,0),n.context.$implicit.status)).pass,Ti._28(n,10,0,l(n,12,0,Ti._20(n.parent,0),n.context.$implicit.status)).audit));l(n,19,0,n.context.$implicit.itemList)},function(l,n){l(n,7,0,n.context.$implicit.orderId);l(n,14,0,Ti._28(n,14,0,l(n,15,0,Ti._20(n.parent,0),n.context.$implicit.status)).status);l(n,33,0,n.context.$implicit.amount,n.context.$implicit.payAmount);l(n,36,0,n.context.$implicit.memberMobile)})}function wl(l){return Ti._29(0,[(l()(),Ti._6(0,null,null,4,"div",[["class","btn-cancelView"]],null,[[null,"touchstart"]],function(l,n,u){var t=!0;if("touchstart"===n){t=!1!==l.component.goAuditCancel()&&t}return t},null,null)),(l()(),Ti._27(null,["\n\t\t\t"])),(l()(),Ti._6(0,null,null,1,"span",[],null,null,null,null,null)),(l()(),Ti._27(null,["查看审核完成订单"])),(l()(),Ti._27(null,["\n    "]))],null,null)}function yl(l){return Ti._29(0,[(l()(),Ti._6(0,null,null,6,"div",[["class","no-data"]],null,null,null,null,null)),(l()(),Ti._27(null,["\n      "])),(l()(),Ti._6(0,null,null,0,"img",[["alt",""],["src","./assets/image/nodata.png"]],null,null,null,null,null)),(l()(),Ti._27(null,["\n      "])),(l()(),Ti._6(0,null,null,1,"p",[],null,null,null,null,null)),(l()(),Ti._27(null,["空空如也"])),(l()(),Ti._27(null,["\n    "]))],null,null)}function Sl(l){return Ti._29(0,[(l()(),Ti._6(0,null,null,4,"div",[["class","btn-noMore"]],null,null,null,null,null)),(l()(),Ti._27(null,["\n      "])),(l()(),Ti._6(0,null,null,1,"span",[],null,null,null,null,null)),(l()(),Ti._27(null,["—— 没有更多赠品了 ——"])),(l()(),Ti._27(null,["\n    "]))],null,null)}function Il(l){return Ti._29(0,[(l()(),Ti._6(0,null,null,10,"div",[["class","request-defeat"]],null,null,null,null,null)),(l()(),Ti._27(null,["\n      "])),(l()(),Ti._6(0,null,null,0,"img",[["alt",""],["src","./assets/image/requestDefeat.png"]],null,null,null,null,null)),(l()(),Ti._27(null,["\n      "])),(l()(),Ti._6(0,null,null,1,"p",[],null,null,null,null,null)),(l()(),Ti._27(null,["啊哦！页面走丢了"])),(l()(),Ti._27(null,["\n      "])),(l()(),Ti._6(0,null,null,2,"button",[["class","btn-request-defeat"],["full",""],["ion-button",""]],null,[[null,"touchstart"]],function(l,n,u){var t=!0;if("touchstart"===n){t=!1!==l.component.requestDefeatRefresh()&&t}return t},t_.b,t_.a)),Ti._4(1097728,null,0,e_.a,[[8,""],kc.a,Ti.k,Ti.E],{full:[0,"full"]},null),(l()(),Ti._27(0,["\n        刷新再找一找\n      "])),(l()(),Ti._27(null,["\n    "]))],function(l,n){l(n,8,0,"")},null)}function Ol(l){return Ti._29(0,[(l()(),Ti._6(0,null,null,5,"ion-infinite-scroll",[],null,[[null,"ionInfinite"]],function(l,n,u){var t=!0;if("ionInfinite"===n){t=!1!==l.component.loadMore(u)&&t}return t},null,null)),Ti._4(1196032,null,0,$_.a,[Fc.a,Ti.x,Ti.k,Tc.a],null,{ionInfinite:"ionInfinite"}),(l()(),Ti._27(null,["\n      "])),(l()(),Ti._6(0,null,null,1,"ion-infinite-scroll-content",[["loadingText","加载更多..."]],[[1,"state",0]],null,null,G_.b,G_.a)),Ti._4(114688,null,0,K_.a,[$_.a,kc.a],{loadingText:[0,"loadingText"]},null),(l()(),Ti._27(null,["\n    "]))],function(l,n){l(n,4,0,"加载更多...")},function(l,n){l(n,3,0,Ti._20(n,4).inf.state)})}function xl(l){return Ti._29(0,[Ti._21(0,bs,[]),Ti._21(0,Ds,[]),Ti._25(402653184,1,{content:0}),(l()(),Ti._6(0,null,null,34,"ion-content",[],[[2,"statusbar-padding",null],[2,"has-refresher",null]],[["window","resize"]],function(l,n,u){var t=!0;if("window:resize"===n){t=!1!==Ti._20(l,4).resize()&&t}return t},Nc.b,Nc.a)),Ti._4(4374528,[[1,4]],0,Fc.a,[kc.a,Dc.a,Tc.a,Ti.k,Ti.E,xc.a,Uc.a,Ti.x,[2,Ic.a],[2,Oc.a]],null,null),(l()(),Ti._27(1,["\n  "])),(l()(),Ti._6(0,null,2,5,"ion-refresher",[],[[2,"refresher-active",null],[4,"top",null]],[[null,"ionRefresh"]],function(l,n,u){var t=!0;if("ionRefresh"===n){t=!1!==l.component.refreshMore(u)&&t}return t},null,null)),Ti._4(212992,null,0,E_.a,[Dc.a,Fc.a,Ti.x,Cc.l],null,{ionRefresh:"ionRefresh"}),(l()(),Ti._27(null,["\n    "])),(l()(),Ti._6(0,null,null,1,"ion-refresher-content",[],[[1,"state",0]],null,null,M_.b,M_.a)),Ti._4(114688,null,0,L_.a,[E_.a,kc.a],null,null),(l()(),Ti._27(null,["\n  "])),(l()(),Ti._27(1,["\n\t"])),(l()(),Ti._6(0,null,1,23,"div",[["class","order-list"]],null,null,null,null,null)),(l()(),Ti._27(null,["\n    "])),(l()(),Ti._27(null,["\n    "])),(l()(),Ti._0(16777216,null,null,1,null,gl)),Ti._4(16384,null,0,Zc.j,[Ti.O,Ti.K],{ngIf:[0,"ngIf"]},null),(l()(),Ti._27(null,["\n\t\t"])),(l()(),Ti._0(16777216,null,null,1,null,bl)),Ti._4(802816,null,0,Zc.i,[Ti.O,Ti.K,Ti.r],{ngForOf:[0,"ngForOf"]},null),(l()(),Ti._27(null,["\n\t\t"])),(l()(),Ti._0(16777216,null,null,1,null,wl)),Ti._4(16384,null,0,Zc.j,[Ti.O,Ti.K],{ngIf:[0,"ngIf"]},null),(l()(),Ti._27(null,["\n    "])),(l()(),Ti._0(16777216,null,null,1,null,yl)),Ti._4(16384,null,0,Zc.j,[Ti.O,Ti.K],{ngIf:[0,"ngIf"]},null),(l()(),Ti._27(null,["\n    "])),(l()(),Ti._0(16777216,null,null,1,null,Sl)),Ti._4(16384,null,0,Zc.j,[Ti.O,Ti.K],{ngIf:[0,"ngIf"]},null),(l()(),Ti._27(null,["\n    "])),(l()(),Ti._0(16777216,null,null,1,null,Il)),Ti._4(16384,null,0,Zc.j,[Ti.O,Ti.K],{ngIf:[0,"ngIf"]},null),(l()(),Ti._27(null,["\n    "])),(l()(),Ti._0(16777216,null,null,1,null,Ol)),Ti._4(16384,null,0,Zc.j,[Ti.O,Ti.K],{ngIf:[0,"ngIf"]},null),(l()(),Ti._27(null,["\n\t"])),(l()(),Ti._27(1,["\n\n"])),(l()(),Ti._27(null,["\n"]))],function(l,n){var u=n.component;l(n,7,0),l(n,10,0);l(n,17,0,u.loadingShow);l(n,20,0,u.unauditCancelorderArray);l(n,23,0,u.showInfinite);l(n,26,0,u.noData);l(n,29,0,u.showNoMore);l(n,32,0,u.requestDefeat);l(n,35,0,!u.showNoMore&&u.showInfinite)},function(l,n){l(n,3,0,Ti._20(n,4).statusbarPadding,Ti._20(n,4)._hasRefresher);l(n,6,0,"inactive"!==Ti._20(n,7).state,Ti._20(n,7)._top);l(n,9,0,Ti._20(n,10).r.state)})}function kl(l){return Ti._29(0,[(l()(),Ti._6(0,null,null,9,"div",[["class","loading-wrapper"]],null,null,null,null,null)),(l()(),Ti._27(null,["\n      "])),(l()(),Ti._6(0,null,null,4,"div",[],null,null,null,null,null)),(l()(),Ti._27(null,["\n        "])),(l()(),Ti._6(0,null,null,1,"ion-spinner",[["item-start",""]],[[2,"spinner-paused",null]],null,null,q_.b,q_.a)),Ti._4(114688,null,0,R_.a,[kc.a,Ti.k,Ti.E],{name:[0,"name"]},null),(l()(),Ti._27(null,["\n      "])),(l()(),Ti._27(null,["\n      "])),(l()(),Ti._6(0,null,null,0,"div",[],[[8,"innerHTML",1]],null,null,null,null)),(l()(),Ti._27(null,["\n    "]))],function(l,n){l(n,5,0,n.component.load.spinner)},function(l,n){var u=n.component;l(n,4,0,Ti._20(n,5)._paused);l(n,8,0,u.load.content)})}function Dl(l){return Ti._29(0,[(l()(),Ti._6(0,null,null,1,"span",[],null,null,null,null,null)),(l()(),Ti._27(null,[""," "]))],null,function(l,n){l(n,1,0,n.context.$implicit.attrValue)})}function Cl(l){return Ti._29(0,[(l()(),Ti._6(0,null,null,2,"button",[["class","btn-audit"],["ion-button",""]],null,[[null,"click"]],function(l,n,u){var t=!0;if("click"===n){t=!1!==l.component.auditReturn(l.parent.context.index)&&t}return t},t_.b,t_.a)),Ti._4(1097728,null,0,e_.a,[[8,""],kc.a,Ti.k,Ti.E],null,null),(l()(),Ti._27(0,["审核"]))],null,null)}function jl(l){return Ti._29(0,[(l()(),Ti._6(0,null,null,2,"button",[["class","btn-audit"],["ion-button",""]],null,[[null,"click"]],function(l,n,u){var t=!0;if("click"===n){t=!1!==l.component.confirmReturn(l.parent.context.index)&&t}return t},t_.b,t_.a)),Ti._4(1097728,null,0,e_.a,[[8,""],kc.a,Ti.k,Ti.E],null,null),(l()(),Ti._27(0,["确认收货"]))],null,null)}function Al(l){return Ti._29(0,[(l()(),Ti._6(0,null,null,66,"div",[["class","order-items"]],null,null,null,null,null)),(l()(),Ti._27(null,["\n      "])),(l()(),Ti._6(0,null,null,15,"div",[["class","order-title"]],null,null,null,null,null)),(l()(),Ti._27(null,["\n        "])),(l()(),Ti._6(0,null,null,4,"h2",[],null,null,null,null,null)),(l()(),Ti._27(null,["订单编号：\n          "])),(l()(),Ti._6(0,null,null,1,"span",[],null,null,null,null,null)),(l()(),Ti._27(null,["",""])),(l()(),Ti._27(null,["\n        "])),(l()(),Ti._27(null,["\n        "])),(l()(),Ti._6(0,null,null,6,"span",[],null,null,null,null,null)),Ti._4(278528,null,0,Zc.h,[Ti.r,Ti.s,Ti.k,Ti.E],{ngClass:[0,"ngClass"]},null),Ti._23(1),Ti._23(1),Ti._22({auditStatus:0,pass:1,auditing:2}),(l()(),Ti._27(null,["",""])),Ti._23(1),(l()(),Ti._27(null,["\n      "])),(l()(),Ti._27(null,["\n  \n      "])),(l()(),Ti._6(0,null,null,25,"div",[["class","order-item"]],null,null,null,null,null)),(l()(),Ti._27(null,["\n        "])),(l()(),Ti._6(0,null,null,22,"dl",[],null,null,null,null,null)),(l()(),Ti._27(null,["\n          "])),(l()(),Ti._6(0,null,null,4,"dt",[],null,null,null,null,null)),(l()(),Ti._27(null,["\n            "])),(l()(),Ti._6(0,null,null,1,"img",[["class","my-picture"]],[[8,"src",4],[8,"alt",0]],null,null,null,null)),Ti._23(1),(l()(),Ti._27(null,["\n          "])),(l()(),Ti._27(null,["\n          "])),(l()(),Ti._6(0,null,null,1,"dd",[["class","product-title"]],null,null,null,null,null)),(l()(),Ti._27(null,["",""])),(l()(),Ti._27(null,["\n          "])),(l()(),Ti._6(0,null,null,4,"dd",[["class","sku-list"]],null,null,null,null,null)),(l()(),Ti._27(null,["\n            "])),(l()(),Ti._0(16777216,null,null,1,null,Dl)),Ti._4(802816,null,0,Zc.i,[Ti.O,Ti.K,Ti.r],{ngForOf:[0,"ngForOf"]},null),(l()(),Ti._27(null,["\n          "])),(l()(),Ti._27(null,["\n          "])),(l()(),Ti._6(0,null,null,1,"dd",[["class","price"]],null,null,null,null,null)),(l()(),Ti._27(null,["￥",""])),(l()(),Ti._27(null,["\n          "])),(l()(),Ti._6(0,null,null,1,"dd",[["class","count"]],null,null,null,null,null)),(l()(),Ti._27(null,["X",""])),(l()(),Ti._27(null,["\n        "])),(l()(),Ti._27(null,["\n      "])),(l()(),Ti._27(null,["\n\t\t\t    \n      "])),(l()(),Ti._6(0,null,null,19,"div",[["class","orderOperate"]],null,null,null,null,null)),(l()(),Ti._27(null,["\n        "])),(l()(),Ti._6(0,null,null,16,"dl",[],null,null,null,null,null)),(l()(),Ti._27(null,["\n          "])),(l()(),Ti._6(0,null,null,7,"dt",[],null,null,null,null,null)),(l()(),Ti._27(null,["\n            "])),(l()(),Ti._0(16777216,null,null,1,null,Cl)),Ti._4(16384,null,0,Zc.j,[Ti.O,Ti.K],{ngIf:[0,"ngIf"]},null),(l()(),Ti._27(null,["\n            "])),(l()(),Ti._0(16777216,null,null,1,null,jl)),Ti._4(16384,null,0,Zc.j,[Ti.O,Ti.K],{ngIf:[0,"ngIf"]},null),(l()(),Ti._27(null,["\n          "])),(l()(),Ti._27(null,["\n          "])),(l()(),Ti._6(0,null,null,1,"dd",[["class","total"]],null,null,null,null,null)),(l()(),Ti._27(null,["退货数量: ",""])),(l()(),Ti._27(null,["\n          "])),(l()(),Ti._6(0,null,null,1,"dd",[["class","member-phone"]],null,null,null,null,null)),(l()(),Ti._27(null,["会员手机：",""])),(l()(),Ti._27(null,["\n        "])),(l()(),Ti._27(null,["\n      "])),(l()(),Ti._27(null,["\n    "]))],function(l,n){l(n,11,0,l(n,14,0,!0,Ti._28(n,11,0,l(n,12,0,Ti._20(n.parent,0),n.context.$implicit.status)).pass,Ti._28(n,11,0,l(n,13,0,Ti._20(n.parent,0),n.context.$implicit.status)).audit));l(n,35,0,n.context.$implicit.productSkuDTO.attrValueList);l(n,53,0,0==n.context.$implicit.status);l(n,56,0,1==n.context.$implicit.status)},function(l,n){l(n,7,0,n.context.$implicit.orderId);l(n,15,0,Ti._28(n,15,0,l(n,16,0,Ti._20(n.parent,0),n.context.$implicit.status)).status);l(n,25,0,Ti._28(n,25,0,l(n,26,0,Ti._20(n.parent,1),n.context.$implicit.productSkuDTO.fileSeq)),n.context.$implicit.productSkuDTO.productName);l(n,30,0,n.context.$implicit.productSkuDTO.productName);l(n,39,0,n.context.$implicit.unitPrice);l(n,42,0,n.context.$implicit.buyNumber);l(n,60,0,n.context.$implicit.number);l(n,63,0,n.context.$implicit.mobile)})}function Tl(l){return Ti._29(0,[(l()(),Ti._6(0,null,null,4,"div",[["class","btn-cancelView"]],null,[[null,"touchstart"]],function(l,n,u){var t=!0;if("touchstart"===n){t=!1!==l.component.goAuditReturn()&&t}return t},null,null)),(l()(),Ti._27(null,["\n\t\t\t"])),(l()(),Ti._6(0,null,null,1,"span",[],null,null,null,null,null)),(l()(),Ti._27(null,["查看已处理退货订单"])),(l()(),Ti._27(null,["\n    "]))],null,null)}function Pl(l){return Ti._29(0,[(l()(),Ti._6(0,null,null,6,"div",[["class","no-data"]],null,null,null,null,null)),(l()(),Ti._27(null,["\n      "])),(l()(),Ti._6(0,null,null,0,"img",[["alt",""],["src","./assets/image/nodata.png"]],null,null,null,null,null)),(l()(),Ti._27(null,["\n      "])),(l()(),Ti._6(0,null,null,1,"p",[],null,null,null,null,null)),(l()(),Ti._27(null,["空空如也"])),(l()(),Ti._27(null,["\n    "]))],null,null)}function El(l){return Ti._29(0,[(l()(),Ti._6(0,null,null,4,"div",[["class","btn-noMore"]],null,null,null,null,null)),(l()(),Ti._27(null,["\n      "])),(l()(),Ti._6(0,null,null,1,"span",[],null,null,null,null,null)),(l()(),Ti._27(null,["—— 没有更多信息了 ——"])),(l()(),Ti._27(null,["\n    "]))],null,null)}function Ml(l){return Ti._29(0,[(l()(),Ti._6(0,null,null,10,"div",[["class","request-defeat"]],null,null,null,null,null)),(l()(),Ti._27(null,["\n      "])),(l()(),Ti._6(0,null,null,0,"img",[["alt",""],["src","./assets/image/requestDefeat.png"]],null,null,null,null,null)),(l()(),Ti._27(null,["\n      "])),(l()(),Ti._6(0,null,null,1,"p",[],null,null,null,null,null)),(l()(),Ti._27(null,["啊哦！页面走丢了"])),(l()(),Ti._27(null,["\n      "])),(l()(),Ti._6(0,null,null,2,"button",[["class","btn-request-defeat"],["full",""],["ion-button",""]],null,[[null,"touchstart"]],function(l,n,u){var t=!0;if("touchstart"===n){t=!1!==l.component.requestDefeatRefresh()&&t}return t},t_.b,t_.a)),Ti._4(1097728,null,0,e_.a,[[8,""],kc.a,Ti.k,Ti.E],{full:[0,"full"]},null),(l()(),Ti._27(0,["\n        刷新再找一找\n      "])),(l()(),Ti._27(null,["\n    "]))],function(l,n){l(n,8,0,"")},null)}function Ll(l){return Ti._29(0,[(l()(),Ti._6(0,null,null,5,"ion-infinite-scroll",[],null,[[null,"ionInfinite"]],function(l,n,u){var t=!0;if("ionInfinite"===n){t=!1!==l.component.infiniteGetSelfGiftList(u)&&t}return t},null,null)),Ti._4(1196032,null,0,$_.a,[Fc.a,Ti.x,Ti.k,Tc.a],null,{ionInfinite:"ionInfinite"}),(l()(),Ti._27(null,["\n      "])),(l()(),Ti._6(0,null,null,1,"ion-infinite-scroll-content",[["loadingText","加载更多..."]],[[1,"state",0]],null,null,G_.b,G_.a)),Ti._4(114688,null,0,K_.a,[$_.a,kc.a],{loadingText:[0,"loadingText"]},null),(l()(),Ti._27(null,["\n    "]))],function(l,n){l(n,4,0,"加载更多...")},function(l,n){l(n,3,0,Ti._20(n,4).inf.state)})}function ql(l){return Ti._29(0,[Ti._21(0,vs,[]),Ti._21(0,Ds,[]),(l()(),Ti._6(0,null,null,34,"ion-content",[],[[2,"statusbar-padding",null],[2,"has-refresher",null]],[["window","resize"]],function(l,n,u){var t=!0;if("window:resize"===n){t=!1!==Ti._20(l,3).resize()&&t}return t},Nc.b,Nc.a)),Ti._4(4374528,null,0,Fc.a,[kc.a,Dc.a,Tc.a,Ti.k,Ti.E,xc.a,Uc.a,Ti.x,[2,Ic.a],[2,Oc.a]],null,null),(l()(),Ti._27(1,["\n  "])),(l()(),Ti._6(0,null,2,5,"ion-refresher",[],[[2,"refresher-active",null],[4,"top",null]],[[null,"ionRefresh"]],function(l,n,u){var t=!0;if("ionRefresh"===n){t=!1!==l.component.doRefresh(u)&&t}return t},null,null)),Ti._4(212992,null,0,E_.a,[Dc.a,Fc.a,Ti.x,Cc.l],null,{ionRefresh:"ionRefresh"}),(l()(),Ti._27(null,["\n    "])),(l()(),Ti._6(0,null,null,1,"ion-refresher-content",[],[[1,"state",0]],null,null,M_.b,M_.a)),Ti._4(114688,null,0,L_.a,[E_.a,kc.a],null,null),(l()(),Ti._27(null,["\n  "])),(l()(),Ti._27(1,["\n\t"])),(l()(),Ti._6(0,null,1,23,"div",[["class","order-list"]],null,null,null,null,null)),(l()(),Ti._27(null,["\n    "])),(l()(),Ti._27(null,["\n    "])),(l()(),Ti._0(16777216,null,null,1,null,kl)),Ti._4(16384,null,0,Zc.j,[Ti.O,Ti.K],{ngIf:[0,"ngIf"]},null),(l()(),Ti._27(null,["\n\t\t"])),(l()(),Ti._0(16777216,null,null,1,null,Al)),Ti._4(802816,null,0,Zc.i,[Ti.O,Ti.K,Ti.r],{ngForOf:[0,"ngForOf"]},null),(l()(),Ti._27(null,["\n\t\t"])),(l()(),Ti._0(16777216,null,null,1,null,Tl)),Ti._4(16384,null,0,Zc.j,[Ti.O,Ti.K],{ngIf:[0,"ngIf"]},null),(l()(),Ti._27(null,["\n    "])),(l()(),Ti._0(16777216,null,null,1,null,Pl)),Ti._4(16384,null,0,Zc.j,[Ti.O,Ti.K],{ngIf:[0,"ngIf"]},null),(l()(),Ti._27(null,["\n    "])),(l()(),Ti._0(16777216,null,null,1,null,El)),Ti._4(16384,null,0,Zc.j,[Ti.O,Ti.K],{ngIf:[0,"ngIf"]},null),(l()(),Ti._27(null,["\n    "])),(l()(),Ti._0(16777216,null,null,1,null,Ml)),Ti._4(16384,null,0,Zc.j,[Ti.O,Ti.K],{ngIf:[0,"ngIf"]},null),(l()(),Ti._27(null,["\n    "])),(l()(),Ti._0(16777216,null,null,1,null,Ll)),Ti._4(16384,null,0,Zc.j,[Ti.O,Ti.K],{ngIf:[0,"ngIf"]},null),(l()(),Ti._27(null,["\n\n  "])),(l()(),Ti._27(1,["\n"])),(l()(),Ti._27(null,["\n"]))],function(l,n){var u=n.component;l(n,6,0),l(n,9,0);l(n,16,0,u.loadingShow);l(n,19,0,u.unauditReturnorderArray);l(n,22,0,u.showInfinite);l(n,25,0,u.noData);l(n,28,0,u.showNoMore);l(n,31,0,u.requestDefeat);l(n,34,0,!u.showNoMore&&u.showInfinite)},function(l,n){l(n,2,0,Ti._20(n,3).statusbarPadding,Ti._20(n,3)._hasRefresher);l(n,5,0,"inactive"!==Ti._20(n,6).state,Ti._20(n,6)._top);l(n,8,0,Ti._20(n,9).r.state)})}function Rl(l){return Ti._29(0,[(l()(),Ti._6(0,null,null,5,"ion-refresher",[],[[2,"refresher-active",null],[4,"top",null]],[[null,"ionRefresh"]],function(l,n,u){var t=!0;if("ionRefresh"===n){t=!1!==l.component.refreshGetSelfGiftList(u)&&t}return t},null,null)),Ti._4(212992,null,0,E_.a,[Dc.a,Fc.a,Ti.x,Cc.l],null,{ionRefresh:"ionRefresh"}),(l()(),Ti._27(null,["\n    "])),(l()(),Ti._6(0,null,null,1,"ion-refresher-content",[],[[1,"state",0]],null,null,M_.b,M_.a)),Ti._4(114688,null,0,L_.a,[E_.a,kc.a],null,null),(l()(),Ti._27(null,["\n  "]))],function(l,n){l(n,1,0),l(n,4,0)},function(l,n){l(n,0,0,"inactive"!==Ti._20(n,1).state,Ti._20(n,1)._top);l(n,3,0,Ti._20(n,4).r.state)})}function $l(l){return Ti._29(0,[(l()(),Ti._6(0,null,null,9,"div",[["class","loading-wrapper"]],null,null,null,null,null)),(l()(),Ti._27(null,["\n      "])),(l()(),Ti._6(0,null,null,4,"div",[],null,null,null,null,null)),(l()(),Ti._27(null,["\n        "])),(l()(),Ti._6(0,null,null,1,"ion-spinner",[["item-start",""]],[[2,"spinner-paused",null]],null,null,q_.b,q_.a)),Ti._4(114688,null,0,R_.a,[kc.a,Ti.k,Ti.E],{name:[0,"name"]},null),(l()(),Ti._27(null,["\n      "])),(l()(),Ti._27(null,["\n      "])),(l()(),Ti._6(0,null,null,0,"div",[],[[8,"innerHTML",1]],null,null,null,null)),(l()(),Ti._27(null,["\n    "]))],function(l,n){l(n,5,0,n.component.load.spinner)},function(l,n){var u=n.component;l(n,4,0,Ti._20(n,5)._paused);l(n,8,0,u.load.content)})}function Gl(l){return Ti._29(0,[(l()(),Ti._6(0,null,null,1,"span",[],null,null,null,null,null)),(l()(),Ti._27(null,[""," "]))],null,function(l,n){l(n,1,0,n.context.$implicit.attrValue)})}function Kl(l){return Ti._29(0,[(l()(),Ti._6(0,null,null,25,"div",[["class","order-item"]],null,null,null,null,null)),(l()(),Ti._27(null,["\n        "])),(l()(),Ti._6(0,null,null,22,"dl",[],null,null,null,null,null)),(l()(),Ti._27(null,["\n          "])),(l()(),Ti._6(0,null,null,4,"dt",[],null,null,null,null,null)),(l()(),Ti._27(null,["\n            "])),(l()(),Ti._6(0,null,null,1,"img",[["class","my-picture"]],[[8,"src",4],[8,"alt",0]],null,null,null,null)),Ti._23(1),(l()(),Ti._27(null,["\n          "])),(l()(),Ti._27(null,["\n          "])),(l()(),Ti._6(0,null,null,1,"dd",[["class","product-title"]],null,null,null,null,null)),(l()(),Ti._27(null,["",""])),(l()(),Ti._27(null,["\n          "])),(l()(),Ti._6(0,null,null,4,"dd",[["class","sku-list"]],null,null,null,null,null)),(l()(),Ti._27(null,["\n            "])),(l()(),Ti._0(16777216,null,null,1,null,Gl)),Ti._4(802816,null,0,Zc.i,[Ti.O,Ti.K,Ti.r],{ngForOf:[0,"ngForOf"]},null),(l()(),Ti._27(null,["\n          "])),(l()(),Ti._27(null,["\n          "])),(l()(),Ti._6(0,null,null,1,"dd",[["class","price"]],null,null,null,null,null)),(l()(),Ti._27(null,["￥",""])),(l()(),Ti._27(null,["\n          "])),(l()(),Ti._6(0,null,null,1,"dd",[["class","count"]],null,null,null,null,null)),(l()(),Ti._27(null,["X",""])),(l()(),Ti._27(null,["\n        "])),(l()(),Ti._27(null,["\n      "]))],function(l,n){l(n,16,0,n.context.$implicit.productSkuDTO.attrValueList)},function(l,n){l(n,6,0,Ti._28(n,6,0,l(n,7,0,Ti._20(n.parent.parent,1),n.context.$implicit.productSkuDTO.fileSeq)),n.context.$implicit.productSkuDTO.productName);l(n,11,0,n.context.$implicit.productSkuDTO.productName);l(n,20,0,n.context.$implicit.unitPrice);l(n,23,0,n.context.$implicit.number)})}function Nl(l){return Ti._29(0,[(l()(),Ti._6(0,null,null,33,"div",[["class","order-items"]],null,null,null,null,null)),(l()(),Ti._27(null,["\n      "])),(l()(),Ti._6(0,null,null,15,"div",[["class","order-title"]],null,null,null,null,null)),(l()(),Ti._27(null,["\n        "])),(l()(),Ti._6(0,null,null,4,"h2",[],null,null,null,null,null)),(l()(),Ti._27(null,["订单编号：\n          "])),(l()(),Ti._6(0,null,null,1,"span",[],null,null,null,null,null)),(l()(),Ti._27(null,["",""])),(l()(),Ti._27(null,["\n        "])),(l()(),Ti._27(null,["\n        "])),(l()(),Ti._6(0,null,null,6,"span",[],null,null,null,null,null)),Ti._4(278528,null,0,Zc.h,[Ti.r,Ti.s,Ti.k,Ti.E],{ngClass:[0,"ngClass"]},null),Ti._23(1),Ti._23(1),Ti._22({auditStatus:0,pass:1,auditing:2}),(l()(),Ti._27(null,["",""])),Ti._23(1),(l()(),Ti._27(null,["\n      "])),(l()(),Ti._27(null,["\n\n      "])),(l()(),Ti._0(16777216,null,null,1,null,Kl)),Ti._4(802816,null,0,Zc.i,[Ti.O,Ti.K,Ti.r],{ngForOf:[0,"ngForOf"]},null),(l()(),Ti._27(null,["\n\n      "])),(l()(),Ti._6(0,null,null,10,"div",[["class","orderOperate"]],null,null,null,null,null)),(l()(),Ti._27(null,["\n        "])),(l()(),Ti._6(0,null,null,7,"dl",[],null,null,null,null,null)),(l()(),Ti._27(null,["\n          "])),(l()(),Ti._6(0,null,null,1,"dd",[["class","total"]],null,null,null,null,null)),(l()(),Ti._27(null,["","件商品，实付￥",""])),(l()(),Ti._27(null,["\n          "])),(l()(),Ti._6(0,null,null,1,"dd",[["class","member-phone"]],null,null,null,null,null)),(l()(),Ti._27(null,["会员手机：",""])),(l()(),Ti._27(null,["\n        "])),(l()(),Ti._27(null,["\n      "])),(l()(),Ti._27(null,["\n    "]))],function(l,n){l(n,11,0,l(n,14,0,!0,Ti._28(n,11,0,l(n,12,0,Ti._20(n.parent,0),n.context.$implicit.status)).pass,Ti._28(n,11,0,l(n,13,0,Ti._20(n.parent,0),n.context.$implicit.status)).audit));l(n,20,0,n.context.$implicit.itemList)},function(l,n){l(n,7,0,n.context.$implicit.orderId);l(n,15,0,Ti._28(n,15,0,l(n,16,0,Ti._20(n.parent,0),n.context.$implicit.status)).status);l(n,27,0,n.context.$implicit.totalNumber,n.context.$implicit.payAmount);l(n,30,0,n.context.$implicit.memberMobile)})}function Fl(l){return Ti._29(0,[(l()(),Ti._6(0,null,null,6,"div",[["class","no-data"]],null,null,null,null,null)),(l()(),Ti._27(null,["\n      "])),(l()(),Ti._6(0,null,null,0,"img",[["alt",""],["src","./assets/image/nodata.png"]],null,null,null,null,null)),(l()(),Ti._27(null,["\n      "])),(l()(),Ti._6(0,null,null,1,"p",[],null,null,null,null,null)),(l()(),Ti._27(null,["空空如也"])),(l()(),Ti._27(null,["\n    "]))],null,null)}function Ul(l){return Ti._29(0,[(l()(),Ti._6(0,null,null,4,"div",[["class","btn-noMore"]],null,null,null,null,null)),(l()(),Ti._27(null,["\n      "])),(l()(),Ti._6(0,null,null,1,"span",[],null,null,null,null,null)),(l()(),Ti._27(null,["—— 没有更多信息了 ——"])),(l()(),Ti._27(null,["\n    "]))],null,null)}function zl(l){return Ti._29(0,[(l()(),Ti._6(0,null,null,10,"div",[["class","request-defeat"]],null,null,null,null,null)),(l()(),Ti._27(null,["\n      "])),(l()(),Ti._6(0,null,null,0,"img",[["alt",""],["src","./assets/image/requestDefeat.png"]],null,null,null,null,null)),(l()(),Ti._27(null,["\n      "])),(l()(),Ti._6(0,null,null,1,"p",[],null,null,null,null,null)),(l()(),Ti._27(null,["啊哦！页面走丢了"])),(l()(),Ti._27(null,["\n      "])),(l()(),Ti._6(0,null,null,2,"button",[["class","btn-request-defeat"],["full",""],["ion-button",""]],null,[[null,"touchstart"]],function(l,n,u){var t=!0;if("touchstart"===n){t=!1!==l.component.requestDefeatRefresh()&&t}return t},t_.b,t_.a)),Ti._4(1097728,null,0,e_.a,[[8,""],kc.a,Ti.k,Ti.E],{full:[0,"full"]},null),(l()(),Ti._27(0,["\n        刷新再找一找\n      "])),(l()(),Ti._27(null,["\n    "]))],function(l,n){l(n,8,0,"")},null)}function Vl(l){return Ti._29(0,[(l()(),Ti._6(0,null,null,5,"ion-infinite-scroll",[],null,[[null,"ionInfinite"]],function(l,n,u){var t=!0;if("ionInfinite"===n){t=!1!==l.component.infiniteGetSelfGiftList(u)&&t}return t},null,null)),Ti._4(1196032,null,0,$_.a,[Fc.a,Ti.x,Ti.k,Tc.a],null,{ionInfinite:"ionInfinite"}),(l()(),Ti._27(null,["\n      "])),(l()(),Ti._6(0,null,null,1,"ion-infinite-scroll-content",[["loadingText","加载更多..."]],[[1,"state",0]],null,null,G_.b,G_.a)),Ti._4(114688,null,0,K_.a,[$_.a,kc.a],{loadingText:[0,"loadingText"]},null),(l()(),Ti._27(null,["\n    "]))],function(l,n){l(n,4,0,"加载更多...")},function(l,n){l(n,3,0,Ti._20(n,4).inf.state)})}function Bl(l){return Ti._29(0,[Ti._21(0,bs,[]),Ti._21(0,Ds,[]),(l()(),Ti._6(0,null,null,10,"ion-header",[],null,null,null,null,null)),Ti._4(16384,null,0,Lc.a,[kc.a,Ti.k,Ti.E,[2,Ic.a]],null,null),(l()(),Ti._27(null,["\n  "])),(l()(),Ti._6(0,null,null,6,"ion-navbar",[["class","toolbar"]],[[8,"hidden",0],[2,"statusbar-padding",null]],null,null,qc.b,qc.a)),Ti._4(49152,null,0,Rc.a,[xc.a,[2,Ic.a],[2,Oc.a],kc.a,Ti.k,Ti.E],null,null),(l()(),Ti._27(3,["\n    "])),(l()(),Ti._6(0,null,3,2,"ion-title",[["text-center",""]],null,null,null,$c.b,$c.a)),Ti._4(49152,null,0,Gc.a,[kc.a,Ti.k,Ti.E,[2,Kc.a],[2,Rc.a]],null,null),(l()(),Ti._27(0,["已审核取消订单"])),(l()(),Ti._27(3,["\n  "])),(l()(),Ti._27(null,["\n  \n"])),(l()(),Ti._27(null,["\n"])),(l()(),Ti._6(0,null,null,27,"ion-content",[],[[2,"statusbar-padding",null],[2,"has-refresher",null]],[["window","resize"]],function(l,n,u){var t=!0;if("window:resize"===n){t=!1!==Ti._20(l,15).resize()&&t}return t},Nc.b,Nc.a)),Ti._4(4374528,null,0,Fc.a,[kc.a,Dc.a,Tc.a,Ti.k,Ti.E,xc.a,Uc.a,Ti.x,[2,Ic.a],[2,Oc.a]],null,null),(l()(),Ti._27(1,["\n  "])),(l()(),Ti._0(16777216,null,2,1,null,Rl)),Ti._4(16384,null,0,Zc.j,[Ti.O,Ti.K],{ngIf:[0,"ngIf"]},null),(l()(),Ti._27(1,["\n  "])),(l()(),Ti._6(0,null,1,20,"div",[["class","order-list"]],null,null,null,null,null)),(l()(),Ti._27(null,["\n    "])),(l()(),Ti._27(null,["\n    "])),(l()(),Ti._0(16777216,null,null,1,null,$l)),Ti._4(16384,null,0,Zc.j,[Ti.O,Ti.K],{ngIf:[0,"ngIf"]},null),(l()(),Ti._27(null,["\n    "])),(l()(),Ti._0(16777216,null,null,1,null,Nl)),Ti._4(802816,null,0,Zc.i,[Ti.O,Ti.K,Ti.r],{ngForOf:[0,"ngForOf"]},null),(l()(),Ti._27(null,["\n\n    "])),(l()(),Ti._0(16777216,null,null,1,null,Fl)),Ti._4(16384,null,0,Zc.j,[Ti.O,Ti.K],{ngIf:[0,"ngIf"]},null),(l()(),Ti._27(null,["\n    "])),(l()(),Ti._0(16777216,null,null,1,null,Ul)),Ti._4(16384,null,0,Zc.j,[Ti.O,Ti.K],{ngIf:[0,"ngIf"]},null),(l()(),Ti._27(null,["\n    "])),(l()(),Ti._0(16777216,null,null,1,null,zl)),Ti._4(16384,null,0,Zc.j,[Ti.O,Ti.K],{ngIf:[0,"ngIf"]},null),(l()(),Ti._27(null,["\n    "])),(l()(),Ti._0(16777216,null,null,1,null,Vl)),Ti._4(16384,null,0,Zc.j,[Ti.O,Ti.K],{ngIf:[0,"ngIf"]},null),(l()(),Ti._27(null,["\n\n  "])),(l()(),Ti._27(1,["\n\n"]))],function(l,n){var u=n.component;l(n,18,0,!u.loadingShow);l(n,24,0,u.loadingShow);l(n,27,0,u.auditCancelorderArray);l(n,30,0,u.noData);l(n,33,0,u.showNoMore);l(n,36,0,u.requestDefeat);l(n,39,0,!u.showNoMore&&u.showInfinite)},function(l,n){l(n,5,0,Ti._20(n,6)._hidden,Ti._20(n,6)._sbPadding);l(n,14,0,Ti._20(n,15).statusbarPadding,Ti._20(n,15)._hasRefresher)})}function Hl(l){return Ti._29(0,[(l()(),Ti._6(0,null,null,5,"ion-refresher",[],[[2,"refresher-active",null],[4,"top",null]],[[null,"ionRefresh"]],function(l,n,u){var t=!0;if("ionRefresh"===n){t=!1!==l.component.doRefresh(u)&&t}return t},null,null)),Ti._4(212992,null,0,E_.a,[Dc.a,Fc.a,Ti.x,Cc.l],null,{ionRefresh:"ionRefresh"}),(l()(),Ti._27(null,["\n    "])),(l()(),Ti._6(0,null,null,1,"ion-refresher-content",[],[[1,"state",0]],null,null,M_.b,M_.a)),Ti._4(114688,null,0,L_.a,[E_.a,kc.a],null,null),(l()(),Ti._27(null,["\n  "]))],function(l,n){l(n,1,0),l(n,4,0)},function(l,n){l(n,0,0,"inactive"!==Ti._20(n,1).state,Ti._20(n,1)._top);l(n,3,0,Ti._20(n,4).r.state)})}function Yl(l){return Ti._29(0,[(l()(),Ti._6(0,null,null,9,"div",[["class","loading-wrapper"]],null,null,null,null,null)),(l()(),Ti._27(null,["\n      "])),(l()(),Ti._6(0,null,null,4,"div",[],null,null,null,null,null)),(l()(),Ti._27(null,["\n        "])),(l()(),Ti._6(0,null,null,1,"ion-spinner",[["item-start",""]],[[2,"spinner-paused",null]],null,null,q_.b,q_.a)),Ti._4(114688,null,0,R_.a,[kc.a,Ti.k,Ti.E],{name:[0,"name"]},null),(l()(),Ti._27(null,["\n      "])),(l()(),Ti._27(null,["\n      "])),(l()(),Ti._6(0,null,null,0,"div",[],[[8,"innerHTML",1]],null,null,null,null)),(l()(),Ti._27(null,["\n    "]))],function(l,n){l(n,5,0,n.component.load.spinner)},function(l,n){var u=n.component;l(n,4,0,Ti._20(n,5)._paused);l(n,8,0,u.load.content)})}function Wl(l){return Ti._29(0,[(l()(),Ti._6(0,null,null,1,"span",[],null,null,null,null,null)),(l()(),Ti._27(null,[""," "]))],null,function(l,n){l(n,1,0,n.context.$implicit.attrValue)})}function Xl(l){return Ti._29(0,[(l()(),Ti._6(0,null,null,60,"div",[["class","order-items"]],null,[[null,"click"]],function(l,n,u){var t=!0;if("click"===n){t=!1!==l.component.goReturnedDetail(l.context.index)&&t}return t},null,null)),(l()(),Ti._27(null,["\n\t\t\t"])),(l()(),Ti._6(0,null,null,15,"div",[["class","order-title"]],null,null,null,null,null)),(l()(),Ti._27(null,["\n          "])),(l()(),Ti._6(0,null,null,4,"h2",[],null,null,null,null,null)),(l()(),Ti._27(null,["订单编号：\n            "])),(l()(),Ti._6(0,null,null,1,"span",[],null,null,null,null,null)),(l()(),Ti._27(null,["",""])),(l()(),Ti._27(null,["\n          "])),(l()(),Ti._27(null,["\n          "])),(l()(),Ti._6(0,null,null,6,"span",[],null,null,null,null,null)),Ti._4(278528,null,0,Zc.h,[Ti.r,Ti.s,Ti.k,Ti.E],{ngClass:[0,"ngClass"]},null),Ti._23(1),Ti._23(1),Ti._22({auditStatus:0,pass:1,auditing:2}),(l()(),Ti._27(null,["",""])),Ti._23(1),(l()(),Ti._27(null,["\n        "])),(l()(),Ti._27(null,["\n    \n        "])),(l()(),Ti._6(0,null,null,25,"div",[["class","order-item"]],null,null,null,null,null)),(l()(),Ti._27(null,["\n          "])),(l()(),Ti._6(0,null,null,22,"dl",[],null,null,null,null,null)),(l()(),Ti._27(null,["\n            "])),(l()(),Ti._6(0,null,null,4,"dt",[],null,null,null,null,null)),(l()(),Ti._27(null,["\n              "])),(l()(),Ti._6(0,null,null,1,"img",[["class","my-picture"]],[[8,"src",4],[8,"alt",0]],null,null,null,null)),Ti._23(1),(l()(),Ti._27(null,["\n            "])),(l()(),Ti._27(null,["\n            "])),(l()(),Ti._6(0,null,null,1,"dd",[["class","product-title"]],null,null,null,null,null)),(l()(),Ti._27(null,["",""])),(l()(),Ti._27(null,["\n            "])),(l()(),Ti._6(0,null,null,4,"dd",[["class","sku-list"]],null,null,null,null,null)),(l()(),Ti._27(null,["\n              "])),(l()(),Ti._0(16777216,null,null,1,null,Wl)),Ti._4(802816,null,0,Zc.i,[Ti.O,Ti.K,Ti.r],{ngForOf:[0,"ngForOf"]},null),(l()(),Ti._27(null,["\n            "])),(l()(),Ti._27(null,["\n            "])),(l()(),Ti._6(0,null,null,1,"dd",[["class","price"]],null,null,null,null,null)),(l()(),Ti._27(null,["￥",""])),(l()(),Ti._27(null,["\n            "])),(l()(),Ti._6(0,null,null,1,"dd",[["class","count"]],null,null,null,null,null)),(l()(),Ti._27(null,["X",""])),(l()(),Ti._27(null,["\n          "])),(l()(),Ti._27(null,["\n        "])),(l()(),Ti._27(null,["\n\t\t\t\n\t\t\t"])),(l()(),Ti._6(0,null,null,13,"div",[["class","orderOperate"]],null,null,null,null,null)),(l()(),Ti._27(null,["\n\t\t\t\t"])),(l()(),Ti._6(0,null,null,10,"dl",[],null,null,null,null,null)),(l()(),Ti._27(null,["\n\t\t\t\t\t"])),(l()(),Ti._6(0,null,null,1,"dt",[],null,null,null,null,null)),(l()(),Ti._27(null,["\n\t\t\t\t\t\t\n\t\t\t\t\t"])),(l()(),Ti._27(null,["\n\t\t\t\t\t"])),(l()(),Ti._6(0,null,null,1,"dd",[["class","total"]],null,null,null,null,null)),(l()(),Ti._27(null,["退货数量: ",""])),(l()(),Ti._27(null,["\n\t\t\t\t\t"])),(l()(),Ti._6(0,null,null,1,"dd",[["class","member-phone"]],null,null,null,null,null)),(l()(),Ti._27(null,["会员手机：",""])),(l()(),Ti._27(null,["\n\t\t\t\t"])),(l()(),Ti._27(null,["\n\t\t\t"])),(l()(),Ti._27(null,["\n    "]))],function(l,n){l(n,11,0,l(n,14,0,!0,Ti._28(n,11,0,l(n,12,0,Ti._20(n.parent,0),n.context.$implicit.status)).pass,Ti._28(n,11,0,l(n,13,0,Ti._20(n.parent,0),n.context.$implicit.status)).audit));l(n,35,0,n.context.$implicit.productSkuDTO.attrValueList)},function(l,n){l(n,7,0,n.context.$implicit.orderId);l(n,15,0,Ti._28(n,15,0,l(n,16,0,Ti._20(n.parent,0),n.context.$implicit.status)).status);l(n,25,0,Ti._28(n,25,0,l(n,26,0,Ti._20(n.parent,1),n.context.$implicit.productSkuDTO.fileSeq)),n.context.$implicit.productSkuDTO.productName);l(n,30,0,n.context.$implicit.productSkuDTO.productName);l(n,39,0,n.context.$implicit.unitPrice);l(n,42,0,n.context.$implicit.number);l(n,54,0,n.context.$implicit.number);l(n,57,0,n.context.$implicit.mobile)})}function Jl(l){return Ti._29(0,[(l()(),Ti._6(0,null,null,6,"div",[["class","no-data"]],null,null,null,null,null)),(l()(),Ti._27(null,["\n      "])),(l()(),Ti._6(0,null,null,0,"img",[["alt",""],["src","./assets/image/nodata.png"]],null,null,null,null,null)),(l()(),Ti._27(null,["\n      "])),(l()(),Ti._6(0,null,null,1,"p",[],null,null,null,null,null)),(l()(),Ti._27(null,["空空如也"])),(l()(),Ti._27(null,["\n    "]))],null,null)}function Ql(l){return Ti._29(0,[(l()(),Ti._6(0,null,null,4,"div",[["class","btn-noMore"]],null,null,null,null,null)),(l()(),Ti._27(null,["\n      "])),(l()(),Ti._6(0,null,null,1,"span",[],null,null,null,null,null)),(l()(),Ti._27(null,["—— 没有更多信息了 ——"])),(l()(),Ti._27(null,["\n    "]))],null,null)}function Zl(l){return Ti._29(0,[(l()(),Ti._6(0,null,null,10,"div",[["class","request-defeat"]],null,null,null,null,null)),(l()(),Ti._27(null,["\n      "])),(l()(),Ti._6(0,null,null,0,"img",[["alt",""],["src","./assets/image/requestDefeat.png"]],null,null,null,null,null)),(l()(),Ti._27(null,["\n      "])),(l()(),Ti._6(0,null,null,1,"p",[],null,null,null,null,null)),(l()(),Ti._27(null,["啊哦！页面走丢了"])),(l()(),Ti._27(null,["\n      "])),(l()(),Ti._6(0,null,null,2,"button",[["class","btn-request-defeat"],["full",""],["ion-button",""]],null,[[null,"touchstart"]],function(l,n,u){var t=!0;if("touchstart"===n){t=!1!==l.component.requestDefeatRefresh()&&t}return t},t_.b,t_.a)),Ti._4(1097728,null,0,e_.a,[[8,""],kc.a,Ti.k,Ti.E],{full:[0,"full"]},null),(l()(),Ti._27(0,["\n        刷新再找一找\n      "])),(l()(),Ti._27(null,["\n    "]))],function(l,n){l(n,8,0,"")},null)}function ln(l){return Ti._29(0,[(l()(),Ti._6(0,null,null,5,"ion-infinite-scroll",[],null,[[null,"ionInfinite"]],function(l,n,u){var t=!0;if("ionInfinite"===n){t=!1!==l.component.infiniteGetSelfGiftList(u)&&t}return t},null,null)),Ti._4(1196032,null,0,$_.a,[Fc.a,Ti.x,Ti.k,Tc.a],null,{ionInfinite:"ionInfinite"}),(l()(),Ti._27(null,["\n      "])),(l()(),Ti._6(0,null,null,1,"ion-infinite-scroll-content",[["loadingText","加载更多..."]],[[1,"state",0]],null,null,G_.b,G_.a)),Ti._4(114688,null,0,K_.a,[$_.a,kc.a],{loadingText:[0,"loadingText"]},null),(l()(),Ti._27(null,["\n    "]))],function(l,n){l(n,4,0,"加载更多...")},function(l,n){l(n,3,0,Ti._20(n,4).inf.state)})}function nn(l){return Ti._29(0,[Ti._21(0,vs,[]),Ti._21(0,Ds,[]),(l()(),Ti._6(0,null,null,10,"ion-header",[],null,null,null,null,null)),Ti._4(16384,null,0,Lc.a,[kc.a,Ti.k,Ti.E,[2,Ic.a]],null,null),(l()(),Ti._27(null,["\n  "])),(l()(),Ti._6(0,null,null,6,"ion-navbar",[["class","toolbar"]],[[8,"hidden",0],[2,"statusbar-padding",null]],null,null,qc.b,qc.a)),Ti._4(49152,null,0,Rc.a,[xc.a,[2,Ic.a],[2,Oc.a],kc.a,Ti.k,Ti.E],null,null),(l()(),Ti._27(3,["\n    "])),(l()(),Ti._6(0,null,3,2,"ion-title",[["text-center",""]],null,null,null,$c.b,$c.a)),Ti._4(49152,null,0,Gc.a,[kc.a,Ti.k,Ti.E,[2,Kc.a],[2,Rc.a]],null,null),(l()(),Ti._27(0,["已处理退货订单"])),(l()(),Ti._27(3,["\n  "])),(l()(),Ti._27(null,["\n"])),(l()(),Ti._27(null,["\n"])),(l()(),Ti._6(0,null,null,27,"ion-content",[],[[2,"statusbar-padding",null],[2,"has-refresher",null]],[["window","resize"]],function(l,n,u){var t=!0;if("window:resize"===n){t=!1!==Ti._20(l,15).resize()&&t}return t},Nc.b,Nc.a)),Ti._4(4374528,null,0,Fc.a,[kc.a,Dc.a,Tc.a,Ti.k,Ti.E,xc.a,Uc.a,Ti.x,[2,Ic.a],[2,Oc.a]],null,null),(l()(),Ti._27(1,["\n  "])),(l()(),Ti._0(16777216,null,2,1,null,Hl)),Ti._4(16384,null,0,Zc.j,[Ti.O,Ti.K],{ngIf:[0,"ngIf"]},null),(l()(),Ti._27(1,["\n\t"])),(l()(),Ti._6(0,null,1,20,"div",[["class","order-list"]],null,null,null,null,null)),(l()(),Ti._27(null,["\n    "])),(l()(),Ti._27(null,["\n    "])),(l()(),Ti._0(16777216,null,null,1,null,Yl)),Ti._4(16384,null,0,Zc.j,[Ti.O,Ti.K],{ngIf:[0,"ngIf"]},null),(l()(),Ti._27(null,["\n\t\t"])),(l()(),Ti._0(16777216,null,null,1,null,Xl)),Ti._4(802816,null,0,Zc.i,[Ti.O,Ti.K,Ti.r],{ngForOf:[0,"ngForOf"]},null),(l()(),Ti._27(null,["\n    \n\t\t"])),(l()(),Ti._0(16777216,null,null,1,null,Jl)),Ti._4(16384,null,0,Zc.j,[Ti.O,Ti.K],{ngIf:[0,"ngIf"]},null),(l()(),Ti._27(null,["\n    "])),(l()(),Ti._0(16777216,null,null,1,null,Ql)),Ti._4(16384,null,0,Zc.j,[Ti.O,Ti.K],{ngIf:[0,"ngIf"]},null),(l()(),Ti._27(null,["\n    "])),(l()(),Ti._0(16777216,null,null,1,null,Zl)),Ti._4(16384,null,0,Zc.j,[Ti.O,Ti.K],{ngIf:[0,"ngIf"]},null),(l()(),Ti._27(null,["\n    "])),(l()(),Ti._0(16777216,null,null,1,null,ln)),Ti._4(16384,null,0,Zc.j,[Ti.O,Ti.K],{ngIf:[0,"ngIf"]},null),(l()(),Ti._27(null,["\n\t"])),(l()(),Ti._27(1,["\n\n"])),(l()(),Ti._27(null,["\n"]))],function(l,n){var u=n.component;l(n,18,0,!u.loadingShow);l(n,24,0,u.loadingShow);l(n,27,0,u.auditReturnorderArray);l(n,30,0,u.noData);l(n,33,0,u.showNoMore);l(n,36,0,u.requestDefeat);l(n,39,0,!u.showNoMore&&u.showInfinite)},function(l,n){l(n,5,0,Ti._20(n,6)._hidden,Ti._20(n,6)._sbPadding);l(n,14,0,Ti._20(n,15).statusbarPadding,Ti._20(n,15)._hasRefresher)})}function un(l){return Ti._29(0,[(l()(),Ti._6(0,null,null,9,"div",[["class","loading-wrapper"]],null,null,null,null,null)),(l()(),Ti._27(null,["\n\t\t\t"])),(l()(),Ti._6(0,null,null,4,"div",[],null,null,null,null,null)),(l()(),Ti._27(null,["\n\t\t\t\t"])),(l()(),Ti._6(0,null,null,1,"ion-spinner",[["item-start",""]],[[2,"spinner-paused",null]],null,null,q_.b,q_.a)),Ti._4(114688,null,0,R_.a,[kc.a,Ti.k,Ti.E],{name:[0,"name"]},null),(l()(),Ti._27(null,["\n\t\t\t"])),(l()(),Ti._27(null,["\n\t\t\t"])),(l()(),Ti._6(0,null,null,0,"div",[],[[8,"innerHTML",1]],null,null,null,null)),(l()(),Ti._27(null,["\n\t\t"]))],function(l,n){l(n,5,0,n.component.load.spinner)},function(l,n){var u=n.component;l(n,4,0,Ti._20(n,5)._paused);l(n,8,0,u.load.content)})}function tn(l){return Ti._29(0,[(l()(),Ti._6(0,null,null,1,"span",[],null,null,null,null,null)),(l()(),Ti._27(null,[" "," "]))],null,function(l,n){l(n,1,0,n.context.$implicit.attrValue)})}function en(l){return Ti._29(0,[(l()(),Ti._6(0,null,null,1,"span",[],null,null,null,null,null)),(l()(),Ti._27(null,["门店"]))],null,null)}function an(l){return Ti._29(0,[(l()(),Ti._6(0,null,null,1,"span",[],null,null,null,null,null)),(l()(),Ti._27(null,["快递"]))],null,null)}function on(l){return Ti._29(0,[(l()(),Ti._6(0,null,null,1,"span",[],null,null,null,null,null)),(l()(),Ti._27(null,["其他"]))],null,null)}function rn(l){return Ti._29(0,[(l()(),Ti._6(0,null,null,1,"img",[["alt",""]],[[8,"src",4]],null,null,null,null)),Ti._23(1)],null,function(l,n){l(n,0,0,Ti._28(n,0,0,l(n,1,0,Ti._20(n.parent.parent,0),n.context.$implicit)))})}function sn(l){return Ti._29(0,[(l()(),Ti._6(0,null,null,4,"li",[["class","img-list"]],null,null,null,null,null)),(l()(),Ti._27(null,["\n\t\t\t\t\t"])),(l()(),Ti._0(16777216,null,null,1,null,rn)),Ti._4(802816,null,0,Zc.i,[Ti.O,Ti.K,Ti.r],{ngForOf:[0,"ngForOf"]},null),(l()(),Ti._27(null,["\n\t\t\t\t"]))],function(l,n){l(n,3,0,n.component.imageArray)},null)}function cn(l){return Ti._29(0,[Ti._21(0,Ds,[]),Ti._21(0,js,[]),(l()(),Ti._6(0,null,null,10,"ion-header",[],null,null,null,null,null)),Ti._4(16384,null,0,Lc.a,[kc.a,Ti.k,Ti.E,[2,Ic.a]],null,null),(l()(),Ti._27(null,["\n  "])),(l()(),Ti._6(0,null,null,6,"ion-navbar",[["class","toolbar"]],[[8,"hidden",0],[2,"statusbar-padding",null]],null,null,qc.b,qc.a)),Ti._4(49152,null,0,Rc.a,[xc.a,[2,Ic.a],[2,Oc.a],kc.a,Ti.k,Ti.E],null,null),(l()(),Ti._27(3,["\n    "])),(l()(),Ti._6(0,null,3,2,"ion-title",[["text-center",""]],null,null,null,$c.b,$c.a)),Ti._4(49152,null,0,Gc.a,[kc.a,Ti.k,Ti.E,[2,Kc.a],[2,Rc.a]],null,null),(l()(),Ti._27(0,["退货详情"])),(l()(),Ti._27(3,["\n  "])),(l()(),Ti._27(null,["\n"])),(l()(),Ti._27(null,["\n"])),(l()(),Ti._6(0,null,null,110,"ion-content",[],[[2,"statusbar-padding",null],[2,"has-refresher",null]],[["window","resize"]],function(l,n,u){var t=!0;if("window:resize"===n){t=!1!==Ti._20(l,15).resize()&&t}return t},Nc.b,Nc.a)),Ti._4(4374528,null,0,Fc.a,[kc.a,Dc.a,Tc.a,Ti.k,Ti.E,xc.a,Uc.a,Ti.x,[2,Ic.a],[2,Oc.a]],null,null),(l()(),Ti._27(1,["\n\t"])),(l()(),Ti._6(0,null,1,95,"div",[["class","order-list"]],null,null,null,null,null)),(l()(),Ti._27(null,["\n\t\t"])),(l()(),Ti._27(null,["\n\t\t"])),(l()(),Ti._0(16777216,null,null,1,null,un)),Ti._4(16384,null,0,Zc.j,[Ti.O,Ti.K],{ngIf:[0,"ngIf"]},null),(l()(),Ti._27(null,["\n\t\t"])),(l()(),Ti._6(0,null,null,51,"div",[["class","order-items"]],null,null,null,null,null)),(l()(),Ti._27(null,["\n\t\t\t"])),(l()(),Ti._6(0,null,null,9,"div",[["class","order-title"]],null,null,null,null,null)),(l()(),Ti._27(null,["\n\t\t\t\t"])),(l()(),Ti._6(0,null,null,3,"h2",[],null,null,null,null,null)),(l()(),Ti._27(null,["订单编号："])),(l()(),Ti._6(0,null,null,1,"span",[],null,null,null,null,null)),(l()(),Ti._27(null,["",""])),(l()(),Ti._27(null,["\n\t\t\t\t"])),(l()(),Ti._6(0,null,null,1,"span",[["class","auditStatus"]],null,null,null,null,null)),(l()(),Ti._27(null,["申请审核中"])),(l()(),Ti._27(null,["\n\t\t\t"])),(l()(),Ti._27(null,["\n\t\t\t"])),(l()(),Ti._6(0,null,null,25,"div",[["class","order-item"]],null,null,null,null,null)),(l()(),Ti._27(null,["\n\t\t\t  "])),(l()(),Ti._6(0,null,null,22,"dl",[],null,null,null,null,null)),(l()(),Ti._27(null,["\n\t\t\t    "])),(l()(),Ti._6(0,null,null,4,"dt",[],null,null,null,null,null)),(l()(),Ti._27(null,["\n\t\t\t      "])),(l()(),Ti._6(0,null,null,1,"img",[["class","my-picture"]],[[8,"src",4],[8,"alt",0]],null,null,null,null)),Ti._23(1),(l()(),Ti._27(null,["\n\t\t\t    "])),(l()(),Ti._27(null,["\n\t\t\t    "])),(l()(),Ti._6(0,null,null,1,"dd",[["class","product-title"]],null,null,null,null,null)),(l()(),Ti._27(null,["",""])),(l()(),Ti._27(null,["\n\t\t\t    "])),(l()(),Ti._6(0,null,null,4,"dd",[["class","sku-list"]],null,null,null,null,null)),(l()(),Ti._27(null,["\n\t\t\t      "])),(l()(),Ti._0(16777216,null,null,1,null,tn)),Ti._4(802816,null,0,Zc.i,[Ti.O,Ti.K,Ti.r],{ngForOf:[0,"ngForOf"]},null),(l()(),Ti._27(null,["\n\t\t\t    "])),(l()(),Ti._27(null,["\n\t\t\t    "])),(l()(),Ti._6(0,null,null,1,"dd",[["class","price"]],null,null,null,null,null)),(l()(),Ti._27(null,["￥",""])),(l()(),Ti._27(null,["\n\t\t\t    "])),(l()(),Ti._6(0,null,null,1,"dd",[["class","count"]],null,null,null,null,null)),(l()(),Ti._27(null,["X",""])),(l()(),Ti._27(null,["\n\t\t\t  "])),(l()(),Ti._27(null,["\n\t\t\t"])),(l()(),Ti._27(null,["\n\t\t\t\n\t\t\t"])),(l()(),Ti._6(0,null,null,10,"div",[["class","orderOperate"]],null,null,null,null,null)),(l()(),Ti._27(null,["\n\t\t\t\t"])),(l()(),Ti._6(0,null,null,7,"dl",[],null,null,null,null,null)),(l()(),Ti._27(null,["\n\t\t\t\t\t"])),(l()(),Ti._6(0,null,null,1,"dt",[],null,null,null,null,null)),(l()(),Ti._27(null,["\n\t\t\t\t\t"])),(l()(),Ti._27(null,["\n\t\t\t\t\t"])),(l()(),Ti._6(0,null,null,1,"dd",[["class","total"]],null,null,null,null,null)),(l()(),Ti._27(null,["共","件商品，实付￥",""])),(l()(),Ti._27(null,["\n\t\t\t\t"])),(l()(),Ti._27(null,["\n\t\t\t"])),(l()(),Ti._27(null,["\n\t\t"])),(l()(),Ti._27(null,["\n\n\t\t"])),(l()(),Ti._6(0,null,null,35,"div",[["class","return-detail"]],null,null,null,null,null)),(l()(),Ti._27(null,["\n\t\t\t"])),(l()(),Ti._6(0,null,null,32,"ul",[],null,null,null,null,null)),(l()(),Ti._27(null,["\n\t\t\t\t"])),(l()(),Ti._6(0,null,null,1,"li",[],null,null,null,null,null)),(l()(),Ti._27(null,["退货数量：",""])),(l()(),Ti._27(null,["\n\t\t\t\t"])),(l()(),Ti._6(0,null,null,1,"li",[],null,null,null,null,null)),(l()(),Ti._27(null,["联系方式：",""])),(l()(),Ti._27(null,[" \n\t\t\t\t"])),(l()(),Ti._6(0,null,null,10,"li",[],null,null,null,null,null)),(l()(),Ti._27(null,["退货方式：\n          "])),(l()(),Ti._0(16777216,null,null,1,null,en)),Ti._4(16384,null,0,Zc.j,[Ti.O,Ti.K],{ngIf:[0,"ngIf"]},null),(l()(),Ti._27(null,["\n          "])),(l()(),Ti._0(16777216,null,null,1,null,an)),Ti._4(16384,null,0,Zc.j,[Ti.O,Ti.K],{ngIf:[0,"ngIf"]},null),(l()(),Ti._27(null,["\n          "])),(l()(),Ti._0(16777216,null,null,1,null,on)),Ti._4(16384,null,0,Zc.j,[Ti.O,Ti.K],{ngIf:[0,"ngIf"]},null),(l()(),Ti._27(null,["\n        "])),(l()(),Ti._27(null,["\n\t\t\t\t"])),(l()(),Ti._6(0,null,null,1,"li",[],null,null,null,null,null)),(l()(),Ti._27(null,["是否有发票：",""])),(l()(),Ti._27(null,["\n\t\t\t\t"])),(l()(),Ti._6(0,null,null,2,"li",[],null,null,null,null,null)),(l()(),Ti._27(null,["退货原因：",""])),Ti._23(1),(l()(),Ti._27(null,["\n\t\t\t\t"])),(l()(),Ti._6(0,null,null,1,"li",[],null,null,null,null,null)),(l()(),Ti._27(null,["问题描述：",""])),(l()(),Ti._27(null,["\n\t\t\t\t"])),(l()(),Ti._0(16777216,null,null,1,null,sn)),Ti._4(16384,null,0,Zc.j,[Ti.O,Ti.K],{ngIf:[0,"ngIf"]},null),(l()(),Ti._27(null,["\n\t\t\t"])),(l()(),Ti._27(null,["\n\t\t"])),(l()(),Ti._27(null,["\n\t"])),(l()(),Ti._27(1,["\n\n\t"])),(l()(),Ti._6(0,null,1,9,"div",[["class","btn-list"]],null,null,null,null,null)),(l()(),Ti._27(null,["\n\t\t"])),(l()(),Ti._6(0,null,null,2,"button",[["class","btn-update"],["ion-button",""],["outline",""]],null,[[null,"touchstart"]],function(l,n,u){var t=!0;if("touchstart"===n){t=!1!==l.component.refuseReturn()&&t}return t},t_.b,t_.a)),Ti._4(1097728,null,0,e_.a,[[8,""],kc.a,Ti.k,Ti.E],{outline:[0,"outline"]},null),(l()(),Ti._27(0,["拒绝"])),(l()(),Ti._27(null,["\n\t\t"])),(l()(),Ti._6(0,null,null,2,"button",[["class","order-again"],["ion-button",""]],null,[[null,"touchstart"]],function(l,n,u){var t=!0;if("touchstart"===n){t=!1!==l.component.agreeReturn()&&t}return t},t_.b,t_.a)),Ti._4(1097728,null,0,e_.a,[[8,""],kc.a,Ti.k,Ti.E],null,null),(l()(),Ti._27(0,["同意"])),(l()(),Ti._27(null,["\n\t"])),(l()(),Ti._27(1,["\n\n"])),(l()(),Ti._27(null,["\n"]))],function(l,n){var u=n.component;l(n,21,0,u.loadingShow);l(n,52,0,u.returnDetail.itemProductSkuDTO.productSkuDTO.attrValueList);l(n,89,0,1==u.returnDetail.orderReturn.returnType);l(n,92,0,2==u.returnDetail.orderReturn.returnType);l(n,95,0,0==u.returnDetail.orderReturn.returnType);l(n,109,0,u.imageArray);l(n,117,0,"")},function(l,n){var u=n.component;l(n,5,0,Ti._20(n,6)._hidden,Ti._20(n,6)._sbPadding);l(n,14,0,Ti._20(n,15).statusbarPadding,Ti._20(n,15)._hasRefresher);l(n,30,0,u.returnDetail.orderReturn.returnOrderId);l(n,42,0,Ti._28(n,42,0,l(n,43,0,Ti._20(n,0),u.returnDetail.itemProductSkuDTO.productSkuDTO.fileSeq)),u.returnDetail.itemProductSkuDTO.productSkuDTO.productName);l(n,47,0,u.returnDetail.itemProductSkuDTO.productSkuDTO.productName);l(n,56,0,u.returnDetail.itemProductSkuDTO.unitPrice);l(n,59,0,u.returnDetail.itemProductSkuDTO.number);l(n,71,0,u.returnDetail.orderReturn.number,u.returnDetail.returnAmount);l(n,81,0,u.returnDetail.orderReturn.number);l(n,84,0,u.returnDetail.orderReturn.mobile);l(n,99,0,1==u.returnDetail.orderReturn.invoiced?"有":"无");l(n,102,0,Ti._28(n,102,0,l(n,103,0,Ti._20(n,1),u.returnDetail.orderReturn.reasonType)));l(n,106,0,u.returnDetail.orderReturn.detail)})}function _n(l){return Ti._29(0,[(l()(),Ti._6(0,null,null,9,"div",[["class","loading-wrapper"]],null,null,null,null,null)),(l()(),Ti._27(null,["\n      "])),(l()(),Ti._6(0,null,null,4,"div",[],null,null,null,null,null)),(l()(),Ti._27(null,["\n        "])),(l()(),Ti._6(0,null,null,1,"ion-spinner",[["item-start",""]],[[2,"spinner-paused",null]],null,null,q_.b,q_.a)),Ti._4(114688,null,0,R_.a,[kc.a,Ti.k,Ti.E],{name:[0,"name"]},null),(l()(),Ti._27(null,["\n      "])),(l()(),Ti._27(null,["\n      "])),(l()(),Ti._6(0,null,null,0,"div",[],[[8,"innerHTML",1]],null,null,null,null)),(l()(),Ti._27(null,["\n    "]))],function(l,n){l(n,5,0,n.component.load.spinner)},function(l,n){var u=n.component;l(n,4,0,Ti._20(n,5)._paused);l(n,8,0,u.load.content)})}function dn(l){return Ti._29(0,[(l()(),Ti._6(0,null,null,1,"span",[],null,null,null,null,null)),(l()(),Ti._27(null,[" "," "]))],null,function(l,n){l(n,1,0,n.context.$implicit.attrValue)})}function pn(l){return Ti._29(0,[(l()(),Ti._6(0,null,null,1,"span",[],null,null,null,null,null)),(l()(),Ti._27(null,["门店"]))],null,null)}function fn(l){return Ti._29(0,[(l()(),Ti._6(0,null,null,1,"span",[],null,null,null,null,null)),(l()(),Ti._27(null,["快递"]))],null,null)}function hn(l){return Ti._29(0,[(l()(),Ti._6(0,null,null,1,"span",[],null,null,null,null,null)),(l()(),Ti._27(null,["其他"]))],null,null)}function gn(l){return Ti._29(0,[(l()(),Ti._6(0,null,null,1,"img",[["alt",""]],[[8,"src",4]],null,null,null,null)),Ti._23(1)],null,function(l,n){l(n,0,0,Ti._28(n,0,0,l(n,1,0,Ti._20(n.parent.parent,1),n.context.$implicit)))})}function mn(l){return Ti._29(0,[(l()(),Ti._6(0,null,null,4,"li",[["class","img-list"]],null,null,null,null,null)),(l()(),Ti._27(null,["\n          "])),(l()(),Ti._0(16777216,null,null,1,null,gn)),Ti._4(802816,null,0,Zc.i,[Ti.O,Ti.K,Ti.r],{ngForOf:[0,"ngForOf"]},null),(l()(),Ti._27(null,["\n        "]))],function(l,n){l(n,3,0,n.component.imageArray)},null)}function vn(l){return Ti._29(0,[Ti._21(0,vs,[]),Ti._21(0,Ds,[]),Ti._21(0,js,[]),(l()(),Ti._6(0,null,null,10,"ion-header",[],null,null,null,null,null)),Ti._4(16384,null,0,Lc.a,[kc.a,Ti.k,Ti.E,[2,Ic.a]],null,null),(l()(),Ti._27(null,["\n  "])),(l()(),Ti._6(0,null,null,6,"ion-navbar",[["class","toolbar"]],[[8,"hidden",0],[2,"statusbar-padding",null]],null,null,qc.b,qc.a)),Ti._4(49152,null,0,Rc.a,[xc.a,[2,Ic.a],[2,Oc.a],kc.a,Ti.k,Ti.E],null,null),(l()(),Ti._27(3,["\n    "])),(l()(),Ti._6(0,null,3,2,"ion-title",[["text-center",""]],null,null,null,$c.b,$c.a)),Ti._4(49152,null,0,Gc.a,[kc.a,Ti.k,Ti.E,[2,Kc.a],[2,Rc.a]],null,null),(l()(),Ti._27(0,["退货详情"])),(l()(),Ti._27(3,["\n  "])),(l()(),Ti._27(null,["\n"])),(l()(),Ti._27(null,["\n"])),(l()(),Ti._6(0,null,null,108,"ion-content",[],[[2,"statusbar-padding",null],[2,"has-refresher",null]],[["window","resize"]],function(l,n,u){var t=!0;if("window:resize"===n){t=!1!==Ti._20(l,16).resize()&&t}return t},Nc.b,Nc.a)),Ti._4(4374528,null,0,Fc.a,[kc.a,Dc.a,Tc.a,Ti.k,Ti.E,xc.a,Uc.a,Ti.x,[2,Ic.a],[2,Oc.a]],null,null),(l()(),Ti._27(1,["\n  "])),(l()(),Ti._6(0,null,1,104,"div",[["class","order-list"]],null,null,null,null,null)),(l()(),Ti._27(null,["\n    "])),(l()(),Ti._0(16777216,null,null,1,null,_n)),Ti._4(16384,null,0,Zc.j,[Ti.O,Ti.K],{ngIf:[0,"ngIf"]},null),(l()(),Ti._27(null,["\n    "])),(l()(),Ti._6(0,null,null,61,"div",[["class","order-items"]],null,null,null,null,null)),(l()(),Ti._27(null,["\n      "])),(l()(),Ti._27(null,["\n      "])),(l()(),Ti._6(0,null,null,16,"div",[["class","order-title"]],null,null,null,null,null)),(l()(),Ti._27(null,["\n        "])),(l()(),Ti._6(0,null,null,4,"h2",[],null,null,null,null,null)),(l()(),Ti._27(null,["订单编号：\n          "])),(l()(),Ti._6(0,null,null,1,"span",[],null,null,null,null,null)),(l()(),Ti._27(null,["",""])),(l()(),Ti._27(null,["\n        "])),(l()(),Ti._27(null,["\n        "])),(l()(),Ti._27(null,["\n        "])),(l()(),Ti._6(0,null,null,6,"span",[],null,null,null,null,null)),Ti._4(278528,null,0,Zc.h,[Ti.r,Ti.s,Ti.k,Ti.E],{ngClass:[0,"ngClass"]},null),Ti._23(1),Ti._23(1),Ti._22({auditStatus:0,pass:1,auditing:2}),(l()(),Ti._27(null,["",""])),Ti._23(1),(l()(),Ti._27(null,["\n      "])),(l()(),Ti._27(null,["\n      "])),(l()(),Ti._27(null,["\n      "])),(l()(),Ti._6(0,null,null,26,"div",[["class","order-item"]],null,null,null,null,null)),(l()(),Ti._27(null,["\n        "])),(l()(),Ti._6(0,null,null,23,"dl",[],null,null,null,null,null)),(l()(),Ti._27(null,["\n          "])),(l()(),Ti._6(0,null,null,4,"dt",[],null,null,null,null,null)),(l()(),Ti._27(null,["\n            "])),(l()(),Ti._6(0,null,null,1,"img",[["class","my-picture"]],[[8,"src",4],[8,"alt",0]],null,null,null,null)),Ti._23(1),(l()(),Ti._27(null,["\n          "])),(l()(),Ti._27(null,["\n          "])),(l()(),Ti._6(0,null,null,1,"dd",[["class","product-title"]],null,null,null,null,null)),(l()(),Ti._27(null,["",""])),(l()(),Ti._27(null,["\n          "])),(l()(),Ti._6(0,null,null,5,"dd",[["class","sku-list"]],null,null,null,null,null)),(l()(),Ti._27(null,["\n            "])),(l()(),Ti._27(null,["\n            "])),(l()(),Ti._0(16777216,null,null,1,null,dn)),Ti._4(802816,null,0,Zc.i,[Ti.O,Ti.K,Ti.r],{ngForOf:[0,"ngForOf"]},null),(l()(),Ti._27(null,["\n          "])),(l()(),Ti._27(null,["\n          "])),(l()(),Ti._6(0,null,null,1,"dd",[["class","price"]],null,null,null,null,null)),(l()(),Ti._27(null,["￥",""])),(l()(),Ti._27(null,["\n          "])),(l()(),Ti._6(0,null,null,1,"dd",[["class","count"]],null,null,null,null,null)),(l()(),Ti._27(null,["X",""])),(l()(),Ti._27(null,["\n        "])),(l()(),Ti._27(null,["\n      "])),(l()(),Ti._27(null,["\n\n      "])),(l()(),Ti._6(0,null,null,10,"div",[["class","orderOperate"]],null,null,null,null,null)),(l()(),Ti._27(null,["\n        "])),(l()(),Ti._6(0,null,null,7,"dl",[],null,null,null,null,null)),(l()(),Ti._27(null,["\n          "])),(l()(),Ti._6(0,null,null,1,"dt",[],null,null,null,null,null)),(l()(),Ti._27(null,["\n          "])),(l()(),Ti._27(null,["\n          "])),(l()(),Ti._6(0,null,null,1,"dd",[["class","total"]],null,null,null,null,null)),(l()(),Ti._27(null,["共","件商品，实付￥",""])),(l()(),Ti._27(null,["\n        "])),(l()(),Ti._27(null,["\n      "])),(l()(),Ti._27(null,["\n    "])),(l()(),Ti._27(null,["\n\n    "])),(l()(),Ti._6(0,null,null,35,"div",[["class","return-detail"]],null,null,null,null,null)),(l()(),Ti._27(null,["\n      "])),(l()(),Ti._6(0,null,null,32,"ul",[],null,null,null,null,null)),(l()(),Ti._27(null,["\n        "])),(l()(),Ti._6(0,null,null,1,"li",[],null,null,null,null,null)),(l()(),Ti._27(null,["退货数量：",""])),(l()(),Ti._27(null,["\n        "])),(l()(),Ti._6(0,null,null,1,"li",[],null,null,null,null,null)),(l()(),Ti._27(null,["联系方式：",""])),(l()(),Ti._27(null,["\n        "])),(l()(),Ti._6(0,null,null,10,"li",[],null,null,null,null,null)),(l()(),Ti._27(null,["退货方式：\n          "])),(l()(),Ti._0(16777216,null,null,1,null,pn)),Ti._4(16384,null,0,Zc.j,[Ti.O,Ti.K],{ngIf:[0,"ngIf"]},null),(l()(),Ti._27(null,["\n          "])),(l()(),Ti._0(16777216,null,null,1,null,fn)),Ti._4(16384,null,0,Zc.j,[Ti.O,Ti.K],{ngIf:[0,"ngIf"]},null),(l()(),Ti._27(null,["\n          "])),(l()(),Ti._0(16777216,null,null,1,null,hn)),Ti._4(16384,null,0,Zc.j,[Ti.O,Ti.K],{ngIf:[0,"ngIf"]},null),(l()(),Ti._27(null,["\n        "])),(l()(),Ti._27(null,["\n        "])),(l()(),Ti._6(0,null,null,1,"li",[],null,null,null,null,null)),(l()(),Ti._27(null,["是否有发票：",""])),(l()(),Ti._27(null,["\n        "])),(l()(),Ti._6(0,null,null,2,"li",[],null,null,null,null,null)),(l()(),Ti._27(null,["退货原因：",""])),Ti._23(1),(l()(),Ti._27(null,["\n        "])),(l()(),Ti._6(0,null,null,1,"li",[],null,null,null,null,null)),(l()(),Ti._27(null,["问题描述：",""])),(l()(),Ti._27(null,["\n        "])),(l()(),Ti._0(16777216,null,null,1,null,mn)),Ti._4(16384,null,0,Zc.j,[Ti.O,Ti.K],{ngIf:[0,"ngIf"]},null),(l()(),Ti._27(null,["\n      "])),(l()(),Ti._27(null,["\n    "])),(l()(),Ti._27(null,["\n  "])),(l()(),Ti._27(1,["\n"]))],function(l,n){var u=n.component;l(n,21,0,u.loadingShow);l(n,36,0,l(n,39,0,!0,Ti._28(n,36,0,l(n,37,0,Ti._20(n,0),u.orderStatus)).pass,Ti._28(n,36,0,l(n,38,0,Ti._20(n,0),u.orderStatus)).audit));l(n,62,0,u.returnedDetail.itemProductSkuDTO.productSkuDTO.attrValueList);l(n,99,0,1==u.returnedDetail.orderReturn.returnType);l(n,102,0,2==u.returnedDetail.orderReturn.returnType);l(n,105,0,0==u.returnedDetail.orderReturn.returnType);l(n,119,0,u.imageArray)},function(l,n){var u=n.component;l(n,6,0,Ti._20(n,7)._hidden,Ti._20(n,7)._sbPadding);l(n,15,0,Ti._20(n,16).statusbarPadding,Ti._20(n,16)._hasRefresher);l(n,31,0,u.returnedDetail.orderReturn.returnOrderId);l(n,40,0,Ti._28(n,40,0,l(n,41,0,Ti._20(n,0),u.orderStatus)).status);l(n,51,0,Ti._28(n,51,0,l(n,52,0,Ti._20(n,1),u.returnedDetail.itemProductSkuDTO.productSkuDTO.fileSeq)),u.returnedDetail.itemProductSkuDTO.productSkuDTO.productName);l(n,56,0,u.returnedDetail.itemProductSkuDTO.productSkuDTO.productName);l(n,66,0,u.returnedDetail.itemProductSkuDTO.unitPrice);l(n,69,0,u.returnedDetail.itemProductSkuDTO.number);l(n,81,0,u.returnedDetail.orderReturn.number,u.returnedDetail.returnAmount);l(n,91,0,u.returnedDetail.orderReturn.number);l(n,94,0,u.returnedDetail.orderReturn.mobile);l(n,109,0,1==u.returnedDetail.orderReturn.invoiced?"有":"无");l(n,112,0,Ti._28(n,112,0,l(n,113,0,Ti._20(n,2),u.returnedDetail.orderReturn.reasonType)));l(n,116,0,u.returnedDetail.orderReturn.detail)})}function bn(l){return Ti._29(0,[(l()(),Ti._6(0,null,null,3,"li",[],null,[[null,"click"]],function(l,n,u){var t=!0;if("click"===n){t=!1!==l.component.getCurrentStatus(l.context.index)&&t}return t},null,null)),Ti._4(278528,null,0,Zc.h,[Ti.r,Ti.s,Ti.k,Ti.E],{ngClass:[0,"ngClass"]},null),Ti._22({active:0}),(l()(),Ti._27(null,["","（","）"]))],function(l,n){l(n,1,0,l(n,2,0,n.component.currentStatus==n.context.$implicit.label))},function(l,n){l(n,3,0,n.context.$implicit.label,n.context.$implicit.num)})}function wn(l){return Ti._29(0,[(l()(),Ti._6(0,null,null,5,"ion-refresher",[],[[2,"refresher-active",null],[4,"top",null]],[[null,"ionRefresh"]],function(l,n,u){var t=!0;if("ionRefresh"===n){t=!1!==l.component.doRefresh(u)&&t}return t},null,null)),Ti._4(212992,null,0,E_.a,[Dc.a,Fc.a,Ti.x,Cc.l],null,{ionRefresh:"ionRefresh"}),(l()(),Ti._27(null,["\n    "])),(l()(),Ti._6(0,null,null,1,"ion-refresher-content",[],[[1,"state",0]],null,null,M_.b,M_.a)),Ti._4(114688,null,0,L_.a,[E_.a,kc.a],null,null),(l()(),Ti._27(null,["\n  "]))],function(l,n){l(n,1,0),l(n,4,0)},function(l,n){l(n,0,0,"inactive"!==Ti._20(n,1).state,Ti._20(n,1)._top);l(n,3,0,Ti._20(n,4).r.state)})}function yn(l){return Ti._29(0,[(l()(),Ti._6(0,null,null,9,"div",[["class","loading-wrapper"]],null,null,null,null,null)),(l()(),Ti._27(null,["\n        "])),(l()(),Ti._6(0,null,null,4,"div",[],null,null,null,null,null)),(l()(),Ti._27(null,["\n          "])),(l()(),Ti._6(0,null,null,1,"ion-spinner",[["item-start",""]],[[2,"spinner-paused",null]],null,null,q_.b,q_.a)),Ti._4(114688,null,0,R_.a,[kc.a,Ti.k,Ti.E],{name:[0,"name"]},null),(l()(),Ti._27(null,["\n        "])),(l()(),Ti._27(null,["\n        "])),(l()(),Ti._6(0,null,null,0,"div",[],[[8,"innerHTML",1]],null,null,null,null)),(l()(),Ti._27(null,["\n      "]))],function(l,n){l(n,5,0,n.component.load.spinner)},function(l,n){var u=n.component;l(n,4,0,Ti._20(n,5)._paused);l(n,8,0,u.load.content)})}function Sn(l){return Ti._29(0,[(l()(),Ti._6(0,null,null,9,"dd",[["class","reserve-phone"]],null,null,null,null,null)),(l()(),Ti._27(null,["\n            "])),(l()(),Ti._6(0,null,null,1,"span",[],null,null,null,null,null)),(l()(),Ti._27(null,["预约手机：",""])),(l()(),Ti._27(null,["\n            "])),(l()(),Ti._6(0,null,null,3,"a",[["style","z-index:100"]],[[8,"href",4]],null,null,null,null)),(l()(),Ti._27(null,["\n              "])),(l()(),Ti._6(0,null,null,0,"img",[["src","./assets/image/phone.png"]],null,null,null,null,null)),(l()(),Ti._27(null,["\n            "])),(l()(),Ti._27(null,["\n          "]))],null,function(l,n){l(n,3,0,n.parent.context.$implicit.reservePhone);l(n,5,0,Ti._9(1,"tel:",n.parent.context.$implicit.reservePhone,""))})}function In(l){return Ti._29(0,[(l()(),Ti._6(0,null,null,1,"span",[["class","clear"]],null,[[null,"click"]],function(l,n,u){var t=!0;if("click"===n){t=!1!==l.component.clearReserveArriveTime(l.parent.parent.context.index)&&t}return t},null,null)),(l()(),Ti._27(null,["X"]))],null,null)}function On(l){return Ti._29(0,[(l()(),Ti._6(0,null,null,22,"div",[["class","reserve-time"]],null,null,null,null,null)),(l()(),Ti._27(null,["\n          "])),(l()(),Ti._6(0,null,null,12,"div",[["class","time-text"]],null,null,null,null,null)),(l()(),Ti._27(null,["\n            "])),(l()(),Ti._6(0,null,null,6,"ion-datetime",[["cancelText","取消"],["displayFormat","YYYY-MM-DD"],["doneText","确定"],["max","2099"],["placeholder","会员预约到店时间"]],[[2,"datetime-disabled",null],[2,"ng-untouched",null],[2,"ng-touched",null],[2,"ng-pristine",null],[2,"ng-dirty",null],[2,"ng-valid",null],[2,"ng-invalid",null],[2,"ng-pending",null]],[[null,"ngModelChange"],[null,"click"],[null,"keyup.space"]],function(l,n,u){var t=!0;if("click"===n){t=!1!==Ti._20(l,5)._click(u)&&t}if("keyup.space"===n){t=!1!==Ti._20(l,5)._keyup()&&t}if("ngModelChange"===n){t=!1!==(l.parent.context.$implicit.reserveShopTime=u)&&t}return t},wd.b,wd.a)),Ti._4(1228800,null,0,yd.a,[Hc.a,kc.a,Ti.k,Ti.E,[2,Bc.a],[2,Sd.a]],{min:[0,"min"],max:[1,"max"],displayFormat:[2,"displayFormat"],cancelText:[3,"cancelText"],doneText:[4,"doneText"],placeholder:[5,"placeholder"]},null),Ti._24(1024,null,Jc.g,function(l){return[l]},[yd.a]),Ti._4(671744,null,0,Jc.j,[[8,null],[8,null],[8,null],[2,Jc.g]],{model:[0,"model"]},{update:"ngModelChange"}),Ti._24(2048,null,Jc.h,null,[Jc.j]),Ti._4(16384,null,0,Jc.i,[Jc.h],null,null),(l()(),Ti._27(null,["\n            "])),(l()(),Ti._27(null,["\n            "])),(l()(),Ti._0(16777216,null,null,1,null,In)),Ti._4(16384,null,0,Zc.j,[Ti.O,Ti.K],{ngIf:[0,"ngIf"]},null),(l()(),Ti._27(null,["\n          "])),(l()(),Ti._27(null,["\n          "])),(l()(),Ti._6(0,null,null,5,"div",[["class","btn-time"]],null,null,null,null,null)),(l()(),Ti._27(null,["\n            "])),(l()(),Ti._6(0,null,null,2,"button",[["ion-button",""],["round",""]],null,[[null,"touchend"]],function(l,n,u){var t=!0;if("touchend"===n){t=!1!==l.component.reserveAffirm(l.parent.context.index)&&t}return t},t_.b,t_.a)),Ti._4(1097728,null,0,e_.a,[[8,""],kc.a,Ti.k,Ti.E],{round:[0,"round"]},null),(l()(),Ti._27(0,["预约确认"])),(l()(),Ti._27(null,["\n          "])),(l()(),Ti._27(null,["\n        "]))],function(l,n){l(n,5,0,Ti._9(1,"",n.component.reserveShopTimeMin,""),"2099","YYYY-MM-DD","取消","确定","会员预约到店时间");l(n,7,0,n.parent.context.$implicit.reserveShopTime);l(n,13,0,n.parent.context.$implicit.reserveShopTime);l(n,19,0,"")},function(l,n){l(n,4,0,Ti._20(n,5)._disabled,Ti._20(n,9).ngClassUntouched,Ti._20(n,9).ngClassTouched,Ti._20(n,9).ngClassPristine,Ti._20(n,9).ngClassDirty,Ti._20(n,9).ngClassValid,Ti._20(n,9).ngClassInvalid,Ti._20(n,9).ngClassPending)})}function xn(l){return Ti._29(0,[(l()(),Ti._6(0,null,null,5,"div",[["class","reserve-time"]],null,null,null,null,null)),(l()(),Ti._27(null,["\n          "])),(l()(),Ti._6(0,null,null,2,"div",[["class","show-time"]],null,null,null,null,null)),(l()(),Ti._27(null,["预约到店时间：",""])),Ti._23(2),(l()(),Ti._27(null,["\n        "]))],null,function(l,n){l(n,3,0,Ti._28(n,3,0,l(n,4,0,Ti._20(n.parent.parent.parent,2),n.parent.context.$implicit.reserveShopTime,"yyyy-MM-dd HH:mm:ss")))})}function kn(l){return Ti._29(0,[(l()(),Ti._6(0,null,null,37,"div",[["class","gift-item"]],null,null,null,null,null)),(l()(),Ti._27(null,["\n        "])),(l()(),Ti._6(0,null,null,28,"dl",[],null,null,null,null,null)),(l()(),Ti._27(null,["\n          "])),(l()(),Ti._6(0,null,null,4,"dt",[],null,null,null,null,null)),(l()(),Ti._27(null,["\n            "])),(l()(),Ti._6(0,null,null,1,"img",[["alt",""]],[[8,"src",4]],null,null,null,null)),Ti._23(1),(l()(),Ti._27(null,["\n          "])),(l()(),Ti._27(null,["\n          "])),(l()(),Ti._6(0,null,null,9,"dd",[["class","product-title"]],null,null,null,null,null)),(l()(),Ti._27(null,["\n            "])),(l()(),Ti._6(0,null,null,1,"h2",[],null,null,null,null,null)),(l()(),Ti._27(null,["",""])),(l()(),Ti._27(null,["\n            "])),(l()(),Ti._6(0,null,null,3,"span",[],null,null,null,null,null)),Ti._4(278528,null,0,Zc.h,[Ti.r,Ti.s,Ti.k,Ti.E],{ngClass:[0,"ngClass"]},null),(l()(),Ti._27(null,["",""])),Ti._23(2),(l()(),Ti._27(null,["\n          "])),(l()(),Ti._27(null,["\n          "])),(l()(),Ti._0(16777216,null,null,1,null,Sn)),Ti._4(16384,null,0,Zc.j,[Ti.O,Ti.K],{ngIf:[0,"ngIf"]},null),(l()(),Ti._27(null,["\n          "])),(l()(),Ti._6(0,null,null,1,"dd",[["class","member-phone"]],null,null,null,null,null)),(l()(),Ti._27(null,["会员手机：",""])),(l()(),Ti._27(null,["\n          "])),(l()(),Ti._6(0,null,null,2,"dd",[["class","get-time"]],null,null,null,null,null)),(l()(),Ti._27(null,["领取时间：",""])),Ti._23(2),(l()(),Ti._27(null,["\n        "])),(l()(),Ti._27(null,["\n        "])),(l()(),Ti._0(16777216,null,null,1,null,On)),Ti._4(16384,null,0,Zc.j,[Ti.O,Ti.K],{ngIf:[0,"ngIf"]},null),(l()(),Ti._27(null,["\n        "])),(l()(),Ti._0(16777216,null,null,1,null,xn)),Ti._4(16384,null,0,Zc.j,[Ti.O,Ti.K],{ngIf:[0,"ngIf"]},null),(l()(),Ti._27(null,["\n\n      "]))],function(l,n){l(n,16,0,n.context.$implicit.className);l(n,22,0,"0"==n.context.$implicit.giftType);l(n,33,0,"0"==n.context.$implicit.giftType&&"2"==n.context.$implicit.status);l(n,36,0,"0"==n.context.$implicit.giftType&&"3"==n.context.$implicit.status)},function(l,n){l(n,6,0,Ti._28(n,6,0,l(n,7,0,Ti._20(n.parent.parent,0),n.context.$implicit.imageName)));l(n,13,0,n.context.$implicit.giftName);l(n,17,0,Ti._28(n,17,0,l(n,18,0,Ti._20(n.parent.parent,1),n.context.$implicit.giftType,n.context.$implicit.status)));l(n,25,0,n.context.$implicit.memberPhone);l(n,28,0,Ti._28(n,28,0,l(n,29,0,Ti._20(n.parent.parent,2),n.context.$implicit.receiveDate,"yyyy-MM-dd HH:mm:ss")))})}function Dn(l){return Ti._29(0,[(l()(),Ti._6(0,null,null,6,"div",[["class","no-data"]],null,null,null,null,null)),(l()(),Ti._27(null,["\n        "])),(l()(),Ti._6(0,null,null,0,"img",[["alt",""],["src","./assets/image/nodata.png"]],null,null,null,null,null)),(l()(),Ti._27(null,["\n        "])),(l()(),Ti._6(0,null,null,1,"p",[],null,null,null,null,null)),(l()(),Ti._27(null,["空空如也"])),(l()(),Ti._27(null,["\n      "]))],null,null)}function Cn(l){return Ti._29(0,[(l()(),Ti._6(0,null,null,4,"div",[["class","btn-noMore"]],null,null,null,null,null)),(l()(),Ti._27(null,["\n        "])),(l()(),Ti._6(0,null,null,1,"span",[],null,null,null,null,null)),(l()(),Ti._27(null,["—— 没有更多赠品了 ——"])),(l()(),Ti._27(null,["\n      "]))],null,null)}function jn(l){return Ti._29(0,[(l()(),Ti._6(0,null,null,10,"div",[["class","request-defeat"]],null,null,null,null,null)),(l()(),Ti._27(null,["\n        "])),(l()(),Ti._6(0,null,null,0,"img",[["alt",""],["src","./assets/image/requestDefeat.png"]],null,null,null,null,null)),(l()(),Ti._27(null,["\n        "])),(l()(),Ti._6(0,null,null,1,"p",[],null,null,null,null,null)),(l()(),Ti._27(null,["啊哦！页面走丢了"])),(l()(),Ti._27(null,["\n        "])),(l()(),Ti._6(0,null,null,2,"button",[["class","btn-request-defeat"],["full",""],["ion-button",""]],null,[[null,"touchstart"]],function(l,n,u){var t=!0;if("touchstart"===n){t=!1!==l.component.requestDefeatRefreshSelfGift()&&t}return t},t_.b,t_.a)),Ti._4(1097728,null,0,e_.a,[[8,""],kc.a,Ti.k,Ti.E],{full:[0,"full"]},null),(l()(),Ti._27(0,["\n          刷新再找一找\n        "])),(l()(),Ti._27(null,["\n      "]))],function(l,n){l(n,8,0,"")},null)}function An(l){return Ti._29(0,[(l()(),Ti._6(0,null,null,5,"ion-infinite-scroll",[],null,[[null,"ionInfinite"]],function(l,n,u){var t=!0;if("ionInfinite"===n){t=!1!==l.component.loadMore(u)&&t}return t},null,null)),Ti._4(1196032,null,0,$_.a,[Fc.a,Ti.x,Ti.k,Tc.a],null,{ionInfinite:"ionInfinite"}),(l()(),Ti._27(null,["\n        "])),(l()(),Ti._6(0,null,null,1,"ion-infinite-scroll-content",[["loadingText","加载更多..."]],[[1,"state",0]],null,null,G_.b,G_.a)),Ti._4(114688,null,0,K_.a,[$_.a,kc.a],{loadingText:[0,"loadingText"]},null),(l()(),Ti._27(null,["\n      "]))],function(l,n){l(n,4,0,"加载更多...")},function(l,n){l(n,3,0,Ti._20(n,4).inf.state)})}function Tn(l){return Ti._29(0,[(l()(),Ti._6(0,null,null,5,"ion-infinite-scroll",[],null,[[null,"ionInfinite"]],function(l,n,u){var t=!0;if("ionInfinite"===n){t=!1!==l.component.loadMore(u)&&t}return t},null,null)),Ti._4(1196032,null,0,$_.a,[Fc.a,Ti.x,Ti.k,Tc.a],null,{ionInfinite:"ionInfinite"}),(l()(),Ti._27(null,["\n      "])),(l()(),Ti._6(0,null,null,1,"ion-infinite-scroll-content",[["loadingText","加载更多..."]],[[1,"state",0]],null,null,G_.b,G_.a)),Ti._4(114688,null,0,K_.a,[$_.a,kc.a],{loadingText:[0,"loadingText"]},null),(l()(),Ti._27(null,["\n    "]))],function(l,n){l(n,4,0,"加载更多...")},function(l,n){l(n,3,0,Ti._20(n,4).inf.state)})}function Pn(l){return Ti._29(0,[(l()(),Ti._6(0,null,null,3,"div",[["class","toTop"]],null,[[null,"click"]],function(l,n,u){var t=!0;if("click"===n){t=!1!==l.component.scrollTo()&&t}return t},null,null)),(l()(),Ti._27(null,["\n      "])),(l()(),Ti._6(0,null,null,0,"img",[["alt",""],["src","./assets/image/toTop.png"]],null,null,null,null,null)),(l()(),Ti._27(null,["\n    "]))],null,null)}function En(l){return Ti._29(0,[(l()(),Ti._6(0,null,null,35,"div",[["class","selfGiftList"]],null,null,null,null,null)),(l()(),Ti._27(null,["\n    "])),(l()(),Ti._6(0,null,null,26,"div",[["class","gift-list"]],null,null,null,null,null)),(l()(),Ti._27(null,["\n      "])),(l()(),Ti._27(null,["\n      "])),(l()(),Ti._0(16777216,null,null,1,null,yn)),Ti._4(16384,null,0,Zc.j,[Ti.O,Ti.K],{ngIf:[0,"ngIf"]},null),(l()(),Ti._27(null,["\n      "])),(l()(),Ti._0(16777216,null,null,1,null,kn)),Ti._4(802816,null,0,Zc.i,[Ti.O,Ti.K,Ti.r],{ngForOf:[0,"ngForOf"]},null),(l()(),Ti._27(null,["\n      "])),(l()(),Ti._0(16777216,null,null,1,null,Dn)),Ti._4(16384,null,0,Zc.j,[Ti.O,Ti.K],{ngIf:[0,"ngIf"]},null),(l()(),Ti._27(null,["\n      "])),(l()(),Ti._6(0,null,null,4,"div",[["class","btn-selfview"]],null,[[null,"click"]],function(l,n,u){var t=!0;if("click"===n){t=!1!==l.component.goSelfgift()&&t}return t},null,null)),(l()(),Ti._27(null,["\n        "])),(l()(),Ti._6(0,null,null,1,"span",[],null,null,null,null,null)),(l()(),Ti._27(null,["查看已兑换自提赠品"])),(l()(),Ti._27(null,["\n      "])),(l()(),Ti._27(null,["\n      "])),(l()(),Ti._0(16777216,null,null,1,null,Cn)),Ti._4(16384,null,0,Zc.j,[Ti.O,Ti.K],{ngIf:[0,"ngIf"]},null),(l()(),Ti._27(null,["\n      "])),(l()(),Ti._0(16777216,null,null,1,null,jn)),Ti._4(16384,null,0,Zc.j,[Ti.O,Ti.K],{ngIf:[0,"ngIf"]},null),(l()(),Ti._27(null,["\n      "])),(l()(),Ti._0(16777216,null,null,1,null,An)),Ti._4(16384,null,0,Zc.j,[Ti.O,Ti.K],{ngIf:[0,"ngIf"]},null),(l()(),Ti._27(null,["\n    "])),(l()(),Ti._27(null,["\n    "])),(l()(),Ti._0(16777216,null,null,1,null,Tn)),Ti._4(16384,null,0,Zc.j,[Ti.O,Ti.K],{ngIf:[0,"ngIf"]},null),(l()(),Ti._27(null,["\n    "])),(l()(),Ti._0(16777216,null,null,1,null,Pn)),Ti._4(16384,null,0,Zc.j,[Ti.O,Ti.K],{ngIf:[0,"ngIf"]},null),(l()(),Ti._27(null,["\n    \n  "]))],function(l,n){var u=n.component;l(n,6,0,u.loadingShow);l(n,9,0,u.unhandleSeflGiftArray);l(n,12,0,u.noData);l(n,21,0,u.showNoMore);l(n,24,0,u.requestDefeat);l(n,27,0,!u.showNoMore&&u.showInfinite);l(n,31,0,!u.showNoMore&&u.showInfinite);l(n,34,0,u.toTop)},null)}function Mn(l){return Ti._29(0,[(l()(),Ti._6(0,null,null,9,"div",[["class","loading-wrapper"]],null,null,null,null,null)),(l()(),Ti._27(null,["\n        "])),(l()(),Ti._6(0,null,null,4,"div",[],null,null,null,null,null)),(l()(),Ti._27(null,["\n          "])),(l()(),Ti._6(0,null,null,1,"ion-spinner",[["item-start",""]],[[2,"spinner-paused",null]],null,null,q_.b,q_.a)),Ti._4(114688,null,0,R_.a,[kc.a,Ti.k,Ti.E],{name:[0,"name"]},null),(l()(),Ti._27(null,["\n        "])),(l()(),Ti._27(null,["\n        "])),(l()(),Ti._6(0,null,null,0,"div",[],[[8,"innerHTML",1]],null,null,null,null)),(l()(),Ti._27(null,["\n      "]))],function(l,n){l(n,5,0,n.component.load.spinner)},function(l,n){var u=n.component;l(n,4,0,Ti._20(n,5)._paused);l(n,8,0,u.load.content)})}function Ln(l){return Ti._29(0,[(l()(),Ti._6(0,null,null,1,"li",[],null,null,null,null,null)),(l()(),Ti._27(null,["","：",""]))],null,function(l,n){l(n,1,0,n.context.$implicit.label,n.context.$implicit.value)})}function qn(l){return Ti._29(0,[(l()(),Ti._6(0,null,null,57,"div",[["class","gift-item"]],null,null,null,null,null)),(l()(),Ti._27(null,["\n        "])),(l()(),Ti._6(0,null,null,35,"dl",[],null,null,null,null,null)),(l()(),Ti._27(null,["\n          "])),(l()(),Ti._6(0,null,null,4,"dt",[],null,null,null,null,null)),(l()(),Ti._27(null,["\n            "])),(l()(),Ti._6(0,null,null,1,"img",[["alt",""]],[[8,"src",4]],null,null,null,null)),Ti._23(1),(l()(),Ti._27(null,["\n          "])),(l()(),Ti._27(null,["\n          "])),(l()(),Ti._6(0,null,null,7,"dd",[["class","product-title"]],null,null,null,null,null)),(l()(),Ti._27(null,["\n            "])),(l()(),Ti._6(0,null,null,1,"h2",[],null,null,null,null,null)),(l()(),Ti._27(null,["",""])),(l()(),Ti._27(null,["\n            "])),(l()(),Ti._6(0,null,null,1,"span",[["class","unstart"]],null,null,null,null,null)),(l()(),Ti._27(null,["立即兑换"])),(l()(),Ti._27(null,["\n          "])),(l()(),Ti._27(null,["\n          "])),(l()(),Ti._6(0,null,null,9,"dd",[["class","reserve-phone"]],null,null,null,null,null)),(l()(),Ti._27(null,["\n            "])),(l()(),Ti._6(0,null,null,1,"span",[],null,null,null,null,null)),(l()(),Ti._27(null,["会员手机：",""])),(l()(),Ti._27(null,["\n            "])),(l()(),Ti._6(0,null,null,3,"a",[],[[8,"href",4]],null,null,null,null)),(l()(),Ti._27(null,["\n              "])),(l()(),Ti._6(0,null,null,0,"img",[["src","assets/image/phone.png"]],null,null,null,null,null)),(l()(),Ti._27(null,["\n            "])),(l()(),Ti._27(null,["\n          "])),(l()(),Ti._27(null,["\n          "])),(l()(),Ti._6(0,null,null,2,"dd",[["class","get-time"]],null,null,null,null,null)),(l()(),Ti._27(null,["领取时间：",""])),Ti._23(2),(l()(),Ti._27(null,["\n          "])),(l()(),Ti._6(0,null,null,2,"dd",[["class","get-time"]],null,null,null,null,null)),(l()(),Ti._27(null,["兑换时间：",""])),Ti._23(2),(l()(),Ti._27(null,["\n        "])),(l()(),Ti._27(null,["\n        "])),(l()(),Ti._6(0,null,null,17,"div",[["class","reserve-time"]],null,null,null,null,null)),(l()(),Ti._27(null,["\n          "])),(l()(),Ti._6(0,null,null,7,"div",[["class","member-info"]],null,null,null,null,null)),(l()(),Ti._27(null,["\n            "])),(l()(),Ti._6(0,null,null,4,"ul",[],null,null,null,null,null)),(l()(),Ti._27(null,["\n              "])),(l()(),Ti._0(16777216,null,null,1,null,Ln)),Ti._4(802816,null,0,Zc.i,[Ti.O,Ti.K,Ti.r],{ngForOf:[0,"ngForOf"]},null),(l()(),Ti._27(null,["\n            "])),(l()(),Ti._27(null,["\n          "])),(l()(),Ti._27(null,["\n          "])),(l()(),Ti._6(0,null,null,5,"div",[["class","btn-time"]],null,null,null,null,null)),(l()(),Ti._27(null,["\n            "])),(l()(),Ti._6(0,null,null,2,"button",[["ion-button",""],["round",""]],null,[[null,"click"]],function(l,n,u){var t=!0;if("click"===n){t=!1!==l.component.sendProduct(l.context.index)&&t}return t},t_.b,t_.a)),Ti._4(1097728,null,0,e_.a,[[8,""],kc.a,Ti.k,Ti.E],{round:[0,"round"]},null),(l()(),Ti._27(0,["发货"])),(l()(),Ti._27(null,["\n          "])),(l()(),Ti._27(null,["\n        "])),(l()(),Ti._27(null,["\n      "]))],function(l,n){l(n,46,0,n.context.$implicit.attrValueList);l(n,53,0,"")},function(l,n){l(n,6,0,Ti._28(n,6,0,l(n,7,0,Ti._20(n.parent.parent,0),n.context.$implicit.imageName)));l(n,13,0,n.context.$implicit.giftName);l(n,22,0,n.context.$implicit.memberPhone);l(n,24,0,Ti._9(1,"tel:",n.context.$implicit.memberPhone,""));l(n,31,0,Ti._28(n,31,0,l(n,32,0,Ti._20(n.parent.parent,2),n.context.$implicit.receiveDate,"yyyy-MM-dd HH:mm:ss")));l(n,35,0,Ti._28(n,35,0,l(n,36,0,Ti._20(n.parent.parent,2),n.context.$implicit.useDate,"yyyy-MM-dd HH:mm:ss")))})}function Rn(l){return Ti._29(0,[(l()(),Ti._6(0,null,null,6,"div",[["class","no-data"]],null,null,null,null,null)),(l()(),Ti._27(null,["\n        "])),(l()(),Ti._6(0,null,null,0,"img",[["alt",""],["src","./assets/image/nodata.png"]],null,null,null,null,null)),(l()(),Ti._27(null,["\n        "])),(l()(),Ti._6(0,null,null,1,"p",[],null,null,null,null,null)),(l()(),Ti._27(null,["空空如也"])),(l()(),Ti._27(null,["\n      "]))],null,null)}function $n(l){return Ti._29(0,[(l()(),Ti._6(0,null,null,4,"div",[["class","btn-noMore"]],null,null,null,null,null)),(l()(),Ti._27(null,["\n        "])),(l()(),Ti._6(0,null,null,1,"span",[],null,null,null,null,null)),(l()(),Ti._27(null,["—— 没有更多赠品了 ——"])),(l()(),Ti._27(null,["\n      "]))],null,null)}function Gn(l){return Ti._29(0,[(l()(),Ti._6(0,null,null,10,"div",[["class","request-defeat"]],null,null,null,null,null)),(l()(),Ti._27(null,["\n        "])),(l()(),Ti._6(0,null,null,0,"img",[["alt",""],["src","./assets/image/requestDefeat.png"]],null,null,null,null,null)),(l()(),Ti._27(null,["\n        "])),(l()(),Ti._6(0,null,null,1,"p",[],null,null,null,null,null)),(l()(),Ti._27(null,["啊哦！页面走丢了"])),(l()(),Ti._27(null,["\n        "])),(l()(),Ti._6(0,null,null,2,"button",[["class","btn-request-defeat"],["full",""],["ion-button",""]],null,[[null,"touchstart"]],function(l,n,u){var t=!0;if("touchstart"===n){t=!1!==l.component.requestDefeatRefreshExpressGift()&&t}return t},t_.b,t_.a)),Ti._4(1097728,null,0,e_.a,[[8,""],kc.a,Ti.k,Ti.E],{full:[0,"full"]},null),(l()(),Ti._27(0,["\n          刷新再找一找\n        "])),(l()(),Ti._27(null,["\n      "]))],function(l,n){l(n,8,0,"")},null)}function Kn(l){return Ti._29(0,[(l()(),Ti._6(0,null,null,5,"ion-infinite-scroll",[],null,[[null,"ionInfinite"]],function(l,n,u){var t=!0;if("ionInfinite"===n){t=!1!==l.component.loadMore(u)&&t}return t},null,null)),Ti._4(1196032,null,0,$_.a,[Fc.a,Ti.x,Ti.k,Tc.a],null,{ionInfinite:"ionInfinite"}),(l()(),Ti._27(null,["\n        "])),(l()(),Ti._6(0,null,null,1,"ion-infinite-scroll-content",[["loadingText","加载更多..."]],[[1,"state",0]],null,null,G_.b,G_.a)),Ti._4(114688,null,0,K_.a,[$_.a,kc.a],{loadingText:[0,"loadingText"]},null),(l()(),Ti._27(null,["\n      "]))],function(l,n){l(n,4,0,"加载更多...")},function(l,n){l(n,3,0,Ti._20(n,4).inf.state)})}function Nn(l){return Ti._29(0,[(l()(),Ti._6(0,null,null,29,"div",[["class","expressGiftList"]],null,null,null,null,null)),(l()(),Ti._27(null,["\n    "])),(l()(),Ti._6(0,null,null,26,"div",[["class","gift-list"]],null,null,null,null,null)),(l()(),Ti._27(null,["\n      "])),(l()(),Ti._27(null,["\n      "])),(l()(),Ti._0(16777216,null,null,1,null,Mn)),Ti._4(16384,null,0,Zc.j,[Ti.O,Ti.K],{ngIf:[0,"ngIf"]},null),(l()(),Ti._27(null,["\n      "])),(l()(),Ti._0(16777216,null,null,1,null,qn)),Ti._4(802816,null,0,Zc.i,[Ti.O,Ti.K,Ti.r],{ngForOf:[0,"ngForOf"]},null),(l()(),Ti._27(null,["\n      "])),(l()(),Ti._0(16777216,null,null,1,null,Rn)),Ti._4(16384,null,0,Zc.j,[Ti.O,Ti.K],{ngIf:[0,"ngIf"]},null),(l()(),Ti._27(null,["\n      "])),(l()(),Ti._6(0,null,null,4,"div",[["class","btn-selfview"]],null,[[null,"click"]],function(l,n,u){var t=!0;if("click"===n){t=!1!==l.component.goExpressgift()&&t}return t},null,null)),(l()(),Ti._27(null,["\n        "])),(l()(),Ti._6(0,null,null,1,"span",[],null,null,null,null,null)),(l()(),Ti._27(null,["查看已发货赠品"])),(l()(),Ti._27(null,["\n      "])),(l()(),Ti._27(null,["\n      "])),(l()(),Ti._0(16777216,null,null,1,null,$n)),Ti._4(16384,null,0,Zc.j,[Ti.O,Ti.K],{ngIf:[0,"ngIf"]},null),(l()(),Ti._27(null,["\n      "])),(l()(),Ti._0(16777216,null,null,1,null,Gn)),Ti._4(16384,null,0,Zc.j,[Ti.O,Ti.K],{ngIf:[0,"ngIf"]},null),(l()(),Ti._27(null,["\n      "])),(l()(),Ti._0(16777216,null,null,1,null,Kn)),Ti._4(16384,null,0,Zc.j,[Ti.O,Ti.K],{ngIf:[0,"ngIf"]},null),(l()(),Ti._27(null,["\n    "])),(l()(),Ti._27(null,["\n    \n    \n  "]))],function(l,n){var u=n.component;l(n,6,0,u.loadingShow);l(n,9,0,u.unhandleExpressGiftArray);l(n,12,0,u.noData);l(n,21,0,u.showNoMore);l(n,24,0,u.requestDefeat);l(n,27,0,!u.showNoMore&&u.showInfinite)},null)}function Fn(l){return Ti._29(0,[Ti._21(0,Cs,[]),Ti._21(0,ys,[]),Ti._21(0,Zc.d,[Ti.t]),Ti._25(402653184,1,{content:0}),(l()(),Ti._6(0,null,null,20,"ion-header",[],null,null,null,null,null)),Ti._4(16384,null,0,Lc.a,[kc.a,Ti.k,Ti.E,[2,Ic.a]],null,null),(l()(),Ti._27(null,["\n  "])),(l()(),Ti._6(0,null,null,6,"ion-navbar",[["class","toolbar"]],[[8,"hidden",0],[2,"statusbar-padding",null]],null,null,qc.b,qc.a)),Ti._4(49152,null,0,Rc.a,[xc.a,[2,Ic.a],[2,Oc.a],kc.a,Ti.k,Ti.E],null,null),(l()(),Ti._27(3,["\n    "])),(l()(),Ti._6(0,null,3,2,"ion-title",[["text-center",""]],null,null,null,$c.b,$c.a)),Ti._4(49152,null,0,Gc.a,[kc.a,Ti.k,Ti.E,[2,Kc.a],[2,Rc.a]],null,null),(l()(),Ti._27(0,["待处理赠品"])),(l()(),Ti._27(3,["\n  "])),(l()(),Ti._27(null,["\n  "])),(l()(),Ti._6(0,null,null,8,"ion-toolbar",[["class","statusBox toolbar"]],[[2,"statusbar-padding",null]],null,null,p_.b,p_.a)),Ti._4(49152,null,0,Kc.a,[kc.a,Ti.k,Ti.E],null,null),(l()(),Ti._27(3,["\n    "])),(l()(),Ti._6(0,null,3,4,"ul",[],null,null,null,null,null)),(l()(),Ti._27(null,["\n      "])),(l()(),Ti._0(16777216,null,null,1,null,bn)),Ti._4(802816,null,0,Zc.i,[Ti.O,Ti.K,Ti.r],{ngForOf:[0,"ngForOf"]},null),(l()(),Ti._27(null,["\n    "])),(l()(),Ti._27(3,["\n  "])),(l()(),Ti._27(null,["\n"])),(l()(),Ti._27(null,["\n"])),(l()(),Ti._6(0,null,null,11,"ion-content",[],[[2,"statusbar-padding",null],[2,"has-refresher",null]],[["window","resize"]],function(l,n,u){var t=!0;if("window:resize"===n){t=!1!==Ti._20(l,27).resize()&&t}return t},Nc.b,Nc.a)),Ti._4(4374528,[[1,4]],0,Fc.a,[kc.a,Dc.a,Tc.a,Ti.k,Ti.E,xc.a,Uc.a,Ti.x,[2,Ic.a],[2,Oc.a]],null,null),(l()(),Ti._27(1,["\n  "])),(l()(),Ti._0(16777216,null,2,1,null,wn)),Ti._4(16384,null,0,Zc.j,[Ti.O,Ti.K],{ngIf:[0,"ngIf"]},null),(l()(),Ti._27(1,["\n\n  "])),(l()(),Ti._0(16777216,null,1,1,null,En)),Ti._4(16384,null,0,Zc.j,[Ti.O,Ti.K],{ngIf:[0,"ngIf"]},null),(l()(),Ti._27(1,["\n\n  "])),(l()(),Ti._0(16777216,null,1,1,null,Nn)),Ti._4(16384,null,0,Zc.j,[Ti.O,Ti.K],{ngIf:[0,"ngIf"]},null),(l()(),Ti._27(1,["\n\n  \n"]))],function(l,n){var u=n.component;l(n,21,0,u.statusList);l(n,30,0,!u.loadingShow);l(n,33,0,0==u.currentIndex);l(n,36,0,1==u.currentIndex)},function(l,n){l(n,7,0,Ti._20(n,8)._hidden,Ti._20(n,8)._sbPadding);l(n,15,0,Ti._20(n,16)._sbPadding);l(n,26,0,Ti._20(n,27).statusbarPadding,Ti._20(n,27)._hasRefresher)})}function Un(l){return Ti._29(0,[(l()(),Ti._6(0,null,null,9,"div",[["class","loading-wrapper"]],null,null,null,null,null)),(l()(),Ti._27(null,["\n\t\t\t"])),(l()(),Ti._6(0,null,null,4,"div",[],null,null,null,null,null)),(l()(),Ti._27(null,["\n\t\t\t\t"])),(l()(),Ti._6(0,null,null,1,"ion-spinner",[["item-start",""]],[[2,"spinner-paused",null]],null,null,q_.b,q_.a)),Ti._4(114688,null,0,R_.a,[kc.a,Ti.k,Ti.E],{name:[0,"name"]},null),(l()(),Ti._27(null,["\n\t\t\t"])),(l()(),Ti._27(null,["\n\t\t\t"])),(l()(),Ti._6(0,null,null,0,"div",[],[[8,"innerHTML",1]],null,null,null,null)),(l()(),Ti._27(null,["\n\t\t"]))],function(l,n){l(n,5,0,n.component.load.spinner)},function(l,n){var u=n.component;l(n,4,0,Ti._20(n,5)._paused);l(n,8,0,u.load.content)})}function zn(l){return Ti._29(0,[(l()(),Ti._6(0,null,null,1,"dd",[["class","member-phone"]],null,null,null,null,null)),(l()(),Ti._27(null,["会员手机：",""]))],null,function(l,n){l(n,1,0,n.parent.context.$implicit.memberPhone)})}function Vn(l){return Ti._29(0,[(l()(),Ti._6(0,null,null,1,"span",[["class","clear"]],null,[[null,"click"]],function(l,n,u){var t=!0;if("click"===n){t=!1!==l.component.clearReserveArriveTime(l.parent.parent.context.index)&&t}return t},null,null)),(l()(),Ti._27(null,["X"]))],null,null)}function Bn(l){return Ti._29(0,[(l()(),Ti._6(0,null,null,22,"div",[["class","reserve-time"]],null,null,null,null,null)),(l()(),Ti._27(null,["\n\t\t\t\t"])),(l()(),Ti._6(0,null,null,12,"div",[["class","time-text"]],null,null,null,null,null)),(l()(),Ti._27(null,["\n\t\t\t\t\t"])),(l()(),Ti._6(0,null,null,6,"ion-datetime",[["cancelText","取消"],["displayFormat","YYYY-MM-DD HH:mm:ss"],["doneText","确定"],["placeholder","会员预约到店时间"]],[[2,"datetime-disabled",null],[2,"ng-untouched",null],[2,"ng-touched",null],[2,"ng-pristine",null],[2,"ng-dirty",null],[2,"ng-valid",null],[2,"ng-invalid",null],[2,"ng-pending",null]],[[null,"ngModelChange"],[null,"click"],[null,"keyup.space"]],function(l,n,u){var t=!0;if("click"===n){t=!1!==Ti._20(l,5)._click(u)&&t}if("keyup.space"===n){t=!1!==Ti._20(l,5)._keyup()&&t}if("ngModelChange"===n){t=!1!==(l.parent.context.$implicit.reserveShopTime=u)&&t}return t},wd.b,wd.a)),Ti._4(1228800,null,0,yd.a,[Hc.a,kc.a,Ti.k,Ti.E,[2,Bc.a],[2,Sd.a]],{displayFormat:[0,"displayFormat"],cancelText:[1,"cancelText"],doneText:[2,"doneText"],placeholder:[3,"placeholder"]},null),Ti._24(1024,null,Jc.g,function(l){return[l]},[yd.a]),Ti._4(671744,null,0,Jc.j,[[8,null],[8,null],[8,null],[2,Jc.g]],{model:[0,"model"]},{update:"ngModelChange"}),Ti._24(2048,null,Jc.h,null,[Jc.j]),Ti._4(16384,null,0,Jc.i,[Jc.h],null,null),(l()(),Ti._27(null,["\n\t\t\t\t\t"])),(l()(),Ti._27(null,["\n\t\t\t\t\t"])),(l()(),Ti._0(16777216,null,null,1,null,Vn)),Ti._4(16384,null,0,Zc.j,[Ti.O,Ti.K],{ngIf:[0,"ngIf"]},null),(l()(),Ti._27(null,["\n\t\t\t\t"])),(l()(),Ti._27(null,["\n\t\t\t\t"])),(l()(),Ti._6(0,null,null,5,"div",[["class","btn-time"]],null,null,null,null,null)),(l()(),Ti._27(null,["\n\t\t\t\t\t"])),(l()(),Ti._6(0,null,null,2,"button",[["ion-button",""],["round",""]],null,[[null,"touchend"]],function(l,n,u){var t=!0;if("touchend"===n){t=!1!==l.component.reserveAffirm(l.parent.context.index)&&t}return t},t_.b,t_.a)),Ti._4(1097728,null,0,e_.a,[[8,""],kc.a,Ti.k,Ti.E],{round:[0,"round"]},null),(l()(),Ti._27(0,["预约确认"])),(l()(),Ti._27(null,["\n\t\t\t\t"])),(l()(),Ti._27(null,["\n\t\t\t"]))],function(l,n){l(n,5,0,"YYYY-MM-DD HH:mm:ss","取消","确定","会员预约到店时间");l(n,7,0,n.parent.context.$implicit.reserveShopTime);l(n,13,0,n.parent.context.$implicit.reserveShopTime);l(n,19,0,"")},function(l,n){l(n,4,0,Ti._20(n,5)._disabled,Ti._20(n,9).ngClassUntouched,Ti._20(n,9).ngClassTouched,Ti._20(n,9).ngClassPristine,Ti._20(n,9).ngClassDirty,Ti._20(n,9).ngClassValid,Ti._20(n,9).ngClassInvalid,Ti._20(n,9).ngClassPending)})}function Hn(l){return Ti._29(0,[(l()(),Ti._6(0,null,null,5,"div",[["class","reserve-time"]],null,null,null,null,null)),(l()(),Ti._27(null,["\n\t\t\t\t"])),(l()(),Ti._6(0,null,null,2,"div",[["class","show-time"]],null,null,null,null,null)),(l()(),Ti._27(null,["预约到店时间：",""])),Ti._23(2),(l()(),Ti._27(null,["\n\t\t\t"]))],null,function(l,n){l(n,3,0,Ti._28(n,3,0,l(n,4,0,Ti._20(n.parent.parent,2),n.parent.context.$implicit.reserveShopTime,"yyyy-MM-dd HH:mm:ss")))})}function Yn(l){return Ti._29(0,[(l()(),Ti._6(0,null,null,41,"div",[["class","gift-item"]],null,null,null,null,null)),(l()(),Ti._27(null,["\n\t\t\t"])),(l()(),Ti._6(0,null,null,32,"dl",[],null,null,null,null,null)),(l()(),Ti._27(null,["\n\t\t\t\t"])),(l()(),Ti._6(0,null,null,2,"dt",[],null,null,null,null,null)),(l()(),Ti._6(0,null,null,1,"img",[["alt",""]],[[8,"src",4]],null,null,null,null)),Ti._23(1),(l()(),Ti._27(null,["\n\t\t\t\t"])),(l()(),Ti._6(0,null,null,9,"dd",[["class","product-title"]],null,null,null,null,null)),(l()(),Ti._27(null,["\n\t\t\t\t\t"])),(l()(),Ti._6(0,null,null,1,"h2",[],null,null,null,null,null)),(l()(),Ti._27(null,["",""])),(l()(),Ti._27(null,["\n\t\t\t\t\t"])),(l()(),Ti._6(0,null,null,3,"span",[],null,null,null,null,null)),Ti._4(278528,null,0,Zc.h,[Ti.r,Ti.s,Ti.k,Ti.E],{ngClass:[0,"ngClass"]},null),(l()(),Ti._27(null,["",""])),Ti._23(2),(l()(),Ti._27(null,["\n\t\t\t\t"])),(l()(),Ti._27(null,["\n\t\t\t\t"])),(l()(),Ti._6(0,null,null,7,"dd",[["class","reserve-phone"]],null,null,null,null,null)),(l()(),Ti._27(null,["\n\t\t\t\t\t"])),(l()(),Ti._6(0,null,null,1,"span",[],null,null,null,null,null)),(l()(),Ti._27(null,["预约手机：",""])),(l()(),Ti._27(null,["\n\t\t\t\t\t"])),(l()(),Ti._6(0,null,null,1,"a",[["href","tel:13761489650"]],null,null,null,null,null)),(l()(),Ti._6(0,null,null,0,"img",[["src","./assets/image/phone.png"]],null,null,null,null,null)),(l()(),Ti._27(null,["\n\t\t\t\t"])),(l()(),Ti._27(null,["\n\t\t\t\t"])),(l()(),Ti._0(16777216,null,null,1,null,zn)),Ti._4(16384,null,0,Zc.j,[Ti.O,Ti.K],{ngIf:[0,"ngIf"]},null),(l()(),Ti._27(null,["\n\t\t\t\t"])),(l()(),Ti._6(0,null,null,2,"dd",[["class","get-time"]],null,null,null,null,null)),(l()(),Ti._27(null,["领取时间：",""])),Ti._23(2),(l()(),Ti._27(null,["\n\t\t\t"])),(l()(),Ti._27(null,["\n\t\t\t"])),(l()(),Ti._0(16777216,null,null,1,null,Bn)),Ti._4(16384,null,0,Zc.j,[Ti.O,Ti.K],{ngIf:[0,"ngIf"]},null),(l()(),Ti._27(null,["\n\t\t\t"])),(l()(),Ti._0(16777216,null,null,1,null,Hn)),Ti._4(16384,null,0,Zc.j,[Ti.O,Ti.K],{ngIf:[0,"ngIf"]},null),(l()(),Ti._27(null,["\n\t\t\n\t\t"]))],function(l,n){l(n,14,0,n.context.$implicit.className);l(n,29,0,"0"==n.context.$implicit.giftType);l(n,37,0,"0"==n.context.$implicit.giftType&&"2"==n.context.$implicit.status);l(n,40,0,"0"==n.context.$implicit.giftType&&"3"==n.context.$implicit.status)},function(l,n){l(n,5,0,Ti._28(n,5,0,l(n,6,0,Ti._20(n.parent,0),n.context.$implicit.imageName)));l(n,11,0,n.context.$implicit.giftName);l(n,15,0,Ti._28(n,15,0,l(n,16,0,Ti._20(n.parent,1),n.context.$implicit.giftType,n.context.$implicit.status)));l(n,22,0,n.context.$implicit.reservePhone);l(n,32,0,Ti._28(n,32,0,l(n,33,0,Ti._20(n.parent,2),n.context.$implicit.receiveDate,"yyyy-MM-dd HH:mm:ss")))})}function Wn(l){return Ti._29(0,[(l()(),Ti._6(0,null,null,3,"div",[["class","toTop"]],null,[[null,"click"]],function(l,n,u){var t=!0;if("click"===n){t=!1!==l.component.scrollTo()&&t}return t},null,null)),(l()(),Ti._27(null,["\n\t\t"])),(l()(),Ti._6(0,null,null,0,"img",[["alt",""],["src","./assets/image/toTop.png"]],null,null,null,null,null)),(l()(),Ti._27(null,["\n\t"]))],null,null)}function Xn(l){return Ti._29(0,[(l()(),Ti._6(0,null,null,6,"div",[["class","no-data"]],null,null,null,null,null)),(l()(),Ti._27(null,["\n\t\t"])),(l()(),Ti._6(0,null,null,0,"img",[["alt",""],["src","./assets/image/nodata.png"]],null,null,null,null,null)),(l()(),Ti._27(null,["\n\t\t"])),(l()(),Ti._6(0,null,null,1,"p",[],null,null,null,null,null)),(l()(),Ti._27(null,["空空如也"])),(l()(),Ti._27(null,["\n\t"]))],null,null)}function Jn(l){return Ti._29(0,[(l()(),Ti._6(0,null,null,4,"div",[["class","btn-noMore"]],null,null,null,null,null)),(l()(),Ti._27(null,["\n\t\t"])),(l()(),Ti._6(0,null,null,1,"span",[],null,null,null,null,null)),(l()(),Ti._27(null,["—— 没有更多赠品了 ——"])),(l()(),Ti._27(null,["\n\t"]))],null,null)}function Qn(l){return Ti._29(0,[(l()(),Ti._6(0,null,null,5,"ion-infinite-scroll",[],null,[[null,"ionInfinite"]],function(l,n,u){var t=!0;if("ionInfinite"===n){t=!1!==l.component.infiniteGetUnhandleSelfGiftList(u)&&t}return t},null,null)),Ti._4(1196032,null,0,$_.a,[Fc.a,Ti.x,Ti.k,Tc.a],null,{ionInfinite:"ionInfinite"}),(l()(),Ti._27(null,["\n    "])),(l()(),Ti._6(0,null,null,1,"ion-infinite-scroll-content",[["loadingText","加载更多..."]],[[1,"state",0]],null,null,G_.b,G_.a)),Ti._4(114688,null,0,K_.a,[$_.a,kc.a],{loadingText:[0,"loadingText"]},null),(l()(),Ti._27(null,["\n  "]))],function(l,n){l(n,4,0,"加载更多...")},function(l,n){l(n,3,0,Ti._20(n,4).inf.state)})}function Zn(l){return Ti._29(0,[Ti._21(0,Cs,[]),Ti._21(0,ys,[]),Ti._21(0,Zc.d,[Ti.t]),Ti._25(402653184,1,{content:0}),(l()(),Ti._6(0,null,null,37,"ion-content",[],[[2,"statusbar-padding",null],[2,"has-refresher",null]],[[null,"ionScroll"],["window","resize"]],function(l,n,u){var t=!0,e=l.component;if("window:resize"===n){t=!1!==Ti._20(l,5).resize()&&t}if("ionScroll"===n){t=!1!==e.scrollHandler(u)&&t}return t},Nc.b,Nc.a)),Ti._4(4374528,[[1,4]],0,Fc.a,[kc.a,Dc.a,Tc.a,Ti.k,Ti.E,xc.a,Uc.a,Ti.x,[2,Ic.a],[2,Oc.a]],null,{ionScroll:"ionScroll"}),(l()(),Ti._27(1,["\n  "])),(l()(),Ti._6(0,null,2,5,"ion-refresher",[],[[2,"refresher-active",null],[4,"top",null]],[[null,"ionRefresh"]],function(l,n,u){var t=!0;if("ionRefresh"===n){t=!1!==l.component.refreshGetUnhandleSelfGiftList(u)&&t}return t},null,null)),Ti._4(212992,null,0,E_.a,[Dc.a,Fc.a,Ti.x,Cc.l],null,{ionRefresh:"ionRefresh"}),(l()(),Ti._27(null,["\n\t\t"])),(l()(),Ti._6(0,null,null,1,"ion-refresher-content",[],[[1,"state",0]],null,null,M_.b,M_.a)),Ti._4(114688,null,0,L_.a,[E_.a,kc.a],null,null),(l()(),Ti._27(null,["\n  "])),(l()(),Ti._27(1,["\n  "])),(l()(),Ti._6(0,null,1,8,"div",[["class","gift-list"]],null,null,null,null,null)),(l()(),Ti._27(null,["\n\t\t"])),(l()(),Ti._27(null,["\n\t\t"])),(l()(),Ti._0(16777216,null,null,1,null,Un)),Ti._4(16384,null,0,Zc.j,[Ti.O,Ti.K],{ngIf:[0,"ngIf"]},null),(l()(),Ti._27(null,["\n\t\t"])),(l()(),Ti._0(16777216,null,null,1,null,Yn)),Ti._4(802816,null,0,Zc.i,[Ti.O,Ti.K,Ti.r],{ngForOf:[0,"ngForOf"]},null),(l()(),Ti._27(null,["\n\t"])),(l()(),Ti._27(1,["\n\t"])),(l()(),Ti._0(16777216,null,1,1,null,Wn)),Ti._4(16384,null,0,Zc.j,[Ti.O,Ti.K],{ngIf:[0,"ngIf"]},null),(l()(),Ti._27(1,["\n  "])),(l()(),Ti._6(0,null,1,4,"div",[["class","btn-selfview"]],null,[[null,"click"]],function(l,n,u){var t=!0;if("click"===n){t=!1!==l.component.goSelfgift()&&t}return t},null,null)),(l()(),Ti._27(null,["\n    "])),(l()(),Ti._6(0,null,null,1,"span",[],null,null,null,null,null)),(l()(),Ti._27(null,["查看已兑换自提赠品"])),(l()(),Ti._27(null,["\n\t"])),(l()(),Ti._27(1,["\n\t"])),(l()(),Ti._0(16777216,null,1,1,null,Xn)),Ti._4(16384,null,0,Zc.j,[Ti.O,Ti.K],{ngIf:[0,"ngIf"]},null),(l()(),Ti._27(1,["\n\t"])),(l()(),Ti._0(16777216,null,1,1,null,Jn)),Ti._4(16384,null,0,Zc.j,[Ti.O,Ti.K],{ngIf:[0,"ngIf"]},null),(l()(),Ti._27(1,["\n  "])),(l()(),Ti._0(16777216,null,1,1,null,Qn)),Ti._4(16384,null,0,Zc.j,[Ti.O,Ti.K],{ngIf:[0,"ngIf"]},null),(l()(),Ti._27(1,["\n"])),(l()(),Ti._27(null,["\n"]))],function(l,n){var u=n.component;l(n,8,0),l(n,11,0);l(n,18,0,u.loadingShow);l(n,21,0,u.unhandleSeflGiftArray);l(n,25,0,u.toTop);l(n,34,0,u.noData);l(n,37,0,u.showNoMore);l(n,40,0,!u.showNoMore)},function(l,n){l(n,4,0,Ti._20(n,5).statusbarPadding,Ti._20(n,5)._hasRefresher);l(n,7,0,"inactive"!==Ti._20(n,8).state,Ti._20(n,8)._top);l(n,10,0,Ti._20(n,11).r.state)})}function lu(l){return Ti._29(0,[(l()(),Ti._6(0,null,null,9,"div",[["class","loading-wrapper"]],null,null,null,null,null)),(l()(),Ti._27(null,["\n\t\t\t"])),(l()(),Ti._6(0,null,null,4,"div",[],null,null,null,null,null)),(l()(),Ti._27(null,["\n\t\t\t\t"])),(l()(),Ti._6(0,null,null,1,"ion-spinner",[["item-start",""]],[[2,"spinner-paused",null]],null,null,q_.b,q_.a)),Ti._4(114688,null,0,R_.a,[kc.a,Ti.k,Ti.E],{name:[0,"name"]},null),(l()(),Ti._27(null,["\n\t\t\t"])),(l()(),Ti._27(null,["\n\t\t\t"])),(l()(),Ti._6(0,null,null,0,"div",[],[[8,"innerHTML",1]],null,null,null,null)),(l()(),Ti._27(null,["\n\t\t"]))],function(l,n){l(n,5,0,n.component.load.spinner)},function(l,n){var u=n.component;l(n,4,0,Ti._20(n,5)._paused);l(n,8,0,u.load.content)})}function nu(l){return Ti._29(0,[(l()(),Ti._6(0,null,null,1,"li",[],null,null,null,null,null)),(l()(),Ti._27(null,["","：",""]))],null,function(l,n){l(n,1,0,n.context.$implicit.label,n.context.$implicit.value)})}function uu(l){return Ti._29(0,[(l()(),Ti._6(0,null,null,52,"div",[["class","gift-item"]],null,null,null,null,null)),(l()(),Ti._27(null,["\n\t\t\t"])),(l()(),Ti._6(0,null,null,30,"dl",[],null,null,null,null,null)),(l()(),Ti._27(null,["\n\t\t\t"])),(l()(),Ti._6(0,null,null,2,"dt",[],null,null,null,null,null)),(l()(),Ti._6(0,null,null,1,"img",[["alt",""]],[[8,"src",4]],null,null,null,null)),Ti._23(1),(l()(),Ti._27(null,["\n\t\t\t"])),(l()(),Ti._6(0,null,null,7,"dd",[["class","product-title"]],null,null,null,null,null)),(l()(),Ti._27(null,["\n\t\t\t\t"])),(l()(),Ti._6(0,null,null,1,"h2",[],null,null,null,null,null)),(l()(),Ti._27(null,["",""])),(l()(),Ti._27(null,["\n\t\t\t\t"])),(l()(),Ti._6(0,null,null,1,"span",[["class","unstart"]],null,null,null,null,null)),(l()(),Ti._27(null,["立即兑换"])),(l()(),Ti._27(null,["\n\t\t\t"])),(l()(),Ti._27(null,["\n\t\t\t"])),(l()(),Ti._6(0,null,null,7,"dd",[["class","reserve-phone"]],null,null,null,null,null)),(l()(),Ti._27(null,["\n\t\t\t\t\t\t"])),(l()(),Ti._6(0,null,null,1,"span",[],null,null,null,null,null)),(l()(),Ti._27(null,["预约手机：",""])),(l()(),Ti._27(null,["\n\t\t\t\t"])),(l()(),Ti._6(0,null,null,1,"a",[],[[8,"href",4]],null,null,null,null)),(l()(),Ti._6(0,null,null,0,"img",[["src","./assets/image/phone.png"]],null,null,null,null,null)),(l()(),Ti._27(null,["\n\t\t\t"])),(l()(),Ti._27(null,["\n\t\t\t"])),(l()(),Ti._6(0,null,null,1,"dd",[["class","member-phone"]],null,null,null,null,null)),(l()(),Ti._27(null,["会员手机：",""])),(l()(),Ti._27(null,["\n\t\t\t"])),(l()(),Ti._6(0,null,null,2,"dd",[["class","get-time"]],null,null,null,null,null)),(l()(),Ti._27(null,["领取时间：",""])),Ti._23(2),(l()(),Ti._27(null,["\n\t\t\t"])),(l()(),Ti._27(null,["\n\t\t\t"])),(l()(),Ti._6(0,null,null,17,"div",[["class","reserve-time"]],null,null,null,null,null)),(l()(),Ti._27(null,["\n\t\t\t\t"])),(l()(),Ti._6(0,null,null,7,"div",[["class","member-info"]],null,null,null,null,null)),(l()(),Ti._27(null,["\n\t\t\t\t\t"])),(l()(),Ti._6(0,null,null,4,"ul",[],null,null,null,null,null)),(l()(),Ti._27(null,["\n\t\t\t\t\t\t"])),(l()(),Ti._0(16777216,null,null,1,null,nu)),Ti._4(802816,null,0,Zc.i,[Ti.O,Ti.K,Ti.r],{ngForOf:[0,"ngForOf"]},null),(l()(),Ti._27(null,["\n\t\t\t\t\t"])),(l()(),Ti._27(null,["\n\t\t\t\t"])),(l()(),Ti._27(null,["\n\t\t\t\t"])),(l()(),Ti._6(0,null,null,5,"div",[["class","btn-time"]],null,null,null,null,null)),(l()(),Ti._27(null,["\n\t\t\t\t\t"])),(l()(),Ti._6(0,null,null,2,"button",[["ion-button",""],["round",""]],null,[[null,"click"]],function(l,n,u){var t=!0;if("click"===n){t=!1!==l.component.sendProduct(l.context.index)&&t}return t},t_.b,t_.a)),Ti._4(1097728,null,0,e_.a,[[8,""],kc.a,Ti.k,Ti.E],{round:[0,"round"]},null),(l()(),Ti._27(0,["发货"])),(l()(),Ti._27(null,["\n\t\t\t\t"])),(l()(),Ti._27(null,["\n\t\t\t"])),(l()(),Ti._27(null,["\n\t\t"]))],function(l,n){l(n,41,0,n.context.$implicit.attrValueList);l(n,48,0,"")},function(l,n){l(n,5,0,Ti._28(n,5,0,l(n,6,0,Ti._20(n.parent,0),n.context.$implicit.imageName)));l(n,11,0,n.context.$implicit.giftName);l(n,20,0,n.context.$implicit.reservePhone);l(n,22,0,Ti._9(1,"tel:",n.context.$implicit.reservePhone,""));l(n,27,0,n.context.$implicit.memberPhone);l(n,30,0,Ti._28(n,30,0,l(n,31,0,Ti._20(n.parent,1),n.context.$implicit.receiveDate,"yyyy-MM-dd HH:mm:ss")))})}function tu(l){return Ti._29(0,[(l()(),Ti._6(0,null,null,6,"div",[["class","no-data"]],null,null,null,null,null)),(l()(),Ti._27(null,["\n\t\t"])),(l()(),Ti._6(0,null,null,0,"img",[["alt",""],["src","./assets/image/nodata.png"]],null,null,null,null,null)),(l()(),Ti._27(null,["\n\t\t"])),(l()(),Ti._6(0,null,null,1,"p",[],null,null,null,null,null)),(l()(),Ti._27(null,["空空如也"])),(l()(),Ti._27(null,["\n\t"]))],null,null)}function eu(l){return Ti._29(0,[(l()(),Ti._6(0,null,null,4,"div",[["class","btn-noMore"]],null,null,null,null,null)),(l()(),Ti._27(null,["\n\t\t"])),(l()(),Ti._6(0,null,null,1,"span",[],null,null,null,null,null)),(l()(),Ti._27(null,["—— 没有更多赠品了 ——"])),(l()(),Ti._27(null,["\n\t"]))],null,null)}function iu(l){return Ti._29(0,[(l()(),Ti._6(0,null,null,5,"ion-infinite-scroll",[],null,[[null,"ionInfinite"]],function(l,n,u){var t=!0;if("ionInfinite"===n){t=!1!==l.component.infiniteGetUnhandleExpressGiftList(u)&&t}return t},null,null)),Ti._4(1196032,null,0,$_.a,[Fc.a,Ti.x,Ti.k,Tc.a],null,{ionInfinite:"ionInfinite"}),(l()(),Ti._27(null,["\n    "])),(l()(),Ti._6(0,null,null,1,"ion-infinite-scroll-content",[["loadingText","加载更多..."]],[[1,"state",0]],null,null,G_.b,G_.a)),Ti._4(114688,null,0,K_.a,[$_.a,kc.a],{loadingText:[0,"loadingText"]},null),(l()(),Ti._27(null,["\n  "]))],function(l,n){l(n,4,0,"加载更多...")},function(l,n){l(n,3,0,Ti._20(n,4).inf.state)})}function au(l){return Ti._29(0,[Ti._21(0,Cs,[]),Ti._21(0,Zc.d,[Ti.t]),Ti._25(402653184,1,{content:0}),(l()(),Ti._6(0,null,null,34,"ion-content",[],[[2,"statusbar-padding",null],[2,"has-refresher",null]],[["window","resize"]],function(l,n,u){var t=!0;if("window:resize"===n){t=!1!==Ti._20(l,4).resize()&&t}return t},Nc.b,Nc.a)),Ti._4(4374528,[[1,4]],0,Fc.a,[kc.a,Dc.a,Tc.a,Ti.k,Ti.E,xc.a,Uc.a,Ti.x,[2,Ic.a],[2,Oc.a]],null,null),(l()(),Ti._27(1,["\n\t"])),(l()(),Ti._6(0,null,2,5,"ion-refresher",[],[[2,"refresher-active",null],[4,"top",null]],[[null,"ionRefresh"]],function(l,n,u){var t=!0;if("ionRefresh"===n){t=!1!==l.component.refreshGetUnhandleExpressGiftList(u)&&t}return t},null,null)),Ti._4(212992,null,0,E_.a,[Dc.a,Fc.a,Ti.x,Cc.l],null,{ionRefresh:"ionRefresh"}),(l()(),Ti._27(null,["\n\t\t"])),(l()(),Ti._6(0,null,null,1,"ion-refresher-content",[],[[1,"state",0]],null,null,M_.b,M_.a)),Ti._4(114688,null,0,L_.a,[E_.a,kc.a],null,null),(l()(),Ti._27(null,["\n\t"])),(l()(),Ti._27(1,["\n  "])),(l()(),Ti._6(0,null,1,8,"div",[["class","gift-list"]],null,null,null,null,null)),(l()(),Ti._27(null,["\n\t\t"])),(l()(),Ti._27(null,["\n    "])),(l()(),Ti._0(16777216,null,null,1,null,lu)),Ti._4(16384,null,0,Zc.j,[Ti.O,Ti.K],{ngIf:[0,"ngIf"]},null),(l()(),Ti._27(null,["\n\t\t"])),(l()(),Ti._0(16777216,null,null,1,null,uu)),Ti._4(802816,null,0,Zc.i,[Ti.O,Ti.K,Ti.r],{ngForOf:[0,"ngForOf"]},null),(l()(),Ti._27(null,["\n  "])),(l()(),Ti._27(1,["\n  "])),(l()(),Ti._6(0,null,1,4,"div",[["class","btn-selfview"]],null,[[null,"click"]],function(l,n,u){var t=!0;if("click"===n){t=!1!==l.component.goExpressgift()&&t}return t},null,null)),(l()(),Ti._27(null,["\n\t\t"])),(l()(),Ti._6(0,null,null,1,"span",[],null,null,null,null,null)),(l()(),Ti._27(null,["查看已发货赠品"])),(l()(),Ti._27(null,["\n\t"])),(l()(),Ti._27(1,["\n\t"])),(l()(),Ti._0(16777216,null,1,1,null,tu)),Ti._4(16384,null,0,Zc.j,[Ti.O,Ti.K],{ngIf:[0,"ngIf"]},null),(l()(),Ti._27(1,["\n\t"])),(l()(),Ti._0(16777216,null,1,1,null,eu)),Ti._4(16384,null,0,Zc.j,[Ti.O,Ti.K],{ngIf:[0,"ngIf"]},null),(l()(),Ti._27(1,["\n  "])),(l()(),Ti._0(16777216,null,1,1,null,iu)),Ti._4(16384,null,0,Zc.j,[Ti.O,Ti.K],{ngIf:[0,"ngIf"]},null),(l()(),Ti._27(1,["\n\n"])),(l()(),Ti._27(null,["\n"]))],function(l,n){var u=n.component;l(n,7,0),l(n,10,0);l(n,17,0,u.loadingShow);l(n,20,0,u.unhandleExpressGiftArray);l(n,30,0,u.noData);l(n,33,0,u.showNoMore);l(n,36,0,!u.showNoMore)},function(l,n){l(n,3,0,Ti._20(n,4).statusbarPadding,Ti._20(n,4)._hasRefresher);l(n,6,0,"inactive"!==Ti._20(n,7).state,Ti._20(n,7)._top);l(n,9,0,Ti._20(n,10).r.state)})}function ou(l){return Ti._29(0,[(l()(),Ti._6(0,null,null,5,"ion-refresher",[],[[2,"refresher-active",null],[4,"top",null]],[[null,"ionRefresh"]],function(l,n,u){var t=!0;if("ionRefresh"===n){t=!1!==l.component.refreshGetHandleSelfGiftList(u)&&t}return t},null,null)),Ti._4(212992,null,0,E_.a,[Dc.a,Fc.a,Ti.x,Cc.l],null,{ionRefresh:"ionRefresh"}),(l()(),Ti._27(null,["\n    "])),(l()(),Ti._6(0,null,null,1,"ion-refresher-content",[],[[1,"state",0]],null,null,M_.b,M_.a)),Ti._4(114688,null,0,L_.a,[E_.a,kc.a],null,null),(l()(),Ti._27(null,["\n  "]))],function(l,n){l(n,1,0),l(n,4,0)},function(l,n){l(n,0,0,"inactive"!==Ti._20(n,1).state,Ti._20(n,1)._top);l(n,3,0,Ti._20(n,4).r.state)})}function ru(l){return Ti._29(0,[(l()(),Ti._6(0,null,null,9,"div",[["class","loading-wrapper"]],null,null,null,null,null)),(l()(),Ti._27(null,["\n\t\t"])),(l()(),Ti._6(0,null,null,4,"div",[],null,null,null,null,null)),(l()(),Ti._27(null,["\n\t\t\t"])),(l()(),Ti._6(0,null,null,1,"ion-spinner",[["item-start",""]],[[2,"spinner-paused",null]],null,null,q_.b,q_.a)),Ti._4(114688,null,0,R_.a,[kc.a,Ti.k,Ti.E],{name:[0,"name"]},null),(l()(),Ti._27(null,["\n\t\t"])),(l()(),Ti._27(null,["\n\t\t"])),(l()(),Ti._6(0,null,null,0,"div",[],[[8,"innerHTML",1]],null,null,null,null)),(l()(),Ti._27(null,["\n\t"]))],function(l,n){l(n,5,0,n.component.load.spinner)},function(l,n){var u=n.component;l(n,4,0,Ti._20(n,5)._paused);l(n,8,0,u.load.content)})}function su(l){return Ti._29(0,[(l()(),Ti._6(0,null,null,1,"dd",[["class","member-phone"]],null,null,null,null,null)),(l()(),Ti._27(null,["预约手机：",""]))],null,function(l,n){l(n,1,0,n.parent.context.$implicit.reservePhone)})}function cu(l){return Ti._29(0,[(l()(),Ti._6(0,null,null,2,"div",[["class","show-time"]],null,null,null,null,null)),(l()(),Ti._27(null,["预约到店时间：",""])),Ti._23(2)],null,function(l,n){l(n,1,0,Ti._28(n,1,0,l(n,2,0,Ti._20(n.parent.parent,2),n.parent.context.$implicit.reserveShopTime,"yyyy-MM-dd HH:mm:ss")))})}function _u(l){return Ti._29(0,[(l()(),Ti._6(0,null,null,41,"div",[["class","gift-item"]],null,null,null,null,null)),(l()(),Ti._27(null,["\n\t  "])),(l()(),Ti._6(0,null,null,29,"dl",[],null,null,null,null,null)),(l()(),Ti._27(null,["\n\t\t"])),(l()(),Ti._6(0,null,null,2,"dt",[],null,null,null,null,null)),(l()(),Ti._6(0,null,null,1,"img",[["alt",""]],[[8,"src",4]],null,null,null,null)),Ti._23(1),(l()(),Ti._27(null,["\n\t\t"])),(l()(),Ti._6(0,null,null,8,"dd",[["class","product-title"]],null,null,null,null,null)),(l()(),Ti._27(null,["\n\t\t  "])),(l()(),Ti._6(0,null,null,1,"h2",[],null,null,null,null,null)),(l()(),Ti._27(null,["",""])),(l()(),Ti._27(null,["\n\t\t\t"])),(l()(),Ti._6(0,null,null,2,"span",[["class","unstart"]],null,null,null,null,null)),(l()(),Ti._27(null,["",""])),Ti._23(1),(l()(),Ti._27(null,["\n\t\t"])),(l()(),Ti._27(null,["\n\t\t\t"])),(l()(),Ti._6(0,null,null,1,"dd",[["class","member-phone"]],null,null,null,null,null)),(l()(),Ti._27(null,["会员手机：",""])),(l()(),Ti._27(null,["\n\t\t\t"])),(l()(),Ti._0(16777216,null,null,1,null,su)),Ti._4(16384,null,0,Zc.j,[Ti.O,Ti.K],{ngIf:[0,"ngIf"]},null),(l()(),Ti._27(null,["\n\t\t  "])),(l()(),Ti._6(0,null,null,2,"dd",[["class","get-time"]],null,null,null,null,null)),(l()(),Ti._27(null,["领取时间：",""])),Ti._23(2),(l()(),Ti._27(null,["\n\t\t  "])),(l()(),Ti._6(0,null,null,2,"dd",[["class","get-time exchangeTime"]],null,null,null,null,null)),(l()(),Ti._27(null,["兑换时间：",""])),Ti._23(2),(l()(),Ti._27(null,["\n\t  "])),(l()(),Ti._27(null,["\n\t  "])),(l()(),Ti._6(0,null,null,7,"div",[["class","reserve-time"]],null,null,null,null,null)),(l()(),Ti._27(null,["\n\t\t"])),(l()(),Ti._0(16777216,null,null,1,null,cu)),Ti._4(16384,null,0,Zc.j,[Ti.O,Ti.K],{ngIf:[0,"ngIf"]},null),(l()(),Ti._27(null,["\n\t\t"])),(l()(),Ti._6(0,null,null,1,"div",[["class","show-time"]],null,null,null,null,null)),(l()(),Ti._27(null,["导购员：",""])),(l()(),Ti._27(null,["\n\t  "])),(l()(),Ti._27(null,["\n\t"]))],function(l,n){l(n,22,0,"0"==n.context.$implicit.giftType);l(n,36,0,"0"==n.context.$implicit.giftType)},function(l,n){l(n,5,0,Ti._28(n,5,0,l(n,6,0,Ti._20(n.parent,0),n.context.$implicit.imageName)));l(n,11,0,n.context.$implicit.giftName);l(n,14,0,Ti._28(n,14,0,l(n,15,0,Ti._20(n.parent,1),n.context.$implicit.giftType)));l(n,19,0,n.context.$implicit.memberPhone);l(n,25,0,Ti._28(n,25,0,l(n,26,0,Ti._20(n.parent,2),n.context.$implicit.receiveDate,"yyyy-MM-dd HH:mm:ss")));l(n,29,0,Ti._28(n,29,0,l(n,30,0,Ti._20(n.parent,2),n.context.$implicit.useDate,"yyyy-MM-dd HH:mm:ss")));l(n,39,0,n.context.$implicit.brandshopUserName)})}function du(l){return Ti._29(0,[(l()(),Ti._6(0,null,null,5,"ion-infinite-scroll",[],null,[[null,"ionInfinite"]],function(l,n,u){var t=!0;if("ionInfinite"===n){t=!1!==l.component.infiniteGetHandleSelfGiftList(u)&&t}return t},null,null)),Ti._4(1196032,null,0,$_.a,[Fc.a,Ti.x,Ti.k,Tc.a],null,{ionInfinite:"ionInfinite"}),(l()(),Ti._27(null,["\n\t\t"])),(l()(),Ti._6(0,null,null,1,"ion-infinite-scroll-content",[["loadingText","加载更多..."]],[[1,"state",0]],null,null,G_.b,G_.a)),Ti._4(114688,null,0,K_.a,[$_.a,kc.a],{loadingText:[0,"loadingText"]},null),(l()(),Ti._27(null,["\n\t"]))],function(l,n){l(n,4,0,"加载更多...")},function(l,n){l(n,3,0,Ti._20(n,4).inf.state)})}function pu(l){return Ti._29(0,[(l()(),Ti._6(0,null,null,6,"div",[["class","no-data"]],null,null,null,null,null)),(l()(),Ti._27(null,["\n\t\t"])),(l()(),Ti._6(0,null,null,0,"img",[["alt",""],["src","./assets/image/nodata.png"]],null,null,null,null,null)),(l()(),Ti._27(null,["\n\t\t"])),(l()(),Ti._6(0,null,null,1,"p",[],null,null,null,null,null)),(l()(),Ti._27(null,["空空如也"])),(l()(),Ti._27(null,["\n\t"]))],null,null)}function fu(l){return Ti._29(0,[(l()(),Ti._6(0,null,null,4,"div",[["class","btn-noMore"]],null,null,null,null,null)),(l()(),Ti._27(null,["\n\t\t"])),(l()(),Ti._6(0,null,null,1,"span",[],null,null,null,null,null)),(l()(),Ti._27(null,["—— 没有更多已兑换赠品了 ——"])),(l()(),Ti._27(null,["\n\t"]))],null,null)}function hu(l){return Ti._29(0,[(l()(),Ti._6(0,null,null,10,"div",[["class","request-defeat"]],null,null,null,null,null)),(l()(),Ti._27(null,["\n\t\t"])),(l()(),Ti._6(0,null,null,0,"img",[["alt",""],["src","./assets/image/requestDefeat.png"]],null,null,null,null,null)),(l()(),Ti._27(null,["\n\t\t"])),(l()(),Ti._6(0,null,null,1,"p",[],null,null,null,null,null)),(l()(),Ti._27(null,["啊哦！页面走丢了"])),(l()(),Ti._27(null,["\n\t\t"])),(l()(),Ti._6(0,null,null,2,"button",[["class","btn-request-defeat"],["full",""],["ion-button",""]],null,[[null,"touchstart"]],function(l,n,u){var t=!0;if("touchstart"===n){t=!1!==l.component.requestDefeatRefresh()&&t}return t},t_.b,t_.a)),Ti._4(1097728,null,0,e_.a,[[8,""],kc.a,Ti.k,Ti.E],{full:[0,"full"]},null),(l()(),Ti._27(0,["\n\t\t\t刷新再找一找\n\t\t"])),(l()(),Ti._27(null,["\n\t"]))],function(l,n){l(n,8,0,"")},null)}function gu(l){return Ti._29(0,[Ti._21(0,Cs,[]),Ti._21(0,Ss,[]),Ti._21(0,Zc.d,[Ti.t]),Ti._25(402653184,1,{content:0}),(l()(),Ti._6(0,null,null,10,"ion-header",[],null,null,null,null,null)),Ti._4(16384,null,0,Lc.a,[kc.a,Ti.k,Ti.E,[2,Ic.a]],null,null),(l()(),Ti._27(null,["\n  "])),(l()(),Ti._6(0,null,null,6,"ion-navbar",[["class","toolbar"]],[[8,"hidden",0],[2,"statusbar-padding",null]],null,null,qc.b,qc.a)),Ti._4(49152,null,0,Rc.a,[xc.a,[2,Ic.a],[2,Oc.a],kc.a,Ti.k,Ti.E],null,null),(l()(),Ti._27(3,["\n    "])),(l()(),Ti._6(0,null,3,2,"ion-title",[["text-center",""]],null,null,null,$c.b,$c.a)),Ti._4(49152,null,0,Gc.a,[kc.a,Ti.k,Ti.E,[2,Kc.a],[2,Rc.a]],null,null),(l()(),Ti._27(0,["已兑换自提赠品"])),(l()(),Ti._27(3,["\n  "])),(l()(),Ti._27(null,["\n"])),(l()(),Ti._27(null,["\n"])),(l()(),Ti._6(0,null,null,27,"ion-content",[],[[2,"statusbar-padding",null],[2,"has-refresher",null]],[["window","resize"]],function(l,n,u){var t=!0;if("window:resize"===n){t=!1!==Ti._20(l,17).resize()&&t}return t},Nc.b,Nc.a)),Ti._4(4374528,[[1,4]],0,Fc.a,[kc.a,Dc.a,Tc.a,Ti.k,Ti.E,xc.a,Uc.a,Ti.x,[2,Ic.a],[2,Oc.a]],null,null),(l()(),Ti._27(1,["\n\t"])),(l()(),Ti._0(16777216,null,2,1,null,ou)),Ti._4(16384,null,0,Zc.j,[Ti.O,Ti.K],{ngIf:[0,"ngIf"]},null),(l()(),Ti._27(1,["\n  "])),(l()(),Ti._6(0,null,1,20,"div",[["class","gift-list"]],null,null,null,null,null)),(l()(),Ti._27(null,["\n\t"])),(l()(),Ti._27(null,["\n\t"])),(l()(),Ti._0(16777216,null,null,1,null,ru)),Ti._4(16384,null,0,Zc.j,[Ti.O,Ti.K],{ngIf:[0,"ngIf"]},null),(l()(),Ti._27(null,["\n\t"])),(l()(),Ti._0(16777216,null,null,1,null,_u)),Ti._4(802816,null,0,Zc.i,[Ti.O,Ti.K,Ti.r],{ngForOf:[0,"ngForOf"]},null),(l()(),Ti._27(null,["\n\t"])),(l()(),Ti._0(16777216,null,null,1,null,du)),Ti._4(16384,null,0,Zc.j,[Ti.O,Ti.K],{ngIf:[0,"ngIf"]},null),(l()(),Ti._27(null,["\n\t"])),(l()(),Ti._0(16777216,null,null,1,null,pu)),Ti._4(16384,null,0,Zc.j,[Ti.O,Ti.K],{ngIf:[0,"ngIf"]},null),(l()(),Ti._27(null,["\n\t"])),(l()(),Ti._0(16777216,null,null,1,null,fu)),Ti._4(16384,null,0,Zc.j,[Ti.O,Ti.K],{ngIf:[0,"ngIf"]},null),(l()(),Ti._27(null,["\n\t"])),(l()(),Ti._0(16777216,null,null,1,null,hu)),Ti._4(16384,null,0,Zc.j,[Ti.O,Ti.K],{ngIf:[0,"ngIf"]},null),(l()(),Ti._27(null,["\n"])),(l()(),Ti._27(1,["\n"])),(l()(),Ti._27(null,["\n"]))],function(l,n){var u=n.component;l(n,20,0,!u.loadingShow);l(n,26,0,u.loadingShow);l(n,29,0,u.handleSeflGiftArray);l(n,32,0,!u.showNoMore&&u.showInfinite);l(n,35,0,u.noData);l(n,38,0,u.showNoMore);l(n,41,0,u.requestDefeat)},function(l,n){l(n,7,0,Ti._20(n,8)._hidden,Ti._20(n,8)._sbPadding);l(n,16,0,Ti._20(n,17).statusbarPadding,Ti._20(n,17)._hasRefresher)})}function mu(l){return Ti._29(0,[(l()(),Ti._6(0,null,null,5,"ion-refresher",[],[[2,"refresher-active",null],[4,"top",null]],[[null,"ionRefresh"]],function(l,n,u){var t=!0;if("ionRefresh"===n){t=!1!==l.component.refreshGetHandleExpressGiftList(u)&&t}return t},null,null)),Ti._4(212992,null,0,E_.a,[Dc.a,Fc.a,Ti.x,Cc.l],null,{ionRefresh:"ionRefresh"}),(l()(),Ti._27(null,["\n    "])),(l()(),Ti._6(0,null,null,1,"ion-refresher-content",[],[[1,"state",0]],null,null,M_.b,M_.a)),Ti._4(114688,null,0,L_.a,[E_.a,kc.a],null,null),(l()(),Ti._27(null,["\n  "]))],function(l,n){l(n,1,0),l(n,4,0)},function(l,n){l(n,0,0,"inactive"!==Ti._20(n,1).state,Ti._20(n,1)._top);l(n,3,0,Ti._20(n,4).r.state)})}function vu(l){return Ti._29(0,[(l()(),Ti._6(0,null,null,9,"div",[["class","loading-wrapper"]],null,null,null,null,null)),(l()(),Ti._27(null,["\n      "])),(l()(),Ti._6(0,null,null,4,"div",[],null,null,null,null,null)),(l()(),Ti._27(null,["\n        "])),(l()(),Ti._6(0,null,null,1,"ion-spinner",[["item-start",""]],[[2,"spinner-paused",null]],null,null,q_.b,q_.a)),Ti._4(114688,null,0,R_.a,[kc.a,Ti.k,Ti.E],{name:[0,"name"]},null),(l()(),Ti._27(null,["\n      "])),(l()(),Ti._27(null,["\n      "])),(l()(),Ti._6(0,null,null,0,"div",[],[[8,"innerHTML",1]],null,null,null,null)),(l()(),Ti._27(null,["\n    "]))],function(l,n){l(n,5,0,n.component.load.spinner)},function(l,n){var u=n.component;l(n,4,0,Ti._20(n,5)._paused);l(n,8,0,u.load.content)})}function bu(l){return Ti._29(0,[(l()(),Ti._6(0,null,null,1,"li",[],null,null,null,null,null)),(l()(),Ti._27(null,["","：",""]))],null,function(l,n){l(n,1,0,n.context.$implicit.label,n.context.$implicit.value)})}function wu(l){return Ti._29(0,[(l()(),Ti._6(0,null,null,52,"div",[["class","gift-item"]],null,null,null,null,null)),(l()(),Ti._27(null,["\n      "])),(l()(),Ti._6(0,null,null,31,"dl",[],null,null,null,null,null)),(l()(),Ti._27(null,["\n        "])),(l()(),Ti._6(0,null,null,2,"dt",[],null,null,null,null,null)),(l()(),Ti._6(0,null,null,1,"img",[["alt",""]],[[8,"src",4]],null,null,null,null)),Ti._23(1),(l()(),Ti._27(null,["\n        "])),(l()(),Ti._6(0,null,null,7,"dd",[["class","product-title"]],null,null,null,null,null)),(l()(),Ti._27(null,["\n          "])),(l()(),Ti._6(0,null,null,1,"h2",[],null,null,null,null,null)),(l()(),Ti._27(null,["",""])),(l()(),Ti._27(null,["\n          "])),(l()(),Ti._6(0,null,null,1,"span",[["class","unstart"]],null,null,null,null,null)),(l()(),Ti._27(null,["立即兑换"])),(l()(),Ti._27(null,["\n        "])),(l()(),Ti._27(null,["\n        "])),(l()(),Ti._6(0,null,null,4,"dd",[["class","reserve-phone"]],null,null,null,null,null)),(l()(),Ti._27(null,["\n          "])),(l()(),Ti._6(0,null,null,1,"span",[],null,null,null,null,null)),(l()(),Ti._27(null,["会员手机：",""])),(l()(),Ti._27(null,["\n        "])),(l()(),Ti._27(null,["\n        "])),(l()(),Ti._6(0,null,null,2,"dd",[["class","get-time"]],null,null,null,null,null)),(l()(),Ti._27(null,["领取时间：",""])),Ti._23(2),(l()(),Ti._27(null,["\n        "])),(l()(),Ti._6(0,null,null,2,"dd",[["class","get-time"]],null,null,null,null,null)),(l()(),Ti._27(null,["兑换时间：",""])),Ti._23(2),(l()(),Ti._27(null,["\n        "])),(l()(),Ti._6(0,null,null,1,"dd",[["class","get-time"]],null,null,null,null,null)),(l()(),Ti._27(null,["导购员：",""])),(l()(),Ti._27(null,["\n      "])),(l()(),Ti._27(null,["\n      "])),(l()(),Ti._6(0,null,null,10,"div",[["class","reserve-time member-box"]],null,null,null,null,null)),(l()(),Ti._27(null,["\n        "])),(l()(),Ti._6(0,null,null,7,"div",[["class","member-info"]],null,null,null,null,null)),(l()(),Ti._27(null,["\n          "])),(l()(),Ti._6(0,null,null,4,"ul",[],null,null,null,null,null)),(l()(),Ti._27(null,["\n            "])),(l()(),Ti._0(16777216,null,null,1,null,bu)),Ti._4(802816,null,0,Zc.i,[Ti.O,Ti.K,Ti.r],{ngForOf:[0,"ngForOf"]},null),(l()(),Ti._27(null,["\n          "])),(l()(),Ti._27(null,["\n        "])),(l()(),Ti._27(null,["\n      "])),(l()(),Ti._27(null,["\n      "])),(l()(),Ti._6(0,null,null,4,"div",[["class","reserve-time"]],null,null,null,null,null)),(l()(),Ti._27(null,["\n        "])),(l()(),Ti._6(0,null,null,1,"div",[["class","show-time"]],null,null,null,null,null)),(l()(),Ti._27(null,["备注信息："," ",""])),(l()(),Ti._27(null,["\n      "])),(l()(),Ti._27(null,["\n    "]))],function(l,n){l(n,42,0,n.context.$implicit.attrValueList)},function(l,n){l(n,5,0,Ti._28(n,5,0,l(n,6,0,Ti._20(n.parent,0),n.context.$implicit.imageName)));l(n,11,0,n.context.$implicit.giftName);l(n,20,0,n.context.$implicit.memberPhone);l(n,24,0,Ti._28(n,24,0,l(n,25,0,Ti._20(n.parent,1),n.context.$implicit.receiveDate,"yyyy-MM-dd HH:mm:ss")));l(n,28,0,Ti._28(n,28,0,l(n,29,0,Ti._20(n.parent,1),n.context.$implicit.useDate,"yyyy-MM-dd HH:mm:ss")));l(n,32,0,n.context.$implicit.brandshopUserName);l(n,50,0,n.context.$implicit.expressCompany,n.context.$implicit.expressNo)})}function yu(l){return Ti._29(0,[(l()(),Ti._6(0,null,null,6,"div",[["class","no-data"]],null,null,null,null,null)),(l()(),Ti._27(null,["\n      "])),(l()(),Ti._6(0,null,null,0,"img",[["alt",""],["src","./assets/image/nodata.png"]],null,null,null,null,null)),(l()(),Ti._27(null,["\n      "])),(l()(),Ti._6(0,null,null,1,"p",[],null,null,null,null,null)),(l()(),Ti._27(null,["空空如也"])),(l()(),Ti._27(null,["\n    "]))],null,null)}function Su(l){return Ti._29(0,[(l()(),Ti._6(0,null,null,4,"div",[["class","btn-noMore"]],null,null,null,null,null)),(l()(),Ti._27(null,["\n      "])),(l()(),Ti._6(0,null,null,1,"span",[],null,null,null,null,null)),(l()(),Ti._27(null,["—— 没有更多已兑换赠品了 ——"])),(l()(),Ti._27(null,["\n    "]))],null,null)}function Iu(l){return Ti._29(0,[(l()(),Ti._6(0,null,null,10,"div",[["class","request-defeat"]],null,null,null,null,null)),(l()(),Ti._27(null,["\n      "])),(l()(),Ti._6(0,null,null,0,"img",[["alt",""],["src","./assets/image/requestDefeat.png"]],null,null,null,null,null)),(l()(),Ti._27(null,["\n      "])),(l()(),Ti._6(0,null,null,1,"p",[],null,null,null,null,null)),(l()(),Ti._27(null,["啊哦！页面走丢了"])),(l()(),Ti._27(null,["\n      "])),(l()(),Ti._6(0,null,null,2,"button",[["class","btn-request-defeat"],["full",""],["ion-button",""]],null,[[null,"touchstart"]],function(l,n,u){var t=!0;if("touchstart"===n){t=!1!==l.component.requestDefeatRefresh()&&t}return t},t_.b,t_.a)),Ti._4(1097728,null,0,e_.a,[[8,""],kc.a,Ti.k,Ti.E],{full:[0,"full"]},null),(l()(),Ti._27(0,["\n        刷新再找一找\n      "])),(l()(),Ti._27(null,["\n    "]))],function(l,n){l(n,8,0,"")},null)}function Ou(l){return Ti._29(0,[(l()(),Ti._6(0,null,null,5,"ion-infinite-scroll",[],null,[[null,"ionInfinite"]],function(l,n,u){var t=!0;if("ionInfinite"===n){t=!1!==l.component.infiniteGetHandleExpressGiftList(u)&&t}return t},null,null)),Ti._4(1196032,null,0,$_.a,[Fc.a,Ti.x,Ti.k,Tc.a],null,{ionInfinite:"ionInfinite"}),(l()(),Ti._27(null,["\n      "])),(l()(),Ti._6(0,null,null,1,"ion-infinite-scroll-content",[["loadingText","加载更多..."]],[[1,"state",0]],null,null,G_.b,G_.a)),Ti._4(114688,null,0,K_.a,[$_.a,kc.a],{loadingText:[0,"loadingText"]},null),(l()(),Ti._27(null,["\n    "]))],function(l,n){l(n,4,0,"加载更多...")},function(l,n){l(n,3,0,Ti._20(n,4).inf.state)})}function xu(l){return Ti._29(0,[Ti._21(0,Cs,[]),Ti._21(0,Zc.d,[Ti.t]),Ti._25(402653184,1,{content:0}),(l()(),Ti._6(0,null,null,10,"ion-header",[],null,null,null,null,null)),Ti._4(16384,null,0,Lc.a,[kc.a,Ti.k,Ti.E,[2,Ic.a]],null,null),(l()(),Ti._27(null,["\n  "])),(l()(),Ti._6(0,null,null,6,"ion-navbar",[["class","toolbar"]],[[8,"hidden",0],[2,"statusbar-padding",null]],null,null,qc.b,qc.a)),Ti._4(49152,null,0,Rc.a,[xc.a,[2,Ic.a],[2,Oc.a],kc.a,Ti.k,Ti.E],null,null),(l()(),Ti._27(3,["\n    "])),(l()(),Ti._6(0,null,3,2,"ion-title",[["text-center",""]],null,null,null,$c.b,$c.a)),Ti._4(49152,null,0,Gc.a,[kc.a,Ti.k,Ti.E,[2,Kc.a],[2,Rc.a]],null,null),(l()(),Ti._27(0,["已发货赠品"])),(l()(),Ti._27(3,["\n  "])),(l()(),Ti._27(null,["\n"])),(l()(),Ti._27(null,["\n"])),(l()(),Ti._6(0,null,null,27,"ion-content",[],[[2,"statusbar-padding",null],[2,"has-refresher",null]],[["window","resize"]],function(l,n,u){var t=!0;if("window:resize"===n){t=!1!==Ti._20(l,16).resize()&&t}return t},Nc.b,Nc.a)),Ti._4(4374528,[[1,4]],0,Fc.a,[kc.a,Dc.a,Tc.a,Ti.k,Ti.E,xc.a,Uc.a,Ti.x,[2,Ic.a],[2,Oc.a]],null,null),(l()(),Ti._27(1,["\n  "])),(l()(),Ti._0(16777216,null,2,1,null,mu)),Ti._4(16384,null,0,Zc.j,[Ti.O,Ti.K],{ngIf:[0,"ngIf"]},null),(l()(),Ti._27(1,["\n  "])),(l()(),Ti._6(0,null,1,20,"div",[["class","gift-list"]],null,null,null,null,null)),(l()(),Ti._27(null,["\n    "])),(l()(),Ti._27(null,["\n    "])),(l()(),Ti._0(16777216,null,null,1,null,vu)),Ti._4(16384,null,0,Zc.j,[Ti.O,Ti.K],{ngIf:[0,"ngIf"]},null),(l()(),Ti._27(null,["\n    "])),(l()(),Ti._0(16777216,null,null,1,null,wu)),Ti._4(802816,null,0,Zc.i,[Ti.O,Ti.K,Ti.r],{ngForOf:[0,"ngForOf"]},null),(l()(),Ti._27(null,["\n    "])),(l()(),Ti._0(16777216,null,null,1,null,yu)),Ti._4(16384,null,0,Zc.j,[Ti.O,Ti.K],{ngIf:[0,"ngIf"]},null),(l()(),Ti._27(null,["\n    "])),(l()(),Ti._0(16777216,null,null,1,null,Su)),Ti._4(16384,null,0,Zc.j,[Ti.O,Ti.K],{ngIf:[0,"ngIf"]},null),(l()(),Ti._27(null,["\n    "])),(l()(),Ti._0(16777216,null,null,1,null,Iu)),Ti._4(16384,null,0,Zc.j,[Ti.O,Ti.K],{ngIf:[0,"ngIf"]},null),(l()(),Ti._27(null,["\n    "])),(l()(),Ti._0(16777216,null,null,1,null,Ou)),Ti._4(16384,null,0,Zc.j,[Ti.O,Ti.K],{ngIf:[0,"ngIf"]},null),(l()(),Ti._27(null,["\n  "])),(l()(),Ti._27(1,["\n"])),(l()(),Ti._27(null,["\n"]))],function(l,n){var u=n.component;l(n,19,0,!u.loadingShow);l(n,25,0,u.loadingShow);l(n,28,0,u.handleExpressGiftArray);l(n,31,0,u.noData);l(n,34,0,u.showNoMore);l(n,37,0,u.requestDefeat);l(n,40,0,!u.showNoMore&&u.showInfinite)},function(l,n){l(n,6,0,Ti._20(n,7)._hidden,Ti._20(n,7)._sbPadding);l(n,15,0,Ti._20(n,16).statusbarPadding,Ti._20(n,16)._hasRefresher)})}function ku(l){return Ti._29(0,[(l()(),Ti._6(0,null,null,1,"div",[["class","error"]],null,null,null,null,null)),(l()(),Ti._27(null,["*金额值不可大于当前最多可提现金额值"]))],null,null)}function Du(l){return Ti._29(0,[(l()(),Ti._6(0,null,null,10,"ion-header",[],null,null,null,null,null)),Ti._4(16384,null,0,Lc.a,[kc.a,Ti.k,Ti.E,[2,Ic.a]],null,null),(l()(),Ti._27(null,["\n  "])),(l()(),Ti._6(0,null,null,6,"ion-navbar",[["class","toolbar"]],[[8,"hidden",0],[2,"statusbar-padding",null]],null,null,qc.b,qc.a)),Ti._4(49152,null,0,Rc.a,[xc.a,[2,Ic.a],[2,Oc.a],kc.a,Ti.k,Ti.E],null,null),(l()(),Ti._27(3,["\n    "])),(l()(),Ti._6(0,null,3,2,"ion-title",[["text-center",""]],null,null,null,$c.b,$c.a)),Ti._4(49152,null,0,Gc.a,[kc.a,Ti.k,Ti.E,[2,Kc.a],[2,Rc.a]],null,null),(l()(),Ti._27(0,["提现"])),(l()(),Ti._27(3,["\n  "])),(l()(),Ti._27(null,["\n"])),(l()(),Ti._27(null,["\n"])),(l()(),Ti._6(0,null,null,38,"ion-content",[],[[2,"statusbar-padding",null],[2,"has-refresher",null]],[["window","resize"]],function(l,n,u){var t=!0;if("window:resize"===n){t=!1!==Ti._20(l,13).resize()&&t}return t},Nc.b,Nc.a)),Ti._4(4374528,null,0,Fc.a,[kc.a,Dc.a,Tc.a,Ti.k,Ti.E,xc.a,Uc.a,Ti.x,[2,Ic.a],[2,Oc.a]],null,null),(l()(),Ti._27(1,["\n  "])),(l()(),Ti._6(0,null,1,34,"div",[["class","withdraw"]],null,null,null,null,null)),(l()(),Ti._27(null,["\n    "])),(l()(),Ti._6(0,null,null,1,"h2",[],null,null,null,null,null)),(l()(),Ti._27(null,["输入提现金额"])),(l()(),Ti._27(null,["\n    "])),(l()(),Ti._6(0,null,null,16,"ion-item",[["class","item item-block"]],null,null,null,Vc.b,Vc.a)),Ti._4(1097728,null,3,Bc.a,[Hc.a,kc.a,Ti.k,Ti.E,[2,Yc.a]],null,null),Ti._25(335544320,1,{contentLabel:0}),Ti._25(603979776,2,{_buttons:1}),Ti._25(603979776,3,{_icons:1}),Ti._4(16384,null,0,Wc.a,[],null,null),(l()(),Ti._27(2,["\n    "])),(l()(),Ti._6(0,null,1,2,"ion-label",[],null,null,null,null,null)),Ti._4(16384,[[1,4]],0,l_.a,[kc.a,Ti.k,Ti.E,[8,null],[8,null],[8,null],[8,null]],null,null),(l()(),Ti._27(null,["￥"])),(l()(),Ti._27(2,["\n    "])),(l()(),Ti._6(0,null,3,4,"ion-input",[["type","number"]],[[2,"ng-untouched",null],[2,"ng-touched",null],[2,"ng-pristine",null],[2,"ng-dirty",null],[2,"ng-valid",null],[2,"ng-invalid",null],[2,"ng-pending",null]],[[null,"ngModelChange"]],function(l,n,u){var t=!0;if("ngModelChange"===n){t=!1!==(l.component.amount=u)&&t}return t},Xc.b,Xc.a)),Ti._4(671744,null,0,Jc.j,[[8,null],[8,null],[8,null],[8,null]],{model:[0,"model"]},{update:"ngModelChange"}),Ti._24(2048,null,Jc.h,null,[Jc.j]),Ti._4(16384,null,0,Jc.i,[Jc.h],null,null),Ti._4(5423104,null,0,Qc.a,[kc.a,Dc.a,Hc.a,xc.a,Ti.k,Ti.E,[2,Fc.a],[2,Bc.a],[2,Jc.h],Tc.a],{type:[0,"type"]},null),(l()(),Ti._27(2,["\n  "])),(l()(),Ti._27(null,["\n  "])),(l()(),Ti._6(0,null,null,3,"div",[["class","message"]],null,null,null,null,null)),(l()(),Ti._27(null,["*当前最多可提现金额："])),(l()(),Ti._6(0,null,null,1,"span",[],null,null,null,null,null)),(l()(),Ti._27(null,["￥",""])),(l()(),Ti._27(null,["\n  "])),(l()(),Ti._0(16777216,null,null,1,null,ku)),Ti._4(16384,null,0,Zc.j,[Ti.O,Ti.K],{ngIf:[0,"ngIf"]},null),(l()(),Ti._27(null,["\n  "])),(l()(),Ti._6(0,null,null,2,"button",[["class","btn-confirm"],["ion-button",""]],[[8,"disabled",0]],[[null,"click"]],function(l,n,u){var t=!0;if("click"===n){t=!1!==l.component.withdraw()&&t}return t},t_.b,t_.a)),Ti._4(1097728,null,0,e_.a,[[8,""],kc.a,Ti.k,Ti.E],null,null),(l()(),Ti._27(0,["确定"])),(l()(),Ti._27(null,["\n  "])),(l()(),Ti._27(1,["\n"])),(l()(),Ti._27(null,["\n"]))],function(l,n){var u=n.component;l(n,32,0,u.amount);l(n,35,0,"number");l(n,44,0,u.amout>u.allAmout)},function(l,n){var u=n.component;l(n,3,0,Ti._20(n,4)._hidden,Ti._20(n,4)._sbPadding);l(n,12,0,Ti._20(n,13).statusbarPadding,Ti._20(n,13)._hasRefresher);l(n,31,0,Ti._20(n,34).ngClassUntouched,Ti._20(n,34).ngClassTouched,Ti._20(n,34).ngClassPristine,Ti._20(n,34).ngClassDirty,Ti._20(n,34).ngClassValid,Ti._20(n,34).ngClassInvalid,Ti._20(n,34).ngClassPending);l(n,41,0,u.balance);l(n,46,0,!(u.amount>0)||u.amount>u.balance)})}function Cu(l){return Ti._29(0,[(l()(),Ti._6(0,null,null,9,"div",[["class","loading-wrapper"]],null,null,null,null,null)),(l()(),Ti._27(null,["\n    "])),(l()(),Ti._6(0,null,null,4,"div",[],null,null,null,null,null)),(l()(),Ti._27(null,["\n      "])),(l()(),Ti._6(0,null,null,1,"ion-spinner",[["item-start",""]],[[2,"spinner-paused",null]],null,null,q_.b,q_.a)),Ti._4(114688,null,0,R_.a,[kc.a,Ti.k,Ti.E],{name:[0,"name"]},null),(l()(),Ti._27(null,["\n    "])),(l()(),Ti._27(null,["\n    "])),(l()(),Ti._6(0,null,null,0,"div",[],[[8,"innerHTML",1]],null,null,null,null)),(l()(),Ti._27(null,["\n  "]))],function(l,n){l(n,5,0,n.component.load.spinner)},function(l,n){var u=n.component;l(n,4,0,Ti._20(n,5)._paused);l(n,8,0,u.load.content)})}function ju(l){return Ti._29(0,[(l()(),Ti._6(0,null,null,5,"ion-refresher",[],[[2,"refresher-active",null],[4,"top",null]],[[null,"ionRefresh"]],function(l,n,u){var t=!0;if("ionRefresh"===n){t=!1!==l.component.pullRefresh(u)&&t}return t},null,null)),Ti._4(212992,null,0,E_.a,[Dc.a,Fc.a,Ti.x,Cc.l],null,{ionRefresh:"ionRefresh"}),(l()(),Ti._27(null,["\n    "])),(l()(),Ti._6(0,null,null,1,"ion-refresher-content",[],[[1,"state",0]],null,null,M_.b,M_.a)),Ti._4(114688,null,0,L_.a,[E_.a,kc.a],null,null),(l()(),Ti._27(null,["\n  "]))],function(l,n){l(n,1,0),l(n,4,0)},function(l,n){l(n,0,0,"inactive"!==Ti._20(n,1).state,Ti._20(n,1)._top);l(n,3,0,Ti._20(n,4).r.state)})}function Au(l){return Ti._29(0,[(l()(),Ti._6(0,null,null,1,"div",[["class","withdraw-total"]],null,null,null,null,null)),(l()(),Ti._27(null,["\n     提现总计：￥ ","\n    "]))],null,function(l,n){l(n,1,0,n.component.withdrawAmount)})}function Tu(l){return Ti._29(0,[(l()(),Ti._6(0,null,null,19,"div",[["class","withdraw-item"]],null,null,null,null,null)),(l()(),Ti._27(null,["\n          "])),(l()(),Ti._6(0,null,null,16,"ul",[],null,null,null,null,null)),(l()(),Ti._27(null,["\n            "])),(l()(),Ti._6(0,null,null,1,"li",[["class","money"]],null,null,null,null,null)),(l()(),Ti._27(null,["\n              提现金额：￥","\n            "])),(l()(),Ti._27(null,["\n            "])),(l()(),Ti._6(0,null,null,10,"li",[["class","date"]],null,null,null,null,null)),(l()(),Ti._27(null,["\n              提现日期：","\n              "])),Ti._23(2),(l()(),Ti._6(0,null,null,6,"span",[],null,null,null,null,null)),Ti._4(278528,null,0,Zc.h,[Ti.r,Ti.s,Ti.k,Ti.E],{ngClass:[0,"ngClass"]},null),Ti._23(1),Ti._23(1),Ti._22({status:0,fail:1,pass:2}),(l()(),Ti._27(null,["",""])),Ti._23(1),(l()(),Ti._27(null,["\n            "])),(l()(),Ti._27(null,["\n          "])),(l()(),Ti._27(null,["\n        "]))],function(l,n){l(n,11,0,l(n,14,0,!0,!Ti._28(n,11,0,l(n,12,0,Ti._20(n.parent,1),n.context.$implicit.status)).pass,Ti._28(n,11,0,l(n,13,0,Ti._20(n.parent,1),n.context.$implicit.status)).pass))},function(l,n){l(n,5,0,n.context.$implicit.realAmount);l(n,8,0,Ti._28(n,8,0,l(n,9,0,Ti._20(n.parent,0),n.context.$implicit.createTime,"yyyy.MM.dd")));l(n,15,0,Ti._28(n,15,0,l(n,16,0,Ti._20(n.parent,1),n.context.$implicit.status)).status)})}function Pu(l){return Ti._29(0,[(l()(),Ti._6(0,null,null,6,"div",[["class","no-data"]],null,null,null,null,null)),(l()(),Ti._27(null,["\n    "])),(l()(),Ti._6(0,null,null,0,"img",[["alt",""],["src","./assets/image/nodata.png"]],null,null,null,null,null)),(l()(),Ti._27(null,["\n    "])),(l()(),Ti._6(0,null,null,1,"p",[],null,null,null,null,null)),(l()(),Ti._27(null,["空空如也"])),(l()(),Ti._27(null,["\n  "]))],null,null)}function Eu(l){return Ti._29(0,[(l()(),Ti._6(0,null,null,4,"div",[["class","btn-noMore"]],null,null,null,null,null)),(l()(),Ti._27(null,["\n    "])),(l()(),Ti._6(0,null,null,1,"span",[],null,null,null,null,null)),(l()(),Ti._27(null,["—— 没有更多信息了 ——"])),(l()(),Ti._27(null,["\n  "]))],null,null)}function Mu(l){return Ti._29(0,[(l()(),Ti._6(0,null,null,10,"div",[["class","request-defeat"]],null,null,null,null,null)),(l()(),Ti._27(null,["\n    "])),(l()(),Ti._6(0,null,null,0,"img",[["alt",""],["src","./assets/image/requestDefeat.png"]],null,null,null,null,null)),(l()(),Ti._27(null,["\n    "])),(l()(),Ti._6(0,null,null,1,"p",[],null,null,null,null,null)),(l()(),Ti._27(null,["啊哦！页面走丢了"])),(l()(),Ti._27(null,["\n    "])),(l()(),Ti._6(0,null,null,2,"button",[["class","btn-request-defeat"],["full",""],["ion-button",""]],null,[[null,"touchstart"]],function(l,n,u){var t=!0;if("touchstart"===n){t=!1!==l.component.refresh()&&t}return t},t_.b,t_.a)),Ti._4(1097728,null,0,e_.a,[[8,""],kc.a,Ti.k,Ti.E],{full:[0,"full"]},null),(l()(),Ti._27(0,["\n      刷新再找一找\n    "])),(l()(),Ti._27(null,["\n  "]))],function(l,n){l(n,8,0,"")},null)}function Lu(l){return Ti._29(0,[(l()(),Ti._6(0,null,null,6,"ion-infinite-scroll",[],null,[[null,"ionInfinite"]],function(l,n,u){var t=!0;if("ionInfinite"===n){t=!1!==l.component.loadMore(u)&&t}return t},null,null)),Ti._4(1196032,null,0,$_.a,[Fc.a,Ti.x,Ti.k,Tc.a],null,{ionInfinite:"ionInfinite"}),(l()(),Ti._27(null,["\n      "])),(l()(),Ti._6(0,null,null,2,"ion-infinite-scroll-content",[["loadingSpinner","bubbles"],["loadingText","加载中"]],[[1,"state",0]],null,null,G_.b,G_.a)),Ti._4(114688,null,0,K_.a,[$_.a,kc.a],{loadingSpinner:[0,"loadingSpinner"],loadingText:[1,"loadingText"]},null),(l()(),Ti._27(null,["\n      "])),(l()(),Ti._27(null,["\n    "]))],function(l,n){l(n,4,0,"bubbles","加载中")},function(l,n){l(n,3,0,Ti._20(n,4).inf.state)})}function qu(l){return Ti._29(0,[Ti._21(0,Zc.d,[Ti.t]),Ti._21(0,ws,[]),(l()(),Ti._6(0,null,null,10,"ion-header",[],null,null,null,null,null)),Ti._4(16384,null,0,Lc.a,[kc.a,Ti.k,Ti.E,[2,Ic.a]],null,null),(l()(),Ti._27(null,["\n  "])),(l()(),Ti._6(0,null,null,6,"ion-navbar",[["class","toolbar"]],[[8,"hidden",0],[2,"statusbar-padding",null]],null,null,qc.b,qc.a)),Ti._4(49152,null,0,Rc.a,[xc.a,[2,Ic.a],[2,Oc.a],kc.a,Ti.k,Ti.E],null,null),(l()(),Ti._27(3,["\n    "])),(l()(),Ti._6(0,null,3,2,"ion-title",[["text-center",""]],null,null,null,$c.b,$c.a)),Ti._4(49152,null,0,Gc.a,[kc.a,Ti.k,Ti.E,[2,Kc.a],[2,Rc.a]],null,null),(l()(),Ti._27(0,["提现记录"])),(l()(),Ti._27(3,["\n  "])),(l()(),Ti._27(null,["\n"])),(l()(),Ti._27(null,["\n"])),(l()(),Ti._6(0,null,null,32,"ion-content",[],[[2,"statusbar-padding",null],[2,"has-refresher",null]],[["window","resize"]],function(l,n,u){var t=!0;if("window:resize"===n){t=!1!==Ti._20(l,15).resize()&&t}return t},Nc.b,Nc.a)),Ti._4(4374528,null,0,Fc.a,[kc.a,Dc.a,Tc.a,Ti.k,Ti.E,xc.a,Uc.a,Ti.x,[2,Ic.a],[2,Oc.a]],null,null),(l()(),Ti._27(1,["\n  "])),(l()(),Ti._0(16777216,null,1,1,null,Cu)),Ti._4(16384,null,0,Zc.j,[Ti.O,Ti.K],{ngIf:[0,"ngIf"]},null),(l()(),Ti._27(1,["\n  "])),(l()(),Ti._0(16777216,null,2,1,null,ju)),Ti._4(16384,null,0,Zc.j,[Ti.O,Ti.K],{ngIf:[0,"ngIf"]},null),(l()(),Ti._27(1,["\n  "])),(l()(),Ti._6(0,null,1,4,"div",[["class","withdraw-record"]],null,null,null,null,null)),(l()(),Ti._27(null,["\n    "])),(l()(),Ti._0(16777216,null,null,1,null,Au)),Ti._4(16384,null,0,Zc.j,[Ti.O,Ti.K],{ngIf:[0,"ngIf"]},null),(l()(),Ti._27(null,["\n  "])),(l()(),Ti._27(1,["\n  "])),(l()(),Ti._6(0,null,1,4,"div",[["class","record-list"]],null,null,null,null,null)),(l()(),Ti._27(null,["\n      "])),(l()(),Ti._0(16777216,null,null,1,null,Tu)),Ti._4(802816,null,0,Zc.i,[Ti.O,Ti.K,Ti.r],{ngForOf:[0,"ngForOf"]},null),(l()(),Ti._27(null,["\n  "])),(l()(),Ti._27(1,["\n  "])),(l()(),Ti._0(16777216,null,1,1,null,Pu)),Ti._4(16384,null,0,Zc.j,[Ti.O,Ti.K],{ngIf:[0,"ngIf"]},null),(l()(),Ti._27(1,["\n  "])),(l()(),Ti._0(16777216,null,1,1,null,Eu)),Ti._4(16384,null,0,Zc.j,[Ti.O,Ti.K],{ngIf:[0,"ngIf"]},null),(l()(),Ti._27(1,["\n  "])),(l()(),Ti._0(16777216,null,1,1,null,Mu)),Ti._4(16384,null,0,Zc.j,[Ti.O,Ti.K],{ngIf:[0,"ngIf"]},null),(l()(),Ti._27(1,["\n  "])),(l()(),Ti._0(16777216,null,1,1,null,Lu)),Ti._4(16384,null,0,Zc.j,[Ti.O,Ti.K],{ngIf:[0,"ngIf"]},null),(l()(),Ti._27(1,["\n\n"])),(l()(),Ti._27(null,["\n"]))],function(l,n){var u=n.component;l(n,18,0,u.isLoadingShow);l(n,21,0,!u.isLoadingShow);l(n,26,0,u.withdrawAmount>0);l(n,32,0,u.withdrawList);l(n,36,0,u.isEmpty);l(n,39,0,0!==u.withdrawList.length&&u.withdrawList.length===u.count);l(n,42,0,u.requestFail);l(n,45,0,u.withdrawList.length<u.count)},function(l,n){l(n,5,0,Ti._20(n,6)._hidden,Ti._20(n,6)._sbPadding);l(n,14,0,Ti._20(n,15).statusbarPadding,Ti._20(n,15)._hasRefresher)})}function Ru(l){return Ti._29(0,[(l()(),Ti._6(0,null,null,1,"qr-code",[],null,null,null,ud.b,ud.a)),Ti._4(573440,null,0,As.a,[Ti.k],{size:[0,"size"],value:[1,"value"]},null)],function(l,n){l(n,1,0,180,n.component.myCode)},null)}function $u(l){return Ti._29(0,[(l()(),Ti._6(0,null,null,1,"qr-code",[],null,null,null,ud.b,ud.a)),Ti._4(573440,null,0,As.a,[Ti.k],{size:[0,"size"],value:[1,"value"]},null)],function(l,n){l(n,1,0,180,n.component.brandshopIndexUrl)},null)}function Gu(l){return Ti._29(0,[(l()(),Ti._6(0,null,null,10,"div",[["class","brandshop-code"]],null,null,null,null,null)),(l()(),Ti._27(null,["\n\t\t\t"])),(l()(),Ti._6(0,null,null,4,"div",[["class","qrcode"]],null,null,null,null,null)),(l()(),Ti._27(null,["\n\t\t\t\t"])),(l()(),Ti._0(16777216,null,null,1,null,$u)),Ti._4(16384,null,0,Zc.j,[Ti.O,Ti.K],{ngIf:[0,"ngIf"]},null),(l()(),Ti._27(null,["\n\t\t\t"])),(l()(),Ti._27(null,["\n\t\t\t"])),(l()(),Ti._6(0,null,null,1,"div",[["class","total"]],null,null,null,null,null)),(l()(),Ti._27(null,["扫门店二维码，可快速定位到门店首页"])),(l()(),Ti._27(null,["\n\t\t"]))],function(l,n){l(n,5,0,n.component.brandshopIndexUrl)},null)}function Ku(l){return Ti._29(0,[(l()(),Ti._6(0,null,null,10,"ion-header",[],null,null,null,null,null)),Ti._4(16384,null,0,Lc.a,[kc.a,Ti.k,Ti.E,[2,Ic.a]],null,null),(l()(),Ti._27(null,["\n  "])),(l()(),Ti._6(0,null,null,6,"ion-navbar",[["class","toolbar"]],[[8,"hidden",0],[2,"statusbar-padding",null]],null,null,qc.b,qc.a)),Ti._4(49152,null,0,Rc.a,[xc.a,[2,Ic.a],[2,Oc.a],kc.a,Ti.k,Ti.E],null,null),(l()(),Ti._27(3,["\n    "])),(l()(),Ti._6(0,null,3,2,"ion-title",[["text-center",""]],null,null,null,$c.b,$c.a)),Ti._4(49152,null,0,Gc.a,[kc.a,Ti.k,Ti.E,[2,Kc.a],[2,Rc.a]],null,null),(l()(),Ti._27(0,["我的二维码"])),(l()(),Ti._27(3,["\n  "])),(l()(),Ti._27(null,["\n"])),(l()(),Ti._27(null,["\n"])),(l()(),Ti._6(0,null,null,20,"ion-content",[],[[2,"statusbar-padding",null],[2,"has-refresher",null]],[["window","resize"]],function(l,n,u){var t=!0;if("window:resize"===n){t=!1!==Ti._20(l,13).resize()&&t}return t},Nc.b,Nc.a)),Ti._4(4374528,null,0,Fc.a,[kc.a,Dc.a,Tc.a,Ti.k,Ti.E,xc.a,Uc.a,Ti.x,[2,Ic.a],[2,Oc.a]],null,null),(l()(),Ti._27(1,["\n\t"])),(l()(),Ti._6(0,null,1,16,"div",[["class","qrcode-box"]],null,null,null,null,null)),(l()(),Ti._27(null,["\n\t\t"])),(l()(),Ti._6(0,null,null,4,"div",[["class","qrcode"]],null,null,null,null,null)),(l()(),Ti._27(null,["\n\t\t\t"])),(l()(),Ti._0(16777216,null,null,1,null,Ru)),Ti._4(16384,null,0,Zc.j,[Ti.O,Ti.K],{ngIf:[0,"ngIf"]},null),(l()(),Ti._27(null,["\n\t\t"])),(l()(),Ti._27(null,["\n\t\t"])),(l()(),Ti._6(0,null,null,1,"div",[["class","total"]],null,null,null,null,null)),(l()(),Ti._27(null,["扫码注册淘璞，享更多优惠"])),(l()(),Ti._27(null,["\n\t\t"])),(l()(),Ti._6(0,null,null,1,"div",[["class","btn-brandshop-code"]],null,[[null,"touchstart"]],function(l,n,u){var t=!0;if("touchstart"===n){t=!1!==l.component.showBrandshopCode()&&t}return t},null,null)),(l()(),Ti._27(null,["",""])),(l()(),Ti._27(null,["\n\t\t"])),(l()(),Ti._0(16777216,null,null,1,null,Gu)),Ti._4(16384,null,0,Zc.j,[Ti.O,Ti.K],{ngIf:[0,"ngIf"]},null),(l()(),Ti._27(null,["\n\t"])),(l()(),Ti._27(1,["\n"])),(l()(),Ti._27(null,["\n"]))],function(l,n){var u=n.component;l(n,20,0,u.myCode);l(n,30,0,u.isShow)},function(l,n){var u=n.component;l(n,3,0,Ti._20(n,4)._hidden,Ti._20(n,4)._sbPadding);l(n,12,0,Ti._20(n,13).statusbarPadding,Ti._20(n,13)._hasRefresher);l(n,27,0,u.btnText)})}function Nu(l){return Ti._29(0,[(l()(),Ti._6(0,null,null,3,"li",[],null,[[null,"click"]],function(l,n,u){var t=!0;if("click"===n){t=!1!==l.component.getCurrentStatus(l.context.index)&&t}return t},null,null)),Ti._4(278528,null,0,Zc.h,[Ti.r,Ti.s,Ti.k,Ti.E],{ngClass:[0,"ngClass"]},null),Ti._22({active:0}),(l()(),Ti._27(null,["",""]))],function(l,n){l(n,1,0,l(n,2,0,n.component.currentStatus==n.context.$implicit.status))},function(l,n){l(n,3,0,n.context.$implicit.label)})}function Fu(l){return Ti._29(0,[(l()(),Ti._6(0,null,null,9,"div",[["class","loading-wrapper"]],null,null,null,null,null)),(l()(),Ti._27(null,["\n    "])),(l()(),Ti._6(0,null,null,4,"div",[],null,null,null,null,null)),(l()(),Ti._27(null,["\n      "])),(l()(),Ti._6(0,null,null,1,"ion-spinner",[["item-start",""]],[[2,"spinner-paused",null]],null,null,q_.b,q_.a)),Ti._4(114688,null,0,R_.a,[kc.a,Ti.k,Ti.E],{name:[0,"name"]},null),(l()(),Ti._27(null,["\n    "])),(l()(),Ti._27(null,["\n    "])),(l()(),Ti._6(0,null,null,0,"div",[],[[8,"innerHTML",1]],null,null,null,null)),(l()(),Ti._27(null,["\n  "]))],function(l,n){l(n,5,0,n.component.load.spinner)},function(l,n){var u=n.component;l(n,4,0,Ti._20(n,5)._paused);l(n,8,0,u.load.content)})}function Uu(l){return Ti._29(0,[(l()(),Ti._6(0,null,null,5,"ion-refresher",[["style","margin-top: 50px;z-index:100"]],[[2,"refresher-active",null],[4,"top",null]],[[null,"ionRefresh"]],function(l,n,u){var t=!0;if("ionRefresh"===n){t=!1!==l.component.pullRefresh(u)&&t}return t},null,null)),Ti._4(212992,null,0,E_.a,[Dc.a,Fc.a,Ti.x,Cc.l],null,{ionRefresh:"ionRefresh"}),(l()(),Ti._27(null,["\n    "])),(l()(),Ti._6(0,null,null,1,"ion-refresher-content",[],[[1,"state",0]],null,null,M_.b,M_.a)),Ti._4(114688,null,0,L_.a,[E_.a,kc.a],null,null),(l()(),Ti._27(null,["\n  "]))],function(l,n){l(n,1,0),l(n,4,0)},function(l,n){l(n,0,0,"inactive"!==Ti._20(n,1).state,Ti._20(n,1)._top);l(n,3,0,Ti._20(n,4).r.state)})}function zu(l){return Ti._29(0,[(l()(),Ti._6(0,null,null,1,"span",[],null,null,null,null,null)),(l()(),Ti._27(null,["总金额：￥ ",""]))],null,function(l,n){l(n,1,0,n.component.sum)})}function Vu(l){return Ti._29(0,[(l()(),Ti._6(0,null,null,16,"div",[["class","withdraw-item"]],null,null,null,null,null)),(l()(),Ti._27(null,["\n        "])),(l()(),Ti._6(0,null,null,13,"ul",[],null,null,null,null,null)),(l()(),Ti._27(null,["\n          "])),(l()(),Ti._6(0,null,null,1,"li",[["class","order-number"]],null,null,null,null,null)),(l()(),Ti._27(null,["订单编号：",""])),(l()(),Ti._27(null,["\n          "])),(l()(),Ti._6(0,null,null,1,"li",[["class","base-number"]],null,null,null,null,null)),(l()(),Ti._27(null,["结算基数：￥",""])),(l()(),Ti._27(null,["\n          "])),(l()(),Ti._6(0,null,null,1,"li",[["class","percentage"]],null,null,null,null,null)),(l()(),Ti._27(null,["奖励比例：",""])),(l()(),Ti._27(null,["\n          "])),(l()(),Ti._6(0,null,null,1,"li",[["class","money"]],null,null,null,null,null)),(l()(),Ti._27(null,["奖励金额：￥",""])),(l()(),Ti._27(null,["\n        "])),(l()(),Ti._27(null,["\n      "]))],null,function(l,n){l(n,5,0,n.context.$implicit.relateId);l(n,8,0,n.context.$implicit.baseAmount);l(n,11,0,n.context.$implicit.percent);l(n,14,0,n.context.$implicit.amount)})}function Bu(l){return Ti._29(0,[(l()(),Ti._6(0,null,null,6,"div",[["class","no-data"]],null,null,null,null,null)),(l()(),Ti._27(null,["\n        "])),(l()(),Ti._6(0,null,null,0,"img",[["alt",""],["src","./assets/image/nodata.png"]],null,null,null,null,null)),(l()(),Ti._27(null,["\n        "])),(l()(),Ti._6(0,null,null,1,"p",[],null,null,null,null,null)),(l()(),Ti._27(null,["空空如也"])),(l()(),Ti._27(null,["\n      "]))],null,null)}function Hu(l){return Ti._29(0,[(l()(),Ti._6(0,null,null,4,"div",[["class","btn-noMore"]],null,null,null,null,null)),(l()(),Ti._27(null,["\n        "])),(l()(),Ti._6(0,null,null,1,"span",[],null,null,null,null,null)),(l()(),Ti._27(null,["—— 没有更多赠品了 ——"])),(l()(),Ti._27(null,["\n      "]))],null,null)}function Yu(l){return Ti._29(0,[(l()(),Ti._6(0,null,null,10,"div",[["class","request-defeat"]],null,null,null,null,null)),(l()(),Ti._27(null,["\n        "])),(l()(),Ti._6(0,null,null,0,"img",[["alt",""],["src","./assets/image/requestDefeat.png"]],null,null,null,null,null)),(l()(),Ti._27(null,["\n        "])),(l()(),Ti._6(0,null,null,1,"p",[],null,null,null,null,null)),(l()(),Ti._27(null,["啊哦！页面走丢了"])),(l()(),Ti._27(null,["\n        "])),(l()(),Ti._6(0,null,null,2,"button",[["class","btn-request-defeat"],["full",""],["ion-button",""]],null,[[null,"touchstart"]],function(l,n,u){var t=!0;if("touchstart"===n){t=!1!==l.component.requestDefeatRefreshExpressGift()&&t}return t},t_.b,t_.a)),Ti._4(1097728,null,0,e_.a,[[8,""],kc.a,Ti.k,Ti.E],{full:[0,"full"]},null),(l()(),Ti._27(0,["\n          刷新再找一找\n        "])),(l()(),Ti._27(null,["\n      "]))],function(l,n){l(n,8,0,"")},null)}function Wu(l){return Ti._29(0,[(l()(),Ti._6(0,null,null,5,"ion-infinite-scroll",[],null,[[null,"ionInfinite"]],function(l,n,u){var t=!0;if("ionInfinite"===n){t=!1!==l.component.loadMore(u)&&t}return t},null,null)),Ti._4(1196032,null,0,$_.a,[Fc.a,Ti.x,Ti.k,Tc.a],null,{ionInfinite:"ionInfinite"}),(l()(),Ti._27(null,["\n        "])),(l()(),Ti._6(0,null,null,1,"ion-infinite-scroll-content",[["loadingText","加载更多..."]],[[1,"state",0]],null,null,G_.b,G_.a)),Ti._4(114688,null,0,K_.a,[$_.a,kc.a],{loadingText:[0,"loadingText"]},null),(l()(),Ti._27(null,["\n      "]))],function(l,n){l(n,4,0,"加载更多...")},function(l,n){l(n,3,0,Ti._20(n,4).inf.state)})}function Xu(l){return Ti._29(0,[(l()(),Ti._6(0,null,null,16,"div",[["class","record-list1"]],null,null,null,null,null)),(l()(),Ti._27(null,["\n      "])),(l()(),Ti._0(16777216,null,null,1,null,Vu)),Ti._4(802816,null,0,Zc.i,[Ti.O,Ti.K,Ti.r],{ngForOf:[0,"ngForOf"]},null),(l()(),Ti._27(null,["\n      "])),(l()(),Ti._0(16777216,null,null,1,null,Bu)),Ti._4(16384,null,0,Zc.j,[Ti.O,Ti.K],{ngIf:[0,"ngIf"]},null),(l()(),Ti._27(null,["\n      "])),(l()(),Ti._0(16777216,null,null,1,null,Hu)),Ti._4(16384,null,0,Zc.j,[Ti.O,Ti.K],{ngIf:[0,"ngIf"]},null),(l()(),Ti._27(null,["\n      "])),(l()(),Ti._0(16777216,null,null,1,null,Yu)),Ti._4(16384,null,0,Zc.j,[Ti.O,Ti.K],{ngIf:[0,"ngIf"]},null),(l()(),Ti._27(null,["\n      "])),(l()(),Ti._0(16777216,null,null,1,null,Wu)),Ti._4(16384,null,0,Zc.j,[Ti.O,Ti.K],{ngIf:[0,"ngIf"]},null),(l()(),Ti._27(null,["\n    "]))],function(l,n){var u=n.component;l(n,3,0,u.orderDetail);l(n,6,0,u.noData);l(n,9,0,u.showNoMore);l(n,12,0,u.requestDefeat);l(n,15,0,!u.showNoMore&&u.showInfinite)},null)}function Ju(l){return Ti._29(0,[(l()(),Ti._6(0,null,null,1,"span",[],null,null,null,null,null)),(l()(),Ti._27(null,["订单编号：",""]))],null,function(l,n){l(n,1,0,n.parent.context.$implicit.relateId)})}function Qu(l){return Ti._29(0,[(l()(),Ti._6(0,null,null,1,"span",[],null,null,null,null,null)),(l()(),Ti._27(null,["会员手机：",""]))],null,function(l,n){l(n,1,0,n.parent.context.$implicit.mobile)})}function Zu(l){return Ti._29(0,[(l()(),Ti._6(0,null,null,1,"span",[],null,null,null,null,null)),(l()(),Ti._27(null,["结算基数：￥",""]))],null,function(l,n){l(n,1,0,n.parent.context.$implicit.baseAmount)})}function lt(l){return Ti._29(0,[(l()(),Ti._6(0,null,null,1,"span",[],null,null,null,null,null)),(l()(),Ti._27(null,["结算基数：——"]))],null,null)}function nt(l){return Ti._29(0,[(l()(),Ti._6(0,null,null,1,"span",[],null,null,null,null,null)),(l()(),Ti._27(null,["奖励比例：",""]))],null,function(l,n){l(n,1,0,n.parent.context.$implicit.percent)})}function ut(l){return Ti._29(0,[(l()(),Ti._6(0,null,null,1,"span",[],null,null,null,null,null)),(l()(),Ti._27(null,["奖励比例：——"]))],null,null)}function tt(l){return Ti._29(0,[(l()(),Ti._6(0,null,null,39,"div",[["class","withdraw-item"]],null,null,null,null,null)),(l()(),Ti._27(null,["\n        "])),(l()(),Ti._6(0,null,null,36,"ul",[],null,null,null,null,null)),(l()(),Ti._27(null,["\n          "])),(l()(),Ti._6(0,null,null,7,"li",[["class","order-number"]],null,null,null,null,null)),(l()(),Ti._27(null,["\n            "])),(l()(),Ti._0(16777216,null,null,1,null,Ju)),Ti._4(16384,null,0,Zc.j,[Ti.O,Ti.K],{ngIf:[0,"ngIf"]},null),(l()(),Ti._27(null,["\n            "])),(l()(),Ti._0(16777216,null,null,1,null,Qu)),Ti._4(16384,null,0,Zc.j,[Ti.O,Ti.K],{ngIf:[0,"ngIf"]},null),(l()(),Ti._27(null,["\n          "])),(l()(),Ti._27(null,["\n          "])),(l()(),Ti._6(0,null,null,3,"li",[["class","date"]],null,null,null,null,null)),(l()(),Ti._27(null,["活动时间：","--"," "])),Ti._23(2),Ti._23(2),(l()(),Ti._27(null,["\n          "])),(l()(),Ti._6(0,null,null,7,"li",[["class","base-number"]],null,null,null,null,null)),(l()(),Ti._27(null,["\n            "])),(l()(),Ti._0(16777216,null,null,1,null,Zu)),Ti._4(16384,null,0,Zc.j,[Ti.O,Ti.K],{ngIf:[0,"ngIf"]},null),(l()(),Ti._27(null,["\n            "])),(l()(),Ti._0(16777216,null,null,1,null,lt)),Ti._4(16384,null,0,Zc.j,[Ti.O,Ti.K],{ngIf:[0,"ngIf"]},null),(l()(),Ti._27(null,["\n          "])),(l()(),Ti._27(null,["\n          "])),(l()(),Ti._6(0,null,null,7,"li",[["class","percentage"]],null,null,null,null,null)),(l()(),Ti._27(null,["\n            "])),(l()(),Ti._0(16777216,null,null,1,null,nt)),Ti._4(16384,null,0,Zc.j,[Ti.O,Ti.K],{ngIf:[0,"ngIf"]},null),(l()(),Ti._27(null,["\n            "])),(l()(),Ti._0(16777216,null,null,1,null,ut)),Ti._4(16384,null,0,Zc.j,[Ti.O,Ti.K],{ngIf:[0,"ngIf"]},null),(l()(),Ti._27(null,["\n          "])),(l()(),Ti._27(null,["\n          "])),(l()(),Ti._6(0,null,null,1,"li",[["class","money"]],null,null,null,null,null)),(l()(),Ti._27(null,["奖励金额：￥",""])),(l()(),Ti._27(null,["\n        "])),(l()(),Ti._27(null,["\n      "]))],function(l,n){l(n,7,0,3===n.context.$implicit.type);l(n,10,0,4===n.context.$implicit.type);l(n,21,0,3===n.context.$implicit.type);l(n,24,0,4===n.context.$implicit.type);l(n,30,0,3===n.context.$implicit.type);l(n,33,0,4===n.context.$implicit.type)},function(l,n){l(n,14,0,Ti._28(n,14,0,l(n,15,0,Ti._20(n.parent.parent,0),n.context.$implicit.startTime,"yyyy.MM.dd")),Ti._28(n,14,1,l(n,16,0,Ti._20(n.parent.parent,0),n.context.$implicit.endTime,"yyyy.MM.dd")));l(n,37,0,n.context.$implicit.amount)})}function et(l){return Ti._29(0,[(l()(),Ti._6(0,null,null,6,"div",[["class","no-data"]],null,null,null,null,null)),(l()(),Ti._27(null,["\n        "])),(l()(),Ti._6(0,null,null,0,"img",[["alt",""],["src","./assets/image/nodata.png"]],null,null,null,null,null)),(l()(),Ti._27(null,["\n        "])),(l()(),Ti._6(0,null,null,1,"p",[],null,null,null,null,null)),(l()(),Ti._27(null,["空空如也"])),(l()(),Ti._27(null,["\n      "]))],null,null)}function it(l){return Ti._29(0,[(l()(),Ti._6(0,null,null,4,"div",[["class","btn-noMore"]],null,null,null,null,null)),(l()(),Ti._27(null,["\n        "])),(l()(),Ti._6(0,null,null,1,"span",[],null,null,null,null,null)),(l()(),Ti._27(null,["—— 没有更多赠品了 ——"])),(l()(),Ti._27(null,["\n      "]))],null,null)}function at(l){return Ti._29(0,[(l()(),Ti._6(0,null,null,10,"div",[["class","request-defeat"]],null,null,null,null,null)),(l()(),Ti._27(null,["\n        "])),(l()(),Ti._6(0,null,null,0,"img",[["alt",""],["src","./assets/image/requestDefeat.png"]],null,null,null,null,null)),(l()(),Ti._27(null,["\n        "])),(l()(),Ti._6(0,null,null,1,"p",[],null,null,null,null,null)),(l()(),Ti._27(null,["啊哦！页面走丢了"])),(l()(),Ti._27(null,["\n        "])),(l()(),Ti._6(0,null,null,2,"button",[["class","btn-request-defeat"],["full",""],["ion-button",""]],null,[[null,"touchstart"]],function(l,n,u){var t=!0;if("touchstart"===n){t=!1!==l.component.requestDefeatRefreshExpressGift()&&t}return t},t_.b,t_.a)),Ti._4(1097728,null,0,e_.a,[[8,""],kc.a,Ti.k,Ti.E],{full:[0,"full"]},null),(l()(),Ti._27(0,["\n          刷新再找一找\n        "])),(l()(),Ti._27(null,["\n      "]))],function(l,n){l(n,8,0,"")},null)}function ot(l){return Ti._29(0,[(l()(),Ti._6(0,null,null,5,"ion-infinite-scroll",[],null,[[null,"ionInfinite"]],function(l,n,u){var t=!0;if("ionInfinite"===n){t=!1!==l.component.loadMore(u)&&t}return t},null,null)),Ti._4(1196032,null,0,$_.a,[Fc.a,Ti.x,Ti.k,Tc.a],null,{ionInfinite:"ionInfinite"}),(l()(),Ti._27(null,["\n        "])),(l()(),Ti._6(0,null,null,1,"ion-infinite-scroll-content",[["loadingText","加载更多..."]],[[1,"state",0]],null,null,G_.b,G_.a)),Ti._4(114688,null,0,K_.a,[$_.a,kc.a],{loadingText:[0,"loadingText"]},null),(l()(),Ti._27(null,["\n      "]))],function(l,n){l(n,4,0,"加载更多...")},function(l,n){l(n,3,0,Ti._20(n,4).inf.state)})}function rt(l){return Ti._29(0,[(l()(),Ti._6(0,null,null,16,"div",[["class","record-list2"]],null,null,null,null,null)),(l()(),Ti._27(null,["\n      "])),(l()(),Ti._0(16777216,null,null,1,null,tt)),Ti._4(802816,null,0,Zc.i,[Ti.O,Ti.K,Ti.r],{ngForOf:[0,"ngForOf"]},null),(l()(),Ti._27(null,["\n      "])),(l()(),Ti._0(16777216,null,null,1,null,et)),Ti._4(16384,null,0,Zc.j,[Ti.O,Ti.K],{ngIf:[0,"ngIf"]},null),(l()(),Ti._27(null,["\n      "])),(l()(),Ti._0(16777216,null,null,1,null,it)),Ti._4(16384,null,0,Zc.j,[Ti.O,Ti.K],{ngIf:[0,"ngIf"]},null),(l()(),Ti._27(null,["\n      "])),(l()(),Ti._0(16777216,null,null,1,null,at)),Ti._4(16384,null,0,Zc.j,[Ti.O,Ti.K],{ngIf:[0,"ngIf"]},null),(l()(),Ti._27(null,["\n      "])),(l()(),Ti._0(16777216,null,null,1,null,ot)),Ti._4(16384,null,0,Zc.j,[Ti.O,Ti.K],{ngIf:[0,"ngIf"]},null),(l()(),Ti._27(null,["\n\n    "]))],function(l,n){var u=n.component;l(n,3,0,u.awardDetail);l(n,6,0,u.noData);l(n,9,0,u.showNoMore);l(n,12,0,u.requestDefeat);l(n,15,0,!u.showNoMore&&u.showInfinite)},null)}function st(l){return Ti._29(0,[(l()(),Ti._6(0,null,null,10,"div",[["class","request-defeat"]],null,null,null,null,null)),(l()(),Ti._27(null,["\n    "])),(l()(),Ti._6(0,null,null,0,"img",[["alt",""],["src","./assets/image/requestDefeat.png"]],null,null,null,null,null)),(l()(),Ti._27(null,["\n    "])),(l()(),Ti._6(0,null,null,1,"p",[],null,null,null,null,null)),(l()(),Ti._27(null,["啊哦！页面走丢了"])),(l()(),Ti._27(null,["\n    "])),(l()(),Ti._6(0,null,null,2,"button",[["class","btn-request-defeat"],["full",""],["ion-button",""]],null,[[null,"touchstart"]],function(l,n,u){var t=!0;if("touchstart"===n){t=!1!==l.component.refresh()&&t}return t},t_.b,t_.a)),Ti._4(1097728,null,0,e_.a,[[8,""],kc.a,Ti.k,Ti.E],{full:[0,"full"]},null),(l()(),Ti._27(0,["\n      刷新再找一找\n    "])),(l()(),Ti._27(null,["\n  "]))],function(l,n){l(n,8,0,"")},null)}function ct(l){return Ti._29(0,[(l()(),Ti._6(0,null,null,6,"ion-infinite-scroll",[],null,[[null,"ionInfinite"]],function(l,n,u){var t=!0;if("ionInfinite"===n){t=!1!==l.component.loadMore(u)&&t}return t},null,null)),Ti._4(1196032,null,0,$_.a,[Fc.a,Ti.x,Ti.k,Tc.a],null,{ionInfinite:"ionInfinite"}),(l()(),Ti._27(null,["\n    "])),(l()(),Ti._6(0,null,null,2,"ion-infinite-scroll-content",[["loadingSpinner","bubbles"],["loadingText","加载中"]],[[1,"state",0]],null,null,G_.b,G_.a)),Ti._4(114688,null,0,K_.a,[$_.a,kc.a],{loadingSpinner:[0,"loadingSpinner"],loadingText:[1,"loadingText"]},null),(l()(),Ti._27(null,["\n    "])),(l()(),Ti._27(null,["\n  "]))],function(l,n){l(n,4,0,"bubbles","加载中")},function(l,n){l(n,3,0,Ti._20(n,4).inf.state)})}function _t(l){return Ti._29(0,[Ti._21(0,Zc.d,[Ti.t]),Ti._25(402653184,1,{content:0}),(l()(),Ti._6(0,null,null,23,"ion-header",[],null,null,null,null,null)),Ti._4(16384,null,0,Lc.a,[kc.a,Ti.k,Ti.E,[2,Ic.a]],null,null),(l()(),Ti._27(null,["\n  "])),(l()(),Ti._6(0,null,null,6,"ion-navbar",[["class","toolbar"]],[[8,"hidden",0],[2,"statusbar-padding",null]],null,null,qc.b,qc.a)),Ti._4(49152,null,0,Rc.a,[xc.a,[2,Ic.a],[2,Oc.a],kc.a,Ti.k,Ti.E],null,null),(l()(),Ti._27(3,["\n    "])),(l()(),Ti._6(0,null,3,2,"ion-title",[["text-center",""]],null,null,null,$c.b,$c.a)),Ti._4(49152,null,0,Gc.a,[kc.a,Ti.k,Ti.E,[2,Kc.a],[2,Rc.a]],null,null),(l()(),Ti._27(0,["审核中明细"])),(l()(),Ti._27(3,["\n  "])),(l()(),Ti._27(null,["\n  "])),(l()(),Ti._6(0,null,null,11,"ion-toolbar",[["class","filter-box toolbar"]],[[2,"statusbar-padding",null]],null,null,p_.b,p_.a)),Ti._4(49152,null,0,Kc.a,[kc.a,Ti.k,Ti.E],null,null),(l()(),Ti._27(3,["\n    "])),(l()(),Ti._6(0,null,3,7,"div",[["class","status-box"]],null,null,null,null,null)),(l()(),Ti._27(null,["\n      "])),(l()(),Ti._6(0,null,null,4,"ul",[],null,null,null,null,null)),(l()(),Ti._27(null,["\n        "])),(l()(),Ti._0(16777216,null,null,1,null,Nu)),Ti._4(802816,null,0,Zc.i,[Ti.O,Ti.K,Ti.r],{ngForOf:[0,"ngForOf"]},null),(l()(),Ti._27(null,["\n      "])),(l()(),Ti._27(null,["\n    "])),(l()(),Ti._27(3,["\n  "])),(l()(),Ti._27(null,["\n"])),(l()(),Ti._27(null,["\n"])),(l()(),Ti._6(0,null,null,29,"ion-content",[],[[2,"statusbar-padding",null],[2,"has-refresher",null]],[["window","resize"]],function(l,n,u){var t=!0;if("window:resize"===n){t=!1!==Ti._20(l,28).resize()&&t}return t},Nc.b,Nc.a)),Ti._4(4374528,[[1,4]],0,Fc.a,[kc.a,Dc.a,Tc.a,Ti.k,Ti.E,xc.a,Uc.a,Ti.x,[2,Ic.a],[2,Oc.a]],null,null),(l()(),Ti._27(1,["\n  "])),(l()(),Ti._0(16777216,null,1,1,null,Fu)),Ti._4(16384,null,0,Zc.j,[Ti.O,Ti.K],{ngIf:[0,"ngIf"]},null),(l()(),Ti._27(1,["\n  "])),(l()(),Ti._0(16777216,null,2,1,null,Uu)),Ti._4(16384,null,0,Zc.j,[Ti.O,Ti.K],{ngIf:[0,"ngIf"]},null),(l()(),Ti._27(1,["\n  "])),(l()(),Ti._6(0,null,1,13,"div",[["class","withdraw-record"]],null,null,null,null,null)),(l()(),Ti._27(null,["\n    "])),(l()(),Ti._6(0,null,null,4,"div",[["class","withdraw-total"]],null,null,null,null,null)),(l()(),Ti._27(null,["\n      "])),(l()(),Ti._0(16777216,null,null,1,null,zu)),Ti._4(16384,null,0,Zc.j,[Ti.O,Ti.K],{ngIf:[0,"ngIf"]},null),(l()(),Ti._27(null,["\n    "])),(l()(),Ti._27(null,["\n    "])),(l()(),Ti._0(16777216,null,null,1,null,Xu)),Ti._4(16384,null,0,Zc.j,[Ti.O,Ti.K],{ngIf:[0,"ngIf"]},null),(l()(),Ti._27(null,["\n    "])),(l()(),Ti._0(16777216,null,null,1,null,rt)),Ti._4(16384,null,0,Zc.j,[Ti.O,Ti.K],{ngIf:[0,"ngIf"]},null),(l()(),Ti._27(null,["\n\n  "])),(l()(),Ti._27(1,["\n  "])),(l()(),Ti._0(16777216,null,1,1,null,st)),Ti._4(16384,null,0,Zc.j,[Ti.O,Ti.K],{ngIf:[0,"ngIf"]},null),(l()(),Ti._27(1,["\n  "])),(l()(),Ti._0(16777216,null,1,1,null,ct)),Ti._4(16384,null,0,Zc.j,[Ti.O,Ti.K],{ngIf:[0,"ngIf"]},null),(l()(),Ti._27(1,["\n"]))],function(l,n){var u=n.component;l(n,21,0,u.statusList);l(n,31,0,u.isLoadingShow);l(n,34,0,!u.loadingShow);l(n,41,0,u.isShow);l(n,45,0,0==u.currentStatus);l(n,48,0,1==u.currentStatus);l(n,52,0,u.requestFail);l(n,55,0,u.orderDetail.length<u.count)},function(l,n){l(n,5,0,Ti._20(n,6)._hidden,Ti._20(n,6)._sbPadding);l(n,13,0,Ti._20(n,14)._sbPadding);l(n,27,0,Ti._20(n,28).statusbarPadding,Ti._20(n,28)._hasRefresher)})}function dt(l){return Ti._29(0,[(l()(),Ti._6(0,null,null,9,"div",[["class","loading-wrapper"]],null,null,null,null,null)),(l()(),Ti._27(null,["\n    "])),(l()(),Ti._6(0,null,null,4,"div",[],null,null,null,null,null)),(l()(),Ti._27(null,["\n      "])),(l()(),Ti._6(0,null,null,1,"ion-spinner",[["item-start",""]],[[2,"spinner-paused",null]],null,null,q_.b,q_.a)),Ti._4(114688,null,0,R_.a,[kc.a,Ti.k,Ti.E],{name:[0,"name"]},null),(l()(),Ti._27(null,["\n    "])),(l()(),Ti._27(null,["\n    "])),(l()(),Ti._6(0,null,null,0,"div",[],[[8,"innerHTML",1]],null,null,null,null)),(l()(),Ti._27(null,["\n  "]))],function(l,n){l(n,5,0,n.component.load.spinner)},function(l,n){var u=n.component;l(n,4,0,Ti._20(n,5)._paused);l(n,8,0,u.load.content)})}function pt(l){return Ti._29(0,[(l()(),Ti._6(0,null,null,5,"ion-refresher",[],[[2,"refresher-active",null],[4,"top",null]],[[null,"ionRefresh"]],function(l,n,u){var t=!0;if("ionRefresh"===n){t=!1!==l.component.pullRefresh(u)&&t}return t},null,null)),Ti._4(212992,null,0,E_.a,[Dc.a,Fc.a,Ti.x,Cc.l],null,{ionRefresh:"ionRefresh"}),(l()(),Ti._27(null,["\n    "])),(l()(),Ti._6(0,null,null,1,"ion-refresher-content",[],[[1,"state",0]],null,null,M_.b,M_.a)),Ti._4(114688,null,0,L_.a,[E_.a,kc.a],null,null),(l()(),Ti._27(null,["\n  "]))],function(l,n){l(n,1,0),l(n,4,0)},function(l,n){l(n,0,0,"inactive"!==Ti._20(n,1).state,Ti._20(n,1)._top);l(n,3,0,Ti._20(n,4).r.state)})}function ft(l){return Ti._29(0,[(l()(),Ti._6(0,null,null,1,"span",[],null,null,null,null,null)),(l()(),Ti._27(null,["总金额：￥ ",""]))],null,function(l,n){l(n,1,0,n.component.sum)})}function ht(l){return Ti._29(0,[(l()(),Ti._6(0,null,null,1,"span",[],null,null,null,null,null)),(l()(),Ti._27(null,["订单编号：",""]))],null,function(l,n){l(n,1,0,n.parent.context.$implicit.relateId)})}function gt(l){return Ti._29(0,[(l()(),Ti._6(0,null,null,1,"span",[],null,null,null,null,null)),(l()(),Ti._27(null,["会员手机：",""]))],null,function(l,n){l(n,1,0,n.parent.context.$implicit.mobile)})}function mt(l){return Ti._29(0,[(l()(),Ti._6(0,null,null,1,"span",[],null,null,null,null,null)),(l()(),Ti._27(null,["结算基数：￥",""]))],null,function(l,n){l(n,1,0,n.parent.context.$implicit.baseAmount)})}function vt(l){return Ti._29(0,[(l()(),Ti._6(0,null,null,1,"span",[],null,null,null,null,null)),(l()(),Ti._27(null,["结算基数：——"]))],null,null)}function bt(l){return Ti._29(0,[(l()(),Ti._6(0,null,null,1,"span",[],null,null,null,null,null)),(l()(),Ti._27(null,["奖励比例：",""]))],null,function(l,n){l(n,1,0,n.parent.context.$implicit.percent)})}function wt(l){return Ti._29(0,[(l()(),Ti._6(0,null,null,1,"span",[],null,null,null,null,null)),(l()(),Ti._27(null,["奖励比例：——"]))],null,null)}function yt(l){return Ti._29(0,[(l()(),Ti._6(0,null,null,39,"div",[["class","withdraw-item"]],null,null,null,null,null)),(l()(),Ti._27(null,["\n        "])),(l()(),Ti._6(0,null,null,36,"ul",[],null,null,null,null,null)),(l()(),Ti._27(null,["\n          "])),(l()(),Ti._6(0,null,null,7,"li",[["class","order-number"]],null,null,null,null,null)),(l()(),Ti._27(null,["\n            "])),(l()(),Ti._0(16777216,null,null,1,null,ht)),Ti._4(16384,null,0,Zc.j,[Ti.O,Ti.K],{ngIf:[0,"ngIf"]},null),(l()(),Ti._27(null,["\n            "])),(l()(),Ti._0(16777216,null,null,1,null,gt)),Ti._4(16384,null,0,Zc.j,[Ti.O,Ti.K],{ngIf:[0,"ngIf"]},null),(l()(),Ti._27(null,["\n          "])),(l()(),Ti._27(null,["\n          "])),(l()(),Ti._6(0,null,null,3,"li",[["class","date"]],null,null,null,null,null)),(l()(),Ti._27(null,["活动时间：","--"," "])),Ti._23(2),Ti._23(2),(l()(),Ti._27(null,["\n          "])),(l()(),Ti._6(0,null,null,7,"li",[["class","base-number"]],null,null,null,null,null)),(l()(),Ti._27(null,["\n              "])),(l()(),Ti._0(16777216,null,null,1,null,mt)),Ti._4(16384,null,0,Zc.j,[Ti.O,Ti.K],{ngIf:[0,"ngIf"]},null),(l()(),Ti._27(null,["\n              "])),(l()(),Ti._0(16777216,null,null,1,null,vt)),Ti._4(16384,null,0,Zc.j,[Ti.O,Ti.K],{ngIf:[0,"ngIf"]},null),(l()(),Ti._27(null,["\n          "])),(l()(),Ti._27(null,["\n          "])),(l()(),Ti._6(0,null,null,7,"li",[["class","percentage"]],null,null,null,null,null)),(l()(),Ti._27(null,["\n            "])),(l()(),Ti._0(16777216,null,null,1,null,bt)),Ti._4(16384,null,0,Zc.j,[Ti.O,Ti.K],{ngIf:[0,"ngIf"]},null),(l()(),Ti._27(null,["\n            "])),(l()(),Ti._0(16777216,null,null,1,null,wt)),Ti._4(16384,null,0,Zc.j,[Ti.O,Ti.K],{ngIf:[0,"ngIf"]},null),(l()(),Ti._27(null,["\n          "])),(l()(),Ti._27(null,["\n          "])),(l()(),Ti._6(0,null,null,1,"li",[["class","money"]],null,null,null,null,null)),(l()(),Ti._27(null,["奖励金额：￥",""])),(l()(),Ti._27(null,["\n        "])),(l()(),Ti._27(null,["\n      "]))],function(l,n){l(n,7,0,3===n.context.$implicit.type);l(n,10,0,4===n.context.$implicit.type);l(n,21,0,3===n.context.$implicit.type);l(n,24,0,4===n.context.$implicit.type);l(n,30,0,3===n.context.$implicit.type);l(n,33,0,4===n.context.$implicit.type)},function(l,n){l(n,14,0,Ti._28(n,14,0,l(n,15,0,Ti._20(n.parent,0),n.context.$implicit.startTime,"yyyy.MM.dd")),Ti._28(n,14,1,l(n,16,0,Ti._20(n.parent,0),n.context.$implicit.endTime,"yyyy.MM.dd")));l(n,37,0,n.context.$implicit.amount)})}function St(l){return Ti._29(0,[(l()(),Ti._6(0,null,null,6,"div",[["class","no-data"]],null,null,null,null,null)),(l()(),Ti._27(null,["\n      "])),(l()(),Ti._6(0,null,null,0,"img",[["alt",""],["src","./assets/image/nodata.png"]],null,null,null,null,null)),(l()(),Ti._27(null,["\n      "])),(l()(),Ti._6(0,null,null,1,"p",[],null,null,null,null,null)),(l()(),Ti._27(null,["空空如也"])),(l()(),Ti._27(null,["\n    "]))],null,null)}function It(l){return Ti._29(0,[(l()(),Ti._6(0,null,null,4,"div",[["class","btn-noMore"]],null,null,null,null,null)),(l()(),Ti._27(null,["\n      "])),(l()(),Ti._6(0,null,null,1,"span",[],null,null,null,null,null)),(l()(),Ti._27(null,["—— 没有更多信息了 ——"])),(l()(),Ti._27(null,["\n    "]))],null,null)}function Ot(l){return Ti._29(0,[(l()(),Ti._6(0,null,null,10,"div",[["class","request-defeat"]],null,null,null,null,null)),(l()(),Ti._27(null,["\n    "])),(l()(),Ti._6(0,null,null,0,"img",[["alt",""],["src","./assets/image/requestDefeat.png"]],null,null,null,null,null)),(l()(),Ti._27(null,["\n    "])),(l()(),Ti._6(0,null,null,1,"p",[],null,null,null,null,null)),(l()(),Ti._27(null,["啊哦！页面走丢了"])),(l()(),Ti._27(null,["\n    "])),(l()(),Ti._6(0,null,null,2,"button",[["class","btn-request-defeat"],["full",""],["ion-button",""]],null,[[null,"touchstart"]],function(l,n,u){var t=!0;if("touchstart"===n){t=!1!==l.component.refresh()&&t}return t},t_.b,t_.a)),Ti._4(1097728,null,0,e_.a,[[8,""],kc.a,Ti.k,Ti.E],{full:[0,"full"]},null),(l()(),Ti._27(0,["\n      刷新再找一找\n    "])),(l()(),Ti._27(null,["\n  "]))],function(l,n){l(n,8,0,"")},null)}function xt(l){return Ti._29(0,[(l()(),Ti._6(0,null,null,6,"ion-infinite-scroll",[],null,[[null,"ionInfinite"]],function(l,n,u){var t=!0;if("ionInfinite"===n){t=!1!==l.component.loadMore(u)&&t}return t},null,null)),Ti._4(1196032,null,0,$_.a,[Fc.a,Ti.x,Ti.k,Tc.a],null,{ionInfinite:"ionInfinite"}),(l()(),Ti._27(null,["\n    "])),(l()(),Ti._6(0,null,null,2,"ion-infinite-scroll-content",[["loadingSpinner","bubbles"],["loadingText","加载中"]],[[1,"state",0]],null,null,G_.b,G_.a)),Ti._4(114688,null,0,K_.a,[$_.a,kc.a],{loadingSpinner:[0,"loadingSpinner"],loadingText:[1,"loadingText"]},null),(l()(),Ti._27(null,["\n    "])),(l()(),Ti._27(null,["\n  "]))],function(l,n){l(n,4,0,"bubbles","加载中")},function(l,n){l(n,3,0,Ti._20(n,4).inf.state)})}function kt(l){return Ti._29(0,[Ti._21(0,Zc.d,[Ti.t]),(l()(),Ti._6(0,null,null,35,"ion-content",[],[[2,"statusbar-padding",null],[2,"has-refresher",null]],[["window","resize"]],function(l,n,u){var t=!0;if("window:resize"===n){t=!1!==Ti._20(l,2).resize()&&t}return t},Nc.b,Nc.a)),Ti._4(4374528,null,0,Fc.a,[kc.a,Dc.a,Tc.a,Ti.k,Ti.E,xc.a,Uc.a,Ti.x,[2,Ic.a],[2,Oc.a]],null,null),(l()(),Ti._27(1,["\n  "])),(l()(),Ti._0(16777216,null,1,1,null,dt)),Ti._4(16384,null,0,Zc.j,[Ti.O,Ti.K],{ngIf:[0,"ngIf"]},null),(l()(),Ti._27(1,["\n  "])),(l()(),Ti._0(16777216,null,2,1,null,pt)),Ti._4(16384,null,0,Zc.j,[Ti.O,Ti.K],{ngIf:[0,"ngIf"]},null),(l()(),Ti._27(1,["\n  "])),(l()(),Ti._6(0,null,1,19,"div",[["class","withdraw-record"]],null,null,null,null,null)),(l()(),Ti._27(null,["\n    "])),(l()(),Ti._6(0,null,null,4,"div",[["class","withdraw-total"]],null,null,null,null,null)),(l()(),Ti._27(null,["\n      "])),(l()(),Ti._0(16777216,null,null,1,null,ft)),Ti._4(16384,null,0,Zc.j,[Ti.O,Ti.K],{ngIf:[0,"ngIf"]},null),(l()(),Ti._27(null,["\n    "])),(l()(),Ti._27(null,["\n    "])),(l()(),Ti._6(0,null,null,4,"div",[["class","record-list"]],null,null,null,null,null)),(l()(),Ti._27(null,["\n      "])),(l()(),Ti._0(16777216,null,null,1,null,yt)),Ti._4(802816,null,0,Zc.i,[Ti.O,Ti.K,Ti.r],{ngForOf:[0,"ngForOf"]},null),(l()(),Ti._27(null,["\n    "])),(l()(),Ti._27(null,["\n    "])),(l()(),Ti._0(16777216,null,null,1,null,St)),Ti._4(16384,null,0,Zc.j,[Ti.O,Ti.K],{ngIf:[0,"ngIf"]},null),(l()(),Ti._27(null,["\n    "])),(l()(),Ti._0(16777216,null,null,1,null,It)),Ti._4(16384,null,0,Zc.j,[Ti.O,Ti.K],{ngIf:[0,"ngIf"]},null),(l()(),Ti._27(null,["\n  "])),(l()(),Ti._27(1,["\n  "])),(l()(),Ti._0(16777216,null,1,1,null,Ot)),Ti._4(16384,null,0,Zc.j,[Ti.O,Ti.K],{ngIf:[0,"ngIf"]},null),(l()(),Ti._27(1,["\n  "])),(l()(),Ti._0(16777216,null,1,1,null,xt)),Ti._4(16384,null,0,Zc.j,[Ti.O,Ti.K],{ngIf:[0,"ngIf"]},null),(l()(),Ti._27(1,["\n"])),(l()(),Ti._27(null,["\n"]))],function(l,n){var u=n.component;l(n,5,0,u.isLoadingShow);l(n,8,0,!u.isLoadingShow);l(n,15,0,u.isShow);l(n,21,0,u.awardActivity);l(n,25,0,u.isEmpty);l(n,28,0,0!==u.awardActivity.length&&u.awardActivity.length===u.count);l(n,32,0,u.requestFail);l(n,35,0,u.awardActivity.length<u.count)},function(l,n){l(n,1,0,Ti._20(n,2).statusbarPadding,Ti._20(n,2)._hasRefresher)})}function Dt(l){return Ti._29(0,[(l()(),Ti._6(0,null,null,9,"div",[["class","loading-wrapper"]],null,null,null,null,null)),(l()(),Ti._27(null,["\n    "])),(l()(),Ti._6(0,null,null,4,"div",[],null,null,null,null,null)),(l()(),Ti._27(null,["\n      "])),(l()(),Ti._6(0,null,null,1,"ion-spinner",[["item-start",""]],[[2,"spinner-paused",null]],null,null,q_.b,q_.a)),Ti._4(114688,null,0,R_.a,[kc.a,Ti.k,Ti.E],{name:[0,"name"]},null),(l()(),Ti._27(null,["\n    "])),(l()(),Ti._27(null,["\n    "])),(l()(),Ti._6(0,null,null,0,"div",[],[[8,"innerHTML",1]],null,null,null,null)),(l()(),Ti._27(null,["\n  "]))],function(l,n){l(n,5,0,n.component.load.spinner)},function(l,n){var u=n.component;l(n,4,0,Ti._20(n,5)._paused);l(n,8,0,u.load.content)})}function Ct(l){return Ti._29(0,[(l()(),Ti._6(0,null,null,5,"ion-refresher",[],[[2,"refresher-active",null],[4,"top",null]],[[null,"ionRefresh"]],function(l,n,u){var t=!0;if("ionRefresh"===n){t=!1!==l.component.pullRefresh(u)&&t}return t},null,null)),Ti._4(212992,null,0,E_.a,[Dc.a,Fc.a,Ti.x,Cc.l],null,{ionRefresh:"ionRefresh"}),(l()(),Ti._27(null,["\n    "])),(l()(),Ti._6(0,null,null,1,"ion-refresher-content",[],[[1,"state",0]],null,null,M_.b,M_.a)),Ti._4(114688,null,0,L_.a,[E_.a,kc.a],null,null),(l()(),Ti._27(null,["\n  "]))],function(l,n){l(n,1,0),l(n,4,0)},function(l,n){l(n,0,0,"inactive"!==Ti._20(n,1).state,Ti._20(n,1)._top);l(n,3,0,Ti._20(n,4).r.state)})}function jt(l){return Ti._29(0,[(l()(),Ti._6(0,null,null,1,"span",[],null,null,null,null,null)),(l()(),Ti._27(null,["总金额：￥ ",""]))],null,function(l,n){l(n,1,0,n.component.sum)})}function At(l){return Ti._29(0,[(l()(),Ti._6(0,null,null,16,"div",[["class","withdraw-item"]],null,null,null,null,null)),(l()(),Ti._27(null,["\n        "])),(l()(),Ti._6(0,null,null,13,"ul",[],null,null,null,null,null)),(l()(),Ti._27(null,["\n          "])),(l()(),Ti._6(0,null,null,1,"li",[["class","order-number"]],null,null,null,null,null)),(l()(),Ti._27(null,["订单编号：",""])),(l()(),Ti._27(null,["\n          "])),(l()(),Ti._6(0,null,null,1,"li",[["class","base-number"]],null,null,null,null,null)),(l()(),Ti._27(null,["结算基数：￥",""])),(l()(),Ti._27(null,["\n          "])),(l()(),Ti._6(0,null,null,1,"li",[["class","percentage"]],null,null,null,null,null)),(l()(),Ti._27(null,["奖励比例：",""])),(l()(),Ti._27(null,["\n          "])),(l()(),Ti._6(0,null,null,1,"li",[["class","money"]],null,null,null,null,null)),(l()(),Ti._27(null,["奖励金额：￥",""])),(l()(),Ti._27(null,["\n        "])),(l()(),Ti._27(null,["\n      "]))],null,function(l,n){l(n,5,0,n.context.$implicit.relateId);l(n,8,0,n.context.$implicit.baseAmount);l(n,11,0,n.context.$implicit.percent);l(n,14,0,n.context.$implicit.amount)})}function Tt(l){return Ti._29(0,[(l()(),Ti._6(0,null,null,6,"div",[["class","no-data"]],null,null,null,null,null)),(l()(),Ti._27(null,["\n      "])),(l()(),Ti._6(0,null,null,0,"img",[["alt",""],["src","./assets/image/nodata.png"]],null,null,null,null,null)),(l()(),Ti._27(null,["\n      "])),(l()(),Ti._6(0,null,null,1,"p",[],null,null,null,null,null)),(l()(),Ti._27(null,["空空如也"])),(l()(),Ti._27(null,["\n    "]))],null,null)}function Pt(l){return Ti._29(0,[(l()(),Ti._6(0,null,null,4,"div",[["class","btn-noMore"]],null,null,null,null,null)),(l()(),Ti._27(null,["\n      "])),(l()(),Ti._6(0,null,null,1,"span",[],null,null,null,null,null)),(l()(),Ti._27(null,["—— 没有更多信息了 ——"])),(l()(),Ti._27(null,["\n    "]))],null,null)}function Et(l){return Ti._29(0,[(l()(),Ti._6(0,null,null,10,"div",[["class","request-defeat"]],null,null,null,null,null)),(l()(),Ti._27(null,["\n    "])),(l()(),Ti._6(0,null,null,0,"img",[["alt",""],["src","./assets/image/requestDefeat.png"]],null,null,null,null,null)),(l()(),Ti._27(null,["\n    "])),(l()(),Ti._6(0,null,null,1,"p",[],null,null,null,null,null)),(l()(),Ti._27(null,["啊哦！页面走丢了"])),(l()(),Ti._27(null,["\n    "])),(l()(),Ti._6(0,null,null,2,"button",[["class","btn-request-defeat"],["full",""],["ion-button",""]],null,[[null,"touchstart"]],function(l,n,u){var t=!0;if("touchstart"===n){t=!1!==l.component.refresh()&&t}return t},t_.b,t_.a)),Ti._4(1097728,null,0,e_.a,[[8,""],kc.a,Ti.k,Ti.E],{full:[0,"full"]},null),(l()(),Ti._27(0,["\n      刷新再找一找\n    "])),(l()(),Ti._27(null,["\n  "]))],function(l,n){l(n,8,0,"")},null)}function Mt(l){return Ti._29(0,[(l()(),Ti._6(0,null,null,6,"ion-infinite-scroll",[],null,[[null,"ionInfinite"]],function(l,n,u){var t=!0;if("ionInfinite"===n){t=!1!==l.component.loadMore(u)&&t}return t},null,null)),Ti._4(1196032,null,0,$_.a,[Fc.a,Ti.x,Ti.k,Tc.a],null,{ionInfinite:"ionInfinite"}),(l()(),Ti._27(null,["\n      "])),(l()(),Ti._6(0,null,null,2,"ion-infinite-scroll-content",[["loadingSpinner","bubbles"],["loadingText","加载中"]],[[1,"state",0]],null,null,G_.b,G_.a)),Ti._4(114688,null,0,K_.a,[$_.a,kc.a],{loadingSpinner:[0,"loadingSpinner"],loadingText:[1,"loadingText"]},null),(l()(),Ti._27(null,["\n      "])),(l()(),Ti._27(null,["\n    "]))],function(l,n){l(n,4,0,"bubbles","加载中")},function(l,n){l(n,3,0,Ti._20(n,4).inf.state)})}function Lt(l){return Ti._29(0,[(l()(),Ti._6(0,null,null,35,"ion-content",[],[[2,"statusbar-padding",null],[2,"has-refresher",null]],[["window","resize"]],function(l,n,u){var t=!0;if("window:resize"===n){t=!1!==Ti._20(l,1).resize()&&t}return t},Nc.b,Nc.a)),Ti._4(4374528,null,0,Fc.a,[kc.a,Dc.a,Tc.a,Ti.k,Ti.E,xc.a,Uc.a,Ti.x,[2,Ic.a],[2,Oc.a]],null,null),(l()(),Ti._27(1,["\n  "])),(l()(),Ti._0(16777216,null,1,1,null,Dt)),Ti._4(16384,null,0,Zc.j,[Ti.O,Ti.K],{ngIf:[0,"ngIf"]},null),(l()(),Ti._27(1,["\n  "])),(l()(),Ti._0(16777216,null,2,1,null,Ct)),Ti._4(16384,null,0,Zc.j,[Ti.O,Ti.K],{ngIf:[0,"ngIf"]},null),(l()(),Ti._27(1,["\n  "])),(l()(),Ti._6(0,null,1,19,"div",[["class","withdraw-record"]],null,null,null,null,null)),(l()(),Ti._27(null,["\n    "])),(l()(),Ti._6(0,null,null,4,"div",[["class","withdraw-total"]],null,null,null,null,null)),(l()(),Ti._27(null,["\n     "])),(l()(),Ti._0(16777216,null,null,1,null,jt)),Ti._4(16384,null,0,Zc.j,[Ti.O,Ti.K],{ngIf:[0,"ngIf"]},null),(l()(),Ti._27(null,["\n    "])),(l()(),Ti._27(null,["\n    "])),(l()(),Ti._6(0,null,null,4,"div",[["class","record-list"]],null,null,null,null,null)),(l()(),Ti._27(null,["\n      "])),(l()(),Ti._0(16777216,null,null,1,null,At)),Ti._4(802816,null,0,Zc.i,[Ti.O,Ti.K,Ti.r],{ngForOf:[0,"ngForOf"]},null),(l()(),Ti._27(null,["\n    "])),(l()(),Ti._27(null,["\n    "])),(l()(),Ti._0(16777216,null,null,1,null,Tt)),Ti._4(16384,null,0,Zc.j,[Ti.O,Ti.K],{ngIf:[0,"ngIf"]},null),(l()(),Ti._27(null,["\n    "])),(l()(),Ti._0(16777216,null,null,1,null,Pt)),Ti._4(16384,null,0,Zc.j,[Ti.O,Ti.K],{ngIf:[0,"ngIf"]},null),(l()(),Ti._27(null,["\n  "])),(l()(),Ti._27(1,["\n  "])),(l()(),Ti._0(16777216,null,1,1,null,Et)),Ti._4(16384,null,0,Zc.j,[Ti.O,Ti.K],{ngIf:[0,"ngIf"]},null),(l()(),Ti._27(1,["\n  "])),(l()(),Ti._0(16777216,null,1,1,null,Mt)),Ti._4(16384,null,0,Zc.j,[Ti.O,Ti.K],{ngIf:[0,"ngIf"]},null),(l()(),Ti._27(1,["\n"])),(l()(),Ti._27(null,["\n"]))],function(l,n){var u=n.component;l(n,4,0,u.isLoadingShow);l(n,7,0,!u.isLoadingShow);l(n,14,0,u.isShow);l(n,20,0,u.awardOrder);l(n,24,0,u.isEmpty);l(n,27,0,0!==u.awardOrder.length&&u.awardOrder.length===u.count);l(n,31,0,u.requestFail);l(n,34,0,u.awardOrder.length<u.count)},function(l,n){l(n,0,0,Ti._20(n,1).statusbarPadding,Ti._20(n,1)._hasRefresher)})}function qt(l){return Ti._29(0,[(l()(),Ti._6(0,null,null,10,"ion-header",[],null,null,null,null,null)),Ti._4(16384,null,0,Lc.a,[kc.a,Ti.k,Ti.E,[2,Ic.a]],null,null),(l()(),Ti._27(null,["\n  "])),(l()(),Ti._6(0,null,null,6,"ion-navbar",[["class","toolbar"]],[[8,"hidden",0],[2,"statusbar-padding",null]],null,null,qc.b,qc.a)),Ti._4(49152,null,0,Rc.a,[xc.a,[2,Ic.a],[2,Oc.a],kc.a,Ti.k,Ti.E],null,null),(l()(),Ti._27(3,["\n    "])),(l()(),Ti._6(0,null,3,2,"ion-title",[["text-center",""]],null,null,null,$c.b,$c.a)),Ti._4(49152,null,0,Gc.a,[kc.a,Ti.k,Ti.E,[2,Kc.a],[2,Rc.a]],null,null),(l()(),Ti._27(0,["绑定收款账户"])),(l()(),Ti._27(3,["\n  "])),(l()(),Ti._27(null,["\n"])),(l()(),Ti._27(null,["\n"])),(l()(),Ti._6(0,null,null,27,"ion-content",[],[[2,"statusbar-padding",null],[2,"has-refresher",null]],[["window","resize"]],function(l,n,u){var t=!0;if("window:resize"===n){t=!1!==Ti._20(l,13).resize()&&t}return t},Nc.b,Nc.a)),Ti._4(4374528,null,0,Fc.a,[kc.a,Dc.a,Tc.a,Ti.k,Ti.E,xc.a,Uc.a,Ti.x,[2,Ic.a],[2,Oc.a]],null,null),(l()(),Ti._27(1,["\n  "])),(l()(),Ti._6(0,null,1,19,"div",[["class","bind-account"]],null,null,null,null,null)),(l()(),Ti._27(null,["\n  \t"])),(l()(),Ti._6(0,null,null,16,"div",[["class","img-list"]],null,null,null,null,null)),(l()(),Ti._27(null,["\n  \t\t"])),(l()(),Ti._6(0,null,null,10,"ul",[],null,null,null,null,null)),(l()(),Ti._27(null,["\n  \t\t\t"])),(l()(),Ti._6(0,null,null,1,"li",[["class","logo"]],null,null,null,null,null)),(l()(),Ti._6(0,null,null,0,"img",[["alt",""],["src","./assets/image/applogo.png"]],null,null,null,null,null)),(l()(),Ti._27(null,["\n\t\t  \t"])),(l()(),Ti._6(0,null,null,1,"li",[["class","bind"]],null,null,null,null,null)),(l()(),Ti._6(0,null,null,0,"img",[["alt",""],["src","./assets/image/bind.png"]],null,null,null,null,null)),(l()(),Ti._27(null,["\n\t\t  \t"])),(l()(),Ti._6(0,null,null,1,"li",[["class","wx"]],null,null,null,null,null)),(l()(),Ti._6(0,null,null,0,"img",[["alt",""],["src","./assets/image/wx.png"]],null,null,null,null,null)),(l()(),Ti._27(null,["\n  \t\t"])),(l()(),Ti._27(null,["\n  \t\t"])),(l()(),Ti._6(0,null,null,1,"div",[["class","text"]],null,null,null,null,null)),(l()(),Ti._27(null,["绑定后的微信将作为你的收款账户"])),(l()(),Ti._27(null,["\n  \t"])),(l()(),Ti._27(null,["\n  "])),(l()(),Ti._27(1,["\n  "])),(l()(),Ti._6(0,null,1,2,"button",[["class","btn-bind"],["ion-button",""]],null,[[null,"touchstart"]],function(l,n,u){var t=!0;if("touchstart"===n){t=!1!==l.component.goAccount()&&t}return t},t_.b,t_.a)),Ti._4(1097728,null,0,e_.a,[[8,""],kc.a,Ti.k,Ti.E],null,null),(l()(),Ti._27(0,["绑定微信"])),(l()(),Ti._27(1,["\n"])),(l()(),Ti._27(null,["\n"]))],null,function(l,n){l(n,3,0,Ti._20(n,4)._hidden,Ti._20(n,4)._sbPadding);l(n,12,0,Ti._20(n,13).statusbarPadding,Ti._20(n,13)._hasRefresher)})}function Rt(l){return Ti._29(0,[(l()(),Ti._6(0,null,null,9,"div",[["class","loading-wrapper"]],null,null,null,null,null)),(l()(),Ti._27(null,["\n    "])),(l()(),Ti._6(0,null,null,4,"div",[],null,null,null,null,null)),(l()(),Ti._27(null,["\n      "])),(l()(),Ti._6(0,null,null,1,"ion-spinner",[["item-start",""]],[[2,"spinner-paused",null]],null,null,q_.b,q_.a)),Ti._4(114688,null,0,R_.a,[kc.a,Ti.k,Ti.E],{name:[0,"name"]},null),(l()(),Ti._27(null,["\n    "])),(l()(),Ti._27(null,["\n    "])),(l()(),Ti._6(0,null,null,0,"div",[],[[8,"innerHTML",1]],null,null,null,null)),(l()(),Ti._27(null,["\n  "]))],function(l,n){l(n,5,0,n.component.load.spinner)},function(l,n){var u=n.component;l(n,4,0,Ti._20(n,5)._paused);l(n,8,0,u.load.content)})}function $t(l){return Ti._29(0,[(l()(),Ti._6(0,null,null,1,"div",[["class","account-title"]],null,null,null,null,null)),(l()(),Ti._27(null,["\n      填写收款人信息并绑定微信作为收款账户\n    "]))],null,null)}function Gt(l){return Ti._29(0,[(l()(),Ti._6(0,null,null,5,"div",[["class","account-title"]],null,null,null,null,null)),(l()(),Ti._27(null,["\n      "])),(l()(),Ti._6(0,null,null,2,"div",[["class","binded"]],null,null,null,null,null)),(l()(),Ti._6(0,null,null,0,"img",[["alt",""],["src","./assets/image/OK.png"]],null,null,null,null,null)),(l()(),Ti._27(null,["已绑定微信"])),(l()(),Ti._27(null,["\n    "]))],null,null)}function Kt(l){return Ti._29(0,[(l()(),Ti._6(0,null,null,1,"div",[["class","bind-error"]],null,null,null,null,null)),(l()(),Ti._27(null,["*请填写收款人"]))],null,null)}function Nt(l){return Ti._29(0,[(l()(),Ti._6(0,null,null,1,"div",[["class","bind-error"]],null,null,null,null,null)),(l()(),Ti._27(null,["*请输入正确的手机号"]))],null,null)}function Ft(l){return Ti._29(0,[(l()(),Ti._6(0,null,null,1,"div",[["class","bind-error"]],null,null,null,null,null)),(l()(),Ti._27(null,["*请输入正确的身份证号"]))],null,null)}function Ut(l){return Ti._29(0,[(l()(),Ti._6(0,null,null,2,"button",[["class","btn-bind"],["ion-button",""]],null,[[null,"click"]],function(l,n,u){var t=!0;if("click"===n){t=!1!==l.component.bindWX()&&t}return t},t_.b,t_.a)),Ti._4(1097728,null,0,e_.a,[[8,""],kc.a,Ti.k,Ti.E],null,null),(l()(),Ti._27(0,["绑定微信"]))],null,null)}function zt(l){return Ti._29(0,[(l()(),Ti._6(0,null,null,2,"button",[["class","btn-bind"],["ion-button",""]],null,[[null,"click"]],function(l,n,u){var t=!0;if("click"===n){t=!1!==l.component.editCurrent()&&t}return t},t_.b,t_.a)),Ti._4(1097728,null,0,e_.a,[[8,""],kc.a,Ti.k,Ti.E],null,null),(l()(),Ti._27(0,["确定"]))],null,null)}function Vt(l){return Ti._29(0,[(l()(),Ti._6(0,null,null,1,"div",[["class","message"]],null,null,null,null,null)),(l()(),Ti._27(null,["*微信账户一旦绑定不能改，请谨慎操作"]))],null,null)}function Bt(l){return Ti._29(0,[(l()(),Ti._6(0,null,null,81,"div",[],null,null,null,null,null)),(l()(),Ti._27(null,["\n    "])),(l()(),Ti._0(16777216,null,null,1,null,$t)),Ti._4(16384,null,0,Zc.j,[Ti.O,Ti.K],{ngIf:[0,"ngIf"]},null),(l()(),Ti._27(null,["\n    "])),(l()(),Ti._0(16777216,null,null,1,null,Gt)),Ti._4(16384,null,0,Zc.j,[Ti.O,Ti.K],{ngIf:[0,"ngIf"]},null),(l()(),Ti._27(null,["\n    "])),(l()(),Ti._6(0,null,null,72,"div",[["class","form-list"]],null,null,null,null,null)),(l()(),Ti._27(null,["\n      "])),(l()(),Ti._6(0,null,null,60,"ion-list",[],null,null,null,null,null)),Ti._4(16384,null,0,zc.a,[kc.a,Ti.k,Ti.E,Dc.a,Cc.l,Tc.a],null,null),(l()(),Ti._27(null,["\n        "])),(l()(),Ti._6(0,null,null,14,"ion-item",[["class","item item-block"]],null,null,null,Vc.b,Vc.a)),Ti._4(1097728,null,3,Bc.a,[Hc.a,kc.a,Ti.k,Ti.E,[2,Yc.a]],null,null),Ti._25(335544320,1,{contentLabel:0}),Ti._25(603979776,2,{_buttons:1}),Ti._25(603979776,3,{_icons:1}),Ti._4(16384,null,0,Wc.a,[],null,null),(l()(),Ti._27(2,["\n          "])),(l()(),Ti._6(0,null,3,6,"ion-input",[["placeholder","输入收款人姓名"],["required",""]],[[1,"required",0],[2,"ng-untouched",null],[2,"ng-touched",null],[2,"ng-pristine",null],[2,"ng-dirty",null],[2,"ng-valid",null],[2,"ng-invalid",null],[2,"ng-pending",null]],[[null,"ngModelChange"]],function(l,n,u){var t=!0;if("ngModelChange"===n){t=!1!==(l.component.salesName=u)&&t}return t},Xc.b,Xc.a)),Ti._4(16384,null,0,Jc.l,[],{required:[0,"required"]},null),Ti._24(1024,null,Jc.f,function(l){return[l]},[Jc.l]),Ti._4(671744,null,0,Jc.j,[[8,null],[2,Jc.f],[8,null],[8,null]],{model:[0,"model"]},{update:"ngModelChange"}),Ti._24(2048,null,Jc.h,null,[Jc.j]),Ti._4(16384,null,0,Jc.i,[Jc.h],null,null),Ti._4(5423104,null,0,Qc.a,[kc.a,Dc.a,Hc.a,xc.a,Ti.k,Ti.E,[2,Fc.a],[2,Bc.a],[2,Jc.h],Tc.a],{placeholder:[0,"placeholder"]},null),(l()(),Ti._27(2,["\n        "])),(l()(),Ti._27(null,["\n        "])),(l()(),Ti._0(16777216,null,null,1,null,Kt)),Ti._4(16384,null,0,Zc.j,[Ti.O,Ti.K],{ngIf:[0,"ngIf"]},null),(l()(),Ti._27(null,["\n        "])),(l()(),Ti._6(0,null,null,15,"ion-item",[["class","item item-block"]],null,null,null,Vc.b,Vc.a)),Ti._4(1097728,null,3,Bc.a,[Hc.a,kc.a,Ti.k,Ti.E,[2,Yc.a]],null,null),Ti._25(335544320,4,{contentLabel:0}),Ti._25(603979776,5,{_buttons:1}),Ti._25(603979776,6,{_icons:1}),Ti._4(16384,null,0,Wc.a,[],null,null),(l()(),Ti._27(2,["\n          "])),(l()(),Ti._6(0,null,3,7,"ion-input",[["maxlength","11"],["placeholder","输入收款人手机号码"],["required",""],["type","tel"]],[[1,"required",0],[1,"maxlength",0],[2,"ng-untouched",null],[2,"ng-touched",null],[2,"ng-pristine",null],[2,"ng-dirty",null],[2,"ng-valid",null],[2,"ng-invalid",null],[2,"ng-pending",null]],[[null,"ngModelChange"]],function(l,n,u){var t=!0;if("ngModelChange"===n){t=!1!==(l.component.cellphone=u)&&t}return t},Xc.b,Xc.a)),Ti._4(16384,null,0,Jc.l,[],{required:[0,"required"]},null),Ti._4(540672,null,0,Jc.e,[],{maxlength:[0,"maxlength"]},null),Ti._24(1024,null,Jc.f,function(l,n){return[l,n]},[Jc.l,Jc.e]),Ti._4(671744,null,0,Jc.j,[[8,null],[2,Jc.f],[8,null],[8,null]],{model:[0,"model"]},{update:"ngModelChange"}),Ti._24(2048,null,Jc.h,null,[Jc.j]),Ti._4(16384,null,0,Jc.i,[Jc.h],null,null),Ti._4(5423104,null,0,Qc.a,[kc.a,Dc.a,Hc.a,xc.a,Ti.k,Ti.E,[2,Fc.a],[2,Bc.a],[2,Jc.h],Tc.a],{type:[0,"type"],placeholder:[1,"placeholder"]},null),(l()(),Ti._27(2,["\n        "])),(l()(),Ti._27(null,["\n        "])),(l()(),Ti._0(16777216,null,null,1,null,Nt)),Ti._4(16384,null,0,Zc.j,[Ti.O,Ti.K],{ngIf:[0,"ngIf"]},null),(l()(),Ti._27(null,["\n        "])),(l()(),Ti._6(0,null,null,14,"ion-item",[["class","item item-block"]],null,null,null,Vc.b,Vc.a)),Ti._4(1097728,null,3,Bc.a,[Hc.a,kc.a,Ti.k,Ti.E,[2,Yc.a]],null,null),Ti._25(335544320,7,{contentLabel:0}),Ti._25(603979776,8,{_buttons:1}),Ti._25(603979776,9,{_icons:1}),Ti._4(16384,null,0,Wc.a,[],null,null),(l()(),Ti._27(2,["\n          "])),(l()(),Ti._6(0,null,3,6,"ion-input",[["placeholder","输入收款人身份证号"],["required",""]],[[1,"required",0],[2,"ng-untouched",null],[2,"ng-touched",null],[2,"ng-pristine",null],[2,"ng-dirty",null],[2,"ng-valid",null],[2,"ng-invalid",null],[2,"ng-pending",null]],[[null,"ngModelChange"]],function(l,n,u){var t=!0;if("ngModelChange"===n){t=!1!==(l.component.IDcard=u)&&t}return t},Xc.b,Xc.a)),Ti._4(16384,null,0,Jc.l,[],{required:[0,"required"]},null),Ti._24(1024,null,Jc.f,function(l){return[l]},[Jc.l]),Ti._4(671744,null,0,Jc.j,[[8,null],[2,Jc.f],[8,null],[8,null]],{model:[0,"model"]},{update:"ngModelChange"}),Ti._24(2048,null,Jc.h,null,[Jc.j]),Ti._4(16384,null,0,Jc.i,[Jc.h],null,null),Ti._4(5423104,null,0,Qc.a,[kc.a,Dc.a,Hc.a,xc.a,Ti.k,Ti.E,[2,Fc.a],[2,Bc.a],[2,Jc.h],Tc.a],{placeholder:[0,"placeholder"]},null),(l()(),Ti._27(2,["\n        "])),(l()(),Ti._27(null,["\n        "])),(l()(),Ti._0(16777216,null,null,1,null,Ft)),Ti._4(16384,null,0,Zc.j,[Ti.O,Ti.K],{ngIf:[0,"ngIf"]},null),(l()(),Ti._27(null,["\n      "])),(l()(),Ti._27(null,["\n    "])),(l()(),Ti._0(16777216,null,null,1,null,Ut)),Ti._4(16384,null,0,Zc.j,[Ti.O,Ti.K],{ngIf:[0,"ngIf"]},null),(l()(),Ti._27(null,["\n    "])),(l()(),Ti._0(16777216,null,null,1,null,zt)),Ti._4(16384,null,0,Zc.j,[Ti.O,Ti.K],{ngIf:[0,"ngIf"]},null),(l()(),Ti._27(null,["\n    "])),(l()(),Ti._0(16777216,null,null,1,null,Vt)),Ti._4(16384,null,0,Zc.j,[Ti.O,Ti.K],{ngIf:[0,"ngIf"]},null),(l()(),Ti._27(null,["\n    "])),(l()(),Ti._27(null,["\n  "]))],function(l,n){var u=n.component;l(n,3,0,u.noBind);l(n,6,0,!u.noBind);l(n,21,0,"");l(n,23,0,u.salesName);l(n,26,0,"输入收款人姓名");l(n,30,0,u.isName);l(n,40,0,"");l(n,41,0,"11");l(n,43,0,u.cellphone);l(n,46,0,"tel","输入收款人手机号码");l(n,50,0,u.isPhone);l(n,60,0,"");l(n,62,0,u.IDcard);l(n,65,0,"输入收款人身份证号");l(n,69,0,u.isIDCard);l(n,73,0,u.noBind);l(n,76,0,!u.noBind);l(n,79,0,u.noBind)},function(l,n){l(n,20,0,Ti._20(n,21).required?"":null,Ti._20(n,25).ngClassUntouched,Ti._20(n,25).ngClassTouched,Ti._20(n,25).ngClassPristine,Ti._20(n,25).ngClassDirty,Ti._20(n,25).ngClassValid,Ti._20(n,25).ngClassInvalid,Ti._20(n,25).ngClassPending);l(n,39,0,Ti._20(n,40).required?"":null,Ti._20(n,41).maxlength?Ti._20(n,41).maxlength:null,Ti._20(n,45).ngClassUntouched,Ti._20(n,45).ngClassTouched,Ti._20(n,45).ngClassPristine,Ti._20(n,45).ngClassDirty,Ti._20(n,45).ngClassValid,Ti._20(n,45).ngClassInvalid,Ti._20(n,45).ngClassPending);l(n,59,0,Ti._20(n,60).required?"":null,Ti._20(n,64).ngClassUntouched,Ti._20(n,64).ngClassTouched,Ti._20(n,64).ngClassPristine,Ti._20(n,64).ngClassDirty,Ti._20(n,64).ngClassValid,Ti._20(n,64).ngClassInvalid,Ti._20(n,64).ngClassPending)})}function Ht(l){return Ti._29(0,[(l()(),Ti._6(0,null,null,10,"div",[["class","request-defeat"]],null,null,null,null,null)),(l()(),Ti._27(null,["\n    "])),(l()(),Ti._6(0,null,null,0,"img",[["alt",""],["src","./assets/image/requestDefeat.png"]],null,null,null,null,null)),(l()(),Ti._27(null,["\n    "])),(l()(),Ti._6(0,null,null,1,"p",[],null,null,null,null,null)),(l()(),Ti._27(null,["啊哦！页面走丢了"])),(l()(),Ti._27(null,["\n    "])),(l()(),Ti._6(0,null,null,2,"button",[["class","btn-request-defeat"],["full",""],["ion-button",""]],null,[[null,"touchstart"]],function(l,n,u){var t=!0;if("touchstart"===n){t=!1!==l.component.getCurrent()&&t}return t},t_.b,t_.a)),Ti._4(1097728,null,0,e_.a,[[8,""],kc.a,Ti.k,Ti.E],{full:[0,"full"]},null),(l()(),Ti._27(0,["\n      刷新再找一找\n    "])),(l()(),Ti._27(null,["\n  "]))],function(l,n){l(n,8,0,"")},null)}function Yt(l){return Ti._29(0,[(l()(),Ti._6(0,null,null,10,"ion-header",[],null,null,null,null,null)),Ti._4(16384,null,0,Lc.a,[kc.a,Ti.k,Ti.E,[2,Ic.a]],null,null),(l()(),Ti._27(null,["\n  "])),(l()(),Ti._6(0,null,null,6,"ion-navbar",[["class","toolbar"]],[[8,"hidden",0],[2,"statusbar-padding",null]],null,null,qc.b,qc.a)),Ti._4(49152,null,0,Rc.a,[xc.a,[2,Ic.a],[2,Oc.a],kc.a,Ti.k,Ti.E],null,null),(l()(),Ti._27(3,["\n    "])),(l()(),Ti._6(0,null,3,2,"ion-title",[["text-center",""]],null,null,null,$c.b,$c.a)),Ti._4(49152,null,0,Gc.a,[kc.a,Ti.k,Ti.E,[2,Kc.a],[2,Rc.a]],null,null),(l()(),Ti._27(0,["收款账户"])),(l()(),Ti._27(3,["\n  "])),(l()(),Ti._27(null,["\n"])),(l()(),Ti._27(null,["\n"])),(l()(),Ti._6(0,null,null,12,"ion-content",[],[[2,"statusbar-padding",null],[2,"has-refresher",null]],[["window","resize"]],function(l,n,u){var t=!0;if("window:resize"===n){t=!1!==Ti._20(l,13).resize()&&t}return t},Nc.b,Nc.a)),Ti._4(4374528,null,0,Fc.a,[kc.a,Dc.a,Tc.a,Ti.k,Ti.E,xc.a,Uc.a,Ti.x,[2,Ic.a],[2,Oc.a]],null,null),(l()(),Ti._27(1,["\n  "])),(l()(),Ti._27(1,["\n  "])),(l()(),Ti._0(16777216,null,1,1,null,Rt)),Ti._4(16384,null,0,Zc.j,[Ti.O,Ti.K],{ngIf:[0,"ngIf"]},null),(l()(),Ti._27(1,["\n  "])),(l()(),Ti._0(16777216,null,1,1,null,Bt)),Ti._4(16384,null,0,Zc.j,[Ti.O,Ti.K],{ngIf:[0,"ngIf"]},null),(l()(),Ti._27(1,["\n  "])),(l()(),Ti._0(16777216,null,1,1,null,Ht)),Ti._4(16384,null,0,Zc.j,[Ti.O,Ti.K],{ngIf:[0,"ngIf"]},null),(l()(),Ti._27(1,["\n"]))],function(l,n){var u=n.component;l(n,17,0,u.loadingShow);l(n,20,0,u.accountContent);l(n,23,0,u.requestDefeat)},function(l,n){l(n,3,0,Ti._20(n,4)._hidden,Ti._20(n,4)._sbPadding);l(n,12,0,Ti._20(n,13).statusbarPadding,Ti._20(n,13)._hasRefresher)})}function Wt(l){return Ti._29(0,[(l()(),Ti._6(0,null,null,10,"ion-header",[],null,null,null,null,null)),Ti._4(16384,null,0,Lc.a,[kc.a,Ti.k,Ti.E,[2,Ic.a]],null,null),(l()(),Ti._27(null,["\n  "])),(l()(),Ti._6(0,null,null,6,"ion-navbar",[["class","toolbar"]],[[8,"hidden",0],[2,"statusbar-padding",null]],null,null,qc.b,qc.a)),Ti._4(49152,null,0,Rc.a,[xc.a,[2,Ic.a],[2,Oc.a],kc.a,Ti.k,Ti.E],null,null),(l()(),Ti._27(3,["\n    "])),(l()(),Ti._6(0,null,3,2,"ion-title",[["text-center",""]],null,null,null,$c.b,$c.a)),Ti._4(49152,null,0,Gc.a,[kc.a,Ti.k,Ti.E,[2,Kc.a],[2,Rc.a]],null,null),(l()(),Ti._27(0,["收款账户"])),(l()(),Ti._27(3,["\n  "])),(l()(),Ti._27(null,["\n"])),(l()(),Ti._27(null,["\n"])),(l()(),Ti._6(0,null,null,62,"ion-content",[],[[2,"statusbar-padding",null],[2,"has-refresher",null]],[["window","resize"]],function(l,n,u){var t=!0;if("window:resize"===n){t=!1!==Ti._20(l,13).resize()&&t}return t},Nc.b,Nc.a)),Ti._4(4374528,null,0,Fc.a,[kc.a,Dc.a,Tc.a,Ti.k,Ti.E,xc.a,Uc.a,Ti.x,[2,Ic.a],[2,Oc.a]],null,null),(l()(),Ti._27(1,["\n  "])),(l()(),Ti._6(0,null,1,5,"div",[["class","account-title"]],null,null,null,null,null)),(l()(),Ti._27(null,["\n  \t"])),(l()(),Ti._6(0,null,null,2,"div",[["class","binded"]],null,null,null,null,null)),(l()(),Ti._6(0,null,null,0,"img",[["alt",""],["src","./assets/image/ok.png"]],null,null,null,null,null)),(l()(),Ti._27(null,["已绑定微信"])),(l()(),Ti._27(null,["\n  "])),(l()(),Ti._27(1,["\n  "])),(l()(),Ti._6(0,null,1,51,"div",[["class","form-list"]],null,null,null,null,null)),(l()(),Ti._27(null,["\n  \t"])),(l()(),Ti._6(0,null,null,44,"ion-list",[],null,null,null,null,null)),Ti._4(16384,null,0,zc.a,[kc.a,Ti.k,Ti.E,Dc.a,Cc.l,Tc.a],null,null),(l()(),Ti._27(null,["\n  \t  "])),(l()(),Ti._6(0,null,null,12,"ion-item",[["class","item item-block"]],null,null,null,Vc.b,Vc.a)),Ti._4(1097728,null,3,Bc.a,[Hc.a,kc.a,Ti.k,Ti.E,[2,Yc.a]],null,null),Ti._25(335544320,1,{contentLabel:0}),Ti._25(603979776,2,{_buttons:1}),Ti._25(603979776,3,{_icons:1}),Ti._4(16384,null,0,Wc.a,[],null,null),(l()(),Ti._27(2,["\n  \t    "])),(l()(),Ti._6(0,null,3,4,"ion-input",[["clearInput","true"]],[[2,"ng-untouched",null],[2,"ng-touched",null],[2,"ng-pristine",null],[2,"ng-dirty",null],[2,"ng-valid",null],[2,"ng-invalid",null],[2,"ng-pending",null]],null,null,Xc.b,Xc.a)),Ti._4(671744,null,0,Jc.j,[[8,null],[8,null],[8,null],[8,null]],{model:[0,"model"]},null),Ti._24(2048,null,Jc.h,null,[Jc.j]),Ti._4(16384,null,0,Jc.i,[Jc.h],null,null),Ti._4(5423104,null,0,Qc.a,[kc.a,Dc.a,Hc.a,xc.a,Ti.k,Ti.E,[2,Fc.a],[2,Bc.a],[2,Jc.h],Tc.a],{clearInput:[0,"clearInput"]},null),(l()(),Ti._27(2,["\n  \t  "])),(l()(),Ti._27(null,["\n      "])),(l()(),Ti._6(0,null,null,12,"ion-item",[["class","item item-block"]],null,null,null,Vc.b,Vc.a)),Ti._4(1097728,null,3,Bc.a,[Hc.a,kc.a,Ti.k,Ti.E,[2,Yc.a]],null,null),Ti._25(335544320,4,{contentLabel:0}),Ti._25(603979776,5,{_buttons:1}),Ti._25(603979776,6,{_icons:1}),Ti._4(16384,null,0,Wc.a,[],null,null),(l()(),Ti._27(2,["\n      "])),(l()(),Ti._6(0,null,3,4,"ion-input",[["clearInput","true"]],[[2,"ng-untouched",null],[2,"ng-touched",null],[2,"ng-pristine",null],[2,"ng-dirty",null],[2,"ng-valid",null],[2,"ng-invalid",null],[2,"ng-pending",null]],null,null,Xc.b,Xc.a)),Ti._4(671744,null,0,Jc.j,[[8,null],[8,null],[8,null],[8,null]],{model:[0,"model"]},null),Ti._24(2048,null,Jc.h,null,[Jc.j]),Ti._4(16384,null,0,Jc.i,[Jc.h],null,null),Ti._4(5423104,null,0,Qc.a,[kc.a,Dc.a,Hc.a,xc.a,Ti.k,Ti.E,[2,Fc.a],[2,Bc.a],[2,Jc.h],Tc.a],{clearInput:[0,"clearInput"]},null),(l()(),Ti._27(2,["\n    "])),(l()(),Ti._27(null,["\n    "])),(l()(),Ti._6(0,null,null,12,"ion-item",[["class","item item-block"]],null,null,null,Vc.b,Vc.a)),Ti._4(1097728,null,3,Bc.a,[Hc.a,kc.a,Ti.k,Ti.E,[2,Yc.a]],null,null),Ti._25(335544320,7,{contentLabel:0}),Ti._25(603979776,8,{_buttons:1}),Ti._25(603979776,9,{_icons:1}),Ti._4(16384,null,0,Wc.a,[],null,null),(l()(),Ti._27(2,["\n      "])),(l()(),Ti._6(0,null,3,4,"ion-input",[["clearInput","true"]],[[2,"ng-untouched",null],[2,"ng-touched",null],[2,"ng-pristine",null],[2,"ng-dirty",null],[2,"ng-valid",null],[2,"ng-invalid",null],[2,"ng-pending",null]],null,null,Xc.b,Xc.a)),Ti._4(671744,null,0,Jc.j,[[8,null],[8,null],[8,null],[8,null]],{model:[0,"model"]},null),Ti._24(2048,null,Jc.h,null,[Jc.j]),Ti._4(16384,null,0,Jc.i,[Jc.h],null,null),Ti._4(5423104,null,0,Qc.a,[kc.a,Dc.a,Hc.a,xc.a,Ti.k,Ti.E,[2,Fc.a],[2,Bc.a],[2,Jc.h],Tc.a],{clearInput:[0,"clearInput"]},null),(l()(),Ti._27(2,["\n    "])),(l()(),Ti._27(null,["\n\t"])),(l()(),Ti._27(null,["\n  "])),(l()(),Ti._6(0,null,null,2,"button",[["class","btn-bind"],["ion-button",""]],null,null,null,t_.b,t_.a)),Ti._4(1097728,null,0,e_.a,[[8,""],kc.a,Ti.k,Ti.E],null,null),(l()(),Ti._27(0,["确定"])),(l()(),Ti._27(null,["\n  "])),(l()(),Ti._27(1,["\n"])),(l()(),Ti._27(null,["\n"]))],function(l,n){var u=n.component;l(n,35,0,u.name);l(n,38,0,"true");l(n,49,0,u.phone);l(n,52,0,"true");l(n,63,0,u.idCard);l(n,66,0,"true")},function(l,n){l(n,3,0,Ti._20(n,4)._hidden,Ti._20(n,4)._sbPadding);l(n,12,0,Ti._20(n,13).statusbarPadding,Ti._20(n,13)._hasRefresher);l(n,34,0,Ti._20(n,37).ngClassUntouched,Ti._20(n,37).ngClassTouched,Ti._20(n,37).ngClassPristine,Ti._20(n,37).ngClassDirty,Ti._20(n,37).ngClassValid,Ti._20(n,37).ngClassInvalid,Ti._20(n,37).ngClassPending);l(n,48,0,Ti._20(n,51).ngClassUntouched,Ti._20(n,51).ngClassTouched,Ti._20(n,51).ngClassPristine,Ti._20(n,51).ngClassDirty,Ti._20(n,51).ngClassValid,Ti._20(n,51).ngClassInvalid,Ti._20(n,51).ngClassPending);l(n,62,0,Ti._20(n,65).ngClassUntouched,Ti._20(n,65).ngClassTouched,Ti._20(n,65).ngClassPristine,Ti._20(n,65).ngClassDirty,Ti._20(n,65).ngClassValid,Ti._20(n,65).ngClassInvalid,Ti._20(n,65).ngClassPending)})}function Xt(l){return Ti._29(0,[(l()(),Ti._6(0,null,null,1,"span",[["class","clear"]],null,[[null,"click"]],function(l,n,u){var t=!0;if("click"===n){t=!1!==l.component.clearDateStart()&&t}return t},null,null)),(l()(),Ti._27(null,["X"]))],null,null)}function Jt(l){return Ti._29(0,[(l()(),Ti._6(0,null,null,1,"span",[["class","clear"]],null,[[null,"click"]],function(l,n,u){var t=!0;if("click"===n){t=!1!==l.component.clearDateEnd()&&t}return t},null,null)),(l()(),Ti._27(null,["X"]))],null,null)}function Qt(l){return Ti._29(0,[(l()(),Ti._6(0,null,null,3,"li",[],null,[[null,"click"]],function(l,n,u){var t=!0;if("click"===n){t=!1!==l.component.getCurrentStatus(l.context.index)&&t}return t},null,null)),Ti._4(278528,null,0,Zc.h,[Ti.r,Ti.s,Ti.k,Ti.E],{ngClass:[0,"ngClass"]},null),Ti._22({active:0}),(l()(),Ti._27(null,["",""]))],function(l,n){l(n,1,0,l(n,2,0,n.component.currentStatus==n.context.$implicit.status))},function(l,n){l(n,3,0,n.context.$implicit.label)})}function Zt(l){return Ti._29(0,[(l()(),Ti._6(0,null,null,9,"div",[["class","loading-wrapper"]],null,null,null,null,null)),(l()(),Ti._27(null,["\n      "])),(l()(),Ti._6(0,null,null,4,"div",[],null,null,null,null,null)),(l()(),Ti._27(null,["\n        "])),(l()(),Ti._6(0,null,null,1,"ion-spinner",[["item-start",""]],[[2,"spinner-paused",null]],null,null,q_.b,q_.a)),Ti._4(114688,null,0,R_.a,[kc.a,Ti.k,Ti.E],{name:[0,"name"]},null),(l()(),Ti._27(null,["\n      "])),(l()(),Ti._27(null,["\n      "])),(l()(),Ti._6(0,null,null,0,"div",[],[[8,"innerHTML",1]],null,null,null,null)),(l()(),Ti._27(null,["\n    "]))],function(l,n){l(n,5,0,n.component.load.spinner)},function(l,n){var u=n.component;l(n,4,0,Ti._20(n,5)._paused);l(n,8,0,u.load.content)})}function le(l){return Ti._29(0,[(l()(),Ti._6(0,null,null,6,"ion-refresher",[],[[2,"refresher-active",null],[4,"top",null]],[[null,"ionRefresh"]],function(l,n,u){var t=!0;if("ionRefresh"===n){t=!1!==l.component.doRefresh(u)&&t}return t},null,null)),Ti._4(212992,null,0,E_.a,[Dc.a,Fc.a,Ti.x,Cc.l],null,{ionRefresh:"ionRefresh"}),(l()(),Ti._27(null,["\n      "])),(l()(),Ti._6(0,null,null,2,"ion-refresher-content",[],[[1,"state",0]],null,null,M_.b,M_.a)),Ti._4(114688,null,0,L_.a,[E_.a,kc.a],null,null),(l()(),Ti._27(null,["\n      "])),(l()(),Ti._27(null,["\n    "]))],function(l,n){l(n,1,0),l(n,4,0)},function(l,n){l(n,0,0,"inactive"!==Ti._20(n,1).state,Ti._20(n,1)._top);l(n,3,0,Ti._20(n,4).r.state)})}function ne(l){return Ti._29(0,[(l()(),Ti._6(0,null,null,1,"span",[],null,null,null,null,null)),(l()(),Ti._27(null,[""," "]))],null,function(l,n){l(n,1,0,n.context.$implicit.attrValue)})}function ue(l){return Ti._29(0,[(l()(),Ti._6(0,null,null,1,"dd",[["class","price"]],null,null,null,null,null)),(l()(),Ti._27(null,["￥",""]))],null,function(l,n){l(n,1,0,n.parent.context.$implicit.unitPrice)})}function te(l){return Ti._29(0,[(l()(),Ti._6(0,null,null,1,"dd",[["class","price"]],null,null,null,null,null)),(l()(),Ti._27(null,["商品总额：￥",""]))],null,function(l,n){l(n,1,0,n.parent.context.$implicit.unitPrice)})}function ee(l){return Ti._29(0,[(l()(),Ti._6(0,null,null,28,"div",[["class","order-item"]],null,null,null,null,null)),(l()(),Ti._27(null,["\n        "])),(l()(),Ti._6(0,null,null,25,"dl",[],null,null,null,null,null)),(l()(),Ti._27(null,["\n          "])),(l()(),Ti._6(0,null,null,4,"dt",[],null,null,null,null,null)),(l()(),Ti._27(null,["\n            "])),(l()(),Ti._6(0,null,null,1,"img",[["class","my-picture"]],[[8,"src",4],[8,"alt",0]],null,null,null,null)),Ti._23(1),(l()(),Ti._27(null,["\n          "])),(l()(),Ti._27(null,["\n          "])),(l()(),Ti._6(0,null,null,1,"dd",[["class","product-title"]],null,null,null,null,null)),(l()(),Ti._27(null,["",""])),(l()(),Ti._27(null,["\n          "])),(l()(),Ti._6(0,null,null,4,"dd",[["class","sku-list"]],null,null,null,null,null)),(l()(),Ti._27(null,["\n            "])),(l()(),Ti._0(16777216,null,null,1,null,ne)),Ti._4(802816,null,0,Zc.i,[Ti.O,Ti.K,Ti.r],{ngForOf:[0,"ngForOf"]},null),(l()(),Ti._27(null,["\n          "])),(l()(),Ti._27(null,["\n          "])),(l()(),Ti._0(16777216,null,null,1,null,ue)),Ti._4(16384,null,0,Zc.j,[Ti.O,Ti.K],{ngIf:[0,"ngIf"]},null),(l()(),Ti._27(null,["\n          "])),(l()(),Ti._0(16777216,null,null,1,null,te)),Ti._4(16384,null,0,Zc.j,[Ti.O,Ti.K],{ngIf:[0,"ngIf"]},null),(l()(),Ti._27(null,["\n          "])),(l()(),Ti._6(0,null,null,1,"dd",[["class","count"]],null,null,null,null,null)),(l()(),Ti._27(null,["X",""])),(l()(),Ti._27(null,["\n        "])),(l()(),Ti._27(null,["\n      "]))],function(l,n){l(n,16,0,n.context.$implicit.productSkuDTO.attrValueList);l(n,20,0,"B"!=n.parent.context.$implicit.userType);l(n,23,0,"B"==n.parent.context.$implicit.userType)},function(l,n){l(n,6,0,Ti._9(1,"",Ti._28(n,6,0,l(n,7,0,Ti._20(n.parent.parent,1),n.context.$implicit.productSkuDTO.fileSeq)),""),n.context.$implicit.productSkuDTO.productName);l(n,11,0,n.context.$implicit.productSkuDTO.productName);l(n,26,0,n.context.$implicit.number)})}function ie(l){return Ti._29(0,[(l()(),Ti._6(0,null,null,2,"dd",[["class","member-phone"]],null,null,null,null,null)),(l()(),Ti._27(null,["收货时间：",""])),Ti._23(2)],null,function(l,n){l(n,1,0,Ti._28(n,1,0,l(n,2,0,Ti._20(n.parent.parent,2),n.parent.context.$implicit.receiptTime,"yyyy-MM-dd HH:mm:ss")))})}function ae(l){return Ti._29(0,[(l()(),Ti._6(0,null,null,19,"div",[["class","order-detail"]],null,null,null,null,null)),(l()(),Ti._27(null,["\n          "])),(l()(),Ti._6(0,null,null,16,"ul",[],null,null,null,null,null)),(l()(),Ti._27(null,["\n            "])),(l()(),Ti._6(0,null,null,1,"li",[],null,null,null,null,null)),(l()(),Ti._27(null,["订单总额：￥",""])),(l()(),Ti._27(null,["\n            "])),(l()(),Ti._6(0,null,null,1,"li",[],null,null,null,null,null)),(l()(),Ti._27(null,["促销抵扣：￥",""])),(l()(),Ti._27(null,["\n            "])),(l()(),Ti._6(0,null,null,1,"li",[],null,null,null,null,null)),(l()(),Ti._27(null,["淘璞券折扣：￥",""])),(l()(),Ti._27(null,["\n            "])),(l()(),Ti._6(0,null,null,1,"li",[],null,null,null,null,null)),(l()(),Ti._27(null,["商户券抵扣：￥",""])),(l()(),Ti._27(null,["\n            "])),(l()(),Ti._6(0,null,null,1,"li",[],null,null,null,null,null)),(l()(),Ti._27(null,["积分抵扣：￥",""])),(l()(),Ti._27(null,["\n          "])),(l()(),Ti._27(null,["\n        "]))],null,function(l,n){l(n,5,0,n.parent.context.$implicit.totalAmount);l(n,8,0,n.parent.context.$implicit.discountAmount);l(n,11,0,n.parent.context.$implicit.couponAmount);l(n,14,0,n.parent.context.$implicit.merchantCouponAmount);l(n,17,0,n.parent.context.$implicit.integralAmount)})}function oe(l){return Ti._29(0,[(l()(),Ti._6(0,null,null,1,"span",[],null,null,null,null,null)),(l()(),Ti._27(null,["点击查看明细"]))],null,null)}function re(l){return Ti._29(0,[(l()(),Ti._6(0,null,null,1,"span",[],null,null,null,null,null)),(l()(),Ti._27(null,["点击收起明细"]))],null,null)}function se(l){return Ti._29(0,[(l()(),Ti._6(0,null,null,71,"div",[["class","order-items"]],null,null,null,null,null)),(l()(),Ti._27(null,["\n      "])),(l()(),Ti._27(null,["\n      "])),(l()(),Ti._6(0,null,null,16,"div",[["class","order-title"]],null,null,null,null,null)),(l()(),Ti._27(null,["\n        "])),(l()(),Ti._6(0,null,null,4,"h2",[],null,null,null,null,null)),(l()(),Ti._27(null,["订单编号：\n          "])),(l()(),Ti._6(0,null,null,1,"span",[],null,null,null,null,null)),(l()(),Ti._27(null,["",""])),(l()(),Ti._27(null,["\n        "])),(l()(),Ti._27(null,["\n        "])),(l()(),Ti._27(null,["\n        "])),(l()(),Ti._6(0,null,null,6,"span",[],null,null,null,null,null)),Ti._4(278528,null,0,Zc.h,[Ti.r,Ti.s,Ti.k,Ti.E],{ngClass:[0,"ngClass"]},null),Ti._23(1),Ti._23(1),Ti._22({auditStatus:0,pass:1,auditing:2}),(l()(),Ti._27(null,["",""])),Ti._23(1),(l()(),Ti._27(null,["\n      "])),(l()(),Ti._27(null,["\n      "])),(l()(),Ti._27(null,["\n      "])),(l()(),Ti._0(16777216,null,null,1,null,ee)),Ti._4(802816,null,0,Zc.i,[Ti.O,Ti.K,Ti.r],{ngForOf:[0,"ngForOf"]},null),(l()(),Ti._27(null,["\n\n      "])),(l()(),Ti._27(null,["\n      "])),(l()(),Ti._6(0,null,null,19,"div",[["class","orderOperate"]],null,null,null,null,null)),(l()(),Ti._27(null,["\n        "])),(l()(),Ti._6(0,null,null,16,"dl",[],null,null,null,null,null)),(l()(),Ti._27(null,["\n          "])),(l()(),Ti._6(0,null,null,6,"dt",[],null,null,null,null,null)),(l()(),Ti._27(null,["\n            "])),(l()(),Ti._6(0,null,null,3,"a",[],[[8,"href",4]],null,null,null,null)),(l()(),Ti._27(null,["\n              "])),(l()(),Ti._6(0,null,null,0,"img",[["alt",""],["src","./assets/image/phone.png"]],null,null,null,null,null)),(l()(),Ti._27(null,["\n            "])),(l()(),Ti._27(null,["\n          "])),(l()(),Ti._27(null,["\n          "])),(l()(),Ti._6(0,null,null,1,"dd",[["class","total"]],null,null,null,null,null)),(l()(),Ti._27(null,["会员手机：",""])),(l()(),Ti._27(null,["\n          "])),(l()(),Ti._0(16777216,null,null,1,null,ie)),Ti._4(16384,null,0,Zc.j,[Ti.O,Ti.K],{ngIf:[0,"ngIf"]},null),(l()(),Ti._27(null,["\n          "])),(l()(),Ti._27(null,["\n        "])),(l()(),Ti._27(null,["\n      "])),(l()(),Ti._27(null,["\n      "])),(l()(),Ti._6(0,null,null,23,"div",[["class","order-dtail-box"]],null,null,null,null,null)),(l()(),Ti._27(null,["\n        "])),(l()(),Ti._0(16777216,null,null,1,null,ae)),Ti._4(16384,null,0,Zc.j,[Ti.O,Ti.K],{ngIf:[0,"ngIf"]},null),(l()(),Ti._27(null,["\n        "])),(l()(),Ti._6(0,null,null,4,"div",[["class","pay-money"]],null,null,null,null,null)),(l()(),Ti._27(null,["\n          会员实付金额\n          "])),(l()(),Ti._6(0,null,null,1,"span",[],null,null,null,null,null)),(l()(),Ti._27(null,["￥",""])),(l()(),Ti._27(null,["\n          \n        "])),(l()(),Ti._27(null,["\n        "])),(l()(),Ti._6(0,null,null,11,"div",[["class","btn-show"]],null,[[null,"click"]],function(l,n,u){var t=!0;if("click"===n){t=!1!==l.component.showDetail(l.context.index)&&t}return t},null,null)),(l()(),Ti._27(null,["\n          "])),(l()(),Ti._0(16777216,null,null,1,null,oe)),Ti._4(16384,null,0,Zc.j,[Ti.O,Ti.K],{ngIf:[0,"ngIf"]},null),(l()(),Ti._27(null,["\n          "])),(l()(),Ti._0(16777216,null,null,1,null,re)),Ti._4(16384,null,0,Zc.j,[Ti.O,Ti.K],{ngIf:[0,"ngIf"]},null),(l()(),Ti._27(null,["\n          "])),(l()(),Ti._6(0,null,null,2,"span",[],null,null,null,null,null)),Ti._4(278528,null,0,Zc.h,[Ti.r,Ti.s,Ti.k,Ti.E],{ngClass:[0,"ngClass"]},null),Ti._22({"icon-triangle":0,"icon-bottom":1}),(l()(),Ti._27(null,["\n        "])),(l()(),Ti._27(null,["\n      "])),(l()(),Ti._27(null,["\n    "]))],function(l,n){var u=n.component;l(n,13,0,l(n,16,0,!0,Ti._28(n,13,0,l(n,14,0,Ti._20(n.parent,0),n.context.$implicit.status)).pass,Ti._28(n,13,0,l(n,15,0,Ti._20(n.parent,0),n.context.$implicit.status)).audit));l(n,23,0,n.context.$implicit.orderItemProductSkuDTOS);l(n,42,0,3==n.context.$implicit.status||6==n.context.$implicit.status||"C"==n.context.$implicit.status);l(n,50,0,u.isShowDetail[n.context.index]);l(n,61,0,0==u.isShowDetail[n.context.index]);l(n,64,0,1==u.isShowDetail[n.context.index]);l(n,67,0,l(n,68,0,!0,u.isShowDetail[n.context.index]))},function(l,n){l(n,8,0,n.context.$implicit.orderId);l(n,17,0,Ti._28(n,17,0,l(n,18,0,Ti._20(n.parent,0),n.context.$implicit.status)).status);l(n,32,0,Ti._9(1,"tel:",n.context.$implicit.memberMobile,""));l(n,39,0,n.context.$implicit.memberMobile);l(n,55,0,n.context.$implicit.payAmount)})}function ce(l){return Ti._29(0,[(l()(),Ti._6(0,null,null,5,"ion-infinite-scroll",[],null,[[null,"ionInfinite"]],function(l,n,u){var t=!0;if("ionInfinite"===n){t=!1!==l.component.loadMore(u)&&t}return t},null,null)),Ti._4(1196032,null,0,$_.a,[Fc.a,Ti.x,Ti.k,Tc.a],null,{ionInfinite:"ionInfinite"}),(l()(),Ti._27(null,["\n      "])),(l()(),Ti._6(0,null,null,1,"ion-infinite-scroll-content",[["loadingText","加载更多..."]],[[1,"state",0]],null,null,G_.b,G_.a)),Ti._4(114688,null,0,K_.a,[$_.a,kc.a],{loadingText:[0,"loadingText"]},null),(l()(),Ti._27(null,["\n    "]))],function(l,n){l(n,4,0,"加载更多...")},function(l,n){l(n,3,0,Ti._20(n,4).inf.state)})}function _e(l){return Ti._29(0,[(l()(),Ti._6(0,null,null,6,"div",[["class","no-data"]],null,null,null,null,null)),(l()(),Ti._27(null,["\n    "])),(l()(),Ti._6(0,null,null,0,"img",[["alt",""],["src","./assets/image/nodata.png"]],null,null,null,null,null)),(l()(),Ti._27(null,["\n    "])),(l()(),Ti._6(0,null,null,1,"p",[],null,null,null,null,null)),(l()(),Ti._27(null,["空空如也"])),(l()(),Ti._27(null,["\n  "]))],null,null)}function de(l){return Ti._29(0,[(l()(),Ti._6(0,null,null,4,"div",[["class","btn-noMore"]],null,null,null,null,null)),(l()(),Ti._27(null,["\n    "])),(l()(),Ti._6(0,null,null,1,"span",[],null,null,null,null,null)),(l()(),Ti._27(null,["—— 没有更多信息了 ——"])),(l()(),Ti._27(null,["\n  "]))],null,null)}function pe(l){return Ti._29(0,[(l()(),Ti._6(0,null,null,10,"div",[["class","request-defeat"]],null,null,null,null,null)),(l()(),Ti._27(null,["\n    "])),(l()(),Ti._6(0,null,null,0,"img",[["alt",""],["src","./assets/image/requestDefeat.png"]],null,null,null,null,null)),(l()(),Ti._27(null,["\n    "])),(l()(),Ti._6(0,null,null,1,"p",[],null,null,null,null,null)),(l()(),Ti._27(null,["啊哦！页面走丢了"])),(l()(),Ti._27(null,["\n    "])),(l()(),Ti._6(0,null,null,2,"button",[["class","btn-request-defeat"],["full",""],["ion-button",""]],null,[[null,"touchstart"]],function(l,n,u){var t=!0;if("touchstart"===n){t=!1!==l.component.requestDefeatRefresh()&&t}return t},t_.b,t_.a)),Ti._4(1097728,null,0,e_.a,[[8,""],kc.a,Ti.k,Ti.E],{full:[0,"full"]},null),(l()(),Ti._27(0,["\n      刷新再找一找\n    "])),(l()(),Ti._27(null,["\n  "]))],function(l,n){l(n,8,0,"")},null)}function fe(l){return Ti._29(0,[Ti._21(0,ms,[]),Ti._21(0,Ds,[]),Ti._21(0,Zc.d,[Ti.t]),Ti._25(402653184,1,{content:0}),(l()(),Ti._6(0,null,null,66,"ion-header",[],null,null,null,null,null)),Ti._4(16384,null,0,Lc.a,[kc.a,Ti.k,Ti.E,[2,Ic.a]],null,null),(l()(),Ti._27(null,["\n  "])),(l()(),Ti._6(0,null,null,9,"ion-navbar",[["class","toolbar"]],[[8,"hidden",0],[2,"statusbar-padding",null]],null,null,qc.b,qc.a)),Ti._4(49152,null,0,Rc.a,[xc.a,[2,Ic.a],[2,Oc.a],kc.a,Ti.k,Ti.E],null,null),(l()(),Ti._27(3,["\n    "])),(l()(),Ti._6(0,null,3,2,"ion-title",[["text-center",""]],null,null,null,$c.b,$c.a)),Ti._4(49152,null,0,Gc.a,[kc.a,Ti.k,Ti.E,[2,Kc.a],[2,Rc.a]],null,null),(l()(),Ti._27(0,["订单列表"])),(l()(),Ti._27(3,["\n    "])),(l()(),Ti._6(0,null,3,1,"span",[["class","brandshop-order"]],null,[[null,"touchstart"]],function(l,n,u){var t=!0;if("touchstart"===n){t=!1!==l.component.goBrandshoOrder()&&t}return t},null,null)),(l()(),Ti._27(null,["\n      门店所有订单\n    "])),(l()(),Ti._27(3,["\n  "])),(l()(),Ti._27(null,["\n  "])),(l()(),Ti._6(0,null,null,51,"ion-toolbar",[["class","filter-box toolbar"]],[[2,"statusbar-padding",null]],null,null,p_.b,p_.a)),Ti._4(49152,null,0,Kc.a,[kc.a,Ti.k,Ti.E],null,null),(l()(),Ti._27(3,["\n    "])),(l()(),Ti._6(0,null,3,38,"div",[["class","time-box"]],null,null,null,null,null)),(l()(),Ti._27(null,["\n      "])),(l()(),Ti._6(0,null,null,1,"div",[["class","search-title"]],null,null,null,null,null)),(l()(),Ti._27(null,["选择日期"])),(l()(),Ti._27(null,["\n      "])),(l()(),Ti._6(0,null,null,32,"div",[["class","search-list"]],null,null,null,null,null)),(l()(),Ti._27(null,["\n        "])),(l()(),Ti._6(0,null,null,12,"div",[["class","time-start"]],null,null,null,null,null)),(l()(),Ti._27(null,["\n          "])),(l()(),Ti._6(0,null,null,6,"ion-datetime",[["cancelText","取消"],["displayFormat","YYYY-MM-DD"],["doneText","确定"],["placeholder","请选择日期"]],[[2,"datetime-disabled",null],[2,"ng-untouched",null],[2,"ng-touched",null],[2,"ng-pristine",null],[2,"ng-dirty",null],[2,"ng-valid",null],[2,"ng-invalid",null],[2,"ng-pending",null]],[[null,"ionChange"],[null,"ngModelChange"],[null,"click"],[null,"keyup.space"]],function(l,n,u){var t=!0,e=l.component;if("click"===n){t=!1!==Ti._20(l,31)._click(u)&&t}if("keyup.space"===n){t=!1!==Ti._20(l,31)._keyup()&&t}if("ionChange"===n){t=!1!==e.getOrderListByDate()&&t}if("ngModelChange"===n){t=!1!==(e.dateStart=u)&&t}return t},wd.b,wd.a)),Ti._4(1228800,null,0,yd.a,[Hc.a,kc.a,Ti.k,Ti.E,[2,Bc.a],[2,Sd.a]],{max:[0,"max"],displayFormat:[1,"displayFormat"],cancelText:[2,"cancelText"],doneText:[3,"doneText"],placeholder:[4,"placeholder"]},{ionChange:"ionChange"}),Ti._24(1024,null,Jc.g,function(l){return[l]},[yd.a]),Ti._4(671744,null,0,Jc.j,[[8,null],[8,null],[8,null],[2,Jc.g]],{model:[0,"model"]},{update:"ngModelChange"}),Ti._24(2048,null,Jc.h,null,[Jc.j]),Ti._4(16384,null,0,Jc.i,[Jc.h],null,null),(l()(),Ti._27(null,["\n          "])),(l()(),Ti._27(null,["\n          "])),(l()(),Ti._0(16777216,null,null,1,null,Xt)),Ti._4(16384,null,0,Zc.j,[Ti.O,Ti.K],{ngIf:[0,"ngIf"]},null),(l()(),Ti._27(null,["\n        "])),(l()(),Ti._27(null,["\n        "])),(l()(),Ti._6(0,null,null,1,"span",[["class","go"]],null,null,null,null,null)),(l()(),Ti._27(null,["到"])),(l()(),Ti._27(null,["\n        "])),(l()(),Ti._6(0,null,null,12,"div",[["class","time-end"]],null,null,null,null,null)),(l()(),Ti._27(null,["\n          "])),(l()(),Ti._6(0,null,null,6,"ion-datetime",[["cancelText","取消"],["displayFormat","YYYY-MM-DD"],["doneText","确定"],["placeholder","请选择日期"]],[[2,"datetime-disabled",null],[2,"ng-untouched",null],[2,"ng-touched",null],[2,"ng-pristine",null],[2,"ng-dirty",null],[2,"ng-valid",null],[2,"ng-invalid",null],[2,"ng-pending",null]],[[null,"ionChange"],[null,"ngModelChange"],[null,"click"],[null,"keyup.space"]],function(l,n,u){var t=!0,e=l.component;if("click"===n){t=!1!==Ti._20(l,48)._click(u)&&t}if("keyup.space"===n){t=!1!==Ti._20(l,48)._keyup()&&t}if("ionChange"===n){t=!1!==e.getOrderListByDate()&&t}if("ngModelChange"===n){t=!1!==(e.dateEnd=u)&&t}return t},wd.b,wd.a)),Ti._4(1228800,null,0,yd.a,[Hc.a,kc.a,Ti.k,Ti.E,[2,Bc.a],[2,Sd.a]],{min:[0,"min"],max:[1,"max"],displayFormat:[2,"displayFormat"],cancelText:[3,"cancelText"],doneText:[4,"doneText"],placeholder:[5,"placeholder"]},{ionChange:"ionChange"}),Ti._24(1024,null,Jc.g,function(l){return[l]},[yd.a]),Ti._4(671744,null,0,Jc.j,[[8,null],[8,null],[8,null],[2,Jc.g]],{model:[0,"model"]},{update:"ngModelChange"}),Ti._24(2048,null,Jc.h,null,[Jc.j]),Ti._4(16384,null,0,Jc.i,[Jc.h],null,null),(l()(),Ti._27(null,["\n          "])),(l()(),Ti._27(null,[" \n          "])),(l()(),Ti._0(16777216,null,null,1,null,Jt)),Ti._4(16384,null,0,Zc.j,[Ti.O,Ti.K],{ngIf:[0,"ngIf"]},null),(l()(),Ti._27(null,["\n        "])),(l()(),Ti._27(null,["\n      "])),(l()(),Ti._27(null,["\n    "])),(l()(),Ti._27(3,["\n    "])),(l()(),Ti._6(0,null,3,7,"div",[["class","status-box"]],null,null,null,null,null)),(l()(),Ti._27(null,["\n      "])),(l()(),Ti._6(0,null,null,4,"ul",[],null,null,null,null,null)),(l()(),Ti._27(null,["\n        "])),(l()(),Ti._0(16777216,null,null,1,null,Qt)),Ti._4(802816,null,0,Zc.i,[Ti.O,Ti.K,Ti.r],{ngForOf:[0,"ngForOf"]},null),(l()(),Ti._27(null,["\n      "])),(l()(),Ti._27(null,["\n    "])),(l()(),Ti._27(3,["\n  "])),(l()(),Ti._27(null,["\n"])),(l()(),Ti._27(null,["\n"])),(l()(),Ti._6(0,null,null,27,"ion-content",[],[[2,"statusbar-padding",null],[2,"has-refresher",null]],[["window","resize"]],function(l,n,u){var t=!0;if("window:resize"===n){t=!1!==Ti._20(l,73).resize()&&t}return t},Nc.b,Nc.a)),Ti._4(4374528,[[1,4]],0,Fc.a,[kc.a,Dc.a,Tc.a,Ti.k,Ti.E,xc.a,Uc.a,Ti.x,[2,Ic.a],[2,Oc.a]],null,null),(l()(),Ti._27(1,["\n  "])),(l()(),Ti._6(0,null,1,14,"div",[["class","order-list"]],null,null,null,null,null)),(l()(),Ti._27(null,["\n    "])),(l()(),Ti._27(null,["\n    "])),(l()(),Ti._0(16777216,null,null,1,null,Zt)),Ti._4(16384,null,0,Zc.j,[Ti.O,Ti.K],{ngIf:[0,"ngIf"]},null),(l()(),Ti._27(null,["\n    "])),(l()(),Ti._0(16777216,null,null,1,null,le)),Ti._4(16384,null,0,Zc.j,[Ti.O,Ti.K],{ngIf:[0,"ngIf"]},null),(l()(),Ti._27(null,["\n\n    "])),(l()(),Ti._0(16777216,null,null,1,null,se)),Ti._4(802816,null,0,Zc.i,[Ti.O,Ti.K,Ti.r],{ngForOf:[0,"ngForOf"]},null),(l()(),Ti._27(null,["\n\n    "])),(l()(),Ti._0(16777216,null,null,1,null,ce)),Ti._4(16384,null,0,Zc.j,[Ti.O,Ti.K],{ngIf:[0,"ngIf"]},null),(l()(),Ti._27(null,["\n  "])),(l()(),Ti._27(1,["\n  "])),(l()(),Ti._0(16777216,null,1,1,null,_e)),Ti._4(16384,null,0,Zc.j,[Ti.O,Ti.K],{ngIf:[0,"ngIf"]},null),(l()(),Ti._27(1,["\n  "])),(l()(),Ti._0(16777216,null,1,1,null,de)),Ti._4(16384,null,0,Zc.j,[Ti.O,Ti.K],{ngIf:[0,"ngIf"]},null),(l()(),Ti._27(1,["\n  "])),(l()(),Ti._0(16777216,null,1,1,null,pe)),Ti._4(16384,null,0,Zc.j,[Ti.O,Ti.K],{ngIf:[0,"ngIf"]},null),(l()(),Ti._27(1,["\n"]))],function(l,n){var u=n.component;l(n,31,0,Ti._9(1,"",u.dateStartMax,""),"YYYY-MM-DD","取消","确定","请选择日期");l(n,33,0,u.dateStart);l(n,39,0,u.dateStart);l(n,48,0,Ti._9(1,"",u.dateEndMin,""),Ti._9(1,"",u.dateEndMax,""),"YYYY-MM-DD","取消","确定","请选择日期");l(n,50,0,u.dateEnd);l(n,56,0,u.dateEnd);l(n,66,0,u.orderStatusList);l(n,79,0,u.loadingShow);l(n,82,0,!u.loadingShow);l(n,85,0,u.orderList);l(n,88,0,u.showInfinite&&!u.loadingShow);l(n,92,0,u.noData);l(n,95,0,u.showNoMore);l(n,98,0,u.requestDefeat)},function(l,n){l(n,7,0,Ti._20(n,8)._hidden,Ti._20(n,8)._sbPadding);l(n,18,0,Ti._20(n,19)._sbPadding);l(n,30,0,Ti._20(n,31)._disabled,Ti._20(n,35).ngClassUntouched,Ti._20(n,35).ngClassTouched,Ti._20(n,35).ngClassPristine,Ti._20(n,35).ngClassDirty,Ti._20(n,35).ngClassValid,Ti._20(n,35).ngClassInvalid,Ti._20(n,35).ngClassPending);l(n,47,0,Ti._20(n,48)._disabled,Ti._20(n,52).ngClassUntouched,Ti._20(n,52).ngClassTouched,Ti._20(n,52).ngClassPristine,Ti._20(n,52).ngClassDirty,Ti._20(n,52).ngClassValid,Ti._20(n,52).ngClassInvalid,Ti._20(n,52).ngClassPending);l(n,72,0,Ti._20(n,73).statusbarPadding,Ti._20(n,73)._hasRefresher)})}function he(l){return Ti._29(0,[(l()(),Ti._6(0,null,null,1,"span",[["class","clear"]],null,[[null,"click"]],function(l,n,u){var t=!0;if("click"===n){t=!1!==l.component.clearDateStart()&&t}return t},null,null)),(l()(),Ti._27(null,["X"]))],null,null)}function ge(l){return Ti._29(0,[(l()(),Ti._6(0,null,null,1,"span",[["class","clear"]],null,[[null,"click"]],function(l,n,u){var t=!0;if("click"===n){t=!1!==l.component.clearDateEnd()&&t}return t},null,null)),(l()(),Ti._27(null,["X"]))],null,null)}function me(l){return Ti._29(0,[(l()(),Ti._6(0,null,null,3,"li",[],null,[[null,"click"]],function(l,n,u){var t=!0;if("click"===n){t=!1!==l.component.getCurrentStatus(l.context.index)&&t}return t},null,null)),Ti._4(278528,null,0,Zc.h,[Ti.r,Ti.s,Ti.k,Ti.E],{ngClass:[0,"ngClass"]},null),Ti._22({active:0}),(l()(),Ti._27(null,["",""]))],function(l,n){l(n,1,0,l(n,2,0,n.component.currentStatus==n.context.$implicit.status))},function(l,n){l(n,3,0,n.context.$implicit.label)})}function ve(l){return Ti._29(0,[(l()(),Ti._6(0,null,null,9,"div",[["class","loading-wrapper"]],null,null,null,null,null)),(l()(),Ti._27(null,["\n      "])),(l()(),Ti._6(0,null,null,4,"div",[],null,null,null,null,null)),(l()(),Ti._27(null,["\n        "])),(l()(),Ti._6(0,null,null,1,"ion-spinner",[["item-start",""]],[[2,"spinner-paused",null]],null,null,q_.b,q_.a)),Ti._4(114688,null,0,R_.a,[kc.a,Ti.k,Ti.E],{name:[0,"name"]},null),(l()(),Ti._27(null,["\n      "])),(l()(),Ti._27(null,["\n      "])),(l()(),Ti._6(0,null,null,0,"div",[],[[8,"innerHTML",1]],null,null,null,null)),(l()(),Ti._27(null,["\n    "]))],function(l,n){l(n,5,0,n.component.load.spinner)},function(l,n){var u=n.component;l(n,4,0,Ti._20(n,5)._paused);l(n,8,0,u.load.content)})}function be(l){return Ti._29(0,[(l()(),Ti._6(0,null,null,6,"ion-refresher",[],[[2,"refresher-active",null],[4,"top",null]],[[null,"ionRefresh"]],function(l,n,u){var t=!0;if("ionRefresh"===n){t=!1!==l.component.doRefresh(u)&&t}return t},null,null)),Ti._4(212992,null,0,E_.a,[Dc.a,Fc.a,Ti.x,Cc.l],null,{ionRefresh:"ionRefresh"}),(l()(),Ti._27(null,["\n      "])),(l()(),Ti._6(0,null,null,2,"ion-refresher-content",[],[[1,"state",0]],null,null,M_.b,M_.a)),Ti._4(114688,null,0,L_.a,[E_.a,kc.a],null,null),(l()(),Ti._27(null,["\n      "])),(l()(),Ti._27(null,["\n    "]))],function(l,n){l(n,1,0),l(n,4,0)},function(l,n){l(n,0,0,"inactive"!==Ti._20(n,1).state,Ti._20(n,1)._top);l(n,3,0,Ti._20(n,4).r.state)})}function we(l){return Ti._29(0,[(l()(),Ti._6(0,null,null,1,"span",[],null,null,null,null,null)),(l()(),Ti._27(null,[""," "]))],null,function(l,n){l(n,1,0,n.context.$implicit.attrValue)})}function ye(l){return Ti._29(0,[(l()(),Ti._6(0,null,null,1,"dd",[["class","price"]],null,null,null,null,null)),(l()(),Ti._27(null,["￥",""]))],null,function(l,n){l(n,1,0,n.parent.context.$implicit.unitPrice)})}function Se(l){return Ti._29(0,[(l()(),Ti._6(0,null,null,1,"dd",[["class","price"]],null,null,null,null,null)),(l()(),Ti._27(null,["商品总额：￥",""]))],null,function(l,n){l(n,1,0,n.parent.context.$implicit.unitPrice)})}function Ie(l){return Ti._29(0,[(l()(),Ti._6(0,null,null,28,"div",[["class","order-item"]],null,null,null,null,null)),(l()(),Ti._27(null,["\n          "])),(l()(),Ti._6(0,null,null,25,"dl",[],null,null,null,null,null)),(l()(),Ti._27(null,["\n            "])),(l()(),Ti._6(0,null,null,4,"dt",[],null,null,null,null,null)),(l()(),Ti._27(null,["\n              "])),(l()(),Ti._6(0,null,null,1,"img",[["class","my-picture"]],[[8,"src",4],[8,"alt",0]],null,null,null,null)),Ti._23(1),(l()(),Ti._27(null,["\n            "])),(l()(),Ti._27(null,["\n            "])),(l()(),Ti._6(0,null,null,1,"dd",[["class","product-title"]],null,null,null,null,null)),(l()(),Ti._27(null,["",""])),(l()(),Ti._27(null,["\n            "])),(l()(),Ti._6(0,null,null,4,"dd",[["class","sku-list"]],null,null,null,null,null)),(l()(),Ti._27(null,["\n              "])),(l()(),Ti._0(16777216,null,null,1,null,we)),Ti._4(802816,null,0,Zc.i,[Ti.O,Ti.K,Ti.r],{ngForOf:[0,"ngForOf"]},null),(l()(),Ti._27(null,["\n            "])),(l()(),Ti._27(null,["\n            "])),(l()(),Ti._0(16777216,null,null,1,null,ye)),Ti._4(16384,null,0,Zc.j,[Ti.O,Ti.K],{ngIf:[0,"ngIf"]},null),(l()(),Ti._27(null,["\n            "])),(l()(),Ti._0(16777216,null,null,1,null,Se)),Ti._4(16384,null,0,Zc.j,[Ti.O,Ti.K],{ngIf:[0,"ngIf"]},null),(l()(),Ti._27(null,["\n            "])),(l()(),Ti._6(0,null,null,1,"dd",[["class","count"]],null,null,null,null,null)),(l()(),Ti._27(null,["X",""])),(l()(),Ti._27(null,["\n          "])),(l()(),Ti._27(null,["\n        "]))],function(l,n){l(n,16,0,n.context.$implicit.productSkuDTO.attrValueList);l(n,20,0,"B"!=n.parent.context.$implicit.userType);l(n,23,0,"B"==n.parent.context.$implicit.userType)},function(l,n){l(n,6,0,Ti._28(n,6,0,l(n,7,0,Ti._20(n.parent.parent,1),n.context.$implicit.productSkuDTO.fileSeq)),n.context.$implicit.productSkuDTO.productName);l(n,11,0,n.context.$implicit.productSkuDTO.productName);l(n,26,0,n.context.$implicit.number)})}function Oe(l){return Ti._29(0,[(l()(),Ti._6(0,null,null,2,"dd",[["class","member-phone"]],null,null,null,null,null)),(l()(),Ti._27(null,["收货时间：",""])),Ti._23(2)],null,function(l,n){l(n,1,0,Ti._28(n,1,0,l(n,2,0,Ti._20(n.parent.parent,2),n.parent.context.$implicit.receiptTime,"yyyy-MM-dd HH:mm:ss")))})}function xe(l){return Ti._29(0,[(l()(),Ti._6(0,null,null,2,"dd",[["class","member-phone"]],null,null,null,null,null)),(l()(),Ti._27(null,["退款时间：",""])),Ti._23(2)],null,function(l,n){l(n,1,0,Ti._28(n,1,0,l(n,2,0,Ti._20(n.parent.parent,2),n.parent.context.$implicit.refundTime,"yyyy-MM-dd HH:mm:ss")))})}function ke(l){return Ti._29(0,[(l()(),Ti._6(0,null,null,19,"div",[["class","order-detail"]],null,null,null,null,null)),(l()(),Ti._27(null,["\n            "])),(l()(),Ti._6(0,null,null,16,"ul",[],null,null,null,null,null)),(l()(),Ti._27(null,["\n              "])),(l()(),Ti._6(0,null,null,1,"li",[],null,null,null,null,null)),(l()(),Ti._27(null,["订单总额：￥",""])),(l()(),Ti._27(null,["\n              "])),(l()(),Ti._6(0,null,null,1,"li",[],null,null,null,null,null)),(l()(),Ti._27(null,["促销抵扣：￥",""])),(l()(),Ti._27(null,["\n              "])),(l()(),Ti._6(0,null,null,1,"li",[],null,null,null,null,null)),(l()(),Ti._27(null,["淘璞券折扣：￥",""])),(l()(),Ti._27(null,["\n              "])),(l()(),Ti._6(0,null,null,1,"li",[],null,null,null,null,null)),(l()(),Ti._27(null,["商户券抵扣：￥",""])),(l()(),Ti._27(null,["\n              "])),(l()(),Ti._6(0,null,null,1,"li",[],null,null,null,null,null)),(l()(),Ti._27(null,["积分抵扣：￥",""])),(l()(),Ti._27(null,["\n            "])),(l()(),Ti._27(null,["\n          "]))],null,function(l,n){l(n,5,0,n.parent.context.$implicit.totalAmount);l(n,8,0,n.parent.context.$implicit.discountAmount);l(n,11,0,n.parent.context.$implicit.couponAmount);l(n,14,0,n.parent.context.$implicit.merchantCouponAmount);l(n,17,0,n.parent.context.$implicit.integralAmount)})}function De(l){return Ti._29(0,[(l()(),Ti._6(0,null,null,1,"span",[],null,null,null,null,null)),(l()(),Ti._27(null,["点击查看明细"]))],null,null)}function Ce(l){return Ti._29(0,[(l()(),Ti._6(0,null,null,1,"span",[],null,null,null,null,null)),(l()(),Ti._27(null,["点击收起明细"]))],null,null)}function je(l){return Ti._29(0,[(l()(),Ti._6(0,null,null,72,"div",[["class","order-items"]],null,null,null,null,null)),(l()(),Ti._27(null,["\n        "])),(l()(),Ti._27(null,["\n        "])),(l()(),Ti._6(0,null,null,16,"div",[["class","order-title"]],null,null,null,null,null)),(l()(),Ti._27(null,["\n          "])),(l()(),Ti._6(0,null,null,4,"h2",[],null,null,null,null,null)),(l()(),Ti._27(null,["订单编号：\n            "])),(l()(),Ti._6(0,null,null,1,"span",[],null,null,null,null,null)),(l()(),Ti._27(null,["",""])),(l()(),Ti._27(null,["\n          "])),(l()(),Ti._27(null,["\n          "])),(l()(),Ti._27(null,["\n          "])),(l()(),Ti._6(0,null,null,6,"span",[],null,null,null,null,null)),Ti._4(278528,null,0,Zc.h,[Ti.r,Ti.s,Ti.k,Ti.E],{ngClass:[0,"ngClass"]},null),Ti._23(1),Ti._23(1),Ti._22({auditStatus:0,pass:1,auditing:2}),(l()(),Ti._27(null,["",""])),Ti._23(1),(l()(),Ti._27(null,["\n        "])),(l()(),Ti._27(null,["\n        "])),(l()(),Ti._27(null,["\n        "])),(l()(),Ti._0(16777216,null,null,1,null,Ie)),Ti._4(802816,null,0,Zc.i,[Ti.O,Ti.K,Ti.r],{ngForOf:[0,"ngForOf"]},null),(l()(),Ti._27(null,["\n\n        "])),(l()(),Ti._6(0,null,null,21,"div",[["class","orderOperate"]],null,null,null,null,null)),(l()(),Ti._27(null,["\n          "])),(l()(),Ti._6(0,null,null,18,"dl",[],null,null,null,null,null)),(l()(),Ti._27(null,["\n            "])),(l()(),Ti._6(0,null,null,6,"dt",[],null,null,null,null,null)),(l()(),Ti._27(null,["\n              "])),(l()(),Ti._6(0,null,null,3,"a",[],[[8,"href",4]],null,null,null,null)),(l()(),Ti._27(null,["\n                "])),(l()(),Ti._6(0,null,null,0,"img",[["alt",""],["src","./assets/image/phone.png"]],null,null,null,null,null)),(l()(),Ti._27(null,["\n              "])),(l()(),Ti._27(null,["\n            "])),(l()(),Ti._27(null,["\n            "])),(l()(),Ti._6(0,null,null,1,"dd",[["class","total"]],null,null,null,null,null)),(l()(),Ti._27(null,["会员手机：",""])),(l()(),Ti._27(null,["\n            "])),(l()(),Ti._0(16777216,null,null,1,null,Oe)),Ti._4(16384,null,0,Zc.j,[Ti.O,Ti.K],{ngIf:[0,"ngIf"]},null),(l()(),Ti._27(null,["\n            "])),(l()(),Ti._0(16777216,null,null,1,null,xe)),Ti._4(16384,null,0,Zc.j,[Ti.O,Ti.K],{ngIf:[0,"ngIf"]},null),(l()(),Ti._27(null,["\n\n          "])),(l()(),Ti._27(null,["\n        "])),(l()(),Ti._27(null,["\n        "])),(l()(),Ti._6(0,null,null,23,"div",[["class","order-dtail-box"]],null,null,null,null,null)),(l()(),Ti._27(null,["\n          "])),(l()(),Ti._0(16777216,null,null,1,null,ke)),Ti._4(16384,null,0,Zc.j,[Ti.O,Ti.K],{ngIf:[0,"ngIf"]},null),(l()(),Ti._27(null,["\n          "])),(l()(),Ti._6(0,null,null,4,"div",[["class","pay-money"]],null,null,null,null,null)),(l()(),Ti._27(null,["\n            会员实付金额\n            "])),(l()(),Ti._6(0,null,null,1,"span",[],null,null,null,null,null)),(l()(),Ti._27(null,["￥",""])),(l()(),Ti._27(null,["\n          "])),(l()(),Ti._27(null,["\n          "])),(l()(),Ti._6(0,null,null,11,"div",[["class","btn-show"]],null,[[null,"click"]],function(l,n,u){var t=!0;if("click"===n){t=!1!==l.component.showDetail(l.context.index)&&t}return t},null,null)),(l()(),Ti._27(null,["\n            "])),(l()(),Ti._0(16777216,null,null,1,null,De)),Ti._4(16384,null,0,Zc.j,[Ti.O,Ti.K],{ngIf:[0,"ngIf"]},null),(l()(),Ti._27(null,["\n            "])),(l()(),Ti._0(16777216,null,null,1,null,Ce)),Ti._4(16384,null,0,Zc.j,[Ti.O,Ti.K],{ngIf:[0,"ngIf"]},null),(l()(),Ti._27(null,["\n            "])),(l()(),Ti._6(0,null,null,2,"span",[],null,null,null,null,null)),Ti._4(278528,null,0,Zc.h,[Ti.r,Ti.s,Ti.k,Ti.E],{ngClass:[0,"ngClass"]},null),Ti._22({"icon-triangle":0,"icon-bottom":1}),(l()(),Ti._27(null,["\n          "])),(l()(),Ti._27(null,["\n        "])),(l()(),Ti._27(null,["\n    "]))],function(l,n){var u=n.component;l(n,13,0,l(n,16,0,!0,Ti._28(n,13,0,l(n,14,0,Ti._20(n.parent,0),n.context.$implicit.status)).pass,Ti._28(n,13,0,l(n,15,0,Ti._20(n.parent,0),n.context.$implicit.status)).audit));l(n,23,0,n.context.$implicit.orderItemProductSkuDTOS);l(n,41,0,3==n.context.$implicit.status||"C"==n.context.$implicit.status);l(n,44,0,4==n.context.$implicit.status&&"B"!=n.context.$implicit.userType);l(n,51,0,u.isShowDetail[n.context.index]);l(n,62,0,0==u.isShowDetail[n.context.index]);l(n,65,0,1==u.isShowDetail[n.context.index]);l(n,68,0,l(n,69,0,!0,u.isShowDetail[n.context.index]))},function(l,n){l(n,8,0,n.context.$implicit.orderId);l(n,17,0,Ti._28(n,17,0,l(n,18,0,Ti._20(n.parent,0),n.context.$implicit.status)).status);l(n,31,0,Ti._9(1,"tel:",n.context.$implicit.memberMobile,""));l(n,38,0,n.context.$implicit.memberMobile);l(n,56,0,n.context.$implicit.payAmount)})}function Ae(l){return Ti._29(0,[(l()(),Ti._6(0,null,null,5,"ion-infinite-scroll",[],null,[[null,"ionInfinite"]],function(l,n,u){var t=!0;if("ionInfinite"===n){t=!1!==l.component.loadMore(u)&&t}return t},null,null)),Ti._4(1196032,null,0,$_.a,[Fc.a,Ti.x,Ti.k,Tc.a],null,{ionInfinite:"ionInfinite"}),(l()(),Ti._27(null,["\n      "])),(l()(),Ti._6(0,null,null,1,"ion-infinite-scroll-content",[["loadingText","加载更多..."]],[[1,"state",0]],null,null,G_.b,G_.a)),Ti._4(114688,null,0,K_.a,[$_.a,kc.a],{loadingText:[0,"loadingText"]},null),(l()(),Ti._27(null,["\n    "]))],function(l,n){l(n,4,0,"加载更多...")},function(l,n){l(n,3,0,Ti._20(n,4).inf.state)})}function Te(l){return Ti._29(0,[(l()(),Ti._6(0,null,null,6,"div",[["class","no-data"]],null,null,null,null,null)),(l()(),Ti._27(null,["\n    "])),(l()(),Ti._6(0,null,null,0,"img",[["alt",""],["src","./assets/image/nodata.png"]],null,null,null,null,null)),(l()(),Ti._27(null,["\n    "])),(l()(),Ti._6(0,null,null,1,"p",[],null,null,null,null,null)),(l()(),Ti._27(null,["空空如也"])),(l()(),Ti._27(null,["\n  "]))],null,null)}function Pe(l){return Ti._29(0,[(l()(),Ti._6(0,null,null,4,"div",[["class","btn-noMore"]],null,null,null,null,null)),(l()(),Ti._27(null,["\n    "])),(l()(),Ti._6(0,null,null,1,"span",[],null,null,null,null,null)),(l()(),Ti._27(null,["—— 没有更多信息了 ——"])),(l()(),Ti._27(null,["\n  "]))],null,null)}function Ee(l){return Ti._29(0,[(l()(),Ti._6(0,null,null,10,"div",[["class","request-defeat"]],null,null,null,null,null)),(l()(),Ti._27(null,["\n    "])),(l()(),Ti._6(0,null,null,0,"img",[["alt",""],["src","./assets/image/requestDefeat.png"]],null,null,null,null,null)),(l()(),Ti._27(null,["\n    "])),(l()(),Ti._6(0,null,null,1,"p",[],null,null,null,null,null)),(l()(),Ti._27(null,["啊哦！页面走丢了"])),(l()(),Ti._27(null,["\n    "])),(l()(),Ti._6(0,null,null,2,"button",[["class","btn-request-defeat"],["full",""],["ion-button",""]],null,[[null,"touchstart"]],function(l,n,u){var t=!0;if("touchstart"===n){t=!1!==l.component.requestDefeatRefresh()&&t}return t},t_.b,t_.a)),Ti._4(1097728,null,0,e_.a,[[8,""],kc.a,Ti.k,Ti.E],{full:[0,"full"]},null),(l()(),Ti._27(0,["\n      刷新再找一找\n    "])),(l()(),Ti._27(null,["\n  "]))],function(l,n){l(n,8,0,"")},null)}function Me(l){return Ti._29(0,[Ti._21(0,ms,[]),Ti._21(0,Ds,[]),Ti._21(0,Zc.d,[Ti.t]),Ti._25(402653184,1,{content:0}),(l()(),Ti._6(0,null,null,63,"ion-header",[],null,null,null,null,null)),Ti._4(16384,null,0,Lc.a,[kc.a,Ti.k,Ti.E,[2,Ic.a]],null,null),(l()(),Ti._27(null,["\n  "])),(l()(),Ti._6(0,null,null,6,"ion-navbar",[["class","toolbar"]],[[8,"hidden",0],[2,"statusbar-padding",null]],null,null,qc.b,qc.a)),Ti._4(49152,null,0,Rc.a,[xc.a,[2,Ic.a],[2,Oc.a],kc.a,Ti.k,Ti.E],null,null),(l()(),Ti._27(3,["\n    "])),(l()(),Ti._6(0,null,3,2,"ion-title",[["text-center",""]],null,null,null,$c.b,$c.a)),Ti._4(49152,null,0,Gc.a,[kc.a,Ti.k,Ti.E,[2,Kc.a],[2,Rc.a]],null,null),(l()(),Ti._27(0,["门店订单列表"])),(l()(),Ti._27(3,["\n  "])),(l()(),Ti._27(null,["\n  "])),(l()(),Ti._6(0,null,null,51,"ion-toolbar",[["class","filter-box toolbar"]],[[2,"statusbar-padding",null]],null,null,p_.b,p_.a)),Ti._4(49152,null,0,Kc.a,[kc.a,Ti.k,Ti.E],null,null),(l()(),Ti._27(3,["\n    "])),(l()(),Ti._6(0,null,3,38,"div",[["class","time-box"]],null,null,null,null,null)),(l()(),Ti._27(null,["\n      "])),(l()(),Ti._6(0,null,null,1,"div",[["class","search-title"]],null,null,null,null,null)),(l()(),Ti._27(null,["选择日期"])),(l()(),Ti._27(null,["\n      "])),(l()(),Ti._6(0,null,null,32,"div",[["class","search-list"]],null,null,null,null,null)),(l()(),Ti._27(null,["\n        "])),(l()(),Ti._6(0,null,null,12,"div",[["class","time-start"]],null,null,null,null,null)),(l()(),Ti._27(null,["\n          "])),(l()(),Ti._6(0,null,null,6,"ion-datetime",[["cancelText","取消"],["displayFormat","YYYY-MM-DD"],["doneText","确定"],["placeholder","请选择日期"]],[[2,"datetime-disabled",null],[2,"ng-untouched",null],[2,"ng-touched",null],[2,"ng-pristine",null],[2,"ng-dirty",null],[2,"ng-valid",null],[2,"ng-invalid",null],[2,"ng-pending",null]],[[null,"ionChange"],[null,"ngModelChange"],[null,"click"],[null,"keyup.space"]],function(l,n,u){var t=!0,e=l.component;if("click"===n){t=!1!==Ti._20(l,28)._click(u)&&t}if("keyup.space"===n){t=!1!==Ti._20(l,28)._keyup()&&t}if("ionChange"===n){t=!1!==e.getOrderListByDate()&&t}if("ngModelChange"===n){t=!1!==(e.dateStart=u)&&t}return t},wd.b,wd.a)),Ti._4(1228800,null,0,yd.a,[Hc.a,kc.a,Ti.k,Ti.E,[2,Bc.a],[2,Sd.a]],{max:[0,"max"],displayFormat:[1,"displayFormat"],cancelText:[2,"cancelText"],doneText:[3,"doneText"],placeholder:[4,"placeholder"]},{ionChange:"ionChange"}),Ti._24(1024,null,Jc.g,function(l){return[l]},[yd.a]),Ti._4(671744,null,0,Jc.j,[[8,null],[8,null],[8,null],[2,Jc.g]],{model:[0,"model"]},{update:"ngModelChange"}),Ti._24(2048,null,Jc.h,null,[Jc.j]),Ti._4(16384,null,0,Jc.i,[Jc.h],null,null),(l()(),Ti._27(null,["\n          "])),(l()(),Ti._27(null,["\n          "])),(l()(),Ti._0(16777216,null,null,1,null,he)),Ti._4(16384,null,0,Zc.j,[Ti.O,Ti.K],{ngIf:[0,"ngIf"]},null),(l()(),Ti._27(null,["\n        "])),(l()(),Ti._27(null,["\n        "])),(l()(),Ti._6(0,null,null,1,"span",[["class","go"]],null,null,null,null,null)),(l()(),Ti._27(null,["到"])),(l()(),Ti._27(null,["\n        "])),(l()(),Ti._6(0,null,null,12,"div",[["class","time-end"]],null,null,null,null,null)),(l()(),Ti._27(null,["\n          "])),(l()(),Ti._6(0,null,null,6,"ion-datetime",[["cancelText","取消"],["displayFormat","YYYY-MM-DD"],["doneText","确定"],["placeholder","请选择日期"]],[[2,"datetime-disabled",null],[2,"ng-untouched",null],[2,"ng-touched",null],[2,"ng-pristine",null],[2,"ng-dirty",null],[2,"ng-valid",null],[2,"ng-invalid",null],[2,"ng-pending",null]],[[null,"ionChange"],[null,"ngModelChange"],[null,"click"],[null,"keyup.space"]],function(l,n,u){var t=!0,e=l.component;if("click"===n){t=!1!==Ti._20(l,45)._click(u)&&t}if("keyup.space"===n){t=!1!==Ti._20(l,45)._keyup()&&t}if("ionChange"===n){t=!1!==e.getOrderListByDate()&&t}if("ngModelChange"===n){t=!1!==(e.dateEnd=u)&&t}return t},wd.b,wd.a)),Ti._4(1228800,null,0,yd.a,[Hc.a,kc.a,Ti.k,Ti.E,[2,Bc.a],[2,Sd.a]],{min:[0,"min"],max:[1,"max"],displayFormat:[2,"displayFormat"],cancelText:[3,"cancelText"],doneText:[4,"doneText"],placeholder:[5,"placeholder"]},{ionChange:"ionChange"}),Ti._24(1024,null,Jc.g,function(l){return[l]},[yd.a]),Ti._4(671744,null,0,Jc.j,[[8,null],[8,null],[8,null],[2,Jc.g]],{model:[0,"model"]},{update:"ngModelChange"}),Ti._24(2048,null,Jc.h,null,[Jc.j]),Ti._4(16384,null,0,Jc.i,[Jc.h],null,null),(l()(),Ti._27(null,["\n          "])),(l()(),Ti._27(null,["\n          "])),(l()(),Ti._0(16777216,null,null,1,null,ge)),Ti._4(16384,null,0,Zc.j,[Ti.O,Ti.K],{ngIf:[0,"ngIf"]},null),(l()(),Ti._27(null,["\n        "])),(l()(),Ti._27(null,["\n      "])),(l()(),Ti._27(null,["\n    "])),(l()(),Ti._27(3,["\n    "])),(l()(),Ti._6(0,null,3,7,"div",[["class","status-box"]],null,null,null,null,null)),(l()(),Ti._27(null,["\n      "])),(l()(),Ti._6(0,null,null,4,"ul",[],null,null,null,null,null)),(l()(),Ti._27(null,["\n        "])),(l()(),Ti._0(16777216,null,null,1,null,me)),Ti._4(802816,null,0,Zc.i,[Ti.O,Ti.K,Ti.r],{ngForOf:[0,"ngForOf"]},null),(l()(),Ti._27(null,["\n      "])),(l()(),Ti._27(null,["\n    "])),(l()(),Ti._27(3,["\n  "])),(l()(),Ti._27(null,["\n"])),(l()(),Ti._27(null,["\n"])),(l()(),Ti._6(0,null,null,27,"ion-content",[],[[2,"statusbar-padding",null],[2,"has-refresher",null]],[["window","resize"]],function(l,n,u){var t=!0;if("window:resize"===n){t=!1!==Ti._20(l,70).resize()&&t}return t},Nc.b,Nc.a)),Ti._4(4374528,[[1,4]],0,Fc.a,[kc.a,Dc.a,Tc.a,Ti.k,Ti.E,xc.a,Uc.a,Ti.x,[2,Ic.a],[2,Oc.a]],null,null),(l()(),Ti._27(1,["\n  "])),(l()(),Ti._6(0,null,1,14,"div",[["class","order-list"]],null,null,null,null,null)),(l()(),Ti._27(null,["\n    "])),(l()(),Ti._27(null,["\n    "])),(l()(),Ti._0(16777216,null,null,1,null,ve)),Ti._4(16384,null,0,Zc.j,[Ti.O,Ti.K],{ngIf:[0,"ngIf"]},null),(l()(),Ti._27(null,["\n    "])),(l()(),Ti._0(16777216,null,null,1,null,be)),Ti._4(16384,null,0,Zc.j,[Ti.O,Ti.K],{ngIf:[0,"ngIf"]},null),(l()(),Ti._27(null,["\n\n    "])),(l()(),Ti._0(16777216,null,null,1,null,je)),Ti._4(802816,null,0,Zc.i,[Ti.O,Ti.K,Ti.r],{ngForOf:[0,"ngForOf"]},null),(l()(),Ti._27(null,["\n\n    "])),(l()(),Ti._0(16777216,null,null,1,null,Ae)),Ti._4(16384,null,0,Zc.j,[Ti.O,Ti.K],{ngIf:[0,"ngIf"]},null),(l()(),Ti._27(null,["\n\n  "])),(l()(),Ti._27(1,["\n  "])),(l()(),Ti._0(16777216,null,1,1,null,Te)),Ti._4(16384,null,0,Zc.j,[Ti.O,Ti.K],{ngIf:[0,"ngIf"]},null),(l()(),Ti._27(1,["\n  "])),(l()(),Ti._0(16777216,null,1,1,null,Pe)),Ti._4(16384,null,0,Zc.j,[Ti.O,Ti.K],{ngIf:[0,"ngIf"]},null),(l()(),Ti._27(1,["\n  "])),(l()(),Ti._0(16777216,null,1,1,null,Ee)),Ti._4(16384,null,0,Zc.j,[Ti.O,Ti.K],{ngIf:[0,"ngIf"]},null),(l()(),Ti._27(1,["\n"]))],function(l,n){var u=n.component;l(n,28,0,Ti._9(1,"",u.dateStartMax,""),"YYYY-MM-DD","取消","确定","请选择日期");l(n,30,0,u.dateStart);l(n,36,0,u.dateStart);l(n,45,0,Ti._9(1,"",u.dateEndMin,""),Ti._9(1,"",u.dateEndMax,""),"YYYY-MM-DD","取消","确定","请选择日期");l(n,47,0,u.dateEnd);l(n,53,0,u.dateEnd);l(n,63,0,u.orderStatusList);l(n,76,0,u.loadingShow);l(n,79,0,!u.loadingShow);l(n,82,0,u.orderList);l(n,85,0,u.showInfinite&&!u.loadingShow&&!u.requestDefeat);l(n,89,0,u.noData);l(n,92,0,u.showNoMore);l(n,95,0,u.requestDefeat)},function(l,n){l(n,7,0,Ti._20(n,8)._hidden,Ti._20(n,8)._sbPadding);l(n,15,0,Ti._20(n,16)._sbPadding);l(n,27,0,Ti._20(n,28)._disabled,Ti._20(n,32).ngClassUntouched,Ti._20(n,32).ngClassTouched,Ti._20(n,32).ngClassPristine,Ti._20(n,32).ngClassDirty,Ti._20(n,32).ngClassValid,Ti._20(n,32).ngClassInvalid,Ti._20(n,32).ngClassPending);l(n,44,0,Ti._20(n,45)._disabled,Ti._20(n,49).ngClassUntouched,Ti._20(n,49).ngClassTouched,Ti._20(n,49).ngClassPristine,Ti._20(n,49).ngClassDirty,Ti._20(n,49).ngClassValid,Ti._20(n,49).ngClassInvalid,Ti._20(n,49).ngClassPending);l(n,69,0,Ti._20(n,70).statusbarPadding,Ti._20(n,70)._hasRefresher)})}function Le(l){return Ti._29(0,[(l()(),Ti._6(0,null,null,9,"div",[["class","loading-wrapper"]],null,null,null,null,null)),(l()(),Ti._27(null,["\n    "])),(l()(),Ti._6(0,null,null,4,"div",[],null,null,null,null,null)),(l()(),Ti._27(null,["\n      "])),(l()(),Ti._6(0,null,null,1,"ion-spinner",[["item-start",""]],[[2,"spinner-paused",null]],null,null,q_.b,q_.a)),Ti._4(114688,null,0,R_.a,[kc.a,Ti.k,Ti.E],{name:[0,"name"]},null),(l()(),Ti._27(null,["\n    "])),(l()(),Ti._27(null,["\n    "])),(l()(),Ti._6(0,null,null,0,"div",[],[[8,"innerHTML",1]],null,null,null,null)),(l()(),Ti._27(null,["\n  "]))],function(l,n){l(n,5,0,n.component.load.spinner)},function(l,n){var u=n.component;l(n,4,0,Ti._20(n,5)._paused);l(n,8,0,u.load.content)})}function qe(l){return Ti._29(0,[(l()(),Ti._6(0,null,null,5,"ion-refresher",[],[[2,"refresher-active",null],[4,"top",null]],[[null,"ionRefresh"]],function(l,n,u){var t=!0;if("ionRefresh"===n){t=!1!==l.component.pullRefresh(u)&&t}return t},null,null)),Ti._4(212992,null,0,E_.a,[Dc.a,Fc.a,Ti.x,Cc.l],null,{ionRefresh:"ionRefresh"}),(l()(),Ti._27(null,["\n    "])),(l()(),Ti._6(0,null,null,1,"ion-refresher-content",[],[[1,"state",0]],null,null,M_.b,M_.a)),Ti._4(114688,null,0,L_.a,[E_.a,kc.a],null,null),(l()(),Ti._27(null,["\n  "]))],function(l,n){l(n,1,0),l(n,4,0)},function(l,n){l(n,0,0,"inactive"!==Ti._20(n,1).state,Ti._20(n,1)._top);l(n,3,0,Ti._20(n,4).r.state)})}function Re(l){return Ti._29(0,[(l()(),Ti._6(0,null,null,1,"span",[],null,null,null,null,null)),(l()(),Ti._27(null,["总金额：￥ ",""]))],null,function(l,n){l(n,1,0,n.component.sum)})}function $e(l){return Ti._29(0,[(l()(),Ti._6(0,null,null,16,"div",[["class","withdraw-item"]],null,null,null,null,null)),(l()(),Ti._27(null,["\n        "])),(l()(),Ti._6(0,null,null,13,"ul",[],null,null,null,null,null)),(l()(),Ti._27(null,["\n          "])),(l()(),Ti._6(0,null,null,1,"li",[["class","order-number"]],null,null,null,null,null)),(l()(),Ti._27(null,["订单编号：",""])),(l()(),Ti._27(null,["\n          "])),(l()(),Ti._6(0,null,null,1,"li",[["class","base-number"]],null,null,null,null,null)),(l()(),Ti._27(null,["结算基数：￥",""])),(l()(),Ti._27(null,["\n          "])),(l()(),Ti._6(0,null,null,1,"li",[["class","percentage"]],null,null,null,null,null)),(l()(),Ti._27(null,["奖励比例：",""])),(l()(),Ti._27(null,["\n          "])),(l()(),Ti._6(0,null,null,1,"li",[["class","money"]],null,null,null,null,null)),(l()(),Ti._27(null,["奖励金额：￥",""])),(l()(),Ti._27(null,["\n        "])),(l()(),Ti._27(null,["\n      "]))],null,function(l,n){l(n,5,0,n.context.$implicit.relateId);l(n,8,0,n.context.$implicit.baseAmount);l(n,11,0,n.context.$implicit.percent);l(n,14,0,n.context.$implicit.amount)})}function Ge(l){return Ti._29(0,[(l()(),Ti._6(0,null,null,6,"div",[["class","no-data"]],null,null,null,null,null)),(l()(),Ti._27(null,["\n      "])),(l()(),Ti._6(0,null,null,0,"img",[["alt",""],["src","./assets/image/nodata.png"]],null,null,null,null,null)),(l()(),Ti._27(null,["\n      "])),(l()(),Ti._6(0,null,null,1,"p",[],null,null,null,null,null)),(l()(),Ti._27(null,["空空如也"])),(l()(),Ti._27(null,["\n    "]))],null,null)}function Ke(l){return Ti._29(0,[(l()(),Ti._6(0,null,null,4,"div",[["class","btn-noMore"]],null,null,null,null,null)),(l()(),Ti._27(null,["\n      "])),(l()(),Ti._6(0,null,null,1,"span",[],null,null,null,null,null)),(l()(),Ti._27(null,["—— 没有更多信息了 ——"])),(l()(),Ti._27(null,["\n    "]))],null,null)}function Ne(l){return Ti._29(0,[(l()(),Ti._6(0,null,null,10,"div",[["class","request-defeat"]],null,null,null,null,null)),(l()(),Ti._27(null,["\n    "])),(l()(),Ti._6(0,null,null,0,"img",[["alt",""],["src","./assets/image/requestDefeat.png"]],null,null,null,null,null)),(l()(),Ti._27(null,["\n    "])),(l()(),Ti._6(0,null,null,1,"p",[],null,null,null,null,null)),(l()(),Ti._27(null,["啊哦！页面走丢了"])),(l()(),Ti._27(null,["\n    "])),(l()(),Ti._6(0,null,null,2,"button",[["class","btn-request-defeat"],["full",""],["ion-button",""]],null,[[null,"touchstart"]],function(l,n,u){var t=!0;if("touchstart"===n){t=!1!==l.component.refresh()&&t}return t},t_.b,t_.a)),Ti._4(1097728,null,0,e_.a,[[8,""],kc.a,Ti.k,Ti.E],{full:[0,"full"]},null),(l()(),Ti._27(0,["\n      刷新再找一找\n    "])),(l()(),Ti._27(null,["\n  "]))],function(l,n){l(n,8,0,"")},null)}function Fe(l){return Ti._29(0,[(l()(),Ti._6(0,null,null,6,"ion-infinite-scroll",[],null,[[null,"ionInfinite"]],function(l,n,u){var t=!0;if("ionInfinite"===n){t=!1!==l.component.loadMore(u)&&t}return t},null,null)),Ti._4(1196032,null,0,$_.a,[Fc.a,Ti.x,Ti.k,Tc.a],null,{ionInfinite:"ionInfinite"}),(l()(),Ti._27(null,["\n      "])),(l()(),Ti._6(0,null,null,2,"ion-infinite-scroll-content",[["loadingSpinner","bubbles"],["loadingText","加载中"]],[[1,"state",0]],null,null,G_.b,G_.a)),Ti._4(114688,null,0,K_.a,[$_.a,kc.a],{loadingSpinner:[0,"loadingSpinner"],loadingText:[1,"loadingText"]},null),(l()(),Ti._27(null,["\n      "])),(l()(),Ti._27(null,["\n    "]))],function(l,n){l(n,4,0,"bubbles","加载中")},function(l,n){l(n,3,0,Ti._20(n,4).inf.state)})}function Ue(l){return Ti._29(0,[(l()(),Ti._6(0,null,null,35,"ion-content",[],[[2,"statusbar-padding",null],[2,"has-refresher",null]],[["window","resize"]],function(l,n,u){var t=!0;if("window:resize"===n){t=!1!==Ti._20(l,1).resize()&&t}return t},Nc.b,Nc.a)),Ti._4(4374528,null,0,Fc.a,[kc.a,Dc.a,Tc.a,Ti.k,Ti.E,xc.a,Uc.a,Ti.x,[2,Ic.a],[2,Oc.a]],null,null),(l()(),Ti._27(1,["\n  "])),(l()(),Ti._0(16777216,null,1,1,null,Le)),Ti._4(16384,null,0,Zc.j,[Ti.O,Ti.K],{ngIf:[0,"ngIf"]},null),(l()(),Ti._27(1,["\n  "])),(l()(),Ti._0(16777216,null,2,1,null,qe)),Ti._4(16384,null,0,Zc.j,[Ti.O,Ti.K],{ngIf:[0,"ngIf"]},null),(l()(),Ti._27(1,["\n  "])),(l()(),Ti._6(0,null,1,19,"div",[["class","withdraw-record"]],null,null,null,null,null)),(l()(),Ti._27(null,["\n    "])),(l()(),Ti._6(0,null,null,4,"div",[["class","withdraw-total"]],null,null,null,null,null)),(l()(),Ti._27(null,["\n     "])),(l()(),Ti._0(16777216,null,null,1,null,Re)),Ti._4(16384,null,0,Zc.j,[Ti.O,Ti.K],{ngIf:[0,"ngIf"]},null),(l()(),Ti._27(null,["\n    "])),(l()(),Ti._27(null,["\n    "])),(l()(),Ti._6(0,null,null,4,"div",[["class","record-list"]],null,null,null,null,null)),(l()(),Ti._27(null,["\n      "])),(l()(),Ti._0(16777216,null,null,1,null,$e)),Ti._4(802816,null,0,Zc.i,[Ti.O,Ti.K,Ti.r],{ngForOf:[0,"ngForOf"]},null),(l()(),Ti._27(null,["\n    "])),(l()(),Ti._27(null,["\n    "])),(l()(),Ti._0(16777216,null,null,1,null,Ge)),Ti._4(16384,null,0,Zc.j,[Ti.O,Ti.K],{ngIf:[0,"ngIf"]},null),(l()(),Ti._27(null,["\n    "])),(l()(),Ti._0(16777216,null,null,1,null,Ke)),Ti._4(16384,null,0,Zc.j,[Ti.O,Ti.K],{ngIf:[0,"ngIf"]},null),(l()(),Ti._27(null,["\n  "])),(l()(),Ti._27(1,["\n  "])),(l()(),Ti._0(16777216,null,1,1,null,Ne)),Ti._4(16384,null,0,Zc.j,[Ti.O,Ti.K],{ngIf:[0,"ngIf"]},null),(l()(),Ti._27(1,["\n  "])),(l()(),Ti._0(16777216,null,1,1,null,Fe)),Ti._4(16384,null,0,Zc.j,[Ti.O,Ti.K],{ngIf:[0,"ngIf"]},null),(l()(),Ti._27(1,["\n"])),(l()(),Ti._27(null,["\n"]))],function(l,n){var u=n.component;l(n,4,0,u.isLoadingShow);l(n,7,0,!u.isLoadingShow);l(n,14,0,u.isShow);l(n,20,0,u.orderDetail);l(n,24,0,u.isEmpty);l(n,27,0,0!==u.orderDetail.length&&u.orderDetail.length===u.count);l(n,31,0,u.requestFail);l(n,34,0,u.orderDetail.length<u.count)},function(l,n){l(n,0,0,Ti._20(n,1).statusbarPadding,Ti._20(n,1)._hasRefresher)})}function ze(l){return Ti._29(0,[(l()(),Ti._6(0,null,null,9,"div",[["class","loading-wrapper"]],null,null,null,null,null)),(l()(),Ti._27(null,["\n    "])),(l()(),Ti._6(0,null,null,4,"div",[],null,null,null,null,null)),(l()(),Ti._27(null,["\n      "])),(l()(),Ti._6(0,null,null,1,"ion-spinner",[["item-start",""]],[[2,"spinner-paused",null]],null,null,q_.b,q_.a)),Ti._4(114688,null,0,R_.a,[kc.a,Ti.k,Ti.E],{name:[0,"name"]},null),(l()(),Ti._27(null,["\n    "])),(l()(),Ti._27(null,["\n    "])),(l()(),Ti._6(0,null,null,0,"div",[],[[8,"innerHTML",1]],null,null,null,null)),(l()(),Ti._27(null,["\n  "]))],function(l,n){l(n,5,0,n.component.load.spinner)},function(l,n){var u=n.component;l(n,4,0,Ti._20(n,5)._paused);l(n,8,0,u.load.content)})}function Ve(l){return Ti._29(0,[(l()(),Ti._6(0,null,null,5,"ion-refresher",[],[[2,"refresher-active",null],[4,"top",null]],[[null,"ionRefresh"]],function(l,n,u){var t=!0;if("ionRefresh"===n){t=!1!==l.component.pullRefresh(u)&&t}return t},null,null)),Ti._4(212992,null,0,E_.a,[Dc.a,Fc.a,Ti.x,Cc.l],null,{ionRefresh:"ionRefresh"}),(l()(),Ti._27(null,["\n    "])),(l()(),Ti._6(0,null,null,1,"ion-refresher-content",[],[[1,"state",0]],null,null,M_.b,M_.a)),Ti._4(114688,null,0,L_.a,[E_.a,kc.a],null,null),(l()(),Ti._27(null,["\n  "]))],function(l,n){l(n,1,0),l(n,4,0)},function(l,n){l(n,0,0,"inactive"!==Ti._20(n,1).state,Ti._20(n,1)._top);l(n,3,0,Ti._20(n,4).r.state)})}function Be(l){return Ti._29(0,[(l()(),Ti._6(0,null,null,1,"span",[],null,null,null,null,null)),(l()(),Ti._27(null,["总金额：￥ ",""]))],null,function(l,n){l(n,1,0,n.component.sum)})}function He(l){return Ti._29(0,[(l()(),Ti._6(0,null,null,1,"span",[],null,null,null,null,null)),(l()(),Ti._27(null,["订单编号：",""]))],null,function(l,n){l(n,1,0,n.parent.context.$implicit.relateId)})}function Ye(l){return Ti._29(0,[(l()(),Ti._6(0,null,null,1,"span",[],null,null,null,null,null)),(l()(),Ti._27(null,["会员手机：",""]))],null,function(l,n){l(n,1,0,n.parent.context.$implicit.mobile)})}function We(l){return Ti._29(0,[(l()(),Ti._6(0,null,null,1,"span",[],null,null,null,null,null)),(l()(),Ti._27(null,["结算基数：￥",""]))],null,function(l,n){l(n,1,0,n.parent.context.$implicit.baseAmount)})}function Xe(l){return Ti._29(0,[(l()(),Ti._6(0,null,null,1,"span",[],null,null,null,null,null)),(l()(),Ti._27(null,["结算基数：——"]))],null,null)}function Je(l){return Ti._29(0,[(l()(),Ti._6(0,null,null,1,"span",[],null,null,null,null,null)),(l()(),Ti._27(null,["奖励比例：",""]))],null,function(l,n){l(n,1,0,n.parent.context.$implicit.percent)})}function Qe(l){return Ti._29(0,[(l()(),Ti._6(0,null,null,1,"span",[],null,null,null,null,null)),(l()(),Ti._27(null,["奖励比例：——"]))],null,null)}function Ze(l){return Ti._29(0,[(l()(),Ti._6(0,null,null,39,"div",[["class","withdraw-item"]],null,null,null,null,null)),(l()(),Ti._27(null,["\n        "])),(l()(),Ti._6(0,null,null,36,"ul",[],null,null,null,null,null)),(l()(),Ti._27(null,["\n          "])),(l()(),Ti._6(0,null,null,7,"li",[["class","order-number"]],null,null,null,null,null)),(l()(),Ti._27(null,["\n            "])),(l()(),Ti._0(16777216,null,null,1,null,He)),Ti._4(16384,null,0,Zc.j,[Ti.O,Ti.K],{ngIf:[0,"ngIf"]},null),(l()(),Ti._27(null,["\n            "])),(l()(),Ti._0(16777216,null,null,1,null,Ye)),Ti._4(16384,null,0,Zc.j,[Ti.O,Ti.K],{ngIf:[0,"ngIf"]},null),(l()(),Ti._27(null,["\n          "])),(l()(),Ti._27(null,["\n          "])),(l()(),Ti._6(0,null,null,3,"li",[["class","date"]],null,null,null,null,null)),(l()(),Ti._27(null,["活动时间：","--"," "])),Ti._23(2),Ti._23(2),(l()(),Ti._27(null,["\n          "])),(l()(),Ti._6(0,null,null,7,"li",[["class","base-number"]],null,null,null,null,null)),(l()(),Ti._27(null,["\n              "])),(l()(),Ti._0(16777216,null,null,1,null,We)),Ti._4(16384,null,0,Zc.j,[Ti.O,Ti.K],{ngIf:[0,"ngIf"]},null),(l()(),Ti._27(null,["\n              "])),(l()(),Ti._0(16777216,null,null,1,null,Xe)),Ti._4(16384,null,0,Zc.j,[Ti.O,Ti.K],{ngIf:[0,"ngIf"]},null),(l()(),Ti._27(null,["\n          "])),(l()(),Ti._27(null,["\n          "])),(l()(),Ti._6(0,null,null,7,"li",[["class","percentage"]],null,null,null,null,null)),(l()(),Ti._27(null,["\n            "])),(l()(),Ti._0(16777216,null,null,1,null,Je)),Ti._4(16384,null,0,Zc.j,[Ti.O,Ti.K],{ngIf:[0,"ngIf"]},null),(l()(),Ti._27(null,["\n            "])),(l()(),Ti._0(16777216,null,null,1,null,Qe)),Ti._4(16384,null,0,Zc.j,[Ti.O,Ti.K],{ngIf:[0,"ngIf"]},null),(l()(),Ti._27(null,["\n          "])),(l()(),Ti._27(null,["\n          "])),(l()(),Ti._6(0,null,null,1,"li",[["class","money"]],null,null,null,null,null)),(l()(),Ti._27(null,["奖励金额：￥",""])),(l()(),Ti._27(null,["\n        "])),(l()(),Ti._27(null,["\n      "]))],function(l,n){l(n,7,0,3===n.context.$implicit.type);l(n,10,0,4===n.context.$implicit.type);l(n,21,0,3===n.context.$implicit.type);l(n,24,0,4===n.context.$implicit.type);l(n,30,0,3===n.context.$implicit.type);l(n,33,0,4===n.context.$implicit.type)},function(l,n){l(n,14,0,Ti._28(n,14,0,l(n,15,0,Ti._20(n.parent,0),n.context.$implicit.startTime,"yyyy.MM.dd")),Ti._28(n,14,1,l(n,16,0,Ti._20(n.parent,0),n.context.$implicit.endTime,"yyyy.MM.dd")));l(n,37,0,n.context.$implicit.amount)})}function li(l){return Ti._29(0,[(l()(),Ti._6(0,null,null,6,"div",[["class","no-data"]],null,null,null,null,null)),(l()(),Ti._27(null,["\n      "])),(l()(),Ti._6(0,null,null,0,"img",[["alt",""],["src","./assets/image/nodata.png"]],null,null,null,null,null)),(l()(),Ti._27(null,["\n      "])),(l()(),Ti._6(0,null,null,1,"p",[],null,null,null,null,null)),(l()(),Ti._27(null,["空空如也"])),(l()(),Ti._27(null,["\n    "]))],null,null)}function ni(l){return Ti._29(0,[(l()(),Ti._6(0,null,null,4,"div",[["class","btn-noMore"]],null,null,null,null,null)),(l()(),Ti._27(null,["\n      "])),(l()(),Ti._6(0,null,null,1,"span",[],null,null,null,null,null)),(l()(),Ti._27(null,["—— 没有更多信息了 ——"])),(l()(),Ti._27(null,["\n    "]))],null,null)}function ui(l){return Ti._29(0,[(l()(),Ti._6(0,null,null,10,"div",[["class","request-defeat"]],null,null,null,null,null)),(l()(),Ti._27(null,["\n    "])),(l()(),Ti._6(0,null,null,0,"img",[["alt",""],["src","./assets/image/requestDefeat.png"]],null,null,null,null,null)),(l()(),Ti._27(null,["\n    "])),(l()(),Ti._6(0,null,null,1,"p",[],null,null,null,null,null)),(l()(),Ti._27(null,["啊哦！页面走丢了"])),(l()(),Ti._27(null,["\n    "])),(l()(),Ti._6(0,null,null,2,"button",[["class","btn-request-defeat"],["full",""],["ion-button",""]],null,[[null,"touchstart"]],function(l,n,u){var t=!0;if("touchstart"===n){t=!1!==l.component.refresh()&&t}return t},t_.b,t_.a)),Ti._4(1097728,null,0,e_.a,[[8,""],kc.a,Ti.k,Ti.E],{full:[0,"full"]},null),(l()(),Ti._27(0,["\n      刷新再找一找\n    "])),(l()(),Ti._27(null,["\n  "]))],function(l,n){l(n,8,0,"")},null)}function ti(l){return Ti._29(0,[(l()(),Ti._6(0,null,null,6,"ion-infinite-scroll",[],null,[[null,"ionInfinite"]],function(l,n,u){var t=!0;if("ionInfinite"===n){t=!1!==l.component.loadMore(u)&&t}return t},null,null)),Ti._4(1196032,null,0,$_.a,[Fc.a,Ti.x,Ti.k,Tc.a],null,{ionInfinite:"ionInfinite"}),(l()(),Ti._27(null,["\n    "])),(l()(),Ti._6(0,null,null,2,"ion-infinite-scroll-content",[["loadingSpinner","bubbles"],["loadingText","加载中"]],[[1,"state",0]],null,null,G_.b,G_.a)),Ti._4(114688,null,0,K_.a,[$_.a,kc.a],{loadingSpinner:[0,"loadingSpinner"],loadingText:[1,"loadingText"]},null),(l()(),Ti._27(null,["\n    "])),(l()(),Ti._27(null,["\n  "]))],function(l,n){l(n,4,0,"bubbles","加载中")},function(l,n){l(n,3,0,Ti._20(n,4).inf.state)})}function ei(l){return Ti._29(0,[Ti._21(0,Zc.d,[Ti.t]),(l()(),Ti._6(0,null,null,35,"ion-content",[],[[2,"statusbar-padding",null],[2,"has-refresher",null]],[["window","resize"]],function(l,n,u){var t=!0;if("window:resize"===n){t=!1!==Ti._20(l,2).resize()&&t}return t},Nc.b,Nc.a)),Ti._4(4374528,null,0,Fc.a,[kc.a,Dc.a,Tc.a,Ti.k,Ti.E,xc.a,Uc.a,Ti.x,[2,Ic.a],[2,Oc.a]],null,null),(l()(),Ti._27(1,["\n  "])),(l()(),Ti._0(16777216,null,1,1,null,ze)),Ti._4(16384,null,0,Zc.j,[Ti.O,Ti.K],{ngIf:[0,"ngIf"]},null),(l()(),Ti._27(1,["\n  "])),(l()(),Ti._0(16777216,null,2,1,null,Ve)),Ti._4(16384,null,0,Zc.j,[Ti.O,Ti.K],{ngIf:[0,"ngIf"]},null),(l()(),Ti._27(1,["\n  "])),(l()(),Ti._6(0,null,1,19,"div",[["class","withdraw-record"]],null,null,null,null,null)),(l()(),Ti._27(null,["\n    "])),(l()(),Ti._6(0,null,null,4,"div",[["class","withdraw-total"]],null,null,null,null,null)),(l()(),Ti._27(null,["\n      "])),(l()(),Ti._0(16777216,null,null,1,null,Be)),Ti._4(16384,null,0,Zc.j,[Ti.O,Ti.K],{ngIf:[0,"ngIf"]},null),(l()(),Ti._27(null,["\n    "])),(l()(),Ti._27(null,["\n    "])),(l()(),Ti._6(0,null,null,4,"div",[["class","record-list"]],null,null,null,null,null)),(l()(),Ti._27(null,["\n      "])),(l()(),Ti._0(16777216,null,null,1,null,Ze)),Ti._4(802816,null,0,Zc.i,[Ti.O,Ti.K,Ti.r],{ngForOf:[0,"ngForOf"]},null),(l()(),Ti._27(null,["\n    "])),(l()(),Ti._27(null,["\n    "])),(l()(),Ti._0(16777216,null,null,1,null,li)),Ti._4(16384,null,0,Zc.j,[Ti.O,Ti.K],{ngIf:[0,"ngIf"]},null),(l()(),Ti._27(null,["\n    "])),(l()(),Ti._0(16777216,null,null,1,null,ni)),Ti._4(16384,null,0,Zc.j,[Ti.O,Ti.K],{ngIf:[0,"ngIf"]},null),(l()(),Ti._27(null,["\n  "])),(l()(),Ti._27(1,["\n  "])),(l()(),Ti._0(16777216,null,1,1,null,ui)),Ti._4(16384,null,0,Zc.j,[Ti.O,Ti.K],{ngIf:[0,"ngIf"]},null),(l()(),Ti._27(1,["\n  "])),(l()(),Ti._0(16777216,null,1,1,null,ti)),Ti._4(16384,null,0,Zc.j,[Ti.O,Ti.K],{ngIf:[0,"ngIf"]},null),(l()(),Ti._27(1,["\n"])),(l()(),Ti._27(null,["\n"]))],function(l,n){var u=n.component;l(n,5,0,u.isLoadingShow);l(n,8,0,!u.isLoadingShow);l(n,15,0,u.isShow);l(n,21,0,u.awardDetail);l(n,25,0,u.isEmpty);l(n,28,0,0!==u.awardDetail.length&&u.awardDetail.length===u.count);l(n,32,0,u.requestFail);l(n,35,0,u.awardDetail.length<u.count)},function(l,n){l(n,1,0,Ti._20(n,2).statusbarPadding,Ti._20(n,2)._hasRefresher)})}function ii(l){return Ti._29(0,[(l()(),Ti._6(0,null,null,3,"li",[],null,[[null,"click"]],function(l,n,u){var t=!0;if("click"===n){t=!1!==l.component.getCurrentStatus(l.context.index)&&t}return t},null,null)),Ti._4(278528,null,0,Zc.h,[Ti.r,Ti.s,Ti.k,Ti.E],{ngClass:[0,"ngClass"]},null),Ti._22({active:0}),(l()(),Ti._27(null,["",""]))],function(l,n){l(n,1,0,l(n,2,0,n.component.currentStatus==n.context.$implicit.status))},function(l,n){l(n,3,0,n.context.$implicit.label)})}function ai(l){return Ti._29(0,[(l()(),Ti._6(0,null,null,9,"div",[["class","loading-wrapper"]],null,null,null,null,null)),(l()(),Ti._27(null,["\n    "])),(l()(),Ti._6(0,null,null,4,"div",[],null,null,null,null,null)),(l()(),Ti._27(null,["\n      "])),(l()(),Ti._6(0,null,null,1,"ion-spinner",[["item-start",""]],[[2,"spinner-paused",null]],null,null,q_.b,q_.a)),Ti._4(114688,null,0,R_.a,[kc.a,Ti.k,Ti.E],{name:[0,"name"]},null),(l()(),Ti._27(null,["\n    "])),(l()(),Ti._27(null,["\n    "])),(l()(),Ti._6(0,null,null,0,"div",[],[[8,"innerHTML",1]],null,null,null,null)),(l()(),Ti._27(null,["\n  "]))],function(l,n){l(n,5,0,n.component.load.spinner)},function(l,n){var u=n.component;l(n,4,0,Ti._20(n,5)._paused);l(n,8,0,u.load.content)})}function oi(l){return Ti._29(0,[(l()(),Ti._6(0,null,null,5,"ion-refresher",[["style","margin-top: 50px;z-index:100"]],[[2,"refresher-active",null],[4,"top",null]],[[null,"ionRefresh"]],function(l,n,u){var t=!0;if("ionRefresh"===n){t=!1!==l.component.pullRefresh(u)&&t}return t},null,null)),Ti._4(212992,null,0,E_.a,[Dc.a,Fc.a,Ti.x,Cc.l],null,{ionRefresh:"ionRefresh"}),(l()(),Ti._27(null,["\n    "])),(l()(),Ti._6(0,null,null,1,"ion-refresher-content",[],[[1,"state",0]],null,null,M_.b,M_.a)),Ti._4(114688,null,0,L_.a,[E_.a,kc.a],null,null),(l()(),Ti._27(null,["\n  "]))],function(l,n){l(n,1,0),l(n,4,0)},function(l,n){l(n,0,0,"inactive"!==Ti._20(n,1).state,Ti._20(n,1)._top);l(n,3,0,Ti._20(n,4).r.state)})}function ri(l){return Ti._29(0,[(l()(),Ti._6(0,null,null,1,"span",[],null,null,null,null,null)),(l()(),Ti._27(null,["总金额：￥ ",""]))],null,function(l,n){l(n,1,0,n.component.sum)})}function si(l){return Ti._29(0,[(l()(),Ti._6(0,null,null,16,"div",[["class","withdraw-item"]],null,null,null,null,null)),(l()(),Ti._27(null,["\n        "])),(l()(),Ti._6(0,null,null,13,"ul",[],null,null,null,null,null)),(l()(),Ti._27(null,["\n          "])),(l()(),Ti._6(0,null,null,1,"li",[["class","order-number"]],null,null,null,null,null)),(l()(),Ti._27(null,["订单编号：",""])),(l()(),Ti._27(null,["\n          "])),(l()(),Ti._6(0,null,null,1,"li",[["class","base-number"]],null,null,null,null,null)),(l()(),Ti._27(null,["结算基数：￥",""])),(l()(),Ti._27(null,["\n          "])),(l()(),Ti._6(0,null,null,1,"li",[["class","percentage"]],null,null,null,null,null)),(l()(),Ti._27(null,["奖励比例：",""])),(l()(),Ti._27(null,["\n          "])),(l()(),Ti._6(0,null,null,1,"li",[["class","money"]],null,null,null,null,null)),(l()(),Ti._27(null,["奖励金额：￥",""])),(l()(),Ti._27(null,["\n        "])),(l()(),Ti._27(null,["\n      "]))],null,function(l,n){l(n,5,0,n.context.$implicit.relateId);l(n,8,0,n.context.$implicit.baseAmount);l(n,11,0,n.context.$implicit.percent);l(n,14,0,n.context.$implicit.amount)})}function ci(l){return Ti._29(0,[(l()(),Ti._6(0,null,null,6,"div",[["class","no-data"]],null,null,null,null,null)),(l()(),Ti._27(null,["\n        "])),(l()(),Ti._6(0,null,null,0,"img",[["alt",""],["src","./assets/image/nodata.png"]],null,null,null,null,null)),(l()(),Ti._27(null,["\n        "])),(l()(),Ti._6(0,null,null,1,"p",[],null,null,null,null,null)),(l()(),Ti._27(null,["空空如也"])),(l()(),Ti._27(null,["\n      "]))],null,null)}function _i(l){return Ti._29(0,[(l()(),Ti._6(0,null,null,4,"div",[["class","btn-noMore"]],null,null,null,null,null)),(l()(),Ti._27(null,["\n        "])),(l()(),Ti._6(0,null,null,1,"span",[],null,null,null,null,null)),(l()(),Ti._27(null,["—— 没有更多赠品了 ——"])),(l()(),Ti._27(null,["\n      "]))],null,null)}function di(l){return Ti._29(0,[(l()(),Ti._6(0,null,null,10,"div",[["class","request-defeat"]],null,null,null,null,null)),(l()(),Ti._27(null,["\n        "])),(l()(),Ti._6(0,null,null,0,"img",[["alt",""],["src","./assets/image/requestDefeat.png"]],null,null,null,null,null)),(l()(),Ti._27(null,["\n        "])),(l()(),Ti._6(0,null,null,1,"p",[],null,null,null,null,null)),(l()(),Ti._27(null,["啊哦！页面走丢了"])),(l()(),Ti._27(null,["\n        "])),(l()(),Ti._6(0,null,null,2,"button",[["class","btn-request-defeat"],["full",""],["ion-button",""]],null,[[null,"touchstart"]],function(l,n,u){var t=!0;if("touchstart"===n){t=!1!==l.component.requestDefeatRefreshExpressGift()&&t}return t},t_.b,t_.a)),Ti._4(1097728,null,0,e_.a,[[8,""],kc.a,Ti.k,Ti.E],{full:[0,"full"]},null),(l()(),Ti._27(0,["\n          刷新再找一找\n        "])),(l()(),Ti._27(null,["\n      "]))],function(l,n){l(n,8,0,"")},null)}function pi(l){return Ti._29(0,[(l()(),Ti._6(0,null,null,5,"ion-infinite-scroll",[],null,[[null,"ionInfinite"]],function(l,n,u){var t=!0;if("ionInfinite"===n){t=!1!==l.component.loadMore(u)&&t}return t},null,null)),Ti._4(1196032,null,0,$_.a,[Fc.a,Ti.x,Ti.k,Tc.a],null,{ionInfinite:"ionInfinite"}),(l()(),Ti._27(null,["\n        "])),(l()(),Ti._6(0,null,null,1,"ion-infinite-scroll-content",[["loadingText","加载更多..."]],[[1,"state",0]],null,null,G_.b,G_.a)),Ti._4(114688,null,0,K_.a,[$_.a,kc.a],{loadingText:[0,"loadingText"]},null),(l()(),Ti._27(null,["\n      "]))],function(l,n){l(n,4,0,"加载更多...")},function(l,n){l(n,3,0,Ti._20(n,4).inf.state)})}function fi(l){return Ti._29(0,[(l()(),Ti._6(0,null,null,16,"div",[["class","record-list1"]],null,null,null,null,null)),(l()(),Ti._27(null,["\n      "])),(l()(),Ti._0(16777216,null,null,1,null,si)),Ti._4(802816,null,0,Zc.i,[Ti.O,Ti.K,Ti.r],{ngForOf:[0,"ngForOf"]},null),(l()(),Ti._27(null,["\n      "])),(l()(),Ti._0(16777216,null,null,1,null,ci)),Ti._4(16384,null,0,Zc.j,[Ti.O,Ti.K],{ngIf:[0,"ngIf"]},null),(l()(),Ti._27(null,["\n      "])),(l()(),Ti._0(16777216,null,null,1,null,_i)),Ti._4(16384,null,0,Zc.j,[Ti.O,Ti.K],{ngIf:[0,"ngIf"]},null),(l()(),Ti._27(null,["\n      "])),(l()(),Ti._0(16777216,null,null,1,null,di)),Ti._4(16384,null,0,Zc.j,[Ti.O,Ti.K],{ngIf:[0,"ngIf"]},null),(l()(),Ti._27(null,["\n      "])),(l()(),Ti._0(16777216,null,null,1,null,pi)),Ti._4(16384,null,0,Zc.j,[Ti.O,Ti.K],{ngIf:[0,"ngIf"]},null),(l()(),Ti._27(null,["\n    "]))],function(l,n){var u=n.component;l(n,3,0,u.orderDetail);l(n,6,0,u.noData);l(n,9,0,u.showNoMore);l(n,12,0,u.requestDefeat);l(n,15,0,!u.showNoMore&&u.showInfinite)},null)}function hi(l){return Ti._29(0,[(l()(),Ti._6(0,null,null,1,"span",[],null,null,null,null,null)),(l()(),Ti._27(null,["订单编号：",""]))],null,function(l,n){l(n,1,0,n.parent.context.$implicit.relateId)})}function gi(l){return Ti._29(0,[(l()(),Ti._6(0,null,null,1,"span",[],null,null,null,null,null)),(l()(),Ti._27(null,["会员手机：",""]))],null,function(l,n){l(n,1,0,n.parent.context.$implicit.mobile)})}function mi(l){return Ti._29(0,[(l()(),Ti._6(0,null,null,1,"span",[],null,null,null,null,null)),(l()(),Ti._27(null,["结算基数：￥",""]))],null,function(l,n){l(n,1,0,n.parent.context.$implicit.baseAmount)})}function vi(l){return Ti._29(0,[(l()(),Ti._6(0,null,null,1,"span",[],null,null,null,null,null)),(l()(),Ti._27(null,["结算基数：——"]))],null,null)}function bi(l){return Ti._29(0,[(l()(),Ti._6(0,null,null,1,"span",[],null,null,null,null,null)),(l()(),Ti._27(null,["奖励比例：",""]))],null,function(l,n){l(n,1,0,n.parent.context.$implicit.percent)})}function wi(l){return Ti._29(0,[(l()(),Ti._6(0,null,null,1,"span",[],null,null,null,null,null)),(l()(),Ti._27(null,["奖励比例：——"]))],null,null)}function yi(l){return Ti._29(0,[(l()(),Ti._6(0,null,null,39,"div",[["class","withdraw-item"]],null,null,null,null,null)),(l()(),Ti._27(null,["\n        "])),(l()(),Ti._6(0,null,null,36,"ul",[],null,null,null,null,null)),(l()(),Ti._27(null,["\n          "])),(l()(),Ti._6(0,null,null,7,"li",[["class","order-number"]],null,null,null,null,null)),(l()(),Ti._27(null,["\n            "])),(l()(),Ti._0(16777216,null,null,1,null,hi)),Ti._4(16384,null,0,Zc.j,[Ti.O,Ti.K],{ngIf:[0,"ngIf"]},null),(l()(),Ti._27(null,["\n            "])),(l()(),Ti._0(16777216,null,null,1,null,gi)),Ti._4(16384,null,0,Zc.j,[Ti.O,Ti.K],{ngIf:[0,"ngIf"]},null),(l()(),Ti._27(null,["\n          "])),(l()(),Ti._27(null,["\n          "])),(l()(),Ti._6(0,null,null,3,"li",[["class","date"]],null,null,null,null,null)),(l()(),Ti._27(null,["活动时间：","--"," "])),Ti._23(2),Ti._23(2),(l()(),Ti._27(null,["\n          "])),(l()(),Ti._6(0,null,null,7,"li",[["class","base-number"]],null,null,null,null,null)),(l()(),Ti._27(null,["\n            "])),(l()(),Ti._0(16777216,null,null,1,null,mi)),Ti._4(16384,null,0,Zc.j,[Ti.O,Ti.K],{ngIf:[0,"ngIf"]},null),(l()(),Ti._27(null,["\n            "])),(l()(),Ti._0(16777216,null,null,1,null,vi)),Ti._4(16384,null,0,Zc.j,[Ti.O,Ti.K],{ngIf:[0,"ngIf"]},null),(l()(),Ti._27(null,["\n          "])),(l()(),Ti._27(null,["\n          "])),(l()(),Ti._6(0,null,null,7,"li",[["class","percentage"]],null,null,null,null,null)),(l()(),Ti._27(null,["\n            "])),(l()(),Ti._0(16777216,null,null,1,null,bi)),Ti._4(16384,null,0,Zc.j,[Ti.O,Ti.K],{ngIf:[0,"ngIf"]},null),(l()(),Ti._27(null,["\n            "])),(l()(),Ti._0(16777216,null,null,1,null,wi)),Ti._4(16384,null,0,Zc.j,[Ti.O,Ti.K],{ngIf:[0,"ngIf"]},null),(l()(),Ti._27(null,["\n          "])),(l()(),Ti._27(null,["\n          "])),(l()(),Ti._6(0,null,null,1,"li",[["class","money"]],null,null,null,null,null)),(l()(),Ti._27(null,["奖励金额：￥",""])),(l()(),Ti._27(null,["\n        "])),(l()(),Ti._27(null,["\n      "]))],function(l,n){l(n,7,0,3===n.context.$implicit.type);l(n,10,0,4===n.context.$implicit.type);l(n,21,0,3===n.context.$implicit.type);l(n,24,0,4===n.context.$implicit.type);l(n,30,0,3===n.context.$implicit.type);l(n,33,0,4===n.context.$implicit.type)},function(l,n){l(n,14,0,Ti._28(n,14,0,l(n,15,0,Ti._20(n.parent.parent,0),n.context.$implicit.startTime,"yyyy.MM.dd")),Ti._28(n,14,1,l(n,16,0,Ti._20(n.parent.parent,0),n.context.$implicit.endTime,"yyyy.MM.dd")));l(n,37,0,n.context.$implicit.amount)})}function Si(l){return Ti._29(0,[(l()(),Ti._6(0,null,null,6,"div",[["class","no-data"]],null,null,null,null,null)),(l()(),Ti._27(null,["\n          "])),(l()(),Ti._6(0,null,null,0,"img",[["alt",""],["src","./assets/image/nodata.png"]],null,null,null,null,null)),(l()(),Ti._27(null,["\n          "])),(l()(),Ti._6(0,null,null,1,"p",[],null,null,null,null,null)),(l()(),Ti._27(null,["空空如也"])),(l()(),Ti._27(null,["\n        "]))],null,null)}function Ii(l){return Ti._29(0,[(l()(),Ti._6(0,null,null,4,"div",[["class","btn-noMore"]],null,null,null,null,null)),(l()(),Ti._27(null,["\n          "])),(l()(),Ti._6(0,null,null,1,"span",[],null,null,null,null,null)),(l()(),Ti._27(null,["—— 没有更多赠品了 ——"])),(l()(),Ti._27(null,["\n        "]))],null,null)}function Oi(l){return Ti._29(0,[(l()(),Ti._6(0,null,null,10,"div",[["class","request-defeat"]],null,null,null,null,null)),(l()(),Ti._27(null,["\n          "])),(l()(),Ti._6(0,null,null,0,"img",[["alt",""],["src","./assets/image/requestDefeat.png"]],null,null,null,null,null)),(l()(),Ti._27(null,["\n          "])),(l()(),Ti._6(0,null,null,1,"p",[],null,null,null,null,null)),(l()(),Ti._27(null,["啊哦！页面走丢了"])),(l()(),Ti._27(null,["\n          "])),(l()(),Ti._6(0,null,null,2,"button",[["class","btn-request-defeat"],["full",""],["ion-button",""]],null,[[null,"touchstart"]],function(l,n,u){var t=!0;if("touchstart"===n){t=!1!==l.component.requestDefeatRefreshExpressGift()&&t}return t},t_.b,t_.a)),Ti._4(1097728,null,0,e_.a,[[8,""],kc.a,Ti.k,Ti.E],{full:[0,"full"]},null),(l()(),Ti._27(0,["\n            刷新再找一找\n          "])),(l()(),Ti._27(null,["\n        "]))],function(l,n){l(n,8,0,"")},null)}function xi(l){return Ti._29(0,[(l()(),Ti._6(0,null,null,5,"ion-infinite-scroll",[],null,[[null,"ionInfinite"]],function(l,n,u){var t=!0;if("ionInfinite"===n){t=!1!==l.component.loadMore(u)&&t}return t},null,null)),Ti._4(1196032,null,0,$_.a,[Fc.a,Ti.x,Ti.k,Tc.a],null,{ionInfinite:"ionInfinite"}),(l()(),Ti._27(null,["\n          "])),(l()(),Ti._6(0,null,null,1,"ion-infinite-scroll-content",[["loadingText","加载更多..."]],[[1,"state",0]],null,null,G_.b,G_.a)),Ti._4(114688,null,0,K_.a,[$_.a,kc.a],{loadingText:[0,"loadingText"]},null),(l()(),Ti._27(null,["\n        "]))],function(l,n){l(n,4,0,"加载更多...")},function(l,n){l(n,3,0,Ti._20(n,4).inf.state)})}function ki(l){return Ti._29(0,[(l()(),Ti._6(0,null,null,16,"div",[["class","record-list2"]],null,null,null,null,null)),(l()(),Ti._27(null,["\n      "])),(l()(),Ti._0(16777216,null,null,1,null,yi)),Ti._4(802816,null,0,Zc.i,[Ti.O,Ti.K,Ti.r],{ngForOf:[0,"ngForOf"]},null),(l()(),Ti._27(null,["\n      "])),(l()(),Ti._0(16777216,null,null,1,null,Si)),Ti._4(16384,null,0,Zc.j,[Ti.O,Ti.K],{ngIf:[0,"ngIf"]},null),(l()(),Ti._27(null,["\n        "])),(l()(),Ti._0(16777216,null,null,1,null,Ii)),Ti._4(16384,null,0,Zc.j,[Ti.O,Ti.K],{ngIf:[0,"ngIf"]},null),(l()(),Ti._27(null,["\n        "])),(l()(),Ti._0(16777216,null,null,1,null,Oi)),Ti._4(16384,null,0,Zc.j,[Ti.O,Ti.K],{ngIf:[0,"ngIf"]},null),(l()(),Ti._27(null,["\n        "])),(l()(),Ti._0(16777216,null,null,1,null,xi)),Ti._4(16384,null,0,Zc.j,[Ti.O,Ti.K],{ngIf:[0,"ngIf"]},null),(l()(),Ti._27(null,["\n      \n    "]))],function(l,n){var u=n.component;l(n,3,0,u.awardDetail);l(n,6,0,u.noData);l(n,9,0,u.showNoMore);l(n,12,0,u.requestDefeat);l(n,15,0,!u.showNoMore&&u.showInfinite)},null)}function Di(l){return Ti._29(0,[(l()(),Ti._6(0,null,null,10,"div",[["class","request-defeat"]],null,null,null,null,null)),(l()(),Ti._27(null,["\n    "])),(l()(),Ti._6(0,null,null,0,"img",[["alt",""],["src","./assets/image/requestDefeat.png"]],null,null,null,null,null)),(l()(),Ti._27(null,["\n    "])),(l()(),Ti._6(0,null,null,1,"p",[],null,null,null,null,null)),(l()(),Ti._27(null,["啊哦！页面走丢了"])),(l()(),Ti._27(null,["\n    "])),(l()(),Ti._6(0,null,null,2,"button",[["class","btn-request-defeat"],["full",""],["ion-button",""]],null,[[null,"touchstart"]],function(l,n,u){var t=!0;if("touchstart"===n){t=!1!==l.component.refresh()&&t}return t},t_.b,t_.a)),Ti._4(1097728,null,0,e_.a,[[8,""],kc.a,Ti.k,Ti.E],{full:[0,"full"]},null),(l()(),Ti._27(0,["\n      刷新再找一找\n    "])),(l()(),Ti._27(null,["\n  "]))],function(l,n){l(n,8,0,"")},null)}function Ci(l){return Ti._29(0,[(l()(),Ti._6(0,null,null,6,"ion-infinite-scroll",[],null,[[null,"ionInfinite"]],function(l,n,u){var t=!0;if("ionInfinite"===n){t=!1!==l.component.loadMore(u)&&t}return t},null,null)),Ti._4(1196032,null,0,$_.a,[Fc.a,Ti.x,Ti.k,Tc.a],null,{ionInfinite:"ionInfinite"}),(l()(),Ti._27(null,["\n    "])),(l()(),Ti._6(0,null,null,2,"ion-infinite-scroll-content",[["loadingSpinner","bubbles"],["loadingText","加载中"]],[[1,"state",0]],null,null,G_.b,G_.a)),Ti._4(114688,null,0,K_.a,[$_.a,kc.a],{loadingSpinner:[0,"loadingSpinner"],loadingText:[1,"loadingText"]},null),(l()(),Ti._27(null,["\n    "])),(l()(),Ti._27(null,["\n  "]))],function(l,n){l(n,4,0,"bubbles","加载中")},function(l,n){l(n,3,0,Ti._20(n,4).inf.state)})}function ji(l){return Ti._29(0,[Ti._21(0,Zc.d,[Ti.t]),Ti._25(402653184,1,{content:0}),(l()(),Ti._6(0,null,null,23,"ion-header",[],null,null,null,null,null)),Ti._4(16384,null,0,Lc.a,[kc.a,Ti.k,Ti.E,[2,Ic.a]],null,null),(l()(),Ti._27(null,["\n  "])),(l()(),Ti._6(0,null,null,6,"ion-navbar",[["class","toolbar"]],[[8,"hidden",0],[2,"statusbar-padding",null]],null,null,qc.b,qc.a)),Ti._4(49152,null,0,Rc.a,[xc.a,[2,Ic.a],[2,Oc.a],kc.a,Ti.k,Ti.E],null,null),(l()(),Ti._27(3,["\n    "])),(l()(),Ti._6(0,null,3,2,"ion-title",[["text-center",""]],null,null,null,$c.b,$c.a)),Ti._4(49152,null,0,Gc.a,[kc.a,Ti.k,Ti.E,[2,Kc.a],[2,Rc.a]],null,null),(l()(),Ti._27(0,["已审核明细"])),(l()(),Ti._27(3,["\n  "])),(l()(),Ti._27(null,["\n  "])),(l()(),Ti._6(0,null,null,11,"ion-toolbar",[["class","filter-box toolbar"]],[[2,"statusbar-padding",null]],null,null,p_.b,p_.a)),Ti._4(49152,null,0,Kc.a,[kc.a,Ti.k,Ti.E],null,null),(l()(),Ti._27(3,["\n    "])),(l()(),Ti._6(0,null,3,7,"div",[["class","status-box"]],null,null,null,null,null)),(l()(),Ti._27(null,["\n      "])),(l()(),Ti._6(0,null,null,4,"ul",[],null,null,null,null,null)),(l()(),Ti._27(null,["\n        "])),(l()(),Ti._0(16777216,null,null,1,null,ii)),Ti._4(802816,null,0,Zc.i,[Ti.O,Ti.K,Ti.r],{ngForOf:[0,"ngForOf"]},null),(l()(),Ti._27(null,["\n      "])),(l()(),Ti._27(null,["\n    "])),(l()(),Ti._27(3,["\n  "])),(l()(),Ti._27(null,["\n"])),(l()(),Ti._27(null,["\n"])),(l()(),Ti._6(0,null,null,29,"ion-content",[],[[2,"statusbar-padding",null],[2,"has-refresher",null]],[["window","resize"]],function(l,n,u){var t=!0;if("window:resize"===n){t=!1!==Ti._20(l,28).resize()&&t}return t},Nc.b,Nc.a)),Ti._4(4374528,[[1,4]],0,Fc.a,[kc.a,Dc.a,Tc.a,Ti.k,Ti.E,xc.a,Uc.a,Ti.x,[2,Ic.a],[2,Oc.a]],null,null),(l()(),Ti._27(1,["\n  "])),(l()(),Ti._0(16777216,null,1,1,null,ai)),Ti._4(16384,null,0,Zc.j,[Ti.O,Ti.K],{ngIf:[0,"ngIf"]},null),(l()(),Ti._27(1,["\n  \n  "])),(l()(),Ti._0(16777216,null,2,1,null,oi)),Ti._4(16384,null,0,Zc.j,[Ti.O,Ti.K],{ngIf:[0,"ngIf"]},null),(l()(),Ti._27(1,["\n  "])),(l()(),Ti._6(0,null,1,13,"div",[["class","withdraw-record"]],null,null,null,null,null)),(l()(),Ti._27(null,["\n    "])),(l()(),Ti._6(0,null,null,4,"div",[["class","withdraw-total"]],null,null,null,null,null)),(l()(),Ti._27(null,["\n      "])),(l()(),Ti._0(16777216,null,null,1,null,ri)),Ti._4(16384,null,0,Zc.j,[Ti.O,Ti.K],{ngIf:[0,"ngIf"]},null),(l()(),Ti._27(null,["\n    "])),(l()(),Ti._27(null,["\n    "])),(l()(),Ti._0(16777216,null,null,1,null,fi)),Ti._4(16384,null,0,Zc.j,[Ti.O,Ti.K],{ngIf:[0,"ngIf"]},null),(l()(),Ti._27(null,["\n    "])),(l()(),Ti._0(16777216,null,null,1,null,ki)),Ti._4(16384,null,0,Zc.j,[Ti.O,Ti.K],{ngIf:[0,"ngIf"]},null),(l()(),Ti._27(null,["\n\n  "])),(l()(),Ti._27(1,["\n  "])),(l()(),Ti._0(16777216,null,1,1,null,Di)),Ti._4(16384,null,0,Zc.j,[Ti.O,Ti.K],{ngIf:[0,"ngIf"]},null),(l()(),Ti._27(1,["\n  "])),(l()(),Ti._0(16777216,null,1,1,null,Ci)),Ti._4(16384,null,0,Zc.j,[Ti.O,Ti.K],{ngIf:[0,"ngIf"]},null),(l()(),Ti._27(1,["\n"]))],function(l,n){var u=n.component;l(n,21,0,u.statusList);l(n,31,0,u.isLoadingShow);l(n,34,0,!u.loadingShow);l(n,41,0,u.isShow);l(n,45,0,0==u.currentStatus);l(n,48,0,1==u.currentStatus);l(n,52,0,u.requestFail);l(n,55,0,u.orderDetail.length<u.count)},function(l,n){l(n,5,0,Ti._20(n,6)._hidden,Ti._20(n,6)._sbPadding);l(n,13,0,Ti._20(n,14)._sbPadding);l(n,27,0,Ti._20(n,28).statusbarPadding,Ti._20(n,28)._hasRefresher)})}Object.defineProperty(n,"__esModule",{value:!0});var Ai=u(56),Ti=u(0),Pi=u(2),Ei=u(64),Mi=u(15),Li=(u(231),u(233),u(112)),qi="61topbaby.com",Ri="topBssClient",$i="client@topbaby",Gi="wxa7257af9de640f52",Ki=Fi=function(){return function(){}}();Ki.mainUrl=qi,Ki.hostUrl="https://rest."+Fi.mainUrl,Ki.imgUrl="https://images."+Fi.mainUrl+"/",Ki.TIME_OUT=3e4,Ki.LOAD_TIME=500,Ki.RESERVED_TIME=18e5,Ki.oauthTokenUrl=Fi.hostUrl+"/uaa/oauth/token",Ki.client_id=Ri,Ki.secret=$i,Ki.grant_type="password",Ki.appID=Gi,Ki.API={login:Fi.hostUrl+"/uaa/user",getOrderList:Fi.hostUrl+"/order/bssList",getCancelorder:Fi.hostUrl+"/order/cancel/list",auditCancelOrder:Fi.hostUrl+"/order/cancel/approval",getReturnorderList:Fi.hostUrl+"/order/return/list",returnDetail:Fi.hostUrl+"/order/return/details",returnReceived:Fi.hostUrl+"/order/return/received",auditReturnOrder:Fi.hostUrl+"/order/return/approval",getGiftList:Fi.hostUrl+"/promotion/member/gift/account/getGiftList",getUnhandleGiftCount:Fi.hostUrl+"/promotion/member/gift/account/getUnhandleGiftCount",confirmReserveShopTime:Fi.hostUrl+"/promotion/member/gift/account/confirmReserveShopTime",confirmExpressInfo:Fi.hostUrl+"/promotion/member/gift/account/confirmExpressInfo",getBrandshopProducts:Fi.hostUrl+"/product/getBrandshopProducts",warehouseGetCount:Fi.hostUrl+"/order/warehouse/getCount",getProductSkuWithDefault:Fi.hostUrl+"/product/sku/getProductSkuWithDefault",getValidSKUAttrValue:Fi.hostUrl+"/product/sku/getValidSkuAttrValue",warehouseAdd:Fi.hostUrl+"/order/warehouse/add",warehouseList:Fi.hostUrl+"/order/warehouse/list",warehouseGenerateCode:Fi.hostUrl+"/order/warehouse/generateCode",warehouseDeleteById:Fi.hostUrl+"/order/warehouse/item/deleteById",warehouseUpdate:Fi.hostUrl+"/order/warehouse/item/update",warehouseEmpty:Fi.hostUrl+"/order/warehouse/empty",checkStatus:Fi.hostUrl+"/order/warehouse/checkStatus",current:Fi.hostUrl+"/account/brandshop/user/current",account:Fi.hostUrl+"/account/brandshop/user/account",withdraw:Fi.hostUrl+"/account/brandshop/user/withdraw/",qrcode:Fi.hostUrl+"/account/brandshop/user/qrcode",withdrawList:Fi.hostUrl+"/account/brandshop/user/withdraw/list",bonusList:Fi.hostUrl+"/account/brandshop/user/bonus/list",bonusSum:Fi.hostUrl+"/account/brandshop/user/bonus/sum",untreatedCount:Fi.hostUrl+"/order/untreatedCount",connect:"https://open.weixin.qq.com/connect/oauth2/authorize",signature:Fi.hostUrl+"/account/wechat/signature",orderReceive:Fi.hostUrl+"/order/receive/received",receiveGift:Fi.hostUrl+"/promotion/member/gift/account/receiveGift",firstLogin:Fi.hostUrl+"/uaa/getInfo",editPassword:Fi.hostUrl+"/uaa/password",callback:Fi.hostUrl+"/account/wechat/callback"},Ki.load={spinner:"dots",content:"加载中"},Ki=Fi=Object(Pi.__decorate)([Object(Ti.o)()],Ki);var Ni=function(){function l(l,n,u){this.http=l,this.loadingCtrl=n,this.toastCtrl=u}return l.prototype.httpGet=function(l){return this.withTokenHeaders=new Ei.d({Authorization:"Bearer "+this.getItem("tpb_token")}),this.http.get(l,{headers:this.withTokenHeaders}).timeout(Ki.TIME_OUT).toPromise().then(function(l){return l.json()}).catch(this.handleError)},l.prototype.httpGetNoAuthor=function(l){return this.http.get(l).timeout(Ki.TIME_OUT).toPromise().then(function(l){return l.json()}).catch(this.handleError)},l.prototype.httpGetReturnData=function(l){return this.withTokenHeaders=new Ei.d({Authorization:"Bearer "+this.getItem("tpb_token")}),this.http.get(l,{headers:this.withTokenHeaders}).timeout(Ki.TIME_OUT).toPromise().then(function(l){return l}).catch(this.handleError)},l.prototype.httpGetHeader=function(l,n){return this.http.get(l,{headers:n}).timeout(Ki.TIME_OUT).toPromise().then(function(l){return l.json()}).catch(this.handleError)},l.prototype.httpPost=function(l,n){return this.withTokenHeaders=new Ei.d({Authorization:"Bearer "+this.getItem("tpb_token"),"content-type":"application/json"}),this.http.post(l,n,{headers:this.withTokenHeaders}).timeout(Ki.TIME_OUT).toPromise().then(function(l){return l.json()}).catch(this.handleError)},l.prototype.httpPostHeader=function(l,n,u){return this.http.post(l,n,{headers:u}).timeout(Ki.TIME_OUT).toPromise().then(function(l){return l.json()})},l.prototype.httpPut=function(l,n){return this.withTokenHeaders=new Ei.d({Authorization:"Bearer "+this.getItem("tpb_token")}),this.http.put(l,n,{headers:this.withTokenHeaders}).timeout(Ki.TIME_OUT).toPromise().then(function(l){return l.json()}).catch(this.handleError)},l.prototype.httpDelete=function(l){return this.withTokenHeaders=new Ei.d({Authorization:"Bearer "+this.getItem("tpb_token")}),this.http.delete(l,{headers:this.withTokenHeaders}).timeout(Ki.TIME_OUT).toPromise().then(function(l){return l.json()}).catch(this.handleError)},l.prototype.handleError=function(l){return Promise.reject(l.json()||l)},l.prototype.getToken=function(l,n){var u=this;if("invalid_token"==l.error){var t=new Li.Buffer(Ki.client_id+":"+Ki.secret).toString("base64");u.oauthTokenHeaders=new Ei.d({Authorization:"Basic "+t,"Content-Type":"application/x-www-form-urlencoded"});var e=Ki.oauthTokenUrl,i="grant_type=refresh_token&refresh_token="+u.getItem("refresh_token");u.httpPostHeader(e,i,u.oauthTokenHeaders).then(function(l){var t=(new Date).getTime()+1e3*l.expires_in-Ki.RESERVED_TIME;u.setItem("newDateMS",t),u.setItem("tpb_token",l.access_token),u.setItem("refresh_token",l.refresh_token),n()}).catch(function(l){console.log(l),u.toast("登录已过期，请重新登录",1e3,"middle"),u.setItem("tpb_token",""),u.setItem("refresh_token",""),window.location.search&&window.location.search.split("?")[1].indexOf("code")>-1?window.location.href=window.location.href.split("?")[0]:window.location.href=window.location.href})}},l.prototype.loading=function(){return this.loadingCtrl.create({spinner:"dots",content:"加载中",dismissOnPageChange:!0,showBackdrop:!1})},l.prototype.toast=function(l,n,u){this.toastCtrl.create({message:l,duration:n,position:u}).present()},l.prototype.setItem=function(l,n){try{window.localStorage[l]=n}catch(l){console.error("window.localStorage error:"+l)}},l.prototype.getItem=function(l){try{return window.localStorage[l]}catch(l){console.error("window.localStorage error:"+l)}},l.prototype.reserveDate=function(){var l=function(l){return 1===l.toString().length?"0"+l:l};return function(){var n=new Date,u=n.getFullYear(),t=n.getMonth()+1,e=n.getDate();return u+"-"+l(t)+"-"+l(e)}()},l}();Ni=Object(Pi.__decorate)([Object(Ti.o)(),Object(Pi.__metadata)("design:paramtypes",["function"==typeof(Ui=void 0!==Ei.e&&Ei.e)&&Ui||Object,"function"==typeof(zi=void 0!==Mi.h&&Mi.h)&&zi||Object,"function"==typeof(Vi=void 0!==Mi.p&&Mi.p)&&Vi||Object])],Ni);var Fi,Ui,zi,Vi,Bi=u(203),Hi=u(204),Yi=function(){return function(l){this.navCtrl=l}}();Yi=Object(Pi.__decorate)([Object(Ti.i)({selector:"forget",templateUrl:"forget.html"}),Object(Pi.__metadata)("design:paramtypes",["function"==typeof(Wi=void 0!==Mi.l&&Mi.l)&&Wi||Object])],Yi);var Wi,Xi=u(250),Ji=u.n(Xi),Qi=u(274),Zi=u.n(Qi),la=function(){function l(l,n,u){this.navCtrl=l,this.viewCtrl=n,this.appService=u,this.btnText="查看门店二维码",this.isShow=!1,this.myCode="",this.brandshopIndexUrl="",this.getParams()}return l.prototype.showBrandshopCode=function(){this.isShow=!this.isShow,this.btnText=this.isShow?"收起门店二维码":"查看门店二维码"},l.prototype.getParams=function(){var l=this,n=this.restFulSha("GET","/topbaby/restful/wechat/qrCode/getQRCodeUrl","bsSecret2017");this.appService.httpGet(Ki.API.qrcode).then(function(u){l.brandshopIndexUrl=u.brandshopIndexUrl+"?id="+u.brandshopId;l.getMyQRcode(u.userRecommendWechatQrCodeUrl+"?type=U&userId="+u.brandshopUserId+"&accessKeyId=topbabyBs&signature="+n.signature+"&expires="+n.expires)}).catch(function(n){l.appService.getToken(n,function(){l.getParams()}),console.log(n)})},l.prototype.getMyQRcode=function(l){var n=this;this.appService.httpGetNoAuthor(l).then(function(l){n.myCode=l.url}).catch(function(u){n.appService.getToken(u,function(){n.getMyQRcode(l)}),console.log(u)})},l.prototype.getNowUtcTime=function(){var l=new Date,n=l.getFullYear(),u=l.getMonth()+1,t=l.getDate(),e=l.getHours(),i=l.getMinutes(),a=l.getSeconds(),o=Date.UTC(n,u,t,e,i+10,a)+"";return Number(o.substr(0,10))},l.prototype.restFulSha=function(l,n,u){var t=this.getNowUtcTime(),e=Ji.a.HmacSHA1(n=l+"\n"+n+"\n"+t+"\n",u);return{expires:t,signature:e=Zi.a.Base64.encode(e)}},l}();la=Object(Pi.__decorate)([Object(Ti.i)({selector:"mycode",templateUrl:"mycode.html"}),Object(Pi.__metadata)("design:paramtypes",["function"==typeof(na=void 0!==Mi.l&&Mi.l)&&na||Object,"function"==typeof(ua=void 0!==Mi.q&&Mi.q)&&ua||Object,"function"==typeof(ta=void 0!==Ni&&Ni)&&ta||Object])],la);var na,ua,ta,ea=function(){function l(l,n,u,t,e){this.navCtrl=l,this.viewCtrl=n,this.navParams=u,this.appService=t,this.loadingCtrl=e,this.count=1,this.attrMap=[],this.showNoMoreGift=!1,this.skuAttrValue=[],this.attrSeqArr=[],this.attrSeqArrPJ=[],this.attrValueArr=[],this.loadingShow=!0,this.load={},this.confirmAdd=!1,this.overStock=!1,this.isShowAddNumber=!1,this.productSeq=u.get("productSeq"),this.productName=u.get("productName"),this.warehouseCount=u.get("warehouseCount"),this.fileSeq=u.get("fileSeq"),this.brandshopSeq=u.get("brandshopSeq"),this.load=Ki.load,this.getProductSkuWithDefault()}return l.prototype.getProductSkuWithDefault=function(){var l=this;this.appService.httpGet(Ki.API.getProductSkuWithDefault+"?brandshopSeq="+this.brandshopSeq+"&productSeq="+this.productSeq).then(function(n){if(l.isShowAddNumber=!0,l.skuPrice=n.price,l.loadingShow=!1,l.confirmAdd=!0,0!=n.skuLength){l.orderLayerData=n,l.attrImageSeq=l.orderLayerData.attrImageSeq;for(var u in l.orderLayerData.attrMap)l.attrMap.push(l.orderLayerData.attrMap[u]);for(var t=0;t<l.attrMap.length;t++)for(var e=0;e<l.attrMap[t].length;e++)"selectedAttrValue"==l.attrMap[t][e].selectedAttrValue&&l.skuAttrValue.push(l.attrMap[t][e].attrValue);for(t=0;t<l.attrMap.length;t++)l.attrSeqArr.push(l.attrMap[t][0].attrSeq);for(t=0;t<l.attrMap.length;t++)l.attrSeqArrPJ.push(l.attrMap[t][0].attrSeq);l.attrValueArr=l.skuAttrValue}else l.orderLayerData={}}).catch(function(n){l.appService.getToken(n,function(){l.getProductSkuWithDefault()}),l.loadingShow=!1,l.isShowAddNumber=!1,console.log(n),l.appService.toast("网络异常，请稍后再试",1e3,"middle")})},l.prototype.dismiss=function(){this.viewCtrl.dismiss({warehouseCount:this.warehouseCount})},l.prototype.addCount=function(){1!=this.overStock&&(this.orderLayerData.stock>this.count?(this.overStock=!1,this.count++):(this.overStock=!0,this.appService.toast("不能添加更多宝贝了哦",1e3,"middle")))},l.prototype.removeCount=function(){this.overStock=!1,this.count=1===this.count?1:this.count-1},l.prototype.resetCount=function(){this.count=this.count<=0?1:this.count,this.count>=this.orderLayerData.stock?(this.count=this.orderLayerData.stock,this.appService.toast("不能超出库存哦",1e3,"middle")):this.count=this.count},l.prototype.changeRadio=function(l,n,u){var t=this;this.attrValueArr[n]!=u?(this.attrValueArr[n]=u,this.attrSeqArrPJ[n]=this.attrSeqArr[n]):(this.attrValueArr[n]="",this.attrSeqArrPJ[n]="",l.target.setAttribute("class","labelTag"));var e="",i="";this.attrSeqArrPJ.map(function(l,n){l&&(e+="&attrSeqArr="+l)}),this.attrValueArr.map(function(l,n){l&&(i+="&attrValueArr="+l)});this.appService.httpGet(Ki.API.getValidSKUAttrValue+"?brandshopSeq="+this.brandshopSeq+"&productSeq="+this.orderLayerData.productSeq+"&skulength="+this.orderLayerData.skuLength+(e+i)).then(function(l){t.skuPrice=l.price,t.orderLayerData=l,t.attrMap=[];for(var n in t.orderLayerData.attrMap)t.attrMap.push(t.orderLayerData.attrMap[n]);t.attrImageSeq=t.orderLayerData.attrImageSeq}).catch(function(e){t.appService.getToken(e,function(){t.changeRadio(l,n,u)}),console.log(e),t.appService.toast("操作失败，请稍后重试",1e3,"middle")})},l.prototype.warehouseAdd=function(){for(var l=this,n=document.getElementsByClassName("labelTag"),u=0,t=0;t<n.length;t++)"labelTag active"==n[t].className&&u++;if(this.attrMap.length==u){this.appService.httpPost(Ki.API.warehouseAdd,{productId:this.orderLayerData.productSeq,skuId:this.orderLayerData.skuSeq,itemPrice:this.orderLayerData.price,productNum:this.count,remark:""}).then(function(n){"success"==n.type&&(l.appService.toast("添加成功！",1e3,"middle"),l.dismiss())}).catch(function(n){l.appService.getToken(n,function(){l.warehouseAdd()}),console.log(n.message),l.appService.toast("操作失败，请稍后重试",1e3,"middle")})}else this.appService.toast("请选择商品参数信息",1e3,"middle")},l}();ea=Object(Pi.__decorate)([Object(Ti.i)({selector:"order-layer",templateUrl:"order-layer.html"}),Object(Pi.__metadata)("design:paramtypes",["function"==typeof(ia=void 0!==Mi.l&&Mi.l)&&ia||Object,"function"==typeof(aa=void 0!==Mi.q&&Mi.q)&&aa||Object,"function"==typeof(oa=void 0!==Mi.m&&Mi.m)&&oa||Object,"function"==typeof(ra=void 0!==Ni&&Ni)&&ra||Object,"function"==typeof(sa=void 0!==Mi.h&&Mi.h)&&sa||Object])],ea);var ia,aa,oa,ra,sa,ca=function(){function l(l,n,u,t,e){this.navCtrl=l,this.app=n,this.navParams=u,this.appService=t,this.events=e,this.myCode="",this.isStatus=!1,this.isOrderAgain=!1,this.myCode=this.navParams.get("returnUrl"),this.totalPriceFloat=this.navParams.get("totalPriceFloat"),this.warehouseId=this.navParams.get("warehouseId"),this.Interval()}return l.prototype.updateOrder=function(){this.navCtrl.pop()},l.prototype.orderAgain=function(){var l=this;this.isOrderAgain=!0;var n=this.appService.loading();n.present();this.appService.httpPut(""+Ki.API.warehouseEmpty,null).then(function(u){"success"==u.type&&(n.dismiss(),l.navCtrl.remove(l.navCtrl.length()-2,2))}).catch(function(u){l.appService.getToken(u,function(){l.orderAgain()}),n.dismiss(),console.log(u),l.appService.toast("操作失败",1e3,"middle")})},l.prototype.goTabs=function(){this.navCtrl.remove(0,this.navCtrl.length())},l.prototype.Interval=function(){var l=this,n=Ki.API.checkStatus+"?warehouseId="+this.warehouseId;this.timer=window.setInterval(function(){l.appService.httpGet(n).then(function(n){0!=n.status||l.isOrderAgain?l.isStatus=!1:(l.isStatus=!0,window.clearInterval(l.timer),l.navCtrl.remove(0,l.navCtrl.length()),l.events.publish("check: status",l.isStatus))}).catch(function(l){console.log(l)})},1e3)},l.prototype.ionViewDidLeave=function(){window.clearInterval(this.timer)},l}();ca=Object(Pi.__decorate)([Object(Ti.i)({selector:"payment-code",templateUrl:"payment-code.html"}),Object(Pi.__metadata)("design:paramtypes",["function"==typeof(_a=void 0!==Mi.l&&Mi.l)&&_a||Object,"function"==typeof(da=void 0!==Mi.b&&Mi.b)&&da||Object,"function"==typeof(pa=void 0!==Mi.m&&Mi.m)&&pa||Object,"function"==typeof(fa=void 0!==Ni&&Ni)&&fa||Object,"function"==typeof(ha=void 0!==Mi.d&&Mi.d)&&ha||Object])],ca);var _a,da,pa,fa,ha,ga=function(){function l(l,n,u,t){this.navCtrl=l,this.modalCtrl=n,this.alertCtrl=u,this.appService=t,this.start=0,this.limit=50,this.orderStoreDataArray=[],this.loadingShow=!0,this.load={},this.totalPrice=0,this.confirmOrder=!1,this.requestDefeat=!1,this.start=0,this.down=!0,this.up=!1,this.load=Ki.load,this.getOrderStore()}return l.prototype.getOrderStore=function(){var l=this;this.appService.httpGet(Ki.API.warehouseList+"?start="+this.start+"&limit="+this.limit).then(function(n){l.loadingShow=!1,0==n.count?(l.noData=!0,l.confirmOrder=!1):(l.noData=!1,l.confirmOrder=!0,l.up?((u=l.orderStoreDataArray).push.apply(u,n.data),l.start+=l.limit):l.down&&(l.orderStoreDataArray=n.data,l.start+=l.limit),l.orderStoreDataArray.map(function(n){l.totalPrice+=n.itemPrice}),l.orderStoreDataArray.map(function(l){l.productSkuDTO.attrValueList.map(function(n){n.fileSeq&&(l.productSkuDTO.fileSeq=n.fileSeq)})}),l.totalPriceFloat=parseFloat(""+l.totalPrice.toString()).toFixed(2));var u}).catch(function(n){l.appService.getToken(n,function(){l.getOrderStore()}),l.loadingShow=!1,l.requestDefeat=!0,console.log(n)})},l.prototype.warehouseUpdate=function(l,n){var u=this,t=[],e=Ki.API.warehouseUpdate,i=this.appService.loading();i.present(),this.orderStoreDataArray.map(function(l){var n={};n.warehouseItemId=l.warehouseItemId,n.warehouseId=l.warehouseId,n.itemPrice=l.itemPrice,n.productNum=l.productNum,n.remark=l.remark,t.push(n)}),this.appService.httpPut(e,t[l]).then(function(l){"success"==l.type&&(i.dismiss(),u.totalPrice=0,u.orderStoreDataArray.map(function(l){u.totalPrice+=l.itemPrice}),u.totalPriceFloat=parseFloat(""+u.totalPrice.toString()).toFixed(2))}).catch(function(t){u.appService.getToken(t,function(){u.warehouseUpdate(l,n)}),"add"==n?u.orderStoreDataArray[l].productNum--:"remove"==n&&u.orderStoreDataArray[l].productNum++,i.dismiss(),console.log(t),u.appService.toast("更新失败，请稍后再试",1e3,"middle")})},l.prototype.addCount=function(l){this.orderStoreDataArray[l].productSkuDTO.stock>this.orderStoreDataArray[l].productNum?(this.orderStoreDataArray[l].productNum++,this.warehouseUpdate(l,"add")):this.appService.toast("不能添加更多宝贝了哦！",1e3,"middle")},l.prototype.removeCount=function(l){this.orderStoreDataArray[l].productNum>1&&(this.orderStoreDataArray[l].productNum--,this.warehouseUpdate(l,"remove"))},l.prototype.delete=function(l){var n=this,u=this.appService.loading();u.present();this.appService.httpDelete(Ki.API.warehouseDeleteById+"?id="+this.orderStoreDataArray[l].warehouseItemId).then(function(t){"success"==t.type&&(u.dismiss(),n.orderStoreDataArray.splice(l,1),n.totalPrice=0,n.orderStoreDataArray.map(function(l){n.totalPrice+=l.itemPrice}),n.totalPriceFloat=parseFloat(""+n.totalPrice.toString()).toFixed(2),0==n.orderStoreDataArray.length&&(n.confirmOrder=!1,n.noData=!0))}).catch(function(t){n.appService.getToken(t,function(){n.delete(l)}),u.dismiss(),console.log(t),n.appService.toast("删除失败，请稍后再试",1e3,"middle")})},l.prototype.resetCount=function(l){null==this.orderStoreDataArray[l].itemPrice&&(this.orderStoreDataArray[l].itemPrice=0,this.appService.toast("商品总额不能为空",1e3,"middle")),this.warehouseUpdate(l,"reset")},l.prototype.resetProductNum=function(l){this.orderStoreDataArray[l].productNum<=0&&(this.orderStoreDataArray[l].productNum=1,this.appService.toast("商品数量不能为空",1e3,"middle")),this.orderStoreDataArray[l].productSkuDTO.stock>=this.orderStoreDataArray[l].productNum?this.warehouseUpdate(l,"reset"):(this.appService.toast("不能超出库存哦",1e3,"middle"),this.orderStoreDataArray[l].productNum=this.orderStoreDataArray[l].productSkuDTO.stock,this.warehouseUpdate(l,"reset"))},l.prototype.addProductModal=function(){var l=this,n=this.appService.loading();n.present();this.appService.httpGetReturnData(Ki.API.warehouseGenerateCode+"?warehouseId="+this.orderStoreDataArray[0].warehouseId).then(function(u){n.dismiss(),l.returnUrl=u._body,l.navCtrl.push(ca,{returnUrl:l.returnUrl,totalPriceFloat:l.totalPriceFloat,warehouseId:l.orderStoreDataArray[0].warehouseId})}).catch(function(u){l.appService.getToken(u,function(){l.addProductModal()}),n.dismiss(),console.log(u),l.appService.toast("操作失败，请稍后再试",1e3,"middle")})},l.prototype.refreshGetOrderStoreList=function(l){var n=this;this.start=0,this.down=!0,this.up=!1,this.requestDefeat=!1,this.noData=!1;this.appService.httpGet(Ki.API.warehouseList+"?start="+this.start+"&limit="+this.limit).then(function(u){l.complete(),0==u.count?n.noData=!0:(n.noData=!1,n.orderStoreDataArray=u.data,n.start+=n.limit)}).catch(function(u){n.appService.getToken(u,function(){n.refreshGetOrderStoreList(l)}),n.orderStoreDataArray=[],l.complete(),console.log(u),n.requestDefeat=!0})},l.prototype.requestDefeatRefresh=function(){this.requestDefeat=!1,this.loadingShow=!0,this.start=0,this.down=!0,this.up=!1,this.getOrderStore()},l}();Object(Pi.__decorate)([Object(Ti.N)(Mi.c),Object(Pi.__metadata)("design:type","function"==typeof(ma=void 0!==Mi.c&&Mi.c)&&ma||Object)],ga.prototype,"content",void 0),ga=Object(Pi.__decorate)([Object(Ti.i)({selector:"order-store",templateUrl:"order-store.html"}),Object(Pi.__metadata)("design:paramtypes",["function"==typeof(va=void 0!==Mi.l&&Mi.l)&&va||Object,"function"==typeof(ba=void 0!==Mi.j&&Mi.j)&&ba||Object,"function"==typeof(wa=void 0!==Mi.a&&Mi.a)&&wa||Object,"function"==typeof(ya=void 0!==Ni&&Ni)&&ya||Object])],ga);var ma,va,ba,wa,ya,Sa=function(){function l(l,n,u,t){this.modalCtrl=l,this.navCtrl=n,this.alertCtrl=u,this.appService=t,this.start=0,this.limit=20,this.showNoMore=!1,this.searchKeyWord="",this.loadingShow=!0,this.load={},this.requestDefeat=!1,this.showInfinite=!1,this.down=!0,this.up=!1,this.load=Ki.load,this.creatOrderArray=[],this.getCreatOrderList()}return l.prototype.getCreatOrderList=function(){var l=this;this.loadingShow=!0;var n=Ki.API.getBrandshopProducts+"?start="+this.start+"&limit="+this.limit;""!=this.searchKeyWord&&void 0!=this.searchKeyWord&&(n=n+"&searchKeyWord="+this.searchKeyWord),this.appService.httpGet(n).then(function(n){l.loadingShow=!1,0==n.count?l.noData=!0:(l.noData=!1,l.showInfinite=!0,l.start<n.count?l.up?((u=l.creatOrderArray).push.apply(u,n.data),l.start+=l.limit):l.down&&(l.creatOrderArray=n.data,l.start+=l.limit):l.showNoMore=!0);var u}).catch(function(n){l.appService.getToken(n,function(){l.getCreatOrderList()}),l.showInfinite=!1,l.loadingShow=!1,l.requestDefeat=!0,console.log(n)})},l.prototype.addProductModal=function(l){this.modalCtrl.create(ea,{productSeq:this.creatOrderArray[l].productSeq,productName:this.creatOrderArray[l].productName,warehouseCount:this.warehouseCount,fileSeq:this.creatOrderArray[l].fileSeq,brandshopSeq:this.creatOrderArray[l].brandshopSeq},{cssClass:"order-sku-list"}).present()},l.prototype.orderRepertory=function(){this.navCtrl.push(ga)},l.prototype.onInput=function(l){var n=this;if(this.down=!0,this.up=!1,this.start=0,this.requestDefeat=!1,this.searchKeyWord){this.loadingShow=!0;this.appService.httpGet(Ki.API.getBrandshopProducts+"?searchKeyWord="+this.searchKeyWord+"&start="+this.start+"&limit="+this.limit).then(function(l){n.loadingShow=!1,0==l.count?n.noData=!0:(n.noData=!1,n.showInfinite=!0,n.start<l.count?n.up?((u=n.creatOrderArray).push.apply(u,l.data),n.start+=n.limit):n.down&&(n.creatOrderArray=l.data,n.start+=n.limit):n.showNoMore=!0);var u}).catch(function(u){n.appService.getToken(u,function(){n.onInput(l)}),console.log(u),n.creatOrderArray=[],n.requestDefeat=!0,n.showInfinite=!1,n.loadingShow=!1})}else this.start=0,this.down=!0,this.up=!1,this.showInfinite=!0,this.showNoMore=!1,this.getCreatOrderList()},l.prototype.refreshGetCreatOrderList=function(l){var n=this;this.start=0,this.down=!0,this.up=!1,this.requestDefeat=!1,this.showNoMore=!1;var u=Ki.API.getBrandshopProducts+"?start="+this.start+"&limit="+this.limit;this.searchKeyWord&&(u=u+"&searchKeyWord="+this.searchKeyWord),this.appService.httpGet(u).then(function(u){l.complete(),0==u.count?n.noData=!0:(n.noData=!1,n.showInfinite=!0,0!=u.data.length?(n.creatOrderArray=u.data,n.start+=n.limit):n.showNoMore=!0)}).catch(function(u){n.appService.getToken(u,function(){n.refreshGetCreatOrderList(l)}),n.creatOrderArray=[],l.complete(),console.log(u),n.showInfinite=!1,n.requestDefeat=!0})},l.prototype.infiniteGetCreatOrderList=function(l){var n=this;if(this.down=!1,this.up=!0,this.searchKeyWord){this.appService.httpGet(Ki.API.getBrandshopProducts+"?searchKeyWord="+this.searchKeyWord+"&start="+this.start+"&limit="+this.limit).then(function(u){l.complete(),0==u.count?n.noData=!0:0!=u.data.length?((t=n.creatOrderArray).push.apply(t,u.data),n.start+=n.limit):n.showNoMore=!0;var t}).catch(function(u){n.appService.getToken(u,function(){n.infiniteGetCreatOrderList(l)}),console.log(u),n.appService.toast("网络不好，请稍后重试",1e3,"middle")})}else{this.appService.httpGet(Ki.API.getBrandshopProducts+"?start="+this.start+"&limit="+this.limit).then(function(u){l.complete(),0==u.count?n.noData=!0:(n.noData=!1,0!=u.data.length?((t=n.creatOrderArray).push.apply(t,u.data),n.start+=n.limit):n.showNoMore=!0);var t}).catch(function(u){n.appService.getToken(u,function(){n.infiniteGetCreatOrderList(l)}),l.complete(),console.log(u),n.appService.toast("网络不好，请稍后重试",1e3,"middle")})}},l.prototype.getWarehouseCount=function(){var l=this;this.appService.httpGet(""+Ki.API.warehouseGetCount).then(function(n){l.warehouseCount=n,l.showInfinite=!0}).catch(function(n){l.appService.getToken(n,function(){l.getWarehouseCount()}),console.log(n),l.showInfinite=!1,l.requestDefeat=!0})},l.prototype.ionViewDidEnter=function(){this.getWarehouseCount()},l.prototype.requestDefeatRefresh=function(){this.requestDefeat=!1,this.loadingShow=!0,this.start=0,this.down=!0,this.up=!1,this.requestDefeat=!1,this.getCreatOrderList()},l}();Sa=Object(Pi.__decorate)([Object(Ti.i)({selector:"creat-order",templateUrl:"creat-order.html"}),Object(Pi.__metadata)("design:paramtypes",["function"==typeof(Ia=void 0!==Mi.j&&Mi.j)&&Ia||Object,"function"==typeof(Oa=void 0!==Mi.l&&Mi.l)&&Oa||Object,"function"==typeof(xa=void 0!==Mi.a&&Mi.a)&&xa||Object,"function"==typeof(ka=void 0!==Ni&&Ni)&&ka||Object])],Sa);var Ia,Oa,xa,ka,Da=function(){function l(l,n,u,t,e){this.navCtrl=l,this.alertCtrl=n,this.viewCtrl=u,this.navParams=t,this.appService=e,this.isAllow=!0,this.giftInfo={memberGiftAccountSeq:null,giftSeq:null,giftCode:"",giftName:"",giftType:"",imageName:"",giftRemark:"",brandshopSeq:null,brandshopName:"",startDate:null,endDate:null,status:"",receiveDate:null,useDate:null,memberSeq:null,memberPhone:null,reservePhone:"",reserveShopTime:null,expressCompany:null,expressNo:null,deliveryTime:null,brandshopUserSeq:null,brandshopUserName:null,attrValueList:null},this.requestDefeat=!1,this.getGiftDetail()}return l.prototype.getGiftDetail=function(){var l=this,n=this.navParams.get("url");this.appService.httpGet(n).then(function(n){console.log(n),l.giftInfo=n}).catch(function(n){if(l.appService.getToken(n,function(){l.getGiftDetail()}),console.log(n),n.type){l.alertCtrl.create({message:n.message,enableBackdropDismiss:!1,buttons:[{text:"确定",handler:function(){l.viewCtrl.dismiss()}}]}).present()}})},l.prototype.presentConfirm=function(){var l=this;if(this.isAllow){this.isAllow=!1;this.appService.httpPost(""+Ki.API.receiveGift,{giftCode:this.giftInfo.giftCode}).then(function(n){l.isAllow=!0,l.alertLayer()}).catch(function(n){l.appService.getToken(n,function(){l.presentConfirm()}),l.isAllow=!0,console.log(n)})}},l.prototype.alertLayer=function(){var l=this;this.alertCtrl.create({message:"确认兑换完成",enableBackdropDismiss:!1,buttons:[{text:"查看赠品",handler:function(){l.viewCtrl.dismiss({type:"0"})}},{text:"继续扫码",handler:function(){l.viewCtrl.dismiss({type:"1"})}}]}).present()},l}();Da=Object(Pi.__decorate)([Object(Ti.i)({selector:"gift-info",templateUrl:"gift-info.html"}),Object(Pi.__metadata)("design:paramtypes",["function"==typeof(Ca=void 0!==Mi.l&&Mi.l)&&Ca||Object,"function"==typeof(ja=void 0!==Mi.a&&Mi.a)&&ja||Object,"function"==typeof(Aa=void 0!==Mi.q&&Mi.q)&&Aa||Object,"function"==typeof(Ta=void 0!==Mi.m&&Mi.m)&&Ta||Object,"function"==typeof(Pa=void 0!==Ni&&Ni)&&Pa||Object])],Da);var Ca,ja,Aa,Ta,Pa,Ea=function(){function l(l,n,u,t,e){this.navCtrl=l,this.alertCtrl=n,this.viewCtrl=u,this.navParams=t,this.appService=e,this.isAllow=!0,this.orderDetail={orderSeq:null,orderId:"",brandshopName:"",orderItemProductSkuDTOS:[{orderItemSeq:null,prodSeq:null,skuSeq:null,unitPrice:0,number:0,productSkuDTO:{productSeq:null,skuSeq:null,productName:"",fileSeq:null,attrValueList:[{skuSeq:null,attrSeq:null,attrName:"",attrValue:"",type:null,fileSeq:null,price:null,selectedAttrValue:null,invalidAttrValue:null}],fallback:null}}]},this.requestDefeat=!1,this.getOrderDetail()}return l.prototype.getOrderDetail=function(){var l=this,n=this.navParams.get("url");this.appService.httpGet(n).then(function(n){console.log(n),l.orderDetail=n}).catch(function(n){if(console.log(n),l.appService.getToken(n,function(){l.getOrderDetail()}),n.type){l.alertCtrl.create({message:n.message,enableBackdropDismiss:!1,buttons:[{text:"确定",handler:function(){l.viewCtrl.dismiss()}}]}).present()}})},l.prototype.presentConfirm=function(){var l=this;if(this.isAllow){this.isAllow=!1;this.appService.httpPost(""+Ki.API.orderReceive,this.orderDetail.orderSeq).then(function(n){l.isAllow=!0,l.alertLayer()}).catch(function(n){l.appService.getToken(n,function(){l.presentConfirm()}),l.isAllow=!0,console.log(n)})}},l.prototype.alertLayer=function(){var l=this;this.alertCtrl.create({message:"确认提货完成",enableBackdropDismiss:!1,buttons:[{text:"查看订单",handler:function(){l.viewCtrl.dismiss({type:"0"})}},{text:"继续扫码",handler:function(){l.viewCtrl.dismiss({type:"1"})}}]}).present()},l}();Ea=Object(Pi.__decorate)([Object(Ti.i)({selector:"order-info",templateUrl:"order-info.html"}),Object(Pi.__metadata)("design:paramtypes",["function"==typeof(Ma=void 0!==Mi.l&&Mi.l)&&Ma||Object,"function"==typeof(La=void 0!==Mi.a&&Mi.a)&&La||Object,"function"==typeof(qa=void 0!==Mi.q&&Mi.q)&&qa||Object,"function"==typeof(Ra=void 0!==Mi.m&&Mi.m)&&Ra||Object,"function"==typeof($a=void 0!==Ni&&Ni)&&$a||Object])],Ea);var Ma,La,qa,Ra,$a,Ga=function(){function l(l,n,u){this.navCtrl=l,this.alertCtrl=n,this.appService=u,this.auditCancelorderArray=[],this.currentPage=1,this.limit=10,this.up=!0,this.down=!1,this.noData=!1,this.start=0,this.showNoMore=!1,this.load={},this.loadingShow=!0,this.requestDefeat=!1,this.showInfinite=!1,this.start=0,this.down=!0,this.up=!1,this.load=Ki.load,this.getAuditCancelorder()}return l.prototype.getAuditCancelorder=function(){var l=this;this.appService.httpGet(Ki.API.getCancelorder+"?deliveryType=1&status=1&start="+this.start+"&limit="+this.limit).then(function(n){l.loadingShow=!1,0==n.count&&0==l.auditCancelorderArray.length?l.noData=!0:(l.noData=!1,l.showInfinite=!0,l.start<n.count?l.up?((u=l.auditCancelorderArray).push.apply(u,n.data),l.start+=l.limit):l.down&&(l.auditCancelorderArray=n.data,l.start+=l.limit):l.showNoMore=!0);var u}).catch(function(n){l.appService.getToken(n,function(){l.getAuditCancelorder()}),l.auditCancelorderArray=[],l.loadingShow=!1,console.log(n),l.showInfinite=!1,l.requestDefeat=!0})},l.prototype.refreshGetSelfGiftList=function(l){var n=this;this.start=0,this.down=!0,this.up=!1,this.showNoMore=!1,this.showInfinite=!0;this.appService.httpGet(Ki.API.getCancelorder+"?deliveryType=1&status=1&start="+this.start+"&limit="+this.limit).then(function(u){l.complete(),0==u.count?n.noData=!0:(n.noData=!1,n.showInfinite=!0,0!=u.data.length?(n.auditCancelorderArray=u.data,n.start+=n.limit):n.showNoMore=!0)}).catch(function(u){n.appService.getToken(u,function(){n.refreshGetSelfGiftList(l)}),n.auditCancelorderArray=[],l.complete(),console.log(u),n.showInfinite=!1,n.requestDefeat=!0})},l.prototype.infiniteGetSelfGiftList=function(l){var n=this;this.down=!1,this.up=!0;this.appService.httpGet(Ki.API.getCancelorder+"?deliveryType=1&status=1&start="+this.start+"&limit="+this.limit).then(function(u){l.complete(),0==u.count?n.noData=!0:(n.noData=!1,0!=u.data.length?((t=n.auditCancelorderArray).push.apply(t,u.data),n.start+=n.limit):n.showNoMore=!0);var t}).catch(function(u){n.appService.getToken(u,function(){n.infiniteGetSelfGiftList(l)}),l.complete(),console.log(u),n.appService.toast("网络异常，请稍后再试",1e3,"middle")})},l.prototype.requestDefeatRefresh=function(){this.requestDefeat=!1,this.loadingShow=!0,this.start=0,this.down=!0,this.up=!1,this.getAuditCancelorder()},l}();Ga=Object(Pi.__decorate)([Object(Ti.i)({selector:"audit-cancelorder",templateUrl:"audit-cancelorder.html"}),Object(Pi.__metadata)("design:paramtypes",["function"==typeof(Ka=void 0!==Mi.l&&Mi.l)&&Ka||Object,"function"==typeof(Na=void 0!==Mi.a&&Mi.a)&&Na||Object,"function"==typeof(Fa=void 0!==Ni&&Ni)&&Fa||Object])],Ga);var Ka,Na,Fa,Ua=function(){function l(l,n,u,t,e){this.navCtrl=l,this.modalCtrl=n,this.alertCtrl=u,this.toastCtrl=t,this.appService=e,this.unauditCancelorderArray=[],this.limit=10,this.up=!0,this.down=!1,this.noData=!1,this.start=0,this.showNoMore=!1,this.load={},this.loadingShow=!0,this.requestDefeat=!1,this.showInfinite=!1,this.start=0,this.down=!0,this.up=!1,this.load=Ki.load,this.getUnauditCancelorder()}return l.prototype.auditOrder=function(l){var n=this;this.alertCtrl.create({message:"同意会员"+this.unauditCancelorderArray[l].memberMobile+"的订单"+this.unauditCancelorderArray[l].orderId+"取消申请？",buttons:[{text:"拒绝",handler:function(){n.start=0,n.down=!0,n.up=!1;var u=n.appService.loading();u.present();n.appService.httpPost(Ki.API.auditCancelOrder+"?id="+n.unauditCancelorderArray[l].orderSeq+"&isAgree=0",null).then(function(l){"success"==l.type&&(u.dismiss(),n.getUnauditCancelorder())}).catch(function(l){u.dismiss(),console.log(l),n.appService.toast("操作失败，请稍后重试",1e3,"middle")})}},{text:"通过",handler:function(){n.start=0,n.down=!0,n.up=!1;var u=n.appService.loading();u.present();n.appService.httpPost(Ki.API.auditCancelOrder+"?id="+n.unauditCancelorderArray[l].orderSeq+"&isAgree=1",null).then(function(l){"success"==l.type&&(u.dismiss(),n.getUnauditCancelorder())}).catch(function(l){u.dismiss(),console.log(l),n.appService.toast("操作失败",1e3,"middle")})}}]}).present()},l.prototype.goAuditCancel=function(){this.modalCtrl.create(Ga).present()},l.prototype.getUnauditCancelorder=function(){var l=this;this.appService.httpGet(Ki.API.getCancelorder+"?deliveryType=1&status=0&start="+this.start+"&limit="+this.limit).then(function(n){l.loadingShow=!1,0==n.count&&0==l.unauditCancelorderArray.length?l.noData=!0:(l.noData=!1,l.showInfinite=!0,l.start<n.count?l.up?((u=l.unauditCancelorderArray).push.apply(u,n.data),l.start+=l.limit):l.down&&(l.unauditCancelorderArray=n.data,l.start+=l.limit,l.content.scrollTo(0,0,0)):l.showNoMore=!0);var u}).catch(function(n){l.appService.getToken(n,function(){l.getUnauditCancelorder()}),l.loadingShow=!1,console.log(n),l.requestDefeat=!0,l.showInfinite=!1})},l.prototype.refreshMore=function(l){var n=this;this.start=0,this.down=!0,this.up=!1;this.appService.httpGet(Ki.API.getCancelorder+"?deliveryType=1&status=0&start="+this.start+"&limit="+this.limit).then(function(u){l.complete(),0==u.count?n.noData=!0:(n.noData=!1,n.showInfinite=!0,0!=u.data.length?(n.unauditCancelorderArray=u.data,n.start+=n.limit):n.showNoMore=!0)}).catch(function(u){n.appService.getToken(u,function(){n.refreshMore(l)}),l.complete(),console.log(u),n.requestDefeat=!0,n.showInfinite=!1})},l.prototype.loadMore=function(l){var n=this;this.down=!1,this.up=!0;this.appService.httpGet(Ki.API.getCancelorder+"?deliveryType=1&status=0&start="+this.start+"&limit="+this.limit).then(function(u){l.complete(),0==u.count?n.noData=!0:(n.noData=!1,n.showInfinite=!0,0!=u.data.length?((t=n.unauditCancelorderArray).push.apply(t,u.data),n.start+=n.limit):n.showNoMore=!0);var t}).catch(function(u){n.appService.getToken(u,function(){n.loadMore(l)}),l.complete(),console.log(u),n.requestDefeat=!0,n.showInfinite=!1})},l.prototype.requestDefeatRefresh=function(){this.requestDefeat=!1,this.loadingShow=!0,this.start=0,this.down=!0,this.up=!1,this.getUnauditCancelorder()},l}();Object(Pi.__decorate)([Object(Ti.N)(Mi.c),Object(Pi.__metadata)("design:type","function"==typeof(za=void 0!==Mi.c&&Mi.c)&&za||Object)],Ua.prototype,"content",void 0),Ua=Object(Pi.__decorate)([Object(Ti.i)({selector:"unaudit-cancelorder",templateUrl:"unaudit-cancelorder.html"}),Object(Pi.__metadata)("design:paramtypes",["function"==typeof(Va=void 0!==Mi.l&&Mi.l)&&Va||Object,"function"==typeof(Ba=void 0!==Mi.j&&Mi.j)&&Ba||Object,"function"==typeof(Ha=void 0!==Mi.a&&Mi.a)&&Ha||Object,"function"==typeof(Ya=void 0!==Mi.p&&Mi.p)&&Ya||Object,"function"==typeof(Wa=void 0!==Ni&&Ni)&&Wa||Object])],Ua);var za,Va,Ba,Ha,Ya,Wa,Xa=function(){function l(l,n,u,t){this.navCtrl=l,this.alertCtrl=n,this.navParams=u,this.appService=t,this.load={},this.loadingShow=!0,this.returnedDetail={orderReturn:{orderReturnSeq:"",returnOrderId:"",invoiced:"",detail:"",mobile:"",number:"",name:"",returnType:"",totalReturnPrice:"",status:"",returnReason:""},order:{orderSeq:"",orderId:"",payAmount:""},itemProductSkuDTO:{orderItemSeq:null,prodSeq:null,skuSeq:null,unitPrice:null,number:null,productSkuDTO:{productSeq:null,skuSeq:null,unitPrice:"",number:"",productName:"",fileName:"",attrValueList:[{skuSeq:null,attrSeq:null,attrName:"",attrValue:"",type:null,fileSeq:null,price:null,selectedAttrValue:null,invalidAttrValue:null},{skuSeq:null,attrSeq:null,attrName:"",attrValue:"",type:null,fileSeq:null,price:null,selectedAttrValue:null,invalidAttrValue:null}],fallback:null}},returnAmount:null},this.listIndexId=this.navParams.get("indexId"),this.orderStatus=this.navParams.get("status"),this.load=Ki.load,this.getReturnedDetailList()}return l.prototype.getReturnedDetailList=function(){var l=this;this.appService.httpGet(Ki.API.returnDetail+"?id="+this.listIndexId).then(function(n){l.loadingShow=!1,l.returnedDetail=n,l.returnedDetail.orderReturn.imageIds&&(l.imageArray=l.returnedDetail.orderReturn.imageIds.split(","))}).catch(function(n){l.appService.getToken(n,function(){l.getReturnedDetailList()}),l.loadingShow=!1,console.log(n),l.appService.toast("网络异常，请稍后再试",1e3,"middle")})},l}();Xa=Object(Pi.__decorate)([Object(Ti.i)({selector:"returned-detail",templateUrl:"returned-detail.html"}),Object(Pi.__metadata)("design:paramtypes",["function"==typeof(Ja=void 0!==Mi.l&&Mi.l)&&Ja||Object,"function"==typeof(Qa=void 0!==Mi.a&&Mi.a)&&Qa||Object,"function"==typeof(Za=void 0!==Mi.m&&Mi.m)&&Za||Object,"function"==typeof(lo=void 0!==Ni&&Ni)&&lo||Object])],Xa);var Ja,Qa,Za,lo,no=function(){function l(l,n,u,t){this.navCtrl=l,this.modalCtrl=n,this.alertCtrl=u,this.appService=t,this.auditReturnorderArray=[],this.limit=10,this.up=!0,this.down=!1,this.noData=!1,this.start=0,this.showNoMore=!1,this.load={},this.loadingShow=!0,this.requestDefeat=!1,this.showInfinite=!1,this.up=!1,this.down=!0,this.load=Ki.load,this.getAuditReturnorderList()}return l.prototype.goReturnedDetail=function(l){this.modalCtrl.create(Xa,{indexId:this.auditReturnorderArray[l].orderReturnSeq,status:this.auditReturnorderArray[l].status}).present()},l.prototype.getAuditReturnorderList=function(){var l=this;this.appService.httpGet(Ki.API.getReturnorderList+"?deliveryType=1&status=1&start="+this.start+"&limit="+this.limit).then(function(n){l.loadingShow=!1,0==n.count&&0==l.auditReturnorderArray.length?l.noData=!0:(l.noData=!1,l.showInfinite=!0,l.start<n.count?l.up?((u=l.auditReturnorderArray).push.apply(u,n.data),l.start+=l.limit):l.down&&(l.auditReturnorderArray=n.data,l.start+=l.limit):l.showNoMore=!0);var u}).catch(function(n){l.appService.getToken(n,function(){l.getAuditReturnorderList()}),l.auditReturnorderArray=[],l.loadingShow=!1,console.log(n),l.showInfinite=!1,l.requestDefeat=!0})},l.prototype.doRefresh=function(l){var n=this;this.start=0,this.down=!0,this.up=!1,this.showNoMore=!1,this.showInfinite=!0;this.appService.httpGet(Ki.API.getReturnorderList+"?deliveryType=1&status=1&start="+this.start+"&limit="+this.limit).then(function(u){l.complete(),0==u.count?n.noData=!0:(n.noData=!1,n.showInfinite=!0,0!=u.data.length?(n.auditReturnorderArray=u.data,n.start+=n.limit):n.showNoMore=!0)}).catch(function(u){n.appService.getToken(u,function(){n.doRefresh(l)}),n.auditReturnorderArray=[],l.complete(),console.log(u),n.showInfinite=!1,n.requestDefeat=!0})},l.prototype.infiniteGetSelfGiftList=function(l){var n=this;this.down=!1,this.up=!0;this.appService.httpGet(Ki.API.getReturnorderList+"?deliveryType=1&status=1&start="+this.start+"&limit="+this.limit).then(function(u){l.complete(),0==u.count?n.noData=!0:(n.noData=!1,0!=u.data.length?((t=n.auditReturnorderArray).push.apply(t,u.data),n.start+=n.limit):n.showNoMore=!0);var t}).catch(function(u){n.appService.getToken(u,function(){n.infiniteGetSelfGiftList(l)}),l.complete(),console.log(u),n.appService.toast("网络异常，请稍后再试",1e3,"middle")})},l.prototype.requestDefeatRefresh=function(){this.requestDefeat=!1,this.loadingShow=!0,this.start=0,this.down=!0,this.up=!1,this.getAuditReturnorderList()},l}();no=Object(Pi.__decorate)([Object(Ti.i)({selector:"audit-returnorder",templateUrl:"audit-returnorder.html"}),Object(Pi.__metadata)("design:paramtypes",["function"==typeof(uo=void 0!==Mi.l&&Mi.l)&&uo||Object,"function"==typeof(to=void 0!==Mi.j&&Mi.j)&&to||Object,"function"==typeof(eo=void 0!==Mi.a&&Mi.a)&&eo||Object,"function"==typeof(io=void 0!==Ni&&Ni)&&io||Object])],no);var uo,to,eo,io,ao=function(){function l(l,n,u,t,e){this.navCtrl=l,this.viewCtrl=n,this.alertCtrl=u,this.navParams=t,this.appService=e,this.returnDetail={orderReturn:{orderReturnSeq:"",returnOrderId:"",invoiced:"",detail:"",mobile:"",number:"",name:"",returnType:"",totalReturnPrice:"",status:"",returnReason:""},order:{orderSeq:"",orderId:"",payAmount:""},itemProductSkuDTO:{orderItemSeq:null,prodSeq:null,skuSeq:null,unitPrice:null,number:null,productSkuDTO:{productSeq:null,skuSeq:null,unitPrice:"",number:"",productName:"",fileName:"",attrValueList:[{skuSeq:null,attrSeq:null,attrName:"",attrValue:"",type:null,fileSeq:null,price:null,selectedAttrValue:null,invalidAttrValue:null},{skuSeq:null,attrSeq:null,attrName:"",attrValue:"",type:null,fileSeq:null,price:null,selectedAttrValue:null,invalidAttrValue:null}],fallback:null}},returnAmount:null},this.load={},this.loadingShow=!0,this.productId=this.navParams.get("productId"),this.load=Ki.load,this.getReturnDetailList()}return l.prototype.getReturnDetailList=function(){var l=this;this.appService.httpGet(Ki.API.returnDetail+"?id="+this.productId).then(function(n){l.loadingShow=!1,l.returnDetail=n,l.returnDetail.orderReturn.imageIds&&(l.imageArray=l.returnDetail.orderReturn.imageIds.split(","))}).catch(function(n){l.appService.getToken(n,function(){l.getReturnDetailList()}),l.loadingShow=!1,console.log(n),l.appService.toast("网络异常，请稍后再试",1e3,"middle")})},l.prototype.agreeReturn=function(){var l=this;this.alertCtrl.create({message:"退货数量: "+this.returnDetail.orderReturn.number+"<span>拟退款金额："+this.returnDetail.returnAmount+" 元</span>",buttons:[{text:"取消",handler:function(){}},{text:"确认",handler:function(){var n=l.appService.loading();n.present();l.appService.httpPost(Ki.API.auditReturnOrder+"?id="+l.productId+"&isAgree=1&totalReturnPrice="+l.returnDetail.returnAmount,null).then(function(u){"success"==u.type&&(n.dismiss(),l.viewCtrl.dismiss())}).catch(function(u){n.dismiss(),console.log(u),l.appService.toast("操作失败，请稍后再试",1e3,"middle")})}}],cssClass:"detail-alert"}).present()},l.prototype.refuseReturn=function(){var l=this;this.alertCtrl.create({message:"确认拒绝会员"+this.returnDetail.orderReturn.mobile+"的订单"+this.returnDetail.orderReturn.returnOrderId+"退货申请？",buttons:[{text:"取消",handler:function(){}},{text:"确认",handler:function(){var n=l.appService.loading();n.present();l.appService.httpPost(Ki.API.auditReturnOrder+"?id="+l.productId+"&isAgree=0&totalReturnPrice="+l.returnDetail.returnAmount,null).then(function(u){"success"==u.type&&(n.dismiss(),l.viewCtrl.dismiss())}).catch(function(u){n.dismiss(),console.log(u),l.appService.toast("操作失败，请稍后再试",1e3,"middle")})}}]}).present()},l}();ao=Object(Pi.__decorate)([Object(Ti.i)({selector:"return-detail",templateUrl:"return-detail.html"}),Object(Pi.__metadata)("design:paramtypes",["function"==typeof(oo=void 0!==Mi.l&&Mi.l)&&oo||Object,"function"==typeof(ro=void 0!==Mi.q&&Mi.q)&&ro||Object,"function"==typeof(so=void 0!==Mi.a&&Mi.a)&&so||Object,"function"==typeof(co=void 0!==Mi.m&&Mi.m)&&co||Object,"function"==typeof(_o=void 0!==Ni&&Ni)&&_o||Object])],ao);var oo,ro,so,co,_o,po=function(){function l(l,n,u,t){this.navCtrl=l,this.modalCtrl=n,this.alertCtrl=u,this.appService=t,this.unauditReturnorderArray=[],this.limit=10,this.up=!0,this.down=!1,this.noData=!1,this.start=0,this.showNoMore=!1,this.load={},this.loadingShow=!0,this.requestDefeat=!1,this.showInfinite=!1,this.load=Ki.load,this.getUnauditReturnorderList()}return l.prototype.confirmReturn=function(l){var n=this;this.alertCtrl.create({message:"确认已收到会员"+this.unauditReturnorderArray[l].mobile+"的订单"+this.unauditReturnorderArray[l].orderId+"的"+this.unauditReturnorderArray[l].number+"件退货商品？",buttons:[{text:"取消",handler:function(){}},{text:"确认",handler:function(){var u=n.appService.loading();u.present();n.appService.httpPost(Ki.API.returnReceived+"?id="+n.unauditReturnorderArray[l].orderReturnSeq,null).then(function(l){u.dismiss(),"success"==l.type&&(n.start=0,n.up=!1,n.down=!0,n.getUnauditReturnorderList())}).catch(function(l){u.dismiss(),console.log(l),n.appService.toast("操作失败，请稍后再试",1e3,"middle")})}}]}).present()},l.prototype.auditReturn=function(l){var n=this,u=this.modalCtrl.create(ao,{productId:this.unauditReturnorderArray[l].orderReturnSeq});u.onDidDismiss(function(){n.start=0,n.down=!0,n.up=!1,n.getUnauditReturnorderList()}),u.present()},l.prototype.goAuditReturn=function(){this.modalCtrl.create(no).present()},l.prototype.getUnauditReturnorderList=function(){var l=this;this.appService.httpGet(Ki.API.getReturnorderList+"?deliveryType=1&status=0&start="+this.start+"&limit="+this.limit).then(function(n){l.loadingShow=!1,0==n.count&&0==l.unauditReturnorderArray.length?l.noData=!0:(l.noData=!1,l.showInfinite=!0,l.start<n.count?l.up?((u=l.unauditReturnorderArray).push.apply(u,n.data),l.start+=l.limit):l.down&&(l.unauditReturnorderArray=n.data,l.start+=l.limit):l.showNoMore=!0);var u}).catch(function(n){l.appService.getToken(n,function(){l.getUnauditReturnorderList()}),l.loadingShow=!1,console.log(n),l.requestDefeat=!0,l.showInfinite=!1})},l.prototype.doRefresh=function(l){var n=this;this.start=0,this.up=!1,this.down=!0;this.appService.httpGet(Ki.API.getReturnorderList+"?deliveryType=1&status=0&start="+this.start+"&limit="+this.limit).then(function(u){l.complete(),0==u.count?n.noData=!0:(n.noData=!1,n.showInfinite=!0,0!=u.data.length?(n.unauditReturnorderArray=u.data,n.start+=n.limit):n.showNoMore=!0)}).catch(function(u){n.appService.getToken(u,function(){n.doRefresh(l)}),l.complete(),console.log(u),n.requestDefeat=!0,n.showInfinite=!1})},l.prototype.infiniteGetSelfGiftList=function(l){var n=this;this.up=!0,this.down=!1,this.up=!0;this.appService.httpGet(Ki.API.getReturnorderList+"?deliveryType=1&status=0&start="+this.start+"&limit="+this.limit).then(function(u){l.complete(),0==u.count?n.noData=!0:(n.noData=!1,n.showInfinite=!0,0!=u.data.length?((t=n.unauditReturnorderArray).push.apply(t,u.data),n.start+=n.limit):n.showNoMore=!0);var t}).catch(function(u){n.appService.getToken(u,function(){n.infiniteGetSelfGiftList(l)}),l.complete(),console.log(u),n.requestDefeat=!0,n.showInfinite=!1})},l.prototype.requestDefeatRefresh=function(){this.requestDefeat=!1,this.loadingShow=!0,this.start=0,this.down=!0,this.up=!1,this.getUnauditReturnorderList()},l}();po=Object(Pi.__decorate)([Object(Ti.i)({selector:"unaudit-returnorder",templateUrl:"unaudit-returnorder.html"}),Object(Pi.__metadata)("design:paramtypes",["function"==typeof(fo=void 0!==Mi.l&&Mi.l)&&fo||Object,"function"==typeof(ho=void 0!==Mi.j&&Mi.j)&&ho||Object,"function"==typeof(go=void 0!==Mi.a&&Mi.a)&&go||Object,"function"==typeof(mo=void 0!==Ni&&Ni)&&mo||Object])],po);var fo,ho,go,mo,vo=function(){function l(l,n,u,t,e){this.navCtrl=l,this.alertCtrl=n,this.navParams=u,this.appService=t,this.modalCtrl=e,this.orderCancel=Ua,this.orderReturn=po,this.unauditCancelorderArray=[],this.unauditReturnorderArray=[],this.limit=10,this.noData=!1,this.start=0,this.showNoMore=!1,this.load={},this.loadingShow=!0,this.currentIndex=0,this.requestDefeat=!1,this.showInfinite=!1,this.start=0,this.down=!0,this.up=!1,this.load=Ki.load,this.currentStatus="待审核取消订单",this.cancelOrderCount=u.get("cancelOrderCount"),this.returnOrderCount=u.get("returnOrderCount"),this.statusList=[{label:"待审核取消订单",num:this.cancelOrderCount},{label:"待处理退货订单",num:this.returnOrderCount}],this.getUnauditCancelorder()}return l.prototype.getUnauditCancelorder=function(){var l=this;this.loadingShow=!0,this.showNoMore=!1,this.noData=!1,this.requestDefeat=!1;this.appService.httpGet(Ki.API.getCancelorder+"?deliveryType=1&status=0&start="+this.start+"&limit="+this.limit).then(function(n){l.loadingShow=!1,l.statusList[0].num=n.count,l.start<n.count?(l.showNoMore=!1,l.noData=!1,l.start+=l.limit,l.showInfinite=!0,l.up?(u=l.unauditCancelorderArray).push.apply(u,n.data):l.down&&(l.unauditCancelorderArray=n.data)):0==n.count?(l.noData=!0,l.showNoMore=!1,l.unauditCancelorderArray=[]):0==n.data.length&&(l.noData=!1,l.showNoMore=!0);var u}).catch(function(n){l.appService.getToken(n,function(){l.getUnauditCancelorder()}),l.unauditCancelorderArray=[],l.loadingShow=!1,console.log(n),l.showInfinite=!1,l.requestDefeat=!0})},l.prototype.auditOrder=function(l){var n=this;this.alertCtrl.create({message:"同意会员"+this.unauditCancelorderArray[l].memberMobile+"的订单"+this.unauditCancelorderArray[l].orderId+"取消申请？",buttons:[{text:"拒绝",handler:function(){n.start=0,n.down=!0,n.up=!1;var u=n.appService.loading();u.present();n.appService.httpPost(Ki.API.auditCancelOrder+"?id="+n.unauditCancelorderArray[l].orderSeq+"&isAgree=0",null).then(function(l){"success"==l.type&&(u.dismiss(),n.getUnauditCancelorder())}).catch(function(l){u.dismiss(),console.log(l),n.appService.toast("操作失败，请稍后重试",1e3,"middle")})}},{text:"通过",handler:function(){n.start=0,n.down=!0,n.up=!1;var u=n.appService.loading();u.present();n.appService.httpPost(Ki.API.auditCancelOrder+"?id="+n.unauditCancelorderArray[l].orderSeq+"&isAgree=1",null).then(function(l){"success"==l.type&&(u.dismiss(),n.getUnauditCancelorder())}).catch(function(l){u.dismiss(),console.log(l),n.appService.toast("操作失败",1e3,"middle")})}}]}).present()},l.prototype.goAuditCancel=function(){this.modalCtrl.create(Ga).present()},l.prototype.getUnauditReturnorderList=function(){var l=this;this.loadingShow=!0,this.showNoMore=!1,this.noData=!1,this.requestDefeat=!1;this.appService.httpGet(Ki.API.getReturnorderList+"?deliveryType=1&status=0&start="+this.start+"&limit="+this.limit).then(function(n){l.loadingShow=!1,l.statusList[1].num=n.count,l.start<n.count?(l.showNoMore=!1,l.noData=!1,l.start+=l.limit,l.showInfinite=!0,l.up?(u=l.unauditReturnorderArray).push.apply(u,n.data):l.down&&(l.unauditReturnorderArray=n.data)):0==n.count?(l.noData=!0,l.showNoMore=!1,l.unauditReturnorderArray=[]):0==n.data.length&&(l.noData=!1,l.showNoMore=!0);var u}).catch(function(n){l.appService.getToken(n,function(){l.getUnauditReturnorderList()}),l.unauditReturnorderArray=[],l.loadingShow=!1,console.log(n),l.showInfinite=!1,l.requestDefeat=!0})},l.prototype.confirmReturn=function(l){var n=this;this.alertCtrl.create({message:"确认已收到会员"+this.unauditReturnorderArray[l].mobile+"的订单"+this.unauditReturnorderArray[l].orderId+"的"+this.unauditReturnorderArray[l].number+"件退货商品？",buttons:[{text:"取消",handler:function(){}},{text:"确认",handler:function(){var u=n.appService.loading();u.present();n.appService.httpPost(Ki.API.returnReceived+"?id="+n.unauditReturnorderArray[l].orderReturnSeq,null).then(function(l){u.dismiss(),"success"==l.type&&(n.start=0,n.up=!1,n.down=!0,n.getUnauditReturnorderList())}).catch(function(l){u.dismiss(),console.log(l),n.appService.toast("操作失败，请稍后再试",1e3,"middle")})}}]}).present()},l.prototype.auditReturn=function(l){var n=this,u=this.modalCtrl.create(ao,{productId:this.unauditReturnorderArray[l].orderReturnSeq});u.onDidDismiss(function(){n.start=0,n.down=!0,n.up=!1,n.getUnauditReturnorderList()}),u.present()},l.prototype.goAuditReturn=function(){this.modalCtrl.create(no).present()},l.prototype.doRefresh=function(l){var n=this;this.start=0,this.down=!0,this.up=!1,this.requestDefeat=!1,setTimeout(function(){0==n.currentIndex?n.getUnauditCancelorder():n.getUnauditReturnorderList(),l.complete()},Ki.LOAD_TIME),this.showNoMore=!1},l.prototype.loadMore=function(l){var n=this;if(0==this.currentIndex){this.appService.httpGet(Ki.API.getCancelorder+"?deliveryType=1&status=0&start="+this.start+"&limit="+this.limit).then(function(u){l.complete(),0==u.count?n.noData=!0:(n.noData=!1,n.showInfinite=!0,0!=u.data.length?((t=n.unauditCancelorderArray).push.apply(t,u.data),n.start+=n.limit):n.showNoMore=!0);var t}).catch(function(u){n.appService.getToken(u,function(){n.loadMore(l)}),l.complete(),console.log(u),n.appService.toast("网络异常，请稍后再试",1e3,"middle")})}else{this.appService.httpGet(Ki.API.getReturnorderList+"?deliveryType=1&status=0&start="+this.start+"&limit="+this.limit).then(function(u){l.complete(),0==u.count?n.noData=!0:(n.noData=!1,n.showInfinite=!0,0!=u.data.length?((t=n.unauditReturnorderArray).push.apply(t,u.data),n.start+=n.limit):n.showNoMore=!0);var t}).catch(function(u){n.appService.getToken(u,function(){n.loadMore(l)}),l.complete(),console.log(u),n.appService.toast("网络异常，请稍后再试",1e3,"middle")})}},l.prototype.getCurrentStatus=function(l){this.start=0,this.up=!1,this.down=!0,this.content.scrollTo(0,0,0),this.currentStatus=this.statusList[l].label,this.currentIndex=l,this.requestDefeat=!1,0==this.currentIndex?this.getUnauditCancelorder():this.getUnauditReturnorderList()},l.prototype.requestDefeatRefreshReturnorder=function(){this.requestDefeat=!1,this.loadingShow=!0,this.start=0,this.down=!0,this.up=!1,this.getUnauditReturnorderList()},l.prototype.requestDefeatRefreshCancelorder=function(){this.requestDefeat=!1,this.loadingShow=!0,this.start=0,this.down=!0,this.up=!1,this.getUnauditCancelorder()},l}();Object(Pi.__decorate)([Object(Ti.N)(Mi.c),Object(Pi.__metadata)("design:type","function"==typeof(bo=void 0!==Mi.c&&Mi.c)&&bo||Object)],vo.prototype,"content",void 0),vo=Object(Pi.__decorate)([Object(Ti.i)({selector:"unaudit-tabs",templateUrl:"unaudit-tabs.html"}),Object(Pi.__metadata)("design:paramtypes",["function"==typeof(wo=void 0!==Mi.l&&Mi.l)&&wo||Object,"function"==typeof(yo=void 0!==Mi.a&&Mi.a)&&yo||Object,"function"==typeof(So=void 0!==Mi.m&&Mi.m)&&So||Object,"function"==typeof(Io=void 0!==Ni&&Ni)&&Io||Object,"function"==typeof(Oo=void 0!==Mi.j&&Mi.j)&&Oo||Object])],vo);var bo,wo,yo,So,Io,Oo,xo=function(){function l(l,n,u){this.navCtrl=l,this.alertCtrl=n,this.appService=u,this.handleSeflGiftArray=[],this.start=0,this.limit=10,this.showNoMore=!1,this.load={},this.loadingShow=!0,this.requestDefeat=!1,this.showInfinite=!1,this.down=!0,this.up=!1,this.load=Ki.load}return l.prototype.ionViewDidEnter=function(){setTimeout(this.getHandleSelfGiftList(),100)},l.prototype.getHandleSelfGiftList=function(){var l=this;this.appService.httpGet(Ki.API.getGiftList+"?type=2&start="+this.start+"&limit="+this.limit).then(function(n){l.loadingShow=!1,0==n.count?l.noData=!0:(l.noData=!1,l.showInfinite=!0,l.start<n.count?l.up?((u=l.handleSeflGiftArray).push.apply(u,n.data),l.start+=l.limit):l.down&&(l.handleSeflGiftArray=n.data,l.start+=l.limit,l.content.scrollTo(0,0,0)):l.showNoMore=!0);var u}).catch(function(n){l.appService.getToken(n,function(){l.getHandleSelfGiftList()}),l.loadingShow=!1,console.log(n),l.showInfinite=!1,l.requestDefeat=!0})},l.prototype.refreshGetHandleSelfGiftList=function(l){var n=this;this.start=0,this.down=!0,this.up=!1,this.showNoMore=!1,this.showInfinite=!0;this.appService.httpGet(Ki.API.getGiftList+"?type=2&start="+this.start+"&limit="+this.limit).then(function(u){l.complete(),0==u.count?n.noData=!0:(n.noData=!1,n.showInfinite=!0,0!=u.data.length?(n.handleSeflGiftArray=u.data,n.start+=n.limit):n.showNoMore=!0)}).catch(function(u){n.appService.getToken(u,function(){n.refreshGetHandleSelfGiftList(l)}),n.handleSeflGiftArray=[],l.complete(),console.log(u),n.showInfinite=!1,n.requestDefeat=!0})},l.prototype.infiniteGetHandleSelfGiftList=function(l){var n=this;this.down=!1,this.up=!0;this.appService.httpGet(Ki.API.getGiftList+"?type=2&start="+this.start+"&limit="+this.limit).then(function(u){l.complete(),0==u.count?n.noData=!0:(n.noData=!1,0!=u.data.length?((t=n.handleSeflGiftArray).push.apply(t,u.data),n.start+=n.limit):n.showNoMore=!0);var t}).catch(function(u){n.appService.getToken(u,function(){n.infiniteGetHandleSelfGiftList(l)}),l.complete(),console.log(u),n.appService.toast("网络异常，请稍后再试",1e3,"middle")})},l.prototype.requestDefeatRefresh=function(){this.requestDefeat=!1,this.loadingShow=!0,this.start=0,this.down=!0,this.up=!1,this.getHandleSelfGiftList()},l}();Object(Pi.__decorate)([Object(Ti.N)(Mi.c),Object(Pi.__metadata)("design:type","function"==typeof(ko=void 0!==Mi.c&&Mi.c)&&ko||Object)],xo.prototype,"content",void 0),xo=Object(Pi.__decorate)([Object(Ti.i)({selector:"handle-selfgift",templateUrl:"handle-selfgift.html"}),Object(Pi.__metadata)("design:paramtypes",["function"==typeof(Do=void 0!==Mi.l&&Mi.l)&&Do||Object,"function"==typeof(Co=void 0!==Mi.a&&Mi.a)&&Co||Object,"function"==typeof(jo=void 0!==Ni&&Ni)&&jo||Object])],xo);var ko,Do,Co,jo,Ao=function(){function l(l,n,u){this.navCtrl=l,this.alertCtrl=n,this.appService=u,this.start=0,this.limit=10,this.showNoMore=!1,this.up=!0,this.down=!1,this.noData=!1,this.load={},this.loadingShow=!0,this.requestDefeat=!1,this.showInfinite=!1,this.down=!0,this.up=!1,this.load=Ki.load}return l.prototype.ionViewDidEnter=function(){setTimeout(this.getHandleExpressGiftList(),100)},l.prototype.getHandleExpressGiftList=function(){var l=this;this.appService.httpGet(Ki.API.getGiftList+"?type=3&start="+this.start+"&limit="+this.limit).then(function(n){l.loadingShow=!1,0==n.count?l.noData=!0:(l.noData=!1,l.showInfinite=!0,l.start<n.count?l.up?((u=l.handleExpressGiftArray).push.apply(u,n.data),l.start+=l.limit):l.down&&(l.handleExpressGiftArray=n.data,l.start+=l.limit,l.content.scrollTo(0,0,0)):l.showNoMore=!0);var u}).catch(function(n){l.appService.getToken(n,function(){l.getHandleExpressGiftList()}),l.handleExpressGiftArray=[],l.loadingShow=!1,console.log(n),l.showInfinite=!1,l.requestDefeat=!0})},l.prototype.refreshGetHandleExpressGiftList=function(l){var n=this;this.start=0,this.down=!0,this.up=!1,this.showNoMore=!1,this.showInfinite=!0;this.appService.httpGet(Ki.API.getGiftList+"?type=3&start="+this.start+"&limit="+this.limit).then(function(u){l.complete(),0==u.count?n.noData=!0:(n.noData=!1,n.showInfinite=!0,0!=u.data.length?(n.handleExpressGiftArray=u.data,n.start+=n.limit):n.showNoMore=!0)}).catch(function(u){n.appService.getToken(u,function(){n.refreshGetHandleExpressGiftList(l)}),n.handleExpressGiftArray=[],l.complete(),console.log(u),n.showInfinite=!1,n.requestDefeat=!0})},l.prototype.infiniteGetHandleExpressGiftList=function(l){var n=this;this.down=!1,this.up=!0;this.appService.httpGet(Ki.API.getGiftList+"?type=3&start="+this.start+"&limit="+this.limit).then(function(u){l.complete(),0==u.count?n.noData=!0:(n.noData=!1,0!=u.data.length?((t=n.handleExpressGiftArray).push.apply(t,u.data),n.start+=n.limit):n.showNoMore=!0);var t}).catch(function(u){n.appService.getToken(u,function(){n.infiniteGetHandleExpressGiftList(l)}),l.complete(),console.log(u),n.appService.toast("网络异常，请稍后再试",1e3,"middle")})},l.prototype.requestDefeatRefresh=function(){this.requestDefeat=!1,this.loadingShow=!0,this.start=0,this.down=!0,this.up=!1,this.getHandleExpressGiftList()},l}();Object(Pi.__decorate)([Object(Ti.N)(Mi.c),Object(Pi.__metadata)("design:type","function"==typeof(To=void 0!==Mi.c&&Mi.c)&&To||Object)],Ao.prototype,"content",void 0),Ao=Object(Pi.__decorate)([Object(Ti.i)({selector:"handle-expressgift",templateUrl:"handle-expressgift.html"}),Object(Pi.__metadata)("design:paramtypes",["function"==typeof(Po=void 0!==Mi.l&&Mi.l)&&Po||Object,"function"==typeof(Eo=void 0!==Mi.a&&Mi.a)&&Eo||Object,"function"==typeof(Mo=void 0!==Ni&&Ni)&&Mo||Object])],Ao);var To,Po,Eo,Mo,Lo=function(){function l(l,n,u,t,e,i){this.navCtrl=l,this.alertCtrl=n,this.navParams=u,this.appService=t,this.modalCtrl=e,this.zone=i,this.unhandleSeflGiftArray=[],this.unhandleExpressGiftArray=[],this.limit=10,this.noData=!1,this.start=0,this.showNoMore=!1,this.load={},this.loadingShow=!0,this.currentIndex=1,this.reserveShopTimeMin="",this.requestDefeat=!1,this.showInfinite=!1,this.start=0,this.down=!0,this.up=!1,this.load=Ki.load,this.reserveShopTimeMin=this.appService.reserveDate(),this.currentStatus="快递到家赠品",this.statusList=[{label:"到店自提赠品",num:this.selfGiftCount},{label:"快递到家赠品",num:this.expressGiftCount}],this.getTabCount(),this.getUnhandleExpressGiftList()}return l.prototype.getTabCount=function(){var l=this,n=Ki.API.getGiftList+"?type=1&start="+this.start+"&limit="+this.limit;this.appService.httpGet(Ki.API.getGiftList+"?type=0&start="+this.start+"&limit="+this.limit).then(function(n){l.expressGiftCount=n.count,l.statusList[0].num=n.count}).catch(function(n){l.appService.getToken(n,function(){l.getTabCount()}),l.appService.toast("网络异常，请稍后再试",1e3,"middle")}),this.appService.httpGet(n).then(function(n){l.selfGiftCount=n.count,l.statusList[1].num=n.count}).catch(function(n){l.appService.getToken(n,function(){l.getTabCount()}),l.appService.toast("网络异常，请稍后再试",1e3,"middle")})},l.prototype.getUnhandleSelfGiftList=function(){var l=this;this.loadingShow=!0,this.showNoMore=!1,this.noData=!1,this.requestDefeat=!1;this.appService.httpGet(Ki.API.getGiftList+"?type=0&start="+this.start+"&limit="+this.limit).then(function(n){l.loadingShow=!1,l.statusList[0].num=n.count,l.start<n.count?(l.showNoMore=!1,l.noData=!1,l.start+=l.limit,l.showInfinite=!0,l.up?(u=l.unhandleSeflGiftArray).push.apply(u,n.data):l.down&&(l.unhandleSeflGiftArray=n.data),l.addOrderStatusClass(l.unhandleSeflGiftArray)):0==n.count?(l.noData=!0,l.showNoMore=!1,l.unhandleSeflGiftArray=[]):0==n.data.length&&(l.noData=!1,l.showNoMore=!0);var u}).catch(function(n){l.appService.getToken(n,function(){l.getUnhandleSelfGiftList()}),l.unhandleSeflGiftArray=[],l.loadingShow=!1,console.log(n),l.showInfinite=!1,l.requestDefeat=!0})},l.prototype.addOrderStatusClass=function(l){l.map(function(l){l.className="0"==l.giftType&&"2"==l.status?"unstart":"1"==l.giftType?"unstart":"success"})},l.prototype.goSelfgift=function(){var l=this,n=this.modalCtrl.create(xo);n.onDidDismiss(function(){l.start=0,l.down=!0,l.up=!1,l.getUnhandleSelfGiftList()}),n.present()},l.prototype.clearReserveArriveTime=function(l){this.unhandleSeflGiftArray[l].reserveShopTime=""},l.prototype.reserveAffirm=function(l){var n=this;if(null!=this.unhandleSeflGiftArray[l].reserveShopTime){var u={memberGiftAccountSeq:this.unhandleSeflGiftArray[l].memberGiftAccountSeq,reserveShopTime:new Date(this.unhandleSeflGiftArray[l].reserveShopTime).getTime()},t=this.appService.loading();t.present();this.appService.httpPost(Ki.API.confirmReserveShopTime,u).then(function(l){"success"==l.type&&(n.start=0,n.down=!0,n.up=!1,t.dismiss(),n.appService.toast("预约成功！",1e3,"middle"),n.getUnhandleSelfGiftList())}).catch(function(u){n.appService.getToken(u,function(){n.reserveAffirm(l)}),t.dismiss(),console.log(u.message),n.appService.toast("操作失败，请稍后重试",1e3,"middle")})}else this.appService.toast("请选择会员预约到店时间",1e3,"middle")},l.prototype.scrollTo=function(){this.content.scrollTo(0,0,300)},l.prototype.scrollHandler=function(l){var n=this;this.zone.run(function(){n.toTop=l.scrollTop>=300})},l.prototype.getUnhandleExpressGiftList=function(){var l=this;this.loadingShow=!0,this.showNoMore=!1,this.noData=!1,this.requestDefeat=!1,this.showInfinite=!0;this.appService.httpGet(Ki.API.getGiftList+"?type=1&start="+this.start+"&limit="+this.limit).then(function(n){l.loadingShow=!1,l.statusList[l.currentIndex].num=n.count,l.start<n.count?(l.showNoMore=!1,l.noData=!1,l.start+=l.limit,l.up?(u=l.unhandleExpressGiftArray).push.apply(u,n.data):l.down&&(l.unhandleExpressGiftArray=n.data),l.addOrderStatusClass(l.unhandleExpressGiftArray)):0==n.count?(l.noData=!0,l.showNoMore=!1,l.unhandleExpressGiftArray=[]):0==n.data.length&&(l.noData=!1,l.showNoMore=!0);var u}).catch(function(n){l.appService.getToken(n,function(){l.getUnhandleExpressGiftList()}),l.unhandleExpressGiftArray=[],l.loadingShow=!1,console.log(n),l.showInfinite=!1,l.requestDefeat=!0})},l.prototype.goExpressgift=function(){var l=this,n=this.modalCtrl.create(Ao);n.onDidDismiss(function(){l.start=0,l.down=!0,l.up=!1,l.getUnhandleExpressGiftList()}),n.present()},l.prototype.sendProduct=function(l){var n=this;this.alertCtrl.create({message:"赠品发货确认",inputs:[{name:"companyName",type:"text",placeholder:"请在此输入快递公司名称"},{name:"orderNum",type:"text",placeholder:"请在此输入快递单号"}],buttons:[{text:"取消",handler:function(){}},{text:"确认",handler:function(u){if(""!=u.companyName&&""!=u.orderNum){var t={memberGiftAccountSeq:n.unhandleExpressGiftArray[l].memberGiftAccountSeq,expressCompany:u.companyName,expressNo:u.orderNum},e=n.appService.loading();e.present();n.appService.httpPost(Ki.API.confirmExpressInfo,t).then(function(l){"success"==l.type&&(n.start=0,n.down=!0,n.up=!1,e.dismiss(),n.getUnhandleExpressGiftList())}).catch(function(l){e.dismiss(),console.log(l),n.appService.toast("网络异常，请稍后再试",1e3,"middle")})}else""!=u.companyName?n.appService.toast("请填写快递单号",1e3,"middle"):""!=u.orderNum&&n.appService.toast("请填写公司名称",1e3,"middle")}}]}).present()},l.prototype.doRefresh=function(l){var n=this;this.start=0,this.down=!0,this.up=!1,this.requestDefeat=!1,setTimeout(function(){0==n.currentIndex?n.getUnhandleSelfGiftList():n.getUnhandleExpressGiftList(),l.complete()},Ki.LOAD_TIME),this.showNoMore=!1},l.prototype.loadMore=function(l){var n=this;if(0==this.currentIndex){this.appService.httpGet(Ki.API.getGiftList+"?type=0&start="+this.start+"&limit="+this.limit).then(function(u){l.complete(),0!=u.data.length?((t=n.unhandleSeflGiftArray).push.apply(t,u.data),n.start+=n.limit,n.addOrderStatusClass(n.unhandleSeflGiftArray)):n.showNoMore=!0;var t}).catch(function(u){n.appService.getToken(u,function(){n.loadMore(l)}),l.complete(),console.log(u),n.appService.toast("网络异常，请稍后再试",1e3,"middle")})}else{this.appService.httpGet(Ki.API.getGiftList+"?type=1&start="+this.start+"&limit="+this.limit).then(function(u){l.complete(),0==u.count?n.noData=!0:(n.noData=!1,0!=u.data.length?((t=n.unhandleExpressGiftArray).push.apply(t,u.data),n.start+=n.limit):n.showNoMore=!0);var t}).catch(function(u){n.appService.getToken(u,function(){n.loadMore(l)}),l.complete(),console.log(u),n.appService.toast("网络异常，请稍后再试",1e3,"middle")})}},l.prototype.getCurrentStatus=function(l){this.start=0,this.up=!1,this.down=!0,this.content.scrollTo(0,0,0),this.currentStatus=this.statusList[l].label,this.currentIndex=l,0==this.currentIndex?this.getUnhandleSelfGiftList():this.getUnhandleExpressGiftList()},l.prototype.requestDefeatRefresh=function(){this.requestDefeat=!1,this.loadingShow=!0,this.start=0,this.down=!0,this.up=!1,this.getUnhandleExpressGiftList()},l.prototype.requestDefeatRefreshSelfGift=function(){this.requestDefeat=!1,this.loadingShow=!0,this.start=0,this.down=!0,this.up=!1,this.getUnhandleSelfGiftList()},l.prototype.requestDefeatRefreshExpressGift=function(){this.requestDefeat=!1,this.loadingShow=!0,this.start=0,this.down=!0,this.up=!1,this.getUnhandleExpressGiftList()},l}();Object(Pi.__decorate)([Object(Ti.N)(Mi.c),Object(Pi.__metadata)("design:type","function"==typeof(qo=void 0!==Mi.c&&Mi.c)&&qo||Object)],Lo.prototype,"content",void 0),Lo=Object(Pi.__decorate)([Object(Ti.i)({selector:"unhandle-tabs",templateUrl:"unhandle-tabs.html"}),Object(Pi.__metadata)("design:paramtypes",["function"==typeof(Ro=void 0!==Mi.l&&Mi.l)&&Ro||Object,"function"==typeof($o=void 0!==Mi.a&&Mi.a)&&$o||Object,"function"==typeof(Go=void 0!==Mi.m&&Mi.m)&&Go||Object,"function"==typeof(Ko=void 0!==Ni&&Ni)&&Ko||Object,"function"==typeof(No=void 0!==Mi.j&&Mi.j)&&No||Object,"function"==typeof(Fo=void 0!==Ti.x&&Ti.x)&&Fo||Object])],Lo);var qo,Ro,$o,Go,Ko,No,Fo,Uo=function(){function l(l,n,u,t,e){this.modalCtrl=l,this.navCtrl=n,this.appService=u,this.alertCtrl=t,this.events=e,this.cancelOrderCount=0,this.returnOrderCount=0,this.selfGiftCount=0,this.expressgiftCount=0,this.getUnAuditCount(),this.getUnHandleCount()}return l.prototype.ionViewDidLeave=function(){this.events.unsubscribe("check: status",function(){console.log("did unsubscribe")})},l.prototype.getUnAuditCount=function(){var l=this;this.appService.httpGet(Ki.API.untreatedCount).then(function(n){l.cancelOrderCount=n.cancelCount,l.returnOrderCount=n.returnCount}).catch(function(n){l.appService.getToken(n,function(){l.getUnAuditCount()}),console.log(n)})},l.prototype.getUnHandleCount=function(){var l=this;this.appService.httpGet(""+Ki.API.getUnhandleGiftCount).then(function(n){l.selfGiftCount=n.reserved,l.expressgiftCount=n.undelivered}).catch(function(n){l.appService.getToken(n,function(){l.getUnHandleCount()}),console.log(n)})},l.prototype.goUnAudit=function(){var l=this,n=this.modalCtrl.create(vo,{cancelOrderCount:this.cancelOrderCount,returnOrderCount:this.returnOrderCount});n.present(),n.onDidDismiss(function(){l.getUnAuditCount()})},l.prototype.goUnHandle=function(){var l=this,n=this.modalCtrl.create(Lo,{selfGiftCount:this.selfGiftCount,expressGiftCount:this.expressgiftCount});n.present(),n.onDidDismiss(function(){l.getUnHandleCount()})},l.prototype.qrCodeScan=function(){var l=this;wx.scanQRCode({needResult:1,scanType:["qrCode","barCode"],success:function(n){var u=n.resultStr;if(u)if(u.indexOf(Ki.mainUrl)<0){l.alertCtrl.create({title:"提示",subTitle:"请扫描淘璞系统内二维码",buttons:["确定"]}).present()}else if(u.indexOf("id")>0){(t=l.modalCtrl.create(Ea,{url:u})).onDidDismiss(function(n){n&&("1"===n.type?l.qrCodeScan():"0"===n.type&&l.navCtrl.parent.select(1))}),t.present()}else if(u.indexOf("giftCode")>0){var t;(t=l.modalCtrl.create(Da,{url:u})).onDidDismiss(function(n){if(n)if("1"===n.type)l.qrCodeScan();else if("0"===n.type){l.modalCtrl.create(xo).present()}}),t.present()}else{l.alertCtrl.create({title:"提示",subTitle:"请扫描订单或者赠品二维码",buttons:["确定"]}).present()}},fail:function(n){console.log(n);l.alertCtrl.create({title:"提示",subTitle:"扫描失败，请重新再试!!",buttons:["确定"]}).present()}})},l.prototype.goMyCode=function(){this.modalCtrl.create(la).present()},l.prototype.goCreatOrder=function(){this.modalCtrl.create(Sa).present()},l.prototype.ionViewDidEnter=function(){var l=this;this.events.subscribe("check: status",function(n){1==n&&l.navCtrl.parent.select(1)});var n=window.location.href,u=encodeURIComponent(n);this.appService.httpGet(Ki.API.signature+"?url="+u).then(function(l){wx.config({debug:!1,appId:l.appId,timestamp:l.timestamp,nonceStr:l.noncestr,signature:l.signature,jsApiList:["scanQRCode"]})}).catch(function(n){l.appService.getToken(n,function(){l.ionViewDidEnter()}),console.log(n)})},l}();Uo=Object(Pi.__decorate)([Object(Ti.i)({selector:"home",templateUrl:"home.html"}),Object(Pi.__metadata)("design:paramtypes",["function"==typeof(zo=void 0!==Mi.j&&Mi.j)&&zo||Object,"function"==typeof(Vo=void 0!==Mi.l&&Mi.l)&&Vo||Object,"function"==typeof(Bo=void 0!==Ni&&Ni)&&Bo||Object,"function"==typeof(Ho=void 0!==Mi.a&&Mi.a)&&Ho||Object,"function"==typeof(Yo=void 0!==Mi.d&&Mi.d)&&Yo||Object])],Uo);var zo,Vo,Bo,Ho,Yo,Wo=Xo=function(){function l(l,n){this.navCtrl=l,this.appService=n,this.dateStart="",this.dateEnd="",this.isShowDetail=[],this.orderList=[],this.pageSize=10,this.paramsStatus="",this.paramsDate="",this.noData=!1,this.start=0,this.showNoMore=!1,this.loadingShow=!0,this.load={},this.dateEndMin="1970",this.dateEndMax="",this.dateStartMax="",this.requestDefeat=!1,this.showInfinite=!0,this.up=!1,this.down=!0,this.orderStatusList=[{label:"全部",status:"all"},{label:"待支付",status:"0"},{label:"已收货",status:"3"},{label:"已取消",status:"4"},{label:"取消中",status:"6"},{label:"已完成",status:"C"}],this.currentStatus=this.orderStatusList[0].status,this.load=Ki.load,this.dateStartMax=this.appService.reserveDate(),this.dateEndMax=this.appService.reserveDate(),this.getOrderList()}return l.prototype.getOrderList=function(){var l=this;this.loadingShow=!0,this.noData=!1,this.requestDefeat=!1,this.showNoMore=!1,this.showInfinite=!0;var n=Ki.API.getOrderList+"?start="+this.start+"&limit="+this.pageSize;""!=this.paramsDate&&(n+=this.paramsDate),""!=this.paramsStatus&&(n+=this.paramsStatus),this.appService.httpGet(n).then(function(n){if(l.loadingShow=!1,l.start<n.count){if(l.showNoMore=!1,l.noData=!1,l.start+=l.pageSize,l.showInfinite=!0,l.up){(t=l.orderList).push.apply(t,n.data);for(var u=0;u<l.orderList.length;u++)l.isShowDetail[u]=!1}else if(l.down){l.orderList=n.data;for(u=0;u<l.orderList.length;u++)l.isShowDetail[u]=!1}}else 0==n.count?(l.noData=!0,l.showNoMore=!1,l.orderList=[]):0==n.data.length&&(l.noData=!1,l.showNoMore=!0);var t}).catch(function(n){l.appService.getToken(n,function(){l.getOrderList()}),l.orderList=[],l.loadingShow=!1,l.requestDefeat=!0,console.log(n)})},l.prototype.getOrderListByDate=function(){this.start=0,this.paramsDate="",this.orderList=[],""!=this.dateStart&&(this.paramsDate+="&startTime="+this.dateStart,this.dateEndMin=this.dateStart),""!=this.dateEnd&&(this.paramsDate+="&endTime="+this.dateEnd,this.dateStartMax=this.dateEnd),this.content.scrollTo(0,0,0),this.getOrderList()},l.prototype.getCurrentStatus=function(l){this.start=0,this.paramsStatus="",this.orderList=[],this.currentStatus=this.orderStatusList[l].status,"all"!=this.orderStatusList[l].status&&(this.paramsStatus+="&status="+this.currentStatus),this.content.scrollTo(0,0,0),this.getOrderList()},l.prototype.showDetail=function(l){this.isShowDetail[l]=!this.isShowDetail[l]},l.prototype.goBrandshoOrder=function(){this.navCtrl.push(Xo)},l.prototype.clearDateStart=function(){this.dateStart="",this.dateEndMin="1970"},l.prototype.clearDateEnd=function(){this.dateEnd="",this.dateStartMax=this.appService.reserveDate()},l.prototype.doRefresh=function(l){var n=this;this.start=0,this.down=!0,this.up=!1,this.requestDefeat=!1,setTimeout(function(){n.getOrderList(),l.complete()},Ki.LOAD_TIME),this.showNoMore=!1},l.prototype.loadMore=function(l){var n=this,u=Ki.API.getOrderList+"?start="+this.start+"&limit="+this.pageSize;""!=this.paramsDate&&(u+=this.paramsDate),""!=this.paramsStatus&&(u+=this.paramsStatus),this.appService.httpGet(u).then(function(u){if(l.complete(),n.start<u.count){(e=n.orderList).push.apply(e,u.data),n.start+=n.pageSize;for(var t=0;t<n.orderList.length;t++)n.isShowDetail[t]=!1}else 0==u.data.length&&(n.showInfinite=!1,n.showNoMore=!0);var e}).catch(function(u){n.appService.getToken(u,function(){n.loadMore(l)}),l.complete(),n.showInfinite=!1,n.appService.toast("网络异常，请稍后再试",1e3,"middle"),console.log(u)})},l.prototype.requestDefeatRefresh=function(){this.requestDefeat=!1,this.loadingShow=!0,this.start=0,this.orderList=[],this.getOrderList()},l}();Object(Pi.__decorate)([Object(Ti.N)(Mi.c),Object(Pi.__metadata)("design:type","function"==typeof(Jo=void 0!==Mi.c&&Mi.c)&&Jo||Object)],Wo.prototype,"content",void 0),Wo=Xo=Object(Pi.__decorate)([Object(Ti.i)({selector:"order-list",templateUrl:"brandshop-order-list.html"}),Object(Pi.__metadata)("design:paramtypes",["function"==typeof(Qo=void 0!==Mi.l&&Mi.l)&&Qo||Object,"function"==typeof(Zo=void 0!==Ni&&Ni)&&Zo||Object])],Wo);var Xo,Jo,Qo,Zo,lr=function(){function l(l,n,u){this.navCtrl=l,this.appService=n,this.events=u,this.dateStart="",this.dateEnd="",this.isShowDetail=[],this.orderList=[],this.pageSize=10,this.paramsStatus="",this.paramsDate="",this.noData=!1,this.start=0,this.showNoMore=!1,this.loadingShow=!0,this.load={},this.up=!1,this.down=!0,this.dateEndMin="1970",this.requestDefeat=!1,this.showInfinite=!0,this.orderStatusList=[{label:"全部",status:"all"},{label:"待支付",status:"0"},{label:"已收货",status:"3"},{label:"已取消",status:"4"},{label:"已完成",status:"C"}],this.load=Ki.load}return l.prototype.ionViewDidEnter=function(){this.start=0,this.paramsDate="",this.paramsStatus="",this.dateStart="",this.dateEnd="",this.dateStartMax=this.appService.reserveDate(),this.dateEndMax=this.appService.reserveDate(),this.currentStatus=this.orderStatusList[0].status,this.orderList=[],this.getOrderList()},l.prototype.getOrderList=function(){var l=this;this.loadingShow=!0,this.noData=!1,this.requestDefeat=!1,this.showNoMore=!1,this.showInfinite=!0;var n=Ki.API.getOrderList+"?userType=B&start="+this.start+"&limit="+this.pageSize;""!=this.paramsDate&&(n+=this.paramsDate),""!=this.paramsStatus&&(n+=this.paramsStatus),this.appService.httpGet(n).then(function(n){if(l.loadingShow=!1,l.start<n.count){if(l.pageSize>=n.count?(l.showNoMore=!0,l.showInfinite=!1):(l.showNoMore=!1,l.showInfinite=!0),l.noData=!1,l.start+=l.pageSize,l.up){(t=l.orderList).push.apply(t,n.data);for(var u=0;u<l.orderList.length;u++)l.isShowDetail[u]=!1}else if(l.down){l.orderList=n.data;for(u=0;u<l.orderList.length;u++)l.isShowDetail[u]=!1}}else 0==n.count?(l.noData=!0,l.showNoMore=!1,l.showInfinite=!1,l.orderList=[]):0==n.data.length&&0!=n.count&&(l.noData=!1,l.showNoMore=!0,l.showInfinite=!1);var t}).catch(function(n){l.appService.getToken(n,function(){l.getOrderList()}),l.orderList=[],l.loadingShow=!1,l.showInfinite=!1,l.requestDefeat=!0,console.log(n)})},l.prototype.getOrderListByDate=function(){this.start=0,this.paramsDate="",this.orderList=[],""!=this.dateStart&&(this.paramsDate+="&startTime="+this.dateStart,this.dateEndMin=this.dateStart),""!=this.dateEnd&&(this.paramsDate+="&endTime="+this.dateEnd,this.dateStartMax=this.dateEnd),this.content.scrollTo(0,0,0),this.getOrderList()},l.prototype.getCurrentStatus=function(l){this.start=0,this.paramsStatus="",this.orderList=[],this.currentStatus=this.orderStatusList[l].status,"all"!=this.orderStatusList[l].status&&(this.paramsStatus+="&status="+this.currentStatus),this.getOrderList(),this.content.scrollTo(0,0,0)},l.prototype.showDetail=function(l){this.isShowDetail[l]=!this.isShowDetail[l]},l.prototype.goBrandshoOrder=function(){this.orderList=[],this.navCtrl.push(Wo)},l.prototype.clearDateStart=function(){this.dateStart="",this.dateEndMin="1970"},l.prototype.clearDateEnd=function(){this.dateEnd="",this.dateStartMax=this.appService.reserveDate()},l.prototype.doRefresh=function(l){var n=this;this.start=0,this.down=!0,this.up=!1,this.requestDefeat=!1,setTimeout(function(){n.getOrderList(),l.complete()},Ki.LOAD_TIME),this.showNoMore=!1},l.prototype.loadMore=function(l){var n=this,u=Ki.API.getOrderList+"?userType=B&start="+this.start+"&limit="+this.pageSize;""!=this.paramsDate&&(u+=this.paramsDate),""!=this.paramsStatus&&(u+=this.paramsStatus),this.appService.httpGet(u).then(function(u){if(l.complete(),n.start<u.count){(e=n.orderList).push.apply(e,u.data),n.start+=n.pageSize;for(var t=0;t<n.orderList.length;t++)n.isShowDetail[t]=!1}else 0==u.data.length&&(n.showInfinite=!1,n.showNoMore=!0);var e}).catch(function(u){n.appService.getToken(u,function(){n.loadMore(l)}),n.showInfinite=!1,l.complete(),n.appService.toast("网络异常，请稍后再试",1e3,"middle"),console.log(u)})},l.prototype.requestDefeatRefresh=function(){this.requestDefeat=!1,this.loadingShow=!0,this.start=0,this.orderList=[],this.getOrderList()},l}();Object(Pi.__decorate)([Object(Ti.N)(Mi.c),Object(Pi.__metadata)("design:type","function"==typeof(nr=void 0!==Mi.c&&Mi.c)&&nr||Object)],lr.prototype,"content",void 0),lr=Object(Pi.__decorate)([Object(Ti.i)({selector:"order-list",templateUrl:"order-list.html"}),Object(Pi.__metadata)("design:paramtypes",["function"==typeof(ur=void 0!==Mi.l&&Mi.l)&&ur||Object,"function"==typeof(tr=void 0!==Ni&&Ni)&&tr||Object,"function"==typeof(er=void 0!==Mi.d&&Mi.d)&&er||Object])],lr);var nr,ur,tr,er,ir=function(){function l(l,n,u,t){this.navCtrl=l,this.navParams=n,this.alertCtrl=u,this.appService=t,this.balance="",this.isAllow=!0,this.getBalance()}return l.prototype.getBalance=function(){console.log(this.navParams.get("param1")),this.balance=this.navParams.get("param1")},l.prototype.withdraw=function(){var l=this;if(this.isAllow){this.isAllow=!1;var n=""+Ki.API.withdraw,u=Number(Number(this.amount).toFixed(2));this.appService.httpPost(n,u).then(function(n){l.isAllow=!0}).catch(function(n){if(l.appService.getToken(n,function(){l.withdraw()}),n.type){l.alertCtrl.create({title:"提示",subTitle:n.message,buttons:["确定"]}).present()}console.log(n),l.isAllow=!0})}},l}();ir=Object(Pi.__decorate)([Object(Ti.i)({selector:"withdraw",templateUrl:"withdraw.html"}),Object(Pi.__metadata)("design:paramtypes",["function"==typeof(ar=void 0!==Mi.l&&Mi.l)&&ar||Object,"function"==typeof(or=void 0!==Mi.m&&Mi.m)&&or||Object,"function"==typeof(rr=void 0!==Mi.a&&Mi.a)&&rr||Object,"function"==typeof(sr=void 0!==Ni&&Ni)&&sr||Object])],ir);var ar,or,rr,sr,cr=function(){function l(l,n,u,t,e){this.navController=l,this.navParams=n,this.viewController=u,this.platform=t,this.appService=e,this.statusList=[],this.pageSize=10,this.currentPage=1,this.currentStatus=0,this.orderDetail=[],this.awardDetail=[],this.count=0,this.start=0,this.up=!1,this.down=!0,this.isShow=!1,this.isEmpty=!1,this.requestFail=!1,this.isRefresh=!0,this.isLoadingShow=!1,this.showNoMore=!1,this.load={},this.loadingShow=!0,this.noData=!1,this.requestDefeat=!1,this.showInfinite=!1,this.limit=10,this.statusList=[{label:"订单处理金额明细",status:0},{label:"奖励活动金额明细",status:1}],this.load=Ki.load,this.getOrderDetail(),this.getBonusSum1()}return l.prototype.getCurrentStatus=function(l){this.start=0,this.up=!1,this.down=!0,this.currentStatus=this.statusList[l].label,this.currentStatus=l,this.content.scrollTo(0,0,0),0==this.currentStatus?(this.getOrderDetail(),this.getBonusSum1()):(this.getAwardDetail(),this.getBonusSum2())},l.prototype.getOrderDetail=function(){var l=this;this.loadingShow=!0,this.showNoMore=!1,this.noData=!1,this.requestDefeat=!1;this.appService.httpGet(Ki.API.bonusList+"?typeList=1&statusList=2&start="+this.start+"&limit="+this.pageSize).then(function(n){l.loadingShow=!1,l.start<n.count?(l.showNoMore=!1,l.noData=!1,l.start+=l.limit,l.showInfinite=!0,l.up?(n.data.map(function(l){l.baseAmount=l.baseAmount.toFixed(2),l.percent=l.percent,l.amount=l.amount.toFixed(2),l.returnAmount=l.returnAmount.toFixed(2)}),(u=l.orderDetail).push.apply(u,n.data)):l.down&&(n.data.map(function(l){l.baseAmount=l.baseAmount.toFixed(2),l.percent=l.percent,l.amount=l.amount.toFixed(2),l.returnAmount=l.returnAmount.toFixed(2)}),l.orderDetail=n.data)):0==n.count?(l.noData=!0,l.showNoMore=!1,l.orderDetail=[]):0==n.data.length&&(l.noData=!1,l.showNoMore=!0);var u}).catch(function(n){l.appService.getToken(n,function(){l.getOrderDetail()}),console.log(n),l.requestFail=!0,l.isEmpty=!1,l.isLoadingShow=!1})},l.prototype.getBonusSum1=function(){var l=this;this.appService.httpGet(Ki.API.bonusSum+"?typeList=1&statusList=2").then(function(n){l.sum=n.sum,l.setIsShow(l.sum)}).catch(function(n){l.appService.getToken(n,function(){l.getBonusSum1()}),console.log(n)})},l.prototype.getAwardDetail=function(){var l=this;this.loadingShow=!0,this.showNoMore=!1,this.noData=!1,this.requestDefeat=!1;this.appService.httpGet(Ki.API.bonusList+"?typeList=3,4&statusList=2&start="+this.start+"&limit="+this.pageSize).then(function(n){l.loadingShow=!1,l.start<n.count?(l.showNoMore=!1,l.noData=!1,l.start+=l.limit,l.showInfinite=!0,l.up?(n.data.map(function(l){l.baseAmount=l.baseAmount.toFixed(2),l.percent=l.percent,l.amount=l.amount.toFixed(2),l.returnAmount=l.returnAmount.toFixed(2)}),(u=l.awardDetail).push.apply(u,n.data)):l.down&&(n.data.map(function(l){l.baseAmount=l.baseAmount.toFixed(2),l.percent=l.percent,l.amount=l.amount.toFixed(2),l.returnAmount=l.returnAmount.toFixed(2)}),l.awardDetail=n.data)):0==n.count?(l.noData=!0,l.showNoMore=!1,l.awardDetail=[]):0==n.data.length&&(l.noData=!1,l.showNoMore=!0);var u}).catch(function(n){l.appService.getToken(n,function(){l.getAwardDetail()}),console.log(n),l.requestFail=!0,l.isEmpty=!1,l.isLoadingShow=!1})},l.prototype.getBonusSum2=function(){var l=this;this.appService.httpGet(Ki.API.bonusSum+"?typeList=3,4&statusList=2").then(function(n){l.sum=n.sum,l.setIsShow(l.sum)}).catch(function(n){l.appService.getToken(n,function(){l.getBonusSum2()}),console.log(n)})},l.prototype.setIsShow=function(l){return this.isShow=l>0},l.prototype.loadMore=function(l){var n=this;if(0==this.currentStatus){this.appService.httpGet(Ki.API.bonusList+"?typeList=1&statusList=2&start="+this.start+"&limit="+this.pageSize).then(function(u){l.complete(),0!=u.data.length?(u.data.map(function(l){l.baseAmount=l.baseAmount.toFixed(2),l.percent=l.percent,l.amount=l.amount.toFixed(2),l.returnAmount=l.returnAmount.toFixed(2)}),(t=n.orderDetail).push.apply(t,u.data),n.start+=n.limit):n.showNoMore=!0;var t}).catch(function(u){n.appService.getToken(u,function(){n.loadMore(l)}),console.log(u),n.requestFail=!0,n.isEmpty=!1,n.isLoadingShow=!1})}else{this.appService.httpGet(Ki.API.bonusList+"?typeList=3,4&statusList=2&start="+this.start+"&limit="+this.pageSize).then(function(u){l.complete(),0!=u.data.length?(u.data.map(function(l){l.baseAmount=l.baseAmount.toFixed(2),l.percent=l.percent,l.amount=l.amount.toFixed(2),l.returnAmount=l.returnAmount.toFixed(2)}),(t=n.awardDetail).push.apply(t,u.data),n.start+=n.limit):n.showNoMore=!0;var t}).catch(function(u){n.appService.getToken(u,function(){n.loadMore(l)}),console.log(u),n.requestFail=!0,n.isEmpty=!1,n.isLoadingShow=!1})}},l.prototype.pullRefresh=function(l){var n=this;this.start=0,this.down=!0,this.up=!1,this.requestDefeat=!1,setTimeout(function(){0==n.currentStatus?(n.getOrderDetail(),n.getBonusSum1()):(n.getAwardDetail(),n.getBonusSum2()),l.complete()},Ki.LOAD_TIME),this.showNoMore=!1},l}();Object(Pi.__decorate)([Object(Ti.N)(Mi.c),Object(Pi.__metadata)("design:type","function"==typeof(_r=void 0!==Mi.c&&Mi.c)&&_r||Object)],cr.prototype,"content",void 0),cr=Object(Pi.__decorate)([Object(Ti.i)({templateUrl:"detail-tabs.html",selector:"withdraw-detailTabs"}),Object(Pi.__metadata)("design:paramtypes",["function"==typeof(dr=void 0!==Mi.l&&Mi.l)&&dr||Object,"function"==typeof(pr=void 0!==Mi.m&&Mi.m)&&pr||Object,"function"==typeof(fr=void 0!==Mi.q&&Mi.q)&&fr||Object,"function"==typeof(hr=void 0!==Mi.n&&Mi.n)&&hr||Object,"function"==typeof(gr=void 0!==Ni&&Ni)&&gr||Object])],cr);var _r,dr,pr,fr,hr,gr,mr=function(){function l(l,n,u,t,e){this.navController=l,this.navParams=n,this.viewController=u,this.platform=t,this.appService=e,this.statusList=[],this.pageSize=10,this.currentPage=1,this.currentStatus=0,this.orderDetail=[],this.awardDetail=[],this.count=0,this.start=0,this.up=!1,this.down=!0,this.isShow=!1,this.isEmpty=!1,this.requestFail=!1,this.isRefresh=!0,this.isLoadingShow=!1,this.showNoMore=!1,this.load={},this.loadingShow=!0,this.noData=!1,this.requestDefeat=!1,this.showInfinite=!1,this.limit=10,this.statusList=[{label:"订单处理金额明细",status:0},{label:"奖励活动金额明细",status:1}],this.load=Ki.load,this.getOrderDetail(),this.getBonusSum1()}return l.prototype.getCurrentStatus=function(l){this.start=0,this.up=!1,this.down=!0,this.currentStatus=this.statusList[l].label,this.currentStatus=l,this.content.scrollTo(0,0,0),0==this.currentStatus?(this.getOrderDetail(),this.getBonusSum1()):(this.getAwardDetail(),this.getBonusSum2())},l.prototype.getOrderDetail=function(){var l=this;this.loadingShow=!0,this.showNoMore=!1,this.noData=!1,this.requestDefeat=!1;this.appService.httpGet(Ki.API.bonusList+"?typeList=1&statusList=0,1&start="+this.start+"&limit="+this.pageSize).then(function(n){l.loadingShow=!1,l.start<n.count?(l.showNoMore=!1,l.noData=!1,l.start+=l.limit,l.showInfinite=!0,l.up?(n.data.map(function(l){l.baseAmount=l.baseAmount.toFixed(2),l.percent=l.percent,l.amount=l.amount.toFixed(2),l.returnAmount=l.returnAmount.toFixed(2)}),(u=l.orderDetail).push.apply(u,n.data)):l.down&&(n.data.map(function(l){l.baseAmount=l.baseAmount.toFixed(2),l.percent=l.percent,l.amount=l.amount.toFixed(2),l.returnAmount=l.returnAmount.toFixed(2)}),l.orderDetail=n.data)):0==n.count?(l.noData=!0,l.showNoMore=!1,l.orderDetail=[]):0==n.data.length&&(l.noData=!1,l.showNoMore=!0);var u}).catch(function(n){l.appService.getToken(n,function(){l.getOrderDetail()}),console.log(n),l.requestFail=!0,l.isEmpty=!1,l.isLoadingShow=!1})},l.prototype.getBonusSum1=function(){var l=this;this.appService.httpGet(Ki.API.bonusSum+"?typeList=1&statusList=0,1").then(function(n){l.sum=n.sum,l.setIsShow(l.sum)}).catch(function(n){l.appService.getToken(n,function(){l.getBonusSum1()}),console.log(n)})},l.prototype.getAwardDetail=function(){var l=this;this.loadingShow=!0,this.showNoMore=!1,this.noData=!1,this.requestDefeat=!1;this.appService.httpGet(Ki.API.bonusList+"?typeList=3,4&statusList=0,1&start="+this.start+"&limit="+this.pageSize).then(function(n){l.loadingShow=!1,l.start<n.count?(l.showNoMore=!1,l.noData=!1,l.start+=l.limit,l.showInfinite=!0,l.up?(n.data.map(function(l){l.baseAmount=l.baseAmount.toFixed(2),l.percent=l.percent,l.amount=l.amount.toFixed(2),l.returnAmount=l.returnAmount.toFixed(2)}),(u=l.awardDetail).push.apply(u,n.data)):l.down&&(n.data.map(function(l){l.baseAmount=l.baseAmount.toFixed(2),l.percent=l.percent,l.amount=l.amount.toFixed(2),l.returnAmount=l.returnAmount.toFixed(2)}),l.awardDetail=n.data)):0==n.count?(l.noData=!0,l.showNoMore=!1,l.awardDetail=[]):0==n.data.length&&(l.noData=!1,l.showNoMore=!0);var u}).catch(function(n){l.appService.getToken(n,function(){l.getAwardDetail()}),console.log(n),l.requestFail=!0,l.isEmpty=!1,l.isLoadingShow=!1})},l.prototype.getBonusSum2=function(){var l=this;this.appService.httpGet(Ki.API.bonusSum+"?typeList=3,4&statusList=0,1").then(function(n){l.sum=n.sum,l.setIsShow(l.sum)}).catch(function(n){l.appService.getToken(n,function(){l.getBonusSum2()}),console.log(n)})},l.prototype.setIsShow=function(l){return this.isShow=l>0},l.prototype.loadMore=function(l){var n=this;if(0==this.currentStatus){this.appService.httpGet(Ki.API.bonusList+"?typeList=1&statusList=0,1&start="+this.start+"&limit="+this.pageSize).then(function(u){l.complete(),0!=u.data.length?(u.data.map(function(l){l.baseAmount=l.baseAmount.toFixed(2),l.percent=l.percent,l.amount=l.amount.toFixed(2),l.returnAmount=l.returnAmount.toFixed(2)}),(t=n.orderDetail).push.apply(t,u.data),n.start+=n.limit):n.showNoMore=!0;var t}).catch(function(u){n.appService.getToken(u,function(){n.loadMore(l)}),console.log(u),n.requestFail=!0,n.isEmpty=!1,n.isLoadingShow=!1})}else{this.appService.httpGet(Ki.API.bonusList+"?typeList=3,4&statusList=0,1&start="+this.start+"&limit="+this.pageSize).then(function(u){l.complete(),0!=u.data.length?(u.data.map(function(l){l.baseAmount=l.baseAmount.toFixed(2),l.percent=l.percent,l.amount=l.amount.toFixed(2),l.returnAmount=l.returnAmount.toFixed(2)}),(t=n.awardDetail).push.apply(t,u.data),n.start+=n.limit):n.showNoMore=!0;var t}).catch(function(u){n.appService.getToken(u,function(){n.loadMore(l)}),console.log(u),n.requestFail=!0,n.isEmpty=!1,n.isLoadingShow=!1})}},l.prototype.pullRefresh=function(l){var n=this;this.start=0,this.down=!0,this.up=!1,this.requestDefeat=!1,setTimeout(function(){0==n.currentStatus?(n.getOrderDetail(),n.getBonusSum1()):(n.getAwardDetail(),n.getBonusSum2()),l.complete()},Ki.LOAD_TIME),this.showNoMore=!1},l}();Object(Pi.__decorate)([Object(Ti.N)(Mi.c),Object(Pi.__metadata)("design:type","function"==typeof(vr=void 0!==Mi.c&&Mi.c)&&vr||Object)],mr.prototype,"content",void 0),mr=Object(Pi.__decorate)([Object(Ti.i)({selector:"award-tabs",templateUrl:"award-tabs.html"}),Object(Pi.__metadata)("design:paramtypes",["function"==typeof(br=void 0!==Mi.l&&Mi.l)&&br||Object,"function"==typeof(wr=void 0!==Mi.m&&Mi.m)&&wr||Object,"function"==typeof(yr=void 0!==Mi.q&&Mi.q)&&yr||Object,"function"==typeof(Sr=void 0!==Mi.n&&Mi.n)&&Sr||Object,"function"==typeof(Ir=void 0!==Ni&&Ni)&&Ir||Object])],mr);var vr,br,wr,yr,Sr,Ir,Or=function(){function l(l,n,u,t){this.navCtrl=l,this.alertCtrl=n,this.navParams=u,this.appService=t,this.pageSize=10,this.currentPage=1,this.withdrawAmount=0,this.count=0,this.withdrawList=[],this.isEmpty=!1,this.requestFail=!1,this.isRefresh=!0,this.isLoadingShow=!1,this.load=Ki.load,this.getWithdrawList()}return l.prototype.getWithdrawList=function(){var l=this;this.isLoadingShow=!0;this.appService.httpGet(Ki.API.withdrawList+"?start="+(this.currentPage-1)*this.pageSize+"&limit="+this.pageSize).then(function(n){n.data.length>0&&(n.data.map(function(l){l.amount=l.amount.toFixed(2),l.realAmount=l.realAmount.toFixed(2),l.individualTax=l.individualTax.toFixed(2)}),(u=l.withdrawList).push.apply(u,n.data)),l.count=n.count,l.isEmpty=0===n.count,l.requestFail=!1,l.isLoadingShow=!1,l.withdrawAmount=l.navParams.get("param1");var u}).catch(function(n){l.appService.getToken(n,function(){l.getWithdrawList()}),console.log(n),l.requestFail=!0,l.isEmpty=!1,l.isLoadingShow=!1})},l.prototype.loadMore=function(l){this.currentPage++,this.refreshPage(l)},l.prototype.refresh=function(){this.requestFail=!1,this.currentPage=1,this.withdrawList=[],this.withdrawAmount=0,this.getWithdrawList()},l.prototype.pullRefresh=function(l){this.requestFail=!1,this.isEmpty=!1,this.currentPage=1,this.withdrawList=[],this.withdrawAmount=0,this.refreshPage(l)},l.prototype.refreshPage=function(l){var n=this;setTimeout(function(){n.getWithdrawList(),l.complete()},500)},l}();Or=Object(Pi.__decorate)([Object(Ti.i)({selector:"withdraw-record",templateUrl:"withdraw-record.html"}),Object(Pi.__metadata)("design:paramtypes",["function"==typeof(xr=void 0!==Mi.l&&Mi.l)&&xr||Object,"function"==typeof(kr=void 0!==Mi.a&&Mi.a)&&kr||Object,"function"==typeof(Dr=void 0!==Mi.m&&Mi.m)&&Dr||Object,"function"==typeof(Cr=void 0!==Ni&&Ni)&&Cr||Object])],Or);var xr,kr,Dr,Cr,jr=function(){return function(l,n){this.navCtrl=l,this.alertCtrl=n}}();jr=Object(Pi.__decorate)([Object(Ti.i)({selector:"help",templateUrl:"help.html"}),Object(Pi.__metadata)("design:paramtypes",["function"==typeof(Ar=void 0!==Mi.l&&Mi.l)&&Ar||Object,"function"==typeof(Tr=void 0!==Mi.a&&Mi.a)&&Tr||Object])],jr);var Ar,Tr,Pr=function(){function l(l,n,u,t,e,i){this.navCtrl=l,this.navParams=n,this.viewCtrl=u,this.appService=t,this.app=e,this.alertCtrl=i,this.salesName="",this.cellphone="",this.IDcard="",this.accountContent=!1,this.noBind=!0,this.requestDefeat=!1,this.loadingShow=!1,this.load={},this.isName=!1,this.isPhone=!1,this.isIDCard=!1}return l.prototype.bindWX=function(){var l=this;if(""!=this.salesName&&11==this.cellphone.length&&this.IdentityCodeValid(this.IDcard)){this.isName=!1,this.isPhone=!1,this.isIDCard=!1,this.loadingShow=!0;this.appService.httpPut(Ki.API.current,{salesName:this.salesName,cellphone:this.cellphone,idcard:this.IDcard}).then(function(n){if("success"==n.type){l.loadingShow=!1;var u="https://mobile."+Ki.mainUrl,t=encodeURIComponent(u),e=Ki.API.connect+"?appid="+Ki.appID+"&redirect_uri="+t+"&response_type=code&scope=snsapi_userinfo&state=STATE#wechat_redirect";window.location.href=e}}).catch(function(n){l.appService.getToken(n,function(){l.bindWX()}),l.loadingShow=!1,console.log(n),l.appService.toast("操作失败，请稍后重试",1e3,"middle")})}else""==this.salesName?(this.isName=!0,this.isPhone=!1,this.isIDCard=!1):11!=this.cellphone.length?(this.isName=!1,this.isPhone=!0,this.isIDCard=!1):this.IdentityCodeValid(this.IDcard)||(this.isName=!1,this.isPhone=!1,this.isIDCard=!0)},l.prototype.editCurrent=function(){var l=this;if(""!=this.salesName&&11==this.cellphone.length&&this.IdentityCodeValid(this.IDcard)){this.alertCtrl.create({title:"确认修改收款人信息？",buttons:[{text:"取消",handler:function(){}},{text:"确定",handler:function(){l.isName=!1,l.isPhone=!1,l.isIDCard=!1,l.loadingShow=!0;l.appService.httpPut(Ki.API.current,{salesName:l.salesName,cellphone:l.cellphone,idcard:l.IDcard}).then(function(n){"success"==n.type&&(l.loadingShow=!1,l.getCurrent(),l.appService.toast("更新成功",1e3,"middle"))}).catch(function(n){l.appService.getToken(n,function(){l.editCurrent()}),l.loadingShow=!1,console.log(n),l.appService.toast("更新失败，请稍后重试",1e3,"middle")})}}]}).present()}else""==this.salesName?(this.isName=!0,this.isPhone=!1,this.isIDCard=!1):11!=this.cellphone.length?(this.isName=!1,this.isPhone=!0,this.isIDCard=!1):this.IdentityCodeValid(this.IDcard)||(this.isName=!1,this.isPhone=!1,this.isIDCard=!0)},l.prototype.getCurrent=function(){var l=this;this.load=Ki.load,this.loadingShow=!0,this.accountContent=!1;this.appService.httpGet(Ki.API.current).then(function(n){l.loadingShow=!1,l.requestDefeat=!1,l.accountContent=!0,l.boundWechat=n.boundWechat,l.salesName=n.salesName,l.cellphone=n.cellphone,l.IDcard=n.idcard,l.noBind=!l.boundWechat}).catch(function(n){l.appService.getToken(n,function(){l.getCurrent()}),console.log(n),l.loadingShow=!1,l.requestDefeat=!0,l.accountContent=!1})},l.prototype.ionViewDidEnter=function(){var l=this;if(window.location.search&&window.location.search.split("?")[1].indexOf("code")>-1){this.accountContent=!1;var n=this.appService.loading();n.present();var u=window.location.search.split("?")[1].split("&")[0].split("=")[1];this.appService.httpGet(Ki.API.callback+"?code="+u+"&state=STATE").then(function(u){"success"==u.type&&(l.appService.setItem("stopReturn","have"),n.dismiss(),l.noBind=!1,l.getCurrent())}).catch(function(u){n.dismiss(),l.accountContent=!1,l.noBind=!0,console.log(u),l.appService.toast("更新失败，请稍后重试",1e3,"middle")})}else this.getCurrent()},l.prototype.IdentityCodeValid=function(l){var n=!0;if(l&&/^\d{6}(18|19|20)?\d{2}(0[1-9]|1[012])(0[1-9]|[12]\d|3[01])\d{3}(\d|X)$/i.test(l))if({11:"北京",12:"天津",13:"河北",14:"山西",15:"内蒙古",21:"辽宁",22:"吉林",23:"黑龙江 ",31:"上海",32:"江苏",33:"浙江",34:"安徽",35:"福建",36:"江西",37:"山东",41:"河南",42:"湖北 ",43:"湖南",44:"广东",45:"广西",46:"海南",50:"重庆",51:"四川",52:"贵州",53:"云南",54:"西藏 ",61:"陕西",62:"甘肃",63:"青海",64:"宁夏",65:"新疆",71:"台湾",81:"香港",82:"澳门",91:"国外 "}[l.substr(0,2)]){if(18==l.length){l=l.split("");for(var u=[7,9,10,5,8,4,2,1,6,3,7,9,10,5,8,4,2],t=[1,0,"X",9,8,7,6,5,4,3,2],e=0,i=0;i<17;i++)e+=l[i]*u[i];t[e%11]!=l[17]&&(n=!1)}}else n=!1;else n=!1;return n},l}();Pr=Object(Pi.__decorate)([Object(Ti.i)({selector:"add-account",templateUrl:"add-account.html"}),Object(Pi.__metadata)("design:paramtypes",["function"==typeof(Er=void 0!==Mi.l&&Mi.l)&&Er||Object,"function"==typeof(Mr=void 0!==Mi.m&&Mi.m)&&Mr||Object,"function"==typeof(Lr=void 0!==Mi.q&&Mi.q)&&Lr||Object,"function"==typeof(qr=void 0!==Ni&&Ni)&&qr||Object,"function"==typeof(Rr=void 0!==Mi.b&&Mi.b)&&Rr||Object,"function"==typeof($r=void 0!==Mi.a&&Mi.a)&&$r||Object])],Pr);var Er,Mr,Lr,qr,Rr,$r,Gr=function(){return function(l,n){this.navCtrl=l,this.alertCtrl=n,this.name="",this.phone="",this.idCard="",this.name="张小花",this.phone="13761489650",this.idCard="420117198902080853"}}();Gr=Object(Pi.__decorate)([Object(Ti.i)({selector:"edit-account",templateUrl:"edit-account.html"}),Object(Pi.__metadata)("design:paramtypes",["function"==typeof(Kr=void 0!==Mi.l&&Mi.l)&&Kr||Object,"function"==typeof(Nr=void 0!==Mi.a&&Mi.a)&&Nr||Object])],Gr);var Kr,Nr,Fr=function(){function l(l,n,u,t,e,i){this.nav=l,this.navCtrl=n,this.modalCtrl=u,this.viewCtrl=t,this.app=e,this.appService=i,this.userCurrent={id:"",cellphone:"",brandshopId:"",wechatNumber:"",idcard:"",boundWechat:!1},this.userAccount={userId:null,acctType:null,totalAmount:0,balance:0,verifyAmount:0,withdrawAmount:0},this.moneyList={balance:0,verifyAmount:0,withdrawAmount:0},this.isStar=!1,this.showImg="hide.png",this.showText="隐藏",this.pageList=null,this.pageList={withdraw:ir,myCode:la,detailTabs:cr,awardTabs:mr,withdrawRecord:Or,addAccount:Pr,help:jr,editAccount:Gr},this.getCurrent(),this.getAccount()}return l.prototype.showMoney=function(){this.isStar=!this.isStar,this.showText=this.isStar?"显示":"隐藏",this.showImg=this.isStar?"show.png":"hide.png",this.userAccount.balance=this.isStar?"*****":this.moneyList.balance,this.userAccount.verifyAmount=this.isStar?"*****":this.moneyList.verifyAmount,this.userAccount.withdrawAmount=this.isStar?"*****":this.moneyList.withdrawAmount},l.prototype.logOut=function(){if(this.appService.setItem("tpb_token",""),this.appService.setItem("stopReturn",""),window.location.search&&window.location.search.split("?")[1].indexOf("code")>-1)window.location.href=window.location.href.split("?")[0];else{this.app.getRootNav().setRoot(ts)}},l.prototype.redirectPage=function(l,n,u){var t=this;this.userCurrent.boundWechat||l!==ir||(l=this.pageList.addAccount);var e=this.modalCtrl.create(l,{param1:n,param2:u});e.onDidDismiss(function(l){t.getCurrent(),t.getAccount()}),e.present()},l.prototype.formatTelphone=function(){this.userCurrent.cellphone=this.userCurrent.cellphone.replace(/(\d{3})\d{4}(\d{4})/,"$1****$2")},l.prototype.getCurrent=function(){var l=this;this.appService.httpGet(Ki.API.current).then(function(n){l.userCurrent=n,l.formatTelphone()}).catch(function(n){l.appService.getToken(n,function(){l.getCurrent()}),console.log(n)})},l.prototype.getAccount=function(){var l=this;this.appService.httpGet(Ki.API.account).then(function(n){l.moneyList.balance=n.balance,l.moneyList.verifyAmount=n.verifyAmount,l.moneyList.withdrawAmount=n.withdrawAmount,l.userAccount=n}).catch(function(n){l.appService.getToken(n,function(){l.getAccount()}),console.log(n)})},l.prototype.ionViewDidEnter=function(){if("have"!=this.appService.getItem("stopReturn")&&window.location.search&&window.location.search.split("?")[1].indexOf("code")>-1){this.modalCtrl.create(this.pageList.addAccount).present()}},l}();Fr=Object(Pi.__decorate)([Object(Ti.i)({selector:"personl",templateUrl:"personl.html"}),Object(Pi.__metadata)("design:paramtypes",["function"==typeof(Ur=void 0!==Mi.k&&Mi.k)&&Ur||Object,"function"==typeof(zr=void 0!==Mi.l&&Mi.l)&&zr||Object,"function"==typeof(Vr=void 0!==Mi.j&&Mi.j)&&Vr||Object,"function"==typeof(Br=void 0!==Mi.q&&Mi.q)&&Br||Object,"function"==typeof(Hr=void 0!==Mi.b&&Mi.b)&&Hr||Object,"function"==typeof(Yr=void 0!==Ni&&Ni)&&Yr||Object])],Fr);var Ur,zr,Vr,Br,Hr,Yr,Wr=function(){function l(){this.home=Uo,this.orderList=lr,this.personl=Fr}return l.prototype.ionViewDidEnter=function(){window.location.search&&window.location.search.split("?")[1].indexOf("code")>-1&&this.tabRef.select(2)},l}();Object(Pi.__decorate)([Object(Ti.N)("myTabs"),Object(Pi.__metadata)("design:type","function"==typeof(Xr=void 0!==Mi.o&&Mi.o)&&Xr||Object)],Wr.prototype,"tabRef",void 0),Wr=Object(Pi.__decorate)([Object(Ti.i)({templateUrl:"tabs.html"}),Object(Pi.__metadata)("design:paramtypes",[])],Wr);var Xr,Jr=function(){function l(l,n,u,t,e){this.navCtrl=l,this.alertCtrl=n,this.navParams=u,this.appService=t,this.app=e,this.initialPwd="",this.newPwd="",this.repeatPwd="",this.isInitialPwd=!1,this.isNewPwd=!1,this.isRepeatPwd=!1,this.user={username:"",pwd:""},this.prevInitialPwd=this.navParams.get("initialPwd"),this.tpb_token=this.navParams.get("tpb_token"),this.refresh_token=this.navParams.get("refresh_token"),this.user=this.navParams.get("user"),this.rememberPassword=this.navParams.get("rememberPassword"),console.log(this.user),this.withTokenHeaders=new Ei.d({Authorization:"Bearer "+this.tpb_token})}return l.prototype.confirm=function(){var l=this;if(this.repeatPwdBlur(),this.initialPwdBlur(),this.newPwdBlur(),!this.isInitialPwd&&!this.isNewPwd&&!this.isRepeatPwd&&""!=this.initialPwd&&""!=this.newPwd&&""!=this.repeatPwd){var n=this.appService.loading();n.present();this.appService.httpPostHeader(Ki.API.editPassword,{password:this.newPwd},this.withTokenHeaders).then(function(u){n.dismiss(),l.user={username:l.user.username,pwd:l.newPwd},l.rememberPassword||(l.user.pwd="");var t=(new Date).getTime()+1e3*u.expires_in-Ki.RESERVED_TIME;if(l.appService.setItem("newDateMS",t),l.appService.setItem("user",JSON.stringify(l.user)),l.appService.setItem("tpb_token",l.tpb_token),l.appService.setItem("refresh_token",l.refresh_token),"success"==u.type){l.appService.toast("修改成功",1e3,"middle");l.app.getRootNav().setRoot(Wr)}}).catch(function(u){l.appService.getToken(u,function(){l.confirm()}),n.dismiss(),console.log(u),l.appService.toast("网络错误，请稍后重试",1e3,"middle")})}},l.prototype.initialPwdBlur=function(){""==this.initialPwd?(this.isInitialPwd=!0,this.initialPwdValue="*请输入出示密码"):this.initialPwd!=this.prevInitialPwd?(this.isInitialPwd=!0,this.initialPwdValue="*初始密码不正确，请重新输入"):(this.isInitialPwd=!1,this.initialPwdValue="")},l.prototype.newPwdBlur=function(){""==this.newPwd?(this.isNewPwd=!0,this.newPwdValue="*请输入新密码"):(this.isNewPwd=!1,this.newPwdValue="")},l.prototype.repeatPwdBlur=function(){""==this.repeatPwd?(this.isRepeatPwd=!0,this.repeatPwdValue="*请输入密码"):this.repeatPwd!=this.newPwd?(this.isRepeatPwd=!0,this.repeatPwdValue="*两次密码不一致"):(this.isRepeatPwd=!1,this.repeatPwdValue="")},l}();Jr=Object(Pi.__decorate)([Object(Ti.i)({selector:"update-pwd",templateUrl:"update-pwd.html"}),Object(Pi.__metadata)("design:paramtypes",["function"==typeof(Qr=void 0!==Mi.l&&Mi.l)&&Qr||Object,"function"==typeof(Zr=void 0!==Mi.a&&Mi.a)&&Zr||Object,"function"==typeof(ls=void 0!==Mi.m&&Mi.m)&&ls||Object,"function"==typeof(ns=void 0!==Ni&&Ni)&&ns||Object,"function"==typeof(us=void 0!==Mi.b&&Mi.b)&&us||Object])],Jr);var Qr,Zr,ls,ns,us,ts=function(){function l(l,n,u,t){this.navCtrl=l,this.app=n,this.appService=u,this.http=t,this.username="",this.pwd="",this.isUserName=!1,this.isPwd=!1,this.rememberPassword=!0,this.userNameValue="*账号不正确，请确认后重新输入",this.userPwdValue="*请输入密码",this.pageInit()}return l.prototype.pageInit=function(){var l=this.appService.getItem("user");l&&(l=JSON.parse(l),this.username=l.username,this.pwd=l.pwd,this.rememberPassword=!!this.pwd)},l.prototype.login=function(){var l=this;if(""==this.pwd?(this.isPwd=!0,this.userNameValue="*请输入密码"):this.isPwd=!1,""==this.username?(this.isUserName=!0,this.userNameValue="*请输入账号或手机号"):this.isUserName=!1,0==this.isUserName&&""!=this.username&&""!=this.pwd){this.isPwd=!1;var n=this.appService.loading();n.present();var u=new Li.Buffer(Ki.client_id+":"+Ki.secret).toString("base64");this.oauthTokenHeaders=new Ei.d({Authorization:"Basic "+u,"Content-Type":"application/x-www-form-urlencoded"});this.appService.httpPostHeader(Ki.oauthTokenUrl,"username="+this.username+"&password="+this.pwd+"&grant_type="+Ki.grant_type,this.oauthTokenHeaders).then(function(u){if(u.access_token){n.dismiss();var t=Ki.API.firstLogin;l.loginHeaders=new Ei.d({Authorization:"Bearer "+u.access_token}),l.appService.httpGetHeader(t,l.loginHeaders).then(function(n){var t={username:l.username,pwd:l.pwd};if(l.rememberPassword||(t.pwd=""),1==n.firstLogin){l.app.getRootNav().setRoot(Jr,{initialPwd:l.pwd,tpb_token:u.access_token,refresh_token:u.refresh_token,user:t,rememberPassword:l.rememberPassword})}else if(0==n.firstLogin){var e=(new Date).getTime()+1e3*u.expires_in-Ki.RESERVED_TIME;l.appService.setItem("newDateMS",e),l.appService.setItem("user",JSON.stringify(t)),l.appService.setItem("tpb_token",u.access_token),l.appService.setItem("refresh_token",u.refresh_token);l.app.getRootNav().setRoot(Wr)}}).catch(function(n){console.log(n),l.appService.toast("网络错误，请稍后重试",1e3,"middle")})}else n.dismiss(),l.appService.toast("网络错误，请稍后重试",1e3,"middle")}).catch(function(u){n.dismiss(),console.log("访问错误:"+u),400==u.status&&"invalid_grant"==u.json().error?l.appService.toast("用户名或密码错误",1e3,"middle"):l.appService.toast("网络异常，请稍后重试",1e3,"middle")})}},l.prototype.forget=function(){this.navCtrl.push(Yi)},l.prototype.onblurAffirm=function(){""==this.username?(this.isUserName=!0,this.userNameValue="*账号不得为空"):(this.isUserName=!1,this.userNameValue="*账号不正确，请确认后重新输入")},l}();ts=Object(Pi.__decorate)([Object(Ti.i)({selector:"login",templateUrl:"login.html"}),Object(Pi.__metadata)("design:paramtypes",["function"==typeof(es=void 0!==Mi.l&&Mi.l)&&es||Object,"function"==typeof(is=void 0!==Mi.b&&Mi.b)&&is||Object,"function"==typeof(as=void 0!==Ni&&Ni)&&as||Object,"function"==typeof(os=void 0!==Ei.e&&Ei.e)&&os||Object])],ts);var es,is,as,os,rs=u(115),ss=u(116),cs=function(){function l(l,n,u,t,e){this.platform=l,this.menu=n,this.statusBar=u,this.splashScreen=t,this.appService=e,this.initializeApp(),this.initializePage()}return l.prototype.initializePage=function(){var l=this;if(this.appService.getItem("tpb_token")){var n=this.appService.getItem("newDateMS");if((new Date).getTime()<n)this.rootPage=Wr;else{var u=new Li.Buffer(Ki.client_id+":"+Ki.secret).toString("base64");this.oauthTokenHeaders=new Ei.d({Authorization:"Basic "+u,"Content-Type":"application/x-www-form-urlencoded"});var t=Ki.oauthTokenUrl,e="grant_type=refresh_token&refresh_token="+this.appService.getItem("refresh_token");this.appService.httpPostHeader(t,e,this.oauthTokenHeaders).then(function(n){var u=(new Date).getTime()+1e3*n.expires_in-Ki.RESERVED_TIME;l.appService.setItem("newDateMS",u),l.appService.setItem("tpb_token",n.access_token),l.appService.setItem("refresh_token",n.refresh_token),l.rootPage=Wr}).catch(function(n){console.log(n),l.appService.toast("登录已过期，请重新登录",1e3,"middle"),l.appService.setItem("tpb_token",""),l.appService.setItem("refresh_token",""),l.rootPage=ts})}}else this.rootPage=ts},l.prototype.initializeApp=function(){var l=this;this.platform.ready().then(function(){l.statusBar.styleDefault(),l.splashScreen.hide()})},l.prototype.openPage=function(l){this.menu.close(),this.nav.setRoot(l.component)},l}();Object(Pi.__decorate)([Object(Ti.N)(Mi.k),Object(Pi.__metadata)("design:type","function"==typeof(_s=void 0!==Mi.k&&Mi.k)&&_s||Object)],cs.prototype,"nav",void 0),cs=Object(Pi.__decorate)([Object(Ti.i)({templateUrl:"app.html"}),Object(Pi.__metadata)("design:paramtypes",["function"==typeof(ds=void 0!==Mi.n&&Mi.n)&&ds||Object,"function"==typeof(ps=void 0!==Mi.i&&Mi.i)&&ps||Object,"function"==typeof(fs=void 0!==rs.a&&rs.a)&&fs||Object,"function"==typeof(hs=void 0!==ss.a&&ss.a)&&hs||Object,"function"==typeof(gs=void 0!==Ni&&Ni)&&gs||Object])],cs);var _s,ds,ps,fs,hs,gs,ms=function(){function l(){}return l.prototype.transform=function(l){switch(l){case"0":return{status:"待支付",pass:!1,audit:!0};case"1":return{status:"已支付",pass:!0,audit:!1};case"2":return{status:"已发货",pass:!0,audit:!1};case"3":return{status:"已收货",pass:!0,audit:!1};case"4":return{status:"已取消",pass:!1,audit:!0};case"6":return{status:"取消中",pass:!0,audit:!1};case"C":return{status:"已完成",pass:!0,audit:!1}}},l}();ms=Object(Pi.__decorate)([Object(Ti.C)({name:"setOrderStatus"})],ms);var vs=function(){function l(){}return l.prototype.transform=function(l){switch(l){case"0":return{status:"申请审核中",pass:!1,audit:!0};case"1":return{status:"申请已同意",pass:!0,audit:!1};case"2":return{status:"商家已收货",pass:!0,audit:!1};case"3":return{status:"申请已完成",pass:!0,audit:!1};case"4":return{status:"申请拒绝",pass:!1,audit:!0}}},l}();vs=Object(Pi.__decorate)([Object(Ti.C)({name:"setReturnOrderStatus"})],vs);var bs=function(){function l(){}return l.prototype.transform=function(l){switch(l){case"0":return{status:"申请审核中",pass:!1,audit:!0};case"1":return{status:"申请已通过",pass:!0,audit:!1};case"2":return{status:"申请已拒绝",pass:!1,audit:!0};case"3":return{status:"退款已完成",pass:!0,audit:!1}}},l}();bs=Object(Pi.__decorate)([Object(Ti.C)({name:"setCancelOrderStatus"})],bs);var ws=function(){function l(){}return l.prototype.transform=function(l){switch(l){case 0:return{status:"失败",pass:!1};case 1:return{status:"成功",pass:!0}}},l}();ws=Object(Pi.__decorate)([Object(Ti.C)({name:"setWithdrawStatus"})],ws);var ys=function(){function l(){}return l.prototype.transform=function(l,n){return"0"==l&&"2"==n?"预约兑换":"0"==l&&"3"==n?"预约成功":"1"==l?"到店兑换":void 0},l}();ys=Object(Pi.__decorate)([Object(Ti.C)({name:"setGiftType"})],ys);var Ss=function(){function l(){}return l.prototype.transform=function(l){switch(l){case"0":return"预约兑换";case"1":return"到店兑换"}},l}();Ss=Object(Pi.__decorate)([Object(Ti.C)({name:"setHandleGiftType"})],Ss);var Is=function(){function l(){}return l.prototype.transform=function(l){return"invalidAttrValue"==l&&"disabled"},l}();Is=Object(Pi.__decorate)([Object(Ti.C)({name:"isOrIsnotInvalidAttrValue"})],Is);var Os=function(){function l(){}return l.prototype.transform=function(l){return"invalidAttrValue"==l},l}();Os=Object(Pi.__decorate)([Object(Ti.C)({name:"invalidAttrValueClass"})],Os);var xs=function(){function l(){}return l.prototype.transform=function(l){return 1==l},l}();xs=Object(Pi.__decorate)([Object(Ti.C)({name:"changeGray"})],xs);var ks=function(){function l(){}return l.prototype.transform=function(l){return!!l},l}();ks=Object(Pi.__decorate)([Object(Ti.C)({name:"overStockPipe"})],ks);var Ds=function(){function l(){}return l.prototype.transform=function(l){return l?"https://www."+Ki.mainUrl+"/evercos/common/file/content/"+l:"./assets/image/nodata.png"},l}();Ds=Object(Pi.__decorate)([Object(Ti.C)({name:"productSkuDTOImage"})],Ds);var Cs=function(){function l(){}return l.prototype.transform=function(l){return l?""+(Ki.imgUrl+l):"./assets/image/nodata.png"},l}();Cs=Object(Pi.__decorate)([Object(Ti.C)({name:"handleGiftImage"})],Cs);var js=function(){function l(){}return l.prototype.transform=function(l){switch(l){case"1":return"七天无理由退货";case"2":return"我不想要了";case"3":return"拍错了/订单信息填写错误";case"4":return"商家缺货";case"5":return"商家未按时发货"}},l}();js=Object(Pi.__decorate)([Object(Ti.C)({name:"reasonType"})],js);var As=u(84),Ts=function(){function l(l,n,u,t){this.navCtrl=l,this.modalCtrl=n,this.alertCtrl=u,this.appService=t,this.start=0,this.limit=10,this.showNoMore=!1,this.load={},this.loadingShow=!0,this.down=!0,this.up=!1,this.unhandleExpressGiftArray=[],this.load=Ki.load,this.getUnhandleExpressGiftList()}return l.prototype.getUnhandleExpressGiftList=function(){var l=this;this.appService.httpGet(Ki.API.getGiftList+"?type=1&start="+this.start+"&limit="+this.limit).then(function(n){l.loadingShow=!1,console.log(n),0==n.count?l.noData=!0:(l.noData=!1,l.start<n.count?l.up?((u=l.unhandleExpressGiftArray).push.apply(u,n.data),l.start+=l.limit):l.down&&(l.unhandleExpressGiftArray=n.data,l.start+=l.limit,l.content.scrollTo(0,0,0)):l.showNoMore=!0);var u}).catch(function(n){l.appService.getToken(n,function(){l.getUnhandleExpressGiftList()}),l.loadingShow=!1,console.log(n),l.appService.toast("网络异常，请稍后再试",1e3,"middle")})},l.prototype.goExpressgift=function(){var l=this,n=this.modalCtrl.create(Ao);n.onDidDismiss(function(){l.start=0,l.down=!0,l.up=!1,l.getUnhandleExpressGiftList()}),n.present()},l.prototype.sendProduct=function(l){var n=this;this.alertCtrl.create({message:"赠品发货确认",inputs:[{name:"companyName",type:"text",placeholder:"请在此输入快递公司名称"},{name:"orderNum",type:"text",placeholder:"请在此输入快递单号"}],buttons:[{text:"取消",handler:function(){}},{text:"确认",handler:function(u){if(""!=u.companyName&&""!=u.orderNum){var t={memberGiftAccountSeq:n.unhandleExpressGiftArray[l].memberGiftAccountSeq,expressCompany:u.companyName,expressNo:u.orderNum},e=n.appService.loading();e.present();n.appService.httpPost(Ki.API.confirmExpressInfo,t).then(function(l){"success"==l.type&&(n.start=0,n.down=!0,n.up=!1,e.dismiss(),n.getUnhandleExpressGiftList())}).catch(function(l){e.dismiss(),console.log(l),n.appService.toast("网络异常，请稍后再试",1e3,"middle")})}else n.appService.toast("请填写快递信息",1e3,"middle")}}]}).present()},l.prototype.refreshGetUnhandleExpressGiftList=function(l){var n=this;this.start=0,this.down=!0,this.up=!1;this.appService.httpGet(Ki.API.getGiftList+"?type=1&start="+this.start+"&limit="+this.limit).then(function(u){l.complete(),0==u.count?n.noData=!0:(n.noData=!1,0!=u.data.length?(n.unhandleExpressGiftArray=u.data,n.start+=n.limit):n.showNoMore=!0)}).catch(function(u){n.appService.getToken(u,function(){n.refreshGetUnhandleExpressGiftList(l)}),l.complete(),console.log(u),n.appService.toast("网络异常，请稍后再试",1e3,"middle")})},l.prototype.infiniteGetUnhandleExpressGiftList=function(l){var n=this;this.down=!1,this.up=!0;this.appService.httpGet(Ki.API.getGiftList+"?type=1&start="+this.start+"&limit="+this.limit).then(function(u){l.complete(),0==u.count?n.noData=!0:(n.noData=!1,0!=u.data.length?((t=n.unhandleExpressGiftArray).push.apply(t,u.data),n.start+=n.limit):n.showNoMore=!0);var t}).catch(function(u){n.appService.getToken(u,function(){n.infiniteGetUnhandleExpressGiftList(l)}),l.complete(),console.log(u),n.appService.toast("网络异常，请稍后再试",1e3,"middle")})},l}();Object(Pi.__decorate)([Object(Ti.N)(Mi.c),Object(Pi.__metadata)("design:type","function"==typeof(Ps=void 0!==Mi.c&&Mi.c)&&Ps||Object)],Ts.prototype,"content",void 0),Ts=Object(Pi.__decorate)([Object(Ti.i)({selector:"unhandle-expressgift",templateUrl:"unhandle-expressgift.html"}),Object(Pi.__metadata)("design:paramtypes",["function"==typeof(Es=void 0!==Mi.l&&Mi.l)&&Es||Object,"function"==typeof(Ms=void 0!==Mi.j&&Mi.j)&&Ms||Object,"function"==typeof(Ls=void 0!==Mi.a&&Mi.a)&&Ls||Object,"function"==typeof(qs=void 0!==Ni&&Ni)&&qs||Object])],Ts);var Ps,Es,Ms,Ls,qs,Rs=function(){function l(l,n,u,t,e,i){this.navCtrl=l,this.modalCtrl=n,this.alertCtrl=u,this.changeDetectorRef=t,this.appService=e,this.zone=i,this.start=0,this.limit=10,this.showNoMore=!1,this.load={},this.loadingShow=!0,this.unhandleSeflGiftArray=[],this.down=!0,this.up=!1,this.load=Ki.load,this.getUnhandleSelfGiftList()}return l.prototype.addOrderStatusClass=function(l){l.map(function(l){l.className="0"==l.giftType&&"2"==l.status?"unstart":"1"==l.giftType?"unstart":"success"})},l.prototype.getUnhandleSelfGiftList=function(){var l=this;this.appService.httpGet(Ki.API.getGiftList+"?type=0&start="+this.start+"&limit="+this.limit).then(function(n){l.loadingShow=!1,0==n.count?l.noData=!0:(l.noData=!1,l.start<n.count?(l.up?((u=l.unhandleSeflGiftArray).push.apply(u,n.data),l.start+=l.limit):l.down&&(l.unhandleSeflGiftArray=n.data,l.start+=l.limit,l.content.scrollTo(0,0,0)),l.addOrderStatusClass(l.unhandleSeflGiftArray)):l.showNoMore=!0);var u}).catch(function(n){l.appService.getToken(n,function(){l.getUnhandleSelfGiftList()}),l.loadingShow=!1,console.log(n),l.appService.toast("网络异常，请稍后再试",1e3,"middle")})},l.prototype.goSelfgift=function(){var l=this,n=this.modalCtrl.create(xo);n.onDidDismiss(function(){l.start=0,l.down=!0,l.up=!1,l.getUnhandleSelfGiftList()}),n.present()},l.prototype.clearReserveArriveTime=function(l){this.unhandleSeflGiftArray[l].reserveShopTime=""},l.prototype.reserveAffirm=function(l){var n=this;if(null!=this.unhandleSeflGiftArray[l].reserveShopTime){var u={memberGiftAccountSeq:this.unhandleSeflGiftArray[l].memberGiftAccountSeq,reserveShopTime:new Date(this.unhandleSeflGiftArray[l].reserveShopTime).getTime()},t=this.appService.loading();t.present();this.appService.httpPost(Ki.API.confirmReserveShopTime,u).then(function(l){"success"==l.type&&(n.start=0,n.down=!0,n.up=!1,t.dismiss(),n.getUnhandleSelfGiftList())}).catch(function(u){n.appService.getToken(u,function(){n.reserveAffirm(l)}),t.dismiss(),console.log(u.message),n.appService.toast("操作失败，请稍后重试",1e3,"middle")})}else this.appService.toast("请选择会员预约到店时间",1e3,"middle")},l.prototype.refreshGetUnhandleSelfGiftList=function(l){var n=this;this.start=0,this.down=!0,this.up=!1;this.appService.httpGet(Ki.API.getGiftList+"?type=0&start="+this.start+"&limit="+this.limit).then(function(u){l.complete(),0!=u.data.length?(n.unhandleSeflGiftArray=u.data,n.start+=n.limit,n.addOrderStatusClass(n.unhandleSeflGiftArray)):n.showNoMore=!0}).catch(function(u){n.appService.getToken(u,function(){n.refreshGetUnhandleSelfGiftList(l)}),l.complete(),console.log(u),n.appService.toast("网络异常，请稍后再试",1e3,"middle")})},l.prototype.infiniteGetUnhandleSelfGiftList=function(l){var n=this;this.down=!1,this.up=!0;this.appService.httpGet(Ki.API.getGiftList+"?type=0&start="+this.start+"&limit="+this.limit).then(function(u){l.complete(),0!=u.data.length?((t=n.unhandleSeflGiftArray).push.apply(t,u.data),n.start+=n.limit,n.addOrderStatusClass(n.unhandleSeflGiftArray)):n.showNoMore=!0;var t}).catch(function(u){n.appService.getToken(u,function(){n.infiniteGetUnhandleSelfGiftList(l)}),l.complete(),console.log(u),n.appService.toast("网络异常，请稍后再试",1e3,"middle")})},l.prototype.scrollTo=function(){this.content.scrollTo(0,0,300)},l.prototype.scrollHandler=function(l){clearTimeout(this.timer);var n=this;this.timer=setTimeout(function(){n.zone.run(function(){n.toTop=l.scrollTop>=300})},100)},l}();Object(Pi.__decorate)([Object(Ti.N)(Mi.c),Object(Pi.__metadata)("design:type","function"==typeof($s=void 0!==Mi.c&&Mi.c)&&$s||Object)],Rs.prototype,"content",void 0),Rs=Object(Pi.__decorate)([Object(Ti.i)({selector:"unhandle-selfgift",templateUrl:"unhandle-selfgift.html"}),Object(Pi.__metadata)("design:paramtypes",["function"==typeof(Gs=void 0!==Mi.l&&Mi.l)&&Gs||Object,"function"==typeof(Ks=void 0!==Mi.j&&Mi.j)&&Ks||Object,"function"==typeof(Ns=void 0!==Mi.a&&Mi.a)&&Ns||Object,"function"==typeof(Fs=void 0!==Ti.g&&Ti.g)&&Fs||Object,"function"==typeof(Us=void 0!==Ni&&Ni)&&Us||Object,"function"==typeof(zs=void 0!==Ti.x&&Ti.x)&&zs||Object])],Rs);var $s,Gs,Ks,Ns,Fs,Us,zs,Vs=function(){function l(l,n,u){this.navCtrl=l,this.alertCtrl=n,this.appService=u,this.pageSize=10,this.currentPage=1,this.awardActivity=[],this.count=0,this.isShow=!1,this.isEmpty=!1,this.requestFail=!1,this.isRefresh=!0,this.isLoadingShow=!1,this.load=Ki.load,this.getAllData()}return l.prototype.getAwardActivity=function(){var l=this;this.isLoadingShow=!0;this.appService.httpGet(Ki.API.bonusList+"?typeList=3,4&statusList=0,1&start="+(this.currentPage-1)*this.pageSize+"&limit="+this.pageSize).then(function(n){n.data.length>0&&(n.data.map(function(l){l.baseAmount=l.baseAmount.toFixed(2),l.percent=l.percent,l.amount=l.amount.toFixed(2),l.returnAmount=l.returnAmount.toFixed(2)}),(u=l.awardActivity).push.apply(u,n.data)),l.count=n.count,l.isEmpty=0===n.count,l.requestFail=!1,l.isLoadingShow=!1;var u}).catch(function(n){l.appService.getToken(n,function(){l.getAwardActivity()}),console.log(n),l.requestFail=!0,l.isEmpty=!1,l.isLoadingShow=!1})},l.prototype.getBonusSum=function(){var l=this;this.appService.httpGet(Ki.API.bonusSum+"?typeList=3,4&statusList=0,1").then(function(n){l.sum=n.sum,l.setIsShow(l.sum)}).catch(function(n){l.appService.getToken(n,function(){l.getBonusSum()}),console.log(n)})},l.prototype.setIsShow=function(l){return this.isShow=l>0},l.prototype.loadMore=function(l){this.currentPage++,this.refreshPage(l)},l.prototype.refresh=function(){this.requestFail=!1,this.currentPage=1,this.getAllData()},l.prototype.pullRefresh=function(l){this.requestFail=!1,this.isEmpty=!1,this.currentPage=1,this.awardActivity=[],this.refreshPage(l)},l.prototype.refreshPage=function(l){var n=this;setTimeout(function(){n.getAllData(),l.complete()},500)},l.prototype.getAllData=function(){this.getAwardActivity(),this.getBonusSum()},l}();Vs=Object(Pi.__decorate)([Object(Ti.i)({selector:"award-activity",templateUrl:"award-activity.html"}),Object(Pi.__metadata)("design:paramtypes",["function"==typeof(Bs=void 0!==Mi.l&&Mi.l)&&Bs||Object,"function"==typeof(Hs=void 0!==Mi.a&&Mi.a)&&Hs||Object,"function"==typeof(Ys=void 0!==Ni&&Ni)&&Ys||Object])],Vs);var Bs,Hs,Ys,Ws=function(){function l(l,n,u){this.navCtrl=l,this.alertCtrl=n,this.appService=u,this.pageSize=10,this.currentPage=1,this.awardOrder=[],this.count=0,this.isShow=!1,this.requestFail=!1,this.isEmpty=!1,this.isRefresh=!0,this.isLoadingShow=!1,this.load=Ki.load,this.getAllData()}return l.prototype.getAwardOrder=function(){var l=this;this.isLoadingShow=!0;this.appService.httpGet(Ki.API.bonusList+"?typeList=1&statusList=0,1&start="+(this.currentPage-1)*this.pageSize+"&limit="+this.pageSize).then(function(n){n.data.length>0&&(n.data.map(function(l){l.baseAmount=l.baseAmount.toFixed(2),l.percent=l.percent,l.amount=l.amount.toFixed(2),l.returnAmount=l.returnAmount.toFixed(2)}),(u=l.awardOrder).push.apply(u,n.data)),l.count=n.count,l.isEmpty=0===n.count,l.requestFail=!1,l.isLoadingShow=!1;var u}).catch(function(n){l.appService.getToken(n,function(){l.getAwardOrder()}),console.log(n),l.requestFail=!0,l.isEmpty=!1,l.isLoadingShow=!1})},l.prototype.getBonusSum=function(){var l=this;this.appService.httpGet(Ki.API.bonusSum+"?typeList=1&statusList=0,1").then(function(n){l.sum=n.sum,l.setIsShow(l.sum)}).catch(function(n){l.appService.getToken(n,function(){l.getBonusSum()}),console.log(n)})},l.prototype.setIsShow=function(l){return this.isShow=l>0},l.prototype.loadMore=function(l){this.currentPage++,this.refreshPage(l)},l.prototype.refresh=function(){this.requestFail=!1,this.currentPage=1,this.getAllData()},l.prototype.pullRefresh=function(l){this.requestFail=!1,this.isEmpty=!1,this.currentPage=1,this.awardOrder=[],this.refreshPage(l)},l.prototype.refreshPage=function(l){var n=this;setTimeout(function(){n.getAllData(),l.complete()},500)},l.prototype.getAllData=function(){this.getAwardOrder(),this.getBonusSum()},l}();Ws=Object(Pi.__decorate)([Object(Ti.i)({selector:"award-order",templateUrl:"award-order.html"}),Object(Pi.__metadata)("design:paramtypes",["function"==typeof(Xs=void 0!==Mi.l&&Mi.l)&&Xs||Object,"function"==typeof(Js=void 0!==Mi.a&&Mi.a)&&Js||Object,"function"==typeof(Qs=void 0!==Ni&&Ni)&&Qs||Object])],Ws);var Xs,Js,Qs,Zs=function(){function l(l,n,u){this.navCtrl=l,this.modalCtrl=n,this.navParams=u,this.userId=this.navParams.get("param")}return l.prototype.goAccount=function(){this.modalCtrl.create(Pr,{userId:this.userId}).present()},l}();Zs=Object(Pi.__decorate)([Object(Ti.i)({selector:"bind-account",templateUrl:"bind-account.html"}),Object(Pi.__metadata)("design:paramtypes",["function"==typeof(lc=void 0!==Mi.l&&Mi.l)&&lc||Object,"function"==typeof(nc=void 0!==Mi.j&&Mi.j)&&nc||Object,"function"==typeof(uc=void 0!==Mi.m&&Mi.m)&&uc||Object])],Zs);var lc,nc,uc,tc=function(){function l(l){this.appService=l,this.pageSize=10,this.currentPage=1,this.orderDetail=[],this.count=0,this.isShow=!1,this.isEmpty=!1,this.requestFail=!1,this.isRefresh=!0,this.isLoadingShow=!1,this.load=Ki.load,this.getAllData()}return l.prototype.getOrderDetail=function(){var l=this;this.isLoadingShow=!0;this.appService.httpGet(Ki.API.bonusList+"?typeList=1&statusList=2&start="+(this.currentPage-1)*this.pageSize+"&limit="+this.pageSize).then(function(n){n.data.length>0&&(n.data.map(function(l){l.baseAmount=l.baseAmount.toFixed(2),l.percent=l.percent,l.amount=l.amount.toFixed(2),l.returnAmount=l.returnAmount.toFixed(2)}),(u=l.orderDetail).push.apply(u,n.data)),l.count=n.count,l.isEmpty=0===n.count,l.requestFail=!1,l.isLoadingShow=!1;var u}).catch(function(n){l.appService.getToken(n,function(){l.getOrderDetail()}),console.log(n),l.requestFail=!0,l.isEmpty=!1,l.isLoadingShow=!1})},l.prototype.getBonusSum=function(){var l=this;this.appService.httpGet(Ki.API.bonusSum+"?typeList=1&statusList=2").then(function(n){l.sum=n.sum,l.setIsShow(l.sum)}).catch(function(n){l.appService.getToken(n,function(){l.getBonusSum()}),console.log(n)})},l.prototype.setIsShow=function(l){return this.isShow=l>0},l.prototype.loadMore=function(l){this.currentPage++,this.refreshPage(l)},l.prototype.refresh=function(){this.requestFail=!1,this.currentPage=1,this.getAllData()},l.prototype.pullRefresh=function(l){this.requestFail=!1,this.isEmpty=!1,this.currentPage=1,this.orderDetail=[],this.refreshPage(l)},l.prototype.refreshPage=function(l){var n=this;setTimeout(function(){n.getAllData(),l.complete()},500)},l.prototype.getAllData=function(){this.getOrderDetail(),this.getBonusSum()},l}();tc=Object(Pi.__decorate)([Object(Ti.i)({templateUrl:"order-detail.html",selector:"withdraw-orderDetail"}),Object(Pi.__metadata)("design:paramtypes",["function"==typeof(ec=void 0!==Ni&&Ni)&&ec||Object])],tc);var ec,ic=function(){function l(l,n){this.navParams=l,this.appService=n,this.pageSize=10,this.currentPage=1,this.awardDetail=[],this.count=0,this.isShow=!1,this.isEmpty=!1,this.requestFail=!1,this.isRefresh=!0,this.isLoadingShow=!1,this.load=Ki.load,this.getAllData()}return l.prototype.getAwardDetail=function(){var l=this;this.isLoadingShow=!0;this.appService.httpGet(Ki.API.bonusList+"?typeList=3,4&statusList=2&start="+(this.currentPage-1)*this.pageSize+"&limit="+this.pageSize).then(function(n){n.data.length>0&&(n.data.map(function(l){l.baseAmount=l.baseAmount.toFixed(2),l.percent=l.percent,l.amount=l.amount.toFixed(2),l.returnAmount=l.returnAmount.toFixed(2)}),(u=l.awardDetail).push.apply(u,n.data)),l.count=n.count,l.isEmpty=0===n.count,l.requestFail=!1,l.isLoadingShow=!1;var u}).catch(function(n){l.appService.getToken(n,function(){l.getAwardDetail()}),console.log(n),l.requestFail=!0,l.isEmpty=!1,l.isLoadingShow=!1})},l.prototype.getBonusSum=function(){var l=this;this.appService.httpGet(Ki.API.bonusSum+"?typeList=3,4&statusList=2").then(function(n){l.sum=n.sum,l.setIsShow(l.sum)}).catch(function(n){l.appService.getToken(n,function(){l.getBonusSum()}),console.log(n)})},l.prototype.setIsShow=function(l){return this.isShow=l>0},l.prototype.loadMore=function(l){this.currentPage++,this.refreshPage(l)},l.prototype.refresh=function(){this.requestFail=!1,this.currentPage=1,this.getAllData()},l.prototype.pullRefresh=function(l){this.requestFail=!1,this.isEmpty=!1,this.currentPage=1,this.awardDetail=[],this.refreshPage(l)},l.prototype.refreshPage=function(l){var n=this;setTimeout(function(){n.getAllData(),l.complete()},500)},l.prototype.getAllData=function(){this.getAwardDetail(),this.getBonusSum()},l}();ic=Object(Pi.__decorate)([Object(Ti.i)({templateUrl:"award-detail.html",selector:"withdraw-awardDetail"}),Object(Pi.__metadata)("design:paramtypes",["function"==typeof(ac=void 0!==Mi.m&&Mi.m)&&ac||Object,"function"==typeof(oc=void 0!==Ni&&Ni)&&oc||Object])],ic);var ac,oc,rc=[cs,ts,Yi,Jr,Uo,Wr,Fr,Ea,Da,Sa,jr,ea,ga,ca,vo,Ua,po,Ga,no,ao,Xa,Lo,Rs,Ts,xo,Ao,ir,Or,la,mr,Vs,Ws,Zs,Pr,Gr,lr,Wo,tc,ic,cr],sc=function(){return function(){}}();sc=Object(Pi.__decorate)([Object(Ti.u)({declarations:rc.concat([ms,vs,bs,ws,ys,Ss,Is,Os,xs,ks,Ds,js,Cs]),imports:[Ai.a,As.b,Ei.f,Mi.g.forRoot(cs,{backButtonText:"返回",modalEnter:"modal-slide-in",modalLeave:"modal-slide-out"},{links:[]})],bootstrap:[Mi.e],entryComponents:rc,providers:[rs.a,ss.a,Ni,Ki,Hi.a,Bi.a,{provide:Ti.l,useClass:Mi.f}]})],sc);var cc=u(79),_c=u(276),dc=u(277),pc=u(278),fc=u(279),hc=u(280),gc=u(281),mc=u(282),vc=u(283),bc=u(284),wc=u(285),yc=u(55),Sc=u(72),Ic=u(4),Oc=u(10),xc=u(5),kc=u(1),Dc=u(3),Cc=u(8),jc=u(48),Ac=u(39),Tc=u(6),Pc=u(51),Ec=Ti._3({encapsulation:2,styles:[],data:{}}),Mc=Ti._1("ng-component",cs,function(l){return Ti._29(0,[(l()(),Ti._6(0,null,null,1,"ng-component",[],null,null,null,t,Ec)),Ti._4(49152,null,0,cs,[Dc.a,Pc.a,rs.a,ss.a,Ni],null,null)],null,null)},{},{},[]),Lc=u(25),qc=u(30),Rc=u(18),$c=u(31),Gc=u(23),Kc=u(19),Nc=u(16),Fc=u(12),Uc=u(13),zc=u(46),Vc=u(50),Bc=u(27),Hc=u(24),Yc=u(44),Wc=u(45),Xc=u(62),Jc=u(26),Qc=u(47),Zc=u(9),l_=u(66),n_=u(286),u_=u(91),t_=u(14),e_=u(11),i_=Ti._3({encapsulation:2,styles:[],data:{}}),a_=Ti._1("login",ts,function(l){return Ti._29(0,[(l()(),Ti._6(0,null,null,1,"login",[],null,null,null,a,i_)),Ti._4(49152,null,0,ts,[Oc.a,xc.a,Ni,Ei.e],null,null)],null,null)},{},{},[]),o_=Ti._3({encapsulation:2,styles:[],data:{}}),r_=Ti._1("forget",Yi,function(l){return Ti._29(0,[(l()(),Ti._6(0,null,null,1,"forget",[],null,null,null,o,o_)),Ti._4(49152,null,0,Yi,[Oc.a],null,null)],null,null)},{},{},[]),s_=u(28),c_=u(17),__=Ti._3({encapsulation:2,styles:[],data:{}}),d_=Ti._1("update-pwd",Jr,function(l){return Ti._29(0,[(l()(),Ti._6(0,null,null,1,"update-pwd",[],null,null,null,_,__)),Ti._4(49152,null,0,Jr,[Oc.a,s_.a,c_.a,Ni,xc.a],null,null)],null,null)},{},{},[]),p_=u(69),f_=u(95),h_=u(96),g_=u(94),m_=u(42),v_=u(75),b_=Ti._3({encapsulation:2,styles:[],data:{}}),w_=Ti._1("home",Uo,function(l){return Ti._29(0,[(l()(),Ti._6(0,null,null,1,"home",[],null,null,null,d,b_)),Ti._4(49152,null,0,Uo,[m_.a,Oc.a,Ni,s_.a,v_.a],null,null)],null,null)},{},{},[]),y_=u(287),S_=u(74),I_=u(288),O_=u(106),x_=Ti._3({encapsulation:2,styles:[],data:{}}),k_=Ti._1("ng-component",Wr,function(l){return Ti._29(0,[(l()(),Ti._6(0,null,null,1,"ng-component",[],null,null,null,p,x_)),Ti._4(49152,null,0,Wr,[],null,null)],null,null)},{},{},[]),D_=Ti._3({encapsulation:2,styles:[],data:{}}),C_=Ti._1("personl",Fr,function(l){return Ti._29(0,[(l()(),Ti._6(0,null,null,1,"personl",[],null,null,null,f,D_)),Ti._4(49152,null,0,Fr,[Sc.a,Oc.a,m_.a,Ic.a,xc.a,Ni],null,null)],null,null)},{},{},[]),j_=Ti._3({encapsulation:2,styles:[],data:{}}),A_=Ti._1("order-info",Ea,function(l){return Ti._29(0,[(l()(),Ti._6(0,null,null,1,"order-info",[],null,null,null,b,j_)),Ti._4(49152,null,0,Ea,[Oc.a,s_.a,Ic.a,c_.a,Ni],null,null)],null,null)},{},{},[]),T_=Ti._3({encapsulation:2,styles:[],data:{}}),P_=Ti._1("gift-info",Da,function(l){return Ti._29(0,[(l()(),Ti._6(0,null,null,1,"gift-info",[],null,null,null,y,T_)),Ti._4(49152,null,0,Da,[Oc.a,s_.a,Ic.a,c_.a,Ni],null,null)],null,null)},{},{},[]),E_=u(32),M_=u(36),L_=u(34),q_=u(29),R_=u(22),$_=u(33),G_=u(37),K_=u(35),N_=u(90),F_=Ti._3({encapsulation:2,styles:[],data:{}}),U_=Ti._1("creat-order",Sa,function(l){return Ti._29(0,[(l()(),Ti._6(0,null,null,1,"creat-order",[],null,null,null,A,F_)),Ti._4(49152,null,0,Sa,[m_.a,Oc.a,s_.a,Ni],null,null)],null,null)},{},{},[]),z_=Ti._3({encapsulation:2,styles:[],data:{}}),V_=Ti._1("help",jr,function(l){return Ti._29(0,[(l()(),Ti._6(0,null,null,1,"help",[],null,null,null,T,z_)),Ti._4(49152,null,0,jr,[Oc.a,s_.a],null,null)],null,null)},{},{},[]),B_=u(49),H_=u(111),Y_=u(101),W_=Ti._3({encapsulation:2,styles:[],data:{}}),X_=Ti._1("order-layer",ea,function(l){return Ti._29(0,[(l()(),Ti._6(0,null,null,1,"order-layer",[],null,null,null,$,W_)),Ti._4(49152,null,0,ea,[Oc.a,Ic.a,c_.a,Ni,Y_.a],null,null)],null,null)},{},{},[]),J_=u(289),Q_=u(98),Z_=u(97),ld=Ti._3({encapsulation:2,styles:[],data:{}}),nd=Ti._1("order-store",ga,function(l){return Ti._29(0,[(l()(),Ti._6(0,null,null,1,"order-store",[],null,null,null,V,ld)),Ti._4(49152,null,0,ga,[Oc.a,m_.a,s_.a,Ni],null,null)],null,null)},{},{},[]),ud=u(207),td=Ti._3({encapsulation:2,styles:[],data:{}}),ed=Ti._1("payment-code",ca,function(l){return Ti._29(0,[(l()(),Ti._6(0,null,null,1,"payment-code",[],null,null,null,B,td)),Ti._4(49152,null,0,ca,[Oc.a,xc.a,c_.a,Ni,v_.a],null,null)],null,null)},{},{},[]),id=Ti._3({encapsulation:2,styles:[],data:{}}),ad=Ti._1("unaudit-tabs",vo,function(l){return Ti._29(0,[(l()(),Ti._6(0,null,null,1,"unaudit-tabs",[],null,null,null,hl,id)),Ti._4(49152,null,0,vo,[Oc.a,s_.a,c_.a,Ni,m_.a],null,null)],null,null)},{},{},[]),od=u(110),rd=Ti._3({encapsulation:2,styles:[],data:{}}),sd=Ti._1("unaudit-cancelorder",Ua,function(l){return Ti._29(0,[(l()(),Ti._6(0,null,null,1,"unaudit-cancelorder",[],null,null,null,xl,rd)),Ti._4(49152,null,0,Ua,[Oc.a,m_.a,s_.a,od.a,Ni],null,null)],null,null)},{},{},[]),cd=Ti._3({encapsulation:2,styles:[],data:{}}),_d=Ti._1("unaudit-returnorder",po,function(l){return Ti._29(0,[(l()(),Ti._6(0,null,null,1,"unaudit-returnorder",[],null,null,null,ql,cd)),Ti._4(49152,null,0,po,[Oc.a,m_.a,s_.a,Ni],null,null)],null,null)},{},{},[]),dd=Ti._3({encapsulation:2,styles:[],data:{}}),pd=Ti._1("audit-cancelorder",Ga,function(l){return Ti._29(0,[(l()(),Ti._6(0,null,null,1,"audit-cancelorder",[],null,null,null,Bl,dd)),Ti._4(49152,null,0,Ga,[Oc.a,s_.a,Ni],null,null)],null,null)},{},{},[]),fd=Ti._3({encapsulation:2,styles:[],data:{}}),hd=Ti._1("audit-returnorder",no,function(l){return Ti._29(0,[(l()(),Ti._6(0,null,null,1,"audit-returnorder",[],null,null,null,nn,fd)),Ti._4(49152,null,0,no,[Oc.a,m_.a,s_.a,Ni],null,null)],null,null)},{},{},[]),gd=Ti._3({encapsulation:2,styles:[],data:{}}),md=Ti._1("return-detail",ao,function(l){return Ti._29(0,[(l()(),Ti._6(0,null,null,1,"return-detail",[],null,null,null,cn,gd)),Ti._4(49152,null,0,ao,[Oc.a,Ic.a,s_.a,c_.a,Ni],null,null)],null,null)},{},{},[]),vd=Ti._3({encapsulation:2,styles:[],data:{}}),bd=Ti._1("returned-detail",Xa,function(l){return Ti._29(0,[(l()(),Ti._6(0,null,null,1,"returned-detail",[],null,null,null,vn,vd)),Ti._4(49152,null,0,Xa,[Oc.a,s_.a,c_.a,Ni],null,null)],null,null)},{},{},[]),wd=u(117),yd=u(67),Sd=u(54),Id=Ti._3({encapsulation:2,styles:[],data:{}}),Od=Ti._1("unhandle-tabs",Lo,function(l){return Ti._29(0,[(l()(),Ti._6(0,null,null,1,"unhandle-tabs",[],null,null,null,Fn,Id)),Ti._4(49152,null,0,Lo,[Oc.a,s_.a,c_.a,Ni,m_.a,Ti.x],null,null)],null,null)},{},{},[]),xd=Ti._3({encapsulation:2,styles:[],data:{}}),kd=Ti._1("unhandle-selfgift",Rs,function(l){return Ti._29(0,[(l()(),Ti._6(0,null,null,1,"unhandle-selfgift",[],null,null,null,Zn,xd)),Ti._4(49152,null,0,Rs,[Oc.a,m_.a,s_.a,Ti.g,Ni,Ti.x],null,null)],null,null)},{},{},[]),Dd=Ti._3({encapsulation:2,styles:[],data:{}}),Cd=Ti._1("unhandle-expressgift",Ts,function(l){return Ti._29(0,[(l()(),Ti._6(0,null,null,1,"unhandle-expressgift",[],null,null,null,au,Dd)),Ti._4(49152,null,0,Ts,[Oc.a,m_.a,s_.a,Ni],null,null)],null,null)},{},{},[]),jd=Ti._3({encapsulation:2,styles:[],data:{}}),Ad=Ti._1("handle-selfgift",xo,function(l){return Ti._29(0,[(l()(),Ti._6(0,null,null,1,"handle-selfgift",[],null,null,null,gu,jd)),Ti._4(49152,null,0,xo,[Oc.a,s_.a,Ni],null,null)],null,null)},{},{},[]),Td=Ti._3({encapsulation:2,styles:[],data:{}}),Pd=Ti._1("handle-expressgift",Ao,function(l){return Ti._29(0,[(l()(),Ti._6(0,null,null,1,"handle-expressgift",[],null,null,null,xu,Td)),Ti._4(49152,null,0,Ao,[Oc.a,s_.a,Ni],null,null)],null,null)},{},{},[]),Ed=Ti._3({encapsulation:2,styles:[],data:{}}),Md=Ti._1("withdraw",ir,function(l){return Ti._29(0,[(l()(),Ti._6(0,null,null,1,"withdraw",[],null,null,null,Du,Ed)),Ti._4(49152,null,0,ir,[Oc.a,c_.a,s_.a,Ni],null,null)],null,null)},{},{},[]),Ld=Ti._3({encapsulation:2,styles:[],data:{}}),qd=Ti._1("withdraw-record",Or,function(l){return Ti._29(0,[(l()(),Ti._6(0,null,null,1,"withdraw-record",[],null,null,null,qu,Ld)),Ti._4(49152,null,0,Or,[Oc.a,s_.a,c_.a,Ni],null,null)],null,null)},{},{},[]),Rd=Ti._3({encapsulation:2,styles:[],data:{}}),$d=Ti._1("mycode",la,function(l){return Ti._29(0,[(l()(),Ti._6(0,null,null,1,"mycode",[],null,null,null,Ku,Rd)),Ti._4(49152,null,0,la,[Oc.a,Ic.a,Ni],null,null)],null,null)},{},{},[]),Gd=Ti._3({encapsulation:2,styles:[],data:{}}),Kd=Ti._1("award-tabs",mr,function(l){return Ti._29(0,[(l()(),Ti._6(0,null,null,1,"award-tabs",[],null,null,null,_t,Gd)),Ti._4(49152,null,0,mr,[Oc.a,c_.a,Ic.a,Dc.a,Ni],null,null)],null,null)},{},{},[]),Nd=Ti._3({encapsulation:2,styles:[],data:{}}),Fd=Ti._1("award-activity",Vs,function(l){return Ti._29(0,[(l()(),Ti._6(0,null,null,1,"award-activity",[],null,null,null,kt,Nd)),Ti._4(49152,null,0,Vs,[Oc.a,s_.a,Ni],null,null)],null,null)},{},{},[]),Ud=Ti._3({encapsulation:2,styles:[],data:{}}),zd=Ti._1("award-order",Ws,function(l){return Ti._29(0,[(l()(),Ti._6(0,null,null,1,"award-order",[],null,null,null,Lt,Ud)),Ti._4(49152,null,0,Ws,[Oc.a,s_.a,Ni],null,null)],null,null)},{},{},[]),Vd=Ti._3({encapsulation:2,styles:[],data:{}}),Bd=Ti._1("bind-account",Zs,function(l){return Ti._29(0,[(l()(),Ti._6(0,null,null,1,"bind-account",[],null,null,null,qt,Vd)),Ti._4(49152,null,0,Zs,[Oc.a,m_.a,c_.a],null,null)],null,null)},{},{},[]),Hd=Ti._3({encapsulation:2,styles:[],data:{}}),Yd=Ti._1("add-account",Pr,function(l){return Ti._29(0,[(l()(),Ti._6(0,null,null,1,"add-account",[],null,null,null,Yt,Hd)),Ti._4(49152,null,0,Pr,[Oc.a,c_.a,Ic.a,Ni,xc.a,s_.a],null,null)],null,null)},{},{},[]),Wd=Ti._3({encapsulation:2,styles:[],data:{}}),Xd=Ti._1("edit-account",Gr,function(l){return Ti._29(0,[(l()(),Ti._6(0,null,null,1,"edit-account",[],null,null,null,Wt,Wd)),Ti._4(49152,null,0,Gr,[Oc.a,s_.a],null,null)],null,null)},{},{},[]),Jd=Ti._3({encapsulation:2,styles:[],data:{}}),Qd=Ti._1("order-list",lr,function(l){return Ti._29(0,[(l()(),Ti._6(0,null,null,1,"order-list",[],null,null,null,fe,Jd)),Ti._4(49152,null,0,lr,[Oc.a,Ni,v_.a],null,null)],null,null)},{},{},[]),Zd=Ti._3({encapsulation:2,styles:[],data:{}}),lp=Ti._1("order-list",Wo,function(l){return Ti._29(0,[(l()(),Ti._6(0,null,null,1,"order-list",[],null,null,null,Me,Zd)),Ti._4(49152,null,0,Wo,[Oc.a,Ni],null,null)],null,null)},{},{},[]),np=Ti._3({encapsulation:2,styles:[],data:{}}),up=Ti._1("withdraw-orderDetail",tc,function(l){return Ti._29(0,[(l()(),Ti._6(0,null,null,1,"withdraw-orderDetail",[],null,null,null,Ue,np)),Ti._4(49152,null,0,tc,[Ni],null,null)],null,null)},{},{},[]),tp=Ti._3({encapsulation:2,styles:[],data:{}}),ep=Ti._1("withdraw-awardDetail",ic,function(l){return Ti._29(0,[(l()(),Ti._6(0,null,null,1,"withdraw-awardDetail",[],null,null,null,ei,tp)),Ti._4(49152,null,0,ic,[c_.a,Ni],null,null)],null,null)},{},{},[]),ip=Ti._3({encapsulation:2,styles:[],data:{}}),ap=Ti._1("withdraw-detailTabs",cr,function(l){return Ti._29(0,[(l()(),Ti._6(0,null,null,1,"withdraw-detailTabs",[],null,null,null,ji,ip)),Ti._4(49152,null,0,cr,[Oc.a,c_.a,Ic.a,Dc.a,Ni],null,null)],null,null)},{},{},[]),op=u(145),rp=u(126),sp=u(61),cp=u(201),_p=u(81),dp=u(73),pp=u(135),fp=u(142),hp=u(200),gp=u(143),mp=u(130),vp=u(144),bp=Ti._2(sc,[cc.b],function(l){return Ti._17([Ti._18(512,Ti.j,Ti.Y,[[8,[_c.a,dc.a,pc.a,fc.a,hc.a,gc.a,mc.a,vc.a,bc.a,Mc,a_,r_,d_,w_,k_,C_,A_,P_,U_,V_,X_,nd,ed,ad,sd,_d,pd,hd,md,bd,Od,kd,Cd,Ad,Pd,Md,qd,$d,Kd,Fd,zd,Bd,Yd,Xd,Qd,lp,up,ep,ap]],[3,Ti.j],Ti.v]),Ti._18(5120,Ti.t,Ti._16,[[3,Ti.t]]),Ti._18(4608,Zc.l,Zc.k,[Ti.t]),Ti._18(5120,Ti.b,Ti._7,[]),Ti._18(5120,Ti.r,Ti._13,[]),Ti._18(5120,Ti.s,Ti._14,[]),Ti._18(4608,Ai.c,Ai.s,[Zc.c]),Ti._18(6144,Ti.I,null,[Ai.c]),Ti._18(4608,Ai.f,op.a,[]),Ti._18(5120,Ai.d,function(l,n,u,t){return[new Ai.l(l),new Ai.p(n),new Ai.o(u,t)]},[Zc.c,Zc.c,Zc.c,Ai.f]),Ti._18(4608,Ai.e,Ai.e,[Ai.d,Ti.x]),Ti._18(135680,Ai.n,Ai.n,[Zc.c]),Ti._18(4608,Ai.m,Ai.m,[Ai.e,Ai.n]),Ti._18(6144,Ti.G,null,[Ai.m]),Ti._18(6144,Ai.q,null,[Ai.n]),Ti._18(4608,Ti.L,Ti.L,[Ti.x]),Ti._18(4608,Ai.h,Ai.h,[Zc.c]),Ti._18(4608,Ai.j,Ai.j,[Zc.c]),Ti._18(4608,Ei.c,Ei.c,[]),Ti._18(4608,Ei.h,Ei.b,[]),Ti._18(5120,Ei.j,Ei.k,[]),Ti._18(4608,Ei.i,Ei.i,[Ei.c,Ei.h,Ei.j]),Ti._18(4608,Ei.g,Ei.a,[]),Ti._18(5120,Ei.e,Ei.l,[Ei.i,Ei.g]),Ti._18(4608,Jc.o,Jc.o,[]),Ti._18(4608,Jc.c,Jc.c,[]),Ti._18(4608,rp.a,rp.a,[xc.a,kc.a]),Ti._18(4608,s_.a,s_.a,[xc.a,kc.a]),Ti._18(4608,v_.a,v_.a,[]),Ti._18(4608,Hc.a,Hc.a,[]),Ti._18(4608,sp.a,sp.a,[Dc.a]),Ti._18(4608,Uc.a,Uc.a,[kc.a,Dc.a,Ti.x,Tc.a]),Ti._18(4608,Y_.a,Y_.a,[xc.a,kc.a]),Ti._18(5120,Zc.g,cp.b,[Zc.r,[2,Zc.a],kc.a]),Ti._18(4608,Zc.f,Zc.f,[Zc.g]),Ti._18(5120,_p.b,_p.d,[xc.a,_p.a]),Ti._18(5120,Ac.a,Ac.b,[xc.a,_p.b,Zc.f,dp.b,Ti.j]),Ti._18(4608,m_.a,m_.a,[xc.a,kc.a,Ac.a]),Ti._18(4608,Sd.a,Sd.a,[xc.a,kc.a]),Ti._18(4608,pp.a,pp.a,[xc.a,kc.a,Ac.a]),Ti._18(4608,fp.a,fp.a,[kc.a,Dc.a,Tc.a,xc.a,Cc.l]),Ti._18(4608,od.a,od.a,[xc.a,kc.a]),Ti._18(4608,jc.a,jc.a,[Dc.a,kc.a]),Ti._18(4608,rs.a,rs.a,[]),Ti._18(4608,ss.a,ss.a,[]),Ti._18(4608,Ni,Ni,[Ei.e,Y_.a,od.a]),Ti._18(4608,Ki,Ki,[]),Ti._18(4608,Hi.a,Hi.a,[]),Ti._18(4608,Bi.a,Bi.a,[]),Ti._18(512,Zc.b,Zc.b,[]),Ti._18(512,Ti.l,hp.a,[]),Ti._18(256,kc.b,{backButtonText:"返回",modalEnter:"modal-slide-in",modalLeave:"modal-slide-out"},[]),Ti._18(1024,gp.a,gp.b,[]),Ti._18(1024,Dc.a,Dc.b,[Ai.b,gp.a,Ti.x]),Ti._18(1024,kc.a,kc.c,[kc.b,Dc.a]),Ti._18(512,Tc.a,Tc.a,[Dc.a]),Ti._18(512,Pc.a,Pc.a,[]),Ti._18(512,xc.a,xc.a,[kc.a,Dc.a,[2,Pc.a]]),Ti._18(512,Cc.l,Cc.l,[xc.a]),Ti._18(256,_p.a,{links:[]},[]),Ti._18(512,Ti.h,Ti.h,[]),Ti._18(512,mp.a,mp.a,[Ti.h]),Ti._18(1024,dp.b,dp.c,[mp.a,Ti.q]),Ti._18(1024,Ti.c,function(l,n,u,t,e,i,a,o,r,s,c,_,d,p){return[Ai.r(l,n),vp.a(u),v_.b(t,e),fp.b(i,a,o,r,s),dp.d(c,_,d,p)]},[[2,Ai.i],[2,Ti.w],kc.a,Dc.a,Tc.a,kc.a,Dc.a,Tc.a,xc.a,Cc.l,kc.a,_p.a,dp.b,Ti.x]),Ti._18(512,Ti.d,Ti.d,[[2,Ti.c]]),Ti._18(131584,Ti._5,Ti._5,[Ti.x,Ti.Z,Ti.q,Ti.l,Ti.j,Ti.d]),Ti._18(2048,Ti.f,null,[Ti._5]),Ti._18(512,Ti.e,Ti.e,[Ti.f]),Ti._18(512,Ai.a,Ai.a,[[3,Ai.a]]),Ti._18(512,As.b,As.b,[]),Ti._18(512,Ei.f,Ei.f,[]),Ti._18(512,Jc.m,Jc.m,[]),Ti._18(512,Jc.d,Jc.d,[]),Ti._18(512,Jc.k,Jc.k,[]),Ti._18(512,cp.a,cp.a,[]),Ti._18(512,sc,sc,[]),Ti._18(256,cc.a,cs,[]),Ti._18(256,Zc.a,"/",[])])});Object(Ti.S)(),Object(Ai.k)().bootstrapModuleFactory(bp)}},[208]);
>>>>>>> upstream/wechat
