/* 
选择排序
假定第一位的“3”是最小值。

最小值“3”与第二位的“2”进行比较，2小于3，所以新的最小值是第二位的“2”。

最小值“2”与第三位的“4”进行比较，2小于4，最小值不变。

最小值“2”与第四位的“5”进行比较，2小于5，最小值不变。

最小值“2”与第五位的“1”进行比较，1小于2，所以新的最小值是第五位的“1”。

第五位的“1”与第一位的“3”互换位置，数组变为[1, 2, 4, 5, 3]。
*/
function selectionSort(arr) {
    let len = arr.length;
    let min;
    for (let i = 0, n = len -1 ; i < n; i++) {
        min = i;
        for(let j = i + 1; j < len; j++) {
            if (arr[min] > arr[j]) {
                min = j;
            }
        }
        if (i !== min) {
            swap(arr, i, min);
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

var res = selectionSort(testarr);

console.log(res);