# 模块化

> <https://juejin.cn/post/6844903961128861704>

## 常见模块化规范

* commonjs
* amd
* cmd
* umd
* esm

## commonjs

代表作: nodejs

同步加载模块规范

### 特点

1. 同步加载 require
2. 每一个模块都是一个单独的作用域，在一个文件定义的变量（还包括函数和类），都是私有的，对其他文件是不可见
3. 输出的是值的**拷贝**, 而非引用, 注意值类型和引用类型的赋值, 不能实现静态代码分析
4. 运行时加载, 非 esm 编译时输出, 原因: 加载过来的是整个模块的 module.exports 对象的拷贝, 而对象只能在代码运行过程中生成
5. 重复引入某个相同的模块时，模块只会执行一次
6. 循环引用: 一旦出现某个模块被“循环加载”，就只输出已经执行的部分，而不是代码全部执行后的值, 还未执行的部分不会输出, 详见 demo01
   1. 建议: require('a').foo 的值很可能后面会被改写，改用 require('a') 会更保险一点

```js
// lib.js
var counter = 3;
var obj = {
    name: 'David'
};

function changeValue() {
    counter++;
    obj.name = 'Peter';
};

module.exports = {
    counter: counter,
    obj: obj,
    changeValue: changeValue,
};


// main.js
var mod = require('./lib');

console.log(mod.counter);  // 3
console.log(mod.obj.name);  //  'David'
mod.changeValue();
console.log(mod.counter);  // 3
console.log(mod.obj.name);  //  'Peter'

// Or
console.log(require('./lib').counter);  // 3
console.log(require('./lib').obj.name);  //  'Peter'
```

FIX:
可以借助取值函数（getter），将 counter 转为引用类型值，效果如下。

```js
// lib.js
var counter = 3;
function incCounter() {
  counter++;
}
module.exports = {
  get counter() {
    return counter
  },
  incCounter: incCounter,
};
```

### 使用场景

1. node server
2. webpack 多文件打包成 main.js

## amd

代表作: RequireJS

### 特点

1. 异步加载
2. defined 定义, requrie 加载
3. 依赖要提前定义好, 不能想用的时候再随意 require, 只要模块作为依赖时，就会加载并初始化
4. 写法不符合同步开发习惯

### 使用场景

1. 浏览器端

## cmd

代表作: SeaJS

CMD 推崇依赖就近，AMD 推崇依赖前置。

### 特点

1. 异步加载
2. defined 定义, requrie 加载
3. 模块作为依赖且被引用时才会执行 defined 方法，否则只会加载 js
4. 写法符合同步开发习惯, 在书写文件时，需要遵守CMD（Common Module Definition）模块定义规范
5. 一个文件就是一个模块, 类同 commonjs

### 使用场景

1. 浏览器端

## umd

UMD 是AMD 和 CommonJS的糅合

```js
(function (root, factory) {
    // commonjs
 if(typeof exports === 'object' && typeof module === 'object')
  module.exports = factory();
 else if(typeof define === 'function' && define.amd) // amd
  define([], factory);
 else if(typeof exports === 'object') // commonjs
  exports["app-react-main"] = factory();
 else
  root["app-react-main"] = factory(); // window
})(this, function() {})
```

## esm

### 特点

1. 输出的是值的引用，原始值变了，import 加载的值也会跟着变. commonjs则不可以, 需要借助 getter 实现相同结果
2. 编译时输出接口, 是静态定义, 而非对象, 在代码静态解析阶段就会生成, 此编译非 webpack 编辑, 是浏览器 js 引擎编译
   1. import 命令会被 JS 引擎静态分析，优先于模块内的其他内容执行
   2. export 命令会有变量声明提升的效果, **但具体对变量赋值需要等到执行到相应代码的 时候**
   3. 不能把 import 和 变量路径 if else 语句混写, 无法静态分析
3. 在文件中的任何位置引入 import 模块都会被提前到文件顶部
4. 重复引入某个相同的模块时，模块只会执行一次
5. 循环依赖: 由于是静态分析, export 变量提升且输出的是值得引用, import 优先执行, 所以即便循环依赖, 也能保证在任何时候都能获取其它模块当前的最新

```js
// lib.js
export let counter = 3;
export function incCounter() {
  counter++;
}

// main.js
import { counter, incCounter } from './lib';
console.log(counter); // 3
incCounter();
console.log(counter); // 4
```

## esm vs commonjs

1. 输出值: ems 输出的是值的引用, commonjs 输出的是 module.exports 对象的浅拷贝值
2. 引用值更新: ems 引用值永远是最新的, commonjs 引用值如果是引用类型可保持同步更新, 值类型不可以同步更新, 需要借助 getter 实现
3. 循环依赖:
   1. 共同点: 重复引入某个相同的模块时，模块只会执行一次
   2. 共同点: 都不会出现死循环引用
   3. 引用值取值: commonjs 会在 require 处停止往下执行, 先执行 require 中代码, 此时 exports 出去就是什么, ems 由于变量提升特殊待遇, 会保证引用值最新
4. 静态分析: js 引擎会对 import exports 关键字变量提升, 优先执行, commonjs 没有这个待遇
5. 写法: ems 中 import 不能混入变量 ifelse, commonjs 可以放肆写

## amd(RequireJS) vs cmd(SeaJS)

1. 模块加载方法: 并行加载所有依赖的模块
2. 模块执行顺序: SeaJS 同步顺序执行, 先执行主代码, 遇到 require, 执行模块的 define 方法, 同步顺序执行; RequireJS 优先执行依赖, 顺序有可能不是按照写依赖顺序执行, 执行完依赖后再执行主代码
3. 写法: SeaJS 类同 commonjs, 更爽
