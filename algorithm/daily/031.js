/**
 * @fileoverview 031 加1
 * @author liuduan
 * @Date 2020-06-09 13:40:07
 * @LastEditTime 2020-06-09 13:41:09
 * https://leetcode-cn.com/problems/plus-one/
 * 
 * 给定一个由整数组成的非空数组所表示的非负整数，在该数的基础上加一。
 * 最高位数字存放在数组的首位，数组中每个元素只存储单个数字。
 * 你可以假设除了整数 0 之外，这个整数不会以零开头。
 * 输入: [1,2,3]
 * 输出: [1,2,4]
 * 解释: 输入数组表示数字 123 + 1 = 124 ：[1,2,4]
 */
/**
 * @param {number[]} digits
 * @return {number[]}
 */
var plusOne = function (digits) {
    let l = digits.length;
    let res = [];
    let cur = 1;
    for (let i = l - 1; i >= 0; i--) {
        let v = digits[i];
        let r = v + cur;
        if (r < 10) {
            res.unshift(r);
            cur = 0;
        } else {
            res.unshift(r % 10);
            cur = 1;
        }
    }

    if (cur === 1) {
        res.unshift(1);
    }
    return res;
};