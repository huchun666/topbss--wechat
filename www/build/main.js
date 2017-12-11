webpackJsonp([0],{

/***/ 112:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return Login; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_http__ = __webpack_require__(48);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_ionic_angular__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__app_app_service__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__forget_forget__ = __webpack_require__(210);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__tabs_tabs__ = __webpack_require__(59);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_buffer__ = __webpack_require__(110);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_buffer___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_6_buffer__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__update_pwd_update_pwd__ = __webpack_require__(238);
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
        this.username = ""; //15618146206
        this.pwd = ""; //123456
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
            var base64encode = new __WEBPACK_IMPORTED_MODULE_6_buffer__["Buffer"]('testClient:secret').toString('base64');
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
                            _this.appService.setItem("user", JSON.stringify(user));
                            _this.appService.setItem("tpb_token", data.access_token); //测试一下看结果
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
                if (error.status == 401 && error.json().error == "invalid_token") {
                    var base64encode_1 = new __WEBPACK_IMPORTED_MODULE_6_buffer__["Buffer"]('testClient:secret').toString('base64');
                    _this.oauthTokenHeaders = new __WEBPACK_IMPORTED_MODULE_0__angular_http__["a" /* Headers */]({
                        'Authorization': 'Basic ' + base64encode_1,
                        'Content-Type': 'application/x-www-form-urlencoded'
                    });
                    var oauthTokenUrl_1 = __WEBPACK_IMPORTED_MODULE_3__app_app_service__["a" /* AppConfig */].oauthTokenUrl;
                    var body_1 = "grant_type=" + __WEBPACK_IMPORTED_MODULE_3__app_app_service__["a" /* AppConfig */].grant_type + "&refresh_token=" + _this.appService.getItem("refresh_token");
                    return _this.appService.httpPostHeader(oauthTokenUrl_1, body_1, _this.oauthTokenHeaders).then(function (data) {
                        _this.appService.setItem("tpb_token", data.access_token);
                        _this.appService.setItem("refresh_token", data.refresh_token);
                    }).catch(function (err) {
                        console.log(err);
                    });
                }
                else if (error.status == 400 && error.json().error == "invalid_grant") {
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
        selector: 'login',template:/*ion-inline-start:"C:\Users\think\huchunGit\tpb02\tpb\src\pages\login\login.html"*/'<ion-content>\n\n  <h1 class="logo" ><img src="./assets/image/logo.png" alt="淘璞帮"></h1>\n\n  <div class="login-content">\n\n    <ion-list>\n\n      <ion-item>\n\n        <ion-input [(ngModel)]="username" type="text" placeholder="账号或手机号码" maxlength=11 required clearInput=true (ionBlur)="onblurAffirm()"></ion-input>\n\n      </ion-item>\n\n      <div class=\'login-error\' *ngIf="isUserName">{{userNameValue}}</div>\n\n      <ion-item>\n\n        <ion-input [(ngModel)]="pwd" type="password" placeholder="密码" required clearInput=true></ion-input>\n\n      </ion-item>\n\n      <div class=\'login-error\' *ngIf="isPwd">{{userPwdValue}}</div>\n\n      <ion-item>\n\n        <ion-label>记住密码</ion-label>\n\n        <ion-checkbox [(ngModel)]="rememberPassword"></ion-checkbox>\n\n      </ion-item>\n\n      <!-- <ion-item  class="forget" (click)="forget()">\n\n        <span>忘记密码?</span>\n\n      </ion-item> -->\n\n    </ion-list>\n\n    <button class="btn-login" ion-button block round (click)="login()">登录</button>\n\n    <!-- <div class="error3" *ngIf="isNameAndPwd">账号或密码不正确，请确认后重新输入</div> -->\n\n  </div>\n\n</ion-content>\n\n'/*ion-inline-end:"C:\Users\think\huchunGit\tpb02\tpb\src\pages\login\login.html"*/
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
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__app_app_service__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_ionic_angular__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_crypto_js__ = __webpack_require__(326);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_crypto_js___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_crypto_js__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_js_base64__ = __webpack_require__(350);
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
            _this.brandshopIndexUrl = data.brandshopIndexUrl;
            var myCodeUrl = data.userRecommendWechatQrCodeUrl + "?type=U&userId=" + data.brandshopUserId + "&accessKeyId=topbabyBs&signature=" + obj.signature + "&expires=" + obj.expires;
            _this.getMyQRcode(myCodeUrl);
        })
            .catch(function (error) {
            console.log(error);
        });
    };
    // 获取导购员带参二维码
    MyCode.prototype.getMyQRcode = function (paramUrl) {
        var _this = this;
        this.appService.httpGet(paramUrl)
            .then(function (data) {
            _this.myCode = data.url;
        })
            .catch(function (error) {
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
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__app_app_service__ = __webpack_require__(5);
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
        selector: 'audit-cancelorder',template:/*ion-inline-start:"C:\Users\think\huchunGit\tpb02\tpb\src\pages\audit-cancelorder\audit-cancelorder.html"*/'<ion-header>\n\n  <ion-navbar>\n\n    <ion-title text-center>已审核取消订单</ion-title>\n\n  </ion-navbar>\n\n  \n\n</ion-header>\n\n<ion-content>\n\n  <ion-refresher (ionRefresh)="refreshGetSelfGiftList($event)" *ngIf="!loadingShow">\n\n    <ion-refresher-content></ion-refresher-content>\n\n  </ion-refresher>\n\n  <div class="order-list">\n\n    <!-- loading -->\n\n    <div class="loading-wrapper" *ngIf="loadingShow">\n\n      <div>\n\n        <ion-spinner item-start [name]="load.spinner"></ion-spinner>\n\n      </div>\n\n      <div [innerHTML]="load.content"></div>\n\n    </div>\n\n    <div class="order-items" *ngFor="let item of auditCancelorderArray;let i = index">\n\n      <div class="order-title">\n\n        <h2>订单编号：\n\n          <span>{{item.orderId}}</span>\n\n        </h2>\n\n        <span [ngClass]="{auditStatus: true, pass:(item.status | setCancelOrderStatus).pass , auditing:(item.status | setCancelOrderStatus).audit} ">{{(item.status | setCancelOrderStatus).status}}</span>\n\n      </div>\n\n\n\n      <div class="order-item" *ngFor="let single of item.itemList">\n\n        <dl>\n\n          <dt>\n\n            <img class="my-picture" [src]="single.productSkuDTO.fileSeq | productSkuDTOImage" [alt]="single.productSkuDTO.productName">\n\n          </dt>\n\n          <dd class="product-title">{{ single.productSkuDTO.productName }}</dd>\n\n          <dd class="sku-list">\n\n            <span *ngFor="let sku of single.productSkuDTO.attrValueList">{{ sku.attrValue }} </span>\n\n          </dd>\n\n          <dd class=\'price\'>￥{{ single.unitPrice }}</dd>\n\n          <dd class="count">X{{ single.number }}</dd>\n\n        </dl>\n\n      </div>\n\n\n\n      <div class="orderOperate">\n\n        <dl>\n\n          <dd class="total">{{item.amount}}件商品，实付￥{{item.payAmount}}</dd>\n\n          <dd class="member-phone">会员手机：{{item.memberMobile}}</dd>\n\n        </dl>\n\n      </div>\n\n    </div>\n\n\n\n    <div class="no-data" *ngIf = "noData">\n\n      <img src="./assets/image/nodata.png" alt="">\n\n      <p>空空如也</p>\n\n    </div>\n\n    <div class="btn-noMore" *ngIf = "showNoMore">\n\n      <span>—— 没有更多信息了 ——</span>\n\n    </div>\n\n    <div class="request-defeat" *ngIf = "requestDefeat">\n\n      <img src="./assets/image/requestDefeat.png" alt="">\n\n      <p>啊哦！页面走丢了</p>\n\n      <button class="btn-request-defeat" ion-button full (touchstart)="requestDefeatRefresh()">\n\n        刷新再找一找\n\n      </button>\n\n    </div>\n\n    <ion-infinite-scroll (ionInfinite)="infiniteGetSelfGiftList($event)" *ngIf = "!showNoMore && showInfinite">\n\n      <ion-infinite-scroll-content loadingText="加载更多..."></ion-infinite-scroll-content>\n\n    </ion-infinite-scroll>\n\n\n\n  </div>\n\n\n\n</ion-content>'/*ion-inline-end:"C:\Users\think\huchunGit\tpb02\tpb\src\pages\audit-cancelorder\audit-cancelorder.html"*/
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
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__app_app_service__ = __webpack_require__(5);
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
        selector: 'audit-returnorder',template:/*ion-inline-start:"C:\Users\think\huchunGit\tpb02\tpb\src\pages\audit-returnorder\audit-returnorder.html"*/'<ion-header>\n\n  <ion-navbar>\n\n    <ion-title text-center>已审核退货订单</ion-title>\n\n  </ion-navbar>\n\n</ion-header>\n\n<ion-content>\n\n  <ion-refresher (ionRefresh)="doRefresh($event)" *ngIf="!loadingShow">\n\n    <ion-refresher-content></ion-refresher-content>\n\n  </ion-refresher>\n\n	<div class="order-list">\n\n    <!-- loading -->\n\n    <div class="loading-wrapper" *ngIf="loadingShow">\n\n      <div>\n\n        <ion-spinner item-start [name]="load.spinner"></ion-spinner>\n\n      </div>\n\n      <div [innerHTML]="load.content"></div>\n\n    </div>\n\n		<div class="order-items" (click)="goReturnedDetail(i)" *ngFor = "let item of auditReturnorderArray;let i = index">\n\n			<div class="order-title">\n\n          <h2>订单编号：\n\n            <span>{{item.orderId}}</span>\n\n          </h2>\n\n          <span [ngClass]="{auditStatus: true, pass:(item.status | setReturnOrderStatus).pass , auditing:(item.status | setReturnOrderStatus).audit} ">{{(item.status | setReturnOrderStatus).status}}</span>\n\n        </div>\n\n    \n\n        <div class="order-item">\n\n          <dl>\n\n            <dt>\n\n              <img class="my-picture" [src]="item.productSkuDTO.fileSeq | productSkuDTOImage" [alt]="item.productSkuDTO.productName">\n\n            </dt>\n\n            <dd class="product-title">{{ item.productSkuDTO.productName }}</dd>\n\n            <dd class="sku-list">\n\n              <span *ngFor="let sku of item.productSkuDTO.attrValueList">{{ sku.attrValue }} </span>\n\n            </dd>\n\n            <dd class=\'price\'>￥{{ item.unitPrice }}</dd>\n\n            <dd class="count">X{{ item.number }}</dd>\n\n          </dl>\n\n        </div>\n\n			\n\n			<div class="orderOperate">\n\n				<dl>\n\n					<dt>\n\n						\n\n					</dt>\n\n					<dd class="total">退货数量: {{item.number}}</dd>\n\n					<dd class="member-phone">会员手机：{{item.mobile}}</dd>\n\n				</dl>\n\n			</div>\n\n    </div>\n\n    \n\n		<div class="no-data" *ngIf = "noData">\n\n      <img src="./assets/image/nodata.png" alt="">\n\n      <p>空空如也</p>\n\n    </div>\n\n    <div class="btn-noMore" *ngIf = "showNoMore">\n\n      <span>—— 没有更多信息了 ——</span>\n\n    </div>\n\n    <div class="request-defeat" *ngIf = "requestDefeat">\n\n      <img src="./assets/image/requestDefeat.png" alt="">\n\n      <p>啊哦！页面走丢了</p>\n\n      <button class="btn-request-defeat" ion-button full (touchstart)="requestDefeatRefresh()">\n\n        刷新再找一找\n\n      </button>\n\n    </div>\n\n    <ion-infinite-scroll (ionInfinite)="infiniteGetSelfGiftList($event)" *ngIf = "!showNoMore && showInfinite">\n\n      <ion-infinite-scroll-content loadingText="加载更多..."></ion-infinite-scroll-content>\n\n    </ion-infinite-scroll>\n\n	</div>\n\n\n\n</ion-content>\n\n'/*ion-inline-end:"C:\Users\think\huchunGit\tpb02\tpb\src\pages\audit-returnorder\audit-returnorder.html"*/
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
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__app_app_service__ = __webpack_require__(5);
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
            message: "\u786E\u8BA4\u62D2\u7EDD\u4F1A\u5458" + this.returnDetail.orderReturn.name + "\u7684\u8BA2\u5355" + this.returnDetail.orderReturn.returnOrderId + "\u9000\u8D27\u7533\u8BF7\uFF1F",
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
        selector: 'return-detail',template:/*ion-inline-start:"C:\Users\think\huchunGit\tpb02\tpb\src\pages\return-detail\return-detail.html"*/'<ion-header>\n\n  <ion-navbar>\n\n    <ion-title text-center>退货详情</ion-title>\n\n  </ion-navbar>\n\n</ion-header>\n\n<ion-content>\n\n	<div class="order-list">\n\n		<!-- loading -->\n\n		<div class="loading-wrapper" *ngIf="loadingShow">\n\n			<div>\n\n				<ion-spinner item-start [name]="load.spinner"></ion-spinner>\n\n			</div>\n\n			<div [innerHTML]="load.content"></div>\n\n		</div>\n\n		<div class="order-items">\n\n			<div class="order-title">\n\n				<h2>订单编号：<span>{{returnDetail.orderReturn.returnOrderId}}</span></h2>\n\n				<span class="auditStatus">申请审核中</span>\n\n			</div>\n\n			<div class="order-item">\n\n			  <dl>\n\n			    <dt>\n\n			      <img class="my-picture" [src]="returnDetail.itemProductSkuDTO.productSkuDTO.fileSeq | productSkuDTOImage" [alt]="returnDetail.itemProductSkuDTO.productSkuDTO.productName">\n\n			    </dt>\n\n			    <dd class="product-title">{{returnDetail.itemProductSkuDTO.productSkuDTO.productName}}</dd>\n\n			    <dd class="sku-list">\n\n			      <span *ngFor="let sku of returnDetail.itemProductSkuDTO.productSkuDTO.attrValueList"> {{sku.attrValue}} </span>\n\n			    </dd>\n\n			    <dd class=\'price\'>￥{{returnDetail.itemProductSkuDTO.unitPrice}}</dd>\n\n			    <dd class="count">X{{returnDetail.itemProductSkuDTO.number}}</dd>\n\n			  </dl>\n\n			</div>\n\n			\n\n			<div class="orderOperate">\n\n				<dl>\n\n					<dt>\n\n					</dt>\n\n					<dd class="total">共{{returnDetail.orderReturn.number}}件商品，实付￥{{returnDetail.orderReturn.totalReturnPrice}}</dd>\n\n				</dl>\n\n			</div>\n\n		</div>\n\n\n\n		<div class="return-detail">\n\n			<ul>\n\n				<li>退货数量：{{returnDetail.orderReturn.number}}</li>\n\n				<li>联系方式：{{returnDetail.orderReturn.mobile}}</li> \n\n				<li>退货方式：{{returnDetail.orderReturn.returnType==1?\'其他\': \'快递\'}}</li>\n\n				<li>是否有发票：{{returnDetail.orderReturn.invoiced==1?\'有\': \'无\'}}</li>\n\n				<li>退货原因：{{returnDetail.orderReturn.reasonType | reasonType}}</li>\n\n				<li>问题描述：{{returnDetail.orderReturn.detail}}</li>\n\n				<li class="img-list" *ngIf = "imageArray">\n\n					<img [src]="itemImg | productSkuDTOImage" alt="" *ngFor = "let itemImg of imageArray">\n\n				</li>\n\n			</ul>\n\n		</div>\n\n	</div>\n\n\n\n	<div class="btn-list">\n\n		<button class="btn-update" ion-button outline (touchstart)="refuseReturn()">拒绝</button>\n\n		<button class="order-again" ion-button (touchstart)="agreeReturn()">同意</button>\n\n	</div>\n\n\n\n</ion-content>\n\n'/*ion-inline-end:"C:\Users\think\huchunGit\tpb02\tpb\src\pages\return-detail\return-detail.html"*/
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
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__app_app_service__ = __webpack_require__(5);
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
        this.load = {};
        this.loadingShow = true;
        this.requestDefeat = false;
        this.showInfinite = false;
        // 获取已兑换快递赠品列表
        this.down = true;
        this.up = false;
        this.load = __WEBPACK_IMPORTED_MODULE_2__app_app_service__["a" /* AppConfig */].load;
        this.getHandleExpressGiftList();
    }
    HandleExpressgift.prototype.getHandleExpressGiftList = function () {
        var _this = this;
        var url = __WEBPACK_IMPORTED_MODULE_2__app_app_service__["a" /* AppConfig */].API.getGiftList + "?type=1&start=" + this.start + "&limit=" + this.limit; //brandshopSeq=${this.brandshopSeqId}
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
        var url = __WEBPACK_IMPORTED_MODULE_2__app_app_service__["a" /* AppConfig */].API.getGiftList + "?type=1&start=" + this.start + "&limit=" + this.limit;
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
                    (_a = _this.handleExpressGiftArray).push.apply(_a, data.data);
                    _this.start += _this.limit;
                }
                else {
                    _this.showNoMore = true;
                }
            }
            var _a;
        }).catch(function (error) {
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
        selector: 'handle-expressgift',template:/*ion-inline-start:"C:\Users\think\huchunGit\tpb02\tpb\src\pages\handle-expressgift\handle-expressgift.html"*/'<ion-header>\n\n  <ion-navbar>\n\n    <ion-title text-center>已发货赠品</ion-title>\n\n  </ion-navbar>\n\n</ion-header>\n\n<ion-content>\n\n  <ion-refresher (ionRefresh)="refreshGetHandleExpressGiftList($event)" *ngIf="!loadingShow">\n\n    <ion-refresher-content></ion-refresher-content>\n\n  </ion-refresher>\n\n<div class="gift-list">\n\n	<!-- loading -->\n\n	<div class="loading-wrapper" *ngIf="loadingShow">\n\n		<div>\n\n			<ion-spinner item-start [name]="load.spinner"></ion-spinner>\n\n		</div>\n\n		<div [innerHTML]="load.content"></div>\n\n	</div>\n\n  <div class="gift-item" *ngFor = "let item of handleExpressGiftArray">\n\n		<dl>\n\n			<dt><img [src]="item.imageName | handleGiftImage" alt=""></dt>\n\n			<dd class="product-title">\n\n				<h2>{{item.giftName}}</h2>\n\n				<span class="unstart">立即兑换</span>\n\n			</dd>\n\n			<dd class="reserve-phone">\n\n				<span>会员手机：{{item.memberPhone}}</span>\n\n			</dd>\n\n			<dd class="get-time">领取时间：{{item.receiveDate | date:\'yyyy-MM-dd HH:mm:ss\'}}</dd>\n\n			<dd class="get-time">兑换时间：{{item.useDate | date:\'yyyy-MM-dd HH:mm:ss\'}}</dd>\n\n			<dd class="get-time">导购员：{{item.brandshopUserName}}</dd>\n\n		</dl>\n\n		<div class="reserve-time member-box">\n\n			<div class="member-info">\n\n				<ul>\n\n					<li *ngFor = "let single of item.attrValueList">{{single.label}}：{{single.value}}</li>\n\n				</ul>\n\n			</div>\n\n		</div>\n\n		<div class="reserve-time">\n\n			<div class="show-time">备注信息：{{item.giftRemark}}</div>\n\n		</div>\n\n  </div>\n\n\n\n</div>\n\n\n\n<div class="no-data" *ngIf = "noData">\n\n	<img src="./assets/image/nodata.png" alt="">\n\n	<p>空空如也</p>\n\n</div>\n\n<div class="btn-noMore" *ngIf = "showNoMore">\n\n	<span>—— 没有更多已兑换赠品了 ——</span>\n\n</div>\n\n<div class="request-defeat" *ngIf = "requestDefeat">\n\n	<img src="./assets/image/requestDefeat.png" alt="">\n\n	<p>啊哦！页面走丢了</p>\n\n	<button class="btn-request-defeat" ion-button full (touchstart)="requestDefeatRefresh()">\n\n		刷新再找一找\n\n	</button>\n\n</div>\n\n  <ion-infinite-scroll (ionInfinite)="infiniteGetHandleExpressGiftList($event)" *ngIf = "!showNoMore && showInfinite">\n\n    <ion-infinite-scroll-content loadingText="加载更多..."></ion-infinite-scroll-content>\n\n  </ion-infinite-scroll>\n\n</ion-content>\n\n'/*ion-inline-end:"C:\Users\think\huchunGit\tpb02\tpb\src\pages\handle-expressgift\handle-expressgift.html"*/
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
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__app_app_service__ = __webpack_require__(5);
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
                id: this.userId,
                salesName: this.salesName,
                cellphone: this.cellphone,
                idcard: this.IDcard
            };
            //更新导购员账户
            this.appService.httpPut(editCurrentUrl, editParameters).then(function (data) {
                if (data.type == "success") {
                    _this.loadingShow = false;
                    var redirectUri = "https://mobile.91topbaby.com";
                    var encodeUrl = encodeURIComponent(redirectUri);
                    var getCodeUrl = __WEBPACK_IMPORTED_MODULE_2__app_app_service__["a" /* AppConfig */].API.connect + "?appid=" + __WEBPACK_IMPORTED_MODULE_2__app_app_service__["a" /* AppConfig */].appID + "&redirect_uri=" + encodeUrl + "&response_type=code&scope=snsapi_userinfo&state=STATE#wechat_redirect";
                    _this.appService.httpGet(getCodeUrl)
                        .catch(function (error) {
                        console.log(error);
                        _this.appService.toast('操作失败，请稍后重试', 1000, 'middle');
                    });
                }
            }).catch(function (error) {
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
            console.log(error);
            _this.loadingShow = false;
            _this.requestDefeat = true;
            _this.accountContent = false;
        });
    };
    AddAccount.prototype.ionViewDidEnter = function () {
        var _this = this;
        this.userId = this.navParams.get("userId");
        //重定向判断
        if (this.userId && window.location.search && window.location.search.split("?")[1].indexOf("code") > -1) {
            this.accountContent = false;
            var loading_1 = this.appService.loading();
            loading_1.present();
            var code = window.location.search.split("?")[1].split("&")[0].split("=")[1];
            var getTokenUrl = __WEBPACK_IMPORTED_MODULE_2__app_app_service__["a" /* AppConfig */].API.sns + "?appid=" + __WEBPACK_IMPORTED_MODULE_2__app_app_service__["a" /* AppConfig */].appID + "&secret=" + __WEBPACK_IMPORTED_MODULE_2__app_app_service__["a" /* AppConfig */].appSecret + "&code=" + code + "&grant_type=authorization_code";
            this.appService.httpGet(getTokenUrl).then(function (data) {
                if (data.errcode) {
                    loading_1.dismiss();
                    _this.requestDefeat = true;
                    _this.noBind = true;
                }
                else {
                    var openid = data.openid;
                    var updateCurrentUrl = __WEBPACK_IMPORTED_MODULE_2__app_app_service__["a" /* AppConfig */].API.current;
                    var updateParameters = {
                        id: _this.userId,
                        salesName: _this.salesName,
                        cellphone: _this.cellphone,
                        wechatOpenid: openid,
                        idcard: _this.IDcard
                    };
                    //更新导购员账户
                    _this.appService.httpPut(updateCurrentUrl, updateParameters).then(function (data) {
                        if (data.type == "success") {
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
        if (!code || !/^\d{6}(18|19|20)?\d{2}(0[1-9]|1[12])(0[1-9]|[12]\d|3[01])\d{3}(\d|X)$/i.test(code)) {
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
                var last = parity[sum % 11];
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
        selector: 'add-account',template:/*ion-inline-start:"C:\Users\think\huchunGit\tpb02\tpb\src\pages\account\add-account\add-account.html"*/'<ion-header>\n\n  <ion-navbar>\n\n    <ion-title text-center>收款账户</ion-title>\n\n  </ion-navbar>\n\n</ion-header>\n\n<ion-content>\n\n  <!-- loading -->\n\n  <div class="loading-wrapper" *ngIf="loadingShow">\n\n    <div>\n\n      <ion-spinner item-start [name]="load.spinner"></ion-spinner>\n\n    </div>\n\n    <div [innerHTML]="load.content"></div>\n\n  </div>\n\n  <div *ngIf="accountContent">\n\n    <div class="account-title" *ngIf="noBind">\n\n      填写收款人信息并绑定微信作为收款账户\n\n    </div>\n\n    <div class="account-title" *ngIf="!noBind">\n\n      <div class="binded"><img src="./assets/image/ok.png" alt="">已绑定微信</div>\n\n    </div>\n\n    <div class="form-list">\n\n      <ion-list>\n\n        <ion-item>\n\n          <ion-input [(ngModel)]="salesName" placeholder="输入收款人姓名" required></ion-input>\n\n        </ion-item>\n\n        <div class=\'bind-error\' *ngIf="isName">*请填写收款人</div>\n\n        <ion-item>\n\n          <ion-input type="tel" [(ngModel)]="cellphone" placeholder="输入收款人手机号码" maxlength=11 required></ion-input>\n\n        </ion-item>\n\n        <div class=\'bind-error\' *ngIf="isPhone">*请输入正确的手机号</div>\n\n        <ion-item>\n\n          <ion-input [(ngModel)]="IDcard" placeholder="输入收款人身份证号" required></ion-input>\n\n        </ion-item>\n\n        <div class=\'bind-error\' *ngIf="isIDCard">*请输入正确的身份证号</div>\n\n      </ion-list>\n\n    <button class="btn-bind" ion-button (click)="bindWX()" *ngIf="noBind">绑定微信</button>\n\n    <button class="btn-bind" ion-button (click)="editCurrent()" *ngIf="!noBind">确定</button>\n\n    <div class="message" *ngIf="noBind">*微信账户一旦绑定不能改，请谨慎操作</div>\n\n    </div>\n\n  </div>\n\n  <div class="request-defeat" *ngIf = "requestDefeat">\n\n    <img src="./assets/image/requestDefeat.png" alt="">\n\n    <p>啊哦！页面走丢了</p>\n\n    <button class="btn-request-defeat" ion-button full (touchstart)="getCurrent()">\n\n      刷新再找一找\n\n    </button>\n\n  </div>\n\n</ion-content>'/*ion-inline-end:"C:\Users\think\huchunGit\tpb02\tpb\src\pages\account\add-account\add-account.html"*/
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
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__app_app_service__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__mycode_mycode__ = __webpack_require__(113);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__creat_order_creat_order__ = __webpack_require__(214);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__gift_info_gift_info__ = __webpack_require__(218);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__order_info_order_info__ = __webpack_require__(219);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__unaudit_tabs_unaudit_tabs__ = __webpack_require__(220);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__unhandle_tabs_unhandle_tabs__ = __webpack_require__(224);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__handle_selfgift_handle_selfgift__ = __webpack_require__(61);
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
        var _this = this;
        var signUrl = "https%3A%2F%2Fwww.61topbaby.com%2Fevercos%2Fmember%2Findex.html&_=1512438037846";
        var url = __WEBPACK_IMPORTED_MODULE_2__app_app_service__["a" /* AppConfig */].API.signature + "?url=" + signUrl;
        this.appService.httpGet(url).then(function (data) {
            wx.config({
                debug: false,
                appId: data.appId,
                timestamp: data.timestamp,
                nonceStr: data.noncestr,
                signature: data.signature,
                jsApiList: ['scanQRCode']
            });
            wx.error(function (res) {
                console.log("微信验证失败" + res);
                var alert = this.alertCtrl.create({
                    title: '提示',
                    subTitle: '扫描失败，请重新再试',
                    buttons: ['确定']
                });
                alert.present();
            });
            wx.scanQRCode({
                needResult: 1,
                scanType: ["qrCode", "barCode"],
                success: function (res) {
                    var _this = this;
                    var url = res.resultStr; // 当needResult 为 1 时，扫码返回的结果
                    if (url.indexOf(__WEBPACK_IMPORTED_MODULE_2__app_app_service__["a" /* AppConfig */].hostUrl) < 0) {
                        var alert_1 = this.alertCtrl.create({
                            title: '提示',
                            subTitle: '请扫描淘璞系统内二维码',
                            buttons: ['确定']
                        });
                    }
                    else {
                        if (url.indexOf('id') > 0) {
                            var myCodeModal = this.modalCtrl.create(__WEBPACK_IMPORTED_MODULE_6__order_info_order_info__["a" /* OrderInfo */], { 'url': url });
                            myCodeModal.onDidDismiss(function (data) {
                                if (!data) {
                                    return;
                                }
                                if (data.type === '1') {
                                    _this.qrCodeScan();
                                }
                                else if (data.type === '0') {
                                    _this.navCtrl.parent.select(1);
                                    var orderStatus = 'C';
                                    _this.events.publish('order:status', orderStatus);
                                }
                            });
                            myCodeModal.present();
                        }
                        else if (url.indexOf('giftCode') > 0) {
                            var myCodeModal = this.modalCtrl.create(__WEBPACK_IMPORTED_MODULE_5__gift_info_gift_info__["a" /* GiftInfo */], { 'url': url });
                            myCodeModal.onDidDismiss(function (data) {
                                if (!data) {
                                    return;
                                }
                                if (data.type === '1') {
                                    _this.qrCodeScan();
                                }
                                else if (data.type === '0') {
                                    var giftModal = _this.modalCtrl.create(__WEBPACK_IMPORTED_MODULE_9__handle_selfgift_handle_selfgift__["a" /* HandleSelfgift */]);
                                    giftModal.present();
                                }
                            });
                            myCodeModal.present();
                        }
                        else {
                            var alert_2 = this.alertCtrl.create({
                                title: '提示',
                                subTitle: '请扫描订单或者赠品二维码',
                                buttons: ['确定']
                            });
                            alert_2.present();
                        }
                    }
                },
                fail: function (error) {
                    console.log(error);
                    var alert = this.alertCtrl.create({
                        title: '提示',
                        subTitle: '扫描失败，请重新再试',
                        buttons: ['确定']
                    });
                    alert.present();
                }
            });
        }).catch(function (error) {
            console.log(error);
            _this.appService.toast('操作失败，请稍后重试', 1000, 'middle');
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
            if (data) {
                _this.navCtrl.parent.select(1);
            }
        });
    };
    return Home;
}());
Home = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["n" /* Component */])({
        selector: 'home',template:/*ion-inline-start:"C:\Users\think\huchunGit\tpb02\tpb\src\pages\home\home.html"*/'<ion-header>\n\n  <ion-toolbar>\n\n	  <img class="logo-img" src="./assets/image/top.png" alt="淘璞帮">\n\n		<img class="logo-text" src="./assets/image/tpb.png" alt="淘璞帮">\n\n		<!-- <img class="logo-info" src="./assets/image/info.png" alt="淘璞帮"> -->\n\n  </ion-toolbar>\n\n</ion-header>\n\n<ion-content>\n\n  <div class="menu-list">\n\n    <ion-grid>\n\n      <ion-row>\n\n        <ion-col (touchstart)="qrCodeScan()">\n\n          <img class="logo-img" src="./assets/image/scan.png" alt="扫码确认">\n\n          <span>扫一扫</span>\n\n        </ion-col>\n\n        <ion-col (touchstart)="goMyCode()">\n\n          <img class="logo-img" src="./assets/image/mycode.png" alt="我的二维码">\n\n          <span>我的二维码</span>\n\n        </ion-col>\n\n        <ion-col (touchstart)="goCreatOrder()">\n\n          <img class="logo-img" src="./assets/image/order.png" alt="生成订单">\n\n          <span>生成订单</span>\n\n        </ion-col>\n\n      </ion-row>\n\n    </ion-grid>\n\n  </div>\n\n  <div class="order-unaudit">\n\n    <ion-grid>\n\n      <ion-row>\n\n        <ion-col>\n\n          <dl>\n\n            <dt class="order-title">待审核订单<span>{{ cancelOrderCount + returnOrderCount }}</span></dt>\n\n            <dd>取消订单<span>({{ cancelOrderCount }})</span></dd>\n\n            <dd>退货订单<span>({{ returnOrderCount }})</span></dd>\n\n          </dl>\n\n        </ion-col>\n\n        <ion-col>\n\n          <button ion-button outline round color="light" (touchstart)="goUnAudit()">立即处理</button>\n\n        </ion-col>\n\n      </ion-row>\n\n    </ion-grid>\n\n  </div>\n\n  <div class="gift-unhandle">\n\n    <ion-grid>\n\n      <ion-row>\n\n        <ion-col>\n\n          <dl>\n\n            <dt class="gift-title">待处理赠品<span>{{ selfGiftCount + expressgiftCount }}</span></dt>\n\n            <dd>自提赠品<span>({{ selfGiftCount }})</span></dd>\n\n            <dd>快递赠品<span>({{ expressgiftCount }})</span></dd>\n\n          </dl>\n\n        </ion-col>\n\n        <ion-col>\n\n          <button ion-button outline round color="light" (touchstart)="goUnHandle()">立即处理</button>\n\n        </ion-col>\n\n      </ion-row>\n\n    </ion-grid>\n\n  </div>\n\n</ion-content>\n\n'/*ion-inline-end:"C:\Users\think\huchunGit\tpb02\tpb\src\pages\home\home.html"*/
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["j" /* ModalController */],
        __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["l" /* NavController */],
        __WEBPACK_IMPORTED_MODULE_2__app_app_service__["b" /* AppService */],
        __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["a" /* AlertController */],
        __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["d" /* Events */]])
], Home);

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
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__app_app_service__ = __webpack_require__(5);
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
        this.searchKeyWord = event.target.value;
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
                console.log(error);
                _this.requestDefeat = true;
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
                infiniteScroll.complete();
                console.log(error);
                _this.requestDefeat = true;
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
        selector: 'creat-order',template:/*ion-inline-start:"C:\Users\think\huchunGit\tpb02\tpb\src\pages\creat-order\creat-order.html"*/'<ion-header>\n\n  <ion-navbar>\n\n    <ion-title text-center>配单列表</ion-title>\n\n    <span class=\'icon-creat-order\' (touchstart)="orderRepertory()">\n\n      <img src="./assets/image/creatorder.png" alt="配单仓">\n\n      配单仓\n\n      <ion-badge item-end>{{warehouseCount}}</ion-badge>\n\n    </span>\n\n  </ion-navbar>\n\n  <!-- 搜索框 -->\n\n  <div class="search-box">\n\n    <ion-searchbar [showCancelButton]="shouldShowCancel" (ionInput)="onInput($event)" placeholder="请输入商品名称" >\n\n    </ion-searchbar>\n\n  </div>\n\n</ion-header>\n\n<ion-content>\n\n<ion-refresher (ionRefresh)="refreshGetCreatOrderList($event)" *ngIf="!loadingShow">\n\n  <ion-refresher-content></ion-refresher-content>\n\n</ion-refresher>\n\n<div>\n\n  <!-- loading -->\n\n  <div class="loading-wrapper" *ngIf="loadingShow">\n\n    <div>\n\n      <ion-spinner item-start [name]="load.spinner"></ion-spinner>\n\n    </div>\n\n    <div [innerHTML]="load.content"></div>\n\n  </div>\n\n</div>\n\n<div class="product-list" *ngIf = "!noData">\n\n  <ul>\n\n    <li *ngFor = "let item of creatOrderArray;let i = index">\n\n      <img [src]="item.fileSeq | productSkuDTOImage" alt="产品">\n\n      <p>{{item.productName}}</p>\n\n      <div class="btn-add"><button ion-button round (click)="addProductModal(i)">加入配单仓</button></div>\n\n    </li>\n\n  </ul>\n\n</div>\n\n<div class="no-data" *ngIf = "noData">\n\n  <img src="./assets/image/nodata.png" alt="">\n\n  <p>空空如也</p>\n\n</div>\n\n<div class="btn-noMore" *ngIf = "showNoMore">\n\n  <span>—— 没有更多商品了 ——</span>\n\n</div>\n\n<div class="request-defeat" *ngIf = "requestDefeat">\n\n  <img src="./assets/image/requestDefeat.png" alt="">\n\n  <p>啊哦！页面走丢了</p>\n\n  <button class="btn-request-defeat" ion-button full (touchstart)="requestDefeatRefresh()">\n\n    刷新再找一找\n\n  </button>\n\n</div>\n\n<ion-infinite-scroll (ionInfinite)="infiniteGetCreatOrderList($event)" *ngIf = "!showNoMore && showInfinite">\n\n  <ion-infinite-scroll-content loadingText="加载更多..."></ion-infinite-scroll-content>\n\n</ion-infinite-scroll>\n\n</ion-content>\n\n'/*ion-inline-end:"C:\Users\think\huchunGit\tpb02\tpb\src\pages\creat-order\creat-order.html"*/,
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
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__app_app_service__ = __webpack_require__(5);
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
                _this.attrValueArr = _this.skuAttrValue;
            }
            else {
                _this.orderLayerData = {};
            }
        }).catch(function (error) {
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
    OrderLayer.prototype.changeRadio = function (event, index) {
        var _this = this;
        var currentValue = event.target.getAttribute("ng-reflect-value");
        if (this.attrValueArr[index] != currentValue) {
            this.attrValueArr[index] = currentValue;
            var attrSeqString_1 = "";
            var attrValueString_1 = "";
            var attrString = "";
            this.attrSeqArr.map(function (item, i) {
                attrSeqString_1 += "&" + "attrSeqArr=" + item;
            });
            this.attrValueArr.map(function (item, i) {
                attrValueString_1 += "&" + "attrValueArr=" + item;
            });
            attrString = attrSeqString_1 + attrValueString_1;
            var url = __WEBPACK_IMPORTED_MODULE_2__app_app_service__["a" /* AppConfig */].API.getValidSKUAttrValue + "?brandshopSeq=" + this.brandshopSeq + "&productSeq=" + this.orderLayerData.productSeq + "&skulength=" + this.orderLayerData.skuLength + attrString;
            this.appService.httpGet(url).then(function (data) {
                _this.skuPrice = data.price;
                _this.orderLayerData = data;
                _this.attrImageSeq = _this.orderLayerData.attrImageSeq;
            }).catch(function (error) {
                console.log(error);
                _this.appService.toast('操作失败，请稍后重试', 1000, 'middle');
            });
        }
        else {
            this.attrValueArr[index] = "";
            event.target.setAttribute("checked", false);
        }
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
        selector: 'order-layer',template:/*ion-inline-start:"C:\Users\think\huchunGit\tpb02\tpb\src\pages\order-layer\order-layer.html"*/'<ion-content>\n\n	<div class="layer-out" (touchstart)="dismiss()"></div>\n\n	<div class="sku-box">\n\n		<ion-list>\n\n		  <ion-item>\n\n		    <ion-thumbnail item-start>\n\n					<img [src]="attrImageSeq | productSkuDTOImage">\n\n		    </ion-thumbnail>\n\n				<h2>{{ productName }}</h2>\n\n				<h2>￥{{ skuPrice }}</h2>\n\n		  </ion-item>\n\n		</ion-list>\n\n\n\n		<div class="sku-list">\n\n			<!-- loading -->\n\n			<div class="loading-wrapper" *ngIf="loadingShow">\n\n				<div>\n\n					<ion-spinner item-start [name]="load.spinner"></ion-spinner>\n\n				</div>\n\n				<div [innerHTML]="load.content"></div>\n\n			</div>\n\n			<div class="sku-attr" *ngFor = "let item of attrMap;let i = index">\n\n				<div class="sku-key">{{ item[0].attrName }}</div>\n\n				<div class="sku-value">\n\n					<label class="labelTag" [ngClass]="{active: skuAttrValue[i] === skuAttr.attrValue, invalidAttrValueClass: skuAttr.invalidAttrValue | invalidAttrValueClass}" *ngFor="let skuAttr of item">\n\n						<input \n\n						[(ngModel)]="skuAttrValue[i]" \n\n						name="Fruit" \n\n						type="radio" \n\n						[value]="skuAttr.attrValue" \n\n						[disabled]="skuAttr.invalidAttrValue | isOrIsnotInvalidAttrValue"\n\n						(click)="changeRadio($event,i)"\n\n						/>{{ skuAttr.attrValue }}\n\n					</label>\n\n				</div>\n\n			</div>\n\n			\n\n			<div class="sku-attr" *ngIf="isShowAddNumber">\n\n				<div class="sku-key">数量</div>\n\n				<div class="sku-value count">\n\n					<ion-icon class="icon-add" [ngClass]="{changeGray: overStock | overStockPipe}" name="add" (touchstart)="addCount()"></ion-icon>\n\n					<ion-icon class="icon-remove" [ngClass]="{changeGray: count | changeGray}" name="remove" (touchstart)="removeCount()"></ion-icon>\n\n					<div class="add-count">\n\n						<ion-input (ionBlur)="resetCount()" [(ngModel)]="count" type="number" clearInput=true></ion-input>\n\n					</div>\n\n				</div>\n\n			</div>\n\n\n\n			<button class="btn-add" ion-button full (touchstart)="warehouseAdd()" *ngIf="confirmAdd">确认添加</button>\n\n\n\n		</div>\n\n	</div>\n\n	\n\n</ion-content>'/*ion-inline-end:"C:\Users\think\huchunGit\tpb02\tpb\src\pages\order-layer\order-layer.html"*/
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
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__app_app_service__ = __webpack_require__(5);
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
            loading.dismiss();
            console.log(error);
            _this.appService.toast('删除失败，请稍后再试', 1000, 'middle');
        });
    };
    //失去焦点
    OrderStore.prototype.resetCount = function (index) {
        this.warehouseUpdate(index, "reset");
    };
    OrderStore.prototype.resetProductNum = function (index) {
        if (this.orderStoreDataArray[index].productSkuDTO.stock >= this.orderStoreDataArray[index].productNum) {
            this.warehouseUpdate(index, "reset");
        }
        else {
            this.appService.toast('不能超出库存哦', 1000, 'middle');
            this.orderStoreDataArray[index].productNum = this.orderStoreDataArray[index].productSkuDTO.stock;
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
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__app_app_service__ = __webpack_require__(5);
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
        this.isStatus = true;
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
        var loading = this.appService.loading();
        loading.present();
        var url = "" + __WEBPACK_IMPORTED_MODULE_2__app_app_service__["a" /* AppConfig */].API.warehouseEmpty;
        this.appService.httpPut(url, null).then(function (data) {
            if (data.type == "success") {
                loading.dismiss();
                _this.navCtrl.remove(_this.navCtrl.length() - 2, 2);
            }
        }).catch(function (error) {
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
                if (data.status == 0) {
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
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__app_app_service__ = __webpack_require__(5);
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
            console.log(error);
            if (error.type) {
                var alert_1 = _this.alertCtrl.create({
                    message: error.message,
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
            _this.isAllow = true;
            console.log(error);
        });
    };
    GiftInfo.prototype.alertLayer = function () {
        var _this = this;
        var alert = this.alertCtrl.create({
            message: '确认兑换完成',
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
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__app_app_service__ = __webpack_require__(5);
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
            _this.orderDetail = data;
        }).catch(function (error) {
            console.log(error);
            if (error.type) {
                var alert_1 = _this.alertCtrl.create({
                    message: error.message,
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
            _this.isAllow = true;
            console.log(error);
        });
    };
    OrderInfo.prototype.alertLayer = function () {
        var _this = this;
        var alert = this.alertCtrl.create({
            message: '确认提货完成',
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
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["l" /* NavController */],
        __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["a" /* AlertController */],
        __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["q" /* ViewController */],
        __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["m" /* NavParams */],
        __WEBPACK_IMPORTED_MODULE_2__app_app_service__["b" /* AppService */]])
], OrderInfo);

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
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__app_app_service__ = __webpack_require__(5);
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
                label: '待审核退货订单',
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
        selector: 'unaudit-tabs',template:/*ion-inline-start:"C:\Users\think\huchunGit\tpb02\tpb\src\pages\unaudit-tabs\unaudit-tabs.html"*/'<ion-header>\n\n    <ion-navbar>\n\n      <ion-title text-center>待审核订单</ion-title>\n\n    </ion-navbar>\n\n    <ion-toolbar class="statusBox">\n\n      <ul>\n\n        <li *ngFor="let status of statusList, let i = index" [ngClass]="{active:currentStatus == status.label}" (click)="getCurrentStatus(i)">{{ status.label }}（{{status.num}}）</li>\n\n      </ul>\n\n    </ion-toolbar>\n\n  </ion-header>\n\n  <ion-content>\n\n    <!-- 下拉刷新 -->\n\n    <ion-refresher (ionRefresh)="doRefresh($event)" *ngIf="!loadingShow">\n\n      <ion-refresher-content></ion-refresher-content>\n\n    </ion-refresher>\n\n  \n\n    <!-- 待审核取消订单列表 -->\n\n    <div class="order-cancelList" *ngIf="currentIndex == 0">\n\n      <!-- loading -->\n\n      <div class="loading-wrapper" *ngIf="loadingShow">\n\n        <div>\n\n          <ion-spinner item-start [name]="load.spinner"></ion-spinner>\n\n        </div>\n\n        <div [innerHTML]="load.content"></div>\n\n      </div>\n\n      <div class="order-items" *ngFor="let item of unauditCancelorderArray;let i = index">\n\n        <div class="order-title">\n\n          <h2>订单编号：\n\n            <span>{{item.orderId}}</span>\n\n          </h2>\n\n          <span [ngClass]="{auditStatus: true, pass:(item.status | setCancelOrderStatus).pass , auditing:(item.status | setCancelOrderStatus).audit} ">{{(item.status | setCancelOrderStatus).status}}</span>\n\n        </div>\n\n  \n\n        <div class="order-item" *ngFor="let single of item.itemList">\n\n          <dl>\n\n            <dt>\n\n              <img class="my-picture" [src]="single.productSkuDTO.fileSeq | productSkuDTOImage" [alt]="single.productSkuDTO.productName">\n\n            </dt>\n\n            <dd class="product-title">{{ single.productSkuDTO.productName }}</dd>\n\n            <dd class="sku-list">\n\n              <span *ngFor="let sku of single.productSkuDTO.attrValueList">{{ sku.attrValue }} </span>\n\n            </dd>\n\n            <dd class=\'price\'>￥{{ single.unitPrice }}</dd>\n\n            <dd class="count">X{{ single.number }}</dd>\n\n          </dl>\n\n        </div>\n\n  \n\n        <div class="orderOperate">\n\n          <dl>\n\n            <dt>\n\n              <button class="btn-audit" ion-button (click)="auditOrder(i)">审核</button>\n\n            </dt>\n\n            <dd class="total">{{item.amount}}件商品，实付￥{{item.payAmount}}</dd>\n\n            <dd class="member-phone">会员手机：{{item.memberMobile}}</dd>\n\n          </dl>\n\n        </div>\n\n      </div>\n\n      <div class="btn-cancelView" (touchstart)="goAuditCancel()" *ngIf="showInfinite">\n\n        <span>查看审核完成订单</span>\n\n      </div>\n\n      <div class="no-data" *ngIf="noData">\n\n        <img src="./assets/image/nodata.png" alt="">\n\n        <p>空空如也</p>\n\n      </div>\n\n      <div class="btn-noMore" *ngIf="showNoMore">\n\n        <span>—— 没有更多信息了 ——</span>\n\n      </div>\n\n      <div class="request-defeat" *ngIf="requestDefeat">\n\n        <img src="./assets/image/requestDefeat.png" alt="">\n\n        <p>啊哦！页面走丢了</p>\n\n        <button class="btn-request-defeat" ion-button full (touchstart)="requestDefeatRefreshCancelorder()">\n\n          刷新再找一找\n\n        </button>\n\n      </div>\n\n      <ion-infinite-scroll (ionInfinite)="loadMore($event)" *ngIf="!showNoMore && showInfinite">\n\n        <ion-infinite-scroll-content loadingText="加载更多..."></ion-infinite-scroll-content>\n\n      </ion-infinite-scroll>\n\n    </div>\n\n  \n\n    <!-- 待审核退货订单列表 -->\n\n    <div class="order-returnList" *ngIf="currentIndex == 1">\n\n      <!-- loading -->\n\n      <div class="loading-wrapper" *ngIf="loadingShow">\n\n        <div>\n\n          <ion-spinner item-start [name]="load.spinner"></ion-spinner>\n\n        </div>\n\n        <div [innerHTML]="load.content"></div>\n\n      </div>\n\n      <div class="order-items" *ngFor="let item of unauditReturnorderArray;let i = index">\n\n        <div class="order-title">\n\n          <h2>订单编号：\n\n            <span>{{item.orderId}}</span>\n\n          </h2>\n\n          <span [ngClass]="{auditStatus: true, pass:(item.status | setReturnOrderStatus).pass , auditing:(item.status | setReturnOrderStatus).audit} ">{{(item.status | setReturnOrderStatus).status}}</span>\n\n        </div>\n\n  \n\n        <div class="order-item">\n\n          <dl>\n\n            <dt>\n\n              <img class="my-picture" [src]="item.productSkuDTO.fileSeq | productSkuDTOImage" [alt]="item.productSkuDTO.productName">\n\n            </dt>\n\n            <dd class="product-title">{{ item.productSkuDTO.productName }}</dd>\n\n            <dd class="sku-list">\n\n              <span *ngFor="let sku of item.productSkuDTO.attrValueList">{{ sku.attrValue }} </span>\n\n            </dd>\n\n            <dd class=\'price\'>￥{{ item.unitPrice }}</dd>\n\n            <dd class="count">X{{ item.buyNumber }}</dd>\n\n          </dl>\n\n        </div>\n\n  \n\n        <div class="orderOperate">\n\n          <dl>\n\n            <dt>\n\n              <button class="btn-audit" ion-button (click)="auditReturn(i)" *ngIf="item.status==0">审核</button>\n\n              <button class="btn-audit" ion-button (click)="confirmReturn(i)" *ngIf="item.status==1">确认收货</button>\n\n            </dt>\n\n            <dd class="total">退货数量: {{item.number}}</dd>\n\n            <dd class="member-phone">会员手机：{{item.mobile}}</dd>\n\n          </dl>\n\n        </div>\n\n      </div>\n\n      <div class="btn-cancelView" (touchstart)="goAuditReturn()" *ngIf="showInfinite">\n\n        <span>查看已处理退货订单</span>\n\n      </div>\n\n      <div class="no-data" *ngIf="noData">\n\n        <img src="./assets/image/nodata.png" alt="">\n\n        <p>空空如也</p>\n\n      </div>\n\n  \n\n      <div class="btn-noMore" *ngIf="showNoMore">\n\n        <span>—— 没有更多信息了 ——</span>\n\n      </div>\n\n  \n\n  \n\n  \n\n      <ion-infinite-scroll (ionInfinite)="loadMore($event)" *ngIf="!showNoMore && showInfinite">\n\n        <ion-infinite-scroll-content loadingText="加载更多..."></ion-infinite-scroll-content>\n\n      </ion-infinite-scroll>\n\n      <div class="request-defeat" *ngIf="requestDefeat">\n\n        <img src="./assets/image/requestDefeat.png" alt="">\n\n        <p>啊哦！页面走丢了</p>\n\n        <button class="btn-request-defeat" ion-button full (touchstart)="requestDefeatRefreshReturnorder()">\n\n          刷新再找一找\n\n        </button>\n\n      </div>\n\n    </div>\n\n  </ion-content>'/*ion-inline-end:"C:\Users\think\huchunGit\tpb02\tpb\src\pages\unaudit-tabs\unaudit-tabs.html"*/
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
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__app_app_service__ = __webpack_require__(5);
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
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__app_app_service__ = __webpack_require__(5);
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
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__app_app_service__ = __webpack_require__(5);
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
            _this.loadingShow = false;
            console.log(error);
            _this.appService.toast('网络异常，请稍后再试', 1000, 'middle');
        });
    };
    return ReturnedDetail;
}());
ReturnedDetail = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["n" /* Component */])({
        selector: 'returned-detail',template:/*ion-inline-start:"C:\Users\think\huchunGit\tpb02\tpb\src\pages\returned-detail\returned-detail.html"*/'<ion-header>\n\n  <ion-navbar>\n\n    <ion-title text-center>退货详情</ion-title>\n\n  </ion-navbar>\n\n</ion-header>\n\n<ion-content>\n\n  <div class="order-list">\n\n    <div class="loading-wrapper" *ngIf="loadingShow">\n\n      <div>\n\n        <ion-spinner item-start [name]="load.spinner"></ion-spinner>\n\n      </div>\n\n      <div [innerHTML]="load.content"></div>\n\n    </div>\n\n    <div class="order-items">\n\n      <!-- 订单编号 -->\n\n      <div class="order-title">\n\n        <h2>订单编号：\n\n          <span>{{returnedDetail.orderReturn.returnOrderId}}</span>\n\n        </h2>\n\n        <!--color auditing or pass -->\n\n        <span [ngClass]="{auditStatus: true, pass:(orderStatus | setReturnOrderStatus).pass , auditing:(orderStatus | setReturnOrderStatus).audit} ">{{(orderStatus | setReturnOrderStatus).status}}</span>\n\n      </div>\n\n      <!-- 商品1 -->\n\n      <div class="order-item">\n\n        <dl>\n\n          <dt>\n\n            <img class="my-picture" [src]="returnedDetail.itemProductSkuDTO.productSkuDTO.fileSeq | productSkuDTOImage" [alt]="returnedDetail.itemProductSkuDTO.productSkuDTO.productName">\n\n          </dt>\n\n          <dd class="product-title">{{returnedDetail.itemProductSkuDTO.productSkuDTO.productName}}</dd>\n\n          <dd class="sku-list">\n\n            <!-- <span>{{returnedDetail.itemProductSkuDTO.productSkuDTO.attrValueList}}</span> -->\n\n            <span *ngFor="let sku of returnedDetail.itemProductSkuDTO.productSkuDTO.attrValueList"> {{sku.attrValue}} </span>\n\n          </dd>\n\n          <dd class=\'price\'>￥{{returnedDetail.itemProductSkuDTO.unitPrice}}</dd>\n\n          <dd class="count">X{{returnedDetail.itemProductSkuDTO.number}}</dd>\n\n        </dl>\n\n      </div>\n\n\n\n      <div class="orderOperate">\n\n        <dl>\n\n          <dt>\n\n          </dt>\n\n          <dd class="total">共{{returnedDetail.orderReturn.number}}件商品，实付￥{{returnedDetail.orderReturn.totalReturnPrice}}</dd>\n\n        </dl>\n\n      </div>\n\n    </div>\n\n\n\n    <div class="return-detail">\n\n      <ul>\n\n        <li>退货数量：{{returnedDetail.orderReturn.number}}</li>\n\n        <li>联系方式：{{returnedDetail.orderReturn.mobile}}</li>\n\n        <li>退货方式：{{returnedDetail.orderReturn.returnType==1?\'其他\': \'快递\'}}</li>\n\n        <li>是否有发票：{{returnedDetail.orderReturn.invoiced==1?\'有\': \'无\'}}</li>\n\n        <li>退货原因：{{returnedDetail.orderReturn.returnReason}}</li>\n\n        <li>问题描述：{{returnedDetail.orderReturn.detail}}</li>\n\n        <li class="img-list" *ngIf="imageArray">\n\n          <img [src]="itemImg | productSkuDTOImage" alt="" *ngFor="let itemImg of imageArray">\n\n        </li>\n\n      </ul>\n\n    </div>\n\n  </div>\n\n</ion-content>'/*ion-inline-end:"C:\Users\think\huchunGit\tpb02\tpb\src\pages\returned-detail\returned-detail.html"*/
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
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__app_app_service__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__handle_selfgift_handle_selfgift__ = __webpack_require__(61);
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
        this.currentIndex = 0;
        this.requestDefeat = false;
        this.showInfinite = false;
        this.start = 0;
        this.down = true;
        this.up = false;
        this.load = __WEBPACK_IMPORTED_MODULE_2__app_app_service__["a" /* AppConfig */].load;
        this.currentStatus = '到店自提赠品';
        this.selfGiftCount = navParams.get('selfGiftCount'); //自提赠品数量
        this.expressGiftCount = navParams.get('expressGiftCount'); //快递赠品数量
        this.statusList = [{
                label: '到店自提赠品',
                num: this.selfGiftCount
            }, {
                label: '快递到家赠品',
                num: this.expressGiftCount
            }];
        // 获取待审核取消订单
        this.getUnhandleSelfGiftList();
    }
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
                    _this.getUnhandleSelfGiftList();
                }
            }).catch(function (error) {
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
        var url = __WEBPACK_IMPORTED_MODULE_2__app_app_service__["a" /* AppConfig */].API.getGiftList + "?type=1&start=" + this.start + "&limit=" + this.limit;
        this.appService.httpGet(url).then(function (data) {
            _this.loadingShow = false;
            _this.statusList[_this.currentIndex].num = data.count;
            if (_this.start < data.count) {
                _this.showNoMore = false;
                _this.noData = false;
                _this.start += _this.limit;
                _this.showInfinite = true;
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
                            _this.appService.toast('网络异常，请稍后再试', 1000, 'middle');
                        }
                        else if (data.orderNum != "") {
                            _this.appService.toast('请填写快递单号', 1000, 'middle');
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
        selector: 'unhandle-tabs',template:/*ion-inline-start:"C:\Users\think\huchunGit\tpb02\tpb\src\pages\unhandle-tabs\unhandle-tabs.html"*/'<ion-header>\n\n  <ion-navbar>\n\n    <ion-title text-center>待处理赠品</ion-title>\n\n  </ion-navbar>\n\n  <ion-toolbar class="statusBox">\n\n    <ul>\n\n      <li *ngFor="let status of statusList, let i = index" [ngClass]="{active:currentStatus == status.label}" (click)="getCurrentStatus(i)">{{ status.label }}（{{status.num}}）</li>\n\n    </ul>\n\n  </ion-toolbar>\n\n</ion-header>\n\n<ion-content>\n\n  <ion-refresher (ionRefresh)="doRefresh($event)" *ngIf="!loadingShow">\n\n    <ion-refresher-content></ion-refresher-content>\n\n  </ion-refresher>\n\n\n\n  <div class="selfGiftList" *ngIf="currentIndex == 0">\n\n    <div class="gift-list">\n\n      <!-- loading -->\n\n      <div class="loading-wrapper" *ngIf="loadingShow">\n\n        <div>\n\n          <ion-spinner item-start [name]="load.spinner"></ion-spinner>\n\n        </div>\n\n        <div [innerHTML]="load.content"></div>\n\n      </div>\n\n      <div class="gift-item" *ngFor="let item of unhandleSeflGiftArray;let i = index">\n\n        <dl>\n\n          <dt>\n\n            <img [src]="item.imageName | handleGiftImage" alt="">\n\n          </dt>\n\n          <dd class="product-title">\n\n            <h2>{{ item.giftName }}</h2>\n\n            <span [ngClass]="item.className">{{ item.giftType | setGiftType: item.status }}</span>\n\n          </dd>\n\n          <dd class="reserve-phone">\n\n            <span>预约手机：{{ item.reservePhone }}</span>\n\n            <a href="tel:13761489650">\n\n              <img src="./assets/image/phone.png">\n\n            </a>\n\n          </dd>\n\n          <dd class="member-phone" *ngIf="item.giftType==\'0\'">会员手机：{{ item.memberPhone }}</dd>\n\n          <dd class="get-time">领取时间：{{ item.receiveDate | date:\'yyyy-MM-dd HH:mm:ss\' }}</dd>\n\n        </dl>\n\n        <div class="reserve-time" *ngIf="item.giftType==\'0\' && item.status==\'2\'">\n\n          <div class="time-text">\n\n            <ion-datetime placeholder="会员预约到店时间" cancelText="取消" doneText="确定" displayFormat="YYYY-MM-DD HH:mm:ss" [(ngModel)]="item.reserveShopTime">\n\n            </ion-datetime>\n\n            <span class="clear" *ngIf="item.reserveShopTime" (click)="clearReserveArriveTime(i)">X</span>\n\n          </div>\n\n          <div class="btn-time">\n\n            <button ion-button round (touchend)="reserveAffirm(i)">预约确认</button>\n\n          </div>\n\n        </div>\n\n        <div class="reserve-time" *ngIf="item.giftType==\'0\' && item.status==\'3\'">\n\n          <div class="show-time">预约到店时间：{{ item.reserveShopTime | date:\'yyyy-MM-dd HH:mm:ss\' }}</div>\n\n        </div>\n\n\n\n      </div>\n\n    </div>\n\n    <div class="toTop" (click)="scrollTo()" *ngIf="toTop">\n\n      <img src="./assets/image/toTop.png" alt="">\n\n    </div>\n\n    <div class="btn-selfview" (click)="goSelfgift()" *ngIf = "showInfinite">\n\n      <span>查看已兑换自提赠品</span>\n\n    </div>\n\n    <div class="no-data" *ngIf="noData">\n\n      <img src="./assets/image/nodata.png" alt="">\n\n      <p>空空如也</p>\n\n    </div>\n\n    <div class="btn-noMore" *ngIf="showNoMore">\n\n      <span>—— 没有更多赠品了 ——</span>\n\n    </div>\n\n    <div class="request-defeat" *ngIf = "requestDefeat">\n\n      <img src="./assets/image/requestDefeat.png" alt="">\n\n      <p>啊哦！页面走丢了</p>\n\n      <button class="btn-request-defeat" ion-button full (touchstart)="requestDefeatRefreshSelfGift()">\n\n        刷新再找一找\n\n      </button>\n\n    </div>\n\n  </div>\n\n\n\n  <div class="expressGiftList" *ngIf="currentIndex == 1">\n\n    <div class="gift-list">\n\n      <!-- loading -->\n\n      <div class="loading-wrapper" *ngIf="loadingShow">\n\n        <div>\n\n          <ion-spinner item-start [name]="load.spinner"></ion-spinner>\n\n        </div>\n\n        <div [innerHTML]="load.content"></div>\n\n      </div>\n\n      <div class="gift-item" *ngFor="let item of unhandleExpressGiftArray;let i = index">\n\n        <dl>\n\n          <dt>\n\n            <img [src]="item.imageName | handleGiftImage" alt="">\n\n          </dt>\n\n          <dd class="product-title">\n\n            <h2>{{item.giftName}}</h2>\n\n            <span class="unstart">立即兑换</span>\n\n          </dd>\n\n          <dd class="reserve-phone">\n\n            <span>预约手机：{{item.reservePhone}}</span>\n\n            <a href="tel:{{item.reservePhone}}">\n\n              <img src="assets/image/phone.png">\n\n            </a>\n\n          </dd>\n\n          <dd class="member-phone">会员手机：{{item.memberPhone}}</dd>\n\n          <dd class="get-time">领取时间：{{item.receiveDate | date:\'yyyy-MM-dd HH:mm:ss\'}}</dd>\n\n        </dl>\n\n        <div class="reserve-time">\n\n          <div class="member-info">\n\n            <ul>\n\n              <li *ngFor="let single of item.attrValueList">{{single.label}}：{{single.value}}</li>\n\n            </ul>\n\n          </div>\n\n          <div class="btn-time">\n\n            <button ion-button round (click)="sendProduct(i)">发货</button>\n\n          </div>\n\n        </div>\n\n      </div>\n\n    </div>\n\n    <div class="btn-selfview" (click)="goExpressgift()" *ngIf = "showInfinite">\n\n      <span>查看已发货赠品</span>\n\n    </div>\n\n    <div class="no-data" *ngIf="noData">\n\n      <img src="./assets/image/nodata.png" alt="">\n\n      <p>空空如也</p>\n\n    </div>\n\n    <div class="btn-noMore" *ngIf="showNoMore">\n\n      <span>—— 没有更多赠品了 ——</span>\n\n    </div>\n\n    <div class="request-defeat" *ngIf = "requestDefeat">\n\n      <img src="./assets/image/requestDefeat.png" alt="">\n\n      <p>啊哦！页面走丢了</p>\n\n      <button class="btn-request-defeat" ion-button full (touchstart)="requestDefeatRefreshExpressGift()">\n\n        刷新再找一找\n\n      </button>\n\n    </div>\n\n  </div>\n\n\n\n  <ion-infinite-scroll (ionInfinite)="loadMore($event)" *ngIf="!showNoMore && showInfinite">\n\n    <ion-infinite-scroll-content loadingText="加载更多..."></ion-infinite-scroll-content>\n\n  </ion-infinite-scroll>\n\n</ion-content>'/*ion-inline-end:"C:\Users\think\huchunGit\tpb02\tpb\src\pages\unhandle-tabs\unhandle-tabs.html"*/
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
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__app_app_service__ = __webpack_require__(5);
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
        var _this = this;
        this.start = 0;
        this.paramsDate = '';
        this.paramsStatus = '';
        this.dateStart = '';
        this.dateEnd = '';
        this.dateStartMax = this.appService.reserveDate();
        this.dateEndMax = this.appService.reserveDate();
        this.currentStatus = this.orderStatusList[0].status;
        this.events.subscribe('order:status', function (orderStatus) {
            console.log('subscribe events');
            _this.currentStatus = orderStatus;
            _this.paramsStatus += '&status=' + orderStatus;
        });
        this.orderList = [];
        this.getOrderList();
    };
    // 每次离开页面的时候执行
    OrderList.prototype.ionViewDidLeave = function () {
        this.events.unsubscribe('order:status', function () {
            console.log('did unsubscribe');
        });
    };
    // 获取订单列表
    OrderList.prototype.getOrderList = function () {
        var _this = this;
        this.loadingShow = true;
        this.noData = false;
        this.requestDefeat = false;
        this.showNoMore = false;
        this.showInfinite = true;
        var url = __WEBPACK_IMPORTED_MODULE_3__app_app_service__["a" /* AppConfig */].API.getOrderList + "?userType=A&start=" + this.start + "&limit=" + this.pageSize;
        if (this.paramsDate != '')
            url += this.paramsDate;
        if (this.paramsStatus != '')
            url += this.paramsStatus;
        this.appService.httpGet(url).then(function (data) {
            _this.loadingShow = false;
            if (_this.start < data.count) {
                _this.start += _this.pageSize;
                (_a = _this.orderList).push.apply(_a, data.data);
                for (var i = 0; i < _this.orderList.length; i++) {
                    _this.isShowDetail[i] = false;
                }
            }
            else if (data.count == 0) {
                _this.noData = true;
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
            this.paramsDate += "&dateStart=" + this.dateStart;
            this.dateEndMin = this.dateStart;
        }
        if (this.dateEnd != '') {
            this.paramsDate += "&dateEnd=" + this.dateEnd;
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
        this.showNoMore = false;
        this.requestDefeat = false;
        this.noData = false;
        this.start = 0;
        this.orderList = [];
        setTimeout(function () {
            _this.getOrderList();
            refresher.complete();
        }, __WEBPACK_IMPORTED_MODULE_3__app_app_service__["a" /* AppConfig */].LOAD_TIME);
    };
    // 上拉加载更多 请求数据
    OrderList.prototype.loadMore = function (infiniteScroll) {
        var _this = this;
        var url = __WEBPACK_IMPORTED_MODULE_3__app_app_service__["a" /* AppConfig */].API.getOrderList + "?userType=A&start=" + this.start + "&limit=" + this.pageSize;
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
        selector: 'order-list',template:/*ion-inline-start:"C:\Users\think\huchunGit\tpb02\tpb\src\pages\order-list\order-list.html"*/'<ion-header>\n\n  <ion-navbar>\n\n    <ion-title text-center>订单列表</ion-title>\n\n    <span class=\'brandshop-order\' (touchstart)="goBrandshoOrder()">\n\n      门店所有订单\n\n    </span>\n\n  </ion-navbar>\n\n  <ion-toolbar class="filter-box">\n\n    <div class="time-box">\n\n      <div class="search-title">选择日期</div>\n\n      <div class="search-list">\n\n        <div class="time-start">\n\n          <ion-datetime (ionChange)="getOrderListByDate()" placeholder="请选择日期" cancelText="取消" doneText="确定" displayFormat="YYYY-MM-DD" max="{{dateStartMax}}" [(ngModel)]="dateStart">\n\n          </ion-datetime>\n\n          <span class="clear" *ngIf="dateStart" (click)="clearDateStart()">X</span>\n\n        </div>\n\n        <span class="go">到</span>\n\n        <div class="time-end">\n\n          <ion-datetime (ionChange)="getOrderListByDate()" placeholder="请选择日期" cancelText="取消" doneText="确定" displayFormat="YYYY-MM-DD" min="{{dateEndMin}}" max="{{dateEndMax}}" [(ngModel)]="dateEnd">\n\n          </ion-datetime> \n\n          <span class="clear" *ngIf="dateEnd" (click)="clearDateEnd()">X</span>\n\n        </div>\n\n      </div>\n\n    </div>\n\n    <div class="status-box">\n\n      <ul>\n\n        <li *ngFor="let orderStatus of orderStatusList, let i = index" [ngClass]="{active:currentStatus == orderStatus.status}" (click)="getCurrentStatus(i)">{{ orderStatus.label }}</li>\n\n      </ul>\n\n    </div>\n\n  </ion-toolbar>\n\n</ion-header>\n\n<ion-content>\n\n  <div class="order-list">\n\n    <!-- loading -->\n\n    <div class="loading-wrapper" *ngIf="loadingShow">\n\n      <div>\n\n        <ion-spinner item-start [name]="load.spinner"></ion-spinner>\n\n      </div>\n\n      <div [innerHTML]="load.content"></div>\n\n    </div>\n\n    <ion-refresher *ngIf="!loadingShow" (ionRefresh)="doRefresh($event)">\n\n      <ion-refresher-content>\n\n      </ion-refresher-content>\n\n    </ion-refresher>\n\n\n\n    <div class="order-items" *ngFor="let order of orderList; let i = index">\n\n      <!-- 订单编号 -->\n\n      <div class="order-title">\n\n        <h2>订单编号：\n\n          <span>{{ order.orderId }}</span>\n\n        </h2>\n\n        <!-- 订单状态-->\n\n        <span [ngClass]="{auditStatus: true, pass:(order.status | setOrderStatus).pass , auditing:(order.status | setOrderStatus).audit} ">{{(order.status | setOrderStatus).status}}</span>\n\n      </div>\n\n      <!-- 商品1 -->\n\n      <div class="order-item" *ngFor="let product of order.orderItemProductSkuDTOS">\n\n        <dl>\n\n          <dt>\n\n            <img class="my-picture" src="{{product.productSkuDTO.fileSeq | productSkuDTOImage}}" [alt]="product.productSkuDTO.productName">\n\n          </dt>\n\n          <dd class="product-title">{{ product.productSkuDTO.productName }}</dd>\n\n          <dd class="sku-list">\n\n            <span *ngFor="let sku of product.productSkuDTO.attrValueList">{{ sku.attrValue }} </span>\n\n          </dd>\n\n          <dd class=\'price\'>￥{{ product.unitPrice }}</dd>\n\n          <dd class="count">X{{ product.number }}</dd>\n\n        </dl>\n\n      </div>\n\n\n\n      <!-- 待支付订单 -->\n\n      <div *ngIf="order.status==0" class="orderOperate">\n\n        <div class="pay-money-left">\n\n          订单总金额\n\n          <span>￥{{ order.settAmount }}</span>\n\n        </div>\n\n      </div>\n\n\n\n      <!-- 已完成订单 -->\n\n      <div *ngIf="order.status!=0" class="orderOperate">\n\n        <dl>\n\n          <dt>\n\n            <a href="\'tel:\'+order.memberMobile">\n\n              <img src="./assets/image/phone.png" alt="">\n\n            </a>\n\n          </dt>\n\n          <dd class="total">会员手机：{{ order.memberMobile }}</dd>\n\n          <dd class="member-phone" *ngIf="order.status == 3 || order.status == 4 || order.status == 6 || order.status == \'C\'">收货时间：{{ order.receiptTime }}</dd>\n\n          <dd class="member-phone" *ngIf="order.status == 4">退款时间：{{ order.cancelTime }}</dd>\n\n        </dl>\n\n      </div>\n\n      <div *ngIf="order.status!=0" class="order-dtail-box">\n\n        <div class="order-detail" *ngIf="isShowDetail[i]">\n\n          <ul>\n\n            <li>订单总额：￥{{ order.totalAmount }}</li>\n\n            <li>促销抵扣：￥{{ order.discountAmount }}</li>\n\n            <li>淘璞券折扣：￥{{ order.couponAmount }}</li>\n\n            <li>商户券抵扣：￥{{ order.merchantCouponAmount }}</li>\n\n            <li>积分抵扣：￥{{ order.integralAmount }}</li>\n\n          </ul>\n\n        </div>\n\n        <div class="pay-money">\n\n          会员实付金额\n\n          <span>￥{{ order.payAmount }}</span>\n\n        </div>\n\n        <div class="btn-show" (click)="showDetail(i)">\n\n          点击查看明细\n\n          <span [ngClass]="{\'icon-triangle\':true, \'icon-bottom\': isShowDetail[i]}"></span>\n\n        </div>\n\n      </div>\n\n    </div>\n\n\n\n    <ion-infinite-scroll (ionInfinite)="loadMore($event)" *ngIf="showInfinite && !loadingShow">\n\n      <ion-infinite-scroll-content loadingText="加载更多..."></ion-infinite-scroll-content>\n\n    </ion-infinite-scroll>\n\n  </div>\n\n  <div class="no-data" *ngIf="noData">\n\n    <img src="./assets/image/nodata.png" alt="">\n\n    <p>空空如也</p>\n\n  </div>\n\n  <div class="btn-noMore" *ngIf="showNoMore">\n\n    <span>—— 没有更多信息了 ——</span>\n\n  </div>\n\n  <div class="request-defeat" *ngIf = "requestDefeat">\n\n    <img src="./assets/image/requestDefeat.png" alt="">\n\n    <p>啊哦！页面走丢了</p>\n\n    <button class="btn-request-defeat" ion-button full (touchstart)="requestDefeatRefresh()">\n\n      刷新再找一找\n\n    </button>\n\n  </div>\n\n</ion-content>'/*ion-inline-end:"C:\Users\think\huchunGit\tpb02\tpb\src\pages\order-list\order-list.html"*/
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
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__app_app_service__ = __webpack_require__(5);
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
                _this.start += _this.pageSize;
                (_a = _this.orderList).push.apply(_a, data.data);
            }
            else if (data.count == 0) {
                _this.noData = true;
            }
            var _a;
        }).catch(function (error) {
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
            this.paramsDate += "&dateStart=" + this.dateStart;
            this.dateEndMin = this.dateStart;
        }
        if (this.dateEnd != '') {
            this.paramsDate += "&dateEnd=" + this.dateEnd;
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
        this.showNoMore = false;
        this.requestDefeat = false;
        this.noData = false;
        this.start = 0;
        this.orderList = [];
        setTimeout(function () {
            _this.getOrderList();
            refresher.complete();
        }, __WEBPACK_IMPORTED_MODULE_2__app_app_service__["a" /* AppConfig */].LOAD_TIME);
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
            }
            else if (data.data.length == 0) {
                _this.showInfinite = false;
                _this.showNoMore = true;
            }
            var _a;
        }).catch(function (error) {
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
        selector: 'order-list',template:/*ion-inline-start:"C:\Users\think\huchunGit\tpb02\tpb\src\pages\brandshop-order-list\brandshop-order-list.html"*/'<ion-header>\n\n  <ion-navbar>\n\n    <ion-title text-center>门店订单列表</ion-title>\n\n  </ion-navbar>\n\n  <ion-toolbar class="filter-box">\n\n    <div class="time-box">\n\n      <div class="search-title">选择日期</div>\n\n      <div class="search-list">\n\n        <div class="time-start">\n\n          <ion-datetime (ionChange)="getOrderListByDate()" placeholder="请选择日期" cancelText="取消" doneText="确定" displayFormat="YYYY-MM-DD" max="{{dateStartMax}}" [(ngModel)]="dateStart">\n\n          </ion-datetime>\n\n          <span class="clear" *ngIf="dateStart" (click)="clearDateStart()">X</span>\n\n        </div>\n\n        <span class="go">到</span>\n\n        <div class="time-end">\n\n          <ion-datetime (ionChange)="getOrderListByDate()" placeholder="请选择日期" cancelText="取消" doneText="确定" displayFormat="YYYY-MM-DD" min="{{dateEndMin}}" max="{{dateEndMax}}" [(ngModel)]="dateEnd">\n\n          </ion-datetime>\n\n          <span class="clear" *ngIf="dateEnd" (click)="clearDateEnd()">X</span>\n\n        </div>\n\n      </div>\n\n    </div>\n\n    <div class="status-box">\n\n      <ul>\n\n        <li *ngFor="let orderStatus of orderStatusList, let i = index" [ngClass]="{active:currentStatus == orderStatus.status}" (click)="getCurrentStatus(i)">{{ orderStatus.label }}</li>\n\n      </ul>\n\n    </div>\n\n  </ion-toolbar>\n\n</ion-header>\n\n<ion-content>\n\n  <div class="order-list">\n\n    <!-- loading -->\n\n    <div class="loading-wrapper" *ngIf="loadingShow">\n\n      <div>\n\n        <ion-spinner item-start [name]="load.spinner"></ion-spinner>\n\n      </div>\n\n      <div [innerHTML]="load.content"></div>\n\n    </div>\n\n    <ion-refresher *ngIf="!loadingShow" (ionRefresh)="doRefresh($event)">\n\n      <ion-refresher-content>\n\n      </ion-refresher-content>\n\n    </ion-refresher>\n\n\n\n    <div class="order-items" *ngFor="let order of orderList;let i = index">\n\n      <!-- 订单编号 -->\n\n      <div class="order-title">\n\n        <h2>订单编号：\n\n          <span>{{ order.orderId }}</span>\n\n        </h2>\n\n        <!--color auditing or pass -->\n\n        <span [ngClass]="{auditStatus: true, pass:(order.status | setOrderStatus).pass , auditing:(order.status | setOrderStatus).audit} ">{{(order.status | setOrderStatus).status}}</span>\n\n      </div>\n\n      <!-- 商品1 -->\n\n      <div class="order-item" *ngFor="let product of order.orderItemProductSkuDTOS">\n\n        <dl>\n\n          <dt>\n\n            <img class="my-picture" [src]="product.productSkuDTO.fileSeq | productSkuDTOImage" [alt]="product.productSkuDTO.productName">\n\n          </dt>\n\n          <dd class="product-title">{{ product.productSkuDTO.productName }}</dd>\n\n          <dd class="sku-list">\n\n            <span *ngFor="let sku of product.productSkuDTO.attrValueList">{{ sku.attrValue }} </span>\n\n          </dd>\n\n          <dd class=\'price\'>￥{{ product.unitPrice }}</dd>\n\n          <dd class="count">X{{ product.number }}</dd>\n\n        </dl>\n\n      </div>\n\n\n\n      <div class="orderOperate">\n\n        <dl>\n\n          <dt>\n\n            <a href="\'tel:\'+order.memberMobile">\n\n              <img src="./assets/image/phone.png" alt="">\n\n            </a>\n\n          </dt>\n\n          <dd class="total">会员手机：{{ order.memberMobile }}</dd>\n\n          <dd class="member-phone" *ngIf="order.status == 3 || order.status == 4 || order.status == 6 || order.status == \'C\'">收货时间：{{ order.receiptTime }}</dd>\n\n          <dd class="member-phone" *ngIf="order.status == 4">退款时间：{{ order.cancelTime }}</dd>\n\n\n\n        </dl>\n\n      </div>\n\n      <div class="order-dtail-box">\n\n        <div class="order-detail" *ngIf="isShowDetail[i]">\n\n          <ul>\n\n            <li>订单总额：￥{{ order.totalAmount }}</li>\n\n            <li>促销抵扣：￥{{ order.discountAmount }}</li>\n\n            <li>淘璞券折扣：￥{{ order.couponAmount }}</li>\n\n            <li>商户券抵扣：￥{{ order.merchantCouponAmount }}</li>\n\n            <li>积分抵扣：￥{{ order.integralAmount }}</li>\n\n          </ul>\n\n        </div>\n\n        <div class="pay-money">\n\n          会员实付金额\n\n          <span>￥{{ order.payAmount }}</span>\n\n        </div>\n\n        <div class="btn-show" (click)="showDetail(i)">\n\n          点击查看明细\n\n          <span [ngClass]="{\'icon-triangle\':true, \'icon-bottom\': isShowDetail[i]}"></span>\n\n        </div>\n\n      </div>\n\n    </div>\n\n\n\n    <ion-infinite-scroll (ionInfinite)="loadMore($event)"  *ngIf="showInfinite && !loadingShow && !requestDefeat">\n\n      <ion-infinite-scroll-content loadingText="加载更多..."></ion-infinite-scroll-content>\n\n    </ion-infinite-scroll>\n\n\n\n  </div>\n\n  <div class="no-data" *ngIf="noData">\n\n    <img src="./assets/image/nodata.png" alt="">\n\n    <p>空空如也</p>\n\n  </div>\n\n  <div class="btn-noMore" *ngIf="showNoMore">\n\n    <span>—— 没有更多信息了 ——</span>\n\n  </div>\n\n  <div class="request-defeat" *ngIf = "requestDefeat">\n\n    <img src="./assets/image/requestDefeat.png" alt="">\n\n    <p>啊哦！页面走丢了</p>\n\n    <button class="btn-request-defeat" ion-button full (touchstart)="requestDefeatRefresh()">\n\n      刷新再找一找\n\n    </button>\n\n  </div>\n\n</ion-content>'/*ion-inline-end:"C:\Users\think\huchunGit\tpb02\tpb\src\pages\brandshop-order-list\brandshop-order-list.html"*/
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
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__award_tabs_award_tabs__ = __webpack_require__(232);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__withdraw_record_withdraw_record__ = __webpack_require__(235);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__help_help__ = __webpack_require__(236);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__account_add_account_add_account__ = __webpack_require__(120);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__app_app_service__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11__account_edit_account_edit_account__ = __webpack_require__(237);
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
        var pageModal = this.modalCtrl.create(page, { 'param1': param1, 'param2': param2 });
        pageModal.onDidDismiss(function (data) {
            var componentName = pageModal['_component'].name; //获取返回页面名
            if (data) {
                if (data.isRefash) {
                    _this.getCurrent();
                    _this.getAccount();
                }
            }
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
            console.log(error);
        });
    };
    Personl.prototype.getAccountCreat = function () {
        var _this = this;
        var url = __WEBPACK_IMPORTED_MODULE_10__app_app_service__["a" /* AppConfig */].API.account;
        this.appService.httpGet(url)
            .then(function (data) {
            var pageModal = _this.modalCtrl.create(_this.pageList.addAccount, { 'userId': data.userId });
            pageModal.present();
        })
            .catch(function (error) {
            console.log(error);
            var pageModal = _this.modalCtrl.create(_this.pageList.addAccount, { 'userId': null });
            pageModal.present();
        });
    };
    Personl.prototype.ionViewDidEnter = function () {
        if (window.location.search && window.location.search.split("?")[1].indexOf("code") > -1) {
            this.getAccountCreat();
        }
    };
    return Personl;
}());
Personl = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["n" /* Component */])({
        selector: 'personl',template:/*ion-inline-start:"C:\Users\think\huchunGit\tpb02\tpb\src\pages\personl\personl.html"*/'<ion-content>\n\n  <div class="person-header">\n\n    <ion-grid>\n\n      <ion-row>\n\n        <ion-col col-4>\n\n          <img class="my-picture" src="./assets/image/mypicture.png" alt="我的">\n\n        </ion-col>\n\n        <ion-col col-8>\n\n          <h2>{{ userCurrent.cellphone }}</h2>\n\n          <button ion-button outline round color="light" (touchstart)="redirectPage(pageList.myCode)">\n\n            <img src="./assets/image/qrcode.png" alt="我的">\n\n            我的二维码\n\n          </button>\n\n        </ion-col>\n\n      </ion-row>\n\n    </ion-grid>\n\n  </div>\n\n  <div class="funds">\n\n    <h2 class="funds-title">\n\n      我的资金\n\n      <span class="showTotal" (touchstart)="showMoney()">\n\n        {{ showText }}\n\n      </span>\n\n      <span class="showImg"><img [src]="\'./assets/image/\'+showImg" alt="我的资金"></span>\n\n    </h2>\n\n    <ion-grid>\n\n      <ion-row>\n\n        <ion-col>\n\n          <div class="total"><span>￥</span>{{ userAccount.balance }}</div>\n\n        </ion-col>\n\n      </ion-row>\n\n      <ion-row>\n\n        <ion-col>\n\n          <div class="approve">审核中金额：￥{{ userAccount.verifyAmount }}</div>\n\n        </ion-col>\n\n        <ion-col>\n\n          <div class="withdrawal">已提现：￥{{ userAccount.withdrawAmount }}</div>\n\n        </ion-col>\n\n      </ion-row>\n\n    </ion-grid>\n\n    <ion-grid class="btn-list">\n\n      <ion-row>\n\n        <ion-col col-4>\n\n          <button class="btn-canwithdrawal" ion-button outline round (touchstart)="redirectPage(pageList.detailTabs)">已审核明细</button>\n\n        </ion-col>\n\n        <ion-col col-4>\n\n          <button class="btn-approve" ion-button outline round (touchstart)="redirectPage(pageList.awardTabs)">审核中明细</button>\n\n        </ion-col>\n\n        <ion-col col-4>\n\n          <button class="btn-withdrawal" ion-button outline round (touchstart)="redirectPage(pageList.withdraw, userAccount.balance, userCurrent)">提现</button>\n\n        </ion-col>\n\n      </ion-row>\n\n    </ion-grid>\n\n    <div class="withdrawal-record" (click)="redirectPage(pageList.withdrawRecord, userAccount.withdrawAmount)">\n\n      提现记录\n\n      <span><img src="./assets/image/in.png" alt="提现记录"></span>\n\n    </div>\n\n    <div class="withdrawal-record" (click)="redirectPage(pageList.addAccount, pageList.boundWechat, userCurrent)">\n\n      收款账户\n\n      <span><img src="./assets/image/in.png" alt="收款账户"></span>\n\n    </div>\n\n  </div>\n\n  <div class="help">\n\n    <ul>\n\n      <li (click)="redirectPage(pageList.help)">帮助中心<span><img src="./assets/image/in.png" alt="帮助中心"></span></li>\n\n      <li><a href="tel:4008916161">客服热线<span>400-891-6161<img src="./assets/image/in.png" alt="客服热线"></span></a></li>\n\n    </ul>\n\n  </div>\n\n  <button class="btn-logout" ion-button (click)="logOut()">退出登录</button>\n\n</ion-content>\n\n'/*ion-inline-end:"C:\Users\think\huchunGit\tpb02\tpb\src\pages\personl\personl.html"*/
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
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__app_app_service__ = __webpack_require__(5);
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
        var body = Number(this.amount).toFixed(2);
        this.appService.httpPost(url, body).then(function (data) {
            _this.isAllow = true;
        }).catch(function (error) {
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
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__order_detail_order_detail__ = __webpack_require__(230);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__award_detail_award_detail__ = __webpack_require__(231);
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
    function DetailTabs(navController, navParams, viewController, platform) {
        this.navController = navController;
        this.navParams = navParams;
        this.viewController = viewController;
        this.platform = platform;
        this.orderDetail = __WEBPACK_IMPORTED_MODULE_2__order_detail_order_detail__["a" /* OrderDetail */];
        this.awardDetail = __WEBPACK_IMPORTED_MODULE_3__award_detail_award_detail__["a" /* AwardDetail */];
    }
    DetailTabs.prototype.dismiss = function () {
        this.viewController.dismiss();
    };
    return DetailTabs;
}());
DetailTabs = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_1__angular_core__["n" /* Component */])({template:/*ion-inline-start:"C:\Users\think\huchunGit\tpb02\tpb\src\pages\detail-tabs\detail-tabs.html"*/'<ion-header>\n\n  <ion-navbar>\n\n    <ion-title text-center>已审核明细</ion-title>\n\n  </ion-navbar>\n\n</ion-header>\n\n<ion-content>\n\n  <ion-tabs class="tabs-basic" tabsPlacement="top">\n\n    <ion-tab tabTitle="订单处理金额明细" [root]="orderDetail"></ion-tab>\n\n    <ion-tab tabTitle="奖励活动金额明细" [root]="awardDetail"></ion-tab>\n\n  </ion-tabs>\n\n</ion-content>\n\n'/*ion-inline-end:"C:\Users\think\huchunGit\tpb02\tpb\src\pages\detail-tabs\detail-tabs.html"*/,
        selector: 'withdraw-detailTabs'
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_0_ionic_angular__["l" /* NavController */], __WEBPACK_IMPORTED_MODULE_0_ionic_angular__["m" /* NavParams */], __WEBPACK_IMPORTED_MODULE_0_ionic_angular__["q" /* ViewController */], __WEBPACK_IMPORTED_MODULE_0_ionic_angular__["n" /* Platform */]])
], DetailTabs);

//# sourceMappingURL=detail-tabs.js.map

/***/ }),

