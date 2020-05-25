/**
 * @fileoverview 020
 * @author liuduan
 * @Date 2020-05-25 13:50:10
 * @LastEditTime 2020-05-25 13:52:40
 * https://leetcode-cn.com/problems/diao-zheng-shu-zu-shun-xu-shi-qi-shu-wei-yu-ou-shu-qian-mian-lcof/
 * 调整数组顺序使奇数位于偶数前面
 * 输入一个整数数组，实现一个函数来调整该数组中数字的顺序，使得所有奇数位于数组的前半部分，所有偶数位于数组的后半部分。
 * 输入：nums = [1,2,3,4]
 * 输出：[1,3,2,4] 
 * 注：[3,1,2,4] 也是正确的答案之一。
 */
/**
 * @param {number[]} nums
 * @return {number[]}
 */


let map = {};
function isEven(num) {
    if (map[num] !== undefined) {
        return map[num];
    }
    map[num] = num % 2 === 0;
    return map[num];
}


function ex(nums, left, right) {
    let tmp = nums[left];
    nums[left] = nums[right];
    nums[right] = tmp;
}

var exchange = function (nums) {
    let left = 0;
    let right = nums.length - 1;
    while (left < right) {
        let lv = nums[left];
        let rv = nums[right];
        if (!isEven(lv)) {
            left++;
            continue;
        }
        if (isEven(rv)) {
            right--;
            continue;
        }
        // 交换位置
        ex(nums, left, right);
        left++;
    }
    console.log(nums);
    return nums;
};


exchange([1, 2, 3, 4, 5, 6, 7, 2, 4, 5, 11, 90]);