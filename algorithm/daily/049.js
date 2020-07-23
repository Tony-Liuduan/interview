/**
 * @fileoverview 反转数组
 * @author liuduan
 * @Date 2020-07-22 16:29:50
 * @LastEditTime 2020-07-22 16:42:52
 */


function reverse(nums) {
    let n = nums.length;
    let l = 0;
    let r = n - 1;

    while (l < r) {
        swap(nums, l++, r--);
    }

    console.log(nums);
    return nums;
}

function swap(arr, i, j) {
    let tmp = arr[j];
    arr[j] = arr[i];
    arr[i] = tmp;
}


reverse([0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15])