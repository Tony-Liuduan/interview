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
                "Content-Type": "appliction/json",
                "Cache-Control": "no-cache",
            });
            setTimeout(() => {
                res.write(JSON.stringify({
                    code: 0,
                    msg: 'sucess',
                }))

                res.end();

            }, 1000);
            break;

        default:
            break;
    }

});


server.listen(8002);