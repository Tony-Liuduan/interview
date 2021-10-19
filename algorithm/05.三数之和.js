/**
 * https://leetcode-cn.com/problems/3sum/
 * 输入：nums = [-1,0,1,2,-1,-4]
 * 输出：[[-1,-1,2],[-1,0,1]]
 * 
 * @param {number[]} nums
 * @return {number[][]}
 */
var threeSum = function (nums) {
    nums.sort((x, y) => x - y);
    let l = nums.length;
    let res = new Set(); // set 保证去重
    for (let i = 0; i < l; i++) {
        const v1 = nums[i];

        if (v1 > 0) {
            break;
        }

        if (i > 0 && v1 === nums[i - 1]) {
            continue;
        }

        // hash 进入，类似 2 数之和
        const map = new Map();
        for (let j = i + 1; j < l; j++) {
            const v2 = nums[j];

            const v3 = 0 - v1 - v2;

            if (map.has(v3)) {
                res.add([v1, v2, v3].join(','));
            } else {
                map.set(v2, j);
            }
        }
    }
    return [...res].map(x => x.split(','));
};

// 双指针方法
var threeSum = function (nums) {
    nums.sort((x, y) => x - y);
    let l = nums.length;
    let res = [];
    for (let i = 0; i < l; i++) {
        const v1 = nums[i];

        if (v1 > 0) {
            break;
        }

        if (i > 0 && v1 === nums[i - 1]) {
            continue;
        }

        let left = i + 1;
        let right = l - 1;

        while (right > left) {
            let v2 = nums[left];
            let v3 = nums[right];

            let sum = v1 + v2 + v3;

            if (sum > 0) {
                right--;
            } else if (sum < 0) {
                left++;
            } else {
                res.push([v1, v2, v3]);

                // 找到答案时，执行去重逻辑
                while (right > left && nums[right - 1] === v3) {
                    right--;
                }
                while (right > left && nums[left + 1] === v2) {
                    left++;
                }
                // 找到答案时，双指针同时收缩
                right--;
                left++;
            }
        }
    }
    return res;
};
