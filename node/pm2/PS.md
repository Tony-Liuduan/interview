
# pm2开启多进程引发的node多进程模型思考
> 抄作业来自：https://juejin.im/post/5d43017be51d4561f40adcf9#heading-25
> ps:初学者，有错误请大佬给予指正

## 进程 & 线程 & 协成

### 进程：
1. nodejs全局变量-process，Node.js 里通过 node app.js 开启一个服务进程
2. 进程是负责管理线程的
3. 进程通过操作系统调度分配cpu核心内存资源
4. 每个进程都拥有自己的独立空间地址、数据栈
5. 进程之间不共享内存，一个进程无法访问另外一个进程里定义的变量、数据结构，只有建立了 IPC 通信，进程之间才可数据共享

### 线程：
1. 线程是隶属于进程的，被包含于进程之中
2. 一个线程只能隶属于一个进程，但是一个进程是可以拥有多个线程的
3. 线程之间共享当前进程的内存cpu资源，可以交互

### 协程：**是个什么鬼，还不知道？？？经常听说**


### 多进程单线程 vs 单进程多线程

#### 多进程单线程
1. 进程管理：（代码 | 数据 | 文件句柄） & （寄存器 | 栈）
2. 单线程管理：~
3. 进程之前维护相同的（代码 | 数据 | 文件句柄）
4. 进程间沟通不便

#### 单进程多线程
1. 进程管理：（代码 | 数据 | 文件句柄） 
2. 各线程管理：（寄存器 | 栈）
3. 线程之间共享代码数据文件句柄，方便交互

---


## node开启多进程方式
1. child_process 模块
2. cluster 模块

### 两者共同点
1. 无论是 child_process 模块还是 cluster 模块，都是为了解决 Nodejs 实例单线程运行无法利用多核 CPU 的问题而出现的
2. 都是使用fork方法出独立的子进程
3. 通信：通过send发送消息，message接收消息


### child_process
1. child_process.spawn()：
    - **细节待补充，没有实际应用过**
    - 适用于返回大量数据，例如图像处理，二进制数据处理。
    - 看到earth-script项目有用 cross-spawn 第三库
    
    ```js
    const spawn = require('child_process').spawn;
 
    spawn('npm', {
        stdio: 'inherit'
    });
    ```
2. child_process.exec()：
    - 适用于小量数据，maxBuffer 默认值为 200 * 1024 超出这个默认值将会导致程序崩溃，数据量过大可采用 spawn。
    - 看项目中多用于shell命令
    - node-moniter项目有使用
3. child_process.execFile()：
    - **细节待补充，没有实际应用过**
    - 类似 child_process.exec()，区别是不能通过 shell 来执行，不支持像 I/O 重定向和文件查找这样的行为
4. child_process.fork()：
    - 衍生新的进程，进程之间是相互独立的，每个进程都有自己的 V8 实例、内存，系统资源是有限的，不建议衍生太多的子进程出来，通长根据系统** CPU 核心数**设置。

    ```js
    /* 抄袭自node-moniter项目 */
    const cp = require('child_process');
    async function asyncExec(command){
        return new Promise((reslove,reject) => {
            cp.exec(command,function(error,stdout,  stderr){
                if(error){
                    reject(error);
                    return;
                }
                reslove(stdout);
            });
        });
    }

    module.exports = asyncExec;

    // 调用
    await asyncExec('cd ' + base_path + '&& ' + tarCmd + ' ./')
    await asyncExec(`tail -n ${lines} ${absolutePath}`);
    ```

### cluster
1. cluster核心思想
    * cluster模块采用的是经典的主从模型，
    * cluster会创建一个master进程，然后master进程根据你指定的数量（一般是服务器cpu核心数）复制出多个子进程，
    * 由master进程来管理所有的子进程，
    * 主进程不负责具体的任务处理，主要工作是负责调度和管理。


