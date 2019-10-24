/* eslint valid-jsdoc: "off" */

'use strict';

/**
 * @param {Egg.EggAppInfo} appInfo app info
 */
module.exports = appInfo => {
  /**
   * built-in config
   * @type {Egg.EggAppConfig}
   **/
  const config = exports = {};

  // use for cookie sign key, should change to your own and keep security
  config.keys = appInfo.name + '_1571797572547_3421';

  // add your middleware config here
  config.middleware = [ 'printdate', 'forbindip' ];
  // 给中间件传值
  config.printdate = {
    value: '给中间件printdate穿的值，在中间件options中拿到',
  };

  // add your user config here
  const userConfig = {
    // myAppName: 'egg',
    api: 'http://www.phonegap100.com/',
  };

  config.view = {
    mapping: {
      '.html': 'ejs',
    },
  };


  return {
    ...config,
    ...userConfig,
  };
};
