/**
 * @fileoverview 
 * @author liuduan
 * @Date 2020-06-17 17:37:01
 * @LastEditTime 2020-06-27 19:43:49
 */
function debounce(fn, delay = 200, immediate = false) {
    let timer;

    return function () {
        if (timer === undefined && immediate) {
            fn.apply(this, arguments);
        }

        if (timer != null) {
            clearTimeout(timer);
        }

        timer = setTimeout(() => {
            clearTimeout(timer);
            fn.apply(this, arguments);
        }, delay);
    }
}



function throller(fn, delay) {
    let timer;

    return function() {
        if (timer == null) {
            timer = setTimeout(() => {
                timer = null;
            }, delay);

            return fn.apply(this, arguments);
        }
    }
}