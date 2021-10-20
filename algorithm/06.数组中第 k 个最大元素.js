/**
 * https://leetcode-cn.com/problems/kth-largest-element-in-an-array/
 * @param {number[]} nums
 * @param {number} k
 * @return {number}
 */
var findKthLargest = function (nums, k) {
    return nums.sort((x, y) => y - x)[k - 1]
};

// 快排

// function quickSort(arr) {
//     if (!arr) {
//         return [];
//     }
//     if (arr.length <= 1) {
//         return arr;
//     }
//     const pivot = arr[0];
//     const left = [];
//     const right = [];
//     const middle = [];
//     for (const v of arr) {
//         if (v < pivot) {
//             left.push(v);
//         } else if (v === pivot) {
//             middle.push(v);
//         } else {
//             right.push(v);
//         }
//     }
//     return [...quickSort(left), ...middle, ...quickSort(right)];
// }

// const res = quickSort([112, 3, 4, 5, 6, 7, 8, 9, 10, 11]);
// console.log(res);

// 单向扫描
function _partion(arr, pivot, end) {
    // 1. 获取主元
    const pivotValue = arr[pivot];
    // 2. 设置扫描指针，指向主元下一位
    let sp = pivot + 1;
    // 3. 设置右指针
    let bigger = end;
    while (sp <= bigger) {
        // 若果扫描值大于主元，扫描值和 bigger 交换位置，bigger 向前移动一位
        if (arr[sp] > pivotValue) {
            swap(arr, sp, bigger);
            bigger--;
        } else {
            // 若果扫描值小于主元，扫描值向后扫描
            sp++;
        }
    }
    swap(arr, pivot, bigger);
    return bigger;
}

// 双向扫描
function partion(arr, pivot, end) {
    // 1. 获取主元
    const pivotValue = arr[pivot];
    // 2. 设置扫描指针
    let sp = pivot;
    // 3. 设置右指针
    let bigger = end;
    while (sp < bigger) {
        while (sp < bigger && arr[bigger] >= pivotValue) {
            bigger--;
        }
        if (sp < bigger) {
            swap(arr, sp++, bigger);
        }
        while (sp < bigger && arr[sp] <= pivotValue) {
            sp++;
        }
        if (sp < bigger) {
            swap(arr, sp, bigger--);
        }
    }
    return sp;
}

// 原地快排
function quickSort(arr, pivot, end) {
    if (pivot <= end) {
        const q = partion(arr, pivot, end);
        quickSort(arr, 0, q - 1);
        quickSort(arr, q + 1, end);
    }
}

function main(arr) {
    if (!arr) {
        return [];
    }

    if (arr.length === 1) {
        return arr;
    }

    const size = arr.length;
    // 1. 获取主元初始位置
    const pivot = 0;
    // 2. 设置结束位置
    const end = size - 1;
    quickSort(arr, pivot, end);

    console.log(arr);
    return arr;
}

function swap(arr, i, j) {
    const tmp = arr[j];
    arr[j] = arr[i];
    arr[i] = tmp;
}

// main([4, 5, 9, 2, 3, 8]);
main([4, 5, 9, 2, 3, 8, 100, 2, 99, 55, 99, 100]);