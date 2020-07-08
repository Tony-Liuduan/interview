/**
 * @fileoverview 
 * @author liuduan
 * @Date 2020-07-08 17:18:02
 * @LastEditTime 2020-07-08 17:27:57
 */
function asyncThrottle(max) {
    if (typeof max !== 'number') {
        throw new TypeError('max must be a number');
    }

    let cur = 0;
    let queue = [];

    function throttle(fn, ...args) {
        return new Promise((resolve, reject) => {
            function handleFn() {
                if (cur < max) {
                    cur++;
                    fn(args)
                        .then(handleComplete)
                        .catch(handleComplete)

                } else {
                    queue.push(handleFn)
                }

            }

            handleFn();

            function handleComplete(res) {
                cur--;
                if (res instanceof Error) {
                    reject(res);
                } else {
                    resolve(res)
                }

                if (queue.length > 0) {
                    queue.shift()();
                }
            }
        });
    }

    return throttle;
}


module.exports = asyncThrottle;