/*
 * @Author: liuduan
 * @Date: 2020-05-07 10:54:34
 * @LastEditors: liuduan
 * @LastEditTime: 2020-05-07 15:10:04
 * @Description: 
 * 把一个数组最开始的若干个元素搬到数组的末尾，我们称之为数组的旋转。
 * 输入一个递增排序的数组的一个旋转，输出旋转数组的最小元素。
 * 例如，数组 [3,4,5,1,2] 为 [1,2,3,4,5] 的一个旋转，该数组的最小值为1。
 * 
 * https://leetcode-cn.com/problems/xuan-zhuan-shu-zu-de-zui-xiao-shu-zi-lcof/
 */


/**
* @param {number[]} numbers
* @return {number}
*/
var minArray = function (numbers) {

    let dfs = function (start, end) {
        if (start >= end) {
            return numbers[start];
        }

        let mi = Number.parseInt((start + end) / 2);
        let mv = numbers[mi];

        // 找到右区间数组
        // [3, 4, 5, 1, 2]
        // [2, 2, 2, 0, 1]
        if (mv > numbers[end]) { // 还在左边区间，继续向右查找
            return dfs(mi + 1, end);
        }
        if (mv < numbers[end]) { // 已经在右区间了，向左边查找
            return dfs(start, mi);
        }
        // 如果相等，这时无法判断在哪个区间
        // [1, 0, 1, 1, 1]
        // [1, 1, 1, 0, 1]

        // 假设 m 在右排序数组中：numbers[m] == numbers[j]，因此mi之后的每一个元素都和mi值相等
        for(let i = mi + 1; i < end;  i++) {
            if (numbers[i] !== mv) { // 说明还在左边区间
                return dfs(mi + 1, end);
            }
        }

        // m 在右排序数组中
        return dfs(start, mi);
    }

    let res = dfs(0, numbers.length - 1);
    console.log(res);
    return res;
};

minArray([3, 4, 5, 1, 2])
minArray([2, 2, 2, 0, 1])
minArray([1, 0, 1, 1, 1])
minArray([1, 1, 1, 0, 1])
minArray([7, 0, 1, 1, 1, 1, 2, 3, 4])
minArray([3, 3, 3, 3, 3, 3, 3, 3, 1, 3])