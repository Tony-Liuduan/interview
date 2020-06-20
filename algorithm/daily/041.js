/**
 * @fileoverview 041 重复数组 剑指offer
 * @author liuduan
 * @Date 2020-06-20 12:15:36
 * @LastEditTime 2020-06-20 12:16:09
 * https://leetcode-cn.com/problems/shu-zu-zhong-zhong-fu-de-shu-zi-lcof/
 * 在一个长度为 n 的数组 nums 里的所有数字都在 0～n-1 的范围内。
 * 数组中某些数字是重复的，但不知道有几个数字重复了，也不知道每个数字重复了几次。
 * 请找出数组中任意一个重复的数字。。
 */

/**
* @param {number[]} nums
* @return {number}
*/
var findRepeatNumber = function (nums) {
    // 原地交换
    let l = nums.length;
    let cur = 0;

    while (cur < l) {
        let val = nums[cur];
        // 数字出现位置正确，继续往下遍历
        if (val === cur) {
            cur++;
            continue;
        }

        // 如果当前位置值是3，他本应该出现在索引是3的位置，如果交换前就已经出现在了本应属于他的位置，则判为重复值
        if (nums[val] === val) return val;

        // 数字出现位置不对，需要把数字交换到他本应该在的位置去，公式  值 === 索引
        let tmp = nums[val];
        nums[cur] = tmp;
        nums[val] = val;
    }

    return -1;
};