/***/ 230:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return OrderDetail; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__app_app_service__ = __webpack_require__(5);
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
                    item.percent = item.percent.toFixed(2);
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
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["n" /* Component */])({template:/*ion-inline-start:"C:\Users\think\huchunGit\tpb02\tpb\src\pages\order-detail\order-detail.html"*/'<ion-content>\n\n  <div class="totle-money" *ngIf="isShow">总金额：￥ {{ sum }}</div>\n\n  <div class="loading-wrapper" *ngIf="isLoadingShow">\n\n    <div>\n\n      <ion-spinner item-start [name]="load.spinner"></ion-spinner>\n\n    </div>\n\n    <div [innerHTML]="load.content"></div>\n\n  </div>\n\n  <ion-refresher *ngIf="!isLoadingShow" (ionRefresh)="pullRefresh($event)">\n\n    <ion-refresher-content></ion-refresher-content>\n\n  </ion-refresher>\n\n  <ul class="first-card" *ngFor = "let item of orderDetail">\n\n    <li>订单编号：{{ item.relateId }}</li>\n\n    <li>结算基数：￥{{ item.baseAmount }}</li>\n\n    <li>奖励比例：{{ item.percent }}</li>\n\n    <li>奖励金额：￥{{ item.amount }}</li>\n\n  </ul>\n\n  <div class="no-data" *ngIf="isEmpty">\n\n    <img src="./assets/image/nodata.png" alt="">\n\n    <p>空空如也</p>\n\n  </div>\n\n  <div class="btn-noMore" *ngIf="orderDetail.length !== 0 && orderDetail.length === count">\n\n    <span>—— 没有更多信息了 ——</span>\n\n  </div>\n\n  <div class="request-defeat" *ngIf="requestFail">\n\n    <img src="./assets/image/requestDefeat.png" alt="">\n\n    <p>啊哦！页面走丢了</p>\n\n    <button class="btn-request-defeat" ion-button full (touchstart)="refresh()">\n\n      刷新再找一找\n\n    </button>\n\n  </div>\n\n  <ion-infinite-scroll  (ionInfinite)="loadMore($event)" *ngIf="orderDetail.length < count">\n\n    <ion-infinite-scroll-content\n\n      loadingSpinner="bubbles"\n\n      loadingText="加载中">\n\n    </ion-infinite-scroll-content>\n\n  </ion-infinite-scroll>\n\n</ion-content>'/*ion-inline-end:"C:\Users\think\huchunGit\tpb02\tpb\src\pages\order-detail\order-detail.html"*/,
        selector: 'withdraw-orderDetail'
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1__app_app_service__["b" /* AppService */]])
], OrderDetail);

