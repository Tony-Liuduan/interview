/**
 * @fileoverview 033 两个数组的交集
 * @author liuduan
 * @Date 2020-06-11 11:00:55
 * @LastEditTime 2020-06-11 14:05:03
 * https://leetcode-cn.com/problems/intersection-of-two-arrays/
 */
/**
 * @param {number[]} nums1
 * @param {number[]} nums2
 * @return {number[]}
 */
// 双指针
var intersection = function (nums1, nums2) {
    nums1.sort((a, b) => a - b);
    nums2.sort((a, b) => a - b);

    let size1 = nums1.length;
    let size2 = nums2.length;

    let i = j = 0
    let res = new Set();

    while (i < size1 && j < size2) {
        let v1 = nums1[i];
        let v2 = nums2[j];

        if (v1 < v2) {
            i++;
        } else if (v1 > v2) {
            j++;
        } else {
            res.add(v1);
            i++;
            j++;
        }
    }

    return [...res];
};

// 二分算法
var intersection = function (nums1, nums2) {
    // 对num2开展二分查找
    nums2.sort((a, b) => a - b);

    console.log(nums2);
    function bf(arr, num, start, end) {
        if (start > end) {
            return;
        }

        let m = Math.floor((end + start) / 2);
        let mv = arr[m];

        if (mv === num) {
            return mv;
        }

        if (mv < num) {
            return bf(arr, num, m + 1, end);
        }

        return bf(arr, num, start, m - 1);
    }

    let res = new Set();
    let end = nums2.length - 1;
    nums1.forEach(v => {
        if (res.has(v)) {
            return;
        }
        let r = bf(nums2, v, 0, end);
        if (r !== undefined) {
            res.add(v);
        }
    });

    return [...res];
};


// api
var intersection = function (nums1, nums2) {
    return [...new Set(nums1.filter(x => nums2.includes(x)))];
};