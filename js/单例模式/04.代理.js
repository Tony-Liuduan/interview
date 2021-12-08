const ProxyCreateSingleton = function (Foo) {
    let instance;
    return function CreateSingleton() {
        if (!instance) {
            instance = new Foo(...arguments);
        }
        return instance;
    }
};

// 独立的Singleton类，处理对象实例
function Singleton(name) {
    this.name = name;
}
Singleton.prototype.getName = function () {
    console.log(this.name);
    return this.name;
}

const CreateSingleton = ProxyCreateSingleton(Singleton);
const winner = new CreateSingleton('Winner', 'x');
const looser = new CreateSingleton('Looser');

console.log(winner === looser);

