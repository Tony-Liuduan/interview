/**
 * @fileoverview 039 剑指 Offer 46. 把数字翻译成字符串
 * @author liuduan
 * @Date 2020-06-19 17:55:08
 * @LastEditTime 2020-06-19 23:24:26
 * 给定一个数字，我们按照如下规则把它翻译为字符串：
 *  0 翻译成 “a” ，1 翻译成 “b”，……，11 翻译成 “l”，……，25 翻译成 “z”。
 * 一个数字可能有多个翻译。
 * 请编程实现一个函数，用来计算一个数字有多少种不同的翻译方法。
 */
/**
 * @param {number} num
 * @return {number}
 */
/* 动态规划 */
var translateNum = function (num) {
    let dp = [];
    dp[0] = 1;
    dp[1] = 1;

    let str = num.toString();
    let len = str.length;

    for (let i = 2; i <= len; i++) {
        // 公式 dp[n] = dp[n-1] + dp[n-2]
        const temp = Number(str[i - 2] + str[i - 1])
        if (temp >= 10 && temp <= 25) {
            dp[i] = dp[i - 1] + dp[i - 2]
        } else {
            dp[i] = dp[i - 1]
        }
    }
};


/**
 * @param {number} num
 * @return {number}
 */
/* 递归 */
var translateNum = function (num) {
    let str = num.toString();
    let len = str.length;

    // 下标是 pointer 的位置，值是对应子树的返回值
    const memo = new Array(len - 1);

    function dfs(str, pointer) {
        if (pointer >= len - 1) return 1;
        if (memo[pointer]) return memo[pointer]; // 之前存过，直接拿来用
        let tmp = str[pointer] + str[pointer + 1];

        if (tmp >= 10 && tmp <= 25) {
            // 将指针分别指向下一位和下两位，去递归计算路径
            memo[pointer] = dfs(str, pointer + 1) + dfs(str, pointer + 2);
        } else {
            memo[pointer] = dfs(str, pointer + 1);
        }

        return memo[pointer];
    }

    // 首次指针指向0位置
    return dfs(str, 0);

};