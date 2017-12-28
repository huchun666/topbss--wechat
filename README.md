### With the Ionic CLI:

```bash
$ sudo npm install -g ionic cordova
```

Then, to run it, cd into `tpb` and run:

```bash
$ cd tpb
$ npm install
$ ionic serve --lab
```

## Environment Variables:

1.File 'src/environments/environment.ts' will be used for the Production environment.

2.File 'src/environments/environment.dev.ts' will be used for the Development environment.

With this configuration, you can import environment variables anywhere.
```bash
import { ENV } from '@app/env'
```

### Wechat

#### 测试执行命令
```
npm run build --prod
```
未带--production参数或者参数为非--production时，为测试环境变量

#### 生产执行命令 
```
npm run build --prod --production
```
带--production参数时，为生产环境变量



### Android Devices:
To build your app for production or development, run

```bash
$ ionic cordova build android --prod --release
or
$ ionic cordova build android --dev --release
```

### ios:
To build your app for production or development, run

```bash
$ ionic cordova build ios --prod --release
or
$ ionic cordova build ios --dev --release
```



Substitute ios for android if not on a Mac.
