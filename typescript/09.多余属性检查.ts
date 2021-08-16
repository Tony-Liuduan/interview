/**
 * @fileoverview item11: Recognize the Limits of Excess Property Checking  
 * 
 * 认识多余属性检查是有限制的：
 * 
 * 1. ts 多余属性检查只会在『对象字面量赋值 object literals 』、『函数参数赋值』时触发
 * 2. as 可以跳过对象字面量多余属性校验，将字面量赋值检查变为『中间变量赋值』检查
 * 3. index signature 可以帮助通过对象字面量多余属性校验
 * 4. 使用『中间变量赋值』时，只会检查赋值对象类型是否包含在定义类型值的域中
 * 5. 使用『中间变量赋值』时，当定义类型属性都是可选属性时(week types)，ts 会触发检查类型至少有一个属性匹配
 * 
 */

/**
 * @description 例1：显而易见 ts 能检查出错误的例子
 * TypeScript会确保它有该类型的属性而不是其他属性
 * 在 Typescript 中，当我们尝试将对象分配给类型化变量时，Typescript 会检查是否存在任何未在相应类型中定义的额外属性
 */
interface Room {
    numDoors: number;
    ceilingHeightFt: number;
}
const room1: Room = {
    numDoors: 1,
    ceilingHeightFt: 10,
    elephant: 'present',
    // ~~~~~~~~~~~~~~~~~~ Object literal may only specify known properties,
    //                    and 'elephant' does not exist in type 'Room'
};


/**
 * @description 例2：ts 不易检查出错误的例子
 * 通过一个 obj 中转一下就能绕过多余属性校验
 * 条件：当 obj 类型包含在 Room 类型域中，ts 认为这是 OK 的
 */
const obj = {
    numDoors: 1,
    ceilingHeightFt: 10,
    elephant: 'present',
};
const room2: Room = obj;  // OK




/* --- ￥￥￥￥￥￥￥￥￥￥ 小结 1：通过上面两个例子对比可以发现多余属性检查只会在对象字面量赋值时触发 ￥￥￥￥￥￥￥￥￥￥ --- */



/**
 * @description 例3：再看一下给函数参数赋值的例子，和上面的例子如出一辙，再次印证上面的小结
 */
interface Options {
    title: string;
    darkMode?: boolean;
}
function createWindow(options: Options) {
    if (options.darkMode) {
        // ...
    }
    // ...
}
createWindow({
    title: 'Spider Solitaire',
    darkmode: true
    // ~~~~~~~~~~~~~ Object literal may only specify known properties, but
    //               'darkmode' does not exist in type 'Options'.
    //               Did you mean to write 'darkMode'?
});

const optObj = {
    title: 'Spider Solitaire',
    darkmode: true
};

createWindow(optObj); // OK


/**
 * @description 例4：Options 这个类型的值域其实很宽泛，任何具有 title: string 属性且不包含 darkMode:boolean 的对象都是有效的 Options
 */ 
const o1: Options = document;  // OK
const o2: Options = new HTMLAnchorElement;  // OK



/**
 * @description 例5：用 as 可以跳过对象字面量多余属性校验
 */
const o3: Options = { darkmode: true, title: 'Ski Free' } as Options; // OK


/* --- ￥￥￥￥￥￥￥￥￥￥ 小结 2：as 可以跳过对象字面量多余属性校验 ￥￥￥￥￥￥￥￥￥￥ --- */



/**
 * @description 例6：用 index signature 可以帮助通过对象字面量多余属性校验
 */
interface Options1 {
    darkMode?: boolean;
    [otherOptions: string]: unknown;
}
const o4: Options1 = { darkmode: true };  // OK


/* --- ￥￥￥￥￥￥￥￥￥￥ 小结 3：index signature 可以帮助通过对象字面量多余属性校验 ￥￥￥￥￥￥￥￥￥￥ --- */




/**
 * @description 例7：当定义类型属性都是可选属性时(week types)，ts 会触发检查类型至少有一个属性匹配
 */
interface LineChartOptions {
    logscale?: boolean;
    invertedYAxis?: boolean;
    areaChart?: boolean;
}
const opts = { 
    logScale: true,
    // invertedYAxis: true,
};
const o5: LineChartOptions = opts; // 类型 { logScale: boolean; } 与类型 LineChartOptions 不具有相同的属性。


/* --- ￥￥￥￥￥￥￥￥￥￥ 小结 4：当定义类型属性都是可选属性时(week types)，ts 会触发检查类型至少有一个属性匹配 ￥￥￥￥￥￥￥￥￥￥ --- */
