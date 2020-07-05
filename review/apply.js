/**
 * @fileoverview 
 * @author liuduan
 * @Date 2020-06-17 17:06:48
 * @LastEditTime 2020-06-17 17:09:27
 */
Object.defineProperty(Function.prototype, 'apply', {
    value: function (ctx, args) {
        if (typeof this !== "function") {
            throw new TypeError();
        }

        if (ctx == null) {
            ctx = globalThis;
        } else {
            ctx = Object(o);
        }

        let tag = Symbol();

        ctx[tag] = this;

        let res = ctx[tag](...args);

        delete ctx[tag];

        return res;
    },
})