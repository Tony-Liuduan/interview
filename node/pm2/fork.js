const http = require('http');
const fork = require('child_process').fork;


const server = http.createServer((req, res) => {
    if (req.url === '/test') {
        const worker = fork('./worker.js')
        worker.send('开启一个新的子进程');

        // 当一个子进程使用 process.send() 发送消息时会触发 'message' 事件
        worker.on('message', sum => {
            res.end(`Sum is ${sum}`);
            worker.kill();
        });

        // 子进程监听到一些错误消息退出
        worker.on('close', (code, signal) => {
            console.log(`收到close事件，子进程收到信号 ${signal} 而终止，退出码 ${code}`);
            worker.kill();
        });
    } else {
        res.end('hello word')
    }
});

server.listen(8001, () => {
    console.log(process.pid);
})