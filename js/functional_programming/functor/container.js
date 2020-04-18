/**
 * @description 容器
 * Container 是个只有一个属性的对象。
 * 尽管容器可以有不止一个的属性，但 大多数容器还是只有一个。
 * 我们很随意地把 Container 的这个属性命名为__value
 * __value 不能是某个特定的类型，不然 Container 就对不起它这个名字 了
 * 数据一旦存放到 Container ，就会一直待在那儿。我们可以用 .__value 获取到数据，但这样做有悖初衷。
 * 如果把容器想象成玻璃罐的话，上面这三条陈述的理由就会比较清晰了。
 */
const Container = function (x) {
    this.__value = x;
}

Container.of = function (x) {
    return new Container(x);
}

// 第一个functor函子：map
Container.prototype.map = function (f) {
    return Container.of(f(this.__value));
}

Container.of(3); // Container(3)
Container.of("hotdogs"); // Container("hotdogs")
Container.of(Container.of({ name: "yoda" })); // Container { __value: Container { __value: { name: 'yoda' } } }


let c1 = Container.of(2).map(function (two) { return two + 2 }) //=> Container(4)
let c2 = Container.of("flamethrowers").map(function (s) { return s.toUpperCase() })
let c3 = Container.of("bombs").map(function (s) { return s.concat(' away') }).map(function (s1) { return s1.length })
console.log(c1);
console.log(c2);
console.log(c3);



// 小结：
// Container 。这样做的结果是，我们能连续地调用 map ，运行任何我们想运行的函数。
// 甚至还可以改变值的类型，就像上面最后一个例子中那样。
// functor 是实现了 map 函数并遵守一些特定规则的容器类型。