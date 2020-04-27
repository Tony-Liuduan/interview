/*
 * @Author: liuduan
 * @Date: 2020-04-26 17:58:11
 * @LastEditors: liuduan
 * @LastEditTime: 2020-04-27 08:34:15
 * @Description: 二维数组查找
 * 
 * https://leetcode-cn.com/problems/er-wei-shu-zu-zhong-de-cha-zhao-lcof/submissions/
 * 
 * 前提：
 * 在一个二维数组中，
 * 每个一维数组的长度相同，
 * 每一行都按照从左到右的顺序递增排序，
 * 每一列都按照从上到下的顺序递增排序
 * 
 * 问：
 * 输入上面描述的一个数组，和一个整数，判断数组是否含有该整数
 */


function indexof(arr, num) {

    let l = arr.length;

    for (let i = l - 1; i >= 0; i--) {
        const ar = arr[i];
        if (num < ar[0]) {
            continue;
        }
        let l1 = ar.length;
        let l1a = Math.ceil(l1 / 2);

        for (let j = l1a; j >= 0; j--) {
            if (num === ar[j]) {
                return [i, j];
            }

            if (num > ar[j]) {
                break;
            }
        }

        for (let j = l1a + 1; j < l1; j++) {
            if (num === ar[j]) {
                return [i, j];
            }
        }

    }

    return -1;
}

var arr = [
    [1, 2, 3],
    [4, 5, 6],
    [7, 8, 9],
];

const has = indexof(arr, 5);

console.log(has);




/**
 * batter
 * @param {number[][]} matrix
 * @param {number} target
 * @return {boolean}
 */
var findNumberIn2DArray = function (matrix, target) {
    let l = matrix.length;
    if (l < 1) return false;
    let ll = matrix[0].length;
    let x = 0;
    let y = l - 1;

    while (y >= 0 && x < ll) {
        if (matrix[y][x] > target) {
            // 继续往上找
            y--;
            continue;
        }

        if (matrix[y][x] < target) {
            // 继续往右找
            x++;
            continue;
        }

        return true;
    }

    return false;
};