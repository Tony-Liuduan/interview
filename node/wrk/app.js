/**
 * @fileoverview test bigpipe
 * @author liuduan
 * @Date 2020-05-22 14:28:27
 * @LastEditTime 2020-05-22 15:10:23
*/
const http = require('http');
const { Readable } = require('stream');


let s = '';
for (let i = 0; i < 1024 * 10; i++) {
    s += 'a';
}
const str = s;
const bufStr = Buffer.from(s);


http.createServer((req, res) => {
    res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
    // if (req.url === '/bp') {
    //     // const rs = new Readable();
    //     // rs.push(str);
    //     // // 不写 push null 报错
    //     // rs.push(null);
    //     // rs.pipe(res);
    //     res.end(buf);
    // } else {
    //     res.end(str);
    // }

    if (req.url == '/buffer') {
        res.end(bufStr);
    } else if (req.url == '/string') {
        res.end(str);
    }

}).listen(9000);