//# sourceMappingURL=order-detail.js.map

/***/ }),

/***/ 231:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AwardDetail; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_ionic_angular__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__app_app_service__ = __webpack_require__(5);
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
                    item.percent = item.percent.toFixed(2);
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
    Object(__WEBPACK_IMPORTED_MODULE_1__angular_core__["n" /* Component */])({template:/*ion-inline-start:"C:\Users\think\huchunGit\tpb02\tpb\src\pages\award-detail\award-detail.html"*/'<ion-content>\n\n  <div class="loading-wrapper" *ngIf="isLoadingShow">\n\n    <div>\n\n      <ion-spinner item-start [name]="load.spinner"></ion-spinner>\n\n    </div>\n\n    <div [innerHTML]="load.content"></div>\n\n  </div>\n\n  <ion-refresher *ngIf="!isLoadingShow" (ionRefresh)="pullRefresh($event)">\n\n    <ion-refresher-content></ion-refresher-content>\n\n  </ion-refresher>\n\n  <div class="totle-money" *ngIf="isShow">总金额：{{ sum }}</div>\n\n  <ul class="first-card" *ngFor = "let item of awardDetail">\n\n      <li class=\'order-number\' *ngIf="item.type === 3">订单编号：{{ item.relateId }}</li>\n\n      <li class=\'order-number\' *ngIf="item.type === 4">会员手机：{{ item.mobile }}</li>\n\n      <li class=\'date\'>活动时间：{{ item.startTime | date:\'yyyy.MM.dd\' }}</li>\n\n      <li class=\'base-number\'>结算基数：￥{{ item.baseAmount }}</li>\n\n      <li class=\'percentage\'>奖励比例：{{ item.percent }}</li>\n\n      <li class="money">奖励金额：￥{{ item.amount }}</li>\n\n  </ul>\n\n  <div class="no-data" *ngIf="isEmpty">\n\n    <img src="./assets/image/nodata.png" alt="">\n\n    <p>空空如也</p>\n\n  </div>\n\n  <div class="btn-noMore" *ngIf="awardDetail.length !== 0 && awardDetail.length === count">\n\n    <span>—— 没有更多信息了 ——</span>\n\n  </div>\n\n  <div class="request-defeat" *ngIf="requestFail">\n\n    <img src="./assets/image/requestDefeat.png" alt="">\n\n    <p>啊哦！页面走丢了</p>\n\n    <button class="btn-request-defeat" ion-button full (touchstart)="refresh()">\n\n      刷新再找一找\n\n    </button>\n\n  </div>\n\n  <ion-infinite-scroll  (ionInfinite)="loadMore($event)" *ngIf="awardDetail.length < count">\n\n    <ion-infinite-scroll-content\n\n      loadingSpinner="bubbles"\n\n      loadingText="加载中">\n\n    </ion-infinite-scroll-content>\n\n  </ion-infinite-scroll>\n\n</ion-content>'/*ion-inline-end:"C:\Users\think\huchunGit\tpb02\tpb\src\pages\award-detail\award-detail.html"*/,
        selector: 'withdraw-awardDetail'
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_0_ionic_angular__["m" /* NavParams */],
        __WEBPACK_IMPORTED_MODULE_2__app_app_service__["b" /* AppService */]])
], AwardDetail);

