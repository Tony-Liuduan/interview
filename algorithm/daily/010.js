/**
 * @fileoverview 每日一题010
 * @author liuduan
 * @Date 2020-05-11 13:19:18
 * @LastEditTime 2020-05-11 14:12:43
 * 
 * https://leetcode-cn.com/problems/shu-zu-zhong-chu-xian-ci-shu-chao-guo-yi-ban-de-shu-zi-lcof/
 * 数组中有一个数字出现的次数超过数组长度的一半，请找出这个数字。
 * 你可以假设数组是非空的，并且给定的数组总是存在多数元素。
 */


/**
* @param {number[]} nums
* @return {number}
*/

// 输入: [1, 2, 3, 2, 2, 2, 5, 4, 2]
// 输出: 2
var majorityElement = function (nums) {
    let len = nums.length;
    let middle = Math.ceil(len / 2);

    function quicksort(arr) {
        if (arr.length <= 1) {
            return arr;
        }

        let flag = arr[0];

        let rights = [];
        let lefts = [];
        let middles = [];

        for (const x of arr) {
            if (x < flag) {
                lefts.push(x);
            } else if (x > flag) {
                rights.push(x);
            } else {
                middles.push(x);
            }
        }

        return [...quicksort(lefts), ...middles, ...quicksort(rights)];
    }

    const arr = quicksort(nums);

    console.log(arr, arr[middle])

    return arr[middle];
};




// 摩尔投票法：
// 票数和： 由于众数出现的次数超过数组长度的一半；若记 众数 的票数为 + 1 + 1 ，非众数 的票数为 - 1−1 ，则一定有所有数字的 票数和 > 0 > 0 。
// 票数正负抵消： 设数组 nums 中的众数为 xx ，数组长度为 nn 。若 nums 的前 aa 个数字的 票数和 = 0 = 0 ，则 数组后(n - a)(n−a) 个数字的 票数和一定仍 > 0 > 0 （即后(n - a)(n−a) 个数字的 众数仍为 xx ）。
/**
 * @param {number[]} nums
 * @return {number}
 */
var majorityElement = function (nums) {
    let vote = 0;
    let max;

    for (const x of nums) {
        if (max === undefined) { // 投票，先投给第一个人
            max = x;
            vote++;
        } else if (max !== x) { // 当前人和候选者不同，票数减去1
            if (--vote < 0) { // 当候选者票数小于0时，换候选者，投票加1
                max = x;
                vote++;
            }
        } else { // 当前人和候选者相同，票数加1
            vote++;
        }
    }

    console.log(max, vote);
    return max;
};



majorityElement([1, 2, 3, 2, 2, 2, 5, 4, 2]);
