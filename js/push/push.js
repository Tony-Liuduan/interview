// https://tc39.es/ecma262/#sec-array.prototype.push
// http://47.98.159.95/my_blog/js-array/010.html?nsukey=JOWEk%2FJrUUmzGF3BEiFKGm%2BWbWYEl4N73Xq%2BMSP5s2xLjySYsvynmyCSJx5E7vH12CioJjFngCgqycQ8qfmaAgpbiDDNjVG5nxrJT1WTkWjoqjTo%2FMKe7TEkFQozd1vhaYRU6dHDFUEjhnGgzM717Ndfp%2BvNtzyvSM7Wwm6xZIAAJuwuqElUg2bzpAwL5fUZ
if (!Array.prototype.push) {
    Array.prototype.push = function (...args) {
        const O = Object(this);

        const length = O.length >>> 0;

        const appLength = args.length >>> 0;

        if (length + appLength > 2 ** 53 - 1) {
            throw new TypeError("The number of array is over the max value restricted!")
        }

        for (let i = 0; i < appLength; i++) {
            O[length + i] = args[i];
        }


        O.length = length + appLength;

        return O.length;
    }
}


// Let O be ? ToObject(this value).
// Let len be ? LengthOfArrayLike(O).
// If IsCallable(callbackfn) is false, throw a TypeError exception.
// Let k be 0.
// Repeat, while k < len
// Let Pk be! ToString(k).
// Let kPresent be ? HasProperty(O, Pk).
// If kPresent is true, then
// Let kValue be ? Get(O, Pk).
//     Perform ? Call(callbackfn, thisArg, « kValue, k, O »).
// Set k to k + 1.
// Return undefined.

// forEach
// Array.prototype.forEach = function (callback) {
//     const O = Object(this);
//     let length = O.length >>> 0;

//     if (typeof callback !== 'function') {
//         throw TypeError('');
//     }

//     let i = 0;

//     while (i < length) {
//         if (i in O) {
//             callback.call(O, O[i], i);
//         }
//         i++;
//     }

//     return undefined;
// }