/**
 * @fileoverview 
 * @author liuduan
 * @Date 2020-07-04 16:02:09
 * @LastEditTime 2020-07-04 16:52:42
 */
let arr = [1, 2, 3, [4, 5, [6, 7, [8]], 9]];


function arrFlat(arr) {
    let res = [];
    function dfs(arr) {
        if (Array.isArray(arr)) {
            for (const item of arr) {
                dfs(item);
            }
        } else {
            res.push(arr);
        }
    }

    dfs(arr);

    console.log(res);
    return res;
}

// arrFlat(arr);

function arrFlat1(arr) {
    let res = String(arr).split(',').map(v => +v);
    console.log(res);
    return res;
}

// arrFlat1(arr);



function arrFlat2(arr) {
    return arr.reduce((a, b) => {
        return a.concat(Array.isArray(b) ? arrFlat2(b) : b);
    }, []);
}

// console.log(arrFlat2(arr));



function arrFlat3(arr, res = []) {
    for (const item of arr) {
        if (!Array.isArray(item)) {
            res.push(item);
        } else {
            arrFlat3(item, res);
        }
    }

    return res;
}

console.log(arrFlat3(arr));

console.log([1, [2, 3], [[4], 5, {}]].toString().split(','))