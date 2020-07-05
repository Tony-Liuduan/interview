/**
 * @fileoverview 
 * @author liuduan
 * @Date 2020-06-17 17:10:26
 * @LastEditTime 2020-06-17 17:30:05
 */
Object.defineProperty(Function.prototype, 'binds', {
    value: function (ctx, ...args) {

        if (typeof this !== 'function') {
            throw new TypeError();
        }

        if (ctx == null) {
            ctx = globalThis;
        } else {
            ctx = Object(ctx);
        }

        let originFn = this;

        function FNop() {
            
        }

        if (originFn.prototype) {
            FNop.prototype = originFn.prototype
        }

        function outputFn() {
            let target = ctx;
            if (this instanceof FNop) {
                target = this;
            }
            return originFn.apply(target, [...args, ...arguments])
        }

        outputFn.prototype = Object.create(FNop.prototype, {
            constructor: {
                value: originFn,
            },
        });

        return outputFn;
        
    }
})
