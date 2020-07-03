/**
 * @fileoverview  用递归算法实现，数组长度为5且元素的随机数在2-32间不重复的值
 * @author liuduan
 * @Date 2020-07-03 10:41:03
 * @LastEditTime 2020-07-03 10:53:00
 */

/* let l = 0
let x = 0
let y = 0;
let z = 0;
while (l < 1000) {
    l++;
    let a = Math.floor(Math.random() * 31) + 2;
    if (a > 32 || a < 2) {
        x++;
        break;
    }

    if (a === 32) {
        y++;
    }

    if (a < 32 && a > 2) {
        z++;
    }

}


console.log(x, y, z); */


function createRA(min, max, l = 5) {
    const arr = new Array(l);
    let i = 0;
    function rv() {
        return Math.floor(Math.random() * (max - min)) + min;
    }
    function dfs() {
        if (i >= l) {
            return;
        }
        let v = rv();
        if (arr.includes(v)) {
            dfs();
        } else {
            console.log(i);
            arr[i++] = v;
            dfs();
        }
    }
    dfs();
    console.log(arr);
    return arr;
}

createRA(2, 32, 5);