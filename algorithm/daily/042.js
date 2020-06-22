/**
 * @fileoverview 042 合并有序数组
 * @author liuduan
 * @Date 2020-06-22 11:43:56
 * @LastEditTime 2020-06-22 11:45:33
 * https://leetcode-cn.com/problems/merge-sorted-array/
 * 给你两个有序整数数组 nums1 和 nums2，请你将 nums2 合并到 nums1 中，使 nums1 成为一个有序数组。
 */


/**
* @param {number[]} nums1
* @param {number} m
* @param {number[]} nums2
* @param {number} n
* @return {void} Do not return anything, modify nums1 in-place instead.
*/
/* 三指针法 */
var merge = function (nums1, m, nums2, n) {
    // 因为是有序数组，从后往前遍历，方便一些
    let i = m - 1;
    let j = n - 1;
    let cur = m + n - 1;

    while (i >= 0 && j >= 0) {
        let vm = nums1[i];
        let vn = nums2[j];

        if (vn >= vm) {
            nums1[cur] = vn;
            j--;
        } else {
            nums1[cur] = vm;
            i--;
        }
        cur--;
    }

    // 如果遍历完，nums2 还有没完成遍历的，直接塞到nums1最前面
    if (j > -1) {
        let tmp = nums2.slice(0, j + 1);
        nums1.splice(0, j + 1, ...tmp);
    }
    return nums1;
}
