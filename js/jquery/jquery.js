var JQuery = (function (window) {
    var JQuery = function () {
        return new JQuery.fn.init();
    }

    JQuery.fn = JQuery.prototype = {
        init: function () {

        },
        extend: function (object) {
            Object.assign(this, object);
        }
    }

    JQuery.fn.init.prototype = JQuery.fn;

    JQuery.extend = function (object) {
        Object.assign(this, object);
    }

    window.$ = JQuery;
    return JQuery;
})(window);

$.fn.extend({
    tip: function (x) {
        console.log('tip', x)
    }
});
$.extend({
    version: 1
});

$('#root').tip("test tip");
console.log($.version); 



// jquery 函数的重载
var addFun = function (target, key, fn) {
    let old = target[key];
    target[key] = function () {
        if (arguments.length === fn.length) {
            fn.apply(this, arguments);
        } else if (typeof old === 'function') {
            return old.apply(this, arguments);
        }
    }
}


var people = {};

addFun(people, 'find', function (a) {
    console.log(a);
});

addFun(people, 'find', function (a, b) {
    console.log(a, b);
});

addFun(people, 'find', function (a, b, c) {
    console.log(a, b, c);
});

console.log(people.find);

people.find(1);
people.find(1, 2);
people.find(1, 2, 3);



