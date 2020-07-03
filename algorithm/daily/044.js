/**
 * @fileoverview 044 快乐数
 * @author liuduan
 * @Date 2020-06-24 18:07:53
 * @LastEditTime 2020-07-03 12:53:01
 * https://leetcode-cn.com/problems/happy-number/
 * 
 * 输入：19
输出：true
解释：
12 + 92 = 82
82 + 22 = 68
62 + 82 = 100
12 + 02 + 02 = 1
 */

 
/**
* @param {number} n
* @return {boolean}
*/
var isHappy = function (n) {
    let map = new Map()

    while (n !== 1) {
        if (map[n]) return false
        map[n] = 1;
        n = String(n).split('').reduce((a, b) => a + b ** 2, 0);
    }

    return true;
};