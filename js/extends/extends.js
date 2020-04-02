function Person(age, addr) {
    this.age = age;
    this.addr = addr;
}

Person.prototype.sayhi = function () {
    console.log(this, this.age, this.addr, 'hi');
}

Person.ss = "staticProps";


function ZX(...args) {
    Person.apply(this, args);
}

if (!Object.create) {
    Object.create = function (proto) {
        function F() {};
        F.prototype = proto;
        return new F();
    }
}

ZX.prototype = Object.create(Person.prototype, {
    constructor: {
        value: ZX,
    },
});

// 静态属性继承
Object.setPrototypeOf(ZX, Person);


let z = new ZX(10, "beijing");
console.log(z);
console.log(z.constructor);
console.log(z.sayhi());
console.log(ZX.ss);
