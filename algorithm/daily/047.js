/**
 * @fileoverview 给定一个正整数，返回它在Excel中对应列名称
 * @author liuduan
 * @Date 2020-07-03 12:57:21
 * @LastEditTime 2020-07-10 18:30:51
 * 
 * 1 - A
 * 2 - B
 * 3 - C
 * ...
 * 26 - Z
 * 27 - AA
 * 28 - AB
 * ... 
 * 701 - ZY
 */
function transfer(num) {
    // 坑：26进制转换，正常是26进1，从0开始，这里是从1开始，所以每次转换前先减1
    let map = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'];
    let res = '';
    while (num > 0) {
        num--;
        res = map[num % 26] + res;

        num = Math.floor(num / 26);
    }
    console.log(res);
    return res;
}

transfer(701);