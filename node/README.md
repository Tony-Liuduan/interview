# nodejs

## what is nodejs
1. nodejs本质是js的解析器
2. nodejs是js的运行环境
3. nodejs是一个服务器程序
4. nodejs本身使用的是v8引擎
5. nodejs不是web服务器
6. nodejs是为了提供高性能的web服务，IO 性能强大 而诞生的


## 优点 && 适用场景
> 使用于密集型IO, 不适用于密集型cpu计算（多线程如java适合密集cpu计算，node是单线程不适合计算，浏览器dom设计导致的）
1. 适合处理大访问量服务
2. 适合处理实时交互应用，聊天系统啥的
3. 完美支持对象数据库mongodb
4. 异步处理大量并发连接，一台服务器有很多用户可以处理大批量的用户连接

## libuv
> 帮助node实现异步事件通知
> 对不通操作系统事件通知做了底层封装

### watcher
1. io-watcher (setTimeout/setInterval)
2. check-watcher (setImmediate) 
3. idle-watcher (process.nextTick)

### 优先级

process.nextTick > promise.then > setTimeout/setInterval > setImmediate



## Linux 

### 用户空间、内核空间
stdio   标准输入输出
stdin   标准输入
stdout  标准输出
stderr  标准错误


权限换分细致，通过空间区分防止越权，保护操作系统
操作系统保护模式第0层

运行于用户空间，执行用户进程
运行于内核空间，处于进程上下文，代表某个特定的 进程执行
运行于内核空间，处于中断上下文，与任何进程无 关，处理某个特定的中断

linux 命令 kill -l 查看所有信号的定义

### 


## 模型
1. 同步阻塞IO
2. 同步非阻塞IO
    效率低，需要应用线程亲自去轮询内核是否完成工作
3. 异步阻塞IO
    不亲自轮询，通过子进程去同步阻塞IO完成任务，完成后通知应用线程
    设备以非阻塞方式打开，然后应用程序阻塞 在select系统调用中，用它来监听可用的I/O操作
    select系统调用最大的好处是可以监听多个 描述符，而且可以指定每个描述符要监听的 事件:可读事件、可写事件和发生错误事件
    依赖文件句柄，select监听的文件句柄有限，select就是一个监听器
    epoll
    比喻：是有个秘书select，不消耗资源
4. 异步非阻塞IO
    AIO，性能好，消耗资源，没处理一个IO操作，就有添加一个线程，需要多个资源，消耗资源，多对多
        单个进程能够监视的文件描述符的数量存在最大限制，通常是 1024，当然可以更改数量，但由于select采用轮询的方式扫描 文件描述符，文件描述符数量越多，性能越差;(在linux内核 头文件中，有这样的定义:#define __FD_SETSIZE 1024)
    NIO

### 举例
Tomcat - 同步I/O -> N I/O

### Epoll
支持阻塞式和非阻塞式api

### IOCP 模型

### libuv
C语言开发的，可移植性高

实现
1. 核心是提供了异步I/O的事件循环(eventloop)和异步回调
2. 事件循环

fs.readSync