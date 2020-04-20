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
    - app端：使用sessionId通过token传递认证，token存储在app本地存储SQLite中，app端使用token是安全的，在非越狱情况下app之间数据是不能共享的，其他app是无法获取到互相的token，在操作系统层面就进行了拦截
    - 浏览器端：通过cookie传递




## HTTP队头阻塞（非TCP队头阻塞）

### 1. 什么是 HTTP 队头阻塞？
HTTP 传输是基于请求-应答的模式进行的，报文必须是一发一收，但值得注意的是，里面的任务被放在一个任务队列中串行执行，一旦队首的请求处理太慢，就会阻塞后面请求的处理。这就是著名的HTTP队头阻塞问题。


### 2. 怎么解决http的队头阻塞？
#### 2.1 并发连接
对于一个域名允许分配多个长连接，那么相当于增加了任务队列，不至于一个队伍的任务阻塞其它所有任务。在RFC2616规定过客户端最多并发 2 个连接，不过事实上在现在的浏览器标准中，这个上限要多很多，Chrome 中是 6 个。
但其实，即使是提高了并发连接，还是不能满足人们对性能的需求。

#### 2.2 域名分片
一个域名不是可以并发 6 个长连接吗？那我就多分几个域名。

比如 content1.sanyuan.com 、content2.sanyuan.com。
这样一个sanyuan.com域名下可以分出非常多的二级域名，而它们都指向同样的一台服务器，能够并发的长连接数更多了，事实上也更好地解决了队头阻塞的问题。


#### 2.3 使用http2
* 不再传输文本，改为传输二进制（避免回车换行）
* 不再传输整个报文，进行**二进制分帧**，分为头部帧，和数据帧，去掉首行，将首行字段放在头部帧，头部帧和数据帧通过一个int类型标识符Stream ID关联拼装（占用4bytes, 范围是2 ** 31）
* 多个二进制分帧可以在同一个tcp连接上流动，这个流是双向的，这些二进制帧不存在先后关系，因此也就不会排队等待，也就没有了 HTTP 的队头阻塞问题，但同一个 Stream ID 的帧一定是按顺序传输的，这就是**多路复用**的概念