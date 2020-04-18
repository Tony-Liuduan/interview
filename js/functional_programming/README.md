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
    - 反curry
    - 偏函数，入参无序执行，有占位符，不一定每次参数都要使用，例如：bind、setTimeout
* 组合compose，按照执行的从右到左顺序死流程执行 && 一元函数
    - map 投影函数
    - pipi
* 组合子：控制函数执行的流程，只做这一件事(filter、sort、tap(弃离)、alt(交换)、compose...)
* pointfree：借用compose减少不必要的命名、变量声明，让代码保持简洁通用
* 声明式代码：类SQL数据
    - 命令式：for循环
    - 声明式：map
* 惰性链、惰性求值、惰性函数：尽可能的推迟执行，shortcut，把map、filter融合到一起执行
    - 惰性函数式：在函数内部判断后，修改函数的值
* 高阶函数
* **递归to尾递归**
    - 递归：容易栈溢出
    - 尾递归：函数的最后一步调用自身，不留执行记录，减少爆栈可能性，v8合并帧不支持，防止错误堆栈丢失
    - 尾调用
    - while：好于递归
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
