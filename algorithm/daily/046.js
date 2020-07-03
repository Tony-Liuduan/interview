/**
 * @fileoverview 过滤数组中元素
 * @author liuduan
 * @Date 2020-07-03 12:53:30
 * @LastEditTime 2020-07-03 12:57:09
 */


function filterVal(arr, val) {
    if (arr.length === 0) return 0;
    if (!arr.includes(val)) return arr.length;

    let count = 0;
    for (let i = 0; i < arr.length; i++) {
        const el = arr[i];

        if (el !== val) {
            arr[count++] = el;
        }

    }
    return count;
}


filterVal([1, 2, 3, 4, 5, 6, 7, 8, 9], 8);
