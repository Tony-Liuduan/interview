# functional_programming

## 特点

* 数学
* 范畴学
* 纯的
* 一等公民
* 只用表达式，不用语句，没有if else try catch
* 没有副作用
* 不修改状态
* 引用透明，只靠参数传，相同的输入总是获得相同的输出
* map、reduce 是最常用的函数式编程的方法

## 关键词

* 纯函数，不能对外部有依赖，不要理解为幂等
* 柯里化curry，入参一定是从左向右执行
  * 反curry
  * 偏函数，入参无序执行，有占位符，不一定每次参数都要使用，例如：bind、setTimeout
* 组合compose，按照执行的从右到左顺序死流程执行 && 一元函数
  * map 投影函数
  * pipi
* 组合子：控制函数执行的流程，只做这一件事(filter、sort、tap(弃离)、alt(交换)、compose...)
* pointfree：借用compose减少不必要的命名、变量声明，让代码保持简洁通用
* 声明式代码：类SQL数据
  * 命令式：for循环
  * 声明式：map
* 惰性链、惰性求值、惰性函数：尽可能的推迟执行，shortcut，把map、filter融合到一起执行
  * 惰性函数式：在函数内部判断后，修改函数的值
* 高阶函数
* **递归to尾递归**
  * 递归：容易栈溢出
  * 尾递归：函数的最后一步调用自身，不留执行记录，减少爆栈可能性，v8合并帧不支持，防止错误堆栈丢失
  * 尾调用
  * while：好于递归
* 闭包

## lodash

* _.memorize (缓存，利用固定输入固定输出)
* _.curry

---

## <font color="red">范畴论</font>

1. 容器：Container，$(...)，标志：有value
2. 函子：map
3. point函子：Container.of，map函子生成的
4. maybe函子：try catch分支
5. either函子：left right 三元
6. IO函子：monad

### monad

> promise就是一种monad

---

## 函数式编程库

1. **rxjs (FRP) ==> Observable**
2. cycle.js
3. underscore.js(FP鼻祖)
4. lodash.js(fork 了underscore)
5. ramdajs(极致curry)

> <https://llh911001.gitbooks.io/mostly-adequate-guide-chinese/content/ch4.html#%E4%B8%8D%E4%BB%85%E4%BB%85%E6%98%AF%E5%8F%8C%E5%85%B3%E8%AF%AD%E5%92%96%E5%96%B1>

1. 函数是一等公民
    * 命名通用化
    * 减少函数不必要的包裹,  方便改写参数
    * this 指向(bind)
    * 使用函数代替表达式 (if for)
2. 写纯函数
    * 不对外部有依赖
    * 相同输入, 相同输出 1:1
    * 没有可观察副作用
    * 如何避免: 返回值变为一个 func, fnc 中包裹副作用相关代码
    * 不改写原值 slice vs splice
    * 变量作用域可控
3. 柯里化
    * 把接受多个参数的函数变换成接受⼀一个单⼀一参数
    * 入参一定是从左向右执行
4. 代码组合 compose
    * 函数之间依赖, 通过 compose 进行组合解耦
    * 按照执行的从右到左顺序死流程执行
    * 单个参数函数
    * redux
5. 声明式 代替 命令式
    * 命令式：for循环
    * 声明式：map
    * rxjs
    * lodash

```js
// redux compose 实现方法从右向左执行
function compose(...funcs) {
    if (funcs.length === 0) {
        return (arg) => arg
    }

    if (funcs.length === 1) {
        return funcs[0]
    }

    return funcs.reduce((a, b) => {
        return function (...args) {
            return a(b(...args))
        }
    });
}

function curry(fn) {
    let fl = fn.length;
    // 记录已经传递参数个数
    let count = 0;
    let args = [];
    return function callback() {
        count = count + arguments.length;
        args = args.concat([...arguments]);
        if (fl > count) {
            return callback;
        }
        if (fl === count) {
            fn(...args);
        }
    }
}
```
