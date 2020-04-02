if (!Function.prototype.apply) {
    Function.prototype.apply = function (context, args) {
        if (typeof this !== "function") {
            throw new TypeError("fn is not function");
        }

        if (context == null) {
            context = window || global;
        }

        const key = Symbol();
        // 装箱，保证基本类型变为复杂类型    
        context[key] = Object(this);
        const res = context[key](...args);
        delete context[key];
        return res;
    }
}

function test(...args) {
    console.log(this, ...args);
}


test.apply(null, document.getElementsByTagName("script"));
// test.apply({}, [3, 2, 3]);