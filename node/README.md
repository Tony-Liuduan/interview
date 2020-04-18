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