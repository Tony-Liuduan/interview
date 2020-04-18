function compose(f, g) {
    return function (x) {
        return f(g(x));
    }
}


var toUpperCase = function (x) { return x.toUpperCase(); };
var exclaim = function (x) { return x + '!'; };
var shout = compose(exclaim, toUpperCase);
var res = shout("send in the clowns");
console.log(res);

// 让代码从右向左运行，而不是由内而外运行，我觉得可以称之为“左倾”


var head = function (x) {
    return x[0];
};
var reverse = function (arr) {
    return arr.reduce(function (acc, x) {
        return [x].concat(acc);
    }, []);
}

var last = compose(toUpperCase, compose(head, reverse));

var res1 = last(['jumpkick', 'roundhouse', 'uppercut']);
console.log(res1);

async function * d() {
    yield await Promise.resolve(1);
    yield await Promise.resolve(2);
    yield await Promise.resolve(3);
    yield await Promise.resolve(4);
}

const ii = d();

async function a() {
    for await (const iterator of ii) {
        console.log(iterator)
    }
}



function reduxCompose(...fns) {
    return fns.reduce((fa, fb) => (...args) => fa(fb(...args)))
}