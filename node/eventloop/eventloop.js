/**
 * @fileoverview 
 * @author liuduan
 * @Date 2020-06-12 17:31:06
 * @LastEditTime 2020-06-12 17:42:42
 * 事件循环的每个阶段
 * ┌───────────────────────────┐
┌─>│           timers          │
│  └─────────────┬─────────────┘
│  ┌─────────────┴─────────────┐
│  │     pending callbacks     │(socket padding)
│  └─────────────┬─────────────┘
│  ┌─────────────┴─────────────┐
│  │       idle, prepare       │
│  └─────────────┬─────────────┘      ┌───────────────┐
│  ┌─────────────┴─────────────┐      │   incoming:   │
│  │           poll(io)        │<─────┤  connections, │
│  └─────────────┬─────────────┘      │   data, etc.  │
│  ┌─────────────┴─────────────┐      └───────────────┘
│  │           check           │
│  └─────────────┬─────────────┘
│  ┌─────────────┴─────────────┐
└──┤      close callbacks      │(socket close)
   └───────────────────────────┘
 */
// 不在 I/O 周期（即主模块）内的脚本
setImmediate(() => {
    console.log('immediate');
});
setTimeout(() => {
    console.log('timeout');
}, 0);

// timeout_vs_immediate.js
const fs = require('fs');
fs.readFile('./fs.js', () => {
    setTimeout(() => {
        console.log('fs-timeout');
    }, 0);
    setImmediate(() => {
        console.log('fs-immediate');
    });
    // 使用 setImmediate() 相对于setTimeout() 的主要优势是
    // 如果setImmediate()是在 I/O 周期内被调度的，那它将会在其中任何的定时器之前执行，跟这里存在多少个定时器无关
});

// process.nextTick()


let bar;

function someAsyncApiCall(callback) {
    process.nextTick(callback);
}

someAsyncApiCall(() => {
    console.log('bar', bar); // 1
});

bar = 1;