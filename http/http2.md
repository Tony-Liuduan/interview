# http2
> https://juejin.im/post/5e76bd516fb9a07cce750746


## http 进化
> http/0.9(1991) -> http/1.0(1996) -> http/1.1(1999) -> http/2(2015) -> http/3(waiting)

### http/1.1
* tcp keep-alive
* 文本传输


### http/2
* 二进制传输 int类型
* 头部压缩
* 二进制分帧层 ？？
* 多路复用 ？？ 
* 主动推送serverpush，无需ajax，减少请求延迟
* 默认https协议
* 新增伪头
```txt
:authority: www.aliyun.com
:method: GET
:path: /?utm_content=se_1003086853
:scheme: https
```
* 首次请求使用http1.1发送的
* 请求升级、协商
* 如果客户端支持http2则升级到http2协议
* 有队头阻塞问题

#### 二进制分帧层
消息头和消息体不用回车换行间隔了

#### 多路复用
在一个tcp连接上，同时发送多个请求


### http/3
* 底层协议udp，提升性能，无需握手
* 加入QUIC层，保证数据传输可靠性
* 多路复用
* 当wifi切换到4G时，连接不会断开
* 解决队头阻塞问题，通过给买一个包独立加密实现，1.1/2 必须报所有的包拿到才能解密