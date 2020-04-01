# 说透隐式类型转换
> 转载自：https://segmentfault.com/a/1190000016300245

以下内容包括: toString方法和valueOf方法以及Symbol.toPrimitive方法的学习

---

在js中，想要将对象转换成原始值，必然会调用toPrimitive()内部函数，那么它是如何工作的呢？

该函数形式如下：

### toPrimitive(input, preferedType?)

    input是输入的值，preferedType是期望转换的类型，他可以是字符串，也可以是数字。

    **如果转换的类型是number，会执行以下步骤**：

     1. 如果input是原始值，直接返回这个值；

     2. 否则，如果input是对象，调用input.valueOf()，如果结果是原始值，返回结果；

     3. 否则，调用input.toString()。如果结果是原始值，返回结果；

     4. 否则，抛出错误。

    **如果转换的类型是String，2和3会交换执行，即先执行toString()方法**。

    你也可以省略preferedType，此时，日期会被认为是字符串，而其他的值会被当做Number。

---

## valueOf()方法和toString()
```js
// 我们知道在js中，'一切皆为对象'。每个对象都有一个toString()方法和value方法，其中toString()方法返回一个表示该对象的字符串，value方法返回该对象的原始值。对于toString方法来说，当对象被表示为文本值或者当以期望字符串的方式引用对象时。该方法被自动调用。对于一个对象，toSting()返回"[object type]",其中type是对象类型。如果x不是对象，toString()返回应有的文本值。
// 对于valueOf() 方法来说，默认情况下, valueOf() 会被每个对象Object继承。每一个内置对象都会覆盖这个方法为了返回一个合理的值，如果对象没有原始值，valueOf() 就会返回对象自身。
// 但是注意，对于Null如果
// 不同类型的对象的value方法的返回值

// 对象	返回值
// Array	返回数组对象本身
// Boolean	布尔值
// Date	返回的时间是从1970年1月1日午夜开始计的毫秒数UTC
// Function	函数本身
// Number	数字值
// Object	对象本身。这是默认情况
// String	字符串值
// Math和Error对象没有valueOf方法
// 二者的使用场景以及区别与比较
// 通过来自MDN[!https://developer.mozilla.org...]上面对两个方法的介绍，我们得知。这两个方法都是Object原型链上的方法，被每个对象所继承。下面，我们看下该方法在两个应用场景下的区别。
// 1、对于值类型数据(又叫基本类型)场景下，toString及valueOf方法的使用


var str = "hello",n = 123,bool = true;

console.log(typeof(str.toString())+ "_"+ str.toString())        //string_hello
console.log(typeof(n.toString())+"_"+n.toString()  )            //string_123
console.log(typeof(bool.toString())+"_"+bool.toString())        //string_true
// toString放对于值类型数据使用而言，其效果相当于类型转换，将原类型转为字符串。

console.log(typeof(str.valueOf())+"_"+str.valueOf())            //string_hello
console.log(typeof(n.valueOf())+"_"+n.valueOf())                //number_123
console.log(typeof(bool.valueOf())+"_"+bool.valueOf())          //boolean_true

console.log(str.valueOf === str) //  // true
console.log(n.valueOf === n) //   // true
console.log(bool.valueOf() === bool) // true
// 由上面的例子可以得出，
// toString方法对于值类型数据使用而言，其效果相当于类型转换，将原类型转为字符串。
// valueOf方法对于值类型数据使用而言，其效果将相当于返回原数据。
// 2、复合对象类型数据使用toString及valueOf方法

var obj = {};

console.log(obj.toString());    //[object Object] 返回对象类型
console.log(obj.valueOf());     //{} 返回对象本身
// 可以看到与方法介绍中所说一致。下面让我们看下，具体两个方法是如何执行的。

var test = { 
 i: 10, 
 toString: function() { 
 console.log('toString'); 
 return this.i; 
 }, 
 valueOf: function() { 
 console.log('valueOf'); 
 return this.i; 
 } 
} 
alert(test);// 10 toString 
alert(+test); // 10 valueOf 
alert(''+test); // 10 valueOf 
alert(String(test)); // 10 toString 
alert(Number(test)); // 10 valueOf 
alert(test == '10'); // true valueOf 
alert(test === '10'); // false
// 其中，第一个alert,我们可以看到调用了toString方法，说明alert这里是需要一个字符串，这样我们可以推测,toString()方法一般不需要我们主动去显示的调用，符合对象类型会在相应的场景中调用适合的方法，返回适当类型的值。
// 第二个，这里通过alert我们知道这里依然是需要一个字符串的值，所以这里是+test调用了toString方法。而对于test,调用valueOf方法。在有运算操作符的情况下,valueOf的优先级要高一点。可以看一个例子。

var ab = { 
  i: 1, 
  valueOf: function () { 
    alert("你调用了a的valueOf函数"); 
    return this.i; 
  }, 
  toString: function () { 
    alert("你调用了a的toString函数"); 
    return this.i; 
  } 
}; 
var c = { 
  i: +ab, 
  valueOf: function () { 
    alert("你调用了c的valueOf函数"); 
    return this.i; 
  }, 
  toString: function () { 
    alert("你调用了c的toString函数"); 
    return this.i; 
  } 
}; 
alert(c);


// 第三个，同样我们可以把上面的例子改为。

var c = { 
  i: ''+ab, 
  valueOf: function () { 
    alert("你调用了c的valueOf函数"); 
    return this.i; 
  }, 
  toString: function () { 
    alert("你调用了c的toString函数"); 
    return this.i; 
  } 
}; 
alert(c);
// 第四个，String方法是要返回一个字符串类型，所以这里调用了toString()方法。
// 第五个,强转换为数字类型，调用了valueOf方法。
// 第六个,这个里面的判等的顺序是，获取原始值，然后判断两边的原始值是否相等，所以调用valueOf。
// 第七个,alert(bbb === '10'); // false
// ===操作符不进行隐式转换，判全等的第一个步骤是判断类型，因为类型都不一样了，所以后面什么都不会调用.
// 总结：
// 1、在进行强转字符串类型时将优先调用toString方法，强转为数字时优先调用valueOf。
// 2、在有运算操作符的情况下，valueOf的优先级高于toString。
// 这两个方法一般是交由js去隐式调用，以满足不同的运算情况。
// 在数值运算里，会优先调用valueOf()，如 a + b;
// 在字符串运算里，会优先调用toString(),如alert(c).

// 补充下toString()方法和String()方法的区别
// toString()方法和String()方法都可以转换为字符串类型。
// 1、toString()可以将所有的数据都转换为字符串，但是要排除null和undefined

var str = false.toString();
console.log(str, typeof str);         //false, string
// 但是 null和undefined不能转换为字符串,null和undefined调用toString()方法会报错

var str = null.toString();
var str = undefined.soString();
// 如果当前数据为数字类型，则toString()括号中的可以写一个数字，代表进制，可以将数字转化为对应进制字符串。

var num = 123;
console.log(num.toString()+'_'+ typeof(num.toString()));    //123_string
console.log(num.toString(2)+'_'+typeof(num.toString()));    //1111011_string
console.log(num.toString(8)+'_'+typeof(num.toString()));    //173_string
console.log(num.toString(16)+'_'+typeof(num.toString()));   //7b_string
// 2、String()可以将null和undefined转换为字符串，但是没法转进制字符串。当 String() 和运算符 new 一起作为构造函数使用时，它返回一个新创建的 String 对象，存放的是字符串 s 或 s 的字符串表示。

var str = new String("123");
console.log(str+"_"+typeof(str));     //123_object
// 当不用 new 运算符调用 String() 时，它只是把s转换成原始的字符串，并返回转换后的值。

var str = String(s);
console.log(str+"_"+typeof(str))                      //123_string

```
---

