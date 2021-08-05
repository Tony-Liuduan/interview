/**
 * @fileoverview 尽可能对整个函数表达式进行类型标注
 */

/**
 * bad:

function add(a: number, b: number) {
    return a + b;
}
function sub(a: number, b: number) {
    return a - b;
}
function mult(a: number, b: number) {
    return a * b;
}
function div(a: number, b: number) {
    return a / b;
}
 */

/**
 * better:
 * 提取出公共的函数类型
 */
type Binary = (a: number, b: number) => number;
const add: Binary = (a, b) => a + b;
const sub: Binary = (a, b) => a - b;
const mult: Binary = (a, b) => a * b;
const div: Binary = (a, b) => a - b;
