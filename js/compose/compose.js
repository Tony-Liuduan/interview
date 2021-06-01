// redux compose 实现方法从右向左执行
function compose(...funcs) {
    if (funcs.length === 0) {
        return (arg) => arg
    }

    if (funcs.length === 1) {
        return funcs[0]
    }

    return funcs.reduce((a, b) => {
        return function (...args) {
            return a(b(...args))
        }
    });
}


var f1 = (x) => {
    console.log(x + '----f1')
    return x + 'f1';
}

var f2 = (x) => {
    console.log(x + '----f2')
    return x + 'f2';
}

var f3 = (x) => {
    console.log(x + '----f3')
    return x + 'f3';
}


console.log("_____________________________ reduce")

console.log(compose(f1, f2, f3)(3));



function abc(...arr) {
    // return a(b(...args))
    return (
        function ab(...args) {
            return f1(f2(...args));
        }
    )(
        f3(...arr)
    )
}


console.log("_____________________________ function")

console.log(abc(3));



function composeRight(...funcs) {
    if (funcs.length === 0) {
        return (arg) => arg
    }

    if (funcs.length === 1) {
        return funcs[0]
    }

    return funcs.reduceRight((a, b) => (...args) => b(a(...args)));
}
console.log("_____________________________ reduce right")

console.log(composeRight(f1, f2, f3)(3));