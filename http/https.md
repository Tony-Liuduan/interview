# https

#### md5
1. etag一般通过md5生成
2. md5不是加密算法，也不是压缩算法
3. md5是解密不了的
4. md5只是一个特征值，理论是唯一的
5. md5 SHA1 SHA256 这3种本质都是摘要函数,它们的长度 MD5 是 128 位,SHA1 是 160 位 ,SHA256 是 256 位


### TLS/SSL
1. TLS 
传输层TCP/IP框架层面的
适用于对称加密
是SSL的加强版

2. SSL
针对socket的
技术层的


## 加密算法
* 对称：AES
* 非对称：RSA


## https 连接过程

1. server端到ca申请证书
给ca一个`content`，包括网站信息，算法，公钥

2. ca一顿操作，变出来一个可靠的数字证书颁发给server
数字证书 = RSA(SHA256(content), CA私钥)，数字证书包括：
    - 被签名的证书tbsCertificate(to be signed Certificate)
    - 签名算法
    - 签名
> **ps: ca 是私钥加密，公钥解密，是反着来的**

3. server保存了2个重要文件（一般在ng服务器）
    - 数字证书
    - 私钥

4. client向server发送请求，建立TLS连接

5. clinet发送，第一次信息（明文发送）
    - hello server
    - 给你一个随机数r1
    - 我支持xx算法

6. server收到信息，回复（明文发送）
    - hello client，我收到你的消息了
    - 我也给你一个随机数r2，你藏好了
    - 我们约定使用xx算法

7. server捎带脚的又发送了一个数字证书给client
    - 核验下身份吧

8. client收到数字证书拿给ca去验证证书
    - ca 使用**公钥**解密证书签名
    - hash1 = RSA(证书签名，CA公钥)
    - hash2 = SHA256(tbsCertificate)
    - if (hash1 === hash2) 这个证书是真的

9. 身份验证通过，client发送第二条消息给server（<font color="red">非对称加密发送</font>）
    - 发送内容包括一个随机数r3
    - 并且使用数字证书提供的公钥进行加密


10. server收到消息，通过私钥解密，生成**对称加密秘钥**
    - 拿到随机数r3
    - 对称加密秘钥key=AES(r1, r2, r3);


11. clinet手上也有这三个随机数，也生成**对称加密秘钥**
    - 对称加密秘钥key=AES(r1, r2, r3);

12. 之后clinet和server通过<font color="red">对称加密秘钥</font>通信


