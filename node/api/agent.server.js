// const http = require('http');

// const server = http.createServer(function (req, res) {
//     console.log(req.url);
//     res.end('OK');
// })

// let i = 0;
// server.on('connection', function (socket) {
//     i++;
//     console.log("NEW CONNECTION: " + i);
// })

// server.listen(5001);



const http = require('http');

// server
const keepaliveAgent = new http.Agent({
    keepAlive: true,
    maxSockets: Number.MAX_SAFE_INTEGER,
    maxFreeSockets: 256,
    keepAliveMsecs: 4096,
});
const server = http.createServer((req, res) => {
    res.end('Hello World, ' + req.connection.remotePort);
});
server.on('clientError', (err, socket) => {
    socket.end('HTTP/1.1 400 Bad Request\r\n\r\n');
});
server.listen(5002);


let i = 0;
server.on('connection', function (socket) {
    i++;
    console.log("\r\n\n-------------------------NEW CONNECTION: " + i, socket.server.keepAliveTimeout);
})


let reqCount = 0;

// client
function request() {
    http.get({
        agent: keepaliveAgent,
        dataType: 'text',
        method: "GET",
        hostname: "localhost",
        port: 5002
    }, (res) => {
        let str = ''
        res.on('data', function (data) {
            str += data;
        });

        res.on('end', function () {
            console.log(str, 'reqCount', ++reqCount);
        });
    }).end();

    outputSocketStatus();
}

setInterval(request, 5000);
request();

function outputSocketStatus() {
    console.log('等待中的请求个数：', Object.keys(keepaliveAgent.requests).length);
    console.log('进行中的请求个数：', Object.keys(keepaliveAgent.sockets).length);
    console.log('空闲中的请求个数：', Object.keys(keepaliveAgent.freeSockets).length);
}


process.on('uncaughtException', function(err) {
    i = 0;
    console.log(err.stack);
    console.log('NOT exit...');
});



// key 由host、port、本地地址、地址簇类型、unix路径计算而来
// net.createConnection 创建新的 socket
// this.createConnection({ ...options, key }, (_err, s) => {
//     // 插入正在使用的socket队列
//     this.sockets[name].push(s);

//     // 监听socket的一些事件，用于回收socket
//     installListeners(this, s, options);
// });

// function installListeners(agent, s, options) {
//     /**
//      * socket触发空闲事件的处理函数，告诉agent该socket空闲了，agent会回收该socket到空闲队列
//      */
//     s.on('free', () => {
//         agent.emit('free', s, options);
//     });

//     /**
//      * socket关闭则agent会从socket队列中删除它
//      */
//     s.on('close', () => {
//         agent.removeSocket(s, options);
//     });

//     /**
//      * agent被移除
//      */
//     s.on('agentRemove', () => {
//         for (const set of [this.freeSockets, this.sockets]) {
//             for (const key of Object.keys(set)) {
//                 for (const setName of set[key]) {
//                     setName.destroy();
//                 }
//             }
//         }
//         s.removeListener('free');
//         s.removeListener('close');
//         s.removeListener('agentRemove');
//     });
// }

const agentConfig = {
    // 即使没有未完成的请求，也要保留套接字，这样它们就可以用于未来的请求，而无需重新建立 TCP 连接，默认值: false
    keepAlive: true,
    // https://cnodejs.org/topic/5a97f5d0543e098150cb713c
    // 自从 Node.js 8.0 开始，http server 增加了一个默认配置 keepAliveTimeout = 5000 ，它会自动销毁超过 5 秒的空闲连接。
    // 空闲 socket 的存活时间，默认值 1000
    // 当 keepAlive 选项为 false 或 undefined 时则忽略
    keepAliveMsecs: 5000,
    // 允许创建的最大 socket 数
    maxSockets: Infinity,
    // 在空闲状态下打开的最大 socket 数，默认值 256
    maxFreeSockets: 256,
};

// const commonAgent = {
//     keepAlive: true,
//     keepAliveMsecs: 4096,
//     // 允许创建的最大 socket 数
//     maxSockets: Number.MAX_SAFE_INTEGER,
//     // 最大空闲 socket 数
//     maxFreeSockets: 256
// };

/*
http://nodejs.cn/api/http.html#httprequestoptions-callback
http.globalAgent，当不给 agent 参数时使用 http.globalAgent 默认配置：
 {
    defaultPort: 80,
    protocol: 'http:',
    keepAliveMsecs: 1000,
    keepAlive: false,
    maxSockets: Infinity,
    maxFreeSockets: 256,
    scheduling: 'lifo',
    maxTotalSockets: Infinity,
    totalSocketCount: 0,
}
*/