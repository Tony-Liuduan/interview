/**
 * @fileoverview 归并排序
 * @author liuduan
 * @Date 2020-07-17 10:03:29
 * @LastEditTime 2020-07-17 13:55:22
 */
const mergeSort = (arr) => {
    const len = arr.length;
    if (len < 2) {
        return arr;
    }

    let middle = len >> 1; // 等于 Math.floor(len / 2)

    // 拆分为两个子数组
    let left = arr.slice(0, middle);
    let right = arr.slice(middle);

    // 递归拆分
    return merge(mergeSort(left), mergeSort(right));
}

function merge(arrLeft, arrRight) {
    const result = [];

    // let ll = arrLeft.length;
    // let lr = arrRight.length;

    // let i = 0;
    // let j = 0;
    // let cur = 0;

    // while (i < ll && j < lr) {
    //     let v1 = arrLeft[i];
    //     let v2 = arrRight[j];

    //     if (v1 <= v2) {
    //         result[cur] = v1;
    //         i++;
    //     } else {
    //         result[cur] = v2;
    //         j++;
    //     }
    //     cur++;
    // }

    // if (i < ll) {
    //     return result.concat(arrLeft.slice(i))
    // }

    // if (j < lr) {
    //     return result.concat(arrRight.slice(j))
    // }

    // return result;


    while (arrLeft.length && arrRight.length) {
        let valueLeft = arrLeft[0];
        let valueRight = arrRight[0];

        if (valueLeft <= valueRight) {
            result.push(arrLeft.shift());
        } else {
            result.push(arrRight.shift());
        }
    }

    if (arrLeft.length) {
        return result.concat(arrLeft);
    }

    if (arrRight.length) {
        return result.concat(arrRight);
    }

    return result;
}

// 测试
const arr = [3, 44, 38, 5, 47, 15, 36, 26, 27, 2, 46, 4, 19, 50, 48, 9, 12, 3, 32, 1000, 323, 3232];
console.time('归并排序耗时');
console.log('arr :', mergeSort([...arr]));
console.timeEnd('归并排序耗时');

console.log('================================');

console.time('快排序耗时');
console.log('arr :', [...arr].sort((a, b) => a - b));
console.timeEnd('快排序耗时');

function swap(i, j, arr) {
    let tmp = arr[j];
    arr[j] = arr[i];
    arr[i] = tmp;
}
function bubbleSort(arr) {
    let l = arr.length;

    for (let i = 0; i < l - 1; i++) {
        for (let j = 0; j < l - i - 1; j++) {
            if (arr[j] > arr[j + 1]) {
                swap(j, j + 1, arr);
            }
        }
    }

    return arr;
}

console.log('================================');
console.time('冒泡排序耗时');
console.log('arr :', bubbleSort([...arr]));
console.timeEnd('冒泡排序耗时');





function selectSort(arr) {
    let l = arr.length;

    for (let i = 0; i < l - 1; i++) {
        let min = i;
        for (let j = i + 1; j < l; j++) {
            if (arr[min] > arr[j]) {
                min = j;
            }
        }

        if (min !== i) {
            swap(min, i, arr);
        }

    }

    return arr;
}

console.log('================================');
console.time('选择排序耗时');
console.log('arr :', selectSort([...arr]));
console.timeEnd('选择排序耗时');




function insertSort(arr) {
    let l = arr.length;

    for (let i = 0; i < l; i++) {
        // 储存当前位置的值
        value = arr[i];
        
        let j = i - 1

        for (; j > -1 && arr[j] > value; j--) {
            arr[j + 1] = arr[j];
        }

        arr[j + 1] = value;
    }

    return arr;
}

console.log('================================');
console.time('插入排序耗时');
console.log('arr :', insertSort([...arr]));
console.timeEnd('插入排序耗时');