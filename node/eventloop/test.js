/**
 * @fileoverview 
 * @author liuduan
 * @Date 2020-07-03 14:29:35
 * @LastEditTime 2020-07-03 14:51:32
 */
const fs = require('fs');

const timeoutScheduled = Date.now();

/* 示例1 */
// 异步任务一：100ms 后执行的定时器
setTimeout(() => {
    const delay = Date.now() - timeoutScheduled;
    console.log(`${delay}ms`);
}, 100);

// 异步任务二：文件读取后，有一个 200ms 的回调函数
fs.readFile('index.js', () => {
    const startCallback = Date.now();
    console.log(startCallback - timeoutScheduled, 'is readFile poll callback start time');
    while (Date.now() - startCallback < 200) {
        // 什么也不做
    }
    setImmediate(() => console.log(3));
});
setImmediate(() => console.log(2));

/*
解释
1. 第一轮：
    timers 阶段，检查timer中到期的回调任务，无
    检查I/O callback有可以执行回调函数，无
    会进入 Poll 阶段，等待内核返回文件读取的结果
        读取小文件一般不会超过 100ms，所以在定时器到期之前，Poll 阶段就会得到结果，因此就会继续往下执行

2. 第二轮：
    timers 阶段，检查timer中到期的回调任务，无，还没到100ms
    检查I/O callback有可以执行回调函数，有
        进入 I/O callbacks 阶段，执行fs.readFile的回调函数，
        这个回调函数需要 200ms
3. 第三轮：
    timers 阶段，检查timer中到期的回调任务，有，执行定时器callback，所以会大于200ms
*/





/* 示例2 */
// 异步任务一：10ms 后执行的定时器，拟定早于内核完成文件读取
// setTimeout(() => {
//     const delay = Date.now() - timeoutScheduled;
//     console.log(`${delay}ms`);
// }, 10);

// // 异步任务二：文件读取后，有一个 200ms 的回调函数
// fs.readFile('index.js', () => {
//     const startCallback = Date.now();
//     console.log(startCallback - timeoutScheduled, 'is readFile poll callback start time');
//     while (Date.now() - startCallback < 200) {
//         // 什么也不做
//     }

//     setImmediate(() => console.log('setImmediate', 3));
// });
// setImmediate(() => console.log('setImmediate', 2));


/*
解释
1. 第一轮：
    timers 阶段，检查timer中到期的回调任务，无
    检查I/O callback有可以执行回调函数，无
    会进入 Poll 阶段，等待内核返回文件读取的结果
        读取文件会超过 10ms，有可执行的定时器任务，继续往下执行

2. 第二轮：
    timers 阶段，检查timer中到期的回调任务，有，执行定时器callback
    检查I/O callback有可以执行回调函数，有
        进入 I/O callbacks 阶段，执行fs.readFile的回调函数，
        这个回调函数需要 200ms
    进入check阶段执行setImmediate回调
*/




/* 示例3 */
// setTimeout(() => console.log('setTimeout----'), 1);
// setImmediate(() => console.log('setImmediate----'));

/* 解释：
实际执行的时候，进入事件循环以后，有可能到了1毫秒，也可能还没到1毫秒，取决于系统当时的状况。
如果没到1毫秒，那么 timers 阶段就会跳过，进入 check 阶段，先执行setImmediate的回调函数。
*/



/* 示例4 */
// fs.readFile('test.js', () => {
//     setTimeout(() => console.log('test setTimeout'));
//     setImmediate(() => console.log('test setImmediate'));
// });

/* 解释：
1. 进入poll阶段，等待内核读取文件，返回文件读取的结果
2. 下一轮循环，进入Timers阶段，没有定时任务
2. 进入I/O callback阶段，有回调执行
3. 进入check阶段执行setImmediate
4. 下一轮循环，进入Timers阶段，有定时任务，执行定时任务
*/
