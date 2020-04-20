# http2
> https://juejin.im/post/5e76bd516fb9a07cce750746


## http 进化
> http/0.9(1991) -> http/1.0(1996) -> http/1.1(1999) -> http/2(2015) -> http/3(waiting)

### http/1.1
* tcp keep-alive
* 文本传输


### http/2
* 二进制传输
* 头部压缩 HPACK算法（map表）
* 二进制分帧层
* 多路复用
* 默认https协议
* 新增伪头，去掉了首行，作用域头部压缩算法HPACK
    - HTTP/2 当中废除了起始行的概念，将起始行中的请求方法、URI、状态码转换成了头字段，不过这些字段都有一个":"前缀，用来和其它请求头区分开。

```txt
## requset
:method: POST
:authority: fenqiche.58.com
:scheme: https
:path: /api/user/online/risk
content-length: 50
accept: application/json
cache-control: no-cache

## response
:status: 200
server: nginx
date: Mon, 20 Apr 2020 06:13:32 GMT
content-type: text/html;charset=UTF-8
x-application-context: carloan_gatewayuser:8080
vary: Accept-Encoding
content-encoding: gzip

{"code":0,"data":null,"msg":"成功"}
```

* 服务器推送(Server Push)
    - 在 HTTP/2 当中，服务器已经不再是完全被动地接收请求，响应请求，它也能新建 stream 来给客户端发送消息，当 TCP 连接建立之后，比如浏览器请求一个 HTML 文件，服务器就可以在返回 HTML 的基础上，将 HTML 中引用到的其他资源文件一起返回给客户端，减少客户端的等待。

* 首次请求使用http1.1发送的
* 请求升级、协商
* 如果客户端支持http2则升级到http2协议
* 有TCP队头阻塞问题



### http队头阻塞和tcp队头阻塞区别？
1. http队头阻塞是基于请求响应层面的，前一个请求排到没发出去，后面的请求就要阻塞等待，受限于keep-alive连接数上限6

2. tcp队头阻塞是基于数据包层面的，tcp前一个报文没有收到便不会将后面收到的报文上传给http


### http2 是如何解决http队头阻塞的？
* 不再传输文本，改为传输二进制（避免回车换行）
* 不再传输整个报文，进行**二进制分帧**，分为头部帧，和数据帧，去掉首行，将首行字段放在头部帧，头部帧和数据帧通过一个int类型标识符Stream ID关联拼装（占用4bytes, 范围是2 ** 31）
* 多个二进制分帧可以在同一个tcp连接上流动，这个流是双向的，这些二进制帧不存在先后关系，因此也就不会排队等待，也就没有了 HTTP 的队头阻塞问题，但同一个 Stream ID 的帧一定是按顺序传输的，这就是**多路复用**的概念





### http/3
* 底层协议udp，提升性能，无需握手
* 加入QUIC层，保证数据传输可靠性
* 多路复用
* 当wifi切换到4G时，连接不会断开
* 解决TCP队头阻塞问题，通过给买一个包独立加密实现，1.1/2 必须报文所有的包拿到才能解密