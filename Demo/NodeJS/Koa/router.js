// 原生路由
const router = ctx => {
    if(ctx.request.path !== '/'){
        ctx.response.type = 'html'
        ctx.response.body = '<a href="/">Index Page</a>'
    }else{
        ctx.response.body = 'hello world'
    }
};

module.exports = router
