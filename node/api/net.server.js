/**
 * @description net
 *
 * 1. net 模块 是基于tcp的封装
 * 2. http 模块 本质也是tcp层
 *
 * client与server通信基于net.socket
 *
 * server -> pipe -> clinet
 *
 * net.server类
 * net.socket类 全双工流stream
 *
 * ------------------------------------
 * @module server
 * net.createServer().listen(port, ip)
 *
 * 事件：
 *     - error
 *     - listening
 *     - connection
 *     - close
 *
 * 方法：
 *     - listen
 *     - close   // 关闭连接
 *     - address // 在listening 事件触发后调用
 *
 *
 *
 * ------------------------------------
 * @module client
 * net.connect(port, ip);
 * 
 * 事件：
 *     - error
 *     - connect
 *     - data
 *     - end
 *     - timeout // 监听超时
 *
 * 方法：
 *     - connect
 *     - write
 *     - end    // 关闭连接
 *     - setTimeout // 设置超时时长
 * 
 * 属性
 *     - localAddress
 *     - localPort
 *     - remoteAddress
 *     - remotePort
 *     
 */

const net = require('net');

// 创建tcp服务
const server = net.createServer();

server.listen('8000');

server.on('listening', () => {
    console.log('监听8000端口success', server.address());
});

// 一个新的连接建立就会触发这个事件
server.on('connection', socket => {
    console.log('有新的连接');
    socket.on('data', data => {
        console.log('server端收到client端的data', data.toString());

        // 返回给客户端的数据内容
        socket.write('你好，我是服务端server');
        socket.write('客户端请关闭连接');
    });
    server.close();
});

server.on('close', () => {
    console.log('server is close');
});
