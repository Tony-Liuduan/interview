function Singleton(name) {
    this.name = name;
}

// 原型扩展类的一个方法getName()
Singleton.prototype.getName = function () {
    console.log(this.name)
};

// 使用类属性实现
Singleton.getInstance = function (name) {
    if (!this.instance) {
        this.instance = new Singleton(name);
    }
    return this.instance;
};

// 获取对象1
const a = Singleton.getInstance('a');
// 获取对象2
const b = Singleton.getInstance('b');
// 进行比较
console.log(a === b, a === Singleton.instance, a.name, b.name);



// 使用闭包实现
Singleton.getInstance1 = (function () {
    let instance = null;
    return function Instance(name) {
        if (!instance) {
            instance = new Singleton(name);
        }
        return instance;
    }
})();


// 获取对象3
const c = Singleton.getInstance1('c');
// 获取对象4
const d = Singleton.getInstance1('d');
// 进行比较
console.log(c === d, c === a, c.name, d.name);