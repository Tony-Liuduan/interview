/*
 * @Author: liuduan
 * @Date: 2020-04-27 11:45:37
 * @LastEditors: liuduan
 * @LastEditTime: 2020-04-27 12:35:41
 * @Description: 斐波那契数列
 * 
 * https://leetcode-cn.com/problems/fei-bo-na-qi-shu-lie-lcof/
 * 
 * 
 * 写一个函数，输入 n ，求斐波那契（Fibonacci）数列的第 n 项。斐波那契数列的定义如下：
 * F(0) = 0, F(1) = 1
 * F(N) = F(N - 1) + F(N - 2), 其中 N > 1.
 * 斐波那契数列由 0 和 1 开始，之后的斐波那契数就是由之前的两数相加而得出。
 */


var _fib = function (n) {
    if (n < 0) {
        return 0;
    }

    let cache = [];
    let res = (function calculate(n) {
        if (n === 1 || n === 0) {
            cache[n] = n;
            return n;
        }
        cache[n] = (cache[n - 1] || calculate(n - 1)) + (cache[n - 2] || calculate(n - 2));
        return cache[n] % 1000000007;
    })(n);
    cache = null;
    return res;
};

console.time();
console.log(_fib(1000), _fib(1476), _fib(50));
console.timeEnd();


// 动态规划题解
function fib(n) {
    if (n < 0) {
        return 0n;
    }
    if (n == 0 || n == 1) {
        return n;
    }
    let f1 = 0n, f2 = 1n;
    for (let i = 1n; i < n; i++) {
        let sum = f2 + f1;
        f1 = f2;
        f2 = sum;
    }
    return f2 % 1000000007n;
}

console.time();
console.log(fib(10000), fib(1476), fib(50));
console.timeEnd();