// "use strict"

// 乞丐版
function foo() {
    console.log(this);
    if (this) {
        console.log(this.x);
    }
}

var obj = {
    x: 1,
    fn: foo,
};

// 严格模式传入null|undefined this就是传入值
// 非严格模式传入null|undefined this指向window
// 传入的是值类型，this指向new 值.constructor
// foo.call("ts");


// 盖中盖
// call 核⼼:
// 将函数设为对象的属性 执⾏行行 & 删除这个函数
// 指定 this 到函数并传⼊入给定参数执⾏行行函数 如果不不传⼊入参数，默认指向为 window
if (!Function.prototype.call) {
    Function.prototype.call = function (context, ...args) {
        if (typeof this !== "function") {
            throw new TypeError('Function.prototype.call - what is trying to be call is not callable');
        }

        // 非严格模式 not strict
        // 过滤 null | undefined
        // ps：严格模式 use strict 不过滤，传入null就直接指向null，传入undefined指向undefined
        if (context == null) {
            context = window || global;
        }

        const fn = Symbol();    
        // 装箱，保证基本类型变为复杂类型    
        context[fn] = Object(this);
        // ps：记得把返回值送回去
        const result = context[fn](...args);

        delete context[fn];
        
        return result;
    }
}




foo.call("ts");
foo.call(obj);