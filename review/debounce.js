/**
 * @fileoverview 
 * @author liuduan
 * @Date 2020-06-17 17:37:01
 * @LastEditTime 2020-07-10 10:29:41
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

    return function () {
        if (timer == null) {
            timer = setTimeout(() => {
                timer = null;
            }, delay);

            return fn.apply(this, arguments);
        }
    }
}

// 4. 什么是节流函数
// 使用JS实现一个repeat方法
// function repeat(func, times, wait) {
//     // TODO
// }

// const repeatFunc = repeat(alert, 4, 3000)
// 调用这个 repeatFunc("hellworld") ，
// 会alert4次 helloworld, 每次间隔3秒

function repeat(fn, times, wait = 200) {
    let timer;
    let count = 0;

    return function dfs(...args) {
        if (count++ >= times) {
            return;
        }
        if (timer == null) {
            timer = setTimeout(() => {
                timer = null;
                dfs(...args);
            }, wait);

            return fn.apply(this, args);
        }
    }
}

const repeatFunc = repeat(console.log, 4, 300);
repeatFunc("hellworld");