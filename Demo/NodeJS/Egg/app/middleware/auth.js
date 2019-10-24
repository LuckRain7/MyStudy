'use strict';

module.exports = () => {
  return async function auth(ctx, next) {

    // 设置全局变量
    ctx.state.csrf = ctx.csrf;

    await next();
  };
};

