/**
 * @fileoverview 
 * @author liuduan
 * @Date 2020-07-08 17:18:02
 * @LastEditTime 2020-07-09 10:02:53
 */
function createThrottle(max = 2, timeout = 2000) {
    let cur = 0;
    let queue = [];
    function throttle(fn, url) {
        return new Promise((resolve, reject) => {
            function handleFn() {
                if (cur < max) {
                    throttle.current = ++cur;
                    let timer;
                    let isTimeout = false;
                    fn()
                        .then((res) => {
                            resolve(res);
                            !isTimeout && handleComplete();
                        })
                        .catch((e) => {
                            resolve(e);
                            !isTimeout && handleComplete();
                        });

                    timer = setTimeout(() => {
                        isTimeout = true;
                        resolve(new Error(url, 'timeout'));
                        handleComplete();
                    }, timeout);

                    function handleComplete() {
                        clearTimeout(timer);
                        throttle.current = --cur;
                        if (queue.length > 0) {
                            queue.shift()();
                        }
                    }

                } else {
                    queue.push(handleFn);
                }
            }

            handleFn();
        });
    };

    throttle.current = cur
    throttle.queue = queue

    return throttle;
}

module.exports = createThrottle;