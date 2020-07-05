/**
 * @fileoverview 
 * @author liuduan
 * @Date 2020-06-17 16:56:26
 * @LastEditTime 2020-06-17 17:02:54
 */
Object.defineProperty(Function.prototype, 'call', {
    value: function (o, ...args) { 
        if (typeof this !== 'function') {
            throw new Error();
        }

        let context

        if (o == null) {
            context = gloablThis;
        } else {
            context = Object(o);
        }

        let tag = Symbol();

        context[tag] = this;
        
        const res = context[tag](...args);

        delete context[tag];

        return res;

    }
})