const http = require("http");

const agent = new http.Agent({
    keepAlive: true,
    maxSockets: 3
});

var req1 = http.request({
    agent: agent,
    method: "GET",
    path: '/test1',
    hostname: "localhost",
    port: 5001
}, function (res1) {
    console.log("REQUEST_1");
    outputSocketStatus();

    res1.on('data', function () {
        console.log("REQUEST_1 data");
    });

    res1.on('end', function () {
        console.log("REQUEST_1 end");
    });

    var req2 = http.request({
        agent: agent,
        method: "GET",
        path: '/test2',
        hostname: "localhost",
        port: 5001
    }, function (res2) {
        console.log("REQUEST_2");
        outputSocketStatus();

        res2.on('data', function () {
            console.log("REQUEST_2 data");
        });

        res2.on('end', function () {
            console.log("REQUEST_2 end");
        });
    });
    req2.end();
});
req1.end();


var req3 = http.request({
    agent: agent,
    method: "GET",
    path: '/test3',
    hostname: "localhost",
    port: 5001
}, function (res3) {
    console.log("REQUEST_3");
    outputSocketStatus();

    res3.on('data', function () {
        console.log("REQUEST_3 data");
    });

    res3.on('end', function () {
        console.log("REQUEST_3 end");
    });
});
req3.end();


outputSocketStatus();

function outputSocketStatus() {
    console.log('等待中的请求个数：', Object.keys(agent.requests).length);
    console.log('进行中的请求个数：', Object.keys(agent.sockets).length);
    console.log('空闲中的请求个数：', Object.keys(agent.freeSockets).length);
}