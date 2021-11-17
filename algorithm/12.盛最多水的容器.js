/**
 * https://leetcode-cn.com/problems/container-with-most-water/
 * @param {number[]} height
 * @return {number}
 * 
 * 输入：[1,8,6,2,5,4,8,3,7]
 * 输出：49 
 * 解释：图中垂直线代表输入数组 [1,8,6,2,5,4,8,3,7]。在此情况下，容器能够容纳水（表示为蓝色部分）的最大值为 49。
 */
var maxArea = function (height) {
    let l = height.length;
    if (l <= 1) {
        return 0;
    }
    let start = 0;
    let end = l - 1;
    let max = 0;

    while (start < end) {
        const sv = height[start];
        const ev = height[end];
        const tmp = Math.min(sv, ev) * (end - start);

        max = Math.max(max, tmp);

        if (sv <= ev) {
            start++;
        } else {
            end--;
        }
    }

    console.log(max);
    return max;
};

maxArea([1, 8, 6, 2, 5, 4, 8, 3, 7]);
maxArea([2, 3, 4, 5, 18, 17, 6]);