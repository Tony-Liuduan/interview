# http

## 浏览器处理url流程
1. 输入url && 回车
2. 网关（PASSPORT）
    - 监控记录用户不良行为，上班刷抖音
    - 网关管理内部请求，防火墙管理外面请求
3. 域名dns解析
4. 去服务器的路
5. 发送到Nginx服务器，反向代理到集群某一台服务器
6. 服务器处理请求，返回响应
7. 走回到浏览器的路
8. 浏览器处理响应
9. End


#### 事务
> 一次http往返请求，就是一次事务
> 在执行任务过程中只要某一步骤失败，则认为整个事务失败
> 某一步中有多次子操作，必须一口气做完（原子性），不能停
1. 建立tcp连接
2. 客户端发送请求
3. 服务端响应
4. 浏览器接收信息显示在屏幕上
    - tcp断开，keep-alive则保持连接

注意：http请求是一次I/O操作是最慢的操作，快的操作通过cpu处理


#### 防火墙
1. 防止网络攻击，设置某个端口只能本地访问，比如数据库端口
2. 软件防火墙


## http是什么
* client：发起第一次通信的一方
* server：接收通信连接的一方


## TCP/IP 协议栈

### 5层
1. 应用层（http | ftp）提供应用比如浏览器支持
2. 传输层（tcp | udp）解决发送接收数据问题
3. 网络层（ip）解决端到端的问题，ping命令就在这
4. 数据链路层(网络接口层) 网卡mac地址
5. 物理层(网络接口层) wifi


### 7层 ISO/OSI http3遵循7层协议结构
1. 应用层（http | ftp）提供应用比如浏览器支持
2. 表示层
3. 会话层
4. 传输层（tcp | udp）解决发送接收数据问题
5. 网络层（ip）解决端到端的问题，ping命令就在这
6. 数据链路层(网络接口层) 网卡mac地址
7. 物理层(网络接口层) wifi


### https（443）
1. http(内嵌TLS/SSL模块)
2. tcp：tcp握手的还是http层，ssl仅仅是http的一个模块
3. ip
4. 数据链路层
5. 物理层

## http报文

#### requse
1. 请求行CR+LF `POST /search HTTP/1.1`
2. 请求头CR+LF `Accept-Encoding: gzip, deflate`
3. 回车换行CR+LF
4. 请求体 `hl=zh-CN&source=hp&q=domety`

#### response
1. 状态行CR+LF `HTTP/1.1 200 OK`
2. 响应头CR+LF `Content-Type: text/html;charset=utf-8`
3. 回车换行CR+LF
4. 响应体 `html content`


## http method (crud)
* get    (read)
* post   (create)
* put    (update)
* delete (delete)
* head   服务器只响应响应头，类似get
* trace  
* connect 
* option 请求查询服务器性能，查询与资源相关的选项和需求
    - 1.可以使用 OPTIONS 方法对服务器发起请求，以检测服务器支持哪些 HTTP 方法，响应报文包含一个 Allow 首部字段，该字段的值表明了服务器支持的所有 HTTP 方法
    - 2.在 CORS 中，可以使用 OPTIONS 方法发起一个预检请求，以检测实际请求是否可以被服务器所接受。预检请求报文中的 Access-Control-Request-Method 首部字段告知服务器实际请求所使用的 HTTP 方法；Access-Control-Request-Headers 首部字段告知服务器实际请求所携带的自定义首部字段。服务器基于从预检请求获得的信息来判断，是否接受接下来的实际请求。

```txt
OPTIONS /resources/post-here/ HTTP/1.1 
Host: bar.other 
Accept: text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8 
Accept-Language: en-us,en;q=0.5 
Accept-Encoding: gzip,deflate 
Accept-Charset: ISO-8859-1,utf-8;q=0.7,*;q=0.7 
Connection: keep-alive 
Origin: http://foo.example 
Access-Control-Request-Method: POST 
Access-Control-Request-Headers: X-PINGOTHER, Content-Type
```

```txt
HTTP/1.1 200 OK
Date: Mon, 01 Dec 2008 01:15:39 GMT 
Server: Apache/2.0.61 (Unix) 
Access-Control-Allow-Origin: http://foo.example 
Access-Control-Allow-Methods: POST, GET, OPTIONS 
Access-Control-Allow-Headers: X-PINGOTHER, Content-Type 
Access-Control-Max-Age: 86400 
Vary: Accept-Encoding, Origin 
Content-Encoding: gzip 
Content-Length: 0 
Keep-Alive: timeout=2, max=100 
Connection: Keep-Alive 
Content-Type: text/plain
```


## http 状态码
> https://blog.csdn.net/hzw05103020/article/details/47276005
1. 1xx
2. 2xx
3. 3xx
4. 4xx
5. 5xx


## cookie && session

* cookie存在客户端，随着客户端每一个请求发送当前url下所有cookie到服务端
* session存在服务器，通过唯一sessionID来区分用户
    - 将session存入redis中
    - ctx.sessionId就是redis的key，也是写入cookie的value值
    - app端：使用sessionId通过token携带认证，token存储在app本地存储SQLite中，app端使用token是安全的，在非越狱情况下app之间数据是不能共享的，其他app是无法获取到互相的token，在操作系统层面就进行了拦截
    - 浏览器端：


## http 进化
> http/0.9(1991) -> http/1.0(1996) -> http/1.1(1999) -> http/2(2015) -> http/3(waiting)

### http/1.1
* tcp keep-alive



### http/2
* 多路复用



### http/3
* 队头阻塞