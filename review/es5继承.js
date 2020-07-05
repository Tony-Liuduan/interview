function Parent(a) {
    this.a = a;
}

Parent.prototype.log = function () {
    console.log('parent log');
}

Person.ss = "staticProps";


function Son() {
    Parent.apply(this, arguments);
}

if (Object.create) {
    Object.create = function (proto) {
        function F() { };
        F.prototype = proto;
        return new F();
    }
}


Son.prototype = Object.create(Parent.prototype, {
    constructor: {
        value: Son,
    },
});

Object.setPrototypeOf(Son, Parent);