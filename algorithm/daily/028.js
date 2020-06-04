/**
 * @fileoverview 028 高度检查器
 * @author liuduan
 * @Date 2020-06-04 14:27:20
 * @LastEditTime 2020-06-04 14:29:56
 * 
 * 学校在拍年度纪念照时，一般要求学生按照 非递减 的高度顺序排列。
 * 请你返回能让所有学生以 非递减 高度排列的最小必要移动人数。
 * 注意，当一组学生被选中时，他们之间可以以任何可能的方式重新排序，而未被选中的学生应该保持不动
 */

/**
* @param {number[]} heights
* @return {number}
*/
var heightChecker = function (heights) {

    /* 1. 先排除在一个一个比对 */
    // let source = [...heights];
    // heights.sort((a, b) => a - b);
    // let l = heights.length;
    // let count = 0;
    // for (let i = 0; i < l; i++) {
    //     if (source[i] !== heights[i]) {
    //         count++;
    //     }
    // }
    // return count;


    /* 2. 桶排序，先把可估计范围数字放进桶里，每个桶去比对  时间复杂度：O(n)，空间复杂度：O(1)，*/
    let count = 0;
    let barrel = new Array(101).fill(0);

    let l = heights.length;
    for (let i = 0; i < l; i++) {
        let v = heights[i];
        barrel[v] = barrel[v] + 1;
    }
    let j = 0;
    for (let i = 1; i < 101; i++) {
        let v = barrel[i];
        if (v === 0) continue;
        while (v-- > 0) {
            let o = heights[j++];
            if (o !== i) {
                count++;
            }
        }
    }
    return count;
};