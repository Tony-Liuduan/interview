/**
 * @fileoverview 032 删除排序数组中的重复项
 * @author liuduan
 * @Date 2020-06-10 13:55:32
 * @LastEditTime 2020-06-10 13:55:47
 * https://leetcode-cn.com/problems/remove-duplicates-from-sorted-array/
 */

/**
* @param {number[]} nums
* @return {number}
*/
var removeDuplicates = function (nums) {
    let l = nums.length;
    let cur1 = 0;
    let cur2 = 1;

    while (cur2 < l) {
        let v1 = nums[cur1];
        let v2 = nums[cur2];
        // 关键一步，将下一个位置安排给不同的人
        if (v1 !== v2) {
            nums[++cur1] = v2;
        }
        cur2++;
    }
    return cur1 + 1;
};