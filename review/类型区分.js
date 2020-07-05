/**
 * @fileoverview 
 * @author liuduan
 * @Date 2020-07-04 14:41:19
 * @LastEditTime 2020-07-04 15:19:06
 */
// JS 中区分`array` `object` `date` `function`
// 答：typeof ， instanceof， object.prototype.tostring.call
// 分别问上面的是什么结果




const typeList = [
    'String', 'Number', 'Boolean', 'Null', 'Undefined', 'Symbol', 'BigInt',
    'Object', 'Array',
    'Map', 'WeakMap', 'Set', 'WeakSet',
    'Date', 'RegExp',
    'Function',
    'Promise',
];

const typeMap = {};
for (const type of typeList) {
    typeMap[`is${type}`] = val => Object.prototype.toString.call(val) === `[object ${type}]`;
}


[
    'string', 1, false, null, undefined, Symbol('a'), 2n,
    { a: 1 }, [9, 8],
    new Map(), new WeakMap(), new Set(), new WeakSet(),
    new Date(), /a/,
    () => { },
    Promise.resolve(),
].forEach((item, index) => {
    let type = typeList[index];
    let res = typeMap['is' + type](item);
    if (!res) {
        console.log(res);
    }
})

