# GC

## 问题：
1. 请问变量a会被GC回收么，为什么呢?
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
> 原因：balaba
