function JSONStringify(obj) {
    // 判断非对象情况
    if (typeof obj !== "object" || obj === null) {
        return String(obj);
    }

    // 判断是否是数组
    const isArray = Array.isArray(obj);

    const res = [];

    // 遍历对象
    for (const key in obj) {
        if (obj.hasOwnProperty(key)) {
            const value = obj[key];
            res.push((isArray ? '' : `"${key}":`) + JSONStringify(value));
        }
    }

    let prefix = isArray ? '[' : '{';
    let suffix = isArray ? ']' : '}';

    return `${prefix}${String(res)}${suffix}`;
}


const a = JSONStringify({ a: 1, b: 2 });
const b = JSONStringify([{ a: 1, b: 2 }, 99, null, undefined, false, [1, 2, 3]]);

console.log(a, b);



function jsonParse(jsonStr) {
    // return eval('(' + jsonStr + ')');

    return (new Function('return ' + jsonStr))();
}


// JSON.stringify 有3个参数
// 参数1：toJSON 对象
// 参数2：function(key, value) {return value}
// 参数2：[key1, key2] 设置指定stringify的key
// 参数3：数字，控制空格数的


// JSON.parse 有2个参数
// 参数1：toJSON 对象
// 参数2：function(key, value) {return value}