//# sourceMappingURL=award-detail.js.map

/***/ }),

/***/ 232:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AwardTabs; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__award_activity_award_activity__ = __webpack_require__(233);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__award_order_award_order__ = __webpack_require__(234);
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
    function AwardTabs(navCtrl, alertCtrl) {
        this.navCtrl = navCtrl;
        this.alertCtrl = alertCtrl;
        this.awardActivity = __WEBPACK_IMPORTED_MODULE_2__award_activity_award_activity__["a" /* AwardActivity */];
        this.awardOrder = __WEBPACK_IMPORTED_MODULE_3__award_order_award_order__["a" /* AwardOrder */];
    }
    return AwardTabs;
}());
AwardTabs = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["n" /* Component */])({
        selector: 'award-tabs',template:/*ion-inline-start:"C:\Users\think\huchunGit\tpb02\tpb\src\pages\award-tabs\award-tabs.html"*/'<ion-header>\n\n  <ion-navbar>\n\n    <ion-title text-center>审核中明细</ion-title>\n\n  </ion-navbar>\n\n</ion-header>\n\n<ion-content>\n\n  <ion-tabs class="tabs-list" tabsPlacement="top">\n\n    <ion-tab [root]="awardOrder" tabTitle="订单处理金额明细"></ion-tab>\n\n    <ion-tab [root]="awardActivity" tabTitle="奖励活动金额明细"></ion-tab>\n\n  </ion-tabs>\n\n</ion-content>\n\n'/*ion-inline-end:"C:\Users\think\huchunGit\tpb02\tpb\src\pages\award-tabs\award-tabs.html"*/
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["l" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["a" /* AlertController */]])
], AwardTabs);

