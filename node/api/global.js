const fs = require('fs');

console.log(__filename);
console.log(__dirname);
console.log(setTimeout);
console.log(clearTimeout);
console.log(setInterval);
console.log(clearInterval);
console.log(console.info);
console.log(console.error);
console.log(console.warn);
console.log(console.dir);
console.log("________", process.exit);


// 当未捕获的 JavaScript 异常一直冒泡回到事件循环时，会触发 'uncaughtException' 事件
process.on('uncaughtException', (err, origin) => {
    fs.writeSync(
        process.stderr.fd,
        `捕获的异常: ${err}\n` +
        `异常的来源: ${origin}\n`
    );
});

process.on('unhandledRejection', (reason, promise) => {
    console.log('promise 未处理的拒绝：', promise, '原因：', reason);
    // 记录日志、抛出错误、或其他逻辑。
});

// 每当 Promise 被拒绝并且错误处理函数附加到它（例如，使用 promise.catch()）晚于一个 Node.js 事件循环时，就会触发 'rejectionHandled' 事件。
process.on('rejectionHandled', (promise) => {
    console.log('______________rejectionHandled', promise);
});

process.on('beforeExit', (code) => {
    console.log('进程 beforeExit 事件的代码: ', code);
});

process.on('exit', (code) => {
    console.log('进程 exit 事件的代码: ', code);
});

console.log('此消息最新显示');


let reject1 = Promise.reject(new Error('服务端异常1'));

setTimeout(() => {
    reject1.catch((err) => {
        console.log('正在处理1。。。原因：' + err.message)
    })
}, 1000);


throw new Error('123');