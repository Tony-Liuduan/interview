/**
 * @fileoverview 
 * @author liuduan
 * @Date 2020-04-16 17:02:50
 * @LastEditTime 2020-07-21 21:58:35
 */
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


var testarr = [85, 24, 45, 63, 45, 17, 31, 96, 50, 24, 50, 90];

var res = quickSort(testarr);

// console.log(res);



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

// console.log(res);





function findKthLargest(nums, k) {

    let n = nums.length;

    function quickSort(start, end) {

        if (start > end) return;

        let random = Math.floor(Math.random() * (end - start + 1)) + start; // 随机选取一个index
        swap(nums, random, end); // 将它和位置r的元素交换，让 nums[r] 作为 pivot 元素

        let pivotIndex = partition(nums, start, end);

        if (n - k < pivotIndex) {
            quickSort(start, pivotIndex - 1);
        } else {
            quickSort(pivotIndex + 1, end);
        }
    }

    quickSort(0, n - 1);

    console.log(nums);

    console.log(nums[n - k]);
    return nums[n - k];
}


function partition(nums, start, end) {
    const middleValue = nums[end];

    let cur = start;

    for (let i = start; i < end; i++) {
        if (nums[i] < middleValue) {
            swap(nums, i, cur);
            cur++;
        }
    }

    swap(nums, cur, end);

    return cur;
}

function swap(nums, i, j) {
    const tmp = nums[j];
    nums[j] = nums[i];
    nums[i] = tmp;
}


// findKthLargest(testarr, 4);



function qsort(arr) {
    let n = arr.length;

    function dfs(l, r) {
        if (l > r) return;
        let random = (Math.random() * (r - l + 1) >> 0) + l;
        swap(arr, random, r);

        let point = getPoint(arr, l, r);

        dfs(l, point - 1);
        dfs(point + 1, r);
    }

    dfs(0, n - 1);
    console.log(arr);
    return arr;
}

function getPoint(arr, l, r) {
    let flag = arr[r];

    let cur = l;

    for (let i = l; i < r; i++) {
        if (arr[i] < flag) {
            swap(arr, i, cur);
            cur++;
        }
    }

    swap(arr, cur, r);

    return cur;
}

qsort(testarr);




function bfind(nums, target) {
    let n = nums.length;
    let l = 0;
    let r = n - 1;

    let index;

    while (l <= r) {
        let mi = (l + r) / 2 >> 0;
        let mv = nums[mi];

        if (mv < target) {
            l = mi + 1;
        } else if (mv > target) {
            r = mi - 1;
        } else {
            index = mi;
            r = mi - 1;
        }
    }
    console.log(index);
    return index;
}


bfind([1, 2, 3, 4, 4, 5, 5, 6], 5);