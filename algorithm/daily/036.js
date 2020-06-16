/**
 * @fileoverview 036 爬楼梯 === 斐波那契 === 动态规划
 * @author liuduan
 * @Date 2020-06-16 13:33:46
 * @LastEditTime 2020-06-16 13:38:18
 * https://leetcode-cn.com/problems/climbing-stairs/
 */
/**
 * @param {number} n
 * @return {number}
 */
var climbStairs = function (n) {
    let dp = [];
    dp[0] = 1;
    dp[1] = 1;
    // 公式 dp[n] = dp[n-1] + dp[n-2];

    for(let i = 2; i <= n; i++) {
        dp[i] = dp[i - 1] + dp[i - 2];
    }

    return dp[n];
};