//# sourceMappingURL=award-tabs.js.map

/***/ }),

/***/ 233:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AwardActivity; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__app_app_service__ = __webpack_require__(5);
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
                    item.percent = item.percent.toFixed(2);
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
        selector: 'award-activity',template:/*ion-inline-start:"C:\Users\think\huchunGit\tpb02\tpb\src\pages\award-activity\award-activity.html"*/'<ion-content>\n\n  <div class="loading-wrapper" *ngIf="isLoadingShow">\n\n    <div>\n\n      <ion-spinner item-start [name]="load.spinner"></ion-spinner>\n\n    </div>\n\n    <div [innerHTML]="load.content"></div>\n\n  </div>\n\n  <ion-refresher *ngIf="!isLoadingShow" (ionRefresh)="pullRefresh($event)">\n\n    <ion-refresher-content></ion-refresher-content>\n\n  </ion-refresher>\n\n  <div class="withdraw-record">\n\n    <div class="withdraw-total">\n\n      <span *ngIf="isShow">总金额：￥ {{ sum }}</span>\n\n    </div>\n\n    <div class="record-list">\n\n      <div class="withdraw-item" *ngFor = "let item of awardActivity">\n\n        <ul>\n\n          <li class=\'order-number\' *ngIf="item.type === 3">订单编号：{{ item.relateId }}</li>\n\n          <li class=\'order-number\' *ngIf="item.type === 4">会员手机：{{ item.mobile }}</li>\n\n          <li class=\'date\'>活动时间：{{ item.startTime | date:\'yyyy.MM.dd\' }}</li>\n\n          <li class=\'base-number\'>结算基数：￥{{ item.baseAmount }}</li>\n\n          <li class=\'percentage\'>奖励比例：{{ item.percent }}</li>\n\n          <li class="money">奖励金额：￥{{ item.amount }}</li>\n\n        </ul>\n\n      </div>\n\n    </div>\n\n    <div class="no-data" *ngIf="isEmpty">\n\n      <img src="./assets/image/nodata.png" alt="">\n\n      <p>空空如也</p>\n\n    </div>\n\n    <div class="btn-noMore" *ngIf="awardActivity.length !== 0 && awardActivity.length === count">\n\n      <span>—— 没有更多信息了 ——</span>\n\n    </div>\n\n  </div>\n\n  <div class="request-defeat" *ngIf="requestFail">\n\n    <img src="./assets/image/requestDefeat.png" alt="">\n\n    <p>啊哦！页面走丢了</p>\n\n    <button class="btn-request-defeat" ion-button full (touchstart)="refresh()">\n\n      刷新再找一找\n\n    </button>\n\n  </div>\n\n  <ion-infinite-scroll  (ionInfinite)="loadMore($event)" *ngIf="awardActivity.length < count">\n\n    <ion-infinite-scroll-content\n\n      loadingSpinner="bubbles"\n\n      loadingText="加载中">\n\n    </ion-infinite-scroll-content>\n\n  </ion-infinite-scroll>\n\n</ion-content>\n\n'/*ion-inline-end:"C:\Users\think\huchunGit\tpb02\tpb\src\pages\award-activity\award-activity.html"*/
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["l" /* NavController */],
        __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["a" /* AlertController */],
        __WEBPACK_IMPORTED_MODULE_2__app_app_service__["b" /* AppService */]])
], AwardActivity);

