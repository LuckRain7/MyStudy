const socket = require("socket.io");
const http = require('http');

// 创建服务
const server = http.createServer((req, res) => {
    // 允许所有跨域请求
    res.setHeader('Access-Control-Allow-Origin', '*');
    req.writeHead(200, { 'Content-Type': 'text/html' })
    res.end('')
}).listen(3000)

let pad = null, pc = null, padReady = false, pcReady = false;

// 连接socket.io
socket.listen(server).on('connection', (conn) => {
    conn.on('message', (str) => {
        if (str === "Pad") {
            pad = conn;
            padReady = true;
            conn.send('连接成功');
            console.log('Pad');
        }
        if (str === "PC") {
            pc = conn;
            pcReady = true;
            console.log('Pc');
        }
        if (padReady && pcReady) {
            if (str === 'PC') str = '我是PC界面'
            pc.send(str);
        }
    })

    conn.on("disconnection", (code, reason) => {
        console.log("关闭连接")
    });
})


// 猪e金钱 牛a事业 马d家庭 老虎b自信 绵阳c爱情