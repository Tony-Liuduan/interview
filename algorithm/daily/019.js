/**
 * @fileoverview 
 * @author liuduan
 * @Date 2020-05-22 13:44:42
 * @LastEditTime 2020-05-22 13:45:24
 * 和为s的两个数字
 * 输入一个递增排序的数组和一个数字s，在数组中查找两个数，使得它们的和正好是s。如果有多对数字的和等于s，则输出任意一对即可。
 * 输入：nums = [2,7,11,15], target = 9
 * 输出：[2,7] 或者 [7,2]
 */


/**
* @param {number[]} nums
* @param {number} target
* @return {number[]}
*/
var twoSum = function (nums, target) {
    // 双指针查找
    let start = 0;
    let end = bf(); //nums.length - 1;

    // console.log(bf(), end);

    while (start < end) {
        let v1 = nums[start];
        let v2 = nums[end];
        if (v1 + v2 > target) {
            end--;
            continue;
        }

        if (v1 + v2 < target) {
            start++;
            continue;
        }

        return [v1, v2];
    }

    function bf() {
        let left = 0;
        let right = nums.length - 1;
        while (left < right) {
            let mi = Math.floor((left + right) / 2);
            let mv = nums[mi];
            if (mv === target) {
                return left;
            }

            if (mv < target) {
                left = mi + 1;
                continue;
            }

            right = mi - 1;
        }

        return right;
    }
};