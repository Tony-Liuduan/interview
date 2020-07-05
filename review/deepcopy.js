/**
 * @fileoverview 
 * @author liuduan
 * @Date 2020-06-17 17:53:25
 * @LastEditTime 2020-06-28 19:46:52
 */
function deepcopy(source) {
    if (typeof source === 'object') {
        let output = Array.isArray(source) ? [] : {};

        for (const key of Object.keys(source)) {
            output[key] = deepcopy(source[key]);
        }

        return output;
    } else {
        return source;
    }
}



/*

3. const deepClone = function (obj, hash = new WeakMap()) {
4.     if (hash.has(obj)) return hash.get(obj)
5.     let type = [Date,RegExp,Set,Map,WeakMap,WeakSet]
6.     if (type.includes(obj.constructor)) return new obj.constructor(obj);
7.     //如果成环了,参数obj = obj.loop = 最初的obj 会在WeakMap中找到第一次放入的obj提前返回第一次放入WeakMap的cloneObj
8.
9.     let allDesc = Object.getOwnPropertyDescriptors(obj);  //遍历传入参数所有键的特性
10.     let cloneObj = Object.create(Object.getPrototypeOf(obj), allDesc); //继承原型
11.     hash.set(obj, cloneObj)
12.
13.     for (let key of Reflect.ownKeys(obj)) {   //Reflect.ownKeys(obj)可以拷贝不可枚举属性和符号类型
14.         // 如果值是引用类型(非函数)则递归调用deepClone
15.         cloneObj[key] =
16.             (isComplexDataType(obj[key]) && typeof obj[key] !== 'function') ?
17.                 deepClone(obj[key], hash) : obj[key];
18.     }
19.     return cloneObj;
20. };

*/

function isObject(obj) {
    return obj !== null && (typeof obj === 'object' || typeof obj === 'function');
}
function clone(source, map = new WeakMap()) {
    // 1. 防止循环引用
    if (map.has(source)) {
        return map.get(source);
    }
    if (!isObject(source)) {
        return source;
    }

    let type = [Date, RegExp, Set, Map, WeakMap, WeakSet];

    if (type.includes(source.constructor)) {
        return new source.constructor(source);
    }

    // let allDescs = Object.getOwnPropertyDescriptors(source);  // 遍历传入参数所有键的特性
    // let cloneObj = Object.create(Object.getPrototypeOf(obj), allDesc); // 继承原型

    let output = Array.isArray(source) ? [] : {};
    map.set(source, output);


    for (const key of Reflect.ownKeys(source)) {
        output[key] = clone(source[key]);
    }

    return output;
}