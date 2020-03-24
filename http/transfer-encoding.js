// 来源：https://blog.csdn.net/weixin_33775582/article/details/86210545?depth_1-utm_source=distribute.pc_relevant.none-task&utm_source=distribute.pc_relevant.none-task

// HTTP/1.1 则规定所有连接都必须是持久的Connection:keep-alive，除非显式地在头部加上 Connection: close
// require('net').createServer(function (sock) { // create TCP Server
//     sock.on('data', function (data) {
//         sock.write('HTTP/1.1 200 OK\r\n');
//         sock.write('Content-Length: 12\r\n');
//         sock.write('\r\n');
//         sock.write('hello world!');
//         // sock.destroy();
//     });
// }).listen(9090, '127.0.0.1');


/* 
1. Content-Length 解决了什么问题？
可用来标记持久链接时，当前的请求结束
但是Content-Length 必须是准确的值，不然会出现Content-Length 比实际长度短，会造成内容被截断;如果比实体内容长，会造成 pending


2. Content-Length 获取耗时如何？
对于外部文件需要开辟一个大的buffer，等内容生成好后再计算，但这样做一方面需要更大的内存开销，另一方面也会让客户端等更久。


3. 既然获取Content-Length这么难，能不能换一种方式解决Connection:keep-alive带来的请求pandding 问题？

有请 Transfer-Encoding: chunked 登场
Transfer-Encoding 正是用来解决上面这个问题的
Transfer-Encoding 在最新的 HTTP 规范里，只定义了一种编码传输：分块编码(chunked)
在头部加入 Transfer-Encoding: chunked 之后，就代表这个报文采用了分块编码


4. Content-Encoding 和 Transfer-Encoding 二者经常会结合来用？
其实就是针对 Transfer-Encoding 的分块再进行 Content-Encoding
Content-Encoding(内容编码)。Content-Encoding 通常用于对实体内容进行压缩编码，目的是优化传输，例如用 gzip 压缩文本文件，能大幅减小体积。内容编码通常是选择性的，例如 jpg / png 这类文件一般不开启，因为图片格式已经是高度压缩过的，再压一遍没什么效果不说还浪费 CPU
Transfer-Encoding 则是用来改变报文格式，它不但不会减少实体内容传输大小，甚至还会使传输变大

*/


require('net').createServer(function (sock) {
    sock.on('data', function (data) {
        sock.write('HTTP/1.1 200 OK\r\n');
        sock.write('cache-control: max-age=432000\r\r');
        sock.write('Transfer-Encoding: chunked\r\n');
        sock.write('\r\n'); 
        sock.write('b\r\n');　// b 这里是16进制，表示十进制的 11，每个分块包含十六进制的长度值和数据，长度值独占一行，长度不包括 它结尾的 CRLF(\r\n)
        sock.write('01234567890\r\n');
        sock.write('5\r\n');
        sock.write('abcde\r\n');
        sock.write('0\r\n'); // 最后一个分块长度值必须为 0，对应的分块数据没有内容，表示实体结束
        sock.write('\r\n');
    });
}).listen(9090, '127.0.0.1');