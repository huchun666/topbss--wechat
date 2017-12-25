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

Environment Variables:

1.File 'src/environments/environment.ts' will be used for the Production environment.

2.File 'src/environments/environment.dev.ts' will be used for the Development environment.

With this configuration, you can import environment variables anywhere.
```bash
import { ENV } from '@app/env'
```

### Android Devices:
To build your app for production or development, run

```bash
$ ionic cordova build android --prod --release
```
or

```bash
$ ionic cordova build android --dev --release
```
### ios:
To build your app for production or development, run

```bash
$ ionic cordova build ios --prod --release
```
or

```bash
$ ionic cordova build ios --dev --release
```



Substitute ios for android if not on a Mac.
