function deepcopy(obj) {
    if (typeof obj === "object") {
        const res = obj.constructor === Array ? [] : {};
        for (const key in obj) {
            if (obj.hasOwnProperty(key)) {
                res[key] = deepcopy(obj[key]);
            }
        }
        return res;
    } else {
        return obj;
    }
}



// function whatType() {
//     const map = {};
//     const toString = Object.prototype.toString;
//     const types = ['Array', 'Boolean', 'Date', 'Number', 'Object', 'RegExp', 'String', 'Error', 'Function', 'Promise'];
//     for (let i = 0, len = types.length; i < len; i++) {
//         const c = types[i];

//         map[`is${c}`] = ((type) => (arg) => toString.call(arg) === `[object ${type}]`)(c);
//     }
//     return map;
// }


function getType(obj) {
    const str = Object.prototype.toString.call(obj);
    const map = {
        "[object Boolean]": "boolean",
        "[object Number]": "number",
        "[object String]": "string",
        "[object Function]": "function",
        "[object Array]": "array",
        "[object Date]": "date",
        "[object RegExp]": "regExp",
        "[object Undefined]": "undefined",
        "[object Null]": "null",
        "[object Object]": "object",
    };

    // dom 元素
    if (Element[Symbol.hasInstance](obj)) {
        return "element";
    }

    // if (obj instanceof Element) { // 判断是否是dom元素，如div等
    //     return "element";
    // }
    return map[str];
}






var a = {
    'b': [
        1,
        {
            'k': 1,
        }
    ],
    'c': "test",
};

var b = deepcopy(a);

console.log(a === b, a, b, a.b[1] === b.b[1]);