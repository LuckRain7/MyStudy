const Koa = require('koa');
const app = new Koa();
const route = require('koa-route')
const path = require('path');
const serve = require('koa-static');
const main = require('./ctx.js')


// 处理错误的中间件 throw抛出的错误
const handlingErrors = async (ctx, next) => {
    try {
        await next();
    } catch (err) {
        ctx.response.status = err.statusCode || err.status || 500
        ctx.response.body = {
            message: err.message
        }
        ctx.app.emit('error', err, ctx) //手动释放error事件 才能让监听函数生效
    }
};
app.use(handlingErrors);

// middleware 中间件 （可以使用async await 进行异步操作）
const logger = async (ctx, next) => {
    await next()
    console.log(`${Date.now()} ${ctx.request.method} ${ctx.request.url}`);
}
app.use(logger)

// koa-route 封装路由
const page = ctx => {
    ctx.response.type = 'html'
    ctx.response.body = '<h1>hello world</h1>'
}
app.use(route.get('/page', page))
app.use(route.get('/', main))

// koa-static 提供静态资源
const static = serve(path.join(__dirname, 'public'));
app.use(static)

// ctx.response.redirect 重定向
const redirect = ctx => {
    ctx.response.redirect('/');
    ctx.response.body = '<a href="/">Index Page</a>';
}
app.use(route.get('/redirect', redirect))

// koa-compose 实现中间件合并
// const compose = require('koa-compose')
// const m1,m2
// const middlewares = compose([logger, main])
// app.use(middlewares)

// ctx.throw() 抛出错误 
const err = ctx => {
    ctx.throw(500)
}
// app.use(err)
app.use(route.get('/err', err))

// ctx.response.status 设置状态码
// const err = ctx => {
//     ctx.response.status = 404;
//     ctx.response.body = 'Page Not Found';
// };
// app.use(err)

// error事件监听
app.on('error', (err, ctx) => {
    console.log('logging error ', err.message);
    console.log(err);
})

// ctx.cookies 读写 Cookie
const cookie = function (ctx) {
    const n = Number(ctx.cookies.get('view') || 0) + 1
    ctx.cookies.set('view', n)
    ctx.response.body = n + ' views'
}
app.use(route.get('/cookie', cookie))

// koa-body  从 POST 请求的数据体里面提取键值对
const koaBody = require('koa-body');
const useKoaBody = async function (ctx) {
    const body = ctx.request.body;
    if (!body.name) ctx.throw(400, '.name required');
    ctx.body = { name: body.name };
};
// app.use(koaBody())
app.use(koaBody({ multipart: true }));//设置接收文件
app.use(route.post('/useKoaBody', useKoaBody))
// curl -X POST --data "name=Jack" 127.0.0.1:3000/useKoaBody

// 处理文件上传
const os = require('os');
const fileUp = async function (ctx) {
    const tmpdir = os.tmpdir();
    const filePaths = [];
    const files = ctx.request.body.files || {};

    for (let key in files) {
        const file = files[key];
        const filePath = path.join(tmpdir, file.name);
        const reader = fs.createReadStream(file.path);
        const writer = fs.createWriteStream(filePath);
        reader.pipe(writer);
        filePaths.push(filePath);
    }

    ctx.body = filePaths;
};
// app.use(koaBody({ multipart: true }));
app.use(route.post('/fileUp', fileUp))



app.listen(4000);//是下面的语法糖
// const http = require('http');
// const https = require('https');
// const Koa = require('koa');
// const app = new Koa();
// http.createServer(app.callback()).listen(3000);
// https.createServer(app.callback()).listen(3001);