# Interview

> https://juejin.im/post/5e7d4e8b6fb9a03c6422f112

```sh
http-server
```


1. 问：以下块级作用域代码执行结果是？
```js
{
    var a = 1;
    const b = 2; function test(){}
    test = 3;
    console.log(typeof test) 
}
console.log(a) 
console.log(typeof test) 
console.log(b)
```

2. 问：es6的元编程是啥？


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

