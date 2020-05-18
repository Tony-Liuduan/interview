/**
 * @fileoverview 每日一题015
 * @author liuduan
 * @Date 2020-05-18 13:31:11
 * @LastEditTime 2020-05-18 14:40:39
 * @LeetCode https://leetcode-cn.com/problems/ba-shu-zu-pai-cheng-zui-xiao-de-shu-lcof/
 * 输入一个正整数数组，把数组里所有数字拼接起来排成一个数，打印能拼接出的所有数字中最小的一个
 *
 * 输入: [10,2]
 * 输出: "102"
 *
 * 输入: [5,9,3,30,34]
 * 输出: "3033459"
 * 
 * [121,12]
 * [12112]
 */
/**
 * @param {number[]} nums
 * @return {string}
 */
var minNumber1 = function (nums) {
    nums.sort((a, b) => {
        let sum1 = '' + a + b;
        let sum2 = '' + b + a;
        if (sum1 > sum2) {
            return 1
        } else {
            return -1
        }

    });
    console.log(nums, nums.join(''));
    return nums.join('');
};


var minNumber = function (nums) {
    function bs(nums) {
        let l = nums.length;
        if (l <= 1) {
            return nums;
        }

        let x = nums[0];

        let right = [], left = [], middle = [];

        for (const num of nums) {
            if (num === x) {
                middle.push(num);
            } else {
                let sum1 = '' + num + x;
                let sum2 = '' + x + num;
                if (sum1 > sum2) {
                    right.push(num);
                } else {
                    left.push(num);
                }
            }
        }
        return [...bs(left), ...middle, ...bs(right)];
    }

    let res = bs(nums);

    console.log(res.join(''));
    return res.join('');
};

minNumber([5, 9, 3, 30, 34])
minNumber([121, 12])
minNumber([10, 2])
minNumber([1])
