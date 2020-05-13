# Chrome


## 引擎
1. 浏览器引擎 Browser Engine
2. 渲染引擎 Render Engine
    - XML解析器(xml parse) 解析html
3. 显示后端
4. 数据持久层
5. 网络

## 渲染引擎
* blink
* webkit
* gecko
* trident


### 渲染引擎的输入输出

0. 输入html/css/js
1. html parser 构建Dom Tree
2. css parser 构建CSSOM
css正常是不会影响domtree构建的，但是css会阻塞js的执行，
css不会阻塞js的加载，浏览器的预解析功能会提前帮助加载cssjs文件，当解析domtree时遇到内联或外联不带defer async属性的script标签会，会等待前面的css文件解析完成document.styleSheets，再去执行js文件，js是通过V8引擎去解释的，当js引擎参与时，htmlparser会暂停构建domtree，所以css会间接影响domtree的构建
3. css生成的document.styleSheets和domtree合并生成renderTee，将样式对应到每一个dom节点上
4. renderTree再计算出布局树layouttree，这时会把display=none的节点去掉
5. layouttree再根据样式属性计算出分层树layertree
6. 根据layertree转化为绘制指令对象painting，提交给合成线程，painting数据在共享内存中
7. 合成器线程首先将图层分层图块tile，然后将每个图块发送到光栅线程
8. 栅格线程栅格化每一个tile并将它们存储在GPU内存中
9. GPU将数据处理成位图数据交给显存（GPU是众核心的）
10. 显存将数据一块一块绘制到显示器上


## chrome 进程管理
1. 浏览器主进程
2. 网络请求线程
3. 渲染进程
4. 标签页进程（但是同一个域属于同一进程）
5. GPU进程
6. 插件进程


### 渲染进程-多线程
1. 主线程 管理 html css，这里不处理js
    1.1 第一步：解析文档构建dom，生成文档对象模型
    - html是xml的子集，html parser会帮助排除错误让xml正确解析
    - xml 分为 
        * sax解析（根据xml语法规则解析，类似正则，不生成dom对象，速度快，消耗内存少，可以直接拿到<></>中间的数据）
        * dom解析（会产生dom对象数据结构，需要消耗时间和内存）
2. worker线程
    - service worker
3. composer合成器线程
4. rester栅格化线程：处理成GPU能用的


## 合成线程的有点
通过IPC将合成器帧提交给浏览器进程。这时可以从UI线程添加另一个合成器帧以用于浏览器UI更改，或者从其他渲染器进程添加扩充数据。 

这些合成器帧被发送到GPU用来在屏幕上显示。
如果发生滚动事件，合成器线程会创建另一个合成器帧并发送到GPU。

合成的好处是它可以在不涉及主线程的情况下完成。 
合成线程不需要等待样式计算或JavaScript执行。 
这就是合成动画是平滑性能的最佳选择的原因。
如果需要再次计算布局或绘图，则必须涉及主线程。


### V8-管理 js



## webkit

