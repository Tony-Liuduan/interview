/**
 * @fileoverview https://mp.weixin.qq.com/s?__biz=MzIyNDU2NTc5Mw%3D%3D&mid=2247498291&idx=1&sn=319539c771536021e139a37297c9d853&chksm=e80fb57ddf783c6b2b5c1856c94f5b48c00dea637e1223ad8c5056b9cd1d3e73a42a03a07b59&mpshare=1&scene=1&srcid=1029eZDIE3PPqQKT6entcIXk&sharer_sharetime=1635480020913&sharer_shareid=2554c30e5a0735b388cfa55d6d89ba0e&version=3.1.18.70072&platform=mac#rd
 * @author liuduan
 * @Date 2020-06-12 17:31:06
 * @LastEditTime 2021-11-08 16:09:34
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
fs.readFile('./index.js', () => {
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
    // console.log('bar', bar); // 1
});

bar = 1;



fs.readFile('./index.js', () => {
    setTimeout(() => console.log('setTimeout'));

    process.nextTick(() => {
        console.log('nextTick');
        run();
        function run() {
            // console.log('run...');
            // process.nextTick(() => run());
            setImmediate(() => run());
            // setImmediate(() => {
            //     console.log('setImmediate');
            // });
        }
    });
    console.log('sync run');
});
