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
        // console.log(ctx.request.header); 请求标头对象。
        console.log(ctx.request.method); //请求方法。GET POST
        console.log('获取请求 URL ',ctx.request.url); 
        console.log('获取请求原始URL',ctx.request.originalUrl); 
        console.log('获取URL的来源，包括 protocol 和 host ',ctx.request.origin); 
        console.log('获取完整的请求URL，包括 protocol，host 和 url ',ctx.request.href); 
        console.log('获取请求路径名。 ',ctx.request.path); 
        console.log('根据 ? 获取原始查询字符串。 ',ctx.request.querystring); 
        console.log('使用 ? 获取原始查询字符串(带问号) ',ctx.request.search); 
        console.log('hostname:port => ',ctx.request.host); 
        console.log('存在时获取主机名 => ',ctx.request.hostname); 
        // console.log('获取 WHATWG 解析的 URL 对象=> ',ctx.request.URL); 
        console.log('获取请求 Content-Type => ',ctx.request.type); 
        console.log('在存在时获取请求字符集 => ',ctx.request.charset); 
        console.log('获取解析的查询字符串 => ',ctx.request.query); 
        console.log('检查请求缓存是否“新鲜”，也就是内容没有改变 => ',ctx.request.fresh); 
        console.log('相反与 request.fresh => ',ctx.request.stale); 
        console.log('返回请求协议，“https” 或 “http” => ',ctx.request.protocol); 
        console.log('通过 ctx.protocol == "https" 来检查请求是否通过 TLS 发出 => ',ctx.request.secure); 
        console.log('请求远程地址 => ',ctx.request.ip); 
        console.log('请求远程地址 => ',ctx.request.ips); 
        console.log('将子域返回为数组。 => ',ctx.request.subdomains); 
        console.log('检查传入请求是否包含 Content-Type 头字段 => ',ctx.is('html')); 
        console.log('检查给定的 type(s) 是否可以接受 => ',ctx.request.accepts('text/html')); 
        console.log('检查 encodings 是否可以接受，返回最佳匹配为 true，否则为 false => ',ctx.request.acceptsEncodings(['gzip', 'deflate', 'identity'])); 
        console.log('检查 charsets 是否可以接受 在 true 时返回最佳匹配 => ',ctx.request.acceptsCharsets(['utf-8', 'utf-7'])); 
        console.log('检查 langs 是否可以接受，如果为 true，返回最佳匹配 => ',ctx.request.acceptsLanguages(['en', 'es'])); 
        console.log('检查请求是否是幂等的 => ',ctx.request.idempotent); 
        console.log('返回请求套接字 => ',ctx.request.socket); 
        // console.log('返回请求标头 => ',ctx.request.get); 



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


// app.context 通过编辑 app.context 为 ctx 添加其他属性
app.context.db =function(){
    console.log(1);
}
const useContext  = ctx =>{
    console.log(ctx.db());// 1
    ctx.state.user = 'zzy';//推荐的命名空间，用于通过中间件传递信息和你的前端视图。
    ctx.assert(ctx.state.user, 401, 'User not found. Please login!');//断言
    ctx.assert.equal('object', typeof ctx, 500, '某些开发错误')

    // ctx.response.header 响应标头对象。
    // ctx.response.socket 响应套接字。
    // ctx.response.status = 200  //获取响应状态 有约定表
    // ctx.response.message = 'ok'  //将响应的状态消息设置为给定值
    // ctx.response.length = 4  //将响应的 Content-Length 设置为给定值。
    // response.get(field) 不区分大小写获取响应标头字段值 field。
    ctx.set('Access-Control-Allow-Origin', '*')// 设置响应标头 field 到 value:
    ctx.append('Access-Control-Allow-Methods', 'PUT, POST, GET, DELETE, OPTIONS'); //用值 val 附加额外的标头 field。
    ctx.remove('Access-Control-Allow-Methods') //删除标头 field。
    ctx.type = 'text/plain; charset=utf-8' //设置响应 Content-Type 通过 mime 字符串或文件扩展名。
    // ctx.redirect('/') // 重定向
    // response.attachment([filename], [options]) 将 Content-Disposition 设置为 “附件” 以指示客户端提示下载。(可选)指定下载的 filename 和部分 参数。
    // response.headerSent 检查是否已经发送了一个响应头。 用于查看客户端是否可能会收到错误通知。
    // ctx.response.lastModified = new Date() 将 Last-Modified 标头返回为 Date, 如果存在。
    // ctx.response.etag = crypto.createHash('md5').update(ctx.body).digest('hex'); 设置包含 " 包裹的 ETag 响应， 请注意，没有相应的 response.etag getter。
    // response.vary(field) 在 field 上变化。
    // response.flushHeaders() 刷新任何设置的标头，并开始主体。



    ctx.response.body = ctx.response
}
app.use(route.get('/useContext', useContext))


app.listen(4000);//是下面的语法糖
// const http = require('http');
// const https = require('https');
// const Koa = require('koa');
// const app = new Koa();
// http.createServer(app.callback()).listen(3000);
// https.createServer(app.callback()).listen(3001);