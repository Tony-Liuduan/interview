/**
 * @fileoverview 025 整数拆分
 * @author liuduan
 * @Date 2020-06-02 10:24:13
 * @LastEditTime 2020-06-29 11:33:26
 * 
 * https://leetcode-cn.com/problems/integer-break/
 * 给定一个正整数 n，将其拆分为至少两个正整数的和，并使这些整数的乘积最大化。 返回你可以获得的最大乘积。
 * 
 * 输入: 10
 * 输出: 36
 * 解释: 10 = 3 + 3 + 4, 3 × 3 × 4 = 36。
 */


/**
* @param {number} n
* @return {number}
* 贪心算法
*/
var integerBreak = function (n) {
    if (n === 2) return 1;
    if (n === 3) return 2;
    // 1. 把整数拆分成a个3, a=n/3
    // 2. n%3 === 1, 说有有a个3，和一个1，将1和最后一个3合并，这样乘积最大, 3 * 3 * 3 * 1 < 3 * 3 * 4
    // 3. n%3 === 2, 说有有a个3，和一个2，直接 * 2 即可, 3 * 3 * 3 * 2 > 3 * 3 * 5

    let a = Math.floor(n / 3);
    let b = n % 3;

    switch (b) {
        case 0:
            return Math.pow(3, a);
        case 1:
            return Math.pow(3, a - 1) * 4;
        default:
            return Math.pow(3, a) * 2;
    }
};

// console.log(integerBreak(10));

/**
* @param {number} n
* @return {number}
* 动态规划
*/
var integerBreak = function (n) {
    let dp = new Array(n + 1).fill(1);
    // n = 4  
    // dp = [1, 1, 1, 1, 1];
    // n = 2, dp[2] = 1;
    // 从n=3开始规划
    // n = 3 可以拆分成 1 + (n - 1), 2 + (n - 2), 乘积就是 j * (i - j)
    // 但是i-j不能保证大于dp[i-j]，dp[i-j]是将数字i-j拆分成整数之和的最大乘积
    for (let i = 3; i <= n; i++) {
        for (let j = 1; j < i; j++) {
            dp[i] = Math.max(dp[i], j * (i - j), j * dp[i - j]);
        }
    }
    return dp[n];
};

console.log(integerBreak(10));