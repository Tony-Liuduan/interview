/**
 * @fileoverview 043 统计所有小于非负整数 n 的质数的数量。
 * @author liuduan
 * @Date 2020-06-24 18:07:48
 * @LastEditTime 2020-06-24 18:27:28
 * https://leetcode-cn.com/problems/count-primes/
 */


/**
* @param {number} n
* @return {number}
*/
var countPrimes = function (n) {
    var count = 0;
    var arr = [];
    for (let i = 2; i < n; i++) {
        if (!arr[i]) {
            count++
            for (let j = 2 * i; j < n; j += i) {
                arr[j] = true
            }
        }
    }
    return count;
};
