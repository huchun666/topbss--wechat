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