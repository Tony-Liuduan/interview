# Interview

> <https://juejin.im/post/5e7d4e8b6fb9a03c6422f112>
> <https://github.com/haizlin/fe-interview?utm_source=gold_browser_extension>

```sh
http-server
```

## 9大模块

1. js
2. http
3. v8
4. node
5. nginx
6. cicd
7. css
8. html
9. 算法

## 经典面试题

1. 问：以下块级作用域代码执行结果是？

```js
{
    var a = 1;
    const b = 2; 
    function test(){}
    test = 3;
    console.log(typeof test) 
}
console.log(a) 
console.log(typeof test) 
console.log(b)
```

2. 问：es6的元编程是啥？

> 对js语言本身进行编程

* Symbol.toPrimitive
* Symbol.iterator
* Proxy
* Reflect

小demo走一个

```js
function Tree () {
    return new Proxy({}, handle);
}

const handle = {
    get(target, key, receiver) {
        if (!(key in target)) {
            target[key] = Tree();
        }
        // 直接 return receiver[key] 会死循环调用get
        // Reflect.get 相当于将receiver[key]托管给第三方
        return Reflect.get(target, key, receiver);
    }
}
const tree = new Tree();
tree.a.b.c.d = 1;
console.log(tree.a.b.c.d);
```

3. 问：说吧，输出啥？

```js
let a = 0;
let fn = async () => {
    a = a + await 10;
    console.log(a) 
}
fn(); 
console.log(++a);



let b = 0;
let foo = async () => {
    b = await 10 + b;
    console.log(b) 
}
foo(); 
console.log(++b);
```

4. 模拟while阻止其他异步不能调用

```js
// 1. 模拟while阻止其他异步不能调用
function fn () {
    console.log(Math.random());
    setTimeout(fn, 0)
}

setTimeout(() => {
    console.log("++++++++++++++++++++++++++==");
}, 100)
fn();

// 2. 使用 web worker 去执行while里面的任务
```

5. 请问变量a会被GC回收么，为什么呢?

```js
function test(){
    var a = 1;
    return function(){
        eval("");
    }
}
test()();
```

> 答案：不会, window.eval() 会收回
> 原因：使用eval时候，无法判断eval内部是否会引用a，则GC不会去清除a，a被放到闭包中，常驻内存
> window.eval是定义在顶层，不参数函数内部引用

6. .的优先级

```js
var a = {n:1}
var b = a;
a.x = a = {n:2}

// a.x ? undefined
// b.x ? {n:2}ß
```

> js中 .的优先级大于=

### 鼠标事件e

| 属性             | 参考点                                                       | 兼容性                  |
| ---------------- | ------------------------------------------------------------ | ----------------------- |
| clientX, clientY | 相对浏览器可视区域（显示内容区域）左上角，不随页面滚动而改变 | 所有                    |
| pageX, pageY     | 相对整个html文档左上角，会随着页面滚动而改变                 | 所有，IE除外            |
| offsetX, offsetY | 事件目标对象左上角，chrome中以内边距左上角为基准点，不包含边框 | 所有，Firefox除外       |
| layerX, layerY   | 事件目标对象左上角，chrome中以边框左上角为基准点             | Firefox，Chrome，Safari |
| screenX，screenY | 计算机屏幕                                                   | 所有                    |
| x, y             | 和clientX, clientY值相同                                     |                         |

offsetHeight
offsetWeight=content+padding*2+border*2
offsetLeft
offsetTop

clientWidth = content + padding*2
clientHeight

### getBoundingClientRect

elem.getBoundingClientRect()
left / x / right / y / width / height
left / x / right / y 是元素边框左上角相对月屏幕可是区域左上角的距离，是动态

### getComputedStyle

window.getComputedStyle(elem, 'after')
