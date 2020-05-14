# Chrome
> https://juejin.im/post/5bb08671e51d450e7210d23e


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
css不会阻塞js的加载，浏览器的预解析功能会提前帮助加载cssjs文件，当解析domtree时遇到内联或外联不带defer async属性的script标签会，会等待前面的css文件解析完成document.styleSheets，再去执行js文件，js是通过V8引擎去解释的，当js引擎参与时，htmlparser会暂停构建**domtree**，所以css会间接影响domtree的构建
3. 主线程解析CSS以添加计算样式，css生成的document.styleSheets和domtree结合将样式对应到每一个dom节点上，这时是有display:none的
4. 主线程通过计算样式遍历DOM树并生成布局树，从domtree计算出布局树**layouttree**，计算出每个元素的绘制坐标点，**页面的几何形状**，这时会把display=none的节点去掉，只计算需要显示的元素
5. 主线程遍历布局树以创建层树，layouttree再根据样式属性计算出分层树layertree
6. 主线程遍历布局树并生成**绘制记录(绘制次序)**，根据layouttree转化为绘制指令对象**painting**，绘画记录是一个绘画过程的注释，像是“背景优先，然后是文本，然后是矩形”。 
7. 一旦创建了层树并确定了绘制顺序，主线程将该信息提交给**合成器线程**
8. 合成器线程的作用是将每个图层切成小块**tile**，然后将每个tile发送到光栅线程，此外合成器线程可以对不同的raster光栅化线程进行优先级排序，以便视口（或附近）内的事物可以先被光栅化。 
9. 光栅线程创建位图并发送到GPU，光栅线程**光栅化**(光栅化：将painting信息转换成屏幕上的像素称为光栅化
)每个分块tile，并将它们存储在GPU内存中
10. GPU将数据处理成位图数据交给显存（GPU是众核心的）
11. 显存将数据一块一块绘制到显示器上
12. 一旦分块被光栅化，合成器线程会收集平铺信息，称为绘制矩形，以创建一个合成帧
    - **绘制矩形**：包含诸如分块在内存中的位置以及在考虑页面合成的情况下绘制分块的页面中的位置等信息。
    - **合成帧**：表示页面的帧的绘制矩形集合。
13. 合成帧先发送到浏览器进程，然后发送到GPU，这些合成帧被发送到GPU以在屏幕上显示。 如果发生滚动事件，合成器线程会创建另一个合成帧以发送到GPU。 **此处懵逼？？？**



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
4. rester光栅化线程：处理成GPU能用的


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
