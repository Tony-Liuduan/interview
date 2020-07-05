/**
 * @fileoverview 
 * @author liuduan
 * @Date 2020-06-17 16:45:01
 * @LastEditTime 2020-06-17 16:52:21
 */
Object.defineProperty(Array.prototype, 'push', {
    value: function () {
        if (this == null) {
            throw new TypeError();
        }

        let o = Object(this);

        let l = o.length >>> 0;

        let al = arguments.length >>> 0;

        if (l + al > 2 ** 53 - 1) {
            throw new Error();
        }

        for (let index = 0; index < al; index++) {
            const element = arguments[index];
            o[l + index] = element;
        }

        o.length = l + al;

        return o.length;
    }
})