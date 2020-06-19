/**
 * @fileoverview 040 青蛙变态跳台阶
 * @author liuduan
 * @Date 2020-06-19 23:36:33
 * @LastEditTime 2020-06-20 00:13:20
 * https://leetcode-cn.com/problems/qing-wa-tiao-tai-jie-wen-ti-lcof/
 * 一只青蛙一次可以跳上1级台阶，也可以跳上2级台阶。求该青蛙跳上一个 n 级的台阶总共有多少种跳法。
 */

// f(n) = f(n-1) + f(n-2)
// f(3) = f(2) + f(1)
// f(2) = f(1) + f(0)
// f(1) = 1;
// f(0) = 1;

/**
 * @param {number} n
 * @return {number}
 */
var numWays = function (n) {
    const dp = [];
    dp[0] = 1;
    dp[1] = 1;

    for (let i = 2; i <= n; i++) {
        dp[i] = (dp[i - 1] + dp[i - 2]) % 1000000007;
    }

    return dp[n];
};