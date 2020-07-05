/**
 * @fileoverview 尾递归
 * @author liuduan
 * @Date 2020-07-04 16:17:09
 * @LastEditTime 2020-07-04 16:46:46
 */

/* 求n个数之和 */


// 实例1：会栈溢出 
// const sum = (n, preSum = 0) => {
//     if (n <= 1) return n + preSum;
//     return sum(n - 1, n + preSum);
// }

// console.log(sum(1000000)); 


// 实例2：不会栈溢出 
const sum0 = (n, preSum = 0) => {
    if (n <= 1) return n + preSum;
    return () => sum0(n - 1, n + preSum);
}
// 实际上就是把原本的递归改为了迭代，这样就不会有栈溢出的问题啦
function trampoline(fn) {
    return (...args) => {
        let result = fn(...args);
        while (typeof result === 'function') {
            result = result();
        }
        return result;
    }
}

const sum = trampoline(sum0);

console.log(sum(1000000));



// 实例3：不会栈溢出 
async function sump(n, preSum = 0) {
    if (n <= 1) return n + preSum;

    return await Promise.resolve().then(() => sump(n - 1, n + preSum));
}

sump(1000000).then(console.log)