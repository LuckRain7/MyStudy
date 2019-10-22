// 打印即顺序

// logger
app.use(async (ctx, next) => {
    console.log(1);
    await next();
    const rt = ctx.response.get('X-Response-Time');
    console.log(`${ctx.method} ${ctx.url} - ${rt}`);
    console.log(6);
});

// x-response-time
app.use(async (ctx, next) => {
    console.log(2);
    const start = Date.now();
    await next();
    const ms = Date.now() - start;
    ctx.set('X-Response-Time', `${ms}ms`);
    console.log(5);
});

// response
app.use(async ctx => {
    console.log(3);
    main(ctx)
    console.log(4);
});



const one = (ctx, next) => {
    console.log('>> one');
    next();
    console.log('<< one');
}

const two = (ctx, next) => {
    console.log('>> two');
    next();
    console.log('<< two');
}

const three = (ctx, next) => {
    console.log('>> three');
    next();
    console.log('<< three');
}

app.use(one);
app.use(two);
app.use(three);