/**
 * https://leetcode-cn.com/problems/kth-largest-element-in-an-array/
 * @param {number[]} nums
 * @param {number} k
 * @return {number}
 * 
 * 
 * 在 V8 引擎 7.0 版本之前，数组长度小于10时， Array.prototype.sort() 使用的是插入排序，否则用快速排序。
 * 在 V8 引擎 7.0 版本之后就舍弃了快速排序，因为它不是稳定的排序算法，在最坏情况下，时间复杂度会降级到 O(n2)。而是采用了一种混合排序的算法：TimSort 。
 * 
 * 这种功能算法最初用于Python语言中，严格地说它不属于以上10种排序算法中的任何一种，属于一种混合排序算法：
 *  在数据量小的子数组中使用插入排序，然后再使用归并排序将有序的子数组进行合并排序，时间复杂度为 O(nlogn) 。
 */
var findKthLargest = function (nums, k) {
    return nums.sort((x, y) => y - x)[k - 1];
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
// main([4, 5, 9, 2, 3, 8, 100, 2, 99, 55, 99, 100]);




/**
 * @description 局部冒泡排序
 * 时间复杂度：O(n*k)
 * 空间复杂度：O(1)
 */
function bubbleSort(arr, k) {
    const l = arr.length;
    for (let i = 0; i < k; i++) {
        // 提前退出冒泡循环的标识位
        let flag = false;
        for (let j = 0; j < l - i; j++) {
            if (arr[j] > arr[j + 1]) {
                swap(arr, j, j + 1);
                // 表示发生了数据交换
                flag = true;
            }
        }
        // 没有数据交换
        if (!flag) break
    }
    console.log(arr);
    return arr;
}


// bubbleSort([1, 3, 4, 5, 6, 7, 8, 2], 3);





/**
 * @description 构造前 k 个最大元素小顶堆，取堆顶
 * 
 */
/* function findKthLargest_tree(nums, k) {
    // 从 nums 中取出前 k 个数，构建一个小顶堆
    let heap = [,], i = 0;
    while (i < k) {
        heap.push(nums[i++])
    }
    buildHeap(heap, k);
    console.log([...heap], i, k);

    // 从 k 位开始遍历数组
    for (let i = k; i < nums.length; i++) {
        if (heap[1] < nums[i]) {
            // 替换并堆化
            heap[1] = nums[i]
            heapify(heap, k, 1)
        }
    }

    console.log(heap);

    // 返回堆顶元素
    return heap[1]
}

// 原地建堆，从后往前，自上而下式建小顶堆
let buildHeap = (arr, k) => {
    if (k === 1) return
    // 从最后一个非叶子节点开始，自上而下式堆化
    for (let i = Math.floor(k / 2); i >= 1; i--) {
        heapify(arr, k, i)
    }
}

// 堆化
let heapify = (arr, k, i) => {
    console.log(k, i);
    // 自上而下式堆化
    while (true) {
        let minIndex = i
        if (2 * i <= k && arr[2 * i] < arr[i]) {
            minIndex = 2 * i
        }
        if (2 * i + 1 <= k && arr[2 * i + 1] < arr[minIndex]) {
            minIndex = 2 * i + 1
        }
        if (minIndex !== i) {
            swap(arr, i, minIndex)
            i = minIndex
        } else {
            break
        }
    }
}

findKthLargest_tree([9, 8, 1, 6, 2, 7, 3, 8], 8); */
