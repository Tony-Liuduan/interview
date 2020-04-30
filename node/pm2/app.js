const http = require('http');
http
    .createServer((req, res) => {
        res.end('hello word');
    })
    .listen(9000)