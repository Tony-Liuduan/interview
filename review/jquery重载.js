/**
 * @fileoverview 
 * @author liuduan
 * @Date 2020-07-14 09:32:45
 * @LastEditTime 2020-07-14 09:41:32
 */

function addFun(target, key, callback) {
    let foo = target[key];

    target[key] = function (...args) {
        if (args.length === callback.length) {
            callback.apply(this, args);
        } else if (typeof foo === 'function') {
            return foo.apply(this, args);
        }
    }
}

var obj = {};

addFun(obj, 'find', function (a) {
    console.log(a);
});
addFun(obj, 'find', function (a, b) {
    console.log(a, b);
});
addFun(obj, 'find', function (a, b, c) {
    console.log(a, b, c);
});

obj.find(1);
obj.find(2, 3);
obj.find(4, 5, 6);
