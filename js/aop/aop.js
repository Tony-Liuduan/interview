/**
 * @fileoverview 面向切面编程示例 AOP
 * @author liuduan
 * @Date 2020-05-24 14:33:58
 * @LastEditTime 2020-05-24 14:58:48
 */

function foo() {
    console.log(2, this);
    return 2;
}


Function.prototype.before = function (fn) {
    var _self = this;
    return function (...args) {
        if (fn.apply(_self, args) === false) {
            return false;
        }
        return _self.apply(_self, args);
    };
}

Function.prototype.after = function (fn, ...args) {
    var _self = this;
    return function (...args) {
        var res = _self.apply(_self, args);
        if (res === false) {
            return false;
        }
        fn.apply(_self, args);
        return res;
    };
}


var res1 = foo.before(function () {
    console.log(1);
    return true;
}).after(function () {
    console.log(3);
})();

console.log('++++++++++', res1);

var res2 = foo.after(function () {
    console.log(3);
}).before(function () {
    console.log(1);
    return false;
})();

console.log('----------', res2);
