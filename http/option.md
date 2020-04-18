> https://blog.csdn.net/weixin_34074740/article/details/91444311

## OPTIONS请求自动发起
MDN的CORS一文中提到：

规范要求，对那些可能对服务器数据产生副作用的 HTTP 请求方法（特别是 GET 以外的 HTTP 请求，或者搭配某些 MIME 类型的 POST 请求），浏览器必须首先使用 OPTIONS 方法发起一个预检请求（preflight request），从而获知服务端是否允许该跨域请求。

所以这个跨域请求触发了浏览器自动发起OPTIONS请求，看看此次跨域请求具体触发了哪些条件。

## 跨域请求时，OPTIONS请求触发条件
CORS预检请求触发条件	本次请求是否触发该条件

1. 使用了下面任一HTTP 方法：	
PUT/DELETE/CONNECT/OPTIONS/TRACE/PATCH	
否，本次为post请求

2. 人为设置了以下集合之外首部字段：	
Accept/Accept-Language/Content-Language/Content-Type/DPR/Downlink/Save-Data/Viewport-Width/Width	
否，未设置其他头部字段

3. Content-Type 的值不属于下列之一:	
application/x-www-form-urlencoded、multipart/form-data、text/plain	
是，为application/json

由于修改了Content-Type为application/json，触发了CORS预检请求。