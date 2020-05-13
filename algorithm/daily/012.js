/**
 * @fileoverview 
 * @author liuduan
 * @Date 2020-05-13 15:05:14
 * @LastEditTime 2020-05-13 15:25:51
 */
/* var missingNumber = function (nums) {
    function binary(start, end) {
        if (start >= end) {
            // console.log(start, end);
            return start !== nums[start] ? start : start + 1;
        }

        let mi = Number.parseInt((start + end) / 2);
        let mv = nums[mi];

        if (mi === mv) {
            // 向右边查找
            return binary(mi + 1, end);
        } else {
            flag = true;
            // 不相等，向左边查找
            return binary(start, mi);
        }
    }

    const res = binary(0, nums.length - 1);

    console.log(res);
    return res;
}; */


var missingNumber = function (nums) {
    let left = 0;
    let right = nums.length - 1;
    while (left <= right) {
        let mid = Math.floor((left + right) / 2);
        if (mid === nums[mid]) {
            left = mid + 1;
        } else if (mid < nums[mid]) {
            right = mid - 1;
        }
    }
    console.log(left, right)
    return left;
};


missingNumber([0]);
missingNumber([0, 1, 3]);
missingNumber([0, 1, 2, 3, 4, 5, 6, 7, 9]);
missingNumber([0, 1, 2, 3, 5]);