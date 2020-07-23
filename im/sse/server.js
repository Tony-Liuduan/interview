/**
 * @fileoverview 
 * @author liuduan
 * @Date 2020-07-23 15:31:25
 * @LastEditTime 2020-07-23 16:39:35
 */
const http = require('http');
const fs = require('fs');

let now = Date.now();

const server = http.createServer((req, res) => {
    switch (req.url) {
        case '/stream':
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
            let count = 0;

            interval = setInterval(function () {
                count++;
                res.write("data: " + (new Date()) + "\n\n");
                // 写res.end就error了
                if (count >= 3) {
                    clearInterval(interval);
                    res.end();
                }
            }, 1000);

            req.connection.addListener("close", function () {
                clearInterval(interval);
            }, false);
            break;

        case '/client.js':
            fs.readFile("./client.js", "binary", function (err, file) {
                if (!err) {
                    res.writeHead(200, { 'Content-Type': 'application/javascript' });
                    res.write(file, "binary");
                    res.end();
                }
            });
            break;

        default:
            fs.readFile("./index.html", "binary", function (err, file) {
                if (!err) {
                    res.writeHead(200, { 'Content-Type': 'text/html' });
                    res.write(file, "binary");
                    res.end();
                }
            });
            break;
    }
});

server.listen(8090);

let count = 0;

function sendRandomData(dfs, res) {
    var randomNum = Math.floor(100 * Math.random());

    console.log(randomNum, new Date() - now);
    now = new Date();

    if (count++ >= 3) {
        res.end(randomNum.toString());
        return;
    }

    res.write(randomNum.toString() + '-');

    dfs();
}