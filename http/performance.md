# Performance


## W3C-[Navigation Timing API](https://developer.mozilla.org/zh-CN/docs/Web/API/Navigation_timing_API)


0. 本地：提示卸载页面
> --- navigaitonStart ---
> --- unloadEventStart ---
1. 本地：unload
> --- unloadEventEnd ---
> --- redirectStart ---
2. 本地：redirect
> --- redirectEnd ---
> --- fetchStart ---
3. 本地：app cache - 检查本地磁盘缓存
    - 优化点2个：机械硬盘 to ssd **？？？**
    - 大文件传输快的原因：机械寻址次数少
> --- domainLookupStart ---
4. 网络：dns
    - udp请求
> --- domainLookupEnd ---
> --- connectStart ---
> --- secureConnectionStart ---
5. 网络：tcp - 操作系统负责
> --- connectEnd ---
> --- requsetStart ---
6. 网络：http request - nginx服务负责
> --- requsetEnd ---
> --- responseStart ---
7. 网络：http response
> --- responseEnd ---
> --- domloading --- 准备加载dom
8. 本地：prcessing
> --- domInteractive 文本转成dom
> --- domContentLoadedEventStart (dom文档加载完成)
> --- domContentLoadedEventEnd 
> --- domComplete dom解析完成（数据还在内纯里）
> --- 触发onload事件 --- (已经完成GPU渲染)
9. 本地：onload
> --- onload事件结束 ---


## DNS

### 记录类型
1. SOA
2. A记录 
3. CNAME 别名相当于map映射
4. TXT 
5. MX 给邮件用的
6. IPv6（AAAA）

### DNS解析
1. to **域名服务器**，转发缓存，访问评率高的缓存下来
2. root server 根服务器
    - 13台一共
    - 负责分配任务到哪个后缀-tld服务器，如：.com .cn
3. tld server 服务器 二级服务器
    - 负责分配一级域名到哪个服务器
4. name server 
    - 解析各级域名 获得 ip
5. ip传回到 **域名服务器**，在到用户
