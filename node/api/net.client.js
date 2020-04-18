const net = require('net');


// 连接到服务端
const netSocket = net.connect('8000');


netSocket.on('error', err => {
    console.log('连接失败', err);
});


netSocket.on('connect', () => {
    console.log(netSocket.localAddress, netSocket.localPort, netSocket.remoteAddress, netSocket.remotePort);
    netSocket.write('你好，我是client');

    netSocket.on('data', data => {
        console.log('client get data from server: ', data.toString());
        netSocket.end();
    });
});

netSocket.on('end', () => {
    console.log('client close connect');
});
