/**
 * @fileoverview 
 * @author liuduan
 * @Date 2020-06-18 20:52:05
 * @LastEditTime 2020-06-18 21:03:59
 */
const cluster = require('cluster');
const path = require('path');
const { StringDecoder } = require('string_decoder');
const net = require('net');


let serverForIPC;//作为子进程的server
if (cluster.isMaster) {
    setupMaster();
    console.log('master', process.pid);
    cluster.fork();
    cluster.fork();
} else {
    require('./childs/fork.js');
}



//主进程逻辑
function setupMaster() {
    //作为Server监听子进程消息
    let decoder = new StringDecoder('utf8');
    //windows系统中要求的IPC通讯命名规则
    let ipcPath = path.join('\\\\?\\pipe', process.cwd(), 'dashipc');
    console.log(ipcPath, decoder);
    serverForIPC = net.createServer(socket => {
        console.log(`[master]:子进程通过ipcServer连接到主进程`);
        socket.on('data', data => {
            console.log('[master]:收到来自子进程的消息:', decoder.write(data));
        });
    });
    //IPC-server端监听指定地址
    serverForIPC.listen(ipcPath);
}