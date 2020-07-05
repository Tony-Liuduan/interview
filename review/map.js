Object.defineProperty(Array.prototype, 'map', {
    value: function (cb) {
        if (this == null) {
            throw new TypeError();
        }

        let o = Object(this);

        let l = o.length >>> 0;

        let k = 0;
        let T;

        while (k < l && !(k in o)) {
            k++;
        }

        if (k >= l) {
            throw new Error();
        }
        if (arguments.length >= 2) {
            T = arguments[1];
        }

        let result = new Array(l);

        while(k < l) {
            if (k in o) {
                let v = cb.call(T, o[k], k, o);

                result[k] = v;
            }

            k++;
        }

        return result;
    }
})
