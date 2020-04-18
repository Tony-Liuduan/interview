/**
 * @description: 软老师的写法
 * http://www.ruanyifeng.com/blog/2011/04/quicksort_in_javascript.html
 * 问题：栈溢出
 */
function quickSort(arr) {
    if (!Array.isArray(arr)) return [];

    const size = arr.length;

    if (size <= 1) return arr;

    // 1. 准备一个基准值，中间值
    let pivot = arr[Math.floor(size / 2)];

    // 2. 准备左右两个堆
    let left = [];
    let right = [];
    let middle = [];

    for (const value of arr) {
        if (value < pivot) {
            left.push(value);
        } else if (value === pivot) {
            middle.push(value);
        } else {
            right.push(value);
        }
    }

    return [...quickSort(left), ...middle, ...quickSort(right)]
}


var testarr = [85, 24, 45, 63, 45, 17, 31, 96, 50];

var res = quickSort(testarr);

console.log(res);



/**
 * @description: 知乎网友提供版本
 * https://www.zhihu.com/question/276746146
 */
// function qSort(arr) {
//     if (arr.length <= 1) {
//         return arr;
//     }

//     return qSort(arr.filter(x => x < arr[0]))
//         .concat(
//             arr.filter(x => x == arr[0]),
//             qSort(arr.filter(x => x > arr[0]))
//         )
// }

const qSort = arr => arr.length <= 1 ? arr : qSort(arr.filter(x => x < arr[0])).concat(arr.filter(x => x == arr[0]), qSort(arr.filter(x => x > arr[0])))

var res = qSort(testarr);

console.log(res);
