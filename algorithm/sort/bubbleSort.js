/* 
冒泡排序
第一位的“3”与第二位的“2”进行比较，3大于2，互换位置，数组变成[2, 3, 4, 5, 1]。

第二位的“3”与第三位的“4”进行比较，3小于4，数组不变。

第三位的“4”与第四位的“5”进行比较，4小于5，数组不变。

第四位的“5”与第五位的“1”进行比较，5大于1，互换位置，数组变成[2, 3, 4, 1, 5]。
*/
function bubbleSort(arr) {
    let len = arr.length;
    for (let i = 0, n = len - 1; i < n; i++) {
        for (let j = 0, m = n - i; j < m; j++) {
            if (arr[j] > arr[j + 1]) {
                swap(arr, j, j + 1);
            }
        }
    }
    return arr;
}

function swap(arr, i, j) {
    let tmp = arr[j];
    arr[j] = arr[i];
    arr[i] = tmp;
}


var testarr = [85, 24, 45, 63, 45, 17, 31, 96, 50];

var res = bubbleSort(testarr);

console.log(res);