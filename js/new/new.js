function New(Factory, ...args) {
    var obj = {};
    if (Factory.prototype) {
        // obj.__proto__ = func.prototype;
        Object.setPrototypeOf(obj, Factory.prototype);
    }
    var r = Factory.apply(obj, args);
    var t = typeof r;
    if (['object', 'function'].indexOf(t) > -1 && r !== null) {
        return r
    } else {
        return obj;
    }
}

function A(a, b) {
    this.a = a;
    this.b = b
}

A.prototype.test = function () {
    console.log('test');
}

var obj = New(A, 1, 2);