//# sourceMappingURL=award-activity.js.map

/***/ }),

/***/ 234:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AwardOrder; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__app_app_service__ = __webpack_require__(5);
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
                    item.percent = item.percent.toFixed(2);
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

/***/ 235:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return WithdrawRecord; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__app_app_service__ = __webpack_require__(5);
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

/***/ 236:
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

/***/ 237:
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

/***/ 238:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return UpdatePwd; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_http__ = __webpack_require__(48);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_ionic_angular__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__app_app_service__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__tabs_tabs__ = __webpack_require__(59);
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
            console.log("inter01");
            var loading_1 = this.appService.loading();
            loading_1.present();
            var url = __WEBPACK_IMPORTED_MODULE_3__app_app_service__["a" /* AppConfig */].API.editPassword;
            var body = {
                password: this.newPwd
            };
            console.log(this.withTokenHeaders);
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
                _this.appService.setItem("user", JSON.stringify(_this.user));
                _this.appService.setItem("tpb_token", _this.tpb_token);
                _this.appService.setItem("refresh_token", _this.refresh_token);
                if (data.type == "success") {
                    _this.appService.toast('修改成功', 1000, 'middle');
                    var appNav = _this.app.getRootNav();
                    appNav.setRoot(__WEBPACK_IMPORTED_MODULE_4__tabs_tabs__["a" /* TabsPage */]);
                }
            }).catch(function (error) {
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
        selector: 'update-pwd',template:/*ion-inline-start:"C:\Users\think\huchunGit\tpb02\tpb\src\pages\update-pwd\update-pwd.html"*/'<ion-content>\n\n  <div class="forget-box">\n\n    <div class="update-instruction">\n\n      <dl>\n\n        <dt><img src="./assets/image/applogo.png"></dt>\n\n        <dd>\n\n          <p>初次登陆淘璞帮</p>\n\n          <p>请您修改登陆密码并牢记</p>\n\n        </dd>\n\n      </dl>\n\n    </div>\n\n    <ion-list>\n\n      <ion-item>\n\n        <ion-input type="password" [(ngModel)]="initialPwd" (ionBlur)="initialPwdBlur()" placeholder="请输入初始密码" required clearInput=true></ion-input>\n\n      </ion-item>\n\n      <div class=\'login-error\' *ngIf="isInitialPwd">{{initialPwdValue}}</div>\n\n      <ion-item>\n\n        <ion-input type="password" [(ngModel)]="newPwd" (ionBlur)="newPwdBlur()" placeholder="输入新密码" required clearInput=true></ion-input>\n\n      </ion-item>\n\n      <div class=\'login-error\' *ngIf="isNewPwd">{{newPwdValue}}</div>\n\n      <ion-item>\n\n        <ion-input type="password" [(ngModel)]="repeatPwd" (ionBlur)="repeatPwdBlur()" placeholder="重复密码" required clearInput=true></ion-input>\n\n      </ion-item>\n\n      <div class=\'login-error\' *ngIf="isRepeatPwd">{{repeatPwdValue}}</div>\n\n    </ion-list>\n\n    <button class="btn-forget" ion-button block round (touchstart)="confirm()">确认</button>\n\n  </div>\n\n  </ion-content>\n\n  \n\n'/*ion-inline-end:"C:\Users\think\huchunGit\tpb02\tpb\src\pages\update-pwd\update-pwd.html"*/
    }),
    __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["l" /* NavController */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["l" /* NavController */]) === "function" && _a || Object, typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["a" /* AlertController */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["a" /* AlertController */]) === "function" && _b || Object, typeof (_c = typeof __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["m" /* NavParams */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["m" /* NavParams */]) === "function" && _c || Object, typeof (_d = typeof __WEBPACK_IMPORTED_MODULE_3__app_app_service__["b" /* AppService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_3__app_app_service__["b" /* AppService */]) === "function" && _d || Object, typeof (_e = typeof __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["b" /* App */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["b" /* App */]) === "function" && _e || Object])
], UpdatePwd);

