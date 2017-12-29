//override the defaults for some of the various tasks

var copyConfig = require('@ionic/app-scripts/config/copy.config.js');
copyConfig.copyIndexContent.src.push('{{SRC}}/wechatconfig/**/*');
module.exports = copyConfig;
