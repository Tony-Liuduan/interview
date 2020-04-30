const cpus = require('os').cpus().length;
const cluster = require('cluster');

// 1. cluster模块采用的是经典的主从模型，
// 2. cluster会创建一个master，然后根据你指定的数量复制出多个子进程，
// 3. 由master进程来管理所有的子进程，
// 4. 主进程不负责具体的任务处理，主要工作是负责调度和管理。
if (cluster.isMaster) { // 主进程, 可以使用cluster.isMaster属性判断当前进程是master还是worker(工作进程)。
    for (let i = 0; i < cpus; i++) {
        // fork 出服务器核心数量子进程， 
        // cluster模块调用fork方法来创建子进程，该方法与child_process中的fork是同一个方法。
        cluster.fork();
    }
    cluster.on('exit', function (worker, code, signal) {
        console.log('worker process died,id', worker.process.pid)
    })
} else {
    // Worker可以共享同一个TCP连接, 主进程创建TCP连接，当有请求进来，会把请求的socket句柄发送给子进程，实现负载均衡
    require('./app.js');
}

// cluster优点：
// 1. 负载均衡: cluster模块使用内置的来更好地处理线程之间的压力，该负载均衡使用了Round-robin算法（也被称之为循环算法）
//      - cluster使用Round-robin调度策略时，master接收所有传入的连接请求，然后将相应的TCP请求处理发送给选中的工作进程（该方式仍然通过IPC来进行通信）。
// 2. 一个TCP服务器: cluster只会在master进程内部启动一个TCP服务器，而真正监听端口的只有这个服务器，当来自前端的请求触发服务器的connection事件后，master会将对应的socket句柄发送给子进程（在Unix / Linux系统下，一个socket句柄，可以看做是一个文件，在socket上收道发数据内，相当于对一个文件进行读写，所以一个socket句柄，通常也用表容示文件句柄的fd来表示）。

// cluster缺点：
// 1. cluster 只能管理一组**相同**子进程, 不能像child_process可以fork出多组进程

// 共同目标：无论是 child_process 模块还是 cluster 模块，都是为了解决 Nodejs 实例单线程运行无法利用多核 CPU 的问题而出现的。