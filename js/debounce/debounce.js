/* 防抖 */
function debounce(fn, delay = 200, immediate) {
    let timer;
    return function () {
        if (timer === undefined && immediate) {
            fn.apply(this, arguments);
        }
        if (timer) {
            clearTimeout(timer);
        }
        timer = setTimeout(() => {
            clearTimeout(timer);
            fn.apply(this, arguments);
        }, delay);
    }
}



document.getElementById("input1").oninput = debounce(function (e) {
    console.log("oninput", e.target.value);
}, 200, true);


/* 节流 */
function throttle(fn, delay = 500, immediate) {
    let timer;
    let cur;
    return function () {
        let now = + new Date();
        if (cur === undefined) {
            cur = now;
        }
        let duration = now - cur;
        if (duration >= delay || (immediate && duration === 0)) {
            cur = now;
            fn.apply(this, arguments);
        } else {
            timer && clearTimeout(timer);
            timer = setTimeout(() => {
                fn.apply(this, arguments);
            }, delay);
        }
    }
}


document.getElementById("input2").oninput = throttle(function (e) {
    console.log(e.target.value, "throttle");
}, 200, true);
