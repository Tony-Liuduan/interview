/**
 * @fileoverview BFPRT
 * https://github.com/sisterAn/JavaScript-Algorithms/issues/73
 */
function findKthLargest(nums, k) {
    const res = nums[bfprt(nums, 0, nums.length - 1, nums.length - k)];
    console.log(nums, res, k);
    return res;
}

function bfprt(arr, left, right, k) {
    let index;
    if (left < right) {
        // 划分数组
        index = partition(arr, left, right)
        // console.log(index, left, right);
        // Top k
        if (k === index) {
            return index
        } else if (k < index) {
            // Top k 在左边
            return bfprt(arr, left, index - 1, k)
        } else {
            // Top k 在右边
            return bfprt(arr, index + 1, right, k)
        }
    }
    return left;
}

function partition(arr, left, right) {
    // 基准
    // 选取主元
    var datum = arr[findMid(arr, left, right)],
        i = left,
        j = right

    console.log(datum, i, j);
    // 开始调整
    while (i < j) {
        // 左指针右移
        while (arr[i] < datum) {
            i++
        }

        // 右指针左移
        while (arr[j] > datum) {
            j--
        }

        // 交换
        if (i < j) swap(arr, i, j)

        // 当数组中存在重复数据时，即都为datum，但位置不同
        // 继续递增i，防止死循环
        if (arr[i] === arr[j] && i !== j) {
            i++
        }
    }
    return i;
}

/**
 * 数组 arr[left, right] 每五个元素作为一组，并计算每组的中位数，
 * 最后返回这些中位数的中位数下标（即主元下标）。
 *
 * @attention 末尾返回语句最后一个参数多加一个 1 的作用其实就是向上取整的意思，
 * 这样可以始终保持 k 大于 0。
 */
function findMid(arr, left, right) {
    if (right - left < 5) {
        console.log('insert', insertSort(arr, left, right), arr);
        return insertSort(arr, left, right);
    }

    let n = left - 1;

    // 每五个作为一组，求出中位数，并把这些中位数全部依次移动到数组左边
    for (let i = left; i + 4 <= right; i += 5) {
        let index = insertSort(arr, i, i + 4);
        console.log('index', i, i + 4, index, arr[index]);
        swap(arr[++n], arr[index]);
    }

    // 利用 bfprt 得到这些中位数的中位数下标（即主元下标）
    return findMid(arr, left, n);
}

/**
 * 对数组 arr[left, right] 进行插入排序，并返回 [left, right]
 * 的中位数。
 */
function insertSort(arr, left, right) {
    let temp, j
    for (let i = left + 1; i <= right; i++) {
        temp = arr[i];
        j = i - 1;
        while (j >= left && arr[j] > temp) {
            arr[j + 1] = arr[j];
            j--;
        }
        arr[j + 1] = temp;
    }
    return ((right - left) >> 1) + left;
}

// 交换
function swap(arr, i, j) {
    let temp = arr[i]
    arr[i] = arr[j]
    arr[j] = temp
}


findKthLargest([9, 8, 1, 6, 2, 7, 3, 8, 5, 22, 3], 1);
