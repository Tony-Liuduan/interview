const Singleton = (function () {
    let instance = null;

    function Singleton(name) {
        if (instance) {
            return instance;
        }

        this.name = name;
        // 打印实例名字
        this.getName();

        return instance = this;
    }

    Singleton.prototype.getName = function getName() {
        console.log(this.name);
        return this.name;
    }

    return Singleton;
})();

// 创建实例对象1
var a = new Singleton('a');
// 创建实例对象2
var b = new Singleton('b');

console.log(a === b);
