// const { fork } = require('child_process')
// const path = require('path')
// let child = fork(path.join(__dirname, 'childs/fork.js'))
// console.log(process.cwd(), process.pid);
// console.log('child pid:', child.pid)
// child.on('message', (data) => {
//     console.log('父进程接收到消息' + data);
// });

// child.send('hello fork');

// child.on('error', (err) => {
//     console.error(err)
// });






// console.log(process.argv);

// // exec同步执行一个shell命令
// let { exec } = require('child_process')
// let path = require('path')

// // 用于使用shell执行命令, 同步方法

// let p1 = exec('node exec.js a b c', { cwd: path.join(__dirname, 'childs') }, function (err, stdout, stderr) {
//     console.log(stdout);
// })
// let p2 = exec('node ./childs/exec.js a b c', function (err, stdout, stderr) {
//     console.log(stdout);
// })

// console.log(p1.pid, p2.pid, 'parent----');













let { execFile } = require('child_process')
// let path = require('path')

// let p1 = execFile('node', ['exec.js', 'a', 'b', 'c'], {
//     cwd: path.join(__dirname, 'childs')
// }, function (err, stdout, stderr) {
//     console.log(stdout)
// });
// console.log(p1.pid);

// 这种等价于exec shell: '/bin/bash'
// execFile('ls -al .', { shell: '/bin/bash' }, function (error, stdout, stderr) {
//     if (error) {
//         throw error;
//     }
//     console.log(stdout);
// });






/* spawn */
const { spawn } = require('child_process')
const path = require('path')
var fs = require('fs');
var out = fs.openSync('./childs/out.log', 'w');
var err = fs.openSync('./childs/err.log', 'w');
let child1 = spawn('node', ['./exec.js', 'a'], {
    // stdio: [process.stdin, process.stdout, process.stderr], // 如果放的是一个流，则意味着父进程和子进程共享一个流
    // stdio: ['pipe', 'pipe', 'pipe'], // 默认值 用来设置标准输入，标准输出，错误输出
    // stdio: ['ipc', 'pipe', 'pipe'], //  ipc 通信 onmessage send
    stdio: ['ignore', out, err], // 备注：如果不置为 ignore，那么 父进程还是不会退出
    cwd: path.join(__dirname, './childs'), // 子进程工作目录
    env: process.env, // 环境变量
    detached: true, // 如果为true，当父进程不存在时也可以独立存在，保证父进程结束，子进程仍然可以运行
});
// 通过child.unref()让父进程退出
child1.unref();

process.on('exit', (data) => {
    console.log('父进程退出', data);
})

// stdin：写入流，stdout、stderr：读取流。
// child1.stdout.on('data', (data) => {
//     console.log(`stdout: ${data}`);
// });
// child1.stderr.on('data', (data) => {
//     console.log(`stderr: ${data}`);
// });
child1.on('close', (data) => {
    console.log(`close: ${data}`);
});
child1.on('error', (data) => {
    console.log(`error: ${data}`);
});
// 先exit退出，后close关闭进程
child1.on('exit', (data) => {
    console.log(`exit: ${data}`);
});
// child1.on('message', (msg) => {
//     console.log('message', msg)
// })

// child1.send('hello chhild_process')


// const ls = spawn('ls', ['-a']);
// ls.stdout.on('data', (data) => {
//     console.log(`stdout: ${data}`);
// });
// ls.stderr.on('data', (data) => {
//     console.log(`stderr: ${data}`);
// });
// ls.on('close', (code) => {
//     console.log(`child process exited with code ${code}`);
// });