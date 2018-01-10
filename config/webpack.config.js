var chalk = require("chalk");
var fs = require('fs');
var path = require('path');
var useDefaultConfig = require('@ionic/app-scripts/config/webpack.config.js');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const webpack = require('webpack');
var colors = require('colors');


var env = process.env.IONIC_ENV;
var pathConfig = path.resolve(environmentPath('dev'));

if (process.env.npm_config_argv) {  //通过npm run方式编译微信项目时
  var npmConfigJson = JSON.parse(process.env.npm_config_argv).original;
  if (npmConfigJson.indexOf('--production') > -1) {
    pathConfig = path.resolve(environmentPath('prod'));
    console.log(colors.yellow("Production:", "Environment variables in file: "+ pathConfig + " using for production build."));
  }else{
    console.log(colors.yellow("Test:", "Environment variables in file: "+ pathConfig + " using for test build."));
  }
  
} else { //通过ionic build 编译微信项目时
  pathConfig = path.resolve(environmentPath(env));
}

useDefaultConfig[env].resolve.alias = {
  "@app/env": pathConfig
};

if (env !== 'prod' && env !== 'dev') {
  // Default to dev config
  useDefaultConfig[env] = useDefaultConfig.dev;
  useDefaultConfig[env].resolve.alias = {
    "@app/env": path.resolve(environmentPath(env))
  };
}

function environmentPath(env) {
  var filePath = './src/environments/environment' + (env === 'prod' ? '' : '.' + env) + '.ts';
  if (!fs.existsSync(filePath)) {
    console.log(chalk.red('\n' + filePath + ' does not exist!'));
  } else {
    return filePath;
  }
}
useDefaultConfig[env].output.filename = '[name].[hash].js';
useDefaultConfig[env].plugins.push(
  new HtmlWebpackPlugin({
    template:'./src/index.html',
    filename: '../index.html',
    hash: false,
    cache: false
  })
);


module.exports = function () {
  return useDefaultConfig;
};