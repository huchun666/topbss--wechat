# 安装开发环境

## 安装ionic和cordova
```
npm install -g cordova ionic
```
cordova官方文档: [Cordova](https://cordova.apache.org/)

ionic官方文档：[Ionic](https://ionicframework.com/)

# 配置开发环境

## git下载代码
先克隆一份代码到自己git上，然后通过git下载代码

如：
```
git clone ssh://git@git.91topbaby.com:10022/front/tpb.git
```
## 安装node插件和依赖
```
npm install
```

## 添加platform
```
ionic cordova platform add ios
ionic cordova platform add android
```

## Cordova插件介绍

### phonegap-plugin-barcodescanner 插件
* 插件功能：此项目中功能为扫描二维码
* 插件地址：[phonegap-plugin-barcodescanner](https://github.com/apache/cordova-plugin-statusbar.git)
* 适配platform: Android/IOS
* 安装方法:
  ```
   ionic cordova plugin add phonegap-plugin-barcodescanner
   npm install --save @ionic-native/barcode-scanner
  ```

### cordova-hot-code-push-plugin 插件
* 插件功能：App热更新
* 插件地址：[cordova-hot-code-push-plugin](https://github.com/nordnet/cordova-hot-code-push)
* 适配platform: Android/IOS
* 安装方法:
  ```
   ionic cordova plugin add cordova-hot-code-push-plugin
   npm install -g cordova-hot-code-push-cli
  ```

### cordova-plugin-network-information 插件
* 插件功能：检测平台连接的网络类型以及是否断网
* 插件地址：[cordova-hot-code-push-plugin](https://github.com/apache/cordova-plugin-network-information)
* 适配platform: Android/IOS
* 安装方法:
  ```
   ionic cordova plugin add cordova-plugin-network-information
   npm install --save @ionic-native/network

  ```
  
## 在Android上运行APK
```
ionic cordova run  android --prod
```
### 谷歌浏览器查看连接的设备
url中输入
```
chrome://inspect/#devices
```
或者命令行中
```
adb
```

## 签名
根目录下有个build.json文件，里面配置的是签名信息
在发布时，会根据这个文件的信息自动进行签名

### 发布App版本
```
ionic cordova build android --prod --release
```


_____________________________________________________________________________

# 使用Cordova Hot Code Push进行Ionic App热更新

## 安装Cordova Hot Code Push
```
ionic cordova plugin add cordova-hot-code-push-plugin
```
Cordova Hot Code Push文档参考 [Cordova Hot Code Push](https://github.com/nordnet/cordova-hot-code-push/wiki)

## 安装cordova Hot Code Push Cli

```
npm install -g cordova-hot-code-push-cli
```
Cordova Hot Code Push Cli 文档参考 [Cordova Hot Code Push Cli](https://github.com/nordnet/cordova-hot-code-push-cli)

## 配置Platform

```
ionic cordova platform add android
ionic cordova platform add ios
```
## 配置 cordova hcp模板
在根目录下执行下面命令(tpb目录下)

```
cordova-hcp init
```
用于动态生成chcp.json和chcp.manifest文件的模板(不用每次手动更改chcp.json和chcp.manifest)
* 可以选择只配置下面三个选项

```
...
Enter project name: TopBss
Update method(required): resume 
Enter full URL: 远程域名地址/updates
...
```
1. Update method(required)有三种方式： now，start，resume
2. 远程地址用来放app build后的www内部的所有文件

* 生成后的cordova-hcp.json文件(在根目录中)

```
{
    "name": "TopBss",
    "ios_identifier": "",
    "android_identifier": "",
    "update": "start",
    "content_url": "远程域名地址/updates"
}
```

## 配置APP的config.xml

```
<chcp>
  <config-file url="远程域名地址/updates/chcp.json" />
  <auto-download enabled="true" />
  <auto-install enabled="true" />
</chcp>
```
* chcp.json 本地app和远程的chcp.json中的release进行对比，如果不一致则会进行下载更新
* auto-download 设置为true时，则为自动下载远程需要更新的文件
* auto-install 设置为true时，则为自动安装

### 修改完后，重新编译APP，并重新生成chcp.json和chcp.manifest(生成的两个文件在www文件夹中)

```
ionic cordova build android --prod --release
(ios则执行 ionic cordova build ios --prod --release)

cordova-hcp build
```
将www内的所有文件发布到远程服务器。

* 每次版本更新，都要执行一次cordova-hcp build，并将WWW内的文件传到服务器上。
* config.xml和cordova-hcp.json中的服务器地址需要自己开个服务器存放www内的文件。

使用Cordova Hot Code Push进行Ionic App热更新 [参考网址](https://codepureandsimple.com/implementing-cordova-hot-code-push-in-your-ionic-app-247cda24d6d4)


## 部署流程

* cordova-hcp build

此命令会生成各个平台(iOS 和Android)上的config.xml 文件

* build 
