/**
 * currying
 * 什什么是柯⾥里里化 ?
 * 在计算机科学中，柯⾥里里化(Currying)是把接受多个参数的函数变换成接受⼀一个单⼀一参数(最初函数的第⼀一个参数)的函数，
 * 并且返回接受余下的参数且返回结果的新函数的技术。
 * 
 */





// 实现curry方法，保证以下方法的调用
function multiFn(a, b, c) {
    console.log(a * b * c);
    return a * b * c;
}
var multi = curry(multiFn);
multi(2)(3)(4);
multi(2, 3, 4);
multi(2)(3, 4);
multi(2, 3)(4);




/* ********************************************************** */


// es5 低配写法
// function curry(fn) {
//     let fl = fn.length;
//     // 记录已经传递参数个数
//     let count = 0;
//     let args = [];
//     return function callback() {
//         count = count + arguments.length;
//         args = args.concat([...arguments]);
//         if (fl > count) {
//             return callback;
//         }
//         if (fl === count) {
//             fn(...args);
//         }
//     }
// }


// es6 骚写法
function curry(fn, arr = []) {
    return (...args) => {
        return (params => {
            if (params.length === fn.length) {
                return fn(...params);
            } else {
                return curry(fn, params);
            }
        })([...arr, ...args]);
    }
}
