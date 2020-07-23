/**
 * @fileoverview  长度最小的子数组
 * @author liuduan
 * @Date 2020-07-22 18:01:59
 * @LastEditTime 2020-07-22 20:00:17
 */

/*
给定一个含有 n 个正整数的数组和一个正整数 s，
找出该数组中满足其和 ≥ s 的长度最小的 连续 子数组，
并返回其长度。如果不存在符合条件的子数组，返回 0。


输入：s = 7, nums = [2,3,1,2,4,3] [1, 2, 2, 3, 3, 4]
输出：2
解释：子数组 [4,3] 是该条件下的长度最小的子数组。
*/


/**
 * @param {number} s
 * @param {number[]} nums
 * @return {number}
 */
var minSubArrayLen = function (s, nums) {
    let n = nums.length;
    let l = 0;
    let r = 0;

    let sum = 0;
    let min = 0;

    while (r < n) {
        let vl = nums[l];
        let vr = nums[r];

        sum += vr;

        if (sum >= s) {
            if (sum === s) {
                min = Math.min(min, r - l + 1);
            }
            // 左指针右移
            sum -= nums[l];
            l++;
        }

        // 右指针右移
        r++;
    }

    return min;
};