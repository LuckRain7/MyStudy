'use strict';

const Controller = require('egg').Controller;

class HomeController extends Controller {
  async index() {
    const { ctx } = this;

    // 调用extend里面的扩展的application
    this.app.foo();

    // 调用extend里边的扩展ctx
    console.log('ip', this.ctx.getIp());

    // this.ctx.csrf 用户访问这个页面的时候传递这个秘钥
    await this.ctx.render('home.html', {
      csrf: this.ctx.csrf,
    });
  }
  async add() {
    // 接收post获取的数据  需要csrf验证
    console.log(this.ctx.request.body);
    this.ctx.body = 'add';
  }
}

module.exports = HomeController;
