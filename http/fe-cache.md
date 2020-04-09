# 前端缓存

* http缓存
* 浏览器缓存


## http缓存
> http缓存都是第二次请求时开始的

### 强缓存
* Expires
* Cache-Control

#### Expires
> HTTP1.0的内容，服务器使用Expires头来告诉Web客户端它可以使用当前副本，直到指定的时间为止

#### Cache-Control
> HTTP1.1引入了Cathe-Control，它使用max-age指定资源被缓存多久
> 主要是解决了Expires一个重大的缺陷，就是它设置的是一个固定的时间点，客户端时间和服务端时间可能有误差。


### 协商缓存
* Last-Modified / If-Modified-Since
* Etag / If-None-Match

#### Last-Modified / If-Modified-Since
> Last-Modified是服务器告诉浏览器该资源的最后修改时间，
> If-Modified-Since是请求头带上的，上次服务器给自己的该资源的最后修改时间。然后服务器拿去对比。

> 若资源的最后修改时间大于If-Modified-Since
> 说明资源又被改动过，则响应整片资源内容，返回状态码200

> 若资源的最后修改时间小于或等于If-Modified-Since
> 说明资源无新修改，则响应HTTP 304，告知浏览器继续使用当前版本。


#### Etag / If-None-Match
> 前面提到由文件的修改时间来判断文件是否改动，还是会带来一定的误差
> 比如注释等无关紧要的修改等。所以推出了新的方式。

> Etag是由服务端特定算法生成的该文件的唯一标识
> 而请求头把返回的Etag值通过If-None-Match再带给服务端
> 服务端通过比对从而决定是否响应新内容。这也是304缓存。



## 浏览器缓存

* storage
    - cookie
    - localStorage (5M)，缓存静态资源
    - sessionStorage
* 前端数据库
    - WebSql(被规范废弃，约50MB，localStorage的加强版)
    - indexDB
* 应用缓存Service Worker(manifest)

### cookie/localStorage/sessionStorage 区别
1. 生命周期：
    - localStorage持久化缓存 
    - sessionStorage关闭浏览器失效，页面刷新不会消除数据
2. 作用范围
    - sessionStorage同浏览器&&**同窗口**&&同域名
    - localStorage同浏览器&&同域名
    - cookie document.domain
3. 参与服务器通信：cookie


### cookie 参数
1. Expires=`<date>` cookie 的最长有效时间
> 如果没有设置这个属性，那么表示这是一个会话期 cookie 。一个会话结束于客户端被关闭时，这意味着会话期 cookie 在彼时会被移除。然而，很多Web浏览器支持会话恢复功能，这个功能可以使浏览器保留所有的tab标签，然后在重新打开浏览器的时候将其还原。与此同时，cookie 也会恢复，就跟从来没有关闭浏览器一样。
2. Max-Age=`<non-zero-digit>` 在 cookie 失效之前需要经过的秒数，比Expires优先级高，IE678不支持
3. Domain=`<domain-value>` 作用域名，用于跨域共享cookie
> domain表示的是cookie所在的域，默认为请求的地址，如网址为www.study.com/study，那么domain默认为www.study.com。而跨域访问，如域A为t1.study.com，域B为t2.study.com，那么在域A生产一个令域A和域B都能访问的cookie就要将该cookie的domain设置为.study.com；如果要在域A生产一个令域A不能访问而域B能访问的cookie就要将该cookie的domain设置为t2.study.com。注意：一般在域名前是需要加一个"."的，如"domain=.study.com"
4. Path=`<path-value>` 作用路径
5. HttpOnly：document.cookie不能访问 xss
6. Secure：只有https协议下才能发送cookie
6. SameSite=Strict 允许服务器设定一则 cookie 不随着跨域请求一起发送， csrf


### Service Worker
> Service Worker本质上也是浏览器缓存资源用的
> 基于h5的web worker，所以绝对不会阻碍当前js线程的执行
> https://mp.weixin.qq.com/s/vI2bxaFsFSB5rGC4Bkr8vQ