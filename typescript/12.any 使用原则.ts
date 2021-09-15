/**
 * @fileoverview Item 38: Use the Narrowest Possible Scope for any Types
 * 在强制 ts 检查通过的同时，尽量缩小 any 的影响范围
 * 
 */

/**
 * @description 1. 函数中使用 any
 * 单行级别使用 any
 * 避免整个函数上下文都使用 any
 */
interface Bar {
    bar: number;
}
interface Foo {
}

function expressionReturningFoo(): Foo {
    return {};
}
function processBar(b: Bar) {

}
function f() {
    const x = expressionReturningFoo();
    processBar(x);
    //         ~ Argument of type 'Foo' is not assignable to
    //           parameter of type 'Bar”
    return x;
}

/**
 * 如果你已知 x 符合 Bar 类型，你可以使用 any 强制跳过 ts 类型校验
 * 但是 any 的使用也是有段位的，这里 f2 中 any 的使用明显优于 f1
 * 
 * 原因：
 *      f2 的 any 只在 `processBar` 函数参数中生效，不会在 `processBar` 函数外部生效
 *      即便之后继续调用 x，ts 还是会认为 x 是 Foo 类型，继续进行类型检查
 *      反之，f1 中那样操作，后续就一路不对 x 做类型检查
 */
function f1() {
    const x: any = expressionReturningFoo();  // Don't do this
    processBar(x);
    return x;
}
function g1() {
    const foo = f1();  // Type is any
    foo.fooMethod();  // This call is unchecked!
}


function f2() {
    const x = expressionReturningFoo();
    processBar(x as any);  // Prefer this
    return x;
}
function g2() {
    const foo = f2();  // Type is Foo
    foo.fooMethod();  // This call is checked!
}


/**
 * 你也可以使用 `@ts-ignore` 去忽略 ts 检查
 */
function f3() {
    const x = expressionReturningFoo();
    // @ts-ignore
    processBar(x); // ts-ignore 只忽略注释下面这一行
    processBar(x); // 这行还是会触发检查报错的
    return x;
}


/**
 * @description 2. 对象中使用 any
 * 单个属性使用 any
 * 避免整个对象使用 any
 */
interface Config {
    a: number;
    b: number;
    c: {
        key: Bar;
    }
}
const value = {};
const config: Config = {
    a: 1,
    b: 2,
    c: {
        key: value, // 类型 "{}" 中缺少属性 "bar"，但类型 "Bar" 中需要该属性
    }
};

const config1: Config = {
    a: 1,
    b: 2,
    c: {
        key: value
    }
} as any;  // Don't do this!

const config2: Config = {
    a: 1,
    b: 2,  // These properties are still checked”
    c: {
        key: value as any
    }
};


/**
 * @description 小结：
 * 1. 在强制 ts 检查通过的同时，尽量缩小 any 的影响范围
 * 2. funciton 千万不要返回一个 any 类型的值，会一路丢检查
 * 3. 必要时可以考虑 @ts-ignore 代替 any
 */