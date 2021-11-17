/**
 * @fileoverview https://leetcode-cn.com/problems/lian-xu-zi-shu-zu-de-zui-da-he-lcof/submissions/
 * 剑指 Offer 42. 连续子数组的最大和
 */

/**
 * @param {number[]} nums
 * @return {number}
 */
var maxSubArray = function (nums) {
    const l = nums.length;

    if (!l) {
        return 0;
    }

    let max = nums[0];

    if (l === 1) {
        return max;
    }

    let dp = new Array(l);
    let i = 1;
    dp[0] = nums[0];


    for (; i < l; i++) {
        const v = nums[i];
        dp[i] = Math.max(v, dp[i - 1] + v);
        max = Math.max(max, dp[i]);
    }

    console.log(dp, max);

    return max;
};

var maxSubArray = function (nums) {
    const l = nums.length;

    if (!l) {
        return 0;
    }

    let max = nums[0];

    if (l === 1) {
        return max;
    }

    let i = 1;
    let dpi = max;

    for (; i < l; i++) {
        const v = nums[i];
        dpi = dpi > 0 ? dpi + v : v;
        max = Math.max(max, dpi);
    }

    console.log(max);

    return max;
};

const testCase = [-2, 1, -3, 4, -1, 2, 1, -5, 4];

maxSubArray(testCase);
maxSubArray([4, 5, -1, -3, 8, -2]);