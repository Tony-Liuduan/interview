## 压测工具-wrk
> 转载：https://www.jianshu.com/p/ac185e01cc30

```sh
[root@jerrik /]# wrk -t12 -c100 -d30s http://www.baidu.com  
Running 30s test @ http://www.baidu.com
  12 threads and 100 connections
  Thread Stats   Avg      Stdev     Max   +/- Stdev
    Latency   211.76ms  304.92ms   1.97s    88.17%
    Req/Sec    72.93     68.72   797.00     90.97%
  23725 requests in 30.05s, 347.47MB read
  Socket errors: connect 0, read 48, write 0, timeout 50
Requests/sec:    789.57
Transfer/sec:     11.56MB
[root@jerrik /]# 
```

### 参数解释
12 threads and 100 connections:
总共是12个线程,100个连接(不是一个线程对应一个连接)

latency和Req/Sec:
代表单个线程的统计数据,latency代表延迟时间,Req/Sec代表单个线程每秒完成的请求数，他们都具有平均值, 标准偏差, 最大值, 正负一个标准差占比。一般我们来说我们主要关注平均值和最大值. 标准差如果太大说明样本本身离散程度比较高. 有可能系统性能波动很大.

23725 requests in 30.05s, 347.47MB read
在30秒之内总共有23725个请求,总共读取347.47MB的数据

Socket errors: connect 0, read 48, write 0, timeout 50
总共有48个读错误,50个超时.

Requests/sec和Transfer/sec
所有线程平均每秒钟完成了789.57个请求,每秒钟读取11.56MB数据量



### MAC下编译WRK
1. 下载编译安装luajit
wget https://luajit.org/download/LuaJIT-2.0.5.tar.gz
tar zxf LuaJIT-2.0.5.tar.gz
cd LuaJIT-2.0.5
make MACOSX_DEPLOYMENT_TARGET=10.14 
sudo make install

2. 编译wrk
注意，如果编译过程中遇到环境变量中存在空格，先把带空格的那一项去掉