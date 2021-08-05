/**
 * @description ❌ 不支持静态重载
 */
// function heavy(a: number, b: number): number | string {
//     return a + b;
// }
// function heavy(a: string, b: string): string {
//     return a + b + '!'
// }


/**
 * @description ✅ 支持函数签名加函数实现的方式重载
 * 使用重载时，只有函数签名对外可见， 而函数实现对外不可见
 */
function heavy(a: number, b: number): number;
function heavy(a: string, b: string): string;
function heavy(a: any, b: any) {
    if (typeof a === 'string') {
        return a + b + '!'
    } else {
        return a + b
    }
}