## Symbol.toPrimitive(preferedType?)

```js
// 对象的Symbol.toPrimitive属性。指向一个方法。该对象被转化为原始类型的值时，会调用这个办法，返回该对象对应的原始类型值。
// Symbol.toPrimitive被调用时,会接受一个字符串参数，表示当前运算的模式，一个有三种模式。

// Number:该场合需要转成数值
// String:该场合需要转成字符串
// Default:该场合可以转成数值，也可以转成字符串。
// 以上内容来自阮老师的ES6入门，下面我们结合几个例子，具体看下Symbol.toPrimitive是如何被调用的。

// 没有 Symbol.toPrimitive 属性的对象
var obj1 = {};
console.log(+obj1);       //NaN
console.log(`${obj1}`);   //"[object Object]"
console.log(obj1 + "");   //"[object Object]"
// 上面的结果我们可以通过上面说的toSting()方法和value方法去理解。
// 第一个，+符号。可以看成是是把数据转化为数字类型，由于obj是个空对象，所以结果是NaN
// 第二个，是es6中的字符串的新语法，这里需要的结果是一个字符串，所以使用的是toString()方法，而toString()方法返回的是对象的类型。
// 第三个，这里是连接符连接obj。实际上也是需要字符串的结果，所以同理。

// 拥有 Symbol.toPrimitive 属性的对象
var obj2 = {
  [Symbol.toPrimitive](hint) {
    if(hint == "number"){
        return 10;
    }
    if(hint == "string"){
        return "hello";
    }
    return true;
  }
}

console.log(+obj2);     //10    --hint in "number"
console.log(`${obj2}`); //hello --hint is "string"
console.log(obj2 + ""); //"true"
// 拥有 Symbol.toPrimitive 属性的对象
let obj = {
  [Symbol.toPrimitive](hint) {
    if(hint === 'number'){
      console.log('Number场景');
      return 123;
    }
    if(hint === 'string'){
      console.log('String场景');
      return 'str';
    }
    if(hint === 'default'){
      console.log('Default 场景');
      return 'default';
    }
  }
}
console.log(2*obj); // Number场景 246
console.log(3+obj); // String场景 3default
console.log(obj + "");  // Default场景 default
console.log(String(obj)); //String场景 str
// 由以上例子可以总结，一般情况下，+连接运算符传入的参数是default,而对于乘法等算数运算符传入的是number。对于String(str),${str}等情况，传入的参数是defalut。

// Symbol.toPrimitive和toString、valueOf
// 当然，你也可以重写一个不做参数判断的Symbol.toPrimitive方法，结合上面提到的toString,可以有以下例子。

let ab = {
    valueOf() {
        return 0;
    },
    toString() {
        return '1';
    },
    [Symbol.toPrimitive]() {
        return 2;
    }
}
console.log(1+ab);
console.log('1'+ab);
// 可以看到，Symbol.toPrimitive方法在转换基本类型的时候优先级最高。


```


## about Function
```js
typeof (function () {}).prototype === 'object';
(() => {}).__proto__ === Function.prototype;


// 箭头函数 是一个function 但是没有prototype
(() => {}).prototype === undefined;
typeof Function.prototype === 'function';
// Function.prototype 是一个function 但是没有prototype
Function.prototype.prototype === undefined;
// bind返回一个function 但是没有prototype
(function () {}).bind(null).prototype === undefined;



Function.prototype.valueOf === Object.prototype.valueOf;
Function.prototype.toString !== Object.prototype.toString;
```