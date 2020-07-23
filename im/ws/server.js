const http = require('http');
const fs = require('fs');
const WebSocket = require('ws');

// https://juejin.im/post/5ce8976151882533441ecc20

const server = http.createServer((req, res) => {
    switch (req.url) {
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

const wss = new WebSocket.Server({ port: 3000 });

wss.on('connection', function connection(ws) {
    ws.on('message', function incoming(message) {
        console.log('received: %s', message);
        ws.send(message);
    });

    setInterval(() => {
        ws.send(new Date().toString());
    }, 3000)
});