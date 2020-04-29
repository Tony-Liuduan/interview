/*
 * @Author: liuduan
 * @Date: 2020-04-29 11:37:39
 * @LastEditors: liuduan
 * @LastEditTime: 2020-04-29 13:13:19
 * @Description: 算法003
 * 
 * 统计一个数字在排好序的数组中出现的次数
 */
function findFirst(arr, num, start, end) {
    if (start === undefined) {
        start = 0;
    }

    if (end === undefined) {
        end = arr.length - 1;
    }

    if (start > end) return -1;

    let mi = Number.parseInt((end + start) / 2);

    let mv = arr[mi];

    console.log(mi, '----', mv);

    if (mv < num) {
        start = mi + 1;
        return findFirst(arr, num, start, end)
    }

    if (mv === num && arr[mi - 1] !== num) {
        return mi;
    }

    end = mi - 1;
    return findFirst(arr, num, start, end)

}


function findLast(arr, num, start, end) {
    if (start === undefined) {
        start = 0;
    }

    if (end === undefined) {
        end = arr.length - 1;
    }

    if (start > end) return -1;

    let mi = Number.parseInt((start + end) / 2);

    let mv = arr[mi];

    console.log(mi, '----', mv);

    if (mv > num) {
        end = mi - 1;
        return findLast(arr, num, start, end)
    }

    if (mv === num && arr[mi + 1] !== num) {
        return mi;
    }

    start = mi + 1;
    return findLast(arr, num, start, end)
}


function find(arr, num) {
    if (Array.isArray(arr) && num != null) {
        let l = arr.length;
        let start = findFirst(arr, num, 0, l - 1);
        if (start === -1) {
            return 0;
        }
        if (start === l - 1) {
            return 1;
        }
        console.log('********', start)
        let end = findLast(arr, num, start + 1, l - 1);
        if (end === -1) {
            return 1;
        }
        return end - start;
    }
    return 0
}
let arr = [1, 2, 2, 3, 4, 5, 6, 6, 6, 6, 6, 6, 6, 7, 8];

// var r0 = findFirst(arr, 6);
// console.log(r0);
// var r1 = findLast(arr, 6);
// console.log(r1);

var r = find(arr, 6);
console.log('********')
console.log(r);