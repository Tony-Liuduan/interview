/**
 * @fileoverview 
 * @author liuduan
 * @Date 2020-06-17 16:06:09
 * @LastEditTime 2020-06-17 16:32:37
 */
// [].reduce(function (a, b) {
//     console.log(a, b, this);
// }, {})
Object.defineProperty(Array.prototype, 'reduce', {
    value: function (cb) {

        if (this == null) {
            throw new TypeError();
        }

        if (typeof cb !== 'function') {
            throw new TypeError();
        }

        let o = Object(this);

        let l = o.length >>> 0;

        let k = 0;

        let value;

        if (arguments.length >= 2) {
            value = arguments[1];
        } else {
            while (k < l && !o.hasOwnProperty(k)) {
                k++;
            }

            if (k >= l) {
                throw new Error();
            }

            value = o[k++];
        }

        while (k < l) {

            if (k in o) {
                value = cb(value, o[k], k, o);
            }
            k++;
        }

        return value;
    }
})
