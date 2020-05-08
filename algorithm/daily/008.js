/**
 * @fileoverview 每日一题008
 * @author liuduan
 * @description https://leetcode-cn.com/problems/ti-huan-kong-ge-lcof/
 * @Date 2020-05-08 10:54:14
 * @LastEditTime 2020-05-08 11:39:25
 * 
 * 请实现一个函数，把字符串 s 中的每个空格替换成"%20"。
 * 输入：s = "We are happy." 输出："We%20are%20happy."
 */

/**
* @param {string} s
* @return {string}
*/
var replaceSpace = function (s) {
    let l = s.length;

    let str = '';

    for (let i = 0; i < l; i++) {
        const char = s.charAt(i);
        if (char === ' ') {
            str += '%20';
        } else {
            str += char;
        }
    }

    console.log(str);

    return str;
};

replaceSpace("We are happy.");