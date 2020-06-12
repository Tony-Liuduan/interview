/**
 * @fileoverview 034 猜数字游戏
 * @author liuduan
 * @Date 2020-06-12 17:46:53
 * @LastEditTime 2020-06-12 18:17:06
 * https://leetcode-cn.com/problems/bulls-and-cows/
 * 
你正在和你的朋友玩 猜数字（Bulls and Cows）游戏：你写下一个数字让你的朋友猜。每次他猜测后，你给他一个提示，告诉他有多少位数字和确切位置都猜对了（称为“Bulls”, 公牛），有多少位数字猜对了但是位置不对（称为“Cows”, 奶牛）。你的朋友将会根据提示继续猜，直到猜出秘密数字。

请写出一个根据秘密数字和朋友的猜测数返回提示的函数，用 A 表示公牛，用 B 表示奶牛。

请注意秘密数字和朋友的猜测数都可能含有重复数字。
 */
/**
 * @param {string} secret
 * @param {string} guess
 * @return {string}
 */
var getHint = function (secret, guess) {
    let sarr = Array.from(secret);
    let garr = Array.from(guess);
    let countA = 0;
    let countB = 0;

    sarr.forEach((item, i) => {
        if (item === garr[i]) {
            sarr[i] = 'A';
            garr[i] = 'A';
            countA++;
        }
    });

    sarr.forEach((item, i) => {
        if (item !== 'A' && garr.includes(item)) {
            const j = garr.indexOf(item);
            garr[j] = null;
            countB++;
        }
    });

    return countA + 'A' + countB + 'B';
};

var getHint = function (secret, guess) {
    let lA = 0;
    let lB = 0;

    let sa = [];
    let ga = [];

    for (let k in secret) {
        if (secret[k] === guess[k]) {
            lA++;
        } else {
            sa.push(secret[k]);
            ga.push(guess[k]);
        }
    }

    for (let k in ga) {
        let index = sa.indexOf(ga[k]);
        if (index > -1) {
            lB++;
            sa[index] = null;
        }
    }

    return lA + 'A' + lB + 'B';

};