# canvas

1. canvas 和 svg 区别

* 通过 js 来绘制 2D图形
* canvas 图像单位是像素
* canvas 图像绘制完毕之后，浏览器将不再关注它，如果位置发生变换，就需要重新绘制。

* svg 使用 XML 描述的2D图像
* svg 是基于 xml 的，所以 svg 中绘制图形还是使用的元素，js 给元素任意添加事件
* svg 绘制的图像是一个对象，如果对象的属性发生改变，浏览器将重新绘制图形

* svg 是一种矢量图，而 canvas 依赖于分辨率。所以 svg 放大不会失真，但是 canvas 绘制的图形会失真
* svg 支持事件处理器，而 canvas 不支持事件处理器
* canvas 适合图像密集型的游戏，频繁地重绘图像，svg 绘制的复杂度高时减慢渲染的速度
* canvas 绘制的图形可以多种格式 (jpg、png) 保存图片，但是 svg 绘制的只能以 .svg 格式保存，使用时可以引入 html 文件
* canvas 适合开发游戏、图标，svg 适合做地图

2. canvas 性能优化

* 离屏 canvas，缓存图片、压缩图片
* 避免浮点数的坐标点，用整数取而代之，浏览器为了达到抗锯齿的效果会做额外的运算
* 使用多层画布去画一个复杂的场景
* 用 CSS transforms 特性缩放画布，利用 GPU 特性
* 适当时候关闭画布透明度

3. canvas.width 和 canvas.style.width 区别 （<https://segmentfault.com/a/1190000016819776）>

* canvas.style.width设置了参数，width未设置，当width和height属性没有设置时，画布的大小就会采用默认属性值（width:300、height:150）
* canvas.width 是画布的大小
* canvas.style.width 是浏览器上的渲染大小，现在画布上画，然后根据 style 样式缩放到浏览器上

4. png 图片是否透明背景检测 

canvas getImageData[4] != 255

<https://www.zhangxinxu.com/study/201804/png-alpha-transparent-bg-detect.html>
