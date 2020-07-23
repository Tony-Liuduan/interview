/**
 * @fileoverview 
 * @author liuduan
 * @Date 2020-07-23 15:31:25
 * @LastEditTime 2020-07-23 16:28:50
 */
const http = require('http');
const fs = require('fs');

let now = Date.now();

const server = http.createServer((req, res) => {
    switch (req.url) {
        case '/stream':
            res.setHeader('content-type', 'application/octet-stream');
            now = Date.now();
            function check() {
                setTimeout(function () {
                    sendRandomData(check, res);
                }, 500);
            }

            check();
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