var _a, _b, _c, _d, _e;
//# sourceMappingURL=update-pwd.js.map

/***/ }),

/***/ 241:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_platform_browser_dynamic__ = __webpack_require__(242);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__app_module__ = __webpack_require__(260);


Object(__WEBPACK_IMPORTED_MODULE_0__angular_platform_browser_dynamic__["a" /* platformBrowserDynamic */])().bootstrapModule(__WEBPACK_IMPORTED_MODULE_1__app_module__["a" /* AppModule */]);
//# sourceMappingURL=main.js.map

/***/ }),

/***/ 260:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AppModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_platform_browser__ = __webpack_require__(31);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_http__ = __webpack_require__(48);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__app_service__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__ionic_native_barcode_scanner__ = __webpack_require__(315);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__ionic_native_dialogs__ = __webpack_require__(324);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_ionic_angular__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__app_component__ = __webpack_require__(325);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__app_pipe__ = __webpack_require__(351);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9_angular2_qrcode__ = __webpack_require__(352);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__pages_login_login__ = __webpack_require__(112);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11__pages_forget_forget__ = __webpack_require__(210);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12__pages_update_pwd_update_pwd__ = __webpack_require__(238);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_13__pages_home_home__ = __webpack_require__(211);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_14__pages_tabs_tabs__ = __webpack_require__(59);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_15__pages_personl_personl__ = __webpack_require__(227);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_16__pages_order_info_order_info__ = __webpack_require__(219);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_17__pages_gift_info_gift_info__ = __webpack_require__(218);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_18__pages_creat_order_creat_order__ = __webpack_require__(214);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_19__pages_help_help__ = __webpack_require__(236);
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
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_31__pages_unhandle_expressgift_unhandle_expressgift__ = __webpack_require__(354);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_32__pages_unhandle_selfgift_unhandle_selfgift__ = __webpack_require__(355);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_33__pages_handle_selfgift_handle_selfgift__ = __webpack_require__(61);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_34__pages_handle_expressgift_handle_expressgift__ = __webpack_require__(119);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_35__pages_withdraw_withdraw__ = __webpack_require__(228);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_36__pages_withdraw_record_withdraw_record__ = __webpack_require__(235);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_37__pages_mycode_mycode__ = __webpack_require__(113);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_38__pages_award_tabs_award_tabs__ = __webpack_require__(232);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_39__pages_award_activity_award_activity__ = __webpack_require__(233);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_40__pages_award_order_award_order__ = __webpack_require__(234);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_41__pages_account_bind_account_bind_account__ = __webpack_require__(356);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_42__pages_account_add_account_add_account__ = __webpack_require__(120);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_43__pages_account_edit_account_edit_account__ = __webpack_require__(237);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_44__pages_order_list_order_list__ = __webpack_require__(225);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_45__pages_brandshop_order_list_brandshop_order_list__ = __webpack_require__(226);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_46__pages_order_detail_order_detail__ = __webpack_require__(230);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_47__pages_award_detail_award_detail__ = __webpack_require__(231);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_48__pages_detail_tabs_detail_tabs__ = __webpack_require__(229);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_49__ionic_native_status_bar__ = __webpack_require__(239);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_50__ionic_native_splash_screen__ = __webpack_require__(240);
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

