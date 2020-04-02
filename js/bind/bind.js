// "use strict"
if (!Function.prototype.bind) {
    Function.prototype.bind = function (context, ...args) {
        const toBindFn = this;

        if (typeof toBindFn !== "function") {
            throw new TypeError("fn is not function");
        }

        // 下面这一行仅仅生效与非严格模式，严格模式就无此代码，通call、apply
        if (context == null) {
            context = window || global;
        }

        const fNOP = function () { };

        const fn = function () {
            // 绑定函数也可以使用 new 运算符构造，它会表现为目标函数已经被构建完毕了似的。提供的 this 值会被忽略，但前置参数仍会提供给模拟函数。
            let target;
            if (fNOP[Symbol.hasInstance](this)) {
                target = this;
            } else {
                target = Object(context);
            }

            return toBindFn.apply(target, [...args, ...arguments]);
        }

        // 有三种情况方法没有prototype属性
        // 1. 箭头函数
        // 2. Function.prototype
        // 3. bind返回的函数
        if (toBindFn.prototype) {
            fNOP.prototype = toBindFn.prototype;
        }

        // 原型基础，保证constructor指向
        fn.prototype = Object.create(fNOP.prototype, {
            constructor: {
                value: toBindFn,
            },
        });

        return fn;

    }
}

function test(a, b, c) {
    console.log(this, a, b, c);
}

test.prototype.x = 1;


const nt = test.bind(undefined, 'w', '2');
nt(3);
const x = new nt();
console.log(x, x.constructor);
