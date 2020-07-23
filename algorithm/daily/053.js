/**
 * @fileoverview 最大连续1的个数 III
 * @author liuduan
 * @Date 2020-07-22 21:11:23
 * @LastEditTime 2020-07-22 21:15:25
 * https://leetcode-cn.com/problems/max-consecutive-ones-iii/
 * 
 */

/* 

输入：A = [1,1,1,0,0,0,1,1,1,1,0], K = 2
输出：6
解释： 
[1,1,1,0,0,1,1,1,1,1,1]
粗体数字从 0 翻转到 1，最长的子数组长度为 6。
*/

/**
 * @param {number[]} A
 * @param {number} K
 * @return {number}
 */
var longestOnes = function (A, K) {
    // int left(0), right(0);
    // int max(0);
    // while (left <= right && right < A.size()) {
    //     while (right < A.size() && (A[right] || K != 0)) {
    //         if (!A[right]) K--;
    //         right++;
    //     }
    //     max = std:: max(right - left, max);
    //     if (A[left]) left++;
    //     else left++, right++;
    // }
    // return max;
    let n = A.length;
    let l = 0;
    let r = 0;

    let max = 0;

    while (l <= r && r < n) {

        while (r < n && (A[r] || K > 0)) {
            if (!A[r]) K--;
            r++;
        }

        max = Math.max(r - l, max);

        if (A[l]) {
            l++;
        } else {
            l++;
            r++;
        }
    }

    return max;
};