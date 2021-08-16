/**
 * @fileoverview Item 20: Use Different Variables for Different Types
 * 1. 不同类型定义应对应不同的变量声明
 * 2. 为避免对阅读者和 ts 产生困惑，避免对一个变量定义多个类型
 */


/**
 * @description 
 * 在 js 中允许使用一个变量赋值不同类型的值
 * 但是在 ts 中就会报错
 */
function fetchProduct(id: string) {
    return id;
}
function fetchProductBySerialNumber(id: number) {
    return id;
}

let id = "12-34-56"; // id 推断类型是一个字符串
fetchProduct(id);

id = 123456; // 不能将类型“number”分配给类型“string”
fetchProductBySerialNumber(id); // 类型“string”的参数不能赋给类型“number”的参数

/**
 * @description while a variable’s value can change, its type generally does not
 * 虽然变量的值可以改变，但它的类型通常不会改变
 * 联合类型可以解决给变量赋值多种类型， 但是同时也会反噬带来一些麻烦
 *  1. 没有单一类型清晰明确，使代码检查变得更为复杂
 *  2. 在做一些操作时，还需要检查是否是某一种类型
 * 
 */
// 使用联合类型可以修复上面的错误方式
let id1: string | number = "12-34-56";
fetchProduct(id);

id1 = 123456;
fetchProductBySerialNumber(id1);


/**
 * @description 最好是创建一个新的变量，1:1 模式，使用 2 个变量区分不同类型有如下好处：
 * 1. 单一原则，代码解耦，一个变量做一件事
 * 2. 代码语义化，可读性变强，更适合人类阅读
 * 3. 可以使用类型推断，不需要类型声明
 * 4. 使开发者更多使用 const 声明变量而不是 let，这样更有利于代码静态检查
 */

// better - 1
const id2 = "12-34-56";
fetchProduct(id2);

const serial = 123456;
fetchProductBySerialNumber(serial);


// not better - 2 非要使用一个变量名，可通过块级作用域区分
// 这种只对 ts 检查优化，对 human 不友好
const id3 = "12-34-56";
fetchProduct(id);
{
    const id3 = 123456;  // OK
    fetchProductBySerialNumber(id3);  // OK
}