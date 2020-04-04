# <font color="green">browser event loop</font>

## 异步任务队列
* 微任务：Promise.prototype.then、MutationObserve
* 宏任务：script、setTimeout、setInterval、requestAinimationFrame


## 做题原则
1. 将async 转换为promise
2. 列三列：mainscript | microtask | macrotask
3. 按顺序执行


## 终极boss题

```js
/**
 *  promise 终极变态题
 *  chrome 和 node 执行结果不一样哦
 */
function async1() {
    console.log("async1 start");
    new Promise(resolve => {
        // async2().then(resolve);
        resolve(async2());
        // resolve处理thenable对象时，会多包裹一层new Promise 
        // resolve(async2()) 等同于下面的代码
        // async2()
        //     .then((data) => {
        //         new Promise(res => {
        //             res()
        //         })
        //         .then(resolve)
        //     })
    })
        .then((res) => {
            console.log("++++++++++++++");
            console.log(res);
            console.log("async1 end");
            console.log("++++++++++++++");
        })
}
function async2() {
    return new Promise(resolve => {
        console.log('async2');
        resolve(1);
    })
    // return {
    //     then(resolve) {
    //         console.log('async2');
    //         resolve(1);
    //     }
    // }
}
async1()
new Promise(function (resolve) {
    console.log("promise1");
    resolve();
}).then(function () {
    console.log("promise2");
}).then(function () {
    console.log("promise3");
}).then(function () {
    console.log("promise4");
});
```

---

# <font color="green">node event loop</font>

* 微任务：process.nextTick、Promise.prototype.then
* 宏任务：异步IO、setTimeout、setInterval、setImmediate


1. nodejs怎么执行代码的？
输入：jscode 👉 v8引擎编译 👉 node api 👉 libuv 
输出：libuv  👉 node api 👉 v8引擎编译 👉 jscode

2. libuv是基于eventloop
eventqueue 👉 eventloop(异步IO) 👉 worker threads 
worker threads callback 👉 eventloop 👉 eventqueue

3. event loop
incoming 👉 poll(所有异步任务IO) 👉 check阶段(setImmediate) 👉 timer(setInterval/setTimeout) 👉 poll(所有的IO)

### setImmediate vs setTimeout
当poll任务做完了，就会先看一眼timer是否有能执行的任务，
如果timer没有到时间需要执行的任务，就去执行check阶段的setImmediate
如果timer有到时间需要执行的任务，就先执行timer中的任务，执行完后再去执行check阶段的setImmediate
所有setImmediate 和 timer的执行先后是不一定的
```js
// 这时不能保证 setTimeout/setImmediate执行顺序，需要看机器性能，
process.nextTick(() => {
    console.log("nextTick");
})
// 这时不能保证 setTimeout/setImmediate执行顺序，需要看机器性能，
setImmediate(() => {
    console.log("setImmediate")
})
setTimeout(() => {
    console.log("setTimeout")
}, 0);



// 这时能保证 setTimeout/setImmediate执行顺序，setTimeout 和 setImmediate是同时注册的
// 当poll阶段执行完，setTimeout刚注册，所以一定会先执行setImmediate
const fs = require("fs");
const path = require("path");
fs.readFile(path.resolve(__dirname, "mypromise.js"), (err, data) => {
    setTimeout(() => {
        console.log("io after setTimeout")
    }, 0);

    setImmediate(() => {
        console.log("io after setImmediate")
    });
    process.nextTick(() => {
        console.log("io after nextTick");
    });
})
```

### 微任务-process.nextTick/Promise
每个阶段切换到到下一个阶段执行**之前**时候都会先执行微任务：process.nextTick/Promise.prototype.then
process.nextTick 优先级高于 Promise.prototype.then

```js
const fs = require("fs");
const path = require("path");
// process.nextTick 出处
function apiCallback(arg, callback) {
    if (arg !== "string") {
        // 相当于处理 readFile 的 error作用
        process.nextTick(callback, new TypeError("argument should be string"))
    }
}
fs.readFile(path.resolve(__dirname, "mypromise.jsx"), (err, data) => {
    setTimeout(() => {
        console.log("io after setTimeout")
    }, 0);

    setImmediate(() => {
        console.log("io after setImmediate")
    });
    process.nextTick(() => {
        console.log("io after nextTick");
    });
})
```


1. node version >= 11
**微任务宏任务执行机制和浏览器相同**


2. node version < 11
微任务宏任务执行机制和浏览器不相同
node 会先把同一阶段的所有宏任务执行完之后再去执行微任务

```js
setTimeout(() => {
    console.log("setTimeout1")
    new Promise((res) => { res(1) }).then(res => { console.log("Promise1", res) })
}, 0);
setTimeout(() => {
    console.log("setTimeout2")
    new Promise((res) => { res(2) }).then(res => { console.log("Promise2", res) })
}, 0);
// 8.x 版本：setTimeout1、setTimeout2、Promise1 1、 Promise2 2
// 12.x 版本：setTimeout1、Promise1 1、setTimeout2、 Promise2 2
```

同样setImmdiate、process.nextTick 也符合上述结论
