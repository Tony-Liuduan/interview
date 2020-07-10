/**
 * @fileoverview 
 * @author liuduan
 * @Date 2020-07-10 10:33:22
 * @LastEditTime 2020-07-10 11:15:10
 */
const list = [1, 3, 9, 3, 100, 5];

function swap(a, b, arr) {
    const tmp = arr[a];
    arr[a] = arr[b];
    arr[b] = tmp;
    return arr;
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

    console.log(arr);
    return arr;
}


// bubbleSort(list);


function insertSort(arr) {

    let l = arr.length;
    let curValue;
    let i, j;

    for (i = 0; i < l; i++) {
        curValue = arr[i];

        for (j = i - 1; j > -1 && arr[j] > curValue; j--) {
            arr[j + 1] = arr[j];
        }

        arr[j + 1] = curValue;
    }

    console.log(arr);

    return arr;
}


// insertSort(list);




function selectSort(arr) {
    let l = arr.length;
    let i, j;
    let minIndex;

    for (i = 0; i < l; i++) {
        minIndex = i;

        for (j = i + 1; j < l; j++) {
            if (arr[minIndex] > arr[j]) {
                minIndex = j;
            }
        }

        if (i !== minIndex) {
            swap(i, minIndex, arr);
        }
    }

    console.log(arr);

    return arr;

}

// selectSort(list);



function quickSort(arr) {
    let l = arr.length;
    if (l <= 1) return arr;

    let start = arr[0];

    let left = [];
    let right = [];
    let middle = [start];

    for (let i = 1; i < l; i++) {
        let v = arr[i];

        if (v > start) {
            right.push(v);
        } else if (v === start) {
            middle.push(v);
        } else {
            left.push(v);
        }
    }

    return [...quickSort(left), ...middle, ...quickSort(right)]

}

const res = quickSort(list);
// console.log(res);



const qSort = arr => arr.length <= 1 ? arr : qSort(arr.filter(x => x < arr[0])).concat(arr.filter(x => x == arr[0]), qSort(arr.filter(x => x > arr[0])))
