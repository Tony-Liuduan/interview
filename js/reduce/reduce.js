// 如果数组为空且没有提供initialValue，会抛出TypeError 。
// 如果数组仅有一个元素（无论位置如何）并且没有提供initialValue，
// 或者有提供initialValue但是数组为空，
// 那么此唯一值将被返回并且callback不会被执行。
if (!Array.prototype.reduce) {
    Object.defineProperty(Array.prototype, 'reduce', {
        value: function (callback /*, initialValue*/) {
            if (this === null) {
                throw new TypeError('Array.prototype.reduce ' +
                    'called on null or undefined');
            }
            if (typeof callback !== 'function') {
                throw new TypeError(callback +
                    ' is not a function');
            }

            // 1. Let O be ? ToObject(this value).
            var o = Object(this);

            // 2. Let len be ? ToLength(? Get(O, "length")).
            var len = o.length >>> 0;

            // Steps 3, 4, 5, 6, 7      
            var k = 0;
            var value;

            if (arguments.length >= 2) {
                value = arguments[1];
            } else {
                while (k < len && !(k in o)) {
                    k++;
                }

                // 3. If len is 0 and initialValue is not present,
                //    throw a TypeError exception.
                if (k >= len) {
                    throw new TypeError('Reduce of empty array ' +
                        'with no initial value');
                }
                value = o[k++];
            }

            // 8. Repeat, while k < len
            while (k < len) {
                // a. Let Pk be ! ToString(k).
                // b. Let kPresent be ? HasProperty(O, Pk).
                // c. If kPresent is true, then
                //    i.  Let kValue be ? Get(O, Pk).
                //    ii. Let accumulator be ? Call(
                //          callbackfn, undefined,
                //          « accumulator, kValue, k, O »).
                if (k in o) {
                    value = callback(value, o[k], k, o);
                }

                // d. Increase k by 1.      
                k++;
            }

            // 9. Return accumulator.
            return value;
        }
    });
}



// // 同步写法
// [1, 3, 4].reduce(async (_, doc) => {
//     await _
//     await wait(doc);
// }, undefined);


// for (const iterator of object) {
//     await wait(iterator)
// }


// 异步写法
// [1, 3, 4].forEach(async (doc) => {
//     await wait(doc);
// });