/***/ 325:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return MyApp; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__pages_login_login__ = __webpack_require__(112);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__pages_tabs_tabs__ = __webpack_require__(59);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__ionic_native_status_bar__ = __webpack_require__(239);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__ionic_native_splash_screen__ = __webpack_require__(240);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__app_service__ = __webpack_require__(5);
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
        // make TabsPage the root (or first) page
        this.rootPage = this.appService.getItem("tpb_token") ? __WEBPACK_IMPORTED_MODULE_3__pages_tabs_tabs__["a" /* TabsPage */] : __WEBPACK_IMPORTED_MODULE_2__pages_login_login__["a" /* Login */];
        this.initializeApp();
    }
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
    __metadata("design:type", __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["k" /* Nav */])
], MyApp.prototype, "nav", void 0);
MyApp = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["n" /* Component */])({template:/*ion-inline-start:"C:\Users\think\huchunGit\tpb02\tpb\src\app\app.html"*/'<ion-nav [root]="rootPage" #content swipeBackEnabled="false"></ion-nav>'/*ion-inline-end:"C:\Users\think\huchunGit\tpb02\tpb\src\app\app.html"*/
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["n" /* Platform */],
        __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* MenuController */],
        __WEBPACK_IMPORTED_MODULE_4__ionic_native_status_bar__["a" /* StatusBar */],
        __WEBPACK_IMPORTED_MODULE_5__ionic_native_splash_screen__["a" /* SplashScreen */],
        __WEBPACK_IMPORTED_MODULE_6__app_service__["b" /* AppService */]])
], MyApp);

//# sourceMappingURL=app.component.js.map

/***/ }),

/***/ 351:
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
        return productSkuDTOImage ? "https://www.91topbaby.com/evercos/common/file/content/" + productSkuDTOImage : "./assets/image/nodata.png";
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
        return handleGiftImage ? "https://images.91topbaby.com/" + handleGiftImage : "./assets/image/nodata.png";
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

/***/ 354:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return UnhandleExpressgift; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__handle_expressgift_handle_expressgift__ = __webpack_require__(119);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__app_app_service__ = __webpack_require__(5);
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

/***/ 355:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return UnhandleSelfgift; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__handle_selfgift_handle_selfgift__ = __webpack_require__(61);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__app_app_service__ = __webpack_require__(5);
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

/***/ 356:
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

/***/ 5:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AppConfig; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return AppService; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_http__ = __webpack_require__(48);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_rxjs_add_operator_toPromise__ = __webpack_require__(301);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_rxjs_add_operator_toPromise___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_rxjs_add_operator_toPromise__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_rxjs_add_operator_timeout__ = __webpack_require__(303);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_rxjs_add_operator_timeout___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4_rxjs_add_operator_timeout__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_buffer__ = __webpack_require__(110);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_buffer___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_5_buffer__);
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
AppConfig.hostUrl = "https://rest.91topbaby.com";
AppConfig.mainUrl = "91topbaby.com";
//请求超时时间
AppConfig.TIME_OUT = 30000;
// 上拉加载、下拉刷新的定时器时间
AppConfig.LOAD_TIME = 500;
//获取token的url
AppConfig.oauthTokenUrl = AppConfig_1.hostUrl + "/uaa/oauth/token";
//testClient  生产client_id
AppConfig.client_id = "topbss";
//secret  生产client_pwd
AppConfig.grant_type = "password";
//appid
AppConfig.appID = "wxadf96ade9aed2e45"; //后面需改
//appSecret
AppConfig.appSecret = "83af89b678690d2b8e12ecb693485308"; //后面需改
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
    sns: "https://open.weixin.qq.com/sns/oauth2/access_token",
    signature: "https://open.weixin.qq.com/evercos/wechat/jsapiticket/signature.json",
    orderReceive: AppConfig_1.hostUrl + "/order/receive/received",
    receiveGift: AppConfig_1.hostUrl + "/promotion/member/gift/account/receiveGift",
    firstLogin: AppConfig_1.hostUrl + "/uaa/getInfo",
    editPassword: AppConfig_1.hostUrl + "/uaa/password",
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
    //get request
    AppService.prototype.httpGet = function (url) {
        this.withTokenHeaders = new __WEBPACK_IMPORTED_MODULE_2__angular_http__["a" /* Headers */]({
            'Authorization': 'Bearer ' + this.getItem('tpb_token')
        });
        return this.http.get(url, { headers: this.withTokenHeaders }).timeout(AppConfig.TIME_OUT).toPromise()
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
            'Authorization': 'Bearer ' + this.getItem('tpb_token')
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
            var base64encode = new __WEBPACK_IMPORTED_MODULE_5_buffer__["Buffer"]('testClient:secret').toString('base64');
            self.oauthTokenHeaders = new __WEBPACK_IMPORTED_MODULE_2__angular_http__["a" /* Headers */]({
                'Authorization': 'Basic ' + base64encode,
                'Content-Type': 'application/x-www-form-urlencoded'
            });
            var oauthTokenUrl = AppConfig.oauthTokenUrl;
            var body = "grant_type=refresh_token&refresh_token=" + self.getItem("refresh_token");
            self.httpPostHeader(oauthTokenUrl, body, self.oauthTokenHeaders).then(function (data) {
                self.setItem("tpb_token", data.access_token);
                self.setItem("refresh_token", data.refresh_token);
                callback();
            }).catch(function (err) {
                console.log(err);
                self.toast('网络异常，请稍后重试', 1000, 'middle');
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

/***/ 59:
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

/***/ 61:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return HandleSelfgift; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__app_app_service__ = __webpack_require__(5);
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
        this.getHandleSelfGiftList();
    }
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
        var url = __WEBPACK_IMPORTED_MODULE_2__app_app_service__["a" /* AppConfig */].API.getGiftList + "?type=0&start=" + this.start + "&limit=" + this.limit;
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
        selector: 'handle-selfgift',template:/*ion-inline-start:"C:\Users\think\huchunGit\tpb02\tpb\src\pages\handle-selfgift\handle-selfgift.html"*/'<ion-header>\n\n  <ion-navbar>\n\n    <ion-title text-center>已兑换自提赠品</ion-title>\n\n  </ion-navbar>\n\n</ion-header>\n\n<ion-content>\n\n	<ion-refresher (ionRefresh)="refreshGetHandleSelfGiftList($event)" *ngIf="!loadingShow">\n\n    <ion-refresher-content></ion-refresher-content>\n\n  </ion-refresher>\n\n  <div class="gift-list">\n\n	<!-- loading -->\n\n	<div class="loading-wrapper" *ngIf="loadingShow">\n\n		<div>\n\n			<ion-spinner item-start [name]="load.spinner"></ion-spinner>\n\n		</div>\n\n		<div [innerHTML]="load.content"></div>\n\n	</div>\n\n	<div class="gift-item" *ngFor = "let item of handleSeflGiftArray">\n\n	  <dl>\n\n		<dt><img [src]="item.imageName | handleGiftImage" alt=""></dt>\n\n		<dd class="product-title">\n\n		  <h2>{{item.giftName}}</h2>\n\n			<span class="unstart">{{ item.giftType | setHandleGiftType }}</span>\n\n		</dd>\n\n			<dd class="member-phone">会员手机：{{item.memberPhone}}</dd>\n\n			<dd class="member-phone" *ngIf = "item.giftType==\'0\'">预约手机：{{item.reservePhone}}</dd>\n\n		  <dd class="get-time">领取时间：{{item.receiveDate | date:\'yyyy-MM-dd HH:mm:ss\'}}</dd>\n\n		  <dd class="get-time exchangeTime">兑换时间：{{item.useDate | date:\'yyyy-MM-dd HH:mm:ss\'}}</dd>\n\n	  </dl>\n\n	  <div class="reserve-time">\n\n		<div class="show-time" *ngIf = "item.giftType==\'0\'">预约到店时间：{{item.reserveShopTime | date:\'yyyy-MM-dd HH:mm:ss\'}}</div>\n\n		<div class="show-time">导购员：{{item.brandshopUserName}}</div>\n\n	  </div>\n\n	</div>\n\n	\n\n	</div>\n\n	<div class="no-data" *ngIf = "noData">\n\n		<img src="./assets/image/nodata.png" alt="">\n\n		<p>空空如也</p>\n\n	</div>\n\n	<div class="btn-noMore" *ngIf = "showNoMore">\n\n		<span>—— 没有更多已兑换赠品了 ——</span>\n\n	</div>\n\n	<div class="request-defeat" *ngIf = "requestDefeat">\n\n		<img src="./assets/image/requestDefeat.png" alt="">\n\n		<p>啊哦！页面走丢了</p>\n\n		<button class="btn-request-defeat" ion-button full (touchstart)="requestDefeatRefresh()">\n\n			刷新再找一找\n\n		</button>\n\n	</div>\n\n	<ion-infinite-scroll (ionInfinite)="infiniteGetHandleSelfGiftList($event)" *ngIf = "!showNoMore && showInfinite">\n\n    <ion-infinite-scroll-content loadingText="加载更多..."></ion-infinite-scroll-content>\n\n  </ion-infinite-scroll>\n\n</ion-content>\n\n'/*ion-inline-end:"C:\Users\think\huchunGit\tpb02\tpb\src\pages\handle-selfgift\handle-selfgift.html"*/
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["l" /* NavController */],
        __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["a" /* AlertController */],
        __WEBPACK_IMPORTED_MODULE_2__app_app_service__["b" /* AppService */]])
], HandleSelfgift);

//# sourceMappingURL=handle-selfgift.js.map

/***/ })

},[241]);
//# sourceMappingURL=main.js.map