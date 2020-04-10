# Interview

> https://juejin.im/post/5e7d4e8b6fb9a03c6422f112

```sh
http-server
```


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