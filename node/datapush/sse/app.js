const http = require('http');
const fs = require('fs');



const server = http.createServer((req, res) => {
    const path = req.url;

    switch (path) {
        case '/':
            const data = fs.readFileSync('./index.html');
            res.write(data);
            res.end();
            break;

        case '/index.js':
            res.writeHead(200, { 'Content-Type': 'application/javascript; charset=utf-8' });
            const jsdata = fs.readFileSync('./index.js');
            res.write(jsdata);
            res.end();
            break;
    
        case '/api':
            res.writeHead(200, {
                "Content-Type": "text/event-stream",
                "Cache-Control": "no-cache",
            });
            // 最大间隔时间
            // 浏览器默认的是，如果服务器端三秒内没有发送任何信息，则开始重连。服务器端可以用retry头信息，指定通信的最大间隔时间
            res.write("retry: 10000\n");
            // 数据的名字
            // res.write("event: connecttime\n");

            res.write("data: " + (new Date()) + "\n\n");

            interval = setInterval(function () {
                res.write("data: " + (new Date()) + "\n\n");

                // 写res.end就error了
                // res.end();
            }, 1000);

            req.connection.addListener("close", function () {
                clearInterval(interval);
            }, false);
            break;

        default:
            break;
    }

});


server.listen(8001);