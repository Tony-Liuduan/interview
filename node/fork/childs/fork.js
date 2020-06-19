process.on('message', (m, setHandle) => {
    console.log('子进程接收到消息' + m)
    console.log(process.pid, '------');
    process.send(m);
});

console.log('for child', process.pid);