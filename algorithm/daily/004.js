/*
 * @Author: liuduan
 * @Date: 2020-04-29 11:37:43
 * @LastEditors: liuduan
 * @LastEditTime: 2020-04-29 12:02:38
 * @Description: 
 * https://leetcode-cn.com/problems/er-jin-zhi-zhong-1de-ge-shu-lcof/
 * 输入一个整数，输出该数二进制表示中1的个数，其中负数用补码表示
 * 
 */

// var a = '12'
// var b = Number.parseInt(a, 2)
// console.log(b)
// var c = a.charCodeAt(1)
// console.log(c)

/**
 * 只适用于输入十进制，输入二进制则错误
 * @param {number} n - a positive integer
 * @return {number}
 */
var hammingWeight = function (n) {
    return n.toString(2).replace(/0/g, '').length;
};

// console.log(hammingWeight(00000000000000000000000000001011))

var x = 00000000000000000000000000001011
console.log(x.toString(2))
// todos：位运算复习 & <<