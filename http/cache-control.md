1. no-store
每次访问的状态码都是200，本地不保存，每次都需要服务器发送资源


2. no-cache
缓存 但是每次都要像源服务器发送验证请求，响应200 | 304
在释放缓存副本之前，强制将请求提交给原始服务器进行验证
告诉浏览器、缓存服务器，不管本地副本是否过期，使用资源副本前，一定要到源服务器进行副本有效性校验
特点：浏览器 直接访问 源服务器。


3. must-revalidate
Cache-Control: max-age=60, must-revalidate
响应：200(来自浏览器缓存) | 304 | 200
告诉浏览器、缓存服务器，本地副本过期前，可以使用本地副本；本地副本一旦过期，必须去源服务器进行有效性校验。
特点：浏览器 通过 缓存服务器，间接访问 源服务器。




4. max-age
示例：
cache-control: max-age=432000 （秒）
date: Tue, 24 Mar 2020 07:59:22 GMT
expires: Mon, 23 Mar 2020 01:16:43 GMT
相对于请求的时间，Response中相对于Expires优先级更高
Expires = max-age + “每次下载时的当前的request时间”




5. public | private
如果你用了CDN，你需要关注下这个值。
CDN厂商一般会要求cache-control的值为public，提升缓存命中率。
private 表明响应只能被单个用户缓存，不能作为共享缓存（即代理服务器不能缓存它）
如果你的缓存命中率很低，而访问量很大的话，可以看下是不是设置了private，no-cache这类的值。
如果定义了max-age，可以不用再定义public，它们的意义是一样的




6. 缓存校验：
http/1.1 Last-Modified | etag
当ETag和Last-Modified同时出现时，任何一个字段只要生效了，就认为文件是没有更新的。

6.1 Last-Modified: 示例 last-modified: Thu, 16 Jan 2020 03:55:18 GMT
服务端在返回资源时，会将该资源的最后更改时间通过Last-Modified字段返回给客户端。
客户端下次请求时通过 If-Modified-Since 或者 If-Unmodified-Since 带上Last-Modified，
服务端检查该时间是否与服务器的最后修改时间一致：如果一致，则返回304状态码，不返回资源；
如果不一致则返回200和修改后的资源，并带上新的时间

If-Modified-Since和If-Unmodified-Since的区别是：
If-Modified-Since：告诉服务器如果时间一致，返回状态码304
If-Unmodified-Since：告诉服务器如果时间不一致，返回状态码412


6.2 etag: 示例 etag: "5e1fdea6-5b63"
单纯的以修改时间来判断还是有缺陷，比如文件的最后修改时间变了，但内容没变。对于这样的情况，我们可以使用etag来处理
etag的方式是这样：服务器通过某个算法对资源进行计算，取得一串值(类似于文件的md5值)，之后将该值通过etag返回给客户端，
客户端下次请求时通过 If-None-Match 或 If-Match 带上该值，服务器对该值进行对比校验：如果一致则不要返回资源。

If-None-Match和If-Match的区别是：
If-None-Match：告诉服务器如果一致，返回状态码304，不一致则返回资源
If-Match：告诉服务器如果不一致，返回状态码412



7. Expires 
表示过期时间
expires: Mon, 23 Mar 2020 01:16:43 GMT
缺点:返回的到期时间是服务器端的时间，这样存在一个问题，如果客户端的时间与服务器的时间相差很大，那么误差就很大，
所以在HTTP 1.1版开始，使用Cache-Control: max-age=秒替代。
Expires = max-age + “每次下载时的当前的request时间”



8. 协商缓存
last-modified | etag
没有命中浏览器本地缓存，
特点：浏览器会向服务器发送请求，
根据请求头的last-modified和etag判断是否命中协商缓存，如果命中，直接从缓存获取资源304。如果没有命中，则进入下一步 200


9. 强缓存
max-age | public | expires
from disk cache(磁盘缓存)
from memory cache(内存缓存)两类
浏览器发送请求前，根据请求头的expires和cache-control判断是否命中强缓存策略，
特点：如果命中，直接从缓存获取资源，并不会发送请求。
如果没有命中，则进入下一步。200(from cache)
Pragma -> Cache-Control -> Expires

