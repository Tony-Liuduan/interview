# Demand

### 1. 尽量少的dom节点
* 伪元素
* box-shadow


### 2. 压缩合并
1. 合并文件大小控制在30kb左右，超过30kb会比较耗时
2. 初始化script(前提:**同一个域名下**)控制在最多<font color='red'>5个并发</font>请求，因为浏览器有并发限制，样式文件没有阻塞限制。
    - 解决方案：配置多个cdn域名解决】·
3. 静态资源去cookie，需要使用cookie检查版本缓存除外
4. gzip, keep-alive
5. 根据网络情况展示不通页面、一倍图替换二倍图，网络测速方法如下：
    - navigator.connection.rtt，网络往返时延，(计算performance.timming.res-rep之间的时间)，但是支持性不好
    - 用1kb图去探测，1kb/2000ms
    - 多普勒测速：用img发请求3次后再发送1次请求测试，计算请求前后的时间差，1kb/2000ms
    - 埋点：navigator.sendBeacon()




### 3.离线缓存
1. http缓存优先级：cache-control > expries > etag > last-modify
2. localStorage 同步读取，5M限制，但不能乱用，为了防止localStorage造成页面卡顿，将localStorage控制在**2.5M**
    - localStorage 扩容by [iframe & postMessage](https://www.cnblogs.com/cherishSmile/p/8390754.html)
    - localStorage 扩容缺点：同步变为异步了
    ```js
    // localStorage离线缓存
    // 可参考百度地图 || basket.js
    // js启动脚本：伪代码
    let _version = localStorage['main.js'];
    // 本地是否有缓存
    if (_version) {
        // 判断版本是否过期
        if (mainfest['main.js'] === _version) {
            if (!document.getElementById('main')) {
                // addscript() 可以追加script或eval(add script)
            }
            return;
        } else {
            // 清理localStorage缓存
            localStorage.remove('main.js');
            localStorage.remove(_version);
        }
    }

    // 给个实际地址
     _version = mainfest['main.js'];
    fetch(_version).then(data => {
        localStorage['main.js'] = _version;
        localStorage[mainfest['main.js']] = data;
        // addscript();
    });  

    ```

3. WebSQL
    - 50M
    - 本地关系型数据库
    - 只有chrome和安卓支持
    - <font color='red'>sqlite ?? 待调研</font>

4. IndexedDB
    - NoSQL 数据库
    - 使用IndexedDB执行的操作是异步执行的，以免阻塞应用程序
    - 大部分新的浏览器都支持

5. 资源预加载quicklink(preload prefetch preconnect)
    * [quicklink](https://www.jianshu.com/p/7dc94efe7e2e)
    * preload
        - 帮助指定加载优先级
        - 赋予浏览器决定资源复用的能力
        - 专注于当前页面加载的资源
        - 高优先级加载资源
        - 不会阻塞浏览器domContentLoadedEventEnd时间DOMContentLoaded
    * prefetch
        - 专注于下一个页面要去加载的资源
        - 低优先级
        - 浏览器在后台闲置的时候去加载，把资源存在缓存中
        - 当加载完后，使用时会立即执行资源
        - link prefetch
    
            ```html
            <link rel="prefetch" as="script" href="//c.housingcdn.com/s/Filters/mobile.42a07835.a.js">
            ```
        - DNS prefetch：这里先把域名转换为IP地址，等要加载的时候不用再进行DNS转换，直接从缓存获取IP地址节省了这里的时间
            ```html
            <link rel='dns-prefetch' href='www.google.com'>
            ```
        - **prerender**：后台渲染整个页面，预先做一些请求的操作，关键路径上消除了RTTs并且减少了半秒已上的延迟 ？？？什么意思不懂
    * preconnect 
        - 启动早期连接（包括DNS查找，TCP握手和可选TLS协商）允许用户代理屏蔽建立连接的高延迟成本
        - https://housing.com/
    
            ```html
            <link rel="preconnect" href="//c.housingcdn.com">
            ```
6. bigpipe


### 性能指标
1. TTFB: 发出页面请求到接收到应答数据第一个字节所花费的毫秒数(DNS解析+TCP三次握手+HTTP请求+第一字节返回的时间)
2. FP:  首次开始绘制时间(body背景色)
3. FCP: 首次有内容绘制时间(文本内容开始展示)
4. FMP: 首次有意义绘制时间
5. TTI: 用户可交互时间
6. Long Tasks: js执行超过50s任务


#### 相关api
PerformanceObserver
performance.mark('stylesheets') - getEntries
tti-polifll
longtask 监听到执行事件非常长的


---

## 重排重绘 layout && paint

### 独立成层属性
1. transform: translate3D(0, 0, 0);
2. animation中的 transform: translate(0, xx);

### 可以让GPU加速参与进来的属性
1. animation中的 transform: translate(0, xx);

### 读操作也会照成重排
* offset
* client 
* scroll
* width
* height
读这些会让chrome放弃优化立即返回结果，保证数据准确性
建议一起读，一起写，读写requestAnimationFrame分离