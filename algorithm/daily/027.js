/**
 * @fileoverview 027 回文数
 * @author liuduan
 * @Date 2020-06-03 14:11:37
 * @LastEditTime 2020-06-03 14:12:05
 * https://leetcode-cn.com/problems/palindrome-number/
 * 判断一个整数是否是回文数。回文数是指正序（从左向右）和倒序（从右向左）读都是一样的整数。
 */


/**
* @param {number} x
* @return {boolean}
*/
var isPalindrome = function (x) {
    if (x < 10) { return x >= 0; }
    if (x % 10 == 0) {
        return false;
    }
    let r = 0;
    while (x !== 0) {
        r = r * 10 + (x % 10);
        x = x / 10 | 0;
        if (r === x) return true;

        if (r > x) {
            console.log(r / 10 | 0, x, r, (r / 10 | 0) === x)
            return (r / 10 | 0) === x
        }
    }
};