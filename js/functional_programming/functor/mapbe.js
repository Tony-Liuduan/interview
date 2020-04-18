function Maybe(x) {
    this.__value = x;
}
Maybe.of = function (x) {
    return new Maybe(x);
}

Maybe.prototype.isNothing = function () {
    return (this.__value === null || this.__value === undefined);
}

Maybe.prototype.map = function (f) {
    return this.isNothing() ? Maybe.of(null) : Maybe.of(f(this.__value));
}

function match(reg) {
    return function test(str) {
        console.log(str.match(/a/ig))
        return str.match(reg)
    }
}

let m = Maybe.of("ad").map(match(/a/ig)); //=> Maybe(null)
console.log(m);