/**
 * https://leetcode-cn.com/problems/two-sum/
 * 输入：nums = [2,7,11,15], target = 9
 * 输出：[0,1]
 * 解释：因为 nums[0] + nums[1] == 9 ，返回 [0, 1]
 * 
 * @param {number[]} nums
 * @param {number} target
 * @return {number[]}
 */
var twoSum = function (nums, target) {
    // let l = nums.length;
    // for (let i = 0; i < l; i++) {
    //     const x = nums[i];

    //     for (let j = i + 1; j < l; j++) {
    //         const y = nums[j];
    //         if (x + y === target) {
    //             return [i, j];
    //         }
    //     }
    // }

    // hash 表解法
    let map = new Map();
    let l = nums.length;
    for (let i = 0; i < l; i++) {
        const v = target - nums[i];
        if (map.has(v)) {
            return [map.get(v), i];
        }
        map.set(nums[i], i);
    }
};

twoSum([2, 3, 7, 11, 15], 9)
twoSum([3, 2, 4], 6)