2. cluster优点：
    * 负载均衡: 
        - cluster模块使用内置的来更好地处理线程之间的压力，该负载均衡使用了Round-robin算法（也被称之为循环算法）
        - cluster使用Round-robin调度策略时，master接收所有传入的连接请求，然后将相应的TCP请求处理发送给选中的工作进程（该方式仍然通过IPC来进行通信）。
    * 一个TCP服务器
        - clu ster只会在master进程内部启动一个TCP服务器，而真正监听端口的只有这个服务器，
        - 当来自前端的请求触发服务器的connection事件后，master会将对应的socket句柄发送给子进程
        - 在Unix / Linux系统下，一个**socket句柄**，可以看做是一个文件，在socket上收道发数据内，相当于对一个文件进行读写，所以一个socket句柄，通常也用表容示文件句柄的fd来表示（**😭？？什么鬼，希望找到说人话的翻译**）

3. cluster缺点：
    * cluster 只能管理一组**相同**子进程, 不能像child_process可以fork出多组进程


## IPC(nter-Process Communication) 进程间通信 
> **看不懂，libuv太底层，暂且假装会了**

Node中实现IPC通道是依赖于libuv
windows下由命名管道(name pipe)实现，linux系统则采用Unix Domain Socket实现
表现在应用层上的进程间通信只有简单的message事件和send()方法，接口十分简洁和消息化。

## 查看node进程pid
```sh
# USER   PID  %CPU %MEM      VSZ    RSS   TT  STAT STARTED      TIME COMMAND
ps aux | grep node

# UID   PID  PPID   C STIME   TTY           TIME CMD
# 能查看父进程id
ps -ef | grep node

# 查找僵死进程
ps -A -o stat,ppid,pid | grep -e '^[Zz]'
#命令注解：
#-A 参数列出所有进程
#-o 自定义输出字段 我们设定显示字段为 stat（状态）, ppid（进程父id）, pid(进程id)，cmd（命令）这四个参数


# 一键杀死僵死进程
# https://www.cnblogs.com/reality-soul/p/6343339.html
ps -A -o stat,ppid,pid,cmd | grep -e '^[Zz]' | awk '{print $2}' | xargs kill -9
```

## 杀进程
```sh
# 一般杀进程
kill pid
# 危险杀进程：-9 表示强迫进程立即停止
kill -9 pid
# 杀死同一进程组内的所有进程。其允许指定要终止的进程的名称，而非PID。
killall nginx
```

### kill -9 的可怕之处，慎用
> 防止僵尸进程被init回收，无法释放，长久占用资源，只能通过重启服务器来解决
这个强大和危险的命令迫使进程在运行时突然终止，进程在结束后不能自我清理。
危害是导致系统资源无法正常释放，一般不推荐使用，除非其他办法都无效。
当使用此命令时，一定要通过`ps -A -o stat,ppid,pid | grep -e '^[Zz]'`确认没有剩下任何僵尸进程`zombie`。
只能通过终止父进程ppid命令`ps -A -o stat,ppid,pid,cmd | grep -e '^[Zz]' | awk '{print $2}' | xargs kill -9`来消除僵尸进程。如果僵尸进程被`init`收养，问题就比较严重了。
杀死`init`进程意味着关闭系统。
如果系统中有僵尸进程，并且其父进程`ppid`是`init`，
而且僵尸进程占用了大量的系统资源，那么就需要在某个时候**重启机器**以清除进程表了。


---

## 小demo

### fork
```js
/* index.js */
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



/* worker.js */
const computation = () => {
    let sum = 0;
    console.info('计算开始');
    console.time('计算耗时');

    for (let i = 0; i < 1e10; i++) {
        sum += i
    };

    console.info('计算结束');
    console.timeEnd('计算耗时');
    return sum;
};

process.on('message', msg => {
    console.log(msg, 'process.pid', process.pid); // 子进程id
    const sum = computation();

    // 如果Node.js进程是通过进程间通信产生的，那么，process.send()方法可以用来给父进程发送消息
    process.send(sum);
})


// fork 模式启动子进程不能共享端口，Error: listen EADDRINUSE: address already in use :::8001
// const http = require('http');
// http
//     .createServer((req, res) => {
//         res.end('hello word');
//     })
//     .listen(8001)
```


### <font color='red'>cluster (pm2核心)</font>
```js
/* cluster.js */
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


/* app.js */
const http = require('http');
http
    .createServer((req, res) => {
        res.end('hello word');
    })
    .listen(9000)
```



---

# libuv

## libuv的线程池实现多线程
见下期分晓，目前看不懂...

## node-eventloop
持续更新中...