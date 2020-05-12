/**
 * @fileoverview 每日一题 011
 * @author liuduan
 * @Date 2020-05-12 10:37:29
 * @LastEditTime 2020-05-12 13:17:22
 * 
 * https://leetcode-cn.com/problems/bu-ke-pai-zhong-de-shun-zi-lcof/
 * 从扑克牌中随机抽5张牌，判断是不是一个顺子，
 * 即这5张牌是不是连续的。2～10为数字本身，
 * A为1，J为11，Q为12，K为13，而大、小王为 0 ，可以看成任意数字。A 不能视为 14。
 */

/**
* @param {number[]} nums
* @return {boolean}
*/
var isStraight1 = function (nums) {
    // 排序
    function qsort(arr) {
        if (arr.length <= 1) {
            return arr;
        }
        
        let left = [];
        let right = [];
        let middle = []
        let f = arr[0];

        for (const x of arr) {
            if (x > f) {
                right.push(x);
            } else if (x < f){
                left.push(x);
            } else {
                middle.push(x);
            }
        }

        return [...qsort(left), ...middle, ...qsort(right)];
    }

    let sortNums = qsort(nums);

    let minIndex = 0;

    // 除了0不能有重复的牌
    for (let i = 0, l = sortNums.length - 1; i < l; i++) {
        let cur = sortNums[i];

        if (minIndex > 2) {
            return false;
        }

        if (cur === 0) {
            minIndex++;
            continue;
        }

        if (cur === sortNums[i + 1]) {
            return false;
        }
    }

    console.log(sortNums, sortNums[4] - sortNums[minIndex], sortNums[minIndex], sortNums[4])

    return sortNums[4] - sortNums[minIndex] < 5;
};


/* 
1. 除了大小王0之外不能有重复的数字
2. 最大值减去最小值必须小于5
*/
var isStraight = function (nums) {

    const map = new Map();

    let min = 14;
    let max = 0;

    for (const num of nums) {
        if (num === 0) {
            continue;
        }

        if (map.has(num)) {
            return false;
        }

        map.set(num, 1);

        max = Math.max(max, num);
        min = Math.min(min, num);
    }
    console.log(map.size);
    return map.size >= 3 && max - min < 5;
};

// isStraight([1, 0, 2, 3, 5])
// isStraight1([10, 11, 0, 12, 6])

var a = [10, 11, 0, 12, 6];
function compare(a, b) {
    // if (a < b) {           // 按某种排序标准进行比较, a 小于 b
    //     return -1;
    // }
    // if (a > b) {
    //     return 1;
    // }
    // // a must be equal to b
    // return 0;
    return a - b;
}
var b = a.sort(compare)

console.log(a, b, ["小李", "向往", "广告位"].sort(function (a, b) {
    return a.localeCompare(b);
}))

/* 
如果没有指明 compareFunction ，那么元素会按照转换为的字符串的诸个字符的Unicode位点进行排序。例如 "Banana" 会被排列到 "cherry" 之前。当数字按由小到大排序时，9 出现在 80 之前，但因为（没有指明 compareFunction），比较的数字会先被转换为字符串，所以在Unicode顺序上 "80" 要比 "9" 要靠前。

如果指明了 compareFunction ，那么数组会按照调用该函数的返回值排序。即 a 和 b 是两个将要被比较的元素：

如果 compareFunction(a, b) 小于 0 ，那么 a 会被排列到 b 之前；
如果 compareFunction(a, b) 等于 0 ， a 和 b 的相对位置不变。备注： ECMAScript 标准并不保证这一行为，而且也不是所有浏览器都会遵守（例如 Mozilla 在 2003 年之前的版本）；
如果 compareFunction(a, b) 大于 0 ， b 会被排列到 a 之前。
compareFunction(a, b) 必须总是对相同的输入返回相同的比较结果，否则排序的结果将是不确定的。
*/