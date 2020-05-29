/**
 * @fileoverview 024 和为s的连续正数序列
 * @author liuduan
 * @Date 2020-05-29 17:18:34
 * @LastEditTime 2020-05-29 17:56:05
 * https://leetcode-cn.com/problems/he-wei-sde-lian-xu-zheng-shu-xu-lie-lcof/
 * 输入一个正整数 target ，输出所有和为 target 的连续正整数序列（至少含有两个数）。
 * 序列内的数字由小到大排列，不同序列按照首个数字从小到大排列。
 */
/**
 * @param {number} target
 * @return {number[][]}
 */
var findContinuousSequence = function (target) {
    if (target < 3) {
        return [];
    }
    let middle = Math.ceil(target / 2);

    let res = [];
    let len = 2;
    let cur = middle;

    while (len < middle && cur >= len) {
        let end = cur - len + 1;
        let s = len * (cur + end) / 2;
        if (s === target) {
            res.unshift(Array.from({ length: len }, (item, i) => i + end));
            cur--;
        } else if (s > target) {
            cur--;
        } else {
            len++;
        }
    }

    return res;
};


/**
 * @param {number} target
 * @return {number[][]}
 */
var findContinuousSequence = function (target) {
    if (target < 3) {
        return [];
    }
    // 双指针法，从1，2开始计算
    let a = 1;
    let b = 2;
    let sum = a + b;
    let res = [];
    let middle = Math.ceil(target / 2);

    while (a !== b && b <= middle) {
        if (sum === target) {
            res.push(Array.from({ length: b - a + 1 }, (item, i) => i + a));
            b++;
            sum += b;
        } else if (sum > target) {
            sum -= a;
            a++;
        } else {
            b++;
            sum += b;
        }
    }
    return res;
};