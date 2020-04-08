Function.prototype.uncurrying = function () {
    var that = this;
    return function () {
        return that.call(...arguments)
        // return Function.prototype.call.apply(that, arguments);
        
        // that["a"] = Function.prototype.call;
        // that["a"](a1, a2, a3);

        // call内部调用
        // a1['c'] = that;
        // a1['c'](a2, a3);

    }
};

function sayHi() {
    return "Hello " + this.value + " " + [].slice.call(arguments);
}

var sayHiuncurrying = sayHi.uncurrying();
console.log(sayHiuncurrying({ value: 'world' }, "hahaha"));


// var uncurrying = function (fn) {
//     return function () {
//         var args = [].slice.call(arguments, 1);
//         return fn.apply(arguments[0], args);
//     }
// };

var uncurrying = function (fn) {
    return function () {
        return Function.prototype.call.apply(fn, arguments);
    }
}



var $ = {};
console.log($.push);
var pushUncurrying = uncurrying(Array.prototype.push);
$.push = function (obj) {
    pushUncurrying(this, obj);
};
$.push('first');


var call = uncurrying(Function.prototype.call);
var fn = function (str) {
    console.log(this.value + str);
};
var obj = { value: "Foo " };
call(fn, obj, "Bar!");  