
// ES8 内容
async function getStockPriceByName(name) {
    const symbol = await getStockSymbol(name);
    const stockPrice = await getStockPrice(symbol);
    return stockPrice;
}

getStockPriceByName('goog').then(function (result) {
    console.log(result);
});

// async函数的语法规则总体上比较简单，难点是错误处理机制。



// getFoo和getBar都是同时触发，这样就会缩短程序的执行时间。
let [foo, bar] = await Promise.all([getFoo(), getBar()]);

